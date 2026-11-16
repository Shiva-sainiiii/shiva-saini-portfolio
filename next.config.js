/** @type {import('next').NextConfig} */
const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
// Images ko 1 hafte ka cache (file badlo to bhi 1 din me refresh ho jaati hai)
const imgCache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Purani site ka /index.html Google me ho to 301 se seedha home pe aaye
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: security },
      { source: "/shots/:path*", headers: imgCache },
      { source: "/certs/:path*", headers: imgCache },
      { source: "/:file(me.jpg|statue.webp|og.jpg|shiva-logo.png|shiva-logo-nobg.png)", headers: imgCache },
    ];
  },
};
