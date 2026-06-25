// client/src/pages/Awards.jsx

import { Award } from 'lucide-react';
import { getAwardedDoctors } from '../data/doctors';
import AwardBadge from '../components/AwardBadge';

export default function Awards() {
  const awardedDoctors = getAwardedDoctors();

  return (
    <div>
      <section className="bg-teal-950 bg-grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500 mb-3">
            <Award size={14} /> Recognized excellence
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sand-50 mb-2">
            Award-winning doctors
          </h1>
          <p className="text-sand-50/65 max-w-xl">
            Each year, hospitals across our network recognize doctors for
            outstanding results, patient care, and surgical skill. Here are
            this year's honorees.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awardedDoctors.map((d) => <AwardBadge key={d.id} doctor={d} index={d.id} />)}
        </div>
      </div>
    </div>
  );
}
