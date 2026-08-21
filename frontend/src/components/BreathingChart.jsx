import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';

export default function BreathingChart({ type = 'live', data }) {
  if (type === 'live') {
    return (
      <div className="chart-card">
        <div className="chart-card-header">
          <div className="chart-card-title">
            <h3>Live Respiration Waveform</h3>
            <p style={{ color: 'var(--color-forest)', fontWeight: '600' }}>
              CSI-derived chest wall micro-movements
            </p>
          </div>
          <div className="metric-status-badge status-badge-success" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            <span className="status-dot normal" style={{ margin: 0, width: 8, height: 8 }}></span>
            <span>CSI Signal Active</span>
          </div>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="liveGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-emerald)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--color-emerald)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" hide={true} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-primary)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
                labelStyle={{ display: 'none' }}
              />
              <Line
                type="monotone"
                dataKey="amplitude"
                stroke="var(--color-emerald)"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false} // Makes the sliding waveform look smooth like a real medical monitor
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // 7-day Historical Trend
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">
          <h3>Respiration Trend</h3>
          <p>Average breathing rate over past 7 days</p>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Normal range: 12 - 20 bpm
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-forest)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="var(--color-forest)" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} 
              stroke="var(--border-color)"
            />
            <YAxis 
              domain={[8, 24]} 
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              stroke="var(--border-color)"
            />
            <Tooltip 
              contentStyle={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="bpm"
              stroke="var(--color-forest)"
              strokeWidth={2.5}
              fill="url(#trendGrad)"
              dot={{ stroke: 'var(--color-forest)', strokeWidth: 2, fill: '#fff', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
