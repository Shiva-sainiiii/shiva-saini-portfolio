import type { Config } from "tailwindcss";

// Palette CSS variables (app/globals.css :root) se aati hai — rang badalna ho to wahin badlo.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent2: "rgb(var(--accent2) / <alpha-value>)",   // gold
        accent3: "rgb(var(--accent3) / <alpha-value>)",
        ground: "rgb(var(--bg) / <alpha-value>)",          // ink background
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",            // bone text (.on-bone me ulta)
        mute: "rgb(var(--mute) / <alpha-value>)",
        inkdim: "rgb(var(--ink-dim) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        line: "var(--line)",
        line2: "var(--line-2)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],       // Bricolage Grotesque
        display: ["var(--font-sans)", "system-ui", "sans-serif"],    // headlines bhi Bricolage (800 weight)
        serif: ["var(--font-serif)", "Georgia", "serif"],            // Instrument Serif (italic words)
      },
    },
  },
  plugins: [],
};
export default config;
