// client/src/admin/context/AdminAuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin as apiLogin, adminGetProfile } from '../adminApi';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('dhk_admin_token');
    if (!token) { setLoading(false); return; }
    adminGetProfile()
      .then(setAdmin)
      .catch(() => localStorage.removeItem('dhk_admin_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(username, password) {
    const { token, admin } = await apiLogin({ username, password });
    localStorage.setItem('dhk_admin_token', token);
    setAdmin(admin);
    return admin;
  }

  function logout() {
    localStorage.removeItem('dhk_admin_token');
    setAdmin(null);
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
