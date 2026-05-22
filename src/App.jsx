import Navbar from './components/Navbar';
import GridScan from './components/GridScan';
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
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#2f2f2f"
            gridScale={0.11}
            lineStyle="solid"
            lineJitter={0.08}
            scanColor="#ffffff"
            scanOpacity={0.22}
            enablePost
            bloomIntensity={0.15}
            bloomThreshold={0.1}
            bloomSmoothing={0.15}
            chromaticAberration={0.0015}
            noiseIntensity={0.008}
            scanDirection="pingpong"
            scanSoftness={2.2}
            scanGlow={0.45}
            scanDuration={2.2}
            scanDelay={1.8}
            style={{ width: '100%', height: '100%' }}
          />
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
