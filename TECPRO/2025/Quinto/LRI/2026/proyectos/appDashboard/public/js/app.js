import { Vec3 }            from './math/Vec3.js';
import { Renderer }        from './core/Renderer.js';
import { Semaforo }        from './model/Semaforo.js';
import { SocketClient }    from './net/SocketClient.js';

// ─── Setup ─────────────────────────────────────────────────────────
const renderer = new Renderer(document.getElementById('escena'));
const socket   = new SocketClient();

let semaforos = []; // [{ id, topic, semaforo }]

// HUD
const dot              = document.getElementById('dot');
const estadoMqttEl     = document.getElementById('estadoMqtt');
const totalEl          = document.getElementById('total');
const estadoSemaforoEl = document.getElementById('estadoSemaforo');
const topicEl          = document.getElementById('topic');
const payloadEl        = document.getElementById('payload');

// ─── Reacciones del socket ────────────────────────────────────────
socket.on('onConfig', (config) => {
  // Guardar estados previos para no perderlos al recargar config
  const previos = {};
  semaforos.forEach(({ id, semaforo }) => { previos[id] = semaforo.estado; });

  semaforos = config.map(cfg => {
    const pos = new Vec3(...cfg.posicion);
    const sem = new Semaforo(cfg.id, pos);
    if (previos[cfg.id]) sem.setEstado(previos[cfg.id]);
    return { ...cfg, semaforo: sem };
  });

  totalEl.textContent = semaforos.length;
});

socket.on('onEstados', (estados) => {
  for (const [id, info] of Object.entries(estados)) {
    const target = semaforos.find(s => s.id === id);
    if (target) target.semaforo.setEstado(info.estado);
  }
});

socket.on('onUpdate', ({ id, estado, payload, topic }) => {
  const target = semaforos.find(s => s.id === id);
  if (!target) return;
  target.semaforo.setEstado(estado);

  estadoSemaforoEl.textContent = `${id}: ${estado}`;
  topicEl.textContent          = topic;
  payloadEl.textContent        = payload;
});

socket.on('onMqttStatus', ({ connected }) => {
  dot.classList.toggle('on', connected);
  estadoMqttEl.textContent = connected ? 'MQTT conectado' : 'MQTT desconectado';
});

// ─── Animación ─────────────────────────────────────────────────────
let lastTime = performance.now();


function animate(time) {
  const dt = Math.min((time - lastTime) / 1000, 0.1);
  lastTime = time;

  // Defensivo: si el div no existe, no crashea
  const zoomEl = document.getElementById('zoomInfo');
  if (zoomEl) zoomEl.textContent = renderer.camDist.toFixed(1);

  semaforos.forEach(({ semaforo }) => semaforo.update(dt));
  renderer.render(semaforos.map(s => s.semaforo));

  requestAnimationFrame(animate);
}
  requestAnimationFrame(animate);
