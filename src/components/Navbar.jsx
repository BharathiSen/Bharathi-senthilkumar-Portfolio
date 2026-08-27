import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const LINKS = [
  { id: 'hero', name: 'Index', num: '00' },
  { id: 'about', name: 'About', num: '01' },
  { id: 'skills', name: 'Stack', num: '02' },
  { id: 'projects', name: 'Work', num: '03' },
  { id: 'writing', name: 'Research', num: '04' },
  { id: 'experience', name: 'Experience', num: '05' },
  { id: 'credentials', name: 'Credentials', num: '06' },
  { id: 'contact', name: 'Contact', num: '07' },
];

const Navbar = ({ onAsk }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy, by position rather than intersection ratio.
  //
  // IntersectionObserver was the wrong tool here: `intersectionRatio` is
  // relative to each target's own height, so against a thin detection band a
  // short section scores ~1.0 while a tall one scores ~0.05 — short sections
  // always won. Its callback also only carries *changed* entries, so any
  // comparison across sections ran on a partial set.
  //
  // Measuring against a fixed reading line is deterministic: the active
  // section is simply the last one whose top has crossed it.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = '';

      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = link.id;
      }

      // The last section can be too short to reach the line — at the bottom
      // of the page it is unambiguously the one being read.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = LINKS[LINKS.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <motion.header
      className="nav"
      data-scrolled={scrolled || isOpen}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="shell nav-inner">
        <a href="#hero" className="nav-logo" aria-label="Back to top">
          <span className="nav-logo-mark" aria-hidden="true" />
          Bharathi&nbsp;S
        </a>

        <nav className="nav-desktop" aria-label="Sections">
          <ul>
            {LINKS.slice(1).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="nav-link"
                  data-active={active === link.id}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  <span className="nav-link-num">{link.num}</span>
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="nav-ask"
                onClick={() => onAsk()}
                aria-label="Ask BharathiGPT"
              >
                <span className="nav-ask-dot" aria-hidden="true" />
                Ask
              </button>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <motion.nav
          className="nav-mobile"
          aria-label="Sections"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          <ul>
            {LINKS.slice(1).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  data-active={active === link.id}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-link-num">{link.num}</span>
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="nav-ask nav-ask--mobile"
                onClick={() => {
                  setIsOpen(false);
                  onAsk();
                }}
              >
                <span className="nav-ask-dot" aria-hidden="true" />
                Ask BharathiGPT
              </button>
            </li>
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Navbar;
