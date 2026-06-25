// client/src/pages/About.jsx

import { Target, Heart, Users, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div>
      <section className="bg-teal-950 bg-grain">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center">
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-sand-50 mb-5 text-balance">
            Built for the people of Mogadishu
          </h1>
          <p className="text-sand-50/70 text-lg leading-relaxed max-w-2xl mx-auto">
            dhakhtarkaaga started with a simple problem: people across Banaadir
            spend hours in waiting rooms just to find out a doctor isn't even
            available that day. We're fixing that, one hospital at a time.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="font-display text-2xl font-semibold text-teal-950 mb-3">Our mission</h2>
            <p className="text-ink-600 leading-relaxed">
              We connect patients in Mogadishu with the right hospital and the
              right doctor — quickly, clearly, and without the guesswork. Every
              listing on dhakhtarkaaga shows real specialties, real working
              hours, and a clear path to booking.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-teal-950 mb-3">Our story</h2>
            <p className="text-ink-600 leading-relaxed">
              This platform began as a graduation project, built by a Mogadishu
              based developer to address a need seen first-hand in the local
              community: too much time lost just trying to see a doctor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Target, title: 'Clarity first', text: 'No confusing listings — every hospital and doctor page is complete and accurate.' },
            { icon: Heart, title: 'Patient-centered', text: 'Every feature is built around saving patients time and stress.' },
            { icon: Users, title: 'Community-rooted', text: 'Built in Mogadishu, for Mogadishu, by someone who understands the need.' },
            { icon: ShieldCheck, title: 'Trustworthy', text: 'Verified hospital info and a real, confirmed booking every time.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white border border-teal-900/10 rounded-2xl p-5">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-100 text-teal-900 mb-3">
                <Icon size={18} />
              </span>
              <h3 className="font-display text-base font-semibold text-teal-950 mb-1">{title}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
