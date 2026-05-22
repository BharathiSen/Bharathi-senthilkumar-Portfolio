import { motion } from 'framer-motion';

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
                  src="/Profpic.jpeg"
                  alt="Profile"
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
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>BHARATHI S</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                  I am a final year B.E. Electronics and Communication Engineering student at Chennai Institute of Technology (2023–2027) with a CGPA: 8.9
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                  I am a software engineer with strong interest in backend systems, cloud computing, and AI applications.
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                  My work focuses on building scalable APIs, multi-tenant backend systems, and cloud-native solutions using technologies such as FastAPI, PostgreSQL, Docker, and modern web frameworks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
