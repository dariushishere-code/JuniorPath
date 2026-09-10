import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Send, CheckCircle2 } from 'lucide-react';
import { useStore, Stack } from '../store/useStore';
import { useLanguage } from '../i18n/useLanguage';
import { AnimatedRays } from '../components/ui/animated-rays';

export default function SuggestProject() {
  const { user } = useStore();
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    stack: 'frontend' as Stack,
    difficulty: 'beginner',
    technologies: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store suggestion in localStorage
    const suggestions = JSON.parse(localStorage.getItem('juniorpath_suggestions') || '[]');
    suggestions.push({
      ...form,
      id: crypto.randomUUID(),
      userId: user?.id,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('juniorpath_suggestions', JSON.stringify(suggestions));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen pt-24 px-4 flex items-center justify-center overflow-hidden">
        <AnimatedRays className="pointer-events-none fixed inset-0 -z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{t('suggest.thanks')}</h2>
          <p className="text-gray-400 mb-6">
            {t('suggest.thanksDesc')}
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ title: '', description: '', stack: 'frontend', difficulty: 'beginner', technologies: '' }); }}
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium"
          >
            {t('suggest.submitAnother')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      {/* AnimatedRays ambient background — replaces the old plain section background */}
      <AnimatedRays className="pointer-events-none fixed inset-0 -z-10" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Lightbulb size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{t('suggest.title')}</h1>
              <p className="text-sm text-gray-400">{t('suggest.subtitle')}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6 p-6 rounded-2xl bg-[#161616] border border-white/5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('suggest.titleField')}</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder={t('suggest.titlePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('suggest.descField')}</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
              placeholder={t('suggest.descPlaceholder')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('suggest.stackField')}</label>
              <select
                value={form.stack}
                onChange={(e) => setForm({ ...form, stack: e.target.value as Stack })}
                className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="frontend">{t('suggest.frontend')}</option>
                <option value="backend">{t('suggest.backend')}</option>
                <option value="fullstack">{t('suggest.fullstack')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('suggest.difficultyField')}</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="beginner">{t('suggest.beginner')}</option>
                <option value="intermediate">{t('suggest.intermediate')}</option>
                <option value="advanced">{t('suggest.advanced')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('suggest.techField')}</label>
            <input
              type="text"
              required
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder={t('suggest.techPlaceholder')}
            />
            <p className="text-xs text-gray-500 mt-1">{t('suggest.techHint')}</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Send size={16} />
            {t('suggest.submit')}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
