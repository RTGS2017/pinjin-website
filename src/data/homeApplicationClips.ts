import type { LocalizedText } from '@/i18n/types';

const L = (en: string, zh: string): LocalizedText => ({ en, zh });

export type HomeApplicationClip = {
  id: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  title: LocalizedText;
  summary: LocalizedText;
  points: LocalizedText[];
  alt: LocalizedText;
  /** Catalogue product shown in this clip’s job. */
  productSlug: string;
};

export const homeApplicationLead = L(
  'Mortar spraying, tunnel lining and wall plastering — pick the spraying machine for the job.',
  '砂浆喷涂、隧道喷浆、墙面粉墙，按现场选喷涂机。',
);

/** Copy follows the jobsite footage and the printed spraying-machine table. */
export const homeApplicationClips: HomeApplicationClip[] = [
  {
    id: 'building',
    src: '/videos/applications/building.mp4',
    poster: '/videos/applications/building.webp',
    width: 720,
    height: 1080,
    title: L('Spraying inside a building frame', '在建主体结构喷涂'),
    summary: L(
      'Crews run the hose inside an unfinished frame and spray mortar onto the floor. The 7.5/9 kW hydraulic sprayer covers that indoor hose work: 5 m³/h, 100 m horizontal / 50 m vertical, 295 kg.',
      '工人在主体结构里拉管，把砂浆打到楼面。7.5/9 kW 液压喷涂机做这类室内软管作业：5 m³/h，水平 100 m / 垂直 50 m，机重 295 kg。',
    ),
    points: [
      L('380 V, all-copper dual motors 7.5/9 kW', '380V，全铜双电机 7.5/9 kW'),
      L('5 m³/h, 8 MPa, particle ≤8 mm', '5 m³/h，8 MPa，粒径 ≤8 mm'),
      L('Hose 38/51 mm, weight 295 kg', '管径 38/51 mm，机重 295 kg'),
    ],
    alt: L(
      'Hydraulic concrete spraying machine working inside a building frame, Hebei Pinjin Machinery',
      '液压混凝土喷涂机在主体结构内作业，河北品锦机械',
    ),
    productSlug: 'hydraulic-concrete-spraying-machine',
  },
  {
    id: 'infrastructure',
    src: '/videos/applications/infrastructure.mp4',
    poster: '/videos/applications/infrastructure.webp',
    width: 720,
    height: 1080,
    title: L('Tunnel lining spray', '隧道喷浆'),
    summary: L(
      'Mortar covers the rebar mesh on a tunnel arch. The 7.5/9 kW hydraulic sprayer holds 8 MPa on that lining: 5 m³/h, hose 38/51 mm, 100 m horizontal / 50 m vertical.',
      '挂网隧道里对着拱壁喷浆，砂浆盖住钢筋网。7.5/9 kW 液压喷涂机以 8 MPa 打到挂网上：5 m³/h，管径 38/51 mm，水平 100 m / 垂直 50 m。',
    ),
    points: [
      L('380 V, all-copper dual motors 7.5/9 kW', '380V，全铜双电机 7.5/9 kW'),
      L('5 m³/h, 8 MPa, particle ≤8 mm', '5 m³/h，8 MPa，粒径 ≤8 mm'),
      L('100 m horizontal / 50 m vertical, 295 kg', '水平 100 m / 垂直 50 m，机重 295 kg'),
    ],
    alt: L(
      'Hydraulic concrete spraying machine covering a tunnel lining, Hebei Pinjin Machinery',
      '液压混凝土喷涂机做隧道挂网喷浆，河北品锦机械',
    ),
    productSlug: 'hydraulic-concrete-spraying-machine',
  },
  {
    id: 'spraying-interior',
    src: '/videos/applications/spraying-interior.mp4',
    poster: '/videos/applications/spraying-interior.webp',
    width: 720,
    height: 1080,
    title: L('Interior wall mortar spraying', '室内墙面砂浆喷涂'),
    summary: L(
      'A lance runs along the interior wall and covers the window opening in one pass. The 11/15 kW high-flow sprayer keeps mortar moving on large wall areas: 7 m³/h, hose 38/51 mm.',
      '喷枪沿室内墙面走，窗洞和阴角一次盖住。11/15 kW 大流量液压喷涂机给大面墙连续供砂浆：7 m³/h，管径 38/51 mm。',
    ),
    points: [
      L('11/15 kW dual motors, 7 m³/h', '11/15 kW 双电机，7 m³/h'),
      L('8 MPa, 150 m horizontal / 70 m vertical', '8 MPa，水平 150 m / 垂直 70 m'),
      L('Particle ≤8 mm, sand-cement ratio ≤1:3', '粒径 ≤8 mm，砂灰比 ≤1:3'),
    ],
    alt: L(
      'Interior wall mortar spraying with a high-flow hydraulic spraying machine, Hebei Pinjin Machinery',
      '大流量液压喷涂机做室内墙面砂浆喷涂，河北品锦机械',
    ),
    productSlug: 'high-flow-hydraulic-concrete-spraying-machine',
  },
  {
    id: 'handling',
    src: '/videos/applications/handling.mp4',
    poster: '/videos/applications/handling.webp',
    width: 720,
    height: 1080,
    title: L('Rural house plastering', '农房粉墙'),
    summary: L(
      'One person holds the hose and plasters a brick wall on a low-rise house. The 11/15 kW high-flow sprayer feeds that hose at 7 m³/h and 8 MPa.',
      '一人持管，给低层砖房墙面粉墙。11/15 kW 大流量液压喷涂机给粉墙软管供料：7 m³/h，8 MPa。',
    ),
    points: [
      L('One operator on the hose', '一人持管作业'),
      L('11/15 kW, 7 m³/h, 8 MPa', '11/15 kW，7 m³/h，8 MPa'),
      L('150 m horizontal / 70 m vertical', '水平 150 m / 垂直 70 m'),
    ],
    alt: L(
      'Plaster spraying on a rural brick wall with a high-flow hydraulic spraying machine, Hebei Pinjin Machinery',
      '大流量液压喷涂机给农村砖墙粉墙，河北品锦机械',
    ),
    productSlug: 'high-flow-hydraulic-concrete-spraying-machine',
  },
  {
    id: 'spraying-scaffold',
    src: '/videos/applications/spraying-scaffold.mp4',
    poster: '/videos/applications/spraying-scaffold.webp',
    width: 720,
    height: 1080,
    title: L('Scaffold shotcrete', '脚手架喷浆'),
    summary: L(
      'Spray goes onto a mesh wall from the scaffold. The double-cylinder plunger mortar sprayer does this work: 9/11 kW, 4 m³/h, 8 MPa, 100 m horizontal / 40 m vertical, 420 kg.',
      '脚手架上对挂网墙面喷浆。双缸柱塞式砂浆喷涂机做这个活：9/11 kW，4 m³/h，8 MPa，水平 100 m / 垂直 40 m，机重 420 kg。',
    ),
    points: [
      L('380 V, all-copper dual motors 9/11 kW', '380V，全铜双电机 9/11 kW'),
      L('4 m³/h, 8 MPa, particle ≤8 mm', '4 m³/h，8 MPa，粒径 ≤8 mm'),
      L('Hose 38/51 mm, weight 420 kg', '管径 38/51 mm，机重 420 kg'),
    ],
    alt: L(
      'Double-cylinder plunger mortar spraying machine on scaffolding, Hebei Pinjin Machinery',
      '双缸柱塞式砂浆喷涂机在脚手架上喷浆，河北品锦机械',
    ),
    productSlug: 'double-cylinder-plunger-mortar-spraying-machine',
  },
];
