import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  const timeline = portfolioData.experience;

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

        <div className="experience-timeline" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div className="experience-line" style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--accent-light), var(--accent-grey), transparent)', zIndex: 0 }}></div>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="experience-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ position: 'relative', paddingLeft: '60px', marginBottom: '3rem', zIndex: 1 }}
            >
              {/* Timeline Dot */}
              <div className="experience-dot" style={{ position: 'absolute', left: '12px', top: '5px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--bg-dark)', border: '4px solid var(--accent-grey)', boxShadow: '0 0 8px rgba(255,255,255,0.03)' }}></div>
              
              <div className="glass-panel experience-card" style={{ padding: '1.5rem 2rem' }}>
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
      <style>{`
        @media (max-width: 768px) {
          .experience-item {
            padding-left: 48px !important;
            margin-bottom: 1.75rem !important;
          }

          .experience-line {
            left: 14px !important;
          }

          .experience-dot {
            left: 6px !important;
            width: 16px !important;
            height: 16px !important;
          }

          .experience-card {
            padding: 1.15rem 1.2rem !important;
          }

          .experience-card h3 {
            font-size: 1.1rem !important;
          }

          .experience-card p {
            font-size: 0.95rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
