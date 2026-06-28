import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, X, Loader2, CalendarX, AlertTriangle, Hash } from 'lucide-react';
import { getMyAppointments, cancelAppointment } from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusStyles = {
  pending:   'bg-gold-100 text-gold-700',
  confirmed: 'bg-confirm-100 text-confirm-600',
  cancelled: 'bg-danger-100 text-danger-600',
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

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

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
        Hi {user?.full_name?.split(' ')[0] || user?.fullName?.split(' ')[0]} 👋
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
          <Link to="/doctors" className="inline-block text-sm font-medium bg-teal-900 text-sand-50 px-5 py-2.5 rounded-full hover:bg-teal-800 transition-colors">
            Find a doctor
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => {
            const doctorName = apt.doctorId?.name || apt.doctor_name || '—';
            const specialty  = apt.doctorId?.specialty || apt.specialty || '';
            const hospital   = apt.doctorId?.hospitalId?.name || apt.clinic_name || '';
            const isCancelled = apt.status === 'cancelled';

            return (
              <div
                key={apt._id || apt.id}
                className={`bg-white border rounded-2xl p-5 ${isCancelled ? 'border-danger-600/20 bg-danger-100/30' : 'border-teal-900/10'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Booking number */}
                    {apt.bookingNumber && (
                      <div className="flex items-center gap-1.5 text-xs text-ink-400 font-mono mb-2">
                        <Hash size={12} /> {apt.bookingNumber}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-display font-semibold text-teal-950">{doctorName}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[apt.status] || 'bg-ink-400/10 text-ink-400'}`}>
                        {apt.status}
                      </span>
                    </div>

                    {specialty && <p className="text-sm text-rose-600 font-medium mb-2">{specialty}</p>}

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-teal-900" />
                        {apt.appointmentDate || apt.appointment_date?.slice(0, 10)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-teal-900" />
                        {apt.appointmentTime || apt.appointment_time?.slice(0, 5)}
                      </span>
                      {hospital && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-teal-900" /> {hospital}
                        </span>
                      )}
                    </div>

                    {/* ── Cancel reason — shown to patient ── */}
                    {isCancelled && apt.cancelReason && (
                      <div className="mt-3 flex items-start gap-2 bg-danger-100 border border-danger-600/20 rounded-xl px-3 py-2.5">
                        <AlertTriangle size={15} className="text-danger-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-danger-600 mb-0.5">Cancellation reason</p>
                          <p className="text-sm text-danger-600">{apt.cancelReason}</p>
                        </div>
                      </div>
                    )}

                    {isCancelled && !apt.cancelReason && (
                      <p className="text-xs text-danger-600 mt-2 flex items-center gap-1.5">
                        <AlertTriangle size={12} /> This appointment was cancelled.
                      </p>
                    )}
                  </div>

                  {!isCancelled && apt.status !== 'completed' && (
                    <button
                      onClick={() => handleCancel(apt._id || apt.id)}
                      disabled={cancellingId === (apt._id || apt.id)}
                      className="flex items-center justify-center gap-1.5 text-sm font-medium text-danger-600 border border-danger-600/20 px-4 py-2 rounded-full hover:bg-danger-100 transition-colors disabled:opacity-50 shrink-0"
                    >
                      {cancellingId === (apt._id || apt.id) ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}