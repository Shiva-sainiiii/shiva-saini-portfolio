import { useEffect, useRef } from 'react';

const PHRASES = ['Frontend Developer', 'UI/UX Enthusiast', 'AI Explorer', 'Creative Coder', 'Problem Solver'];

export default function Hero() {
  const typedRef = useRef(null);
  const nameRef = useRef(null);
  const hasTyped = useRef(false);
  const hasScrambled = useRef(false);

  useEffect(() => {
    if (hasTyped.current) return;
    hasTyped.current = true;
    const el = typedRef.current;
    if (!el) return;

    let phraseIdx = 0, charIdx = 0, deleting = false;
    function tick() {
      const current = PHRASES[phraseIdx];
      el.textContent = deleting ? current.slice(0, charIdx--) : current.slice(0, charIdx++);
      let delay = deleting ? 60 : 100;
      if (!deleting && charIdx === current.length + 1) { delay = 1800; deleting = true; }
      else if (deleting && charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % PHRASES.length; delay = 400; }
      setTimeout(tick, delay);
    }
    tick();
  }, []);

  useEffect(() => {
    if (hasScrambled.current) return;
    hasScrambled.current = true;
    const el = nameRef.current;
    if (!el) return;
    const finalText = el.textContent.trim();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let iteration = 0;
    let frame;
    el.style.whiteSpace = 'nowrap';
    el.style.overflow = 'hidden';
    el.style.display = 'block';

    function scramble() {
      el.textContent = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < Math.floor(iteration)) return finalText[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration < finalText.length) {
        iteration += 0.18;
        frame = requestAnimationFrame(scramble);
      } else {
        el.textContent = finalText;
        el.style.whiteSpace = '';
        el.style.overflow = '';
      }
    }
    setTimeout(() => {
      iteration = 0;
      cancelAnimationFrame(frame);
      scramble();
    }, 1500);
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero-content">
        <span className="hero-badge">✦ Available for Opportunities</span>
        <h1 className="name" ref={nameRef}>Shiva Saini</h1>
        <div className="typing-wrap" aria-live="polite">
          <span id="typed-text" ref={typedRef}></span>
          <span className="cursor" aria-hidden="true"></span>
        </div>
        <p className="tagline">Building Ideas into Reality</p>
        <p className="hero-desc">
          A passionate developer crafting modern web experiences — from elegant UI to powerful backends.
          I love turning complex problems into clean, scalable solutions.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn" onClick={(e) => handleScroll(e, '#projects')}>View My Work</a>
          <a href="/assets/Shiva_Saini_Resume.pdf" className="btn btn-outline" target="_blank" rel="noopener">
            ↓ Download CV
          </a>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
}
