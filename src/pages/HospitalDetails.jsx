import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, ArrowLeft, Star, BedDouble, Calendar, Users, CheckCircle2, Loader2 } from 'lucide-react';
import { getHospitalById, getDoctorsByHospital } from '../services/api';
import { getHospitalById as getSampleHospital } from '../data/hospitals';
import { getDoctorsByHospital as getSampleDoctorsByHospital } from '../data/doctors';
import DoctorCard from '../components/DoctorCard';

// MongoDB IDs are 24-char hex strings. Numeric IDs are sample data.
function isMongoId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

export default function HospitalDetails() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (isMongoId(id)) {
      // Real DB hospital
      Promise.all([getHospitalById(id), getDoctorsByHospital(id)])
        .then(([h, d]) => { setHospital(h); setDoctors(d); })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      // Sample data hospital — use local data directly, no API call needed
      const h = getSampleHospital(id);
      const d = getSampleDoctorsByHospital(id);
      setHospital(h || null);
      setDoctors(d);
      setLoading(false);
    }
  }, [id]);

  if (loading) return (
    <div className="flex items-center gap-2 text-ink-400 py-24 justify-center">
      <Loader2 size={18} className="animate-spin" /> Loading hospital…
    </div>
  );

  if (!hospital) return <p className="text-center text-ink-400 py-24">Hospital not found.</p>;

  return (
    <div>
      <div className="relative h-72 sm:h-96 bg-teal-100 overflow-hidden">
        {hospital.image
          ? <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-teal-200 text-8xl">🏥</div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-950/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-5 sm:px-8 pb-8">
          <Link to="/hospitals" className="inline-flex items-center gap-1.5 text-sm text-sand-50/80 hover:text-sand-50 mb-4">
            <ArrowLeft size={15} /> Back to hospitals
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sand-50">{hospital.name}</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-sand-50/85">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gold-500" /> {hospital.address || hospital.district}</span>
            {hospital.rating && <span className="flex items-center gap-1.5"><Star size={14} className="text-gold-500 fill-gold-500" /> {hospital.rating}</span>}
            {hospital.phone && <span className="flex items-center gap-1.5"><Phone size={14} className="text-gold-500" /> {hospital.phone}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
        <div>
          {hospital.famousFor && (
            <span className="inline-block text-sm font-semibold text-gold-700 bg-gold-100 px-3 py-1 rounded-full mb-4">
              Famous for {hospital.famousFor}
            </span>
          )}
          {hospital.description && <p className="text-ink-600 leading-relaxed max-w-2xl">{hospital.description}</p>}

          {hospital.departments?.length > 0 && (
            <>
              <h2 className="font-display text-xl font-semibold text-teal-950 mt-10 mb-4">Departments</h2>
              <div className="flex flex-wrap gap-2">
                {hospital.departments.map(dep => (
                  <span key={dep} className="flex items-center gap-1.5 text-sm text-teal-950 bg-teal-50 border border-teal-900/10 px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={13} className="text-confirm-600" /> {dep}
                  </span>
                ))}
              </div>
            </>
          )}

          {hospital.gallery?.length > 0 && (
            <>
              <h2 className="font-display text-xl font-semibold text-teal-950 mt-10 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 gap-3">
                {hospital.gallery.map((src, i) => (
                  <div key={i} className="h-40 rounded-xl overflow-hidden bg-teal-100">
                    <img src={src} alt={hospital.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </>
          )}

          <h2 className="font-display text-xl font-semibold text-teal-950 mt-12 mb-5">
            Doctors at {hospital.name}
          </h2>
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctors.map((doc, i) => (
                <DoctorCard key={doc._id || doc.id} doctor={doc} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-ink-400 text-sm">No doctors listed for this hospital yet.</p>
          )}
        </div>

        <aside className="space-y-5">
          <div className="bg-white border border-teal-900/10 rounded-2xl p-5">
            <h3 className="font-display text-base font-semibold text-teal-950 mb-4">At a glance</h3>
            <div className="space-y-3 text-sm">
              {hospital.bedCount && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-600"><BedDouble size={14} /> Beds</span>
                  <span className="font-semibold text-teal-950">{hospital.bedCount}</span>
                </div>
              )}
              {hospital.founded && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-600"><Calendar size={14} /> Founded</span>
                  <span className="font-semibold text-teal-950">{hospital.founded}</span>
                </div>
              )}
              {hospital.stats && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-600"><Users size={14} /> Doctors on staff</span>
                  <span className="font-semibold text-teal-950">{hospital.stats.doctorsOnStaff || doctors.length}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-teal-950 bg-grain rounded-2xl p-5">
            <p className="text-sm text-sand-50/70 leading-relaxed">
              Pick a doctor from this hospital above to see their schedule and book an appointment.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
