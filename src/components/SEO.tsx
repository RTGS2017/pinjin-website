import { Helmet } from 'react-helmet-async';
import { absoluteUrl, seoConfig } from '@/config/seo';
import { factorySlides, getFactoryImagePaths, type FactorySlide } from '@/data/factory';
import type { GalleryItem } from '@/data/gallery';
import { useI18n } from '@/i18n/I18nContext';
import { defaultLang, getLanguage, languages } from '@/i18n/config';
import { localePath } from '@/i18n/paths';
import { pick, type Lang } from '@/i18n/types';
import { companyEntity } from '@/config/entity';

export interface SEOProps {
  title?: string;
  description?: string;
  /** 不含语言前缀的页面路径，如 `/products`；组件会自动加当前语言并输出 hreflang */
  path?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: 'website' | 'product' | 'article';
  noindex?: boolean;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function ogImageType(path: string) {
  const lower = path.split('?')[0]?.toLowerCase() ?? '';
  if (lower.endsWith('.svg')) return 'image/svg+xml';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/webp';
}

export function SEO({
  title,
  description,
  path = '/',
  image = seoConfig.defaultOgImage,
  imageAlt,
  imageWidth,
  imageHeight,
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

  const incoming = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];
  const hasOrg = incoming.some((schema) => {
    const type = schema['@type'];
    return (
      type === 'Organization' ||
      (Array.isArray(type) && type.includes('Organization'))
    );
  });
  const schemas = hasOrg ? incoming : [buildOrganizationJsonLd(), ...incoming];

  return (
    <Helmet>
      <html lang={langMeta.htmlLang} dir={langMeta.dir} />
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
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}
      {imageWidth ? (
        <meta property="og:image:width" content={String(imageWidth)} />
      ) : null}
      {imageHeight ? (
        <meta property="og:image:height" content={String(imageHeight)} />
      ) : null}
      <meta property="og:image:type" content={ogImageType(image)} />
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
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}

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
    legalName: seoConfig.organization.name,
    alternateName: seoConfig.organization.alternateName,
    url: seoConfig.siteUrl,
    logo: absoluteUrl(seoConfig.organization.logoPath),
    description: seoConfig.organization.description,
    email: import.meta.env.VITE_CONTACT_EMAIL || undefined,
    telephone: import.meta.env.VITE_CONTACT_PHONE || undefined,
    image: [
      absoluteUrl(seoConfig.defaultOgImage),
      ...getFactoryImagePaths()
        .filter((path) => path !== seoConfig.defaultOgImage)
        .map((path) => absoluteUrl(path)),
    ],
    knowsAbout: [
      'Concrete Machinery Manufacturer China',
      'Concrete Pump Manufacturer China',
      'Electric Concrete Pump Manufacturer',
      'Diesel Concrete Pump Manufacturer',
      'Concrete Mixer Pump Manufacturer',
      'Concrete Mixing Equipment',
      'Xingjiawan Concrete Machinery',
      'Xingtai Construction Machinery Factory',
      'OEM Concrete Equipment Manufacturer',
      'China concrete pump factory',
      'custom concrete equipment supplier',
    ],
    brand: seoConfig.siteName,
    industry: 'Construction Machinery Manufacturer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.organization.address.streetAddress,
      addressLocality: seoConfig.organization.address.addressLocality,
      addressRegion: seoConfig.organization.address.addressRegion,
      addressCountry: seoConfig.organization.address.addressCountry,
    },
    areaServed: 'Worldwide',
    // 三个条目是产品分类，不是单品。禁止写成 Product（会触发 GSC
    // “Either offers, review, or aggregateRating should be specified”）。
    // 也不在此虚构 price / review / aggregateRating。
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pinjin construction machinery catalogue',
      itemListElement: companyEntity.products.map((item) => ({
        '@type': 'OfferCatalog',
        name: item.en,
        url: absoluteUrl(localePath(item.path, defaultLang)),
      })),
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    inLanguage: ['en', 'zh-CN', 'pt-BR', 'ar'],
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      url: seoConfig.siteUrl,
    },
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
    keywords: slide.keywords.join(', '),
    contentLocation: {
      '@type': 'Place',
      name: 'Xingtai, Hebei, China',
      address: {
        '@type': 'PostalAddress',
        addressLocality: seoConfig.organization.address.addressLocality,
        addressRegion: seoConfig.organization.address.addressRegion,
        addressCountry: seoConfig.organization.address.addressCountry,
      },
    },
  };
}

export function buildFactoryImageJsonLdList(lang: Lang) {
  return factorySlides.map((slide) => buildImageObjectJsonLd(slide, lang));
}

export function buildHeroGalleryJsonLdList(items: GalleryItem[], lang: Lang) {
  return items.map((item) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: pick(item.title, lang),
    description: pick(item.alt, lang),
    contentUrl: absoluteUrl(item.image),
    url: absoluteUrl(item.image),
    caption: pick(item.alt, lang),
    keywords: item.seoKeywords.join(', '),
    encodingFormat: 'image/webp',
    width: item.width,
    height: item.height,
    representativeOfPage: true,
    creator: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
    },
    contentLocation: {
      '@type': 'Place',
      name: 'Xingtai, Hebei, China',
      address: {
        '@type': 'PostalAddress',
        addressLocality: seoConfig.organization.address.addressLocality,
        addressRegion: seoConfig.organization.address.addressRegion,
        addressCountry: seoConfig.organization.address.addressCountry,
      },
    },
    about: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      industry: 'Concrete Machinery Manufacturer',
    },
  }));
}

export function buildMediaImageJsonLd(input: {
  name: string;
  description: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: input.name,
    description: input.description,
    contentUrl: absoluteUrl(input.image),
    caption: input.description,
  };
}

/** 仅用于真正的单个产品详情页。不要给分类/集合使用。
 *  无公开价格、用户评价时不要添加 offers / review / aggregateRating。 */
export function buildProductJsonLd(input: {
  name: string;
  description: string;
  image: string;
  images?: Array<{
    url: string;
    name: string;
    caption: string;
    description: string;
    keywords?: string;
  }>;
  /** 建议传入已带语言前缀的 path，如 `/en/products/slug` */
  path: string;
  category?: string;
  model?: string;
  brand?: string;
  specifications?: Array<{ name: string; value: string }>;
}) {
  const imageObjects = (input.images?.length
    ? input.images
    : [
        {
          url: input.image,
          name: input.name,
          caption: `${input.name} manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China`,
          description: input.description,
        },
      ]
  ).map((img) => ({
    '@type': 'ImageObject',
    url: absoluteUrl(img.url),
    contentUrl: absoluteUrl(img.url),
    name: img.name,
    caption: img.caption,
    description: img.description,
    keywords: img.keywords,
    encodingFormat: 'image/webp',
    contentLocation: {
      '@type': 'Place',
      name: 'Xingtai, Hebei, China',
      address: {
        '@type': 'PostalAddress',
        addressLocality: seoConfig.organization.address.addressLocality,
        addressRegion: seoConfig.organization.address.addressRegion,
        addressCountry: seoConfig.organization.address.addressCountry,
      },
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    model: input.model ?? input.name,
    image: imageObjects,
    url: absoluteUrl(input.path),
    category: input.category,
    brand: {
      '@type': 'Brand',
      name: input.brand ?? seoConfig.siteName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      url: seoConfig.siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: seoConfig.organization.address.streetAddress,
        addressLocality: seoConfig.organization.address.addressLocality,
        addressRegion: seoConfig.organization.address.addressRegion,
        addressCountry: seoConfig.organization.address.addressCountry,
      },
    },
    additionalProperty: input.specifications?.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.name,
      value: spec.value,
    })),
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
  dateModified?: string;
  keywords?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: absoluteUrl(input.path),
    keywords: input.keywords,
    image: input.image
      ? {
          '@type': 'ImageObject',
          url: absoluteUrl(input.image),
          name: input.headline,
          contentLocation: {
            '@type': 'Place',
            name: 'Xingtai, Hebei, China',
          },
        }
      : undefined,
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

export function buildCollectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}
