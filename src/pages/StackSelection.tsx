import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Server, Layers, ArrowRight } from 'lucide-react';
import { useStore, Stack } from '../store/useStore';
import { getProjectsByStack } from '../data/projects';
import { RadialGlowButton } from '../components/ui/radial-glow-button';

export default function StackSelection() {
  const { user, selectStack } = useStore();
  const navigate = useNavigate();

  const stacks = [
    {
      id: 'frontend' as Stack,
      name: 'Frontend',
      description: 'Build beautiful, interactive user interfaces with Next.js and TypeScript',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'hover:border-blue-500/30',
      techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      projects: getProjectsByStack('frontend'),
    },
    {
      id: 'backend' as Stack,
      name: 'Backend',
      description: 'Build robust APIs and server-side applications with Node.js and .NET',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      borderColor: 'hover:border-green-500/30',
      techs: ['Node.js', 'Express', '.NET', 'PostgreSQL', 'Redis'],
      projects: getProjectsByStack('backend'),
    },
    {
      id: 'fullstack' as Stack,
      name: 'Fullstack',
      description: 'Master both frontend and backend to build complete web applications',
      icon: Layers,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'hover:border-purple-500/30',
      techs: ['Next.js', 'Node.js', '.NET', 'PostgreSQL', 'Prisma'],
      projects: getProjectsByStack('fullstack'),
    },
  ];

  useEffect(() => {
    if (user?.selectedStack) {
      navigate('/roadmap');
    }
  }, [user?.selectedStack, navigate]);

  const handleSelect = (stack: Stack) => {
    selectStack(stack);
    navigate('/roadmap');
  };

  if (user?.selectedStack) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Stack</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Each path has a 10-project tree from beginner to advanced. You can preview and switch stacks later from the roadmap.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stacks.map((stack, i) => (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`p-6 rounded-2xl bg-[#161616] border border-white/5 ${stack.borderColor} transition-all flex flex-col`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stack.color} flex items-center justify-center mb-5`}>
                <stack.icon size={28} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{stack.name}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{stack.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {stack.techs.map((tech) => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex-1 mb-5 space-y-2 max-h-56 overflow-y-auto pr-1">
                {stack.projects.map((project) => (
                  <div key={project.id} className="flex items-center gap-2 text-sm">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        project.difficulty === 'beginner'
                          ? 'bg-green-500/20 text-green-400'
                          : project.difficulty === 'intermediate'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {project.order}
                    </div>
                    <span className="text-gray-400 truncate">{project.title}</span>
                  </div>
                ))}
              </div>

              <RadialGlowButton
                type="button"
                onClick={() => handleSelect(stack.id)}
                className="w-full !min-w-0"
              >
                Start {stack.name}
                <ArrowRight size={16} />
              </RadialGlowButton>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
