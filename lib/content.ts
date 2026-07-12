export const identity = {
  callsign: 'SPYDIR',
  tagline: 'Hacktivist. OSINT Analyst. Red Team Operator.',
  summary:
    '15+ years across hacktivism, cyber security, OSINT, and red team operations. Affiliated with Anonymous since 2009, with involvement across hacktivist operations and a documented media presence.',
  socials: [
    { label: 'X / Twitter', href: 'https://x.com/SPYDIRBYTE', handle: '@SPYDIRBYTE' },
    { label: 'GitHub', href: 'https://github.com/spydirbyte', handle: 'spydirbyte' },
    { label: 'Discord', href: '#', handle: 'SPYDIRAV' },
  ],
};

export const disciplines = [
  'OSINT investigations, cyber threat intelligence, and digital investigations',
  'GEOINT, SOCMINT, HUMINT, IMINT, and open-source intelligence analysis',
  'Internet-wide reconnaissance, infrastructure mapping, and intelligence research',
  'Privacy, anonymity, OPSEC, and digital-footprint reduction',
  'Security research, exploit analysis, and vulnerability research',
  'Red team labs, penetration testing, and security assessments',
  'Building open-source security tools, automation, and custom software',
  'AI-powered cybersecurity, OSINT, and investigative automation',
  'Internet freedom, digital rights, and privacy advocacy',
  'Researching hacktivism, cyber history, and Anonymous culture',
  'Metadata analysis, internet attribution, and online investigation techniques',
  'Reverse engineering, malware analysis, and binary research',
  'Linux, Windows, networking, and infrastructure security',
  'Full-stack development (Next.js, Python, C#, Go, C++, and more)',
  'APIs, automation pipelines, and security-focused development',
  'Technical research, documentation, and educational content creation',
  'Creating cybersecurity, OSINT, and digital privacy educational content',
  'Encryption, secure communications, and privacy technologies',
  'Satellite imagery, geospatial analysis, and location intelligence',
  'Search engine intelligence, public records research, and advanced reconnaissance',
  'Helping new hackers and investigators develop practical cybersecurity skills',
];

export const competencies = [
  'Threat Intelligence',
  'OSINT & Investigations',
  'Penetration Testing',
  'Red Team Operations',
  'Social Engineering',
  'Vulnerability Assessment',
  'Adversary Simulation',
  'Digital Footprint Reduction',
  'Operational Security',
  'Secure Infrastructure',
  'WAF Configuration',
  'AI/ML Integration',
];

export const languages = [
  'HTML5', 'CSS3 (SCSS/SASS)', 'JavaScript (ES6+)', 'TypeScript', 'Java', 'Python',
  'PHP', 'C#', 'C', 'C++', 'PowerShell', 'Bash', 'Ruby', 'Go', 'SQL', 'Rust',
  'Kotlin', 'Swift', 'Dart', 'Lua', 'Perl',
];

export const languageCategories: { label: string; items: string[] }[] = [
  { label: 'Web', items: ['HTML5', 'CSS3 (SCSS/SASS)', 'JavaScript (ES6+)', 'TypeScript', 'PHP', 'Ruby'] },
  { label: 'Systems', items: ['C', 'C++', 'Rust', 'Go', 'Bash', 'PowerShell'] },
  { label: 'General', items: ['Python', 'Java', 'C#', 'SQL', 'Lua', 'Perl'] },
  { label: 'Mobile', items: ['Kotlin', 'Swift', 'Dart'] },
];

export type Repo = {
  name: string;
  slug: string;
  description: string;
  tags: string[];
};

export const repos: Repo[] = [
  {
    name: 'spydir-os',
    slug: 'spydir-os',
    description:
      'A free, in-depth OSINT investigation course delivered as a simulated hacker OS. Browse 8 case files through a real desktop: file browser, network map, searchable glossary, and an interactive terminal. Aligned to the GIAC GOSI domains, no backend, no dependencies.',
    tags: ['OSINT', 'Education', 'No-Backend'],
  },
  {
    name: 'spy-geoint',
    slug: 'spy-geoint',
    description:
      'GEOINT analyst workspace shadow-angle sun calculator, EXIF/GPS extraction, optional AI vision clue extraction (Anthropic/OpenAI, BYOK), interactive map, all self-hosted.',
    tags: ['GEOINT', 'Self-Hosted', 'AI'],
  },
  {
    name: 'spydir-opsec',
    slug: 'spydir-opsec',
    description:
      'A free, practical OpSec course delivered as an interactive terminal, not a docs site. Data broker removal, password security, browser hardening, and more. Single-page, no backend, hash-routed.',
    tags: ['OPSEC', 'Education', 'Terminal'],
  },
  {
    name: 'spy-kernel-triage',
    slug: 'spy-kernel-triage',
    description:
      'Triage tool for kernel static analyzer output (smatch/sparse/coccinelle) traces flagged lines through a real call graph to known entry points, flags privilege level and kernel hardening coverage. GUI + CLI, self-hosted.',
    tags: ['Kernel', 'Static Analysis', 'CLI'],
  },
  {
    name: 'spy-privacy-pulse',
    slug: 'spy-privacy-pulse',
    description:
      'Self-hosted privacy checkup dashboard 27-platform username sweep, phone footprint analysis, breach monitoring, zxcvbn password auditing, and a 32-site broker opt-out tracker, all pulled into one exposure map.',
    tags: ['Privacy', 'Dashboard', 'Self-Hosted'],
  },
  {
    name: 'spy-osint-suite',
    slug: 'spy-osint-suite',
    description:
      'OSINT toolkit username enumeration, HIBP breach checks, domain/DNS recon, EXIF metadata extraction, and offline phone intel, all in one self-hosted, Docker-ready case-file dashboard.',
    tags: ['OSINT', 'Docker', 'Toolkit'],
  },
  {
    name: 'spy-recon-mapper',
    slug: 'spy-recon-mapper',
    description:
      "A field dossier for the internet's exposed devices Shodan powered recon, mapped, scored, and diffed over time.",
    tags: ['Recon', 'Shodan', 'Mapping'],
  },
  {
    name: 'spy-threat-hunt',
    slug: 'spy-threat-hunt',
    description:
      'Threat intel triage tool: extract IOCs, check reputation, forge hunt queries. Built for analysts who are tired of doing this by hand.',
    tags: ['Threat Intel', 'IOC', 'CLI'],
  },
];

export type OpYear = {
  year: string;
  ops: string[];
};

export const opsRecord: OpYear[] = [
  { year: '2011', ops: ['OP_TUNISIA', 'OP_EGYPT', 'OP_INDIA', 'OP_MALAYSIA', 'OP_ORLANDO', 'OP_SYRIA', 'OP_DARKNET', 'OP_ANTISEC'] },
  { year: '2012', ops: ['OP_INDIA', 'OP_QUEBEC', 'OP_SYRIA', 'OP_JAPAN', 'OP_USA'] },
  { year: '2013', ops: ['OP_NSA', 'OP_EGYPT_II', 'FREEDOMHOSTING_TAKEDOWN'] },
  { year: '2014', ops: ['OP_FERGUSON', 'OP_HONG_KONG'] },
  { year: '2015', ops: ['OP_KKK', 'OP_ISIS'] },
  { year: '2016', ops: ['OP_FLINT_MICHIGAN'] },
  { year: '2017–19', ops: ['OP_SUDAN'] },
  { year: '2020', ops: ['OP_GEORGE_FLOYD', 'OP_BLUELEAKS'] },
  { year: '2021', ops: ['OP_MYANMAR', 'OP_BELARUS'] },
  { year: '2022', ops: ['OP_RUSSIA (biggest yet)', 'OP_IRAN', 'OP_GOP'] },
  {
    year: '2023–25',
    ops: [
      'OP_IRAN', 'OP_GOP', 'OP_MOMS_FOR_LIBERTY', 'OP_INFOWARS (Alex Jones / Banned.video)',
      'OP_FREE_PALESTINE', 'OP_RUSSIA_II', "OP_GEORGIA (every gov't ministry)", 'OP_VENEZUELA',
    ],
  },
];
