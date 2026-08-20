import React from 'react';
import { motion } from 'framer-motion';
import './MainScreen.css';

const MainScreen = ({ onLoginClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } }
  };

  const floatAnimation = {
    y: [-8, 8],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const floatAnimationReverse = {
    y: [8, -8],
    transition: {
      y: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };
  
  const floatAnimationSlow = {
    y: [-5, 5],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="main-screen">
      <header className="header">
        <motion.div 
          className="nav-links"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <a href="#">Heart rate</a>
          <a href="#">Breathing rate</a>
          <a href="#">Sleep cycle</a>
        </motion.div>
      </header>

      <div className="content">
        <motion.div 
          className="left-col"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className="pill-badge" variants={itemVariants}>
            <span className="dot"></span> INVISIBLE SENSING
          </motion.div>
          <motion.h1 className="hero-title" variants={itemVariants}>
            Health monitoring,<br/>without the hardware.
          </motion.h1>
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Convolve utilizes advanced WiFi sensing technology to translate ambient signals into actionable health data. Continuous, non-invasive, and deeply reassuring.
          </motion.p>
          <motion.div className="buttons" variants={itemVariants}>
            <button className="btn-primary" onClick={onLoginClick}>Track ur health <span>→</span></button>
            <button className="btn-secondary">EXPLORE TECHNOLOGY</button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="right-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {/* Circular Background Image */}
          <div className="graphic-bg"></div>
          
          {/* Top Left Card: Signal Status */}
          <motion.div 
            className="glass-card card-top-left"
            animate={floatAnimationReverse}
          >
            <div style={{width: 38, height: 38, borderRadius: '50%', background: '#D2E3D2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E403C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                 <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                 <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                 <line x1="12" y1="20" x2="12.01" y2="20"></line>
               </svg>
            </div>
            <div>
              <div style={{fontSize: '0.75rem', color: '#8C9996', fontWeight: 700}}>Signal Status</div>
              <div style={{fontSize: '0.95rem', color: '#5A6966', fontWeight: 600}}>Optimal</div>
            </div>
          </motion.div>

          {/* Main Center Card: Vitals */}
          <motion.div 
            className="glass-card card-main-center"
            animate={floatAnimation}
          >
            <div className="card-header">
              <span>Vitals Overview</span>
              <span style={{color: '#2E403C'}}>☑ Active</span>
            </div>
            
            <div className="vitals-big">
              68
            </div>
            <div style={{textAlign: 'center', fontSize: '1rem', color: '#8C9996', fontWeight: 600, marginTop: '-10px', marginBottom: '10px'}}>
              BPM
            </div>
            
            <svg className="wave-line" viewBox="0 0 200 40" preserveAspectRatio="none">
              <path d="M 0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20" fill="none" stroke="#A6B49E" strokeWidth="2" opacity="0.6"/>
              <path d="M 0 20 Q 25 35, 50 20 T 100 20 T 150 20 T 200 20" fill="none" stroke="#D0D6D4" strokeWidth="2" />
            </svg>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.05)', margin: '1rem 0' }} />

            <div className="resp-data">
              <div className="resp-left">
                <div className="resp-label">Respiration</div>
                <div className="resp-value">14 <span className="resp-unit">rpm</span></div>
              </div>
              
              <div style={{display: 'flex', gap: '6px', background: '#FDECEC', padding: '0.6rem 0.8rem', borderRadius: '8px', alignItems: 'flex-end', height: '35px'}}>
                 <div style={{width: 6, height: '100%', background: '#2E403C', borderRadius: 2}}></div>
                 <div style={{width: 6, height: '60%', background: '#818C78', borderRadius: 2}}></div>
                 <div style={{width: 6, height: '30%', background: '#A6B49E', borderRadius: 2}}></div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right Card: Resting */}
          <motion.div 
            className="glass-card card-bottom-right"
            animate={floatAnimationSlow}
          >
            <div style={{fontSize: '1.8rem', fontWeight: 800, color: '#232C2A'}}>
              Resting
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C9996" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </motion.div>

        </motion.div>
      </div>

      <motion.div 
        className="footer-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        © 2024 Convolve Health. All rights reserved.
      </motion.div>
      
      <motion.div 
        className="footer-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </motion.div>
    </div>
  );
};

export default MainScreen;
