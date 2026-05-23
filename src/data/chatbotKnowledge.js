import { portfolioData } from './portfolioData';

const normalizeText = (value) => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

const tokenize = (value) => normalizeText(value).split(/\s+/).filter(Boolean);

const projectSearchText = (project) => normalizeText([project.title, project.description, ...(project.tech || [])].join(' '));

const formatProjectLine = (project) => `${project.title} — ${project.description}`;

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

export const assistantPromptChips = [
  { label: 'Skills', query: 'skills' },
  { label: 'Projects', query: 'projects' },
  { label: 'Experience', query: 'experience' },
  { label: 'Contact', query: 'contact' },
  { label: 'Resume', query: 'resume' },
  { label: 'Why Hire Me', query: 'why hire me' },
];

export const resolveAssistantRequest = (query) => {
  const normalizedQuery = normalizeText(query);
  const queryTokens = tokenize(query);

  if (!normalizedQuery) {
    return {
      response: 'Ask me about skills, projects, experience, contact, resume, best project, backend skills, cloud experience, internships, certifications, or why hire me.',
      sectionId: null,
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  const matchedProjects = portfolioData.projects.filter((project) => {
    const searchText = projectSearchText(project);
    return queryTokens.some((token) => token.length > 2 && searchText.includes(token));
  });

  const projectTitles = matchedProjects.map((project) => project.title);
  const wantsGithubOpen = normalizedQuery.includes('open') && normalizedQuery.includes('github');

  if (normalizedQuery.includes('why hire me')) {
    return {
      response: `Why hire me: ${whyHireMeSummary}`,
      sectionId: null,
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  if (normalizedQuery.includes('best project')) {
    const bestProject = portfolioData.projects[0];
    return {
      response: `Best project: ${bestProject.title} — ${bestProject.description}`,
      sectionId: 'projects',
      highlightProjectTitles: [bestProject.title],
      openUrls: wantsGithubOpen ? [bestProject.github] : [],
    };
  }

  if (normalizedQuery.includes('backend skill') || normalizedQuery.includes('backend') || normalizedQuery.includes('fastapi') || normalizedQuery.includes('api')) {
    const backendProjects = matchedProjects.length > 0
      ? matchedProjects
      : portfolioData.projects.filter((project) => project.tech.some((tech) => /fastapi|python|postgresql|redis|jwt/i.test(tech)));

    return {
      response: backendProjects.length > 0
        ? `I found these backend projects.\n${backendProjects.slice(0, 3).map((project) => `- ${formatProjectLine(project)}`).join('\n')}`
        : `Backend skills: ${backendExpertise.join('; ')}.`,
      sectionId: 'projects',
      highlightProjectTitles: backendProjects.slice(0, 3).map((project) => project.title),
      openUrls: wantsGithubOpen ? backendProjects.slice(0, 2).map((project) => project.github) : [],
    };
  }

  if (normalizedQuery.includes('cloud experience') || normalizedQuery.includes('cloud') || normalizedQuery.includes('devops') || normalizedQuery.includes('docker') || normalizedQuery.includes('kubernetes')) {
    return {
      response: `Cloud experience: ${cloudExperience.join('; ')}.`,
      sectionId: 'skills',
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  if (normalizedQuery.includes('internship')) {
    const internshipLines = portfolioData.experience.map((item) => `${item.title} (${item.year}) — ${item.description}`);
    return {
      response: `Internships:\n${internshipLines.map((line) => `- ${line}`).join('\n')}`,
      sectionId: 'experience',
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  if (normalizedQuery.includes('certif')) {
    return {
      response: portfolioData.certifications.length > 0
        ? `Certifications: ${portfolioData.certifications.join('; ')}.`
        : 'No certifications are listed in the portfolio yet.',
      sectionId: null,
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  if (normalizedQuery.includes('resume')) {
    return {
      response: 'Opening the resume.',
      sectionId: null,
      highlightProjectTitles: [],
      openUrls: [portfolioData.hero.buttons.resume.href],
    };
  }

  if (normalizedQuery.includes('project') || matchedProjects.length > 0) {
    const projectList = matchedProjects.length > 0 ? matchedProjects.slice(0, 3) : portfolioData.projects.slice(0, 3);

    return {
      response: matchedProjects.length > 0
        ? `I found these matching projects.\n${projectList.map((project) => `- ${formatProjectLine(project)}`).join('\n')}`
        : `Featured projects:\n${projectList.map((project) => `- ${formatProjectLine(project)}`).join('\n')}`,
      sectionId: 'projects',
      highlightProjectTitles: projectList.map((project) => project.title),
      openUrls: wantsGithubOpen ? projectList.map((project) => project.github) : [],
    };
  }

  if (normalizedQuery.includes('skills')) {
    return {
      response: `Skills: ${portfolioData.skills.cards.map((card) => card.label).join(', ')}.`,
      sectionId: 'skills',
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  if (normalizedQuery.includes('experience')) {
    return {
      response: `Experience: ${portfolioData.experience.map((item) => `${item.title} (${item.year})`).join('; ')}.`,
      sectionId: 'experience',
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  if (normalizedQuery.includes('contact') || normalizedQuery.includes('email') || normalizedQuery.includes('linkedin') || normalizedQuery.includes('github')) {
    return {
      response: `Contact: ${portfolioData.contact.email}. GitHub: ${portfolioData.socialLinks.github.href}. LinkedIn: ${portfolioData.socialLinks.linkedin.href}.`,
      sectionId: 'contact',
      highlightProjectTitles: [],
      openUrls: [],
    };
  }

  return {
    response: 'I can answer from the portfolio about skills, projects, experience, contact, resume, best project, backend skills, cloud experience, internships, certifications, and why hire me.',
    sectionId: null,
    highlightProjectTitles: [],
    openUrls: [],
  };
};

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
  whyHireMeSummary,
};
