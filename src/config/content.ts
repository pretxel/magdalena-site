// Single source of truth for the facts shown on the page, in the JSON-LD and in /llms.txt.
// Only state what Magdalena has confirmed. Price, session length and opening hours are not confirmed yet.

import { contact } from './contact';

const cityName = contact.city.split(',')[0];

export const practice = {
  name: 'Magdalena Montiel',
  jobTitle: 'Psicóloga y psicoterapeuta',
  siteName: 'Magdalena Montiel · Psicoterapeuta',
  title: 'Magdalena Montiel · Psicóloga y psicoterapeuta en Pachuca',
  description:
    'Psicóloga y psicoterapeuta en Pachuca, Hidalgo, y en línea. Terapia individual, infantil, de pareja y familiar, y adultos mayores. Primera asesoría gratuita.',
  summary: `Magdalena Montiel es psicóloga y psicoterapeuta en ${contact.city}, México. Ofrece psicoterapia presencial en ${cityName} y en línea para adultos, niños y adolescentes, parejas, familias y adultos mayores. La primera asesoría es gratuita y se agenda por WhatsApp.`,
} as const;

export const services = [
  {
    audience: 'Adultos',
    description: 'Terapia individual para ansiedad, baja autoestima y ataques de pánico.',
  },
  {
    audience: 'Niños y adolescentes',
    description:
      'Atención a problemas emocionales, bajo rendimiento escolar o dificultades de conducta, con terapia de juego.',
  },
  {
    audience: 'Pareja y familia',
    description: 'Terapia sistémica familiar para mejorar la comunicación y resolver conflictos.',
  },
  {
    audience: 'Adultos mayores',
    description: 'Acompañamiento gerontológico y tanatológico, y grupos de apoyo.',
    hasGroups: true,
  },
] as const;

export const groups = ['Educar con amor', 'Tanatorio', 'Envejecer con éxito'] as const;

export const credentials = [
  'Licenciatura en Psicología en Educación',
  'Especialidad en Terapia Familiar Sistémica',
  'Gerontología',
  'Tanatología',
] as const;

/** Lowercases the first letter so a config phrase can sit mid-sentence. */
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** Answers are plain text: the same string is rendered on the page, in the FAQPage JSON-LD and in /llms.txt. */
export const faq = [
  {
    question: '¿La primera asesoría tiene costo?',
    answer:
      'No. La primera asesoría es gratuita y sin compromiso. Platicamos para entender qué necesitas y si la terapia es para ti.',
  },
  {
    question: '¿Das terapia en línea?',
    answer: `Sí. Atiendo de forma presencial en ${cityName} y también en línea, desde donde estés.`,
  },
  {
    question: '¿Dónde está el consultorio?',
    answer: `En la ${contact.zone} de ${contact.city}. Te comparto la dirección exacta por WhatsApp cuando agendamos tu cita.`,
  },
  {
    question: '¿A quién atiendes?',
    answer:
      'Atiendo a adultos, niños y adolescentes, parejas, familias y adultos mayores. Adapto la terapia a cada persona y a su etapa de vida.',
  },
  {
    question: '¿Con qué temas puedes ayudarme?',
    answer:
      'Trabajo con ansiedad, baja autoestima y ataques de pánico; con problemas emocionales, de conducta o de rendimiento escolar en niños y adolescentes; con la comunicación y los conflictos de pareja y familia; y con procesos de duelo y envejecimiento.',
  },
  {
    question: '¿Cómo sé si necesito terapia?',
    answer:
      'Algunas señales: dudas de tus propias decisiones, no encuentras motivación, no te reconoces o sientes que has perdido la ilusión. Si te identificas con alguna, escríbeme y lo platicamos en la asesoría gratuita.',
  },
  {
    question: '¿Cuándo son los grupos de apoyo?',
    answer: `Los grupos de apoyo se reúnen los ${lowerFirst(contact.groupsSchedule)}. Son tres: ${groups.slice(0, -1).join(', ')} y ${groups.at(-1)}.`,
  },
  {
    question: '¿Cómo agendo una cita?',
    answer: `Escríbeme por WhatsApp al ${contact.phoneDisplay}. Te respondo personalmente y agendamos tu asesoría gratuita.`,
  },
] as const;
