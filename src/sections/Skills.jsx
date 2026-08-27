import { motion } from 'framer-motion';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Skills.css';

const EASE = [0.22, 1, 0.36, 1];

const Skills = () => {
  const { groups } = portfolioData.skills;

  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHead
          index="02 / Capabilities"
          title="The stack, precisely"
          meta={`${groups.length} groups`}
        />

        <div className="sk-matrix">
          {groups.map((group, i) => (
            <motion.div
              key={group.id}
              className="sk-row"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
            >
              <div className="sk-label">
                <span className="sk-label-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="sk-label-text">{group.label}</span>
              </div>

              <ul className="sk-items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
