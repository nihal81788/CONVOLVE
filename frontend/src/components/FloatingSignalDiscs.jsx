import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { 
  Activity, 
  Moon, 
  Wifi, 
  Bell, 
  HeartPulse 
} from 'lucide-react';

// Animation Tuning Constants
const BOB_RANGE = {
  1: { y: [-8, 8], duration: 3.2, rotate: [-4, 4], rotDuration: 5.5 },
  2: { y: [-6, 10], duration: 3.6, rotate: [-3, 3], rotDuration: 6.0 },
  3: { y: [-10, 6], duration: 4.0, rotate: [-4, 4], rotDuration: 6.5 },
  4: { y: [-7, 9], duration: 3.4, rotate: [-3, 3], rotDuration: 5.8 },
  5: { y: [-9, 7], duration: 3.8, rotate: [-4, 4], rotDuration: 6.2 },
};

const DEPTH_SPECS = {
  1: { scale: 1.0, opacity: 1.0, shadow: '0 8px 24px rgba(31,122,77,0.12)', zIndex: 3, parallax: [-60, 60] },
  2: { scale: 0.9, opacity: 0.9, shadow: '0 6px 16px rgba(31,122,77,0.10)', zIndex: 2, parallax: [-35, 35] },
  3: { scale: 0.75, opacity: 0.7, shadow: '0 4px 8px rgba(31,122,77,0.08)', zIndex: 1, parallax: [-15, 15] },
};

const DISCS_DATA = [
  { id: 1, icon: Activity, label: 'Breathing Rate', x: -280, y: -120, size: 80, depth: 1, path: 'M 0 0 Q -140 -90 -280 -120' },
  { id: 2, icon: Moon, label: 'Sleep Stage', x: 260, y: -160, size: 72, depth: 2, path: 'M 0 0 Q 130 -110 260 -160' },
  { id: 3, icon: Wifi, label: 'Signal Capture', x: -320, y: 40, size: 64, depth: 3, path: 'M 0 0 Q -160 -10 -320 40', hideTablet: true },
  { id: 4, icon: Bell, label: 'Alerts', x: 300, y: 60, size: 68, depth: 1, path: 'M 0 0 Q 150 0 300 60', hideTablet: true },
  { id: 5, icon: HeartPulse, label: 'Motion Detection', x: -40, y: 220, size: 76, depth: 2, path: 'M 0 0 Q -50 110 -40 220' },
];

export default function FloatingSignalDiscs({ scrollProgress }) {
  return (
    <div 
      className="floating-discs-wrapper" 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      {/* SVG Connecting Signal Threads */}
      <svg 
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          overflow: 'visible',
          pointerEvents: 'none'
        }}
      >
        {DISCS_DATA.map((disc) => (
          <path
            key={`path-${disc.id}`}
            className={disc.hideTablet ? 'hide-tablet' : ''}
            d={disc.path}
            stroke="rgba(31,122,77,0.12)"
            strokeWidth="1.2"
            fill="none"
          />
        ))}
      </svg>

      {/* Interactive floating discs */}
      {DISCS_DATA.map((disc, idx) => {
        const Icon = disc.icon;
        const depthCfg = DEPTH_SPECS[disc.depth];
        const bobCfg = BOB_RANGE[disc.id];

        // 1. Calculate direction vector to offset entrance starting position
        const dist = Math.sqrt(disc.x * disc.x + disc.y * disc.y) || 1;
        const ux = disc.x / dist;
        const uy = disc.y / dist;
        const startX = ux * 40;
        const startY = uy * 40;

        // 2. Map scroll progress to depth-based parallax translations
        // useTransform is called inside parent component loop directly.
        const yParallax = useTransform(
          scrollProgress,
          [0, 1],
          depthCfg.parallax
        );

        return (
          <div
            key={disc.id}
            className={`floating-disc-outer ${disc.hideTablet ? 'hide-tablet' : ''}`}
            style={{
              position: 'absolute',
              left: `calc(50% + ${disc.x}px)`,
              top: `calc(50% + ${disc.y}px)`,
              transform: 'translate(-50%, -50%)',
              zIndex: depthCfg.zIndex,
              pointerEvents: 'none'
            }}
          >
            {/* Wrapper 1: Scroll Parallax Translation */}
            <motion.div style={{ y: yParallax, pointerEvents: 'none' }}>
              
              {/* Wrapper 2: Delayed Staggered Entrance (starts at 800ms) */}
              <motion.div
                initial={{ x: startX, y: startY, opacity: 0, scale: 0.4 }}
                animate={{ x: 0, y: 0, opacity: depthCfg.opacity, scale: depthCfg.scale }}
                transition={{ 
                  delay: 0.8 + idx * 0.12, 
                  duration: 0.7, 
                  ease: "easeOut" 
                }}
                style={{ pointerEvents: 'none' }}
              >
                
                {/* Wrapper 3: Bob / Rotate Loop & Hover scaling (pointerEvents: auto for hover) */}
                <motion.div
                  className="feature-disc-container"
                  animate={{
                    y: bobCfg.y,
                    rotate: bobCfg.rotate
                  }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: bobCfg.duration,
                      ease: "easeInOut"
                    },
                    rotate: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: bobCfg.rotDuration,
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: '0 16px 36px rgba(31,122,77,0.22)'
                  }}
                  style={{
                    width: `${disc.size}px`,
                    height: `${disc.size}px`,
                    borderRadius: '50%',
                    backgroundColor: '#fefefe',
                    border: '1px solid rgba(31,122,77,0.18)',
                    boxShadow: depthCfg.shadow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    position: 'relative',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  <Icon 
                    size={Math.round(disc.size * 0.42)} 
                    style={{ color: '#1F7A4D' }} 
                  />

                  {/* Tooltip detail */}
                  <div className="disc-tooltip">
                    {disc.label}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
