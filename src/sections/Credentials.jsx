import { motion } from 'framer-motion';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Credentials.css';

const EASE = [0.22, 1, 0.36, 1];

const Credentials = () => {
  const { problemSolving, certifications } = portfolioData;
  const peak = Math.max(...problemSolving.platforms.map((p) => p.count));

  return (
    <section id="credentials" className="section">
      <div className="shell">
        <SectionHead
          index="06 / Credentials"
          title="Reps and receipts"
          meta={`${certifications.length} certifications`}
        />

        <div className="cr-grid">
          {/* ── problem solving ── */}
          <motion.div
            className="cr-block"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="label">Problem solving</p>

            <p className="cr-total">
              <span>{problemSolving.total}</span>
              <i>{problemSolving.summary}</i>
            </p>

            <ul className="cr-bars">
              {problemSolving.platforms.map((platform, i) => (
                <li key={platform.name}>
                  <span className="cr-bar-name">{platform.name}</span>
                  <span className="cr-track">
                    <motion.span
                      className="cr-fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: platform.count / peak }}
                      viewport={{ once: true, margin: '-70px' }}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + i * 0.1,
                        ease: EASE,
                      }}
                    />
                  </span>
                  <span className="cr-bar-count">{platform.count}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── certifications ── */}
          <motion.div
            className="cr-block"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <p className="label">Certifications</p>

            <ul className="cr-certs">
              {certifications.map((cert, i) => (
                <li key={cert}>
                  <span className="cr-cert-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="cr-cert-text">{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
