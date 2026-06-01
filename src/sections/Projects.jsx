import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const projects = portfolioData.projects;

  useEffect(() => {
    const handleAction = (event) => {
      const { action, payload } = event.detail || {};
      if (action === 'FILTER_PROJECTS' && payload) {
        setActiveFilter(payload);
        // Smooth scroll to projects
        const element = document.getElementById('projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('portfolio-action', handleAction);
    return () => window.removeEventListener('portfolio-action', handleAction);
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'FastAPI') return project.tech.includes('FastAPI');
    if (activeFilter === 'Serverless') return project.tech.includes('Google Cloud') || project.tech.includes('Cloud Run') || project.tech.includes('Cloud Functions') || project.tech.includes('Carbon-Aware Scheduling') || project.tech.includes('Multi-Cloud');
    if (activeFilter === 'SaaS') return project.title.toLowerCase().includes('saas') || project.title.toLowerCase().includes('lab') || project.tech.includes('Prisma') || project.tech.includes('NextAuth');
    if (activeFilter === 'GenAI') return project.tech.includes('Zustand') || project.tech.includes('DAG Validation') || project.title.toLowerCase().includes('shift') || project.title.toLowerCase().includes('lab');
    return true;
  });


  return (
    <section id="projects" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0, 210, 255, 0.02), transparent)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            Featured <span style={{ background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Projects</span>
          </h2>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          {['All', 'FastAPI', 'Serverless', 'SaaS', 'GenAI'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <div className="projects-slider" role="region" aria-label="Projects slider">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="projects-slide"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-panel project-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 'clamp(1rem, 2.5vw, 2rem)', position: 'relative', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {project.tech.map((tech) => (
                    <span key={tech} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(0, 210, 255, 0.1)', borderRadius: '20px', color: '#00d2ff' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card-actions" style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <a href={project.github} className="btn btn-outline" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: '1 1 160px', justifyContent: 'center' }}>
                    <FaGithub size={16} /> GitHub
                  </a>
                  {project.demoType === 'research' ? (
                    <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: '1 1 160px', justifyContent: 'center' }}>
                      <ExternalLink size={16} /> Research Link
                    </a>
                  ) : (
                    <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: '1 1 160px', justifyContent: 'center' }}>
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>

                {project.architecture && (
                  <div style={{ marginTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const url = `${window.location.origin}${window.location.pathname}?projectDetail=${encodeURIComponent(project.title)}`;
                          window.open(url, '_blank');
                        } catch {
                          // fallback: navigate in same tab
                          window.location.href = `${window.location.origin}${window.location.pathname}?projectDetail=${encodeURIComponent(project.title)}`;
                        }
                      }}
                      className="project-architecture-toggle"
                    >
                      Architecture View
                      <ChevronDown size={16} style={{ transition: 'transform 0.2s ease' }} />
                    </button>

                    <p className="project-architecture-text" style={{ marginTop: '0.75rem' }}>
                      Opens a focused project detail tab with architecture information and a back option.
                    </p>
                  </div>
                )}
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
          .project-architecture-toggle {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            padding: 0.65rem 0.9rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: rgba(255, 255, 255, 0.03);
            color: var(--text-primary);
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .project-architecture-toggle:hover {
            border-color: rgba(255, 255, 255, 0.18);
            background: rgba(255, 255, 255, 0.05);
          }
          .project-architecture-panel {
            margin-top: 0.75rem;
            padding: 0.9rem;
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.02);
            display: grid;
            gap: 0.85rem;
          }
          .project-architecture-label {
            display: block;
            margin-bottom: 0.25rem;
            color: var(--text-primary);
            font-size: 0.78rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .project-architecture-text {
            margin: 0;
            color: var(--text-secondary);
            font-size: 0.88rem;
            line-height: 1.55;
          }
          .glass-panel:hover {
            border-color: rgba(0, 210, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 210, 255, 0.1);
          }
          .filter-btn {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--glass-border);
            color: var(--text-secondary);
            padding: 0.5rem 1.25rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
          }
          .filter-btn:hover {
            border-color: rgba(0, 210, 255, 0.4);
            color: #fff;
            background: rgba(0, 210, 255, 0.06);
            transform: translateY(-2px);
          }
          .filter-btn.active {
            background: linear-gradient(135deg, #00d2ff, #3a7bd5);
            border-color: transparent;
            color: #fff;
            box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
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

