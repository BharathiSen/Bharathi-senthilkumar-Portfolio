import resumePdf from '../assets/Bharathi_Resume.pdf';
import shotCodeAtlas from '../assets/code-atlas.webp';
import shotOrchestra from '../assets/orchestra.webp';
import shotApiLab from '../assets/api-rel-lab.webp';

export const portfolioData = {
  hero: {
    greeting: 'Backend & AI systems',
    name: 'BHARATHI',
    title: 'Backend & AI Systems Engineer',
    summary:
      'I build retrieval and agent infrastructure that survives production — hybrid search, durable execution records, and APIs with the failure modes designed in rather than discovered later.',
    location: 'Chennai, India',
    availability: 'Open to 2027 roles',
    buttons: {
      primary: { label: 'View work', href: '#projects' },
      resume: {
        label: 'Résumé',
        href: resumePdf,
        download: 'Bharathi_Resume.pdf',
      },
      preview: { label: 'Preview', href: resumePdf },
    },
    // Mono metadata strip under the name
    stats: [
      { value: '1,600+', label: 'DSA problems solved' },
      { value: '3', label: 'Production systems shipped' },
      { value: '8.9', label: 'CGPA / 10' },
      { value: '1', label: 'IEEE publication' },
    ],
  },

  about: {
    title: { prefix: 'About', highlight: 'Me' },
    name: 'BHARATHI S',
    quickFacts: {
      cgpa: '8.9',
      college: 'Chennai Institute of Technology',
      degree: 'B.E. Electronics and Communication Engineering',
      department: 'Electronics and Communication Engineering',
      batch: '2023–2027',
      location: 'Chennai, India',
      currentInterest:
        'Agentic AI systems, retrieval infrastructure, and backend platform engineering',
    },
    image: { src: '/Profpic.jpeg', alt: 'Bharathi S' },
    paragraphs: [
      'I am a final-year B.E. Electronics and Communication Engineering student at Chennai Institute of Technology (2023–2027), graduating with a CGPA of 8.9.',
      'My work sits where backend engineering meets applied AI: hybrid retrieval pipelines, agentic execution with replayable run records, and the unglamorous parts that decide whether a system holds — quota ceilings, fallback paths, rate limiting, and evaluation harnesses that run in CI.',
      'I have shipped three production systems on FastAPI, Next.js, PostgreSQL and Redis, published a review of Cloud–DevOps orchestration at IEEE ICSSS 2025, and solved over 1,600 data structures and algorithms problems along the way.',
    ],
  },

  skills: {
    // Skill matrix — mirrors the résumé's own grouping
    groups: [
      {
        id: 'languages',
        label: 'Languages',
        items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C'],
      },
      {
        id: 'fundamentals',
        label: 'CS Fundamentals',
        items: [
          'Data Structures & Algorithms',
          'Object-Oriented Programming',
          'DBMS',
          'Operating Systems',
          'Computer Networks',
          'System Design',
        ],
      },
      {
        id: 'backend',
        label: 'Backend',
        items: ['FastAPI', 'Next.js API routes', 'REST design', 'RBAC / JWT', 'SSE streaming'],
      },
      {
        id: 'ai',
        label: 'AI / ML & Retrieval',
        items: [
          'Agentic AI',
          'RAG pipelines',
          'Hybrid retrieval (dense + keyword, RRF)',
          'tree-sitter AST chunking',
          'LangGraph',
          'OpenAI / Gemini APIs',
        ],
      },
      {
        id: 'data',
        label: 'Data & Infra',
        items: ['PostgreSQL', 'pgvector', 'Redis', 'Qdrant', 'Prisma', 'Docker'],
      },
      {
        id: 'cloud',
        label: 'Cloud & DevOps',
        items: [
          'GCP (Cloud Run, Firestore)',
          'Cloudflare Workers',
          'Vercel',
          'GitHub Actions CI/CD',
        ],
      },
      {
        id: 'frontend',
        label: 'Frontend',
        items: ['Next.js 15', 'React', 'Tailwind CSS'],
      },
    ],
  },

  projects: [
    {
      id: 'codeatlas',
      shot: { src: shotCodeAtlas, alt: 'CodeAtlas landing page: an input for a GitHub repository URL above example repositories to map.' },
      index: '01',
      title: 'CodeAtlas',
      tagline: 'AI code intelligence that reasons over an entire repository',
      year: '2026',
      description:
        'A code-intelligence system that answers questions about a whole GitHub repository rather than a single pasted file. It parses source with tree-sitter into whole-function chunks across 15 languages and answers with cited file and line references.',
      highlights: [
        'Parses code with tree-sitter into whole-function chunks across 15 languages, answering with cited file/line references.',
        'Hybrid retrieval fusing dense vector search and keyword match via Reciprocal Rank Fusion.',
        'SHA-based incremental indexing cut re-index time from 7.9s to 0.4s on unchanged repositories.',
        'Fail-closed Redis quota bounds API spend; automatic fallback to whole-repository context on vector-store failure.',
        'Labelled recall@k / MRR evaluation harness running in CI.',
      ],
      metrics: [
        { value: '0.4s', label: 'Re-index, from 7.9s' },
        { value: '15', label: 'Languages parsed' },
        { value: 'RRF', label: 'Hybrid retrieval' },
      ],
      tech: ['Next.js', 'FastAPI', 'Redis', 'Qdrant', 'Tree-sitter'],
      tags: ['Agentic AI', 'Retrieval', 'Backend'],
      github: 'https://github.com/BharathiSen/codeatlas',
      demo: 'https://codeatlas-web.onrender.com/',
      architecture: {
        architectureFlow:
          'GitHub repo → tree-sitter AST parse → whole-function chunking → embedding + keyword index → Reciprocal Rank Fusion → cited answer with file/line references.',
        backendFlow:
          'FastAPI orchestrates parsing, chunking and retrieval. SHA comparison per file skips unchanged content on re-index. A fail-closed Redis quota gates every model call so spend cannot run away.',
        databaseInteractions:
          'Qdrant holds dense vectors for semantic search; Redis stores per-file SHA state and the quota ledger. On vector-store failure the system falls back to whole-repository context rather than returning nothing.',
        deploymentNotes:
          'Next.js frontend and FastAPI backend deploy independently. A labelled recall@k and MRR harness runs in CI so retrieval quality regressions surface before merge.',
      },
    },
    {
      id: 'orchestra',
      shot: { src: shotOrchestra, alt: 'Orchestra interface showing an agent run with its per-step execution record.' },
      index: '02',
      title: 'Orchestra',
      tagline: 'Agentic AI platform where every run is a replayable record',
      year: '2026',
      description:
        'An agentic AI platform built around durability: every run is a replayable execution record carrying per-step cost and latency. It spans three pipelines — direct chat, tool-augmented reasoning via LangGraph, and multi-agent orchestration.',
      highlights: [
        'Every run is a durable, replayable execution record with per-step cost and latency.',
        'Three pipelines: direct chat, tool-augmented (planner → tool → reviewer → answer via LangGraph), and multi-agent orchestration.',
        'End-to-end RAG pipeline — upload → chunk → embed → pgvector — with a sources UI.',
        'Two-tier memory: Redis short-term and PostgreSQL long-term, persisting across conversations.',
        'JWT auth, three-axis rate limiting and SSE streaming throughout.',
      ],
      metrics: [
        { value: '0.4–0.9s', label: 'Direct chat latency' },
        { value: '2.3s', label: 'Warm RAG retrieval' },
        { value: '3', label: 'Execution pipelines' },
      ],
      tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'LangGraph'],
      tags: ['Agentic AI', 'Retrieval', 'Backend', 'Cloud'],
      github: 'https://github.com/BharathiSen/Orchestra',
      demo: 'https://orchestra.bharathis-ece2023.workers.dev/',
      architecture: {
        architectureFlow:
          'Request → pipeline selector (direct / tool-augmented / multi-agent) → LangGraph planner-tool-reviewer loop → SSE stream to client, with every step written to a durable run record.',
        backendFlow:
          'FastAPI handles JWT auth and three-axis rate limiting before dispatch. Each step appends to the run log with its own cost and latency, which makes any run replayable after the fact.',
        databaseInteractions:
          'PostgreSQL with pgvector stores embeddings and long-term memory; Redis carries short-term conversational memory. Retrieved chunks surface in a sources UI so answers stay attributable.',
        deploymentNotes:
          'Deployed on Cloudflare Workers with a FastAPI backend. Warm RAG retrieval lands at 2.3s; direct chat at 0.4–0.9s.',
      },
    },
    {
      id: 'api-reliability-lab',
      shot: { src: shotApiLab, alt: 'API Reliability Lab dashboard showing a load-test run with latency percentiles.' },
      index: '03',
      title: 'API Reliability Lab',
      tagline: 'Full-stack SaaS that load-tests public APIs and scores their risk',
      year: '2026',
      description:
        'A production SaaS that load-tests public APIs with 1–20 concurrent requests, streams live progress over SSE, and computes p50/p95 latency and error rate per run — then explains the result.',
      highlights: [
        'Load-tests public APIs with 1–20 concurrent requests, streaming live progress over SSE.',
        'Computes p50 / p95 latency and error rate per run.',
        'AI-powered reliability insights and risk scores via OpenAI with Zod-validated structured outputs.',
        'Falls back to a heuristic engine when no LLM key is present.',
        'SSRF-safe validation, SHA-256-hashed API keys and tiered rate limiting.',
      ],
      metrics: [
        { value: 'p50/p95', label: 'Latency per run' },
        { value: '22', label: 'Vitest unit tests' },
        { value: '5', label: 'Playwright e2e tests' },
      ],
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Redis', 'OpenAI'],
      tags: ['SaaS', 'Backend', 'Cloud'],
      github: 'https://github.com/BharathiSen/ARP-cgpt',
      demo: 'https://arp-cgpt.vercel.app/',
      architecture: {
        architectureFlow:
          'Target URL → SSRF-safe validation → concurrent request runner (1–20) → live SSE progress → p50/p95 + error-rate aggregation → AI risk score.',
        backendFlow:
          'Next.js API routes drive the run loop and stream progress. Reliability insights come from OpenAI with Zod-validated structured outputs, and a heuristic engine takes over when no LLM key is configured.',
        databaseInteractions:
          'PostgreSQL via Prisma persists runs and per-run metrics; Redis backs tiered rate limiting. API keys are stored SHA-256 hashed, never in plaintext.',
        deploymentNotes:
          'Deployed on Vercel. 22 Vitest unit tests and 5 Playwright end-to-end tests run in CI on every push.',
      },
    },
  ],

  publications: [
    {
      title:
        'A Literature Review on Cloud–DevOps Synergy for Scalable and Reliable Machine Learning Lifecycle Management',
      venue: 'IEEE ICSSS 2025',
      year: '2025',
      href: 'https://ieeexplore.ieee.org/document/11346190',
      description:
        'Proposed the Adaptive Cloud-DevOps Orchestration Framework (ACDOF), reviewing MLOps, Cloud and DevOps architectures to identify scalability, reliability and sustainability gaps in production ML systems.',
    },
  ],

  writing: [
    {
      title: 'Medium',
      subtitle: 'Engineering notes and build write-ups.',
      description:
        'Short-form posts on retrieval design, agent execution models, and the decisions behind the systems above — written while building them rather than after the fact.',
      href: 'https://medium.com/@bharathisenthilkumar28',
      cta: 'Read on Medium',
    },
    {
      title: 'GitHub',
      subtitle: 'Source for everything listed here.',
      description:
        'Every project above is public: the tree-sitter chunking, the Reciprocal Rank Fusion retrieval, the LangGraph pipelines, and the evaluation harnesses that run in CI.',
      href: 'https://github.com/BharathiSen/',
      cta: 'Browse repositories',
    },
  ],

  experience: [
    {
      year: 'Nov 2024',
      role: 'Software Development Intern',
      org: 'India Meteorological Department',
      unit: 'Doppler Weather Radar',
      title: 'Software Development Intern — India Meteorological Department (Doppler Weather Radar)',
      description:
        'Built a Python-based terrain-aware radar propagation system for Doppler weather radar site evaluation, processing JAXA DEM/DSM geospatial datasets (GeoTIFF) with GDAL, Rasterio and GeoPandas. Implemented beam-blockage analysis using wradlib and visualised radar coverage and terrain effects in QGIS to assess site suitability for radar installation.',
      highlights: [
        'Terrain-aware radar propagation system processing JAXA DEM/DSM GeoTIFF datasets with GDAL, Rasterio and GeoPandas.',
        'Beam-blockage analysis with wradlib, visualised in QGIS to assess radar site suitability.',
      ],
      stack: ['Python', 'GDAL', 'Rasterio', 'GeoPandas', 'wradlib', 'QGIS'],
    },
    {
      year: 'Aug 2024',
      role: 'Machine Learning Intern',
      org: 'Cognifyz Technologies',
      unit: '',
      title: 'Machine Learning Intern — Cognifyz Technologies',
      description:
        'Built and shipped end-to-end ML pipelines for prediction, clustering and recommendation systems, applying feature engineering and hyperparameter tuning with scikit-learn. Designed data visualisation and model interpretability dashboards to communicate AI/ML outputs to non-technical stakeholders, and applied anomaly detection on structured datasets.',
      highlights: [
        'End-to-end ML pipelines for prediction, clustering and recommendation, with feature engineering and hyperparameter tuning in scikit-learn.',
        'Interpretability dashboards translating model output for non-technical stakeholders; anomaly detection on structured data.',
      ],
      stack: ['Python', 'scikit-learn', 'Pandas'],
    },
  ],

  education: {
    school: 'Chennai Institute of Technology',
    location: 'Chennai, India',
    degree: 'B.E. Electronics and Communication Engineering',
    cgpa: '8.9/10',
    period: '2023 – 2027',
  },

  certifications: [
    'Google Cloud Certified: Cloud Digital Leader',
    'Google Cloud Learning Paths: Cloud Engineering & Generative AI',
    'SQL Programming (SkillRack, Coursera)',
    'CISCO: Programming in C, Networking & Cybersecurity Fundamentals',
  ],

  problemSolving: {
    total: '1,600+',
    summary: 'Data Structures & Algorithms problems solved',
    platforms: [
      { name: 'SkillRack', count: 745, href: 'https://www.skillrack.com/' },
      { name: 'CodeChef', count: 568, href: 'https://www.codechef.com/' },
      { name: 'LeetCode', count: 331, href: 'https://leetcode.com/' },
    ],
  },

  achievements: [
    'Solved 1,600+ Data Structures & Algorithms problems across LeetCode (331), CodeChef (568) and SkillRack (745).',
    'Published at IEEE ICSSS 2025 on Cloud–DevOps synergy for ML lifecycle management.',
  ],

  knowledgeGraph: {
    nodes: [
      {
        id: 'education-cit',
        type: 'education',
        label: 'Chennai Institute of Technology',
        summary: 'B.E. Electronics and Communication Engineering, 2023-2027, CGPA 8.9/10, Chennai, India.',
        aliases: ['CIT', 'ECE', 'college', 'education', 'degree', 'university'],
      },
      {
        id: 'skill-fastapi',
        type: 'skill',
        label: 'FastAPI',
        summary: 'Primary backend framework across CodeAtlas, Orchestra and earlier API work; REST design, RBAC/JWT, SSE streaming.',
        aliases: ['backend', 'api', 'rest', 'fastapi'],
      },
      {
        id: 'skill-nextjs',
        type: 'skill',
        label: 'Next.js',
        summary: 'Next.js 15 with React and Tailwind CSS; also used for API routes in API Reliability Lab.',
        aliases: ['nextjs', 'next.js', 'frontend', 'react', 'tailwind'],
      },
      {
        id: 'skill-postgresql',
        type: 'skill',
        label: 'PostgreSQL',
        summary: 'Durable storage with pgvector for embeddings and long-term agent memory; Prisma as ORM in API Reliability Lab.',
        aliases: ['database', 'sql', 'postgres', 'postgresql', 'pgvector', 'prisma'],
      },
      {
        id: 'skill-redis',
        type: 'skill',
        label: 'Redis',
        summary: 'Fail-closed quota ledgers, short-term agent memory, tiered rate limiting and hot-path caching.',
        aliases: ['cache', 'redis', 'rate limiting', 'quota'],
      },
      {
        id: 'skill-retrieval',
        type: 'skill',
        label: 'Retrieval & RAG',
        summary: 'Hybrid retrieval fusing dense vector search with keyword match via Reciprocal Rank Fusion; tree-sitter AST chunking; recall@k and MRR evaluation harnesses in CI.',
        aliases: ['rag', 'retrieval', 'vector search', 'embeddings', 'rrf', 'qdrant', 'hybrid search'],
      },
      {
        id: 'skill-agentic',
        type: 'skill',
        label: 'Agentic AI',
        summary: 'LangGraph planner-tool-reviewer loops, multi-agent orchestration, and durable replayable run records with per-step cost and latency.',
        aliases: ['agentic ai', 'agents', 'langgraph', 'multi-agent', 'orchestration'],
      },
      {
        id: 'skill-cloud',
        type: 'skill',
        label: 'Cloud & DevOps',
        summary: 'GCP Cloud Run and Firestore, Cloudflare Workers, Vercel, Docker, and GitHub Actions CI/CD.',
        aliases: ['gcp', 'google cloud', 'cloudflare', 'vercel', 'docker', 'ci/cd', 'devops', 'cloud'],
      },
      {
        id: 'project-codeatlas',
        type: 'project',
        label: 'CodeAtlas',
        summary: 'AI code-intelligence system reasoning over whole GitHub repositories. Tree-sitter chunking across 15 languages, hybrid retrieval via RRF, and SHA-based incremental indexing that cut re-index time from 7.9s to 0.4s.',
        aliases: ['codeatlas', 'code atlas', 'code intelligence', 'code search'],
      },
      {
        id: 'project-orchestra',
        type: 'project',
        label: 'Orchestra',
        summary: 'Agentic AI platform where every run is a durable replayable execution record with per-step cost and latency. Three pipelines, end-to-end RAG on pgvector, two-tier memory, 0.4-0.9s direct chat and 2.3s warm RAG retrieval.',
        aliases: ['orchestra', 'agent platform', 'agentic platform'],
      },
      {
        id: 'project-api-reliability-lab',
        type: 'project',
        label: 'API Reliability Lab',
        summary: 'Full-stack SaaS that load-tests public APIs with 1-20 concurrent requests, streams progress over SSE, computes p50/p95 latency, and generates AI risk scores. 22 Vitest and 5 Playwright tests in CI.',
        aliases: ['api reliability lab', 'reliability lab', 'saas', 'load testing'],
      },
      {
        id: 'publication-acdof',
        type: 'publication',
        label: 'IEEE ICSSS 2025 — ACDOF',
        summary: 'A Literature Review on Cloud-DevOps Synergy for Scalable and Reliable Machine Learning Lifecycle Management. Proposed the Adaptive Cloud-DevOps Orchestration Framework (ACDOF).',
        aliases: ['acdof', 'ieee', 'publication', 'research', 'paper', 'icsss'],
      },
      {
        id: 'experience-imd',
        type: 'experience',
        label: 'India Meteorological Department',
        summary: 'Software Development Intern, Nov 2024. Terrain-aware radar propagation for Doppler weather radar siting using JAXA DEM/DSM GeoTIFF data with GDAL, Rasterio, GeoPandas, wradlib and QGIS.',
        aliases: ['imd', 'doppler weather radar', 'weather radar', 'internship', 'meteorological'],
      },
      {
        id: 'experience-cognifyz',
        type: 'experience',
        label: 'Cognifyz Technologies',
        summary: 'Machine Learning Intern, Aug 2024. End-to-end ML pipelines for prediction, clustering and recommendation with scikit-learn, plus interpretability dashboards and anomaly detection.',
        aliases: ['cognifyz', 'ml internship', 'machine learning internship'],
      },
      {
        id: 'theme-backend-systems',
        type: 'theme',
        label: 'Backend systems',
        summary: 'FastAPI, REST design, RBAC/JWT, SSE streaming, rate limiting, and reliability engineering with fallbacks and quotas designed in.',
        aliases: ['backend systems', 'api engineering', 'systems'],
      },
      {
        id: 'theme-credentials',
        type: 'theme',
        label: 'Certifications',
        summary: 'Google Cloud Certified: Cloud Digital Leader; Google Cloud Learning Paths in Cloud Engineering and Generative AI; SQL Programming (SkillRack, Coursera); CISCO Programming in C, Networking and Cybersecurity Fundamentals.',
        aliases: ['certifications', 'credentials', 'certificates', 'google cloud certified'],
      },
      {
        id: 'theme-problem-solving',
        type: 'theme',
        label: 'Problem solving',
        summary: 'Over 1,600 Data Structures and Algorithms problems solved: SkillRack 745, CodeChef 568, LeetCode 331.',
        aliases: ['dsa', 'leetcode', 'codechef', 'skillrack', 'problem solving', 'competitive programming'],
      },
    ],
    edges: [
      { from: 'skill-fastapi', to: 'project-codeatlas', relation: 'powers', weight: 5 },
      { from: 'skill-fastapi', to: 'project-orchestra', relation: 'powers', weight: 5 },
      { from: 'skill-nextjs', to: 'project-api-reliability-lab', relation: 'powers', weight: 5 },
      { from: 'skill-nextjs', to: 'project-codeatlas', relation: 'supports', weight: 3 },
      { from: 'skill-nextjs', to: 'project-orchestra', relation: 'supports', weight: 3 },
      { from: 'skill-retrieval', to: 'project-codeatlas', relation: 'powers', weight: 5 },
      { from: 'skill-retrieval', to: 'project-orchestra', relation: 'powers', weight: 4 },
      { from: 'skill-agentic', to: 'project-orchestra', relation: 'powers', weight: 5 },
      { from: 'skill-postgresql', to: 'project-orchestra', relation: 'supports', weight: 5 },
      { from: 'skill-postgresql', to: 'project-api-reliability-lab', relation: 'supports', weight: 4 },
      { from: 'skill-redis', to: 'project-codeatlas', relation: 'bounds', weight: 4 },
      { from: 'skill-redis', to: 'project-orchestra', relation: 'accelerates', weight: 4 },
      { from: 'skill-redis', to: 'project-api-reliability-lab', relation: 'accelerates', weight: 3 },
      { from: 'skill-cloud', to: 'project-orchestra', relation: 'hosts', weight: 4 },
      { from: 'skill-cloud', to: 'project-api-reliability-lab', relation: 'hosts', weight: 3 },
      { from: 'project-codeatlas', to: 'theme-backend-systems', relation: 'demonstrates', weight: 5 },
      { from: 'project-orchestra', to: 'theme-backend-systems', relation: 'demonstrates', weight: 5 },
      { from: 'project-api-reliability-lab', to: 'theme-backend-systems', relation: 'demonstrates', weight: 5 },
      { from: 'publication-acdof', to: 'skill-cloud', relation: 'reviews', weight: 4 },
      { from: 'experience-imd', to: 'education-cit', relation: 'during', weight: 3 },
      { from: 'experience-cognifyz', to: 'education-cit', relation: 'during', weight: 3 },
      { from: 'theme-problem-solving', to: 'education-cit', relation: 'alongside', weight: 3 },
    ],
  },

  contact: {
    intro:
      'Open to backend and AI-systems roles from 2027, and to conversations about retrieval infrastructure, agent execution models, or anything above.',
    email: 'bharathisenthilkumar28@gmail.com',
    emailComposeUrl:
      'https://mail.google.com/mail/?view=cm&fs=1&to=bharathisenthilkumar28@gmail.com',
    phone: '+91 7010687647',
    location: 'Chennai, India',
    footer: 'Designed & built by Bharathi S',
  },

  socialLinks: {
    github: {
      href: 'https://github.com/BharathiSen/',
      ariaLabel: 'GitHub profile',
      title: 'GitHub',
      handle: 'github.com/BharathiSen',
    },
    linkedin: {
      href: 'https://www.linkedin.com/in/bharathisenthilkumar28/',
      ariaLabel: 'LinkedIn profile',
      title: 'LinkedIn',
      handle: 'linkedin.com/in/bharathisenthilkumar28',
    },
  },
};
