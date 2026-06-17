import { useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { AIFocus } from './components/AIFocus';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <ReactLenis root>
      <div className="app-wrapper">
        <CustomCursor />
        
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

        <main style={{ visibility: preloaderDone ? 'visible' : 'hidden' }}>
          <Hero />
          <AIFocus />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
