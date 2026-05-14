import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Cpu } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: '#ffffff', filter: 'blur(100px)', opacity: 0.1, zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff' }}>My Background</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  I am a 5th Semester Computer Science student focused on Backend Engineering, Cloud, DSA, and AI systems.
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Currently, I am diving deep into FastAPI, PostgreSQL, Docker, AWS, and scalable architectures to build robust applications.
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  I'm passionate about building impactful products and actively preparing for top product companies.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}>
                <Server size={32} color="#ffffff" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Backend Systems</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Scalable architectures, API design</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(128, 128, 128, 0.1)', borderRadius: '12px' }}>
                <Database size={32} color="#808080" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Cloud Infrastructure</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Docker, AWS, CI/CD</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}>
                <Cpu size={32} color="#ffffff" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>AI Workflows</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Integration, optimization, data</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
