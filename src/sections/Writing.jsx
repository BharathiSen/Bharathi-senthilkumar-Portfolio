import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Writing.css';

const EASE = [0.22, 1, 0.36, 1];

const Writing = () => {
  const publication = portfolioData.publications[0];
  const items = portfolioData.writing;

  return (
    <section id="writing" className="section">
      <div className="shell">
        <SectionHead
          index="05 / Research & writing"
          title="Published work"
          meta="IEEE ICSSS 2025"
        />

        {/* The publication is the headline - it gets the full width. */}
        <motion.a
          className="wr-paper"
          href={publication.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="wr-paper-meta">
            <span className="label">{publication.venue}</span>
            <span className="wr-paper-year">{publication.year}</span>
          </div>

          <h3 className="wr-paper-title">{publication.title}</h3>
          <p className="wr-paper-desc">{publication.description}</p>

          <span className="wr-paper-cta">
            Read on IEEE Xplore <ArrowUpRight size={15} />
          </span>
        </motion.a>

        <div className="wr-links">
          {items.map((item, i) => (
            <motion.a
              key={item.title}
              className="wr-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
            >
              <span className="wr-link-head">
                <span className="wr-link-title">{item.title}</span>
                <ArrowUpRight size={16} />
              </span>
              <span className="wr-link-sub">{item.subtitle}</span>
              <span className="wr-link-desc">{item.description}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writing;
