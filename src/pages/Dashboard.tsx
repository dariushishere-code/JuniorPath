import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Target, BookOpen, Code2, ExternalLink, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getProjectsByStack } from '../data/projects';
import { getFlashcardsByStack } from '../data/flashcards';

export default function Dashboard() {
  const { user } = useStore();

  if (!user) return null;

  const stackProjects = user.selectedStack ? getProjectsByStack(user.selectedStack) : [];
  const stackFlashcards = user.selectedStack ? getFlashcardsByStack(user.selectedStack) : [];
  const completedProjects = user.completedProjects || [];
  const readFlashcards = user.readFlashcards || [];

  const projectProgress = stackProjects.length > 0 ? (completedProjects.filter(id => stackProjects.some(p => p.id === id)).length / stackProjects.length) * 100 : 0;
  const flashcardProgress = stackFlashcards.length > 0 ? (readFlashcards.filter(id => stackFlashcards.some(f => f.id === id)).length / stackFlashcards.length) * 100 : 0;

  const completedProjectDetails = stackProjects.filter(p => completedProjects.includes(p.id));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="gradient-text">{user.name}</span>
          </h1>
          <p className="text-gray-400">Here's your progress overview</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl bg-[#161616] border border-white/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Zap size={20} className="text-purple-400" />
              </div>
              <span className="text-sm text-gray-400">Total Points</span>
            </div>
            <div className="text-3xl font-bold text-white">{user.points}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="p-5 rounded-2xl bg-[#161616] border border-white/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Target size={20} className="text-green-400" />
              </div>
              <span className="text-sm text-gray-400">Projects Done</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {completedProjects.filter(id => stackProjects.some(p => p.id === id)).length}
              <span className="text-lg text-gray-500">/{stackProjects.length}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl bg-[#161616] border border-white/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BookOpen size={20} className="text-blue-400" />
              </div>
              <span className="text-sm text-gray-400">Flashcards Read</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {readFlashcards.filter(id => stackFlashcards.some(f => f.id === id)).length}
              <span className="text-lg text-gray-500">/50</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="p-5 rounded-2xl bg-[#161616] border border-white/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-yellow-400" />
              </div>
              <span className="text-sm text-gray-400">Level</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {user.points < 200 ? 'Beginner' : user.points < 500 ? 'Intermediate' : user.points < 1000 ? 'Advanced' : 'Expert'}
            </div>
          </motion.div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-[#161616] border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Project Progress</h3>
              <Link to="/roadmap" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                View Roadmap <ArrowRight size={14} />
              </Link>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${projectProgress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-green-500"
              />
            </div>
            <p className="text-sm text-gray-400">{Math.round(projectProgress)}% complete</p>

            {user.selectedStack && (
              <div className="mt-4 flex items-center gap-2">
                <Code2 size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500 capitalize">{user.selectedStack} Stack</span>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="p-6 rounded-2xl bg-[#161616] border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Flashcard Progress</h3>
              <Link to="/flashcards" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                Study Now <ArrowRight size={14} />
              </Link>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${flashcardProgress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
            <p className="text-sm text-gray-400">{Math.round(flashcardProgress)}% mastered</p>
          </motion.div>
        </div>

        {/* Completed Projects */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="p-6 rounded-2xl bg-[#161616] border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <Trophy size={20} className="text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Completed Projects</h3>
            </div>

            {completedProjectDetails.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Target size={24} className="text-gray-600" />
                </div>
                <p className="text-gray-500 mb-4">No projects completed yet</p>
                <Link to="/roadmap" className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium">
                  Start Building
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {completedProjectDetails.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-400">#{project.order}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{project.title}</h4>
                        <span className="text-xs text-gray-500 capitalize">{project.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.projectGithubLinks?.[project.id] && (
                        <a
                          href={user.projectGithubLinks[project.id]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          title="View on GitHub"
                        >
                          <ExternalLink size={14} className="text-gray-400" />
                        </a>
                      )}
                      <Link
                        to={`/project/${project.id}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <ArrowRight size={14} className="text-gray-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/roadmap" className="p-4 rounded-2xl bg-[#161616] border border-white/5 hover:border-purple-500/20 transition-all group">
            <Code2 size={20} className="text-purple-400 mb-2" />
            <h4 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">Continue Building</h4>
            <p className="text-xs text-gray-500 mt-1">Work on your next project</p>
          </Link>
          <Link to="/flashcards" className="p-4 rounded-2xl bg-[#161616] border border-white/5 hover:border-blue-500/20 transition-all group">
            <BookOpen size={20} className="text-blue-400 mb-2" />
            <h4 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">Study Flashcards</h4>
            <p className="text-xs text-gray-500 mt-1">Learn key concepts</p>
          </Link>
          <Link to="/suggest" className="p-4 rounded-2xl bg-[#161616] border border-white/5 hover:border-green-500/20 transition-all group">
            <Zap size={20} className="text-green-400 mb-2" />
            <h4 className="text-sm font-medium text-white group-hover:text-green-300 transition-colors">Suggest a Project</h4>
            <p className="text-xs text-gray-500 mt-1">Help the community</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
