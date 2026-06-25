import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getHospitals } from '../services/api';
import sampleHospitals from '../data/hospitals';
import HospitalCard from '../components/HospitalCard';

const mainDistricts = ['Hodan','Wadajir','Bondhere','Yaqshid','Hamar Weyne','Karaan','Abdiaziz','Wardhiigleey'];

export default function HospitalList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const districtFilter = searchParams.get('district') || '';
  const [dbHospitals, setDbHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getHospitals()
      .then(setDbHospitals)
      .catch(() => setDbHospitals([]))
      .finally(() => setLoading(false));
  }, []);

  // Merge DB hospitals with sample hospitals — DB ones first, sample fill the rest
  const merged = useMemo(() => {
    const dbIds = new Set(dbHospitals.map(h => h._id));
    return [
      ...dbHospitals,
      ...sampleHospitals.filter(h => !dbIds.has(String(h.id))),
    ];
  }, [dbHospitals]);

  const filtered = useMemo(() => {
    return merged.filter(h => {
      const matchDistrict = districtFilter
        ? (h.district || '').toLowerCase().includes(districtFilter.toLowerCase())
        : true;
      const matchQuery = query
        ? (h.name || '').toLowerCase().includes(query.toLowerCase()) ||
          (h.famousFor || '').toLowerCase().includes(query.toLowerCase())
        : true;
      return matchDistrict && matchQuery;
    });
  }, [merged, districtFilter, query]);

  return (
    <div>
      <section className="bg-teal-950 bg-grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-sand-50 mb-2">Hospitals in Mogadishu</h1>
          <p className="text-sand-50/65 max-w-xl">Browse every hospital, filter by district, and click in to see departments and doctors.</p>
          <div className="flex gap-2 mt-7 max-w-md">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search hospitals or specialties…"
              className="flex-1 border border-sand-50/20 bg-sand-50/10 text-sand-50 placeholder:text-sand-50/40 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-wrap gap-2.5 mb-8">
          <button onClick={() => setSearchParams({})}
            className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${!districtFilter ? 'bg-teal-900 text-sand-50 border-teal-900' : 'border-teal-900/15 text-teal-950 hover:bg-teal-50'}`}>
            All districts
          </button>
          {mainDistricts.map(d => (
            <button key={d} onClick={() => setSearchParams({ district: d })}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${districtFilter === d ? 'bg-teal-900 text-sand-50 border-teal-900' : 'border-teal-900/15 text-teal-950 hover:bg-teal-50'}`}>
              {d}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-ink-400 py-16 justify-center">
            <Loader2 size={18} className="animate-spin" /> Loading hospitals…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(h => <HospitalCard key={h._id || h.id} hospital={h} />)}
          </div>
        )}
      </div>
    </div>
  );
}
