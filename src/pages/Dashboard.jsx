// client/src/pages/Dashboard.jsx
// Shows the logged-in patient's appointments. This page talks to the real
// backend (server/) rather than the sample data files, since bookings need
// to be tied to a real account. See README for connecting the backend.

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, X, Loader2, CalendarX } from 'lucide-react';
import { getMyAppointments, cancelAppointment } from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusStyles = {
  pending: 'bg-gold-100 text-gold-700',
  confirmed: 'bg-confirm-100 text-confirm-600',
  cancelled: 'bg-ink-400/10 text-ink-400',
  completed: 'bg-teal-100 text-teal-900',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const loadAppointments = useCallback(() => {
    setLoading(true);
    getMyAppointments()
      .then(setAppointments)
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  async function handleCancel(id) {
    setCancellingId(id);
    try {
      await cancelAppointment(id);
      loadAppointments();
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="font-display text-3xl font-semibold text-teal-950">
        Hi {user?.full_name?.split(' ')[0]} 👋
      </h1>
      <p className="text-ink-600 mt-1 mb-8">Here are your appointments.</p>

      {loading ? (
        <div className="flex items-center gap-2 text-ink-400 py-16 justify-center">
          <Loader2 size={18} className="animate-spin" /> Loading your bookings…
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16 bg-white border border-teal-900/10 rounded-2xl">
          <CalendarX size={32} className="text-ink-400 mx-auto mb-3" />
          <p className="text-ink-600 mb-4">You don't have any appointments yet.</p>
          <Link
            to="/doctors"
            className="inline-block text-sm font-medium bg-teal-900 text-sand-50 px-5 py-2.5 rounded-full hover:bg-teal-800 transition-colors"
          >
            Find a doctor
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-900/10 rounded-2xl p-5"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-display font-semibold text-teal-950">{apt.doctor_name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[apt.status] || 'bg-ink-400/10 text-ink-400'}`}>
                    {apt.status}
                  </span>
                </div>
                <p className="text-sm text-rose-600 font-medium mb-2">{apt.specialty}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-teal-900" /> {apt.appointment_date?.slice(0, 10)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-teal-900" /> {apt.appointment_time?.slice(0, 5)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-teal-900" /> {apt.clinic_name}
                  </span>
                </div>
              </div>

              {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                <button
                  onClick={() => handleCancel(apt.id)}
                  disabled={cancellingId === apt.id}
                  className="flex items-center justify-center gap-1.5 text-sm font-medium text-danger-600 border border-danger-600/20 px-4 py-2 rounded-full hover:bg-danger-100 transition-colors disabled:opacity-50 shrink-0"
                >
                  {cancellingId === apt.id ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
