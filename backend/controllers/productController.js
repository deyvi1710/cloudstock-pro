const { v4: uuidv4 } = require('uuid');
const { db, usingDemo } = require('../config/firebase');

// Demo data en memoria cuando Firebase no esta disponible
let demoProducts = [
  { id: '1', codigo: 'PRD-001', nombre: 'Laptop Dell XPS 13', categoria: 'Electronica', cantidad: 15, precio: 3500, fechaRegistro: new Date('2024-01-10').toISOString() },
  { id: '2', codigo: 'PRD-002', nombre: 'Mouse Logitech MX3', categoria: 'Accesorios', cantidad: 3, precio: 280, fechaRegistro: new Date('2024-01-15').toISOString() },
  { id: '3', codigo: 'PRD-003', nombre: 'Monitor LG 27"', categoria: 'Electronica', cantidad: 0, precio: 1200, fechaRegistro: new Date('2024-01-20').toISOString() },
  { id: '4', codigo: 'PRD-004', nombre: 'Teclado Mecanico', categoria: 'Accesorios', cantidad: 8, precio: 450, fechaRegistro: new Date('2024-02-01').toISOString() },
  { id: '5', codigo: 'PRD-005', nombre: 'Silla Ergonomica', categoria: 'Muebles', cantidad: 5, precio: 950, fechaRegistro: new Date('2024-02-05').toISOString() },
  { id: '6', codigo: 'PRD-006', nombre: 'Webcam HD 1080p', categoria: 'Accesorios', cantidad: 2, precio: 320, fechaRegistro: new Date('2024-02-10').toISOString() },
  { id: '7', codigo: 'PRD-007', nombre: 'Disco SSD 1TB', categoria: 'Almacenamiento', cantidad: 12, precio: 580, fechaRegistro: new Date('2024-02-15').toISOString() },
  { id: '8', codigo: 'PRD-008', nombre: 'UPS 1200VA', categoria: 'Electronica', cantidad: 4, precio: 750, fechaRegistro: new Date('2024-03-01').toISOString() },
];

const REF = 'productos';

const snapToArray = (snap) => {
  const val = snap.val();
  if (!val) return [];
  return Object.entries(val).map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
};

exports.getAll = async (req, res) => {
  try {
    if (usingDemo) return res.json(demoProducts);
    const snap = await db.ref(REF).once('value');
    res.json(snapToArray(snap));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (usingDemo) {
      const p = demoProducts.find(x => x.id === id);
      return p ? res.json(p) : res.status(404).json({ error: 'Producto no encontrado' });
    }
    const snap = await db.ref(`${REF}/${id}`).once('value');
    if (!snap.exists()) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ id: snap.key, ...snap.val() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { codigo, nombre, categoria, cantidad, precio } = req.body;
    if (!codigo || !nombre || !categoria || cantidad === undefined || precio === undefined) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const newProduct = {
      codigo, nombre, categoria,
      cantidad: Number(cantidad),
      precio: Number(precio),
      fechaRegistro: new Date().toISOString()
    };
    if (usingDemo) {
      const product = { id: uuidv4(), ...newProduct };
      demoProducts.unshift(product);
      return res.status(201).json(product);
    }
    const ref = await db.ref(REF).push(newProduct);
    res.status(201).json({ id: ref.key, ...newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.cantidad !== undefined) updates.cantidad = Number(updates.cantidad);
    if (updates.precio !== undefined) updates.precio = Number(updates.precio);

    if (usingDemo) {
      const idx = demoProducts.findIndex(x => x.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
      demoProducts[idx] = { ...demoProducts[idx], ...updates };
      return res.json(demoProducts[idx]);
    }
    await db.ref(`${REF}/${id}`).update(updates);
    const snap = await db.ref(`${REF}/${id}`).once('value');
    res.json({ id: snap.key, ...snap.val() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    if (usingDemo) {
      const idx = demoProducts.findIndex(x => x.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
      demoProducts.splice(idx, 1);
      return res.json({ message: 'Producto eliminado' });
    }
    await db.ref(`${REF}/${id}`).remove();
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    let products;
    if (usingDemo) {
      products = demoProducts;
    } else {
      const snap = await db.ref(REF).once('value');
      products = snapToArray(snap);
    }
    const total = products.length;
    const critico = products.filter(p => p.cantidad > 0 && p.cantidad <= 5).length;
    const agotado = products.filter(p => p.cantidad === 0).length;
    const valorTotal = products.reduce((acc, p) => acc + (p.cantidad * p.precio), 0);
    const categorias = [...new Set(products.map(p => p.categoria))];
    const porCategoria = categorias.map(cat => ({
      categoria: cat,
      total: products.filter(p => p.categoria === cat).length,
      cantidad: products.filter(p => p.categoria === cat).reduce((a, p) => a + p.cantidad, 0)
    }));
    res.json({ total, critico, agotado, valorTotal, porCategoria });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
