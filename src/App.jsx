import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import ClickSpark from './components/ClickSpark';
import CommandBar from './components/CommandBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Writing from './sections/Writing';
import Experience from './sections/Experience';
import Credentials from './sections/Credentials';
import Ask from './sections/Ask';
import Contact from './sections/Contact';
import ProjectDetail from './sections/ProjectDetail';
import './index.css';

function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Carries text into the palette. The incrementing id makes each call
  // distinct, so an already-open palette still reacts.
  const [request, setRequest] = useState({ id: 0, text: '', send: false });

  // Hands off whatever was typed before focus moved into the palette.
  const openAssistant = useCallback((seed = '') => {
    const text = typeof seed === 'string' ? seed : '';
    setRequest((r) => ({ id: r.id + 1, text, send: false }));
    setAssistantOpen(true);
  }, []);

  // A suggested question should arrive answered, not merely typed out.
  const askAssistant = useCallback((question) => {
    setRequest((r) => ({ id: r.id + 1, text: question, send: true }));
    setAssistantOpen(true);
  }, []);

  const closeAssistant = useCallback(() => setAssistantOpen(false), []);

  // Deep-link route kept so previously shared ?projectDetail= URLs still resolve.
  const projectTitle = new URLSearchParams(window.location.search).get(
    'projectDetail',
  );
  if (projectTitle) {
    return <ProjectDetail />;
  }

  return (
    // CSS `prefers-reduced-motion` cannot reach Framer Motion - its animations
    // are JS-driven, not CSS. MotionConfig is what actually honours the setting.
    <MotionConfig reducedMotion="user">
      <ClickSpark
        sparkColor="#ffffff"
        sparkSize={6}
        sparkRadius={12}
        sparkCount={2}
        duration={220}
      >
        <a className="skip-link" href="#projects">
          Skip to work
        </a>

        <Navbar />

        <main id="main">
          <Hero onAskAssistant={openAssistant} />
          <About />
          <Skills />
          <Projects />
          <Ask onOpen={openAssistant} onAsk={askAssistant} />
          <Writing />
          <Experience />
          <Credentials />
        </main>

        <Contact />

        <CommandBar
          open={assistantOpen}
          request={request}
          onOpen={openAssistant}
          onClose={closeAssistant}
        />
      </ClickSpark>
    </MotionConfig>
  );
}

export default App;
