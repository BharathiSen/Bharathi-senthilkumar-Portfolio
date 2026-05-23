import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Writing = () => {
  const writingItems = portfolioData.writing;

  return (
    <section id="writing" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.02), transparent)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Writing & <span style={{ background: 'linear-gradient(to right, #ffffff, #8a8a8a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Research</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.25rem' }}>
            {writingItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="glass-panel"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    minHeight: '100%',
                    borderColor: 'var(--glass-border)'
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,255,255,0.06), transparent 40%)', pointerEvents: 'none' }} />

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '14px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{item.subtitle}</p>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7 }}>
                      {item.description}
                    </p>

                    <a
                      href={item.href}
                      className="btn btn-outline"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ alignSelf: 'flex-start', padding: '0.75rem 1rem' }}
                    >
                      {item.cta} <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #writing .container > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Writing;
