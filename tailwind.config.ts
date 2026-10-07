import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { accent2: "#a78bfa" }, fontFamily: { sans: ["var(--font-manrope)", "system-ui", "sans-serif"] } } },
  plugins: [],
};
export default config;
