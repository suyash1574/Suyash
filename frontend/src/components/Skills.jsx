import React, { useState } from 'react';

const SKILLS_DATA = [
  {
    icon: 'fa-code',
    title: 'Languages',
    tags: ['Python', 'SQL']
  },
  {
    icon: 'fa-robot',
    title: 'AI & NLP',
    tags: ['Transformers', 'LangChain', 'FAISS', 'TensorFlow', 'Scikit-learn']
  },
  {
    icon: 'fa-database',
    title: 'Data Engineering',
    tags: ['ETL Pipelines', 'Data Cleaning', 'API Extraction', 'Pandas', 'NumPy']
  },
  {
    icon: 'fa-chart-column',
    title: 'BI & Visualization',
    tags: ['Power BI', 'Tableau', 'Matplotlib', 'OpenCV']
  },
  {
    icon: 'fa-cloud',
    title: 'Cloud & Databases',
    tags: ['Google BigQuery', 'AWS (Basics)', 'SQLite', 'PostgreSQL']
  }
];

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.trim().toLowerCase();

  // Filter skills: Category matches if category title matches OR any of its tags matches the query
  const filteredSkills = SKILLS_DATA.filter(cat => {
    if (!query) return true;
    const titleMatch = cat.title.toLowerCase().includes(query);
    const tagMatch = cat.tags.some(tag => tag.toLowerCase().includes(query));
    return titleMatch || tagMatch;
  });

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="section-title"><span className="title-number">02.</span> Technical Skills</h2>
        
        {/* Search bar container */}
        <div className="skills-search-container">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            placeholder="Search skills (e.g., Python, SQL, LangChain, Power BI)..." 
            className="skills-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        {filteredSkills.length > 0 ? (
          <div className="skills-grid">
            {filteredSkills.map((cat, idx) => (
              <div 
                className="skill-category-card reveal-staggered" 
                key={idx} 
                style={{ '--i': idx }}
              >
                <div className="card-icon"><i className={`fa-solid ${cat.icon}`}></i></div>
                <h3>{cat.title}</h3>
                <div className="tags-container">
                  {cat.tags.map((tag, tIdx) => {
                    const isHighlighted = query && tag.toLowerCase().includes(query);
                    return (
                      <span 
                        className={`skill-tag ${isHighlighted ? 'highlighted-tag' : ''}`} 
                        key={tIdx}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-skills-msg">
            <i className="fa-solid fa-circle-info"></i> No technical skills match your search for "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
}
