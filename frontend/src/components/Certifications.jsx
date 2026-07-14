import React from 'react';

const CERTS_DATA = [
  { 
    title: 'Generative AI Professional', 
    organization: 'Oracle Cloud',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=8A29F3F62E71F00FF4239DC8231679FE0E550CEA9DBFEA28B562FA6D6EF81C67'
  },
  { 
    title: 'AI Foundations Associate', 
    organization: 'Oracle Cloud',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=326A7AB439921D94362C28EB499D6B53CEAF7A81E9C0B01D2DE24E48B45A3809'
  },
  { 
    title: 'Master Tableau', 
    organization: 'iNeuron',
    link: 'https://learn.ineuron.ai/certificate/2e11c53e-c2f6-46d6-a071-d4307514e446'
  },
  { 
    title: 'Power BI Data Visualization', 
    organization: 'Simplilearn',
    link: 'https://www.linkedin.com/in/suyash-zinjurke-9045832a5/details/certifications/'
  },
  { 
    title: 'Data Analysis with Python', 
    organization: 'IBM',
    link: 'https://www.coursera.org/account/accomplishments/verify/RN5QZLELPLYS'
  },
  { 
    title: 'AI For India 2.0', 
    organization: 'GUVI',
    link: 'https://www.linkedin.com/in/suyash-zinjurke-9045832a5/details/certifications/1707909447023/'
  }
];

export default function Certifications() {
  return (
    <section className="certifications-section" id="certs">
      <div className="container">
        <h2 className="section-title"><span className="title-number">05.</span> Certifications</h2>
        <div className="certs-grid">
          {CERTS_DATA.map((cert, idx) => (
            <a 
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card reveal-staggered" 
              key={idx}
              style={{ '--i': idx, textDecoration: 'none', color: 'inherit' }}
            >
              <div className="cert-icon"><i className="fa-solid fa-ribbon"></i></div>
              <div className="cert-info">
                <h4>{cert.title}</h4>
                <p>{cert.organization}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
