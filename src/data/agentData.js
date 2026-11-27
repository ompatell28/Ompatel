// ============================================================================
// AGENT MODE DATA — Personas, prompts, example answers, and Developer API docs.
// ============================================================================

export const agentHero = {
  eyebrow: 'AGENT SIDE',
  title: 'Ask your AI about Avi.',
  subtitle: 'Pick who you are. You send one prompt, your AI reads this site, and you get an answer written for you.',
};

export const agentPersonas = [
  {
    id: 'founder',
    num: '01',
    title: 'Founder',
    subtitle: 'Get your product idea scoped.',
    prompt:
      'Read /llms.txt and /build. I am a founder building an AI product. Based on his past startups and solo builds, how can he help me ship an MVP in 6-8 weeks?',
    reads: [
      { endpoint: '/llms.txt', desc: 'Who he is' },
      { endpoint: '/build', desc: 'Startups & solo builds' },
      { endpoint: 'Scope', desc: 'Timeline & stack' },
    ],
    exampleAnswer:
      'He has shipped AI features end-to-end at Dock, Turgon AI (Fin-AI, Club CMS, Expo app), and 30+ client projects. Best fit for Next.js, Node.js, RAG, and interactive 3D/motion interfaces.',
    cta: 'Browse Build work',
    ctaRoute: '/build',
  },
  {
    id: 'brand',
    num: '02',
    title: 'Brand',
    subtitle: 'Get the media kit and a brief.',
    prompt:
      'Read /llms.txt and /brand. Summarize his 6-month Reel reach, audience demographics, and recommend a build-along Reel concept for a developer tool.',
    reads: [
      { endpoint: '/llms.txt', desc: 'Creator summary' },
      { endpoint: '/brand', desc: '13.9M+ views & formats' },
      { endpoint: 'Audience', desc: '89% ages 18-34 devs' },
    ],
    exampleAnswer:
      'Short Reels where a product does something worth watching twice, for Higgsfield, Replit, and Paytm. 40.5K on Instagram and 13.9M+ views, mostly students and early-career developers in India, 85% on phones.',
    cta: 'See the media kit',
    ctaRoute: '/brand',
  },
  {
    id: 'curious',
    num: '03',
    title: 'Curious',
    subtitle: 'Ask anything about his work.',
    prompt:
      'Read /llms.txt. Give me a quick, honest overview of what he builds, how he got started at 20, and his favorite experiments.',
    reads: [
      { endpoint: '/llms.txt', desc: 'Full bio' },
      { endpoint: '/build', desc: 'Experiments & projects' },
    ],
    exampleAnswer:
      'Started freelancing at 20, shipped 30+ client projects, joined two YC startups, and now builds AI products and creative 3D web experiments on camera.',
    cta: 'Explore experiments',
    ctaRoute: '/build',
  },
  {
    id: 'developer',
    num: '04',
    title: 'Developer',
    subtitle: 'Plug this site into your agent.',
    prompt:
      'Inspect /openapi.json and /api/v1/projects. Return a clean JSON summary of his tech stack and recent open-source builds.',
    reads: [
      { endpoint: '/openapi.json', desc: 'OpenAPI 3.1' },
      { endpoint: '/api/v1/projects', desc: 'Structured JSON' },
    ],
    exampleAnswer:
      'All endpoints return clean plain text, Markdown, or JSON with zero API keys required (60 requests/min).',
    cta: 'View curl commands below',
    ctaRoute: null,
  },
];

export const developerSection = {
  eyebrow: '05 · DEVELOPERS',
  title: 'Plug this site into your agent.',
  subtitle: 'Plain text, Markdown and JSON for everything here. No keys, no signup, 60 requests a minute.',
  curlCommands: [
    'curl https://yourdomain.com/llms.txt',
    'curl "https://yourdomain.com/api/v1/posts?type=resource"',
    'curl -H "Accept: text/markdown" https://yourdomain.com',
  ],
  endpoints: {
    READ: [
      { method: 'GET', path: '/llms.txt', desc: 'Everything about the creator, in plain text' },
      { method: 'GET', path: '/index.md', desc: 'Any page as Markdown: add .md' },
      { method: 'GET', path: '/api/v1/profile', desc: 'Profile, links and contact' },
      { method: 'GET', path: '/api/v1/experience', desc: 'Work history' },
    ],
    BUILD: [
      { method: 'GET', path: '/api/v1/projects', desc: 'Projects: ?category=' },
      { method: 'GET', path: '/api/v1/skills', desc: 'Skills by discipline' },
    ],
    ASK: [
      { method: 'POST', path: '/api/v1/chat', desc: 'Questions about the creator and his work' },
    ],
    DISCOVER: [
      { method: 'GET', path: '/openapi.json', desc: 'OpenAPI 3.1' },
      { method: 'GET', path: '/.well-known/ai-catalog.json', desc: 'AI catalog' },
      { method: 'GET', path: '/sitemap.xml', desc: 'Every canonical URL' },
    ],
  },
};
