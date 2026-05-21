import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: 'Nov 2024',
    title: 'Software Development Intern — India Meteorological Department (Doppler Weather Radar)',
    description: 'Developed terrain-aware radar propagation models using Python, DSM/DEM datasets, and GIS tools. Modeled beam blockage and wave propagation to improve radar siting accuracy. Built geospatial workflows to process large-scale terrain datasets for operational meteorological decision systems.'
  },
  {
    year: 'Aug 2024',
    title: 'Machine Learning Intern — Cognifyz Technologies',
    description: 'Built ML pipelines for prediction, clustering, and recommendation systems. Applied feature engineering and model tuning to improve performance, and developed visualizations to surface model insights and interpretability.'
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
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--accent-light), var(--accent-grey), transparent)', zIndex: 0 }}></div>

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
              <div style={{ position: 'absolute', left: '12px', top: '5px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--bg-dark)', border: '4px solid var(--accent-grey)', boxShadow: '0 0 8px rgba(255,255,255,0.03)' }}></div>
              
              <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--accent-grey)', marginBottom: '1rem', fontWeight: 600 }}>
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
