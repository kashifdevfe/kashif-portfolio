import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "01",
    title: "PZAZ",
    category: "Production Studio Management System",
    tech: "TypeScript, GSAP, Node.js, Custom Scheduling Engines",
    image: "/images/pzaz.png",
  },
  {
    id: "02",
    title: "Dubai Municipality Project",
    category: "Import and Export Dashboard for Food & Pets",
    tech: "TypeScript, Redux Toolkit, OpenAI APIs, MUI, Ant Design",
    image: "/images/dubaimunicipality.png",
  },
  {
    id: "03",
    title: "Elastic Email",
    category: "High-Volume Email Marketing SaaS",
    tech: "TypeScript, Node.js, Express, Anthropic & OpenAI API integrations",
    image: "/images/elasticemail.png",
  },
  {
    id: "04",
    title: "EarnFlex",
    category: "Workforce Management & Guard Patrol System",
    tech: "Vue, Node.js, Express, Piper TTS, Local Ollama",
    image: "/images/earnflex.png",
  },
  {
    id: "05",
    title: "Vertech",
    category: "Big Machinery Data Management & Telemetry System",
    tech: "TypeScript, Python, IoT Data Visualization, D3.js",
    image: "/images/vertech.png",
  },
  {
    id: "06",
    title: "Driverly",
    category: "Uber-like Real-time Ride-Hailing Application",
    tech: "Node.js, Socket.io, MapBox, GPS Tracking APIs",
    image: "/images/driverly.png",
  }
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="container section-padding" id="works" ref={sectionRef}>
      <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Selected Projects</h2>
      <p className="text-body" style={{ marginBottom: '4rem', maxWidth: '600px' }}>
        A showcase of enterprise-grade and SaaS applications built end-to-end, optimizing scalability, UI design, and user experience.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2.5rem',
      }}>
        {projectsData.map((project, idx) => (
          <div 
            key={idx} 
            className="project-card interactive"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#0d0d0d',
              border: '1px solid #1a1a1a',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#333';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1a1a1a';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{
              width: '100%',
              height: '240px',
              overflow: 'hidden',
              backgroundColor: '#111',
              position: 'relative'
            }}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1.0)';
                }}
              />
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span className="text-small" style={{ opacity: 0.5 }}>{project.id}</span>
                <span className="text-small" style={{ fontSize: '0.75rem', color: '#888' }}>{project.tech.split(',')[0]}</span>
              </div>
              <h3 className="text-h3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {project.title}
              </h3>
              <p className="text-body" style={{ fontSize: '0.95rem', marginBottom: '1rem', flexGrow: 1 }}>
                {project.category}
              </p>
              <div style={{
                borderTop: '1px solid #1a1a1a',
                paddingTop: '0.8rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
                <strong>Stack:</strong> {project.tech}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
