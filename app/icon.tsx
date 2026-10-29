import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", color: "#22d3ee", fontSize: 64, fontWeight: 800, borderRadius: 21 }}>S</div>
    ),
    size
  );
}
