import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Zap, Filter } from 'lucide-react';
import { useStore, Stack } from '../store/useStore';
import { getFlashcardsByStack, getFlashcardCategories } from '../data/flashcards';
import { flashcardsFa } from '../data/flashcards-fa';
import { useLanguage } from '../i18n/useLanguage';

export default function Flashcards() {
  const { user } = useStore();
  const { t, num, lang } = useLanguage();
  const [selectedStack, setSelectedStack] = useState<Stack>(user?.selectedStack || 'frontend');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  if (!user) return null;

  const cards = getFlashcardsByStack(selectedStack);
  const localeOfCard = (card: { id: string; question: string; answer: string; category: string }) =>
    lang === 'fa' && flashcardsFa[card.id]
      ? flashcardsFa[card.id]
      : { question: card.question, answer: card.answer, category: card.category };
  const categories =
    lang === 'fa'
      ? [...new Set(cards.map((c) => localeOfCard(c).category))]
      : getFlashcardCategories(selectedStack);
  const readCards = user.readFlashcards || [];

  const filteredCards = selectedCategory === 'All' 
    ? cards 
    : cards.filter(c => localeOfCard(c).category === selectedCategory);

  const toggleFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  const stacks: { id: Stack; name: string; color: string }[] = [
    { id: 'frontend', name: t('landing.frontend'), color: 'from-blue-500 to-cyan-500' },
    { id: 'backend', name: t('landing.backend'), color: 'from-green-500 to-emerald-500' },
    { id: 'fullstack', name: t('landing.fullstack'), color: 'from-purple-500 to-pink-500' },
  ];

  const readCount = cards.filter(c => readCards.includes(c.id)).length;
  const progress = (readCount / cards.length) * 100;

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
              <h1 className="text-2xl font-bold text-white">{t('fc.title')}</h1>
              <p className="text-sm text-gray-400">{t('fc.subtitle')}</p>
            </div>
          </div>

          {/* Stack selector */}
          <div className="flex gap-2 mb-4">
            {stacks.map((stack) => (
              <button
                key={stack.id}
                onClick={() => { setSelectedStack(stack.id); setSelectedCategory('All'); setFlippedCards(new Set()); }}
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

          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-green-500"
              />
            </div>
            <span className="text-sm text-gray-400">{num(readCount)}/{num(cards.length)} {t('fc.read')}</span>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={14} className="text-gray-500" />
            <span className="text-sm text-gray-500">{t('fc.filterBy')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === 'All' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {t('fc.all')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card, i) => {
            const isFlipped = flippedCards.has(card.id);
            const isRead = readCards.includes(card.id);
            const cardText = localeOfCard(card);

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flip-card cursor-pointer ${isFlipped ? 'flipped' : ''}`}
                onClick={() => toggleFlip(card.id)}
              >
                <div className="flip-card-inner relative w-full h-48">
                  {/* Front */}
                  <div className={`flip-card-front absolute inset-0 p-5 rounded-2xl border flex flex-col justify-between ${
                    isRead 
                      ? 'bg-green-500/5 border-green-500/20' 
                      : 'bg-[#161616] border-white/5 hover:border-purple-500/20'
                  } transition-colors`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500">{cardText.category}</span>
                        {isRead && <CheckCircle2 size={14} className="text-green-400" />}
                      </div>
                      <p className="text-sm font-medium text-white leading-relaxed">{cardText.question}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-600">{t('fc.clickReveal')}</span>
                      <Zap size={12} className="text-purple-400" />
                    </div>
                  </div>

                  {/* Back */}
                  <div className={`flip-card-back absolute inset-0 p-5 rounded-2xl border flex flex-col justify-between ${
                    isRead 
                      ? 'bg-green-500/5 border-green-500/20' 
                      : 'bg-purple-500/5 border-purple-500/20'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{t('fc.answer')}</span>
                        {isRead && <CheckCircle2 size={14} className="text-green-400" />}
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{cardText.answer}</p>
                    </div>
                    {!isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          useStore.getState().markFlashcardRead(card.id);
                        }}
                        className="self-end px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-xs text-green-400 font-medium hover:bg-green-500/30 transition-colors"
                      >
                        {t('fc.markRead')}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
