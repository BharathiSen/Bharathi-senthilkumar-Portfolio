import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './Ask.css';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The full BharathiGPT treatment, placed directly after the work.
 *
 * A reader arriving here has just gone through three systems and has real
 * questions, so the invitation is earned. In the hero it would only be
 * announced - nobody has a question before they have seen anything.
 */
const Ask = ({ onOpen, onAsk }) => {
  const ask = portfolioData.ask;

  return (
    <section id="ask" className="section ask">
      <div className="shell">
        <SectionHead index={ask.index} title={ask.title} meta="Live · grounded" />

        <div className="ask-grid">
          <motion.div
            className="ask-lead"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="ask-intro">{ask.intro}</p>

            <button type="button" className="ask-field" onClick={() => onOpen()}>
              <span className="ask-field-dot" aria-hidden="true" />
              <span className="ask-field-text">Ask BharathiGPT…</span>
              <span className="ask-field-go" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </button>

            <p className="ask-hint">
              Or press <kbd>/</kbd> anywhere on the page.
            </p>
          </motion.div>

          <motion.ul
            className="ask-starters"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            {ask.starters.map((question) => (
              <li key={question}>
                {/* Sends the question outright rather than only typing it in -
                    a suggestion that still needs a second click is friction. */}
                <button type="button" onClick={() => onAsk(question)}>
                  <span className="ask-starter-text">{question}</span>
                  <ArrowUpRight size={15} />
                </button>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Ask;
