# Shiva Saini portfolio (Next.js 14, App Router)

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Kahan kya badalna hai
- `data/content.js`: saara text, links, WhatsApp number, certificates, projects.
- `app/page.js`: section ka order (lines upar-neeche karo).
- `components/Shutter.js`: shutter animation.
- `components/Glasses.js`: 3D chashma jo scroll ke saath har heading tak udta hai (`FRONT` se direction badlo).
- `components/ScrollFX.js`: scroll reveal animation + nav ka progress bar.
- Logo: `public/shiva-logo.png` (nav, visiting card, chat DP), `app/icon.png` (favicon).
- `app/globals.css`: colors (top par :root) aur mobile breakpoint (820px).
- Images: `public/` mein rakho, phir `components/Sections.js` ke `<Shot />` ko `<img src="/file.png" />` se badlo. Certificates ke liye `data/content.js` mein `image: "/certs/x.jpg"`.

## Ask my AI
Bina key ke canned answers aate hain. Real AI ke liye `.env.local` banao (`.env.example` dekho) aur `GEMINI_API_KEY` daalo. Vercel par Environment Variables mein bhi daalna.

## Feedback (Supabase)
Supabase SQL editor me ye chalao, phir Vercel env me `SUPABASE_URL` aur `SUPABASE_SERVICE_KEY` daalo:

    create table feedback (id bigint generated always as identity primary key, stars int check (stars between 1 and 5), name text, text text, created_at timestamptz default now());
    alter table feedback enable row level security;  -- koi policy nahi: sirf service key (server) likh sakti hai

## Jo khali hai (site par apne aap hide rehta hai)
`data/content.js`: `sapna.result`, `sapna.image`, `site.photo`, certificate `image`. Bharte hi dikhne lagenge.

## Deploy
GitHub par push karo, Vercel par import karo.
