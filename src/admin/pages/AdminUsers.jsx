// client/src/admin/pages/AdminUsers.jsx
import { useState, useEffect, useCallback } from 'react';
import { Users, Loader2, Key, X, Check, Phone, Mail, Calendar } from 'lucide-react';
import adminApi from '../adminApi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetModal, setResetModal] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    adminApi.get('/users').then(r => setUsers(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  function openReset(user) {
    setResetModal(user);
    setNewPassword('');
    setResetDone(false);
    setError('');
  }

  async function handleReset() {
    if (!newPassword || newPassword.length < 4) { setError('Password must be at least 4 characters'); return; }
    setResetting(true); setError('');
    try {
      await adminApi.patch(`/users/${resetModal._id}/reset-password`, { newPassword });
      setResetDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally { setResetting(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-teal-950">Patients</h1>
          <p className="text-sm text-ink-600 mt-0.5">{users.length} registered patients</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-ink-400 py-16 justify-center">
          <Loader2 size={18} className="animate-spin" /> Loading patients…
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-teal-900/10">
          <Users size={32} className="text-teal-200 mx-auto mb-3" />
          <p className="text-ink-400">No patients registered yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map(user => (
            <div key={user._id} className="bg-white rounded-2xl border border-teal-900/10 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 text-teal-900 font-bold text-sm shrink-0">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-teal-950 truncate">{user.fullName}</p>
                    <p className="text-xs text-ink-400 mt-0.5">Patient</p>
                  </div>
                </div>
                <button
                  onClick={() => openReset(user)}
                  className="flex items-center gap-1.5 text-xs font-medium text-gold-700 border border-gold-600/20 bg-gold-50 px-3 py-1.5 rounded-full hover:bg-gold-100 transition-colors shrink-0"
                >
                  <Key size={12} /> Reset password
                </button>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-ink-600">
                  <Mail size={14} className="text-teal-900 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-600">
                  <Phone size={14} className="text-teal-900 shrink-0" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-2 text-ink-400 text-xs">
                  <Calendar size={13} className="shrink-0" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reset password modal */}
      {resetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm" onClick={() => setResetModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <button onClick={() => setResetModal(null)} className="absolute top-4 right-4 text-ink-400 hover:text-ink-900"><X size={18} /></button>

            {resetDone ? (
              <div className="text-center py-4">
                <span className="inline-flex w-12 h-12 rounded-full bg-confirm-100 text-confirm-600 items-center justify-center mb-3">
                  <Check size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold text-teal-950">Password reset!</h3>
                <p className="text-sm text-ink-600 mt-1">
                  {resetModal.fullName}'s password has been changed to:
                </p>
                <p className="font-bold text-xl text-teal-950 mt-3 bg-teal-50 rounded-xl py-3 px-4">{newPassword}</p>
                <p className="text-xs text-ink-400 mt-2">Tell the patient their new password.</p>
                <button onClick={() => setResetModal(null)} className="mt-4 bg-teal-900 text-sand-50 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-teal-800">Done</button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-lg font-semibold text-teal-950 mb-1">Reset password</h2>
                <p className="text-sm text-ink-600 mb-5">Set a new password for <strong>{resetModal.fullName}</strong></p>

                <label className="block text-sm font-medium text-ink-600 mb-1.5">New password</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password for patient"
                  className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 mb-4"
                />

                {error && <p className="text-sm text-danger-600 mb-3">{error}</p>}

                <div className="flex gap-3">
                  <button onClick={() => setResetModal(null)} className="flex-1 py-2.5 text-sm font-medium border border-teal-900/15 rounded-full hover:bg-sand-100">Cancel</button>
                  <button onClick={handleReset} disabled={resetting}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-teal-900 text-sand-50 rounded-full hover:bg-teal-800 disabled:opacity-50">
                    {resetting && <Loader2 size={14} className="animate-spin" />}
                    Reset password
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}