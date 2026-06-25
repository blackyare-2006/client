// client/src/admin/pages/AdminBookings.jsx
import { useState, useEffect, useCallback } from 'react';
import { Search, X, CheckCircle2, Clock, XCircle, Loader2, AlertTriangle } from 'lucide-react';
import { adminGetAppointments, adminCancelAppointment, adminUpdateStatus } from '../adminApi';

const statusColors = {
  pending:   'bg-gold-100 text-gold-700',
  confirmed: 'bg-confirm-100 text-confirm-600',
  cancelled: 'bg-danger-100 text-danger-600',
  completed: 'bg-teal-100 text-teal-900',
};
const statusIcons = {
  pending:   Clock,
  confirmed: CheckCircle2,
  cancelled: XCircle,
  completed: CheckCircle2,
};

export default function AdminBookings() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Cancel modal state
  const [cancelModal, setCancelModal] = useState(null); // { id, patientName, bookingNumber }
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (search) params.search = search;
    adminGetAppointments(params)
      .then(setAppointments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [statusFilter, search]);

  useEffect(() => { load(); }, [load]);

  function openCancelModal(apt) {
    setCancelModal({ id: apt._id, patientName: apt.userId?.fullName, bookingNumber: apt.bookingNumber });
    setCancelReason('');
    setCancelError('');
  }

  async function handleConfirmCancel() {
    if (!cancelReason.trim()) { setCancelError('Please enter a reason for cancellation'); return; }
    setCancelling(true);
    try {
      await adminCancelAppointment(cancelModal.id, cancelReason);
      setCancelModal(null);
      load();
    } catch (err) {
      setCancelError(err.response?.data?.message || 'Failed to cancel appointment');
    } finally {
      setCancelling(false);
    }
  }

  async function handleStatusChange(id, status) {
    await adminUpdateStatus(id, status);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-teal-950">All Bookings</h1>
          <p className="text-sm text-ink-600 mt-0.5">{appointments.length} total appointments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by booking number…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-teal-900/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-900/20 bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-teal-900/15 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-900/20 bg-white"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center gap-2 text-ink-400 py-16 justify-center">
          <Loader2 size={18} className="animate-spin" /> Loading bookings…
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-teal-900/10">
          <p className="text-ink-400">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => {
            const StatusIcon = statusIcons[apt.status] || Clock;
            return (
              <div key={apt._id} className="bg-white rounded-2xl border border-teal-900/10 p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-display font-semibold text-teal-950">{apt.bookingNumber}</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${statusColors[apt.status]}`}>
                        <StatusIcon size={11} /> {apt.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      <div><span className="text-ink-400">Patient: </span><span className="font-medium text-ink-900">{apt.userId?.fullName || '—'}</span></div>
                      <div><span className="text-ink-400">Phone: </span><span className="text-ink-900">{apt.userId?.phone || '—'}</span></div>
                      <div><span className="text-ink-400">Doctor: </span><span className="text-ink-900">{apt.doctorId?.name || '—'}</span></div>
                      <div><span className="text-ink-400">Hospital: </span><span className="text-ink-900">{apt.doctorId?.hospitalId?.name || '—'}</span></div>
                      <div><span className="text-ink-400">Date: </span><span className="text-ink-900">{apt.appointmentDate}</span></div>
                      <div><span className="text-ink-400">Time: </span><span className="text-ink-900">{apt.appointmentTime}</span></div>
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-ink-400 mt-2 italic">"{apt.notes}"</p>
                    )}
                    {apt.cancelReason && (
                      <p className="text-xs text-danger-600 mt-2 flex items-center gap-1">
                        <AlertTriangle size={12} /> Cancel reason: {apt.cancelReason}
                      </p>
                    )}
                  </div>

                  {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {apt.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(apt._id, 'confirmed')}
                          className="text-xs font-medium text-confirm-600 border border-confirm-600/20 bg-confirm-100 px-3 py-1.5 rounded-full hover:bg-confirm-600 hover:text-white transition-colors"
                        >
                          Confirm
                        </button>
                      )}
                      {apt.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(apt._id, 'completed')}
                          className="text-xs font-medium text-teal-900 border border-teal-900/20 bg-teal-50 px-3 py-1.5 rounded-full hover:bg-teal-900 hover:text-sand-50 transition-colors"
                        >
                          Mark complete
                        </button>
                      )}
                      <button
                        onClick={() => openCancelModal(apt)}
                        className="text-xs font-medium text-danger-600 border border-danger-600/20 bg-danger-100 px-3 py-1.5 rounded-full hover:bg-danger-600 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel reason modal */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm" onClick={() => setCancelModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <button
              onClick={() => setCancelModal(null)}
              className="absolute top-4 right-4 text-ink-400 hover:text-ink-900"
            >
              <X size={18} />
            </button>

            <div className="mb-5">
              <h2 className="font-display text-lg font-semibold text-teal-950">Cancel appointment</h2>
              <p className="text-sm text-ink-600 mt-1">
                Booking <strong>{cancelModal.bookingNumber}</strong> — {cancelModal.patientName}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-ink-600 mb-1.5">
                Reason for cancellation <span className="text-danger-600">*</span>
              </label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => { setCancelReason(e.target.value); setCancelError(''); }}
                placeholder="e.g. Doctor unavailable on this date, please rebook for next week…"
                className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/20 resize-none"
              />
              <p className="text-xs text-ink-400 mt-1">This reason will be visible to the patient.</p>
            </div>

            {cancelError && (
              <p className="text-sm text-danger-600 bg-danger-100 px-3 py-2 rounded-xl mb-4">{cancelError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setCancelModal(null)}
                className="flex-1 py-2.5 text-sm font-medium border border-teal-900/15 rounded-full hover:bg-sand-100 transition-colors"
              >
                Keep appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-danger-600 text-white rounded-full hover:bg-danger-700 transition-colors disabled:opacity-50"
              >
                {cancelling && <Loader2 size={14} className="animate-spin" />}
                Confirm cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
