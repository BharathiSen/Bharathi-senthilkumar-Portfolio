import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const findProjectByTitle = (title) => portfolioData.projects.find((p) => p.title === title || p.title.startsWith(title)) || null;

const ProjectDetail = () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('projectDetail') || '';
  const project = findProjectByTitle(decodeURIComponent(title));

  if (!project) {
    return (
      <div style={{ padding: '4rem', color: '#fff' }}>
        <h2>Project not found</h2>
        <p>The requested project could not be located in the portfolio.</p>
        <a href={`${window.location.origin}${window.location.pathname}#projects`} className="btn btn-primary">Back to projects</a>
      </div>
    );
  }

  const handleBack = () => {
    const origin = window.location.origin;
    const path = window.location.pathname;
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.location.href = `${window.opener.location.pathname}#projects`;
      } catch {
        window.opener.location.hash = '#projects';
      }
      window.opener.focus();
      window.close();
      return;
    }
    window.location.href = `${origin}${path}#projects`;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '3rem', background: 'linear-gradient(180deg,#000 0%, rgba(0,0,0,0.6) 100%)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <button onClick={handleBack} className="btn btn-outline" style={{ marginBottom: '1rem' }}>Back to projects</button>

        <div className="glass-panel project-card" style={{ padding: '2rem', position: 'relative' }}>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>{project.title}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
            {project.tech.map((t) => (
              <span key={t} style={{ fontSize: '0.9rem', padding: '0.35rem 0.75rem', background: 'rgba(0,210,255,0.08)', borderRadius: 20, color: '#00d2ff' }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><FaGithub />&nbsp;GitHub</a>
            <a href={project.demo || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><ExternalLink />&nbsp;Live Demo</a>
          </div>

          {project.architecture && (
            <div style={{ marginTop: '1.75rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Architecture</h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div>
                  <div className="project-architecture-label">Architecture flow</div>
                  <div className="project-architecture-text">{project.architecture.architectureFlow}</div>
                </div>
                <div>
                  <div className="project-architecture-label">Backend flow</div>
                  <div className="project-architecture-text">{project.architecture.backendFlow}</div>
                </div>
                <div>
                  <div className="project-architecture-label">Database interactions</div>
                  <div className="project-architecture-text">{project.architecture.databaseInteractions}</div>
                </div>
                <div>
                  <div className="project-architecture-label">Deployment notes</div>
                  <div className="project-architecture-text">{project.architecture.deploymentNotes}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
