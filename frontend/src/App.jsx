import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Reportes from './pages/Reportes';
import DevOps from './pages/DevOps';
import Configuracion from './pages/Configuracion';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/devops" element={<DevOps />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
