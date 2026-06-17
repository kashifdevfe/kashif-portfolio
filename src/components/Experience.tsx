import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expData = [
  {
    role: "Lead Frontend Engineer",
    company: "Elastic Email",
    date: "Apr 2025 – Present",
    desc: [
      "Led a team of frontend engineers, owning sprint planning, architecture decisions, and code reviews.",
      "Designed and shipped a scalable React + TypeScript UI architecture supporting millions of monthly active users.",
      "Built production AI workflows integrating OpenAI, Anthropic, and Ollama to automate content generation."
    ]
  },
  {
    role: "Senior Frontend Engineer",
    company: "Xische & Co — Dubai Municipality",
    date: "May 2024 – Apr 2025",
    desc: [
      "Delivered a React + TypeScript frontend for a large-scale government digital-services platform.",
      "Integrated REST APIs for real-time dashboards; implemented Redux Toolkit for state management.",
      "Built AI-powered automation features using OpenAI APIs to intelligently classify citizen service requests."
    ]
  },
  {
    role: "Senior Frontend Engineer",
    company: "EarnFlex",
    date: "Mar 2023 – May 2024",
    desc: [
      "Built cross-platform applications in React, React Native, and Vue for a UK fintech product.",
      "Integrated Ollama and Text-to-Speech into core product features, delivering AI-driven automation.",
      "Standardised Redux and Vuex state management patterns, significantly improving maintainability."
    ]
  },
  {
    role: "Frontend Developer",
    company: "Horizon Digital",
    date: "Mar 2022 – Feb 2023",
    desc: [
      "Delivered web and mobile applications in React, React Native, Vue, and Flutter for enterprise clients.",
      "Built WCAG 2.1-compliant, fully responsive UI components adopted as the base design system.",
      "Automated document-processing workflows using OpenAI APIs."
    ]
  },
  {
    role: "React Developer",
    company: "TechXperts",
    date: "Feb 2021 – Mar 2022",
    desc: [
      "Developed React + Redux frontend applications for diverse clients across e-commerce and logistics.",
      "Optimised rendering performance via code-splitting and lazy loading."
    ]
  }
];

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.exp-item');
      
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="container section-padding" id="experience" ref={containerRef}>
      <h2 className="text-h2" style={{ marginBottom: '4rem' }}>Experience</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {expData.map((job, idx) => (
          <div key={idx} className="exp-item interactive" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            gap: '2rem',
            borderTop: '1px solid #222',
            paddingTop: '2rem'
          }}>
            <div>
              <p className="text-small">{job.date}</p>
            </div>
            <div>
              <h3 className="text-h3" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{job.role}</h3>
              <p className="text-body" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 500 }}>{job.company}</p>
              <ul className="text-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'square', paddingLeft: '1.5rem' }}>
                {job.desc.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
