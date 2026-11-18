import type { APIRoute } from 'astro';
import { contact, whatsappUrl } from '../config/contact';
import { credentials, faq, groups, practice, services } from '../config/content';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('`site` must be set in astro.config.mjs');

  const cityName = contact.city.split(',')[0];

  const body = [
    `# ${practice.name} — ${practice.jobTitle}`,
    '',
    `> ${practice.summary}`,
    '',
    '## Servicios',
    '',
    ...services.map((s) => `- **${s.audience}**: ${s.description}`),
    '',
    `Grupos de apoyo para adultos mayores (${contact.groupsSchedule.toLowerCase()}): ${groups.join(', ')}.`,
    '',
    '## Modalidad y ubicación',
    '',
    `- Presencial: ${contact.zone}, ${contact.city}, México. La dirección exacta se comparte al agendar.`,
    '- En línea: sesiones a distancia, desde donde estés.',
    '- Idioma: español.',
    '',
    '## Formación',
    '',
    ...credentials.map((c) => `- ${c}`),
    '',
    '## Contacto',
    '',
    `- WhatsApp: +${contact.phoneDigits.slice(0, 2)} ${contact.phoneDisplay} — ${whatsappUrl()}`,
    '- La primera asesoría es gratuita y sin compromiso.',
    `- Sitio web: [${practice.name}, psicoterapeuta en ${cityName}](${site.href})`,
    '',
    '## Preguntas frecuentes',
    '',
    ...faq.flatMap((item) => [`### ${item.question}`, '', item.answer, '']),
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
