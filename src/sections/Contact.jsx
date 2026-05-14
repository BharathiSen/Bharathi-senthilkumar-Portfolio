import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

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
            style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem' }}
          >
            <a href="mailto:contact@example.com" className="contact-icon">
              <Mail size={24} />
            </a>
            <a href="#" className="contact-icon">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="contact-icon">
              <FaGithub size={24} />
            </a>
            <a href="#" className="contact-icon">
              <FaTwitter size={24} />
            </a>
          </motion.div>

          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)', marginBottom: '2rem' }}></div>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Designed & Built by Bharathi Senthilkumar &copy; {new Date().getFullYear()}
          </p>
        </div>

        <style>{`
          .contact-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: var(--bg-card);
            border: 1px solid var(--glass-border);
            border-radius: 50%;
            color: var(--text-primary);
            transition: all 0.3s ease;
          }
          
          .contact-icon:hover {
            color: #ffffff;
            border-color: #808080;
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </div>
    </section>
  );
};

export default Contact;
