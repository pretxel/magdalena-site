## ADDED Requirements

### Requirement: AI crawler access
`/robots.txt` SHALL explicitly allow the main AI search and assistant crawlers: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot-Extended` and `CCBot`. No rule in the file MUST block any of them.

#### Scenario: AI crawlers named and allowed
- **WHEN** `/robots.txt` is fetched
- **THEN** each listed user agent appears in a group whose only rule is `Allow: /`

### Requirement: llms.txt summary
The site SHALL serve `/llms.txt` as UTF-8 plain text in Markdown, in Spanish, with: an H1 with her name and profession; a blockquote summary stating who she is, the city, both modalities and the free first consultation; and sections for services by audience, modality and location (zone only), credentials, contact (WhatsApp number and link) and the frequently asked questions with their answers. It SHALL link to the home page with an absolute URL.

#### Scenario: File is served as text
- **WHEN** `/llms.txt` is fetched
- **THEN** the response is plain text starting with a line beginning `# Magdalena Montiel`

#### Scenario: Key facts present
- **WHEN** the file is read
- **THEN** it states Pachuca, Hidalgo, that sessions are in person and online, that the first consultation is free, the four audiences served and the WhatsApp number

#### Scenario: No street address
- **WHEN** the file is read
- **THEN** the location is given as the configured zone and city only

### Requirement: Single source of facts
Services, credentials, support groups, FAQ entries and contact details SHALL each be defined once under `src/config/` and consumed by the visible page, the structured data and `/llms.txt`. No component or endpoint MUST hard-code a copy of those facts.

#### Scenario: One edit updates every surface
- **WHEN** an FAQ answer is edited in `src/config/` and the site rebuilt
- **THEN** the new text appears in the page section, in the `FAQPage` structured data and in `/llms.txt`

#### Scenario: Group schedule stays consistent
- **WHEN** `groupsSchedule` is changed in `src/config/contact.ts` and the site rebuilt
- **THEN** the Servicios block, the footer, the FAQ answer about groups and `/llms.txt` all show the new schedule

### Requirement: Quotable identity statement
The page body SHALL contain, in plain text, direct statements an assistant can quote to answer who she is, where she works, how she works and how to book: her full name with her profession, the city and state, the in-person and online modalities, the audiences served, and the free first consultation via WhatsApp.

#### Scenario: Answerable from the page alone
- **WHEN** the rendered text of the home page is read without images or structured data
- **THEN** each of the questions "who is she", "where does she work", "does she work online", "who does she see" and "how do I book" can be answered from a single sentence or FAQ item
