import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 style={{ fontSize: '1.5rem', color: '#808080', marginBottom: '1rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Hello, I am
          </h2>
          <SplitText
            text="BHARATHI S"
            className="hero-title"
            tag="h1"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
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
          <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 400 }}>
            Backend Engineer | Cloud & AI Enthusiast
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ maxWidth: '600px', marginBottom: '3rem' }}
        >
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            I build backend systems, cloud-based applications, and practical software projects while mastering DSA and CS fundamentals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}
        >
          <a href="#projects" className="btn btn-primary">
            View Projects <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="btn btn-outline"
            aria-label="Go to Contact section"
            title="Get In Touch"
          >
            Contact Me <Mail size={18} />
          </a>
          <a href="https://github.com/BharathiSen/" className="btn btn-outline" style={{ padding: '0.75rem', borderRadius: '50%', pointerEvents: 'auto', touchAction: 'manipulation' }} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/bharathisenthilkumar28/" className="btn btn-outline" style={{ padding: '0.75rem', borderRadius: '50%', pointerEvents: 'auto', touchAction: 'manipulation' }} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
            <FaLinkedin size={20} />
          </a>
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
  );
};

export default Hero;
