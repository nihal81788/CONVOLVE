import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Logo from '../Logo';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Set default active tab based on query param, otherwise caregiver/patient
  const [activeTab, setActiveTab] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'doctor') {
      setActiveTab('doctor');
    } else {
      setActiveTab('patient');
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect
    if (activeTab === 'doctor') {
      navigate('/dashboard/doctor');
    } else {
      navigate('/dashboard/patient');
    }
  };

  return (
    <div className="login-page animate-fade-in">
      {/* Small fixed logo in top-left */}
      <div className="fixed-logo-container">
        <Link to="/">
          <Logo size="small" />
        </Link>
      </div>

      <div className="login-card">
        {/* Role Toggle Tabs */}
        <div className="login-tabs">
          <button 
            type="button" 
            className={`login-tab ${activeTab === 'patient' ? 'active' : ''}`}
            onClick={() => setActiveTab('patient')}
          >
            Caregiver Login
          </button>
          <button 
            type="button" 
            className={`login-tab ${activeTab === 'doctor' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctor')}
          >
            Doctor Login
          </button>
        </div>

        {/* Form Body */}
        <div className="login-form-body">
          <div className="login-header">
            <h2>
              {activeTab === 'doctor' ? 'Clinical Staff Portal' : 'Patient & Caregiver Portal'}
            </h2>
            <p>
              {activeTab === 'doctor' 
                ? 'Sign in to access patient lists and live telemetry.' 
                : 'Access your contactless monitoring feed.'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="doctor@hospital.org or caregiver@domain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>

          <div className="signup-link-container">
            New to Convolve? <a href="#signup" onClick={() => alert('Registration is managed by clinical administrators.')}>Request access</a>
          </div>
        </div>
      </div>
    </div>
  );
}
