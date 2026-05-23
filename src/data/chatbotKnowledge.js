import { portfolioData } from './portfolioData';

const supportedIntentPhrases = {
  'resume summary': ['resume summary', 'about you', 'introduce yourself', 'summary'],
  projects: ['projects', 'show projects', 'project', 'fastapi projects', 'best project'],
  'backend skills': ['backend skills', 'backend', 'api', 'fastapi', 'postgresql', 'redis'],
  'cloud experience': ['cloud experience', 'cloud', 'devops', 'docker', 'kubernetes', 'gcp'],
  internships: ['internships', 'experience', 'internship'],
  certifications: ['certifications', 'certificate', 'certified'],
  contact: ['contact', 'email', 'linkedin', 'github', 'reach out'],
  'best project': ['best project', 'top project', 'highlight project', 'favorite project'],
  'why hire me': ['why hire me', 'why should we hire you', 'hire me', 'strengths'],
};

const normalizeText = (value) => value.toLowerCase().replace(/[^a-z0-9\s+]/g, ' ');

const compact = (value) => value.replace(/\s+/g, ' ').trim();

const splitKeywords = (query) => normalizeText(query).split(/\s+/).filter(Boolean);

const buildProjectSearchText = (project) =>
  normalizeText([project.title, project.description, ...(project.tech || [])].join(' '));

const formatProjectLine = (project) => `${project.title} — ${project.description}`;

export const assistantPromptChips = [
  { label: 'Resume Summary', query: 'resume summary' },
  { label: 'Best Project', query: 'best project' },
  { label: 'Backend Skills', query: 'backend skills' },
  { label: 'Cloud Experience', query: 'cloud experience' },
  { label: 'Contact', query: 'contact' },
  { label: 'Why Hire Me', query: 'why hire me' },
];

export const getAssistantResponse = (query) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return 'Ask me about resume summary, projects, backend skills, cloud experience, internships, certifications, contact, best project, or why hire me.';
  }

  const matchedIntent = Object.entries(supportedIntentPhrases).find(([, keywords]) =>
    keywords.some((keyword) => normalizedQuery.includes(keyword))
  );

  const keywordSet = splitKeywords(query);
  const projectMatches = portfolioData.projects.filter((project) => {
    const projectSearchText = buildProjectSearchText(project);
    return keywordSet.some((keyword) => keyword.length > 2 && projectSearchText.includes(keyword));
  });

  if (projectMatches.length > 0 && normalizedQuery.includes('project')) {
    const lines = projectMatches.slice(0, 3).map((project) => formatProjectLine(project));
    return `I found these matching projects from the portfolio:\n${lines.map((line) => `- ${line}`).join('\n')}`;
  }

  if (normalizedQuery.includes('fastapi') && projectMatches.length > 0) {
    const lines = projectMatches.slice(0, 3).map((project) => formatProjectLine(project));
    return `FastAPI appears in these portfolio projects:\n${lines.map((line) => `- ${line}`).join('\n')}`;
  }

  switch (matchedIntent?.[0]) {
    case 'resume summary':
      return compact(`${portfolioData.hero.summary} ${chatbotKnowledge.profileSummary}`);
    case 'projects': {
      const featuredProjects = portfolioData.projects.slice(0, 3).map((project) => formatProjectLine(project));
      return `Key portfolio projects:\n${featuredProjects.map((line) => `- ${line}`).join('\n')}`;
    }
    case 'backend skills':
      return `Backend skills: ${chatbotKnowledge.backendExpertise.join('; ')}.`;
    case 'cloud experience':
      return `Cloud experience: ${chatbotKnowledge.cloudExperience.join('; ')}.`;
    case 'internships': {
      const internshipLines = chatbotKnowledge.internships.map((item) => `${item.role} (${item.period}) — ${item.summary}`);
      return `Internships:\n${internshipLines.map((line) => `- ${line}`).join('\n')}`;
    }
    case 'certifications':
      return portfolioData.certifications.length > 0
        ? `Certifications: ${portfolioData.certifications.join('; ')}.`
        : 'No certifications are listed in the portfolio yet.';
    case 'contact':
      return compact(`You can reach Bharathi at ${portfolioData.contact.email}. GitHub: ${portfolioData.socialLinks.github.href}. LinkedIn: ${portfolioData.socialLinks.linkedin.href}.`);
    case 'best project':
      return `Best project: ${portfolioData.projects[0].title} — ${portfolioData.projects[0].description}`;
    case 'why hire me':
      return chatbotKnowledge.whyHireMeSummary;
    default:
      break;
  }

  if (normalizedQuery.includes('contact') || normalizedQuery.includes('email') || normalizedQuery.includes('linkedin') || normalizedQuery.includes('github')) {
    return compact(`You can reach Bharathi at ${portfolioData.contact.email}. GitHub: ${portfolioData.socialLinks.github.href}. LinkedIn: ${portfolioData.socialLinks.linkedin.href}.`);
  }

  if (normalizedQuery.includes('certif')) {
    return portfolioData.certifications.length > 0
      ? `Certifications: ${portfolioData.certifications.join('; ')}.`
      : 'No certifications are listed in the portfolio yet.';
  }

  return 'I can answer from the portfolio about resume summary, projects, backend skills, cloud experience, internships, certifications, contact, best project, and why hire me.';
};

export const chatbotKnowledge = {
  profileSummary: 'Bharathi is a backend-focused software engineer and ECE student at Chennai Institute of Technology with experience in cloud systems, research-driven orchestration, and full-stack backend platforms.',
  backendExpertise: [
    'FastAPI, REST APIs, JWT authentication, RBAC, tenant-aware architecture',
    'Redis caching, PostgreSQL indexing, multi-tenant data isolation',
    'Failure simulation, streaming updates, and orchestration control loops',
  ],
  cloudExperience: [
    'Google Cloud, Cloud Run, Cloud Functions, Firestore',
    'Docker, Kubernetes, KEDA, CI/CD workflows',
    'Serverless and multi-cloud decisioning for carbon-aware systems',
  ],
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
  FAQs: [
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
  whyHireMeSummary: 'Bharathi combines backend engineering, cloud awareness, and research discipline. The portfolio shows practical full-stack delivery, multi-cloud reasoning, and a consistent focus on building reliable systems with reproducible workflows.',
};
