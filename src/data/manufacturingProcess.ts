import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

/** 制造流程：仅用企业简介已核实的「原料采购 → 生产 → 检测 → 交付」表述，不虚构产线型号 */
export const manufacturingSteps = [
  {
    id: 'materials',
    title: L('Raw materials', '原材料'),
    body: L(
      'Incoming materials are selected to match catalogue specifications before production starts.',
      '生产前按目录参数要求组织原材料采购与准备。',
    ),
  },
  {
    id: 'machining',
    title: L('Machining', '机加工'),
    body: L(
      'Parts are machined with the production equipment described in the company profile.',
      '使用企业简介所述生产设备进行零部件加工。',
    ),
  },
  {
    id: 'assembly',
    title: L('Assembly', '装配'),
    body: L(
      'Equipment is assembled as a source manufacturer covering R&D, production and sales.',
      '作为集研发、生产与销售一体的源头厂家完成整机装配。',
    ),
  },
  {
    id: 'inspection',
    title: L('Quality inspection', '质量检测'),
    body: L(
      'A complete testing system supports full-process quality control before delivery.',
      '完善检测体系支撑出厂前的全流程质量管控。',
    ),
  },
  {
    id: 'packing',
    title: L('Factory packing', '出厂包装'),
    body: L(
      'Finished equipment is packed at the factory in Renze Industrial Park, Xingtai, Hebei.',
      '成品在河北省邢台市任泽工业园区工厂完成包装。',
    ),
  },
] as const;

/** 采购决策要点：只用已公开的厂家定位，不含认证/出口国/客户名 */
export const whyFactoryPoints = [
  L(
    'Direct source manufacturer of delivery pumps in Xingtai, Hebei.',
    '位于河北邢台的输送泵源头生产厂家。',
  ),
  L(
    'Full-process quality control from incoming materials to finished equipment.',
    '从原材料到成品的全流程质量管控。',
  ),
  L(
    'Equipment customization is supported where listed in the product catalogue.',
    '产品目录标明的型号支持按项目需求定制。',
  ),
  L(
    'Manufacturing base in Renze Industrial Park with published capacity parameters.',
    '制造基地位于任泽工业园区，产能与输送参数均来自公开目录。',
  ),
] as const;
