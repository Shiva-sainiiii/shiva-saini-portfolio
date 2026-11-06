import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Hero 3D: "Deal with it" glasses upar se girte hain (bounce), sone ki chain jhoolti hai.
// Models: public/models/glasses.glb (pixel/voxel glasses) + public/models/chain.glb (chain ka sirf ek aadha arc hai).
//   Chain ko flip + mirror karke poora U bana rakha hai (neeche). Glasses ka front GLB me -X pe hai, isliye Y me +90deg ghumaya.
// Tweak yahan: FOV, glasses/chain ka size aur jagah `layout()` me, bounce/sway `frame()` me.
const FOV = 35, DIST = 10;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const bounceOut = (x: number) => {
  const n = 7.5625, d = 2.75;
  if (x < 1 / d) return n * x * x;
  if (x < 2 / d) { x -= 1.5 / d; return n * x * x + 0.75; }
  if (x < 2.5 / d) { x -= 2.25 / d; return n * x * x + 0.9375; }
  x -= 2.625 / d; return n * x * x + 0.984375;
};

export type HeroScene = {
  play: () => void;                            // glasses drop shuru
  setProgress: (p: number) => void;            // hero scroll progress 0..1
  setPointer: (x: number, y: number) => void;  // -1..1
  setActive: (on: boolean) => void;            // offscreen hone par render band
  dispose: () => void;
};

export function createHeroScene(canvas: HTMLCanvasElement, o: { onReady?: () => void; onFail?: () => void }): HeroScene {
  const mobile = () => matchMedia("(max-width: 767px)").matches;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch { o.onFail?.(); return { play() {}, setProgress() {}, setPointer() {}, setActive() {}, dispose() {} }; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile() ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  const key = new THREE.DirectionalLight(0xffe2a0, 2.2); key.position.set(-4, 6, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffc21a, 1.6); rim.position.set(5, 2, -4); scene.add(rim);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, DIST);

  // glasses rig
  const glasses = new THREE.Group(); glasses.visible = false; scene.add(glasses);
  const glassesInner = new THREE.Group(); glasses.add(glassesInner);

  // chain rig (do halves = U). chain = pivot (screen ke upar), chainBody = U neeche latakta hai
  const chain = new THREE.Group(); scene.add(chain);
  const chainBody = new THREE.Group(); chain.add(chainBody);
  let chainRawW = 1, chainRawH = 1;

  let ready = 0, disposed = false;
  const done = () => { if (++ready === 2 && !disposed) { layout(); o.onReady?.(); } };
  const loader = new GLTFLoader();

  loader.load("/models/glasses.glb", (g) => {
    if (disposed) return;
    const m = g.scene;
    const b = new THREE.Box3().setFromObject(m), c = b.getCenter(new THREE.Vector3()), s = b.getSize(new THREE.Vector3());
    m.position.sub(c);
    const holder = new THREE.Group(); holder.add(m);
    holder.rotation.y = Math.PI / 2; // front (-X) ko camera (+Z) ki taraf
    glassesInner.add(holder);
    glassesInner.userData.w = Math.max(s.z, 0.001); // rotation ke baad width = z-extent
    done();
  }, undefined, () => { if (!disposed) o.onFail?.(); });

  loader.load("/models/chain.glb", (g) => {
    if (disposed) return;
    const src = g.scene;
    const b = new THREE.Box3().setFromObject(src);
    // arc ka flat chhor (min x, max y) = U ka sabse neecha point; wahin se mirror
    const P = new THREE.Vector3(b.min.x, b.max.y, (b.min.z + b.max.z) / 2);
    chainRawW = (b.max.x - b.min.x) * 2; chainRawH = b.max.y - b.min.y;
    const mk = (mirror: boolean) => {
      const half = new THREE.Group();
      const m = src.clone(true);
      m.position.sub(P);
      half.add(m);
      half.scale.set(mirror ? -1 : 1, -1, -1); // y flip (U), z flip (ends piche), x mirror (doosra aadha)
      return half;
    };
    chainBody.add(mk(false), mk(true));
    done();
  }, undefined, () => { if (!disposed) o.onFail?.(); });

  // layout: viewport ke hisaab se size/jagah
  const L = { visW: 1, visH: 1, gx: 0, gy: 0, gw: 1, cx: 0, cy: 0, cw: 1 };
  function layout() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    L.visH = 2 * Math.tan((FOV * Math.PI) / 360) * DIST; L.visW = L.visH * camera.aspect;
    const wide = camera.aspect > 1;
    L.gw = wide ? Math.min(L.visW * 0.34, 4.6) : L.visW * 0.72;
    L.gx = wide ? L.visW * 0.26 : 0;
    L.gy = wide ? -L.visH * 0.1 : -L.visH * 0.1;
    L.cw = wide ? L.visW * 0.6 : L.visW * 0.95;
    L.cx = wide ? -L.visW * 0.12 : 0;
    L.cy = L.visH / 2 + 0.1; // U ke dono chhor screen ke top edge pe, beech neeche latakta hai
    glassesInner.scale.setScalar(L.gw / (glassesInner.userData.w || 1));
    const cs = L.cw / chainRawW;
    chainBody.scale.setScalar(cs);
    chainBody.position.y = -chainRawH * cs; // U ka upar wala level pivot pe (sway wahin se)
    chain.position.set(L.cx, L.cy, 0);
  }
  const ro = new ResizeObserver(layout); ro.observe(canvas);

  let p = 0, pv = 0, lastP = 0, px = 0, py = 0, sx = 0, sy = 0, dropAt = -1, active = true, raf = 0;
  const t0 = performance.now();
  const frame = () => {
    raf = 0;
    if (!active || disposed) return;
    const t = (performance.now() - t0) / 1000;
    sx += (px - sx) * 0.06; sy += (py - sy) * 0.06;
    pv += ((p - lastP) * 60 - pv) * 0.1; lastP = p; // scroll velocity (smoothed)

    if (dropAt >= 0) {
      glasses.visible = true;
      const k = clamp((t - dropAt) / 1.3);
      const fall = (1 - bounceOut(k)) * L.visH * 0.9;
      const land = t - (dropAt + 0.55), wob = land > 0 ? Math.exp(-land * 2.4) * Math.sin(land * 9) * 0.12 : 0;
      glasses.position.set(L.gx + sx * 0.25, L.gy - p * L.visH * 0.12 + fall, 0);
      glasses.rotation.set(0.1 - sy * 0.12 + p * 0.2, -0.28 + sx * 0.4 + p * 2.4, -0.1 + wob + sx * 0.05);
      glasses.scale.setScalar(1 + p * 0.3);
    }
    const hit = dropAt >= 0 ? t - (dropAt + 0.55) : -1;
    const impact = hit > 0 ? Math.exp(-hit * 1.8) * Math.sin(hit * 7) * 0.16 : 0;
    chain.rotation.z = Math.sin(t * 1.1) * 0.035 + sx * 0.1 + impact + pv * 0.02;
    chain.rotation.y = Math.sin(t * 0.7) * 0.15 + sx * 0.25;
    chain.position.y = L.cy - p * L.visH * 0.15;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && active && !disposed) raf = requestAnimationFrame(frame); };
  kick();

  return {
    play: () => { if (dropAt < 0) dropAt = (performance.now() - t0) / 1000 + 0.15; },
    setProgress: (v) => { p = clamp(v); },
    setPointer: (x, y) => { px = x; py = y; },
    setActive: (on) => { active = on; if (on) kick(); },
    dispose: () => {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect();
      scene.traverse((ob) => {
        const m = ob as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => {
          Object.values(x).forEach((v) => { if (v && (v as THREE.Texture).isTexture) (v as THREE.Texture).dispose(); });
          x.dispose();
        });
      });
      envTex.dispose(); pmrem.dispose(); renderer.dispose();
    },
  };
}
