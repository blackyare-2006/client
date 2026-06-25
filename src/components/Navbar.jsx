// client/src/components/Navbar.jsx

import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope, Menu, X, CalendarCheck, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/hospitals', label: 'Hospitals' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/awards', label: 'Awards' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setIsOpen(false);
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 bg-sand-50/90 backdrop-blur border-b border-teal-900/10">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between py-3 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsOpen(false)}>
          <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-teal-900 text-sand-50 shrink-0">
            <Stethoscope size={18} strokeWidth={2.25} />
            <span className="slot-dot absolute -top-0.5 -right-0.5 bg-gold-600 ring-2 ring-sand-50" />
          </span>
          <span className="font-display text-xl font-semibold text-teal-950 tracking-tight whitespace-nowrap">
            dhakhtarkaaga
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[15px] font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-teal-900' : 'text-ink-600 hover:text-teal-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop auth area */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-[15px] font-medium text-ink-600 hover:text-teal-900 transition-colors"
              >
                <CalendarCheck size={17} />
                My bookings
              </Link>
              <span className="w-px h-5 bg-teal-900/15" />
              <span className="flex items-center gap-1.5 text-[15px] text-ink-600">
                <User size={16} />
                {user.full_name?.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-[15px] font-medium text-ink-600 hover:text-danger-600 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[15px] font-medium text-ink-600 hover:text-teal-900 transition-colors px-3 py-2"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-[15px] font-medium bg-teal-900 text-sand-50 px-4 py-2.5 rounded-full hover:bg-teal-800 transition-colors whitespace-nowrap"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-teal-950"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-teal-900/10 bg-sand-50 px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2.5 text-[15px] font-medium ${isActive ? 'text-teal-900' : 'text-ink-600'}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="py-2.5 text-[15px] font-medium text-ink-600 flex items-center gap-2"
              >
                <CalendarCheck size={17} /> My bookings
              </Link>
              <button
                onClick={handleLogout}
                className="py-2.5 text-[15px] font-medium text-danger-600 flex items-center gap-2 text-left"
              >
                <LogOut size={16} /> Log out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-2.5 text-[15px] font-medium border border-teal-900/20 rounded-full text-teal-900"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-center py-2.5 text-[15px] font-medium bg-teal-900 text-sand-50 rounded-full"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
