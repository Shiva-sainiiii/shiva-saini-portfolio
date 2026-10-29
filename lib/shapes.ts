// 3D point clouds (position + surface normal) for the ASCII shape renderer. Koi library nahi chahiye — pure math.
// Har shape ~1000-1500 points ka hai, roughly [-1, 1] box me, y upar ki taraf.
export type Pt = [number, number, number, number, number, number]; // x y z nx ny nz
export type ShapeId = "tooth" | "diamond" | "dumbbell" | "cafe" | "house";

const TAU = Math.PI * 2;
const norm = (x: number, y: number, z: number): [number, number, number] => {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
};

// Axis-aligned flat rectangle (u,v grid). axis = normal axis.
function plane(out: Pt[], axis: "x" | "y" | "z", at: number, a0: number, a1: number, b0: number, b1: number, sign: 1 | -1, na: number, nb: number) {
  for (let i = 0; i < na; i++) for (let j = 0; j < nb; j++) {
    const a = a0 + ((i + 0.5) / na) * (a1 - a0), b = b0 + ((j + 0.5) / nb) * (b1 - b0);
    if (axis === "x") out.push([at, a, b, sign, 0, 0]);
    else if (axis === "y") out.push([a, at, b, 0, sign, 0]);
    else out.push([a, b, at, 0, 0, sign]);
  }
}

// Cylinder along x axis (dumbbell): side + two caps
function cylX(out: Pt[], x0: number, x1: number, r: number, nu: number, nv: number) {
  for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
    const x = x0 + ((i + 0.5) / nu) * (x1 - x0), t = ((j + 0.5) / nv) * TAU;
    out.push([x, Math.cos(t) * r, Math.sin(t) * r, 0, Math.cos(t), Math.sin(t)]);
  }
  for (const [x, s] of [[x0, -1], [x1, 1]] as const) {
    for (let i = 1; i <= 4; i++) for (let j = 0; j < i * 6; j++) {
      const rr = (i / 4) * r, t = (j / (i * 6)) * TAU;
      out.push([x, Math.cos(t) * rr, Math.sin(t) * rr, s, 0, 0]);
    }
  }
}

function tooth(): Pt[] {
  const out: Pt[] = [];
  // Crown: rounded superellipsoid, upar halke 2 cusps
  const N = 34, M = 52, e = 0.65; // e < 1 => boxy-round
  const sg = (v: number, p: number) => Math.sign(v) * Math.pow(Math.abs(v), p);
  for (let i = 1; i < N; i++) {
    const th = (i / N) * Math.PI; // 0 top .. PI bottom
    for (let j = 0; j < M; j++) {
      const ph = (j / M) * TAU;
      const cx = sg(Math.sin(th), e) * sg(Math.cos(ph), e), cz = sg(Math.sin(th), e) * sg(Math.sin(ph), e), cy = sg(Math.cos(th), e);
      const x = cx * 0.82, z = cz * 0.7;
      let y = 0.32 + cy * 0.5 + (cy > 0 ? 0.08 * Math.cos(ph * 2) * cy : 0);
      if (y < -0.12) continue; // niche ka hissa roots bante hain
      out.push([x, y, z, ...norm(cx / 0.82, (cy) / 0.5 * 0.8, cz / 0.7)]);
    }
  }
  // Two roots: tapering cones
  for (const rx of [-0.36, 0.36]) {
    for (let i = 0; i < 16; i++) for (let j = 0; j < 20; j++) {
      const t = i / 15, r = 0.3 * (1 - t) + 0.05, a = (j / 20) * TAU;
      const y = -0.1 - t * 1.05;
      out.push([rx * (1 - t * 0.25) + Math.cos(a) * r, y, Math.sin(a) * r * 0.9, ...norm(Math.cos(a), 0.35, Math.sin(a))]);
    }
  }
  return out;
}

function diamond(): Pt[] {
  const out: Pt[] = [];
  const SIDES = 8, step = TAU / SIDES;
  // polygon radius: octagon ki flat sides
  const poly = (a: number) => { const d = ((a % step) + step) % step - step / 2; return Math.cos(step / 2) / Math.cos(d); };
  const T = 0.5, R = 1, yT = 0.55, yG = 0.15, yC = -1; // table radius, girdle radius, y levels
  for (let k = 0; k < SIDES * 6; k++) for (let m = 0; m < 14; m++) {
    const a = ((k + 0.5) / (SIDES * 6)) * TAU, t = (m + 0.5) / 14;
    const fa = (Math.floor(a / step) + 0.5) * step; // facet center => flat shading
    // crown: table -> girdle
    const rc = (T + (R - T) * t) * poly(a), yc = yT + (yG - yT) * t;
    out.push([Math.cos(a) * rc, yc, Math.sin(a) * rc, ...norm(Math.cos(fa) * (yT - yG), R - T, Math.sin(fa) * (yT - yG))]);
    // pavilion: girdle -> culet
    const rp = R * (1 - t) * poly(a), yp = yG + (yC - yG) * t;
    out.push([Math.cos(a) * rp, yp, Math.sin(a) * rp, ...norm(Math.cos(fa) * (yG - yC), -R, Math.sin(fa) * (yG - yC))]);
  }
  // table (top flat)
  for (let i = 1; i <= 5; i++) for (let j = 0; j < i * 8; j++) {
    const a = (j / (i * 8)) * TAU, r = (i / 5) * T * poly(a);
    out.push([Math.cos(a) * r, yT, Math.sin(a) * r, 0, 1, 0]);
  }
  return out;
}

function dumbbell(): Pt[] {
  const out: Pt[] = [];
  cylX(out, -0.9, 0.9, 0.11, 22, 14);                    // handle
  for (const s of [-1, 1]) {
    cylX(out, s * 0.78 - 0.09, s * 0.78 + 0.09, 0.62, 3, 40); // bada plate
    cylX(out, s * 1.0 - 0.07, s * 1.0 + 0.07, 0.46, 3, 32);   // chhota plate
  }
  return out.map((p) => [p[0] * 0.85, p[1] * 0.85, p[2] * 0.85, p[3], p[4], p[5]] as Pt);
}

function cafe(): Pt[] {
  const out: Pt[] = [];
  // Cup body: surface of revolution
  for (let i = 0; i < 18; i++) for (let j = 0; j < 40; j++) {
    const t = i / 17, a = (j / 40) * TAU, r = 0.55 + 0.25 * t, y = -0.45 + t * 0.95;
    out.push([Math.cos(a) * r, y, Math.sin(a) * r, ...norm(Math.cos(a), -0.2, Math.sin(a))]);
  }
  // Coffee surface
  for (let i = 1; i <= 5; i++) for (let j = 0; j < i * 8; j++) {
    const a = (j / (i * 8)) * TAU, r = (i / 5) * 0.74;
    out.push([Math.cos(a) * r, 0.4, Math.sin(a) * r, 0, 1, 0]);
  }
  // Saucer
  for (let i = 1; i <= 7; i++) for (let j = 0; j < i * 8; j++) {
    const a = (j / (i * 8)) * TAU, r = (i / 7) * 1.05;
    out.push([Math.cos(a) * r, -0.52, Math.sin(a) * r, 0, 1, 0]);
  }
  // Handle: torus ka aadha hissa, +x side
  for (let i = 0; i < 20; i++) for (let j = 0; j < 10; j++) {
    const u = -Math.PI * 0.55 + (i / 19) * Math.PI * 1.1, v = (j / 10) * TAU;
    const R = 0.28, r = 0.07;
    const cx = 0.78 + Math.cos(u) * R, cy = 0.05 + Math.sin(u) * R;
    out.push([cx + Math.cos(u) * Math.cos(v) * r, cy + Math.sin(u) * Math.cos(v) * r, Math.sin(v) * r, ...norm(Math.cos(u) * Math.cos(v), Math.sin(u) * Math.cos(v), Math.sin(v))]);
  }
  return out;
}

function house(): Pt[] {
  const out: Pt[] = [];
  const w = 0.85, d = 0.7, h0 = -0.7, h1 = 0.15, roof = 0.85;
  plane(out, "z", d, -w, w, h0, h1, 1, 22, 12);   // front
  plane(out, "z", -d, -w, w, h0, h1, -1, 22, 12); // back
  plane(out, "x", w, h0, h1, -d, d, 1, 12, 18);   // right
  plane(out, "x", -w, h0, h1, -d, d, -1, 12, 18); // left
  // Roof: do slanted planes (ridge z-axis ke saath nahi, x-axis ke saath)
  const rn = norm(0, 1, 0.9);
  for (let i = 0; i < 24; i++) for (let j = 0; j < 14; j++) {
    const x = -w - 0.1 + ((i + 0.5) / 24) * (w * 2 + 0.2), t = (j + 0.5) / 14;
    out.push([x, h1 + (roof - h1) * (1 - t), (d + 0.1) * t, ...rn]);
    out.push([x, h1 + (roof - h1) * (1 - t), -(d + 0.1) * t, rn[0], rn[1], -rn[2]]);
  }
  // Gable triangles (left/right)
  for (const s of [-1, 1]) for (let i = 0; i < 10; i++) for (let j = 0; j < 12; j++) {
    const t = (i + 0.5) / 10, zz = (-d + (j + 0.5) / 12 * d * 2) * (1 - t);
    out.push([s * w, h1 + (roof - h1) * t, zz, s, 0, 0]);
  }
  // Darwaza (front pe halka bump jo alag shade pakadta hai)
  plane(out, "z", d + 0.04, -0.17, 0.17, h0, -0.2, 1, 6, 8);
  return out;
}

const CACHE: Partial<Record<ShapeId, Pt[]>> = {};
const MAKERS: Record<ShapeId, () => Pt[]> = { tooth, diamond, dumbbell, cafe, house };
export const getShape = (id: ShapeId): Pt[] => (CACHE[id] ??= MAKERS[id]());
