import { Link } from 'react-router-dom';
import { Stethoscope, Building2, Star, Award, UserRound } from 'lucide-react';

// Fallback avatars — only used when a doctor has NO image
const fallbackAvatars = [
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
];

// Stable fallback using doctor ID — NEVER changes on re-render
function getStableAvatar(doctor) {
  if (doctor.image && doctor.image.trim()) return doctor.image;
  const numericId = typeof doctor.id === 'number'
    ? doctor.id
    : parseInt((doctor._id || '0').replace(/\D/g, '').slice(-4), 10) || 0;
  return fallbackAvatars[numericId % fallbackAvatars.length];
}

export default function DoctorCard({ doctor }) {
  const id = doctor._id || doctor.id;
  const hospitalName = doctor.hospitalId?.name || doctor.clinic_name || '';
  const avatar = getStableAvatar(doctor);

  return (
    <Link to={`/doctors/${id}`}
      className="group flex gap-4 bg-white rounded-2xl border border-teal-900/10 p-4 hover:border-teal-900/25 hover:shadow-lg hover:shadow-teal-900/5 transition-all">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-teal-100 shrink-0">
        {avatar ? (
          <img src={avatar} alt={doctor.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UserRound size={24} className="text-teal-400" />
          </div>
        )}
        {doctor.award && (
          <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-gold-600 text-teal-950 ring-2 ring-white">
            <Award size={11} />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-semibold text-teal-950 truncate">{doctor.name}</h3>
        <p className="flex items-center gap-1.5 text-sm text-rose-600 font-medium mt-0.5">
          <Stethoscope size={13} /> {doctor.specialty}
        </p>
        {hospitalName && (
          <p className="flex items-center gap-1.5 text-xs text-ink-400 mt-1.5 truncate">
            <Building2 size={12} className="shrink-0" /> {hospitalName}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-ink-600">
          <span className="flex items-center gap-1">
            <Star size={12} className="text-gold-600 fill-gold-600" /> {doctor.rating || '4.5'}
          </span>
          {doctor.yearsExperience > 0 && <span>{doctor.yearsExperience} yrs exp.</span>}
          <span className="font-semibold text-teal-900">${doctor.price}</span>
        </div>
      </div>
    </Link>
  );
}