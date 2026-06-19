import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const anim = gsap.from(el, {
      scrollTrigger: { trigger: el, start: isMobile ? 'top 100%' : 'top 85%', once: true },
      opacity: 0, y: 30, duration: 0.65, ease: 'power3.out',
      clearProps: 'opacity,transform'
    });
    return () => { anim.scrollTrigger?.kill(); };
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef} aria-label="About me">
      <p className="section-label">WHO I AM</p>
      <h2 className="section-title">About Me</h2>
      <p className="section-sub">A quick look at who I am and what I bring to the table</p>
      <div className="about-inner glass">
        <div className="about-text">
          <p>
            Hey! I&apos;m <strong>Shiva Saini</strong>, a self-driven developer passionate about building
            things that live on the internet. I specialize in creating modern, performant web applications
            with clean code and intuitive user experiences.
          </p>
          <br />
          <p>
            I&apos;m constantly learning — from exploring new frameworks to diving deep into AI integrations.
            I believe great software is equal parts logic and creativity, and I bring both to every project.
          </p>
          <div className="about-tags">
            <span>🎯 Problem Solver</span>
            <span>⚡ Fast Learner</span>
            <span>🎨 UI Enthusiast</span>
            <span>🤖 AI Explorer</span>
          </div>
        </div>
        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-num">10+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">5+</div>
            <div className="stat-label">Certifications Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">3+</div>
            <div className="stat-label">Offer Letters Received</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">∞</div>
            <div className="stat-label">Curiosity &amp; Drive</div>
          </div>
        </div>
      </div>
    </section>
  );
}
