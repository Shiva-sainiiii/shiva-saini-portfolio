import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import OfferLetters from './components/OfferLetters';
import AIChat from './components/AIChat';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ParticlesBackground from './components/ParticlesBackground';
import Toast from './components/Toast';
import Lightbox from './components/Lightbox';
import { ToastProvider } from './hooks/useToast.jsx';
import { LightboxProvider } from './hooks/useLightbox.jsx';

function App() {
  return (
    <ToastProvider>
      <LightboxProvider>
        <ScrollProgress />
        <ParticlesBackground />
        <Toast />
        <Navbar />
        <Hero />
        <Highlights />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <OfferLetters />
        <AIChat />
        <Feedback />
        <Contact />
        <Footer />
        <Lightbox />
      </LightboxProvider>
    </ToastProvider>
  );
}

export default App;
