# Tasks: Personal Portfolio Website

**Input**: Design documents from `/specs/001-personal-website/`

**Prerequisites**: [plan.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/plan.md) (required), [spec.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/spec.md) (required for user stories), [research.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/research.md), [data-model.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/data-model.md), [contracts/contact-api.json](file:///d:/Projects/Personal%20website/specs/001-personal-website/contracts/contact-api.json)

**Tests**: Tests are optional and manual validation is detailed in `quickstart.md`. No separate unit/contract test suites are requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/`, `frontend/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and directory creation

- [x] T001 Create project folders `backend/` and `frontend/` per implementation plan
- [x] T002 Create `backend/requirements.txt` with Flask and python-dotenv dependencies
- [x] T003 [P] Create static file structure `frontend/css/`, `frontend/js/`, and `frontend/assets/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Setup environment configuration management in `backend/config.py` and create `.env.example`
- [x] T005 [P] Setup Flask routing and base app instance in `backend/app.py`
- [x] T006 Configure visual design system tokens (colors, fonts, dimensions) in `frontend/css/index.css`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Portfolio Discovery and Visual Landing (Priority: P1) 🎯 MVP

**Goal**: Create the main visual landing page with a hero section containing Suyash's summary, download resume button, particle canvas, and header navigation.

**Independent Test**: Open `frontend/index.html` in browser, verify layout, navbar links, and verify resume downloads successfully.

### Implementation for User Story 1

- [x] T007 [P] [US1] Copy the resume PDF to `frontend/assets/resume/Suyash_Zinjurke.pdf`
- [x] T008 [P] [US1] Create the header navbar and hero section layout in `frontend/index.html`
- [x] T009 [US1] Style the navbar and hero landing section in `frontend/css/index.css`
- [x] T010 [US1] Add a canvas element for interactive particles in `frontend/index.html`
- [x] T011 [US1] Implement the canvas particle background draw loop in `frontend/js/index.js`
- [x] T012 [US1] Implement media query listener to disable canvas particles if prefers-reduced-motion is active in `frontend/js/index.js`

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Comprehensive Project Showcase (Priority: P1)

**Goal**: Build the project grid displaying 4 projects, highlighting the B-Tech project, with hover triggers and details modal popups.

**Independent Test**: Scroll to Projects, click a project card, verify modal dialog opens with detailed summary and links, and closes correctly.

### Implementation for User Story 2

- [x] T013 [P] [US2] Create the Projects grid structure and card nodes in `frontend/index.html`
- [x] T014 [P] [US2] Add details modal container `<dialog>` structure in `frontend/index.html`
- [x] T015 [US2] Style the project cards, hover filters, and modal overlay in `frontend/css/index.css`
- [x] T016 [US2] Implement dynamic modal content loading and show/close listeners in `frontend/js/index.js`

**Checkpoint**: User Stories 1 AND 2 are functional independently.

---

## Phase 5: User Story 3 - Interactive Skill Categorization & Experience Timeline (Priority: P2)

**Goal**: Add the interactive Skills card sections and the Experience vertical timeline.

**Independent Test**: Scroll to Skills/Experience, verify skills are categorized, and timeline lists achievements for AISSMS IOIT, Knorr-Bremse, and NexGen Analytix.

### Implementation for User Story 3

- [x] T017 [P] [US3] Create Skills categorization structure in `frontend/index.html`
- [x] T018 [P] [US3] Create the vertical Timeline structure in `frontend/index.html`
- [x] T019 [US3] Style the skills card layouts and timeline vertical stem in `frontend/css/index.css`

**Checkpoint**: User Stories 1, 2, and 3 are functional independently.

---

## Phase 6: User Story 4 - Seamless Inquiry / Contact Action (Priority: P2)

**Goal**: Create the contact form validation and link it to the custom Flask SMTP email backend.

**Independent Test**: Submit contact form, verify success message appears, and check target inbox to verify email is delivered.

### Implementation for User Story 4

- [x] T020 [P] [US4] Create the Contact Form layout and inputs validation in `frontend/index.html`
- [x] T021 [P] [US4] Implement SMTP mail dispatcher helper function in `backend/app.py`
- [x] T022 [US4] Implement the `/api/contact` POST endpoint handler and schema validation in `backend/app.py`
- [x] T023 [US4] Implement AJAX form submission client code with loader state in `frontend/js/index.js`

**Checkpoint**: All user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T024 [P] Add site-wide SEO meta tags and unique element IDs in `frontend/index.html`
- [x] T025 Audit visual color contrast and margins for responsive viewports in `frontend/css/index.css`
- [x] T026 Run the `quickstart.md` validation scenarios.

---

## Phase 8: Dynamic GitHub Projects Integration (Priority: P2)

**Goal**: Fetch repositories dynamically from GitHub API (user & organization) and render them with skeleton loaders, dynamic details modals, and fail-safes.

**Independent Test**: Load page, verify projects load from GitHub, open modal on a dynamic repo card, and verify it closes.

### Implementation for User Story 5

- [x] T027 [P] [US5] Implement async fetching, merging, and sorting logic in `frontend/src/components/Projects.jsx`
- [x] T028 [US5] Add skeleton loading states and rate limit fallbacks in `frontend/src/components/Projects.jsx`
- [x] T029 [US5] Implement dynamic schema modal template details inside `frontend/src/components/ProjectModal.jsx`
- [x] T030 Run compilation build and verify integration.

---

## Phase 9: Spec Convergence Polish (Priority: P2)

**Goal**: Implement the missing spec requirements for Dark/Light mode toggle and interactive filterable skills.

**Independent Test**: Click toggle button in Navbar, verify colors shift smoothly and persist on reload. Type in skills search bar, verify matching categories and tags highlight.

### Implementation for User Story 6

- [x] T031 [P] [US6] Add Light Mode variable tokens and smooth transition rules to `frontend/src/index.css`
- [x] T032 [US6] Implement theme toggle state, button, and localStorage handler in `frontend/src/components/Navbar.jsx`
- [x] T033 [US6] Add search filter inputs and state tracking in `frontend/src/components/Skills.jsx`
- [x] T034 Run compilation build and verify spec convergence.

---

## Phase 10: FastAPI Backend Conversion (Priority: P2)

**Goal**: Convert Flask backend to FastAPI served by Uvicorn, implementing Pydantic validation and background mail dispatching.

**Independent Test**: Run python compilation, start Uvicorn backend, submit contact form, verify console shows success response instantly, and check email delivery.

### Implementation for User Story 7

- [x] T035 [P] [US7] Create `backend/requirements.txt` with FastAPI, Uvicorn, and Pydantic dependencies
- [x] T036 [US7] Refactor `backend/app.py` to use FastAPI routing and Pydantic request models
- [x] T037 [US7] Implement `fastapi.BackgroundTasks` email sending to prevent SMTP thread blocking
- [x] T038 Run Python syntax checks and verify integration.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational completion.
  - User stories can proceed in parallel once foundational work is complete.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities

- Setup tasks (T001, T002, T003) can run in parallel.
- Foundational tasks (T004, T005) can run in parallel.
- Models and layouts for different user stories can be worked on in parallel once Phase 2 is complete.
- T007, T008, T013, T014, T017, T018, T020, T021 can all run in parallel since they touch separate files.
