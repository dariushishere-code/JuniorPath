import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Trophy, Users, Zap, BookOpen, Rocket, CheckCircle2, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Landing() {
  const { isAuthenticated } = useStore();

  const features = [
    { icon: Rocket, title: '10 Real Projects', desc: 'Build portfolio-ready projects from beginner to advanced in your chosen stack.' },
    { icon: Trophy, title: 'Gamified Learning', desc: 'Earn points, unlock achievements, and track your progress with flashcards.' },
    { icon: Code2, title: 'Code In-Browser', desc: 'Start coding immediately with embedded editors. No setup required for beginners.' },
    { icon: Users, title: 'Community Driven', desc: 'Suggest new projects, share ideas, and learn together with fellow developers.' },
    { icon: BookOpen, title: '50 Flashcards', desc: 'Master key concepts with beautifully animated flashcards for each stack.' },
    { icon: Zap, title: 'Job Ready', desc: 'After completing all 10 projects, you\'ll have a portfolio that gets interviews.' },
  ];

  const stacks = [
    { name: 'Frontend', tech: 'Next.js + TypeScript', color: 'from-blue-500 to-cyan-500', projects: ['Portfolio', 'Landing Page', 'Weather App', 'Admin Dashboard', 'E-commerce', 'Job Board', 'Multi-step Form', 'Kanban Board', 'Analytics', 'Full E-commerce'] },
    { name: 'Backend', tech: 'Node.js + .NET', color: 'from-green-500 to-emerald-500', projects: ['REST API', 'URL Shortener', 'Auth System', 'Blog API', 'E-commerce API', 'Job Portal', 'File Upload', 'Chat Backend', 'Booking System', 'Advanced Auth'] },
    { name: 'Fullstack', tech: 'Next.js + Node.js + .NET', color: 'from-purple-500 to-pink-500', projects: ['Task Manager', 'Social Media', 'Learning Platform', 'Real Estate', 'PM Tool', 'Food Delivery', 'CMS', 'Healthcare', 'Events', 'SaaS Builder'] },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
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
            Build Real Projects.
            <br />
            <span className="gradient-text">Become Job-Ready.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Complete 10 portfolio-ready projects in your chosen stack. Get guided step-by-step, 
            earn points, and build the skills employers actually want.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="group px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition-all flex items-center gap-2 glow-purple"
              >
                Go to Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="group px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition-all flex items-center gap-2 glow-purple"
                >
                  Start Free — Get 50 Points
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white font-semibold text-lg transition-all"
                >
                  Login
                </Link>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: '30+', label: 'Projects' },
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

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A complete platform designed to take you from junior to job-ready developer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#161616] border border-white/5 hover:border-purple-500/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <feature.icon size={24} className="text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stacks Section */}
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
              Pick a stack and complete 10 progressively challenging projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stacks.map((stack, i) => (
              <motion.div
                key={stack.name}
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
                <p className="text-sm text-gray-500 mb-4">{stack.tech}</p>
                <div className="space-y-2">
                  {stack.projects.map((project, j) => (
                    <div key={project} className="flex items-center gap-2 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        j < 3 ? 'bg-green-500/20 text-green-400' :
                        j < 7 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {j + 1}
                      </div>
                      <span className="text-gray-400">{project}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              { step: '02', title: 'Follow the Roadmap', desc: 'Projects unlock sequentially. Start with beginner projects and work your way to advanced.' },
              { step: '03', title: 'Build & Submit', desc: 'Code in-browser or locally. Submit your GitHub repo link and mark as complete.' },
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

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-green-500/10 border border-white/5"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of junior developers building real projects and landing their dream jobs.
          </p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition-all glow-purple"
            >
              Get Started Free
              <CheckCircle2 size={20} />
            </Link>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-purple-400" />
            <span className="text-sm text-gray-500">JuniorPath © 2024. Built for developers, by developers.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="/suggest" className="hover:text-white transition-colors">Suggest a Project</Link>
            <Link to="/snake" className="hover:text-white transition-colors">🐍 Snake Game</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
