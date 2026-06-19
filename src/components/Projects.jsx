import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    img: '/assets/project1.jpg',
    alt: 'Restaurant Menu AI',
    icon: '🍽️',
    title: 'Restaurant Menu AI',
    badge: 'AI',
    desc: 'An AI-powered menu generator using OpenRouter API with serverless functions and Firebase integration, deployed on Vercel.',
    tech: ['JavaScript', 'OpenRouter', 'Firebase', 'Vercel'],
    demo: 'https://restaurant-menu-ai.vercel.app/',
    github: 'https://github.com/Shiva-sainiiii/Restaurant-Menu-Ai-',
  },
  {
    img: '/assets/project2.jpg',
    alt: 'Code Editor AI',
    icon: '💻',
    title: 'Code Editor AI',
    badge: 'AI',
    desc: 'A browser-based code editor with AI assistance, supporting multiple languages with live preview and smart suggestions.',
    tech: ['HTML', 'CSS', 'JavaScript', 'AI API'],
    demo: 'https://code-editor-ai-taupe.vercel.app/',
    github: 'https://github.com/Shiva-sainiiii/Code-Editor-Ai',
  },
  {
    img: '/assets/project3.jpg',
    alt: 'Shanu AI Chatbot',
    icon: '🤖',
    title: 'Shanu AI Chatbot',
    badge: 'AI',
    desc: 'A conversational AI chatbot with real-time responses and modern UI powered by OpenRouter models.',
    tech: ['JavaScript', 'AI API', 'CSS'],
    demo: 'https://shanu-ai-iota.vercel.app/',
    github: 'https://github.com/Shiva-sainiiii/Shanu-Ai-',
  },
  {
    img: '/assets/project4.jpg',
    alt: 'Portfolio Website',
    icon: '🌐',
    title: 'Portfolio Website',
    badge: 'Web',
    desc: 'A modern personal portfolio with animations, AI chat integration, Firebase backend, and deployed on Vercel.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    demo: 'https://shivasainiportfolio.vercel.app/',
    github: 'https://github.com/Shiva-sainiiii/Shiva-Saini-Portfolio-',
  },
  {
    img: '/assets/project5.jpg',
    alt: 'AI Mind Trap',
    icon: '🧠',
    title: 'AI Mind Trap',
    badge: 'Game',
    desc: 'An interactive AI-based puzzle game that challenges user thinking with logic traps and smart responses.',
    tech: ['JavaScript', 'Game Logic', 'AI'],
    demo: 'https://ai-mind-trap.vercel.app/',
    github: 'https://github.com/Shiva-sainiiii/Ai-Mind-Trap',
  },
  {
    img: '/assets/project6.jpg',
    alt: 'AI Teaching Assistant',
    icon: '📚',
    title: 'AI Teaching Assistant',
    badge: 'AI',
    desc: 'An AI-based learning assistant supporting PDF/image upload and question answering for students.',
    tech: ['JavaScript', 'AI', 'File Upload'],
    demo: 'https://ai-teaching-assistants.vercel.app/',
    github: 'https://github.com/Shiva-sainiiii/Ai-Teaching-Assistants-',
  },
  {
    img: '/assets/project7.jpg',
    alt: 'Weather Info',
    icon: '🌦️',
    title: 'Weather Info',
    badge: 'Web',
    desc: 'A weather application showing real-time weather data using APIs with a clean UI.',
    tech: ['JavaScript', 'API', 'CSS'],
    demo: 'https://shiva-sainiiii.github.io/Weather-Info/',
    github: 'https://github.com/Shiva-sainiiii/Weather-Info',
  },
  {
    img: '/assets/project8.jpg',
    alt: 'Tic Tac Toe',
    icon: '🎮',
    title: 'Tic Tac Toe',
    badge: 'Game',
    desc: 'A classic Tic Tac Toe game with interactive UI and smooth gameplay experience.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://shiva-sainiiii.github.io/Tic-Tac-Toe/',
    github: 'https://github.com/Shiva-sainiiii/Tic-Tac-Toe',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const anim = gsap.from(el, {
      scrollTrigger: { trigger: el, start: isMobile ? 'top 100%' : 'top 85%', once: true },
      opacity: 0, y: 30, duration: 0.65, ease: 'power3.out',
      clearProps: 'opacity,transform'
    });

    if (!isMobile) {
      gsap.from(cardsRef.current, {
        scrollTrigger: { trigger: el.querySelector('.project-container'), start: 'top 82%', once: true, invalidateOnRefresh: true },
        opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        clearProps: 'opacity,transform'
      });
    }

    return () => { anim.scrollTrigger?.kill(); };
  }, []);

  return (
    <section className="section" id="projects" ref={sectionRef} aria-label="Projects">
      <p className="section-label">WHAT I&apos;VE BUILT</p>
      <h2 className="section-title">Featured Projects</h2>
      <p className="section-sub">A selection of my best work — click to explore</p>
      <div className="project-container">
        {PROJECTS.map((project, i) => (
          <article className="project-card" key={project.title} ref={(el) => (cardsRef.current[i] = el)}>
            <div className="project-img-wrap">
              <img src={project.img} alt={project.alt} loading="lazy" onError={(e) => e.target.parentElement.classList.add('img-fallback')} />
              <div className="project-img-placeholder"><span>{project.icon}</span></div>
            </div>
            <div className="project-info">
              <div className="project-top">
                <h3>{project.title}</h3>
                <div className="project-badge">{project.badge}</div>
              </div>
              <p>{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="project-buttons">
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-proj">🔗 Live Demo</a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-proj btn-proj-ghost">⌥ GitHub</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
