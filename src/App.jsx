// client/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute';
import ScrollToTop from './components/ScrollToTop';
import AdminLayout from './admin/components/AdminLayout';

// Public pages
import Home from './pages/Home';
import HospitalList from './pages/HospitalList';
import HospitalDetails from './pages/HospitalDetails';
import DoctorList from './pages/DoctorList';
import DoctorProfile from './pages/DoctorProfile';
import Awards from './pages/Awards';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Admin pages
import AdminLogin from './admin/pages/AdminLogin';
import AdminBookings from './admin/pages/AdminBookings';
import AdminHospitals from './admin/pages/AdminHospitals';
import AdminDoctors from './admin/pages/AdminDoctors';
import AdminUsers from './admin/pages/AdminUsers';

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* ── Public site ── */}
            <Route path="/*" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hospitals" element={<HospitalList />} />
                    <Route path="/hospitals/:id" element={<HospitalDetails />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/doctors/:id" element={<DoctorProfile />} />
                    <Route path="/awards" element={<Awards />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  </Routes>
                </main>
                <Footer />
              </div>
            } />

            {/* ── Admin area ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard/*" element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Navigate to="bookings" replace />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="hospitals" element={<AdminHospitals />} />
                    <Route path="doctors" element={<AdminDoctors />} />
                    <Route path="users" element={<AdminUsers />} />
                  </Routes>
                </AdminLayout>
              </ProtectedAdminRoute>
            } />
          </Routes>
        </AuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;