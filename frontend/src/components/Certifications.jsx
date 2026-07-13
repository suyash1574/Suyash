import React from 'react';

const CERTS_DATA = [
  { title: 'Generative AI Professional', organization: 'Oracle Cloud' },
  { title: 'AI Foundations Associate', organization: 'Oracle Cloud' },
  { title: 'Master Tableau', organization: 'iNeuron' },
  { title: 'Power BI Data Visualization', organization: 'Simplilearn' },
  { title: 'Data Analysis with Python', organization: 'IBM' },
  { title: 'AI For India 2.0', organization: 'GUVI' }
];

export default function Certifications() {
  return (
    <section className="certifications-section" id="certs">
      <div className="container">
        <h2 className="section-title"><span className="title-number">05.</span> Certifications</h2>
        <div className="certs-grid">
          {CERTS_DATA.map((cert, idx) => (
            <div 
              className="cert-card reveal-staggered" 
              key={idx}
              style={{ '--i': idx }}
            >
              <div className="cert-icon"><i className="fa-solid fa-ribbon"></i></div>
              <div className="cert-info">
                <h4>{cert.title}</h4>
                <p>{cert.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
