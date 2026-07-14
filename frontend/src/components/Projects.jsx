import React, { useState, useEffect } from 'react';

const OFFLINE_REPOS = [
  {
    id: 'ai-interview',
    title: 'AI Interview System',
    desc: 'An AI-powered mock interview simulator with multi-agent evaluation scorecards and dynamic question compilers.',
    url: 'https://github.com/Final-Year-B-Tech-Project/main-copy',
    language: 'Python',
    stars: 0,
    forks: 0,
    issues: 0,
    pushedAt: '2026-07-13T00:00:00Z',
    topics: ['Flask', 'Gemini AI', 'LangChain']
  },
  {
    id: 'BigQuery-ETL-Pipeline',
    title: 'BigQuery-ETL-Pipeline',
    desc: 'An automated ETL pipeline loading, converting, and schema-validating large transactional sales logs into Google BigQuery.',
    url: 'https://github.com/Suyash-Projects/BigQuery-ETL-Pipeline',
    language: 'Python',
    stars: 1,
    forks: 0,
    issues: 0,
    pushedAt: '2026-07-10T00:00:00Z',
    topics: ['Python', 'SQL', 'BigQuery', 'ETL']
  },
  {
    id: 'Agriculture-Prediction-Plant-Analysis',
    title: 'Agriculture-Prediction-Plant-Analysis',
    desc: 'Computer vision and deep learning models detecting crop anomalies, leaf classifications, and yield parameters.',
    url: 'https://github.com/Suyash-Projects/Agriculture-Prediction-Plant-Analysis',
    language: 'Python',
    stars: 0,
    forks: 0,
    issues: 0,
    pushedAt: '2026-07-08T00:00:00Z',
    topics: ['Deep Learning', 'PyTorch', 'Computer Vision']
  },
  {
    id: 'Blog-Generation-System',
    title: 'Blog-Generation-System',
    desc: 'A text-generation backend engine compiling rich blog templates from user bullet points using Llama-3 NLP APIs.',
    url: 'https://github.com/Suyash-Projects/Blog-Generation-System',
    language: 'Python',
    stars: 0,
    forks: 0,
    issues: 0,
    pushedAt: '2026-07-05T00:00:00Z',
    topics: ['NLP', 'Llama-3', 'Flask', 'Prompt Engineering']
  },
  {
    id: 'Credit-Card-Dashboard',
    title: 'Credit-Card-Dashboard',
    desc: 'Interactive visual reporting dashboard analyzing transaction trends, customer retention rates, and risk profiles.',
    url: 'https://github.com/Suyash-Projects/Credit-Card-Dashboard',
    language: 'Power BI',
    stars: 0,
    forks: 0,
    issues: 0,
    pushedAt: '2026-07-01T00:00:00Z',
    topics: ['Power BI', 'Data Analysis', 'DAX']
  }
];

const ALLOWED_REPOS = [
  'main-copy',
  'vedrix',
  'bigquery-etl-pipeline',
  'agriculture-prediction-plant-analysis',
  'blog-generation-system',
  'credit-card-dashboard',
  'premanand-ai',
  'agriculture-prediction'
];

export default function Projects({ onSelectProject }) {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const [userRes, orgRes] = await Promise.all([
          fetch('https://api.github.com/users/suyash1574/repos'),
          fetch('https://api.github.com/orgs/Suyash-Projects/repos')
        ]);

        if (!userRes.ok || !orgRes.ok) {
          // If rate limited or error occurred
          if (userRes.status === 403 || orgRes.status === 403) {
            throw new Error('rate-limit');
          }
          throw new Error('network-error');
        }

        const userRepos = await userRes.json();
        const orgRepos = await orgRes.json();

        const mergedRepos = [...userRepos, ...orgRepos];

        // Dedup (giving preference to organization repos) & filter forks
        const deduped = [];
        const seenNames = new Set();

        // Sort so Organization comes first, so we keep org repos in case of name clash
        mergedRepos.sort((a, b) => {
          const aIsOrg = a.owner?.type === 'Organization' ? 1 : 0;
          const bIsOrg = b.owner?.type === 'Organization' ? 1 : 0;
          return bIsOrg - aIsOrg;
        });

        for (const r of mergedRepos) {
          // Filter by allowed list to keep only the best AI-selected projects
          const lowercaseName = r.name.toLowerCase();
          if (!ALLOWED_REPOS.includes(lowercaseName)) continue;

          // Skip basic forks without stars
          if (r.fork && r.stargazers_count === 0) continue;

          if (!seenNames.has(lowercaseName)) {
            seenNames.add(lowercaseName);
            
            // Map 'main-copy' (the featured project repository) to 'ai-interview' ID
            const repoId = r.name === 'main-copy' ? 'ai-interview' : r.name;
            const repoTitle = r.name === 'main-copy' ? 'AI Interview System' : r.name;

            deduped.push({
              id: repoId, // Key name used for mapping to modal details
              title: repoTitle,
              desc: r.description || 'No description provided.',
              url: r.html_url,
              language: r.language,
              stars: r.stargazers_count,
              forks: r.forks_count,
              issues: r.open_issues_count,
              pushedAt: r.pushed_at,
              topics: r.topics || []
            });
          }
        }

        // Sort by recent pushes
        deduped.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));
        setRepos(deduped);
      } catch (err) {
        console.error(err);
        setError(err.message);
        // Load offline backup
        setRepos(OFFLINE_REPOS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const handleProjectClick = (proj) => {
    // Clear previous elements carrying transition name to avoid duplication issues
    document.querySelectorAll('.project-card').forEach(el => {
      el.style.viewTransitionName = '';
    });
    document.querySelectorAll('.project-card h3').forEach(el => {
      el.style.viewTransitionName = '';
    });
    document.querySelectorAll('.featured-project-card').forEach(el => {
      el.style.viewTransitionName = '';
    });
    document.querySelectorAll('.featured-content h3').forEach(el => {
      el.style.viewTransitionName = '';
    });

    const id = proj.id || proj.title;
    const cardEl = document.getElementById(`project-card-${id}`);
    const titleEl = document.getElementById(`project-title-${id}`);

    if (cardEl) cardEl.style.viewTransitionName = 'active-project-card';
    if (titleEl) titleEl.style.viewTransitionName = 'active-project-title';

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        onSelectProject(proj);
      });
    } else {
      onSelectProject(proj);
    }
  };

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title"><span className="title-number">04.</span> Selected Projects</h2>
        
        {/* Featured Project (B-Tech Final Year mock interview simulator) */}
        <div className="featured-project-container">
          <div className="featured-project-card" id="project-card-ai-interview">
            <div className="featured-badge"><i className="fa-solid fa-star"></i> Featured B-Tech Project</div>
            <div className="featured-content">
              <h3 id="project-title-ai-interview">AI Interview System</h3>
              <p className="featured-sub">with Chairman Council Multi-Agent Architecture</p>
              <p className="featured-desc">
                An advanced AI-powered mock interview simulator built to generate role-specific questions and evaluate replies. It utilizes a multi-agent "Chairman Council" setup where separate LLM agents critique candidate responses, compile scorecards, and provide actionable feedback on technical, communication, and coding tasks.
              </p>
              <div className="tags-container">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">LangChain</span>
                <span className="skill-tag">Google Gemini</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">PyPDF2</span>
              </div>
              <div className="project-actions">
                <button 
                  onClick={() => handleProjectClick({ id: 'ai-interview', title: 'AI Interview System' })} 
                  className="btn btn-primary btn-sm view-details-btn"
                >
                  View Case Study <i className="fa-solid fa-circle-info"></i>
                </button>
                <a 
                  href="https://github.com/Final-Year-B-Tech-Project/main-copy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm" 
                  id="project-btech-repo"
                >
                  <i className="fa-brands fa-github"></i> Repository
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          {isLoading ? (
            // Skeleton Loader States
            Array.from({ length: 3 }).map((_, idx) => (
              <div className="project-card skeleton-card" key={idx}>
                <div className="skeleton-line header-skele"></div>
                <div className="skeleton-line title-skele"></div>
                <div className="skeleton-line desc-skele-1"></div>
                <div className="skeleton-line desc-skele-2"></div>
                <div className="skeleton-line tags-skele"></div>
              </div>
            ))
          ) : (
            repos.map((proj, idx) => (
              <div 
                className="project-card reveal-staggered" 
                key={proj.id}
                id={`project-card-${proj.id || proj.title}`}
                style={{ '--i': idx }}
              >
                <div className="project-card-header">
                  <div className="project-folder"><i className="fa-regular fa-folder-open"></i></div>
                  <div className="project-links">
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" title="View Source">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
                <h3 id={`project-title-${proj.id || proj.title}`}>{proj.title}</h3>
                <p>{proj.desc}</p>
                <div className="tags-container">
                  {proj.language && <span className="skill-tag accent-tag">{proj.language}</span>}
                  {proj.topics.slice(0, 3).map((topic, tIdx) => (
                    <span className="skill-tag" key={tIdx}>{topic}</span>
                  ))}
                  {proj.stars > 0 && (
                    <span className="skill-tag star-tag">
                      <i className="fa-solid fa-star"></i> {proj.stars}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => handleProjectClick(proj)} 
                  className="btn btn-link view-details-btn"
                >
                  Read More <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Fallback Banner Alert if GitHub API Rate Limit is Reached */}
        {error && (
          <div className="api-notice">
            <i className="fa-solid fa-circle-info"></i> {error === 'rate-limit' 
              ? 'GitHub API rate limit exceeded for your IP. Showing cached project summaries. Visit github.com/suyash1574 for full details.'
              : 'Unable to sync live repositories. Showing cached project summaries.'}
          </div>
        )}
      </div>
    </section>
  );
}
