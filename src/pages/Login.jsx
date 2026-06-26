import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not log in, please check your details.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="text-center mb-8">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-900 text-sand-50 mb-4">
          <Stethoscope size={22} />
        </span>
        <h1 className="font-display text-2xl font-semibold text-teal-950">Welcome back</h1>
        <p className="text-ink-600 text-sm mt-1">Log in to manage your appointments.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-teal-900/10 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-600 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/30"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-600 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-teal-900/15 rounded-xl px-3.5 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/30"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-teal-900 transition-colors"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-danger-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-teal-900 text-sand-50 font-medium py-3 rounded-full hover:bg-teal-800 transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Log in
        </button>
      </form>

      <p className="text-center text-sm text-ink-600 mt-5">
        Don't have an account?{' '}
        <Link to="/register" className="text-teal-900 font-medium hover:text-gold-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}