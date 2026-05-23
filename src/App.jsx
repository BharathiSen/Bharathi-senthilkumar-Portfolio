import Navbar from './components/Navbar';
import LiquidEther from './components/LiquidEther';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Writing from './sections/Writing';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import ClickSpark from './components/ClickSpark';
import './index.css';

function App() {
  return (
    <div className="App">
      <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'auto', touchAction: 'pan-y' }}>
          <LiquidEther
            colors={['#ffffff', '#bdbdbd', '#7a7a7a']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Writing />
            <Experience />
          </main>
          <Contact />
        </div>
      </ClickSpark>
    </div>
  );
}

export default App;
