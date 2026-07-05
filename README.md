<div align="center">

# ✦ Shiva Saini — Portfolio Website 

**A modern, AI-powered developer portfolio built with glassmorphism, particles, and real-time features.**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-shivasainiportfolio.vercel.app-8a2be2?style=for-the-badge&logo=vercel&logoColor=white)](https://shivasainiportfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Shiva--sainiiii-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shiva-sainiiii/Shiva-Saini-Portfolio-)
[![Deployed on](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 📸 Preview

> Live at → **[shivasainiportfolio.vercel.app](https://shivasainiportfolio.vercel.app/)**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Chat** | Ask anything — powered by OpenRouter API via a Vercel serverless function |
| 🎨 **Glassmorphism UI** | Frosted glass cards, backdrop blur, and layered depth |
| ✦ **Particles.js** | Interactive animated particle background |
| 📱 **Fully Responsive** | Mobile-first layout with custom touch controls |
| 🐍 **Snake Game** | Playable mini-game built into the portfolio |
| 💬 **Live Feedback** | Real-time visitor messages stored in Firebase Firestore |
| 🎯 **Smooth Animations** | GSAP-powered scroll reveals and micro-interactions |
| 📊 **Scroll Progress Bar** | Gradient progress indicator at the top of the page |
| 🌙 **Dark Theme** | Deep space aesthetic with purple & cyan accents |
| ⚡ **Fast & Optimized** | Lightweight, lazy-loaded, deployed on Vercel's edge network |

---

## 🛠️ Tech Stack

```
Frontend        →  HTML5, CSS3 (Custom Properties), Vanilla JavaScript
Animations      →  GSAP, Particles.js
Database        →  Firebase Firestore (real-time feedback)
AI Chat         →  OpenRouter API (serverless via Vercel)
Deployment      →  Vercel (GitHub CI/CD)
```

---

## 📁 Project Structure

```
shiva-saini-portfolio/
│
├── index.html          ← REPLACE (updated version)
├── style.css           ← same rehne do (untouched)
├── script.js           ← same rehne do (untouched)
├── admin.css           ← NEW — add this
├── admin.js            ← NEW — add this
├── config.js           ← NEW — add this
├── firebase.js
├── api/
│   └── ask.js
└── assets/
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shiva-sainiiii/Shiva-Saini-Portfolio-.git
cd Shiva-Saini-Portfolio-
```

### 2. Set Up Environment Variables

Create a `.env` file in the root (or configure in Vercel dashboard):

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> **Note:** Firebase config is handled client-side inside `firebase.js`. Replace the config object with your own Firebase project credentials.

### 3. Run Locally

Since this is a static site, you can use any local server:

```bash
# Using VS Code Live Server extension (recommended)
# Or using Python
python -m http.server 3000

# Or using Node.js
npx serve .
```

Open `http://localhost:3000` in your browser.

### 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 🔑 Environment Variables (Vercel)

| Variable | Description |
|---|---|
| `OPENROUTER_API_KEY` | API key from [openrouter.ai](https://openrouter.ai) for AI chat |

Set these in: **Vercel Dashboard → Project → Settings → Environment Variables**

---

## 🧩 Sections

- **Hero** — Name, animated typing role, CTA buttons
- **Highlights** — Quick stats (projects, experience, skills)
- **About** — Bio + animated stat counters
- **Skills** — Tag cloud of technologies
- **Projects** — Hover-reveal project cards with links
- **Certificates** — Clickable certificate gallery
- **Offer Letters** — Internship & job offer showcase
- **AI Chat** — Ask the AI about me (OpenRouter-powered)
- **Snake Game** — Playable game with high score tracking
- **Feedback** — Leave a real-time message (Firebase)
- **Socials** — Connect via LinkedIn, GitHub, Instagram, Gmail

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Designed & Built by [Shiva Saini](https://shivasainiportfolio.vercel.app/)**

*If you found this project useful or inspiring, consider giving it a ⭐ on GitHub!*

</div>
