export class Mat4 {
  constructor() {
    this.m = new Float32Array(16);
    this.identity();
  }

  identity() {
    this.m.fill(0);
    this.m[0] = this.m[5] = this.m[10] = this.m[15] = 1;
    return this;
  }

multiply(b) {
  const a = this.m, bm = b.m, out = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      out[i * 4 + j] =
        a[0 * 4 + j] * bm[i * 4 + 0] +
        a[1 * 4 + j] * bm[i * 4 + 1] +
        a[2 * 4 + j] * bm[i * 4 + 2] +
        a[3 * 4 + j] * bm[i * 4 + 3];
    }
  }
  this.m = out;
  return this;
}

  translate(x, y, z) {
    const t = new Mat4();
    t.m[12] = x;
    t.m[13] = y;
    t.m[14] = z;
    return this.multiply(t);
  }

  rotateX(rad) {
    const c = Math.cos(rad), s = Math.sin(rad);
    const r = new Mat4();
    r.m[5] = c;  r.m[6]  = s;
    r.m[9] = -s; r.m[10] = c;
    return this.multiply(r);
  }

  rotateY(rad) {
    const c = Math.cos(rad), s = Math.sin(rad);
    const r = new Mat4();
    r.m[0]  = c; r.m[2]  = -s;
    r.m[8]  = s; r.m[10] = c;
    return this.multiply(r);
  }

  rotateZ(rad) {
    const c = Math.cos(rad), s = Math.sin(rad);
    const r = new Mat4();
    r.m[0] = c;  r.m[1] = s;
    r.m[4] = -s; r.m[5] = c;
    return this.multiply(r);
  }

  perspective(fov, aspect, near, far) {
    const f  = 1 / Math.tan(fov / 2);
    const nf = 1 / (near - far);
    this.m[0]  = f / aspect;
    this.m[5]  = f;
    this.m[10] = (far + near) * nf;
    this.m[11] = -1;
    this.m[14] = 2 * far * near * nf;
    this.m[15] = 0;
    return this;
  }

  lookAt(eye, center, up) {
    const z = eye.sub(center).normalize();
    const x = up.cross(z).normalize();
    const y = z.cross(x).normalize();

    this.m[0] = x.x; this.m[4] = x.y; this.m[8]  = x.z;
    this.m[1] = y.x; this.m[5] = y.y; this.m[9]  = y.z;
    this.m[2] = z.x; this.m[6] = z.y; this.m[10] = z.z;

    this.m[12] = -x.dot(eye);
    this.m[13] = -y.dot(eye);
    this.m[14] = -z.dot(eye);
    return this;
  }
}