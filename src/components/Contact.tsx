import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.children,
      { opacity: 0, y: 50 },
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
    <footer ref={sectionRef} className="container" id="contact" style={{ padding: '15vh 5vw 5vh 5vw', textAlign: 'center' }}>
      <h2 className="text-huge" style={{ marginBottom: '2rem' }}>Let's Talk</h2>
      <p className="text-body" style={{ marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
        Currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '4rem' }}>
        <a href="mailto:kashif.devfe@gmail.com" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaEnvelope size={24} />
          <span>Email</span>
        </a>
        <a href="https://linkedin.com/in/kashifse" target="_blank" rel="noreferrer" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaLinkedin size={24} />
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/kashifdevfe" target="_blank" rel="noreferrer" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaGithub size={24} />
          <span>GitHub</span>
        </a>
      </div>

      <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <p className="text-small">© {new Date().getFullYear()} Kashif Muhammad.</p>
        <p className="text-small">Based in Islamabad, Pakistan.</p>
      </div>
    </footer>
  );
};
