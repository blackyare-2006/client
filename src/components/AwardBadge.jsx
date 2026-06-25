// client/src/components/AwardBadge.jsx

import { Link } from 'react-router-dom';
import { Heart, Brain, Users, Baby, Bone, HeartPulse, Activity, Scissors, Award } from 'lucide-react';
import { getAvatarForIndex, awardDefinitions } from '../data/doctors';
import { getHospitalById } from '../data/hospitals';

const iconMap = {
  heart: Heart,
  brain: Brain,
  users: Users,
  baby: Baby,
  bone: Bone,
  'heart-pulse': HeartPulse,
  activity: Activity,
  scissors: Scissors,
};

export default function AwardBadge({ doctor, index = 0 }) {
  const award = awardDefinitions[doctor.award];
  const hospital = getHospitalById(doctor.hospitalId);
  const Icon = iconMap[award?.icon] || Award;

  return (
    <Link
      to={`/doctors/${doctor.id}`}
      className="group relative bg-teal-950 rounded-2xl p-6 overflow-hidden hover:-translate-y-1 transition-transform"
    >
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gold-600/10" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500 bg-gold-600/10 px-3 py-1.5 rounded-full mb-4">
          <Icon size={13} /> {award?.title}
        </span>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold-600/40 shrink-0">
            <img src={getAvatarForIndex(index)} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold text-sand-50 truncate">
              {doctor.name}
            </h3>
            <p className="text-sm text-sand-50/60 truncate">{doctor.specialty}</p>
          </div>
        </div>

        {hospital && (
          <p className="text-xs text-sand-50/50 mt-4 truncate">{hospital.name} · {hospital.district}</p>
        )}
      </div>
    </Link>
  );
}
