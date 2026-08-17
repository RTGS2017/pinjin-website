/**
 * 语义信息架构：规范 URL 与采购侧别名。
 * 别名只做客户端 replace，不进入 sitemap，避免重复收录。
 *
 * 目录未发布混凝土搅拌站产品，故 /products/concrete-mixing-plant
 * 指向搅拌与泵送关系说明文，而不是虚构分类页。
 */

export const canonicalHubPaths = {
  products: '/products',
  concretePumps: '/products/concrete-pumps',
  sprayingMachines: '/products/spraying-machines',
  mixingPlant: '/products/material-handling',
  customMachinery: '/products/custom-machinery',
  factory: '/factory',
  cases: '/solutions',
  blog: '/blog',
  contact: '/contact',
} as const;

export const solutionSlugs = [
  'construction',
  'infrastructure',
  'spraying',
  'industrial-projects',
] as const;

export type SolutionSlug = (typeof solutionSlugs)[number];

export function isSolutionSlug(slug: string): slug is SolutionSlug {
  return (solutionSlugs as readonly string[]).includes(slug);
}
