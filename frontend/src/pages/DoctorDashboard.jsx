import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Bell, 
  Search, 
  Activity, 
  Moon, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import Sidebar from '../components/Sidebar';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Patient mock states that can float/live update
  const [patients, setPatients] = useState([
    {
      id: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      room: 'Room 102',
      bpm: 16.2,
      sleepStage: 'REM',
      status: 'normal', // normal, warning, critical
      lastAlert: 'None',
      sparkline: []
    },
    {
      id: 'david-miller',
      name: 'David Miller',
      room: 'Room 105',
      bpm: 8.4, // Bradypnea
      sleepStage: 'Awake',
      status: 'critical',
      lastAlert: 'Apnea Warning (08:44 AM)',
      sparkline: []
    },
    {
      id: 'baby-ethan',
      name: 'Baby Ethan',
      room: 'NICU Pod 3',
      bpm: 34.5, // infants naturally breathe faster
      sleepStage: 'Deep',
      status: 'normal',
      lastAlert: 'None',
      sparkline: []
    },
    {
      id: 'james-vance',
      name: 'James Vance',
      room: 'Room 201',
      bpm: 24.8, // Tachypnea / Agitated
      sleepStage: 'Awake',
      status: 'warning',
      lastAlert: 'High Breathing Rate (11:22 AM)',
      sparkline: []
    }
  ]);

  // Generate initial sparkline data
  useEffect(() => {
    setPatients((prevPatients) => 
      prevPatients.map((p) => {
        const points = [];
        const baseBpm = p.bpm;
        for (let i = 0; i < 15; i++) {
          points.push({
            val: baseBpm + Math.sin(i * 0.8) * 1.5 + (Math.random() - 0.5) * 0.8
          });
        }
        return { ...p, sparkline: points };
      })
    );
  }, []);

  // Update sparklines and values periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients((prevPatients) => 
        prevPatients.map((p) => {
          // Add minor noise to BPM
          const shift = (Math.random() - 0.5) * 0.6;
          let nextBpm = parseFloat((p.bpm + shift).toFixed(1));
          
          // Keep within reasonable bounds based on patient
          if (p.id === 'david-miller') {
            nextBpm = Math.max(7.5, Math.min(9.9, nextBpm)); // Keep apnea warning
          } else if (p.id === 'baby-ethan') {
            nextBpm = Math.max(32.0, Math.min(38.0, nextBpm));
          } else if (p.id === 'james-vance') {
            nextBpm = Math.max(22.0, Math.min(27.0, nextBpm)); // Keep tachypnea
          } else {
            nextBpm = Math.max(14.0, Math.min(18.0, nextBpm));
          }

          const nextSparkline = [...p.sparkline.slice(1)];
          nextSparkline.push({ val: nextBpm + (Math.random() - 0.5) * 0.5 });

          return {
            ...p,
            bpm: nextBpm,
            sparkline: nextSparkline
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeAlerts = patients.filter(p => p.status !== 'normal');

  return (
    <div className="dashboard-layout">
      <Sidebar role="doctor" />

      <main className="dashboard-main animate-fade-in">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Clinical Console</h1>
            <p>Remote contactless Wi-Fi telemetry for Ward 4B</p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <span className="status-dot normal" style={{ width: 8, height: 8, margin: 0 }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>CSI Transceiver hub: <strong>Online</strong></span>
          </div>
        </div>

        {/* Multi-patient Live Sparkline Cards */}
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} style={{ color: 'var(--color-forest)' }} />
            <span>Ward Live Feed (CSI Resp Waveforms)</span>
          </h2>
          
          <div className="patient-live-grid">
            {patients.map((p) => {
              let borderClass = '';
              if (p.status === 'warning') borderClass = 'warning-card';
              if (p.status === 'critical') borderClass = 'critical-card';

              return (
                <div 
                  className={`patient-live-card ${borderClass}`}
                  key={p.id}
                  onClick={() => navigate(`/patient/${p.id}`)}
                >
                  <div className="patient-live-header">
                    <div>
                      <strong style={{ display: 'block', fontSize: '1rem' }}>{p.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.room}</span>
                    </div>
                    <span className={`status-dot ${p.status}`}></span>
                  </div>

                  <div className="patient-live-stats">
                    <div className="patient-live-bpm">
                      <span>{p.bpm}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)' }}>bpm</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.8rem' }}>
                      <Moon size={14} style={{ color: 'var(--color-emerald)' }} />
                      <span>{p.sleepStage}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginTop: '0.25rem' }}>
                    <div className="sparkline-wrapper">
                      {p.sparkline.length > 0 && (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={p.sparkline}>
                            <Line 
                              type="monotone" 
                              dataKey="val" 
                              stroke={p.status === 'critical' ? 'var(--status-critical)' : p.status === 'warning' ? 'var(--status-warning)' : 'var(--color-emerald)'}
                              strokeWidth={1.5}
                              dot={false}
                              isAnimationActive={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <button style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Layout: Grid dividing patient list and urgent alerts sidebar */}
        <div className="dashboard-grid-two-col">
          {/* Patient Table Card */}
          <div className="log-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="chart-card-title">
                <h3>Patient Roster</h3>
                <p>Select a patient to access detailed respiration and sleep diagnostics</p>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Search room or name..." 
                  className="form-input" 
                  style={{ paddingLeft: '2.3rem', width: '220px', fontSize: '0.85rem', margin: 0 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table className="patient-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Room</th>
                    <th>Breathing Rate</th>
                    <th>Sleep Stage</th>
                    <th>Last System Alert</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((p) => (
                    <tr key={p.id} onClick={() => navigate(`/patient/${p.id}`)}>
                      <td>
                        <div className="patient-profile">
                          <div className="patient-avatar">
                            {p.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="patient-name-container">
                            <span className="patient-name">{p.name}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: CONV-{p.id.slice(0,4).toUpperCase()}</span>
                          </div>
                        </div>
                      </td>
                      <td>{p.room}</td>
                      <td>
                        <strong style={{ fontSize: '1.1rem' }}>{p.bpm}</strong> <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>bpm</span>
                      </td>
                      <td>{p.sleepStage}</td>
                      <td style={{ color: p.status === 'critical' ? 'var(--status-critical)' : p.status === 'warning' ? 'var(--status-warning)' : 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {p.lastAlert}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className={`status-dot ${p.status}`}></span>
                          <span style={{ textTransform: 'capitalize', fontSize: '0.85rem', fontWeight: '600' }}>{p.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                        No patients found matching the query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Urgent Alerts Panel */}
          <div className="log-card">
            <div className="chart-card-header">
              <div className="chart-card-title" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Bell size={20} style={{ color: 'var(--status-critical)' }} />
                <h3>Urgent Care Alerts</h3>
              </div>
              <span className="metric-status-badge status-badge-danger">
                {activeAlerts.length} Active
              </span>
            </div>

            <div className="alerts-list-panel">
              {activeAlerts.map((p) => (
                <div 
                  className={`alert-item-card ${p.status === 'warning' ? 'warning' : ''}`}
                  key={p.id}
                  onClick={() => navigate(`/patient/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="alert-item-header">
                    <span>{p.room}</span>
                    <span>{p.status === 'critical' ? 'CRITICAL' : 'WARNING'}</span>
                  </div>
                  <div className="alert-item-msg">
                    {p.name} — {p.bpm} bpm
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {p.id === 'david-miller' 
                      ? 'Bradypnea event. Respiration fell below threshold of 10 bpm. Apnea warning triggered.' 
                      : 'Tachypnea event. Respiration exceeded threshold of 24 bpm. Agitation spikes detected.'
                    }
                  </p>
                </div>
              ))}

              {activeAlerts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  All patient thresholds normal. Wi-Fi CSI monitoring steady.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
