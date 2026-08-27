import { motion } from 'framer-motion';
import LogoLoop from '../components/LogoLoop';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Skills.css';

const EASE = [0.22, 1, 0.36, 1];

const Skills = () => {
  const { groups, logos } = portfolioData.skills;

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

      <motion.div
        className="sk-loop"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <LogoLoop
          logos={logos}
          speed={52}
          direction="left"
          logoHeight={30}
          gap={64}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Tools and platforms"
        />
      </motion.div>
    </section>
  );
};

export default Skills;
