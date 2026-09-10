import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { RadialGlowButton } from '../components/ui/radial-glow-button';
import { AnimatedFooter } from '../components/ui/animated-footer';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <AnimatedFooter
          headingLines={['Welcome Back', 'Continue Your Journey']}
          background="#0A0A0A"
          revealOnScroll={false}
        />
      </div>

      {/* Auth form on top */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Junior<span className="text-purple-400">Path</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-gray-400 mt-2">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-[#161616]/80 border border-white/5 backdrop-blur-sm">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="••••••••"
              />
            </div>
          </div>

          <RadialGlowButton
            type="submit"
            disabled={loading}
            className="w-full !min-w-0"
          >
            {loading ? 'Signing in…' : 'Sign In'}
            {!loading && <ArrowRight size={16} />}
          </RadialGlowButton>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign up free
          </Link>
        </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const success = await signup(email, password, name);
      if (success) {
        navigate('/stack-selection');
      } else {
        setError('An account with this email already exists');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <AnimatedFooter
          headingLines={['Start Building', 'Earn 50 Bonus Points']}
          background="#0A0A0A"
          revealOnScroll={false}
        />
      </div>

      {/* Auth form on top */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Junior<span className="text-purple-400">Path</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-gray-400 mt-2">Get 50 bonus points when you sign up!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-[#161616]/80 border border-white/5 backdrop-blur-sm">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="Min 6 characters"
              />
            </div>
          </div>

          <RadialGlowButton
            type="submit"
            disabled={loading}
            className="w-full !min-w-0"
          >
            {loading ? 'Creating account…' : 'Create Account & Get 50 Points'}
            {!loading && <ArrowRight size={16} />}
          </RadialGlowButton>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign in
          </Link>
        </p>
        </motion.div>
      </div>
    </div>
  );
}
