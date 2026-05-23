import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import useBharathiGpt from '../hooks/useBharathiGpt';

const Hero = () => {
  const heroContent = portfolioData.hero;
  const contactLinks = portfolioData.socialLinks;
  const { assistantPromptChips, input: assistantInput, isThinking, messages: assistantMessages, sendMessage: submitAssistantQuery, setInput: setAssistantInput } = useBharathiGpt();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [assistantMessages]);

  return (
    <>
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="container hero-shell" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(2rem, 5vw, 4.5rem)', paddingLeft: 'clamp(1rem, 6vw, 5rem)', paddingRight: 'clamp(1rem, 5vw, 3rem)' }}>
        {/* Content */}
        <div className="hero-copy" style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', pointerEvents: 'none' }}>
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
            .hero-social-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 52px;
              height: 52px;
              background: var(--bg-card);
              border: 1px solid var(--glass-border);
              border-radius: 50%;
              color: var(--text-primary);
              transition: all 0.25s ease;
              text-decoration: none;
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
            }

            .hero-social-button:focus-visible {
              outline: 2px solid var(--accent-grey);
              outline-offset: 4px;
            }

            .hero-social-button:hover {
              color: #ffffff;
              border-color: var(--accent-grey);
              background: rgba(255, 255, 255, 0.05);
              transform: translateY(-6px);
              box-shadow: 0 8px 18px rgba(255, 255, 255, 0.06);
            }

            .assistant-chip {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border: 1px solid var(--glass-border);
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.03);
              color: var(--text-primary);
              padding: 0.55rem 0.8rem;
              font-size: 0.8rem;
              line-height: 1;
              transition: all 0.2s ease;
              cursor: pointer;
            }

            .assistant-chip:hover {
              border-color: rgba(255, 255, 255, 0.18);
              background: rgba(255, 255, 255, 0.06);
              transform: translateY(-2px);
            }

            .assistant-chip:focus-visible {
              outline: 2px solid var(--accent-grey);
              outline-offset: 4px;
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
                className="hero-social-button"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Email ${heroContent.name}`}
                title={`Email ${heroContent.name}`}
              >
                <Mail size={20} />
              </a>
              <a href={contactLinks.github.href} className="hero-social-button" target="_blank" rel="noopener noreferrer" aria-label={contactLinks.github.ariaLabel} title={contactLinks.github.title}>
                <FaGithub size={20} />
              </a>
              <a href={contactLinks.linkedin.href} className="hero-social-button" target="_blank" rel="noopener noreferrer" aria-label={contactLinks.linkedin.ariaLabel} title={contactLinks.linkedin.title}>
                <FaLinkedin size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          aria-label="AI assistant panel"
          style={{
            flex: '0 1 360px',
            width: 'min(360px, 100%)',
            alignSelf: 'center',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '1.25rem', boxShadow: 'var(--shadow-card)', backdropFilter: 'blur(18px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#808080' }}>AI Assistant</p>
                <h4 style={{ margin: '0.35rem 0 0', fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 600 }}>BharathiGPT</h4>
              </div>
            </div>

            <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Ask about projects, skills, or experience.
            </p>

            <div style={{ border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', borderRadius: '18px', padding: '0.95rem', marginBottom: '1rem', maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {assistantMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}-${message.content.slice(0, 18)}`}
                  style={{
                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '92%',
                    borderRadius: '16px',
                    border: '1px solid var(--glass-border)',
                    background: message.role === 'user' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                    padding: '0.8rem 0.9rem',
                  }}
                >
                  <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {message.content}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1rem' }}>
              {assistantPromptChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => submitAssistantQuery(chip.query)}
                  className="assistant-chip"
                  aria-label={chip.label}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitAssistantQuery(assistantInput);
              }}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.25rem' }}
            >
              <input
                type="text"
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.target.value)}
                placeholder="Ask a question..."
                aria-label="Assistant prompt input"
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderRadius: '14px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'var(--text-secondary)',
                  padding: '0.95rem 1rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn btn-outline"
                style={{ whiteSpace: 'nowrap', paddingInline: '1rem' }}
                aria-label="Send prompt"
                disabled={isThinking}
              >
                Send
              </button>
            </form>

          </div>
        </motion.aside>

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

      <style>{`
        @media (max-width: 1024px) {
          .hero-shell {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-copy {
            width: 100%;
          }

          .hero-shell > aside {
            width: 100% !important;
            max-width: 520px;
          }
        }
      `}</style>
    </section>
    
    </>
  );
};

export default Hero;
