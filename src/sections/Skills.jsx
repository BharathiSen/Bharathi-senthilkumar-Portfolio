import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'Python', 'FastAPI', 'PostgreSQL', 'React', 'JavaScript', 
  'Docker', 'AWS', 'Git/GitHub', 'REST APIs', 'Data Structures & Algorithms'
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
      </div>
    </section>
  );
};

export default Skills;
