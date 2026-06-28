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
      {/* ===== HERO 1: Brand new design ===== */}
      <section className="relative overflow-hidden bg-white">
        {/* Orange diagonal shape on right */}
        <div className="absolute top-0 right-0 h-full w-full sm:w-3/5 bg-gradient-to-br from-gold-600 to-rose-600" style={{clipPath:'polygon(30% 0%,100% 0%,100% 100%,10% 100%)'}} />
        <div className="absolute top-0 right-0 h-full w-full sm:w-3/5 bg-teal-950/20" style={{clipPath:'polygon(30% 0%,100% 0%,100% 100%,10% 100%)'}} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] items-center gap-10 py-16 lg:py-0">

            {/* LEFT */}
            <div className="z-10">
              <span className="inline-flex items-center gap-2 bg-teal-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                Mogadishu · Banaadir · Somalia
              </span>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-teal-950 leading-[1.05] tracking-tight">
                Find a doctor.<br/>
                Book a visit.<br/>
                <span className="text-gold-600">Skip the queue.</span>
              </h1>

              <p className="text-ink-600 text-base sm:text-lg mt-6 leading-relaxed max-w-md">
                Mogadishu's first online hospital directory — browse verified
                hospitals, check doctor availability, and confirm your
                appointment in under 3 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link to="/hospitals" className="flex items-center justify-center gap-2 bg-teal-900 text-white font-bold px-7 py-4 rounded-2xl hover:bg-teal-800 transition-colors shadow-lg shadow-teal-900/20 text-sm">
                  <Search size={17}/> Find a hospital
                </Link>
                <Link to="/doctors" className="flex items-center justify-center gap-2 bg-gold-600 text-white font-bold px-7 py-4 rounded-2xl hover:bg-gold-500 transition-colors shadow-lg shadow-gold-600/20 text-sm">
                  Browse doctors <ArrowRight size={16}/>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 mt-8 pt-8 border-t border-teal-900/10">
                {[
                  {icon: Building2, text: `${displayHospitals.length}+ Hospitals`},
                  {icon: Users, text: `${displayDoctors.length}+ Doctors`},
                  {icon: ShieldCheck, text: 'Verified listings'},
                ].map(({icon:Icon,text}) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-ink-600">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-50 text-teal-900"><Icon size={14}/></span>
                    <span className="font-semibold">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — cards on the gradient */}
            <div className="z-10 flex flex-col gap-4 lg:pl-8 pb-8 lg:py-20">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-44 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=800&q=80" alt="Hospital" className="w-full h-full object-cover"/>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-display font-bold text-teal-950 text-sm">Erdogan Hospital</p>
                    <p className="text-xs text-ink-400 mt-0.5">Yaqshid · Heart Surgery & Cardiology</p>
                  </div>
                  <Link to="/hospitals" className="bg-gold-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-gold-500 transition-colors flex items-center gap-1">
                    View <ArrowRight size={12}/>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-950 rounded-2xl p-4 text-white">
                  <CalendarCheck size={20} className="text-gold-400 mb-2"/>
                  <p className="font-display text-2xl font-bold">50k+</p>
                  <p className="text-xs text-white/60 mt-0.5">Patients / month</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-xl border border-teal-900/5">
                  <Award size={20} className="text-gold-600 mb-2"/>
                  <p className="font-display text-2xl font-bold text-teal-950">32+</p>
                  <p className="text-xs text-ink-400 mt-0.5">Verified doctors</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-teal-900/5 p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80" alt="Doctor" className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-teal-950 text-sm truncate">Dr. Abdirahman Hassan</p>
                  <p className="text-xs text-ink-400">Cardiology · $25 per visit</p>
                </div>
                <Link to="/doctors" className="shrink-0 bg-teal-900 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-teal-800 transition-colors">
                  Book
                </Link>
              </div>
            </div>
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