import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { readAccent } from "@/lib/ascii";

// 3D laptop: scroll progress ke saath camera door se laptop ki SCREEN ke andar zoom hoti hai.
// Model: public/models/laptop.glb  ("Laptop (FREE)" by Brandon Westlake, Sketchfab — credit footer me hai).
//   Original GLB 13 MB tha (4K PNG textures); yahan 1024px JPEG me compress hai (~0.6 MB). Model me alag "screen" mesh nahi tha,
//   isliye LID/SCREEN ke numbers model ki geometry se naapkar (lid plane fit) nikaale hain aur screen ek alag plane hai jispe terminal canvas lagta hai.
//   Model me ek faltu floating panel (Cube.000) bhi tha, wo load ke baad hata diya jaata hai.
// Tweak yahan: FOV, START_FRAC (shuru me laptop screen ki kitni width le), SCREEN (screen ka rect, lid ke fraction me).
const MODEL = "/models/laptop.glb";
const FOV = 35;
const SCREEN = { w: 0.945, h: 0.855, up: 0.048, lift: 2.6 }; // lid width/height ke fraction, lift = lid se bahar (units)

// Lid ka frame (GLB scene space me)
const R = new THREE.Vector3(0.9171556, 0.0014282, -0.3985266);   // lid ki width direction
const U = new THREE.Vector3(-0.0969813, 0.9707326, -0.2197108);  // lid ka "upar"
const N = new THREE.Vector3(0.386549, 0.2401586, 0.8904514);     // lid ke screen wali side ki normal (viewer ki taraf)
const LID_TOP = new THREE.Vector3(-127.7749, 130.7055, -35.4252); // lid ke upar ke edge ka beech
const LID_W = 217.3, LID_H = (LID_W * 140) / 220;
const LID_CENTER = LID_TOP.clone().addScaledVector(U, -LID_H / 2);
const SCR_W = LID_W * SCREEN.w, SCR_H = LID_H * SCREEN.h;
const SCR_CENTER = LID_CENTER.clone().addScaledVector(U, LID_H * SCREEN.up).addScaledVector(N, SCREEN.lift);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);

export type SceneOpts = {
  host: HTMLElement;
  /** 2D canvas jo laptop ki screen par texture banta hai */
  screen: HTMLCanvasElement;
  /** screen canvas ko redraw karo. T = begin() se seconds, p = smoothed scroll progress */
  draw: (T: number, p: number) => void;
  /** har frame par (smoothed progress, now ms) */
  onFrame?: (p: number, now: number) => void;
  onReady?: () => void;
  /** GLB load fail */
  onFail?: () => void;
};

export type LaptopScene = {
  setTarget: (p: number) => void;
  setPointer: (x: number, y: number) => void;
  /** typing animation / screen-on ka T=0 yahan se */
  begin: () => void;
  start: () => void;
  stop: () => void;
  resize: () => void;
  dispose: () => void;
};

export function createLaptopScene(o: SceneOpts): LaptopScene | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch { return null; } // WebGL nahi => caller fallback dikhayega

  const mobile = () => innerWidth < 768;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile() ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const el = renderer.domElement;
  el.style.cssText = "width:100%;height:100%;display:block";
  o.host.appendChild(el);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(FOV, 1, 5, 6000);

  // ---- Lights: env reflections (kaali body pe highlights) + accent rim lights + screen ka glow
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.6;
  const acc0 = readAccent();
  const accCol = new THREE.Color(`rgb(${acc0.join(",")})`);
  const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(120, 420, 380); scene.add(key);
  const rimA = new THREE.DirectionalLight(accCol, 3.2); rimA.position.set(-380, 160, -260); scene.add(rimA);
  const rimB = new THREE.DirectionalLight(0xd8ff3a, 1.6); rimB.position.set(380, 90, -220); scene.add(rimB);
  const glow = new THREE.PointLight(accCol, 0, 700, 1.6);
  glow.position.copy(SCR_CENTER).addScaledVector(N, 55); scene.add(glow);

  // ---- Screen (terminal canvas texture)
  const tex = new THREE.CanvasTexture(o.screen);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(SCR_W, SCR_H), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
  screenMesh.matrixAutoUpdate = false;
  screenMesh.matrix.makeBasis(R, U, N).setPosition(SCR_CENTER);

  // ---- Ground: accent grid + glow (laptop ke neeche, hover feel)
  const floorCv = document.createElement("canvas"); floorCv.width = floorCv.height = 512;
  {
    const c = floorCv.getContext("2d")!;
    c.strokeStyle = "rgba(255,255,255,0.9)"; c.lineWidth = 2;
    for (let i = 0; i <= 16; i++) { const v = (i / 16) * 512; c.beginPath(); c.moveTo(v, 0); c.lineTo(v, 512); c.stroke(); c.beginPath(); c.moveTo(0, v); c.lineTo(512, v); c.stroke(); }
    c.globalCompositeOperation = "destination-in";
    const m = c.createRadialGradient(256, 256, 20, 256, 256, 256);
    m.addColorStop(0, "rgba(0,0,0,0.85)"); m.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = m; c.fillRect(0, 0, 512, 512);
    c.globalCompositeOperation = "source-over";
    const g = c.createRadialGradient(256, 256, 0, 256, 256, 200);
    g.addColorStop(0, "rgba(255,255,255,0.32)"); g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g; c.fillRect(0, 0, 512, 512);
  }
  const floorTex = new THREE.CanvasTexture(floorCv); floorTex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1300, 1300),
    new THREE.MeshBasicMaterial({ map: floorTex, color: accCol, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
  );
  floor.rotation.x = -Math.PI / 2; floor.position.y = -3.6; scene.add(floor);

  // ---- Model
  const rig = new THREE.Group(); scene.add(rig);
  const C0 = new THREE.Vector3(-100, 62, 30);   // laptop ka beech (model load ke baad bbox se update)
  let loaded = false, disposed = false;
  new GLTFLoader().load(MODEL, (gltf) => {
    if (disposed) return;
    const model = gltf.scene;
    const loose = model.getObjectByName("Cube000_Laptop_0"); // faltu floating panel
    if (loose) { loose.removeFromParent(); (loose as THREE.Mesh).geometry?.dispose(); }
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    box.getCenter(C0);
    floor.position.x = C0.x; floor.position.z = C0.z;
    rig.add(model, screenMesh);
    loaded = true;
    resize();
    o.onReady?.();
  }, undefined, () => { if (!disposed) o.onFail?.(); });

  // ---- Camera path
  const tanH = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  let dStart = 700, dEnd = 180, liftY = 0;
  const dir0 = new THREE.Vector3(), dir0Base = new THREE.Vector3(), dirNow = new THREE.Vector3();
  const tgt = new THREE.Vector3(), up0 = new THREE.Vector3(0, 1, 0), upNow = new THREE.Vector3();
  const yAxis = new THREE.Vector3(0, 1, 0);
  dir0Base.copy(N).addScaledVector(R, 0.42).addScaledVector(yAxis, 0.3).normalize(); // thoda side + upar se, 3/4 view

  const resize = () => {
    const w = Math.max(1, o.host.clientWidth), h = Math.max(1, o.host.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile() ? 1.5 : 2));
    renderer.setSize(w, h, false);
    const aspect = w / h;
    cam.aspect = aspect; cam.updateProjectionMatrix();
    // Shuru me laptop (~270 units chauda) viewport ki frac width le: wide screen pe ~42%, phone pe ~88%
    const frac = clamp(0.88 - (aspect - 0.5) * 0.36, 0.42, 0.88);
    dStart = 270 / (frac * 2 * tanH * aspect);
    liftY = 0.1 * 2 * dStart * tanH;   // shuru me laptop thoda upar dikhe (neeche scroll hint ki jagah)
    // Aakhir me screen poore viewport ko cover kare (bezel na dikhe)
    dEnd = (Math.min(SCR_H, SCR_W / aspect) / (2 * tanH)) * 0.985;
  };

  let target = 0, cur = 0, ptX = 0, ptY = 0, px = 0, py = 0;
  let raf = 0, last = 0, lastTex = 0, started = false, t0 = 0, frame = 0, running = false;

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    cur += (target - cur) * (1 - Math.exp(-dt * 7));
    if (Math.abs(target - cur) < 1e-4) cur = target;
    px += (ptX - px) * (1 - Math.exp(-dt * 3)); py += (ptY - py) * (1 - Math.exp(-dt * 3));
    o.onFrame?.(cur, now);
    if (!loaded || cur > 0.965) return;   // 0.965+: hero overlay poora cover kar chuka, GPU kaam skip

    const T = started ? (now - t0) / 1000 : 0;
    if (!(frame++ % 40)) {
      const a = readAccent(); accCol.setRGB(a[0] / 255, a[1] / 255, a[2] / 255, THREE.SRGBColorSpace);
      rimA.color.copy(accCol); glow.color.copy(accCol); (floor.material as THREE.MeshBasicMaterial).color.copy(accCol);
    }
    if (now - lastTex > 32) { lastTex = now; o.draw(T, cur); tex.needsUpdate = true; }

    const zt = clamp((cur - 0.03) / 0.77), e = ease(zt);
    // idle float + pointer parallax (zoom hote hi khatam, e=1 pe bilkul 0)
    const k = 1 - e;
    rig.position.y = Math.sin(now / 1000 * 1.2) * 3.2 * k;
    dir0.copy(dir0Base).applyAxisAngle(yAxis, -px * 0.25 * k).applyAxisAngle(R, -py * 0.1 * k + Math.sin(now / 1000 * 0.6) * 0.02 * k);
    dirNow.lerpVectors(dir0, N, e).normalize();
    tgt.lerpVectors(C0, SCR_CENTER, e);
    tgt.y += rig.position.y - liftY * k;
    const d = dStart * Math.pow(dEnd / dStart, e);
    cam.position.copy(tgt).addScaledVector(dirNow, d);
    upNow.lerpVectors(up0, U, e).normalize();
    cam.up.copy(upNow);
    cam.lookAt(tgt);

    // screen glow: boot ke saath jagta hai, halka flicker
    const boot = clamp(T / 0.9);
    glow.intensity = 5.5e4 * boot * (0.92 + 0.08 * Math.sin(now / 90)) * (1 - 0.5 * e);

    renderer.render(scene, cam);
  };

  const onVis = () => { if (document.hidden) stopLoop(); else if (running) startLoop(); };
  const startLoop = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(tick); };
  const stopLoop = () => { cancelAnimationFrame(raf); raf = 0; };
  const onLost = (e: Event) => { e.preventDefault(); stopLoop(); };
  const onRestored = () => { if (running && !document.hidden) startLoop(); };
  el.addEventListener("webglcontextlost", onLost);
  el.addEventListener("webglcontextrestored", onRestored);
  document.addEventListener("visibilitychange", onVis);
  const ro = new ResizeObserver(() => resize());
  ro.observe(o.host);
  resize();

  return {
    setTarget: (p) => { target = clamp(p); },
    setPointer: (x, y) => { ptX = clamp(x, -1, 1); ptY = clamp(y, -1, 1); },
    begin: () => { started = true; t0 = performance.now(); },
    start: () => { if (running) return; running = true; if (!document.hidden) startLoop(); },
    stop: () => { running = false; stopLoop(); },
    resize,
    dispose: () => {
      disposed = true; running = false; stopLoop();
      ro.disconnect();
      el.removeEventListener("webglcontextlost", onLost); el.removeEventListener("webglcontextrestored", onRestored);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((mm) => {
          const s = mm as THREE.MeshStandardMaterial;
          s.map?.dispose(); s.normalMap?.dispose(); s.roughnessMap?.dispose(); s.aoMap?.dispose(); s.metalnessMap?.dispose();
          mm.dispose();
        });
      });
      tex.dispose(); floorTex.dispose(); envTex.dispose(); pmrem.dispose();
      renderer.dispose(); renderer.forceContextLoss(); el.remove();
    },
  };
}
