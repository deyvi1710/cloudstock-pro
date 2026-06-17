import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';

export default function Configuracion() {
  const [config, setConfig] = useState({ apiUrl: '', projectId: '', apiKey: '' });
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig({
      apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || ''
    });
  }, []);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">
          <h2>Configuración</h2>
          <p>Ajustes del sistema y conexiones</p>
        </div>
      </div>

      <div className="page">
        <div className="card" style={{ maxWidth: 640 }}>
          <div className="card-header"><h3>Conexión Firebase</h3></div>
          <div className="card-body">
            <div className="alert alert-info" style={{ marginBottom: 20 }}>
              Las credenciales se configuran como variables de entorno en el archivo <code>.env</code> del proyecto.
            </div>
            <div className="form-group">
              <label className="form-label">API URL del Backend</label>
              <input className="form-input" value={config.apiUrl} readOnly style={{ background: 'var(--bg)', fontFamily: 'monospace' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Firebase Project ID</label>
              <input className="form-input" value={config.projectId || '(no configurado)'} readOnly style={{ background: 'var(--bg)', fontFamily: 'monospace' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Firebase API Key</label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" value={config.apiKey ? (showKey ? config.apiKey : '•'.repeat(20)) : '(no configurado)'}
                  readOnly style={{ background: 'var(--bg)', fontFamily: 'monospace', paddingRight: 44 }} />
                {config.apiKey && (
                  <button onClick={() => setShowKey(!showKey)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: 640 }}>
          <div className="card-header"><h3>Variables de Entorno</h3></div>
          <div className="card-body">
            <p style={{ marginBottom: 16, color: 'var(--text-muted)', fontSize: 13 }}>
              Crea un archivo <code>.env</code> en la carpeta raíz con estas variables:
            </p>
            <pre style={{ background: '#0F172A', color: '#E2E8F0', padding: 20, borderRadius: 10, fontSize: 12, overflow: 'auto', lineHeight: 1.8 }}>
{`# Backend
PORT=5000
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_CLIENT_EMAIL=firebase@proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n..."

# Frontend (Vite)
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_API_KEY=tu-api-key`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
