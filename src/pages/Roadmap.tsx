import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Code2,
  Monitor,
  Server,
  Layers,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useStore, Stack } from '../store/useStore';
import { getProjectsByStack, isProjectUnlocked } from '../data/projects';
import { RadialGlowButton } from '../components/ui/radial-glow-button';

const STACK_META: Record<
  Stack,
  { name: string; icon: typeof Monitor; color: string; tech: string }
> = {
  frontend: {
    name: 'Frontend',
    icon: Monitor,
    color: 'from-blue-500 to-cyan-500',
    tech: 'Next.js + TypeScript',
  },
  backend: {
    name: 'Backend',
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    tech: 'Node.js + .NET',
  },
  fullstack: {
    name: 'Fullstack',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    tech: 'Next.js + Node + .NET',
  },
};

export default function Roadmap() {
  const { user, selectStack } = useStore();
  const [previewStack, setPreviewStack] = useState<Stack | null>(null);

  const stackCounts = useMemo(
    () =>
      (['frontend', 'backend', 'fullstack'] as Stack[]).map((s) => ({
        id: s,
        count: getProjectsByStack(s).length,
      })),
    [],
  );

  if (!user?.selectedStack) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">No stack selected</h2>
          <Link
            to="/stack-selection"
            className="inline-block px-6 py-3 rounded-xl bg-purple-600 text-white font-medium"
          >
            Choose a Stack
          </Link>
        </div>
      </div>
    );
  }

  const activeStack = previewStack ?? user.selectedStack;
  const isOwnStack = activeStack === user.selectedStack;
  const stackProjects = getProjectsByStack(activeStack);
  const completedProjects = user.completedProjects || [];
  const currentStack = STACK_META[activeStack];
  const completedCount = stackProjects.filter((p) =>
    completedProjects.includes(p.id),
  ).length;
  const progress =
    stackProjects.length > 0
      ? (completedCount / stackProjects.length) * 100
      : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {(Object.keys(STACK_META) as Stack[]).map((stackId) => {
              const meta = STACK_META[stackId];
              const selected = activeStack === stackId;
              const isUserStack = user.selectedStack === stackId;
              return (
                <button
                  key={stackId}
                  type="button"
                  onClick={() => setPreviewStack(stackId)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    selected
                      ? 'border-purple-500/50 bg-purple-500/10 text-white'
                      : 'border-white/10 bg-[#161616] text-gray-400 hover:text-white'
                  }`}
                >
                  <meta.icon size={16} />
                  {meta.name}
                  <span className="text-xs text-gray-500">
                    {stackCounts.find((c) => c.id === stackId)?.count}
                  </span>
                  {isUserStack && (
                    <span className="text-[10px] uppercase tracking-wide text-purple-400">
                      yours
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentStack.color} flex items-center justify-center`}
            >
              <currentStack.icon size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {currentStack.name} Roadmap Tree
              </h1>
              <p className="text-sm text-gray-400">
                {currentStack.tech} · {stackProjects.length} projects
                {!isOwnStack && ' · preview only'}
              </p>
            </div>
          </div>

          {isOwnStack ? (
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-green-500"
                />
              </div>
              <span className="text-sm text-gray-400 font-medium">
                {completedCount}/{stackProjects.length} completed
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-gray-400">
                Switch to this stack to unlock and complete its projects.
              </p>
              <RadialGlowButton
                type="button"
                className="!min-h-0 !min-w-0 !py-2 !px-4 !text-sm"
                onClick={() => {
                  selectStack(activeStack);
                  setPreviewStack(null);
                }}
              >
                Switch to {currentStack.name}
              </RadialGlowButton>
            </div>
          )}
        </motion.div>

        {/* Vertical project tree */}
        <div className="relative">
          {stackProjects.map((project, index) => {
            const isCompleted = completedProjects.includes(project.id);
            const isUnlocked =
              isOwnStack &&
              isProjectUnlocked(
                project.id,
                user.selectedStack!,
                completedProjects,
              );
            const isAvailable = isUnlocked && !isCompleted;
            const locked = !isOwnStack || !isUnlocked;

            const node = (
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex gap-4 ${
                  index < stackProjects.length - 1 ? 'pb-6' : ''
                }`}
              >
                {/* Tree spine */}
                <div className="flex flex-col items-center w-8 shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border z-10 ${
                      isCompleted
                        ? 'bg-green-500 border-green-400'
                        : isAvailable
                        ? 'bg-purple-500 border-purple-400 animate-pulse'
                        : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-white" />
                    ) : isAvailable ? (
                      <Circle size={14} className="text-white" />
                    ) : (
                      <Lock size={14} className="text-gray-400" />
                    )}
                  </div>
                  {index < stackProjects.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 mt-1 ${
                        isCompleted
                          ? 'bg-green-500/50 roadmap-line-active'
                          : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`flex-1 p-5 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-green-500/5 border-green-500/30 glow-green'
                      : isAvailable
                      ? 'bg-[#161616] border-purple-500/30 hover:border-purple-500/50 hover:scale-[1.01]'
                      : 'bg-[#0D0D0D] border-white/5 opacity-70'
                  } ${locked && isOwnStack ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div
                        className={`text-xs font-mono mb-1 ${
                          isCompleted
                            ? 'text-green-400'
                            : isAvailable
                            ? 'text-purple-400'
                            : 'text-gray-600'
                        }`}
                      >
                        #{project.order}
                      </div>
                      <h3
                        className={`text-base font-semibold leading-tight ${
                          isCompleted
                            ? 'text-green-300'
                            : isAvailable
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${getDifficultyColor(
                        project.difficulty,
                      )}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {isAvailable && (
                    <div className="flex items-center gap-1 text-xs text-purple-400">
                      {project.hasEditor && (
                        <>
                          <Code2 size={12} />
                          <span>Code in browser</span>
                          <span className="mx-1 text-gray-600">·</span>
                        </>
                      )}
                      <span className="inline-flex items-center gap-1">
                        Open project <ArrowRight size={12} />
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );

            if (isUnlocked && isOwnStack) {
              return (
                <Link key={project.id} to={`/project/${project.id}`} className="block">
                  {node}
                </Link>
              );
            }

            return (
              <div key={project.id} className="block">
                {node}
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-6 mt-8 text-sm"
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
      </div>
    </div>
  );
}
