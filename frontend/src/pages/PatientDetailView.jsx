import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Activity, 
  Moon, 
  AlertTriangle, 
  Wifi, 
  Download,
  Calendar,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import BreathingChart from '../components/BreathingChart';
import SleepHypnogram from '../components/SleepHypnogram';

export default function PatientDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tRef = useRef(0);

  // Define database of mock patient details
  const patientProfiles = {
    'sarah-jenkins': {
      name: 'Sarah Jenkins',
      room: 'Room 102',
      id: 'CONV-SARA',
      baselineBpm: 16.2,
      sleepStage: 'REM',
      status: 'normal',
      quality: '98%',
      details: 'Patient recovering post-operation. Respiration is steady; sleep cycle shows healthy REM-Deep distribution.',
      trend: [
        { day: 'Mon', bpm: 15.2 }, { day: 'Tue', bpm: 16.1 }, { day: 'Wed', bpm: 15.5 },
        { day: 'Thu', bpm: 14.8 }, { day: 'Fri', bpm: 15.9 }, { day: 'Sat', bpm: 16.4 }, { day: 'Sun', bpm: 16.2 }
      ],
      sleep: [
        { time: '22:00', stage: 3 }, { time: '22:30', stage: 1 }, { time: '23:00', stage: 0 },
        { time: '00:00', stage: 0 }, { time: '01:00', stage: 1 }, { time: '01:30', stage: 2 },
        { time: '02:00', stage: 0 }, { time: '03:00', stage: 1 }, { time: '04:00', stage: 2 },
        { time: '05:00', stage: 1 }, { time: '05:30', stage: 3 }, { time: '06:00', stage: 3 }
      ],
      logs: [
        { time: '05:32 AM', event: 'Waking stretch', intensity: 'Low', severity: 'normal' },
        { time: '04:12 AM', event: 'Turning / Roll over', intensity: 'Moderate', severity: 'info' },
        { time: '02:15 AM', event: 'Postural adjustment', intensity: 'Low', severity: 'normal' }
      ]
    },
    'david-miller': {
      name: 'David Miller',
      room: 'Room 105',
      id: 'CONV-DAVI',
      baselineBpm: 8.4,
      sleepStage: 'Awake',
      status: 'critical',
      quality: '94%',
      details: 'Apnea Warning active. Low respiration rate detected (below clinical safety limit of 10 bpm). Caregivers alerted.',
      trend: [
        { day: 'Mon', bpm: 12.1 }, { day: 'Tue', bpm: 11.4 }, { day: 'Wed', bpm: 10.8 },
        { day: 'Thu', bpm: 9.8 }, { day: 'Fri', bpm: 9.2 }, { day: 'Sat', bpm: 8.9 }, { day: 'Sun', bpm: 8.4 }
      ],
      sleep: [
        { time: '22:00', stage: 3 }, { time: '22:30', stage: 1 }, { time: '23:00', stage: 1 },
        { time: '00:00', stage: 0 }, { time: '01:00', stage: 1 }, { time: '01:30', stage: 3 },
        { time: '02:00', stage: 3 }, { time: '03:00', stage: 1 }, { time: '04:00', stage: 1 },
        { time: '05:00', stage: 3 }, { time: '05:30', stage: 3 }, { time: '06:00', stage: 3 }
      ],
      logs: [
        { time: '08:44 AM', event: 'Apnea Threshold Breach', intensity: 'Low Respiration', severity: 'warning' },
        { time: '08:12 AM', event: 'Spontaneous gasp', intensity: 'Moderate', severity: 'info' },
        { time: '07:30 AM', event: 'Sitting up', intensity: 'High', severity: 'warning' }
      ]
    },
    'baby-ethan': {
      name: 'Baby Ethan',
      room: 'NICU Pod 3',
      id: 'CONV-ETHA',
      baselineBpm: 34.5,
      sleepStage: 'Deep',
      status: 'normal',
      quality: '99%',
      details: 'Premature neonate. Respiration monitored without sticky wires to protect delicate skin. Signal indicates normal respiratory rate for age.',
      trend: [
        { day: 'Mon', bpm: 32.1 }, { day: 'Tue', bpm: 34.5 }, { day: 'Wed', bpm: 33.8 },
        { day: 'Thu', bpm: 35.1 }, { day: 'Fri', bpm: 36.2 }, { day: 'Sat', bpm: 34.9 }, { day: 'Sun', bpm: 34.5 }
      ],
      sleep: [
        { time: '22:00', stage: 3 }, { time: '22:30', stage: 2 }, { time: '23:00', stage: 0 },
        { time: '00:00', stage: 0 }, { time: '01:00', stage: 2 }, { time: '01:30', stage: 2 },
        { time: '02:00', stage: 0 }, { time: '03:00', stage: 2 }, { time: '04:00', stage: 0 },
        { time: '05:00', stage: 2 }, { time: '05:30', stage: 3 }, { time: '06:00', stage: 3 }
      ],
      logs: [
        { time: '06:12 AM', event: 'Spontaneous movement', intensity: 'Low', severity: 'normal' },
        { time: '04:45 AM', event: 'Feeding agitation', intensity: 'Moderate', severity: 'info' },
        { time: '02:00 AM', event: 'Twitching', intensity: 'Low', severity: 'normal' }
      ]
    },
    'james-vance': {
      name: 'James Vance',
      room: 'Room 201',
      id: 'CONV-JAME',
      baselineBpm: 24.8,
      sleepStage: 'Awake',
      status: 'warning',
      quality: '96%',
      details: 'Patient shows signs of agitation and high breathing frequency (Tachypnea). History of mental instability, contactless monitoring selected for self-harm reduction.',
      trend: [
        { day: 'Mon', bpm: 17.5 }, { day: 'Tue', bpm: 18.2 }, { day: 'Wed', bpm: 20.4 },
        { day: 'Thu', bpm: 22.1 }, { day: 'Fri', bpm: 24.8 }, { day: 'Sat', bpm: 23.9 }, { day: 'Sun', bpm: 24.8 }
      ],
      sleep: [
        { time: '22:00', stage: 3 }, { time: '22:30', stage: 3 }, { time: '23:00', stage: 1 },
        { time: '00:00', stage: 1 }, { time: '01:00', stage: 3 }, { time: '01:30', stage: 3 },
        { time: '02:00', stage: 1 }, { time: '03:00', stage: 3 }, { time: '04:00', stage: 3 },
        { time: '05:00', stage: 1 }, { time: '05:30', stage: 3 }, { time: '06:00', stage: 3 }
      ],
      logs: [
        { time: '11:22 AM', event: 'Tachypnea Alert', intensity: 'High Respiration', severity: 'warning' },
        { time: '10:45 AM', event: 'Agitated thrashing', intensity: 'High', severity: 'warning' },
        { time: '09:12 AM', event: 'Pacing / Heavy movement', intensity: 'High', severity: 'warning' }
      ]
    }
  };

  // Resolve profile or fallback
  const profile = patientProfiles[id] || patientProfiles['sarah-jenkins'];

  const [currentBpm, setCurrentBpm] = useState(profile.baselineBpm);
  const [liveData, setLiveData] = useState([]);

  // Generate initial live waveform data (tailored by profile baseline)
  useEffect(() => {
    // Reset state for new patient
    setCurrentBpm(profile.baselineBpm);
    
    const initialPoints = [];
    // Adjust frequency and amplitude based on patient profile
    const freqMult = profile.id === 'baby-ethan' ? 1.8 : profile.id === 'david-miller' ? 0.6 : 1.0;
    const ampMult = profile.id === 'james-vance' ? 2.0 : 1.0;

    for (let i = 0; i < 40; i++) {
      const t = i * 0.25 * freqMult;
      const base = Math.sin(t) * 1.2 * ampMult + Math.sin(t * 0.4) * 0.3;
      const noise = (Math.random() - 0.5) * (profile.id === 'james-vance' ? 0.4 : 0.15);
      initialPoints.push({
        time: i,
        amplitude: parseFloat((base + profile.baselineBpm + noise).toFixed(2))
      });
    }
    setLiveData(initialPoints);
    tRef.current = 40 * 0.25;
  }, [id, profile]);

  // Waveform animation loop
  useEffect(() => {
    const freqMult = profile.id === 'baby-ethan' ? 1.8 : profile.id === 'david-miller' ? 0.6 : 1.0;
    const ampMult = profile.id === 'james-vance' ? 2.0 : 1.0;

    const waveInterval = setInterval(() => {
      setLiveData((prevData) => {
        if (prevData.length === 0) return prevData;
        const nextData = [...prevData.slice(1)];
        tRef.current += 0.25;
        const t = tRef.current * freqMult;
        const base = Math.sin(t) * 1.2 * ampMult + Math.sin(t * 0.4) * 0.3;
        const noise = (Math.random() - 0.5) * (profile.id === 'james-vance' ? 0.4 : 0.15);
        
        nextData.push({
          time: (tRef.current).toFixed(2),
          amplitude: parseFloat((base + profile.baselineBpm + noise).toFixed(2))
        });
        return nextData;
      });
    }, 150);

    const bpmInterval = setInterval(() => {
      setCurrentBpm((prev) => {
        const fluctuation = (Math.random() - 0.5) * 0.5;
        const next = prev + fluctuation;
        // Float around the profile's baseline
        const minVal = profile.baselineBpm - 2;
        const maxVal = profile.baselineBpm + 2;
        return parseFloat(Math.max(minVal, Math.min(maxVal, next)).toFixed(1));
      });
    }, 2000);

    return () => {
      clearInterval(waveInterval);
      clearInterval(bpmInterval);
    };
  }, [id, profile]);

  return (
    <div className="dashboard-layout">
      <Sidebar role="doctor" />

      <main className="dashboard-main animate-fade-in">
        {/* Navigation & Actions */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/dashboard/doctor')}
            style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', padding: '0.6rem 1.2rem' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Patients</span>
          </button>

          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Patient Diagnostics</span>
        </div>

        {/* Patient Details Header */}
        <div className="dashboard-header" style={{ marginTop: '0.5rem' }}>
          <div className="dashboard-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={`status-dot ${profile.status}`} style={{ width: 14, height: 14 }}></span>
              <h1 style={{ fontSize: '2.25rem' }}>{profile.name}</h1>
            </div>
            <p>Room: <strong>{profile.room}</strong> | Code ID: {profile.id} | Device Status: <strong style={{ color: 'var(--color-forest)' }}>Connected</strong></p>
          </div>

          <div className="dashboard-actions">
            <button className="btn btn-secondary" onClick={() => alert('PDF report is compiling...')}>
              <Download size={16} style={{ marginRight: '0.5rem' }} />
              Export Case Report
            </button>
          </div>
        </div>

        {/* Diagnostic Context Alert */}
        <div style={{ 
          background: profile.status === 'critical' ? 'var(--status-critical-bg)' : profile.status === 'warning' ? 'var(--status-warning-bg)' : 'var(--color-forest-light)', 
          borderLeft: `4px solid ${profile.status === 'critical' ? 'var(--status-critical)' : profile.status === 'warning' ? 'var(--status-warning)' : 'var(--color-forest)'}`,
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
          display: 'flex',
          gap: '1rem',
          alignItems: 'start'
        }}>
          {profile.status === 'critical' || profile.status === 'warning' ? (
            <AlertCircle size={20} style={{ color: profile.status === 'critical' ? 'var(--status-critical)' : 'var(--status-warning)', flexShrink: 0, marginTop: '0.1rem' }} />
          ) : (
            <Wifi size={20} style={{ color: 'var(--color-forest)', flexShrink: 0, marginTop: '0.1rem' }} />
          )}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>
              Clinical Telemetry Insights
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {profile.details}
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <DashboardCard 
            title="Respiratory Rate"
            value={currentBpm}
            unit="bpm"
            statusText={profile.status === 'critical' ? 'Bradypnea Alarmed' : profile.status === 'warning' ? 'Tachypnea Alarmed' : 'Normal'}
            statusType={profile.status === 'critical' ? 'danger' : profile.status === 'warning' ? 'warning' : 'success'}
            icon={Activity}
            iconColorClass={profile.status === 'critical' ? 'critical' : profile.status === 'warning' ? 'warning' : 'forest'}
          />

          <DashboardCard 
            title="Estimated Sleep Stage"
            value={profile.sleepStage}
            statusText="Phase matching classification"
            statusType="info"
            icon={Moon}
            iconColorClass="emerald"
          />

          <DashboardCard 
            title="CSI Signal Strength"
            value={profile.quality}
            unit=""
            statusText="Transmitting (Nexmon firmware)"
            statusType="success"
            icon={Wifi}
            iconColorClass="mint"
          />

          <DashboardCard 
            title="Historical Average"
            value={profile.id === 'CONV-ETHA' ? '34.5' : '15.6'}
            unit="bpm"
            statusText="7-day running average"
            statusType="info"
            icon={Calendar}
            iconColorClass="info"
          />
        </div>

        {/* Charts Section */}
        <div className="dashboard-grid-two-col">
          {/* Live Waveform */}
          <BreathingChart type="live" data={liveData} />
          
          {/* Sleep Hypnogram */}
          <SleepHypnogram data={profile.sleep} />
        </div>

        {/* Second Row Grid */}
        <div className="dashboard-grid-two-col">
          {/* 7 Day Trend */}
          <BreathingChart type="trend" data={profile.trend} />

          {/* Patient Log Card */}
          <div className="log-card">
            <div className="chart-card-header">
              <div className="chart-card-title">
                <h3>Movement Spikes & Alarms</h3>
                <p>CSI variance events logged over past 24 hours</p>
              </div>
            </div>

            <div className="log-list">
              {profile.logs.map((log, idx) => {
                const getSeverityClass = (sev) => {
                  switch (sev) {
                    case 'warning': return 'status-badge-warning';
                    case 'info': return 'status-badge-info';
                    default: return 'status-badge-success';
                  }
                };

                return (
                  <div className="log-item" key={idx}>
                    <div className="log-details">
                      <span className="log-event-title">{log.event}</span>
                      <span className="log-timestamp">{log.time}</span>
                    </div>
                    <span className={`log-severity ${getSeverityClass(log.severity)}`}>
                      {log.intensity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
