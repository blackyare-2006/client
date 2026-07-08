import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Stethoscope, Building2, MapPin, ArrowLeft, Star, Award, Briefcase, Loader2, UserRound } from 'lucide-react';
import { getDoctorById } from '../services/api';
import { getDoctorById as getSampleDoctor, awardDefinitions } from '../data/doctors';
import { getHospitalById as getSampleHospital } from '../data/hospitals';
import BookingForm from '../components/BookingForm';

const dayLabels = { Sun:'Sunday', Mon:'Monday', Tue:'Tuesday', Wed:'Wednesday', Thu:'Thursday', Fri:'Friday', Sat:'Saturday' };

const fallbackAvatars = [
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
];

function getStableAvatar(doctor) {
  // Always use the doctor's own image if they have one
  if (doctor.image && doctor.image.trim()) return doctor.image;
  // Stable fallback — never random, always same for same doctor
  const numericId = typeof doctor.id === 'number'
    ? doctor.id
    : parseInt((doctor._id || '0').replace(/\D/g, '').slice(-4), 10) || 0;
  return fallbackAvatars[numericId % fallbackAvatars.length];
}

function isMongoId(id) {
  return id && /^[a-f\d]{24}$/i.test(String(id));
}

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (isMongoId(id)) {
      getDoctorById(id)
        .then(setDoctor)
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      const d = getSampleDoctor(id);
      setDoctor(d || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) return (
    <div className="flex items-center gap-2 text-ink-400 py-24 justify-center">
      <Loader2 size={18} className="animate-spin" /> Loading doctor…
    </div>
  );

  if (!doctor) return <p className="text-center text-ink-400 py-24">Doctor not found.</p>;

  const hospital = doctor.hospitalId && typeof doctor.hospitalId === 'object'
    ? doctor.hospitalId
    : getSampleHospital(doctor.hospitalId);

  const award = doctor.award ? (awardDefinitions[doctor.award] || { title: doctor.award }) : null;
  const avatar = getStableAvatar(doctor);
  const dayList = doctor.days ? doctor.days.split(',').map(d => dayLabels[d] || d) : [];
  const startTime = doctor.start || doctor.startTime || '08:00';
  const endTime = doctor.end || doctor.endTime || '17:00';

  const bookingDoctor = {
    ...doctor,
    id: doctor._id || doctor.id,
    name: doctor.name,
    price: doctor.price,
    start: startTime,
    end: endTime,
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
      <Link to="/doctors" className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-teal-900 mb-6">
        <ArrowLeft size={15} /> Back to doctors
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div>
          <div className="flex items-start gap-5">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-teal-100 shrink-0">
              {avatar ? (
                <img src={avatar} alt={doctor.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserRound size={36} className="text-teal-400" />
                </div>
              )}
              {award && (
                <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-7 h-7 rounded-full bg-gold-600 text-teal-950 ring-2 ring-white">
                  <Award size={14} />
                </span>
              )}
            </div>
            <div>
              {award && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-700 bg-gold-100 px-2.5 py-1 rounded-full mb-2">
                  <Award size={12} /> {award.title}
                </span>
              )}
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-teal-950">{doctor.name}</h1>
              <p className="flex items-center gap-1.5 text-rose-600 font-medium mt-1">
                <Stethoscope size={15} />
                {doctor.specialty}{doctor.subSpecialty ? ` · ${doctor.subSpecialty}` : ''}
              </p>
              {hospital && (
                <Link
                  to={`/hospitals/${hospital._id || hospital.id}`}
                  className="flex items-center gap-1.5 text-sm text-ink-600 hover:text-teal-900 mt-2"
                >
                  <Building2 size={14} /> {hospital.name}
                  <span className="text-ink-400">·</span>
                  <MapPin size={14} /> {hospital.district}
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <span className="flex items-center gap-1.5 bg-white border border-teal-900/10 px-3.5 py-2 rounded-full">
              <Star size={14} className="text-gold-600 fill-gold-600" />
              <strong className="text-teal-950">{doctor.rating || '4.5'}</strong>
              {doctor.reviews > 0 && <span className="text-ink-400">({doctor.reviews} reviews)</span>}
            </span>
            {doctor.yearsExperience > 0 && (
              <span className="flex items-center gap-1.5 bg-white border border-teal-900/10 px-3.5 py-2 rounded-full">
                <Briefcase size={14} className="text-teal-900" />
                <strong className="text-teal-950">{doctor.yearsExperience}</strong> years experience
              </span>
            )}
          </div>

          {doctor.bio && (
            <p className="text-ink-600 leading-relaxed mt-6 max-w-xl">{doctor.bio}</p>
          )}

          {dayList.length > 0 && (
            <div className="bg-teal-50 border border-teal-900/10 rounded-2xl p-5 mt-8 max-w-xl">
              <h3 className="text-sm font-semibold text-teal-950 mb-2">Working hours</h3>
              <p className="text-sm text-ink-600">
                {dayList.join(', ')} · {startTime} – {endTime}
              </p>
            </div>
          )}
        </div>

        <div>
          <BookingForm doctor={bookingDoctor} />
        </div>
      </div>
    </div>
  );
}