// client/src/components/Footer.jsx

import { Link } from 'react-router-dom';
import { Stethoscope, Phone, MapPin, Mail, MessageCircle, Share2, AtSign } from 'lucide-react';
import { districts } from '../data/hospitals';

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-sand-50 mt-24 bg-grain">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sand-50/10">
              <Stethoscope size={16} />
            </span>
            <span className="font-display text-lg font-semibold">dhakhtarkaaga</span>
          </div>
          <p className="text-sm text-sand-50/65 leading-relaxed max-w-xs">
            Mogadishu's directory for hospitals and doctors — find the right
            specialist, check real availability, and book your visit in minutes.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[MessageCircle, AtSign, Share2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-sand-50/10 hover:bg-gold-600 hover:text-teal-950 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sand-50/50 mb-3">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-sand-50/80">
            <li><Link to="/hospitals" className="hover:text-gold-500 transition-colors">All Hospitals</Link></li>
            <li><Link to="/doctors" className="hover:text-gold-500 transition-colors">All Doctors</Link></li>
            <li><Link to="/awards" className="hover:text-gold-500 transition-colors">Award-Winning Doctors</Link></li>
            <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sand-50/50 mb-3">
            Districts
          </h3>
          <ul className="space-y-2 text-sm text-sand-50/80">
            {districts.slice(0, 5).map((d) => (
              <li key={d}>
                <Link to={`/hospitals?district=${encodeURIComponent(d)}`} className="hover:text-gold-500 transition-colors">
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-sand-50/50 mb-3">
            Contact
          </h3>
          <ul className="space-y-2.5 text-sm text-sand-50/80">
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-gold-500 shrink-0" />
              Mogadishu, Banaadir, Somalia
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-gold-500 shrink-0" />
              +252 61 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-gold-500 shrink-0" />
              hello@dhakhtarkaaga.so
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand-50/10 py-5">
        <p className="text-center text-xs text-sand-50/50">
          © {new Date().getFullYear()} dhakhtarkaaga. Built for the people of Mogadishu.
        </p>
      </div>
    </footer>
  );
}
