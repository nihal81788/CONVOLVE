import { motion } from 'framer-motion';
import './IndividualLogin.css';

const IndividualLogin = ({ onClose, onSignup }) => {
  const sagePaths = [
    "M -200 100 C 300 200, 500 800, 1200 900",
    "M -100 900 C 400 800, 500 200, 1200 100",
    "M 300 -200 C 400 300, 700 600, 900 1200"
  ];

  return (
    <motion.div 
      className="individual-login-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg className="sage-pattern" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {sagePaths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="60" strokeLinecap="round" />
        ))}
      </svg>

      <div className="login-left-pane">
        {/* Left pane is transparent, just showing the sage pattern */}
      </div>

      <motion.div 
        className="login-right-pane"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 100 }}
      >
        <button className="login-close-btn" onClick={onClose}>✕</button>

        <div className="dark-form-header">
          <div className="dark-logo">CONVOLVE</div>
          <h2 className="dark-title">Individual Profile<br/>Setup</h2>
        </div>

        <div className="auth-form-content">
          <div className="auth-form-title">Login</div>

          <div className="auth-input-group dark-input-group">
            <label className="dark-label">Gmail</label>
            <input type="email" className="dark-input" placeholder="yourname@gmail.com" />
          </div>

          <div className="auth-input-group dark-input-group" style={{ marginBottom: '1.5rem' }}>
            <label className="dark-label">Password</label>
            <input type="password" className="dark-input" placeholder="••••••••" />
          </div>

          <div className="dark-options-row">
            <a href="#" className="dark-link-small">Forgot Password?</a>
            <a href="#" className="dark-link-small">Forgot UserID?</a>
          </div>

          <button className="btn-dark-primary">Login</button>

          <div className="dark-signup-text">
            Don't have an account? <a href="#" className="dark-link-bold" onClick={(e) => { e.preventDefault(); onSignup(); }}>Sign Up</a>
          </div>

          <div className="auth-divider dark-divider">
            <span className="auth-divider-text dark-divider-text">OR</span>
          </div>

          <button className="btn-google dark-btn-google">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="dark-footer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            End-to-end encrypted health data
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IndividualLogin;
