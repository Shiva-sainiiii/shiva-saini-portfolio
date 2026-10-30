# Shiva Saini — Portfolio

Next.js 14 (App Router) + React 18 + TypeScript + Tailwind 3. ASCII-art hero, niche demo showcase, Supabase-powered admin panel, Firebase feedback, AI chat.
Live: https://shivasainiportfolio.vercel.app

## Folder structure

```
shiva-saini-portfolio/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # <html>, fonts, SEO metadata, theme-flash script
│   ├── page.tsx                # Home: Loader + Navbar + AsciiHero + Sections (+ JSON-LD)
│   ├── globals.css             # Palette variables, grain, glows, selection, marquee
│   ├── admin/
│   │   ├── layout.tsx          # noindex metadata for /admin
│   │   └── page.tsx            # Admin login + tabs (projects, skills, certificates, links, messages)
│   ├── api/
│   │   └── chat/route.ts       # AI chat (Gemini, OpenRouter fallback)
│   ├── icon.tsx                # Favicon (generated)
│   ├── opengraph-image.tsx     # OG share image (generated)
│   ├── twitter-image.tsx       # Twitter card image
│   ├── robots.ts               # robots.txt (disallows /admin, /api)
│   └── sitemap.ts              # sitemap.xml
│
├── components/
│   ├── Navbar.tsx              # Fixed top bar (desktop links + theme popover)
│   ├── MobileMenu.tsx          # Mobile dropdown menu (links + theme colours + CTAs)
│   ├── ThemeSwitcher.tsx       # Accent colour picker (popover / inline variants)
│   ├── Fx.tsx                  # ASCII-style hover text scramble (use on short labels)
│   ├── AsciiLoader.tsx         # First-visit ASCII "S" loader
│   ├── AsciiHero.tsx           # Canvas ASCII hero: SHIVA SAINI + terrain wave + orb
│   ├── AsciiPortrait.tsx       # ASCII portrait (About)
│   ├── AsciiShape.tsx          # 3D ASCII shapes for niche cards
│   ├── Sections.tsx            # Layout of all sections + footer (with Admin login link)
│   ├── Showcase.tsx            # Niche demos + delivered client work
│   ├── Projects.tsx            # Project rows (hover/focus expand)
│   ├── Skills.tsx              # Two-row marquee
│   ├── Certificates.tsx        # Certificate grid + lightbox
│   ├── Testimonials.tsx
│   ├── AskAI.tsx               # AI chat UI
│   ├── Markdown.tsx            # Tiny markdown renderer for chat
│   ├── Feedback.tsx            # 5-star feedback (Firestore)
│   ├── Contact.tsx             # Contact form (Supabase), WhatsApp/call, social links
│   ├── Icons.tsx               # All SVG icons
│   └── admin/
│       └── CollectionEditor.tsx
│
├── lib/
│   ├── data.ts                 # Static content: SITE, services, niches, team, experience
│   ├── content.ts              # Supabase content fetch + defaults
│   ├── useContent.ts           # Client hook for live content
│   ├── ascii.ts                # Shared ASCII helpers (charset, hash, accent reader)
│   ├── shapes.ts               # 3D shape point-clouds for AsciiShape
│   ├── typewriter.ts
│   ├── supabase.ts             # Supabase client
│   └── firebase.ts             # Firebase client
│
├── public/
│   ├── assets/                 # Profile, project and certificate images, resume PDF
│   └── google*.html            # Search Console verification files
│
├── supabase/
│   ├── schema.sql              # Tables + admin policy (check admin email in is_admin)
│   ├── hardening.sql
│   └── seed.sql                # Old portfolio data import
│
├── firestore.rules             # Firestore rules for feedback
├── tailwind.config.ts          # Colours read from CSS variables
├── next.config.js
├── package.json
├── .env.example                # Env var names (copy to .env.local)
├── SETUP.md                    # Supabase / Firebase / env setup steps
└── README.md
```

## Design system

- **One theme colour**: `--accent2` (default violet). Buttons, links, hover, glow, selection and ASCII all follow it. Change via the theme picker (navbar on desktop, hamburger menu on mobile). Options live in `components/ThemeSwitcher.tsx` and the head script in `app/layout.tsx`.
- Page colours (`--bg`, `--surface`, `--ink`, `--mute` ...) are variables in `app/globals.css`; Tailwind names: `bg-ground`, `bg-surface`, `text-ink`, `text-mute`, `text-accent2`.
- Hero background stays pure `#000`.
- **Hover**: ASCII scramble via `<Fx>` (wrap short labels), plus accent border/lift on cards.

## Editing content

- Static text, services, niches, team: `lib/data.ts`
- Projects, skills, certificates, links, messages: `/admin` (needs Supabase env vars)

## Run

```
npm install
npm run dev
```

Env vars: see `.env.example` and `SETUP.md`. Deploys automatically on push to `main` (Vercel).
