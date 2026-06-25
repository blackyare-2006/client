// client/src/components/BookingForm.jsx
// Lets a visitor pick a date, see that doctor's open time slots (generated
// from their working hours), and confirm a booking. Currently runs on local
// sample data — see README for how to wire this to the real backend.

import { useState, useMemo } from 'react';
import { Calendar, Clock, Check, DollarSign, Copy } from 'lucide-react';
import { generateBookingNumber } from '../data/bookingUtils';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// Builds a list of time slots between start/end hours, with a few randomly
// marked as already booked so the grid feels realistic.
function buildSlots(startTime, endTime, dateSeed) {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const slots = [];
  let current = startH * 60 + startM;
  const end = endH * 60 + endM;

  // simple seeded pseudo-random so the same date always shows the same slots
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

export default function BookingForm({ doctor }) {
  const [date, setDate] = useState(todayISO());
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const slots = useMemo(() => buildSlots(doctor.start, doctor.end, date), [doctor.start, doctor.end, date]);

  function handleDateChange(e) {
    setDate(e.target.value);
    setSelectedTime(null);
  }

  function handleConfirm() {
    if (!selectedTime) return;
    setBookingNumber(generateBookingNumber());
    setSuccess(true);
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
        <h3 className="font-display text-lg font-semibold text-teal-950">Appointment booked</h3>
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
            <button
              onClick={handleCopy}
              className="text-ink-400 hover:text-teal-900 transition-colors"
              aria-label="Copy booking number"
            >
              <Copy size={16} />
            </button>
          </div>
          {copied && <p className="text-xs text-confirm-600 mt-1">Copied!</p>}
          <p className="text-xs text-ink-400 mt-2">
            Show this number at reception when you arrive.
          </p>
        </div>
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

      <button
        onClick={handleConfirm}
        disabled={!selectedTime}
        className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white font-medium py-3 rounded-full hover:bg-rose-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Confirm booking — ${doctor.price}
      </button>
    </div>
  );
}
