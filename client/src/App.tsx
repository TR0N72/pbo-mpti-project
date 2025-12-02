import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { WifiSettings } from './pages/WifiSettings';
import { Devices } from './pages/Devices';
import { Security } from './pages/Security';
import { System } from './pages/System';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wifi" element={<WifiSettings />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/security" element={<Security />} />
          <Route path="/system" element={<System />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
