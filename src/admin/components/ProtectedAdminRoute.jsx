// client/src/admin/components/ProtectedAdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function ProtectedAdminRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-teal-950">
      <Loader2 size={24} className="animate-spin text-gold-500" />
    </div>
  );
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}
