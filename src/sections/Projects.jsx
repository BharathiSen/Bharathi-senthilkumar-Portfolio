import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Projects.css';

const EASE = [0.22, 1, 0.36, 1];

const detailHref = (project) =>
  `${window.location.origin}${window.location.pathname}?projectDetail=${encodeURIComponent(project.title)}`;

const Projects = () => {
  const projects = portfolioData.projects;
  const [activeFilter, setActiveFilter] = useState('All');

  // Filters are derived from the tags on the data itself - no title
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
          {visible.map((project, i) => (
            <motion.article
              key={project.id}
              className="pj-row"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            >
              <div className="pj-head">
                <span className="pj-num">{project.index}</span>

                <div className="pj-main">
                  <h3 className="pj-title">{project.title}</h3>
                  <span className="pj-tagline">{project.tagline}</span>
                  <span className="pj-stack">{project.tech.join('  ·  ')}</span>
                </div>

                <span className="pj-metrics" aria-hidden="true">
                  {project.metrics.map((metric) => (
                    <span key={metric.label} className="pj-metric">
                      <b>{metric.value}</b>
                      <i>{metric.label}</i>
                    </span>
                  ))}
                </span>

                <span className="pj-year">{project.year}</span>
              </div>

              <div className="pj-bar">
                <a
                  href={project.demo}
                  className="pj-bar-link pj-bar-link--live"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live <ArrowUpRight size={14} />
                </a>
                <a
                  href={project.github}
                  className="pj-bar-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={14} /> Source
                </a>
                {/* The full write-up - highlights, architecture, deployment -
                    opens in its own tab, so the scroll position here survives. */}
                <a
                  href={detailHref(project)}
                  className="pj-bar-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View more <ArrowUpRight size={14} />
                </a>
              </div>

              {project.shot && (
                <figure className="pj-shot">
                  <img
                    src={project.shot.src}
                    alt={project.shot.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )}
            </motion.article>
          ))}
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
