import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    icon: '🎨',
    title: 'Frontend',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'GSAP', 'Tailwind CSS'],
  },
  {
    icon: '⚙️',
    title: 'Backend',
    tags: ['Node.js', 'Python', 'Express.js', 'REST APIs', 'Serverless'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Platforms',
    tags: ['Firebase', 'Vercel', 'Git & GitHub', 'VS Code', 'Figma'],
  },
  {
    icon: '🤖',
    title: 'AI & Other',
    tags: ['OpenRouter API', 'Prompt Engineering', 'Particles.js', 'SEO Basics'],
  },
];

export default function Skills() {
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
        scrollTrigger: { trigger: el.querySelector('.skills-wrapper'), start: 'top 82%', once: true, invalidateOnRefresh: true },
        opacity: 0, y: 36, stagger: 0.1, duration: 0.65, ease: 'power3.out',
        clearProps: 'opacity,transform'
      });
    }

    return () => { anim.scrollTrigger?.kill(); };
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef} aria-label="Skills">
      <p className="section-label">WHAT I KNOW</p>
      <h2 className="section-title">Tech Stack &amp; Skills</h2>
      <p className="section-sub">Technologies I work with on a daily basis</p>
      <div className="skills-wrapper">
        {SKILL_GROUPS.map((group, i) => (
          <div key={group.title} className="skill-group" ref={(el) => (cardsRef.current[i] = el)}>
            <div className="skill-group-header">
              <span className="skill-group-icon">{group.icon}</span>
              <h3>{group.title}</h3>
            </div>
            <div className="skill-tags">
              {group.tags.map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
