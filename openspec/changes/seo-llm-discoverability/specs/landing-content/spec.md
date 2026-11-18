## MODIFIED Requirements

### Requirement: Section order
The home page SHALL render, in order: Header, Hero, Señales, Servicios, Cómo trabajo, Primer paso, Preguntas frecuentes, Footer. Each major section MUST have an `id` usable as an in-page anchor (`inicio`, `senales`, `servicios`, `como-trabajo`, `primer-paso`, `preguntas`, `contacto`).

#### Scenario: Anchors work
- **WHEN** the user follows a link to `#servicios`
- **THEN** the page scrolls to the Servicios section heading, not hidden under the sticky header

#### Scenario: FAQ anchor works
- **WHEN** the user follows a link to `#preguntas`
- **THEN** the page scrolls to the Preguntas frecuentes heading, not hidden under the sticky header

## ADDED Requirements

### Requirement: Preguntas frecuentes
The page SHALL show a "Preguntas frecuentes" section with at least six question and answer pairs covering: whether the first consultation is free, whether she offers online therapy, where the practice is (zone only), who she sees, when the support groups meet, and how to book. Each question SHALL be a heading one level below the section heading, and each answer SHALL be visible without interaction, at most three sentences, in first person. Answers MUST only state facts already confirmed elsewhere on the site; price, session length and opening hours MUST NOT be stated until confirmed.

#### Scenario: Questions are headings
- **WHEN** inspecting the Preguntas frecuentes markup
- **THEN** the section has one `<h2>` and each question is an `<h3>` followed by its answer text

#### Scenario: Answers visible without interaction
- **WHEN** the page loads with JavaScript disabled
- **THEN** every answer is visible without clicking or expanding anything

#### Scenario: Location answer is zone only
- **WHEN** reading the answer about where the practice is
- **THEN** it names the configured zone of Pachuca, Hidalgo, and no street name or number

#### Scenario: Narrow viewport
- **WHEN** viewed at 320px width
- **THEN** questions and answers wrap without horizontal scroll
