import { EXPERIENCE, SERVICES, SITE, SKILLS } from "@/lib/data";
import { MONO, mix, readAccent } from "@/lib/ascii";

// Laptop ki screen par chalne wala "terminal": commands type hote hain, output stream hota hai, phir loop.
// Ye ek 2D canvas banata hai jo 3D laptop ki screen par texture ban kar lagta hai (lib/laptopScene.ts).
// Saari info lib/data.ts se aati hai, isliye wahan edit karoge to screen par bhi badal jaayega.
// Speed / content badalna ho to neeche TYPE_S (command speed), OUT_S (output speed), HOLD_S (loop se pehle ruko) badlo.

type Tone = "cmd" | "out" | "ok" | "dim" | "acc" | "volt";
type Entry = { text: string; tone: Tone; typed: boolean };
type Timed = Entry & { t0: number; dur: number };

const TYPE_S = 0.058;   // seconds per character (commands, insaan jaisi typing)
const OUT_S = 0.011;    // seconds per character (output stream)
const HOLD_S = 2.8;     // poora text dikhne ke baad itni der ruko, phir clear + loop
const START_S = 0.9;    // screen on hone ke baad pehle command tak

// Lambi list ko max `w` chars ki lines me tod deta hai
function wrap(items: string[], w: number, sep = "   "): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const it of items) {
    const next = cur ? cur + sep + it : it;
    if (next.length > w && cur) { lines.push(cur); cur = it; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function buildScript(): Entry[] {
  const e: Entry[] = [];
  const cmd = (text: string) => e.push({ text, tone: "cmd", typed: true });
  const out = (text: string, tone: Tone = "out") => e.push({ text, tone, typed: false });

  cmd("whoami");
  out(SITE.name.toLowerCase().replace(/\s+/g, "_"), "volt");
  cmd("cat role.txt");
  out(SITE.role);
  out(SITE.tagline, "dim");
  cmd("echo $LOCATION");
  out(SITE.location);
  cmd("ls ./skills");
  wrap(SKILLS, 54).forEach((l) => out(l, "acc"));
  cmd("git log --experience");
  EXPERIENCE.forEach((x) => out(`${x.period.padEnd(13)} ${x.company} · ${x.role}`));
  cmd("./stats.sh");
  out(SITE.stats.join("  ·  "), "ok");
  cmd("./services --list");
  SERVICES.forEach((s) => out(`[+] ${s.title}`, "ok"));
  cmd(`echo "${SITE.motto}"`);
  out(SITE.motto, "volt");
  cmd("scroll --enter");
  out("> decrypting portfolio ...", "dim");
  out("> ACCESS GRANTED", "volt");
  return e;
}

function buildTimeline(script: Entry[]) {
  let t = START_S;
  const items: Timed[] = [];
  script.forEach((en, i) => {
    if (en.typed && i > 0) t += 0.45; // naye command se pehle halka pause
    const jitter = 0.85 + ((i * 37) % 30) / 100;
    const dur = Math.max(0.12, en.text.length * (en.typed ? TYPE_S : OUT_S) * jitter);
    items.push({ ...en, t0: t, dur });
    t += dur + (en.typed ? 0.4 : 0.1);
  });
  return { items, total: t };
}

export type Terminal = {
  canvas: HTMLCanvasElement;
  /** T = screen on hone se seconds, p = scroll progress (0..1; ACCESS GRANTED banner ke liye) */
  draw: (T: number, p: number) => void;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => { const k = clamp01((v - a) / (b - a)); return k * k * (3 - 2 * k); };

export function createTerminal(width = 1600, height = 921): Terminal {
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const { items, total } = buildTimeline(buildScript());
  const period = total + HOLD_S;

  const FS = 34, LH = 46, PADX = 56, BAR = 62, TOP = BAR + 30;
  const rows = Math.floor((height - TOP - 36) / LH);
  ctx.font = `${FS}px ${MONO}`;
  const cw = ctx.measureText("M").width || FS * 0.6;

  // Scanlines pattern (ek baar bana ke repeat)
  const sl = document.createElement("canvas"); sl.width = 4; sl.height = 4;
  const sc = sl.getContext("2d")!; sc.fillStyle = "rgba(0,0,0,0.22)"; sc.fillRect(0, 3, 4, 1);
  const scan = ctx.createPattern(sl, "repeat")!;

  let acc = readAccent(), frame = 0;
  let cAcc = "", cBright = "", cDim = "", cOk = "";
  const theme = () => {
    acc = readAccent();
    cAcc = mix(acc, 255, 0.25); cBright = mix(acc, 255, 0.82); cDim = mix(acc, 128, 0.5); cOk = "rgb(216,255,58)";
  };
  theme();

  const toneColor = (t: Tone) => (t === "cmd" ? "#f1f3f7" : t === "out" ? "#cfd3da" : t === "acc" ? cAcc : t === "dim" ? "#7d838c" : cOk);

  const draw = (T: number, p: number) => {
    if (!(frame++ % 40)) theme();
    const W = width, H = height;
    const boot = clamp01(T / 0.75);                       // CRT-style "on" hone ka effect: line phailti hai
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
    if (boot <= 0) return;
    const bh = Math.max(3, boot * boot * H);
    ctx.save();
    ctx.beginPath(); ctx.rect(0, (H - bh) / 2, W, bh); ctx.clip();

    // Background
    const bg = ctx.createRadialGradient(W * 0.5, H * 0.45, 40, W * 0.5, H * 0.5, W * 0.75);
    bg.addColorStop(0, `rgba(${acc.map((v) => Math.round(v * 0.16)).join(",")},1)`);
    bg.addColorStop(1, "#020306");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Title bar
    ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fillRect(0, 0, W, BAR);
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fillRect(0, BAR - 1, W, 1);
    (["#ff5f57", "#febc2e", "#28c840"] as const).forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(46 + i * 36, BAR / 2, 9, 0, Math.PI * 2); ctx.fill(); });
    ctx.font = `${24}px ${MONO}`; ctx.textBaseline = "middle"; ctx.textAlign = "center";
    ctx.fillStyle = "#8b9199"; ctx.fillText("shiva@portfolio: ~/shiva-saini — zsh", W / 2, BAR / 2 + 1);

    // Terminal text
    const tt = T % period;
    const loopFade = tt > period - 0.4 ? (period - tt) / 0.4 : 1;
    ctx.globalAlpha = loopFade;
    ctx.font = `${FS}px ${MONO}`; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    type Row = { it: Timed; text: string; done: boolean };
    const shown: Row[] = [];
    for (const it of items) {
      if (it.t0 > tt) break;
      const k = clamp01((tt - it.t0) / it.dur);
      shown.push({ it, text: it.text.slice(0, Math.floor(k * it.text.length)), done: k >= 1 });
    }
    const first = Math.max(0, shown.length - rows);
    ctx.shadowColor = `rgba(${acc.join(",")},0.55)`; ctx.shadowBlur = 9;
    let lastX = PADX, lastY = TOP;
    for (let r = first; r < shown.length; r++) {
      const { it, text } = shown[r];
      const y = TOP + (r - first) * LH + FS;
      let x = PADX;
      if (it.tone === "cmd") {
        ctx.fillStyle = cBright; ctx.fillText("shiva@portfolio", x, y); x += cw * "shiva@portfolio".length;
        ctx.fillStyle = cDim; ctx.fillText(":~$ ", x, y); x += cw * 4;
      }
      ctx.fillStyle = toneColor(it.tone); ctx.fillText(text, x, y);
      lastX = x + cw * text.length; lastY = y;
    }
    // Cursor: type ke dauran solid, ruke hue blink
    const last = shown[shown.length - 1];
    if (shown.length && (!last.done || Math.floor(T * 2) % 2 === 0)) {
      ctx.shadowBlur = 14; ctx.fillStyle = cBright;
      ctx.fillRect(lastX + 3, lastY - FS + 3, cw * 0.62, FS);
    } else if (!shown.length && Math.floor(T * 2) % 2 === 0) {
      ctx.fillStyle = cBright; ctx.fillRect(PADX, TOP + 3, cw * 0.62, FS);
    }
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;

    // ACCESS GRANTED banner (zoom ke aakhri hisse me): terminal ke upar flash
    const ba = smooth(0.6, 0.68, p) * (1 - smooth(0.8, 0.86, p));
    if (ba > 0.01) {
      const flick = 0.82 + 0.18 * Math.sin(T * 38);
      ctx.fillStyle = `rgba(0,0,0,${0.72 * ba})`; ctx.fillRect(0, H * 0.3, W, H * 0.4);
      ctx.globalAlpha = ba * flick; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(216,255,58,0.8)"; ctx.shadowBlur = 26; ctx.fillStyle = "#d8ff3a";
      ctx.font = `900 ${Math.round(W * 0.075)}px ${MONO}`; ctx.fillText("ACCESS GRANTED", W / 2, H * 0.48);
      ctx.shadowBlur = 0; ctx.fillStyle = cBright; ctx.font = `${30}px ${MONO}`;
      ctx.fillText("loading portfolio ...", W / 2, H * 0.6);
      ctx.fillStyle = "#d8ff3a"; ctx.fillRect(W * 0.2, H * 0.3, W * 0.6 * ba, 3); ctx.fillRect(W * 0.8 - W * 0.6 * ba, H * 0.7 - 3, W * 0.6 * ba, 3);
      ctx.globalAlpha = 1;
    }

    // Scanlines + moving refresh band + vignette
    ctx.fillStyle = scan; ctx.fillRect(0, 0, W, H);
    const by = ((T * 0.18) % 1.4 - 0.2) * H;
    const band = ctx.createLinearGradient(0, by - 90, 0, by + 90);
    band.addColorStop(0, "rgba(255,255,255,0)"); band.addColorStop(0.5, "rgba(255,255,255,0.045)"); band.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = band; ctx.fillRect(0, by - 90, W, 180);
    const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, W * 0.72);
    vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,0.5)");
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    ctx.restore();
  };

  return { canvas, draw };
}
