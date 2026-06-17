require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CloudStock Pro Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    firebase: process.env.FIREBASE_PROJECT_ID ? 'connected' : 'demo-mode'
  });
});

app.use('/api/products', productRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 CloudStock Backend corriendo en http://localhost:${PORT}`);
  console.log(`📦 Firebase: ${process.env.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PROJECT_ID : 'modo demo'}`);
});
