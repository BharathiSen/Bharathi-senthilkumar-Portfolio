import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import './ProjectDetail.css';

const findProject = (title) =>
  portfolioData.projects.find(
    (project) => project.title === title || project.title.startsWith(title),
  ) || null;

/**
 * Standalone deep-link view, kept so older shared ?projectDetail= URLs still
 * resolve. The primary path is now the inline drawer in the Projects section.
 */
const ProjectDetail = () => {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('projectDetail') || '';
  const project = findProject(decodeURIComponent(raw));
  const home = `${window.location.origin}${window.location.pathname}`;

  if (!project) {
    return (
      <div className="pd">
        <div className="shell pd-inner">
          <p className="label">404</p>
          <h1 className="pd-title">Project not found</h1>
          <p className="pd-lede">
            Nothing in the portfolio matches “{decodeURIComponent(raw)}”.
          </p>
          <a href={`${home}#projects`} className="btn btn-primary">
            <ArrowLeft size={15} /> All projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pd">
      <div className="shell pd-inner">
        <a href={`${home}#projects`} className="pd-back">
          <ArrowLeft size={15} /> All projects
        </a>

        <div className="pd-head">
          <span className="sec-index">
            {project.index} / {project.year}
          </span>
          <h1 className="pd-title">{project.title}</h1>
          <p className="pd-lede">{project.tagline}</p>
        </div>

        <dl className="pd-metrics">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>

        <div className="pd-body">
          <section>
            <p className="label">What it does</p>
            <p className="pd-desc">{project.description}</p>
            <ul className="pd-points">
              {project.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="label">How it is built</p>
            <dl className="pd-arch">
              <div>
                <dt>Architecture</dt>
                <dd>{project.architecture.architectureFlow}</dd>
              </div>
              <div>
                <dt>Backend</dt>
                <dd>{project.architecture.backendFlow}</dd>
              </div>
              <div>
                <dt>Data</dt>
                <dd>{project.architecture.databaseInteractions}</dd>
              </div>
              <div>
                <dt>Deployment</dt>
                <dd>{project.architecture.deploymentNotes}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="pd-stack">
          {project.tech.map((tool) => (
            <span key={tool} className="tag">
              {tool}
            </span>
          ))}
        </div>

        <div className="pd-links">
          <a
            href={project.demo}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live <ArrowUpRight size={15} />
          </a>
          <a
            href={project.github}
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={15} /> Source
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
