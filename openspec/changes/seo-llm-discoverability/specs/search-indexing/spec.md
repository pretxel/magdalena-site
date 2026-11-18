## ADDED Requirements

### Requirement: Production origin
The site SHALL declare `https://www.psicoterapeutamagdalenamontiel.com` as its origin in `astro.config.mjs`, and every absolute URL emitted by the build (canonical, `og:url`, `og:image`, sitemap entries, structured data `@id` and `url` values, `llms.txt` links) MUST use that origin. The build output MUST NOT contain `localhost`.

#### Scenario: Canonical on the production origin
- **WHEN** the site is built and `dist/index.html` is inspected
- **THEN** the canonical link is `https://www.psicoterapeutamagdalenamontiel.com/`

#### Scenario: No development origin leaks
- **WHEN** the files in `dist/` are searched for `localhost`
- **THEN** no matches are found

### Requirement: Robots file
The site SHALL serve `/robots.txt` that allows crawling of the whole site for all user agents and contains a `Sitemap:` line with the absolute URL of the sitemap index.

#### Scenario: Crawling allowed
- **WHEN** `/robots.txt` is fetched
- **THEN** it contains a `User-agent: *` group with no `Disallow` path and a `Sitemap: https://www.psicoterapeutamagdalenamontiel.com/sitemap-index.xml` line

### Requirement: XML sitemap
The build SHALL generate an XML sitemap listing every public page with its absolute canonical URL.

#### Scenario: Home page listed
- **WHEN** `/sitemap-index.xml` and the sitemap it references are fetched
- **THEN** `https://www.psicoterapeutamagdalenamontiel.com/` appears as a `<loc>` entry

### Requirement: Structured data graph
The home page SHALL include one `application/ld+json` script in `<head>` containing a schema.org `@graph` with a `WebSite`, a `ProfessionalService`, a `Person` and a `FAQPage` node, linked to each other by `@id`. The practice node SHALL state name, description, URL, image, telephone in international format, locality "Pachuca de Soto", region "Hidalgo", country "MX", the areas served (Pachuca and online), the four service groups, and the free first consultation as an offer with price 0. The person node SHALL state her name, job title and the credentials shown in the Formación list.

#### Scenario: Valid JSON-LD
- **WHEN** the script content is parsed as JSON
- **THEN** it parses without error and the `@graph` contains exactly one node of each type `WebSite`, `ProfessionalService`, `Person` and `FAQPage`

#### Scenario: Validator passes
- **WHEN** the production URL is tested in the Schema Markup Validator
- **THEN** no errors are reported

#### Scenario: Phone matches configuration
- **WHEN** the phone number in `src/config/contact.ts` is changed and the site rebuilt
- **THEN** the `telephone` value in the structured data reflects the new number

### Requirement: Truthful structured data
Structured data MUST only state facts that are visible on the page. It MUST NOT include a street address, geographic coordinates, opening hours, a price range, ratings or reviews unless the same information is published in the page body.

#### Scenario: No street address
- **WHEN** the structured data is inspected
- **THEN** the address has no `streetAddress` or `postalCode` and no `geo` property exists

#### Scenario: No ratings
- **WHEN** the structured data is searched for `aggregateRating` or `review`
- **THEN** no matches are found

#### Scenario: FAQ parity
- **WHEN** the `FAQPage` questions and answers are compared with the visible Preguntas frecuentes section
- **THEN** every question and answer text is identical and none is missing on either side

### Requirement: Content available without JavaScript
All headings, service descriptions, FAQ text and contact details SHALL be present in the initial HTML response so crawlers that do not execute JavaScript can read them.

#### Scenario: Raw HTML contains the content
- **WHEN** the home page is fetched with JavaScript disabled
- **THEN** the service groups, the FAQ questions and answers and the WhatsApp number are present in the response body

### Requirement: Search audit floor
The production build SHALL score at least 95 in the Lighthouse SEO category on mobile.

#### Scenario: Lighthouse SEO audit
- **WHEN** Lighthouse (mobile) is run on the production build
- **THEN** the SEO score is ≥ 95 and no "not crawlable" or "invalid canonical" audit fails
