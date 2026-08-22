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
    hreflang: 'pt-BR',
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
] as const;

export type Lang = (typeof languages)[number]['code'];

/** 海外站默认英文；根路径 / 会跳到 /{defaultLang} */
export const defaultLang: Lang = 'en';

export const langCodes: readonly Lang[] = languages.map((l) => l.code);

const langSet = new Set<string>(langCodes);

export function isLang(value: string | undefined | null): value is Lang {
  return !!value && langSet.has(value);
}

export function getLanguage(code: Lang) {
  return languages.find((l) => l.code === code)!;
}
