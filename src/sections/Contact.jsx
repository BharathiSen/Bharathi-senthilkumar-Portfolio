import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import './Contact.css';

const EASE = [0.22, 1, 0.36, 1];

const Contact = () => {
  const contact = portfolioData.contact;
  const social = portfolioData.socialLinks;

  const channels = [
    { label: 'Email', value: contact.email, href: contact.emailComposeUrl },
    { label: 'GitHub', value: social.github.handle, href: social.github.href },
    { label: 'LinkedIn', value: social.linkedin.handle, href: social.linkedin.href },
  ];

  return (
    <footer id="contact" className="section contact">
      <div className="shell">
        <motion.div
          className="ct-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="sec-index">07 / Contact</span>

          <h2 className="ct-headline">
            Let’s build
            <br />
            something durable.
          </h2>

          <p className="ct-intro">{contact.intro}</p>
        </motion.div>

        <motion.ul
          className="ct-channels"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
        >
          {channels.map((channel) => (
            <li key={channel.label}>
              <a href={channel.href} target="_blank" rel="noopener noreferrer">
                <span className="ct-ch-label">{channel.label}</span>
                <span className="ct-ch-value">{channel.value}</span>
                <ArrowUpRight size={16} />
              </a>
            </li>
          ))}
        </motion.ul>

        <div className="ct-foot">
          <span>
            {contact.footer} · {new Date().getFullYear()}
          </span>
          <span className="ct-foot-right">
            {contact.location} · Open to 2027 roles
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
