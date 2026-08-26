import React from 'react';
import { motion } from 'framer-motion';
import './LoginScreen.css';

const LoginScreen = ({ onClose, onSelectIndividual }) => {
  
  // Radii for the tree rings
  const ringRadii = [80, 140, 190, 260, 320, 390, 470, 560];

  const cardVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: 'spring', damping: 20, stiffness: 80 } 
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  return (
    <motion.div 
      className="login-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tree Rings SVG Background */}
      <svg viewBox="0 0 500 500" className="tree-rings-bg" preserveAspectRatio="xMinYMax meet">
         {ringRadii.map((r, i) => (
             <motion.path
                 key={i}
                 d={`M 0 ${500-r} A ${r} ${r} 0 0 1 ${r} 500`}
                 fill="none" 
                 stroke="#818C78" 
                 strokeWidth={i % 3 === 0 ? "5" : i % 2 === 0 ? "3" : "1.5"}
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 2, ease: "easeInOut", delay: i * 0.1 }}
             />
         ))}
      </svg>

      <h1 className="login-header-logo">Convolve</h1>
      <button className="login-close-btn" onClick={onClose}>✕</button>

      <div className="login-header">
        <h2 className="login-title">Welcome to Convolve</h2>
        <p className="login-subtitle">
          Select your portal to continue to your tailored monitoring and care experience.
        </p>
      </div>

      <div className="login-cards-container">
        <motion.div 
          className="login-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectIndividual}
        >
          <div className="login-icon-container icon-individual">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2E403C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
             </svg>
          </div>
          <h3 className="login-card-title">Individual Portal</h3>
          <p className="login-card-desc">
            Access your personal health metrics and ambient sensing data.
          </p>
        </motion.div>

        <motion.div 
          className="login-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }} // Stagger the second card
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="login-icon-container icon-caretaker">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E2E0CB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                {/* Adding a tiny heart to mimic the user's house+heart icon */}
                <path d="M12 18l-1.5-1.5C9.4 15.4 8 14.1 8 12.5a2.5 2.5 0 0 1 4.5-1.5 2.5 2.5 0 0 1 4.5 1.5c0 1.6-1.4 2.9-2.5 4L12 18z" fill="#E2E0CB" stroke="none"></path>
             </svg>
          </div>
          <h3 className="login-card-title">Caretaker Portal</h3>
          <p className="login-card-desc">
            Monitor patients and manage care alerts seamlessly.
          </p>
        </motion.div>
      </div>

      <div className="login-separator"></div>

      <motion.div 
        className="login-features-container"
        variants={featureVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }} // Fade in after cards
      >
        <div className="login-feature">
          <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E403C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <rect x="11" y="9" width="2" height="6" rx="1"></rect>
          </svg>
          <div className="feature-title">Privacy First</div>
          <div className="feature-desc">End-to-end encrypted health data that never leaves your home.</div>
        </div>

        <div className="login-feature">
          <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E403C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a10 10 0 0 0-14.8 0"></path>
            <path d="M22.5 12a14 14 0 0 0-21 0"></path>
          </svg>
          <div className="feature-title">WiFi Sensing</div>
          <div className="feature-desc">Invisible monitoring without cameras or wearable devices.</div>
        </div>

        <div className="login-feature">
          <svg className="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E403C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5l-10 14M7 5l10 14"></path>
          </svg>
          <div className="feature-title">Instant Alerts</div>
          <div className="feature-desc">Real-time fall detection and health anomaly notifications.</div>
        </div>
      </motion.div>

      <div className="login-footer-text">
        Secure, invisible health monitoring powered by WiFi sensing.
      </div>
    </motion.div>
  );
};

export default LoginScreen;
