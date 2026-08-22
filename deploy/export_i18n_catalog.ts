/**
 * 从现有内容源导出一份给翻译用的总表。
 * 运行：npx vite-node deploy/export_i18n_catalog.ts
 * 输出：src/i18n/locales/catalog.json
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { companyEntity, seoKeywords } from '@/config/entity';
import { seoConfig, seoTemplates } from '@/config/seo';
import {
  categoryMeta,
  products,
  type Product,
} from '@/data/products';
import { categoryHubs } from '@/data/categoryHubs';
import { blogCategoryMeta, getBlogPosts } from '@/data/blog';
import {
  factoryGeoBlocks,
  factoryGeoFaqs,
  factorySlides,
} from '@/data/factory';
import { customMachineryContent } from '@/data/customMachinery';
import { applicationPages } from '@/data/applicationsContent';
import { heroGallery } from '@/data/gallery';
import { siteFaqs } from '@/data/faq';
import { manufacturingSteps, whyFactoryPoints } from '@/data/manufacturingProcess';
import { selectionGuideItems } from '@/data/selectionGuide';
import {
  categoryClusters,
  trustClusterArticles,
} from '@/data/topicClusters';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src', 'i18n', 'locales');
const outFile = join(outDir, 'catalog.json');

function productPack(product: Product) {
  return {
    slug: product.slug,
    category: product.category,
    name: product.name,
    shortDescription: product.shortDescription,
    productIntroduction: product.productIntroduction,
    applicationScenarios: product.applicationScenarios,
    keyFeatures: product.keyFeatures,
    specifications: product.specifications,
    seo: product.seo,
    geo: product.geo,
  };
}

function linkPack(link: { href: string; en: string; zh: string }) {
  return {
    href: link.href,
    label: { en: link.en, zh: link.zh },
  };
}

const catalog = {
  meta: {
    generatedAt: new Date().toISOString().slice(0, 10),
    site: 'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
    defaultLang: 'en',
    languages: languages.map((item) => ({
      code: item.code,
      htmlLang: item.htmlLang,
      hreflang: item.hreflang,
      ogLocale: item.ogLocale,
      label: item.label,
      labelNative: item.labelNative,
    })),
    sourceFiles: {
      ui: 'src/i18n/messages.ts',
      languageRegistry: 'src/i18n/config.ts',
      entity: 'src/config/entity.ts',
      seo: 'src/config/seo.ts',
      products: 'src/data/products.ts',
      categoryHubs: 'src/data/categoryHubs.ts',
      blog: 'src/data/blog.ts',
      knowledgeArticles: 'src/data/knowledgeArticles.ts',
      factory: 'src/data/factory.ts',
      customMachinery: 'src/data/customMachinery.ts',
      applications: 'src/data/applicationsContent.ts',
      gallery: 'src/data/gallery.ts',
      faq: 'src/data/faq.ts',
      manufacturing: 'src/data/manufacturingProcess.ts',
      selectionGuide: 'src/data/selectionGuide.ts',
      topicClusters: 'src/data/topicClusters.ts',
    },
    howToUse:
      'Give catalog.json + GEMINI-PROMPT.md to Gemini. Add a new language code as a sibling of en/zh on every translatable object. Keep slugs, href, model codes and legal names unchanged.',
  },
  ui: messages,
  seoGeo: {
    seoConfig: {
      siteName: seoConfig.siteName,
      companyLegalName: seoConfig.companyLegalName,
      defaultTitle: seoConfig.defaultTitle,
      defaultDescription: seoConfig.defaultDescription,
      organization: seoConfig.organization,
    },
    seoTemplates: {
      productTitle: '{Name} Manufacturer China | Pinjin Machinery',
      productDescription:
        'Professional {product} manufacturer in China. Factory direct supply with customization capability from Hebei Pinjin Machinery in Xingtai.',
      categoryTitle: '{Label} Manufacturer China | Pinjin Machinery',
      blogTitle: '{Topic} | Construction Machinery Knowledge | Pinjin',
      factoryTitle: seoTemplates.factoryTitle,
      factoryDescription: seoTemplates.factoryDescription,
    },
    seoKeywords,
    companyEntity,
    topicClusters: {
      categoryClusters: Object.fromEntries(
        Object.entries(categoryClusters).map(([key, cluster]) => [
          key,
          {
            relatedCategories: cluster.relatedCategories.map(linkPack),
            relatedArticles: cluster.relatedArticles.map(linkPack),
            relatedSolutions: cluster.relatedSolutions.map(linkPack),
          },
        ]),
      ),
      trustClusterArticles: trustClusterArticles.map(linkPack),
    },
  },
  content: {
    categoryMeta,
    categoryHubs,
    products: products.map(productPack),
    blogCategories: blogCategoryMeta,
    blogPosts: getBlogPosts().map((post) => ({
      slug: post.slug,
      category: post.category,
      date: post.date,
      dateModified: post.dateModified ?? post.date,
      keywords: post.keywords,
      relatedProductSlugs: post.relatedProductSlugs,
      relatedPaths: post.relatedPaths,
      title: post.title,
      seoTitle: post.seoTitle ?? null,
      description: post.description,
      content: post.content.map((section) => ({
        heading: section.heading,
        paragraphs: section.paragraphs,
        bullets: section.bullets ?? [],
        imageAlt: section.image?.alt ?? null,
        imageCaption: section.image?.caption ?? null,
      })),
    })),
    factorySlides: factorySlides.map((slide) => ({
      id: slide.id,
      image: slide.image,
      title: slide.title,
      description: slide.description,
      alt: slide.alt,
      schemaName: slide.schemaName,
      schemaDescription: slide.schemaDescription,
      keywords: slide.keywords,
      locationContext: slide.locationContext,
    })),
    factoryGeoBlocks,
    factoryGeoFaqs,
    customMachinery: customMachineryContent,
    applications: applicationPages.map((page) => ({
      id: page.id,
      slug: page.slug,
      solutionSlug: page.solutionSlug,
      title: page.title,
      summary: page.summary,
      points: page.points,
      images: page.images.map((image) => ({
        src: image.src,
        alt: image.alt,
        keywords: image.keywords,
      })),
    })),
    heroGallery: heroGallery.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      alt: item.alt,
      thumbLabel: item.thumbLabel,
      seoKeywords: item.seoKeywords,
    })),
    siteFaqs,
    manufacturingSteps,
    whyFactoryPoints,
    selectionGuide: selectionGuideItems.map((item) => ({
      id: item.id,
      question: item.question,
      recommendation: item.recommendation,
      rationale: item.rationale,
      productSlugs: item.productSlugs,
    })),
  },
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
console.log(`wrote ${outFile}`);
