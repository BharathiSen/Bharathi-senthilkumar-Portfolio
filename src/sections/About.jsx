import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const aboutContent = portfolioData.about;

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
            {aboutContent.title.prefix} <span style={{ background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{aboutContent.title.highlight}</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'stretch', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ minHeight: '220px' }}
          >
            <div className="glass-panel" style={{ padding: '0', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch', maxWidth: '360px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--accent-weak)', filter: 'blur(100px)', opacity: 0.9, zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1, height: '100%', width: '100%' }}>
                <img
                  src={aboutContent.image.src}
                  alt={aboutContent.image.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '16px', display: 'block' }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ minHeight: '220px', display: 'flex' }}
          >
            <div className="glass-panel" style={{ padding: '0.9rem', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'center', maxWidth: '420px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--accent-weak)', filter: 'blur(100px)', opacity: 0.9, zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '88%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem', lineHeight: 1.6 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.35rem', color: 'var(--text-primary)', textAlign: 'center' }}>{aboutContent.name}</h3>
                {aboutContent.paragraphs.map((paragraph) => (
                  <p key={paragraph} style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
