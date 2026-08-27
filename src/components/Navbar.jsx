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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy — the nav now says where you are.
  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      Boolean,
    );
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Navbar;
