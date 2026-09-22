import type { LocalizedText } from '@/i18n/types';

const L = (en: string): LocalizedText => ({ en });

interface ParsedSection {
  heading: LocalizedText;
  level?: 2 | 3;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
  table?: {
    headers: LocalizedText[];
    rows: LocalizedText[][];
  };
  image?: {
    src: string;
    alt: LocalizedText;
    caption?: LocalizedText;
  };
}

function splitPipes(line: string): string[] {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isSeparatorRow(line: string): boolean {
  const cells = splitPipes(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

/**
 * Convert sourced English markdown into BlogSection blocks.
 * H1 is ignored (title comes from source.json). Supports H2/H3, lists, tables, images.
 */
export function parseMarkdownToSections(markdown: string): ParsedSection[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const sections: ParsedSection[] = [];
  let current: ParsedSection | undefined;
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let tableLines: string[] = [];

  const flushParagraph = () => {
    if (!current) return;
    const text = paragraph.join(' ').replace(/\s+/g, ' ').trim();
    paragraph = [];
    if (text) current.paragraphs.push(L(text));
  };

  const flushBullets = () => {
    if (!current || bullets.length === 0) return;
    current.bullets = [...(current.bullets ?? []), ...bullets.map(L)];
    bullets = [];
  };

  const flushTable = () => {
    if (!current || tableLines.length === 0) return;
    const rows = tableLines.filter((line) => line.trim());
    tableLines = [];
    if (rows.length < 2) return;
    const headers = splitPipes(rows[0]);
    const body = rows.slice(1).filter((line) => !isSeparatorRow(line));
    current.table = {
      headers: headers.map(L),
      rows: body.map((line) => splitPipes(line).map(L)),
    };
  };

  const flushInline = () => {
    flushParagraph();
    flushBullets();
    flushTable();
  };

  const ensureSection = (heading: string, level: 2 | 3): ParsedSection => {
    flushInline();
    const next: ParsedSection = {
      heading: L(heading),
      level,
      paragraphs: [],
    };
    current = next;
    sections.push(next);
    return next;
  };

  const active = (): ParsedSection => current ?? ensureSection('Overview', 2);

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (/^#\s+/.test(trimmed) && !/^##/.test(trimmed)) {
      flushInline();
      continue;
    }

    const h2 = trimmed.match(/^##\s+(.+)$/);
    if (h2) {
      ensureSection(h2[1].trim(), 2);
      continue;
    }
    const h3 = trimmed.match(/^###\s+(.+)$/);
    if (h3) {
      ensureSection(h3[1].trim(), 3);
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (image) {
      flushInline();
      active().image = {
        src: image[2].trim(),
        alt: L(image[1].trim() || 'Pinjin product photograph'),
      };
      continue;
    }

    const caption = trimmed.match(/^\*(.+)\*$/);
    if (caption && current?.image && !current.image.caption) {
      current.image.caption = L(caption[1].trim());
      continue;
    }

    if (trimmed.startsWith('|')) {
      flushParagraph();
      flushBullets();
      active();
      tableLines.push(trimmed);
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      flushTable();
      active();
      bullets.push(bullet[1].trim());
      continue;
    }

    if (!trimmed) {
      flushInline();
      continue;
    }

    flushBullets();
    flushTable();
    active();
    paragraph.push(trimmed);
  }

  flushInline();
  return sections.filter(
    (section) =>
      section.paragraphs.length > 0 ||
      (section.bullets && section.bullets.length > 0) ||
      Boolean(section.table) ||
      Boolean(section.image),
  );
}
