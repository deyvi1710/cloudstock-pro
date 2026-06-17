import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { productService } from '../services/api';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6', '#EC4899', '#14B8A6'];

export default function Reportes() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [data, s] = await Promise.all([productService.getAll(), productService.getStats()]);
        setProducts(data); setStats(s);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return (
    <div className="empty" style={{ marginTop: 80 }}>
      <div className="spinner" style={{ margin: '0 auto' }}></div>
    </div>
  );

  const topStock = [...products].sort((a, b) => b.cantidad - a.cantidad).slice(0, 8);
  const topValor = [...products].sort((a, b) => (b.cantidad * b.precio) - (a.cantidad * a.precio)).slice(0, 5);
  const criticos = products.filter(p => p.cantidad > 0 && p.cantidad <= 5);
  const agotados = products.filter(p => p.cantidad === 0);
  const catData = stats?.porCategoria || [];

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">
          <h2>Reportes y Estadísticas</h2>
          <p>Análisis visual del inventario</p>
        </div>
      </div>

      <div className="page">
        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { label: 'Total Productos', value: stats?.total || 0, color: '#6366F1' },
            { label: 'Valor Total (S/)', value: `${stats?.valorTotal?.toFixed(0) || 0}`, color: '#10B981' },
            { label: 'Stock Crítico', value: stats?.critico || 0, color: '#F59E0B' },
            { label: 'Agotados', value: stats?.agotado || 0, color: '#EF4444' }
          ].map(k => (
            <div className="kpi-card" key={k.label}>
              <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
              <div className="kpi-label">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="reports-grid">
          <div className="card">
            <div className="card-header"><h3>Stock por Producto (Top 8)</h3></div>
            <div className="card-body">
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topStock} margin={{ top: 5, right: 10, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="nombre" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => [`${v} uds.`, 'Stock']} />
                    <Bar dataKey="cantidad" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Distribución por Categoría</h3></div>
            <div className="card-body">
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={catData} dataKey="total" nameKey="categoria" cx="50%" cy="50%" outerRadius={90} label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {catData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [v, n]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Top 5 por Valor de Inventario</h3></div>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>#</th><th>Nombre</th><th>Categoría</th><th>Stock</th><th>Precio Unit.</th><th>Valor Total</th></tr></thead>
              <tbody>
                {topValor.map((p, i) => (
                  <tr key={p.id}>
                    <td><strong style={{ color: 'var(--primary)' }}>#{i + 1}</strong></td>
                    <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                    <td><span className="badge badge-neutral">{p.categoria}</span></td>
                    <td>{p.cantidad}</td>
                    <td>S/ {Number(p.precio).toFixed(2)}</td>
                    <td><strong>S/ {(p.cantidad * p.precio).toFixed(2)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {(criticos.length > 0 || agotados.length > 0) && (
          <div className="card">
            <div className="card-header">
              <h3>⚠️ Productos que Requieren Atención</h3>
              <span className="badge badge-danger">{criticos.length + agotados.length} alertas</span>
            </div>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Stock</th><th>Estado</th></tr></thead>
                <tbody>
                  {[...agotados, ...criticos].map(p => (
                    <tr key={p.id}>
                      <td><code>{p.codigo}</code></td>
                      <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                      <td><span className="badge badge-neutral">{p.categoria}</span></td>
                      <td style={{ fontWeight: 700, color: p.cantidad === 0 ? 'var(--danger)' : 'var(--warning)' }}>{p.cantidad}</td>
                      <td>{p.cantidad === 0 ? <span className="badge badge-danger">Agotado</span> : <span className="badge badge-warning">Crítico</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
