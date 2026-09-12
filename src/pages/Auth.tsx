import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Mail, Lock, User, ArrowRight, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import {
  useStore,
  isValidEmail,
  sanitizeName,
  validatePassword,
  getPasswordStrength,
  type PasswordStrength,
} from '../store/useStore';
import { useLanguage } from '../i18n/useLanguage';
import { RadialGlowButton } from '../components/ui/radial-glow-button';
import { PerspectiveGrid } from '../components/ui/perspective-grid';

/** Maps raw Supabase auth errors to a localized translation key. */
const AUTH_ERROR_MAP: { key: string; test: RegExp }[] = [
  { key: 'auth.login.error.invalid', test: /invalid login credentials|invalid email/i },
  { key: 'auth.login.confirmEmail', test: /email not confirmed|confirm your email/i },
  { key: 'auth.login.error.rateLimited', test: /rate limit/i },
  { key: 'auth.signup.error.exists', test: /already registered|already been registered/i },
  { key: 'auth.signup.error.length', test: /at least \d+ characters/i },
  { key: 'auth.signup.error.email', test: /invalid.*email/i },
];

function translateAuthError(
  message: string | undefined,
  t: (key: string) => string,
  fallback: string
): string {
  const lower = (message ?? '').toLowerCase();
  for (const entry of AUTH_ERROR_MAP) {
    if (entry.test.test(lower)) return t(entry.key);
  }
  return message || fallback;
}

/** Success/confirmation banner shown inside the form. */
function InfoNotice({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
      <CheckCircle2 size={16} className="flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/** Small three-bar password strength indicator used on the sign up form. */
function PasswordStrengthMeter({ strength }: { strength: PasswordStrength }) {
  const { t } = useLanguage();
  const levels = strength === 'strong' ? 3 : strength === 'medium' ? 2 : 1;
  const label = t('auth.strength.' + strength);
  const color =
    strength === 'strong'
      ? 'bg-green-500'
      : strength === 'medium'
        ? 'bg-yellow-500'
        : 'bg-red-500';
  return (
    <div className="mt-2" aria-hidden="true">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < levels ? color : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <span className={`text-[11px] mt-1 inline-block ${
        strength === 'strong' ? 'text-green-400' : strength === 'medium' ? 'text-yellow-400' : 'text-red-400'
      }`}>
        {label}
      </span>
    </div>
  );
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (!email || !password) {
      setError(t('auth.login.error.empty'));
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(translateAuthError(result.error, t, t('auth.login.error.invalid')));
      }
    } catch {
      setError(t('auth.login.error.general'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <PerspectiveGrid gridSize={20} fadeRadius={80} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
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
            <h1 className="text-2xl font-bold text-white">{t('auth.login.title')}</h1>
            <p className="text-gray-400 mt-2">{t('auth.login.desc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-[#161616]/80 border border-white/5 backdrop-blur-sm">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <InfoNotice message={notice} />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.email')}</label>
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
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.password')}</label>
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
            {loading ? t('auth.login.loading') : t('auth.login.submit')}
            {!loading && <ArrowRight size={16} />}
          </RadialGlowButton>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {t('auth.login.noAccount')}{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            {t('auth.login.signupLink')}
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
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (!name || !email || !password) {
      setError(t('auth.signup.error.empty'));
      return;
    }
    if (!isValidEmail(email)) {
      setError(t('auth.signup.error.email'));
      return;
    }
    const ruleKey = validatePassword(password);
    if (ruleKey) {
      setError(t(ruleKey));
      return;
    }
    setLoading(true);
    try {
      const result = await signup(email, password, sanitizeName(name));
      if (result.success && result.needsEmailConfirmation) {
        setNotice(t('auth.signup.confirmEmail'));
      } else if (result.success) {
        navigate('/stack-selection');
      } else {
        setError(translateAuthError(result.error, t, t('auth.signup.error.general')));
      }
    } catch {
      setError(t('auth.signup.error.general'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <PerspectiveGrid gridSize={20} fadeRadius={80} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
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
          <h1 className="text-2xl font-bold text-white">{t('auth.signup.title')}</h1>
          <p className="text-gray-400 mt-2">{t('auth.signup.desc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-[#161616]/80 border border-white/5 backdrop-blur-sm">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <InfoNotice message={notice} />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.name')}</label>
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
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.email')}</label>
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
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.password')}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="Min 8 characters"
              />
            </div>
            {password.length > 0 && <PasswordStrengthMeter strength={strength} />}
            <ul className="mt-2 space-y-1 text-[11px] text-gray-500">
              <li className="flex items-center gap-1.5">
                <KeyRound size={11} className="text-purple-400" />
                {t('auth.passwordRules.length')}
              </li>
              <li className="flex items-center gap-1.5">
                <KeyRound size={11} className="text-purple-400" />
                {t('auth.passwordRules.letter')}
              </li>
              <li className="flex items-center gap-1.5">
                <KeyRound size={11} className="text-purple-400" />
                {t('auth.passwordRules.number')}
              </li>
            </ul>
          </div>

          <RadialGlowButton
            type="submit"
            disabled={loading}
            className="w-full !min-w-0"
          >
            {loading ? t('auth.signup.loading') : t('auth.signup.submit')}
            {!loading && <ArrowRight size={16} />}
          </RadialGlowButton>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {t('auth.signup.hasAccount')}{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            {t('auth.signup.loginLink')}
          </Link>
        </p>
        </motion.div>
      </div>
    </div>
  );
}
