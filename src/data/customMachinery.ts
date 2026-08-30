import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export const customMachineryContent = {
  h1: L('OEM Custom Machinery Manufacturer', 'OEM 定制机械厂家'),
  title: L(
    'OEM Custom Machinery | Pinjin Machinery China',
    'OEM 定制机械 | 品锦机械',
  ),
  description: L(
    'OEM custom machinery from Hebei Pinjin Machinery in Xingtai, China. Customize catalogue electric pumps, diesel pumps and mixer pumps after confirming specifications with the factory engineering team.',
    '河北品锦机械在中国邢台提供 OEM 定制机械。对照目录电动泵、柴油泵与搅拌泵确认规格后，由工厂工程团队安排定制。',
  ),
  definition: L(
    'OEM custom machinery at Pinjin means factory-direct adjustment of a listed catalogue model — capacity, power type, conveying distance or other published parameters — after the engineering team confirms the specification. It is not a separate undocumented product line.',
    '品锦的 OEM 定制机械，是指在目录已列机型上，由工程团队确认规格后调整产能、动力形式、输送距离等已公布参数。它不是一条未公开的独立产品线。',
  ),
  intro: L(
    'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a construction machinery manufacturer in Xingtai, Hebei, China. Overseas buyers who need custom concrete equipment can start from a published model, then request OEM changes that the factory can actually produce.',
    '河北品锦机械制造有限公司是中国河北邢台的工程机械制造商。需要定制混凝土设备的海外采购，应从已公布型号出发，再提出工厂能够实际生产的 OEM 变更。',
  ),
  whatTitle: L('What can be customized', '可定制范围'),
  whatItems: [
    L(
      'Electric concrete pumps: match motor kW, delivery capacity, pressure and horizontal/vertical distance.',
      '电动混凝土泵：对照电机功率、输送量、压力与水平/垂直距离。',
    ),
    L(
      'Diesel concrete pumps: match engine type/kW, output and conveying distance for sites without stable grid power.',
      '柴油混凝土泵：对照发动机型号/功率、输送量与输送距离，适用于电网供电不便的工地。',
    ),
    L(
      'Mixer pumps: electric or diesel integrated mix-and-pump units. This is not a concrete mixing plant line.',
      '搅拌泵：电动或柴油搅拌+泵送一体机。这不是混凝土搅拌站产品线。',
    ),
    L(
      'OEM changes stay on a listed model. Unpublished performance figures are not promised.',
      'OEM 变更基于已列机型。不承诺未公布的性能数字。',
    ),
  ],
  processTitle: L('OEM customization process', 'OEM 定制流程'),
  processSteps: [
    L(
      '1. Send project conditions: output, pipeline length, height, aggregate size and power type.',
      '1. 提供工况：产量、管长、高差、骨料粒径与动力形式。',
    ),
    L(
      '2. Match a catalogue model on the product pages. Do not request unpublished performance.',
      '2. 在产品页对照目录机型，不要要求未公布的性能。',
    ),
    L(
      '3. Confirm which parameters can be adjusted. After specifications are confirmed, production can be arranged quickly.',
      '3. 确认可调整参数。规格确认后可尽快安排生产。',
    ),
    L(
      '4. Factory manufacturing, assembly, packing and dispatch from Xingtai, Hebei.',
      '4. 在河北邢台进行制造、装配、包装与发运。',
    ),
  ],
  note: L(
    'The current catalogue does not include a concrete mixing plant. Mixing and pumping on a mixer pump is a mobile combination; Pinjin supplies the electric pumps, diesel pumps and mixer pumps listed on this website.',
    '当前目录不含混凝土搅拌站。搅拌泵是移动式搅拌+泵送组合；品锦供应本站已列出的电动泵、柴油泵与搅拌泵。',
  ),
  keywords: [
    'OEM custom machinery manufacturer China',
    'custom concrete equipment supplier',
    'Xingtai concrete machinery factory',
    'China concrete pump factory',
  ],
  faqs: [
    {
      question: L(
        'Can Pinjin build a machine that is not in the catalogue?',
        '品锦能否生产目录以外的机器？',
      ),
      answer: L(
        'Customization starts from a listed model. The engineering team reviews whether a requested change stays within manufacturable specifications. Unpublished performance figures are not promised.',
        '定制从已列机型出发。工程团队评估所请求变更是否仍在可制造规格内。不承诺未公布的性能数字。',
      ),
    },
    {
      question: L(
        'Does OEM custom machinery include mixing plants?',
        'OEM 定制是否包含搅拌站？',
      ),
      answer: L(
        'No. A concrete mixing plant is not a Pinjin catalogue product. Buyers who batch concrete on site can still select a Pinjin concrete pump for placement.',
        '不包含。混凝土搅拌站不是品锦目录产品。现场搅拌混凝土的采购仍可选择品锦混凝土泵进行浇筑。',
      ),
    },
    {
      question: L(
        'How do I start an OEM inquiry?',
        '如何开始 OEM 询盘？',
      ),
      answer: L(
        'Open the closest product page, copy the model name, and contact the engineering team by WhatsApp or email with quantity and site conditions.',
        '打开最接近的产品页，复制型号，通过 WhatsApp 或邮件把数量与工况发给工程团队。',
      ),
    },
  ],
} as const;
