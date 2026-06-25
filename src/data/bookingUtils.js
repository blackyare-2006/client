// client/src/data/bookingUtils.js
// Generates a random-looking booking reference number for the confirmation screen.
// This is a frontend-only placeholder until booking is wired to the real backend,
// where the database will issue real sequential/unique appointment IDs.

export function generateBookingNumber() {
  const prefix = 'DHK';
  const digits = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  return `${prefix}-${digits}`;
}
