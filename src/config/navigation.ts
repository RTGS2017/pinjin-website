/** 顶栏 Mega Menu 结构配置（文案见 src/i18n/messages.ts） */

import { contactInquiryPath, featuredProductSlugs, productCategoryIds } from '@/config/site';
import { categoryMeta } from '@/data/products';

export type NavLabelKey =
  | 'products'
  | 'allProducts'
  | 'selectionGuide'
  | 'solutions'
  | 'applications'
  | 'customization'
  | 'resources'
  | 'blog'
  | 'faq'
  | 'company'
  | 'about'
  | 'factory'
  | 'contact';

export type MegaKind = 'products' | 'columns';

export interface NavItem {
  key: NavLabelKey;
  href: string;
  mega?: MegaKind;
}

export const navItems: readonly NavItem[] = [
  { key: 'products', href: '/products', mega: 'products' },
  { key: 'solutions', href: '/solutions', mega: 'columns' },
  { key: 'resources', href: '/resources', mega: 'columns' },
  { key: 'company', href: '/about', mega: 'columns' },
  { key: 'contact', href: '/contact' },
];

export const productCategoryLinks = productCategoryIds.map((id) => ({
  categoryId: id,
  href: `/products/${categoryMeta[id].routeSlug}`,
}));

export const megaFeaturedSlugs = featuredProductSlugs.slice(0, 4);

export const solutionsIndustryLinks = [
  { href: '/solutions/construction', appId: 'building' },
  { href: '/solutions/infrastructure', appId: 'infrastructure' },
  { href: '/solutions/spraying', appId: 'spraying' },
  { href: '/solutions/industrial-projects', appId: 'handling' },
] as const;

export const solutionsOemLinks = [
  { href: '/contact', megaKey: 'customDesign' as const },
  { href: '/factory#process', megaKey: 'process' as const },
  { href: '/#why-pinjin', megaKey: 'quality' as const },
] as const;

export const resourcesTechnicalLinks = [
  { href: '/blog', megaKey: 'blog' as const },
  { href: '/product-selection-guide', megaKey: 'guides' as const },
  { href: '/faq', megaKey: 'faq' as const },
] as const;

export const resourcesDownloadLinks = [
  { href: contactInquiryPath, megaKey: 'catalog' as const },
  { href: '/products', megaKey: 'datasheets' as const },
] as const;

export const companyLinks = [
  { href: '/about', megaKey: 'factoryOverview' as const },
  { href: '/factory', megaKey: 'capability' as const },
  { href: '/#why-pinjin', megaKey: 'quality' as const },
  { href: '/contact', megaKey: 'contact' as const },
] as const;
