# Feature Specification: Personal Portfolio Website

**Feature Branch**: `001-personal-website`

**Created**: 2026-07-13

**Status**: Draft

**Input**: User description: "create complet my personal website for me include my all things in this https://github.com/Final-Year-B-Tech-Project/main-copy https://www.linkedin.com/in/suyash-zinjurke-9045832a5/ https://github.com/suyash1574 \"C:\\Users\\zinju\\OneDrive\\Desktop\\resume\\Suyash_Zinjurke.pdf\""

## Clarifications

### Session 2026-07-13

- Q: How should contact form submissions be processed? → A: Processed via a custom Python backend using the SMTP protocol.
- Q: How should project detail cards display their content when clicked? → A: Open interactive modal dialogs containing rich descriptions, tech stacks, and links.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Portfolio Discovery and Visual Landing (Priority: P1)

As a hiring manager or recruiter visiting the website, I want to immediately see Suyash's professional summary, key specialization (AI Engineer, Python Automation, NLP, Data Analytics), and visual call-to-actions so that I can decide if he is a good fit for our projects.

**Why this priority**: It is the primary entry point and first impression of the website. Recruiters spend very few seconds scanning profiles.

**Independent Test**: Can open the page in any modern web browser, see a premium, highly responsive layout with clear branding, and see links/shortcuts to sections like "About Me", "Skills", "Projects", "Experience", and "Contact".

**Acceptance Scenarios**:

1. **Given** the user lands on the website homepage, **When** they view the hero section, **Then** they see Suyash's full name, role summary, links to GitHub/LinkedIn/HackerRank, and a clear button to view or download his resume.
2. **Given** the user is viewing the website on a mobile device, **When** they scroll through the homepage, **Then** all layout components scale down gracefully with a readable size and custom mobile navigation.

---

### User Story 2 - Comprehensive Project Showcase (Priority: P1)

As a technical lead looking for specialized skills, I want to explore Suyash's projects (especially his B-Tech Final Year project "AI Interview System") with descriptions, skill tags, and direct GitHub links so that I can evaluate his actual coding experience and project complexity.

**Why this priority**: Proof of work is the most critical asset for an AI Engineer/B.Tech student. The B-Tech project must be given premium highlight.

**Independent Test**: Recruiter clicks on the "Projects" section, sees a list of at least 4 projects, reads the summary of the "AI Interview System", and can click the GitHub links to navigate to the code repositories.

**Acceptance Scenarios**:

1. **Given** the user is in the Projects section, **When** they look at the B-Tech project card, **Then** they see details of the AI-powered interview platform (Flask, Gemini AI, resume parser, dual interfaces) highlighted as a featured project.
2. **Given** the user reviews any project card, **When** they hover or click, **Then** they see micro-interactions (e.g., tags showing technologies, smooth zoom, and visual links to source repositories).

---

### User Story 3 - Interactive Skill Categorization & Experience Timeline (Priority: P2)

As a technical recruiter searching for specific keywords (e.g., Python, LangChain, ETL, Power BI), I want to see an organized list of skills and a clear timeline of Suyash's professional experience (Knorr-Bremse, NexGen Analytix) so that I can match his profile with current job descriptions.

**Why this priority**: Helps recruiters quickly verify technical competencies and see progression/tenure.

**Independent Test**: Recruiter scrolls to the "Skills" and "Experience" sections, finds distinct skill cards by category, and views a vertical or horizontal interactive timeline of internships.

**Acceptance Scenarios**:

1. **Given** the recruiter wants to check visualization skills, **When** they view the Skills section, **Then** they can see "BI / Visualization" (Power BI, Tableau) clearly separated from "AI / NLP" (Transformers, LangChain, TensorFlow).
2. **Given** the recruiter looks at the Experience section, **When** they view Knorr-Bremse or NexGen Analytix internships, **Then** they see clear dates, roles, and lists of achievements in a clean timeline layout.

---

### User Story 4 - Seamless Inquiry / Contact Action (Priority: P2)

As a potential client or hiring manager interested in hiring Suyash, I want to easily send him a message or retrieve his contact coordinates directly from the website so that I can initiate an interview or collaboration.

**Why this priority**: Without a conversion mechanism, the portfolio doesn't fulfill its business goal of getting new job invitations or leads.

**Independent Test**: Visitor fills out the contact form, clicks submit, receives a success confirmation message, and can also click on the email/phone links to open their local client.

**Acceptance Scenarios**:

1. **Given** the user is at the Contact section, **When** they fill out Name, Email, and Message, and click "Submit", **Then** the form validates fields, shows a feedback loader, and presents a success notification.
2. **Given** the user wants to contact Suyash directly, **When** they click his email address link, **Then** it triggers their default mail client pre-addressed to `zinjurke77h@gmail.com`.

---

### Edge Cases

- **Offline / Low-Connectivity Performance**: What happens if the site loads with slow network connections? (Assets should load progressively, text content should render first, and default fonts should be used while Google Fonts load).
- **Invalid Contact Form Inputs**: How does the system handle incomplete or malformed contact messages? (Form must block submission, highlight invalid fields with smooth shake/error text, and prevent spam submissions).
- **Broken GitHub or LinkedIn external API links**: How does the site handle external links? (All external links must open in a new tab/window `_blank` with `rel="noopener noreferrer"` to keep the visitor's session active on the portfolio).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render a fully responsive, modern single-page portfolio layout featuring a Hero section, About Me, Skills, Experience Timeline, Highlighted Projects, Certifications, and Contact section.
- **FR-002**: The website MUST support a premium Dark Mode / Light Mode toggle with custom-themed transitions and persistent storage of the user's preference in the browser's local storage.
- **FR-003**: The Projects section MUST display at least four projects from Suyash's profile, with a prominent "Featured" callout for the B-Tech project "AI-Powered Interview Platform" containing links, features list, and a link to the GitHub repository.
- **FR-004**: The Skills section MUST categorize and list technical competencies (Programming, Libraries, Data Engineering, BI/Visualization, Cloud, AI/NLP, Databases) in an interactive, searchable/filterable layout.
- **FR-005**: The Experience section MUST display a responsive timeline showing details of AISSMS IOIT education and internships at Knorr-Bremse and NexGen Analytix with key bullet points.
- **FR-006**: The Contact section MUST feature a contact form validating name, email (valid format), and message length.
- **FR-007**: The system MUST support direct downloading/viewing of Suyash's resume PDF from a prominent header/hero CTA button.
- **FR-008**: The site theme and styling MUST use rich visual aesthetics, including glassmorphism cards, customized color gradients (e.g. deep blues and neon violet), and smooth entrance animations.
- **FR-009**: The contact form submission MUST be processed via a custom Python backend utilizing the SMTP protocol for email transmission.
- **FR-010**: The project details showcase MUST open in interactive modal dialogs containing rich project summaries, tech stack tags, screenshots, and direct external links.

### Key Entities *(include if feature involves data)*

- **Portfolio Owner Profile**: Represents the developer's core info (Name, Title, Bio, Contacts, Resume URL, Social links).
- **Project Entry**: Represents a portfolio project (Title, Subtitle, Description, Tech Stack Tags, GitHub Link, Live Demo Link, Featured Status).
- **Experience Entry**: Represents a professional or academic history milestone (Institution/Company, Role/Degree, Date Range, Achievements list, Type: Education/Job).
- **Skill Entry**: Represents a technical skill (Name, Proficiency, Category).
- **Certification Entry**: Represents a verified certification (Title, Issuer).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can navigate to any section (About, Skills, Projects, Experience, Contact) within a single click or in under 1 second.
- **SC-002**: The website scores 90+ on Lighthouse audit metrics for Performance, Accessibility, Best Practices, and SEO.
- **SC-003**: The contact form validation is client-side, showing inline feedback in under 200ms when invalid data is entered.
- **SC-004**: The portfolio visual layout adapts seamlessly to mobile, tablet, and desktop viewports without horizontal scrollbars or overlapping text elements.
- **SC-005**: The resume file is downloadable directly with a single click from the main navigation.

## Assumptions

- **A-001**: The resume PDF file (`Suyash_Zinjurke.pdf`) will be stored locally in the assets folder of the website for direct download.
- **A-002**: The website is hosted as a static web application (e.g., GitHub Pages, Vercel, or Netlify), so no custom server database is required for core pages.
- **A-003**: The contact form will either use a third-party serverless integration (e.g. Web3Forms, EmailJS, or Formspree) or standard mailto fallback.
- **A-004**: The profile photo and any custom project screenshots will be mock assets or generated/provided in local assets.
