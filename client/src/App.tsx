import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { WifiSettings } from './pages/WifiSettings';
import { Devices } from './pages/Devices';
import { Security } from './pages/Security';
import { System } from './pages/System';
import { Login } from './pages/Login';
import { NetworkSettings } from './pages/NetworkSettings';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Komponen Utama App:
// Mengatur Routing (navigasi) dan Global State (Context) aplikasi.
function App() {
  return (
    // AuthProvider: Menyediakan state otentikasi (login/logout) ke seluruh komponen anak.
    // Menerapkan pola 'Context API' untuk menghindari 'prop drilling'.
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route: Bisa diakses tanpa login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes: Membutuhkan otentikasi.
              Menggunakan komponen wrapper 'ProtectedRoute' untuk mengecek status login.
              Jika belum login, akan diredirect kembali ke halaman Login.
           */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/network" element={
            <ProtectedRoute>
              <Layout>
                <NetworkSettings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/wifi" element={
            <ProtectedRoute>
              <Layout>
                <WifiSettings />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/devices" element={
            <ProtectedRoute>
              <Layout>
                <Devices />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/security" element={
            <ProtectedRoute>
              <Layout>
                <Security />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/system" element={
            <ProtectedRoute>
              <Layout>
                <System />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
