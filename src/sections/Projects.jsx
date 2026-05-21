import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'API Reliability Lab (Production SaaS Platform)',
    description: 'Built a full-stack SaaS platform to simulate API failures (latency, rate limits, timeouts) and analyze backend reliability. Implemented real-time streaming using SSE to deliver live latency metrics and simulation logs. Optimized performance with Redis caching and PostgreSQL indexing, and designed secure multi-tenant architecture.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Redis', 'Docker', 'CI/CD'],
    github: '#',
    demo: '#',
    date: 'Feb 2026'
  },
  {
    title: 'Carbon Aware Serverless Scheduler',
    description: 'Built a multi-cloud scheduler using ElectricityMap API to optimize workloads based on real-time carbon intensity, significantly reducing estimated carbon emissions. Designed serverless architecture on Google Cloud with automated CI/CD and monitoring.',
    tech: ['Google Cloud', 'Cloud Run', 'Cloud Functions', 'Firestore', 'Python', 'Docker', 'CI/CD'],
    github: '#',
    demo: '#',
    date: 'Oct 2025'
  },
  {
    title: 'TaskFlow: Multi-Tenant Backend',
    description: 'Designed a multi-tenant backend with secure JWT-based authentication, RBAC, and data isolation. Built scalable REST APIs using FastAPI and PostgreSQL and optimized read performance with Redis caching.',
    tech: ['FastAPI', 'PostgreSQL', 'Redis', 'JWT'],
    github: '#',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
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
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  <a href={project.github} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>
                    <FaGithub size={16} /> GitHub
                  </a>
                  <a href={project.demo} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>

                <style>{`
                  .glass-panel:hover { border-color: rgba(0, 210, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 210, 255, 0.1); }
                `}</style>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
