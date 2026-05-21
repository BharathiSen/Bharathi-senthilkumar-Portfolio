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
            About <span style={{ background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Me</span>
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
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--accent-weak)', filter: 'blur(100px)', opacity: 0.9, zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>B.E. Electronics and Communication Engineering</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Chennai Institute of Technology (2023–2027)
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  CGPA: 8.9
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  I am a B.E. student focusing on backend engineering, cloud technologies, and applied machine learning. I work on scalable systems, API design, and data-driven workflows.
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
              <div style={{ padding: '1rem', background: 'rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}>
                <Server size={32} color="#00d2ff" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Backend Systems</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Scalable architectures, API design</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(58, 123, 213, 0.1)', borderRadius: '12px' }}>
                <Database size={32} color="#3a7bd5" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Cloud Infrastructure</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Docker, AWS, CI/CD</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}>
                <Cpu size={32} color="#00d2ff" />
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
