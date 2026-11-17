/**
 * ALL site content lives here.
 * Anything marked `// TODO(Karl)` is a placeholder — replace it with your real info.
 * The full checklist is in the vault: 00 Plan/To Provide.md
 */

export const profile = {
  name: 'Karl Fritz Pagas',
  short: 'Karl',
  brand: 'KFP Automation',
  role: 'Student Developer · AI-assisted builder',
  location: 'Bohol, Philippines',
  email: 'karlfritzpagas4@gmail.com',
  available: true, // shows "Available for projects" pill
  socials: [
    { label: 'GitHub', href: 'https://github.com/snalejdu' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karl-pagas/' },
    { label: 'Facebook', href: 'https://www.facebook.com/k4rrlll/' },
    { label: 'Instagram', href: 'https://www.instagram.com/kyo.kankaku/' },
  ],
}

export const hero = {
  eyebrow: 'BSIT Student · Full-stack developer · Bohol, PH',
  eyebrowShort: 'Student developer · Bohol, PH',
  line1: 'I design it.',
  line2: 'AI helps me ship it.',
  sub: "I'm Karl, a student developer building web apps, desktop systems and automations, with Claude, ChatGPT and Antigravity as my co-pilots.",
  ticker: ['6+ projects built', '17+ AI & dev tools', 'Based in Bohol, PH'], // TODO(Karl): confirm numbers
}

export const tools = [
  'Claude', 'ChatGPT', 'Antigravity', 'Gemini', 'Laravel', 'React', 'Vue', 'Inertia.js',
  'Tailwind CSS', 'PostgreSQL', 'NativePHP', 'n8n', 'Zapier', 'Make', 'Airtable', 'GSAP', 'Canva AI',
]

export const services = [
  { tag: 'Web', title: 'Web Apps', desc: 'Laravel + Inertia apps with React or Vue front ends' },
  { tag: 'Desktop', title: 'Desktop Systems', desc: 'NativePHP apps built for real offices and real paperwork' },
  { tag: 'Automation', title: 'AI Automation', desc: 'n8n, Zapier and Make workflows that save hours a week' },
  { tag: 'Design', title: 'UI / UX Design', desc: 'Clean, mobile-first interfaces with a glassy finish' },
  { tag: 'Data', title: 'Databases & APIs', desc: 'PostgreSQL schemas, REST APIs and third-party integrations' },
  { tag: 'AI', title: 'Prompt Engineering', desc: 'Agent-ready prompts that turn ideas into working code' },
]

export type Project = {
  slug: string
  title: string
  kicker: string
  summary: string
  status: 'Live' | 'In development' | 'Capstone'
  tags: string[]
  /** real screenshots (public/images/projects), first one leads */
  shots: string[]
  url?: string
}

const shots = (name: string, n: number) => Array.from({ length: n }, (_, i) => `images/projects/${name}-${i + 1}.webp`)

export const projects: Project[] = [
  {
    slug: 'waypt',
    title: 'Waypt',
    kicker: 'Vehicle rental marketplace · Bohol',
    summary:
      'Peer-to-peer car and motorbike rentals for Bohol tourists, with owner, renter and admin dashboards. Island Shield keeps vehicles on the island; GPS tracking and weather-based free cancellation built in.',
    status: 'In development',
    tags: ['Laravel', 'React', 'Tailwind v4', 'shadcn/ui'],
    shots: shots('waypt', 3),
    url: 'https://mystarup-carrental-git-main-snalejdu.vercel.app',
  },
  {
    slug: 'lcr-odms',
    title: 'LCR ODMS',
    kicker: 'Desktop system · Tubigon Local Civil Registry',
    summary:
      'A NativePHP desktop app that digitizes civil registry certificates: pixel-accurate replicas of Forms 97, 102, 103 and 103A, a WIA scanner bridge, and separate citizen and employee interfaces.',
    status: 'Capstone',
    tags: ['NativePHP', 'Laravel', 'Vue', 'PostgreSQL'],
    shots: shots('lcr', 4),
  },
  {
    slug: 'kfp-automation',
    title: 'KFP Automation',
    kicker: 'AI workflows · Freelance',
    summary:
      'Automation systems for small teams: Jotform → AI screening → Trello → Gmail → Slack hiring flows, and Airtable approval pipelines that auto-post to social media.',
    status: 'Live',
    tags: ['n8n', 'Zapier', 'Airtable', 'OpenAI / Groq'],
    shots: shots('automation', 3),
  },
  {
    slug: 'anatome-3d',
    title: 'Anatome 3D',
    kicker: 'Interactive anatomy viewer · Web',
    summary:
      'A 3D human anatomy viewer that shows how the skeleton, muscles, nervous system and organs work together. Isolate or blend any layer, search 53 body parts and open labeled details for each one.',
    status: 'Live',
    tags: ['Three.js', 'Netlify'],
    shots: shots('anatome', 4),
    url: 'https://humanaaddnatomy.netlify.app',
  },
]

export const process = [
  {
    step: 'Idea',
    title: 'I map the problem first.',
    desc: "Before any code, I talk to the people who'll use it, list what they actually need, and sketch the flow. For LCR ODMS that meant sitting with the civil registry staff and their paper forms.",
    tools: ['Obsidian', 'Pen & paper'],
    snippet: '# features.md\n- Encode birth / marriage / death records\n- Print on the official forms, pixel-perfect\n- Scan supporting documents',
  },
  {
    step: 'Prompt',
    title: 'I brief AI like a teammate.',
    desc: 'I use Claude and ChatGPT to pressure-test the plan: database schema, user roles, edge cases and UI direction. Clear briefs in, better first drafts out.',
    tools: ['Claude', 'ChatGPT', 'Gemini'],
    snippet: '> Design a PostgreSQL schema for a vehicle\n  rental marketplace with owners, renters,\n  bookings and a 4% commission. Explain trade-offs.',
  },
  {
    step: 'Scaffold',
    title: 'Agents write the first draft.',
    desc: 'Antigravity turns the brief into Laravel modules, migrations and React components. What used to take days takes an afternoon.',
    tools: ['Antigravity', 'Laravel', 'React'],
    snippet: '> Scaffold the Owner Dashboard: bookings table,\n  earnings chart, fleet list. Inertia + React TSX,\n  Tailwind, mobile-first. Follow /docs/design.md',
  },
  {
    step: 'Refine',
    title: 'Then I take over.',
    desc: 'I review every file, fix the logic, harden security (rate limiting, validation, UUID tokens) and polish the UI until it feels right on a phone. The AI drafts; I decide.',
    tools: ['VS Code', 'Git', 'DevTools'],
    snippet: 'git checkout -b chore/security-hardening\n✔ rate limiting on auth routes\n✔ MIME validation on uploads',
  },
  {
    step: 'Ship',
    title: 'Deploy, test, iterate.',
    desc: 'Ship to Vercel, Netlify or Render, put it in front of real users, and loop their feedback back into the next prompt.',
    tools: ['Vercel', 'Netlify', 'Render'],
    snippet: '$ vercel --prod\n✔ Deployed to production\n→ collecting feedback from first users',
  },
]

export const split = [
  { row: 'Planning', ai: 'Drafts feature lists and database schemas', me: 'Talks to real users and decides the scope' },
  { row: 'Code', ai: 'Generates scaffolding and boilerplate', me: 'Reviews, debugs and rewrites what matters' },
  { row: 'Design', ai: 'Explores layouts and color options', me: 'Picks the direction and polishes every screen' },
  { row: 'Security', ai: 'Suggests checks to add', me: 'Hardens auth, rate limits and validation' },
  { row: 'Shipping', ai: 'Writes deploy scripts and docs', me: 'Owns the result and supports the users' },
]

export const about = {
  // TODO(Karl): rewrite in your own voice
  bio: [
    "I'm a BSIT student at Mater Dei College in Tubigon, Bohol, and a freelance automation builder under KFP Automation.",
    "I got into development by building tools for real offices, from a civil registry system for the Tubigon registry office to a rental marketplace for Bohol tourists. Today I use AI tools every day, not to skip the work, but to spend more time on the parts that matter: understanding the problem and getting the details right.",
  ],
  facts: [
    { k: 'Education', v: 'BSIT · Mater Dei College (2025 – present)' },
    { k: 'Based in', v: 'Bohol, Philippines' },
    { k: 'Freelance', v: 'KFP Automation' },
    { k: 'Languages', v: 'English · Tagalog' },
  ],
  experience: [
    { when: '2025 – 2026', what: 'IT Tutor · Community outreach', where: 'Tubigon, Bohol' },
    { when: '2024 – 2025', what: 'Office Clerk', where: 'San Isidro LGU' },
    { when: '2024 – 2025', what: 'Youth Summer Job Program', where: 'San Isidro LGU · BEPO-PESO' },
  ],
}

export const proof = {
  ghost: '6+', // TODO(Karl): confirm
  lead1: '6+ projects built.',
  lead2: 'Each one for a real problem.',
  body: 'Civil registry offices, tourists renting cars, small teams drowning in admin. I build for people with an actual need, then keep improving it.',
  tag: 'Real users. Real feedback. Real code.',
  stats: [
    // TODO(Karl): confirm numbers
    { n: '6+', label: 'Projects built', desc: 'Web apps, desktop systems and automations.' },
    { n: '17+', label: 'Tools in my stack', desc: 'From Laravel and React to n8n and Claude.' },
    { n: '1', label: 'Government client', desc: 'A capstone built for a real civil registry office.' },
    { n: '24h', label: 'Reply time', desc: 'Message me and I answer within a day.' },
  ],
}

export const why = [
  { no: '01', title: 'I finish what I start.', desc: 'Capstones, client automations, side projects. They ship, then I keep improving them.' },
  { no: '02', title: 'I build for real people.', desc: 'From registry clerks to first-time renters, I design around how they already work.' },
  { no: '03', title: 'AI speed, human judgment.', desc: 'I use AI to move fast, and I review every line before it reaches a user.' },
  { no: '04', title: 'Clear, honest updates.', desc: "No jargon. You'll always know what's done, what's next and what's blocking it." },
]

// TODO(Karl): edit answers to match your real availability and rates
export const faq = [
  { q: 'Are you available for freelance work?', a: "Yes. I take on websites, web apps and automation projects. Send me a short brief and I'll reply within a day with questions and a rough timeline." },
  { q: 'Do you take internships or OJT?', a: "Yes. I'm a BSIT student at Mater Dei College and open to internships where I can work on real products with a team." },
  { q: 'How do you use AI without cutting corners?', a: 'AI drafts, I decide. I use Claude, ChatGPT and Antigravity for planning and scaffolding, then review, test and harden everything myself before it ships.' },
  { q: 'Which stack do you build with?', a: 'Mostly Laravel with Inertia and React or Vue, Tailwind CSS and PostgreSQL. For automations: n8n, Zapier, Make and Airtable. For desktop apps: NativePHP.' },
  { q: 'Can you work on an existing project?', a: "Yes. I've done security hardening and mobile-responsive passes on existing Laravel apps without changing their design." },
  { q: 'How fast can you build a website?', a: 'A simple portfolio or landing page usually takes 1 to 2 weeks. Web apps depend on scope. I break them into milestones you can review.' },
]

export const contact = {
  line1: 'Have a project in mind?',
  line2: "Let's build it.",
  sub: 'Freelance work, internships or just a question about how I use AI. My inbox is open.',
}
