import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function TheUntouched({ containerRef }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Sync state maxScroll to ref to prevent scroll event listener closure capture bugs
  const maxScrollRef = useRef(0);
  useEffect(() => {
    maxScrollRef.current = maxScroll;
  }, [maxScroll]);

  // Manual scroll progress tracker to prevent container offset tracking bugs in Framer Motion
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const wWidth = window.innerWidth;
        setWindowWidth(wWidth);
        setMaxScroll(Math.max(0, trackWidth - wWidth));
        setIsReady(true);
      }
    };
    
    // Run calculation initially
    handleResize();
    // Allow DOM layout to settle and run again for precision
    const timer = setTimeout(handleResize, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current || (typeof document !== 'undefined' ? document.querySelector('.main-screen') : null);
    if (!container || isMobile) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const section = sectionRef.current;
      if (!section) return;

      // Dynamically measure track width and update maxScroll state to avoid any mount layout race conditions
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const wWidth = window.innerWidth;
        const currentMaxScroll = Math.max(0, trackWidth - wWidth);
        if (currentMaxScroll !== maxScrollRef.current) {
          setMaxScroll(currentMaxScroll);
        }
      }

      // Progress is calculated relative to the actual TheUntouched section's offsets
      const startOffset = section.offsetTop;
      const endOffset = startOffset + section.offsetHeight - container.clientHeight;
      const travel = endOffset - startOffset;

      if (travel > 0) {
        const p = Math.max(0, Math.min(1, (scrollTop - startOffset) / travel));
        scrollProgress.set(p);
      }
    };

    container.addEventListener('scroll', handleScroll);
    // Run once on mount to establish initial progress state
    handleScroll();

    window.addEventListener('resize', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef, isMobile, scrollProgress]);

  // Tightly synchronized spring to prevent runaway drift or lag, allowing instant freeze
  const springProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Split progress: cards use 0–0.82 (890vh/1090vh), overlay uses 0.82–1.0
  const cardProgress = useTransform(springProgress, [0, 0.82, 1], [0, 1, 1]);

  // Calculate the starting position so the entire card track starts completely off-screen to the right (100% hidden)
  const startX = windowWidth;

  // Custom transform function ensures the linear mapping dynamically adapts as maxScroll updates
  const trackX = useTransform(cardProgress, (p) => startX - p * (startX + maxScroll));

  // Overlay rises from bottom: translateY goes from 100% (off-screen bottom) to 0% (full cover)
  const overlayY = useTransform(springProgress, [0.78, 0.92], [100, 0]);
  const overlayTranslateY = useTransform(overlayY, (v) => `${v}%`);

  // Text appears only after overlay has mostly risen (progress 0.88–1.0)
  const solutionText = "What if the patient never had to wear the sensor?";
  const solutionLetters = solutionText.split('');
  const totalLetters = solutionLetters.length;

  // Single scroll-driven progress for text reveal (0 at 0.88, 1 at 1.0)
  const textRevealProgress = useTransform(springProgress, [0.88, 1.0], [0, 1]);

  // Sync MotionValue to React state for per-letter style calculations during render
  const [textProgress, setTextProgress] = useState(0);
  useEffect(() => {
    const unsubscribe = textRevealProgress.on('change', setTextProgress);
    return unsubscribe;
  }, [textRevealProgress]);

  // Helper: compute per-letter opacity and y based on textProgress value
  const getLetterStyle = (progress, letterIndex) => {
    // Stagger: each letter starts slightly after the previous one
    const staggered = progress * totalLetters - letterIndex;
    const t = Math.max(0, Math.min(1, staggered * 0.8));
    return {
      opacity: t,
      transform: `translateY(${(1 - t) * 40}px)`,
    };
  };

  // Clinical Photos
  const cards = [
    {
      title: "Burn Patients",
      desc: "Patients with severe burns have highly compromised, exposed skin tissue that cannot tolerate any adhesive sensors, leaving clinicians unable to monitor vitals continuously without causing infection or pain.",
      image: "/images/burn_patient.png"
    },
    {
      title: "Infectious Isolation",
      desc: "Quarantined patients with highly contagious pathogens require frequent vital checks, but physically entering isolation rooms to attach or adjust wearable sensors increases cross-contamination risk for healthcare staff.",
      image: "/images/covid_patient.png"
    },
    {
      title: "NICU Infants",
      desc: "Premature newborns in the NICU require constant respiration tracking, but medical adhesives on traditional sensors peel off and tear their extremely fragile skin, preventing safe continuous monitoring.",
      image: "/images/newborn.png" 
    },
    {
      title: "Psychiatric Care",
      desc: "Patients in acute psychiatric crisis need continuous monitoring for sleep and anxiety markers, but standard wearable devices with wires, bands, or hard parts present severe self-harm and safety risks in clinical environments.",
      image: "/images/mental_health.png"
    },
    {
      title: "Sleep Medicine",
      desc: "Individuals undergoing diagnostic sleep studies must be monitored for sleep apnea and restlessness, but bulky wired headbands and chest straps disrupt natural sleep cycles, leading to inaccurate diagnostic data.",
      image: "/images/sleep_monitoring.png"
    }
  ];

  return (
    <div className="untouched-section" ref={sectionRef}>
      <style>{`
        .untouched-section {
          position: relative;
          background-color: #0A1418;
          width: 100%;
          /* 1090vh: 890vh for cards + 200vh for solution overlay scroll phase */
          height: 1090vh;
          box-sizing: border-box;
          flex-shrink: 0;
        }
        
        .untouched-sticky-container {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 6rem 0;
          z-index: 10;
        }

        .untouched-header {
          text-align: center;
          position: relative;
          z-index: 20;
          padding: 0 2rem;
        }

        .untouched-label {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #8A9F9B; /* Premium muted blue-gray/teal */
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          display: block;
        }

        .untouched-subheading {
          font-size: clamp(1.2rem, 3.5vw, 2.25rem);
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        /* Marquee Background */
        .untouched-marquee-bg {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          pointer-events: none;
          user-select: none;
          z-index: 5;
          overflow: hidden;
          white-space: nowrap;
          opacity: 0.15;
        }

        .untouched-marquee-track {
          display: flex;
          width: max-content;
          animation: untouchedMarqueeAnimation 28s linear infinite;
          will-change: transform;
        }

        .untouched-marquee-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 900;
          font-size: 14vw;
          text-transform: uppercase;
          color: #E8F4F2;
          letter-spacing: 0.02em;
          white-space: nowrap;
          padding-right: 2rem;
        }

        @keyframes untouchedMarqueeAnimation {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        /* Foreground Cards Viewport */
        .untouched-cards-viewport {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          z-index: 15;
          display: flex;
          align-items: center;
          overflow: visible;
        }

        .untouched-cards-track {
          display: flex;
          gap: 40px;
          padding: 0 10vw; /* 10vw padding on left and right for beautiful start/end offset alignment */
          will-change: transform;
        }

        .untouched-card {
          width: 340px;
          height: 380px;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          background-color: #0b1418;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .untouched-card:hover {
          transform: scale(1.03) translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }

        .untouched-card-image {
          width: 100%;
          height: 220px;
          background-size: cover;
          background-position: center;
          flex-shrink: 0;
        }

        .untouched-card-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 1.25rem 1.5rem;
          box-sizing: border-box;
          background-color: #0d1a20;
          overflow: hidden;
        }

        .untouched-card-title {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #E8F4F2;
        }

        .untouched-card-desc {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.85rem;
          color: #8A9F9B;
          margin: 0;
          line-height: 1.45;
        }

        /* Solution Statement Full-Screen Overlay */
        .solution-overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #0A1418;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          will-change: transform;
        }

        .solution-overlay-text {
          max-width: 80vw;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .solution-letter {
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          color: #E8F4F2;
          line-height: 1.2;
          display: inline-block;
          will-change: transform, opacity;
        }

        /* Responsive Mobile Layout */
        @media (max-width: 768px) {
          .untouched-section {
            height: auto !important;
            padding: 4rem 0;
          }

          .untouched-sticky-container {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            padding: 0 !important;
          }

          .untouched-marquee-bg {
            position: relative !important;
            top: auto !important;
            transform: none !important;
            margin: 2rem 0;
          }

          .untouched-marquee-text {
            font-size: 18vw;
          }

          .untouched-cards-viewport {
            position: relative !important;
            top: auto !important;
            transform: none !important;
            overflow-x: auto !important;
            display: flex !important;
            width: 100% !important;
            scroll-snap-type: x mandatory !important;
            padding: 2rem 1.5rem !important;
            box-sizing: border-box !important;
            scrollbar-width: none;
          }

          .untouched-cards-viewport::-webkit-scrollbar {
            display: none;
          }

          .untouched-cards-track {
            padding: 0 !important;
            transform: none !important;
            gap: 20px !important;
          }

          .untouched-card {
            scroll-snap-align: center !important;
            width: 80vw !important;
            max-width: 300px !important;
            height: 380px !important;
          }
        }
      `}</style>

      <div className="untouched-sticky-container">
        {/* Top Header Labels */}
        <div className="untouched-header">
          <span className="untouched-label">THE UNTOUCHED</span>
          <h2 className="untouched-subheading">The patients traditional sensors leave behind.</h2>
        </div>

        {/* Scrolling Marquee in Background */}
        <div className="untouched-marquee-bg">
          <div className="untouched-marquee-track">
            <span className="untouched-marquee-text">THE UNTOUCHED · THE UNTOUCHED · THE UNTOUCHED · </span>
            <span className="untouched-marquee-text">THE UNTOUCHED · THE UNTOUCHED · THE UNTOUCHED · </span>
          </div>
        </div>

        {/* Foreground Cards Viewport */}
        <div className="untouched-cards-viewport">
          <motion.div 
            className="untouched-cards-track"
            ref={trackRef}
            style={{ 
              x: isMobile ? "0px" : trackX,
              opacity: isMobile ? 1 : isReady ? 1 : 0
            }}
          >
            {cards.map((card, idx) => (
              <div 
                key={idx} 
                className="untouched-card"
              >
                <div 
                  className="untouched-card-image" 
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="untouched-card-content">
                  <h3 className="untouched-card-title">{card.title}</h3>
                  <p className="untouched-card-desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Layout Spacer */}
        <div style={{ height: '2rem' }}></div>

        {/* Solution Statement Overlay — rises from bottom, scroll-driven */}
        <motion.div
          className="solution-overlay"
          style={{ y: overlayTranslateY }}
        >
          <div className="solution-overlay-text">
            {solutionLetters.map((letter, i) => (
              <span
                key={i}
                className="solution-letter"
                style={getLetterStyle(textProgress, i)}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
