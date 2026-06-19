import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certs' },
  { href: '#ai-chat', label: 'AI Chat' },
  { href: '#feedback', label: 'Feedback' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const nav = navRef.current;
      const hamburger = document.querySelector('.hamburger');
      if (nav && !nav.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    if (typeof gsap !== 'undefined') {
      gsap.to(window, {
        duration: 0.9,
        scrollTo: { y: target, offsetY: 66 },
        ease: 'power3.inOut'
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav id="navbar" ref={navRef} className={scrolled ? 'scrolled' : ''} aria-label="Main navigation">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')} aria-label="Shiva Saini Home">
          SS
        </a>
        <ul className="nav-links" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={activeSection === href.slice(1) ? 'active' : ''} onClick={(e) => handleNavClick(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobile-nav" aria-label="Mobile navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={(e) => handleNavClick(e, href)}>
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}
