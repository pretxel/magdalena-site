import type { APIRoute } from 'astro';

// AI search and assistant crawlers. `User-agent: *` already allows them; naming them
// documents the intent and keeps them allowed if the wildcard rule is ever tightened.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('`site` must be set in astro.config.mjs');

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiCrawlers.map((agent) => `User-agent: ${agent}`),
    'Allow: /',
    '',
    `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
