# accessibility-baseline Specification

## Purpose
Set the accessibility, metadata and performance floor every section of the site must meet.
## Requirements
### Requirement: Semantic structure
The page SHALL use `<header>`, `<main>`, `<footer>`, one `<h1>`, sequential heading levels, `lang="es-MX"`, and a "Saltar al contenido" skip link as the first focusable element.

#### Scenario: Skip link
- **WHEN** a keyboard user presses Tab once after load
- **THEN** a visible "Saltar al contenido" link receives focus and activating it moves focus to `<main>`

### Requirement: Visible focus
All interactive elements SHALL show a focus indicator of at least 2px with ≥ 3:1 contrast against adjacent colors, using `:focus-visible`.

#### Scenario: Keyboard navigation
- **WHEN** tabbing through every link and button
- **THEN** each shows a clearly visible focus ring

### Requirement: Color contrast
Text SHALL meet WCAG 2.2 AA contrast (4.5:1 body, 3:1 large text) on every background it appears on, including the colored bands.

#### Scenario: Band contrast
- **WHEN** checking `ciruela` text on `agua`, `mantequilla`, `durazno` and `rosa`
- **THEN** every pair is ≥ 4.5:1

### Requirement: Responsive layout
The page SHALL render without horizontal scrolling from 320px to 1920px wide, with ≥ 16px side gutters on mobile and tap targets ≥ 44×44px.

#### Scenario: Narrow viewport
- **WHEN** viewed at 320px width
- **THEN** no horizontal scrollbar appears and all CTAs are at least 44px tall

### Requirement: Metadata and sharing
The layout SHALL include a meta description, canonical-friendly title, Open Graph and Twitter card tags (title, description, image), and a `theme-color` of `#4B2E6F`.

#### Scenario: Link preview
- **WHEN** the URL is shared on WhatsApp or Facebook
- **THEN** the preview shows the practice title, description and the OG image

### Requirement: Image and font performance
The portrait SHALL be served through `astro:assets` in modern formats with explicit dimensions and `fetchpriority="high"`; fonts SHALL be self-hosted with `font-display: swap`. Lighthouse mobile scores SHALL be ≥ 95 for Accessibility and ≥ 90 for Performance.

#### Scenario: Lighthouse audit
- **WHEN** running Lighthouse (mobile) on the production build
- **THEN** Accessibility ≥ 95 and Performance ≥ 90, with CLS < 0.1

