import { Link } from 'react-router-dom';
import { MapPin, Star, BedDouble, ArrowUpRight } from 'lucide-react';

export default function HospitalCard({ hospital }) {
  const id = hospital._id || hospital.id;
  return (
    <Link to={`/hospitals/${id}`}
      className="group block bg-white rounded-2xl border border-teal-900/10 overflow-hidden hover:border-teal-900/25 hover:shadow-xl hover:shadow-teal-900/5 transition-all">
      <div className="relative h-44 overflow-hidden bg-teal-100">
        {hospital.image ? (
          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-teal-200 font-display text-4xl">🏥</div>
        )}
        {hospital.rating && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-xs font-semibold bg-white/95 text-teal-950 px-2.5 py-1 rounded-full">
            <Star size={12} className="text-gold-600 fill-gold-600" /> {hospital.rating}
          </span>
        )}
        {hospital.featured && (
          <span className="absolute top-3 right-3 text-xs font-semibold bg-gold-600 text-teal-950 px-2.5 py-1 rounded-full">Featured</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-teal-950 leading-snug">{hospital.name}</h3>
          <ArrowUpRight size={18} className="text-ink-400 group-hover:text-rose-600 transition-colors shrink-0 mt-1" />
        </div>
        <p className="flex items-center gap-1.5 text-sm text-ink-600 mt-2">
          <MapPin size={14} className="text-rose-600 shrink-0" /> {hospital.district}
        </p>
        {hospital.famousFor && (
          <p className="text-sm font-medium text-gold-700 mt-2">Famous for: {hospital.famousFor}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-ink-400 mt-3 pt-3 border-t border-teal-900/8">
          {hospital.bedCount && <span className="flex items-center gap-1"><BedDouble size={13} /> {hospital.bedCount} beds</span>}
          {hospital.founded && <><span>·</span><span>Est. {hospital.founded}</span></>}
        </div>
      </div>
    </Link>
  );
}
