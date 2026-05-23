import { portfolioData } from './portfolioData';

const profileSummary = 'Bharathi is a backend-focused software engineer and ECE student at Chennai Institute of Technology with experience in cloud systems, research-driven orchestration, and full-stack backend platforms.';

const backendExpertise = [
  'FastAPI, REST APIs, JWT authentication, RBAC, tenant-aware architecture',
  'Redis caching, PostgreSQL indexing, multi-tenant data isolation',
  'Failure simulation, streaming updates, and orchestration control loops',
];

const cloudExperience = [
  'Google Cloud, Cloud Run, Cloud Functions, Firestore',
  'Docker, Kubernetes, KEDA, CI/CD workflows',
  'Serverless and multi-cloud decisioning for carbon-aware systems',
];

const whyHireMeSummary = 'Bharathi combines backend engineering, cloud awareness, and research discipline. The portfolio shows practical full-stack delivery, multi-cloud reasoning, and a consistent focus on building reliable systems with reproducible workflows.';

const directFacts = {
  cgpa: portfolioData.about.quickFacts.cgpa,
};

const normalizeText = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

const tokenize = (value) => normalizeText(value).split(/\s+/).filter((token) => token.length > 1);

const compact = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const formatProjectLine = (project) => `${project.title} — ${project.description}`;

const projectSearchText = (project) => normalizeText([project.title, project.description, ...(project.tech || []), project.demoType || ''].join(' '));

const buildDocument = ({ id, source, title, text, tags = [], url = '' }) => ({
  id,
  source,
  title,
  text: compact(text),
  tags: Array.from(new Set(tags.map((tag) => normalizeText(tag)).filter(Boolean))),
  url,
});

export const assistantPromptChips = [
  { label: 'Resume Summary', query: 'resume summary' },
  { label: 'Best Project', query: 'best project' },
  { label: 'Backend Skills', query: 'backend skills' },
  { label: 'Cloud Experience', query: 'cloud experience' },
  { label: 'Contact', query: 'contact' },
  { label: 'Why Hire Me', query: 'why hire me' },
];

const knowledgeDocuments = [
  buildDocument({
    id: 'profile-summary',
    source: 'Resume summary',
    title: 'Profile summary',
    text: profileSummary,
    tags: ['resume', 'summary', 'profile'],
  }),
  buildDocument({
    id: 'hero-summary',
    source: 'Hero summary',
    title: 'Hero summary',
    text: portfolioData.hero.summary,
    tags: ['hero', 'summary', 'introduction'],
  }),
  ...portfolioData.about.paragraphs.map((paragraph, index) => buildDocument({
    id: `about-${index}`,
    source: 'About section',
    title: `About paragraph ${index + 1}`,
    text: paragraph,
    tags: ['about', 'resume', 'profile'],
  })),
  buildDocument({
    id: 'backend-expertise',
    source: 'Recruiter FAQ',
    title: 'Backend expertise',
    text: backendExpertise.join(' '),
    tags: ['backend', 'fastapi', 'api', 'skills'],
  }),
  buildDocument({
    id: 'cloud-experience',
    source: 'Recruiter FAQ',
    title: 'Cloud experience',
    text: cloudExperience.join(' '),
    tags: ['cloud', 'devops', 'docker', 'kubernetes'],
  }),
  buildDocument({
    id: 'why-hire-me',
    source: 'Recruiter FAQ',
    title: 'Why hire me',
    text: whyHireMeSummary,
    tags: ['why hire me', 'strengths', 'recruiter'],
  }),
  ...portfolioData.projects.map((project) => buildDocument({
    id: `project-${project.title}`,
    source: 'Projects',
    title: project.title,
    text: [project.description, `Tech stack: ${(project.tech || []).join(', ')}`, project.architecture ? `Architecture: ${project.architecture.architectureFlow} ${project.architecture.backendFlow} ${project.architecture.databaseInteractions} ${project.architecture.deploymentNotes}` : ''].join(' '),
    tags: [project.title, ...(project.tech || []), 'project', 'github'],
    url: project.github,
  })),
  ...portfolioData.experience.map((experience) => buildDocument({
    id: `experience-${experience.year}`,
    source: 'Experience',
    title: experience.title,
    text: `${experience.year}. ${experience.description}`,
    tags: ['experience', 'internship', 'resume'],
  })),
  ...portfolioData.writing.map((writing) => buildDocument({
    id: `writing-${writing.title}`,
    source: 'Writing',
    title: writing.title,
    text: `${writing.subtitle}. ${writing.description}`,
    tags: ['writing', 'research', 'medium', 'ieee'],
    url: writing.href,
  })),
  ...portfolioData.FAQs?.map((faq, index) => buildDocument({
    id: `faq-${index}`,
    source: 'Recruiter FAQs',
    title: faq.question,
    text: faq.answer,
    tags: ['faq', 'recruiter', 'question'],
  })) || [],
  buildDocument({
    id: 'contact',
    source: 'Contact',
    title: 'Contact details',
    text: `Email ${portfolioData.contact.email}. GitHub ${portfolioData.socialLinks.github.href}. LinkedIn ${portfolioData.socialLinks.linkedin.href}.`,
    tags: ['contact', 'email', 'github', 'linkedin'],
  }),
  buildDocument({
    id: 'resume',
    source: 'Resume',
    title: 'Resume link',
    text: 'The resume is available for download and preview from the hero buttons.',
    tags: ['resume', 'download'],
    url: portfolioData.hero.buttons.resume.href,
  }),
];

export const chatbotKnowledge = {
  profileSummary,
  backendExpertise,
  cloudExperience,
  internships: portfolioData.experience.map((item) => ({
    role: item.title,
    period: item.year,
    summary: item.description,
  })),
  projectSummaries: portfolioData.projects.map((project) => ({
    name: project.title,
    summary: project.description,
    stack: project.tech,
    link: project.github,
  })),
  certifications: portfolioData.certifications,
  achievements: portfolioData.achievements,
  FAQs: portfolioData.FAQs || [
    {
      question: 'What does Bharathi specialize in?',
      answer: 'Backend systems, cloud engineering, and research-oriented multi-cloud orchestration.',
    },
    {
      question: 'What kind of roles is Bharathi open to?',
      answer: 'Internships and opportunities in backend engineering, cloud engineering, and applied systems work.',
    },
    {
      question: 'Where can I see the latest work?',
      answer: 'The portfolio Projects and Writing sections, plus GitHub and Medium links, show the latest work.',
    },
  ],
  recruiterQuestions: [
    'What backend systems has Bharathi built end-to-end?',
    'How has Bharathi applied cloud and DevOps in real projects?',
    'What evidence is there of research and publication work?',
  ],
  whyHireMeSummary,
  documents: knowledgeDocuments,
};

export const retrieveKnowledgeSnippets = (query, limit = 6) => {
  const normalizedQuery = normalizeText(query);
  const tokens = tokenize(query);

  const scoredDocuments = knowledgeDocuments.map((document) => {
    let score = 0;

    if (!normalizedQuery) {
      score = 1;
    } else {
      const titleText = normalizeText(document.title);
      const sourceText = normalizeText(document.source);
      const haystack = `${titleText} ${sourceText} ${document.text} ${document.tags.join(' ')}`;

      if (haystack.includes(normalizedQuery)) {
        score += 8;
      }

      if (tokens.some((token) => titleText.includes(token))) {
        score += 4;
      }

      if (tokens.some((token) => sourceText.includes(token))) {
        score += 2;
      }

      for (const token of tokens) {
        if (document.tags.includes(token)) {
          score += 3;
        }

        if (haystack.includes(token)) {
          score += 1;
        }
      }

      if (normalizedQuery.includes('fastapi') && document.text.toLowerCase().includes('fastapi')) {
        score += 4;
      }

      if (normalizedQuery.includes('cloud') && document.text.toLowerCase().includes('cloud')) {
        score += 3;
      }

      if (normalizedQuery.includes('resume') && document.tags.includes('resume')) {
        score += 4;
      }
    }

    return { ...document, score };
  });

  return scoredDocuments
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ id, source, title, text, url }) => ({ id, source, title, text, url }));
};

export const buildRagContext = (query) => {
  const snippets = retrieveKnowledgeSnippets(query);
  const contextText = snippets
    .map((snippet, index) => `[${index + 1}] ${snippet.source}: ${snippet.title}\n${snippet.text}`)
    .join('\n\n');

  return {
    query,
    snippets,
    contextText,
  };
};

export const buildAssistantSystemPrompt = (ragContext) => `You are BharathiGPT, a recruiter-friendly assistant for Bharathi's portfolio.
Answer only from the provided portfolio context.
Do not hallucinate or use external knowledge.
If the context is insufficient, say you do not have that information in the portfolio.
Keep answers concise, factual, and professional.
If the user asks about a project, you may summarize matching projects from the context.
If the user asks for a direct fact like CGPA, answer with the exact value from the portfolio.

Portfolio context:
${ragContext.contextText || 'No matching context found.'}`;

export const answerDirectFact = (query) => {
  const normalizedQuery = normalizeText(query);

  if (normalizedQuery.includes('cgpa')) {
    return `Bharathi's CGPA is ${directFacts.cgpa}.`;
  }

  return null;
};

export const composeGroundedFallback = (query, ragContext) => {
  const normalizedQuery = normalizeText(query);
  const snippets = ragContext.snippets;
  const sourceLines = snippets.map((snippet) => snippet.text).filter(Boolean);

  const directFactAnswer = answerDirectFact(query);

  if (directFactAnswer) {
    return directFactAnswer;
  }

  if (!normalizedQuery) {
    return 'Ask me about resume summary, projects, backend skills, cloud experience, internships, certifications, contact, best project, or why hire me.';
  }

  if (normalizedQuery.includes('why hire me')) {
    return `Why hire me: ${whyHireMeSummary}`;
  }

  if (normalizedQuery.includes('best project')) {
    const bestProject = portfolioData.projects[0];
    return `Best project: ${bestProject.title} — ${bestProject.description}`;
  }

  if (normalizedQuery.includes('resume')) {
    return compact(`${portfolioData.hero.summary} ${profileSummary}`);
  }

  if (normalizedQuery.includes('contact') || normalizedQuery.includes('email') || normalizedQuery.includes('linkedin') || normalizedQuery.includes('github')) {
    return compact(`Contact: ${portfolioData.contact.email}. GitHub: ${portfolioData.socialLinks.github.href}. LinkedIn: ${portfolioData.socialLinks.linkedin.href}.`);
  }

  if (normalizedQuery.includes('skills') || normalizedQuery.includes('backend') || normalizedQuery.includes('fastapi') || normalizedQuery.includes('cloud')) {
    return sourceLines.length > 0
      ? compact(sourceLines.slice(0, 2).join(' '))
      : compact(`${backendExpertise.join('. ')}. ${cloudExperience.join('. ')}.`);
  }

  if (normalizedQuery.includes('project')) {
    const matchingProjects = portfolioData.projects.filter((project) => {
      const searchText = projectSearchText(project);
      return tokenize(query).some((token) => token.length > 2 && searchText.includes(token));
    });

    const projectsToUse = matchingProjects.length > 0 ? matchingProjects : portfolioData.projects.slice(0, 3);
    return `I found these matching projects.\n${projectsToUse.slice(0, 3).map((project) => `- ${formatProjectLine(project)}`).join('\n')}`;
  }

  if (normalizedQuery.includes('experience') || normalizedQuery.includes('internship')) {
    return `Internships:\n${portfolioData.experience.map((item) => `- ${item.title} (${item.year}) — ${item.description}`).join('\n')}`;
  }

  if (normalizedQuery.includes('certif')) {
    return portfolioData.certifications.length > 0
      ? `Certifications: ${portfolioData.certifications.join('; ')}.`
      : 'No certifications are listed in the portfolio yet.';
  }

  return sourceLines.length > 0
    ? compact(sourceLines[0])
    : 'I can answer from the portfolio about resume summary, projects, backend skills, cloud experience, internships, certifications, contact, best project, and why hire me.';
};
