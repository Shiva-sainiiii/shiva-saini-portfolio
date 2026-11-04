import { MONO, hs, mix, readAccent } from "@/lib/ascii";

// Laptop ke PEECHE aur DONO SIDE ka ASCII "hacking terminal" background:
//   1) matrix-style code rain (poori screen, laptop ke peeche bhi)
//   2) desktop pe left/right me scroll hote hue fake system logs (sirf look hai, kuch real nahi chalta)
// Rang theme ke --accent2 se aate hain, volt (accent3) sirf chhote highlights me.
// Tweak: RAIN_DENSITY (kitne columns active), LOG_SPEED (logs ki speed), LOG_MIN_W (kitni width ke upar logs dikhein).

const GLYPHS = "01234567890ABCDEF<>/\\{}[];:=+-*#$%&@!?";
const RAIN_DENSITY = 0.62;
const LOG_SPEED = 26;       // px per second
const LOG_MIN_W = 1000;     // isse patli screen pe sirf rain
const VOLT = "rgb(216,255,58)";

const LOGS = [
  "[ OK ] mounting /dev/portfolio",
  "[ .. ] resolving %i",
  "ssh -i key.pem root@%i",
  "[+] port 22/tcp   open  ssh",
  "[+] port 443/tcp  open  https",
  "[*] bypassing firewall ...... done",
  "0x%h  %h  %h  %h",
  "decrypting payload ........... ok",
  "> sudo access --grant shiva",
  "GET /api/chat 200 12ms",
  "npm run build ............... ok",
  "compiling three.js shaders .. ok",
  "deploying to vercel ......... ok",
  "ai.module   : ONLINE",
  "[%p] downloading assets",
  "0x%h  %h  %h  %h",
  "[+] handshake complete",
  "kernel: tcp_sendmsg ok %h",
  "[*] injecting next.js build",
  "root@portfolio:~# ls -la",
  "[ OK ] started ai.service",
  "latency %m ms  loss 0%",
  "[+] session key: %h",
];

const hex = (n: number, len = 8) => (n >>> 0).toString(16).toUpperCase().padStart(8, "0").slice(0, len);

function logLine(n: number): string {
  const tpl = LOGS[hs(n, 1, 77) % LOGS.length];
  return tpl
    .replace(/%i/g, () => `${10 + (hs(n, 2, 1) % 200)}.${hs(n, 3, 2) % 256}.${hs(n, 4, 3) % 256}.${hs(n, 5, 4) % 256}`)
    .replace(/%h/g, () => hex(hs(n, 6, 5)))
    .replace(/%m/g, () => String(8 + (hs(n, 7, 6) % 90)));
}

const smooth01 = (v: number) => { const k = Math.min(1, Math.max(0, v)); return k * k * (3 - 2 * k); };

export type HackBg = {
  resize: () => void;
  /** now = ms, k = 0..1 overall opacity */
  draw: (now: number, k: number) => void;
};

export function createHackBg(cv: HTMLCanvasElement): HackBg {
  const ctx = cv.getContext("2d")!;
  let W = 0, H = 0, cs = 14, cw = 8.7, cols = 0, rows = 0;
  let speed = new Float32Array(0), off = new Float32Array(0), len = new Uint8Array(0), on = new Uint8Array(0);
  let acc = readAccent(), frame = 0;
  let cBody = "", cHead = "", cLog = "";

  const theme = () => { acc = readAccent(); cBody = mix(acc, 0, 0.05); cHead = mix(acc, 255, 0.88); cLog = mix(acc, 255, 0.35); };
  theme();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cs = W < 600 ? 12 : 15; cw = cs * 0.62;
    cols = Math.ceil(W / cw); rows = Math.ceil(H / cs);
    speed = new Float32Array(cols); off = new Float32Array(cols); len = new Uint8Array(cols); on = new Uint8Array(cols);
    for (let c = 0; c < cols; c++) {
      speed[c] = 5 + (hs(c, 1, 11) % 100) / 100 * 11;        // rows / second
      off[c] = (hs(c, 2, 12) % 1000) / 1000 * (rows + 40);
      len[c] = 9 + (hs(c, 3, 13) % 22);
      on[c] = (hs(c, 4, 14) % 100) < RAIN_DENSITY * 100 ? 1 : 0;
    }
  };

  const draw = (now: number, k: number) => {
    if (!W || !H) return;
    if (!(frame++ % 60)) theme();
    const T = now / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.textBaseline = "top"; ctx.textAlign = "left";
    ctx.font = `${cs}px ${MONO}`;

    // 1) Code rain
    for (let c = 0; c < cols; c++) {
      if (!on[c]) continue;
      const trail = len[c];
      const head = (T * speed[c] + off[c]) % (rows + trail + 6);
      const x = c * cw;
      for (let j = 0; j <= trail; j++) {
        const row = Math.floor(head) - j;
        if (row < 0 || row >= rows) continue;
        const f = 1 - j / trail;
        const gi = hs(c, row, Math.floor(T * (j === 0 ? 14 : 2.2) + j * 0.3)) % GLYPHS.length;
        if (j === 0) { ctx.fillStyle = cHead; ctx.globalAlpha = 0.95 * k; }
        else { ctx.fillStyle = cBody; ctx.globalAlpha = Math.pow(f, 1.7) * 0.42 * k; }
        ctx.fillText(GLYPHS[gi], x, row * cs);
      }
    }

    // 2) Side logs (desktop)
    if (W >= LOG_MIN_W) {
      const lh = 18, fs = 12;
      ctx.font = `${fs}px ${MONO}`;
      const pw = W * 0.2;
      const maxCh = Math.floor(pw / (fs * 0.62));
      const base = T * LOG_SPEED;
      const n0 = Math.floor(base / lh);
      const dy = base % lh;
      const nRows = Math.ceil(H / lh) + 1;
      for (let side = 0; side < 2; side++) {
        const px = side === 0 ? W * 0.03 : W * 0.77;
        const salt = side * 913;
        for (let r = 0; r < nRows; r++) {
          const y = H - r * lh + dy - lh;       // neeche se upar scroll
          if (y < -lh || y > H) continue;
          const idx = n0 + r + salt;
          const edge = smooth01((y - H * 0.08) / (H * 0.24)) * smooth01((H - y) / (H * 0.14));
          let line = logLine(idx);
          // progress bar line: [#####-----] xx%
          if (line.includes("downloading")) {
            const pr = ((T * 0.25 + idx * 0.37) % 1);
            const filled = Math.round(pr * 10);
            line = `[${"#".repeat(filled)}${"-".repeat(10 - filled)}] ${String(Math.round(pr * 100)).padStart(3, " ")}%  assets`;
          }
          const hot = line.startsWith("[ OK ]") || line.startsWith("[+]");
          ctx.fillStyle = hot ? VOLT : cLog;
          ctx.globalAlpha = (hot ? 0.5 : 0.42) * edge * k;
          ctx.fillText(line.slice(0, maxCh), px, y);
        }
      }
    }
    ctx.globalAlpha = 1;
  };

  resize();
  return { resize, draw };
}
