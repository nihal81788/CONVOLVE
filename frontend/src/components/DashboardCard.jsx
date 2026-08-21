import React from 'react';

export default function DashboardCard({ 
  title, 
  value, 
  unit, 
  statusText, 
  statusType, // 'success', 'warning', 'danger', 'info'
  icon: Icon,
  iconColorClass = 'forest'
}) {
  const getBadgeClass = (type) => {
    switch (type) {
      case 'success': return 'status-badge-success';
      case 'warning': return 'status-badge-warning';
      case 'danger': return 'status-badge-danger';
      case 'info': return 'status-badge-info';
      default: return 'status-badge-success';
    }
  };

  return (
    <div className="metric-card">
      <div className="metric-info">
        <h3>{title}</h3>
        <div className="metric-value-container">
          <span className="metric-value">{value}</span>
          {unit && <span className="metric-unit">{unit}</span>}
        </div>
        {statusText && (
          <span className={`metric-status-badge ${getBadgeClass(statusType)}`}>
            {statusText}
          </span>
        )}
      </div>
      
      {Icon && (
        <div className={`metric-icon-wrapper ${iconColorClass}`}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}
