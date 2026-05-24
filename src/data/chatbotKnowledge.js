import { portfolioData } from './portfolioData';

// Short, focused summaries and helper builders
const profileSummary = 'Bharathi is a backend-focused software engineer and ECE student at Chennai Institute of Technology with experience in cloud systems, research-driven orchestration, and full-stack backend platforms.';

const profileHighlights = [
  'Backend-focused engineering student building APIs, cloud systems, and applied AI tooling.',
  'Works across FastAPI, PostgreSQL, Redis, Docker, Google Cloud, React, and TypeScript.',
];

const backendExpertise = [
  'FastAPI, REST APIs, JWT authentication, RBAC, tenant-aware architecture',
  'Redis caching, PostgreSQL indexing, multi-tenant data isolation',
];

const cloudExperience = [
  'Google Cloud, Cloud Run, Cloud Functions, Firestore',
  'Docker, Kubernetes, KEDA, CI/CD workflows',
];

const whyHireMeSummary = 'Bharathi combines backend engineering, cloud awareness, and research discipline. The portfolio shows practical full-stack delivery, multi-cloud reasoning, and a consistent focus on building reliable systems with reproducible workflows.';

const githubSummary = `GitHub profile: ${portfolioData.socialLinks.github.href}. Recent work includes API Reliability Lab, Carbon Aware Serverless Scheduler, TaskFlow, ACDOF, and VectorShift Studio.`;

const certificationsSummary = portfolioData.certifications.length > 0
  ? portfolioData.certifications.join('; ')
  : "No certifications are listed in Bharathi's portfolio yet.";

const achievementsSummary = portfolioData.achievements.length > 0
  ? portfolioData.achievements.join('; ')
  : "No achievements are listed in Bharathi's portfolio yet.";

const directFacts = {
  cgpa: portfolioData.about.quickFacts.cgpa,
  college: portfolioData.about.quickFacts.college,
  degree: portfolioData.about.quickFacts.degree,
  department: portfolioData.about.quickFacts.department,
  batch: portfolioData.about.quickFacts.batch,
  currentInterest: portfolioData.about.quickFacts.currentInterest,
  name: portfolioData.hero.name,
  title: portfolioData.hero.title,
  email: portfolioData.contact.email,
  availability: 'Bharathi is currently looking for new opportunities.',
  latestRepo: 'VectorShift Studio',
  latestRepoLink: portfolioData.projects[portfolioData.projects.length - 1].github,
  topLanguages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'C'],
  githubSummary,
  certificationsSummary,
  achievementsSummary,
};

const normalizeText = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
const tokenize = (value) => normalizeText(value).split(/\s+/).filter((t) => t.length > 1);
const compact = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const buildDocument = ({ id, source, title, text, tags = [], url = '' }) => ({ id, source, title, text: compact(text), tags, url });

export const intentTestTable = [
  { phrase: 'What is she studying?', intent: 'education' },
  { phrase: 'Where does Bharathi study?', intent: 'education' },
  { phrase: 'Which college?', intent: 'education' },
  { phrase: 'Tell me about Bharathi', intent: 'general profile' },
  { phrase: 'Backend work?', intent: 'backend' },
  { phrase: 'FastAPI work?', intent: 'backend' },
  { phrase: 'Best project?', intent: 'projects' },
  { phrase: 'Cloud experience?', intent: 'cloud' },
  { phrase: 'Internship experience?', intent: 'internships' },
  { phrase: 'Why should I hire her?', intent: 'why-hire-me' },
];

// Lightweight intent classifier for query understanding.
export const classifyQueryIntent = (query) => {
  const q = normalizeText(query || '');
  if (!q) return 'general';

  // resume / profile summary
  if (q.match(/resume summary|summary of (?:bharathi|her)|profile summary|resume|cv|about bharathi|tell me about bharathi|introduce (?:bharathi|her)|what does (?:she|bharathi) do|what is (?:her|bharathi's) background|background/)) return 'general profile';

  // education
  if (q.match(/college|degree|cgpa|gpa|study|studies|studying|b\.e|btech|university|institute|where (?:do|does|is)|which college|what college|what is she studying|what is bharathi studying|where does bharathi study|education|branch|course/)) return 'education';

  // projects
  if (q.match(/project|projects|repo|repository|github|demo|demo link|best project|strongest project|what has she built|what are her projects/)) return 'projects';

  // skills / general profile
  if (q.match(/skill|skills|languages|tech stack|technologies|experience|what does bharathi do|tell me about bharathi|about bharathi|what can she do|summary/)) return 'general profile';

  // backend
  if (q.match(/fastapi|backend|api|rest api|jwt|rbac|postgres|postgresql|redis|backend work|fastapi work|api work/)) return 'backend';

  // cloud
  if (q.match(/cloud|gcp|google cloud|cloud run|cloud functions|kubernetes|docker|serverless|cloud experience|devops/)) return 'cloud';

  // internships / experience
  if (q.match(/intern|internship|experience|worked at|company/)) return 'internships';

  // certifications
  if (q.match(/certif|certificate|certification/)) return 'certifications';

  // achievements
  if (q.match(/achiev|award|honor|publication|paper/)) return 'achievements';

  // contact
  if (q.match(/email|contact|linkedin|how to reach|reach out|github/)) return 'contact';

  // why hire me
  if (q.match(/why hire|why should|what makes|good hire/)) return 'why-hire-me';

  return 'general profile';
};

// Semantic chunks (short, focused, self-contained)
const semanticChunks = [
  buildDocument({
    id: 'resume-summary',
    source: 'Resume',
    title: 'Resume summary',
    text: profileSummary,
    tags: ['resume', 'summary', 'profile', 'general profile'],
  }),
  buildDocument({
    id: 'education',
    source: 'Education',
    title: 'Education',
    text: `Bharathi studies ${portfolioData.about.quickFacts.degree} at ${portfolioData.about.quickFacts.college} (${portfolioData.about.quickFacts.batch}) with CGPA ${portfolioData.about.quickFacts.cgpa}.`,
    tags: ['education', 'college', 'degree', 'cgpa'],
  }),
  buildDocument({
    id: 'backend',
    source: 'Expertise',
    title: 'Backend',
    text: 'Bharathi focuses on backend engineering using FastAPI, PostgreSQL, Redis, JWT, RBAC, multi-tenant architectures, and scalable REST APIs.',
    tags: ['backend', 'fastapi', 'postgresql', 'redis', 'api'],
  }),
  buildDocument({
    id: 'cloud',
    source: 'Expertise',
    title: 'Cloud',
    text: 'Experience with Google Cloud (Cloud Run, Functions), Docker, Kubernetes, KEDA, and CI/CD workflows.',
    tags: ['cloud', 'gcp', 'docker', 'kubernetes', 'ci/cd'],
  }),
  buildDocument({
    id: 'skills-summary',
    source: 'Skills',
    title: 'Skills summary',
    text: `Top languages: ${directFacts.topLanguages.join(', ')}. AI: scikit-learn, LLM integration. Backend & cloud tooling listed in portfolio.`,
    tags: ['skills', 'languages', 'ai', 'backend', 'cloud'],
  }),
  buildDocument({
    id: 'why-hire-me',
    source: 'Summary',
    title: 'Why hire me',
    text: whyHireMeSummary,
    tags: ['why hire me', 'strengths'],
  }),
  buildDocument({
    id: 'contact',
    source: 'Contact',
    title: 'Contact',
    text: `Email ${portfolioData.contact.email}. GitHub ${portfolioData.socialLinks.github.href}. LinkedIn ${portfolioData.socialLinks.linkedin.href}.`,
    tags: ['contact', 'email', 'github', 'linkedin'],
  }),
  buildDocument({
    id: 'certifications',
    source: 'Certifications',
    title: 'Certifications',
    text: certificationsSummary,
    tags: ['certifications'],
  }),
  buildDocument({
    id: 'achievements',
    source: 'Achievements',
    title: 'Achievements',
    text: achievementsSummary,
    tags: ['achievements'],
  }),
  buildDocument({
    id: 'projects-summary',
    source: 'Projects',
    title: 'Projects (high-level)',
    text: portfolioData.projects.map((p) => `${p.title}: ${p.description}`).slice(0, 8).join('\n'),
    tags: ['projects', 'portfolio'],
  }),
];

// Detailed documents from portfolio (project-level, experience, writing, FAQs)
const detailDocuments = [
  ...portfolioData.projects.map((project) => buildDocument({
    id: `project-${project.title}`,
    source: 'Projects',
    title: project.title,
    text: [project.description, `Tech: ${(project.tech || []).join(', ')}`].join(' '),
    tags: [project.title, ...(project.tech || []), 'project'],
    url: project.github,
  })),
  ...portfolioData.experience.map((exp) => buildDocument({
    id: `experience-${exp.year}`,
    source: 'Experience',
    title: exp.title,
    text: `${exp.year}. ${exp.description}`,
    tags: ['experience', 'internship'],
  })),
  ...portfolioData.writing.map((w) => buildDocument({
    id: `writing-${w.title}`,
    source: 'Writing',
    title: w.title,
    text: `${w.subtitle}. ${w.description}`,
    tags: ['writing', 'research'],
    url: w.href,
  })),
  ...(portfolioData.FAQs || []).map((faq, i) => buildDocument({ id: `faq-${i}`, source: 'FAQs', title: faq.question, text: faq.answer, tags: ['faq'] })),
];

export const knowledgeDocuments = [...semanticChunks, ...detailDocuments];

// Embeddings & semantic retrieval helpers (browser-side, cached)
const EMBEDDINGS_STORAGE_KEY = 'bharathi-embeddings-v1';
const cosineSimilarity = (a = [], b = []) => {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
};
const readEmbeddingsCache = () => {
  try { return JSON.parse(window.sessionStorage.getItem(EMBEDDINGS_STORAGE_KEY) || '{}'); } catch { return {}; }
};
const writeEmbeddingsCache = (obj) => { try { window.sessionStorage.setItem(EMBEDDINGS_STORAGE_KEY, JSON.stringify(obj)); } catch { void 0; } };

const fetchOpenAIEmbedding = async (apiKey, input, model = 'text-embedding-3-small') => {
  const res = await fetch('https://api.openai.com/v1/embeddings', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model, input }) });
  if (!res.ok) throw new Error('OpenAI embedding failed');
  const d = await res.json();
  return d?.data?.[0]?.embedding || null;
};
const fetchGeminiEmbedding = async (apiKey, input, model = 'textembedding-gecko') => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedText?key=${apiKey}`;
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: input }) });
    if (!res.ok) throw new Error('Gemini embedding failed');
    const d = await res.json();
    return d?.embedding?.values || d?.embeddings?.[0]?.values || null;
  } catch { return null; }
};

const ensureDocumentEmbeddings = async () => {
  const cache = readEmbeddingsCache();
  const missing = knowledgeDocuments.filter((d) => !cache[d.id]);
  if (missing.length === 0) return cache;
  const openAiKey = String(import.meta.env.VITE_OPENAI_API_KEY || '');
  const geminiKey = String(import.meta.env.VITE_GEMINI_API_KEY || '');
  for (const doc of missing) {
    try {
      const text = `${doc.title}\n${doc.text}`;
      let emb = null;
      if (openAiKey) emb = await fetchOpenAIEmbedding(openAiKey, text);
      else if (geminiKey) emb = await fetchGeminiEmbedding(geminiKey, text);
      if (emb && Array.isArray(emb)) cache[doc.id] = emb;
    } catch { void 0; }
  }
  writeEmbeddingsCache(cache);
  return cache;
};

const getQueryEmbedding = async (query) => {
  const openAiKey = String(import.meta.env.VITE_OPENAI_API_KEY || '');
  const geminiKey = String(import.meta.env.VITE_GEMINI_API_KEY || '');
  try { if (openAiKey) return await fetchOpenAIEmbedding(openAiKey, query); if (geminiKey) return await fetchGeminiEmbedding(geminiKey, query); } catch { return null; }
  return null;
};

export const retrieveKnowledgeSnippets = async (query, limit = 6) => {
  const q = normalizeText(query || '');
  const intent = classifyQueryIntent(query || '');
  // semantic path
  try {
    const embCache = await ensureDocumentEmbeddings();
    const qEmb = await getQueryEmbedding(query);
    if (qEmb && Object.keys(embCache).length > 0) {
      const scored = knowledgeDocuments.map((d) => {
        let score = cosineSimilarity(qEmb, embCache[d.id] || []);
        // boost documents whose tags match the detected intent
        if (intent && d.tags && d.tags.includes(intent)) score += 0.2;
        return { ...d, score };
      });
      const results = scored
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ id, source, title, text, url, score }) => ({ id, source, title, text, url, score }));
      if (results.length) return results;
    }
  } catch { void 0; }

  // lexical fallback
  const tokens = tokenize(query || '');
  const scored = knowledgeDocuments.map((d) => {
    let score = 0;
    const hay = `${normalizeText(d.title)} ${normalizeText(d.source)} ${normalizeText(d.text)} ${d.tags.join(' ')}`;
    if (!q) score = 1;
    if (hay.includes(q)) score += 8;
    if (tokens.some((t) => normalizeText(d.title).includes(t))) score += 4;
    if (tokens.some((t) => d.tags.includes(t))) score += 3;
    // boost documents by intent match
    if (intent && d.tags && d.tags.includes(intent)) score += 6;
    if (q.includes('fastapi') && d.text.toLowerCase().includes('fastapi')) score += 4;
    if (q.includes('cloud') && d.text.toLowerCase().includes('cloud')) score += 3;
    if (q.includes('backend') && d.text.toLowerCase().includes('backend')) score += 4;
    return { ...d, score };
  });
  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ id, source, title, text, url, score }) => ({ id, source, title, text, url, score }));
};

export const buildPortfolioKnowledgeContext = () => semanticChunks.map((c) => `${c.title}: ${c.text}`).join('\n\n');

export const buildRagContext = async (query) => {
  const snippets = await retrieveKnowledgeSnippets(query);
  const contextText = (snippets || []).map((s, i) => `[${i + 1}] ${s.source}: ${s.title}\n${s.text}`).join('\n\n');
  const intent = classifyQueryIntent(query || '');

  if (import.meta.env.DEV) {
    console.groupCollapsed('[BharathiGPT] Retrieval debug');
    console.log('intent', intent);
    console.log('retrievedChunks', snippets);
    console.log('contextText', contextText);
    console.groupEnd();
  }

  return { query, snippets: snippets || [], contextText, portfolioKnowledgeContext: buildPortfolioKnowledgeContext(), intent };
};

export const buildAssistantSystemPrompt = (ragContext) => `You are BharathiGPT, a recruiter-friendly assistant for Bharathi's portfolio.\nAnswer only from the provided portfolio context.\nIf the portfolio does not contain the answer, say it is not available in Bharathi's portfolio.\nRecent matched context:\n${ragContext.contextText || 'No matching context.'}\nFull portfolio knowledge:\n${ragContext.portfolioKnowledgeContext || buildPortfolioKnowledgeContext()}`;

export const answerDirectFact = (query) => {
  const nq = normalizeText(query || '');
  if (nq.includes('resume summary') || nq.includes('profile summary') || nq.includes('tell me about bharathi') || nq.includes('about bharathi') || nq.includes('introduce bharathi')) {
    return profileSummary;
  }
  if (nq.includes('what is she studying') || nq.includes('what is bharathi studying') || nq.includes('where does bharathi study') || nq.includes('which college') || nq.includes('what college')) {
    return `Bharathi studies ${directFacts.degree} at ${directFacts.college}. Her department is ${directFacts.department}.`;
  }
  if (nq.includes('cgpa')) return `Bharathi's CGPA is ${directFacts.cgpa}.`;
  if (nq.includes('study') || nq.includes('studies') || nq.includes('degree')) return `Bharathi is studying ${directFacts.degree} at ${directFacts.college}.`;
  if (nq.includes('email') || nq.includes('contact')) return `Contact: ${directFacts.email}.`;
  if (nq.includes('languages') || nq.includes('top languages')) return `Top languages: ${directFacts.topLanguages.join(', ')}.`;
  return null;
};

export const composeGroundedFallback = (query, ragContext) => {
  const nq = normalizeText(query || '');
  const snippets = (ragContext && ragContext.snippets) || [];
  const lines = snippets.map((s) => s.text).filter(Boolean);
  const direct = answerDirectFact(query);
  const topScore = snippets.reduce((maxScore, snippet) => Math.max(maxScore, Number(snippet.score || 0)), 0);
  const intent = classifyQueryIntent(query || '');

  if (direct) return direct;
  if (!nq) return 'Ask about resume summary, projects, backend skills, cloud experience, internships, certifications, or contact.';

  const weakRetrieval = snippets.length === 0 || topScore < 0.25;

  if (!weakRetrieval) {
    if (intent === 'general profile') {
      return lines[0] || profileSummary;
    }

    if ((nq.includes('best project') || nq.includes('strongest project')) && portfolioData.projects.length) {
      return `${portfolioData.projects[0].title} — ${portfolioData.projects[0].description}`;
    }

    if (intent === 'education') {
      return lines[0] || `Bharathi studies ${directFacts.degree} at ${directFacts.college}.`;
    }

    if (intent === 'projects' || nq.includes('project')) {
      return lines.length > 0
        ? lines.slice(0, 2).join(' ')
        : `Projects:\n${portfolioData.projects.slice(0, 3).map((p) => `- ${p.title}: ${p.description}`).join('\n')}`;
    }

    if (intent === 'backend' || intent === 'cloud' || nq.includes('skills')) {
      return lines.length > 0 ? lines.slice(0, 2).join(' ') : 'See Bharathi’s backend, cloud, and skills summaries in the portfolio.';
    }

    if (intent === 'internships' || intent === 'certifications' || intent === 'achievements' || intent === 'contact' || intent === 'why-hire-me' || intent === 'general profile') {
      return lines.length > 0 ? lines[0] : 'I can answer from Bharathi’s portfolio about profile, projects, skills, internships, certifications, achievements, contact, and why-hire-me.';
    }
  }

  return 'I may not have enough information about that from Bharathi\'s portfolio.';
};

export const assistantPromptChips = [
  { label: 'Resume Summary', query: 'resume summary' },
  { label: 'Best Project', query: 'best project' },
  { label: 'Backend Skills', query: 'backend skills' },
  { label: 'Cloud Experience', query: 'cloud experience' },
  { label: 'Contact', query: 'contact' },
  { label: 'Why Hire Me', query: 'why hire me' },
];

export const chatbotKnowledge = {
  profileSummary,
  profileHighlights,
  backendExpertise,
  cloudExperience,
  aiSkills: ['scikit-learn', 'LLM integration', 'applied intelligent systems'],
  internships: portfolioData.experience.map((item) => ({ role: item.title, period: item.year, summary: item.description })),
  projectSummaries: portfolioData.projects.map((p) => ({ name: p.title, summary: p.description, stack: p.tech, link: p.github })),
  certifications: portfolioData.certifications,
  achievements: portfolioData.achievements,
  githubSummary,
  FAQs: portfolioData.FAQs || [],
  recruiterQuestions: [],
  whyHireMeSummary,
  portfolioKnowledgeContext: buildPortfolioKnowledgeContext(),
  documents: knowledgeDocuments,
};

export default chatbotKnowledge;
