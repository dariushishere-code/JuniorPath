import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Send, CheckCircle2 } from 'lucide-react';
import { useStore, Stack } from '../store/useStore';

export default function SuggestProject() {
  const { user } = useStore();
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
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Thank You!</h2>
          <p className="text-gray-400 mb-6">
            Your project suggestion has been submitted. Our team will review it and consider adding it to the platform.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ title: '', description: '', stack: 'frontend', difficulty: 'beginner', technologies: '' }); }}
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium"
          >
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Lightbulb size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Suggest a Project</h1>
              <p className="text-sm text-gray-400">Help us build the best learning path for junior developers</p>
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
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="e.g., Music Player App"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Description *</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
              placeholder="Describe what this project involves, what the user will learn, and what makes it valuable..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Suggested Stack *</label>
              <select
                value={form.stack}
                onChange={(e) => setForm({ ...form, stack: e.target.value as Stack })}
                className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Difficulty Level *</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Recommended Technologies *</label>
            <input
              type="text"
              required
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="e.g., React, Node.js, PostgreSQL, Socket.io"
            />
            <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Submit Suggestion
          </button>
        </motion.form>
      </div>
    </div>
  );
}
