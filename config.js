// ============================================================
// config.js — Public configuration (safe to be visible in browser)
//
// These are NOT secrets. The Supabase anon key only grants the
// permissions defined by your RLS policies (public read, owner-only
// write). The Cloudinary preset is unsigned by design.
//
// Fill in YOUR actual values below, then include this file in
// index.html BEFORE firebase.js and script.js:
//   <script src="config.js"></script>
// ============================================================

window.PORTFOLIO_CONFIG = {
  SUPABASE_URL: "https://khbpvzlxpqztkfsvfqty.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYnB2emx4cHF6dGtmc3ZmcXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNDMxNzYsImV4cCI6MjA5ODgxOTE3Nn0.3D7BLb9dAe5mHP79Ti3WTjIC2hrH5M7Y91Q1yQrkWbg",
  CLOUDINARY_CLOUD_NAME: "prieeyyq",
  CLOUDINARY_UPLOAD_PRESET: "portfolio",
  ADMIN_EMAIL: "shivasaini.5666@gmail.com" // must match the one in your RLS policies
};
