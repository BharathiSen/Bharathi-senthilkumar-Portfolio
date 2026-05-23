import { portfolioData } from './portfolioData';

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
