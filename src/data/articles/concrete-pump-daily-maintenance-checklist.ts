import type { BlogPost } from '@/data/blog';
import { getFactorySlide } from '@/data/factory';
import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

function articleImage(id: string, altEn: string, altZh: string) {
  const slide = getFactorySlide(id);
  if (!slide) throw new Error(`Missing factory slide: ${id}`);
  return { src: slide.image, alt: L(altEn, altZh), caption: slide.title };
}

export const article: BlogPost = {
  slug: 'concrete-pump-daily-maintenance-checklist',
  title: L(
    'Concrete Pump Maintenance: Factory Daily Checklist',
    '混凝土泵日常保养：邢台工厂每日点检单',
  ),
  seoTitle: L(
    'Concrete Pump Maintenance Daily Checklist | Pinjin',
    '混凝土泵日常保养点检单 | 品锦机械',
  ),
  description: L(
    'From our Xingtai factory we issue a daily concrete pump checklist: hopper, pipeline, hydraulic leaks, S-valve wear observation, and after-pour wash. No invented oil brands or hour tables.',
    '邢台工厂发出的混凝土泵每日点检：料斗、管路、液压渗漏、S管与易损件观察、浇筑后冲洗。不编造油品品牌，不编造更换小时表。',
  ),
  category: 'manufacturing-knowledge',
  date: '2026-09-04',
  keywords: [
    'concrete pump maintenance',
    'pump daily care',
    'concrete pump checklist',
  ],
  relatedProductSlugs: [
    'electric-40-concrete-pump',
    'diesel-40-concrete-pump',
    'integrated-mixer-pump',
  ],
  relatedPaths: [
    {
      href: '/products/electric-concrete-pumps',
      label: L('Electric concrete pumps', '电动混凝土泵'),
    },
    {
      href: '/solutions/construction',
      label: L('Construction solutions', '建筑施工方案'),
    },
    {
      href: '/contact',
      label: L('Contact the factory', '联系工厂'),
    },
  ],
  content: [
    {
      heading: L(
        'Why our Xingtai factory issues a daily checklist',
        '邢台工厂为什么发的是每日点检，而不是小时表',
      ),
      paragraphs: [
        L(
          'We assemble trailer concrete pumps in Xingtai, Hebei — Hebei Pinjin Machinery, Renze Industrial Park. Buyers ask for oil brands and replacement hours. We will not invent that table. Mix, pipe length, and yesterday\'s wash change wear more than a calendar number.',
          '我们在河北邢台装配拖式混凝土泵，工厂是河北品锦机械，地址在任泽工业园区。不少采购会来信，希望我们发一份带油品品牌和更换小时的保养表。我们不会编造那张表。配合比、管路长度、骨料以及上一班是否把料斗冲洗干净，对磨损的影响都大于日历上的整数。',
        ),
        L(
          'This page is the daily checklist we issue with the machine: hopper, pipeline, hydraulic leaks, S-valve observation, then after-pour wash. It is not a lubrication catalogue. We do not publish fuel consumption. We do not list mixing plants or truck-mounted boom pumps on this pump page. Spraying machines sit on /products/spraying-machines.',
          '这一页就是我们随设备发出的每日点检。工厂口吻：料斗、管路、液压渗漏、S管与易损件观察，再做浇筑后冲洗。它不是润滑油目录，也不是配件价目。我们不公布油耗。目录里没有喷涂机。搅拌站和车载布料杆泵也不是我们的目录产品。',
        ),
        L(
          'We wrote it for trailer pumps such as Electric 40 at /products/electric-40-concrete-pump, Diesel 40 at /products/diesel-40-concrete-pump, and the mixer pump at /products/integrated-mixer-pump — mix and pump on one trailer, not a mixing plant. Electric or diesel changes how you start, not leftover stone in the hopper. Our engineers walk this sequence before dispatch. Walk it again every morning on site.',
          '这份点检主要对着拖泵来写，例如 /products/electric-40-concrete-pump 的电动40、/products/diesel-40-concrete-pump 的柴油40，以及 /products/integrated-mixer-pump 的搅拌泵一体机——搅拌和泵送在同一台拖车上，不是搅拌站。电动还是柴油只改变启动方式，不改变料斗里隔夜石子或渗浆卡箍会停泵这个事实。我们的工程师在车间发货前会走一遍这个顺序，也请工地每天早上再走一遍。',
        ),
      ],
      image: articleImage(
        'workshop-crane',
        'Overhead crane in the Pinjin Xingtai workshop where engineers walk a trailer pump before dispatch',
        '品锦邢台车间行车下，工程师在发货前对拖式混凝土泵做点检',
      ),
    },
    {
      heading: L(
        'Hopper checks before the first load',
        '开泵前先看料斗',
      ),
      paragraphs: [
        L(
          'The hopper is where mix meets the machine. Electric 40, Diesel 40, and the mixer pump all list 0.4 m³. That volume is not a license to skip cleaning. Cake on the grate, walls, or agitator will seed a blockage.',
          '料斗是当天混凝土与机器相遇的地方。电动40、柴油40和搅拌泵一体机目录料斗都是 0.4 m³。这个容积是目录数字，不是可以不洗的许可证。格栅、斗壁或搅拌叶片上隔夜结块，会在第一车还没打完时就埋下堵管。',
        ),
        L(
          'On the mixer pump, a 14 kW mixer sits beside the 45 kW main motor. Empty the bowl of hardened residue before charging. A mixer pump is not a mixing plant. Do not pump into a dry hopper; prime as your mix design allows. We do not publish a recipe — mix designs are not in our catalogue.',
          '搅拌泵一体机的搅拌是独立的 14 kW 电机，主电机是 45 kW。上料前确认搅拌筒里没有硬化残渣。搅拌泵不是搅拌站；筒里剩下的，就是明天第一车里的异物。不要对着干料斗直接泵送。按工地配合比允许的方式先打润管砂浆或稀浆。我们不在这里公布配方，因为配合比不在目录里。',
        ),
      ],
      bullets: [
        L(
          'Look into the hopper: grate, walls, and agitator must be free of set concrete.',
          '看料斗内部：格栅、斗壁、搅拌叶片上不能有已凝固混凝土。',
        ),
        L(
          'Confirm the grate is seated and bars are not bent, so oversize stone cannot enter the valve.',
          '确认格栅就位、栅条未掰弯，避免超径石子落入阀箱。',
        ),
        L(
          'With the unit locked out, confirm the agitator turns, or jog it under that model\'s start procedure.',
          '在停机闭锁后确认搅拌能灵活转动，或按该机启动程序点动检查。',
        ),
      ],
    },
    {
      heading: L(
        'Pipeline walk-down: clamps, gaskets and layout',
        '管路巡查：卡箍、密封与走向',
      ),
      paragraphs: [
        L(
          'Walk the line from hopper outlet to the pour point before anyone calls for concrete. A missing gasket sprays paste then packs with stone. Sagging pipe pulls joints open. We do not invent wall thickness, and DN200 is not a pump line for these trailer models.',
          '管路问题是早上最常见的意外。在任何人喊要混凝土之前，从料斗出口走到浇筑点。缺一只密封的接头会先喷浆，再被骨料堵住。楼层间垂着的管子下垂会把接头拉开。我们不编造壁厚，也不把 DN200 当成这些拖泵的泵送主管。',
        ),
        L(
          'Count the pipes, do not only wash them. Electric 40 lists fine-stone 120 m / 360 m and 13 mm aggregate 40 m / 120 m. Diesel 40 lists 120 m / 360 m. The mixer pump lists 100 m / 300 m with pipe 100 / 125 mm. Extra hose may already exceed the table. Still choosing? Start at /products/electric-concrete-pumps. Building crews can read /solutions/construction.',
          '日常保养包括数清管子，而不只是冲洗。电动40目录细石水平 120 m / 垂直 360 m，13 mm 骨料 40 m / 120 m。柴油40是 120 m / 360 m。搅拌泵一体机是 100 m / 300 m，管径 100 / 125 mm。若昨天又加了软管，可能已经超出目录表。若还在选型，先看 /products/electric-concrete-pumps，先对距离再对价格。建筑工地也可阅读 /solutions/construction。',
        ),
      ],
      bullets: [
        L(
          'Clamps closed, pins in, gaskets present at every joint.',
          '每道接头：卡箍扣死、销子插好、密封在位。',
        ),
        L(
          'Elbows and reducers: look for thin spots, cracks, and wet dust that marks a weep.',
          '弯头与变径：看是否磨薄、开裂，以及渗浆留下的湿灰。',
        ),
        L(
          'Support the line so joints are not hanging on the gasket alone.',
          '管路要有支撑，不能只靠密封承受悬挂重量。',
        ),
      ],
    },
    {
      heading: L(
        'Hydraulic leak walk-around on the trailer',
        '绕机检查液压渗漏',
      ),
      paragraphs: [
        L(
          'We fit Kawasaki 112 hydraulic pumps on Electric 40 (45 kW, 21 m³/h, 23 MPa) and Diesel 40 (4108 / 66 kW, 26 m³/h, 25 MPa). That is the hydraulic pump in the catalogue, not an oil brand. We will not invent litres or hours. Walk the trailer with your eyes, not a made-up chart.',
          '电动40（45 kW、21 m³/h、23 MPa）和柴油40（4108 / 66 kW、26 m³/h、25 MPa）目录液压泵都是川崎 112。这是液压泵品牌，不是液压油品牌。我们同样不会编造未公布的升数或小时间隔。绕拖车检查时用眼睛和抹布，不要用一张虚构的表。',
        ),
        L(
          'Diesel 40 uses a 4108 / 66 kW engine. Check engine leaks and belts by eye before load. We do not publish L/h. Unusual noise after a cold start is a reason to pause.',
          '柴油40用 4108 / 66 kW 发动机。发动机渗漏和皮带也按看液压管的方式，在带负荷前用眼看。我们不公布升/小时。冷车启动后的异常响声是停下来再看的理由，不是可以忽略的参数。',
        ),
      ],
      bullets: [
        L(
          'Hose fittings at the main pump, valve block, and cylinders: fresh oil is today\'s job.',
          '主泵、阀块、油缸接头：新渗出的油就是今天的活，不要留到下周。',
        ),
        L(
          'Cylinder rods: scoring or paste packed on the wiper means the seal is already working too hard.',
          '油缸活塞杆：拉伤或刮污圈上糊着砂浆，说明密封已经在硬扛。',
        ),
        L(
          'Tank sight: if you cannot see oil, do not start. We will not invent a millimetre full mark.',
          '油箱视镜：看不见油就不要启动。我们不编造以毫米计的“加满”刻度。',
        ),
      ],
      image: articleImage(
        'trailer-assembly',
        'Trailer concrete pump assembly at Pinjin Xingtai, hopper and hydraulic layout used in daily leak checks',
        '品锦邢台拖式混凝土泵装配现场，料斗与液压布置是每日渗漏检查的对象',
      ),
    },
    {
      heading: L(
        'S-valve and wear parts: observe, do not invent hours',
        'S管与易损件：只观察，不编小时',
      ),
      paragraphs: [
        L(
          'Crews notice the S-valve when output drops or paste blows back. We ask for observation, not a calendar. Fine-stone at catalogue pressure is not a harsh mix on a long vertical line. We do not publish replacement hours for cutting rings, spectacle plates, or concrete pistons.',
          '输出变小、或砂浆往料斗回喷时，班组最先想到的往往是 S 阀（S 管）。我们要的是观察，不是日历。目录压力下打细石，和长垂直管路打恶劣级配，不是一回事。没有配合比的小时数只是营销话术。切削环、眼镜板、混凝土活塞，我们都不公布更换小时表。',
        ),
        L(
          'If something looks wrong, stop and photograph it. Send photos and the model slug to /contact. Our Xingtai engineers answer against the catalogue and the picture, not a made-up hour chart.',
          '看起来不对就停下来拍照。写信到 /contact 时带上型号 slug 和照片。邢台的工程师会对照目录和照片回答，而不是对照一张编出来的小时表。',
        ),
      ],
      bullets: [
        L(
          'Cutting ring and spectacle plate: even wear is expected; a step, chip, or gap is a reason to photograph.',
          '切削环与眼镜板：均匀磨损是预期现象；能看见台阶、崩口或缝隙，就该拍照来问。',
        ),
        L(
          'S-tube swing should seat on both sides. Slapping or hesitation on one side means uneven wear.',
          'S 管摆动应在两侧都坐实。一侧拍击或迟疑，说明这对磨损件已经不对称。',
        ),
        L(
          'If the hopper is empty and cylinder mouths are visible, stop for missing chunks, wires, or a wet trail behind a piston.',
          '料斗空着能看见缸口时：缺块、露线、活塞后面湿痕，都是停机项。',
        ),
      ],
    },
    {
      heading: L(
        'After-pour wash and how to ask us',
        '浇筑后冲洗，以及怎样把问题发回邢台',
      ),
      paragraphs: [
        L(
          'Wash is not optional. Set concrete in the S-tube, hopper, or a reducer is a blockage you made, not a wear part. Reverse a few strokes if the unit allows. Wash hopper and grate until water runs clear. Clean the pipeline until discharge is clear. Rinse the S-tube so the cutting pair is not left in a cement skin.',
          '冲洗不是可选项。凝固在 S 管、料斗或变径里的混凝土不是易损件，是自己造成的堵塞。机组允许时先反泵几下卸压。冲洗料斗和格栅，直到出水不再带灰浆。管路清管直到出口干净。打开并冲洗 S 管区域，不要让切削副留在一层水泥皮里。',
        ),
        L(
          'On the mixer pump, wash the mixer as thoroughly as the hopper. The 14 kW mixer will not save overnight stone. Park so water drains; cover the hopper if the site will sit. For parts, use /contact. Send the slug (electric-40-concrete-pump, diesel-40-concrete-pump, or integrated-mixer-pump), hopper and S-valve photos, plus pipe diameter and pour height. We answer from Xingtai against the catalogue, not an invented hour chart.',
          '搅拌泵一体机要把搅拌筒洗到和料斗一样干净。14 kW 搅拌电机救不了一筒隔夜石子。停放时让积水能排掉。工地若要闲置，盖好料斗。需要配件或第二意见，走 /contact。请带上型号 slug（electric-40-concrete-pump、diesel-40-concrete-pump 或 integrated-mixer-pump）、料斗和 S 阀照片，以及管径与浇筑高度。我们从邢台按目录回答，不按虚构小时表回答。',
        ),
      ],
    },
  ],
  faqs: [
    {
      question: L(
        'How often should we replace the S-valve cutting ring?',
        'S 阀切削环多久该换？',
      ),
      answer: L(
        'We do not publish replacement hours. Wear depends on mix, pipe length, and wash. Photograph the cutting ring and spectacle plate, send the model slug, and our Xingtai engineers will comment on the picture.',
        '我们不公布更换小时表。磨损取决于配合比、管路长度以及是否冲洗干净。拍下切削环和眼镜板，带上型号 slug，邢台工程师会按照片上看到的情况说明。',
      ),
    },
    {
      question: L(
        'Which hydraulic oil brand do you specify?',
        '液压油指定哪个品牌？',
      ),
      answer: L(
        'We do not invent oil brands here. Kawasaki 112 on Electric 40 and Diesel 40 is the hydraulic pump in the catalogue, not an oil. Use oil that matches the documents shipped with the machine, and walk for leaks every morning.',
        '这份点检不编造油品品牌。电动40和柴油40目录上的川崎 112 是液压泵，不是液压油推荐。液压油按随机文件匹配，每天早上绕机看渗漏。',
      ),
    },
    {
      question: L(
        'Does daily care differ between Electric 40 and Diesel 40?',
        '电动40和柴油40的日常保养有何不同？',
      ),
      answer: L(
        'Hopper, pipeline, leaks, S-valve observation, and after-pour wash are the same. Electric 40 is a 45 kW motor; Diesel 40 is a 4108 / 66 kW engine — starting differs. We do not publish fuel consumption.',
        '料斗、管路、液压渗漏、S 管观察和浇筑后冲洗是一样的。电动40是 45 kW 电机，柴油40是 4108 / 66 kW 发动机，因此启动和发动机绕机检查不同。柴油机油耗我们不公布。',
      ),
    },
    {
      question: L(
        'Is the mixer pump cleaned like a mixing plant?',
        '搅拌泵一体机要按搅拌站那样清洗吗？',
      ),
      answer: L(
        'No. Pinjin does not manufacture mixing plants. The mixer pump mixes and pumps on one trailer (45 kW + 14 kW, hopper 0.4 m³). Wash the mixer bowl like the hopper and S-tube. Overnight stone in the bowl means the trailer was not washed.',
        '不是。品锦不生产搅拌站。搅拌泵一体机是在同一台拖车上搅拌并泵送（45 kW + 14 kW，料斗 0.4 m³）。搅拌筒要和料斗、S 管一样冲洗干净。筒里隔夜石子不是搅拌站筒仓问题，是这台拖车没洗。',
      ),
    },
  ],
};
