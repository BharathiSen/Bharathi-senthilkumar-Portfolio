import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'AI Interview Preparation Assistant',
    description: 'An intelligent system that simulates technical interviews, analyzes responses, and provides real-time feedback using NLP models.',
    tech: ['Python', 'FastAPI', 'React', 'OpenAI API'],
    github: '#',
    demo: '#'
  },
  {
    title: 'FastAPI Backend Core',
    description: 'A scalable, robust backend boilerplate with JWT authentication, role-based access control, and PostgreSQL integration.',
    tech: ['FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Cloud-Based Web Application',
    description: 'A serverless web application deployed on AWS, utilizing Lambda functions and S3 for storage with a reactive frontend.',
    tech: ['AWS', 'React', 'Node.js', 'DynamoDB'],
    github: '#',
    demo: '#'
  },
  {
    title: 'Full Stack Portfolio Website',
    description: 'Modern 3D portfolio featuring React Three Fiber, Framer Motion, and responsive glassmorphism UI.',
    tech: ['React', 'Three.js', 'Framer Motion'],
    github: '#',
    demo: '#'
  },
  {
    title: 'AI Productivity Tool',
    description: 'A workflow automation tool leveraging AI to categorize tasks, summarize emails, and optimize daily schedules.',
    tech: ['Python', 'React', 'LangChain'],
    github: '#',
    demo: '#'
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
            Featured <span className="text-gradient">Projects</span>
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
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, #ffffff, #808080)', opacity: 0, transition: 'opacity 0.3s ease' }} className="card-highlight" />
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {project.tech.map(tech => (
                    <span key={tech} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', color: '#ffffff' }}>
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
                  .glass-panel:hover .card-highlight { opacity: 1; }
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
