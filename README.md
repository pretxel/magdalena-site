# magdalena-site

Sitio de una sola página de Magdalena Montiel, psicóloga y psicoterapeuta en Pachuca, Hidalgo.
Astro 7 + Tailwind 4, salida 100 % estática.

Producción: <https://www.psicoterapeutamagdalenamontiel.com>

## Comandos

| Comando        | Acción                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Instala dependencias                        |
| `pnpm dev`     | Servidor local en `localhost:4321`          |
| `pnpm build`   | Genera el sitio en `./dist/`                |
| `pnpm preview` | Sirve el build local antes de publicar      |

## Dónde vive cada cosa

| Qué                                                        | Dónde                                 |
| :--------------------------------------------------------- | :------------------------------------ |
| Dominio de producción (`site`)                             | `astro.config.mjs`                    |
| Teléfono, mensaje de WhatsApp, zona, horario de grupos     | `src/config/contact.ts`               |
| Título, descripción, servicios, formación, preguntas (FAQ) | `src/config/content.ts`               |
| Metadatos, Open Graph, canonical                           | `src/layouts/Layout.astro`            |
| Datos estructurados (JSON-LD)                              | `src/components/StructuredData.astro` |
| `/robots.txt` y `/llms.txt`                                | `src/pages/*.txt.ts`                  |
| Sitemap                                                    | `@astrojs/sitemap` (automático)       |
| Imagen para compartir (1200×630)                           | `public/og.jpg`                       |

La página, el JSON-LD y `llms.txt` leen de `src/config/`. Para cambiar un dato, edítalo ahí y
vuelve a generar el sitio: no hay copias en los componentes.

## Reglas de contenido

- No publicar dirección exacta: solo la zona y la ciudad.
- No afirmar nada que Magdalena no haya confirmado (precio, duración de la sesión, horarios).
- No agregar reseñas ni calificaciones a los datos estructurados.

Las especificaciones y el historial de cambios están en `openspec/`.
