import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'API Reliability Lab (Production SaaS Platform)',
    description: 'Built a full-stack SaaS platform to simulate API failures (latency, rate limits, timeouts) and analyze backend reliability. Implemented real-time streaming using SSE to deliver live latency metrics and simulation logs. Optimized performance with Redis caching and PostgreSQL indexing, and designed secure multi-tenant architecture.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Redis', 'Docker', 'CI/CD'],
    github: 'https://github.com/BharathiSen/ARP-cgpt',
    demo: 'https://arp-cgpt.vercel.app/',
    date: 'Feb 2026'
  },
  {
    title: 'ACDOF: Adaptive Cloud DevOps Orchestration Framework',
    description: 'Research prototype for carbon-aware, cost-aware multi-cloud decisioning with predictive workload forecasting, multi-objective region scoring, closed-loop adaptation, and cross-cloud failover simulation.',
    tech: ['Python', 'Multi-Cloud', 'Carbon-Aware Scheduling', 'Control Loop', 'Kubernetes', 'KEDA'],
    github: 'https://github.com/BharathiSen/ACDOF',
    demo: '#',
    date: 'Apr 2026'
  },
  {
    title: 'Carbon Aware Serverless Scheduler',
    description: 'Built a multi-cloud scheduler using ElectricityMap API to optimize workloads based on real-time carbon intensity, significantly reducing estimated carbon emissions. Designed serverless architecture on Google Cloud with automated CI/CD and monitoring.',
    tech: ['Google Cloud', 'Cloud Run', 'Cloud Functions', 'Firestore', 'Python', 'Docker', 'CI/CD'],
    github: 'https://github.com/BharathiSen/cass',
    demo: '#',
    date: 'Oct 2025'
  },
  {
    title: 'VectorShift Studio',
    description: 'High-fidelity pipeline editor using ReactFlow + FastAPI with DAG validation, custom nodes, and interactive canvas tooling for production-style workflow composition.',
    tech: ['ReactFlow', 'React', 'FastAPI', 'Python', 'Zustand', 'DAG Validation'],
    github: 'https://github.com/BharathiSen/vector-shift',
    demo: 'https://vector-shift-frontend-theta.vercel.app/',
    date: 'May 2026'
  },
  {
    title: 'TaskFlow: Multi-Tenant Backend',
    description: 'Designed a multi-tenant backend with secure JWT-based authentication, RBAC, and data isolation. Built scalable REST APIs using FastAPI and PostgreSQL and optimized read performance with Redis caching.',
    tech: ['FastAPI', 'PostgreSQL', 'Redis', 'JWT'],
    github: 'https://github.com/BharathiSen/Taskflow',
    demo: '#',
    date: 'Mar 2025'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0, 210, 255, 0.02), transparent)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span style={{ background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Projects</span>
          </h2>
        </motion.div>

        <div className="projects-slider" role="region" aria-label="Projects slider">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="projects-slide"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-panel project-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 'clamp(1rem, 2.5vw, 2rem)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', opacity: 0, transition: 'opacity 0.3s ease' }} className="card-highlight" />
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {project.tech.map(tech => (
                    <span key={tech} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 210, 255, 0.1)', borderRadius: '20px', color: '#00d2ff' }}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-card-actions" style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <a href={project.github} className="btn btn-outline" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: '1 1 160px', justifyContent: 'center' }}>
                    <FaGithub size={16} /> GitHub
                  </a>
                  {project.demo !== '#' ? (
                    <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: '1 1 160px', justifyContent: 'center' }}>
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  ) : (
                    <a href={project.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: '1 1 160px', justifyContent: 'center' }}>
                      <ExternalLink size={16} /> Research Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <style>{`
          .projects-slider {
            display: flex;
            gap: 1.25rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            padding: 0.25rem 0.25rem 0.75rem;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .projects-slider::-webkit-scrollbar {
            display: none;
          }
          .projects-slide {
            flex: 0 0 clamp(300px, 74vw, 420px);
            scroll-snap-align: start;
          }
          .project-card {
            min-height: 100%;
          }
          .glass-panel:hover {
            border-color: rgba(0, 210, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 210, 255, 0.1);
          }
          @media (max-width: 560px) {
            .projects-slide {
              flex-basis: 88vw;
            }
            .project-card-actions {
              flex-direction: column;
            }
            .project-card-actions .btn {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Projects;
