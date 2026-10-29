"use client";

import { useEffect, useRef, useState } from "react";
import { readAccent } from "@/lib/ascii";

// Floating 3D hat (GLB). Page scroll ke saath upar se neeche tak chalti hai: ek halka S-curve banake ghoomti hui.
// Model file: public/assets/hat.glb. File nahi mili / load fail hua => component chupchap kuch render nahi karta.
const HAT_URL = "/assets/hat.glb";
// Agar hat ulta / tedha dikhe to yahan radians me fix karo (Math.PI = 180°)
const HAT_FIX = { x: 0, y: 0, z: 0 };
const TURNS = 2;       // poore page me hat kitni baar poora ghoomti hai
const TOP_GAP = 84;    // navbar ke neeche se shuru (px)
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function FloatingHat() {
  const boxRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const box = boxRef.current!, cv = cvRef.current!;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dead = false, raf = 0, cleanup = () => {};

    // Three.js bhaari hai, isliye idle time me alag chunk se load hota hai (first paint ko slow nahi karta)
    const boot = async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
        if (dead) return;

        const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
        camera.position.set(0, 0.2, 5.2);

        // PBR hat ko bina HDR file ke achhi shading milti hai
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envTex;
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(2, 3, 4); scene.add(key);
        const rim = new THREE.DirectionalLight(0xffffff, 1.4); rim.position.set(-3, 1, -3); scene.add(rim);

        const pivot = new THREE.Group(); scene.add(pivot);
        const gltf = await new GLTFLoader().loadAsync(HAT_URL);
        if (dead) return;
        const model = gltf.scene;
        // Model ko origin pe center karo aur ek fixed size me fit karo (kisi bhi GLB scale pe chale)
        const bb = new THREE.Box3().setFromObject(model);
        const size = bb.getSize(new THREE.Vector3()), ctr = bb.getCenter(new THREE.Vector3());
        model.position.sub(ctr);
        const wrap = new THREE.Group(); wrap.add(model);
        wrap.rotation.set(HAT_FIX.x, HAT_FIX.y, HAT_FIX.z);
        wrap.scale.setScalar(2.2 / (Math.max(size.x, size.y, size.z) || 1));
        pivot.add(wrap);

        let S = 0, scrollP = 0, smoothP = 0, t0 = performance.now();
        let acc = readAccent(), n = 0;

        const place = () => {
          const mobile = innerWidth < 768;
          S = mobile ? 104 : innerWidth < 1200 ? 170 : 210;
          box.style.width = box.style.height = S + "px";
          const dpr = Math.min(devicePixelRatio || 1, 2);
          renderer.setPixelRatio(dpr); renderer.setSize(S, S, false);
          camera.aspect = 1; camera.updateProjectionMatrix();
        };

        const frame = (now: number) => {
          raf = requestAnimationFrame(frame);
          if (document.hidden) return;
          if (!(n++ % 90)) acc = readAccent();
          const doc = document.documentElement;
          const max = Math.max(1, doc.scrollHeight - innerHeight);
          scrollP = clamp01(scrollY / max);
          smoothP += (scrollP - smoothP) * (RM ? 1 : 0.08);   // thoda lag => floating feel
          const T = RM ? 0 : (now - t0) / 1000;

          // Position: upar se neeche + side-to-side S-curve. Mobile pe chhota swing, taaki content ke upar kam aaye.
          const mobile = innerWidth < 768;
          const right = mobile ? 6 : 22;
          const swing = (mobile ? 0.1 : 0.14) * innerWidth;
          const x = innerWidth - S - right - swing * (0.5 + 0.5 * Math.sin(smoothP * Math.PI * 2 * 2.5));
          const y = TOP_GAP + (innerHeight - S - TOP_GAP - 16) * smoothP + Math.sin(T * 1.2) * 6;
          box.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;

          // Rotation: scroll se ghoomti hai + halka idle bob/tilt
          pivot.rotation.y = smoothP * Math.PI * 2 * TURNS + T * 0.35;
          pivot.rotation.x = 0.22 + Math.sin(T * 0.9) * 0.06;
          pivot.rotation.z = Math.sin(T * 0.7) * 0.05 + (scrollP - smoothP) * 3;
          rim.color.setRGB(acc[0] / 255, acc[1] / 255, acc[2] / 255);   // rim light theme colour follow karti hai
          renderer.render(scene, camera);
        };

        place();
        addEventListener("resize", place);
        box.style.opacity = "1";
        raf = requestAnimationFrame(frame);

        cleanup = () => {
          removeEventListener("resize", place);
          cancelAnimationFrame(raf);
          envTex.dispose(); pmrem.dispose();
          scene.traverse((o) => {
            const m = o as import("three").Mesh;
            if (!m.isMesh) return;
            m.geometry.dispose();
            (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => mt.dispose());
          });
          renderer.dispose();
        };
        if (dead) cleanup();
      } catch {
        if (!dead) setFailed(true);   // hat.glb nahi mila / WebGL nahi => hide
      }
    };

    const ric = (window as any).requestIdleCallback as ((cb: () => void, o?: object) => number) | undefined;
    const id = ric ? ric(boot, { timeout: 2500 }) : window.setTimeout(boot, 1200);
    return () => {
      dead = true;
      if (ric) (window as any).cancelIdleCallback?.(id); else clearTimeout(id);
      cleanup();
    };
  }, []);

  if (failed) return null;
  return (
    // z-30: navbar (z-40) ke neeche, content ke upar. pointer-events-none => click/scroll pe koi asar nahi.
    <div ref={boxRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-30 opacity-0 transition-opacity duration-700 will-change-transform">
      <canvas ref={cvRef} className="h-full w-full" />
    </div>
  );
}
