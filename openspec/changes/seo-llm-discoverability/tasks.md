## 1. Origin and crawl basics

- [x] 1.1 Set `site: 'https://www.psicoterapeutamagdalenamontiel.com'` in `astro.config.mjs`
- [x] 1.2 Add `@astrojs/sitemap` (`pnpm astro add sitemap`) and confirm it is registered in `integrations`
- [x] 1.3 In `src/layouts/Layout.astro`, remove the `?? Astro.url` fallback so canonical and OG URLs are built only from `Astro.site`
- [x] 1.4 Create `src/pages/robots.txt.ts`: `User-agent: *` / `Allow: /`, an explicit group for the AI crawlers listed in the ai-discoverability spec, and a `Sitemap:` line built from `site`
- [x] 1.5 Build and confirm `dist/robots.txt`, `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist and that `grep -r localhost dist` returns nothing

## 2. Single source of content

- [x] 2.1 Create `src/config/content.ts` exporting `services` (four audience groups with their descriptions), `groups`, `credentials` and `faq` (plain-string question/answer pairs that interpolate `contact.*`)
- [x] 2.2 Write the eight FAQ entries from design decision 6 in first person, at most three sentences each, using only confirmed facts
- [x] 2.3 Refactor `src/components/Services.astro` to render from `services` and `groups` with no change to the rendered markup or copy
- [x] 2.4 Refactor `src/components/Approach.astro` to render the Formación list from `credentials`
- [x] 2.5 Diff the built HTML of Servicios and Cómo trabajo before and after the refactor to confirm the text is unchanged

## 3. FAQ section

- [x] 3.1 Create `src/components/Faq.astro`: `<section id="preguntas" aria-labelledby="preguntas-title">`, `<h2>` "Preguntas frecuentes", each item an `<h3>` plus `<p>`, always visible, using existing tokens and the `wrap` / `measure` utilities
- [x] 3.2 Render `<Faq />` in `src/pages/index.astro` between `<FirstStep />` and the footer
- [x] 3.3 Add `{ href: '#preguntas', label: 'Preguntas' }` to the nav in `src/components/Header.astro`; four links do not fit beside the CTA at `lg`, so this link is shown from `xl` up
- [x] 3.4 Check the section at 320px, 768px and 1440px: no horizontal scroll, heading not hidden under the sticky header when reached via `#preguntas`, contrast unchanged

## 4. Metadata

- [x] 4.1 Update the default title to `Magdalena Montiel · Psicóloga y psicoterapeuta en Pachuca` and the default description per design decision 8; verify ≤ 60 and ≤ 160 characters
- [x] 4.2 Add `og:site_name` and `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`
- [x] 4.3 Build a 1200×630 share image from an HTML template with the site fonts and tokens (portrait, name, "Psicóloga y psicoterapeuta · Pachuca y en línea"), screenshot it and save as `public/og.jpg` (target < 200 KB)
- [x] 4.4 Point `og:image` and `twitter:image` to `/og.jpg`, add `og:image:width` 1200, `og:image:height` 630 and update `og:image:alt` to describe the new image

## 5. Structured data

- [x] 5.1 Create `src/components/StructuredData.astro` that builds the `@graph` (`WebSite`, `ProfessionalService`, `Person`, `FAQPage`) from `Astro.site`, `src/config/contact.ts` and `src/config/content.ts`, per design decision 4
- [x] 5.2 Serialise with `JSON.stringify`, escape `<` as `<`, and output with `set:html` inside `<script type="application/ld+json">`
- [x] 5.3 Render it in the `<head>` of `Layout.astro` (via a `head` slot filled from `index.astro`, so future pages can supply their own)
- [x] 5.4 Confirm the built JSON parses, has one node of each type, has no `streetAddress`, `geo`, `openingHours`, `priceRange`, `aggregateRating` or `review`, and that the `FAQPage` text equals the visible FAQ text

## 6. llms.txt

- [x] 6.1 Create `src/pages/llms.txt.ts` returning `text/plain; charset=utf-8` Markdown with the structure in design decision 7, generated from `contact.ts` and `content.ts`
- [x] 6.2 Build and read `dist/llms.txt`: starts with `# Magdalena Montiel`, states Pachuca, both modalities, the free first consultation, the four audiences and the WhatsApp number, with zone-only location and an absolute link to the home page

## 7. Verification

- [x] 7.1 Run `pnpm build` and `pnpm astro check` with no errors
- [x] 7.2 Serve `pnpm preview`, disable JavaScript and confirm services, FAQ and phone number are in the raw HTML
- [x] 7.3 Run Lighthouse mobile on the preview build: SEO ≥ 95, Accessibility ≥ 95, Performance ≥ 90, CLS < 0.1
- [ ] 7.4 Paste the built JSON-LD into the Schema Markup Validator and fix any errors
- [x] 7.5 Update `README.md` with the production domain and a short note on where content, contact and SEO data live

## 8. Before and after deploy

- [ ] 8.1 Confirm with Magdalena: the wording "psicóloga y psicoterapeuta", the public zone in `contact.ts`, and whether price, session length, hours, cédula profesional and social profiles can be published
- [ ] 8.2 After deploy, fetch `/robots.txt`, `/sitemap-index.xml` and `/llms.txt` on the live domain and check the canonical tag
- [ ] 8.3 Confirm `http://` and the apex domain redirect with a 301 to `https://www.psicoterapeutamagdalenamontiel.com/`
- [ ] 8.4 Test the live URL in the Rich Results Test and a WhatsApp / Facebook share preview
- [ ] 8.5 Hand over the off-site follow-ups: Google Search Console and Bing Webmaster Tools verification with sitemap submission, and creating or claiming the Google Business Profile with the same name, city and phone
