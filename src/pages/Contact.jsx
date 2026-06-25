// client/src/pages/Contact.jsx

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Frontend-only placeholder. Wire this to a real backend endpoint
    // (e.g. POST /api/contact) when the contact form needs to send real messages.
    setSubmitted(true);
  }

  return (
    <div>
      <section className="bg-teal-950 bg-grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sand-50 mb-2">Contact Us</h1>
          <p className="text-sand-50/65 max-w-xl">
            Have a question, a partnership idea, or found something that needs
            fixing? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="space-y-5">
          {[
            { icon: MapPin, label: 'Address', value: 'Mogadishu, Banaadir, Somalia' },
            { icon: Phone, label: 'Phone', value: '+252 61 000 0000' },
            { icon: Mail, label: 'Email', value: 'hello@dhakhtarkaaga.so' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 bg-white border border-teal-900/10 rounded-2xl p-5">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-100 text-teal-900 shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-400 font-semibold">{label}</p>
                <p className="text-teal-950 font-medium mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-teal-900/10 rounded-2xl p-7">
          {submitted ? (
            <div className="text-center py-10">
              <span className="inline-flex w-12 h-12 rounded-full bg-confirm-100 text-confirm-600 items-center justify-center mb-3">
                <CheckCircle2 size={22} />
              </span>
              <h3 className="font-display text-lg font-semibold text-teal-950">Message sent</h3>
              <p className="text-sm text-ink-600 mt-1">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-600 mb-1.5">Your name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-600 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-600 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/30 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-teal-900 text-sand-50 font-medium py-3 rounded-full hover:bg-teal-800 transition-colors"
              >
                <Send size={15} /> Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
