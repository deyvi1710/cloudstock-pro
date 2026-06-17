import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, BarChart3,
  Terminal, Settings, Cloud
} from 'lucide-react';

const nav = [
  { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/productos', icon: <Package size={18} />, label: 'Productos' },
  { to: '/reportes', icon: <BarChart3 size={18} />, label: 'Reportes' },
  { to: '/devops', icon: <Terminal size={18} />, label: 'Centro DevOps' },
  { to: '/configuracion', icon: <Settings size={18} />, label: 'Configuración' }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">📦</div>
        <div>
          <h1>CloudStock Pro</h1>
          <span>Inventario Cloud</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-title">Navegación</p>
        <ul className="sidebar-nav">
          {nav.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', color: '#475569', fontSize: 12 }}>
          <Cloud size={14} />
          <span>Firebase Firestore</span>
          <span style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
        </div>
        <div style={{ fontSize: 11, color: '#334155', marginTop: 8 }}>
          v1.0.0 · Computación en la Nube
        </div>
      </div>
    </aside>
  );
}
