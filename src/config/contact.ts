// Single source of truth for every contact detail on the site.

export const contact = {
  /** International format for wa.me: country code 52 + 10 digits, no "+" and no legacy "1". */
  phoneDigits: '527711292106',
  phoneDisplay: '771 129 2106',
  message: 'Hola Magdalena, me gustaría agendar una asesoría gratuita.',
  city: 'Pachuca, Hidalgo',
  /** Zone shown publicly. Never publish a street address. TODO: confirm exact zone with Magdalena. */
  zone: 'zona centro',
  groupsSchedule: 'Viernes a partir de las 17:00 h',
} as const;

export const whatsappUrl = (message: string = contact.message) =>
  `https://wa.me/${contact.phoneDigits}?text=${encodeURIComponent(message)}`;

export const locationLine = `Presencial en ${contact.zone}, ${contact.city}`;
