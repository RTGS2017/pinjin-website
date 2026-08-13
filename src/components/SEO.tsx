import { Helmet } from 'react-helmet-async';
import { absoluteUrl, seoConfig } from '@/config/seo';
import { factorySlides, getFactoryImagePaths, type FactorySlide } from '@/data/factory';
import { useI18n } from '@/i18n/I18nContext';
import { defaultLang, getLanguage, languages } from '@/i18n/config';
import { localePath } from '@/i18n/paths';
import { pick, type Lang } from '@/i18n/types';

export interface SEOProps {
  title?: string;
  description?: string;
  /** 不含语言前缀的页面路径，如 `/products`；组件会自动加当前语言并输出 hreflang */
  path?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  noindex?: boolean;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO({
  title,
  description,
  path = '/',
  image = seoConfig.defaultOgImage,
  type = 'website',
  noindex = false,
  keywords,
  jsonLd,
}: SEOProps) {
  const { lang } = useI18n();
  const pageTitle = title?.trim() || seoConfig.defaultTitle;
  const pageDescription = description?.trim() || seoConfig.defaultDescription;
  const localizedPath = localePath(path, lang);
  const canonical = absoluteUrl(localizedPath);
  const ogImage = absoluteUrl(image);
  const langMeta = getLanguage(lang);

  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <html lang={langMeta.htmlLang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />
      {languages.map((l) => (
        <link
          key={l.code}
          rel="alternate"
          hrefLang={l.hreflang}
          href={absoluteUrl(localePath(path, l.code))}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={absoluteUrl(localePath(path, defaultLang))}
      />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content={type === 'product' ? 'product' : type === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={langMeta.ogLocale} />
      {languages
        .filter((l) => l.code !== lang)
        .map((l) => (
          <meta
            key={`og-${l.code}`}
            property="og:locale:alternate"
            content={l.ogLocale}
          />
        ))}

      <meta name="twitter:card" content={seoConfig.twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: seoConfig.organization.name,
    alternateName: seoConfig.organization.alternateName,
    url: seoConfig.siteUrl,
    logo: absoluteUrl(seoConfig.organization.logoPath),
    description: seoConfig.organization.description,
    email: import.meta.env.VITE_CONTACT_EMAIL || undefined,
    telephone: import.meta.env.VITE_CONTACT_PHONE || undefined,
    image: getFactoryImagePaths().map((path) => absoluteUrl(path)),
    knowsAbout: [
      'Concrete pump',
      'Concrete pump manufacturer',
      'Concrete pump supplier China',
      'Mortar spraying machine',
      'Plaster spraying machine',
      'Construction equipment manufacturer China',
    ],
    brand: seoConfig.siteName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.organization.address.streetAddress,
      addressLocality: seoConfig.organization.address.addressLocality,
      addressRegion: seoConfig.organization.address.addressRegion,
      addressCountry: seoConfig.organization.address.addressCountry,
    },
    areaServed: 'Worldwide',
  };
}

export function buildImageObjectJsonLd(slide: FactorySlide, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: pick(slide.schemaName, lang),
    description: pick(slide.schemaDescription, lang),
    contentUrl: absoluteUrl(slide.image),
    caption: pick(slide.alt, lang),
  };
}

export function buildFactoryImageJsonLdList(lang: Lang) {
  return factorySlides.map((slide) => buildImageObjectJsonLd(slide, lang));
}

export function buildProductJsonLd(input: {
  name: string;
  description: string;
  image: string;
  /** 建议传入已带语言前缀的 path，如 `/en/products/slug` */
  path: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    url: absoluteUrl(input.path),
    category: input.category,
    brand: {
      '@type': 'Brand',
      name: seoConfig.siteName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      url: seoConfig.siteUrl,
    },
  };
}

export function buildFaqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  keywords?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    mainEntityOfPage: absoluteUrl(input.path),
    keywords: input.keywords,
    author: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      url: seoConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      url: seoConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(seoConfig.organization.logoPath),
      },
    },
  };
}
