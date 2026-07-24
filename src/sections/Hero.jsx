import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import useBharathiGpt from '../hooks/useBharathiGpt';

const MOBILE_MQ = '(max-width: 768px)';

const Hero = () => {
  const heroContent = portfolioData.hero;
  const contactLinks = portfolioData.socialLinks;
  const { assistantPromptChips, input: assistantInput, isThinking, messages: assistantMessages, sendMessage: submitAssistantQuery, setInput: setAssistantInput } = useBharathiGpt();
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MQ).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MQ);
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [assistantMessages]);

  return (
    <>
    <section id="hero" className="hero-section">
      <div className="container hero-shell">
        {/* Content */}
        <div className="hero-copy">
          <motion.div
            className="hero-intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="hero-greeting">{heroContent.greeting}</p>

            {isMobile ? (
              <h1 className="hero-title hero-title--static">{heroContent.name}</h1>
            ) : (
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
            )}

            <h2 className="hero-role">{heroContent.title}</h2>
          </motion.div>

          <motion.div
            className="hero-summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p>{heroContent.summary}</p>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="hero-cta-row">
              <a href={heroContent.buttons.primary.href} className="btn btn-primary">
                {heroContent.buttons.primary.label} <ArrowRight size={18} />
              </a>
              <a href={heroContent.buttons.resume.href} className="btn btn-outline" download={heroContent.buttons.resume.download} aria-label="Download resume" title="Download resume">
                {heroContent.buttons.resume.label} <ArrowDown size={18} />
              </a>
              <a href={heroContent.buttons.preview.href} className="btn btn-outline" target="_blank" rel="noopener noreferrer" aria-label="Preview resume" title="Preview resume">
                {heroContent.buttons.preview.label}
              </a>
            </div>
            <div className="hero-social-row">
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
          className="hero-assistant"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          aria-label="AI assistant panel"
        >
          <div className="hero-assistant-card">
            <div className="hero-assistant-heading">
              <p>AI Assistant</p>
              <h3>BharathiGPT</h3>
            </div>

            <p className="hero-assistant-intro">
              Ask about projects, skills, or experience.
            </p>

            <div className="hero-assistant-messages">
              {assistantMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}-${message.content.slice(0, 18)}`}
                  className={`hero-assistant-bubble hero-assistant-bubble--${message.role}`}
                >
                  <p>{message.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="hero-assistant-chips">
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
              className="hero-assistant-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitAssistantQuery(assistantInput);
              }}
            >
              <input
                type="text"
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.target.value)}
                placeholder="Ask a question..."
                aria-label="Assistant prompt input"
              />
              <button
                type="submit"
                className="btn btn-outline hero-assistant-send"
                aria-label="Send prompt"
                disabled={isThinking}
              >
                Send
              </button>
            </form>
          </div>
        </motion.aside>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <a href="#about">
          <span>SCROLL</span>
          <motion.div
            className="hero-scroll-line"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </a>
      </motion.div>

      <style>{`
        .hero-section {
          height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-shell {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(2rem, 5vw, 4.5rem);
          padding-left: clamp(1rem, 6vw, 5rem);
          padding-right: clamp(1rem, 5vw, 3rem);
        }

        .hero-copy {
          flex: 1 1 0;
          min-width: 0;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          pointer-events: none;
        }

        .hero-intro {
          width: 100%;
        }

        .hero-greeting {
          font-size: 1.5rem;
          color: #808080;
          margin: 0 0 1rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: var(--font-primary);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5.5rem) !important;
          line-height: 1.15 !important;
          margin: 0 0 1rem !important;
          display: inline-block;
          max-width: 100%;
          color: #ffffff;
          letter-spacing: -0.02em;
          overflow: visible !important;
        }

        .hero-title--static {
          display: block;
          width: 100%;
          background: linear-gradient(to right, #ffffff, #808080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title .split-char {
          background: linear-gradient(to right, #ffffff, #808080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-role {
          font-size: clamp(1.2rem, 3vw, 2rem);
          color: var(--text-secondary);
          margin: 0 0 2rem;
          font-weight: 400;
          line-height: 1.35;
        }

        .hero-summary {
          max-width: 600px;
          width: 100%;
          margin-bottom: 3rem;
        }

        .hero-summary p {
          margin: 0;
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
          width: 100%;
          pointer-events: auto;
        }

        .hero-cta-row,
        .hero-social-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
        }

        .hero-social-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          flex-shrink: 0;
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

        .hero-assistant {
          flex: 0 1 360px;
          width: min(360px, 100%);
          align-self: center;
          pointer-events: auto;
          min-width: 0;
        }

        .hero-assistant-card {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 1.25rem;
          box-shadow: var(--shadow-card);
          backdrop-filter: blur(18px);
          width: 100%;
          box-sizing: border-box;
        }

        .hero-assistant-heading p {
          margin: 0;
          font-size: 0.85rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #808080;
        }

        .hero-assistant-heading h3 {
          margin: 0.35rem 0 0;
          font-size: 1.35rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .hero-assistant-intro {
          margin: 1rem 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .hero-assistant-messages {
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.03);
          border-radius: 18px;
          padding: 0.95rem;
          margin-bottom: 1rem;
          max-height: 220px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .hero-assistant-bubble {
          max-width: 92%;
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          padding: 0.8rem 0.9rem;
        }

        .hero-assistant-bubble--user {
          align-self: flex-end;
          background: rgba(255,255,255,0.08);
        }

        .hero-assistant-bubble--assistant {
          align-self: flex-start;
          background: rgba(255,255,255,0.03);
        }

        .hero-assistant-bubble p {
          margin: 0;
          color: var(--text-primary);
          font-size: 0.88rem;
          line-height: 1.6;
          white-space: pre-line;
          overflow-wrap: anywhere;
        }

        .hero-assistant-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-bottom: 1rem;
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

        .hero-assistant-form {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .hero-assistant-form input {
          flex: 1;
          min-width: 0;
          border-radius: 14px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
          color: var(--text-secondary);
          padding: 0.95rem 1rem;
          outline: none;
          font-size: 16px;
        }

        .hero-assistant-send {
          white-space: nowrap;
          padding-inline: 1rem;
          flex-shrink: 0;
        }

        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          pointer-events: auto;
        }

        .hero-scroll a {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-secondary);
          font-size: 0.8rem;
          letter-spacing: 1px;
        }

        .hero-scroll span {
          margin-bottom: 0.5rem;
        }

        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #ffffff, transparent);
        }

        /* ── Tablet / mobile ── */
        @media (max-width: 1024px) {
          .hero-section {
            height: auto;
            min-height: 100svh;
            overflow: visible;
            align-items: flex-start;
            padding: calc(5.75rem + env(safe-area-inset-top)) 0 2.75rem;
          }

          .hero-shell {
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            gap: 1.75rem;
            padding-left: 0;
            padding-right: 0;
          }

          .hero-copy,
          .hero-assistant {
            width: 100%;
            max-width: 100%;
          }

          .hero-assistant {
            flex: none;
            align-self: stretch;
          }

          .hero-scroll {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: calc(5.25rem + env(safe-area-inset-top)) 0 2.25rem;
          }

          .hero-shell.container {
            padding-left: max(1.25rem, env(safe-area-inset-left)) !important;
            padding-right: max(1.25rem, env(safe-area-inset-right)) !important;
          }

          .hero-greeting {
            font-size: 0.85rem;
            letter-spacing: 1.6px;
            margin-bottom: 0.75rem;
          }

          .hero-title,
          .hero-title--static {
            font-size: clamp(2.1rem, 11vw, 2.85rem) !important;
            line-height: 1.12 !important;
            margin: 0 0 0.85rem !important;
            letter-spacing: -0.01em;
            word-break: keep-all;
            overflow-wrap: normal;
          }

          .hero-role {
            font-size: 1.05rem;
            margin-bottom: 1.1rem;
          }

          .hero-summary {
            margin-bottom: 1.35rem;
          }

          .hero-summary p {
            font-size: 0.95rem;
            line-height: 1.65;
          }

          .hero-actions {
            gap: 0.9rem;
          }

          .hero-cta-row {
            flex-direction: column;
            gap: 0.7rem;
          }

          .hero-cta-row .btn {
            width: 100%;
            justify-content: center;
          }

          .hero-social-row {
            gap: 0.75rem;
          }

          .hero-social-button {
            width: 46px;
            height: 46px;
          }

          .hero-assistant-card {
            border-radius: 18px;
            padding: 1rem;
          }

          .hero-assistant-heading h3 {
            font-size: 1.2rem;
          }

          .hero-assistant-messages {
            max-height: 160px;
          }

          .assistant-chip {
            min-height: 40px;
            padding: 0.5rem 0.7rem;
            font-size: 0.75rem;
          }

          .hero-assistant-form {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-assistant-send {
            width: 100%;
          }
        }

        @media (max-width: 380px) {
          .hero-shell.container {
            padding-left: max(1rem, env(safe-area-inset-left)) !important;
            padding-right: max(1rem, env(safe-area-inset-right)) !important;
          }

          .hero-title,
          .hero-title--static {
            font-size: 1.95rem !important;
          }
        }

        @media (hover: none) and (pointer: coarse) {
          .hero-social-button:hover,
          .assistant-chip:hover {
            transform: none;
            box-shadow: none;
          }
        }
      `}</style>
    </section>
    </>
  );
};

export default Hero;
