/**
 * 全站语言注册表（唯一配置源）。
 * 新增语言：在此追加一项，并补充 messages / 产品文案，无需改路由骨架。
 */
export const languages = [
  {
    code: 'en',
    htmlLang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    dir: 'ltr',
    label: 'EN',
    labelNative: 'English',
  },
  {
    code: 'zh',
    htmlLang: 'zh-CN',
    hreflang: 'zh-CN',
    ogLocale: 'zh_CN',
    dir: 'ltr',
    label: '中文',
    labelNative: '中文',
  },
  {
    code: 'pt',
    htmlLang: 'pt-BR',
    hreflang: 'pt',
    ogLocale: 'pt_BR',
    dir: 'ltr',
    label: 'PT',
    labelNative: 'Português',
  },
  {
    code: 'ar',
    htmlLang: 'ar',
    hreflang: 'ar',
    ogLocale: 'ar_SA',
    dir: 'rtl',
    label: 'AR',
    labelNative: 'العربية',
  },
  {
    code: 'ru',
    htmlLang: 'ru',
    hreflang: 'ru',
    ogLocale: 'ru_RU',
    dir: 'ltr',
    label: 'RU',
    labelNative: 'Русский',
  },
] as const;

export type Lang = (typeof languages)[number]['code'];

/** 海外站默认英文；根路径 / 会跳到 /{defaultLang} */
export const defaultLang: Lang = 'en';

export const langCodes: readonly Lang[] = languages.map((l) => l.code);

/**
 * 进入 sitemap / hreflang 的语言。
 * pt/ar/ru 仍提供界面，但产品正文大量回退英文，暂不作为独立索引语言。
 */
export const indexedLangs = ['en', 'zh'] as const;
export type IndexedLang = (typeof indexedLangs)[number];

export function isIndexedLang(value: string | undefined | null): value is IndexedLang {
  return !!value && (indexedLangs as readonly string[]).includes(value);
}

const langSet = new Set<string>(langCodes);

export function isLang(value: string | undefined | null): value is Lang {
  return !!value && langSet.has(value);
}

export function getLanguage(code: Lang) {
  return languages.find((l) => l.code === code)!;
}
