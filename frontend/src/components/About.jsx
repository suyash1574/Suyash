import React from 'react';

const PROFILE_JSON = `{
  "name": "Suyash Zinjurke",
  "role": "AI Engineer / Data Analyst",
  "location": "Pune, India",
  "interests": [
    "Python Automation",
    "NLP / LLMs",
    "ETL Pipelines",
    "Interactive Dashboards"
  ],
  "languages": ["Python", "SQL"]
}`;

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="section-title"><span className="title-number">01.</span> About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I am a final-year B.Tech student in <strong>Artificial Intelligence & Data Science</strong> at AISSMS IOIT, Pune. My technical foundation centers on building data-driven automation systems, processing unstructured text via NLP, and designing clean ETL pipelines.
            </p>
            <p>
              I enjoy solving real-world challenges through code—whether that means implementing multi-agent reasoning models for simulated interview platforms, automating complex log analysis pipelines for embedded systems, or deploying interactive business intelligence dashboards to guide executive decisions.
            </p>
            <div className="education-card">
              <div className="edu-icon"><i className="fa-solid fa-graduation-cap"></i></div>
              <div className="edu-details">
                <h3>B.Tech in Artificial Intelligence & Data Science</h3>
                <p className="edu-meta">AISSMS IOIT, Pune | Sep 2022 – Jun 2026</p>
                <div className="edu-score"><span className="badge">CGPA: 7.92</span></div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="profile-card">
              <div className="terminal-header">
                <span className="term-dot dot-red"></span>
                <span className="term-dot dot-yellow"></span>
                <span className="term-dot dot-green"></span>
                <span className="term-title">suyash_profile.sh</span>
              </div>
              <div className="terminal-body">
                <p className="term-line"><span class="term-prompt">$</span> cat profile.json</p>
                <pre className="term-output"><code>{PROFILE_JSON}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
