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
import ProjectDetail from './sections/ProjectDetail';
import './index.css';

function App() {
  const params = new URLSearchParams(window.location.search);
  const projectTitle = params.get('projectDetail');
  if (projectTitle) {
    return <ProjectDetail />;
  }
  return (
    <div className="App">
      <ClickSpark sparkColor="#ffffff" sparkSize={6} sparkRadius={12} sparkCount={2} duration={220}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'auto', touchAction: 'pan-y' }}>
          <LiquidEther
            colors={['#ffffff', '#bdbdbd', '#7a7a7a']}
            mouseForce={6} /* reduced mouse influence */
            cursorSize={60} /* smaller cursor footprint */
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.2} /* slower auto motion */
            autoIntensity={0.8} /* gentler auto movement */
            takeoverDuration={0.6} /* smoother handover */
            autoResumeDelay={10000} /* avoid frequent auto re-takeovers */
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
