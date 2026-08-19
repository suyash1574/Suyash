/*
Design philosophy: Midnight Systems Lab — contemporary technical editorialism with graphite surfaces,
restrained Signal Cyan instrumentation, amber proof points, asymmetric layouts, and evidence-first content.
*/
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  Search,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

const resumeUrl = "https://github.com/suyash1574/Suyash/raw/refs/heads/main/frontend/public/assets/resume/Suyash_Zinjurke.pdf";

const experience = [
  {
    index: "01",
    date: "MAR 2026 — PRESENT",
    role: "AI Automation Intern",
    company: "Knorr-Bremse Technology Centre India",
    summary: "Building practical AI systems for software maintenance, diagnostics, and engineering workflows.",
    bullets: [
      "Designed ESRA AI Pilot from scratch: an Azure-based RAG platform for software maintenance and customer issue resolution, estimated to reduce team effort by up to 80%.",
      "Built automated BSW log analysis that transformed raw embedded-software output into actionable diagnostics, reducing manual analysis effort by approximately 70%.",
      "Developed GitHub-integrated agents for code review, test-case generation, and repository architecture analysis, reducing review and exploration effort by up to 80% and 50% respectively.",
    ],
    tags: ["Azure", "RAG", "LangChain", "Python", "Embedded software"],
  },
  {
    index: "02",
    date: "FEB 2025 — APR 2025",
    role: "Data Analytics Intern",
    company: "NexGen Analytix",
    summary: "Translated raw business data into reliable reporting workflows and decision-ready dashboards.",
    bullets: [
      "Created interactive Power BI and Tableau dashboards to track business KPIs and make reporting more accessible to teams.",
      "Built Python and SQL ETL pipelines to clean, process, and restructure raw database datasets.",
      "Optimized recurring analytics workflows, reducing manual reporting effort and improving data accessibility.",
    ],
    tags: ["Python", "SQL", "Power BI", "Tableau", "ETL"],
  },
];

const projects = [
  {
    number: "P / 01",
    title: "AI Interview System",
    subtitle: "Chairman Council multi-agent architecture",
    description: "A context-aware interview simulator where specialized agents critique, score, validate, and synthesize candidate responses into an actionable report.",
    outcome: "Parallel agent evaluation + consensus-driven output",
    stack: ["Python", "FastAPI", "LangChain", "Gemini", "SQLAlchemy"],
    href: "https://github.com/Final-Year-B-Tech-Project/main-copy",
    featured: true,
  },
  {
    number: "P / 02",
    title: "CodeFlow AI",
    subtitle: "Developer productivity workflow",
    description: "An AI-assisted workflow for code understanding, review support, and engineering automation inside the developer loop.",
    outcome: "Repository context → structured engineering action",
    stack: ["Python", "LangChain", "LLMs", "VS Code"],
    href: "https://github.com/suyash1574",
  },
  {
    number: "P / 03",
    title: "TracePilot",
    subtitle: "Next build · industrial diagnostics",
    description: "A planned evidence-backed diagnostics workbench that links logs, test runs, code changes, and documentation into explainable troubleshooting reports.",
    outcome: "Messy system evidence → decision engineers can trust",
    stack: ["Hybrid RAG", "Evaluation", "FastAPI", "Observability"],
    href: "mailto:zinjurke77h@gmail.com?subject=TracePilot%20conversation",
    planned: true,
  },
];

const skills = [
  { name: "Python", group: "Core", level: "Strong", use: "automation / APIs" },
  { name: "LLMs / RAG", group: "AI Systems", level: "Strong", use: "evidence retrieval" },
  { name: "Agentic workflows", group: "AI Systems", level: "Strong", use: "specialist orchestration" },
  { name: "LangChain", group: "AI Systems", level: "Strong", use: "context pipelines" },
  { name: "Azure AI Services", group: "Cloud", level: "Working", use: "enterprise deployment" },
  { name: "FAISS / vector search", group: "AI Systems", level: "Working", use: "semantic indexing" },
  { name: "FastAPI / Flask", group: "Backend", level: "Working", use: "service surfaces" },
  { name: "SQL / SQLAlchemy", group: "Data", level: "Working", use: "structured records" },
  { name: "Pandas / NumPy", group: "Data", level: "Strong", use: "data shaping" },
  { name: "Scikit-learn / TensorFlow", group: "ML", level: "Working", use: "model baselines" },
  { name: "Git / GitHub", group: "Engineering", level: "Strong", use: "versioned delivery" },
  { name: "Power BI / Tableau", group: "Analytics", level: "Strong", use: "decision surfaces" },
];

function SectionKicker({ children }: { children: string }) {
  return <p className="section-kicker"><span className="kicker-line" />{children}</p>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState("All");
  const filters = ["All", "AI Systems", "Backend", "Data", "Cloud", "Engineering"];
  const visibleSkills = useMemo(
    () => skillFilter === "All" ? skills : skills.filter((skill) => skill.group === skillFilter),
    [skillFilter],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="ambient-grid" aria-hidden="true" /><div className="system-spine" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Suyash Zinjurke home">
          <span className="brand-mark" aria-hidden="true"><span>S</span><b>&gt;</b><i /></span>
          <span className="brand-word">suyash<span>.</span></span>
        </a>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          {["about", "experience", "projects", "contact"].map((item, i) => (
            <button key={item} onClick={() => scrollTo(item)}><span>0{i + 1}</span>{item}</button>
          ))}
          <a className="nav-resume" href={resumeUrl} target="_blank" rel="noreferrer"><Download size={14} /> Resume</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot" /> Available for AI engineering roles <span className="availability-location">/ Pune, IN</span></div>
            <p className="eyebrow">AI ENGINEER · LLM SYSTEMS · AUTOMATION</p>
            <h1>I turn messy system evidence into <em>decisions engineers can trust.</em></h1>
            <p className="hero-intro">I build practical AI systems for software maintenance, diagnostics, and developer workflows — from retrieval pipelines to agentic automation that ships useful outcomes.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo("projects")}>Inspect the work <ArrowUpRight size={17} /></button>
              <a className="button button-ghost" href={resumeUrl} target="_blank" rel="noreferrer"><FileText size={16} /> Download resume</a>
            </div>
            <div className="hero-links">
              <a href="https://github.com/suyash1574" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
              <a href="https://www.linkedin.com/in/suyash-zinjurke-9045832a5/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
              <a href="mailto:zinjurke77h@gmail.com"><Mail size={16} /> Email</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Abstract visualization of interconnected AI systems">
            <div className="hero-image" />
            <div className="hero-image-overlay" />
            <div className="hero-visual-label label-top"><span>LIVE TRACE</span><strong>RAG / 01</strong></div>
            <div className="hero-visual-label label-bottom"><CircleDot size={12} /><span>evidence-linked systems</span></div>
            <div className="trace-path trace-one" /><div className="trace-path trace-two" />
            <div className="hero-orbit"><span /><span /><span /></div>
          </div>
          <div className="hero-index"><span>SCROLL TO EXPLORE</span><ChevronRight size={15} /></div>
        </section>

        <section className="proof-strip section-shell" aria-label="Selected impact">
          <div><span className="proof-label">SELECTED IMPACT</span><strong>80%</strong><p>estimated effort reduction through AI-assisted code review</p></div>
          <div><span className="proof-label">SYSTEMS BUILT</span><strong>04</strong><p>RAG, log-analysis, code agents, multi-agent interview system</p></div>
          <div><span className="proof-label">FOCUS</span><strong>AI ×</strong><p>software maintenance, diagnostics, and engineering workflows</p></div>
        </section>

        <section id="about" className="content-section section-shell split-section">
          <div className="section-rail"><SectionKicker>ABOUT / 01</SectionKicker><p className="rail-note">The short version</p></div>
          <div className="section-content about-content">
            <h2>Engineering with a bias toward <span>useful.</span></h2>
            <div className="about-grid">
              <div><p className="lead-copy">I’m Suyash, an AI Engineer and final-year B.Tech student in Artificial Intelligence & Data Science at AISSMS IOIT, Pune.</p><p>I like the space where unstructured evidence becomes a clear next action: a log becomes a diagnosis, a repository becomes an understandable map, and a collection of specialist agents becomes one reliable workflow.</p></div>
              <div className="terminal-card"><div className="terminal-top"><span><i /> <i /> <i /></span><span>profile.json</span></div><pre><span className="code-muted">$ cat</span> profile.json{`\n`}{`{`}{`\n`}  <b>"name"</b>: <em>"Suyash Zinjurke"</em>,{`\n`}  <b>"mode"</b>: <em>"build / learn / ship"</em>,{`\n`}  <b>"home"</b>: <em>"Pune, India"</em>{`\n`}{`}`}</pre></div>
            </div>
          </div>
        </section>

        <section id="experience" className="content-section section-shell split-section experience-section">
          <div className="section-rail"><SectionKicker>EXPERIENCE / 02</SectionKicker><p className="rail-note">Applied systems</p></div>
          <div className="section-content"><h2>Work that moved beyond the <span>prototype.</span></h2><div className="experience-list">{experience.map((item) => <article className="experience-item" key={item.index}><div className="experience-meta"><span>{item.index}</span><span>{item.date}</span></div><div className="experience-main"><h3>{item.role}</h3><p className="company-name">{item.company}</p><p className="item-summary">{item.summary}</p><ul>{item.bullets.map((bullet) => <li key={bullet}><Check size={15} />{bullet}</li>)}</ul><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></div>
        </section>

        <section id="skills" className="content-section section-shell split-section skills-section">
          <div className="section-rail"><SectionKicker>CAPABILITIES / 03</SectionKicker><p className="rail-note">Working toolkit</p></div>
          <div className="section-content"><div className="section-heading-row"><h2>The tools behind the <span>signal.</span></h2><div className="skill-search"><Search size={15} /><span>{visibleSkills.length} skills</span></div></div><div className="filter-row">{filters.map((filter) => <button key={filter} className={skillFilter === filter ? "active" : ""} onClick={() => setSkillFilter(filter)}>{filter}</button>)}</div><div className="skill-grid">{visibleSkills.map((skill) => <div className="skill-card" key={skill.name}><div className="skill-icon"><Code2 size={16} /></div><div><strong>{skill.name}</strong><span>{skill.group} · {skill.use}</span></div><small>{skill.level}</small></div>)}</div></div>
        </section>

        <section id="projects" className="content-section section-shell split-section projects-section">
          <div className="section-rail"><SectionKicker>SELECTED WORK / 04</SectionKicker><p className="rail-note">Proof of practice</p></div>
          <div className="section-content"><div className="section-heading-row"><h2>Systems I’ve <span>shipped.</span></h2><a className="text-link" href="https://github.com/suyash1574" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={15} /></a></div><div className="projects-stack">{projects.map((project) => <article className={project.featured ? "project-card project-featured" : "project-card"} key={project.title}><div className="project-card-top"><span className="project-number">{project.number}</span>{project.planned ? <span className="project-status"><Sparkles size={12} /> NEXT BUILD</span> : <span className="project-status"><span className="status-dot" /> SHIPPED</span>}</div><div className="project-body"><div><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><div className="project-outcome"><span>OUTCOME</span><strong>{project.outcome}</strong></div><div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}>{project.planned ? "Talk about the idea" : "Open repository"} <ArrowUpRight size={15} /></a></div>{project.featured ? <div className="project-art" aria-label="Evidence artifact showing a diagnostic trace"><div className="artifact-head"><span>TRACE / 014</span><span>confidence 0.87</span></div><div className="artifact-map"><i /><i /><i /><i /><b /><b /><b /></div><div className="artifact-log"><span>01:42:18</span><strong>BSW_DIAG / signal drift</strong><em>linked evidence</em></div><div className="artifact-log muted"><span>01:42:23</span><strong>repo / commit 7f3a</strong><em>next test</em></div></div> : <div className="project-side-mark"><Network size={28} /><span>{project.planned ? "BUILD / 2026" : "SYSTEM / READY"}</span></div>}</div></article>)}</div></div>
        </section>

        <section id="contact" className="contact-section section-shell"><div className="contact-visual"><div className="contact-signal"><Terminal size={18} /><span>READY FOR A NEW RUN</span></div><div className="contact-orbit"><span /><span /><span /></div></div><div className="contact-copy"><SectionKicker>CONTACT / 05</SectionKicker><h2>Have a hard system problem? <span>Let’s inspect it.</span></h2><p>If you’re building AI products, untangling engineering workflows, or looking for an entry-level AI Engineer who likes to understand the system before automating it, I’d like to hear from you.</p><div className="contact-actions"><a className="button button-primary" href="mailto:zinjurke77h@gmail.com?subject=Let's%20build%20something%20useful"><Mail size={16} /> Start a conversation</a><a className="button button-ghost" href="tel:+917028921574"><MapPin size={16} /> Pune, India</a></div><div className="contact-details"><a href="mailto:zinjurke77h@gmail.com">zinjurke77h@gmail.com</a><span>·</span><a href="tel:+917028921574">+91 70289 21574</a></div></div></section>
      </main>

      <footer className="site-footer section-shell"><div className="footer-brand"><span className="brand-mark" aria-hidden="true"><span>S</span><b>&gt;</b><i /></span><span>Built with React, CSS, and a bias toward useful.</span></div><span>© 2026 Suyash Zinjurke</span><a href="#top" onClick={(event) => { event.preventDefault(); scrollTo("top"); }}>Back to top <ArrowUpRight size={14} /></a></footer>
    </div>
  );
}

export default Home;
