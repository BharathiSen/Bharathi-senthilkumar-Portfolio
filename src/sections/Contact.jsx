import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const contactContent = portfolioData.contact;
  const socialLinks = portfolioData.socialLinks;

  return (
    <section id="contact" className="section" style={{ paddingBottom: '2rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}
          >
            {contactContent.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}
          >
            <a href={contactContent.emailComposeUrl} className="contact-icon" target="_blank" rel="noopener noreferrer" aria-label="Email Bharathi" title="Email Bharathi">
              <Mail size={24} />
            </a>
            <a href={socialLinks.linkedin.href} className="contact-icon" target="_blank" rel="noopener noreferrer" aria-label={socialLinks.linkedin.ariaLabel} title={socialLinks.linkedin.title}>
              <FaLinkedin size={24} />
            </a>
            <a href={socialLinks.github.href} className="contact-icon" target="_blank" rel="noopener noreferrer" aria-label={socialLinks.github.ariaLabel} title={socialLinks.github.title}>
              <FaGithub size={24} />
            </a>
          </motion.div>

          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)', marginBottom: '2rem' }}></div>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {contactContent.footer} &copy; {new Date().getFullYear()}
          </p>
        </div>

        <style>{`
          .contact-icon {
            display: flex;
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
          }

          .contact-icon:focus-visible {
            outline: 2px solid var(--accent-grey);
            outline-offset: 4px;
          }
          
          .contact-icon:hover {
            color: #ffffff;
            border-color: var(--accent-grey);
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-6px);
            box-shadow: 0 8px 18px rgba(255, 255, 255, 0.06);
          }
        `}</style>
      </div>
    </section>
  );
};

export default Contact;
