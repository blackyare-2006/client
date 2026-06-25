// client/src/context/AuthContext.jsx
// Holds the logged-in user's info and exposes login/logout/register helpers
// to the whole app, so we don't pass auth props through every component.

import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getProfile } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('dhakhtarkaaga_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getProfile()
      .then((profile) => setUser(profile))
      .catch(() => {
        localStorage.removeItem('dhakhtarkaaga_token');
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { user, token } = await loginUser({ email, password });
    localStorage.setItem('dhakhtarkaaga_token', token);
    setUser(user);
    return user;
  }

  async function register(fullName, email, phone, password) {
    const { user, token } = await registerUser({ fullName, email, phone, password });
    localStorage.setItem('dhakhtarkaaga_token', token);
    setUser(user);
    return user;
  }

  function logout() {
    localStorage.removeItem('dhakhtarkaaga_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
