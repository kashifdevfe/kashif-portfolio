import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, MessageSquare, Mic, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AIFocus = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll('.ai-card'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section className="container" ref={containerRef} style={{ padding: '8vh 0 4vh 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
        <Sparkles size={20} color="#f0f0f0" style={{ animation: 'pulse 2s infinite' }} />
        <span className="text-small" style={{ letterSpacing: '0.2em', color: '#fff' }}>AI & Intelligent Workflows Focus</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
      }}>
        
        {/* Card 1: Production LLMs */}
        <div className="ai-card" style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid #1c1c1c',
          padding: '2rem',
          borderRadius: '8px',
        }}>
          <Cpu size={32} color="#888" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Commercial LLM Pipelines</h3>
          <p className="text-body" style={{ fontSize: '0.95rem' }}>
            Production integrations of **OpenAI GPT-4o** and **Claude Sonnet** models. Experienced with Assistant APIs, Function Calling, and structured outputs for document intelligence.
          </p>
        </div>

        {/* Card 2: Local & Cost-Effective AI */}
        <div className="ai-card" style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid #1c1c1c',
          padding: '2rem',
          borderRadius: '8px',
        }}>
          <MessageSquare size={32} color="#888" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Local LLMs & Cost Control</h3>
          <p className="text-body" style={{ fontSize: '0.95rem' }}>
            Deployment of on-device LLMs using **Ollama** and custom RAG databases. Built offline automation features for UK fintech products, eliminating third-party API costs.
          </p>
        </div>

        {/* Card 3: Multimodal AI & Audio */}
        <div className="ai-card" style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid #1c1c1c',
          padding: '2rem',
          borderRadius: '8px',
        }}>
          <Mic size={32} color="#888" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Multimodal & Speech</h3>
          <p className="text-body" style={{ fontSize: '0.95rem' }}>
            Implementation of **Piper Text-to-Speech (TTS)**, real-time pose estimation, and speech-to-text systems integrated natively into reactive React / React Native applications.
          </p>
        </div>

      </div>
    </section>
  );
};
