import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="header">
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-accent">&lt;</span>Suyash<span className="logo-accent"> /&gt;</span>
        </a>
        <nav className="nav-menu">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="btn-theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle dark/light theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun" style={{ color: '#ffbd2e' }}></i>
            ) : (
              <i className="fa-solid fa-moon" style={{ color: '#9d4edd' }}></i>
            )}
          </button>
          
          <a 
            href="assets/resume/Suyash_Zinjurke.pdf" 
            download="Suyash_Zinjurke.pdf" 
            className="btn btn-outline nav-resume-btn" 
            id="nav-resume-cta"
          >
            <i className="fa-solid fa-download"></i> Resume
          </a>
        </div>
      </div>
    </header>
  );
}
