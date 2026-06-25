// client/src/admin/components/AdminLayout.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope, CalendarCheck, Building2, UserRound, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const sidebarLinks = [
  { to: '/admin/dashboard/bookings', icon: CalendarCheck, label: 'Bookings' },
  { to: '/admin/dashboard/hospitals', icon: Building2, label: 'Hospitals' },
  { to: '/admin/dashboard/doctors', icon: UserRound, label: 'Doctors' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen flex bg-sand-100">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-teal-950 flex flex-col transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-sand-50/10">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-600 text-teal-950 shrink-0">
            <Stethoscope size={15} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-sand-50 leading-tight">dhakhtarkaaga</p>
            <p className="text-xs text-sand-50/50">Admin Panel</p>
          </div>
        </div>

        {/* Admin info */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-sand-50/10">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold-600/15 text-gold-500">
            <ShieldCheck size={16} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-sand-50 truncate">{admin?.displayName || 'Admin'}</p>
            <p className="text-xs text-sand-50/50 truncate">@{admin?.username}</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-5 space-y-1">
          {sidebarLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-600 text-teal-950'
                    : 'text-sand-50/70 hover:bg-sand-50/10 hover:text-sand-50'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-sand-50/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-sand-50/60 hover:text-sand-50 hover:bg-sand-50/10 transition-colors w-full"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-teal-950/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar (mobile only) */}
        <header className="lg:hidden flex items-center gap-3 px-5 py-3.5 bg-white border-b border-teal-900/10">
          <button onClick={() => setSidebarOpen(true)} className="text-teal-950">
            <Menu size={22} />
          </button>
          <span className="font-display text-base font-semibold text-teal-950">Admin Panel</span>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
