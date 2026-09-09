import {
  applicationPublicImages as generatedApplications,
  factoryPublicImages as generatedFactory,
  heroPublicImages as generatedHero,
  productPublicImagesBySlug,
} from '@/data/imageInventory.generated';

export const factoryPublicImages: readonly string[] = generatedFactory;
export const applicationPublicImages: readonly string[] = generatedApplications;
export const heroPublicImages: readonly string[] = generatedHero;

function basename(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1);
}

export function isProductCatalogImage(path: string): boolean {
  const file = basename(path);
  return file === 'catalog.webp' || file.endsWith('-catalogue.webp');
}

export function isProductStudioImage(path: string, slug: string): boolean {
  const file = basename(path);
  if (isProductCatalogImage(path)) return false;
  if (file.startsWith('working') || file.startsWith('detail-')) return false;
  return file === 'main.webp' || file === `${slug}.webp`;
}

export function productDisplayImages(slug: string): string[] {
  const listed = productPublicImagesBySlug[slug];
  if (listed?.length) return [...listed];
  return [`/images/products/${slug}/${slug}.webp`];
}

/** Product detail gallery: studio photo first, then catalogue sheet when both exist. */
export function productDetailImages(slug: string): string[] {
  const listed = productPublicImagesBySlug[slug] ?? [];
  const studio = listed.filter((path) => isProductStudioImage(path, slug));
  const catalog = listed.filter((path) => isProductCatalogImage(path));
  const ordered = [...studio, ...catalog];
  if (ordered.length) return [...new Set(ordered)];
  return [`/images/products/${slug}/${slug}.webp`];
}

export function hasPublicImage(path: string): boolean {
  return (
    factoryPublicImages.includes(path) ||
    applicationPublicImages.includes(path) ||
    heroPublicImages.includes(path) ||
    Object.values(productPublicImagesBySlug).some((paths) => paths.includes(path))
  );
}
