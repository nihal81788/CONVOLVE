import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  TrendingUp, 
  Bell, 
  Settings, 
  Users, 
  FileText, 
  LogOut 
} from 'lucide-react';
import Logo from '../Logo';

export default function Sidebar({ role }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to login
    navigate('/login');
  };

  // Define menu items based on role
  const patientMenuItems = [
    { name: 'Dashboard', path: '/dashboard/patient', icon: LayoutDashboard },
    { name: 'Sleep History', path: '#sleep-history', icon: History },
    { name: 'Breathing Trends', path: '#breathing-trends', icon: TrendingUp },
    { name: 'Alerts', path: '#alerts', icon: Bell },
    { name: 'Settings', path: '#settings', icon: Settings },
  ];

  const doctorMenuItems = [
    { name: 'Patient List', path: '/dashboard/doctor', icon: Users },
    { name: 'Active Alerts', path: '#alerts', icon: Bell },
    { name: 'Reports', path: '#reports', icon: FileText },
    { name: 'Settings', path: '#settings', icon: Settings },
  ];

  const menuItems = role === 'doctor' ? doctorMenuItems : patientMenuItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo-area">
        <Link to="/" style={{ display: 'block' }}>
          <Logo size="small" />
        </Link>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // For now, treat '#' paths as active if location hash matches or if it's the dashboard and path matches
          const isActive = location.pathname === item.path || location.hash === item.path;
          
          return (
            <li 
              key={item.name} 
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              {item.path.startsWith('/') ? (
                <Link to={item.path}>
                  <Icon className="sidebar-item-icon" size={20} />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <a href={item.path}>
                  <Icon className="sidebar-item-icon" size={20} />
                  <span>{item.name}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut className="sidebar-item-icon" size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
