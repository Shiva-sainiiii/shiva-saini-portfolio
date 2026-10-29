import { ImageResponse } from "next/og";

// Social share card (WhatsApp/LinkedIn/Twitter) — code se banta hai, koi image file nahi chahiye
export const alt = "Shiva Saini — Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#000", color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 800, letterSpacing: -2 }}><span>SHIVA</span><span style={{ color: "#22d3ee", marginLeft: 28 }}>SAINI</span></div>
        <div style={{ marginTop: 28, fontSize: 30, letterSpacing: 6, color: "#67e8f9" }}>CREATIVE • AI INTEGRATED • FULL STACK WEB DEVELOPER</div>
      </div>
    ),
    size
  );
}
