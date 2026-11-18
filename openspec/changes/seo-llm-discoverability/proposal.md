## Why

The site is invisible to search engines and AI assistants in ways that are cheap to fix: `astro.config.mjs` has no `site`, so the production build emits `canonical` and `og:url` as `http://localhost:4321/`; there is no `robots.txt`, no sitemap, no structured data and no `llms.txt`. People looking for "psicóloga en Pachuca" on Google, or asking ChatGPT / Claude / Perplexity for a therapist in Pachuca, have no machine-readable way to learn who Magdalena is, what she treats, where she works and how to contact her.

## What Changes

- Set the production origin `https://www.psicoterapeutamagdalenamontiel.com` as Astro `site`, so canonical, `og:url`, `og:image` and sitemap URLs are absolute and correct.
- Add `robots.txt` that allows all crawlers, explicitly allows the main AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended) and points to the sitemap.
- Add an XML sitemap generated at build time.
- Add JSON-LD structured data (`WebSite`, `ProfessionalService`, `Person`, `FAQPage`) built from `src/config/contact.ts` and the same data the page renders.
- Add `/llms.txt`: a plain Markdown summary of the practice (who, services, modalities, location zone, contact, FAQ) generated from the same sources.
- Add a visible "Preguntas frecuentes" section to the home page, written as direct question/answer pairs that both search engines and LLMs can quote.
- Tune the default `<title>` and meta description for the terms people actually search ("psicóloga", "psicoterapeuta", "Pachuca", "en línea").
- Replace the square 1080×1080 share image with a dedicated 1200×630 Open Graph image, and declare its dimensions.
- Centralise the facts that are currently duplicated across components (services, credentials, FAQ) in `src/config/` so the page, JSON-LD and `llms.txt` cannot drift apart.

No breaking changes. No street address is published anywhere, in line with the existing contact-flow rule.

## Capabilities

### New Capabilities

- `search-indexing`: production origin, canonical URLs, `robots.txt`, sitemap and JSON-LD structured data for search engines.
- `ai-discoverability`: AI crawler access policy, `/llms.txt`, and the rule that every machine-readable fact comes from the same source as the visible page.

### Modified Capabilities

- `landing-content`: section order gains "Preguntas frecuentes" (id `preguntas`) between Primer paso and Footer; new requirement for the FAQ content.
- `accessibility-baseline`: "Metadata and sharing" now requires an absolute canonical on the production origin, a 1200×630 OG image with declared dimensions, and the search-oriented title/description.

## Impact

- **Code**: `astro.config.mjs`, `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/components/Services.astro`, `src/components/Approach.astro`, `src/components/Header.astro` (nav link, if the nav lists sections); new `src/components/Faq.astro`, `src/components/StructuredData.astro`, `src/config/site.ts`, `src/config/content.ts`, `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`, `public/og.jpg`.
- **Dependencies**: adds `@astrojs/sitemap`.
- **Content**: FAQ answers must only state facts already confirmed on the site. Price, session length and opening hours are not confirmed and stay out until Magdalena provides them.
- **Outside the repo (follow-up, not in this change)**: verify the domain in Google Search Console and submit the sitemap; create or claim the Google Business Profile, which matters more than anything on-page for "cerca de mí" searches.
