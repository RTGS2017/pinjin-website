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

function withoutCatalog(paths: readonly string[] | undefined): string[] {
  return (paths ?? []).filter((path) => !isProductCatalogImage(path));
}

export function productDisplayImages(slug: string): string[] {
  const listed = withoutCatalog(productPublicImagesBySlug[slug]);
  if (listed.length) return listed;
  return [`/images/products/${slug}/${slug}.webp`];
}

/** Product detail: one machine photo only. No catalogue sheets, no thumbnail strip. */
export function productDetailImages(slug: string): string[] {
  const listed = withoutCatalog(productPublicImagesBySlug[slug]);
  const studio = listed.filter((path) => isProductStudioImage(path, slug));
  if (studio.length) return [studio[0]];
  if (listed.length) return [listed[0]];
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
