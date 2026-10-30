"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { readAccent } from "@/lib/ascii";

// Floating 3D paper airplane: page scroll ke saath S-curve me neeche udta hai, footer tak. Scroll ruke to halka bob karta hai.
// Model: public/models/paper-airplane.glb (71 KB, CC BY 4.0 — credit footer me hai). Fixed layer z -1: cards, text aur SHIVA SAINI ke PEECHE (depth feel). pointer-events none.
// 3 LAYERS (depth): [1] -z-1 = cards ke PEECHE (WebGL canvas), [2] cards, [3] z-30 = cards ke AAGE (2D canvas, neeche dekho).
// Jin cards pe data-card hai unme se ek-chhod-ke-ek (even index) ke upar plane AAGE se udta hai (shadow ke saath); baaki ke peeche se.
// Technique: plane ek hi baar render hota hai; front canvas me uski copy sirf "front cards" ke rectangles ke andar clip-path se dikhti hai.
// Rang: key light white, fill light = theme accent2 (theme ke saath badalta), rim light = volt accent3.
// Tweak yahan: SIZE (plane ka size), SWAY (left-right kitna), SMOOTH (scroll follow speed), BASE_ROLL (kitna jhuka hua dikhe).
const MODEL = "/models/paper-airplane.glb";
const SIZE_DESK = 1.2, SIZE_MOB = 0.9;   // world units (plane ki lambai)
const SWAY = 0.62;                       // screen half-width ka fraction
const SMOOTH = 4;                        // zyada = scroll ko jaldi follow
const BASE_ROLL = 1.05;                  // rad: plane ka flat face camera ki taraf kitna ghume
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Path: t (0..1 page progress) -> screen position in -1..1 (x), -1..1 (y)
const path = (t: number) => ({
  x: Math.sin(t * Math.PI * 5 + 0.5) * SWAY,
  y: 0.55 - t * 1.15 + Math.sin(t * 38) * 0.02,
});

export default function FloatingPlane() {
  const mount = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = mount.current!;
    const front = frontRef.current!;
    const fctx = front.getContext("2d")!;
    let drewFront = false, lastClip = "";
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch { return; } // WebGL nahi => chupchap skip, site normal chalegi
    const mobile = () => innerWidth < 768;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile() ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    cam.position.z = 6;
    const hh = Math.tan(THREE.MathUtils.degToRad(20)) * cam.position.z; // half-height at z=0
    let hw = hh;

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(2, 3, 4); scene.add(key);
    const fill = new THREE.PointLight(0xa78bfa, 14, 20); fill.position.set(-3, 1, 3); scene.add(fill);
    const rim = new THREE.PointLight(0xd8ff3a, 10, 20); rim.position.set(3, -2, -1); scene.add(rim);

    // heading (z) -> bank/roll (x) -> model. Model ka nose (-Z) +X ki taraf ghumaya hai.
    const heading = new THREE.Group();
    const bank = new THREE.Group();
    heading.add(bank); scene.add(heading);
    heading.visible = false;

    let disposed = false, raf = 0, last = 0, size = SIZE_DESK;
    const resize = () => {
      const w = innerWidth, h = innerHeight;
      renderer.setSize(w, h, false);
      front.width = renderer.domElement.width; front.height = renderer.domElement.height;
      cam.aspect = w / h; cam.updateProjectionMatrix();
      hw = hh * cam.aspect;
      size = mobile() ? SIZE_MOB : SIZE_DESK;
      heading.scale.setScalar(size);
    };

    new GLTFLoader().load(MODEL, (gltf) => {
      if (disposed) return;
      const m = gltf.scene;
      const box = new THREE.Box3().setFromObject(m);
      const c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3());
      m.position.sub(c);                                  // center
      const holder = new THREE.Group();
      holder.add(m);
      holder.scale.setScalar(1 / Math.max(s.x, s.y, s.z)); // lambai = 1 unit
      holder.rotation.y = -Math.PI / 2;                    // nose -Z -> +X
      bank.add(holder);
      heading.visible = true;
      resize();
    });

    // ---- scroll state
    let sp = 0, prevSp = 0, dir = 1, ang = 0, roll = 0, frame = 0;
    const progress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      return max > 0 ? clamp(scrollY / max) : 0;
    };
    sp = prevSp = progress();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      const T = now / 1000;
      if (!(frame++ % 40)) { const a = readAccent(); fill.color.setRGB(a[0] / 255, a[1] / 255, a[2] / 255); }

      sp += (progress() - sp) * (1 - Math.exp(-dt * SMOOTH));
      const v = sp - prevSp; prevSp = sp;
      if (Math.abs(v) > 1e-5) dir = v > 0 ? 1 : -1;     // upar scroll karo to plane ulta (peeche) udta hai
      const speed = clamp(Math.abs(v) / dt / 0.4);        // 0 = ruka hua, 1 = tez scroll

      const p0 = path(sp), p1 = path(clamp(sp + 0.004 * dir));
      const bobY = Math.sin(T * 1.6) * 0.035, bobX = Math.sin(T * 1.1) * 0.015;
      const px = (p0.x + bobX) * hw, py = (p0.y + bobY) * hh;
      heading.position.set(px, py, 0);

      // heading: path ki direction. Ruka ho to halka tilt, chalte hue direction pe.
      const dx = (p1.x - p0.x) * hw * dir, dy = (p1.y - p0.y) * hh * dir;
      const target = Math.atan2(dy, dx);
      let d = target - ang; d = Math.atan2(Math.sin(d), Math.cos(d));
      ang += d * (1 - Math.exp(-dt * 5));
      heading.rotation.z = ang * (0.55 + 0.45 * speed);   // ruka ho to kam ghume

      const wantRoll = BASE_ROLL + clamp(d, -0.6, 0.6) * 1.2 + Math.sin(T * 1.3) * 0.08;
      roll += (wantRoll - roll) * (1 - Math.exp(-dt * 4));
      bank.rotation.x = roll;
      bank.rotation.y = Math.sin(T * 0.9) * 0.06;

      renderer.render(scene, cam);

      // ---- FRONT layer: even-index [data-card] ke rectangles me plane ki copy + shadow
      const gl = renderer.domElement, pr = renderer.getPixelRatio();
      const rr = (x: number, y: number, w: number, h: number, r: number) =>
        `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
      let clip = "", hit = false;
      const cx = (px / hw * 0.5 + 0.5) * innerWidth, cy = (0.5 - py / hh * 0.5) * innerHeight;
      const rad = (size * 0.8 / (2 * hh)) * innerHeight;
      document.querySelectorAll("[data-card]").forEach((el, i) => {
        if (i % 2) return;                                  // odd cards: plane peeche se
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.bottom < 0 || r.top > innerHeight) return;
        clip += rr(r.left, r.top, r.width, r.height, 16);
        if (cx + rad > r.left && cx - rad < r.right && cy + rad > r.top && cy - rad < r.bottom) hit = true;
      });
      const clipCss = clip ? `path('${clip}')` : "inset(0 0 100% 0)";
      if (clipCss !== lastClip) { front.style.clipPath = clipCss; lastClip = clipCss; }
      if (drewFront) { fctx.clearRect(0, 0, front.width, front.height); drewFront = false; }
      if (hit && heading.visible) {
        const x0 = Math.max(0, Math.floor((cx - rad) * pr)), y0 = Math.max(0, Math.floor((cy - rad) * pr));
        const w0 = Math.min(front.width - x0, Math.ceil(rad * 2 * pr)), h0 = Math.min(front.height - y0, Math.ceil(rad * 2 * pr));
        if (w0 > 0 && h0 > 0) {
          fctx.shadowColor = "rgba(0,0,0,0.55)"; fctx.shadowBlur = 22 * pr; fctx.shadowOffsetY = 20 * pr; // card pe plane ki parchhai = depth
          fctx.drawImage(gl, x0, y0, w0, h0, x0, y0, w0, h0);
          drewFront = true;
        }
      }
    };

    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !disposed) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    resize();
    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);

    // Intro: loader/hero ke baad soft fade-in (hero ke ASCII intro se takraye nahi)
    const el = renderer.domElement;
    el.style.opacity = "0"; el.style.transition = "opacity 1.2s ease";
    const show = () => { el.style.opacity = "1"; };
    let ready = false;
    try { ready = sessionStorage.getItem("ascii-loader-done") === "1"; } catch { ready = true; }
    const t1 = window.setTimeout(show, ready ? 400 : 4800);
    const onExit = () => { window.clearTimeout(t1); window.setTimeout(show, 1500); };
    addEventListener("ascii-loader-exit", onExit);

    raf = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf); window.clearTimeout(t1);
      removeEventListener("resize", resize); removeEventListener("ascii-loader-exit", onExit);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((mm) => { (mm as THREE.MeshStandardMaterial).map?.dispose(); mm.dispose(); });
      });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      <div ref={mount} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[1]" />
      <canvas ref={frontRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 h-full w-full" />
    </>
  );
}
