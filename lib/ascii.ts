// Shared ASCII helpers: AsciiHero, AsciiLoader, AsciiPortrait (aur aage ke sections) yahi use karte hain.
export const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

// Deterministic hash: har (a,b,c) ke liye same unsigned number. Storage ke bina flicker/random chars banane ke kaam aata hai.
export function hs(a: number, b: number, c: number): number {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
  h = (h ^ (h >>> 13)) * 1274126177 | 0;
  return (h ^ (h >>> 16)) >>> 0;
}

// rgb array ko `w` (0..255) ki taraf `m` (0..1) mix karta hai
export const mix = (c: number[], w: number, m: number) =>
  `rgb(${c.map((v) => Math.round(v + (w - v) * m)).join(",")})`;

// Theme ka --accent2 (ThemeSwitcher isse root pe set karta hai). Default violet.
export function readAccent(): number[] {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--accent2").trim();
  const p = v.split(/\s+/).map(Number);
  return p.length === 3 && p.every((n) => !isNaN(n)) ? p : [167, 139, 250];
}
