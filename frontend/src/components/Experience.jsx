import React from 'react';

const EXPERIENCE_DATA = [
  {
    role: 'AI & Automation Intern',
    company: 'Knorr-Bremse Technology Centre India',
    duration: 'Mar 2026 – Present',
    bullets: [
      'Built Python automation scripts to reduce manual workflow effort across embedded codebases.',
      'Applied AI-based methods to parse and analyze software logs, improving overall system debugging.',
      'Analyzed embedded code architectures to find optimization opportunities in core components.',
      'Developed internal visualization tools to improve file system representation and workflow transparency.'
    ]
  },
  {
    role: 'Data Analytics Intern',
    company: 'NexGen Analytix',
    duration: 'Feb 2025 – Apr 2025',
    bullets: [
      'Created interactive Power BI and Tableau dashboards to track business KPIs and analytics.',
      'Built robust ETL pipelines using Python and SQL to clean, process, and restructure raw database datasets.',
      'Optimized analytics reporting workflows, reducing manual operations and improving data accessibility for teams.'
    ]
  }
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <h2 className="section-title"><span className="title-number">03.</span> Experience</h2>
        <div className="timeline">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div 
              className="timeline-item reveal-staggered" 
              key={idx}
              style={{ '--i': idx }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-date">{exp.duration}</div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <span className="timeline-company">{exp.company}</span>
                </div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
