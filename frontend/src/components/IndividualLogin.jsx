import React from 'react';
import { motion } from 'framer-motion';
import './IndividualLogin.css';

const IndividualLogin = ({ onClose }) => {
  return (
    <motion.div 
      className="individual-login-screen"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
    >
      <button className="login-close-btn" onClick={onClose}>✕</button>

      <div className="individual-login-header">
        <div className="individual-logo">Convolve</div>
        <h2 className="individual-title">Individual Profile Setup</h2>
        <p className="individual-subtitle">
          Let's calibrate your environment. We need a few details to optimize the sensing algorithms for your unique physiology.
        </p>
      </div>

      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="auth-form-title">Login</div>

        <div className="auth-input-group">
          <label className="auth-label">Gmail</label>
          <input type="email" className="auth-input" placeholder="yourname@gmail.com" />
        </div>

        <div className="auth-input-group" style={{ marginBottom: '0.8rem' }}>
          <label className="auth-label">Password</label>
          <input type="password" className="auth-input" placeholder="••••••••" />
        </div>

        <div className="auth-forgot-row">
          <a href="#" className="auth-link-small">Forgot Password?</a>
          <a href="#" className="auth-link-small">Forgot UserID?</a>
        </div>

        <button className="btn-auth-primary">Login</button>

        <div className="auth-signup-text">
          Don't have an account? <a href="#" className="auth-link">Sign Up</a>
        </div>

        <div className="auth-divider">
          <span className="auth-divider-text">OR</span>
        </div>

        <button className="btn-google">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </motion.div>

      <div className="auth-footer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        End-to-end encrypted health data
      </div>
    </motion.div>
  );
};

export default IndividualLogin;
