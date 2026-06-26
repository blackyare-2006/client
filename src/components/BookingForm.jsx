// client/src/components/BookingForm.jsx
// Requires login — saves real bookings to MongoDB Atlas via the backend API.

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Check, DollarSign, Copy, Loader2, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { bookAppointment, getDoctorAvailability } from '../services/api';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// For sample doctors (numeric IDs) we generate slots locally since they
// have no real backend availability. For real DB doctors we fetch from API.
function buildLocalSlots(startTime, endTime, dateSeed) {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const slots = [];
  let current = startH * 60 + startM;
  const end = endH * 60 + endM;
  let seed = dateSeed.split('-').reduce((a, c) => a + Number(c), 0);
  function nextRand() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }
  while (current < end) {
    const hours = String(Math.floor(current / 60)).padStart(2, '0');
    const minutes = String(current % 60).padStart(2, '0');
    slots.push({ time: `${hours}:${minutes}`, available: nextRand() > 0.3 });
    current += 30;
  }
  return slots;
}

function isMongoId(id) {
  return id && /^[a-f\d]{24}$/i.test(String(id));
}

export default function BookingForm({ doctor }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState(todayISO());
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [apiSlots, setApiSlots] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const isRealDoctor = isMongoId(doctor.id || doctor._id);

  // For real doctors fetch slots from API, for sample doctors use local generation
  const localSlots = useMemo(() =>
    buildLocalSlots(doctor.start || '08:00', doctor.end || '17:00', date),
    [doctor.start, doctor.end, date]
  );

  async function handleDateChange(e) {
    setDate(e.target.value);
    setSelectedTime(null);
    setError('');
    if (isRealDoctor) {
      setLoadingSlots(true);
      try {
        const data = await getDoctorAvailability(doctor.id || doctor._id, e.target.value);
        setApiSlots(data.slots);
      } catch {
        setApiSlots(null);
      } finally {
        setLoadingSlots(false);
      }
    }
  }

  const slots = isRealDoctor ? (apiSlots || localSlots) : localSlots;

  async function handleConfirm() {
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    if (!selectedTime) return;

    setSubmitting(true);
    setError('');

    try {
      if (isRealDoctor) {
        // Real doctor — save to database
        const apt = await bookAppointment({
          doctorId: doctor.id || doctor._id,
          appointmentDate: date,
          appointmentTime: selectedTime,
          notes,
        });
        setBookingNumber(apt.bookingNumber);
      } else {
        // Sample doctor — generate local booking number
        // (real booking requires a real doctor added via admin panel)
        setBookingNumber('DHK-' + Math.floor(100000 + Math.random() * 900000));
      }
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not book this slot, please try another time.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleCopy() {
    navigator.clipboard?.writeText(bookingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (success) {
    return (
      <div className="bg-confirm-100 border border-confirm-600/20 rounded-2xl p-6 text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-confirm-600 text-white items-center justify-center mb-3">
          <Check size={22} />
        </span>
        <h3 className="font-display text-lg font-semibold text-teal-950">Appointment booked!</h3>
        <p className="text-sm text-ink-600 mt-1">
          {date} at {selectedTime} with {doctor.name}
        </p>
        <div className="mt-5 bg-white rounded-xl p-4 border border-confirm-600/20">
          <p className="text-xs uppercase tracking-wide text-ink-400 font-semibold mb-1">
            Your booking number
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-display text-2xl font-bold text-teal-950 tracking-wide">
              {bookingNumber}
            </span>
            <button onClick={handleCopy} className="text-ink-400 hover:text-teal-900 transition-colors">
              <Copy size={16} />
            </button>
          </div>
          {copied && <p className="text-xs text-confirm-600 mt-1">Copied!</p>}
          <p className="text-xs text-ink-400 mt-2">Show this number at reception when you arrive.</p>
        </div>
        {user && (
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 text-sm font-medium text-teal-900 hover:text-teal-700 underline"
          >
            View my bookings
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-teal-900/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-teal-950">Book an appointment</h3>
        <span className="flex items-center gap-1 text-sm font-semibold text-teal-900 bg-teal-50 px-2.5 py-1 rounded-full">
          <DollarSign size={13} /> {doctor.price}
        </span>
      </div>

      {/* Not logged in warning */}
      {!user && (
        <div className="bg-gold-50 border border-gold-600/20 rounded-xl p-3 mb-4 flex items-center gap-2 text-sm text-gold-700">
          <LogIn size={15} />
          <span>You need to <button onClick={() => navigate('/login', { state: { from: window.location.pathname } })} className="font-semibold underline">log in</button> or <button onClick={() => navigate('/register')} className="font-semibold underline">sign up</button> to book.</span>
        </div>
      )}

      <label className="block text-sm font-medium text-ink-600 mb-1.5">
        <span className="flex items-center gap-1.5"><Calendar size={14} /> Choose a date</span>
      </label>
      <input
        type="date"
        value={date}
        min={todayISO()}
        onChange={handleDateChange}
        className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-teal-900/30 mb-5"
      />

      <label className="block text-sm font-medium text-ink-600 mb-2">
        <span className="flex items-center gap-1.5"><Clock size={14} /> Available times</span>
      </label>

      {loadingSlots ? (
        <div className="flex items-center gap-2 text-sm text-ink-400 py-4 justify-center">
          <Loader2 size={15} className="animate-spin" /> Loading slots…
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
          {slots.map((slot) => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => setSelectedTime(slot.time)}
              className={`relative text-sm font-medium py-2.5 rounded-xl border transition-colors ${
                !slot.available
                  ? 'border-teal-900/5 text-ink-400/50 line-through cursor-not-allowed bg-sand-100'
                  : selectedTime === slot.time
                  ? 'border-teal-900 bg-teal-900 text-sand-50'
                  : 'border-teal-900/15 text-teal-950 hover:border-teal-900/40'
              }`}
            >
              {slot.time}
              {slot.available && selectedTime !== slot.time && (
                <span className="slot-dot absolute top-1.5 right-1.5 bg-confirm-600" />
              )}
            </button>
          ))}
        </div>
      )}

      <label className="block text-sm font-medium text-ink-600 mb-1.5">
        Notes for the doctor (optional)
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="e.g. follow-up visit, describe your symptoms briefly…"
        className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-teal-900/30 mb-4 resize-none"
      />

      {error && <p className="text-sm text-danger-600 mb-3">{error}</p>}

      <button
        onClick={handleConfirm}
        disabled={!selectedTime || submitting}
        className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white font-medium py-3 rounded-full hover:bg-rose-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting && <Loader2 size={16} className="animate-spin" />}
        {user ? `Confirm booking — $${doctor.price}` : 'Log in to book'}
      </button>
    </div>
  );
}