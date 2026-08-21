import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export default function SleepHypnogram({ data }) {
  // Format Y-axis values from numeric to sleep stage text
  const formatYAxis = (val) => {
    switch (val) {
      case 3: return 'Awake';
      case 2: return 'REM';
      case 1: return 'Light';
      case 0: return 'Deep';
      default: return '';
    }
  };

  // Custom Tooltip formatter
  const formatTooltip = (value, name, props) => {
    return [formatYAxis(value), 'Sleep Stage'];
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">
          <h3>Sleep Stage Timeline (Hypnogram)</h3>
          <p>Contactless estimation of sleep architecture</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }}></span> Awake
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#3b82f6' }}></span> REM
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4ade80' }}></span> Light
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#1b5e3a' }}></span> Deep
          </span>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-emerald)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="var(--color-emerald)" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              stroke="var(--border-color)"
            />
            <YAxis 
              domain={[0, 3]} 
              ticks={[0, 1, 2, 3]}
              tickFormatter={formatYAxis}
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              stroke="var(--border-color)"
            />
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{ 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            />
            <Area
              type="stepAfter"
              dataKey="stage"
              stroke="var(--color-forest)"
              strokeWidth={2}
              fill="url(#sleepGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
