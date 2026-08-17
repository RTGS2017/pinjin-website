import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export const customMachineryContent = {
  h1: L('OEM Custom Machinery Manufacturer', 'OEM 定制机械厂家'),
  title: L(
    'OEM Custom Machinery | Pinjin Machinery China',
    'OEM 定制机械 | 品锦机械',
  ),
  description: L(
    'OEM custom machinery from Hebei Pinjin Machinery in Xingtai, China. Customize catalogue concrete pumps, spraying machines, feeders and rebar equipment after confirming specifications with the factory engineering team.',
    '河北品锦机械在中国邢台提供 OEM 定制机械。对照目录混凝土泵、喷涂机、给料机与钢筋设备确认规格后，由工厂工程团队安排定制。',
  ),
  definition: L(
    'OEM custom machinery at Pinjin means factory-direct adjustment of a listed catalogue model — capacity, power type, conveying distance, feeder head or other published parameters — after the engineering team confirms the specification. It is not a separate undocumented product line.',
    '品锦的 OEM 定制机械，是指在目录已列机型上，由工程团队确认规格后调整产能、动力形式、输送距离、给料扬程等已公布参数。它不是一条未公开的独立产品线。',
  ),
  intro: L(
    'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a construction machinery manufacturer in Xingtai, Hebei, China. Overseas buyers who need custom concrete equipment can start from a published model, then request OEM changes that the factory can actually produce.',
    '河北品锦机械制造有限公司是中国河北邢台的工程机械制造商。需要定制混凝土设备的海外采购，应从已公布型号出发，再提出工厂能够实际生产的 OEM 变更。',
  ),
  whatTitle: L('What can be customized', '可定制范围'),
  whatItems: [
    L(
      'Concrete pump models: match delivery capacity, horizontal/vertical distance, aggregate size and diesel or electric power.',
      '混凝土泵型号：对照输送量、水平/垂直距离、骨料粒径以及柴油或电力驱动。',
    ),
    L(
      'Concrete spraying equipment: mortar, plaster, plunger and concrete spraying machines with published pressure, flow and distance.',
      '混凝土喷涂设备：砂浆、石膏、柱塞与混凝土喷浆机，对照已公布压力、流量与距离。',
    ),
    L(
      'Material handling: spiral feeder rated head and forklift loader configuration where the catalogue allows it.',
      '物料搬运：目录允许范围内的螺旋给料机额定扬程与叉车装载机配置。',
    ),
    L(
      'Rebar processing: CNC steel bar bending equipment manufactured at the same Xingtai factory.',
      '钢筋加工：同一邢台工厂制造的数控钢筋弯箍设备。',
    ),
  ],
  processTitle: L('OEM customization process', 'OEM 定制流程'),
  processSteps: [
    L(
      '1. Send project conditions: output, pipeline length, height, aggregate size or spraying material.',
      '1. 提供工况：产量、管长、高差、骨料粒径或喷涂材料。',
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
    'The current catalogue does not include a concrete mixing plant. Mixing and pumping are related site processes; Pinjin supplies the pumping and spraying equipment listed on this website.',
    '当前目录不含混凝土搅拌站。搅拌与泵送是工地上相关的工序；品锦供应本站已列出的泵送与喷涂设备。',
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
