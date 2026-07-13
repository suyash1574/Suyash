import React, { useState, useEffect } from 'react';
import './App.css';
import ParticlesCanvas from './components/ParticlesCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Certifications from './components/Certifications';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore shortcuts if user is typing in forms or search fields
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.isContentEditable
      )) {
        return;
      }

      const keyMap = {
        'a': 'about',
        's': 'skills',
        'e': 'experience',
        'p': 'projects',
        'c': 'contact',
        'h': 'hero'
      };

      const targetId = keyMap[e.key.toLowerCase()];
      if (targetId) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCloseProject = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSelectedProjectId(null);
      });
    } else {
      setSelectedProjectId(null);
    }
  };

  return (
    <>
      {/* Background Interactive Particles Canvas */}
      <ParticlesCanvas />

      {/* Header Navigation */}
      <Navbar />

      <main className="main-content">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Projects Showcase */}
        <Projects onSelectProject={setSelectedProjectId} />

        {/* Certifications Section */}
        <Certifications />

        {/* Contact Section */}
        <ContactForm />
      </main>

      {/* Footer copyright */}
      <Footer />

      {/* Interactive Project Case Studies Modal */}
      <ProjectModal 
        projectId={selectedProjectId} 
        onClose={handleCloseProject} 
      />
    </>
  );
}

export default App;
