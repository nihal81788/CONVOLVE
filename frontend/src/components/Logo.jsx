import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const Logo = ({ mouseX, mouseY }) => {
  // Parallax offset
  const offsetX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
  const offsetY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

  // Smoother spring for the mouse movement
  const springX = useSpring(offsetX, { stiffness: 50, damping: 20 });
  const springY = useSpring(offsetY, { stiffness: 50, damping: 20 });

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 0.5 + i * 0.4;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 3, bounce: 0 },
          opacity: { delay, duration: 0.1 }
        }
      };
    }
  };

  const logoColor = "#E2E0CB"; 

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        width: '150vmin',
        height: '150vmin',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.6 }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          x: springX,
          y: springY,
          filter: 'drop-shadow(0 0 20px rgba(226, 224, 203, 0.4))'
        }}
      >
        {/* Background Circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="40"
          stroke={logoColor}
          strokeWidth="1.5"
          fill="transparent"
          custom={0}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
        
        {/* The 8-Pointed Star (Outer cuts) */}
        <motion.path
          d="M 100 10 L 110 80 L 160 40 L 120 90 L 190 100 L 120 110 L 160 160 L 110 120 L 100 190 L 90 120 L 40 160 L 80 110 L 10 100 L 80 90 L 40 40 L 90 80 Z"
          stroke={logoColor}
          strokeWidth="2"
          fill="transparent"
          strokeLinejoin="round"
          custom={1}
          variants={draw}
          initial="hidden"
          animate="visible"
        />

        {/* Inner Small Star */}
        <motion.path
          d="M 100 85 L 105 95 L 115 95 L 107 102 L 110 112 L 100 106 L 90 112 L 93 102 L 85 95 L 95 95 Z"
          stroke={logoColor}
          strokeWidth="1"
          fill="transparent"
          strokeLinejoin="round"
          custom={2}
          variants={draw}
          initial="hidden"
          animate="visible"
        />

        {/* Top and Bottom Dots */}
        <motion.circle cx="100" cy="2" r="1.5" fill={logoColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} />
        <motion.circle cx="100" cy="8" r="1.5" fill={logoColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} />
        <motion.circle cx="100" cy="192" r="1.5" fill={logoColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} />
        <motion.circle cx="100" cy="198" r="1.5" fill={logoColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} />
      </motion.svg>
    </motion.div>
  );
};

export default Logo;
