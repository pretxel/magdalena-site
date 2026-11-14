## Context

Astro 7 + Tailwind 4 single page (`src/pages/index.astro`) composed of `Hero`, `Services`, `About`, `Contact`. No JS framework, no tests, static output.

**Subject:** solo psychotherapy practice of Psic. Magdalena Montiel — Licenciatura en Psicología en Educación, especialidad en Terapia Familiar Sistémica, Gerontología y Tanatología. Presencial en Pachuca (Hidalgo) y online.
**Audience:** adults weighing whether they "need" therapy, parents of children/teens, couples/families, and relatives of older adults. Many arrive from a phone via WhatsApp or Facebook share; some are older readers.
**Primary job:** turn hesitation into a first WhatsApp message for the free asesoría.

Existing brand material (`public/terapia-checklist.jpg`) already defines a look: plum handwritten ink, teal spiral inside a head silhouette, horizontal bands in teal / butter / peach / rose. The current site ignores it (blue gradient, Poppins, SaaS cards). The portrait (`public/magdalena.jpg`) is dark and has text baked into its bottom 15%.

## Goals / Non-Goals

**Goals:**
- One visual identity that is recognisably *hers*, derived from her brand graphic.
- Make the checklist real HTML and the memorable centre of the page.
- Every section leads to the same CTA; mobile-first.
- Accessibility and performance floor (see `accessibility-baseline` spec).

**Non-Goals:**
- Booking/calendar system, contact form, CMS, blog, multi-page routing.
- Re-shooting or retouching photography (only crop/position).
- Rewriting the professional claims; copy edits keep her facts as-is.

## Design plan (tokens)

### Color

| Token | Hex | Role |
|---|---|---|
| `ciruela` | `#4B2E6F` | Ink: headings, body text, primary button fill |
| `bruma` | `#EEF5F4` | Page base (cool teal-tinted white) |
| `agua` | `#8FC3C5` | Spiral stroke, band 1–2, focus ring companion |
| `mantequilla` | `#F1D9A4` | Band 3, Friday groups highlight |
| `durazno` | `#F4B79D` | Band 4 & 6 |
| `rosa` | `#F0A6B8` | Band 5 |

Plum on every accent ≥ 5.5:1, plum on `bruma` ≈ 10:1. White text only on `ciruela`. Pure `#000` / near-black not used anywhere.

### Type

- **Display:** Young Serif (single weight, soft bracketed serifs — warm without being precious). Headlines only, sentence case, tight leading (1.1).
- **Body/UI:** Atkinson Hyperlegible Next (variable) — designed for low-vision readers; fits the gerontology audience. 18px base, line-height 1.6, measure ≤ 65ch.
- Scale (1.25 minor-third-ish): 14 / 18 / 22 / 28 / 36 / 48 / 64 px; clamp() for h1 and h2.
- No all-caps labels, no eyebrows above headings, no single-word colour accents.

### Layout

Left-aligned text throughout (reads like a person talking, not a poster). Max content width 72rem; text columns ≤ 38rem.

```
┌ header (sticky, bruma) ──────────────────────────────┐
│ Magdalena Montiel · psicoterapeuta   [Escríbeme ▸WA] │
└──────────────────────────────────────────────────────┘
HERO
│ H1: Un espacio para entenderte        ╭───spiral───╮ │
│ y cuidarte.                           │  portrait   │ │
│ Psicoterapia presencial en Pachuca    │  (organic   │ │
│ y en línea.                           │   mask)     │ │
│ [Escríbeme por WhatsApp]  Ver servicios╰────────────╯ │
│ credentials line (small)                             │

SEÑALES  (full-bleed bands, the signature)
│ ¿Cómo saber si deberías ir a terapia?                │
│███ agua ███ ✓ Dudas hasta de tus propias decisiones  │
│███ agua ███ ✓ No encuentras motivación…              │
│██ mantequilla ✓ No sabes a quién recurrir…           │
│██ durazno ██ ✓ No te reconoces…                      │
│██ rosa █████ ✓ Necesitas tener todo bajo control…    │
│██ durazno ██ ✓ Sientes que has perdido la ilusión…   │
│ Si te reconoces en alguna, hablemos. [Escríbeme…]    │
  bands are ragged on the right (varying widths) echoing the graphic

SERVICIOS (list rows with hairline separators, not cards)
│ Adultos            Ansiedad, baja autoestima, pánico │
│ Niños y adolescentes   Terapia de juego…             │
│ Pareja y familia   Terapia sistémica…                │
│ Adultos mayores    Grupos de apoyo ─┐                │
│                    ┌ mantequilla ───┴─────────────┐  │
│                    │ Viernes, 17:00 h  · 3 grupos │  │
│                    └──────────────────────────────┘  │

CÓMO TRABAJO  (two short paragraphs + credentials list)

PRIMER PASO  (true sequence → numbered 1·2·3)
│ 1 Escríbeme  2 Asesoría gratuita  3 Primera sesión    │

FOOTER (ciruela bg, white text): CTA, Pachuca + en línea, WhatsApp number
Mobile: sticky bottom bar with the WhatsApp CTA after hero scrolls out.
```

### Principles

1. **Her brand, not a template** — every colour and the spiral come from her own graphic.
2. **One bold moment** — the Señales bands. Everything else is quiet: no cards, no shadows, no gradients.
3. **Say it like she would** — first person, plain Spanish, no hype.
4. **Easy for every reader** — large legible type, high contrast, works at 320px.
5. **One motion** — the hero spiral draws itself once on load (≈1.6s, `stroke-dashoffset`); disabled under `prefers-reduced-motion`. No scroll-triggered fades.

### Plan review against defaults

- First instinct was Fraunces + cream background + terracotta CTA → that is the stock "warm wellness" default. Replaced by her own plum/teal palette on a cool `bruma` base and Young Serif.
- First instinct for Servicios was a 2×2 card grid → replaced with list rows; the content is a catalogue, not features.
- Numbered markers kept **only** for Primer paso, because it is an actual sequence.
- WhatsApp green button considered → rejected; the plum button with the WhatsApp glyph keeps one consistent CTA colour and still signals the channel.

## Decisions

1. **Tailwind 4 `@theme` tokens in `global.css`** replacing `--color-primary/secondary`. *Alt:* scoped `<style>` per component — rejected, tokens must be shared.
2. **Self-hosted fonts via Fontsource** (`@fontsource/young-serif`, `@fontsource-variable/atkinson-hyperlegible-next`; fallback `@fontsource/atkinson-hyperlegible` if Next variable is unavailable). *Alt:* Google Fonts link — rejected for privacy, extra DNS hop and FOUT. *Alt:* Astro fonts API — acceptable, but Fontsource is simpler to reason about and version-pin.
3. **Checklist as `<ul>` of bands** in a new `Signals.astro`; band colour and width set from a data array. Check icon is inline SVG with `aria-hidden`. *Alt:* keep image with long alt text — rejected (not responsive, not indexable).
4. **Portrait via `astro:assets` `<Picture>`** (AVIF/WebP), `object-position` cropping out the baked-in caption, organic mask via CSS `clip-path`/SVG mask. Move file to `src/assets/magdalena.jpg`.
5. **Spiral as inline SVG component** (`Spiral.astro`) reused in hero and as small mark in footer/favicon.
6. **Contact config in one module** (`src/config/contact.ts`: phone digits `527711292106`, formatted `771 129 2106`, prefilled message, Pachuca zone, schedule) so header, hero, signals, process and footer render the same link. WhatsApp URL `https://wa.me/527711292106?text=<encoded>`. Only the zone is published, never a street address.
7. **Sticky mobile CTA** with a tiny inline `IntersectionObserver` script (shown once hero CTA leaves viewport); no-JS fallback = always visible bar at bottom on mobile with body padding.
8. **Components:** `Header`, `Hero`, `Signals`, `Services`, `Approach` (replaces `About`), `FirstStep`, `Footer` (replaces `Contact`), `WhatsAppButton`, `Spiral`. Delete `Welcome.astro` and unused `src/assets/*.svg`.

## Risks / Trade-offs

- [Young Serif has a single weight] → hierarchy comes from size and spacing, not weight; body font provides bold where needed.
- [Atkinson Hyperlegible Next may lack a Fontsource variable package] → fall back to `@fontsource/atkinson-hyperlegible` 400/700.
- [Portrait is dark and low-res] → crop tighter, add `agua` tint frame behind; flag for client to supply a better photo.
- [Removing checklist image loses Instagram-familiar visual] → keep the file for OG image so shares still show it.
- [Sticky bar can cover content] → add bottom padding on mobile; hide when footer CTA is visible.

## Migration Plan

Single deploy; static site. Rollback = revert the commit. Verify with `pnpm build` and a manual pass at 320 / 768 / 1280 px plus keyboard-only navigation and Lighthouse accessibility ≥ 95.

## Resolved Questions

- WhatsApp number format: **`527711292106`** (prefix `52`, no `1`).
- Voice: **first person** ("Escríbeme", "Mis servicios").
- Location: show **zone of Pachuca only** (colonia/zona, no street address), stored as `zone` in `src/config/contact.ts`.

## Open Questions

- Exact zone name to display (e.g. colonia or sector of Pachuca) — placeholder `zone` value until client confirms.
- Session hours beyond Friday groups?
- Is there a better-lit portrait available?
