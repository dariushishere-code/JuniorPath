import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, CheckCircle2, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getProjectsByStack } from '../data/projects';
import { useLanguage } from '../i18n/useLanguage';
import { AuroraHero } from '../components/ui/aurora-hero';
import { WhyUsBento } from '../components/ui/why-us-bento';
import { RadialGlowButton } from '../components/ui/radial-glow-button';

export default function Landing() {
  const { isAuthenticated } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stacks = [
    {
      id: 'frontend' as const,
      name: t('landing.frontend'),
      tech: t('landing.frontendTech'),
      desc: t('landing.frontendDesc'),
      color: 'from-blue-500 to-cyan-500',
      projects: getProjectsByStack('frontend'),
    },
    {
      id: 'backend' as const,
      name: t('landing.backend'),
      tech: t('landing.backendTech'),
      desc: t('landing.backendDesc'),
      color: 'from-green-500 to-emerald-500',
      projects: getProjectsByStack('backend'),
    },
    {
      id: 'fullstack' as const,
      name: t('landing.fullstack'),
      tech: t('landing.fullstackTech'),
      desc: t('landing.fullstackDesc'),
      color: 'from-purple-500 to-pink-500',
      projects: getProjectsByStack('fullstack'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Aurora Background */}
        <div className="absolute inset-0">
          <AuroraHero title="" className="h-full min-h-full" />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center relative z-10 px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <Star size={14} className="text-purple-400" />
              <span className="text-sm text-purple-300">{t('landing.badge')}</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Junior<span className="text-purple-400">Path</span>
            <br />
            <span className="gradient-text text-3xl sm:text-4xl md:text-5xl">
              {t('landing.title')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            {t('landing.desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isAuthenticated ? (
              <RadialGlowButton
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2"
              >
                {t('landing.goToDashboard')}
                <ArrowRight size={18} />
              </RadialGlowButton>
            ) : (
              <>
                <RadialGlowButton
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="inline-flex items-center gap-2"
                >
                  {t('landing.startBuilding')}
                  <ArrowRight size={18} />
                </RadialGlowButton>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white font-semibold text-lg transition-all"
                >
                  {t('nav.login')}
                </Link>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: '30', label: t('landing.projectsCount') },
              { value: '150', label: t('nav.flashcards') },
              { value: '3', label: t('landing.stacks') || 'Stacks' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why us bento */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('why.title')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('why.desc')}
            </p>
          </motion.div>
          <WhyUsBento />
        </div>
      </section>

      {/* Stacks with real project trees */}
      <section className="py-20 px-4 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('stack.title')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('stack.desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stacks.map((stack, i) => (
              <motion.div
                key={stack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 rounded-2xl bg-[#161616] border border-white/5 hover:border-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stack.color} flex items-center justify-center mb-4`}>
                  <Code2 size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{stack.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{stack.tech} · {stack.projects.length} {t('landing.projectsCount')}</p>
                <p className="text-sm text-gray-400 mb-4 text-justify">{stack.desc}</p>
                <div className="relative space-y-0 pl-3">
                  {stack.projects.map((project, j) => (
                    <div key={project.id} className="relative flex items-start gap-3 pb-4 last:pb-0">
                      {j < stack.projects.length - 1 && (
                        <div className="absolute left-[9px] top-5 bottom-0 w-px bg-white/10" />
                      )}
                      <div
                        className={`relative z-10 mt-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                          project.difficulty === 'beginner'
                            ? 'bg-green-500/20 text-green-400'
                            : project.difficulty === 'intermediate'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {project.order}
                      </div>
                      <span className="text-sm text-gray-400 leading-snug">{project.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('how.title')}</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: '01', title: t('how.step1.title'), desc: t('how.step1.desc') },
              { step: '02', title: t('how.step2.title'), desc: t('how.step2.desc') },
              { step: '03', title: t('how.step3.title'), desc: t('how.step3.desc') },
              { step: '04', title: t('how.step4.title'), desc: t('how.step4.desc') },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-400">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-green-500/10 border border-white/5"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-gray-400 text-lg mb-8">
            {t('cta.desc')}
          </p>
          {!isAuthenticated && (
            <RadialGlowButton
              type="button"
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-2"
            >
              {t('cta.button')}
              <CheckCircle2 size={18} />
            </RadialGlowButton>
          )}
        </motion.div>
      </section>

      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-purple-400" />
            <span className="text-sm text-gray-500">{t('footer.rights')}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="/suggest" className="hover:text-white transition-colors">{t('footer.suggest')}</Link>
            <Link to="/snake" className="hover:text-white transition-colors">{t('footer.snake')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
