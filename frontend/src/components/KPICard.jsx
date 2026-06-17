export default function KPICard({ icon, title, value, color = 'primary', subtitle }) {
  return (
    <div className="kpi-card">
      <div className={`kpi-icon ${color}`}>{icon}</div>
      <div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-label">{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{subtitle}</div>}
      </div>
    </div>
  );
}
