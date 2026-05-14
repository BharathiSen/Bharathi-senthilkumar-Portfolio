import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: 'Present',
    title: 'Internship Preparation Roadmap',
    description: 'Actively preparing for backend and full-stack roles at top product companies. Focusing on system design and advanced problem solving.'
  },
  {
    year: '2023 - 2024',
    title: 'AI Project Experimentation',
    description: 'Built multiple AI-integrated tools utilizing LLMs, RAG, and custom NLP pipelines to solve real-world productivity problems.'
  },
  {
    year: '2023',
    title: 'Cloud Learning Journey',
    description: 'Mastered Docker containerization and started deploying scalable applications on AWS, learning infrastructure as code.'
  },
  {
    year: '2022',
    title: 'Backend Engineering',
    description: 'Deep dive into APIs, databases (PostgreSQL), and server architectures using Python and FastAPI.'
  },
  {
    year: '2021',
    title: 'Data Structures & Algorithms',
    description: 'Solved numerous algorithmic problems to build a strong foundation in computational thinking.'
  },
  {
    year: '2020',
    title: 'Learning Python',
    description: 'Began the programming journey with Python, focusing on scripting, automation, and foundational concepts.'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #ffffff, #808080, transparent)', zIndex: 0 }}></div>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ position: 'relative', paddingLeft: '60px', marginBottom: '3rem', zIndex: 1 }}
            >
              {/* Timeline Dot */}
              <div style={{ position: 'absolute', left: '12px', top: '5px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--bg-dark)', border: '4px solid #808080', boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)' }}></div>
              
              <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', fontSize: '0.8rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 600 }}>
                  {item.year}
                </span>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#fff' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
