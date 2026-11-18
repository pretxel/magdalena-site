## Context

The site is a single static Astro 7 page (`src/pages/index.astro`) with Tailwind 4, no integrations and no server code. Content is hard-coded in components; only contact details live in `src/config/contact.ts`.

Current state, verified against the repo and `dist/index.html`:

- `astro.config.mjs` has no `site`. `Layout.astro` falls back to `Astro.url`, so the built page ships `<link rel="canonical" href="http://localhost:4321/">` and the same wrong origin in `og:url` / `og:image`.
- No `robots.txt`, no sitemap, no JSON-LD, no `llms.txt`.
- The share image is `public/terapia-checklist.jpg`, 1080×1080, declared as `summary_large_image` (which expects ~1.91:1).
- Title says "Psicoterapeuta en Pachuca y en línea"; the most common local query term, "psicóloga", appears nowhere in title or description.
- The HTML itself is already in good shape for crawlers: fully static, one `<h1>`, sequential headings, `lang="es-MX"`, real text instead of images.

Constraints:

- Production origin is `https://www.psicoterapeutamagdalenamontiel.com`.
- A street address must never be published (existing `contact-flow` rule).
- Only facts already confirmed on the site may be stated. Price, session length, opening hours, licence number and social profiles are unknown.
- The hosting provider is not recorded in the repo.

## Goals / Non-Goals

**Goals:**

- Every absolute URL the site emits uses the production origin.
- Search engines can crawl, index and understand the page: robots, sitemap, structured data, search-oriented title and description.
- AI assistants can fetch the page and get unambiguous, quotable facts: who she is, what she treats, for whom, where, how to book.
- One source of truth for those facts, so the visible page, JSON-LD and `llms.txt` cannot contradict each other.
- No regression in the accessibility and performance floor.

**Non-Goals:**

- Separate pages per service, a blog, or any content strategy beyond the FAQ.
- Google Business Profile, Search Console verification, directory listings and backlinks. These are the biggest levers for local search but happen outside the repo; they are listed as follow-ups.
- Testimonials, star ratings or review markup. They are ethically sensitive for a psychotherapist and none exist.
- Changing the visual identity, the hero headline or the WhatsApp flow.
- Build-time generation of the OG image.

## Decisions

### 1. The origin lives in `astro.config.mjs` and nowhere else

Set `site: 'https://www.psicoterapeutamagdalenamontiel.com'`. Layout, endpoints and JSON-LD read `Astro.site` / `context.site`. Remove the `?? Astro.url` fallback in `Layout.astro` so a missing `site` fails loudly instead of silently shipping `localhost` again.

*Alternative considered*: a `SITE_URL` environment variable. Rejected: there is one environment, and an unset variable is exactly how the current bug would come back.

### 2. `@astrojs/sitemap` for the sitemap

The official integration emits `sitemap-index.xml` and `sitemap-0.xml` from the page list and needs only `site`.

*Alternative considered*: a hand-written `sitemap.xml.ts` endpoint. It avoids a dependency for a one-URL site, but it must be remembered whenever a page is added. The integration is small, maintained by the Astro team and build-time only.

### 3. `robots.txt` and `llms.txt` are static endpoints, not files in `public/`

`src/pages/robots.txt.ts` and `src/pages/llms.txt.ts` export a `GET` that returns text. They are prerendered at build time, so the output is still a static file, but they can read `site` and the config modules. A file in `public/` would hard-code the domain and the phone number a second time.

`robots.txt` allows everything and names the AI crawlers explicitly (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot). `User-agent: *` already allows them; the explicit group documents the intent and survives a later tightening of the wildcard rule.

### 4. One JSON-LD `@graph` with four linked nodes

A single `<script type="application/ld+json">` in `<head>`, rendered by `src/components/StructuredData.astro`:

| Node | `@id` | Key properties |
| --- | --- | --- |
| `WebSite` | `/#website` | `name`, `url`, `inLanguage: es-MX`, `publisher` → practice |
| `ProfessionalService` | `/#consultorio` | `name`, `description`, `url`, `image`, `telephone` (+52…), `address` (locality, region, country only), `areaServed` (Pachuca de Soto + México for online), `availableLanguage`, `founder`/`employee` → person, `hasOfferCatalog` (the four service groups), `makesOffer` for the free first consultation (`price: 0`, `MXN`) |
| `Person` | `/#magdalena` | `name`, `jobTitle`, `image`, `worksFor` → practice, `knowsAbout`, `hasCredential` (the four items in Formación), `knowsLanguage` |
| `FAQPage` | `/#preguntas` | `mainEntity`: the same questions and answers shown on the page |

Type choice: schema.org has no `Psychologist` type. `Physician` and `MedicalClinic` would claim a medical licence she does not hold, and `medicalSpecialty: Psychiatric` would be wrong. `ProfessionalService` is a `LocalBusiness` subtype, so it carries address, area and phone without overclaiming.

Deliberately omitted: `streetAddress`, `geo` coordinates, `openingHoursSpecification`, `priceRange`, `aggregateRating`, `review`, `sameAs`. Each is either prohibited, unknown or would be invented.

The JSON is serialised with `JSON.stringify` and `<` escaped as `<` before `set:html`, so no content string can close the script tag.

*Note on FAQ rich results*: Google has limited FAQ rich results to a small set of authoritative sites since 2023, so no expandable snippet is expected. The markup is kept because it costs nothing and gives parsers and LLM pipelines question/answer pairs without guessing.

### 5. Facts move to `src/config/content.ts`

New module exporting `services`, `credentials`, `groups` and `faq` as plain data. `Services.astro` and `Approach.astro` are refactored to render from it; `Faq.astro`, `StructuredData.astro` and `llms.txt.ts` consume the same arrays. FAQ answers are plain strings (no HTML), so the exact same text reaches the DOM, the JSON-LD and `llms.txt`. Answers interpolate `contact.*` so the zone, phone and schedule still come from `contact.ts`.

*Alternative considered*: Astro content collections. Overkill for four lists on one page.

### 6. The FAQ is always-visible text, not an accordion

`Faq.astro` renders `<section id="preguntas">` with an `<h2>` and, per item, an `<h3>` question and a `<p>` answer. Eight short items fit without collapsing, need no JavaScript, and leave nothing hidden from a crawler or from a screen reader user. It sits between Primer paso (white) and the footer (ciruela) on the default `bruma` background, which keeps the alternating rhythm. "Preguntas" is added to the header nav from the `xl` breakpoint up; at `lg` four links do not fit beside the WhatsApp CTA.

Questions, limited to confirmed facts:

1. ¿La primera asesoría tiene costo?
2. ¿Das terapia en línea?
3. ¿Dónde está el consultorio?
4. ¿A quién atiendes?
5. ¿Con qué temas puedes ayudarme?
6. ¿Cómo sé si necesito terapia?
7. ¿Cuándo son los grupos de apoyo?
8. ¿Cómo agendo una cita?

Answers stay in first person, in line with the existing copy-voice requirement. "¿Cuánto cuesta una sesión?" and "¿Cuánto dura?" are the two most searched questions and are intentionally left out until Magdalena confirms the answers.

### 7. `llms.txt` follows the llmstxt.org shape and is self-sufficient

`# Magdalena Montiel — Psicoterapeuta`, a one-paragraph blockquote summary, then `## Servicios`, `## Modalidad y ubicación`, `## Formación`, `## Contacto`, `## Preguntas frecuentes`, and a link to the home page. Because the site is one page, the file carries the content itself rather than a list of links, and no `llms-full.txt` is produced.

Honest expectation: no major assistant has committed to reading `llms.txt`. What actually moves AI answers is the static, well-structured HTML, the direct question/answer copy, the structured data and consistent name/city/phone across the web. `llms.txt` is cheap insurance, not the main mechanism.

### 8. Title and description target search terms; the H1 stays as it is

- Title: `Magdalena Montiel · Psicóloga y psicoterapeuta en Pachuca` (57 characters).
- Description: `Psicóloga y psicoterapeuta en Pachuca, Hidalgo, y en línea. Terapia individual, infantil, de pareja y familiar, y para adultos mayores. Primera asesoría gratuita.` (must stay ≤ 160 characters; trim if the final count exceeds it).
- Add `og:site_name` and `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`.

The H1 "Un espacio para entenderte y cuidarte." is brand voice and converts hesitant visitors; the keyword load is carried by the title, the hero paragraph directly under it and the FAQ.

### 9. A committed 1200×630 `public/og.jpg`

Produced once from an HTML template that uses the site's own fonts and tokens (portrait, name, "Psicóloga y psicoterapeuta · Pachuca y en línea"), screenshotted at 1200×630 and committed. `Layout.astro` points `og:image` / `twitter:image` at it and adds `og:image:width`, `og:image:height` and an accurate `og:image:alt`.

*Alternative considered*: generating it at build with `sharp` + SVG. `librsvg` cannot load the self-hosted web fonts, so the text would render in a fallback face. A static asset is simpler and the image changes rarely.

`public/terapia-checklist.jpg` stays on disk so previously shared links keep resolving.

## Risks / Trade-offs

- [The word "psicóloga" may not be how Magdalena wants to present herself] → It matches her degree and the "Psic." already used in the current description; confirm with her before deploy (open question).
- [The zone in `contact.ts` is still marked TODO] → The FAQ and JSON-LD read it from config, so one edit fixes every surface. Confirm before deploy.
- [`www` and apex both resolve and split signals] → Verify the apex and `http://` redirect to `https://www.` with a 301 at the host; the canonical already points to `www`.
- [Structured data and visible copy drift apart] → Both render from `src/config/content.ts`; a spec scenario checks FAQ parity.
- [Allowing AI crawlers lets the copy be used for model training] → Accepted: this is a marketing page whose purpose is to be found and quoted.
- [FAQ lengthens the page and pushes the footer CTA down] → Items are one or two sentences; the sticky mobile CTA and header CTA stay available.
- [No visible ranking change for weeks] → Expected. Indexing and local ranking depend on Search Console and the Business Profile follow-ups more than on this change.

## Migration Plan

1. Merge and deploy. The change is additive and static; rollback is a redeploy of the previous commit.
2. After deploy, check on the live domain: `/robots.txt`, `/sitemap-index.xml`, `/llms.txt`, the canonical tag, and that `https://psicoterapeutamagdalenamontiel.com/` redirects to `www`.
3. Validate the live URL in the Schema Markup Validator and the Rich Results Test.
4. Follow-ups outside the repo: verify the domain in Google Search Console and Bing Webmaster Tools and submit the sitemap; create or claim the Google Business Profile with the same name, city and phone as the site.

## Open Questions

- Does Magdalena agree to be described as "psicóloga y psicoterapeuta" in the title?
- Is "zona centro" the correct public zone?
- Does she have a cédula profesional number she wants shown? It is a strong trust signal for a health-related page.
- Session price and length, and attention hours: can they be published? They would become FAQ items and `openingHoursSpecification`.
- Are there public Facebook / Instagram profiles for `sameAs`?
- Where is the site hosted, and who controls the `www` / apex redirect?
