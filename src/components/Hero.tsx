import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader

    tl.fromTo(
      [textRef1.current, textRef2.current],
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out' }
    ).fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <h1 ref={textRef1} className="text-huge">
          Kashif
        </h1>
      </div>
      <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
        <h1 ref={textRef2} className="text-huge" style={{ color: 'var(--text-secondary)' }}>
          Muhammad
        </h1>
      </div>
      
      <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
        <p ref={subRef} className="text-body">
          Senior Frontend Engineer crafting scalable SaaS & enterprise applications. 
          Specializing in React, Next.js, and integrating production-grade AI pipelines.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: '5%', left: '5vw' }}>
        <p className="text-small">SCROLL TO EXPLORE</p>
      </div>
    </section>
  );
};
