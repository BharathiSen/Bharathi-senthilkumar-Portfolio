import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import ClickSpark from './components/ClickSpark';
import './index.css';

function App() {
  return (
    <div className="App">
      <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>
              <Environment preset="city" />
              <Sparkles count={200} scale={10} size={2} speed={0.4} color="#ffffff" />
            </Suspense>
          </Canvas>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
          </main>
          <Contact />
        </div>
      </ClickSpark>
    </div>
  );
}

export default App;
