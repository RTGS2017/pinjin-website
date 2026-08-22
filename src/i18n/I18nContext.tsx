import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { getMessages, type Messages } from './messages';
import type { LocalizedText } from './types';
import { pick } from './types';
import {
  defaultLang,
  getLanguage,
  isLang,
  type Lang,
} from './config';

const STORAGE_KEY = 'pinjin_lang';

interface I18nContextValue {
  lang: Lang;
  /** 切换语言（会改 URL）；具体导航由 useSwitchLang / 调用方处理 */
  setLang: (lang: Lang) => void;
  t: Messages;
  tx: (text: LocalizedText) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/** 从浏览器偏好推断语言（站点入口已固定 /en，此函数留给需要时使用） */
export function detectPreferredLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* ignore */
  }
  const nav = navigator.language?.toLowerCase() ?? 'en';
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('pt')) return 'pt';
  if (nav.startsWith('ar')) return 'ar';
  return defaultLang;
}

export function persistLangPreference(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

/**
 * 语言由 URL `/:lang` 驱动；setLang 仅更新偏好，真正跳转请用 useSwitchLang。
 */
export function I18nProvider({
  lang,
  onLangChange,
  children,
}: {
  lang: Lang;
  onLangChange?: (lang: Lang) => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const meta = getLanguage(lang);
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
    persistLangPreference(lang);
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    const t = getMessages(lang);
    return {
      lang,
      setLang: (next) => {
        persistLangPreference(next);
        onLangChange?.(next);
      },
      t,
      tx: (text: LocalizedText) => pick(text, lang),
    };
  }, [lang, onLangChange]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}
