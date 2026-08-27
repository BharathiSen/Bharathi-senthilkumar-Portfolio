import { motion } from 'framer-motion';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Experience.css';

const EASE = [0.22, 1, 0.36, 1];

const Experience = () => {
  const timeline = portfolioData.experience;

  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHead
          index="05 / Experience"
          title="Where it was tested"
          meta={`${timeline.length} internships`}
        />

        <div className="xp-list">
          {timeline.map((item, i) => (
            <motion.article
              key={item.org}
              className="xp-row"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <div className="xp-when">
                <span className="xp-year">{item.year}</span>
              </div>

              <div className="xp-what">
                <h3 className="xp-role">{item.role}</h3>
                <p className="xp-org">
                  {item.org}
                  {item.unit && <span className="xp-unit"> — {item.unit}</span>}
                </p>

                <ul className="xp-points">
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="xp-stack">
                  {item.stack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
