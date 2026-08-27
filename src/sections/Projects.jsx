import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Projects.css';

const EASE = [0.22, 1, 0.36, 1];

const Projects = () => {
  const projects = portfolioData.projects;
  const [activeFilter, setActiveFilter] = useState('All');
  const [openId, setOpenId] = useState(null);

  // Filters are derived from the tags on the data itself — no title
  // string-matching, so a project can never land in the wrong bucket.
  const filters = useMemo(() => {
    const seen = [];
    projects.forEach((project) => {
      (project.tags || []).forEach((tag) => {
        if (!seen.includes(tag)) seen.push(tag);
      });
    });
    return ['All', ...seen];
  }, [projects]);

  const visible = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => (project.tags || []).includes(activeFilter)),
    [projects, activeFilter],
  );

  // BharathiGPT can drive the filter from the command bar.
  useEffect(() => {
    const handleAction = (event) => {
      const { action, payload } = event.detail || {};
      if (action !== 'FILTER_PROJECTS' || !payload) return;

      const match = filters.find(
        (filter) => filter.toLowerCase() === String(payload).toLowerCase(),
      );
      setActiveFilter(match || 'All');
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('portfolio-action', handleAction);
    return () => window.removeEventListener('portfolio-action', handleAction);
  }, [filters]);

  return (
    <section id="projects" className="section section--major">
      <div className="shell">
        <SectionHead
          index="03 / Selected work"
          title="Systems, shipped"
          meta={`${String(projects.length).padStart(2, '0')} projects · all live`}
        />

        <div className="pj-filters" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="pj-filter"
              data-active={activeFilter === filter}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="pj-list">
          {visible.map((project, i) => {
            const isOpen = openId === project.id;

            return (
              <motion.article
                key={project.id}
                className="pj-row"
                data-open={isOpen}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <button
                  type="button"
                  className="pj-head"
                  aria-expanded={isOpen}
                  aria-controls={`pj-panel-${project.id}`}
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                >
                  <span className="pj-num">{project.index}</span>

                  <span className="pj-main">
                    <span className="pj-title">{project.title}</span>
                    <span className="pj-tagline">{project.tagline}</span>
                    <span className="pj-stack">
                      {project.tech.join('  ·  ')}
                    </span>
                  </span>

                  <span className="pj-metrics" aria-hidden="true">
                    {project.metrics.map((metric) => (
                      <span key={metric.label} className="pj-metric">
                        <b>{metric.value}</b>
                        <i>{metric.label}</i>
                      </span>
                    ))}
                  </span>

                  <span className="pj-year">{project.year}</span>

                  <span className="pj-toggle" aria-hidden="true">
                    <Plus size={17} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`pj-panel-${project.id}`}
                      className="pj-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.36, ease: EASE }}
                    >
                      <div className="pj-panel-inner">
                        <div className="pj-col">
                          <p className="label">What it does</p>
                          <p className="pj-desc">{project.description}</p>

                          <ul className="pj-points">
                            {project.highlights.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>

                          <div className="pj-links">
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

                        <div className="pj-col pj-col--arch">
                          <p className="label">How it is built</p>
                          <dl className="pj-arch">
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
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="pj-empty">
            Nothing tagged <b>{activeFilter}</b>.{' '}
            <button type="button" onClick={() => setActiveFilter('All')}>
              Show all projects
            </button>
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
