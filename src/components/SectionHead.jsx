import { motion } from 'framer-motion';

/**
 * The one section header used across the whole page.
 * Mono index + display title on the left, mono metadata on the right,
 * separated from the content by a single hairline.
 */
const SectionHead = ({ index, title, meta }) => (
  <motion.div
    className="sec-head"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <div>
      <span className="sec-index">{index}</span>
      <h2 className="sec-title">{title}</h2>
    </div>
    {meta ? <span className="sec-meta">{meta}</span> : null}
  </motion.div>
);

export default SectionHead;
