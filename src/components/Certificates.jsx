import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLightbox } from '../hooks/useLightbox.jsx';

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  { img: '/assets/certificate1.jpg', alt: 'Certificate 1', label: 'Web Development Internship (OCTANET Pvt Ltd)' },
  { img: '/assets/certificate2.jpg', alt: 'Certificate 2', label: 'AI For Beginners (MICROSOFT)' },
  { img: '/assets/certificate3.jpg', alt: 'Certificate 3', label: 'Data Entry Operator (IT/ITes)' },
  { img: '/assets/certificate4.jpg', alt: 'Certificate 4', label: 'ADCA (Sunshine Campus)' },
  { img: '/assets/certificate5.jpg', alt: 'Certificate 5', label: 'CRM (IT/ITeS)' },
  { img: '/assets/certificate6.jpg', alt: 'Certificate 6', label: 'Web Development Internship (CODSOFT)' },
];

export default function Certificates() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const { open } = useLightbox();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const anim = gsap.from(el, {
      scrollTrigger: { trigger: el, start: isMobile ? 'top 100%' : 'top 85%', once: true },
      opacity: 0, y: 30, duration: 0.65, ease: 'power3.out',
      clearProps: 'opacity,transform'
    });
    gsap.from(cardsRef.current, {
      scrollTrigger: { trigger: el.querySelector('.cert-grid'), start: isMobile ? 'top 100%' : 'top 80%', once: true, invalidateOnRefresh: true },
      opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      clearProps: 'opacity,transform'
    });
    return () => { anim.scrollTrigger?.kill(); };
  }, []);

  const handleKey = (e, cert) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open(cert.img, cert.alt);
    }
  };

  return (
    <section className="section" id="certificates" ref={sectionRef} aria-label="Certificates">
      <p className="section-label">PROOF OF LEARNING</p>
      <h2 className="section-title">Certificates</h2>
      <p className="section-sub">Courses and certifications I&apos;ve completed</p>
      <div className="cert-grid">
        {CERTS.map((cert, i) => (
          <div
            key={cert.label}
            className="certificate-card"
            onClick={() => open(cert.img, cert.alt)}
            role="button"
            tabIndex={0}
            aria-label={`View ${cert.label}`}
            onKeyDown={(e) => handleKey(e, cert)}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <img
              src={cert.img}
              alt={cert.alt}
              loading="lazy"
              onError={(e) => {
                e.target.src = '';
                e.target.closest('.certificate-card').classList.add('cert-fallback');
              }}
            />
            <div className="cert-label">{cert.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
