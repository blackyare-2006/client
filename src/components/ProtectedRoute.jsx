// client/src/components/ProtectedRoute.jsx
// Wraps pages that require login (like Dashboard). Redirects to /login if not authenticated.

import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-ink-400 py-24 justify-center">
        <Loader2 size={18} className="animate-spin" /> Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
