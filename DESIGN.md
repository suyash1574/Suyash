<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Personal Portfolio Website

## 1. Overview

**Creative North Star: "The Interactive Neural Canvas"**

The design system centers around a premium, modern developer experience that blends playfulness with clean engineering. It mimics the sleek, high-fidelity interfaces of cutting-edge AI and development tools (referencing Vercel, Linear, and Stripe) while prioritizing interactive discovery. Transitions are orchestrated and choreographed to make the site feel alive as the user scrolls, featuring subtle particle movements, neon glows, and custom hover states.

We explicitly reject the chaotic, over-stimulating patterns of flashing web3/crypto sites, ensuring the presentation remains legible, accessible, and structured.

**Key Characteristics:**
- High-fidelity dark mode with deliberate glow accents.
- Modern developer aesthetic pairing display elements with monospace terminals.
- Choreographed entrance and scroll-driven micro-interactions.

## 2. Colors

The color strategy uses a full palette of 3 to 4 deliberate, named color roles, representing an AI-themed developer atmosphere.

### Primary
- **[Primary Accent]** (to be resolved during implementation): Used for core highlights, interactive focus rings, and main call-to-actions.

### Secondary
- **[Secondary Glow]** (to be resolved during implementation): Used for subtle gradients, hover transitions, and background ambient lighting.

### Neutral
- **[Dark Backdrop]** (to be resolved during implementation): The dominant page background.
- **[Surface Container]** (to be resolved during implementation): Used for cards, sections, and input fields.
- **[Text Ink]** (to be resolved during implementation): Primary typography color.

### Named Rules
**The Deliberate Accent Rule.** The primary and secondary colors are reserved strictly for interactive components, status indicators, and focus points. Ambient glows are kept at low opacities to prevent visual fatigue.

## 3. Typography

**Display Font:** Modern Sans-Serif (to be chosen at implementation)
**Body Font:** Clean Sans-Serif (to be chosen at implementation)
**Label/Mono Font:** Monospace (to be chosen at implementation)

**Character:** A high-contrast developer layout pairing geometric display headlines with monospace text blocks to evoke an engineering terminal.

### Hierarchy
- **Display**: For main hero headings.
- **Headline**: For section titles.
- **Title**: For card and item names.
- **Body**: For professional descriptions and timeline items.
- **Label**: For tech stack tags, dates, and micro-copy.

## 4. Elevation

The system uses a layered elevation strategy to separate cards and modals from the deep backdrop, relying on subtle border borders, glassmorphic filters, and low-opacity drop shadows.

### Named Rules
**The Layered Surface Rule.** Cards and floating modals use a slightly lighter container background than the dark page backdrop, bounded by a 1px border at a low-opacity gray or primary color.

## 5. Components

[To be populated once implementation starts and visual components are built.]

## 6. Do's and Don'ts

### Do:
- **Do** use responsive media queries to scale typography and layout across mobile and desktop.
- **Do** implement a toggle to disable particle animation if `@media (prefers-reduced-motion: reduce)` is active.
- **Do** keep cards and modal border radii restrained (12-16px max).

### Don't:
- **Don't** use over-engineered, flashing animations or massive neon text shadows that hinder readability.
- **Don't** use standard, beige or warm-paper backgrounds that look like SaaS landing page clones.
- **Don't** pair ghost card borders with wide, high-opacity drop shadows.
