import { Vec3 } from '../math/Vec3.js';

// Dirección de luz global (misma que en Semaforo.js) para sombrear las paredes del lente
const LIGHT_DIR = new Vec3(-0.5, 0.9, 0.7).normalize();

function shade(color, b) {
  return [
    Math.min(255, Math.max(0, Math.round(color[0] * b))),
    Math.min(255, Math.max(0, Math.round(color[1] * b))),
    Math.min(255, Math.max(0, Math.round(color[2] * b)))
  ];
}

export class Luz {
  constructor(y, colorOn, colorOff, radius = 0.25, z = 0.4) {
    this.y        = y;
    this.colorOn  = colorOn;
    this.colorOff = colorOff;
    this.on       = false;
    this.radius   = radius;
    this.z        = z;

    // 👇 parámetros de extrusión (ajustables)
    this.depth      = 0.14;   // cuánto sobresale el lente del cuerpo
    this.domeHeight = 0.05;   // cuánto se eleva el centro (efecto domo)
  }

  getFaces(basePos) {
    const faces = [];
    const r   = this.radius;
    const seg = 24;

    const cx = basePos.x;
    const cy = basePos.y + this.y;
    const cz = basePos.z + this.z;

    const color = this.on ? this.colorOn : this.colorOff;

    // ─── 1) CARCASA: anillo metálico oscuro pegado al cuerpo ───
    const innerR = r * 1.02;
    const outerR = r * 1.35;
    for (let i = 0; i < seg; i++) {
      const a1 = (i / seg) * Math.PI * 2;
      const a2 = ((i + 1) / seg) * Math.PI * 2;
      faces.push({
        vertices: [
          new Vec3(cx + innerR * Math.cos(a1), cy + innerR * Math.sin(a1), cz - 0.02),
          new Vec3(cx + outerR * Math.cos(a1), cy + outerR * Math.sin(a1), cz - 0.02),
          new Vec3(cx + outerR * Math.cos(a2), cy + outerR * Math.sin(a2), cz - 0.02),
          new Vec3(cx + innerR * Math.cos(a2), cy + innerR * Math.sin(a2), cz - 0.02)
        ],
        color: [45, 45, 50],
        alpha: 1, stroke: false
      });
    }

    // ─── 2) PARED LATERAL: extrusión del lente ────────────────
    const z0 = cz + 0.00;
    const z1 = cz + this.depth;

    for (let i = 0; i < seg; i++) {
      const a1 = (i / seg) * Math.PI * 2;
      const a2 = ((i + 1) / seg) * Math.PI * 2;

      // Normal lateral aproximada (apunta hacia afuera del cilindro)
      const nx = Math.cos((a1 + a2) / 2);
      const ny = Math.sin((a1 + a2) / 2);
      const dot = Math.max(0, nx * LIGHT_DIR.x + ny * LIGHT_DIR.y);
      const brightness = 0.55 + 0.55 * dot;

      // El vidrio lateral es más oscuro que la cara frontal
      const wallBase = [
        Math.max(20, color[0] * 0.45),
        Math.max(20, color[1] * 0.45),
        Math.max(20, color[2] * 0.45)
      ];

      faces.push({
        vertices: [
          new Vec3(cx + r * Math.cos(a1), cy + r * Math.sin(a1), z0),
          new Vec3(cx + r * Math.cos(a2), cy + r * Math.sin(a2), z0),
          new Vec3(cx + r * Math.cos(a2), cy + r * Math.sin(a2), z1),
          new Vec3(cx + r * Math.cos(a1), cy + r * Math.sin(a1), z1)
        ],
        color: shade(wallBase, brightness),
        alpha: 1, stroke: false
      });
    }

    // ─── 3) FRENTE: domo suave con 2 anillos concéntricos ─────
    const rIn1 = r * 0.55;
    const zMid = z1 + this.domeHeight * 0.55;
    const zTop = z1 + this.domeHeight;

    // Anillo exterior → anillo interior (pendiente del domo)
    for (let i = 0; i < seg; i++) {
      const a1 = (i / seg) * Math.PI * 2;
      const a2 = ((i + 1) / seg) * Math.PI * 2;
      faces.push({
        vertices: [
          new Vec3(cx + r    * Math.cos(a1), cy + r    * Math.sin(a1), z1),
          new Vec3(cx + r    * Math.cos(a2), cy + r    * Math.sin(a2), z1),
          new Vec3(cx + rIn1 * Math.cos(a2), cy + rIn1 * Math.sin(a2), zMid),
          new Vec3(cx + rIn1 * Math.cos(a1), cy + rIn1 * Math.sin(a1), zMid)
        ],
        color: color,
        alpha: 1, stroke: false
      });
    }

    // Disco central del domo
    const centerVerts = [];
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      centerVerts.push(new Vec3(
        cx + rIn1 * Math.cos(a),
        cy + rIn1 * Math.sin(a),
        zTop
      ));
    }
    faces.push({
      vertices: centerVerts,
      color: color,
      alpha: 1, stroke: false
    });

    // ─── 4) GLOW + HIGHLIGHT si está encendida ────────────────
    if (this.on) {
      // Halo difuso por delante del domo
      const glowR = r * 2.2;
      const glowZ = zTop + 0.12;
      const glowVerts = [];
      for (let i = 0; i < seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        glowVerts.push(new Vec3(
          cx + glowR * Math.cos(a),
          cy + glowR * Math.sin(a),
          glowZ
        ));
      }
      faces.push({
        vertices: glowVerts,
        color: this.colorOn,
        alpha: 0.16, stroke: false
      });

      // Highlight (brillo puntual arriba a la izquierda)
      const hlR = r * 0.35;
      const hlZ = zTop + 0.02;
      const hlCX = cx - r * 0.15;
      const hlCY = cy + r * 0.22;
      const hlVerts = [];
      for (let i = 0; i < seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        hlVerts.push(new Vec3(
          hlCX + hlR * Math.cos(a),
          hlCY + hlR * Math.sin(a),
          hlZ
        ));
      }
      faces.push({
        vertices: hlVerts,
        color: [
          Math.min(255, color[0] + 120),
          Math.min(255, color[1] + 120),
          Math.min(255, color[2] + 120)
        ],
        alpha: 0.7, stroke: false
      });
    }

    return faces;
  }
}