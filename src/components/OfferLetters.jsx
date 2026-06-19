import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OFFERS = [
  { icon: '🌐', company: 'PAYTM', role: 'Web Developer Intern', file: '/assets/offer1.pdf' },
  { icon: '🎨', company: 'WISHFIN', role: 'Frontend Intern', file: '/assets/offer2.pdf' },
  { icon: '⚙️', company: 'CITYMALL', role: 'Full Stack Intern', file: '/assets/offer3.pdf' },
  { icon: '🏢', company: 'PAISABAZAR', role: 'Web Developer Intern', file: '/assets/offer4.pdf' },
];

export default function OfferLetters() {
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
    <section className="section" id="offers" ref={sectionRef} aria-label="Offer letters">
      <p className="section-label">RECOGNITION</p>
      <h2 className="section-title">Offer Letters</h2>
      <p className="section-sub">Internship and collaboration opportunities received</p>
      <div className="offer-gallery">
        {OFFERS.map((offer) => (
          <div className="offer-card" key={offer.company}>
            <span className="offer-icon">{offer.icon}</span>
            <p>{offer.company}<br /><small>{offer.role}</small></p>
            <a href={offer.file} target="_blank" rel="noopener noreferrer" className="btn-small">View Letter</a>
          </div>
        ))}
      </div>
    </section>
  );
}
