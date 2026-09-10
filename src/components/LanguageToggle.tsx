import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

export default function LanguageToggle() {
  const { lang, toggleLang, isRTL } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      title={lang === 'en' ? 'Switch to Farsi' : 'Switch to English'}
      aria-label={lang === 'en' ? 'Switch to Farsi' : 'Switch to English'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-colors text-sm font-semibold text-gray-300 hover:text-white"
      style={{ direction: 'ltr' }}
    >
      <Languages size={14} className="text-purple-400" />
      {isRTL ? (
        <span>EN</span>
      ) : (
        <span className="font-medium">فارسی</span>
      )}
    </button>
  );
}