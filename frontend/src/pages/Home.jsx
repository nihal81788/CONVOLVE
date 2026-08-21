import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldAlert, 
  EyeOff, 
  CircleDollarSign, 
  Wifi, 
  Cpu, 
  Activity, 
  Sparkles,
  Baby,
  BrainCircuit,
  HeartPulse
} from 'lucide-react';
import Logo, { DNAHelixDouble } from '../Logo';

export default function Home() {
  const navigate = useNavigate();

  // Scroll targets for Framer Motion
  const heroContainerRef = useRef(null);
  const unwrapContainerRef = useRef(null);
  const featuresContainerRef = useRef(null);

  // Section 1: Hero Scroll Linkages
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"]
  });

  const bgScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const bgPosition = useTransform(heroProgress, [0, 1], ["40% 40%", "60% 60%"]);
  
  // Fade out hero text
  const heroContentOpacity = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const heroContentY = useTransform(heroProgress, [0, 0.4], [0, -30]);

  // Fade in new subtext
  const newSubOpacity = useTransform(heroProgress, [0.5, 0.85], [0, 1]);
  const newSubY = useTransform(heroProgress, [0.5, 0.85], [30, 0]);

  // Section 2: Unwrap Scroll Linkages
  const { scrollYProgress: unwrapProgress } = useScroll({
    target: unwrapContainerRef,
    offset: ["start start", "end start"]
  });

  const cardWidth = useTransform(unwrapProgress, [0, 0.85], ["100vw", "80vw"]);
  const cardHeight = useTransform(unwrapProgress, [0, 0.85], ["100vh", "65vh"]);
  const cardBorderRadius = useTransform(unwrapProgress, [0, 0.85], ["0px", "24px"]);
  const cardOpacity = useTransform(unwrapProgress, [0, 0.25], [0.8, 1]);

  // Section 3: Features Horizontal Scroll Linkages
  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresContainerRef,
    offset: ["start start", "end start"]
  });

  const xTranslation = useTransform(featuresProgress, [0.05, 0.95], ["0%", "-60%"]);

  return (
    <div className="page-container animate-fade-in" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Header / Navbar */}
      <motion.header 
        style={{ 
          padding: '1.5rem 2rem', 
          background: 'transparent', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0,
          zIndex: 100,
          opacity: heroContentOpacity
        }}
      >
        <Logo size="small" />
      </motion.header>

      {/* SECTION 1 — Pinned, scroll-reactive hero */}
      <div className="scroll-container-hero" ref={heroContainerRef}>
        <div className="sticky-hero-frame">
          <motion.div 
            className="landing-hero"
            style={{ 
              scale: bgScale,
              backgroundPosition: bgPosition,
              position: 'absolute',
              inset: 0,
              zIndex: 1
            }}
          />

          {/* Fade-out original hero content */}
          <motion.div 
            style={{ 
              zIndex: 2, 
              opacity: heroContentOpacity, 
              y: heroContentY,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'auto'
            }}
          >
            <Logo size="large" />
            <h1 className="hero-tagline">
              Contactless Patient Monitoring<br />
              <span className="text-green-gradient">Powered by Ambient Wi-Fi Signals</span>
            </h1>
            <p className="hero-pitch">
              Track breathing rate, sleep stages, and physiological agitation without a single wearable, electrode, or camera. Safe, private, and completely non-invasive.
            </p>
            <div className="cta-group">
              <button 
                className="btn btn-primary" 
                style={{ padding: '1rem 2.25rem', fontSize: '1.1rem', fontWeight: '700' }}
                onClick={() => navigate('/login')}
              >
                See It In Action
              </button>
            </div>
          </motion.div>

          {/* Fade-in second message */}
          <motion.div 
            style={{ 
              zIndex: 3, 
              opacity: newSubOpacity, 
              y: newSubY,
              position: 'absolute',
              maxWidth: '800px',
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', lineHeight: 1.2 }}>
              A contactless system your patients<br />
              <span className="text-green-gradient">never have to touch.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2 — Image "unwrap" into isolated illustration */}
      <div className="scroll-container-unwrap" ref={unwrapContainerRef}>
        <div className="sticky-unwrap-frame">
          <motion.div 
            className="unwrap-card"
            style={{ 
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardBorderRadius,
              opacity: cardOpacity
            }}
          >
            <div style={{ transform: 'scale(3.2)', marginBottom: '3rem', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DNAHelixDouble className="logo-helix" />
            </div>
            
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: '800', marginBottom: '1rem' }}>
              One Raspberry Pi. Zero contact.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              Continuous breathing monitoring powered by ambient signal processing.
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 3 — Horizontal-scrolling feature cards */}
      <div className="scroll-container-features" ref={featuresContainerRef}>
        <div className="sticky-features-frame">
          <div style={{ padding: '0 15vw 1.5rem' }}>
            <span className="metric-status-badge status-badge-success" style={{ marginBottom: '0.5rem' }}>
              Core Capabilities
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Advanced Telemetry Vectors</h2>
          </div>
          
          <motion.div className="horizontal-features-track" style={{ x: xTranslation }}>
            <div className="feature-story-card">
              <div className="feature-story-card-top">
                <h3>Breathing Detection</h3>
                <p>
                  Extracts high-resolution Channel State Information (CSI) subcarriers to track chest-wall displacements down to the millimeter. Converts raw phase variance into real-time respiratory wave streams.
                </p>
              </div>
              <div className="feature-story-number">01</div>
            </div>

            <div className="feature-story-card">
              <div className="feature-story-card-top">
                <h3>Sleep Stage Analysis</h3>
                <p>
                  A lightweight artificial neural network classifies sleep architecture (Deep, Light, REM, Awake) in real-time, mapping circadian patterns without wire contact.
                </p>
                {/* Metaphorical pulsing orb */}
                <div className="breathing-orb-container">
                  <div className="breathing-orb"></div>
                </div>
              </div>
              <div className="feature-story-number">02</div>
            </div>

            <div className="feature-story-card">
              <div className="feature-story-card-top">
                <h3>Motion & Agitation Alerts</h3>
                <p>
                  Continuous anomaly filters flag sudden fluctuations in CSI amplitude, alerting nurses to critical restlessness, seizure-like activity, or bed exit attempts.
                </p>
              </div>
              <div className="feature-story-number">03</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Problem Section */}
      <section className="landing-section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="section-header">
          <span className="metric-status-badge status-badge-danger" style={{ marginBottom: '1rem' }}>
            The Medical Gap
          </span>
          <h2 className="section-title">Why Traditional Monitoring Fails</h2>
          <p className="section-subtitle">
            Existing methods are intrusive, costly, or increase safety risk in challenging patient settings.
          </p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <ShieldAlert size={20} />
            </div>
            <h3>Invasive Wearables</h3>
            <p>Stickers and bands cause skin tear in neonates and agitation in psychiatric patients. They are frequently ripped off or misplaced.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <EyeOff size={20} />
            </div>
            <h3>Camera Privacy Concerns</h3>
            <p>Optical cameras compromise patient dignity and patient privacy, especially in psychiatric units and private recovery bedrooms.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <CircleDollarSign size={20} />
            </div>
            <h3>Prohibitive Costs</h3>
            <p>Continuous monitoring beds are expensive to kit out with dedicated medical radar or specialized pressure mats.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <ShieldAlert size={20} />
            </div>
            <h3>Infection Transmission</h3>
            <p>Physical wires and sensor pads require meticulous sterilization, creating high contamination risks in infectious quarantine wards.</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="landing-section" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-header">
          <span className="metric-status-badge status-badge-success" style={{ marginBottom: '1rem' }}>
            Our Technology
          </span>
          <h2 className="section-title">How Convolve Works</h2>
          <p className="section-subtitle">
            Harnessing Wi-Fi Channel State Information (CSI) and AI to decode chest wall micro-movements.
          </p>
        </div>

        <div className="solution-flow">
          <div className="flow-step">
            <div className="flow-step-icon">
              <Wifi size={24} />
            </div>
            <h3>1. Ambient Wi-Fi</h3>
            <p>Standard Wi-Fi signal waves propagate through the patient's room.</p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="flow-step-icon">
              <Activity size={24} />
            </div>
            <h3>2. CSI Extraction</h3>
            <p>Breathing motions perturb waves. A Raspberry Pi extracts raw CSI signal data.</p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="flow-step-icon">
              <Cpu size={24} />
            </div>
            <h3>3. Neural Network</h3>
            <p>A lightweight ANN removes environmental noise and extracts breathing waveforms.</p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="flow-step-icon">
              <Sparkles size={24} />
            </div>
            <h3>4. Live Metrics</h3>
            <p>Real-time respiration rate, sleep hypnograms, and agitation warnings.</p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="landing-section">
        <div className="section-header">
          <h2 className="section-title">Target Clinical Environments</h2>
          <p className="section-subtitle">
            Designed for environments where physical sensors are impractical, unsafe, or medically risky.
          </p>
        </div>

        <div className="use-cases-grid">
          <div className="use-case-card">
            <div className="use-case-image" style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(27, 94, 58, 0.15) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Baby size={64} style={{ color: 'var(--color-forest)' }} />
              <span className="use-case-badge">Neonatal Care</span>
            </div>
            <div className="use-case-body">
              <h3>Newborn & NICU Monitoring</h3>
              <p>Protects extremely fragile skin of premature infants. Monitors respiration rates in incubators continuously without sticky electrodes or annoying tangling wires.</p>
            </div>
          </div>

          <div className="use-case-card">
            <div className="use-case-image" style={{ background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(27, 94, 58, 0.15) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BrainCircuit size={64} style={{ color: 'var(--color-forest)' }} />
              <span className="use-case-badge">Psychiatric Units</span>
            </div>
            <div className="use-case-body">
              <h3>Mentally Agitated Patients</h3>
              <p>Provides critical physiological telemetry for unstable, manic, or combative patients without any wearable cables that can be ingested or used for self-harm.</p>
            </div>
          </div>

          <div className="use-case-card">
            <div className="use-case-image" style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15) 0%, rgba(46, 204, 113, 0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartPulse size={64} style={{ color: 'var(--color-forest)' }} />
              <span className="use-case-badge">Infectious Wards</span>
            </div>
            <div className="use-case-body">
              <h3>Infectious & Isolation Wards</h3>
              <p>Allows nurses to track breathing waves of highly contagious patients (e.g. COVID-19 isolation) remotely, reducing the need to enter rooms and swap contact sensors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div>
            <div className="footer-logo">CONVOLVE</div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Contactless Physiological & Respiration Monitoring</p>
          </div>
          <div className="footer-links">
            <Link to="/login?role=patient">Caregiver Login</Link>
            <Link to="/login?role=doctor">Doctor Login</Link>
            <a href="#about">About Nexmon CSI</a>
            <a href="#clinical">Clinical Trials</a>
          </div>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Convolve Inc. All rights reserved. Wi-Fi CSI monitoring is for research and clinical trial support.
        </div>
      </footer>
    </div>
  );
}
