import { motion } from 'framer-motion';
import SectionHead from '../components/SectionHead';
import { portfolioData } from '../data/portfolioData';
import './About.css';

const EASE = [0.22, 1, 0.36, 1];

const About = () => {
  const about = portfolioData.about;
  const education = portfolioData.education;

  const facts = [
    ['Degree', education.degree],
    ['Institution', education.school],
    ['Period', education.period],
    ['CGPA', education.cgpa],
    ['Based in', about.quickFacts.location],
    ['Focus', about.quickFacts.currentInterest],
  ];

  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHead
          index="01 / About"
          title="Where the work comes from"
          meta="Chennai, India"
        />

        <div className="ab-grid">
          <motion.div
            className="ab-prose"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {about.paragraphs.map((paragraph, i) => (
              <p key={paragraph} data-lead={i === 0 ? 'true' : 'false'}>
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.figure
            className="ab-portrait"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <img src={about.image.src} alt={about.image.alt} loading="lazy" />
            <figcaption>{about.name}</figcaption>
          </motion.figure>
        </div>

        <motion.dl
          className="ab-facts"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        >
          {facts.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default About;
