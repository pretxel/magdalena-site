# contact-flow Specification

## Purpose
Define how visitors reach Magdalena: one contact configuration, a consistent WhatsApp call to action with a prefilled message, and a zone-only location.
## Requirements
### Requirement: Single contact configuration
Phone number (digits `527711292106`), WhatsApp prefilled message, Pachuca zone and schedule SHALL be defined once in `src/config/contact.ts` and consumed by every component that shows contact info.

#### Scenario: Change number in one place
- **WHEN** the phone number in `src/config/contact.ts` is changed and the site rebuilt
- **THEN** every WhatsApp link on the page uses the new number

### Requirement: Consistent WhatsApp CTA
Every primary call to action SHALL be labelled "Escríbeme por WhatsApp", include the WhatsApp glyph, use the `ciruela` fill, and link to `https://wa.me/527711292106?text=<url-encoded prefilled message>` (prefix `52`, without the legacy `1`) opening in a new tab with `rel="noopener noreferrer"`. CTAs SHALL appear in the header, hero, end of Señales, Primer paso and footer.

#### Scenario: Prefilled message
- **WHEN** a visitor activates any WhatsApp CTA
- **THEN** WhatsApp opens a chat with the configured number and the message "Hola Magdalena, me gustaría agendar una asesoría gratuita." already typed

#### Scenario: New-tab disclosure
- **WHEN** a screen reader focuses a WhatsApp CTA
- **THEN** it announces that the link opens WhatsApp in a new tab

### Requirement: Sticky mobile CTA
On viewports below 768px, a bottom bar with the WhatsApp CTA SHALL appear after the hero CTA scrolls out of view, and SHALL hide while the footer is visible. Without JavaScript the bar SHALL remain visible and page content MUST NOT be obscured.

#### Scenario: Appears after hero
- **WHEN** a mobile visitor scrolls past the hero CTA
- **THEN** the sticky WhatsApp bar slides into view

#### Scenario: No overlap with footer
- **WHEN** the footer CTA is in view
- **THEN** the sticky bar is hidden

### Requirement: Contact details in footer
The footer SHALL show the CTA, the in-person location as the configured zone of Pachuca (e.g. "Presencial en <zona>, Pachuca, Hidalgo") plus "también en línea", the WhatsApp number in human-readable format, and the Friday groups schedule. A street address MUST NOT be published.

#### Scenario: Zone only
- **WHEN** viewing the footer or hero location line
- **THEN** the zone of Pachuca from `src/config/contact.ts` is shown and no street name or number appears

#### Scenario: Number readable
- **WHEN** viewing the footer
- **THEN** the phone number is displayed formatted (e.g. "771 129 2106") and is itself a WhatsApp link

