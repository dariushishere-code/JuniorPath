import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Server, Layers, ArrowRight, Check } from 'lucide-react';
import { useStore, Stack } from '../store/useStore';

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
    },
    {
      id: 'backend' as Stack,
      name: 'Backend',
      description: 'Build robust APIs and server-side applications with Node.js and .NET',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      borderColor: 'hover:border-green-500/30',
      techs: ['Node.js', 'Express', '.NET', 'PostgreSQL', 'Redis'],
    },
    {
      id: 'fullstack' as Stack,
      name: 'Fullstack',
      description: 'Master both frontend and backend to build complete web applications',
      icon: Layers,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'hover:border-purple-500/30',
      techs: ['Next.js', 'Node.js', '.NET', 'PostgreSQL', 'Prisma'],
    },
  ];

  const handleSelect = (stack: Stack) => {
    selectStack(stack);
    navigate('/roadmap');
  };

  if (user?.selectedStack) {
    navigate('/roadmap');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Stack</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pick the technology path that excites you most. Each stack has 10 projects 
            going from beginner to advanced. You can always switch later!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stacks.map((stack, i) => (
            <motion.button
              key={stack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={() => handleSelect(stack.id)}
              className={`group p-6 rounded-2xl bg-[#161616] border border-white/5 ${stack.borderColor} transition-all text-left hover:scale-[1.02]`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stack.color} flex items-center justify-center mb-5`}>
                <stack.icon size={28} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{stack.name}</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">{stack.description}</p>

              <div className="space-y-2 mb-6">
                {stack.techs.map((tech) => (
                  <div key={tech} className="flex items-center gap-2">
                    <Check size={14} className="text-green-400" />
                    <span className="text-sm text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                <span>Select this stack</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            💡 Tip: If you're not sure, start with Frontend — it's the most visual and rewarding for beginners.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
