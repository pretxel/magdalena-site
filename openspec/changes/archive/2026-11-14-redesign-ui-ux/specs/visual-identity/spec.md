## ADDED Requirements

### Requirement: Brand color tokens
The site SHALL define its palette as Tailwind `@theme` tokens derived from the practice's brand graphic: `ciruela` (#4B2E6F), `bruma` (#EEF5F4), `agua` (#8FC3C5), `mantequilla` (#F1D9A4), `durazno` (#F4B79D), `rosa` (#F0A6B8). Components MUST use these tokens and MUST NOT use hard-coded hex colors or the previous `primary`/`secondary` tokens.

#### Scenario: Tokens available to components
- **WHEN** a component uses a class such as `bg-agua` or `text-ciruela`
- **THEN** the rendered color matches the token hex value

#### Scenario: Legacy tokens removed
- **WHEN** the codebase is searched for `color-primary`, `color-secondary`, `bg-primary` or `text-primary`
- **THEN** no matches exist under `src/`

### Requirement: Typography system
The site SHALL use Young Serif for headings only and Atkinson Hyperlegible (Next, or classic as fallback) for body and UI text, both self-hosted. Body text SHALL be at least 18px with line-height ≥ 1.5 and text columns SHALL NOT exceed 65ch. Headings SHALL be sentence case; all-caps labels and eyebrow labels above headings MUST NOT be used.

#### Scenario: Fonts load without third-party requests
- **WHEN** the built page loads
- **THEN** no request is made to `fonts.googleapis.com` or `fonts.gstatic.com` and both families render

#### Scenario: Readable body measure
- **WHEN** viewing any paragraph at 1440px viewport width
- **THEN** its line length is at most 65 characters' width

### Requirement: Spiral signature motif
The site SHALL render the spiral motif from the brand graphic as an inline SVG component, used in the hero and as a small mark in the footer. It MUST be decorative (`aria-hidden="true"`).

#### Scenario: Spiral in hero
- **WHEN** the home page loads
- **THEN** an `agua` spiral SVG is visible behind or beside the portrait in the hero

### Requirement: Restrained motion
The only non-user-triggered animation SHALL be a single draw-in of the hero spiral on page load, lasting ≤ 2s. Scroll-triggered entrance animations MUST NOT be used. Under `prefers-reduced-motion: reduce` the spiral SHALL render fully drawn with no animation.

#### Scenario: Reduced motion
- **WHEN** the user's OS has reduced motion enabled
- **THEN** the spiral appears complete immediately and no element animates on load or scroll

### Requirement: No template chrome
Sections SHALL NOT be presented as uniform shadowed cards; drop shadows and decorative gradients MUST NOT be used. Numbered markers SHALL appear only in the "Primer paso" sequence.

#### Scenario: Services without cards
- **WHEN** viewing the Servicios section
- **THEN** services appear as list rows separated by rules, with no box shadows
