import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Writing', href: '#writing' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className="site-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled || isOpen ? 'rgba(10, 10, 12, 0.92)' : 'transparent',
        backdropFilter: scrolled || isOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled || isOpen ? '1px solid var(--glass-border)' : '1px solid transparent',
        paddingTop: 'calc(0.75rem + env(safe-area-inset-top))',
        paddingBottom: '0.75rem',
      }}
    >
      <div className="container site-header-inner">
        <a href="#hero" aria-label="Go to top" className="site-logo">
          <Terminal size={22} color="#ffffff" />
          <span>Bharathi<span className="text-gradient">.dev</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="mobile-toggle"
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          className="mobile-nav-panel"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <style>{`
        .site-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .site-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-weight: 700;
          font-size: 1.15rem;
          color: #fff;
          min-width: 0;
          flex-shrink: 1;
        }

        .desktop-nav {
          display: none;
        }

        .desktop-nav ul {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          margin: 0;
          padding: 0;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-nav-panel {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(10, 10, 12, 0.98);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--glass-border);
          padding: 0.5rem max(1.25rem, env(safe-area-inset-right)) 1.25rem max(1.25rem, env(safe-area-inset-left));
          max-height: min(70vh, 520px);
          overflow-y: auto;
        }

        .mobile-nav-panel ul {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .mobile-nav-link {
          display: block;
          color: var(--text-primary);
          font-size: 1.05rem;
          padding: 0.85rem 0.25rem;
          min-height: 44px;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: block;
          }

          .mobile-toggle,
          .mobile-nav-panel {
            display: none !important;
          }

          .site-logo {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 767px) {
          .site-header-inner.container {
            padding-left: max(1.25rem, env(safe-area-inset-left));
            padding-right: max(1.25rem, env(safe-area-inset-right));
          }

          .mobile-toggle {
            display: inline-flex !important;
          }

          .mobile-nav-panel {
            display: block;
          }

          .site-logo {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
