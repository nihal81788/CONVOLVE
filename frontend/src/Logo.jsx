import React, { useState, useEffect } from 'react';

/**
 * DNAHelixDouble renders a 3D-simulated DNA double helix rotating around its vertical axis.
 * It uses the Painter's Algorithm: splitting the two strands and rungs into small segments,
 * calculating their depth (Z-axis), sorting them, and rendering them from back-to-front.
 */
export function DNAHelixDouble({ className }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let animFrame;
    const tick = () => {
      const timeSec = performance.now() / 1000;
      const duration = 3.2; // One full helical rotation every 3.2 seconds
      const currentPhase = (timeSec / duration) * 2 * Math.PI;
      setPhase(currentPhase);
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const items = [];
  const steps = 80;
  const A = 16; // Amplitude of the wave
  const freq = (2.5 * 2 * Math.PI) / steps; // 2.5 full wave cycles (5 crossovers)

  // 1. Generate Strand 1 Segments
  for (let i = 0; i < steps; i++) {
    const y1 = 10 + i;
    const y2 = 10 + i + 1;
    const theta1 = freq * i + phase;
    const theta2 = freq * (i + 1) + phase;
    const x1 = 50 + A * Math.sin(theta1);
    const x2 = 50 + A * Math.sin(theta2);
    const z = Math.cos((theta1 + theta2) / 2); // Depth (z-value)

    // Interpolate color (Forest Green #1b5e3a to Emerald Green #2ecc71)
    const t = i / steps;
    const r = 27 + (46 - 27) * t;
    const g = 94 + (204 - 94) * t;
    const b = 58 + (113 - 58) * t;
    const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

    items.push({
      type: 'strand1',
      id: `s1-${i}`,
      x1, y1, x2, y2,
      z,
      color,
      strokeWidth: 1.6 + 1.8 * (z + 1) / 2, // Thicker in front, thinner in back
      opacity: 0.4 + 0.6 * (z + 1) / 2      // Brighter in front, dimmer in back
    });
  }

  // 2. Generate Strand 2 Segments
  for (let i = 0; i < steps; i++) {
    const y1 = 10 + i;
    const y2 = 10 + i + 1;
    const theta1 = freq * i + phase + Math.PI; // Phase shifted 180 deg
    const theta2 = freq * (i + 1) + phase + Math.PI;
    const x1 = 50 + A * Math.sin(theta1);
    const x2 = 50 + A * Math.sin(theta2);
    const z = Math.cos((theta1 + theta2) / 2);

    // Interpolate color (Emerald Green #2ecc71 to Mint Green #4ade80)
    const t = i / steps;
    const r = 46 + (74 - 46) * t;
    const g = 204 + (222 - 204) * t;
    const b = 113 + (128 - 113) * t;
    const color = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

    items.push({
      type: 'strand2',
      id: `s2-${i}`,
      x1, y1, x2, y2,
      z,
      color,
      strokeWidth: 1.6 + 1.8 * (z + 1) / 2,
      opacity: 0.4 + 0.6 * (z + 1) / 2
    });
  }

  // 3. Generate Rungs (connecting steps represent base pairs)
  // Standard clinical DNA ladder has rungs at regular intervals
  const rungIndices = [10, 22, 34, 46, 58, 70];
  rungIndices.forEach((ri) => {
    const ry = 10 + ri;
    const theta = freq * ri + phase;
    const x1 = 50 + A * Math.sin(theta);
    const x2 = 50 - A * Math.sin(theta);
    
    // Rungs cross the central axis. Setting depth z=0 separates front & back strands.
    const z = 0.0;
    
    const rungStrokeWidth = 0.8 + 1.2 * Math.abs(Math.sin(theta)); // Thicker when facing front
    const opacity = 0.25 + 0.5 * Math.abs(Math.sin(theta));       // More visible when facing front

    items.push({
      type: 'rung',
      id: `r-${ri}`,
      x1, y1: ry, x2, y2: ry,
      z,
      color: '#d1fae5', // Light mint green/white
      strokeWidth: rungStrokeWidth,
      opacity
    });
  });

  // 4. Sort by depth (Painter's algorithm: lowest z drawn first)
  items.sort((a, b) => a.z - b.z);

  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height: '1em',
        width: '1em',
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '0 0.05em'
      }}
    >
      {items.map((item) => (
        <line
          key={item.id}
          x1={item.x1.toFixed(2)}
          y1={item.y1.toFixed(2)}
          x2={item.x2.toFixed(2)}
          y2={item.y2.toFixed(2)}
          stroke={item.color}
          strokeWidth={item.strokeWidth.toFixed(2)}
          strokeLinecap="round"
          opacity={item.opacity.toFixed(2)}
        />
      ))}
    </svg>
  );
}

export default function Logo({ size = 'large' }) {
  const logoClass = `convolve-logo logo-${size}`;

  return (
    <span className={logoClass} aria-label="CONVOLVE">
      <span className="logo-letter">C</span>
      <DNAHelixDouble className="logo-helix" />
      <span className="logo-letter">N</span>
      <span className="logo-letter">V</span>
      <span className="logo-letter">O</span>
      <span className="logo-letter">L</span>
      <span className="logo-letter">V</span>
      <span className="logo-letter">E</span>
    </span>
  );
}
