import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Sparkles count={200} scale={10} size={2} speed={0.4} color="#ffffff" />
          </Suspense>
        </Canvas>
      </div>

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
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Bharathi <span className="text-gradient">Senthilkumar</span>
          </h1>
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
            “Building scalable backend systems, intelligent applications, and modern web experiences.”
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
          <a href="#contact" className="btn btn-outline">
            Contact Me <Mail size={18} />
          </a>
          <a href="#" className="btn btn-outline" style={{ padding: '0.75rem', borderRadius: '50%' }}>
            <FaGithub size={20} />
          </a>
          <a href="#" className="btn btn-outline" style={{ padding: '0.75rem', borderRadius: '50%' }}>
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
