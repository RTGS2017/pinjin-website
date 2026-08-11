export type Lang = 'en' | 'zh';

export type LocalizedText = {
  en: string;
  zh: string;
};

export function pick(text: LocalizedText, lang: Lang): string {
  return text[lang];
}
