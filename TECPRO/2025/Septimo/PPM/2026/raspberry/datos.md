# Guía completa: arranque automático de NeoPixel + API Express en Raspberry Pi



Sigue estos pasos **en orden**. Al final, al reiniciar la Raspberry todo arrancará solo.

Aclaración: Se realizaron cambios en los archivos INI con la ruta de node y tambien se cambiaron permisos, utilizar solo como guía/recordatorio y pruebas
Conectar el GPIO18 al data de la tira led y el GND de la raspberry debe estar en comun con el de la tira ( alimentarla con trafo externo )
---

## 0. Requisitos previos

Verifica que tienes:

```bash
# Node.js instalado
node -v

# npm instalado
npm -v

# Python del venv existe
ls /home/alumno/pi/neopixel/.venv/bin/python

# El script existe
ls /home/alumno/pi/neopixel/led_test_mqtt.py
```

Si algo falla, instálalo antes de continuar.

---

## 1. Instalar y habilitar Mosquitto (broker MQTT)

```bash
sudo apt update
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable --now mosquitto
```

Verifica que está corriendo:

```bash
sudo systemctl status mosquitto
```

Debe decir `active (running)`.

Prueba rápida (opcional):

```bash
mosquitto_pub -t escape/led/effect -m 1
```

---

## 2. Preparar la carpeta de la API Express

```bash
mkdir -p /home/alumno/pi/api
cd /home/alumno/pi/api
```

### 2.1 Crear `package.json`

```bash
nano /home/alumno/pi/api/package.json
```

Pega esto:

```json
{
  "name": "led-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "mqtt": "^5.7.0"
  }
}
```

Guarda con `Ctrl+O`, `Enter`, `Ctrl+X`.

### 2.2 Crear `server.js`

```bash
nano /home/alumno/pi/api/server.js
```

Pega esto (versión limpia, **sin lanzar Python**, porque lo hará systemd):

```js
const express = require('express');
const mqtt = require('mqtt');

const app = express();
app.use(express.json());

// ---------- CONFIG ----------
const PORT       = process.env.PORT       || 3000;
const MQTT_URL   = process.env.MQTT_URL   || 'mqtt://localhost:1883';
const MQTT_TOPIC = process.env.MQTT_TOPIC || 'escape/led/effect';

// ---------- CATÁLOGO ----------
const EFFECTS = {
  0:  'Apagado',
  1:  'Rojo',
  2:  'Verde',
  3:  'Azul',
  4:  'Alarma roja',
  5:  'Alerta rojo/azul',
  6:  'Vela',
  7:  'Latido',
  8:  'Cuenta regresiva',
  9:  'Éxito',
  10: 'Fallo',
  11: 'Escáner',
  12: 'Misterio',
  13: 'Parpadeo',
  14: 'Emergencia',
  15: 'Arco iris'
};

// ---------- MQTT ----------
let mqttClient = null;
let mqttConnected = false;

mqttClient = mqtt.connect(MQTT_URL, {
  clientId: 'express-led-api',
  reconnectPeriod: 2000
});

mqttClient.on('connect',   () => { mqttConnected = true;  console.log('[MQTT] conectado a', MQTT_URL); });
mqttClient.on('reconnect', () => console.log('[MQTT] reconectando...'));
mqttClient.on('close',     () => { mqttConnected = false; console.warn('[MQTT] desconectado'); });
mqttClient.on('error',   e => { mqttConnected = false; console.error('[MQTT] error:', e.message); });

// ---------- RUTAS ----------
app.get('/api/health', (req, res) => {
  res.json({ ok: true, mqtt: mqttConnected, broker: MQTT_URL, topic: MQTT_TOPIC });
});

app.get('/api/led/effects', (req, res) => res.json(EFFECTS));

app.post('/api/led/effect/:num', (req, res) => {
  const num = Number.parseInt(req.params.num, 10);
  if (!Number.isInteger(num) || !(num in EFFECTS)) {
    return res.status(400).json({
      error: 'Efecto no válido',
      permitidos: Object.keys(EFFECTS).map(Number)
    });
  }
  if (!mqttConnected) return res.status(503).json({ error: 'MQTT no conectado' });

  mqttClient.publish(MQTT_TOPIC, String(num), { qos: 1 }, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, effect: num, name: EFFECTS[num] });
  });
});

app.post('/api/led/off', (req, res) => {
  if (!mqttConnected) return res.status(503).json({ error: 'MQTT no conectado' });
  mqttClient.publish(MQTT_TOPIC, '0', { qos: 1 }, err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, effect: 0, name: EFFECTS[0] });
  });
});

// ---------- SERVER ----------
app.listen(PORT, () => {
  console.log(`API LED escuchando en http://0.0.0.0:${PORT}`);
});

process.on('SIGINT',  () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
```

Guarda con `Ctrl+O`, `Enter`, `Ctrl+X`.

### 2.3 Instalar dependencias

```bash
cd /home/alumno/pi/api
npm install
```

Debe crear `node_modules/` sin errores.

---

## 3. Servicio systemd para el script Python (NeoPixel)

Este servicio corre **como root** porque la librería `neopixel` necesita `/dev/mem`.

```bash
sudo nano /etc/systemd/system/led-neopixel.service
```

Pega esto:

```ini
[Unit]
Description=NeoPixel LED Controller (Python + MQTT)
After=network.target mosquitto.service
Requires=mosquitto.service

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=/home/alumno/pi/neopixel
ExecStart=/home/alumno/pi/neopixel/.venv/bin/python -u /home/alumno/pi/neopixel/led_test_mqtt.py
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Guarda con `Ctrl+O`, `Enter`, `Ctrl+X`.

---

## 4. Servicio systemd para la API Express

```bash
sudo nano /etc/systemd/system/led-api.service
```

Pega esto:

```ini
[Unit]
Description=LED NeoPixel Express API
After=network-online.target mosquitto.service led-neopixel.service
Wants=network-online.target
Requires=mosquitto.service

[Service]
Type=simple
User=alumno
Group=alumno
WorkingDirectory=/home/alumno/pi/api
ExecStart=/usr/bin/node /home/alumno/pi/api/server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Guarda con `Ctrl+O`, `Enter`, `Ctrl+X`.

> ⚠️ Si `which node` no da `/usr/bin/node` (por ejemplo, si usas nvm), cambia `ExecStart` a la ruta correcta. Compruébalo con:
> ```bash
> which node
> ```

---

## 5. Activar los servicios

```bash
sudo systemctl daemon-reload

sudo systemctl enable led-neopixel.service
sudo systemctl enable led-api.service

sudo systemctl start led-neopixel.service
sudo systemctl start led-api.service
```

---

## 6. Verificar que todo funciona

### 6.1 Estado de los servicios

```bash
sudo systemctl status mosquitto
sudo systemctl status led-neopixel.service
sudo systemctl status led-api.service
```

Los tres deben decir `active (running)`.

### 6.2 Logs en tiempo real

```bash
journalctl -u led-neopixel -f
```

En otra terminal:

```bash
journalctl -u led-api -f
```

Deberías ver algo como:

```
[MQTT] conectado a mqtt://localhost:1883
API LED escuchando en http://0.0.0.0:3000
```

Y en el de Python:

```
MQTT conectado
Suscripto a: escape/led/effect
Esperando comandos...
```

### 6.3 Probar la API

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:

```json
{"ok":true,"mqtt":true,"broker":"mqtt://localhost:1883","topic":"escape/led/effect"}
```

Prueba un efecto:

```bash
curl -X POST http://localhost:3000/api/led/effect/1
```

Los LEDs deben ponerse rojos.

Prueba arco iris:

```bash
curl -X POST http://localhost:3000/api/led/effect/15
```

Apagar:

```bash
curl -X POST http://localhost:3000/api/led/off
```

---

## 7. Probar el reinicio automático

Este es el paso clave. Reinicia la Raspberry:

```bash
sudo reboot
```

Espera ~40 segundos y, desde otro dispositivo (o tras reconectar por SSH):

```bash
curl http://raspberrypi.local:3000/api/health
```

Si responde `"ok":true`, **todo está funcionando automáticamente**.

También puedes verificar:

```bash
systemctl is-enabled mosquitto led-neopixel.service led-api.service
```

Los tres deben responder `enabled`.

---

## 8. Uso diario

Desde cualquier dispositivo de la red:

```bash
# Ver efectos disponibles
curl http://raspberrypi.local:3000/api/led/effects

# Activar efecto por número
curl -X POST http://raspberrypi.local:3000/api/led/effect/4

# Apagar
curl -X POST http://raspberrypi.local:3000/api/led/off

# Estado
curl http://raspberrypi.local:3000/api/health
```

O desde el navegador, si tienes un frontend, apuntando a `http://raspberrypi.local:3000/api/led/effect/N`.

---

## 9. Comandos útiles de mantenimiento

```bash
# Reiniciar un servicio
sudo systemctl restart led-api.service

# Parar
sudo systemctl stop led-api.service

# Ver logs de las últimas 50 líneas
journalctl -u led-api -n 50

# Ver logs desde el último arranque
journalctl -u led-api -b

# Deshabilitar arranque automático
sudo systemctl disable led-api.service
```

---

## 10. Resumen de la arquitectura final

```
Al arrancar la Raspberry Pi:
  1. systemd arranca mosquitto.service
  2. systemd arranca led-neopixel.service (root)  → Python escucha en MQTT
  3. systemd arranca led-api.service (alumno)     → Express escucha en :3000

Flujo de un comando:
  curl → Express :3000 → MQTT topic escape/led/effect → Python → LEDs
```

---

## Si algo falla

| Síntoma | Causa probable | Solución |
|---|---|---|
| `led-neopixel.service` reinicia en bucle | Error de permisos o de librería | `journalctl -u led-neopixel -n 50` para ver el error |
| `led-api.service` no arranca | `node` no está en `/usr/bin/node` | Cambia `ExecStart` con la ruta de `which node` |
| API responde pero LEDs no hacen nada | Mosquitto no conecta o Python no está suscrito | `journalctl -u led-neopixel -f` mientras haces `curl` |
| `Cannot open /dev/mem` | El servicio Python no corre como root | Verifica `User=root` en `led-neopixel.service` |
| `Efecto desconocido` en logs | Estás enviando un número fuera de 0–15 | Usa `/api/led/effects` para ver los válidos |

Con esto tienes arranque automático completo y verificable.