import type { Lang } from './config';

/**
 * 多语文案：en 必填；其他语言缺省时回退到 en。
 * 新增语言后，逐步补全各字段即可，不必一次改完全部产品。
 */
export type LocalizedText = { en: string } & Partial<Record<Lang, string>>;

export type { Lang };

export function pick(text: LocalizedText, lang: Lang): string {
  return text[lang] || text.en;
}
