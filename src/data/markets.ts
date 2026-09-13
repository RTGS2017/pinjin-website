import type { LocalizedText } from '@/i18n/types';

const L = (
  en: string,
  zh: string,
  extra: Partial<Record<'pt' | 'ar' | 'ru', string>> = {},
): LocalizedText => ({ en, zh, ...extra });

/** Target-market copy from published factory facts. No country lists or invented distributors. */
export const marketsContent = {
  path: '/markets',
  title: L(
    'Target Markets | Concrete Pump Manufacturer China | Pinjin',
    '目标市场 | 中国混凝土泵厂家 | 品锦',
    {
      pt: 'Mercados-alvo | Fabricante de bomba de concreto China | Pinjin',
      ar: 'الأسواق المستهدفة | مصنّع مضخات خرسانة في الصين | Pinjin',
      ru: 'Целевые рынки | Производитель бетононасосов Китай | Pinjin',
    },
  ),
  h1: L(
    'Target Markets for Pinjin Concrete Pumps',
    '品锦混凝土泵的目标市场',
    {
      pt: 'Mercados-alvo das bombas de concreto Pinjin',
      ar: 'الأسواق المستهدفة لمضخات الخرسانة من Pinjin',
      ru: 'Целевые рынки бетононасосов Pinjin',
    },
  ),
  description: L(
    'Hebei Pinjin Machinery in Xingtai, China supplies electric, diesel and mixer concrete pumps to contractors on Chinese sites and export projects whose catalogue output, pressure and conveying distance match the job.',
    '河北品锦机械在中国邢台，向国内工地与出口项目的承包商供应电动、柴油与搅拌混凝土泵。对照目录输送量、压力与输送距离是否匹配工况。',
    {
      pt: 'A Hebei Pinjin Machinery em Xingtai, China fornece bombas elétricas, a diesel e misturadoras a empreiteiras em obras chinesas e projetos de exportação cujo catálogo de vazão, pressão e distância corresponde à obra.',
      ar: 'تورد Hebei Pinjin Machinery في شينغتاي بالصين مضخات خرسانة كهربائية وديزل وخلط للمقاولين في مواقع صينية ومشاريع تصدير عندما تطابق سعة الكتالوج والضغط ومسافة النقل موقع العمل.',
      ru: 'Hebei Pinjin Machinery в Синтае, Китай, поставляет электрические, дизельные и смесительные бетононасосы подрядчикам на китайских объектах и экспортных проектах, если производительность, давление и дальность из каталога соответствуют задаче.',
    },
  ),
  intro: L(
    'Pinjin is a source manufacturer in Renze Industrial Park, Xingtai, Hebei, in the Xingjiawan concrete-machinery area. This page states who the catalogue equipment is for. It does not list exclusive distributors or country quotas.',
    '品锦是河北邢台任泽工业园区的源头厂家，地处邢家湾混凝土机械集聚区。本页说明目录设备面向谁，不列出独家经销商或国别配额。',
    {
      pt: 'A Pinjin é fabricante de origem no Parque Industrial Renze, Xingtai, Hebei, na área de Xingjiawan. Esta página diz a quem o catálogo se destina. Não lista distribuidores exclusivos nem cotas por país.',
      ar: 'بينجين مصنع مصدر في حديقة رينزه الصناعية بشينغتاي في خبي، ضمن منطقة شينغجياوان. توضح هذه الصفحة لمن تُوجَّه معدات الكتالوج، دون قائمة وكلاء حصريين أو حصص دول.',
      ru: 'Pinjin — завод-изготовитель в промышленном парке Жэньцзэ, Синтай, Хэбэй, в кластере Синцзявань. Страница описывает, для кого предназначено каталожное оборудование, без списка эксклюзивных дистрибьюторов и страновых квот.',
    },
  ),
  sections: [
    {
      heading: L(
        'Who buys from the Xingtai factory',
        '邢台工厂面向谁',
        {
          pt: 'Quem compra da fábrica de Xingtai',
          ar: 'من يشتري من مصنع شينغتاي',
          ru: 'Кто покупает на заводе в Синтае',
        },
      ),
      body: L(
        'Construction contractors, equipment buyers and project teams that need published electric pumps, diesel pumps or integrated mixer pumps. Typical jobs are pipeline concrete delivery where output, pressure and conveying distance can be checked against the catalogue table.',
        '需要目录电动泵、柴油泵或搅拌泵一体机的工程承包商、设备采购方与项目团队。典型工况是管道混凝土输送，并按目录表核对应输送量、压力与输送距离。',
        {
          pt: 'Empreiteiras, compradores e equipes de obra que precisam de bombas elétricas, a diesel ou misturadoras publicadas. O uso típico é transporte de concreto por tubulação, conferindo vazão, pressão e distância no catálogo.',
          ar: 'مقاولون ومشترون وفرق مشاريع يحتاجون مضخات كهربائية أو ديزل أو مضخات خلط منشورة. الاستخدام الشائع نقل الخرسانة بالأنابيب مع مطابقة السعة والضغط والمسافة على جدول الكتالوج.',
          ru: 'Подрядчики, закупщики и проектные команды, которым нужны опубликованные электрические, дизельные или смесительные насосы. Типичная задача — трубопроводная подача бетона с проверкой производительности, давления и дальности по каталогу.',
        },
      ),
    },
    {
      heading: L(
        'China sites and export projects',
        '国内工地与出口项目',
        {
          pt: 'Obras na China e projetos de exportação',
          ar: 'مواقع في الصين ومشاريع التصدير',
          ru: 'Объекты в Китае и экспортные проекты',
        },
      ),
      body: L(
        'Equipment is manufactured in Xingtai and used on construction sites in China and on export projects whose pipeline length and aggregate size stay within the listed table. Model choice follows the catalogue, not a regional sales ranking.',
        '设备在邢台制造，用于国内工地，以及管路长度与骨料粒径落在目录表范围内的出口项目。选型对照目录，不按地区销量排序。',
        {
          pt: 'Os equipamentos são fabricados em Xingtai e usados em obras na China e em exportação cuja extensão de tubulação e granulometria cabem na tabela. A escolha segue o catálogo, não um ranking regional.',
          ar: 'تُصنع المعدات في شينغتاي وتُستخدم في مواقع صينية ومشاريع تصدير يبقى طول الأنبوب وحجم الركام ضمن الجدول. الاختيار حسب الكتالوج لا حسب ترتيب إقليمي.',
          ru: 'Оборудование производится в Синтае и применяется на объектах в Китае и на экспорте, если длина линии и фракция заполнителя укладываются в таблицу. Выбор модели — по каталогу, не по региональному рейтингу.',
        },
      ),
    },
    {
      heading: L(
        'Which pump line fits the site',
        '哪条产品线对应工况',
        {
          pt: 'Qual linha de bomba cabe na obra',
          ar: 'أي خط مضخات يناسب الموقع',
          ru: 'Какая линейка подходит площадке',
        },
      ),
      body: L(
        'Electric trailer and compact pumps suit jobs with stable grid power. Diesel trailer pumps and the tractor-driven 4100 cover sites without reliable electricity. Mixer pumps mix and convey in one machine; they are not a concrete mixing plant line. Pipeline pipes, elbows, clamps and hoses are quoted after the pump model is confirmed.',
        '有稳定电网时用电动拖式或紧凑泵。无可靠电力时用柴油拖式泵或拖拉机带动 4100。搅拌泵是搅拌与泵送一体机，不是搅拌站产品线。输送管、弯管、管卡与胶管需确认泵型号后报价。',
        {
          pt: 'Bombas elétricas cabem onde há rede estável. Bombas a diesel e a 4100 a trator cobrem obras sem eletricidade confiável. Misturadoras misturam e bombeiam numa máquina; não são usina de concreto. Tubos, cotovelos, grampos e mangueiras são cotados após o modelo da bomba.',
          ar: 'المضخات الكهربائية تناسب المواقع بشبكة مستقرة. مضخات الديزل و4100 بالجرار تغطي المواقع دون كهرباء موثوقة. مضخة الخلط تخلط وتضخ في آلة واحدة وليست خط محطة خلط. تُسعَّر الأنابيب والأكواع والمشابك والخراطيم بعد تأكيد طراز المضخة.',
          ru: 'Электрические насосы — при стабильной сети. Дизельные и тракторный 4100 — без надёжного электричества. Смесительный насос мешает и подаёт в одной машине, это не бетонный завод. Трубы, отводы, хомуты и рукава котируются после модели насоса.',
        },
      ),
    },
    {
      heading: L(
        'How to inquire',
        '如何询盘',
        {
          pt: 'Como solicitar cotação',
          ar: 'كيف تطلب عرض سعر',
          ru: 'Как запросить цену',
        },
      ),
      body: L(
        'Send the model, conveying distance, aggregate size and power condition by WhatsApp or email. Pinjin quotes from the Xingtai factory. Spare pipeline parts are not sold in small batches and have no published list price.',
        '请通过 WhatsApp 或邮件发送型号、输送距离、骨料粒径与供电条件。品锦由邢台工厂报价。管路配件不支持小批量发货，也没有公开标价。',
        {
          pt: 'Envie modelo, distância, granulometria e energia por WhatsApp ou e-mail. A Pinjin cotiza da fábrica de Xingtai. Peças de tubulação não saem em pequenos lotes e não têm lista de preços.',
          ar: 'أرسل الطراز ومسافة النقل وحجم الركام وحالة الكهرباء عبر واتساب أو البريد. تسعّر بينجين من مصنع شينغتاي. قطع الأنابيب لا تُباع بكميات صغيرة وليس لها سعر قائمة منشور.',
          ru: 'Пришлите модель, дальность, фракцию и питание в WhatsApp или на почту. Pinjin котирует с завода в Синтае. Трубопроводные запчасти не продаются мелкими партиями и без открытого прайса.',
        },
      ),
    },
  ],
} as const;
