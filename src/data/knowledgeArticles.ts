import type { BlogPost } from '@/data/blog';
import { article as electric15 } from '@/data/articles/electric-15-concrete-pump-applications';
import { article as dieselNoPower } from '@/data/articles/diesel-concrete-pump-no-electricity';
import { article as highRise } from '@/data/articles/high-rise-building-concrete-pump-selection';
import { article as electric20v30 } from '@/data/articles/electric-20-vs-30-concrete-pump';
import { article as pipeDn } from '@/data/articles/concrete-pump-pipe-dn-selection';
import { article as mixerVsPlant } from '@/data/articles/mixer-pump-vs-concrete-mixing-plant';
import { article as tractor4100 } from '@/data/articles/tractor-4100-concrete-pump-rural';
import { article as bridgePump } from '@/data/articles/bridge-construction-concrete-pump-requirements';
import { article as lowPressure40 } from '@/data/articles/low-pressure-40-concrete-pump-guide';
import { article as dailyMaintenance } from '@/data/articles/concrete-pump-daily-maintenance-checklist';

/**
 * 知识中心文章（并入 getBlogPosts）。
 * 正文按目录与工厂事实写；不虚构搅拌站、车载臂架泵、认证或客户业绩。
 */
export const knowledgeArticles: BlogPost[] = [
  electric15,
  dieselNoPower,
  highRise,
  electric20v30,
  pipeDn,
  mixerVsPlant,
  tractor4100,
  bridgePump,
  lowPressure40,
  dailyMaintenance,
];
