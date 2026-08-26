import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SignupScreen.css';
import './IndividualLogin.css';

const SignupScreen = ({ onNavigateBack }) => {
  const [step, setStep] = useState(1);

  const renderStep1 = () => (
    <motion.div 
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="auth-card signup-card"
      transition={{ duration: 0.3 }}
    >
      <div className="auth-input-group">
        <label className="auth-label">Email Address</label>
        <input type="email" className="auth-input" placeholder="jane.doe@example.com" />
      </div>

      <div className="form-row">
        <div className="auth-input-group">
          <label className="auth-label">Password</label>
          <input type="password" className="auth-input" placeholder="••••••••" />
        </div>
        <div className="auth-input-group">
          <label className="auth-label">Confirm Password</label>
          <input type="password" className="auth-input" placeholder="••••••••" />
        </div>
      </div>

      <div className="verification-box">
        <label className="auth-label">Verification Code (Sent to Email)</label>
        <div className="verification-row">
          <input type="text" className="auth-input otp-input" placeholder="- - - - - -" maxLength="6" />
          <button className="btn-verify">Verify OTP</button>
        </div>
        <a href="#" className="resend-link">Resend Code</a>
      </div>

      <button className="btn-auth-primary" onClick={() => setStep(2)}>Continue to Profile</button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      key="step2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="auth-card signup-card"
      transition={{ duration: 0.3 }}
    >
      <div className="form-row">
        <div className="auth-input-group">
          <label className="auth-label">First Name</label>
          <input type="text" className="auth-input" placeholder="Jane" />
        </div>
        <div className="auth-input-group">
          <label className="auth-label">Last Name</label>
          <input type="text" className="auth-input" placeholder="Doe" />
        </div>
      </div>

      <div className="form-row">
        <div className="auth-input-group">
          <label className="auth-label">Phone Number</label>
          <input type="tel" className="auth-input" placeholder="+1 (555) 000-0000" />
        </div>
        <div className="auth-input-group">
          <label className="auth-label">Date of Birth</label>
          <input type="date" className="auth-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="auth-input-group">
          <label className="auth-label">Gender</label>
          <select className="auth-input">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="auth-input-group">
          <label className="auth-label">Primary Health Goal</label>
          <select className="auth-input">
            <option value="">Select goal</option>
            <option value="fitness">General Fitness</option>
            <option value="heart">Cardio / Heart Health</option>
            <option value="sleep">Sleep Tracking</option>
            <option value="weight">Weight Management</option>
            <option value="stress">Stress Reduction</option>
          </select>
        </div>
      </div>

      <div className="auth-terms">
         <input type="checkbox" id="terms" className="custom-checkbox" />
         <label htmlFor="terms">I agree to the <a href="#" className="auth-link-small">Terms of Service</a> and <a href="#" className="auth-link-small">Privacy Policy</a>.</label>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn-auth-secondary" onClick={() => setStep(1)}>Back</button>
        <button className="btn-auth-primary" style={{ marginBottom: 0 }}>Complete Registration</button>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="signup-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="signup-header-bar">
        <div className="signup-logo">Convolve</div>
        <button className="signup-signin-btn" onClick={onNavigateBack}>Back to Sign In</button>
      </div>

      <div className="signup-content">
        <div className="signup-header">
          <h2 className="signup-title">{step === 1 ? 'Account Setup' : 'Personal Profile'}</h2>
          <p className="signup-subtitle">
            {step === 1 
              ? 'Set up your credentials and verify your email to get started.' 
              : 'Tell us a bit about yourself to personalize your experience.'}
          </p>
        </div>

        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? renderStep1() : renderStep2()}
        </AnimatePresence>

        <div className="auth-footer" style={{ marginTop: '3rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          End-to-end encrypted health data
        </div>
      </div>
    </motion.div>
  );
};

export default SignupScreen;
