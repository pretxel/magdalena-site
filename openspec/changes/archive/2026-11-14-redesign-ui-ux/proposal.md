## Why

The site is a one-page landing for Psic. Magdalena Montiel's practice (presencial en Pachuca y online). Its only job is to move a hesitant visitor to a first WhatsApp message, but today it reads as a generic Tailwind template: blue gradient hero unrelated to her brand, identical shadowed cards, Poppins everywhere, "Nuestros servicios" voice for a solo practitioner, and the most persuasive content ("Cómo sé si debería asistir a terapia") is locked inside a JPG that screen readers, search engines and small phones can't read. Her own brand graphic already has a distinct identity (teal spiral, plum ink, butter/peach/rose bands) that the site ignores.

## What Changes

- New visual identity drawn from her existing brand graphic: plum ink, teal-mist base, teal/butter/peach/rose accents, the spiral as the single signature motif.
- New typography: a warm display serif plus a highly legible sans for body text (her audience includes older adults and families in gerontology/tanatología).
- Rebuild the "¿Cómo saber si deberías ir a terapia?" checklist as real, accessible HTML color bands — the page's memorable element — replacing `terapia-checklist.jpg` in the layout.
- Restructure the page around the visitor's decision path: Hero → Señales (checklist) → Servicios → Cómo trabajo → Primer paso (3-step sequence) → Contacto/footer.
- Services rewritten as a scannable list grouped by who it is for (adultos, niños y adolescentes, pareja y familia, adultos mayores), with the Friday 17:00 support groups shown as a dated activity, not a card footnote.
- Contact flow: one consistent CTA name ("Escríbeme por WhatsApp") across header, hero, checklist, and footer; WhatsApp link with a prefilled message; sticky CTA on mobile.
- Copy pass in first person, sentence case, fixed typos ("Estás"), removal of filler lines.
- Quality floor: semantic landmarks, skip link, visible focus, `prefers-reduced-motion`, meta description + Open Graph, `lang="es-MX"`, optimized images via `astro:assets`, self-hosted fonts.
- **BREAKING** (internal only): remove unused `Welcome.astro`, `src/assets/astro.svg`, `src/assets/background.svg`; `--color-primary`/`--color-secondary` theme tokens replaced by the new token set.

## Capabilities

### New Capabilities
- `visual-identity`: Color tokens, typography scale, spiral motif, motion rules that define the site's look.
- `landing-content`: Section structure, order and content requirements for the one-page site, including the HTML checklist and services list.
- `contact-flow`: How visitors reach Magdalena — CTA naming, WhatsApp link behaviour, prefilled message, sticky mobile CTA.
- `accessibility-baseline`: Keyboard, screen reader, contrast, reduced motion, metadata and performance floor every section must meet.

### Modified Capabilities
<!-- None: no specs exist yet in openspec/specs/. -->

## Impact

- Code: `src/layouts/Layout.astro`, `src/styles/global.css`, `src/pages/index.astro`, all components in `src/components/` (rewritten), new components for header, checklist, process, footer.
- Assets: `public/magdalena.jpg` moved to `src/assets/` for optimization; `terapia-checklist.jpg` no longer rendered (kept for social sharing / OG image option).
- Dependencies: add `@fontsource-variable/*` packages for self-hosted fonts; remove Google Fonts `<link>`.
- No backend, routing, or deployment changes.
