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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
