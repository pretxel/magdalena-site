## 1. Foundation

- [x] 1.1 Add fonts: `pnpm add @fontsource/young-serif @fontsource-variable/atkinson-hyperlegible-next` (fallback `@fontsource/atkinson-hyperlegible` if Next variable package is unavailable)
- [x] 1.2 Rewrite `src/styles/global.css`: import fonts, define `@theme` color tokens (ciruela, bruma, agua, mantequilla, durazno, rosa), font families, type scale with `clamp()` for h1/h2, base body styles (18px, 1.6 line-height, `bruma` background, `ciruela` text)
- [x] 1.3 Add global `:focus-visible` ring, `scroll-margin-top` for anchored sections, `prefers-reduced-motion` reset, and smooth scroll only when motion is allowed
- [x] 1.4 Create `src/config/contact.ts` with phone digits `527711292106`, formatted `771 129 2106`, prefilled message, `whatsappUrl` helper, Pachuca `zone` (placeholder until confirmed, no street address) and Friday schedule
- [x] 1.5 Move `public/magdalena.jpg` to `src/assets/magdalena.jpg`; delete `src/components/Welcome.astro`, `src/assets/astro.svg`, `src/assets/background.svg`

## 2. Layout and shared components

- [x] 2.1 Update `src/layouts/Layout.astro`: `lang="es-MX"`, viewport meta, meta description, Open Graph/Twitter tags (OG image `terapia-checklist.jpg`), `theme-color #4B2E6F`, remove Google Fonts link and Poppins, skip link, `<main id="contenido">` wrapper slot
- [x] 2.2 Create `WhatsAppButton.astro` (label "Escríbeme por WhatsApp", glyph `aria-hidden`, sr-only "(abre WhatsApp en una pestaña nueva)", `ciruela` fill, ≥44px height, size variants)
- [x] 2.3 Create `Spiral.astro` inline SVG (`agua` stroke, `aria-hidden`, optional `animate` prop with stroke-dashoffset draw ≤ 2s, disabled under reduced motion)
- [x] 2.4 Create `Header.astro`: sticky, name + "psicoterapeuta", in-page nav (Servicios, Cómo trabajo, Primer paso) hidden on small screens, compact WhatsApp CTA

## 3. Sections

- [x] 3.1 Rewrite `Hero.astro` (`#inicio`): left-aligned headline, modality line, credentials, primary CTA + "Ver servicios" link, portrait via `<Picture>` (AVIF/WebP, `fetchpriority="high"`, cropped to hide baked caption, organic mask) with animated spiral
- [x] 3.2 Create `Signals.astro` (`#senales`): heading, `<ul>` of 6 statements from a data array with band colours agua/agua/mantequilla/durazno/rosa/durazno and varying right-edge widths, check SVG `aria-hidden`, closing line "Si te reconoces en alguna, hablemos." + CTA
- [x] 3.3 Rewrite `Services.astro` (`#servicios`): four audience rows separated by rules (no cards/shadows), Adultos mayores row with `mantequilla` block listing three groups and "viernes a partir de las 17:00 h"
- [x] 3.4 Replace `About.astro` with `Approach.astro` (`#como-trabajo`): first-person copy on present focus and integrative personalised approach, plus credentials list
- [x] 3.5 Create `FirstStep.astro` (`#primer-paso`): `<ol>` of 3 steps (Escríbeme por WhatsApp → Asesoría gratuita → Primera sesión presencial o en línea) + CTA
- [x] 3.6 Replace `Contact.astro` with `Footer.astro` (`#contacto`, `ciruela` background): CTA, location line with Pachuca zone only, formatted phone as WhatsApp link, Friday schedule, small spiral mark, year
- [x] 3.7 Create `StickyCta.astro`: mobile-only bottom bar; inline `IntersectionObserver` shows it after hero CTA leaves view and hides while footer is visible; no-JS fallback always visible with body bottom padding
- [x] 3.8 Update `src/pages/index.astro` to compose Header, Hero, Signals, Services, Approach, FirstStep, Footer, StickyCta in order

## 4. Copy pass

- [x] 4.1 Rewrite all copy in first person singular ("Escríbeme", "Mis servicios"), sentence case; remove "Nuestros servicios", "Nuestro objetivo", "Estás a un solo click de cambiar tu vida"; fix accents/typos
- [x] 4.2 Verify `grep -ri "nuestro" src/` returns no rendered copy and no `primary`/`secondary` color classes remain

## 5. Verification

- [x] 5.1 `pnpm build` succeeds with no warnings about missing assets
- [x] 5.2 Visual check (screenshots) at 320, 375, 768, 1280, 1920 px: no horizontal scroll, hero CTA above fold at 375×667, portrait caption hidden
- [x] 5.3 Keyboard pass: skip link first, visible focus on every link, anchors land below sticky header
- [x] 5.4 Reduced-motion pass: spiral static, no animations
- [x] 5.5 Contrast check of ciruela on each band colour and white on ciruela (all ≥ 4.5:1)
- [x] 5.6 Lighthouse mobile on `pnpm preview`: Accessibility ≥ 95, Performance ≥ 90, CLS < 0.1; no requests to Google Fonts
- [ ] 5.7 Click every WhatsApp CTA: opens `wa.me/527711292106` with prefilled message; confirm zone name with client
