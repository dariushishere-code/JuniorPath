import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronDown, Search, Target } from 'lucide-react';
import { useStore, type Stack } from '../store/useStore';
import {
  interviewQuestions,
  getInterviewQuestionsByStack,
  getInterviewQuestionCategories,
} from '../data/interviewQuestions';
import { useLanguage } from '../i18n/useLanguage';

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

export default function InterviewPrep() {
  const { user } = useStore();
  const { t, num, lang } = useLanguage();

  const [selectedStack, setSelectedStack] = useState<Stack>(user?.selectedStack ?? 'frontend');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const reviewed = useMemo(() => new Set(user?.reviewedInterviewQuestions ?? []), [user]);

  const stackQuestions = useMemo(
    () => getInterviewQuestionsByStack(selectedStack),
    [selectedStack],
  );
  const categories = useMemo(
    () => getInterviewQuestionCategories(selectedStack),
    [selectedStack],
  );

  const allReviewed = (user?.reviewedInterviewQuestions ?? []).length;
  const totalQuestions = interviewQuestions.length;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return stackQuestions.filter((q) => {
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
      if (query) {
        const haystack = `${q.question} ${q.answer} ${q.questionFa} ${q.answerFa}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [stackQuestions, selectedDifficulty, selectedCategory, search]);

  const localeOf = (q: (typeof interviewQuestions)[number]) =>
    lang === 'fa'
      ? { question: q.questionFa, answer: q.answerFa, category: q.categoryFa }
      : { question: q.question, answer: q.answer, category: q.category };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleReview = (id: string) => {
    useStore.getState().toggleInterviewQuestionReviewed(id);
  };

  const stacks = [
    { id: 'frontend' as Stack, name: t('landing.frontend'), color: 'from-blue-500 to-cyan-500' },
    { id: 'backend' as Stack, name: t('landing.backend'), color: 'from-green-500 to-emerald-500' },
    { id: 'fullstack' as Stack, name: t('landing.fullstack'), color: 'from-purple-500 to-pink-500' },
  ];

  const difficulties = [
    { id: 'all' as DifficultyFilter, label: t('iq.all') },
    { id: 'beginner' as DifficultyFilter, label: t('diff.beginner') },
    { id: 'intermediate' as DifficultyFilter, label: t('diff.intermediate') },
    { id: 'advanced' as DifficultyFilter, label: t('diff.advanced') },
  ];

  const progressPct = totalQuestions > 0 ? Math.round((allReviewed / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{t('iq.title')}</h1>
              <p className="text-sm text-gray-400">{t('iq.subtitle')}</p>
            </div>
          </div>

          {/* Global progress bar */}
          <div className="p-5 rounded-2xl bg-[#161616] border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-sm text-gray-300">
                <Target size={16} className="text-purple-400" />
                {t('iq.progress')}
              </span>
              <span className="text-sm text-gray-400">
                {num(allReviewed)} {t('iq.of')} {num(totalQuestions)} · {num(progressPct)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          {/* Stack tabs */}
          <div className="flex flex-wrap gap-2">
            {stacks.map((stack) => (
              <button
                key={stack.id}
                onClick={() => {
                  setSelectedStack(stack.id);
                  setSelectedCategory('all');
                  setExpanded(new Set());
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStack === stack.id
                    ? `bg-gradient-to-r ${stack.color} text-white`
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {stack.name}
              </button>
            ))}
          </div>

          {/* Difficulty + category + search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {difficulties.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDifficulty(d.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selectedDifficulty === d.id
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <div className="flex-1 min-w-[180px]">
              <label className="sr-only">{t('iq.category')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#161616] border border-white/10 text-sm text-gray-300 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">
                  {t('iq.category')}: {t('iq.all')}
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 min-w-[180px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('iq.search')}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#161616] border border-white/10 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Question list */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-10">{t('iq.noResults')}</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((q, i) => {
              const text = localeOf(q);
              const isOpen = expanded.has(q.id);
              const isReviewed = reviewed.has(q.id);
              const diffColor =
                q.difficulty === 'beginner'
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : q.difficulty === 'intermediate'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30';

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.4) }}
                  className={`rounded-2xl border transition-colors ${
                    isReviewed
                      ? 'bg-green-500/5 border-green-500/25'
                      : 'bg-[#161616] border-white/5 hover:border-purple-500/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(q.id)}
                    className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                          {text.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${diffColor}`}>
                          {t('diff.' + q.difficulty)}
                        </span>
                        {isReviewed && (
                          <span className="flex items-center gap-1 text-[10px] text-green-400">
                            <CheckCircle2 size={12} />
                            {t('iq.reviewed')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-white leading-relaxed">
                        {text.question}
                      </h3>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`mt-1 flex-shrink-0 text-gray-500 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4">
                          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 mb-2 inline-block">
                              {t('iq.answer')}
                            </span>
                            <p className="text-sm text-gray-300 leading-relaxed">{text.answer}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleReview(q.id);
                            }}
                            className={`mt-3 px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                              isReviewed
                                ? 'bg-green-500/15 border-green-500/30 text-green-400 hover:bg-green-500/25'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {isReviewed ? t('iq.markNotReviewed') : t('iq.markReviewed')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
