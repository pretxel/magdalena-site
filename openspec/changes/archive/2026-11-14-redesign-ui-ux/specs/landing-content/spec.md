## ADDED Requirements

### Requirement: Section order
The home page SHALL render, in order: Header, Hero, Señales, Servicios, Cómo trabajo, Primer paso, Footer. Each major section MUST have an `id` usable as an in-page anchor (`inicio`, `senales`, `servicios`, `como-trabajo`, `primer-paso`, `contacto`).

#### Scenario: Anchors work
- **WHEN** the user follows a link to `#servicios`
- **THEN** the page scrolls to the Servicios section heading, not hidden under the sticky header

### Requirement: Hero content
The hero SHALL show a headline describing the space she offers, the modalities "presencial en Pachuca y en línea", her credentials (Licenciatura en Psicología en Educación; especialidad en Terapia Familiar Sistémica, Gerontología y Tanatología), her portrait, a primary WhatsApp CTA and a secondary link to Servicios.

#### Scenario: Above the fold on mobile
- **WHEN** the page loads at 375×667
- **THEN** the headline, modality line and primary CTA are visible without scrolling

#### Scenario: Portrait cropping
- **WHEN** the portrait renders at any breakpoint
- **THEN** the text baked into the bottom of the source photo is not visible

### Requirement: Señales checklist as HTML
The "¿Cómo saber si deberías ir a terapia?" content SHALL be rendered as an HTML list of six statements matching the brand graphic, each on a colored band (agua, agua, mantequilla, durazno, rosa, durazno) with a decorative check icon. The section SHALL end with the line inviting contact and the WhatsApp CTA. The `terapia-checklist.jpg` image MUST NOT be rendered in the page body.

#### Scenario: Screen reader reads statements
- **WHEN** a screen reader navigates the Señales section
- **THEN** it announces a list of 6 items with the statement text, and no "check" icon names

#### Scenario: Text is selectable and responsive
- **WHEN** viewed at 320px width
- **THEN** each statement wraps within its band without horizontal scroll

### Requirement: Services list
Servicios SHALL list four groups by audience — Adultos (ansiedad, baja autoestima, ataques de pánico), Niños y adolescentes (problemas psicológicos, bajo rendimiento escolar o de conducta; terapia de juego), Pareja y familia (terapia sistémica familiar; comunicación y conflictos), Adultos mayores (grupos de apoyo: Educar con amor, Tanatorio, Envejecer con éxito). The Friday support group schedule ("viernes a partir de las 17:00 h") SHALL be shown as a highlighted block within Adultos mayores.

#### Scenario: Group schedule visible
- **WHEN** viewing the Adultos mayores row
- **THEN** the three group names and the Friday 17:00 h schedule appear in a `mantequilla` highlighted block

### Requirement: Cómo trabajo
The section SHALL explain her approach in first person: focus on the present ("aquí y ahora") while understanding origins, and an integrative approach adapted to each person.

#### Scenario: Approach copy present
- **WHEN** viewing Cómo trabajo
- **THEN** both the present-focus and personalised-approach ideas are stated in ≤ 2 short paragraphs

### Requirement: Primer paso sequence
The page SHALL show a numbered 3-step sequence: 1) Escríbeme por WhatsApp, 2) Asesoría gratuita, 3) Primera sesión presencial o en línea, rendered as an ordered list.

#### Scenario: Ordered semantics
- **WHEN** inspecting the Primer paso markup
- **THEN** the steps are inside an `<ol>` with 3 `<li>` elements

### Requirement: Copy voice
All copy SHALL be in Spanish, first person singular, sentence case, without typos or filler slogans. "Nuestros servicios" and "Estás a un solo click de cambiar tu vida" MUST be removed.

#### Scenario: Voice check
- **WHEN** the rendered text is searched for "Nuestros" or "Nuestro objetivo"
- **THEN** no matches are found
