import { Vec3 } from '../math/Vec3.js';
import { Mat4 } from '../math/Mat4.js';

const VERSION = 'v3-' + Date.now();   // 👈 cambia cada vez que recargas

export class Renderer {
  constructor(canvas) {
    console.log('🚦 Renderer ' + VERSION + ' cargado');

    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.width  = 0;
    this.height = 0;
    this.dpr    = window.devicePixelRatio || 1;

    // Cámara orbital
    this.camYaw    = 0.5;
    this.camPitch  = 0.35;
    this.camDist   = 60;        // 👈 arranca lejos
    this.camTarget = new Vec3(0, 0, 0);

    this.minDist = 3;
    this.maxDist = 300;

    this.dragging = false;
    this.lastX    = 0;
    this.lastY    = 0;

    this.touchMode     = null;
    this.lastPinchDist = 0;
    this.lastTouchX    = 0;
    this.lastTouchY    = 0;

    this._initEvents();
    this.resize();

    // Debug visible en consola
    console.log('📷 camDist inicial =', this.camDist);
  }

  resize() {
    this.width  = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width  = this.width  * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width  = this.width  + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  _initEvents() {
    window.addEventListener('resize', () => this.resize());

    // ─── MOUSE: rotar ─────────────────────────────────────────────
    this.canvas.addEventListener('mousedown', (e) => {
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      this.camYaw   -= dx * 0.01;
      this.camPitch -= dy * 0.01;
      this.camPitch = Math.max(-Math.PI / 2 + 0.1,
                       Math.min( Math.PI / 2 - 0.1, this.camPitch));
    });

    window.addEventListener('mouseup', () => {
      this.dragging = false;
    });

    // ─── RUEDA: zoom PROPORCIONAL ─────────────────────────────────
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();

      // Si deltaY > 0 (rueda hacia abajo) → alejarse
      // Si deltaY < 0 (rueda hacia arriba) → acercarse
      const factor = e.deltaY > 0 ? 1.15 : 0.87;

      this.camDist = Math.max(
        this.minDist,
        Math.min(this.maxDist, this.camDist * factor)
      );

      console.log('🔍 camDist =', this.camDist.toFixed(2));
    }, { passive: false });

    // ─── TÁCTIL ───────────────────────────────────────────────────
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.touchMode  = 'rotate';
        this.lastTouchX = e.touches[0].clientX;
        this.lastTouchY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        this.touchMode     = 'pinch';
        this.lastPinchDist = this._touchDistance(e.touches);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (this.touchMode === 'rotate' && e.touches.length === 1) {
        const t  = e.touches[0];
        const dx = t.clientX - this.lastTouchX;
        const dy = t.clientY - this.lastTouchY;
        this.lastTouchX = t.clientX;
        this.lastTouchY = t.clientY;

        this.camYaw   -= dx * 0.01;
        this.camPitch -= dy * 0.01;
        this.camPitch = Math.max(-Math.PI / 2 + 0.1,
                         Math.min( Math.PI / 2 - 0.1, this.camPitch));
      } else if (this.touchMode === 'pinch' && e.touches.length === 2) {
        e.preventDefault();
        const d     = this._touchDistance(e.touches);
        const ratio = this.lastPinchDist / d;
        this.camDist = Math.max(
          this.minDist,
          Math.min(this.maxDist, this.camDist * ratio)
        );
        this.lastPinchDist = d;
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        this.touchMode = null;
      } else if (e.touches.length === 1) {
        this.touchMode  = 'rotate';
        this.lastTouchX = e.touches[0].clientX;
        this.lastTouchY = e.touches[0].clientY;
      }
    });
  }

  _touchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  update(dt) { /* no-op */ }

  getViewMatrix() {
    const eye = new Vec3(
      this.camTarget.x + this.camDist * Math.cos(this.camPitch) * Math.sin(this.camYaw),
      this.camTarget.y + this.camDist * Math.sin(this.camPitch),
      this.camTarget.z + this.camDist * Math.cos(this.camPitch) * Math.cos(this.camYaw)
    );
    const up = new Vec3(0, 1, 0);
    return new Mat4().lookAt(eye, this.camTarget, up);
  }

  getProjectionMatrix() {
    const aspect = this.width / this.height;
    const fov    = Math.PI / 4;
    const near   = 0.1;
    const far    = 1000;
    return new Mat4().perspective(fov, aspect, near, far);
  }

  render(objects) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const grad = ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, '#0b0f14');
    grad.addColorStop(1, '#1a222c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.width, this.height);

    const view     = this.getViewMatrix();
    const proj     = this.getProjectionMatrix();
    const viewProj = proj.multiply(view);

    const faces = [];
    for (const obj of objects) {
      if (obj.getFaces) faces.push(...obj.getFaces());
    }

    const projectedFaces = [];
    for (const face of faces) {
      let center = new Vec3();
      for (const v of face.vertices) center = center.add(v);
      center = center.scale(1 / face.vertices.length);

      const camCenter = center.transformMat4(view);
      if (camCenter.z > 0) continue;

      const dist      = -camCenter.z;
      const projVerts = face.vertices.map(v => v.transformMat4(viewProj));
      projectedFaces.push({ ...face, projected: projVerts, dist });
    }

    projectedFaces.sort((a, b) => b.dist - a.dist);

    for (const face of projectedFaces) {
      const verts = face.projected;
      if (verts.length < 3) continue;

      ctx.beginPath();
      const toScreen = (p) => ({
        x: ( p.x * 0.5 + 0.5) * this.width,
        y: (-p.y * 0.5 + 0.5) * this.height
      });

      const first = toScreen(verts[0]);
      ctx.moveTo(first.x, first.y);
      for (let i = 1; i < verts.length; i++) {
        const s = toScreen(verts[i]);
        ctx.lineTo(s.x, s.y);
      }
      ctx.closePath();

      ctx.globalAlpha = face.alpha !== undefined ? face.alpha : 1;
      ctx.fillStyle = `rgb(${face.color[0]},${face.color[1]},${face.color[2]})`;
      ctx.fill();

      if (face.stroke) {
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }
  }
}