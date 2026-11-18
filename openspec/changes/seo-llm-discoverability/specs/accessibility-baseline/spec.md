## MODIFIED Requirements

### Requirement: Metadata and sharing
The layout SHALL include a `<title>` of at most 60 characters that names Magdalena Montiel, her profession ("psicóloga y psicoterapeuta") and Pachuca; a meta description of at most 160 characters that mentions Pachuca, online sessions and the free first consultation; a canonical link with an absolute URL on the production origin; a robots meta allowing indexing with large image previews; Open Graph tags (type, locale, site name, title, description, URL, image) and Twitter card tags (title, description, image); and a `theme-color` of `#4B2E6F`. The share image SHALL be a dedicated 1200×630 image referenced by absolute URL, with `og:image:width`, `og:image:height` and a descriptive `og:image:alt`.

#### Scenario: Link preview
- **WHEN** the URL is shared on WhatsApp or Facebook
- **THEN** the preview shows the practice title, description and the 1200×630 OG image uncropped

#### Scenario: Title and description length
- **WHEN** the built `<title>` and meta description are measured
- **THEN** the title is ≤ 60 characters and the description is ≤ 160 characters

#### Scenario: Share image dimensions declared
- **WHEN** the built `<head>` is inspected
- **THEN** `og:image` is an absolute `https://www.psicoterapeutamagdalenamontiel.com/` URL and `og:image:width` / `og:image:height` are `1200` and `630`
