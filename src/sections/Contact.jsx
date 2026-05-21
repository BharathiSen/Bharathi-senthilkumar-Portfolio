import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
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
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', marginRight: '0.75rem' }}>
              <a href="mailto:bharathis.ece2023@citchennai.net" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }} aria-label="Email">bharathis.ece2023@citchennai.net</a>
              <a href="tel:+917010687647" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }} aria-label="Phone">+91 70106 87647</a>
            </div>

            <a href="mailto:bharathis.ece2023@citchennai.net" className="contact-icon" aria-label="Email Bharathi" title="Email Bharathi">
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/bharathisenthilkumar28/" className="contact-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/BharathiSen/" className="contact-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub">
              <FaGithub size={24} />
            </a>
          </motion.div>

          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)', marginBottom: '2rem' }}></div>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Designed & Built by BHARATHI S &copy; {new Date().getFullYear()}
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
