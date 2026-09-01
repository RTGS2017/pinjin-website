import {
  applicationPublicImages as generatedApplications,
  factoryPublicImages as generatedFactory,
  heroPublicImages as generatedHero,
  productPublicImagesBySlug,
} from '@/data/imageInventory.generated';

export const factoryPublicImages: readonly string[] = generatedFactory;
export const applicationPublicImages: readonly string[] = generatedApplications;
export const heroPublicImages: readonly string[] = generatedHero;

export function productDisplayImages(slug: string): string[] {
  const listed = productPublicImagesBySlug[slug];
  if (listed?.length) return [...listed];
  return [`/images/products/${slug}/main.webp`];
}

export function hasPublicImage(path: string): boolean {
  return (
    factoryPublicImages.includes(path) ||
    applicationPublicImages.includes(path) ||
    heroPublicImages.includes(path) ||
    Object.values(productPublicImagesBySlug).some((paths) => paths.includes(path))
  );
}
