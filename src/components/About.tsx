import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    gsap.fromTo(
      el.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="container section-padding" id="about">
      <div ref={textRef} className="about-grid">
        
        {/* Left Column: Portrait Image */}
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#111',
          aspectRatio: '1/1.1',
          border: '1px solid #222',
        }}>
          <img 
            src="/images/kashif.jpg" 
            alt="Kashif Muhammad" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
              transition: 'filter 0.5s ease, transform 0.5s ease',
            }}
            className="interactive"
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'grayscale(0%)';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(100%)';
              e.currentTarget.style.transform = 'scale(1.0)';
            }}
          />
        </div>

        {/* Right Column: About details, Skills & Education */}
        <div className="about-details-grid">
          
          {/* Bio Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="text-h2">About</h2>
            <p className="text-body" style={{ fontSize: '1.4rem', lineHeight: '1.4', color: 'var(--text-primary)' }}>
              With 5+ years of experience, I build scalable SaaS and enterprise applications used by millions. 
              I specialize in React, TypeScript, and integrating powerful AI workflows into commercial products.
            </p>
            <p className="text-body">
              I've led cross-functional remote teams, architected complex UI systems, and mentored engineers. 
              My focus is on delivering impactful platforms that improve velocity, consistency, and user experience.
            </p>
          </div>

          {/* Skills & Education */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <div>
              <h3 className="text-small" style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Skills</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="text-body">
                <li><strong>Frontend:</strong> React, React Native, Next.js, Vue.js, TypeScript</li>
                <li><strong>AI / ML:</strong> OpenAI API, Anthropic, Ollama, RAG, TTS</li>
                <li><strong>State:</strong> Redux Toolkit, Zustand, Vuex</li>
                <li><strong>Styling:</strong> Tailwind CSS, MUI, Chakra UI, SASS</li>
                <li><strong>Backend:</strong> Node.js, Express.js, Python</li>
              </ul>
            </div>

            <div>
              <h3 className="text-small" style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Education</h3>
              <div className="text-body">
                <p style={{ color: 'var(--text-primary)' }}>BS Software Engineering</p>
                <p>International Islamic University, Islamabad</p>
                <p className="text-small" style={{ marginTop: '0.4rem' }}>2017 – 2021</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
