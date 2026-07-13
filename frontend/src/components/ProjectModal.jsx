import React, { useEffect, useRef } from 'react';

const PROJECTS_DATA = {
  'ai-interview': {
    title: 'AI Interview System',
    subtitle: 'Final Year B.Tech Project | Chairman Council Architecture',
    desc: `
      <div class="modal-body-text">
        <p>A comprehensive AI-powered mock interview simulator designed to run practice interviews with interactive LLM feedback. It allows students to test their coding, communication, and technical domain skills and allows HR professionals to manage recruitment campaigns.</p>
        
        <h4 class="modal-meta-label">Key Features</h4>
        <ul>
          <li><strong>Chairman Council Architecture:</strong> Uses a multi-agent system where different specialized LLM agents evaluate specific facets of the response (e.g., code correctness, soft skills) and aggregate a final feedback scorecard.</li>
          <li><strong>Dynamic Question Generation:</strong> Extracts candidate details and skills from uploaded resumes (parsed via PyPDF2) and dynamically compiles custom interview lists using Google Gemini.</li>
          <li><strong>Integrated Compiler:</strong> Employs an inline code editor where candidates can solve live algorithms during technical rounds.</li>
          <li><strong>HR Dashboards:</strong> Dedicated workspace for HR managers to configure recruitment drives, schedule interviews with SMTP alerts, and analyze aggregate candidate statistics.</li>
        </ul>
        
        <h4 class="modal-meta-label">Technical Architecture</h4>
        <p>Built with Python Flask on the backend, using SQLAlchemy to interface with database storage (SQLite for local, PostgreSQL ready for production). The front-end leverages Bootstrap 5.3 alongside clean, modular Vanilla JavaScript for dynamic canvas counters, interview session timers, and asynchronous network exchanges.</p>
      </div>
      <div class="project-actions">
        <a href="https://github.com/Final-Year-B-Tech-Project/main-copy" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> View Repository
        </a>
      </div>
    `
  },
  'bigquery-etl': {
    title: 'BigQuery ETL Pipeline Project',
    subtitle: 'Data Engineering | Log Ingestion & Analytics',
    desc: `
      <div class="modal-body-text">
        <p>A data engineering pipeline designed to parse, clean, structure, and upload large collections of unstructured application log files to Google BigQuery for reporting and analytics.</p>
        
        <h4 class="modal-meta-label">Key Features</h4>
        <ul>
          <li><strong>Pandas Processing:</strong> Normalizes timestamp variations, handles missing payload properties, and extracts query attributes from raw source files.</li>
          <li><strong>Automated Schema Mapping:</strong> Validates incoming records against strict schema mappings to ensure structural compatibility in BigQuery.</li>
          <li><strong>Optimized Aggregations:</strong> Builds material database views and aggregated summary tables to accelerate analytical queries by 60%.</li>
        </ul>
      </div>
      <div class="project-actions">
        <a href="https://github.com/suyash1574" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> View Repository
        </a>
      </div>
    `
  },
  'credit-dashboard': {
    title: 'Credit Card Customer Dashboard',
    subtitle: 'BI & Visualization | Portfolio Analytics',
    desc: `
      <div class="modal-body-text">
        <p>An interactive BI analytics interface tracking transaction volumes, chargebacks, and user demographics to evaluate customer segments and financial trends.</p>
        
        <h4 class="modal-meta-label">Key Features</h4>
        <ul>
          <li><strong>Data Cleansing:</strong> Employs Python and SQL scripts to clean, process, and align transactional records across database systems.</li>
          <li><strong>Interactive KPI Tracking:</strong> Generates dynamic Power BI cards representing default rates, total volumes, and month-over-month conversions.</li>
          <li><strong>Cohort Analysis:</strong> Categorizes customer transaction velocities to detect high-value target categories.</li>
        </ul>
      </div>
      <div class="project-actions">
        <a href="https://github.com/suyash1574" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> View Repository
        </a>
      </div>
    `
  },
  'crop-prediction': {
    title: 'Smart Agriculture Crop Prediction',
    subtitle: 'AI & Computer Vision | Recommended Systems',
    desc: `
      <div class="modal-body-text">
        <p>A machine learning recommendation engine designed to predict the optimal crop choice for specific farm zones using convolutional neural networks and classic classification algorithms.</p>
        
        <h4 class="modal-meta-label">Key Features</h4>
        <ul>
          <li><strong>Multi-Model Classifiers:</strong> Trains and evaluates VGG16 CNN layers and XGBoost models to select crops based on environmental properties.</li>
          <li><strong>Feature Engineering:</strong> Structures inputs representing soil composition (nitrogen, phosphorus, potassium), average humidity, and temperature.</li>
          <li><strong>High Accuracy:</strong> Achieved an 85% validation score across public agricultural datasets.</li>
        </ul>
      </div>
      <div class="project-actions">
        <a href="https://github.com/Suyash-Projects/Agriculture-Prediction" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> View Repository
        </a>
      </div>
    `
  }
};

export default function ProjectModal({ projectId, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (projectId) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [projectId]);

  const handleBackdropClick = (e) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      onClose();
    }
  };

  let project = null;
  let isDynamic = false;
  let dynamicData = {};

  if (typeof projectId === 'string') {
    project = PROJECTS_DATA[projectId];
  } else if (projectId && typeof projectId === 'object') {
    // Map database repository name to static case study if matched
    if (projectId.id === 'Agriculture-Prediction') {
      project = PROJECTS_DATA['crop-prediction'];
    } else {
      isDynamic = true;
      dynamicData = projectId;
    }
  }

  const formattedDate = dynamicData.pushedAt 
    ? new Date(dynamicData.pushedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <dialog 
      id="project-modal" 
      className="project-modal" 
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="modal-wrapper" style={{ viewTransitionName: 'active-project-card' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        
        {project && !isDynamic && (
          <div id="modal-content-area">
            <div className="modal-title-area">
              <h2 style={{ viewTransitionName: 'active-project-title' }}>{project.title}</h2>
              <p className="modal-sub">{project.subtitle}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: project.desc }} />
          </div>
        )}

        {isDynamic && (
          <div id="modal-content-area">
            <div className="modal-title-area">
              <h2 style={{ viewTransitionName: 'active-project-title' }}>{dynamicData.title}</h2>
              <p className="modal-sub">GitHub Repository | Language: {dynamicData.language || 'Documentation'}</p>
            </div>
            <div className="modal-body-text">
              <p>{dynamicData.desc}</p>
              
              <h4 className="modal-meta-label" style={{ marginTop: '24px' }}>Repository Metrics</h4>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                <li><strong>Stars:</strong> {dynamicData.stars}</li>
                <li><strong>Forks:</strong> {dynamicData.forks}</li>
                <li><strong>Open Issues:</strong> {dynamicData.issues}</li>
                <li><strong>Last Updated:</strong> {formattedDate}</li>
              </ul>

              {dynamicData.topics && dynamicData.topics.length > 0 && (
                <>
                  <h4 className="modal-meta-label" style={{ marginTop: '24px' }}>Tags</h4>
                  <div className="tags-container" style={{ marginTop: '8px' }}>
                    {dynamicData.topics.map((topic, idx) => (
                      <span className="skill-tag" key={idx}>{topic}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="project-actions" style={{ marginTop: '32px' }}>
              <a href={dynamicData.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                <i className="fa-brands fa-github"></i> View Repository
              </a>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
