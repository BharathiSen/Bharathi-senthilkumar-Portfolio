import { portfolioData } from './portfolioData';

// Short, focused summaries and helper builders
const profileSummary = 'Bharathi is a backend and AI-systems engineer and final-year ECE student at Chennai Institute of Technology, building retrieval infrastructure, agentic AI platforms, and production backend services on FastAPI, Next.js, PostgreSQL and Redis.';

const profileHighlights = [
  'Builds retrieval and agent infrastructure: hybrid search, durable execution records, and APIs with failure modes designed in.',
  'Works across FastAPI, Next.js, PostgreSQL, pgvector, Redis, Qdrant, Docker, GCP and Cloudflare Workers.',
  'Three production systems shipped, one IEEE publication, and 1,600+ DSA problems solved.',
];

const backendExpertise = [
  'FastAPI, Next.js API routes, REST design, RBAC/JWT, SSE streaming',
  'Redis quotas and tiered rate limiting, PostgreSQL with pgvector, multi-tier memory',
];

const cloudExperience = [
  'GCP (Cloud Run, Firestore), Cloudflare Workers, Vercel',
  'Docker, GitHub Actions CI/CD',
];

const aiExpertise = [
  'Agentic AI, RAG pipelines, LangGraph planner-tool-reviewer loops, multi-agent orchestration',
  'Hybrid retrieval (dense + keyword via Reciprocal Rank Fusion), tree-sitter AST chunking, recall@k/MRR evaluation in CI',
];

const whyHireMeSummary = 'Bharathi builds AI systems with the engineering discipline most portfolios skip: fail-closed quotas that bound spend, automatic fallbacks when a vector store dies, evaluation harnesses running in CI, and measured latency rather than claimed latency. Three shipped production systems, an IEEE publication, and 1,600+ DSA problems behind it.';

const githubSummary = `GitHub profile: ${portfolioData.socialLinks.github.href}. Recent work includes CodeAtlas (AI code intelligence over whole repositories), Orchestra (agentic AI platform with replayable run records), and API Reliability Lab (API load-testing SaaS with AI risk scoring).`;

const publicationsSummary = (portfolioData.publications || [])
  .map((p) => `${p.title} — ${p.venue}. ${p.description} (${p.href})`)
  .join(' ');

const problemSolvingSummary = portfolioData.problemSolving
  ? `${portfolioData.problemSolving.total} ${portfolioData.problemSolving.summary}: ${portfolioData.problemSolving.platforms.map((p) => `${p.name} (${p.count})`).join(', ')}.`
  : '';

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
  availability: 'Bharathi is open to backend and AI-systems roles from 2027.',
  location: portfolioData.contact.location,
  latestRepo: portfolioData.projects[0].title,
  latestRepoLink: portfolioData.projects[0].github,
  topLanguages: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C'],
  githubSummary,
  certificationsSummary,
  achievementsSummary,
  publicationsSummary,
  problemSolvingSummary,
};

const normalizeText = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
const tokenize = (value) => normalizeText(value).split(/\s+/).filter((t) => t.length > 1);
const compact = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const buildDocument = ({ id, graphId = id, source, title, text, tags = [], url = '' }) => ({ id, graphId, source, title, text: compact(text), tags, url });

const portfolioKnowledgeGraph = portfolioData.knowledgeGraph || { nodes: [], edges: [] };
const graphNodeIndex = new Map(portfolioKnowledgeGraph.nodes.map((node) => [node.id, node]));
const graphEdgesByNode = portfolioKnowledgeGraph.edges.reduce((map, edge) => {
  const forwardEdges = map.get(edge.from) || [];
  const reverseEdges = map.get(edge.to) || [];

  forwardEdges.push({ ...edge, otherId: edge.to });
  reverseEdges.push({ ...edge, otherId: edge.from });

  map.set(edge.from, forwardEdges);
  map.set(edge.to, reverseEdges);
  return map;
}, new Map());

const getNodeLabel = (nodeId) => graphNodeIndex.get(nodeId)?.label || nodeId;
const getNodeSummary = (nodeId) => graphNodeIndex.get(nodeId)?.summary || '';
const getGraphId = (snippet) => snippet?.graphId || snippet?.id || '';

const buildRelationshipBridgeSnippets = (snippets, limit = 4) => {
  const bridges = [];
  const seenBridgeIds = new Set();

  for (const snippet of snippets) {
    const sourceId = getGraphId(snippet);
    const sourceLabel = getNodeLabel(sourceId);
    const edges = graphEdgesByNode.get(sourceId) || [];

    for (const edge of edges) {
      const targetId = edge.otherId;
      if (!targetId || targetId === sourceId) {
        continue;
      }

      const bridgeId = `bridge-${sourceId}-${targetId}`;
      if (seenBridgeIds.has(bridgeId)) {
        continue;
      }

      const targetLabel = getNodeLabel(targetId);
      const targetSummary = getNodeSummary(targetId);
      const relationText = edge.relation ? `${sourceLabel} ${edge.relation} ${targetLabel}.` : `${sourceLabel} links to ${targetLabel}.`;

      bridges.push(buildDocument({
        id: bridgeId,
        graphId: bridgeId,
        source: 'Relationship Graph',
        title: `${sourceLabel} ↔ ${targetLabel}`,
        text: `${relationText} ${getNodeSummary(sourceId)} ${targetSummary ? `Connected idea: ${targetSummary}` : ''}`,
        tags: ['relationship', edge.relation || 'bridge', sourceId, targetId],
      }));

      seenBridgeIds.add(bridgeId);
      if (bridges.length >= limit) {
        return bridges;
      }
    }
  }

  return bridges;
};

const enrichSnippetsWithRelationships = (snippets) => {
  const relationshipSnippets = buildRelationshipBridgeSnippets(snippets, 4);
  const combined = [...snippets];
  const seenIds = new Set(snippets.map((snippet) => snippet.id));

  for (const snippet of relationshipSnippets) {
    if (!seenIds.has(snippet.id)) {
      combined.push(snippet);
      seenIds.add(snippet.id);
    }
  }

  return { combined, relationshipSnippets };
};

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
    graphId: 'theme-backend-systems',
    source: 'Resume',
    title: 'Resume summary',
    text: profileSummary,
    tags: ['resume', 'summary', 'profile', 'general profile'],
  }),
  buildDocument({
    id: 'education',
    graphId: 'education-cit',
    source: 'Education',
    title: 'Education',
    text: `Bharathi studies ${portfolioData.about.quickFacts.degree} at ${portfolioData.about.quickFacts.college} (${portfolioData.about.quickFacts.batch}) with CGPA ${portfolioData.about.quickFacts.cgpa}.`,
    tags: ['education', 'college', 'degree', 'cgpa'],
  }),
  buildDocument({
    id: 'backend',
    graphId: 'theme-backend-systems',
    source: 'Expertise',
    title: 'Backend',
    text: `Bharathi focuses on backend engineering. ${backendExpertise.join('. ')}.`,
    tags: ['backend', 'fastapi', 'postgresql', 'redis', 'api'],
  }),
  buildDocument({
    id: 'skill-fastapi',
    graphId: 'skill-fastapi',
    source: 'Skills',
    title: 'FastAPI',
    text: 'Primary backend framework across CodeAtlas and Orchestra, handling parsing and retrieval orchestration, JWT auth, three-axis rate limiting, and SSE streaming.',
    tags: ['fastapi', 'backend', 'api', 'rest', 'sse'],
  }),
  buildDocument({
    id: 'skill-postgresql',
    graphId: 'skill-postgresql',
    source: 'Skills',
    title: 'PostgreSQL',
    text: 'Used with pgvector in Orchestra for embeddings and long-term agent memory, and with Prisma in API Reliability Lab for run history and per-run metrics.',
    tags: ['postgresql', 'sql', 'database', 'pgvector', 'prisma'],
  }),
  buildDocument({
    id: 'skill-redis',
    graphId: 'skill-redis',
    source: 'Skills',
    title: 'Redis',
    text: 'Fail-closed quota ledger bounding API spend in CodeAtlas, short-term agent memory in Orchestra, and tiered rate limiting in API Reliability Lab.',
    tags: ['redis', 'cache', 'quota', 'rate limiting'],
  }),
  buildDocument({
    id: 'skill-retrieval',
    graphId: 'skill-retrieval',
    source: 'Skills',
    title: 'Retrieval and RAG',
    text: `${aiExpertise[1]}. Applied in CodeAtlas (whole-function chunking across 15 languages, cited file/line answers) and Orchestra (upload to chunk to embed to pgvector with a sources UI).`,
    tags: ['rag', 'retrieval', 'vector search', 'embeddings', 'rrf', 'qdrant', 'hybrid retrieval'],
  }),
  buildDocument({
    id: 'skill-agentic',
    graphId: 'skill-agentic',
    source: 'Skills',
    title: 'Agentic AI',
    text: `${aiExpertise[0]}. Orchestra runs three pipelines — direct chat, tool-augmented via LangGraph, and multi-agent orchestration — with every run a durable replayable record carrying per-step cost and latency.`,
    tags: ['agentic ai', 'agents', 'langgraph', 'multi-agent', 'orchestration'],
  }),
  buildDocument({
    id: 'cloud',
    graphId: 'skill-cloud',
    source: 'Expertise',
    title: 'Cloud',
    text: `${cloudExperience.join('. ')}. Orchestra is deployed on Cloudflare Workers; API Reliability Lab on Vercel.`,
    tags: ['cloud', 'gcp', 'docker', 'cloudflare', 'vercel', 'ci/cd'],
  }),
  buildDocument({
    id: 'skills-summary',
    graphId: 'theme-backend-systems',
    source: 'Skills',
    title: 'Skills summary',
    text: `Languages: ${directFacts.topLanguages.join(', ')}. ${(portfolioData.skills.groups || []).map((g) => `${g.label}: ${g.items.join(', ')}`).join('. ')}.`,
    tags: ['skills', 'languages', 'ai', 'backend', 'cloud', 'tech stack'],
  }),
  buildDocument({
    id: 'publications',
    graphId: 'publication-acdof',
    source: 'Publications',
    title: 'Publications',
    text: publicationsSummary,
    tags: ['publication', 'research', 'ieee', 'acdof', 'paper'],
  }),
  buildDocument({
    id: 'problem-solving',
    graphId: 'theme-problem-solving',
    source: 'Problem solving',
    title: 'Problem solving',
    text: problemSolvingSummary,
    tags: ['dsa', 'leetcode', 'codechef', 'skillrack', 'problem solving', 'algorithms'],
  }),
  buildDocument({
    id: 'why-hire-me',
    graphId: 'theme-backend-systems',
    source: 'Summary',
    title: 'Why hire me',
    text: whyHireMeSummary,
    tags: ['why hire me', 'strengths'],
  }),
  buildDocument({
    id: 'contact',
    graphId: 'theme-credentials',
    source: 'Contact',
    title: 'Contact',
    text: `Email ${portfolioData.contact.email}. GitHub ${portfolioData.socialLinks.github.href}. LinkedIn ${portfolioData.socialLinks.linkedin.href}.`,
    tags: ['contact', 'email', 'github', 'linkedin'],
  }),
  buildDocument({
    id: 'certifications',
    graphId: 'theme-credentials',
    source: 'Certifications',
    title: 'Certifications',
    text: certificationsSummary,
    tags: ['certifications'],
  }),
  buildDocument({
    id: 'achievements',
    graphId: 'theme-problem-solving',
    source: 'Achievements',
    title: 'Achievements',
    text: achievementsSummary,
    tags: ['achievements'],
  }),
  buildDocument({
    id: 'projects-summary',
    graphId: 'theme-backend-systems',
    source: 'Projects',
    title: 'Projects (high-level)',
    text: portfolioData.projects.map((p) => `${p.title}: ${p.description}`).slice(0, 8).join('\n'),
    tags: ['projects', 'portfolio'],
  }),
];

// Detailed documents from portfolio (project-level, experience, writing, FAQs)
const detailDocuments = [
  // Each project carries a stable `id` that matches its knowledge-graph node.
  ...portfolioData.projects.map((project) => buildDocument({
    id: `project-${project.id}`,
    graphId: `project-${project.id}`,
    source: 'Projects',
    title: project.title,
    text: [
      project.tagline,
      project.description,
      ...(project.highlights || []),
      `Measured: ${(project.metrics || []).map((m) => `${m.value} ${m.label}`).join(', ')}.`,
      `Tech: ${(project.tech || []).join(', ')}.`,
      `Live: ${project.demo}. Source: ${project.github}.`,
    ].join(' '),
    tags: [project.title, ...(project.tags || []), ...(project.tech || []), 'project'],
    url: project.github,
  })),
  // Architecture detail, retrieved separately so deep questions get depth.
  ...portfolioData.projects
    .filter((project) => project.architecture)
    .map((project) => buildDocument({
      id: `architecture-${project.id}`,
      graphId: `project-${project.id}`,
      source: 'Architecture',
      title: `${project.title} — architecture`,
      text: [
        `Architecture flow: ${project.architecture.architectureFlow}`,
        `Backend: ${project.architecture.backendFlow}`,
        `Data: ${project.architecture.databaseInteractions}`,
        `Deployment: ${project.architecture.deploymentNotes}`,
      ].join(' '),
      tags: [project.title, 'architecture', 'design', 'how it works'],
      url: project.github,
    })),
  ...(portfolioData.publications || []).map((pub, i) => buildDocument({
    id: `publication-${i}`,
    graphId: 'publication-acdof',
    source: 'Publications',
    title: pub.title,
    text: `${pub.venue}, ${pub.year}. ${pub.description}`,
    tags: ['publication', 'research', 'ieee', 'acdof'],
    url: pub.href,
  })),
  ...portfolioData.experience.map((exp) => buildDocument({
    id: `experience-${exp.year}`,
    graphId: exp.title.includes('Meteorological') ? 'experience-imd' : 'experience-cognifyz',
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
// v2: bumped after migrating from textembedding-gecko → text-embedding-004
const EMBEDDINGS_STORAGE_KEY = 'bharathi-embeddings-v2';
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
// Uses the current Gemini Embeddings API: text-embedding-004 via embedContent.
// The older textembedding-gecko/:embedText endpoint is deprecated and returns 404.
const fetchGeminiEmbedding = async (apiKey, input, model = 'text-embedding-004') => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: `models/${model}`,
        content: { parts: [{ text: input }] },
      }),
    });
    if (!res.ok) {
      if (import.meta.env.DEV) console.warn('[BharathiGPT] Gemini embedding error', res.status, await res.text());
      return null;
    }
    const d = await res.json();
    return d?.embedding?.values || null;
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[BharathiGPT] Gemini embedding threw', err);
    return null;
  }
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

export const retrieveKnowledgeSnippets = async (query, limit = 5) => {
  const intent = classifyQueryIntent(query || '');

  // ─── Semantic path (preferred) ────────────────────────────────────────
  try {
    const embCache = await ensureDocumentEmbeddings();
    const qEmb = await getQueryEmbedding(query);

    if (qEmb && Array.isArray(qEmb) && Object.keys(embCache).length > 0) {
      const scored = knowledgeDocuments.map((d) => {
        // Base: cosine similarity
        let score = cosineSimilarity(qEmb, embCache[d.id] || []);
        // Small intent boost (0.1) to slightly favour on-topic docs without overriding cosine
        if (intent && d.tags && d.tags.includes(intent)) score += 0.1;
        return { ...d, score };
      });

      const results = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .filter((s) => s.score > 0.01) // only keep docs with meaningful similarity
        .map(({ id, source, title, text, url, score }) => ({ id, source, title, text, url, score }));

      if (import.meta.env.DEV) {
        console.log('[BharathiGPT] Semantic retrieval scores:', results.map((r) => `${r.id}:${r.score.toFixed(3)}`));
      }

      if (results.length > 0) return results;
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[BharathiGPT] Semantic retrieval failed, falling back to lexical:', err);
  }

  // ─── Lexical fallback (intent-driven, used only when embeddings unavailable) ───
  const tokens = tokenize(query || '');

  // Intent → tag affinity map: gives priority to the most relevant document tags
  const INTENT_TAGS = {
    education: ['education', 'college', 'degree', 'cgpa'],
    projects: ['projects', 'portfolio', 'project'],
    backend: ['backend', 'fastapi', 'api', 'postgresql', 'redis'],
    cloud: ['cloud', 'gcp', 'docker', 'kubernetes', 'ci/cd'],
    internships: ['experience', 'internship'],
    certifications: ['certifications'],
    achievements: ['achievements'],
    contact: ['contact', 'email', 'github', 'linkedin'],
    'why-hire-me': ['why hire me', 'strengths'],
    'general profile': ['resume', 'summary', 'profile', 'skills'],
  };
  const intentTags = INTENT_TAGS[intent] || [];

  const scored = knowledgeDocuments.map((d) => {
    let score = 0;
    const hay = `${normalizeText(d.title)} ${normalizeText(d.source)} ${normalizeText(d.text)} ${(d.tags || []).join(' ')}`;

    // Intent-tag match (strongest signal in lexical mode)
    const tagHits = (d.tags || []).filter((t) => intentTags.includes(t)).length;
    score += tagHits * 5;

    // Token-level overlap with document title and text
    const titleHits = tokens.filter((t) => normalizeText(d.title).includes(t)).length;
    const textHits = tokens.filter((t) => hay.includes(t)).length;
    score += titleHits * 3 + textHits;

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
  const retrievedSnippets = await retrieveKnowledgeSnippets(query);
  const { combined: snippets, relationshipSnippets } = enrichSnippetsWithRelationships(retrievedSnippets || []);
  const contextText = snippets.map((s, i) => `[${i + 1}] ${s.source}: ${s.title}\n${s.text}`).join('\n\n');
  const relationshipContext = relationshipSnippets.map((s) => `${s.title}: ${s.text}`).join('\n\n');
  const intent = classifyQueryIntent(query || '');

  if (import.meta.env.DEV) {
    console.groupCollapsed('[BharathiGPT] Retrieval debug');
    console.log('intent', intent);
    console.log('retrievedChunks', snippets);
    console.log('contextText', contextText);
    console.groupEnd();
  }

  return { query, snippets: snippets || [], contextText, relationshipContext, portfolioKnowledgeContext: buildPortfolioKnowledgeContext(), intent };
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

  const byId = (id) => portfolioData.projects.find((project) => project.id === id);
  const strongestProject = byId('codeatlas') || portfolioData.projects[0];
  const backendProject = byId('orchestra') || strongestProject;
  const cloudProject = byId('orchestra') || strongestProject;
  const saasProject = byId('api-reliability-lab') || strongestProject;
  const publication = (portfolioData.publications || [])[0] || null;

  const buildRecruiterAnswer = () => {
    if (nq.includes('what role suits') || nq.includes('what position fits') || nq.includes('best role')) {
      return [
        'Bharathi fits best as a Backend Engineer or Cloud/Platform Engineer.',
        `The strongest evidence is ${backendProject.title} for agent and retrieval depth, ${strongestProject.title} for retrieval engineering at repository scale, and ${saasProject.title} for shipping and securing a production SaaS.`,
        'She can contribute from day one on FastAPI, Next.js, PostgreSQL/pgvector, Redis, and RAG pipelines without a long ramp-up.',
      ].join(' ');
    }

    if (nq.includes('which project best demonstrates backend skill') || nq.includes('best demonstrates backend')) {
      return [
        `${backendProject.title} is the clearest backend signal: FastAPI with JWT auth, three-axis rate limiting, SSE streaming, two-tier Redis + PostgreSQL memory, and durable replayable run records at 0.4-0.9s direct-chat latency.`,
        `${saasProject.title} is the production-delivery companion: SSRF-safe validation, SHA-256-hashed API keys, tiered rate limiting, and 22 Vitest plus 5 Playwright tests in CI.`,
      ].join(' ');
    }

    if (nq.includes('which project best demonstrates cloud skill') || nq.includes('best demonstrates cloud')) {
      return [
        `${cloudProject.title} is the strongest cloud example, deployed on Cloudflare Workers with a FastAPI backend and PostgreSQL/pgvector, holding 2.3s warm RAG retrieval.`,
        `${saasProject.title} runs on Vercel with Prisma and Redis, and ${publication ? publication.venue : 'the IEEE ICSSS 2025 publication'} extends the signal into cloud-DevOps orchestration research.`,
      ].join(' ');
    }

    if (nq.includes('why hire') || nq.includes('why should') || nq.includes('strong candidate')) {
      return [
        `Hire Bharathi for backend or AI-systems work because she has already shipped ${strongestProject.title}, ${backendProject.title}, and ${saasProject.title} — all three live, all three measured.`,
        'What separates the work is the engineering discipline around the AI: a fail-closed Redis quota that bounds spend, automatic fallback when the vector store dies, a recall@k/MRR evaluation harness in CI, and latency that is measured rather than claimed.',
      ].join(' ');
    }

    if (nq.includes('different from a generic student profile')) {
      return [
        'Bharathi is not just listing coursework or toy demos.',
        `Her profile combines ${strongestProject.title}, ${backendProject.title} and ${saasProject.title} with an IEEE ICSSS 2025 publication, internships at India Meteorological Department and Cognifyz Technologies, and 1,600+ DSA problems solved.`,
      ].join(' ');
    }

    if (nq.includes('learning trajectory')) {
      return 'Bharathi’s trajectory moves from ML internship work (Cognifyz, Aug 2024) to geospatial radar engineering (India Meteorological Department, Nov 2024), then into published research (IEEE ICSSS 2025) and on to shipped AI systems — API Reliability Lab, then Orchestra and CodeAtlas. Each step adds backend depth and stronger system-design judgment.';
    }

    return '';
  };

  const recruiterAnswer = buildRecruiterAnswer();

  if (direct) return direct;
  if (recruiterAnswer) return recruiterAnswer;
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
