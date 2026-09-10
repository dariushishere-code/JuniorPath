import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ExternalLink, Code2, Lock, Github, Trophy, Sparkles, Lightbulb, BookOpen, Braces } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { getProjectById, isProjectUnlocked, getProjectsByStack } from '../data/projects';
import { projectLearning } from '../data/project-learning';
import { useLanguage } from '../i18n/useLanguage';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, completeProject } = useStore();
  const { t, num, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [githubLink, setGithubLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const project = id ? getProjectById(id) : undefined;

  if (!project || !user) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('project.notFound')}</h2>
          <Link to="/roadmap" className="text-purple-400 hover:text-purple-300">← {t('project.backToRoadmap')}</Link>
        </div>
      </div>
    );
  }

  const isCompleted = user.completedProjects.includes(project.id);
  const isUnlocked = isProjectUnlocked(project.id, project.stack, user.completedProjects);
  const stackProjects = getProjectsByStack(project.stack);
  const currentIndex = stackProjects.findIndex(p => p.id === project.id);
  const nextProject = currentIndex < stackProjects.length - 1 ? stackProjects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? stackProjects[currentIndex - 1] : null;

  const learning = projectLearning[project.id];
  const pTitle = isRTL && project.titleFa ? project.titleFa : project.title;
  const pDescription = isRTL && project.descriptionFa ? project.descriptionFa : project.description;
  const steps = isRTL && project.stepsFa.length > 0 ? project.stepsFa : project.steps;
  const acceptance =
    isRTL && project.acceptanceCriteriaFa.length > 0 ? project.acceptanceCriteriaFa : project.acceptanceCriteria;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t('project.locked')}</h2>
          <p className="text-gray-400 mb-6">{t('project.lockedDesc')}</p>
          <Link to="/roadmap" className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium">
            ← {t('project.backToRoadmap')}
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleComplete = () => {
    completeProject(project.id, githubLink || undefined);
    setShowSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#22C55E', '#FFFFFF'],
    });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/roadmap" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span className="text-sm">{t('project.backToRoadmap')}</span>
          </Link>
          <div className="flex items-center gap-2">
            {prevProject && (
              <Link to={`/project/${prevProject.id}`} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
                ← #{prevProject.order}
              </Link>
            )}
            {nextProject && (
              <Link to={`/project/${nextProject.id}`} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                user.completedProjects.includes(nextProject.id) 
                  ? 'border-green-500/30 text-green-400' 
                  : 'border-white/10 text-gray-400 hover:text-white'
              }`}>
                #{nextProject.order} →
              </Link>
            )}
          </div>
        </div>

        {/* Project Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-purple-400">Project #{project.order}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
              {t('diff.' + project.difficulty)}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <CheckCircle2 size={14} />
                {t('road.completed')}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{pTitle}</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{pDescription}</p>
        </motion.div>

        {/* Technologies */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">{t('project.technologies')}</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deeper dive — extra description so the concept is easier to grasp */}
        {learning && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <div className="mb-8 p-6 rounded-2xl bg-[#161616] border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={18} className="text-purple-400" />
                <h3 className="text-lg font-semibold text-white">{t('project.learnMore')}</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {isRTL ? learning.longDescriptionFa : learning.longDescription}
              </p>
            </div>
          </motion.div>
        )}

        {/* Code Editor for Beginners */}
        {project.hasEditor && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="mb-8 p-6 rounded-2xl bg-[#161616] border border-purple-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Code2 size={20} className="text-purple-400" />
                <h3 className="text-lg font-semibold text-white">{t('project.codeInBrowser')}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('project.codeInBrowserDesc')}
              </p>
              <a
                href={`https://stackblitz.com/fork/${project.editorTemplate === 'nextjs' ? 'next' : 'node'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-colors"
              >
                <Code2 size={16} />
                {t('project.openStackblitz')}
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        )}

        {/* Local Setup for Intermediate/Advanced */}
        {!project.hasEditor && project.githubStarter && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="mb-8 p-6 rounded-2xl bg-[#161616] border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Github size={20} className="text-gray-300" />
                <h3 className="text-lg font-semibold text-white">{t('project.localSetup')}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('project.localSetupDesc')}
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#0A0A0A] border border-white/5">
                  <code className="text-sm text-green-400 font-mono">
                    git clone {project.githubStarter}
                  </code>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">VS Code recommended</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">Cursor IDE</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">Node.js 18+</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">{t('project.guidance')}</h3>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#161616] border border-white/5">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-400">{i + 1}</span>
                  </div>
                  <span className="text-sm text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pro Tips */}
        {learning && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} className="text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">{t('project.proTips')}</h3>
              </div>
              <div className="space-y-3">
                {(isRTL ? learning.tipsFa : learning.tips).map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center text-xs font-bold text-yellow-400">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Code Example with TODO parts */}
        {learning && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Braces size={18} className="text-purple-400" />
                <h3 className="text-lg font-semibold text-white">{t('project.codeExample')}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">{t('project.todoHint')}</p>
              <pre
                dir="ltr"
                className="overflow-x-auto p-4 rounded-2xl bg-[#0A0A0A] border border-white/5 text-xs leading-relaxed font-mono text-gray-300 whitespace-pre max-h-96 overflow-y-auto"
              >
                <code>{learning.codeExample}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* Acceptance Criteria */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">{t('project.acceptance')}</h3>
            <div className="space-y-2">
              {acceptance.map((criteria, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{criteria}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Complete Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="p-6 rounded-2xl bg-[#161616] border border-white/5">
            {!isCompleted ? (
              <>
                <h3 className="text-lg font-semibold text-white mb-4">{t('project.submit')}</h3>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">{t('project.githubRepo')}</label>
                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-gray-500" />
                    <input
                      type="url"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      placeholder={t('project.githubPlaceholder')}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={handleComplete}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Trophy size={18} />
                  {t('project.markCompleted')}
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">{t('project.completed')}</h3>
                <p className="text-gray-400 text-sm">
                  {user.projectGithubLinks?.[project.id] ? (
                    <a href={user.projectGithubLinks[project.id]} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
                      {t('project.viewGithub')} <ExternalLink size={12} />
                    </a>
                  ) : (
                    t('project.greatWork')
                  )}
                </p>
                {nextProject && (
                  <Link
                    to={`/project/${nextProject.id}`}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-colors"
                  >
                    {t('project.nextProject')} {nextProject.title}
                    <ArrowLeft size={14} className="rotate-180" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          >
            <div className="p-8 rounded-3xl bg-[#161616] border border-green-500/30 text-center max-w-sm mx-4 glow-green">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={40} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('project.successPoints')}</h3>
              <p className="text-gray-400">{t('project.successDesc')}</p>
              <p className="text-sm text-purple-400 mt-2">
                {t('project.totalPoints')} {num(user.points)} {t('project.points')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
