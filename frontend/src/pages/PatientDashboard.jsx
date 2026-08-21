import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Moon, 
  AlertTriangle, 
  Wifi, 
  Download, 
  Sliders, 
  ChevronRight 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import BreathingChart from '../components/BreathingChart';
import SleepHypnogram from '../components/SleepHypnogram';

export default function PatientDashboard() {
  const [currentBpm, setCurrentBpm] = useState(15.8);
  const [currentSleepStage, setCurrentSleepStage] = useState('REM');
  const [lowThreshold, setLowThreshold] = useState(10);
  const [highThreshold, setHighThreshold] = useState(24);
  const [liveData, setLiveData] = useState([]);
  
  // Ref for tracking time step in sine wave generator
  const tRef = useRef(0);

  // 7-Day Trend Mock Data
  const trendData = [
    { day: 'Mon', bpm: 15.2 },
    { day: 'Tue', bpm: 16.1 },
    { day: 'Wed', bpm: 15.5 },
    { day: 'Thu', bpm: 14.8 },
    { day: 'Fri', bpm: 15.9 },
    { day: 'Sat', bpm: 16.4 },
    { day: 'Sun', bpm: 15.8 },
  ];

  // Sleep Hypnogram Mock Data (Hour, Stage)
  // Stage mapping: 0=Deep, 1=Light, 2=REM, 3=Awake
  const sleepData = [
    { time: '22:00', stage: 3 },
    { time: '22:30', stage: 1 },
    { time: '23:00', stage: 0 },
    { time: '00:00', stage: 0 },
    { time: '01:00', stage: 1 },
    { time: '01:30', stage: 2 },
    { time: '02:00', stage: 0 },
    { time: '03:00', stage: 1 },
    { time: '04:00', stage: 2 },
    { time: '05:00', stage: 1 },
    { time: '05:30', stage: 3 },
    { time: '06:00', stage: 3 },
  ];

  // Motion Spike Logs
  const motionLogs = [
    { time: '05:32 AM', event: 'Waking stretching', intensity: 'Low', severity: 'normal' },
    { time: '04:12 AM', event: 'Turning / Roll over', intensity: 'Moderate', severity: 'info' },
    { time: '02:15 AM', event: 'Postural adjustment', intensity: 'Low', severity: 'normal' },
    { time: '23:44 PM', event: 'Brief body movement', intensity: 'Moderate', severity: 'info' },
    { time: '22:15 PM', event: 'Coughing / Sitting up', intensity: 'High', severity: 'warning' },
  ];

  // Generate initial live waveform data
  useEffect(() => {
    const initialPoints = [];
    for (let i = 0; i < 40; i++) {
      const t = i * 0.25;
      const base = Math.sin(t) * 1.2 + Math.sin(t * 0.4) * 0.3;
      const noise = (Math.random() - 0.5) * 0.15;
      initialPoints.push({
        time: i,
        amplitude: parseFloat((base + 15 + noise).toFixed(2))
      });
    }
    setLiveData(initialPoints);
    tRef.current = 40 * 0.25;
  }, []);

  // Set up intervals for live updates
  useEffect(() => {
    // 1. Live waveform shifting
    const waveInterval = setInterval(() => {
      setLiveData((prevData) => {
        const nextData = [...prevData.slice(1)];
        tRef.current += 0.25;
        const t = tRef.current;
        const base = Math.sin(t) * 1.2 + Math.sin(t * 0.4) * 0.3;
        const noise = (Math.random() - 0.5) * 0.15;
        
        nextData.push({
          time: t.toFixed(2),
          amplitude: parseFloat((base + 15 + noise).toFixed(2))
        });
        return nextData;
      });
    }, 150);

    // 2. Slow breathing rate fluctuation (e.g. 15.6 -> 15.9 -> 16.1)
    const bpmInterval = setInterval(() => {
      setCurrentBpm((prev) => {
        const fluctuation = (Math.random() - 0.5) * 0.4;
        const nextBpm = prev + fluctuation;
        // Clamp between 14.5 and 18.5 for realism
        return parseFloat(Math.max(14.5, Math.min(18.5, nextBpm)).toFixed(1));
      });
    }, 2000);

    return () => {
      clearInterval(waveInterval);
      clearInterval(bpmInterval);
    };
  }, []);

  const handleExport = (format) => {
    alert(`Generating ${format} report for download...`);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="patient" />

      <main className="dashboard-main animate-fade-in">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Caregiver Telemetry</h1>
            <p>Patient: <strong>Baby Ethan (NICU Pod 3)</strong> | Room: 104-A</p>
          </div>

          <div className="dashboard-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => handleExport('CSV')}
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('PDF')}
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <Download size={16} />
              <span>Export PDF Report</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <DashboardCard 
            title="Breathing Rate"
            value={currentBpm}
            unit="bpm"
            statusText={currentBpm < lowThreshold || currentBpm > highThreshold ? "Out of Bounds" : "Normal"}
            statusType={currentBpm < lowThreshold || currentBpm > highThreshold ? "danger" : "success"}
            icon={Activity}
            iconColorClass={currentBpm < lowThreshold || currentBpm > highThreshold ? "critical" : "forest"}
          />

          <DashboardCard 
            title="Current Sleep Stage"
            value={currentSleepStage}
            statusText="Non-contact classification"
            statusType="info"
            icon={Moon}
            iconColorClass="emerald"
          />

          <DashboardCard 
            title="Last Motion Spike"
            value="05:32 AM"
            unit=""
            statusText="Waking stretch (Low)"
            statusType="success"
            icon={AlertTriangle}
            iconColorClass="mint"
          />

          <DashboardCard 
            title="Wi-Fi CSI Signal"
            value="98%"
            unit="quality"
            statusText="Nexmon Firmware Active"
            statusType="success"
            icon={Wifi}
            iconColorClass="normal"
          />
        </div>

        {/* Charts & Graphs Grid */}
        <div className="dashboard-grid-two-col">
          {/* Live Waveform */}
          <BreathingChart type="live" data={liveData} />
          
          {/* Threshold Settings */}
          <div className="log-card">
            <div className="chart-card-header">
              <div className="chart-card-title">
                <h3>Respiration Alert Thresholds</h3>
                <p>Configure notifications for anomalous chest motions</p>
              </div>
              <Sliders size={20} style={{ color: 'var(--color-forest)' }} />
            </div>

            <div className="settings-panel">
              <div className="settings-slider-group">
                <div className="settings-slider-header">
                  <span>Low Respiration Rate Limit</span>
                  <span style={{ color: 'var(--status-critical)' }}>{lowThreshold} bpm</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="15" 
                  value={lowThreshold} 
                  onChange={(e) => setLowThreshold(parseInt(e.target.value))}
                  className="settings-slider" 
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Triggers Bradypnea / Apnea emergency alarms if breaths fall below this.
                </p>
              </div>

              <div className="settings-slider-group" style={{ marginTop: '1rem' }}>
                <div className="settings-slider-header">
                  <span>High Respiration Rate Limit</span>
                  <span style={{ color: 'var(--status-critical)' }}>{highThreshold} bpm</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="35" 
                  value={highThreshold} 
                  onChange={(e) => setHighThreshold(parseInt(e.target.value))}
                  className="settings-slider" 
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Triggers Tachypnea alarms indicating hyperventilation or distress.
                </p>
              </div>

              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Notifications</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.8rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                    <strong>Mobile Push:</strong> <span style={{ color: 'var(--status-normal)', marginLeft: 'auto' }}>Active</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.8rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                    <strong>Nurse Console alert:</strong> <span style={{ color: 'var(--status-normal)', marginLeft: 'auto' }}>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Sleep Hypnogram & History Trend & Logs */}
        <div className="dashboard-grid-two-col">
          {/* Sleep Stage Chart */}
          <SleepHypnogram data={sleepData} />

          {/* Motion Event Log */}
          <div className="log-card">
            <div className="chart-card-header">
              <div className="chart-card-title">
                <h3>Movement & Agitation Log</h3>
                <p>Chest displacement variance events</p>
              </div>
            </div>

            <div className="log-list">
              {motionLogs.map((log, idx) => {
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

        <div className="dashboard-grid-even">
          {/* Historical Trend Chart */}
          <BreathingChart type="trend" data={trendData} />
          
          {/* Device & Wi-Fi CSI Specifications Panel */}
          <div className="log-card">
            <div className="chart-card-header">
              <div className="chart-card-title">
                <h3>Nexmon CSI Transceiver Specs</h3>
                <p>Contactless Wi-Fi Channel State telemetry</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Host Hardware</span>
                <strong>Raspberry Pi 4 Model B (4GB)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Wi-Fi Chipset</span>
                <strong>Broadcom BCM43455c0</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>CSI Extraction Patch</span>
                <strong>Nexmon firmware (80 MHz bandwidth)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Center Frequency</span>
                <strong>5.805 GHz (Channel 161)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subcarriers Packets</span>
                <strong>256 OFDM subcarriers</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Lightweight Neural Net</span>
                <strong>1D-CNN + LSTM Classifier (0.8s latency)</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
