import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete();
      },
    });

    // Animate first line in
    tl.fromTo(
      line1Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )
    // Animate second line in with stagger
    .fromTo(
      line2Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    // Hold for a moment
    .to({}, { duration: 0.6 })
    // Wipe the screen up
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        gap: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={line1Ref}
          style={{
            opacity: 0,
            color: '#f0f0f0',
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Let's build something great
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div
          ref={line2Ref}
          style={{
            opacity: 0,
            color: '#f0f0f0',
            fontSize: 'clamp(3rem, 9vw, 8rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Together.
        </div>
      </div>
    </div>
  );
};
