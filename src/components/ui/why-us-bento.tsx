import { motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Code2,
  Layers,
  Monitor,
  Rocket,
  Server,
  Trophy,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../i18n/useLanguage';

export interface WhyUsBentoProps {
  className?: string;
}

function LetterLiftTitle({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const { isRTL } = useLanguage();

  // Persian/Arabic is a cursive script: splitting it into per-character
  // inline-block spans disconnects letter-joining and can mirror glyph order.
  // Keep it as one plain string in RTL mode.
  if (isRTL) {
    return <span>{text}</span>;
  }

  if (reduced) {
    return <span>{text}</span>;
  }

  return (
    <span className="inline-flex flex-wrap" aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function StackCluster() {
  const { t } = useLanguage();
  const items = [
    { Icon: Monitor, label: 'FE', tip: t('landing.frontend') },
    { Icon: Server, label: 'BE', tip: t('landing.backend') },
    { Icon: Code2, label: 'FS', tip: t('landing.fullstack') },
  ];

  return (
    <div className="mt-4 flex items-center gap-2">
      {items.map(({ Icon, label, tip }) => (
        <div
          key={label}
          title={tip}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-teal-300"
        >
          <Icon size={18} aria-hidden />
          <span className="sr-only">{tip}</span>
        </div>
      ))}
    </div>
  );
}

export function WhyUsBento({ className }: WhyUsBentoProps) {
  const reduced = useReducedMotion();
  const { t, isRTL } = useLanguage();

  const panels: Array<{
    id: string;
    title: string;
    description: string;
    icon: typeof Rocket;
    span: string;
    accent: string;
    cluster?: boolean;
    showXp?: boolean;
    showAvatars?: boolean;
  }> = [
    {
      id: 'projects',
      title: t('why.projects.title'),
      description: t('why.projects.desc'),
      icon: Rocket,
      span: 'md:col-span-2',
      accent: 'from-teal-500/20 to-transparent',
    },
    {
      id: 'stacks',
      title: t('why.stacks.title'),
      description: t('why.stacks.desc'),
      icon: Layers,
      span: 'md:col-span-1',
      accent: 'from-lime-500/20 to-transparent',
      cluster: true,
    },
    {
      id: 'points',
      title: t('why.points.title'),
      description: t('why.points.desc'),
      icon: Trophy,
      span: 'md:col-span-1',
      accent: 'from-amber-500/20 to-transparent',
      showXp: true,
    },
    {
      id: 'flashcards',
      title: t('why.flashcards.title'),
      description: t('why.flashcards.desc'),
      icon: BookOpen,
      span: 'md:col-span-1',
      accent: 'from-cyan-500/20 to-transparent',
    },
    {
      id: 'portfolio',
      title: t('why.portfolio.title'),
      description: t('why.portfolio.desc'),
      icon: Briefcase,
      span: 'md:col-span-1',
      accent: 'from-emerald-500/20 to-transparent',
      showAvatars: true,
    },
  ];

  return (
    <section className={cn('w-full', className)} aria-labelledby="why-us-heading">
      <div className="mb-8 max-w-2xl">
        <p
          className={cn(
            'mb-2 text-sm font-medium text-teal-400/90',
            isRTL ? '' : 'uppercase tracking-wider',
          )}
        >
          {t('why.title')}
        </p>
        <h2
          id="why-us-heading"
          className="text-3xl font-bold text-white sm:text-4xl"
        >
          {t('why.heading')}
        </h2>
        <p className="mt-3 text-gray-400">
          {t('why.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {panels.map((panel, index) => {
          const Icon = panel.icon;
          return (
            <motion.article
              key={panel.id}
              className={cn(
                'group relative overflow-hidden rounded-xl border border-white/10 bg-[#161616] p-6',
                panel.span,
              )}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={
                reduced
                  ? undefined
                  : { scale: 1.02, transition: { duration: 0.2 } }
              }
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-100',
                  panel.accent,
                )}
              />

              <div className="relative z-10">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lime-300">
                  <Icon size={22} aria-hidden />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-white">
                  <LetterLiftTitle text={panel.title} />
                </h3>

                <p className="text-sm leading-relaxed text-gray-400">
                  {panel.description}
                </p>

                {panel.cluster ? <StackCluster /> : null}

                {panel.showXp && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-lime-300">
                    <Zap size={14} aria-hidden />
                    {t('why.xp')}
                  </div>
                )}

                {panel.showAvatars && (
                  <div className="mt-4 flex -space-x-2" aria-hidden>
                    {['JP', 'FE', 'BE'].map((initials) => (
                      <div
                        key={initials}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#161616] bg-teal-500/30 text-[10px] font-bold text-teal-100"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default WhyUsBento;
