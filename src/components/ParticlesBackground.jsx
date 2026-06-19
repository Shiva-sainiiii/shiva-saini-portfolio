import { useEffect } from 'react';

export default function ParticlesBackground() {
  useEffect(() => {
    const loadParticles = () => {
      if (typeof window.particlesJS === 'undefined') {
        // particles.js is loaded via CDN but may not be available yet
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.onload = initParticles;
        document.body.appendChild(script);
      } else {
        initParticles();
      }
    };

    const initParticles = () => {
      if (typeof window.particlesJS === 'undefined') return;
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 73, density: { enable: true, value_area: 900 } },
          color: { value: ['#8a2be2', '#00d4ff', '#a855f7'] },
          shape: { type: 'circle' },
          opacity: {
            value: .49,
            random: true,
            anim: { enable: true, speed: 0.6, opacity_min: 0.1, sync: false }
          },
          size: { value: 2.5, random: true, anim: { enable: false } },
          line_linked: { enable: true, distance: 150, color: '#8a2be2', opacity: 0.12, width: 1 },
          move: {
            enable: true, speed: 1.5, direction: 'none',
            random: true, straight: false, out_mode: 'out', bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 160, line_linked: { opacity: 0.35 } },
            push: { particles_nb: 3 }
          }
        },
        retina_detect: true
      });
    };

    loadParticles();
  }, []);

  return <div id="particles-js" />;
}
