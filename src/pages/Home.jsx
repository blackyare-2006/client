import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, MapPin, CalendarCheck, ShieldCheck, ArrowRight,
  TrendingUp, Users, Building2, Activity, Award, Clock,
} from 'lucide-react';
import { getHospitals, getDoctors } from '../services/api';
import sampleHospitals, { getFeaturedHospitals } from '../data/hospitals';
import sampleDoctors, { getAwardedDoctors } from '../data/doctors';
import HospitalCard from '../components/HospitalCard';
import DoctorCard from '../components/DoctorCard';
import AwardBadge from '../components/AwardBadge';

const districts = ['Hodan','Wadajir','Bondhere','Yaqshid','Hamar Weyne','Karaan','Abdiaziz','Wardhiigleey'];

export default function Home() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getHospitals(), getDoctors()])
      .then(([h, d]) => { setHospitals(h); setDoctors(d); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Merge real DB data with sample data — real ones shown first, sample ones after.
  // Sample data only disappears when you manually delete it from data/hospitals.js.
  const realIds = new Set(hospitals.map(h => h._id));
  const mergedHospitals = [
    ...hospitals,
    ...sampleHospitals.filter(h => !realIds.has(String(h.id))),
  ];
  const realDoctorIds = new Set(doctors.map(d => d._id));
  const mergedDoctors = [
    ...doctors,
    ...sampleDoctors.filter(d => !realDoctorIds.has(String(d.id))),
  ];

  const displayHospitals = mergedHospitals;
  const displayDoctors = mergedDoctors;
  const featuredHospitals = mergedHospitals.filter(h => h.featured).slice(0, 3);
  const awardedDoctors = mergedDoctors.filter(d => d.award).slice(0, 4);

  const totalPatients = displayHospitals.reduce((sum, h) => sum + (h.stats?.patientsPerMonth || 0), 0);
  const busiest = [...displayHospitals].sort((a, b) =>
    (b.stats?.patientsPerMonth || 0) - (a.stats?.patientsPerMonth || 0))[0];

  return (
    <div>
      {/* HERO 1: Welcome */}
      <section className="relative overflow-hidden bg-teal-950 bg-grain">
        <div className="absolute -right-32 top-1/4 w-96 h-96 rounded-full bg-gold-600/10 blur-3xl animate-float" />
        <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-rose-600/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-24">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500 bg-gold-600/10 px-3 py-1.5 rounded-full mb-6">
            <span className="slot-dot bg-gold-500" /> Mogadishu's #1 hospital &amp; doctor directory
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-sand-50 leading-[1.08] tracking-tight max-w-3xl text-balance">
            Welcome to better healthcare in Mogadishu.
          </h1>
          <p className="text-sand-50/70 text-lg mt-6 leading-relaxed max-w-xl">
            Discover the city's top hospitals, meet award-winning doctors, and book your appointment in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Link to="/hospitals" className="flex items-center justify-center gap-2 bg-gold-600 text-teal-950 font-semibold px-7 py-3.5 rounded-full hover:bg-gold-500 transition-colors">
              <Search size={17} /> Find a hospital
            </Link>
            <Link to="/doctors" className="flex items-center justify-center gap-2 border border-sand-50/25 text-sand-50 font-medium px-7 py-3.5 rounded-full hover:bg-sand-50/10 transition-colors">
              Browse doctors <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10 border-t border-sand-50/10">
            {[
              { label: 'Hospitals listed', value: `${displayHospitals.length}+` },
              { label: 'Verified doctors', value: `${displayDoctors.length}+` },
              { label: 'Patients served / mo', value: totalPatients > 0 ? `${Math.round(totalPatients/1000)}k+` : '50k+' },
              { label: 'Districts covered', value: `${districts.length}` },
            ].map(s => (
              <div key={s.label}>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-gold-500">{s.value}</p>
                <p className="text-xs sm:text-sm text-sand-50/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white border-b border-teal-900/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: 'Find nearby', text: 'Browse hospitals by district across Mogadishu, from Hodan to Bondhere.' },
            { icon: CalendarCheck, title: 'Real availability', text: "See each doctor's open time slots before you travel, not after." },
            { icon: ShieldCheck, title: 'Confirmed, not guessed', text: 'Get a real booking number — no double-booked seats, no surprises.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-100 text-teal-900 mb-3"><Icon size={18} /></span>
              <h3 className="font-display text-base font-semibold text-teal-950 mb-1">{title}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HERO 2: Famous Hospitals */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-9 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-rose-600 mb-2 block">Most renowned</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-teal-950 text-balance">Mogadishu's most famous hospitals</h2>
            <p className="text-ink-600 mt-2 max-w-xl">The facilities patients trust most — known for advanced care and strong outcomes.</p>
          </div>
          <Link to="/hospitals" className="hidden sm:flex items-center gap-1 text-sm font-medium text-teal-900 hover:text-rose-600 shrink-0">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(featuredHospitals.length > 0 ? featuredHospitals : displayHospitals.slice(0, 3)).map(h => (
            <HospitalCard key={h._id || h.id} hospital={h} />
          ))}
        </div>
      </section>

      {/* HERO 3: All hospitals by district */}
      <section className="bg-teal-50 border-y border-teal-900/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <span className="text-xs font-semibold uppercase tracking-wide text-teal-700 mb-2 block">Every hospital, every district</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-teal-950 mb-2 text-balance">Browse all hospitals in Banaadir</h2>
          <p className="text-ink-600 mb-9 max-w-xl">Click any hospital to see departments and every doctor on staff, then book directly.</p>
          <div className="flex flex-wrap gap-2.5 mb-10">
            {districts.map(d => (
              <Link key={d} to={`/hospitals?district=${encodeURIComponent(d)}`}
                className="text-sm font-medium text-teal-950 bg-white border border-teal-900/10 px-4 py-2 rounded-full hover:bg-teal-900 hover:text-sand-50 transition-colors">
                {d}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayHospitals.slice(0, 8).map(h => <HospitalCard key={h._id || h.id} hospital={h} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/hospitals" className="inline-flex items-center gap-2 bg-teal-900 text-sand-50 font-medium px-6 py-3 rounded-full hover:bg-teal-800 transition-colors">
              View all {displayHospitals.length} hospitals <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* HERO 4: Stats */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <span className="text-xs font-semibold uppercase tracking-wide text-gold-700 mb-2 block">By the numbers</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-teal-950 mb-9 text-balance">Activity across our hospital network</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-5">
            {[
              { icon: Users, label: 'Patients treated / month', value: totalPatients > 0 ? totalPatients.toLocaleString() : '50,000+', color: 'teal' },
              { icon: Building2, label: 'Hospitals in network', value: displayHospitals.length, color: 'gold' },
              { icon: Activity, label: 'Doctors on staff', value: displayDoctors.length, color: 'rose' },
              { icon: CalendarCheck, label: 'Departments covered', value: '30+', color: 'teal' },
              { icon: TrendingUp, label: 'Avg. hospital rating', value: '4.7 / 5', color: 'gold' },
              { icon: Clock, label: 'Avg. booking time', value: '< 3 min', color: 'rose' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-teal-900/10 rounded-2xl p-5">
                <span className={`flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${s.color === 'gold' ? 'bg-gold-100 text-gold-700' : s.color === 'rose' ? 'bg-rose-100 text-rose-600' : 'bg-teal-100 text-teal-900'}`}>
                  <s.icon size={16} />
                </span>
                <p className="font-display text-2xl font-semibold text-teal-950">{s.value}</p>
                <p className="text-xs text-ink-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          {busiest && (
            <div className="bg-teal-950 bg-grain rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold-600/15 text-gold-500 mb-4"><TrendingUp size={18} /></span>
                <h3 className="font-display text-xl font-semibold text-sand-50 mb-2">Busiest this month</h3>
                <p className="text-sm text-sand-50/65 leading-relaxed">
                  {busiest.name} led the network
                  {busiest.stats?.patientsPerMonth ? ` with ${busiest.stats.patientsPerMonth.toLocaleString()} patients treated` : ''}.
                </p>
              </div>
              <Link to={`/hospitals/${busiest._id || busiest.id}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-500 mt-6 hover:text-gold-400">
                View hospital <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* HERO 5: Awards */}
      <section className="bg-teal-950 bg-grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="flex items-end justify-between mb-9 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-gold-500 mb-2 flex items-center gap-1.5">
                <Award size={14} /> Recognized excellence
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-sand-50 text-balance">Award-winning doctors</h2>
              <p className="text-sand-50/65 mt-2 max-w-xl">Honored for outstanding care across specialties.</p>
            </div>
            <Link to="/awards" className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-500 hover:text-gold-400 shrink-0">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awardedDoctors.map((d, i) => <AwardBadge key={d._id || d.id} doctor={d} index={d.id || i} />)}
          </div>
        </div>
      </section>

      {/* Popular doctors */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-9 gap-4">
          <h2 className="font-display text-3xl font-semibold text-teal-950">Popular doctors right now</h2>
          <Link to="/doctors" className="hidden sm:flex items-center gap-1 text-sm font-medium text-teal-900 hover:text-rose-600 shrink-0">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayDoctors.slice(0, 6).map((d, i) => <DoctorCard key={d._id || d.id} doctor={d} index={i} />)}
        </div>
      </section>
    </div>
  );
}
