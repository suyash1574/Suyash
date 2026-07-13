import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="pulse-dot"></span> Available for Internships & Projects
          </div>
          <h1 className="hero-title">
            Building Intelligent <br />
            <span className="text-accent">Automation & AI</span> Systems
          </h1>
          <p className="hero-subtitle">
            Hi, I'm <strong className="highlight-name">Suyash Zinjurke</strong>, an AI Engineer and Data Analyst. I specialize in building Python automation scripts, ETL pipelines, NLP pipelines, and interactive dashboards.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary" id="hero-contact-cta">
              Get in Touch <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a 
              href="assets/resume/Suyash_Zinjurke.pdf" 
              download="Suyash_Zinjurke.pdf" 
              className="btn btn-secondary" 
              id="hero-resume-cta"
            >
              <i className="fa-solid fa-file-pdf"></i> Download Resume
            </a>
          </div>
          <div className="social-links">
            <a 
              href="https://github.com/suyash1574" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon" 
              title="GitHub" 
              id="social-github"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/suyash-zinjurke-9045832a5/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon" 
              title="LinkedIn" 
              id="social-linkedin"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a 
              href="https://hackerrank.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon" 
              title="HackerRank" 
              id="social-hackerrank"
            >
              <i className="fa-brands fa-hackerrank"></i>
            </a>
            <a href="mailto:zinjurke77h@gmail.com" className="social-icon" title="Email" id="social-email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
