import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, GitBranch, Container, Database, Zap } from 'lucide-react';

const pipelineSteps = [
  { label: 'Push/PR', icon: '📤', state: 'done' },
  { label: 'Checkout', icon: '📋', state: 'done' },
  { label: 'Install Deps', icon: '📦', state: 'done' },
  { label: 'Build Frontend', icon: '⚛️', state: 'done' },
  { label: 'Build Backend', icon: '🟢', state: 'done' },
  { label: 'Docker Build', icon: '🐳', state: 'done' },
  { label: 'Verify', icon: '✅', state: 'done' },
  { label: 'Deploy', icon: '🚀', state: 'done' }
];

const techStack = [
  { icon: '⚛️', name: 'React 18', version: 'v18.2', cat: 'Frontend' },
  { icon: '⚡', name: 'Vite 5', version: 'v5.1', cat: 'Build Tool' },
  { icon: '🟢', name: 'Node.js', version: 'v18 LTS', cat: 'Backend' },
  { icon: '🚀', name: 'Express', version: 'v4.18', cat: 'Framework' },
  { icon: '🔥', name: 'Firebase', version: 'Firestore', cat: 'Database' },
  { icon: '🐳', name: 'Docker', version: 'v24', cat: 'Container' },
  { icon: '🔄', name: 'GitHub Actions', version: 'CI/CD', cat: 'DevOps' },
  { icon: '🌐', name: 'Nginx', version: 'v1.25', cat: 'Proxy' }
];

export default function DevOps() {
  const [backendStatus, setBackendStatus] = useState(null);

  useEffect(() => {
    fetch('/api/../health')
      .then(r => r.json())
      .then(d => setBackendStatus(d))
      .catch(() => setBackendStatus({ status: 'demo' }));
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">
          <h2>Centro DevOps</h2>
          <p>Estado de la infraestructura y pipeline CI/CD</p>
        </div>
        <div className="topbar-actions">
          <span className="badge badge-success">Pipeline OK</span>
        </div>
      </div>

      <div className="page">
        {/* SERVICES STATUS */}
        <div className="devops-grid">
          {[
            { name: 'Frontend React', desc: 'Vite + React 18', icon: '⚛️', status: 'online', port: ':3000' },
            { name: 'Backend Express', desc: backendStatus?.service || 'Node.js API', icon: '🟢', status: backendStatus?.status === 'ok' ? 'online' : 'demo', port: ':5000' },
            { name: 'Firebase Firestore', desc: backendStatus?.firebase || 'Base de datos cloud', icon: '🔥', status: backendStatus?.firebase === 'connected' ? 'online' : 'demo', port: 'cloud' },
            { name: 'Nginx Gateway', desc: 'Reverse proxy', icon: '🌐', status: 'online', port: ':80' },
            { name: 'Docker Network', desc: 'cloudstock-net', icon: '🐳', status: 'online', port: 'bridge' },
            { name: 'GitHub Actions', desc: 'CI/CD pipeline', icon: '🔄', status: 'online', port: 'cloud' }
          ].map(s => (
            <div className="devops-card" key={s.name}>
              <div className="service-header">
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-status">{s.desc}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={s.status === 'online' ? 'status-online' : 'text-warning'}>
                  {s.status === 'online' ? '● Activo' : '● Demo'}
                </span>
                <code style={{ fontSize: 11, background: 'var(--bg)', padding: '2px 8px', borderRadius: 4 }}>{s.port}</code>
              </div>
            </div>
          ))}
        </div>

        {/* PIPELINE */}
        <div className="pipeline" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Zap size={18} color="var(--primary)" />
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Pipeline CI/CD — GitHub Actions</h3>
            <span className="badge badge-success" style={{ marginLeft: 'auto' }}>✓ Exitoso</span>
          </div>
          <div className="pipeline-steps">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`pipeline-step ${step.state}`}>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-label">{step.label}</div>
                </div>
                {i < pipelineSteps.length - 1 && <div className={`pipeline-connector ${step.state}`} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)', background: '#0F172A', padding: '12px 16px', borderRadius: 8, fontFamily: 'monospace' }}>
            <div style={{ color: '#10B981' }}>✓ Run #42 · main · hace 2 minutos · 1m 23s</div>
            <div style={{ color: '#94A3B8', marginTop: 4 }}>📝 feat: add stock critical alert system</div>
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-header"><h3>Arquitectura del Sistema</h3></div>
          <div className="card-body">
            <div className="arch-diagram">
              <div className="arch-row">
                <div className="arch-box accent">
                  <div className="arch-title">👤 Usuario</div>
                  <div className="arch-desc">Browser</div>
                </div>
              </div>
              <div className="arch-arrow">↓</div>
              <div className="arch-row">
                <div className="arch-box">
                  <div className="arch-title">🌐 Nginx</div>
                  <div className="arch-desc">Reverse Proxy · :80</div>
                </div>
              </div>
              <div className="arch-arrow">↓</div>
              <div className="arch-row" style={{ gap: 40 }}>
                <div className="arch-box accent">
                  <div className="arch-title">⚛️ Frontend</div>
                  <div className="arch-desc">React + Vite · :3000</div>
                </div>
                <div className="arch-box accent">
                  <div className="arch-title">🟢 Backend</div>
                  <div className="arch-desc">Express API · :5000</div>
                </div>
              </div>
              <div className="arch-arrow">↓</div>
              <div className="arch-row">
                <div className="arch-box dark">
                  <div className="arch-title">🔥 Firebase Firestore</div>
                  <div className="arch-desc">Cloud NoSQL Database</div>
                </div>
              </div>
              <div className="arch-arrow">↓</div>
              <div className="arch-row" style={{ gap: 20 }}>
                <div className="arch-box">
                  <div className="arch-title">🐳 Docker</div>
                  <div className="arch-desc">Contenedores</div>
                </div>
                <div className="arch-box">
                  <div className="arch-title">🔄 GitHub Actions</div>
                  <div className="arch-desc">CI/CD Pipeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="card">
          <div className="card-header"><h3>Stack Tecnológico</h3></div>
          <div className="card-body">
            <div className="tech-grid">
              {techStack.map(t => (
                <div className="tech-card" key={t.name}>
                  <div className="tech-icon">{t.icon}</div>
                  <div className="tech-name">{t.name}</div>
                  <div className="tech-version">{t.version}</div>
                  <div style={{ marginTop: 6 }}><span className="badge badge-primary" style={{ fontSize: 10 }}>{t.cat}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
