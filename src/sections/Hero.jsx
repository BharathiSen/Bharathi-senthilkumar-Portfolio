import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import LiquidEther from '../components/LiquidEther';
import { portfolioData } from '../data/portfolioData';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];

// One orchestrated entrance for the whole hero, rather than fifteen
// independent fades. Children inherit the timeline.
const stage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const Hero = ({ onAskAssistant }) => {
  const hero = portfolioData.hero;
  const social = portfolioData.socialLinks;
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="hero">
      {/* Fluid field is confined to the hero — it no longer runs behind the
          whole document, and it no longer eats pointer events page-wide.
          Skipped entirely under reduced motion: it is a continuous WebGL
          simulation, so not rendering it is the only real way to stop it. */}
      <div className="hero-field" aria-hidden="true">
        {!reduceMotion && (
          <LiquidEther
            colors={['#ffffff', '#bdbdbd', '#6e6e6e']}
            mouseForce={6}
            cursorSize={60}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.2}
            autoIntensity={0.8}
            takeoverDuration={0.6}
            autoResumeDelay={10000}
            autoRampDuration={0.6}
            style={{ position: 'absolute', inset: 0 }}
          />
        )}
        <div className="hero-field-veil" />
      </div>

      <motion.div
        className="shell hero-inner"
        variants={stage}
        initial="hidden"
        animate="show"
      >
        {/* ── identity strip ── */}
        <motion.div className="hero-strip" variants={rise}>
          <span>Bharathi S</span>
          <span className="hero-strip-mid">{hero.location}</span>
          <span className="hero-strip-status">
            <i aria-hidden="true" />
            {hero.availability}
          </span>
        </motion.div>

        {/* ── the name ── */}
        <motion.h1 className="hero-name" variants={rise}>
          {hero.name}
        </motion.h1>

        {/* ── asymmetric role / summary ── */}
        <motion.div className="hero-say" variants={rise}>
          <p className="hero-role">{hero.title}</p>
          <p className="hero-summary">{hero.summary}</p>
        </motion.div>

        {/* ── actions ── */}
        <motion.div className="hero-actions" variants={rise}>
          <a href={hero.buttons.primary.href} className="btn btn-primary">
            {hero.buttons.primary.label}
            <ArrowRight size={16} />
          </a>
          {/* Opens the PDF in a new tab rather than downloading it — a
              recruiter skims first and saves later. The palette still
              carries an explicit "Download résumé" command. */}
          <a
            href={hero.buttons.resume.href}
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {hero.buttons.resume.label}
            <ArrowUpRight size={16} />
          </a>
          <button type="button" className="btn" onClick={onAskAssistant}>
            Ask BharathiGPT
          </button>

          <span className="hero-actions-sep" aria-hidden="true" />

          <a
            href={social.github.href}
            className="hero-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.github.ariaLabel}
          >
            <FaGithub size={17} />
          </a>
          <a
            href={social.linkedin.href}
            className="hero-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.linkedin.ariaLabel}
          >
            <FaLinkedin size={17} />
          </a>
        </motion.div>

        {/* ── measured facts, not adjectives ── */}
        <motion.dl className="hero-stats" variants={rise}>
          {hero.stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
};

export default Hero;
