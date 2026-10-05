import { Vec3 } from '../math/Vec3.js';
import { Luz }  from './Luz.js';

// ─── Helpers de iluminación ─────────────────────────────────────────
const LIGHT_DIR = new Vec3(-0.5, 0.9, 0.7).normalize();

function shade(color, brightness) {
  return [
    Math.min(255, Math.max(0, Math.round(color[0] * brightness))),
    Math.min(255, Math.max(0, Math.round(color[1] * brightness))),
    Math.min(255, Math.max(0, Math.round(color[2] * brightness)))
  ];
}

function faceNormal(v) {
  let nx = 0, ny = 0, nz = 0;
  const n = v.length;
  for (let i = 0; i < n; i++) {
    const a = v[i], b = v[(i + 1) % n];
    nx += (a.y - b.y) * (a.z + b.z);
    ny += (a.z - b.z) * (a.x + b.x);
    nz += (a.x - b.x) * (a.y + b.y);
  }
  const len = Math.hypot(nx, ny, nz) || 1;
  return new Vec3(nx / len, ny / len, nz / len);
}

function shadedColor(vertices, baseColor, minB = 0.4, maxB = 1.0) {
  const n = faceNormal(vertices);
  const d = Math.max(0, n.dot(LIGHT_DIR));
  const b = minB + (maxB - minB) * d;
  return shade(baseColor, b);
}

// ─── Semáforo ───────────────────────────────────────────────────────
export class Semaforo {
  constructor(id, position = new Vec3()) {
    this.id       = id;
    this.position = position;
    this.estado   = 'apagado';

    this.parpadeo         = false;
    this.parpadeoTime     = 0;
    this.parpadeoInterval = 0.5;
    this.parpadeoOn       = false;

    // Dimensiones del cuerpo
    this.radius      = 0.42;
    this.height      = 3.0;
    this.lightRadius = 0.24;
    this.lightZ      = 0.42;   // a la altura del frente del cuerpo
    this.lightY      = [1.0, 0, -1.0];

    // Colores base
    this.bodyColor = [100, 105, 115];   // gris azulado
    this.darkColor = [ 55,  58,  65];   // gris oscuro (viseras)

    this.luces = {
      rojo:     new Luz(this.lightY[0], [255,  70,  70], [70, 22, 22], this.lightRadius, this.lightZ),
      amarillo: new Luz(this.lightY[1], [255, 225,  80], [70, 60, 22], this.lightRadius, this.lightZ),
      verde:    new Luz(this.lightY[2], [ 80, 255, 130], [22, 70, 32], this.lightRadius, this.lightZ)
    };
  }

  setEstado(estado) {
    this.estado   = estado;
    this.parpadeo = false;

    Object.values(this.luces).forEach(l => l.on = false);

    switch (estado) {
      case 'rojo':     this.luces.rojo.on = true; break;
      case 'amarillo': this.luces.amarillo.on = true; break;
      case 'verde':    this.luces.verde.on = true; break;
      case 'apagado':  break;

      case 'parpadeo_amarillo':
      case 'intermitente':
        this.parpadeo     = true;
        this.parpadeoTime = 0;
        this.parpadeoOn   = true;
        this.luces.amarillo.on = true;
        break;

      case 'parpadeo_rojo':
        this.parpadeo     = true;
        this.parpadeoTime = 0;
        this.parpadeoOn   = true;
        this.luces.rojo.on = true;
        break;

      default:
        if (this.luces[estado]) this.luces[estado].on = true;
    }
  }

  update(dt) {
    if (!this.parpadeo) return;
    this.parpadeoTime += dt;
    if (this.parpadeoTime >= this.parpadeoInterval) {
      this.parpadeoTime -= this.parpadeoInterval;
      this.parpadeoOn    = !this.parpadeoOn;
      if (this.estado === 'parpadeo_amarillo' || this.estado === 'intermitente') {
        this.luces.amarillo.on = this.parpadeoOn;
      } else if (this.estado === 'parpadeo_rojo') {
        this.luces.rojo.on = this.parpadeoOn;
      }
    }
  }

  getFaces() {
    const faces = [];
    const pos   = this.position;
    const R     = this.radius;
    const seg   = 24;                  // 👈 antes 12
    const yTop  =  this.height / 2;
    const yBot  = -this.height / 2;

    // ─── CUERPO: cilindro suave con sombreado ───────────────────
    for (let i = 0; i < seg; i++) {
      const a1 = (i / seg) * Math.PI * 2;
      const a2 = ((i + 1) / seg) * Math.PI * 2;
      const quad = [
        new Vec3(pos.x + R * Math.cos(a1), pos.y + yBot, pos.z + R * Math.sin(a1)),
        new Vec3(pos.x + R * Math.cos(a2), pos.y + yBot, pos.z + R * Math.sin(a2)),
        new Vec3(pos.x + R * Math.cos(a2), pos.y + yTop, pos.z + R * Math.sin(a2)),
        new Vec3(pos.x + R * Math.cos(a1), pos.y + yTop, pos.z + R * Math.sin(a1))
      ];
      faces.push({
        vertices: quad,
        color: shadedColor(quad, this.bodyColor, 0.35, 1.0),
        alpha: 1, stroke: false
      });
    }

    // ─── TAPA INFERIOR ─────────────────────────────────────────
    const bottomVerts = [];
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      bottomVerts.push(new Vec3(
        pos.x + R * Math.cos(a),
        pos.y + yBot,
        pos.z + R * Math.sin(a)
      ));
    }
    faces.push({
      vertices: bottomVerts,
      color: shade(this.bodyColor, 0.35),
      alpha: 1, stroke: false
    });

    // ─── CÚPULA SUPERIOR (3 anillos) ───────────────────────────
    const domeH = 0.16;
    const rings = 3;
    for (let r = 0; r < rings; r++) {
      const t1 = r / rings;
      const t2 = (r + 1) / rings;
      const rr1 = R * Math.cos(t1 * Math.PI / 2);
      const rr2 = R * Math.cos(t2 * Math.PI / 2);
      const yy1 = yTop + domeH * Math.sin(t1 * Math.PI / 2);
      const yy2 = yTop + domeH * Math.sin(t2 * Math.PI / 2);

      for (let i = 0; i < seg; i++) {
        const a1 = (i / seg) * Math.PI * 2;
        const a2 = ((i + 1) / seg) * Math.PI * 2;
        const quad = [
          new Vec3(pos.x + rr1 * Math.cos(a1), pos.y + yy1, pos.z + rr1 * Math.sin(a1)),
          new Vec3(pos.x + rr1 * Math.cos(a2), pos.y + yy1, pos.z + rr1 * Math.sin(a2)),
          new Vec3(pos.x + rr2 * Math.cos(a2), pos.y + yy2, pos.z + rr2 * Math.sin(a2)),
          new Vec3(pos.x + rr2 * Math.cos(a1), pos.y + yy2, pos.z + rr2 * Math.sin(a1))
        ];
        faces.push({
          vertices: quad,
          color: shadedColor(quad, this.bodyColor, 0.5, 1.15),
          alpha: 1, stroke: false
        });
      }
    }
    // Pequeño disco en la cima del domo
    const capVerts = [];
    const rTop = 0.02;
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      capVerts.push(new Vec3(
        pos.x + rTop * Math.cos(a),
        pos.y + yTop + domeH,
        pos.z + rTop * Math.sin(a)
      ));
    }
    faces.push({
      vertices: capVerts,
      color: shade(this.bodyColor, 1.15),
      alpha: 1, stroke: false
    });

    // ─── VISERAS sobre cada luz ───────────────────────────────
    for (const luz of Object.values(this.luces)) {
      faces.push(...this._visor(pos, luz.y));
    }

    // ─── LUCES (delegadas a Luz.js) ───────────────────────────
    for (const luz of Object.values(this.luces)) {
      faces.push(...luz.getFaces(pos));
    }

    return faces;
  }

  /** Visera semicircular sobre una luz */
  _visor(pos, lightY) {
    const faces = [];
    const segs   = 12;
    const rBase  = this.lightRadius * 1.4;
    const rFront = this.lightRadius * 1.55;
    const zBase  = pos.z + this.lightZ + 0.02;
    const zFront = pos.z + this.lightZ + 0.34;

    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * Math.PI;
      const a2 = ((i + 1) / segs) * Math.PI;

      const c1 = Math.cos(a1), s1 = Math.sin(a1);
      const c2 = Math.cos(a2), s2 = Math.sin(a2);

      const b1 = new Vec3(pos.x + rBase  * c1, pos.y + lightY + rBase  * s1, zBase);
      const b2 = new Vec3(pos.x + rBase  * c2, pos.y + lightY + rBase  * s2, zBase);
      const f1 = new Vec3(pos.x + rFront * c1, pos.y + lightY + rFront * s1, zFront);
      const f2 = new Vec3(pos.x + rFront * c2, pos.y + lightY + rFront * s2, zFront);

      // Superficie exterior del visor
      const quad = [b1, b2, f2, f1];
      faces.push({
        vertices: quad,
        color: shadedColor(quad, this.darkColor, 0.3, 0.9),
        alpha: 1, stroke: false
      });

      // Labio frontal (tira delgada en el borde delantero)
      const lipWidth = 0.025;
      const l1 = new Vec3(pos.x + (rFront - lipWidth) * c1,
                          pos.y + lightY + (rFront - lipWidth) * s1, zFront);
      const l2 = new Vec3(pos.x + (rFront - lipWidth) * c2,
                          pos.y + lightY + (rFront - lipWidth) * s2, zFront);
      const lipQuad = [f1, f2, l2, l1];
      faces.push({
        vertices: lipQuad,
        color: shadedColor(lipQuad, this.bodyColor, 0.6, 1.05),
        alpha: 1, stroke: false
      });
    }

    return faces;
  }
}