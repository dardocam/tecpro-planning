import { io } from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js';

export class SocketClient {
  constructor() {
    this.socket = io();
    this.handlers = {
      onConfig:     [],
      onUpdate:     [],
      onEstados:    [],
      onMqttStatus: [],
    };

    this.socket.on('semaforos:config',  d => this._emit('onConfig',     d));
    this.socket.on('semaforo:update',   d => this._emit('onUpdate',     d));
    this.socket.on('semaforos:estados', d => this._emit('onEstados',    d));
    this.socket.on('mqtt:status',       d => this._emit('onMqttStatus', d));
  }

  on(event, cb) {
    if (this.handlers[event]) this.handlers[event].push(cb);
  }

  _emit(event, data) {
    this.handlers[event].forEach(cb => cb(data));
  }

  /** Envía un comando a un semáforo por su id */
  async publicar(id, payload) {
    const res = await fetch(`/api/semaforos/${id}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(typeof payload === 'string' ? payload : { estado: payload }),
    });
    return res.json();
  }
}