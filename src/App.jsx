import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import PatientManagementPage from './pages/PatientManagementPage';
import DoctorManagementPage from './pages/DoctorManagementPage';
import AppointmentManagementPage from './pages/AppointmentManagementPage';
import StaffPage from './pages/StaffPage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import ContactFab from './components/common/ContactFab';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientManagementPage />} />
        <Route path="/doctors" element={<DoctorManagementPage />} />
        <Route path="/appointments" element={<AppointmentManagementPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ContactFab />
    </Router>
  );
}

export default App;