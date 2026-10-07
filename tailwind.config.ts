import type { Config } from "tailwindcss";

// Palette CSS variables (app/globals.css :root) se aati hai — rang badalna ho to wahin badlo.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent2: "rgb(var(--accent2) / <alpha-value>)",
        ground: "rgb(var(--bg) / <alpha-value>)",          // page base (hero ke baad)
        surface: "rgb(var(--surface) / <alpha-value>)",    // cards / panels
        surface2: "rgb(var(--surface-2) / <alpha-value>)", // card hover
        ink: "rgb(var(--ink) / <alpha-value>)",            // body text
        mute: "rgb(var(--mute) / <alpha-value>)",          // secondary text
        line: "var(--line)",                                // border white/8
        line2: "var(--line-2)",                             // border (inputs / hover)
      },
      fontFamily: { sans: ["var(--font-manrope)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
