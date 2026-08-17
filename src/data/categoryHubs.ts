import type { LocalizedText } from '@/i18n/types';
import type { ProductCategory } from '@/data/products';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export interface CategoryHubFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface CategoryHub {
  h1: LocalizedText;
  intro: LocalizedText;
  applications: LocalizedText[];
  advantages: LocalizedText[];
  keywords: string[];
  faqs: CategoryHubFaq[];
}

export const categoryHubs: Record<ProductCategory, CategoryHub> = {
  'concrete-pump': {
    h1: L('Concrete Pump Manufacturer', '混凝土泵厂家'),
    intro: L(
      'Hebei Pinjin Machinery Manufacturing Co., Ltd. is a concrete pump manufacturer in China. Catalogue models cover compact transfer pumps through high-capacity trailer pumps, with published delivery capacity, conveying distance and aggregate size. The factory is in Renze Industrial Park, Xingtai, Hebei, in the Xingjiawan concrete machinery manufacturing area.',
      '河北品锦机械制造有限公司是中国混凝土泵制造商。目录机型覆盖紧凑输送泵至大排量拖泵，并公布输送量、输送距离与骨料粒径。工厂位于河北省邢台市任泽工业园区，地处邢家湾混凝土机械制造集聚区。',
    ),
    applications: [
      L('Building construction concrete placement', '建筑施工混凝土浇筑'),
      L('Infrastructure pours with longer pipelines', '较长管路的基建浇筑'),
      L('Secondary structure / fine-stone pumping where listed', '目录所列二次结构 / 细石泵送'),
    ],
    advantages: [
      L('Factory-direct concrete pump manufacturer in Xingtai, Hebei', '河北邢台工厂直供混凝土泵厂家'),
      L('Published capacity and conveying parameters on each model page', '各型号页公布产能与输送参数'),
      L('OEM specification discussion after catalogue matching', '对照目录后可沟通 OEM 规格'),
    ],
    keywords: [
      'Concrete Pump Manufacturer China',
      'concrete pump factory China',
      'Xingjiawan concrete machinery',
    ],
    faqs: [
      {
        question: L(
          'Are these concrete pumps made in China?',
          '这些混凝土泵是否在中国制造？',
        ),
        answer: L(
          'Yes. Hebei Pinjin Machinery manufactures concrete pumps in Xingtai, Hebei, China.',
          '是。河北品锦机械在中国河北邢台制造混凝土泵。',
        ),
      },
      {
        question: L(
          'How should I choose a concrete pump model?',
          '如何选择混凝土泵型号？',
        ),
        answer: L(
          'Match delivery capacity, horizontal/vertical distance, aggregate size and power type to the catalogue table on each product page, then contact the engineering team.',
          '按各产品页目录表对照输送量、水平/垂直距离、骨料粒径与动力形式，再联系工程团队。',
        ),
      },
      {
        question: L(
          'Can specifications be customized?',
          '规格能否定制？',
        ),
        answer: L(
          'After confirming specifications against a listed model, customized production can be arranged quickly. This site does not publish a fixed number of production days.',
          '对照已列机型确认规格后，可尽快安排定制生产。本站不公布固定生产天数。',
        ),
      },
    ],
  },
  'spraying-machine': {
    h1: L('Concrete Spraying Equipment Manufacturer', '混凝土喷涂设备厂家'),
    intro: L(
      'Pinjin is a concrete spraying equipment manufacturer listing mortar, plaster, plunger and concrete spraying machines with published pressure, flow and distance. Equipment is produced at the Xingtai factory as factory-direct OEM machinery.',
      '品锦是混凝土喷涂设备制造商，目录含砂浆、石膏、柱塞与混凝土喷浆机，并公布压力、流量与距离。设备在邢台工厂生产，属工厂直供 OEM 机械。',
    ),
    applications: [
      L('Mortar spraying on construction finishing', '建筑饰面砂浆喷涂'),
      L('Plaster spraying', '石膏喷涂'),
      L('Concrete spraying where a spraying machine is listed', '目录所列混凝土喷浆'),
    ],
    advantages: [
      L('Separate spraying line from long-distance concrete pumps', '喷涂设备与长距离混凝土泵分开选型'),
      L('Catalogue parameters for pressure, flow and conveying distance', '目录公布压力、流量与输送距离'),
      L('Customization where the catalogue explicitly supports it', '仅在目录明确支持处提供定制'),
    ],
    keywords: [
      'Concrete Spraying Equipment Manufacturer',
      'mortar spraying machine manufacturer',
      'OEM Concrete Equipment Manufacturer',
    ],
    faqs: [
      {
        question: L(
          'Is a spraying machine the same as a concrete pump?',
          '喷涂机与混凝土泵是否同一类设备？',
        ),
        answer: L(
          'No. Spraying machines are selected for mortar, plaster or spray applications. Long-distance concrete placement uses concrete pump models.',
          '不是。喷涂机用于砂浆、石膏或喷浆；长距离浇筑应选混凝土泵型号。',
        ),
      },
      {
        question: L(
          'Which spraying models support customization?',
          '哪些喷涂机型支持定制？',
        ),
        answer: L(
          'The product catalogue confirms customization on listed items such as the diesel screw mortar spraying machine. Other models are reviewed case by case.',
          '产品目录明确柴油螺杆砂浆喷涂机支持定制。其他型号按项目评估。',
        ),
      },
    ],
  },
  'material-handling': {
    h1: L('Material Handling Equipment Manufacturer', '物料搬运设备厂家'),
    intro: L(
      'Material handling equipment from Hebei Pinjin Machinery includes spiral feeders and four-wheel-drive forklift loaders with published lift and drive parameters for construction-site feeding and handling.',
      '河北品锦机械的物料搬运设备包括螺旋给料机与四驱叉车装载机，公布举升与驱动参数，用于工地给料与搬运。',
    ),
    applications: [
      L('Site material feeding with spiral feeders', '螺旋给料机现场给料'),
      L('Clamp or bucket loader handling', '夹抱或铲斗装载搬运'),
    ],
    advantages: [
      L('Factory-direct handling equipment from Xingtai, Hebei', '河北邢台工厂直供搬运设备'),
      L('Published lift height and drive parameters', '公布举升高度与驱动参数'),
      L('Spiral feeder rated head is customizable per catalogue', '螺旋给料机额定扬程按目录可定制'),
    ],
    keywords: [
      'Xingtai Construction Machinery Factory',
      'OEM Concrete Equipment Manufacturer',
    ],
    faqs: [
      {
        question: L(
          'Can feeder head be customized?',
          '给料机扬程能否定制？',
        ),
        answer: L(
          'The catalogue states that spiral feeder rated head is customizable. Confirm the required head with the engineering team.',
          '目录标明螺旋给料机额定扬程可定制。请与工程团队确认所需扬程。',
        ),
      },
    ],
  },
  'rebar-equipment': {
    h1: L('Rebar Processing Equipment Manufacturer', '钢筋加工设备厂家'),
    intro: L(
      'Pinjin lists CNC steel bar bending equipment for stirrup processing, manufactured at the Xingtai construction machinery factory.',
      '品锦目录提供数控钢筋弯箍设备，用于箍筋加工，由邢台工程机械工厂制造。',
    ),
    applications: [
      L('Stirrup processing for reinforced concrete work', '钢筋混凝土工程箍筋加工'),
    ],
    advantages: [
      L('Factory-direct rebar processing equipment', '工厂直供钢筋加工设备'),
      L('Published CNC bending model on the product page', '产品页公布数控弯箍型号'),
    ],
    keywords: [
      'Xingtai Construction Machinery Factory',
      'OEM Concrete Equipment Manufacturer',
    ],
    faqs: [
      {
        question: L(
          'Is rebar equipment made at the same factory?',
          '钢筋设备是否同一工厂生产？',
        ),
        answer: L(
          'Yes. It is listed in the Pinjin catalogue and manufactured by Hebei Pinjin Machinery in Xingtai, Hebei.',
          '是。该设备列入品锦目录，由河北品锦机械在河北邢台制造。',
        ),
      },
    ],
  },
};
