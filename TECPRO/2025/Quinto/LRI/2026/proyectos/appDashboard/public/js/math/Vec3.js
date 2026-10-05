export class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  add(v) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  scale(s) {
    return new Vec3(this.x * s, this.y * s, this.z * s);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  length() {
    return Math.sqrt(this.dot(this));
  }

  normalize() {
    const len = this.length();
    return len === 0 ? new Vec3() : this.scale(1 / len);
  }

  transformMat4(m) {
    const x = this.x, y = this.y, z = this.z;
    const w = m.m[3] * x + m.m[7] * y + m.m[11] * z + m.m[15];
    const invW = w === 0 ? 1 : 1 / w;
    return new Vec3(
      (m.m[0] * x + m.m[4] * y + m.m[8]  * z + m.m[12]) * invW,
      (m.m[1] * x + m.m[5] * y + m.m[9]  * z + m.m[13]) * invW,
      (m.m[2] * x + m.m[6] * y + m.m[10] * z + m.m[14]) * invW
    );
  }

  static add(a, b)   { return a.add(b); }
  static sub(a, b)   { return a.sub(b); }
  static scale(v, s) { return v.scale(s); }
  static cross(a, b) { return a.cross(b); }
  static dot(a, b)   { return a.dot(b); }
}