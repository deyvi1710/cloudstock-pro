import { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, X, Package, AlertTriangle } from 'lucide-react';
import { productService } from '../services/api';

const CATEGORIAS = ['Electronica', 'Accesorios', 'Muebles', 'Almacenamiento', 'Ropa', 'Alimentos', 'Herramientas', 'Otros'];

const getStockBadge = (qty) => {
  if (qty === 0) return <span className="badge badge-danger">Agotado</span>;
  if (qty <= 5) return <span className="badge badge-warning">Crítico</span>;
  return <span className="badge badge-success">Normal</span>;
};

const empty = { codigo: '', nombre: '', categoria: 'Electronica', cantidad: 1, precio: 0 };

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let data = products;
    if (search) data = data.filter(p =>
      p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      p.codigo?.toLowerCase().includes(search.toLowerCase())
    );
    if (catFilter) data = data.filter(p => p.categoria === catFilter);
    setFiltered(data);
  }, [products, search, catFilter]);

  const load = async () => {
    setLoading(true);
    try { setProducts(await productService.getAll()); }
    catch (e) { showToast('Error al cargar productos', 'error'); }
    finally { setLoading(false); }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => { setForm(empty); setEditId(null); setErrors({}); setModal(true); };
  const openEdit = (p) => {
    setForm({ codigo: p.codigo, nombre: p.nombre, categoria: p.categoria, cantidad: p.cantidad, precio: p.precio });
    setEditId(p.id); setErrors({}); setModal(true);
  };

  const validate = () => {
    const e = {};
    if (!form.codigo.trim()) e.codigo = 'Obligatorio';
    if (!form.nombre.trim()) e.nombre = 'Obligatorio';
    if (form.cantidad < 0) e.cantidad = 'No puede ser negativo';
    if (form.precio < 0) e.precio = 'No puede ser negativo';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (editId) {
        await productService.update(editId, form);
        showToast('Producto actualizado');
      } else {
        await productService.create(form);
        showToast('Producto creado');
      }
      setModal(false); await load();
    } catch (e) { showToast(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const remove = async () => {
    try {
      await productService.remove(confirmId);
      showToast('Producto eliminado');
      setConfirmId(null); await load();
    } catch (e) { showToast(e.message, 'error'); }
  };

  const criticos = products.filter(p => p.cantidad > 0 && p.cantidad <= 5);
  const agotados = products.filter(p => p.cantidad === 0);

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">
          <h2>Gestión de Productos</h2>
          <p>{products.length} productos registrados</p>
        </div>
        <div className="topbar-actions">
          <button className="btn btn-primary" onClick={openCreate}>
            <Plus size={16} /> Nuevo Producto
          </button>
        </div>
      </div>

      <div className="page">
        {(criticos.length > 0 || agotados.length > 0) && (
          <div className="alert alert-warning">
            <AlertTriangle size={16} />
            {criticos.length > 0 && <span><strong>{criticos.length}</strong> producto(s) en stock crítico</span>}
            {agotados.length > 0 && <span> · <strong>{agotados.length}</strong> producto(s) agotado(s)</span>}
          </div>
        )}

        <div className="card">
          <div className="toolbar">
            <div className="toolbar-left">
              <div className="search-bar" style={{ minWidth: 280 }}>
                <Search size={16} className="search-icon" />
                <input placeholder="Buscar por nombre o código..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="form-select" style={{ width: 'auto' }} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                <option value="">Todas las categorías</option>
                {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="toolbar-right">
              <span className="badge badge-neutral">{filtered.length} resultados</span>
            </div>
          </div>

          <div className="table-wrapper">
            {loading ? (
              <div className="empty"><div className="spinner" style={{ margin: '40px auto' }}></div></div>
            ) : filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">📦</div>
                <p>No se encontraron productos</p>
                <span>Agrega tu primer producto con el botón "Nuevo Producto"</span>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Código</th><th>Nombre</th><th>Categoría</th>
                    <th>Cantidad</th><th>Precio</th><th>Valor</th>
                    <th>Estado</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td><code>{p.codigo}</code></td>
                      <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                      <td><span className="badge badge-neutral">{p.categoria}</span></td>
                      <td style={{ fontWeight: 600, color: p.cantidad === 0 ? 'var(--danger)' : p.cantidad <= 5 ? 'var(--warning)' : 'inherit' }}>
                        {p.cantidad}
                      </td>
                      <td>S/ {Number(p.precio).toFixed(2)}</td>
                      <td>S/ {(p.cantidad * p.precio).toFixed(2)}</td>
                      <td>{getStockBadge(p.cantidad)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(p)} title="Editar"><Pencil size={14} /></button>
                          <button className="btn btn-ghost btn-sm btn-icon" style={{ color: 'var(--danger)' }} onClick={() => setConfirmId(p.id)} title="Eliminar"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* MODAL FORM */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Código <span>*</span></label>
                  <input className={`form-input${errors.codigo ? ' error' : ''}`} value={form.codigo}
                    onChange={e => setForm({ ...form, codigo: e.target.value })} placeholder="PRD-001" />
                  {errors.codigo && <div className="form-error">{errors.codigo}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Nombre <span>*</span></label>
                  <input className={`form-input${errors.nombre ? ' error' : ''}`} value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre del producto" />
                  {errors.nombre && <div className="form-error">{errors.nombre}</div>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Categoría</label>
                <select className="form-select" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
                  {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Cantidad</label>
                  <input type="number" min="0" className={`form-input${errors.cantidad ? ' error' : ''}`}
                    value={form.cantidad} onChange={e => setForm({ ...form, cantidad: Number(e.target.value) })} />
                  {errors.cantidad && <div className="form-error">{errors.cantidad}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Precio (S/)</label>
                  <input type="number" min="0" step="0.01" className={`form-input${errors.precio ? ' error' : ''}`}
                    value={form.precio} onChange={e => setForm({ ...form, precio: Number(e.target.value) })} />
                  {errors.precio && <div className="form-error">{errors.precio}</div>}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>
                {saving ? 'Guardando...' : editId ? 'Actualizar' : 'Crear Producto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE */}
      {confirmId && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 380 }}>
            <div className="modal-body" style={{ textAlign: 'center', paddingTop: 32 }}>
              <div className="confirm-icon"><Trash2 size={24} /></div>
              <h3 style={{ marginBottom: 8 }}>¿Eliminar producto?</h3>
              <p className="confirm-text">Esta acción no se puede deshacer. El producto será eliminado permanentemente.</p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: 12, paddingBottom: 24 }}>
              <button className="btn btn-danger" onClick={remove}>Sí, eliminar</button>
              <button className="btn btn-ghost" onClick={() => setConfirmId(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  );
}
