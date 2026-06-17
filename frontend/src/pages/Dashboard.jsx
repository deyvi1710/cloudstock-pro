import { useState, useEffect } from 'react';
import { Package, AlertTriangle, XCircle, DollarSign, RefreshCw } from 'lucide-react';
import KPICard from '../components/KPICard';
import { productService } from '../services/api';

const getStockBadge = (qty) => {
  if (qty === 0) return <span className="badge badge-danger">Agotado</span>;
  if (qty <= 5) return <span className="badge badge-warning">Crítico</span>;
  return <span className="badge badge-success">Normal</span>;
};

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, critico: 0, agotado: 0, valorTotal: 0 });
  const [recientes, setRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [allData, statsData] = await Promise.all([
        productService.getAll(),
        productService.getStats()
      ]);
      setStats(statsData);
      setRecientes(allData.slice(0, 6));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const normal = stats.total - stats.critico - stats.agotado;

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">
          <h2>Dashboard</h2>
          <p>Resumen del inventario en tiempo real</p>
        </div>
        <div className="topbar-actions">
          <div className="topbar-status"><span className="dot"></span> Sistema operativo</div>
          <button className="btn btn-ghost btn-sm" onClick={load}>
            <RefreshCw size={14} /> Actualizar
          </button>
        </div>
      </div>

      <div className="page">
        {loading ? (
          <div className="empty"><div className="spinner" style={{ margin: '0 auto' }}></div></div>
        ) : (
          <>
            <div className="kpi-grid">
              <KPICard icon={<Package size={22} />} title="Total Productos" value={stats.total} color="primary" />
              <KPICard icon={<AlertTriangle size={22} />} title="Stock Crítico" value={stats.critico} color="warning" subtitle="≤ 5 unidades" />
              <KPICard icon={<XCircle size={22} />} title="Agotados" value={stats.agotado} color="danger" />
              <KPICard icon={<DollarSign size={22} />} title="Valor del Inventario" value={`S/ ${stats.valorTotal?.toFixed(2)}`} color="success" />
            </div>

            <div className="dashboard-grid">
              <div className="card">
                <div className="card-header">
                  <h3>Productos Recientes</h3>
                  <span className="badge badge-primary">{recientes.length} items</span>
                </div>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recientes.length === 0 ? (
                        <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>Sin productos registrados</td></tr>
                      ) : recientes.map(p => (
                        <tr key={p.id}>
                          <td><code>{p.codigo}</code></td>
                          <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                          <td><span className="badge badge-neutral">{p.categoria}</span></td>
                          <td style={{ fontWeight: 600 }}>{p.cantidad}</td>
                          <td>S/ {Number(p.precio).toFixed(2)}</td>
                          <td>{getStockBadge(p.cantidad)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <div className="card-header"><h3>Estado del Inventario</h3></div>
                <div className="card-body">
                  <div className="status-bars">
                    {[
                      { label: 'Stock Normal', value: normal, total: stats.total, color: 'var(--success)' },
                      { label: 'Stock Crítico', value: stats.critico, total: stats.total, color: 'var(--warning)' },
                      { label: 'Agotados', value: stats.agotado, total: stats.total, color: 'var(--danger)' }
                    ].map(row => (
                      <div className="status-row" key={row.label}>
                        <div className="label">
                          <span>{row.label}</span>
                          <strong>{row.value} productos</strong>
                        </div>
                        <div className="bar-bg">
                          <div className="bar-fill" style={{
                            width: row.total ? `${(row.value / row.total) * 100}%` : '0%',
                            background: row.color
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="divider" />

                  {stats.porCategoria?.slice(0, 4).map(cat => (
                    <div className="status-row" key={cat.categoria} style={{ marginBottom: 14 }}>
                      <div className="label">
                        <span>{cat.categoria}</span>
                        <strong>{cat.total} productos</strong>
                      </div>
                      <div className="bar-bg">
                        <div className="bar-fill" style={{
                          width: stats.total ? `${(cat.total / stats.total) * 100}%` : '0%',
                          background: 'var(--primary)'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
