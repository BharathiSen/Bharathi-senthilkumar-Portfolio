import { motion } from 'framer-motion';
import { SiDocker, SiFastapi, SiGithub, SiJavascript, SiPostgresql, SiPython, SiReact } from 'react-icons/si';

import LogoLoop from '../components/LogoLoop';
import MagicSkills from '../components/MagicSkills';

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

        <MagicSkills
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          disableAnimations={false}
          spotlightRadius={250}
          particleCount={8}
          enableTilt={true}
          glowColor="220,220,220"
          clickEffect={true}
          enableMagnetism={true}
        />

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
