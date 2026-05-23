import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const heroContent = portfolioData.hero;
  const contactLinks = portfolioData.socialLinks;
  

  return (
    <>
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', pointerEvents: 'none', paddingLeft: 'clamp(1rem, 6vw, 5rem)', paddingRight: '1rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 style={{ fontSize: '1.5rem', color: '#808080', marginBottom: '1rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            {heroContent.greeting}
          </h2>
          <SplitText
            text={heroContent.name}
            className="hero-title"
            tag="h1"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
          />
          <style>{`
            .hero-title {
              font-size: clamp(3rem, 8vw, 5.5rem) !important;
              line-height: 1.1 !important;
              margin-bottom: 1rem !important;
              display: inline-block;
            }
            .hero-title, .hero-title div {
              background: linear-gradient(to right, #ffffff, #808080);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
          `}</style>
          <style>{`
            .hero-contact-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: clamp(44px, 12vw, 64px);
              height: clamp(44px, 12vw, 64px);
              background: var(--bg-card);
              border: 1px solid var(--glass-border);
              border-radius: 50%;
              color: var(--text-primary);
              transition: all 0.25s ease;
              text-decoration: none;
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
            }

            .hero-contact-button:focus-visible {
              outline: 2px solid var(--accent-grey);
              outline-offset: 4px;
            }

            .hero-contact-button:hover {
              color: #ffffff;
              border-color: var(--accent-grey);
              background: rgba(255, 255, 255, 0.05);
              transform: translateY(-6px);
              box-shadow: 0 8px 18px rgba(255, 255, 255, 0.06);
            }
          `}</style>
          <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 400 }}>
            {heroContent.title}
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ maxWidth: '600px', marginBottom: '3rem' }}
        >
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {heroContent.summary}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', pointerEvents: 'auto' }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
            <a href={heroContent.buttons.primary.href} className="btn btn-primary">
              {heroContent.buttons.primary.label} <ArrowRight size={18} />
            </a>
            <a href={heroContent.buttons.resume.href} className="btn btn-outline" download={heroContent.buttons.resume.download} aria-label="Download resume" title="Download resume">
              {heroContent.buttons.resume.label} <ArrowDown size={18} />
            </a>
            <a href={heroContent.buttons.preview.href} className="btn btn-outline" target="_blank" rel="noopener noreferrer" aria-label="Preview resume" title="Preview resume" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {heroContent.buttons.preview.label}
            </a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', pointerEvents: 'auto' }}>
            <a
              href={portfolioData.contact.emailComposeUrl}
              className="hero-contact-button"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${heroContent.name}`}
              title={`Email ${heroContent.name}`}
            >
              <Mail size={22} />
            </a>
            <a href={contactLinks.github.href} className="btn btn-outline" style={{ padding: '0.75rem', borderRadius: '50%', pointerEvents: 'auto', touchAction: 'manipulation' }} target="_blank" rel="noopener noreferrer" aria-label={contactLinks.github.ariaLabel} title={contactLinks.github.title}>
              <FaGithub size={20} />
            </a>
            <a href={contactLinks.linkedin.href} className="btn btn-outline" style={{ padding: '0.75rem', borderRadius: '50%', pointerEvents: 'auto', touchAction: 'manipulation' }} target="_blank" rel="noopener noreferrer" aria-label={contactLinks.linkedin.ariaLabel} title={contactLinks.linkedin.title}>
              <FaLinkedin size={20} />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'auto' }}
      >
        <a href="#about" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '1px' }}>
          <span style={{ marginBottom: '0.5rem' }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #ffffff, transparent)' }}
          />
        </a>
      </motion.div>
    </section>
    
    </>
  );
};

export default Hero;
