import { motion } from 'framer-motion';
import { SiDocker, SiFastapi, SiGithub, SiJavascript, SiPostgresql, SiPython, SiReact } from 'react-icons/si';

import LogoLoop from '../components/LogoLoop';

const skills = [
  'Python', 'Java', 'C', 'SQL', 'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS',
  'FastAPI', 'REST APIs', 'Authentication (JWT, OAuth)', 'RBAC', 'PostgreSQL', 'Redis', 'Firebase',
  'GCP', 'Docker', 'CI/CD (GitHub Actions)', 'Serverless Architecture', 'scikit-learn', 'MLOps', 'LLM Integration'
];

const skillLogos = [
  { node: <SiPython />, title: 'Python', href: 'https://www.python.org/' },
  { node: <SiFastapi />, title: 'FastAPI', href: 'https://fastapi.tiangolo.com/' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org/' },
  { node: <SiReact />, title: 'React', href: 'https://react.dev/' },
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com/' },
  { node: <SiGithub />, title: 'GitHub', href: 'https://github.com/' },
];

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Core <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
              className="glass-panel"
              style={{ padding: '1rem 2rem', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#fff' }}>{skill}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: '3rem' }}
        >
          <LogoLoop
            logos={skillLogos}
            speed={70}
            direction="left"
            logoHeight={42}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="rgba(0, 0, 0, 0.9)"
            ariaLabel="Core skill logos"
            style={{ width: '100%' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
