import type { BlogPost } from '@/data/blog';
import type { LocalizedText } from '@/i18n/types';
import { pick } from '@/i18n/types';
import type { Lang } from '@/i18n/config';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

const sharedFaqs = [
  {
    question: L(
      'What should I send with an inquiry?',
      '询盘要带什么？',
    ),
    answer: L(
      'Send mix or material, maximum aggregate, required output, horizontal and vertical distance, diesel or site voltage/frequency, country and purchase timing. Parts need name, size and quantity. WhatsApp or email to the Xingtai factory.',
      '请发送材料/配合比、最大骨料、目标产量、水平与垂直距离、柴油或现场电压频率、国家与采购时间。配件请带名称、尺寸与数量。通过 WhatsApp 或邮件联系邢台工厂。',
    ),
  },
  {
    question: L(
      'Does Pinjin sell boom pumps, spraying machines or mixing plants?',
      '品锦是否销售臂架泵、喷涂机或搅拌站？',
    ),
    answer: L(
      'Spraying machines are listed on /products/spraying-machines (hydraulic/diesel concrete sprayers and M9 plaster). Mixing plants and truck-mounted placing booms are not listed. Trailer pumps remain on the pump hubs.',
      '喷涂机列在 /products/spraying-machines（液压/柴油混凝土喷涂机与 M9 石膏机）。搅拌站与车载布料杆未列入。拖式泵仍在泵分类页。',
    ),
  },
  {
    question: L(
      'Do you have an overseas warehouse or a published dealer list?',
      '是否有海外仓或公开经销商名单？',
    ),
    answer: L(
      'No. Equipment ships from Xingtai. This site does not claim an overseas warehouse, exclusive distributors or a global after-sales network.',
      '没有。设备从邢台发货。本站不声称拥有海外仓、独家经销网或全球售后网络。',
    ),
  },
  {
    question: L(
      'Are the numbers on this page catalogue figures?',
      '本页数字是目录值吗？',
    ),
    answer: L(
      'Yes. Only figures already printed on product pages are used. Missing cells stay blank. We do not invent certifications, stock, lead times or on-site guaranteed output.',
      '是。只用产品页已印数字。空格保持空白。不编造认证、库存、交期或工地保证产量。',
    ),
  },
];

const directAnswers: Record<string, LocalizedText> = {
  'electric-15-concrete-pump-applications': L(
    'The Electric 15 is a compact Xingtai trailer pump for 2–3 floor houses and secondary structure. Catalogue lines include 15 kW, 8–10 m³/h, 15–20 m vertical and 60–80 m horizontal. It is not Electric 60 / 80, not a boom pump and not a mixing plant. Match aggregate and pipe to the printed table, then inquire.',
    '电动15是邢台紧凑拖泵，对照2–3层自建房与二次结构。目录含 15 kW、8–10 m³/h、垂直 15–20 m、水平 60–80 m。它不是电动60/80，也不是臂架泵或搅拌站。请按已印表格对照骨料与管路后再询盘。',
  ),
  'diesel-concrete-pump-no-electricity': L(
    'Without three-phase power, start from the Xingtai diesel ladder: rural 17 kW compact, tractor-driven 4100, then Diesel 30. Match engine power, output and listed distance. Diesel is not an electric-catalogue substitute when grid power exists. These are trailer pumps, not boom pumps or mixing plants.',
    '无三相电时，从邢台柴油阶梯开始：农村 17 kW 紧凑机、拖拉机带动4100，再到柴油30。对照发动机功率、产量与已列距离。现场已有电网时不要把柴油行当成电机目录机。这些是拖泵，不是臂架泵或搅拌站。',
  ),
  'high-rise-building-concrete-pump-selection': L(
    'Convert floors to vertical metres, then add horizontal pipe before matching Electric 40, 60 and 80 catalogue heights. Electric 80 lists 900 m horizontal / 300 m vertical. Compact frames do not replace those rows. Pinjin does not sell truck-mounted placing booms.',
    '先把楼层换成垂直米数，再计入水平管路，对照电动40、60、80目录高度。电动80列出水平 900 m / 垂直 300 m。紧凑机不能替代这些行。品锦不销售车载布料杆。',
  ),
  'electric-20-vs-30-concrete-pump': L(
    'Electric 20 lists 22 kW, 8–10 m³/h, 10 MPa, 0.25 m³ hopper, 120 m / 40 m and 900 kg. Electric 30 lists 30 kW, 12–15 m³/h, 20 MPa, 0.3 m³ hopper, fine-stone 60 m / 180 m and 1200 kg. Compare the printed table, not the number in the model name. Neither is a boom pump or mixing plant.',
    '电动20：22 kW、8–10 m³/h、10 MPa、料斗 0.25 m³、120 m / 40 m、900 kg。电动30：30 kW、12–15 m³/h、20 MPa、料斗 0.3 m³、细石 60 m / 180 m、1200 kg。对照已印表格，不要只看型号数字。两台都不是臂架泵或搅拌站。',
  ),
  'concrete-pump-pipe-dn-selection': L(
    'Start pipe selection from the published DN on the pump page. Electric 20 lists 80 mm. Electric 15 lists 100–125 mm. Mixer pumps and HBT8018 list 100 / 125 mm. DN200 is not a pump line for these trailers. Spare pipes are quoted after size and quantity; no list price and no small-batch parcels.',
    '选管从泵页已公布的 DN 开始。电动20为 80 mm，电动15为 100–125 mm，搅拌泵与 HBT8018 为 100 / 125 mm。DN200 不是这些拖泵的泵送主管。管路替换件确认尺寸与数量后报价，无公开标价，不支持小批量。',
  ),
  'mixer-pump-vs-concrete-mixing-plant': L(
    'A mixer pump mixes and pumps on one Xingtai trailer. Electric: 45 kW plus 14 kW at 21 m³/h. Diesel 4108: 66–75 kW at 25 m³/h. A mixing plant batches on a yard and loads trucks; Pinjin does not manufacture plants, boom pumps or sprayers.',
    '搅拌泵在邢台同一拖车上搅拌并泵送。电动：主电机 45 kW 加搅拌 14 kW、21 m³/h。柴油 4108：66–75 kW、25 m³/h。搅拌站在场地计量并装车；品锦不生产搅拌站、臂架泵或喷涂机。',
  ),
  'tractor-4100-concrete-pump-rural': L(
    'The tractor-driven 4100 is a rural Xingtai pump for village roads and self-built houses. Compare it with the 17 kW rural diesel compact and Diesel 30 using only printed output, power and distance. It is not Diesel 120 and not a boom pump.',
    '拖拉机带动4100是邢台农村泵，对照村路与自建房。请用已印产量、动力与距离对照 17 kW 农村柴油紧凑机和柴油30。它不是柴油120，也不是臂架泵。',
  ),
  'bridge-construction-concrete-pump-requirements': L(
    'Pier and deck pours need a continuous pipeline. Xingtai engineers match Diesel 50, Diesel 60 and LZ-80 catalogue output and pressure. These are trailer pumps. Pinjin does not sell boom pumps. Send mix, aggregate, distance and power with the inquiry.',
    '墩柱与桥面浇筑需要连续管道供料。邢台工程师按目录对照柴油50、柴油60与 LZ-80 的输送量与压力。这些是拖泵。品锦不销售臂架泵。询盘请带配合比、骨料、距离与动力。',
  ),
  'low-pressure-40-concrete-pump-guide': L(
    'Electric Low Pressure 40 is a fine-stone tune, not a “weak 40”. Catalogue lines include 37 kW, 12–15 m³/h, 20 MPa and fine-stone 80 m / 240 m. Compare Electric 30 and Electric 40 on their own pages. Not a boom pump or mixing plant.',
    '电动低压40是细石调校，不是“弱40”。目录含 37 kW、12–15 m³/h、20 MPa、细石 80 m / 240 m。请对照电动30与电动40各自页面。不是臂架泵或搅拌站。',
  ),
  'concrete-pump-daily-maintenance-checklist': L(
    'Xingtai issues a daily trailer-pump checklist: hopper, pipeline clamps, hydraulic leaks, S-valve observation, then after-pour wash. No invented oil brands or replacement-hour tables. Walk this sequence every morning. It is not a mixing-plant or boom-pump manual.',
    '邢台发出拖泵每日点检：料斗、管路卡箍、液压渗漏、S阀观察，再做浇筑后冲洗。不编造油品品牌或更换小时表。请每天早上走一遍。这不是搅拌站或臂架泵手册。',
  ),
};

const extraFaqs: Record<string, Array<{ question: LocalizedText; answer: LocalizedText }>> = {
  'concrete-pump-daily-maintenance-checklist': [
    {
      question: L(
        'What is the daily sequence on this checklist?',
        '这份点检每天按什么顺序？',
      ),
      answer: L(
        'Hopper, pipeline clamps and gaskets, hydraulic leak walk-around, S-valve and wear observation, then after-pour wash. Repeat every morning. Photographs go to the Xingtai factory with the model slug.',
        '料斗、管路卡箍与密封、液压渗漏绕机、S阀与易损件观察，再做浇筑后冲洗。每天早上重复。照片连同型号发给邢台工厂。',
      ),
    },
  ],
};

export function getBlogDirectAnswer(post: BlogPost): LocalizedText {
  return post.directAnswer ?? directAnswers[post.slug] ?? post.description;
}

export function getBlogFaqs(post: BlogPost): Array<{ question: LocalizedText; answer: LocalizedText }> {
  const seen = new Set<string>();
  const merged: Array<{ question: LocalizedText; answer: LocalizedText }> = [];
  for (const item of [...(post.faqs ?? []), ...(extraFaqs[post.slug] ?? []), ...sharedFaqs]) {
    const key = item.question.en.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }
  return merged.slice(0, 12);
}

export function getBlogFaqPlain(post: BlogPost, lang: Lang) {
  return getBlogFaqs(post).map((item) => ({
    question: pick(item.question, lang),
    answer: pick(item.answer, lang),
  }));
}

export const maintenanceHowToSteps: LocalizedText[] = [
  L(
    'Check the hopper: grate, walls and agitator must be free of set concrete before the first load.',
    '开泵前检查料斗：格栅、斗壁与搅拌叶片上不能有已凝固混凝土。',
  ),
  L(
    'Walk the pipeline: clamps closed, pins in, gaskets present; support the line so joints are not hanging on the gasket alone.',
    '巡查管路：卡箍扣死、销子插好、密封在位；管路要有支撑，不能只靠密封承受悬挂重量。',
  ),
  L(
    'Walk the trailer for hydraulic leaks at the main pump, valve block and cylinders. Diesel units: also look at engine leaks and belts by eye.',
    '绕机查看主泵、阀块与油缸液压渗漏。柴油机还要用眼看发动机渗漏和皮带。',
  ),
  L(
    'Observe the S-valve, cutting ring and spectacle plate. Photograph chips, steps or uneven seating; do not invent replacement hours.',
    '观察 S 阀、切削环与眼镜板。崩口、台阶或不对称坐实就拍照；不编造更换小时。',
  ),
  L(
    'After the pour, wash hopper, valve and pipeline. Send photos and the model slug to the Xingtai factory if something looks wrong.',
    '浇筑后冲洗料斗、阀箱与管路。看起来不对就把照片和型号发给邢台工厂。',
  ),
];
