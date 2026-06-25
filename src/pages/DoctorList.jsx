import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getDoctors } from '../services/api';
import sampleDoctors from '../data/doctors';
import DoctorCard from '../components/DoctorCard';

const mainSpecialties = ['Cardiology','Neurology','Pediatrics','General Medicine','General Surgery','Maternity','Orthopedics','Dentistry'];

export default function DoctorList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const specialtyFilter = searchParams.get('specialty') || '';
  const [dbDoctors, setDbDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getDoctors()
      .then(setDbDoctors)
      .catch(() => setDbDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  // Merge DB doctors with sample doctors — DB ones first, sample fill the rest
  const merged = useMemo(() => {
    const dbIds = new Set(dbDoctors.map(d => d._id));
    return [
      ...dbDoctors,
      ...sampleDoctors.filter(d => !dbIds.has(String(d.id))),
    ];
  }, [dbDoctors]);

  const filtered = useMemo(() => {
    return merged.filter(d => {
      const matchSpecialty = specialtyFilter
        ? (d.specialty || '').toLowerCase().includes(specialtyFilter.toLowerCase())
        : true;
      const matchQuery = query
        ? (d.name || '').toLowerCase().includes(query.toLowerCase()) ||
          (d.specialty || '').toLowerCase().includes(query.toLowerCase())
        : true;
      return matchSpecialty && matchQuery;
    });
  }, [merged, specialtyFilter, query]);

  return (
    <div>
      <section className="bg-teal-950 bg-grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sand-50 mb-2">Doctors</h1>
          <p className="text-sand-50/65 max-w-xl">Browse every doctor, filter by specialty, and book a time that works for you.</p>
          <div className="flex gap-2 mt-7 max-w-md">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search doctors or specialties…"
              className="flex-1 border border-sand-50/20 bg-sand-50/10 text-sand-50 placeholder:text-sand-50/40 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-wrap gap-2.5 mb-8">
          <button onClick={() => setSearchParams({})}
            className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${!specialtyFilter ? 'bg-teal-900 text-sand-50 border-teal-900' : 'border-teal-900/15 text-teal-950 hover:bg-teal-50'}`}>
            All specialties
          </button>
          {mainSpecialties.map(s => (
            <button key={s} onClick={() => setSearchParams({ specialty: s })}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${specialtyFilter === s ? 'bg-teal-900 text-sand-50 border-teal-900' : 'border-teal-900/15 text-teal-950 hover:bg-teal-50'}`}>
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-ink-400 py-16 justify-center">
            <Loader2 size={18} className="animate-spin" /> Loading doctors…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => <DoctorCard key={d._id || d.id} doctor={d} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
