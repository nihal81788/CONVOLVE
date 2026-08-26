import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import Logo from './components/Logo';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import IndividualLogin from './components/IndividualLogin';
import './index.css';

function App() {
  const [stage, setStage] = useState('intro'); // 'intro' or 'main'
  const [overlay, setOverlay] = useState(null); // null, 'portal', 'individual'
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('main');
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      animate={{ backgroundColor: stage === 'intro' ? '#1E2524' : '#FAFAFA' }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            key="logo-bg"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <Logo mouseX={mouseX} mouseY={mouseY} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.h1
        initial={{ y: '100vh', opacity: 0, scale: 0.5, left: '50%', top: '50%', x: '-50%', color: '#E2E0CB' }}
        animate={
          stage === 'intro' 
            ? { y: '-50%', opacity: 1, scale: 1, left: '50%', top: '50%', x: '-50%', color: '#E2E0CB', textShadow: '0px 10px 30px rgba(0,0,0,0.5)' }
            : { top: '1.2rem', left: '5rem', x: '0%', y: '0%', opacity: 1, scale: 0.12, color: '#232C2A', textShadow: '0px 0px 0px rgba(0,0,0,0)' }
        }
        transition={{
          y: stage === 'intro' ? { delay: 2.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] } : { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
          opacity: { delay: 2.5, duration: 1.5 },
          scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
          color: { duration: 1.5 }
        }}
        style={{
          position: 'absolute',
          fontSize: '18vw',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          margin: 0,
          zIndex: 10,
          whiteSpace: 'nowrap',
          transformOrigin: 'top left'
        }}
      >
        CONVOLVE
      </motion.h1>

      <AnimatePresence>
        {stage === 'main' && (
          <motion.div
            key="main-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          >
            <MainScreen onLoginClick={() => setOverlay('portal')} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {overlay === 'portal' && (
           <LoginScreen 
             key="login-screen" 
             onClose={() => setOverlay(null)} 
             onSelectIndividual={() => setOverlay('individual')}
           />
        )}
        {overlay === 'individual' && (
           <IndividualLogin 
             key="individual-login" 
             onClose={() => setOverlay(null)} 
           />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;