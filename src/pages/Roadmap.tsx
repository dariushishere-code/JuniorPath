import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Circle, ArrowRight, Code2, Monitor, Server, Layers } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getProjectsByStack, isProjectUnlocked } from '../data/projects';

export default function Roadmap() {
  const { user } = useStore();

  if (!user?.selectedStack) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No stack selected</h2>
          <Link to="/stack-selection" className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium">
            Choose a Stack
          </Link>
        </div>
      </div>
    );
  }

  const stackProjects = getProjectsByStack(user.selectedStack);
  const completedProjects = user.completedProjects || [];

  const stackInfo = {
    frontend: { name: 'Frontend', icon: Monitor, color: 'from-blue-500 to-cyan-500' },
    backend: { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
    fullstack: { name: 'Fullstack', icon: Layers, color: 'from-purple-500 to-pink-500' },
  };

  const currentStack = stackInfo[user.selectedStack];
  const completedCount = stackProjects.filter(p => completedProjects.includes(p.id)).length;
  const progress = (completedCount / stackProjects.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentStack.color} flex items-center justify-center`}>
              <currentStack.icon size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{currentStack.name} Roadmap</h1>
              <p className="text-sm text-gray-400">Complete all 10 projects to become job-ready</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-green-500"
              />
            </div>
            <span className="text-sm text-gray-400 font-medium">{completedCount}/10 completed</span>
          </div>
        </motion.div>

        {/* Horizontal Roadmap */}
        <div className="roadmap-scroll overflow-x-auto pb-8 -mx-4 px-4">
          <div className="flex items-center gap-0 min-w-max py-8">
            {stackProjects.map((project, index) => {
              const isCompleted = completedProjects.includes(project.id);
              const isUnlocked = isProjectUnlocked(project.id, user.selectedStack!, completedProjects);
              const isAvailable = isUnlocked && !isCompleted;

              return (
                <div key={project.id} className="flex items-center">
                  {/* Project Node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      to={isUnlocked ? `/project/${project.id}` : '#'}
                      className={`relative block w-56 p-5 rounded-2xl border transition-all ${
                        isCompleted
                          ? 'bg-green-500/5 border-green-500/30 glow-green cursor-pointer'
                          : isAvailable
                          ? 'bg-[#161616] border-purple-500/30 hover:border-purple-500/50 cursor-pointer hover:scale-[1.02]'
                          : 'bg-[#0D0D0D] border-white/5 cursor-not-allowed opacity-60'
                      }`}
                      onClick={(e) => !isUnlocked && e.preventDefault()}
                    >
                      {/* Status Icon */}
                      <div className="absolute -top-3 -right-3">
                        {isCompleted ? (
                          <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 size={16} className="text-white" />
                          </div>
                        ) : isAvailable ? (
                          <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center animate-pulse">
                            <Circle size={14} className="text-white" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                            <Lock size={14} className="text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Project Number */}
                      <div className={`text-xs font-mono mb-2 ${
                        isCompleted ? 'text-green-400' : isAvailable ? 'text-purple-400' : 'text-gray-600'
                      }`}>
                        #{project.order}
                      </div>

                      {/* Title */}
                      <h3 className={`text-sm font-semibold mb-2 leading-tight ${
                        isCompleted ? 'text-green-300' : isAvailable ? 'text-white' : 'text-gray-500'
                      }`}>
                        {project.title}
                      </h3>

                      {/* Difficulty Badge */}
                      <div className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </div>

                      {/* Tech tags */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Editor badge */}
                      {project.hasEditor && isAvailable && (
                        <div className="mt-3 flex items-center gap-1 text-[10px] text-purple-400">
                          <Code2 size={10} />
                          <span>Code in browser</span>
                        </div>
                      )}
                    </Link>
                  </motion.div>

                  {/* Connector Line */}
                  {index < stackProjects.length - 1 && (
                    <div className="flex items-center mx-2">
                      <div className={`h-[2px] w-12 ${
                        isCompleted ? 'bg-green-500/50 roadmap-line-active' : 'bg-white/10'
                      }`} />
                      <ArrowRight size={14} className={isCompleted ? 'text-green-500/50' : 'text-white/20'} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-6 mt-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-700" />
            <span className="text-gray-400">Locked</span>
          </div>
        </motion.div>

        {/* Difficulty Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs">
          <span className={`px-2 py-1 rounded-full border ${getDifficultyColor('beginner')}`}>Beginner (1-3)</span>
          <span className={`px-2 py-1 rounded-full border ${getDifficultyColor('intermediate')}`}>Intermediate (4-7)</span>
          <span className={`px-2 py-1 rounded-full border ${getDifficultyColor('advanced')}`}>Advanced (8-10)</span>
        </div>
      </div>
    </div>
  );
}
