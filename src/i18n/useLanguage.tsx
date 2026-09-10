import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Lang } from './translations';

export type { Lang };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  isRTL: boolean;
  t: (key: string) => string;
  num: (value: number) => string;
}

const STORAGE_KEY = 'juniorpath_lang';

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fa') return saved;
  } catch {
    /* ignore */
  }
  try {
    const browserLang = navigator.language?.toLowerCase() ?? '';
    if (browserLang.startsWith('fa')) return 'fa';
  } catch {
    /* ignore */
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);
  const isRTL = lang === 'fa';

  // Persist + update document direction & lang attribute
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-fa', isRTL);
    document.body.classList.toggle('lang-en', !isRTL);
  }, [lang, isRTL]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === 'en' ? 'fa' : 'en'));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang],
  );

  const num = useCallback(
    (value: number): string => {
      if (lang === 'fa') {
        return value.toLocaleString('fa-IR');
      }
      return String(value);
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, isRTL, t, num }),
    [lang, setLang, toggleLang, isRTL, t, num],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}