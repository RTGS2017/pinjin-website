# -*- coding: utf-8 -*-
"""Batch-3: fix catalogue facts, write zh/pt/ar/ru, append QA 51–100."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCED = ROOT / "content" / "sourced"
LANGS = ("zh", "pt", "ar", "ru")
ALL_LANGS = ["en", "zh", "pt", "ar", "ru"]

# Longest-first phrase table: en -> (zh, pt, ar, ru)
PHRASES: list[tuple[str, tuple[str, str, str, str]]] = []


def P(en: str, zh: str, pt: str, ar: str, ru: str) -> None:
    PHRASES.append((en, (zh, pt, ar, ru)))


def build_phrases() -> None:
    P("Hebei Pinjin Machinery", "河北品锦机械", "Hebei Pinjin Machinery", "Hebei Pinjin Machinery", "Hebei Pinjin Machinery")
    P("Xingtai factory catalogue", "邢台工厂目录", "catálogo da fábrica de Xingtai", "كتالوج مصنع شينغتاي", "каталог завода в Синтае")
    P("catalogue cell", "目录单元格", "célula de catálogo", "خلية الكتالوج", "ячейка каталога")
    P("catalogue cells", "目录单元格", "células de catálogo", "خلايا الكتالوج", "ячейки каталога")
    P("catalogue row", "目录行", "linha de catálogo", "صف الكتالوج", "строка каталога")
    P("product page", "产品页", "página do produto", "صفحة المنتج", "страница изделия")
    P("delivery pipe", "输送管", "tubo de entrega", "أنبوب النقل", "бетоновод")
    P("Delivery pipe", "输送管", "Tubo de entrega", "أنبوب النقل", "Бетоновод")
    P("rubber hose", "橡胶软管", "mangueira de borracha", "خرطوم مطاطي", "резиновый рукав")
    P("Rubber hose", "橡胶软管", "Mangueira de borracha", "خرطوم مطاطي", "Резиновый рукав")
    P("delivery hose", "输送胶管", "mangueira de entrega", "خرطوم النقل", "рукав подачи")
    P("pipe clamp", "管卡", "abraçadeira de tubo", "مشبك الأنبوب", "хомут трубопровода")
    P("S-valve", "S阀", "válvula S", "صمام S", "S-клапан")
    P("S-tube", "S管", "tubo S", "أنبوب S", "S-труба")
    P("hopper grate", "料斗格栅", "grelha da tremonha", "شبكة القادوس", "решётка бункера")
    P("hopper grille", "料斗格栅", "grelha da tremonha", "شبكة القادوس", "решётка бункера")
    P("placing line", "浇筑管路", "linha de lançamento", "خط الصب", "линия укладки")
    P("Portland cement", "硅酸盐水泥", "cimento Portland", "أسمنت بورتلاند", "портландцемент")
    P("never open a coupling under pressure", "禁止在带压时打开管接头", "nunca abra um acoplamento sob pressão", "لا تفتح الوصلة تحت الضغط", "не открывать соединение под давлением")
    P("residual pressure", "残余压力", "pressão residual", "ضغط متبقٍ", "остаточное давление")
    P("safety chain", "安全链", "corrente de segurança", "سلسلة أمان", "страховочная цепь")
    P("confined-space", "受限空间", "espaço confinado", "مكان محصور", "замкнутое пространство")
    P("highway homologation", "公路认证", "homologação rodoviária", "اعتماد الطريق", "дорожная омологация")
    P("theoretical output", "理论输送量", "saída teórica", "الإنتاج النظري", "теоретическая производительность")
    P("Motor Power", "电机功率", "Potência do motor", "قدرة المحرك", "Мощность двигателя")
    P("fine stone", "细石", "pedra fina", "حصى ناعم", "мелкий камень")
    P("fine-stone", "细石", "pedra fina", "حصى ناعم", "мелкий камень")
    P("mortar sprayer", "砂浆喷涂机", "pulverizador de argamassa", "رشاش الملاط", "растворонасос")
    P("trailer pump", "拖式泵", "bomba reboque", "مضخة مقطورة", "прицепной насос")
    P("boom pump", "臂架泵", "bomba lança", "مضخة ذراع", "автобетононасос со стрелой")
    P("mixer pump", "搅拌泵", "bomba misturadora", "مضخة خلاط", "бетононасос-миксер")
    P("wear parts", "易损件", "peças de desgaste", "قطع التآكل", "быстроизнашивающиеся детали")
    P("spare parts", "配件", "peças de reposição", "قطع الغيار", "запасные части")
    P("broken braid", "露出的编织层", "trama rompida", "الضفيرة المكسورة", "оборванная оплётка")
    P("outlet pressure", "出口压力", "pressão de saída", "ضغط المخرج", "давление на выходе")
    P("horizontal", "水平", "horizontal", "أفقي", "горизонталь")
    P("vertical", "垂直", "vertical", "عمودي", "вертикаль")
    P("aggregate", "骨料", "agregado", "ركام", "заполнитель")
    P("formwork", "模板", "forma", "شدات", "опалубка")
    P("masonry", "砌体", "alvenaria", "بناء حجري", "кладка")
    P("retaining wall", "挡土墙", "muro de contenção", "جدار استنادي", "подпорная стена")
    P("basement", "地下室", "porão", "قبو", "подвал")
    P("underground", "地下", "subterrâneo", "تحت الأرض", "подземный")
    P("three-phase", "三相", "trifásico", "ثلاثي الطور", "трёхфазный")
    P("Inquiry", "询价", "Consulta", "استفسار", "Запрос")
    P("Contact", "联系", "Contato", "اتصل", "Контакт")
    P("do not invent", "不要编造", "não invente", "لا تختلق", "не выдумывать")
    P("is not printed", "未公布", "não está impresso", "غير مطبوع", "не напечатано")
    P("is not listed", "未列入目录", "não está listado", "غير مدرج", "не указано")
    P("marketplace observation", "平台观察", "observação de marketplace", "ملاحظة من السوق", "наблюдение маркетплейса")
    P("Alibaba", "Alibaba", "Alibaba", "Alibaba", "Alibaba")
    P("ACPA", "ACPA", "ACPA", "ACPA", "ACPA")
    P("ACI 304.2R", "ACI 304.2R", "ACI 304.2R", "ACI 304.2R", "ACI 304.2R")
    P("Electric 15", "电动15", "Electric 15", "Electric 15", "Electric 15")
    P("Electric 20", "电动20", "Electric 20", "Electric 20", "Electric 20")
    P("Electric 30", "电动30", "Electric 30", "Electric 30", "Electric 30")
    P("Electric 40", "电动40", "Electric 40", "Electric 40", "Electric 40")
    P("Electric 80", "电动80", "Electric 80", "Electric 80", "Electric 80")
    P("Diesel 30", "柴油30", "Diesel 30", "Diesel 30", "Diesel 30")
    P("Diesel 40", "柴油40", "Diesel 40", "Diesel 40", "Diesel 40")
    P("B500S-83D", "B500S-83D", "B500S-83D", "B500S-83D", "B500S-83D")
    P("B500S", "B500S", "B500S", "B500S", "B500S")
    P("HBT8018", "HBT8018", "HBT8018", "HBT8018", "HBT8018")
    P("DN80", "DN80", "DN80", "DN80", "DN80")
    P("EN 14420-3", "EN 14420-3", "EN 14420-3", "EN 14420-3", "EN 14420-3")
    P("PN10 / PN16", "PN10 / PN16", "PN10 / PN16", "PN10 / PN16", "PN10 / PN16")
    P("Xingtai", "邢台", "Xingtai", "شينغتاي", "Синтай")
    P("Pinjin", "品锦", "Pinjin", "Pinjin", "Pinjin")
    PHRASES.sort(key=lambda item: len(item[0]), reverse=True)


HEADINGS: dict[str, tuple[str, str, str, str]] = {
    "Why the line needs a film before concrete": ("为何泵送前管路需要润滑膜", "Por que a linha precisa de filme antes do concreto", "لماذا يحتاج الخط إلى طبقة قبل الخرسانة", "Зачем линии нужна плёнка до бетона"),
    "What we will and will not quote": ("我们报价与不报价的范围", "O que cotamos e o que não cotamos", "ما نسعّره وما لا نسعّره", "Что мы котируем и чего нет"),
    "Blockage is not “push harder”": ("堵管不是加压硬顶", "Entupimento não é “empurrar mais forte”", "الانسداد ليس «ادفع بقوة أكبر»", "Засор — это не «давить сильнее»"),
    "Inquiry": ("询价", "Consulta", "استفسار", "Запрос"),
    "Turbulence at the taper — ACPA, not a Pinjin SKU": ("变径处的紊流——ACPA，不是品锦料号", "Turbulência no redutor — ACPA, não um SKU Pinjin", "اضطراب عند المخروط — ACPA وليس رقم قطعة من بينجين", "Турбулентность на конусе — ACPA, не артикул Pinjin"),
    "DN we actually print": ("我们实际公布的管径", "DN que realmente imprimimos", "أقطار DN التي نطبعها فعلاً", "DN, которые мы реально печатаем"),
    "If a plug forms at a diameter change": ("变径处堵管时先看哪里", "Se o tampão aparece na mudança de diâmetro", "إذا تكوّن انسداد عند تغيير القطر", "Если пробка на смене диаметра"),
    "The one clamp SKU we print": ("我们公布的唯一管卡料号", "O único SKU de abraçadeira que imprimimos", "رقم مشبك الأنبوب الوحيد الذي نطبعه", "Единственный SKU хомута в каталоге"),
    "ACPA: daily inspect, never open pressurised": ("ACPA：每日检查，禁止带压打开", "ACPA: inspeção diária, nunca abra pressurizado", "ACPA: فحص يومي، لا تفتح تحت الضغط", "ACPA: ежедневный осмотр, не открывать под давлением"),
    "Pipe, hose and quantity": ("钢管、胶管与数量", "Tubo, mangueira e quantidade", "الأنبوب والخرطوم والكمية", "Труба, рукав и количество"),
    "Marketplace “basement pump” vs listed cells": ("平台“地下室泵”与已列目录单元格", "“Bomba para porão” no marketplace vs células listadas", "مضخة القبو في السوق مقابل الخلايا المدرجة", "«Насос для подвала» на маркетплейсе и ячейки каталога"),
    "Power and air — what is not in the catalogue": ("电源与通风——目录未列项", "Energia e ar — o que não está no catálogo", "الطاقة والهواء — ما ليس في الكتالوج", "Питание и воздух — чего нет в каталоге"),
    "Mix and distance": ("配合比与距离", "Mistura e distância", "الخلطة والمسافة", "Смесь и расстояние"),
    "Placing grout or fine-stone — not spraying mortar": ("泵送灌浆或细石——不是喷涂砂浆", "Lançar grout ou pedra fina — não pulverizar argamassa", "صب الجراوت أو الحصى الناعم — وليس رش الملاط", "Укладка раствора или мелкого камня — не торкрет"),
    "Listed rows that buyers actually compare": ("买家实际对照的目录行", "Linhas listadas que os compradores comparam", "الصفوف المدرجة التي يقارنها المشترون", "Строки каталога, которые сравнивают покупатели"),
    "Printed mass and envelope — not a road-legal kit": ("已公布重量与外形——不是公路合法套件", "Massa e envelope impressos — não um kit rodoviário", "الكتلة والغلاف المطبوعان — وليسا طقم طريق قانوني", "Печатная масса и габарит — не дорожный комплект"),
    "ACPA hitch practice vs Pinjin drawings": ("ACPA挂接做法与品锦图纸", "Prática de engate ACPA vs desenhos Pinjin", "ممارسة الربط لدى ACPA مقابل رسومات بينجين", "Практика сцепки ACPA и чертежи Pinjin"),
    "Two cells on the same row": ("同一目录行上的两个单元格", "Duas células na mesma linha", "خليتان في الصف نفسه", "Две ячейки в одной строке"),
    "Grid and diesel": ("电网与柴油", "Rede e diesel", "الشبكة والديزل", "Сеть и дизель"),
    "Marketplace hours are not a Xingtai cell": ("平台小时数不是邢台目录单元格", "Horas de marketplace não são uma célula de Xingtai", "ساعات السوق ليست خلية كتالوج شينغتاي", "Часы с маркетплейса — не ячейка Синтая"),
    "What we quote vs what we will not invent": ("我们报价与绝不编造的内容", "O que cotamos vs o que não inventamos", "ما نسعّره مقابل ما لا نختلقه", "Что котируем и чего не выдумываем"),
    "Vertical metres, not a slope-angle SKU": ("垂直米数，不是坡度角料号", "Metros verticais, não um SKU de ângulo de talude", "أمتار رأسية وليست رقم زاوية ميل", "Вертикальные метры, не артикул угла склона"),
    "Line, mix and move": ("管路、配合比与移位", "Linha, mistura e deslocamento", "الخط والخلطة والنقل", "Линия, смесь и перемещение"),
    "Grate first — ACPA, not a RPM table": ("先看格栅——ACPA，不是转速表", "Grelha primeiro — ACPA, não tabela de RPM", "الشبكة أولاً — ACPA وليس جدول دورات", "Сначала решётка — ACPA, не таблица об/мин"),
    "Compact rows still have a grate": ("紧凑机型同样有格栅", "Linhas compactas ainda têm grelha", "الصفوف المدمجة لا تزال لها شبكة", "У компактных рядов тоже есть решётка"),
}


def protect(text: str) -> tuple[str, list[str]]:
    held: list[str] = []

    def stash(match: re.Match[str]) -> str:
        held.append(match.group(0))
        return f"\u0000{len(held)-1}\u0000"

    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", stash, text)
    text = re.sub(r"\[[^\]]+\]\([^)]+\)", stash, text)
    text = re.sub(r"https?://[^\s)]+", stash, text)
    return text, held


def restore(text: str, held: list[str]) -> str:
    for i, value in enumerate(held):
        text = text.replace(f"\u0000{i}\u0000", value)
    return text


def translate_plain(text: str, lang_index: int) -> str:
    if not text.strip():
        return text
    heading = HEADINGS.get(text.strip())
    if heading:
        return heading[lang_index]
    protected, held = protect(text)
    for en, bundle in PHRASES:
        if en in protected:
            protected = protected.replace(en, bundle[lang_index])
    return restore(protected, held)


def translate_markdown(md: str, lang_index: int) -> str:
    out: list[str] = []
    for line in md.splitlines():
        if not line.strip():
            out.append(line)
            continue
        if line.startswith("## "):
            title = line[3:].strip()
            out.append("## " + translate_plain(title, lang_index))
            continue
        if line.startswith("|") and set(line.replace("|", "").strip()) <= set("-: "):
            out.append(line)
            continue
        if line.startswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            out.append("| " + " | ".join(translate_plain(c, lang_index) for c in cells) + " |")
            continue
        if line.startswith("- "):
            out.append("- " + translate_plain(line[2:], lang_index))
            continue
        if line.startswith("*") and not line.startswith("*Electric") and line.startswith("*") and line.endswith("*"):
            out.append("*" + translate_plain(line.strip("*"), lang_index) + "*")
            continue
        if line.startswith("!["):
            m = re.match(r"!\[([^\]]*)\]\(([^)]+)\)", line)
            if m:
                out.append(f"![{translate_plain(m.group(1), lang_index)}]({m.group(2)})")
                continue
        out.append(translate_plain(line, lang_index))
    return "\n".join(out) + ("\n" if md.endswith("\n") else "")


def translate_obj(value, lang_index: int):
    if isinstance(value, str):
        return translate_plain(value, lang_index)
    if isinstance(value, list):
        return [translate_obj(item, lang_index) for item in value]
    if isinstance(value, dict):
        return {k: translate_obj(v, lang_index) for k, v in value.items()}
    return value


def dump_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def apply_pairs(text: str, pairs: list[tuple[str, str]]) -> str:
    for old, new in pairs:
        if text == old:
            text = new
        elif old in text and new not in text:
            text = text.replace(old, new)
    return text


def fix_new_en() -> None:
    replacements = [
        ("b500s-fine-stone-pump", "b500s-83d-two-stage-pump"),
        ("/products/concrete-pump-s-valve/", "/products/concrete-pump-s-tube-seal/"),
        ("concrete-pump-s-valve", "concrete-pump-s-tube-seal"),
        ("/products/concrete-pump-piston/", "/products/concrete-pump-split-piston/"),
        ("concrete-pump-piston", "concrete-pump-split-piston"),
        ("/products/concrete-pump-rubber-hose/", "/products/concrete-pump-delivery-hose/"),
        ("concrete-pump-rubber-hose", "concrete-pump-delivery-hose"),
        ("/products/carbide-spectacles-plate/", "/products/concrete-pump-s-tube-seal/"),
        ("carbide-spectacles-plate", "concrete-pump-s-tube-seal"),
        ("mini-concrete-pump-narrow-access", "mini-concrete-pump-narrow-space"),
        ("electric-vs-diesel-grid-choice", "electric-vs-diesel-concrete-pump-grid-sites"),
        ("high-rise-concrete-pump-selection", "high-rise-building-concrete-pump-selection"),
        ("/blog/concrete-pump-vs-mortar-sprayer/", "/blog/fine-stone-concrete-pump-vs-mortar-sprayer/"),
        ("concrete-pump-vs-mortar-sprayer", "fine-stone-concrete-pump-vs-mortar-sprayer"),
        ("/blog/secondary-structure-concrete-pump/", "/blog/secondary-structure-concrete-pump-column-beam/"),
        ("secondary-structure-concrete-pump", "secondary-structure-concrete-pump-column-beam"),
        ("concrete-pump-aggregate-size-selection", "fine-stone-concrete-pump-aggregate-size"),
        ("trailer-vs-boom-concrete-pump", "trailer-concrete-pump-vs-boom-pump"),
        ("concrete-pump-output-m3h-selection", "concrete-pump-output-m3h-guide"),
        ("electric-15-vs-electric-20-concrete-pump", "electric-20-vs-30-concrete-pump"),
        ("concrete-pump-spare-parts-list", "concrete-pump-spare-parts-wear-parts"),
        ("vertical-vs-horizontal-pumping-distance", "concrete-pump-vertical-vs-horizontal-distance"),
        ("gallery-01.webp", "main.webp"),
        ("gallery-02.webp", "main.webp"),
        ("https://pinjinpump.com/en/products/b500s-fine-stone-pump/", "https://pinjinpump.com/en/products/b500s-83d-two-stage-pump/"),
        ("https://pinjinpump.com/en/products/concrete-pump-s-valve/", "https://pinjinpump.com/en/products/concrete-pump-s-tube-seal/"),
        ("https://pinjinpump.com/en/products/concrete-pump-piston/", "https://pinjinpump.com/en/products/concrete-pump-split-piston/"),
        ("https://pinjinpump.com/en/products/concrete-pump-rubber-hose/", "https://pinjinpump.com/en/products/concrete-pump-delivery-hose/"),
    ]
    new_slugs = [
        "concrete-pump-priming-grout-lubrication",
        "concrete-pump-reducer-taper-pipe",
        "concrete-pump-clamp-coupling",
        "concrete-pump-for-basement-underground",
        "concrete-pump-for-masonry-formwork",
        "trailer-concrete-pump-towing-chassis",
        "concrete-pump-motor-kw-vs-output",
        "concrete-pump-wear-parts-replacement-interval",
        "concrete-pump-for-slope-retaining-wall",
        "concrete-pump-hopper-grille-agitator",
    ]
    for slug in new_slugs:
        folder = SOURCED / slug
        for name in ("source.json", "content.md"):
            path = folder / name
            text = apply_pairs(path.read_text(encoding="utf-8"), replacements)
            path.write_text(text, encoding="utf-8")

    # Catalogue number fixes (only in the new batch).
    specific = {
        "trailer-concrete-pump-towing-chassis": [
            ("2100×1100×1400", "2800 × 1300 × 1500"),
            ("3000×1450×1400", "3300 × 1500 × 1500"),
            ("3000×1450×1600", "3900 × 1500 × 1600"),
            ("4500×1600×1700", "6600 × 1800 × 1800"),
            ("Electric 30 1100 kg", "Electric 30 1200 kg"),
            ("Electric 30 1100 kg, 3000", "Electric 30 1200 kg, 3300"),
            ("Diesel 30 lists 1100 kg", "Diesel 30 lists 2000 kg"),
            ("HBT8018 lists 7000 kg", "HBT8018 lists 6500 kg"),
            ("1100 kg", "1200 kg"),  # remaining Electric 30 mass in this folder after diesel fix order
        ],
        "concrete-pump-motor-kw-vs-output": [
            ("| 30 kW | 21 m³/h | 1100 kg |", "| 30 kW | 12–15 m³/h | 1200 kg |"),
            ("| 90 kW | 45 m³/h | 6000 kg |", "| 110 kW | 60 m³/h | 6000 kg |"),
            ("| 132 kW | 60 m³/h | 7000 kg |", "| 132 kW | 60 m³/h | 6500 kg |"),
        ],
        "concrete-pump-for-basement-underground": [
            ("3 kW, 3–4 m³/h, 5 m / 5 m, aggregate 10 mm, 280 kg", "7.5 kW, 5 m / 5 m, sand and small stone 5–16 mm, 280 kg, 915 × 550 × 550 mm"),
            ("280 kg, 5 m / 5 m, 3 kW", "280 kg, 5 m / 5 m, 7.5 kW"),
            ("B500S is 3 kW", "B500S-83D is 7.5 kW"),
            ("3–4 m³/h, aggregate 10 mm", "sand and small stone 5–16 mm (no m³/h cell on this row)"),
            ("Diesel 30 at 1100 kg", "Diesel 30 at 2000 kg"),
            ("900 kg, 2100×1100×1400 mm", "900 kg, 2800 × 1300 × 1500 mm"),
            ("280 kg, 3 kW, 5 m horizontal / 5 m vertical, 3–4 m³/h, aggregate 10 mm", "280 kg, 7.5 kW, 5 m / 5 m, 5–16 mm, 915 × 550 × 550 mm"),
        ],
        "concrete-pump-for-masonry-formwork": [
            ("3 kW, 3–4 m³/h, 10 mm aggregate, 5 m / 5 m", "7.5 kW, 5–16 mm, 5 m / 5 m, 280 kg"),
            ("3 kW, 3–4 m³/h, 5 m / 5 m, 10 mm, 280 kg", "7.5 kW, 5 m / 5 m, 5–16 mm, 280 kg, 915 × 550 × 550 mm"),
            ("3–4 m³/h, 10 mm aggregate, 5 m / 5 m, 280 kg", "7.5 kW, 5 m / 5 m, sand and small stone 5–16 mm, 280 kg"),
            ("aggregate 10 mm, 5 m / 5 m", "5–16 mm, 5 m / 5 m"),
            ("3 kW, 3–4 m³/h, aggregate 10 mm, 5 m / 5 m", "7.5 kW, 5–16 mm, 5 m / 5 m"),
            ("B500S — 3 kW", "B500S-83D — 7.5 kW"),
            ("lists 3–4 m³/h, 10 mm aggregate", "lists 7.5 kW, 5–16 mm"),
        ],
        "concrete-pump-for-slope-retaining-wall": [
            ("Diesel 40 is the diesel twin of that output band", "Diesel 40 lists 66 kW, 26 m³/h, 120 m / 360 m — a diesel row, not an Electric 40 twin"),
            ("diesel row in that output band", "diesel row (26 m³/h, 66 kW, 120 m / 360 m)"),
        ],
    }
    # Apply specific replacements in reverse-size where 1100 kg on towing would hit diesel after we already changed diesel sentence.
    towing = SOURCED / "trailer-concrete-pump-towing-chassis"
    for name in ("source.json", "content.md"):
        path = towing / name
        text = path.read_text(encoding="utf-8")
        text = text.replace("Electric 20 900 kg, 2100×1100×1400 mm", "Electric 20 900 kg, 2800 × 1300 × 1500 mm")
        text = text.replace("Electric 30 1100 kg, 3000×1450×1400 mm", "Electric 30 1200 kg, 3300 × 1500 × 1500 mm")
        text = text.replace("Electric 40 2300 kg, 3000×1450×1600 mm", "Electric 40 2300 kg, 3900 × 1500 × 1600 mm")
        text = text.replace("Electric 80 6000 kg, 4500×1600×1700 mm", "Electric 80 6000 kg, 6600 × 1800 × 1800 mm")
        text = text.replace("Electric 80 lists 6000 kg and 4500×1600×1700 mm", "Electric 80 lists 6000 kg and 6600 × 1800 × 1800 mm")
        text = text.replace("| 900 kg | 2100×1100×1400 |", "| 900 kg | 2800 × 1300 × 1500 |")
        text = text.replace("| 1100 kg | 3000×1450×1400 |", "| 1200 kg | 3300 × 1500 × 1500 |")
        text = text.replace("| 2300 kg | 3000×1450×1600 |", "| 2300 kg | 3900 × 1500 × 1600 |")
        text = text.replace("| 6000 kg | 4500×1600×1700 |", "| 6000 kg | 6600 × 1800 × 1800 |")
        text = text.replace("Diesel 30 lists 1100 kg. HBT8018 lists 7000 kg.", "Diesel 30 lists 2000 kg. HBT8018 lists 6500 kg.")
        text = text.replace("2300 kg, 3000×1450×1600 mm", "2300 kg, 3900 × 1500 × 1600 mm")
        path.write_text(text, encoding="utf-8")

    for slug, pairs in specific.items():
        if slug == "trailer-concrete-pump-towing-chassis":
            continue
        folder = SOURCED / slug
        for name in ("source.json", "content.md"):
            path = folder / name
            text = path.read_text(encoding="utf-8")
            for old, new in pairs:
                text = text.replace(old, new)
            path.write_text(text, encoding="utf-8")

    # Wear-parts: drop duplicate spectacles after slug remap to s-tube-seal twice.
    wear_md = SOURCED / "concrete-pump-wear-parts-replacement-interval" / "content.md"
    text = wear_md.read_text(encoding="utf-8")
    text = text.replace(
        "- [Spectacles plate](/products/concrete-pump-s-tube-seal/): carbide wear face; still no hour cell.\n",
        "- [S-tube seal](/products/concrete-pump-s-tube-seal/): listed wear SKU; still no hour cell.\n",
    )
    wear_md.write_text(text, encoding="utf-8")


def patch_related() -> None:
    extras = {
        "concrete-pump-blockage-causes-prevention": [
            "concrete-pump-priming-grout-lubrication",
            "concrete-pump-reducer-taper-pipe",
            "concrete-pump-clamp-coupling",
        ],
        "concrete-pump-spare-parts-wear-parts": [
            "concrete-pump-wear-parts-replacement-interval",
            "concrete-pump-clamp-coupling",
        ],
        "mini-concrete-pump-narrow-space": ["concrete-pump-for-basement-underground"],
        "concrete-pump-output-m3h-guide": ["concrete-pump-motor-kw-vs-output"],
        "trailer-concrete-pump-vs-boom-pump": ["trailer-concrete-pump-towing-chassis"],
        "concrete-pump-vertical-vs-horizontal-distance": ["concrete-pump-for-slope-retaining-wall"],
        "concrete-pump-hopper-capacity": ["concrete-pump-hopper-grille-agitator"],
        "fine-stone-concrete-pump-vs-mortar-sprayer": ["concrete-pump-for-masonry-formwork"],
        "electric-vs-diesel-concrete-pump-grid-sites": ["concrete-pump-motor-kw-vs-output"],
        "concrete-pump-hose-vs-steel-pipe": [
            "concrete-pump-reducer-taper-pipe",
            "concrete-pump-clamp-coupling",
        ],
        "concrete-pump-daily-maintenance-checklist": [
            "concrete-pump-hopper-grille-agitator",
            "concrete-pump-priming-grout-lubrication",
        ],
    }
    for slug, add in extras.items():
        src = SOURCED / slug / "source.json"
        if not src.is_file():
            # knowledge TS article — skip JSON
            continue
        data = json.loads(src.read_text(encoding="utf-8"))
        related = list(data.get("relatedArticleSlugs") or [])
        for item in add:
            if item not in related:
                related.append(item)
        data["relatedArticleSlugs"] = related
        dump_json(src, data)


def write_i18n_for_sourced() -> None:
    for folder in sorted(SOURCED.iterdir()):
        src = folder / "source.json"
        md = folder / "content.md"
        if not src.is_file() or not md.is_file():
            continue
        data = json.loads(src.read_text(encoding="utf-8"))
        data["availableLangs"] = ALL_LANGS
        english_md = md.read_text(encoding="utf-8")
        i18n = {}
        for idx, lang in enumerate(LANGS):
            (folder / f"content.{lang}.md").write_text(
                translate_markdown(english_md, idx), encoding="utf-8"
            )
            pack = {
                "title": translate_plain(data["title"], idx),
                "description": translate_plain(data["description"], idx),
                "imageAlt": translate_plain(data.get("image", {}).get("alt", ""), idx),
                "relatedPathLabels": [
                    translate_plain(item.get("label", ""), idx) for item in data.get("relatedPaths", [])
                ],
                "answerBlock": {
                    "what": translate_plain(data["answerBlock"]["what"], idx),
                    "who": translate_plain(data["answerBlock"]["who"], idx),
                    "factors": [translate_plain(f, idx) for f in data["answerBlock"].get("factors", [])],
                },
            }
            if data.get("seoTitle"):
                pack["seoTitle"] = translate_plain(data["seoTitle"], idx)
            if data.get("image", {}).get("caption"):
                pack["imageCaption"] = translate_plain(data["image"]["caption"], idx)
            if data.get("faqs"):
                pack["faqs"] = [
                    {
                        "question": translate_plain(item["question"], idx),
                        "answer": translate_plain(item["answer"], idx),
                    }
                    for item in data["faqs"]
                ]
            i18n[lang] = pack
        data["i18n"] = i18n
        dump_json(src, data)


SRC = {
    "acpa_study": {
        "name": "ACPA study guide: clamps, gaskets, priming, reducers",
        "url": "http://www.concretepumpers.com/sites/www.concretepumpers.com/files/study_guide.pdf",
        "type": "industry",
    },
    "acpa_water": {
        "name": "ACPA revises its statement on water priming (23 July 2020)",
        "url": "https://www.concretepumpers.com/acpa-news/2020/07/23/acpa-revises-its-statement-water-priming",
        "type": "industry",
    },
    "aci": {
        "name": "ACI 304.2R-17 placing by pump (preview)",
        "url": "https://www.concrete.org/Portals/0/Files/PDF/Previews/304.2R-17_preview.pdf",
        "type": "industry",
    },
    "alibaba_bg": {
        "name": "Alibaba buying guide: concrete pump machine",
        "url": "https://smartbuy.alibaba.com/buyingguides/concrete-pump-machine",
        "type": "marketplace",
    },
}


def qa(qid: str, question: str, answer: str, source: dict, kind: str, slug: str, in_article: bool = False) -> dict:
    item = {
        "id": qid,
        "question": question,
        "answer": answer,
        "source": source,
        "mount": {"kind": kind, "slug": slug},
    }
    if in_article:
        item["inArticleFaqs"] = True
    return item


def build_qa() -> list[dict]:
    e15 = {"name": "Pinjin Electric 15 product page", "url": "https://pinjinpump.com/en/products/electric-15-concrete-pump/", "type": "pinjin"}
    e20 = {"name": "Pinjin Electric 20 product page", "url": "https://pinjinpump.com/en/products/electric-20-concrete-pump/", "type": "pinjin"}
    e40 = {"name": "Pinjin Electric 40 product page", "url": "https://pinjinpump.com/en/products/electric-40-concrete-pump/", "type": "pinjin"}
    e80 = {"name": "Pinjin Electric 80 product page", "url": "https://pinjinpump.com/en/products/electric-80-concrete-pump/", "type": "pinjin"}
    e30 = {"name": "Pinjin Electric 30 product page", "url": "https://pinjinpump.com/en/products/electric-30-concrete-pump/", "type": "pinjin"}
    b500 = {"name": "Pinjin B500S-83D product page", "url": "https://pinjinpump.com/en/products/b500s-83d-two-stage-pump/", "type": "pinjin"}
    clamp = {"name": "Pinjin DN80 pipe clamp product page", "url": "https://pinjinpump.com/en/products/concrete-pump-pipe-clamp-dn80/", "type": "pinjin"}
    pipe = {"name": "Pinjin delivery pipe product page", "url": "https://pinjinpump.com/en/products/concrete-pump-delivery-pipe/", "type": "pinjin"}
    hose = {"name": "Pinjin delivery hose product page", "url": "https://pinjinpump.com/en/products/concrete-pump-delivery-hose/", "type": "pinjin"}
    piston = {"name": "Pinjin split piston product page", "url": "https://pinjinpump.com/en/products/concrete-pump-split-piston/", "type": "pinjin"}
    seal = {"name": "Pinjin S-tube seal product page", "url": "https://pinjinpump.com/en/products/concrete-pump-s-tube-seal/", "type": "pinjin"}
    d40 = {"name": "Pinjin Diesel 40 product page", "url": "https://pinjinpump.com/en/products/diesel-40-concrete-pump/", "type": "pinjin"}
    mix = {"name": "Pinjin integrated mixer pump product page", "url": "https://pinjinpump.com/en/products/integrated-mixer-pump/", "type": "pinjin"}
    hbt = {"name": "Pinjin HBT8018 product page", "url": "https://pinjinpump.com/en/products/hbt8018-concrete-pump/", "type": "pinjin"}
    rural = {"name": "Pinjin rural diesel concrete pump product page", "url": "https://pinjinpump.com/en/products/rural-diesel-concrete-pump/", "type": "pinjin"}
    items = [
        qa("qa-51", "Can I prime a Pinjin trailer pump with water instead of grout?",
           "ACPA (23 July 2020): always prime the pump and placing line before concrete; the preferred primer is a thin Portland-cement slurry. In most cases ACPA does not recommend water priming. Pinjin does not publish a factory primer recipe or sack count.",
           SRC["acpa_water"], "blog", "concrete-pump-priming-grout-lubrication", True),
        qa("qa-52", "Does the catalogue list how many cement sacks to prime Electric 40?",
           "No. Electric 40 lists 45 kW, 21 m³/h, 23 MPa, hopper 0.4 m³ and fine-stone 120 m / 360 m. Primer volume is not a catalogue cell.",
           e40, "blog", "concrete-pump-priming-grout-lubrication", True),
        qa("qa-53", "Does Pinjin sell a catalogue concrete pump reducer?",
           "No reducer or taper-pipe SKU is listed. We quote straight delivery pipe, DN80 clamps and hoses after size and quantity. A marketplace reducer listing is not a Pinjin table.",
           pipe, "blog", "concrete-pump-reducer-taper-pipe", True),
        qa("qa-54", "Where should I look first if the line plugs after a diameter change?",
           "ACPA: a reducer is usually the first place to look. Relieve pressure before opening any coupling. Do not use compressed air to force a plug.",
           SRC["acpa_study"], "blog", "concrete-pump-reducer-taper-pipe", True),
        qa("qa-55", "Which clamp SKU does Pinjin list on the website?",
           "DN80, EN 14420-3, PN10 / PN16, 3.5 kg. Electric 20 lists 80 mm pipe. Other diameters are quoted against the pipeline after the pump model.",
           clamp, "blog", "concrete-pump-clamp-coupling", True),
        qa("qa-56", "Can I open a coupling to check a plug while the line is still pressurised?",
           "No. ACPA: never open a coupling until residual pressure is relieved. Compressed air is not a cleaning method we recommend from this article.",
           SRC["acpa_study"], "blog", "concrete-pump-clamp-coupling", True),
        qa("qa-57", "Is Electric 15 a certified confined-space basement pump?",
           "No such certificate is printed. Electric 15 is 450 kg, 1900×900×1200 mm, 15 kW, 380V 50Hz. Measure the opening and the lift, then inquire with the slug.",
           e15, "blog", "concrete-pump-for-basement-underground", True),
        qa("qa-58", "Is B500S-83D enough for a basement slab?",
           "B500S-83D lists 280 kg, 7.5 kW, 5 m / 5 m, sand and small stone 5–16 mm, 915 × 550 × 550 mm. That is not a coarse-stone basement-slab guarantee. If distance exceeds 5 m, look at Electric 15 (8–10 m³/h, 60–80 m / 15–20 m).",
           b500, "blog", "concrete-pump-for-basement-underground", True),
        qa("qa-59", "Is a Pinjin mortar sprayer the right machine to fill masonry cores with grout?",
           "Usually no. Mortar sprayers on this site are for plaster and mortar spray. Filling cores or formwork with pumpable grout or fine-stone is a placing job. Start from B500S-83D or Electric 15.",
           b500, "blog", "concrete-pump-for-masonry-formwork", True),
        qa("qa-60", "Does the masonry article replace the secondary-structure column page?",
           "No. Secondary-structure already covers small columns and infill. The masonry page is cores and formwork filling: match aggregate, prime the line, quote the compact row.",
           SRC["aci"], "blog", "concrete-pump-for-masonry-formwork", True),
        qa("qa-61", "Can I tow Electric 80 on a public road with a pickup?",
           "Electric 80 lists 6000 kg and 6600 × 1800 × 1800 mm. Pinjin does not print a hitch class, CDL or highway towing certificate. Whether a pickup is legal is a local-road question, not a factory cell.",
           e80, "blog", "trailer-concrete-pump-towing-chassis", True),
        qa("qa-62", "Is Electric 15 light enough to manhandle on a slab?",
           "Electric 15 lists 450 kg and 1900×900×1200 mm. That is catalogue mass, not a two-person lift rating.",
           e15, "blog", "trailer-concrete-pump-towing-chassis", True),
        qa("qa-63", "If Electric 20 has more kW, why does it list the same 8–10 m³/h as Electric 15?",
           "Output and motor power are separate catalogue cells. Electric 15 is 15 kW, 450 kg, 100–125 mm pipe. Electric 20 is 22 kW, 900 kg, 80 mm pipe. We do not publish an efficiency ratio that turns 22 kW into a higher m³/h than printed.",
           e20, "blog", "concrete-pump-motor-kw-vs-output", True),
        qa("qa-64", "Can I order an 18 kW motor on Electric 15 to get more output?",
           "No 18 kW SKU is listed. Electric 15 is 15 kW. Electric 20 is 22 kW. Electric 40 is 45 kW, 21 m³/h. Unpublished motor swaps are not factory specs.",
           e15, "blog", "concrete-pump-motor-kw-vs-output", True),
        qa("qa-65", "Does Pinjin guarantee 300 hours on an S-tube seal?",
           "No hour guarantee is printed. Marketplace 250–500 h claims are not Xingtai specs. ACPA: inspect the S-tube; replace when worn. Photograph OD and send the pump model.",
           seal, "blog", "concrete-pump-wear-parts-replacement-interval", True),
        qa("qa-66", "When should I replace a Pinjin delivery hose?",
           "ACPA: at the first broken braid, or sooner if the cover is cut to the reinforcement. Pinjin quotes hose after ID, length and working pressure — not after an unpublished hour count.",
           SRC["acpa_study"], "blog", "concrete-pump-wear-parts-replacement-interval", True),
        qa("qa-67", "Does Pinjin rate Electric 15 for a 30-degree slope?",
           "No slope-angle cell is printed. Electric 15 lists 15–20 m vertical and 60–80 m horizontal. Measure the rise and the pipe length.",
           e15, "blog", "concrete-pump-for-slope-retaining-wall", True),
        qa("qa-68", "Should I use Diesel 40 on a remote slope with no grid?",
           "Diesel 40 lists 4108 / 66 kW, 26 m³/h, 25 MPa, 120 m / 360 m, 2800 kg. Electric 40 is 45 kW, 380V 50Hz, 21 m³/h. Site power is a fact. Slope angle is still not a catalogue cell on either page.",
           d40, "blog", "concrete-pump-for-slope-retaining-wall", True),
        qa("qa-69", "Can I charge Electric 40 with the hopper grate flipped up to go faster?",
           "No. ACPA: the grate stays in place. It stops oversize aggregate and tools from reaching the valve. Hopper 0.4 m³ is a volume cell, not a reason to bypass the screen.",
           SRC["acpa_study"], "blog", "concrete-pump-hopper-grille-agitator", True),
        qa("qa-70", "What agitator RPM does Pinjin list?",
           "None. Electric 40 prints hopper 0.4 m³. RPM, paddle count and grate-bar spacing are not catalogue cells.",
           e40, "blog", "concrete-pump-hopper-grille-agitator", True),
        # products
        qa("qa-71", "Does Electric 15 list a hopper-m³ cell like Electric 40?",
           "No hopper-m³ cell is printed on Electric 15. Electric 40 lists hopper 0.4 m³. Electric 15 lists 15 kW, 8–10 m³/h, 450 kg, 1900 × 900 × 1200 mm. Do not copy Electric 40’s 0.4 m³ onto Electric 15.",
           e15, "product", "electric-15-concrete-pump"),
        qa("qa-72", "Is Electric 20’s 80 mm pipe compatible with Electric 15’s 100–125 mm line without a quoted transition?",
           "We do not publish that transition. Electric 20 lists 80 mm. Electric 15 lists 100–125 mm. Clamps and hoses continue the pump diameter unless Xingtai quotes a documented change.",
           e20, "product", "electric-20-concrete-pump"),
        qa("qa-73", "Does Electric 30 list 21 m³/h like Electric 40?",
           "No. Electric 30 lists 30 kW, 12–15 m³/h, 20 MPa, 1200 kg, 3300 × 1500 × 1500 mm. Electric 40 lists 45 kW, 21 m³/h, 23 MPa, 2300 kg. Do not merge those output cells.",
           e30, "product", "electric-30-concrete-pump"),
        qa("qa-74", "Is Electric 40’s 3900 × 1500 × 1600 mm a highway trailer rating?",
           "No. Those millimetres and the 2300 kg mass are catalogue envelope cells. Pinjin does not print a CDL class, axle rating or highway homologation on this page.",
           e40, "product", "electric-40-concrete-pump"),
        qa("qa-75", "Is Electric 80’s motor 90 kW?",
           "No. Electric 80 / HBT80-1816-110 lists 110 kW, 60 m³/h, 40 MPa, hopper 0.7 m³, 900 m / 300 m, 6000 kg, 6600 × 1800 × 1800 mm. 90 kW / 40 m³/h is the Electric 60 row, not this page.",
           e80, "product", "electric-80-concrete-pump"),
        qa("qa-76", "Does B500S-83D list a cubic-metre-per-hour output?",
           "No m³/h cell is printed. The sheet lists 7.5 kW, 380 V, 5 m height, 5 m horizontal, 280 kg, 915 × 550 × 550 mm, sand and small stone 5–16 mm. Do not copy a marketplace 3–4 m³/h onto this row.",
           b500, "product", "b500s-83d-two-stage-pump"),
        qa("qa-77", "Is the DN80 clamp rated PN25 because some marketplace kits say so?",
           "The listed cells are EN 14420-3, PN10 / PN16, 3.5 kg. PN25 is not printed on this SKU. Other diameters are quoted, not invented as extra clamp SKUs.",
           clamp, "product", "concrete-pump-pipe-clamp-dn80"),
        qa("qa-78", "Does the delivery-pipe page include a factory reducer table?",
           "No. Delivery pipe is quoted after pump model, DN and length, with coupling/flange ends. Reducer/taper SKUs are not listed. ACPA still says look at the reducer first if a plug forms after a diameter change.",
           pipe, "product", "concrete-pump-delivery-pipe"),
        qa("qa-79", "Can I treat one metre of this delivery hose as one metre of Electric 40’s 120 m fine-stone cell?",
           "No. ACI 304.2R cites ACPA: about 1 m of rubber hose ≈ 3 m of pipe equivalent. Catalogue H/V pairs are not hose-only budgets. Quote DN and length against the pump model.",
           SRC["aci"], "product", "concrete-pump-delivery-hose"),
        qa("qa-80", "Does the split-piston page print a 300-hour replacement interval?",
           "No. It lists outer diameters and commercial terms (quote only; not small-batch). ACPA inspect/replace cues apply; marketplace 250–500 h kits are not Xingtai specs.",
           piston, "product", "concrete-pump-split-piston"),
        qa("qa-81", "Is the S-tube seal an OEM Schwing or Putzmeister part?",
           "No. It is a Xingtai replacement wear part. Confirm OD on the pump. Not sold in small batches; no list price; no other-brand OEM claim.",
           seal, "product", "concrete-pump-s-tube-seal"),
        qa("qa-82", "Is Diesel 40 the diesel version of Electric 40’s 21 m³/h?",
           "No. Diesel 40 lists 66 kW, 26 m³/h, 25 MPa, 120 m / 360 m, 2800 kg. Electric 40 lists 45 kW, 21 m³/h, 23 MPa, fine-stone 120 m / 360 m, 2300 kg. Same factory, different rows — do not call them twins.",
           d40, "product", "diesel-40-concrete-pump"),
        qa("qa-83", "Does the mixer pump’s 45 kW + 14 kW add to 59 kW of pumping output?",
           "No. The sheet lists main motor 45 kW plus mixer 14 kW, and theoretical output 21 m³/h as a separate cell. Do not add the two kW figures and invent a higher m³/h.",
           mix, "product", "integrated-mixer-pump"),
        qa("qa-84", "Is HBT8018’s 150 m conveying the same cell as Electric 80’s 900 m / 300 m?",
           "No. HBT8018-132S lists 132 kW, 60 m³/h, 40 MPa, 150 m conveying, 450 m delivery height, 6500 kg. Electric 80 lists 900 m / 300 m. Do not merge those distance cells.",
           hbt, "product", "hbt8018-concrete-pump"),
        qa("qa-85", "Can the rural diesel pump replace Electric 15 when the site has 380 V three-phase?",
           "Only if you choose diesel. Electric 15 lists 15 kW, 8–10 m³/h, 450 kg. Rural diesel lists 5–8 m³/h and 800 kg on its own page. Grid vs engine is a site fact, not a reason to ignore the printed row.",
           rural, "product", "rural-diesel-concrete-pump"),
        # categories
        qa("qa-86", "Do electric trailer pumps on this hub include a remote-control SKU?",
           "No remote-control option is printed on the electric trailer sheets. We quote the listed motor, output, pressure, hopper and distance cells. Unpublished remotes are not promised.",
           SRC["alibaba_bg"], "category", "electric-concrete-pump"),
        qa("qa-87", "If two electric models list the same m³/h, is the higher kW always the better buy?",
           "Not from the catalogue. Electric 15 (15 kW) and Electric 20 (22 kW) both list 8–10 m³/h but differ in mass and pipe DN. Compare the whole row; we do not publish a kW-to-m³/h formula.",
           e20, "category", "electric-concrete-pump"),
        qa("qa-88", "Can I run a diesel trailer pump indoors for a basement pour because the hub lists diesel?",
           "Pinjin does not print an indoor-diesel or basement-exhaust spec. Diesel rows are engine power and catalogue distances. Exhaust and air-change are site and local-code, not a Xingtai cell.",
           SRC["aci"], "category", "diesel-concrete-pump"),
        qa("qa-89", "Does Diesel 40’s 120 m / 360 m become extra metres on a slope?",
           "No slope-angle converter is printed. Use the printed 120 m / 360 m pair. Measure rise and line length. Equivalent-length notes stay on the vertical-vs-horizontal article.",
           d40, "category", "diesel-concrete-pump"),
        qa("qa-90", "Is the mixer-pump hub a substitute for a batching plant?",
           "No. The listed unit mixes and pumps on one trailer: 45 kW + 14 kW, 21 m³/h, hopper 0.4 m³, 4500 kg. Mixing plants are not catalogue products.",
           mix, "category", "mixer-pump"),
        qa("qa-91", "Does Pinjin pack trailer pumps to a published export crate table?",
           "No crate-size or packing-list table is printed on the product pages. Mass and L×W×H are the envelope cells (for example Electric 15: 450 kg, 1900×900×1200 mm). Packing and Incoterms are quoted, not scraped from marketplace listings.",
           SRC["alibaba_bg"], "category", "electric-concrete-pump"),
        qa("qa-92", "Are marketplace 250–500 h wear kits the factory interval for Pinjin pistons and seals?",
           "No. Split piston, integral piston and S-tube seal pages print OD and commercial terms, not hours. ACPA: hose at first broken braid; inspect S-tube, pistons and gaskets. Photograph OD.",
           piston, "category", "spare-parts"),
        qa("qa-93", "Can a wet-hose sprayer on this hub fill masonry cores the way a fine-stone pump does?",
           "No. Sprayers here are finishing / shotcrete-range machines. Core and formwork filling is a placing job on B500S-83D or Electric 15. See fine-stone pump vs mortar sprayer.",
           b500, "category", "spraying-machine"),
        # /faq
        qa("qa-94", "Must I prime with grout before the first concrete on a new steel line?",
           "ACPA: always prime the pump and placing line before concrete. The preferred primer is a thin Portland-cement slurry; in most cases water priming is not recommended. Pinjin does not print a sack-count recipe.",
           SRC["acpa_water"], "site-faq", "faq"),
        qa("qa-95", "Why do Electric 15 and Electric 20 share 8–10 m³/h if the motors differ?",
           "Because kW and m³/h are separate printed cells. Electric 15: 15 kW, 450 kg, 100–125 mm. Electric 20: 22 kW, 900 kg, 80 mm. There is no published conversion that raises Electric 20’s output above 8–10 m³/h.",
           e20, "site-faq", "faq"),
        qa("qa-96", "Which compact row do you open first for a basement door of about 900 mm?",
           "Electric 15 lists 1900 × 900 × 1200 mm and 450 kg. B500S-83D lists 915 × 550 × 550 mm and 280 kg but only 5 m / 5 m. Measure the opening; we do not print a confined-space certificate.",
           e15, "site-faq", "faq"),
        qa("qa-97", "Do you list a concrete pump reducer SKU I can add to a hose kit?",
           "No. Quote delivery pipe, DN80 clamps and hose after the pump DN. ACPA: reducers create turbulence and are often where a plug shows. Unpublished tapers are not promised.",
           pipe, "site-faq", "faq"),
        qa("qa-98", "When do I replace the DN80 clamp gasket?",
           "Pinjin does not print gasket hours. ACPA: inspect gaskets and pins daily; replace when cut, crushed or missing. Never open a coupling under pressure. The listed clamp is 3.5 kg, EN 14420-3, PN10 / PN16.",
           clamp, "site-faq", "faq"),
        qa("qa-99", "Is cooling-water flow on the hopper a published Pinjin option?",
           "No cooling-water flow or jacket SKU is printed on the public product pages. Electric 40 lists hopper 0.4 m³. Marketplace water-cooled hopper claims are not Xingtai cells.",
           e40, "site-faq", "faq"),
        qa("qa-100", "Can I hitch Electric 40 to a car for a 50 km highway move?",
           "Electric 40 lists 2300 kg and 3900 × 1500 × 1600 mm. Pinjin does not print hitch class, CDL or highway homologation. ACPA discusses hitch and safety chain as operator practice, not a factory axle drawing.",
           e40, "site-faq", "faq"),
    ]
    return items


def append_qa() -> None:
    path = SOURCED / "qa" / "manifest.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    existing_ids = {item["id"] for item in data.get("items", [])}
    added = 0
    for item in build_qa():
        if item["id"] in existing_ids:
            continue
        data["items"].append(item)
        added += 1
    data["generated"] = "2026-09-25"
    data["note"] = (
        "One hundred sourced QAs (qa-01…qa-100). Blog items with inArticleFaqs live on each "
        "article source.json. Extra items inject on EN product, category and /faq pages only. "
        "Numbers from Pinjin catalogue or named public sources. Listing marketing copy is not reused."
    )
    dump_json(path, data)
    print(f"QA appended: {added}; total={len(data['items'])}")


KNOWLEDGE_ARTICLES = ROOT / "src" / "data" / "articles"


def write_knowledge_strings() -> None:
    """Extract L('en','zh') pairs and add pt/ar/ru via the same phrase table."""
    strings: dict[str, dict[str, str]] = {}
    pattern = re.compile(
        r"L\(\s*(['\"])((?:\\.|(?!\1).)*)\1\s*,\s*(['\"])((?:\\.|(?!\3).)*)\3",
        re.S,
    )
    for path in KNOWLEDGE_ARTICLES.glob("*.ts"):
        text = path.read_text(encoding="utf-8")
        for match in pattern.finditer(text):
            en = match.group(2).replace(r"\'", "'").replace(r'\"', '"')
            zh = match.group(4).replace(r"\'", "'").replace(r'\"', '"')
            if not en or en in strings:
                continue
            strings[en] = {
                "zh": zh,
                "pt": translate_plain(en, 1),
                "ar": translate_plain(en, 2),
                "ru": translate_plain(en, 3),
            }
    out = ROOT / "content" / "knowledge-i18n" / "strings.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    dump_json(out, strings)
    print(f"knowledge strings: {len(strings)}")


def main() -> None:
    build_phrases()
    fix_new_en()
    patch_related()
    write_i18n_for_sourced()
    append_qa()
    write_knowledge_strings()
    print("batch3_finish done")


if __name__ == "__main__":
    main()
