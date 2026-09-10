import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, CheckCircle2, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getProjectsByStack } from '../data/projects';
import { AuroraHero } from '../components/ui/aurora-hero';
import { WhyUsBento } from '../components/ui/why-us-bento';
import { RadialGlowButton } from '../components/ui/radial-glow-button';

export default function Landing() {
  const { isAuthenticated } = useStore();
  const navigate = useNavigate();

  const stacks = [
    {
      id: 'frontend' as const,
      name: 'Frontend',
      tech: 'Next.js + TypeScript',
      color: 'from-blue-500 to-cyan-500',
      projects: getProjectsByStack('frontend'),
    },
    {
      id: 'backend' as const,
      name: 'Backend',
      tech: 'Node.js + .NET',
      color: 'from-green-500 to-emerald-500',
      projects: getProjectsByStack('backend'),
    },
    {
      id: 'fullstack' as const,
      name: 'Fullstack',
      tech: 'Next.js + Node.js + .NET',
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
              <span className="text-sm text-purple-300">Virtual Remote Internship Platform</span>
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
              Build Real Projects. Become Job-Ready.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Complete 10 portfolio-ready projects in Frontend, Backend, or Fullstack.
            Guided steps, points, flashcards — skills employers actually want.
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
                Go to Dashboard
                <ArrowRight size={18} />
              </RadialGlowButton>
            ) : (
              <>
                <RadialGlowButton
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="inline-flex items-center gap-2"
                >
                  Start Free — Get 50 Points
                  <ArrowRight size={18} />
                </RadialGlowButton>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white font-semibold text-lg transition-all"
                >
                  Login
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
              { value: '30', label: 'Projects' },
              { value: '150', label: 'Flashcards' },
              { value: '3', label: 'Stacks' },
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why JuniorPath</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to go from junior to interview-ready.
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Path</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every stack has a 10-project tree from beginner to advanced.
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
                <p className="text-sm text-gray-500 mb-4">{stack.tech} · {stack.projects.length} projects</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: '01', title: 'Sign Up & Choose Your Stack', desc: 'Create your account, get 50 bonus points, and pick Frontend, Backend, or Fullstack.' },
              { step: '02', title: 'Follow the Roadmap Tree', desc: 'Projects unlock sequentially. Start beginner and climb to advanced.' },
              { step: '03', title: 'Build & Submit', desc: 'Code in-browser or locally. Submit your GitHub repo and mark complete.' },
              { step: '04', title: 'Earn Points & Level Up', desc: '+100 points per project, +10 per flashcard. Track progress and build your portfolio.' },
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Join junior developers building real projects and landing interviews.
          </p>
          {!isAuthenticated && (
            <RadialGlowButton
              type="button"
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-2"
            >
              Get Started Free
              <CheckCircle2 size={18} />
            </RadialGlowButton>
          )}
        </motion.div>
      </section>

      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-purple-400" />
            <span className="text-sm text-gray-500">JuniorPath © 2026. Built for developers, by developers.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="/suggest" className="hover:text-white transition-colors">Suggest a Project</Link>
            <Link to="/snake" className="hover:text-white transition-colors">Snake Game</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
