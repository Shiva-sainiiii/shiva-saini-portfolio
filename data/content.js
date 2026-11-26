// Saara content yahin se badlo. Khali ("" ya null) values wali links/rows site pe apne aap hide ho jaati hain.
export const site = {
  name: "Shiva Saini",
  wa: "918813008167",
  email: "shivasaini.5666@gmail.com",
  phone: "+91 88130 08167",
  location: "Kharkhoda (Sonipat), Haryana 131402",
  mapEmbed: "https://www.google.com/maps?q=Kharkhoda%2C%20Sonipat%2C%20Haryana%20131402&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Kharkhoda+Haryana+131402",
  github: "https://github.com/Shiva-sainiiii", linkedin: "https://www.linkedin.com/in/shiva-sainiiii", resume: "/resume.pdf", // resume: public/resume.pdf
  photo: "/me-new.jpg", // public/me-new.jpg; null karoge to logo dikhega
  moreDemos: "https://egsite.vercel.app",
  sapnaUrl: "https://drsapnadentalrohtak.com/",
  easyUrl: "https://easydevops.vercel.app",
};
export const wa = (t = "Hi Shiva, I want a website for my business") =>
  `https://wa.me/${site.wa}?text=${encodeURIComponent(t)}`;

// Hero signboard ki do lines. Yahin se badlo (har line chhoti rakho, mobile par bhi ek line mein aani chahiye).
// Hero ke neeche stats. clients: happy clients ka number (khali rakhoge to hide ho jayega).
export const heroStats = { clients: "3+" };
export const heroLines = ["Your business,", "Now online."];

// result: jab asli number/line ho tab bharo (khali = row hide). image = desktop screenshot, mobile = phone screenshot (dono public/shots/ me hain).
export const sapna = { result: "", image: "/shots/sapna-desktop.webp", mobile: "/shots/sapna-mobile.jpg" };

export const templates = [
  { name: "Dentist", text: "Clinic site with booking, treatments and a chatbot.", c: ["#0e5a6b", "#7fe3f0"], demo: "https://egsite.vercel.app/samples/dental/3d/index.html" },
  { name: "Gym", text: "Plans, trainers and membership enquiries that convert.", c: ["#7a1212", "#ff6a4d"], demo: "https://egsite.vercel.app/samples/gym/frd/index.html" },
  { name: "Jeweller", text: "Showroom feel, catalogue and investment calculator.", c: ["#6b4a12", "#f5d889"] },
  { name: "Cafe", text: "Menu, gallery and table bookings on WhatsApp.", c: ["#4a2c17", "#e6b27a"] },
  { name: "Real Estate", text: "Property listings with maps and lead capture.", c: ["#12354a", "#8fd0ff"] },
];
export const services = [
  ["Website Development", "Fast, responsive and AI-powered websites for your business."],
  ["AI Automation Setup", "Replies to enquiries, lead sorting and reminders handled automatically with AI and WhatsApp, so you stop doing the same work twice."],
  ["Custom CRM", "Your own CRM to track leads, follow-ups and customers, built around how your business actually works."],
  ["AI Chatbot", "A chatbot for your website or WhatsApp that answers customer questions and passes serious leads to you."],
  ["Web App & Admin Panel", "Dashboards, booking systems and admin panels, so you can update your site and manage orders yourself."],
  ["Google Business Setup", "Show up on Google Search and Maps for local customers."],
  ["WhatsApp Business Setup", "Business profile, catalog and quick replies, set up properly."],
  ["Insta Business Boost", "A business-ready Instagram profile and growth support."],
  ["Local SEO", "Titles, pages, sitemap and Google profile set up so people in your city can find you."],
  ["Hosting, Domain & Deployment", "Domain, hosting and deployment set up and looked after, so the site stays online and fast."],
];
export const process = [
  ["Free demo", "Tell me about your business on WhatsApp. I make a demo website before you pay anything."],
  ["Build", "A fast website for your business. Booking or an AI assistant only where it actually helps."],
  ["Launch", "Google Business and WhatsApp Business set up, so customers can find you and message you."],
];
// [naam, stack, description, live link, code link, [screenshots]] — screenshots public/shots/ me rakho
export const projects = [
  ["EasyDevOps", "Next.js · GitHub OAuth · Platform APIs", "Deploy from chat, no CLI: GitHub, Vercel, Netlify and Render on phone and laptop.", "https://easydevops.vercel.app", "", ["/shots/easydevops.webp"]],
  ["CodeAgent", "Vanilla JS · AI API", "Mobile-first coding assistant with live preview and self-testing.", "https://codeagentai.vercel.app/", "https://github.com/Shiva-sainiiii/Code-Editor-Ai", []],
  ["Code Editor AI", "AI · Web app", "AI-assisted code editor in the browser.", "https://code-editor-ai-taupe.vercel.app/", "", []],
  ["Code Editor AI 2", "AI · Web app", "Second build of the AI code editor.", "https://codeeditorai-blush.vercel.app/", "", []],
  ["Snake Rush", "Canvas · Vanilla JS", "Browser slither game with AI snakes that have personalities.", "https://snakerushgame.vercel.app/", "https://github.com/Shiva-sainiiii/SnakeRush", ["/shots/snake-rush-game.webp"]],
  ["GuessArt", "PeerJS · WebRTC · Canvas", "Multiplayer drawing and guessing game with voice chat. Peer to peer, no backend.", "https://guessart.vercel.app/", "", ["/shots/guessart.webp"]],
  ["AI Mind Trap", "AI · Quiz game", "Quiz and puzzle game that tries to trap your mind.", "https://ai-mind-trap.vercel.app/", "", []],
  ["Online Games", "Web games", "A hub of small browser games.", "https://onlinegames-one.vercel.app/", "", []],
  ["Horror Tic Tac Toe", "Web game", "Tic tac toe with a horror twist.", "https://horrortictactoe.vercel.app/", "", []],
  ["Ominikit", "Vanilla JS · HTML · CSS", "One toolbox of dev, social, business and productivity tools.", "https://omnikithub.vercel.app/", "", []],
  ["Shanu AI Chatbot", "AI · Chatbot", "AI chatbot web app.", "https://shanu-ai-chatbot.vercel.app/", "", []],
  ["AI Teaching Assistants", "AI · Web app", "AI assistants that help with teaching and learning.", "https://ai-teaching-assistants.vercel.app/", "", []],
  ["AI Vision Board", "AI · Web app", "Build a vision board with AI.", "https://ai-vision-board-one.vercel.app/", "", []],
  ["Shanu SMM Panel", "Web app", "Social media marketing panel.", "https://shanusmmpanel.vercel.app/", "", []],
  ["Blog Website", "Supabase · OpenRouter · Vercel", "A blog where human writing meets AI.", "https://ai-blog-gamma-lyart.vercel.app/", "https://github.com/Shiva-sainiiii/ai-blog", []],
  ["The Untold Life", "Book website", "Website for my book, The Untold Life: A Boy Who Refused To Break.", "https://the-untold-life.vercel.app/", "", []],
];
export const easy = [
  ["Problem", "June 2026, coding from a phone: GitHub meant adding and deleting files one by one, and Vercel meant a separate tab to import a repo and deploy."],
  ["What it does now", "Create and delete repos, edit files, upload files, a folder or a zip, manage branches and pull requests, import and deploy to Vercel, Netlify and Render, set env vars (or import a .env file), watch live build logs and roll back."],
  ["Rules first, AI second", "Around 80 to 90 percent of everyday commands run on a rule-based parser with zero AI. AI handles complex asks like generating code or explaining a failed build, on the user's own Google AI Studio or OpenRouter key. Every reply shows whether rules or AI ran."],
  ["Many tasks, one message", "“Create a repo, add index.html with this code and deploy it” runs as ordered steps. Pasted code is never altered or sent to AI, and the first failure stops the plan with a clear checklist."],
  ["Safe by design", "GitHub OAuth sign-in, tokens and keys encrypted at rest, and a confirmation before delete, merge or rollback. Confirmations are signed, single-use and expire in 15 minutes."],
  ["Phone and laptop", "Built phone-first (swipe actions, pull to refresh, undo toast), now just as comfortable on a laptop, with chats synced across devices. It understands Hinglish and supports teamwork: invite a friend, they open a pull request, you compare and merge."],
];
export const experience = [
  ["Maincrafts Technology", "Web Development Intern", "Jun–Jul 2026"],
  ["OctaNet", "Web Development Intern", "Oct–Dec 2024"],
  ["CodSoft", "Web Development Intern", "Sep–Oct 2024"],
];
// image: public/certs/ mein file rakho aur "/certs/name.jpg" likho
export const certs = [
  ["Maincrafts Technology", "Internship", "/certs/maincrafts-internship.jpg"],
  ["Letter of Recommendation", "Maincrafts Technology", "/certs/maincrafts-recommendation.jpg"],
  ["Web Development Internship", "OCTANET Pvt Ltd", "/certs/octanet-internship.jpg"],
  ["AI For Beginners", "Microsoft", "/certs/microsoft-ai.jpg"],
  ["Data Entry Operator", "IT/ITeS", "/certs/data-entry-operator.jpg"],
  ["ADCA", "Sunshine Campus", "/certs/adca.jpg"],
  ["CRM", "IT/ITeS", "/certs/crm.jpg"],
  ["Web Development Internship", "CODSOFT", "/certs/codsoft-internship.jpg"],
].map(([title, by, image]) => ({ title, by, image }));
export const askChips = ["What did you build for Dr. Sapna?", "Which stack do you use?", "Can you make a site for my gym?"];
// AI ko jo context milega
export const aiContext = `You are Shiva Saini's portfolio assistant. Answer briefly and only from this info.
Shiva is a full-stack developer (Next.js, Supabase, AI) from Kharkhoda, Haryana, with 3 web internships.
Client work: Dr. Sapna's Dental Care, Rohtak: clinic website, admin panel she runs herself, Gemini chatbot.
Services: website development, AI automation setup, custom CRM, AI chatbot, web app and admin panel, Google Business setup, WhatsApp Business setup, Insta business boost, local SEO, hosting/domain/deployment. Templates: dentist, gym, jeweller, cafe, real estate.
Process: free demo first, then build, then launch.
Projects: EasyDevOps (deploy from chat to GitHub, Vercel, Netlify and Render, no CLI, English and Hinglish, on phone and laptop), CodeAgent, Snake Rush, Blog Website.\nFree courses on this site at /courses: Python, JavaScript, HTML and CSS, SQL, Git and GitHub, Cloud Computing, Generative AI and Prompting, and Get Your Local Business Online. Each has chapters, copyable code, outputs, quizzes and a scorecard.
For pricing or hiring, tell them to message Shiva on WhatsApp (${site.phone}). If unsure, say so.`;

// Home page ke FAQ. Visible bhi hain aur Google ke liye FAQ schema bhi inse banta hai.
export const homeFaq = [
  ["Do you really make a demo before I pay?", "Yes. Tell me about your business on WhatsApp and I make a demo website before you pay anything."],
  ["Which businesses do you build websites for?", "Clinics, gyms, cafes, jewellers, real estate and other local shops and services in Sonipat, Rohtak and across Haryana."],
  ["Where are you based?", `I am based in ${site.location}. I work with businesses across Haryana, and online with anyone who prefers WhatsApp.`],
  ["What do you build websites with?", "Next.js, Supabase and AI tools where they actually help, like a chatbot that answers customer questions."],
  ["Do you offer AI automation or a custom CRM?", "Yes. I set up AI automation (for example WhatsApp enquiry replies and lead sorting) and build custom CRMs and admin panels around how your business works. Message me on WhatsApp and I will suggest what fits."],
  ["Are the courses really free?", "Yes. All the courses (Python, JavaScript, HTML and CSS, SQL, Git, Cloud Computing, AI prompting and local business marketing) are free, with no sign-up. Your progress and quiz scores are saved only in your own browser."],
  ["Do you also set up Google Business and WhatsApp Business?", "Yes. Google Business Setup and WhatsApp Business Setup are part of what I do, so customers can find you on Google and message you."],
  ["How do I contact you?", `Message me on WhatsApp at ${site.phone}, or email ${site.email}.`],
];
