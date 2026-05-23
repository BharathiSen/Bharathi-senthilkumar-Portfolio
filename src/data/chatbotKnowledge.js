import { portfolioData } from './portfolioData';

const profileSummary = 'Bharathi is a backend-focused software engineer and ECE student at Chennai Institute of Technology with experience in cloud systems, research-driven orchestration, and full-stack backend platforms.';

const profileHighlights = [
  'Backend-focused engineering student building APIs, cloud systems, and applied AI tooling.',
  'Works across FastAPI, PostgreSQL, Redis, Docker, Google Cloud, React, and TypeScript.',
  'Shows research depth through carbon-aware orchestration, scheduling, and adaptive control-loop work.',
];

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

const githubSummary = `GitHub profile: ${portfolioData.socialLinks.github.href}. Recent work includes API Reliability Lab, Carbon Aware Serverless Scheduler, TaskFlow, ACDOF, and VectorShift Studio.`;

const certificationsSummary = portfolioData.certifications.length > 0
  ? portfolioData.certifications.join('; ')
  : "No certifications are listed in Bharathi's portfolio yet.";

const achievementsSummary = portfolioData.achievements.length > 0
  ? portfolioData.achievements.join('; ')
  : "No achievements are listed in Bharathi's portfolio yet.";

const recruiterQuestions = [
  'What backend systems has Bharathi built end-to-end?',
  'How has Bharathi applied cloud and DevOps in real projects?',
  'What evidence is there of research and publication work?',
  'Tell me about Bharathi',
  'Is Bharathi backend focused?',
  'Does Bharathi know cloud?',
  'What makes Bharathi a good hire?',
  'Which project is strongest?',
  'What technologies does Bharathi prefer?',
  'Is Bharathi experienced with APIs?',
  'What internship experience does Bharathi have?',
  'What is Bharathi\'s engineering focus?',
];

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

const buildSectionText = (title, lines) => `${title}\n${lines.map((line) => `- ${compact(line)}`).join('\n')}`;

const buildProjectSummary = (project) => `${project.title}: ${project.description} Tech stack: ${(project.tech || []).join(', ')}.`;

const buildExperienceSummary = (experience) => `${experience.title} (${experience.year}): ${experience.description}`;

const recruiterFaqEntries = [
  {
    question: 'Tell me about Bharathi',
    answer: `${profileSummary} ${portfolioData.hero.summary}`,
  },
  {
    question: 'Is Bharathi backend focused?',
    answer: 'Yes. Bharathi is backend-focused, with FastAPI, REST APIs, JWT authentication, RBAC, tenant-aware architecture, PostgreSQL, and Redis featured throughout the portfolio.',
  },
  {
    question: 'Does Bharathi know cloud?',
    answer: 'Yes. The portfolio shows Google Cloud, Cloud Run, Cloud Functions, Firestore, Docker, Kubernetes, KEDA, CI/CD, and multi-cloud scheduling work.',
  },
  {
    question: 'What makes Bharathi a good hire?',
    answer: whyHireMeSummary,
  },
  {
    question: 'Which project is strongest?',
    answer: 'API Reliability Lab is the strongest product-style project because it combines secure multi-tenant architecture, Redis caching, PostgreSQL indexing, live SSE metrics, and reliability simulation.',
  },
  {
    question: 'What technologies does Bharathi prefer?',
    answer: "Bharathi's portfolio leans toward Python, FastAPI, PostgreSQL, Redis, Docker, Google Cloud, React, TypeScript, and JavaScript.",
  },
  {
    question: 'Is Bharathi experienced with APIs?',
    answer: 'Yes. The portfolio includes REST APIs, authentication flows, multi-tenant backend services, streaming updates, and orchestration logic.',
  },
  {
    question: 'What internship experience does Bharathi have?',
    answer: portfolioData.experience.map((item) => buildExperienceSummary(item)).join(' '),
  },
  {
    question: 'What is Bharathi\'s engineering focus?',
    answer: 'Bharathi focuses on backend engineering, cloud-native systems, and research-informed software design.',
  },
];

const portfolioContextSections = [
  buildSectionText('Profile summary', [profileSummary, ...profileHighlights]),
  buildSectionText('Education', [
    `CGPA ${portfolioData.about.quickFacts.cgpa}`,
    `College ${portfolioData.about.quickFacts.college}`,
    `Degree ${portfolioData.about.quickFacts.degree}`,
    `Department ${portfolioData.about.quickFacts.department}`,
    `Batch ${portfolioData.about.quickFacts.batch}`,
    `Current interest ${portfolioData.about.quickFacts.currentInterest}`,
  ]),
  buildSectionText('Backend expertise', backendExpertise),
  buildSectionText('Cloud skills', cloudExperience),
  buildSectionText('AI skills', ['scikit-learn, LLM integration, and applied intelligent systems work.']),
  buildSectionText('Internships', portfolioData.experience.map((item) => buildExperienceSummary(item))),
  buildSectionText('Projects', portfolioData.projects.map((project) => buildProjectSummary(project))),
  buildSectionText('Certifications', [certificationsSummary]),
  buildSectionText('Achievements', [achievementsSummary]),
  buildSectionText('GitHub', [githubSummary]),
  buildSectionText('Contact', [
    `Email ${portfolioData.contact.email}`,
    `GitHub ${portfolioData.socialLinks.github.href}`,
    `LinkedIn ${portfolioData.socialLinks.linkedin.href}`,
  ]),
  buildSectionText('Why hire me', [whyHireMeSummary]),
  buildSectionText('Recruiter FAQs', recruiterFaqEntries.map((faq) => `${faq.question} — ${faq.answer}`)),
];

const portfolioKnowledgeContext = portfolioContextSections.join('\n\n');

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
    id: 'portfolio-overview',
    source: 'Portfolio overview',
    title: 'Portfolio overview',
    text: "Bharathi's portfolio covers backend engineering, cloud systems, research-oriented orchestration, internships, technical writing, and recruiter-facing FAQs. The strongest project areas are API reliability, multi-cloud scheduling, multi-tenant backend systems, and interactive workflow tooling.",
    tags: ['portfolio', 'overview', 'works', 'projects', 'writing', 'internships'],
  }),
  buildDocument({
    id: 'profile-summary',
    source: 'Resume summary',
    title: 'Profile summary',
    text: profileSummary,
    tags: ['resume', 'summary', 'profile'],
  }),
  buildDocument({
    id: 'profile-highlights',
    source: 'Profile summary',
    title: 'Profile highlights',
    text: profileHighlights.join(' '),
    tags: ['profile', 'backend', 'cloud', 'ai'],
  }),
  buildDocument({
    id: 'hero-summary',
    source: 'Hero summary',
    title: 'Hero summary',
    text: portfolioData.hero.summary,
    tags: ['hero', 'summary', 'introduction'],
  }),
  buildDocument({
    id: 'education-quick-facts',
    source: 'About section',
    title: 'Education quick facts',
    text: `CGPA ${portfolioData.about.quickFacts.cgpa}. College ${portfolioData.about.quickFacts.college}. Degree ${portfolioData.about.quickFacts.degree}. Batch ${portfolioData.about.quickFacts.batch}.`,
    tags: ['education', 'cgpa', 'college', 'degree', 'batch'],
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
  ...portfolioData.skills.cards.map((card, index) => buildDocument({
    id: `skill-card-${index}`,
    source: 'Skills',
    title: `${card.label} skills`,
    text: `${card.title}. ${card.description}.`,
    tags: [card.label, card.title, ...card.description.split(/,\s*/)],
  })),
  buildDocument({
    id: 'cloud-experience',
    source: 'Recruiter FAQ',
    title: 'Cloud experience',
    text: cloudExperience.join(' '),
    tags: ['cloud', 'devops', 'docker', 'kubernetes'],
  }),
  buildDocument({
    id: 'ai-skills',
    source: 'Skills',
    title: 'AI skills',
    text: 'Bharathi lists scikit-learn, LLM integration, and applied intelligent systems work in the portfolio.',
    tags: ['ai', 'ml', 'llm', 'scikit-learn'],
  }),
  buildDocument({
    id: 'why-hire-me',
    source: 'Recruiter FAQ',
    title: 'Why hire me',
    text: whyHireMeSummary,
    tags: ['why hire me', 'strengths', 'recruiter'],
  }),
  buildDocument({
    id: 'github-summary',
    source: 'GitHub',
    title: 'GitHub summary',
    text: githubSummary,
    tags: ['github', 'repositories', 'projects'],
    url: portfolioData.socialLinks.github.href,
  }),
  buildDocument({
    id: 'availability',
    source: 'Contact',
    title: 'Availability',
    text: directFacts.availability,
    tags: ['availability', 'opportunities', 'internships', 'recruiter'],
  }),
  buildDocument({
    id: 'latest-repo',
    source: 'Projects',
    title: 'Latest repository',
    text: `The latest repository shown in the portfolio is ${directFacts.latestRepo}. Link: ${directFacts.latestRepoLink}.`,
    tags: ['latest repo', 'github', 'project', 'repository'],
    url: directFacts.latestRepoLink,
  }),
  buildDocument({
    id: 'top-languages',
    source: 'Skills',
    title: 'Top languages',
    text: `Bharathi's top languages in the portfolio are ${directFacts.topLanguages.join(', ')}.`,
    tags: ['top languages', 'languages', 'skills', 'programming'],
  }),
  ...portfolioData.projects.map((project) => buildDocument({
    id: `project-${project.title}`,
    source: 'Projects',
    title: project.title,
    text: [
      project.description,
      `Tech stack: ${(project.tech || []).join(', ')}`,
      project.architecture ? `Architecture: ${project.architecture.architectureFlow} ${project.architecture.backendFlow} ${project.architecture.databaseInteractions} ${project.architecture.deploymentNotes}` : '',
      project.demoType === 'research' ? 'Research-linked project.' : 'Product-style project.',
    ].join(' '),
    tags: [project.title, ...(project.tech || []), 'project', 'github', 'portfolio'],
    url: project.github,
  })),
  ...portfolioData.experience.map((experience) => buildDocument({
    id: `experience-${experience.year}`,
    source: 'Experience',
    title: experience.title,
    text: `${experience.year}. ${experience.description} This internship experience is part of Bharathi's portfolio work history.`,
    tags: ['experience', 'internship', 'resume', 'work'],
  })),
  ...portfolioData.writing.map((writing) => buildDocument({
    id: `writing-${writing.title}`,
    source: 'Writing',
    title: writing.title,
    text: `${writing.subtitle}. ${writing.description} This is part of Bharathi's writing and research portfolio.`,
    tags: ['writing', 'research', 'medium', 'ieee', 'portfolio'],
    url: writing.href,
  })),
  ...portfolioData.FAQs?.map((faq, index) => buildDocument({
    id: `faq-${index}`,
    source: 'Recruiter FAQs',
    title: faq.question,
    text: faq.answer,
    tags: ['faq', 'recruiter', 'question'],
  })) || [],
  ...recruiterFaqEntries.map((faq, index) => buildDocument({
    id: `recruiter-faq-${index}`,
    source: 'Recruiter FAQs',
    title: faq.question,
    text: faq.answer,
    tags: ['faq', 'recruiter', 'question', 'conversational'],
  })),
  ...recruiterQuestions.map((question, index) => buildDocument({
    id: `recruiter-question-${index}`,
    source: 'Recruiter Questions',
    title: question,
    text: question,
    tags: ['recruiter', 'faq', 'question'],
  })),
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
  profileHighlights,
  backendExpertise,
  cloudExperience,
  aiSkills: ['scikit-learn', 'LLM integration', 'applied intelligent systems'],
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
  githubSummary,
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
  recruiterQuestions,
  whyHireMeSummary,
  portfolioKnowledgeContext,
  documents: knowledgeDocuments,
};

export const buildPortfolioKnowledgeContext = () => portfolioKnowledgeContext;

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

      if (normalizedQuery.includes('backend') && document.text.toLowerCase().includes('backend')) {
        score += 4;
      }

      if (normalizedQuery.includes('api') && document.text.toLowerCase().includes('api')) {
        score += 4;
      }

      if (normalizedQuery.includes('intern') && document.text.toLowerCase().includes('intern')) {
        score += 3;
      }

      if (normalizedQuery.includes('hire') && document.text.toLowerCase().includes('hire')) {
        score += 4;
      }

      if (normalizedQuery.includes('resume') && document.tags.includes('resume')) {
        score += 4;
      }

      if (normalizedQuery.includes('github') && document.text.toLowerCase().includes('github')) {
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
    portfolioKnowledgeContext,
  };
};

export const buildAssistantSystemPrompt = (ragContext) => `You are BharathiGPT, a recruiter-friendly assistant for Bharathi's portfolio.
Answer only from the provided portfolio context.
Use the supplied knowledge to infer reasonable answers to recruiter-style and conversational questions about Bharathi.
Do not hallucinate or use external knowledge.
If the portfolio does not contain the answer, say it is not available in Bharathi's portfolio.
Keep answers concise, factual, professional, and conversational.
Prefer grounded summaries over keyword matching.
If multiple snippets point to the same conclusion, state that conclusion plainly.
If the user asks about a project, summarize the most relevant project(s) from the context.
If the user asks for a direct fact like CGPA, answer with the exact value from the portfolio.
If the user asks about Bharathi's background, education, backend expertise, cloud skills, AI skills, internships, projects, certifications, achievements, GitHub, contact, or why hire me, answer only from the portfolio context.

Recent matched context:
${ragContext.contextText || 'No matching context found.'}

Full portfolio knowledge:
${ragContext.portfolioKnowledgeContext || portfolioKnowledgeContext}`;

export const answerDirectFact = (query) => {
  const normalizedQuery = normalizeText(query);

  if (normalizedQuery.includes('cgpa')) {
    return `Bharathi's CGPA is ${directFacts.cgpa}.`;
  }

  if (normalizedQuery.includes('study') || normalizedQuery.includes('studies') || normalizedQuery.includes('department') || normalizedQuery.includes('branch') || normalizedQuery.includes('what does bharathi study')) {
    return `Bharathi studies ${directFacts.degree} at ${directFacts.college}. His department is ${directFacts.department}.`;
  }

  if (normalizedQuery.includes('degree') || normalizedQuery.includes('branch') || normalizedQuery.includes('engineering')) {
    return `Bharathi is pursuing ${directFacts.degree} at ${directFacts.college}.`;
  }

  if (normalizedQuery.includes('batch') || normalizedQuery.includes('year')) {
    return `Bharathi's batch is ${directFacts.batch}.`;
  }

  if (normalizedQuery.includes('latest repo') || normalizedQuery.includes('latest repository') || normalizedQuery.includes('latest project')) {
    return `The latest repository shown in the portfolio is ${directFacts.latestRepo}.`;
  }

  if (normalizedQuery.includes('top languages') || normalizedQuery.includes('main languages') || normalizedQuery.includes('languages')) {
    return `Bharathi's top languages in the portfolio are ${directFacts.topLanguages.join(', ')}.`;
  }

  if (normalizedQuery.includes('name')) {
    return `Bharathi's name is ${directFacts.name}.`;
  }

  if (normalizedQuery.includes('role') || normalizedQuery.includes('title')) {
    return `Bharathi describes himself as a ${directFacts.title}.`;
  }

  if (normalizedQuery.includes('email') || normalizedQuery.includes('contact')) {
    return `Bharathi's contact email is ${directFacts.email}.`;
  }

  if (normalizedQuery.includes('available') || normalizedQuery.includes('opportunit') || normalizedQuery.includes('open to')) {
    return directFacts.availability;
  }

  if (normalizedQuery.includes('current interest') || normalizedQuery.includes('interest') || normalizedQuery.includes('focus')) {
    return `Bharathi's current interest is ${directFacts.currentInterest}.`;
  }

  if (normalizedQuery.includes('research') || normalizedQuery.includes('publication')) {
    return 'Bharathi shows research and publication work through the IEEE-linked research writing section, ACDOF research prototype, and research-oriented portfolio documentation on multi-cloud orchestration, adaptive control loops, and carbon-aware decisioning.';
  }

  if (normalizedQuery.includes('certif')) {
    return `Certifications: ${directFacts.certificationsSummary}`;
  }

  if (normalizedQuery.includes('achiev')) {
    return `Achievements: ${directFacts.achievementsSummary}`;
  }

  if (normalizedQuery.includes('github')) {
    return directFacts.githubSummary;
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

  if (normalizedQuery.includes('convers') || normalizedQuery.includes('tell me about') || normalizedQuery.includes('focus')) {
    const summary = [
      profileSummary,
      whyHireMeSummary,
      `Backend: ${backendExpertise[0]}`,
      `Cloud: ${cloudExperience[0]}`,
    ].join(' ');

    return compact(summary);
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
