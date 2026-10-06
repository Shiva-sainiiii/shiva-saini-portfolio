// Saara content yahin se edit karo — components ko chhoone ki zaroorat nahi.
const WA_NUMBER = "918813008167";

export const SITE = {
  name: "SHIVA SAINI",
  // Canonical URL. Custom domain lene par NEXT_PUBLIC_SITE_URL badal dena
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shivasainiportfolio.vercel.app",
  tagline: "CREATIVE • AI INTEGRATED • FULL STACK WEB DEVELOPER",
  role: "Full Stack Web Developer | Creative Developer | AI Integrated",
  bio: "I build immersive web experiences where design meets AI.",
  about:
    "I'm a self-driven full stack developer from Kharkhoda (Sonipat), Haryana. I build fast, responsive, AI-powered websites for businesses in Haryana and across India, and I like turning complex problems into clean, scalable solutions.",
  stats: ["10+ projects", "5+ certifications", "3 web development internships"],
  location: "Kharkhoda (Sonipat), Haryana, India",
  email: "shivasaini.5666@gmail.com",
  phone: "+91 88130 08167",
  phoneRaw: "+918813008167",
  whatsappUrl: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Shiva, I'd like a free demo website for my business.")}`,
  motto: "IDEAS → WEBSITES → GROWTH",
  resume: "https://shivasainiportfolio.vercel.app/assets/Shiva_Saini_Resume.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/Shiva-sainiiii" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shiva-sainiiii" },
    { label: "Instagram", href: "https://instagram.com/shiva_sainiiii" },
  ],
};

// Purane portfolio se projects ki list load nahi ho payi — descriptions aur links tum bharna.
export const PROJECTS = [
  { title: "Z-BLACK", desc: "A dark, motion-first web experience." },
  { title: "AI Tools", desc: "AI-powered utilities for everyday workflows." },
  { title: "Portfolio System", desc: "Portfolio with AI chat, live feedback and an owner-only admin panel." },
];

export const SKILLS = [
  "Next.js", "React", "JavaScript", "Node.js", "Three.js", "Framer Motion",
  "AI Integration", "Firebase", "Python (Flask)", "Tailwind",
];

// Newest pehle
export const EXPERIENCE = [
  { company: "Maincrafts Technology", role: "Web Development Intern", period: "Jun–Jul 2026" },
  { company: "OctaNet", role: "Web Development Intern", period: "Oct–Dec 2024" },
  { company: "CodSoft", role: "Web Development Intern", period: "Sep–Oct 2024" },
];

// Freelance services (visiting card se) — text yahan se edit karo
export const SERVICES = [
  { title: "Website Development", note: "Fast, responsive and AI-powered websites for your business." },
  { title: "Google Business Setup", note: "Show up on Google Search and Maps for local customers." },
  { title: "WhatsApp Business Setup", note: "Business profile, catalog and quick replies, set up properly." },
  { title: "Insta Business Boost", note: "A business-ready Instagram profile and growth support." },
];

// Team: phone hatana ho to us line ki phone field delete kar do
export const TEAM = [
  { name: "Lakshay Sharma", role: "CRM", city: "Rohtak", phone: "+91 7206357546" },
  { name: "Sahil Rajput", role: "CRM", city: "Sonipat", phone: "+91 7082308845" },
];
