import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import mqtt from 'mqtt';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, 'config', 'semaforos.json');

const PORT     = process.env.PORT     || 3000;
const MQTT_URL = process.env.MQTT_URL || 'ws://localhost:9001';

const app        = express();
const httpServer = createServer(app);
const io         = new SocketServer(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Estado en memoria ─────────────────────────────────────────────
let semaforos = [];
const ultimosEstados = {}; // id -> { estado, payload, topic, timestamp }

// ─── Persistencia ──────────────────────────────────────────────────
async function cargarConfig() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, 'utf-8');
    semaforos = JSON.parse(raw);
    console.log(`✓ Config cargada: ${semaforos.length} semáforos`);
  } catch {
    console.warn('⚠ Sin config previa, usando valores por defecto');
    semaforos = [
      { id: 'semaforo1', topic: 'semaforo/1/estado', posicion: [-3.5, 0, 0] },
      { id: 'semaforo2', topic: 'semaforo/2/estado', posicion: [ 0,   0, 0] },
      { id: 'semaforo3', topic: 'semaforo/3/estado', posicion: [ 3.5, 0, 0] },
    ];
    await guardarConfig();
  }
}

async function guardarConfig() {
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, JSON.stringify(semaforos, null, 2));
}

// ─── MQTT ──────────────────────────────────────────────────────────
const mqttClient = mqtt.connect(MQTT_URL, {
  clientId: 'semaforos-server-' + Math.random().toString(16).slice(2, 8),
  clean: true,
  reconnectPeriod: 3000,
  connectTimeout: 10000,
});

mqttClient.on('connect', () => {
  console.log(`✓ MQTT conectado → ${MQTT_URL}`);
  semaforos.forEach(s => mqttClient.subscribe(s.topic));
  io.emit('mqtt:status', { connected: true });
});
mqttClient.on('reconnect', () => console.log('… Reintentando MQTT'));
mqttClient.on('error', err => console.error('✗ MQTT error:', err.message));
mqttClient.on('close', () => io.emit('mqtt:status', { connected: false }));

mqttClient.on('message', (topic, payload) => {
  const msg = payload.toString();
  const sem = semaforos.find(s => s.topic === topic);
  if (!sem) return;

  let estado = msg.trim().toLowerCase();
  try {
    const json = JSON.parse(msg);
    if (json.estado) estado = json.estado;
  } catch { /* texto plano */ }

  ultimosEstados[sem.id] = { estado, payload: msg, topic, timestamp: Date.now() };
  io.emit('semaforo:update', { id: sem.id, estado, payload: msg, topic });
  console.log(`📩 [${topic}] → ${estado}`);
});

// ─── API REST ──────────────────────────────────────────────────────
app.get('/api/status', (req, res) => {
  res.json({
    mqttConnected: mqttClient.connected,
    broker: MQTT_URL,
    totalSemaforos: semaforos.length,
  });
});

app.get('/api/semaforos', (req, res) => {
  res.json(semaforos.map(s => ({ ...s, ultimoEstado: ultimosEstados[s.id] || null })));
});

app.get('/api/semaforos/:id', (req, res) => {
  const sem = semaforos.find(s => s.id === req.params.id);
  if (!sem) return res.status(404).json({ error: 'No encontrado' });
  res.json({ ...sem, ultimoEstado: ultimosEstados[sem.id] || null });
});

app.post('/api/semaforos', async (req, res) => {
  const { id, topic, posicion } = req.body;
  if (!id || !topic) return res.status(400).json({ error: 'id y topic requeridos' });
  if (semaforos.some(s => s.id === id))
    return res.status(409).json({ error: 'id ya existe' });

  const nuevo = { id, topic, posicion: posicion || [0, 0, 0] };
  semaforos.push(nuevo);
  await guardarConfig();
  mqttClient.subscribe(topic);
  io.emit('semaforos:config', semaforos);
  res.status(201).json(nuevo);
});

app.put('/api/semaforos/:id', async (req, res) => {
  const sem = semaforos.find(s => s.id === req.params.id);
  if (!sem) return res.status(404).json({ error: 'No encontrado' });

  const { topic, posicion } = req.body;
  if (topic && topic !== sem.topic) {
    mqttClient.unsubscribe(sem.topic);
    mqttClient.subscribe(topic);
    sem.topic = topic;
  }
  if (posicion) sem.posicion = posicion;

  await guardarConfig();
  io.emit('semaforos:config', semaforos);
  res.json(sem);
});

app.delete('/api/semaforos/:id', async (req, res) => {
  const idx = semaforos.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });

  const [eliminado] = semaforos.splice(idx, 1);
  mqttClient.unsubscribe(eliminado.topic);
  delete ultimosEstados[eliminado.id];
  await guardarConfig();
  io.emit('semaforos:config', semaforos);
  res.json(eliminado);
});

app.post('/api/semaforos/:id/publish', (req, res) => {
  const sem = semaforos.find(s => s.id === req.params.id);
  if (!sem) return res.status(404).json({ error: 'No encontrado' });

  const payload = typeof req.body === 'string'
    ? req.body
    : JSON.stringify(req.body);

  // 1) Publicar a MQTT (otros clientes externos lo recibirán)
  mqttClient.publish(sem.topic, payload);

  // 2) Parsear el estado para el frontend
  let estado = String(payload).trim().toLowerCase();
  try {
    const parsed = JSON.parse(payload);
    if (parsed.estado) estado = String(parsed.estado).toLowerCase();
  } catch { /* texto plano */ }

  // 3) Emitir DIRECTO por Socket.IO a los navegadores conectados
  ultimosEstados[sem.id] = {
    estado,
    payload,
    topic: sem.topic,
    timestamp: Date.now()
  };
  io.emit('semaforo:update', {
    id: sem.id,
    estado,
    payload,
    topic: sem.topic
  });

  console.log(`📤 [API] ${sem.id} → ${estado}`);
  res.json({ ok: true, topic: sem.topic, payload, estado });
});

// ─── Socket.IO ─────────────────────────────────────────────────────
io.on('connection', socket => {
  console.log('🔌 Cliente conectado:', socket.id);
  socket.emit('semaforos:config', semaforos);
  socket.emit('semaforos:estados', ultimosEstados);
  socket.emit('mqtt:status', { connected: mqttClient.connected });

  socket.on('disconnect', () => console.log('🔌 Cliente desconectado:', socket.id));
});

// ─── Arranque ──────────────────────────────────────────────────────
await cargarConfig();

httpServer.listen(PORT, () => {
  console.log(`\n🚦 Servidor: http://localhost:${PORT}`);
  console.log(`📡 Broker MQTT: ${MQTT_URL}\n`);
});