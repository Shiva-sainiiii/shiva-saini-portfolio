/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Purani site ka /index.html Google me ho to 301 se seedha home pe aaye
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }];
  },
};
