import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

/** 制造流程：仅用企业简介已核实的「原料采购 → 生产 → 检测 → 交付」表述，不虚构产线型号 */
export const manufacturingSteps = [
  {
    id: 'materials',
    title: L('Raw materials', '原材料'),
    body: L(
      'Materials are bought against the catalogue row you confirmed, not against a generic pump.',
      '材料按你确认的那一行目录来备，不按一台笼统的泵来备。',
    ),
  },
  {
    id: 'machining',
    title: L('Machining', '机加工'),
    body: L(
      'Pump parts are machined in the Xingtai workshop before they go to assembly.',
      '泵的零件在邢台车间加工，再进入装配。',
    ),
  },
  {
    id: 'assembly',
    title: L('Assembly', '装配'),
    body: L(
      'The trailer pump is assembled at the same factory that will quote the spare pipes and pistons.',
      '拖式泵在这家工厂装配，输送管和活塞也从这里报价。',
    ),
  },
  {
    id: 'inspection',
    title: L('Quality inspection', '质量检测'),
    body: L(
      'The pump is inspected in Xingtai before it is packed. We do not ship an unchecked machine and call it quality control.',
      '泵在邢台检测之后才包装。不会把没检的机器装车，再叫质量管控。',
    ),
  },
  {
    id: 'packing',
    title: L('Factory packing', '出厂包装'),
    body: L(
      'The finished pump is packed in Renze Industrial Park and leaves from Xingtai.',
      '成品泵在任泽工业园区包装，从邢台发出。',
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
