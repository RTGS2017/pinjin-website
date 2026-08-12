# -*- coding: utf-8 -*-
"""Generate src/data/products.ts from catalogue-structured data."""
from __future__ import annotations

from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "products.ts"


def L(en: str, zh: str) -> str:
    en_e = en.replace("\\", "\\\\").replace("'", "\\'")
    zh_e = zh.replace("\\", "\\\\").replace("'", "\\'")
    return f"L('{en_e}', '{zh_e}')"


def emit_specs(specs: list[tuple[str, str, str]]) -> str:
    lines = []
    for en, zh, val in specs:
        lines.append(f"      spec('{en}', '{zh}', '{val}'),")
    return "\n".join(lines)


def emit_apps(apps: list[tuple[str, str]]) -> str:
    return ",\n".join(f"      {L(a, b)}" for a, b in apps)


def emit_feats(feats: list[tuple[str, str]]) -> str:
    return ",\n".join(f"      {L(a, b)}" for a, b in feats)


def product_block(p: dict) -> str:
    specs = emit_specs(p["specs"])
    apps = emit_apps(p["apps"])
    feats = emit_feats(p["features"])
    sec = ", ".join(f"'{s}'" for s in p["seo_sec"])
    lt = ", ".join(f"'{s}'" for s in p["seo_lt"])
    return f"""  {{
    id: '{p["id"]}',
    name: {L(p["name_en"], p["name_zh"])},
    slug: '{p["slug"]}',
    category: '{p["cat"]}',
    ...imgPaths('{p["slug"]}'),
    shortDescription: {L(p["short_en"], p["short_zh"])},
    productIntroduction: {L(p["intro_en"], p["intro_zh"])},
    applicationScenarios: [
{apps}
    ],
    keyFeatures: [
{feats}
    ],
    specifications: [
{specs}
    ],
    seo: buildSeo(
      '{p["name_en"]}',
      '{p["name_zh"]}',
      '{p["seo_primary"]}',
      [{sec}],
      [{lt}],
      '{p["desc_en"].replace("'", "\\\\'")}',
      '{p["desc_zh"].replace("'", "\\\\'")}',
    ),
    geo: buildGeo(
      '{p["geo_cat_en"]}',
      '{p["geo_cat_zh"]}',
      {L(*p["what"])},
      {L(*p["who"])},
      {L(*p["where"])},
      {L(*p["adv"])},
    ),
  }}"""


def P(**kwargs):
    return kwargs


PRODUCTS = [
    P(
        id="01",
        slug="diesel-4100-transfer-pump",
        name_en="Diesel 4100 Transfer Pump",
        name_zh="柴油4100输送泵",
        cat="concrete-pump",
        short_en="Compact diesel transfer pump for short-to-medium concrete delivery on construction sites.",
        short_zh="紧凑型柴油输送泵，适用于工地中短距离混凝土输送。",
        intro_en="The Diesel 4100 Transfer Pump is a compact concrete transfer pump manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. It solves short-to-medium pipeline concrete delivery where a smaller machine footprint is preferred. Catalogue parameters include 33 kW motor power, 6–8 m³/h delivery capacity, 60 m horizontal and 25 m vertical conveying.",
        intro_zh="柴油4100输送泵由河北品锦机械在中国河北邢台制造，面向需要较小占地的中短距离管道混凝土输送。目录参数包括电机功率33 kW、输送量6–8 m³/h、水平60 m、垂直25 m。",
        apps=[
            ("Residential and small building construction", "住宅与小型建筑施工"),
            ("Concrete transportation on compact sites", "紧凑工地混凝土输送"),
            ("Short-to-medium horizontal pipeline pours", "中短距离水平管路浇筑"),
        ],
        features=[
            ("Listed delivery capacity 6–8 m³/h", "目录输送量6–8 m³/h"),
            ("60 m horizontal / 25 m vertical conveying", "水平60 m / 垂直25 m输送"),
            ("Compact 800 kg machine weight", "设备重量800 kg，机型紧凑"),
        ],
        specs=[
            ("Motor Power", "电机功率", "33 kW"),
            ("Max Aggregate Diameter", "最大骨料粒径", "0.5–3 cm"),
            ("Delivery Capacity", "输送量", "6–8 m³/h"),
            ("Vertical Conveying Height", "垂直输送高度", "25 m"),
            ("Machine Weight", "设备重量", "800 kg"),
            ("Horizontal Conveying Distance", "水平输送距离", "60 m"),
        ],
        seo_primary="Diesel 4100 transfer pump",
        seo_sec=["small concrete pump supplier", "concrete pump manufacturer China"],
        seo_lt=["diesel transfer pump for building construction"],
        desc_en="Hebei Pinjin Machinery manufactures Diesel 4100 Transfer Pumps in China for construction projects and short-to-medium concrete transportation applications.",
        desc_zh="河北品锦机械在中国生产柴油4100输送泵，适用于建筑施工与中短距离混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A compact diesel concrete transfer pump for pipeline delivery.", "用于管道输送的紧凑型柴油混凝土输送泵。"),
        who=("Contractors needing a small transfer pump with published capacity and conveying distance.", "需要小型输送泵且希望对照公开输送参数选型的承包商。"),
        where=("Building sites with short-to-medium pour distances within listed limits.", "浇筑距离在目录限值内的中短距离建筑工地。"),
        adv=("Defined capacity and conveying parameters from the product catalogue.", "产品目录提供明确的输送量与输送距离参数。"),
    ),
    P(
        id="02",
        slug="ll15-diesel-transfer-pump",
        name_en="LL15 Diesel Version Transfer Pump",
        name_zh="LL15柴油版输送泵",
        cat="concrete-pump",
        short_en="Diesel-powered LL15 transfer pump for flexible on-site concrete conveying.",
        short_zh="柴油动力LL15输送泵，灵活适应现场混凝土输送。",
        intro_en="The LL15 Diesel Version Transfer Pump is manufactured by Hebei Pinjin Machinery for sites that prefer diesel power. Catalogue data lists 28 HP diesel engine power, 5–8 m³/h theoretical delivery capacity, 50 m horizontal and 20 m vertical conveying, and 650 kg machine weight.",
        intro_zh="LL15柴油版输送泵由河北品锦机械制造，适合偏好柴油动力的工地。目录数据：柴油机功率28 HP、理论输送量5–8 m³/h、水平50 m、垂直20 m、设备重量650 kg。",
        apps=[
            ("Building construction without stable electricity", "供电不便的建筑施工"),
            ("Concrete transportation", "混凝土输送"),
            ("Compact site material delivery", "紧凑工地物料输送"),
        ],
        features=[
            ("Diesel engine power 28 HP", "柴油机功率28 HP"),
            ("Theoretical capacity 5–8 m³/h", "理论输送量5–8 m³/h"),
            ("Delivery pipe diameter 80–100 mm", "输送管直径80–100 mm"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "2 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "50 m"),
            ("Diesel Engine Power", "柴油机功率", "28 HP"),
            ("Vertical Conveying Height", "垂直输送高度", "20 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "5–8 m³/h"),
            ("Dimension", "设备尺寸", "140 × 70 × 110 cm"),
            ("Delivery Pipe Diameter", "输送管直径", "80–100 mm"),
            ("Machine Weight", "设备重量", "650 kg"),
        ],
        seo_primary="LL15 diesel transfer pump",
        seo_sec=["diesel concrete pump manufacturer", "concrete pump supplier China"],
        seo_lt=["diesel concrete pump for building construction"],
        desc_en="Hebei Pinjin Machinery manufactures LL15 Diesel Version Transfer Pumps in China for construction projects and diesel-powered concrete transportation.",
        desc_zh="河北品锦机械在中国生产LL15柴油版输送泵，适用于建筑施工与柴油动力混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A diesel-powered concrete transfer pump in the LL15 series.", "LL15系列柴油动力混凝土输送泵。"),
        who=("Buyers selecting diesel pumps for building construction.", "为建筑施工选择柴油输送泵的采购方。"),
        where=("Sites within 50 m horizontal / 20 m vertical listed conveying.", "水平50 m、垂直20 m目录限值内的工地。"),
        adv=("Published diesel power, capacity and pipe diameter parameters.", "公开柴油功率、输送量与管径参数。"),
    ),
    P(
        id="03",
        slug="ll15-electric-transfer-pump",
        name_en="LL15 Motor Version Transfer Pump",
        name_zh="LL15电机版输送泵",
        cat="concrete-pump",
        short_en="Electric motor LL15 transfer pump for sites with stable 380 V power supply.",
        short_zh="电机版LL15输送泵，适合稳定380 V供电现场。",
        intro_en="The LL15 Motor Version Transfer Pump is an electric concrete transfer pump from Hebei Pinjin Machinery. Catalogue parameters include 15 kW motor power, 380 V rated voltage, 5–8 m³/h theoretical delivery capacity, 30 m horizontal and 15 m vertical conveying.",
        intro_zh="LL15电机版输送泵为品锦电动混凝土输送泵。目录参数：电机功率15 kW、额定电压380 V、理论输送量5–8 m³/h、水平30 m、垂直15 m。",
        apps=[
            ("Indoor or powered construction sites", "有电室内或施工现场"),
            ("Concrete transportation", "混凝土输送"),
            ("Workshops with 380 V supply", "具备380 V供电的车间"),
        ],
        features=[
            ("Motor power 15 kW", "电机功率15 kW"),
            ("Rated voltage 380 V", "额定电压380 V"),
            ("Theoretical capacity 5–8 m³/h", "理论输送量5–8 m³/h"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "2 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "30 m"),
            ("Motor Power", "电机功率", "15 kW"),
            ("Vertical Conveying Height", "垂直输送高度", "15 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "5–8 m³/h"),
            ("Dimension", "设备尺寸", "140 × 70 × 110 cm"),
            ("Rated Voltage", "额定电压", "380 V"),
            ("Machine Weight", "设备重量", "600 kg"),
        ],
        seo_primary="LL15 motor transfer pump",
        seo_sec=["electric concrete transfer pump", "concrete pump manufacturer China"],
        seo_lt=["electric concrete pump for construction sites"],
        desc_en="Hebei Pinjin Machinery manufactures LL15 Motor Version Transfer Pumps in China for construction projects with stable electrical supply.",
        desc_zh="河北品锦机械在中国生产LL15电机版输送泵，适用于具备稳定供电的建筑施工。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("An electric-motor LL15 concrete transfer pump.", "LL15电机版混凝土输送泵。"),
        who=("Buyers comparing diesel vs electric transfer pumps.", "对比柴油/电机输送泵方案的采购方。"),
        where=("Sites with 380 V power within listed conveying limits.", "具备380 V供电且在目录输送限值内的现场。"),
        adv=("Defined motor power, voltage and capacity from the catalogue.", "目录明确电机功率、电压与输送量。"),
    ),
    P(
        id="04",
        slug="zs22-25-concrete-pump",
        name_en="ZS22-25 Concrete Pump",
        name_zh="ZS22-25输送泵",
        cat="concrete-pump",
        short_en="Practical concrete pump balancing delivery capacity and compact machine weight.",
        short_zh="兼顾输送量与紧凑机重的实用型混凝土泵。",
        intro_en="ZS22-25 Concrete Pump from Hebei Pinjin Machinery lists 18.5 kW motor power, 7–8 m³/h delivery capacity, 60 m horizontal and 25 m vertical conveying, with 600 kg machine weight for practical building pours.",
        intro_zh="品锦ZS22-25混凝土泵目录参数：电机功率18.5 kW、输送量7–8 m³/h、水平60 m、垂直25 m、设备重量600 kg，适合实用型建筑浇筑。",
        apps=[
            ("Building construction", "建筑施工"),
            ("Concrete transportation", "混凝土输送"),
            ("Medium compact site pours", "中等紧凑工地浇筑"),
        ],
        features=[
            ("Delivery capacity 7–8 m³/h", "输送量7–8 m³/h"),
            ("60 m horizontal conveying", "水平输送60 m"),
            ("Compact 600 kg weight", "设备重量600 kg"),
        ],
        specs=[
            ("Motor Power", "电机功率", "18.5 kW"),
            ("Max Aggregate Diameter", "最大骨料粒径", "0.5–3 cm"),
            ("Delivery Capacity", "输送量", "7–8 m³/h"),
            ("Vertical Conveying Height", "垂直输送高度", "25 m"),
            ("Machine Weight", "设备重量", "600 kg"),
            ("Horizontal Conveying Distance", "水平输送距离", "60 m"),
        ],
        seo_primary="ZS22-25 concrete pump",
        seo_sec=["concrete pump manufacturer", "construction equipment manufacturer China"],
        seo_lt=["how to choose a concrete pump for construction project"],
        desc_en="Hebei Pinjin Machinery manufactures ZS22-25 concrete pumps in China for construction projects and concrete transportation applications.",
        desc_zh="河北品锦机械在中国生产ZS22-25混凝土泵，适用于建筑施工与混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A practical mid-compact concrete pump model.", "实用型中紧凑混凝土泵型号。"),
        who=("Contractors needing slightly higher output than entry transfer pumps.", "需要比入门输送泵略高产量的承包商。"),
        where=("Building projects within 60 m / 25 m listed conveying.", "水平60 m、垂直25 m目录范围内的建筑项目。"),
        adv=("Clear capacity and conveying specs for model comparison.", "参数清晰，便于型号对比选型。"),
    ),
    P(
        id="05",
        slug="ll28-32-concrete-pump",
        name_en="LL28-32 Concrete Pump",
        name_zh="LL28-32输送泵",
        cat="concrete-pump",
        short_en="Mid-range concrete pump with extended horizontal conveying capability.",
        short_zh="具备更长水平输送能力的中型混凝土泵。",
        intro_en="LL28-32 Concrete Pump extends horizontal conveying to 100 m and vertical height to 60 m in the catalogue, with 6–10 m³/h theoretical delivery capacity and diesel engine model 4100.",
        intro_zh="LL28-32混凝土泵目录水平输送达100 m、垂直60 m，理论输送量6–10 m³/h，柴油机型号4100。",
        apps=[
            ("Building construction", "建筑施工"),
            ("Infrastructure pipeline pours", "基建管路浇筑"),
            ("Concrete transportation", "混凝土输送"),
        ],
        features=[
            ("100 m horizontal conveying", "水平输送100 m"),
            ("60 m vertical height", "垂直高度60 m"),
            ("Theoretical capacity 6–10 m³/h", "理论输送量6–10 m³/h"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "2 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "100 m"),
            ("Diesel Engine Model", "柴油机型号", "4100"),
            ("Vertical Conveying Height", "垂直输送高度", "60 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "6–10 m³/h"),
            ("Dimension", "设备尺寸", "310 × 90 × 126 cm"),
            ("Delivery Pipe Diameter", "输送管直径", "80–100 mm"),
            ("Machine Weight", "设备重量", "1400 kg"),
        ],
        seo_primary="LL28-32 concrete pump",
        seo_sec=["diesel concrete pump manufacturer", "concrete pump horizontal conveying distance"],
        seo_lt=["diesel concrete pump for building construction"],
        desc_en="Hebei Pinjin Machinery manufactures LL28-32 concrete pumps in China for construction projects requiring longer horizontal concrete transportation.",
        desc_zh="河北品锦机械在中国生产LL28-32混凝土泵，适用于需要更长水平混凝土输送的建筑项目。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A mid-range diesel concrete pump with extended horizontal reach.", "具备更长水平输送的中型柴油混凝土泵。"),
        who=("Buyers whose pipeline length exceeds compact transfer pumps.", "管路长度超过紧凑输送泵能力的采购方。"),
        where=("Projects within 100 m horizontal / 60 m vertical listed limits.", "水平100 m、垂直60 m目录限值内的项目。"),
        adv=("Extended conveying distance with published capacity.", "输送距离更长且参数公开。"),
    ),
    P(
        id="06",
        slug="diesel-screw-mortar-spraying-machine",
        name_en="Diesel Screw Mortar Spraying Machine",
        name_zh="柴油螺杆砂浆喷涂机",
        cat="spraying-machine",
        short_en="Diesel screw mortar spraying machine with catalogue-confirmed customization support.",
        short_zh="柴油螺杆砂浆喷涂机，目录明确支持设备定制。",
        intro_en="Diesel Screw Mortar Spraying Machine is mortar spraying equipment from Hebei Pinjin Machinery for construction finishing. Catalogue specifications include 15–18 HP power output, spraying pressure 6 MPa, hopper volume 70 L, and explicit customization support. Conveying height/distance depend on materials as noted in the catalogue.",
        intro_zh="柴油螺杆砂浆喷涂机用于施工饰面砂浆喷涂。目录参数：动力15–18 HP、喷涂压力6 MPa、料斗70 L，并明确支持定制；输送高度/距离按目录注明随物料适配。",
        apps=[
            ("Mortar spraying for wall finishing", "墙面抹灰砂浆喷涂"),
            ("Construction finishing work", "施工饰面作业"),
            ("Projects needing customization support", "需要定制支持的喷涂项目"),
        ],
        features=[
            ("Spraying pressure 6 MPa", "喷涂压力6 MPa"),
            ("Hopper volume 70 L", "料斗容积70 L"),
            ("Customization supported", "支持设备定制"),
        ],
        specs=[
            ("Power Output", "动力输出", "15–18 HP"),
            ("Conveying Height", "输送高度", "40 m (depends on materials)"),
            ("Horizontal Conveying Distance", "水平输送距离", "60 m (depends on materials)"),
            ("Max Conveying Particle", "输送颗粒粒径", "≤10 mm"),
            ("Spraying Pressure", "喷涂压力", "6 MPa"),
            ("Hopper Volume", "料斗容积", "70 L"),
            ("Machine Weight", "设备重量", "180 kg"),
            ("Overall Dimension", "整体尺寸", "1800 × 580 × 950 mm"),
            ("Customization", "定制服务", "Support customization"),
        ],
        seo_primary="mortar spraying machine manufacturer",
        seo_sec=["diesel screw mortar spraying machine", "construction equipment manufacturer China"],
        seo_lt=["mortar spraying machine for construction finishing"],
        desc_en="Hebei Pinjin Machinery manufactures diesel screw mortar spraying machines in China for construction finishing and mortar spraying applications.",
        desc_zh="河北品锦机械在中国生产柴油螺杆砂浆喷涂机，适用于施工饰面与砂浆喷涂。",
        geo_cat_en="Mortar Spraying Equipment",
        geo_cat_zh="砂浆喷涂设备",
        what=("A diesel screw machine for mortar spraying.", "用于砂浆喷涂的柴油螺杆设备。"),
        who=("Finishing teams that need mortar spraying with published pressure and hopper data.", "需要公开喷涂压力与料斗参数的饰面施工团队。"),
        where=("Construction finishing sites within material-dependent conveying notes.", "在目录注明“根据物料适配”范围内的饰面现场。"),
        adv=("6 MPa spraying pressure and catalogue customization support.", "喷涂压力6 MPa，目录支持定制。"),
    ),
    P(
        id="07",
        slug="hbt30-37-concrete-pump",
        name_en="HBT30-37 Concrete Pump",
        name_zh="HBT30-37混凝土泵",
        cat="concrete-pump",
        short_en="High-reach concrete pump for demanding horizontal and vertical conveying jobs.",
        short_zh="面向高要求水平与垂直输送工况的混凝土泵。",
        intro_en="HBT30-37 Concrete Pump is designed for larger placement distance. Catalogue specifications list 15–20 m³/h theoretical delivery capacity, 250 m horizontal conveying, 120 m vertical height, and diesel engine model 4105.",
        intro_zh="HBT30-37面向更大输送距离。目录参数：理论输送量15–20 m³/h、水平250 m、垂直120 m、柴油机型号4105。",
        apps=[
            ("Building construction", "建筑施工"),
            ("Infrastructure projects", "基建工程"),
            ("High-rise concrete transportation", "高层混凝土输送"),
        ],
        features=[
            ("250 m horizontal conveying", "水平输送250 m"),
            ("120 m vertical height", "垂直高度120 m"),
            ("Theoretical capacity 15–20 m³/h", "理论输送量15–20 m³/h"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "3 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "250 m"),
            ("Diesel Engine Model", "柴油机型号", "4105"),
            ("Vertical Conveying Height", "垂直输送高度", "120 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "15–20 m³/h"),
            ("Dimension", "设备尺寸", "360 × 145 × 146 cm"),
            ("Delivery Pipe Diameter", "输送管直径", "80–100 mm"),
            ("Machine Weight", "设备重量", "2400 kg"),
        ],
        seo_primary="HBT30-37 concrete pump",
        seo_sec=["diesel concrete pump for building construction", "concrete pump manufacturer China"],
        seo_lt=["concrete pump for small and medium building projects"],
        desc_en="Hebei Pinjin Machinery manufactures HBT30-37 concrete pumps in China for building construction and infrastructure concrete transportation.",
        desc_zh="河北品锦机械在中国生产HBT30-37混凝土泵，适用于建筑与基建混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A diesel concrete pump for longer conveying distance.", "面向更长输送距离的柴油混凝土泵。"),
        who=("Contractors with medium-to-high rise or longer pipeline needs.", "有中高层或较长管路需求的承包商。"),
        where=("Projects within 250 m / 120 m listed conveying limits.", "水平250 m、垂直120 m目录限值内的项目。"),
        adv=("Strong published horizontal and vertical conveying parameters.", "水平与垂直输送参数明确且较强。"),
    ),
    P(
        id="08",
        slug="hbt45-40-concrete-pump",
        name_en="HBT45-40 Concrete Pump",
        name_zh="HBT45-40混凝土泵",
        cat="concrete-pump",
        short_en="Strong concrete pump model for longer conveying distance and higher vertical reach.",
        short_zh="适合更长输送距离与更高垂直高度的混凝土泵型号。",
        intro_en="HBT45-40 Concrete Pump lists 18–20 m³/h theoretical delivery capacity, 300 m horizontal conveying, 150 m vertical height, diesel engine model 4108, and 2700 kg machine weight.",
        intro_zh="HBT45-40目录参数：理论输送量18–20 m³/h、水平300 m、垂直150 m、柴油机型号4108、设备重量2700 kg。",
        apps=[
            ("High-rise construction", "高层建筑施工"),
            ("Infrastructure projects", "基建工程"),
            ("Long-distance concrete transportation", "长距离混凝土输送"),
        ],
        features=[
            ("300 m horizontal conveying", "水平输送300 m"),
            ("150 m vertical height", "垂直高度150 m"),
            ("Pipe diameter 80–100–125 mm", "管径80–100–125 mm"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "3 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "300 m"),
            ("Diesel Engine Model", "柴油机型号", "4108"),
            ("Vertical Conveying Height", "垂直输送高度", "150 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "18–20 m³/h"),
            ("Dimension", "设备尺寸", "420 × 145 × 150 cm"),
            ("Delivery Pipe Diameter", "输送管直径", "80–100–125 mm"),
            ("Machine Weight", "设备重量", "2700 kg"),
        ],
        seo_primary="HBT45-40 concrete pump",
        seo_sec=["concrete pump supplier China", "concrete pump manufacturer"],
        seo_lt=["concrete pump price from China manufacturer"],
        desc_en="Hebei Pinjin Machinery manufactures HBT45-40 concrete pumps in China for construction projects and long-distance concrete transportation applications.",
        desc_zh="河北品锦机械在中国生产HBT45-40混凝土泵，适用于建筑施工与长距离混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A higher-reach diesel concrete pump versus HBT30-37.", "相对HBT30-37输送能力更强的柴油混凝土泵。"),
        who=("Buyers comparing China manufacturer models by conveying distance.", "按输送距离对比中国厂家型号的采购方。"),
        where=("Projects needing up to 300 m horizontal / 150 m vertical listed reach.", "需要目录水平300 m / 垂直150 m输送能力的项目。"),
        adv=("Longer reach with published capacity and pipe options.", "输送距离更长，容量与管径参数公开。"),
    ),
    P(
        id="09",
        slug="automatic-plaster-spraying-machine",
        name_en="Fully Automatic Plaster Spraying Machine",
        name_zh="全自动石膏喷涂机",
        cat="spraying-machine",
        short_en="Fully automatic plaster spraying machine for efficient interior finishing.",
        short_zh="全自动石膏喷涂机，提升室内饰面施工效率。",
        intro_en="Fully Automatic Plaster Spraying Machine provides automatic plaster application with mixer capacity 115 L, power supply 380 V / 50 Hz, main motor 5 kW, horizontal 20 m and vertical 10 m conveying limits as listed.",
        intro_zh="全自动石膏喷涂机用于石膏喷涂：搅拌容积115 L、供电380 V / 50 Hz、主电机5 kW、水平20 m、垂直10 m为目录限值。",
        apps=[
            ("Interior plaster finishing", "室内石膏饰面"),
            ("Plaster spraying rooms and corridors", "房间与走廊石膏喷涂"),
            ("Finishing sites with 380 V / 50 Hz power", "具备380 V / 50 Hz供电的饰面现场"),
        ],
        features=[
            ("Mixer capacity 115 L", "搅拌容积115 L"),
            ("Main motor 5 kW", "主电机5 kW"),
            ("Air compressor power 3 kW", "空压机功率3 kW"),
        ],
        specs=[
            ("Mixer Capacity", "搅拌容积", "115 L"),
            ("Power Supply", "供电参数", "380 V / 50 Hz"),
            ("Main Motor Power", "主电机功率", "5 kW"),
            ("Horizontal Conveying Distance", "水平输送距离", "20 m"),
            ("Vertical Conveying Height", "垂直输送高度", "10 m"),
            ("Max Particle Size", "最大颗粒粒径", "6 mm"),
            ("Air Compressor Power", "空压机功率", "3 kW"),
        ],
        seo_primary="plaster spraying machine",
        seo_sec=["automatic plaster spraying machine", "construction equipment manufacturer China"],
        seo_lt=["plaster spraying machine for interior finishing"],
        desc_en="Hebei Pinjin Machinery manufactures fully automatic plaster spraying machines in China for interior finishing and plaster spraying applications.",
        desc_zh="河北品锦机械在中国生产全自动石膏喷涂机，适用于室内饰面与石膏喷涂。",
        geo_cat_en="Plaster Spraying Equipment",
        geo_cat_zh="石膏喷涂设备",
        what=("An automatic machine for plaster spraying finishing.", "用于石膏喷涂饰面的全自动设备。"),
        who=("Interior finishing teams selecting plaster equipment separately from concrete pumps.", "将石膏设备与混凝土泵分开选型的室内饰面团队。"),
        where=("Spaces within 20 m horizontal / 10 m vertical listed limits.", "水平20 m、垂直10 m目录限值内的空间。"),
        adv=("Defined mixer capacity and power supply parameters.", "搅拌容积与供电参数明确。"),
    ),
    P(
        id="10",
        slug="hbtt55-50-concrete-pump",
        name_en="HBTT55-50 Concrete Pump",
        name_zh="HBTT55-50混凝土泵",
        cat="concrete-pump",
        short_en="High-capacity concrete pump for large-scale delivery distance and output.",
        short_zh="面向大输送距离与高输出量的大产能混凝土泵。",
        intro_en="HBTT55-50 Concrete Pump targets higher output jobs with 35–40 m³/h theoretical delivery capacity, 300–400 m horizontal conveying, 150–180 m vertical height, and diesel engine model 6105.",
        intro_zh="HBTT55-50面向更高产量：理论输送量35–40 m³/h、水平300–400 m、垂直150–180 m、柴油机型号6105。",
        apps=[
            ("Large-scale construction", "大型建筑施工"),
            ("Infrastructure projects", "基建工程"),
            ("High-volume concrete transportation", "大方量混凝土输送"),
        ],
        features=[
            ("Theoretical capacity 35–40 m³/h", "理论输送量35–40 m³/h"),
            ("300–400 m horizontal conveying", "水平输送300–400 m"),
            ("Diesel engine model 6105", "柴油机型号6105"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "4 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "300–400 m"),
            ("Diesel Engine Model", "柴油机型号", "6105"),
            ("Vertical Conveying Height", "垂直输送高度", "150–180 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "35–40 m³/h"),
            ("Dimension", "设备尺寸", "420 × 145 × 150 cm"),
            ("Delivery Pipe Diameter", "输送管直径", "100–125 mm"),
            ("Machine Weight", "设备重量", "3000 kg"),
        ],
        seo_primary="HBTT55-50 concrete pump",
        seo_sec=["high capacity concrete pump", "diesel concrete pump manufacturer"],
        seo_lt=["concrete pump for infrastructure projects"],
        desc_en="Hebei Pinjin Machinery manufactures HBTT55-50 concrete pumps in China for large-scale construction and long-distance concrete transportation.",
        desc_zh="河北品锦机械在中国生产HBTT55-50混凝土泵，适用于大型建筑与长距离混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A high-capacity diesel concrete pump for large pours.", "面向大方量浇筑的高产能柴油混凝土泵。"),
        who=("Buyers needing higher output than HBT45-class models.", "需要高于HBT45级别产量的采购方。"),
        where=("Large projects within 300–400 m / 150–180 m listed limits.", "在水平300–400 m、垂直150–180 m目录范围内的大型项目。"),
        adv=("High listed capacity with long conveying distance.", "高输送量与长输送距离参数并存。"),
    ),
    P(
        id="11",
        slug="ll60-75-concrete-pump",
        name_en="LL60-75 Concrete Pump",
        name_zh="LL60-75混凝土泵",
        cat="concrete-pump",
        short_en="Heavy-duty concrete pump with high theoretical delivery capacity.",
        short_zh="高理论输送量的重型混凝土泵。",
        intro_en="LL60-75 Concrete Pump lists 40–45 m³/h theoretical delivery capacity, 200–550 m horizontal conveying, 150–180 m vertical height, diesel engine model 6110, and 3300 kg machine weight.",
        intro_zh="LL60-75目录：理论输送量40–45 m³/h、水平200–550 m、垂直150–180 m、柴油机型号6110、设备重量3300 kg。",
        apps=[
            ("Heavy construction pours", "重型建筑浇筑"),
            ("Infrastructure projects", "基建工程"),
            ("Long-distance concrete transportation", "长距离混凝土输送"),
        ],
        features=[
            ("Theoretical capacity 40–45 m³/h", "理论输送量40–45 m³/h"),
            ("Up to 550 m horizontal conveying", "水平输送可达550 m"),
            ("125 mm delivery pipe diameter", "输送管直径125 mm"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "5 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "200–550 m"),
            ("Diesel Engine Model", "柴油机型号", "6110"),
            ("Vertical Conveying Height", "垂直输送高度", "150–180 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "40–45 m³/h"),
            ("Dimension", "设备尺寸", "430 × 160 × 170 cm"),
            ("Delivery Pipe Diameter", "输送管直径", "125 mm"),
            ("Machine Weight", "设备重量", "3300 kg"),
        ],
        seo_primary="LL60-75 concrete pump",
        seo_sec=["heavy duty concrete pump", "construction equipment manufacturer China"],
        seo_lt=["high capacity concrete pump for construction projects"],
        desc_en="Hebei Pinjin Machinery manufactures LL60-75 concrete pumps in China for heavy construction and long-distance concrete transportation applications.",
        desc_zh="河北品锦机械在中国生产LL60-75混凝土泵，适用于重型建筑与长距离混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A heavy-duty high-output concrete pump.", "重型高输出混凝土泵。"),
        who=("Contractors selecting near top-range catalogue capacity.", "需要接近目录高端输送量的承包商。"),
        where=("Projects matched to 200–550 m / 150–180 m listed ranges.", "匹配水平200–550 m、垂直150–180 m目录范围的项目。"),
        adv=("High theoretical capacity with long horizontal range.", "高理论输送量与长水平输送范围。"),
    ),
    P(
        id="12",
        slug="hbt80-18-140-concrete-pump",
        name_en="HBT80-18-140 Concrete Pump",
        name_zh="HBT80-18-140混凝土泵",
        cat="concrete-pump",
        short_en="High pressure concrete pumping equipment designed for long-distance construction material transportation.",
        short_zh="面向长距离建筑物料输送的高压混凝土泵送设备。",
        intro_en="HBT80-18-140 Concrete Pump is designed for large-scale concrete delivery. Catalogue parameters include max aggregate diameter 6 cm, horizontal conveying 600 m, vertical conveying 300 m, theoretical delivery capacity 40–75 m³/h, diesel engine 6-cylinder / 216 kW, delivery pipe diameter 125 mm, machine weight 5800 kg, and dimension 650 × 160 × 170 cm.",
        intro_zh="HBT80-18-140面向大规模混凝土输送。目录参数：最大骨料粒径6 cm、水平600 m、垂直300 m、理论输送量40–75 m³/h、柴油机六缸/216 kW、输送管直径125 mm、设备重量5800 kg、尺寸650 × 160 × 170 cm。",
        apps=[
            ("Residential and commercial building construction", "住宅与商业建筑施工"),
            ("Infrastructure projects", "基建工程"),
            ("Concrete transportation", "混凝土输送"),
            ("High-rise construction", "高层建筑施工"),
        ],
        features=[
            ("Long conveying distance up to 600 m horizontal", "水平输送可达600 m"),
            ("High-rise vertical conveying up to 300 m", "垂直输送可达300 m"),
            ("High theoretical capacity 40–75 m³/h", "理论输送量40–75 m³/h"),
            ("Suitable for large construction projects", "适合大型建筑项目选型对照"),
        ],
        specs=[
            ("Max Aggregate Diameter", "最大骨料粒径", "6 cm"),
            ("Horizontal Conveying Distance", "水平输送距离", "600 m"),
            ("Diesel Engine Parameter", "柴油机参数", "6-cylinder / 216 kW"),
            ("Vertical Conveying Height", "垂直输送高度", "300 m"),
            ("Theoretical Delivery Capacity", "理论输送量", "40–75 m³/h"),
            ("Dimension", "设备尺寸", "650 × 160 × 170 cm"),
            ("Delivery Pipe Diameter", "输送管直径", "125 mm"),
            ("Machine Weight", "设备重量", "5800 kg"),
        ],
        seo_primary="HBT80-18-140 concrete pump",
        seo_sec=["concrete pump manufacturer China", "diesel concrete pump manufacturer"],
        seo_lt=["diesel concrete pump for construction projects"],
        desc_en="Hebei Pinjin Machinery manufactures HBT80-18-140 concrete pumps for construction projects and professional concrete transportation applications.",
        desc_zh="河北品锦机械生产HBT80-18-140混凝土泵，适用于建筑项目与专业混凝土输送应用。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A flagship high-output concrete pump for long-distance and high-rise conveying.", "面向长距离与高扬程输送的旗舰高输出混凝土泵。"),
        who=("Buyers planning large pours that need the highest listed conveying distance in the catalogue.", "需要目录中最高水平/垂直输送距离的大方量采购方。"),
        where=("Large construction and infrastructure sites matched to 600 m / 300 m listed limits.", "匹配水平600 m、垂直300 m目录限值的大型建筑与基建现场。"),
        adv=("Highest listed horizontal and vertical conveying among catalogue concrete pumps.", "目录混凝土泵中列出的最高水平与垂直输送参数。"),
    ),
    P(
        id="13",
        slug="hbtb016-110es-spiral-feeder",
        name_en="HBTB016-110ES Spiral Feeder",
        name_zh="HBTB016-110ES螺旋给料机",
        cat="material-handling",
        short_en="Spiral feeder for material feeding with customizable rated head.",
        short_zh="螺旋给料机，额定扬程可定制。",
        intro_en="HBTB016-110ES Spiral Feeder is material feeding equipment from Hebei Pinjin Machinery. Catalogue parameters: rated power 4 kW, rated flow 3–6 m³/h, rated head custom made, rated voltage 380 V, machine weight 90 kg.",
        intro_zh="HBTB016-110ES螺旋给料机用于物料给料。目录参数：额定功率4 kW、额定流量3–6 m³/h、额定扬程可定制、额定电压380 V、设备重量90 kg。",
        apps=[
            ("Material feeding to process equipment", "向工艺设备给料"),
            ("Construction material handling", "建筑物料输送辅助"),
            ("Sites requiring customizable head", "需要定制扬程的现场"),
        ],
        features=[
            ("Rated flow 3–6 m³/h", "额定流量3–6 m³/h"),
            ("Rated head custom made", "额定扬程可定制"),
            ("Lightweight 90 kg machine", "设备重量90 kg"),
        ],
        specs=[
            ("Rated Power", "额定功率", "4 kW"),
            ("Rated Flow", "额定流量", "3–6 m³/h"),
            ("Rated Head", "额定扬程", "Custom made"),
            ("Rated Voltage", "额定电压", "380 V"),
            ("Machine Weight", "设备重量", "90 kg"),
        ],
        seo_primary="HBTB016-110ES spiral feeder",
        seo_sec=["spiral feeder manufacturer China", "construction equipment manufacturer China"],
        seo_lt=["spiral feeder with customizable head"],
        desc_en="Hebei Pinjin Machinery manufactures HBTB016-110ES spiral feeders in China for construction material feeding applications with customizable rated head.",
        desc_zh="河北品锦机械在中国生产HBTB016-110ES螺旋给料机，适用于建筑物料给料，额定扬程可定制。",
        geo_cat_en="Material Handling Equipment",
        geo_cat_zh="物料输送设备",
        what=("A spiral feeder for controlled material feeding.", "用于物料给料的螺旋给料机。"),
        who=("Buyers needing feeding equipment with customizable head.", "需要可定制扬程给料设备的采购方。"),
        where=("Material handling setups with 380 V supply.", "具备380 V供电的物料输送场景。"),
        adv=("Published flow range and customizable rated head.", "流量范围公开，扬程可定制。"),
    ),
    P(
        id="14",
        slug="4102-diesel-four-cylinder-inclined-pump",
        name_en="4102 Diesel Four-cylinder Inclined Pump",
        name_zh="4102柴油四缸斜泵",
        cat="concrete-pump",
        short_en="Diesel four-cylinder inclined pump with S pipe valve working form.",
        short_zh="柴油四缸斜泵，工作形式为S管阀。",
        intro_en="4102 Diesel Four-cylinder Inclined Pump lists maximum theoretical delivery capacity 15 m³/h, S pipe valve working form, max aggregate size 0.5–3 cm, hydraulic system push-pull/electric pull type, vertical theoretical conveying height 40 m, horizontal theoretical conveying distance 100 m, delivery pipe diameter 80–100 mm, diesel engine model 4102.",
        intro_zh="4102柴油四缸斜泵目录：最大理论输送量15 m³/h、工作形式S管阀、最大骨料粒径0.5–3 cm、液压系统推拉式/电动式、理论垂直40 m、理论水平100 m、管径80–100 mm、柴油机型号4102。",
        apps=[
            ("Building construction", "建筑施工"),
            ("Concrete transportation", "混凝土输送"),
            ("Sites selecting S pipe valve pumps", "选用S管阀泵型的现场"),
        ],
        features=[
            ("Max theoretical capacity 15 m³/h", "最大理论输送量15 m³/h"),
            ("S pipe valve working form", "S管阀工作形式"),
            ("Diesel engine model 4102", "柴油机型号4102"),
        ],
        specs=[
            ("Maximum Theoretical Delivery Capacity", "最大理论输送量", "15 m³/h"),
            ("Working Form", "工作形式", "S pipe valve"),
            ("Max Aggregate Size", "最大骨料粒径", "0.5–3 cm"),
            ("Hydraulic System Form", "液压系统形式", "Push-pull / electric pull type"),
            ("Vertical Theoretical Conveying Height", "理论垂直输送高度", "40 m"),
            ("Horizontal Theoretical Conveying Distance", "理论水平输送距离", "100 m"),
            ("Delivery Pipe Diameter", "输送管直径", "80–100 mm"),
            ("Diesel Engine Model", "柴油机型号", "4102"),
        ],
        seo_primary="4102 diesel inclined pump",
        seo_sec=["diesel concrete pump manufacturer", "S pipe valve concrete pump"],
        seo_lt=["diesel four-cylinder inclined pump for construction"],
        desc_en="Hebei Pinjin Machinery manufactures 4102 diesel four-cylinder inclined pumps in China for construction concrete transportation applications.",
        desc_zh="河北品锦机械在中国生产4102柴油四缸斜泵，适用于建筑混凝土输送。",
        geo_cat_en="Concrete Pump Equipment",
        geo_cat_zh="混凝土泵设备",
        what=("A diesel four-cylinder inclined concrete pump with S pipe valve.", "采用S管阀的柴油四缸斜泵。"),
        who=("Buyers specifying 4102 diesel engine and inclined pump layout.", "指定4102柴油机与斜泵结构的采购方。"),
        where=("Projects within 100 m / 40 m theoretical conveying listed.", "理论水平100 m、垂直40 m目录范围内的项目。"),
        adv=("Clear working form and hydraulic system options in the catalogue.", "目录明确工作形式与液压系统选项。"),
    ),
    P(
        id="15",
        slug="type-311-spraying-machine",
        name_en="Type 311 Spraying Machine",
        name_zh="311型喷涂机",
        cat="spraying-machine",
        short_en="Type 311 spraying machine for construction spraying applications.",
        short_zh="311型喷涂机，用于施工喷涂作业。",
        intro_en="Type 311 Spraying Machine catalogue parameters include working pressure 4 MPa (catalogue print showed Pa; aligned to MPa consistent with other Pinjin spraying models), rated voltage 220/380 V, work efficiency 15 m/h (unit as printed in source catalogue), spray flow 3–4 m³, conveying head 10 m, conveying distance 20 m, motor power 4 kW, machine weight 130 kg.",
        intro_zh="311型喷涂机目录参数：工作压力4 MPa（原目录印为Pa，按同系列喷涂机统一为MPa）、额定电压220/380 V、工作效率15 m/h（单位按原目录标注）、喷涂流量3–4 m³、输送扬程10 m、输送距离20 m、电机功率4 kW、设备重量130 kg。",
        apps=[
            ("Construction spraying work", "施工喷涂作业"),
            ("Finishing applications within listed distance", "目录距离范围内的饰面喷涂"),
            ("Sites with 220/380 V supply", "具备220/380 V供电的现场"),
        ],
        features=[
            ("Spray flow 3–4 m³", "喷涂流量3–4 m³"),
            ("Conveying distance 20 m", "输送距离20 m"),
            ("Motor power 4 kW", "电机功率4 kW"),
        ],
        specs=[
            ("Working Pressure", "工作压力", "4 MPa"),
            ("Rated Voltage", "额定电压", "220/380 V"),
            ("Work Efficiency", "工作效率", "15 m/h"),
            ("Spray Flow", "喷涂流量", "3–4 m³"),
            ("Conveying Head", "输送扬程", "10 m"),
            ("Conveying Distance", "输送距离", "20 m"),
            ("Motor Power", "电机功率", "4 kW"),
            ("Machine Weight", "设备重量", "130 kg"),
            ("Machine Length", "设备长度", "1600 mm"),
            ("Machine Width", "设备宽度", "450 mm"),
            ("Overall Height", "整体高度", "800 mm"),
        ],
        seo_primary="Type 311 spraying machine",
        seo_sec=["spraying machine manufacturer China", "construction spraying equipment"],
        seo_lt=["type 311 spraying machine for construction"],
        desc_en="Hebei Pinjin Machinery manufactures Type 311 spraying machines in China for construction spraying applications.",
        desc_zh="河北品锦机械在中国生产311型喷涂机，适用于施工喷涂应用。",
        geo_cat_en="Spraying Machine Equipment",
        geo_cat_zh="喷涂设备",
        what=("A Type 311 construction spraying machine.", "311型施工喷涂机。"),
        who=("Buyers selecting compact spraying machines by catalogue specs.", "按目录参数选择紧凑喷涂机的采购方。"),
        where=("Sites within 20 m conveying distance and 10 m head listed.", "输送距离20 m、扬程10 m目录范围内的现场。"),
        adv=("Published spray flow, power and machine dimensions.", "喷涂流量、功率与外形尺寸公开。"),
    ),
    P(
        id="16",
        slug="type-511-spraying-machine",
        name_en="Type 511 Spraying Machine",
        name_zh="511型喷涂机",
        cat="spraying-machine",
        short_en="Type 511 spraying machine with higher listed work efficiency than Type 311.",
        short_zh="511型喷涂机，目录工作效率高于311型。",
        intro_en="Type 511 Spraying Machine lists working pressure 6–7 MPa (catalogue print showed Pa; aligned to MPa consistent with other Pinjin spraying models), rated voltage 220/380 V, work efficiency 300 m²/h, spray flow 3–4 m³, conveying head 20 m, conveying distance 40 m, motor power 7.5 kW, machine weight 200 kg.",
        intro_zh="511型喷涂机目录：工作压力6–7 MPa（原目录印为Pa，按同系列喷涂机统一为MPa）、额定电压220/380 V、工作效率300 m²/h、喷涂流量3–4 m³、输送扬程20 m、输送距离40 m、电机功率7.5 kW、设备重量200 kg。",
        apps=[
            ("Larger-area construction spraying", "较大面积施工喷涂"),
            ("Finishing work within 40 m distance", "输送距离40 m范围内的饰面作业"),
            ("Sites needing 7.5 kW motor class", "需要7.5 kW电机级别的现场"),
        ],
        features=[
            ("Work efficiency 300 m²/h", "工作效率300 m²/h"),
            ("Conveying distance 40 m", "输送距离40 m"),
            ("Motor power 7.5 kW", "电机功率7.5 kW"),
        ],
        specs=[
            ("Working Pressure", "工作压力", "6–7 MPa"),
            ("Rated Voltage", "额定电压", "220/380 V"),
            ("Work Efficiency", "工作效率", "300 m²/h"),
            ("Spray Flow", "喷涂流量", "3–4 m³"),
            ("Conveying Head", "输送扬程", "20 m"),
            ("Conveying Distance", "输送距离", "40 m"),
            ("Motor Power", "电机功率", "7.5 kW"),
            ("Machine Weight", "设备重量", "200 kg"),
            ("Machine Length", "设备长度", "1800 mm"),
            ("Machine Width", "设备宽度", "500 mm"),
            ("Overall Height", "整体高度", "900 mm"),
        ],
        seo_primary="Type 511 spraying machine",
        seo_sec=["spraying machine manufacturer China", "construction spraying equipment"],
        seo_lt=["type 511 spraying machine for construction finishing"],
        desc_en="Hebei Pinjin Machinery manufactures Type 511 spraying machines in China for construction spraying and finishing applications.",
        desc_zh="河北品锦机械在中国生产511型喷涂机，适用于施工喷涂与饰面应用。",
        geo_cat_en="Spraying Machine Equipment",
        geo_cat_zh="喷涂设备",
        what=("A Type 511 spraying machine with higher listed area efficiency.", "目录面积效率更高的511型喷涂机。"),
        who=("Buyers comparing Type 311 vs Type 511 by distance and power.", "按距离与功率对比311/511的采购方。"),
        where=("Sites within 40 m conveying distance listed.", "输送距离40 m目录范围内的现场。"),
        adv=("Higher listed work efficiency and conveying distance than Type 311.", "目录工作效率与输送距离高于311型。"),
    ),
    P(
        id="17",
        slug="double-cylinder-plunger-spraying-machine",
        name_en="Double Cylinder Plunger Type Spraying Machine",
        name_zh="双缸柱塞式喷涂机",
        cat="spraying-machine",
        short_en="Double cylinder plunger spraying machine for longer conveying distance spraying.",
        short_zh="双缸柱塞式喷涂机，适合更长输送距离喷涂。",
        intro_en="Double Cylinder Plunger Type Spraying Machine lists working pressure 8 MPa (catalogue print showed Pa; aligned to MPa consistent with other Pinjin spraying models), rated voltage 380 V, work efficiency 300 m²/h, spray flow 4 m³, conveying head 40 m, conveying distance 100 m, motor power 11+4.6 kW, machine weight 450 kg.",
        intro_zh="双缸柱塞式喷涂机目录：工作压力8 MPa（原目录印为Pa，按同系列喷涂机统一为MPa）、额定电压380 V、工作效率300 m²/h、喷涂流量4 m³、输送扬程40 m、输送距离100 m、电机功率11+4.6 kW、设备重量450 kg。",
        apps=[
            ("Longer-distance spraying applications", "更长距离喷涂应用"),
            ("Construction finishing", "施工饰面"),
            ("Sites with 380 V supply", "具备380 V供电的现场"),
        ],
        features=[
            ("Conveying distance 100 m", "输送距离100 m"),
            ("Conveying head 40 m", "输送扬程40 m"),
            ("Motor power 11+4.6 kW", "电机功率11+4.6 kW"),
        ],
        specs=[
            ("Working Pressure", "工作压力", "8 MPa"),
            ("Rated Voltage", "额定电压", "380 V"),
            ("Work Efficiency", "工作效率", "300 m²/h"),
            ("Spray Flow", "喷涂流量", "4 m³"),
            ("Conveying Head", "输送扬程", "40 m"),
            ("Conveying Distance", "输送距离", "100 m"),
            ("Motor Power", "电机功率", "11+4.6 kW"),
            ("Machine Weight", "设备重量", "450 kg"),
            ("Machine Length", "设备长度", "1800 mm"),
            ("Machine Width", "设备宽度", "800 mm"),
            ("Overall Height", "整体高度", "1100 mm"),
        ],
        seo_primary="double cylinder plunger spraying machine",
        seo_sec=["plunger spraying machine manufacturer", "construction spraying equipment China"],
        seo_lt=["double cylinder spraying machine for long distance spraying"],
        desc_en="Hebei Pinjin Machinery manufactures double cylinder plunger type spraying machines in China for longer-distance construction spraying applications.",
        desc_zh="河北品锦机械在中国生产双缸柱塞式喷涂机，适用于较长距离施工喷涂。",
        geo_cat_en="Spraying Machine Equipment",
        geo_cat_zh="喷涂设备",
        what=("A double-cylinder plunger spraying machine.", "双缸柱塞式喷涂机。"),
        who=("Buyers needing longer spraying conveying distance than Type 511.", "需要比511型更长喷涂输送距离的采购方。"),
        where=("Sites within 100 m conveying distance / 40 m head listed.", "输送距离100 m、扬程40 m目录范围内的现场。"),
        adv=("Longer listed conveying distance with dual motor power rating.", "更长输送距离与双电机功率标注。"),
    ),
    P(
        id="18",
        slug="concrete-spraying-machine",
        name_en="Concrete Spraying Machine",
        name_zh="混凝土喷浆机",
        cat="spraying-machine",
        short_en="Concrete spraying machine for wet-mix style spraying with published rebound and dust limits.",
        short_zh="混凝土喷浆机，目录含回弹率与机旁粉尘限值。",
        intro_en="Concrete Spraying Machine from Hebei Pinjin Machinery lists maximum production capacity 10 m³/h, concrete outlet pressure 6.1 MPa, hopper volume 0.3 m³, S pipe valve distribution, motor drive 22 kW, rebound rate <10%, machine-side dust <6 mg/m³, and related hydraulic/accelerator parameters as published in the catalogue.",
        intro_zh="混凝土喷浆机目录：最大生产能力10 m³/h、混凝土出口压力6.1 MPa、料斗0.3 m³、S管阀分配、电机驱动22 kW、回弹率<10%、机旁粉尘<6 mg/m³，以及液压与速凝剂相关参数。",
        apps=[
            ("Concrete spraying applications", "混凝土喷浆应用"),
            ("Tunnel and industrial spraying where specs match", "参数匹配的隧道与工业喷浆"),
            ("Projects needing published rebound/dust limits", "需要公开回弹/粉尘限值的项目"),
        ],
        features=[
            ("Max production capacity 10 m³/h", "最大生产能力10 m³/h"),
            ("Outlet pressure 6.1 MPa", "出口压力6.1 MPa"),
            ("Rebound rate <10%", "回弹率<10%"),
        ],
        specs=[
            ("Overall Dimensions (L×W×H)", "外形尺寸（长×宽×高）", "3400 × 1470 × 1660 mm"),
            ("Machine Weight", "设备重量", "2200 kg"),
            ("Maximum Production Capacity", "最大生产能力", "10 m³/h"),
            ("Pump Cylinder Diameter", "泵缸直径", "140 mm"),
            ("Pumping Stroke", "泵送行程", "590 mm"),
            ("Feed Pipe Diameter", "进料管直径", "125–57 mm reducer"),
            ("Concrete Outlet Pressure", "混凝土出口压力", "6.1 MPa"),
            ("Hopper Volume", "料斗容积", "0.3 m³"),
            ("Loading Height", "上料高度", "1150 mm"),
            ("Concrete Distribution Valve", "混凝土分配阀", "S pipe valve"),
            ("Lubrication System", "润滑系统", "Automatic"),
            ("Concrete Slump", "混凝土坍落度", "120–180 mm"),
            ("Cooling Method", "冷却方式", "Air cooling"),
            ("Machine-side Dust", "机旁粉尘", "<6 mg/m³"),
            ("Rebound Rate", "回弹率", "<10%"),
            ("Maximum Aggregate Diameter", "最大骨料粒径", "15 mm"),
            ("Water-cement Ratio", "水灰比", "0.45–0.6"),
            ("Accelerator Pump Model", "速凝剂泵型号", "JSZ330/0.9"),
            ("Drive Mode", "驱动方式", "Motor drive"),
            ("Accelerator Discharge", "速凝剂排量", "330 L/H"),
            ("Maximum Pressure of Accelerator", "速凝剂最大压力", "1 MPa"),
            ("Motor Power", "电机功率", "22 kW"),
            ("Oil Tank Capacity", "油箱容积", "140 L"),
            ("Hydraulic Oil Contamination", "液压油污染度", "NAS 1638 8–9"),
        ],
        seo_primary="concrete spraying machine",
        seo_sec=["concrete spraying machine manufacturer China", "shotcrete equipment supplier"],
        seo_lt=["concrete spraying machine for tunnel and industrial projects"],
        desc_en="Hebei Pinjin Machinery manufactures concrete spraying machines in China for professional concrete spraying applications with published capacity and pressure parameters.",
        desc_zh="河北品锦机械在中国生产混凝土喷浆机，适用于专业混凝土喷浆，并提供公开产能与压力参数。",
        geo_cat_en="Concrete Spraying Equipment",
        geo_cat_zh="混凝土喷浆设备",
        what=("A concrete spraying machine with S pipe valve and motor drive.", "采用S管阀与电机驱动的混凝土喷浆机。"),
        who=("Buyers needing spraying rather than long-distance pumping.", "需要喷浆而非长距离泵送的采购方。"),
        where=("Spraying jobs matched to 10 m³/h capacity and listed aggregate/slump ranges.", "匹配10 m³/h产能及目录骨料/坍落度范围的喷浆作业。"),
        adv=("Detailed catalogue specs including rebound rate and dust limit.", "目录参数详细，含回弹率与粉尘限值。"),
    ),
    P(
        id="19",
        slug="forklift-loader-clamp-type",
        name_en="Four-wheel Drive Forklift Loader - Clamp Type",
        name_zh="四驱叉车装载机-夹抱式",
        cat="material-handling",
        short_en="Four-wheel drive forklift loader with clamp-type attachment options.",
        short_zh="四驱叉车装载机，夹抱式配置。",
        intro_en="Four-wheel Drive Forklift Loader (Clamp Type) lists unloading height 2100 mm, towing weight 3 tons, rated load 980 jin (about 490 kg), vehicle weight 1.02 tons, transmission shaft drive, full hydraulic power steering, maximum lifting height 2800 mm, overall dimensions 3020 × 1305 × 1705 mm. Available colors: Flame Yellow, Military Green.",
        intro_zh="四驱叉车装载机（夹抱式）目录：卸载高度2100 mm、牵引重量3吨、额定载重980斤（约490 kg）、整车重量1.02吨、传动轴传动、全液压助力转向、最大举升高度2800 mm、外形3020 × 1305 × 1705 mm。可选颜色：火焰黄、军绿色。",
        apps=[
            ("Material handling on construction sites", "建筑工地物料搬运"),
            ("Yard loading and unloading", "场内装卸"),
            ("Clamp-type handling tasks", "夹抱式搬运作业"),
        ],
        features=[
            ("Four-wheel drive", "四轮驱动"),
            ("Max lifting height 2800 mm", "最大举升高度2800 mm"),
            ("Full hydraulic power steering", "全液压助力转向"),
        ],
        specs=[
            ("Unloading Height", "卸载高度", "2100 mm"),
            ("Towing Weight", "牵引重量", "3 tons"),
            ("Rated Load", "额定载重", "About 490 kg (catalogue: 980 jin)"),
            ("Vehicle Weight", "整车重量", "1.02 tons"),
            ("Drive Mode", "驱动方式", "Transmission shaft"),
            ("Available Colors", "可选颜色", "Flame Yellow / Military Green"),
            ("Steering System", "转向系统", "Full hydraulic power steering"),
            ("Maximum Lifting Height", "最大举升高度", "2800 mm"),
            ("Overall Dimensions", "外形尺寸", "3020 × 1305 × 1705 mm"),
        ],
        seo_primary="four-wheel drive forklift loader clamp type",
        seo_sec=["forklift loader manufacturer China", "construction material handling equipment"],
        seo_lt=["4WD forklift loader clamp type for construction sites"],
        desc_en="Hebei Pinjin Machinery manufactures four-wheel drive forklift loaders (clamp type) in China for construction site material handling applications.",
        desc_zh="河北品锦机械在中国生产四驱叉车装载机（夹抱式），适用于建筑工地物料搬运。",
        geo_cat_en="Material Handling Equipment",
        geo_cat_zh="物料搬运设备",
        what=("A 4WD forklift loader in clamp-type configuration.", "夹抱式配置的四驱叉车装载机。"),
        who=("Sites needing compact loaders for material handling.", "需要紧凑装载设备进行物料搬运的现场。"),
        where=("Yards and construction areas matched to listed lift/unload heights.", "匹配目录举升/卸载高度的场区与工地。"),
        adv=("Published lift heights, drive mode and color options.", "举升高度、驱动方式与颜色选项公开。"),
    ),
    P(
        id="20",
        slug="forklift-loader-bucket-type",
        name_en="Four-wheel Drive Forklift Loader - Bucket Type",
        name_zh="四驱叉车装载机-铲斗式",
        cat="material-handling",
        short_en="Four-wheel drive forklift loader with bucket-type configuration.",
        short_zh="四驱叉车装载机，铲斗式配置。",
        intro_en="Four-wheel Drive Forklift Loader (Bucket Type) shares catalogue mobility parameters with the clamp type: unloading height 2100 mm, towing weight 3 tons, rated load 980 jin (about 490 kg), vehicle weight 1.02 tons, transmission shaft drive, full hydraulic power steering, maximum lifting height 2800 mm, overall dimensions 3020 × 1305 × 1705 mm. Available colors: Flame Yellow, Military Green.",
        intro_zh="四驱叉车装载机（铲斗式）与夹抱式在目录中共享行走与举升参数：卸载高度2100 mm、牵引重量3吨、额定载重980斤（约490 kg）、整车1.02吨、传动轴传动、全液压助力转向、最大举升2800 mm、外形3020 × 1305 × 1705 mm。可选火焰黄、军绿色。",
        apps=[
            ("Bucket loading of bulk materials", "散料铲装"),
            ("Construction site material handling", "建筑工地物料搬运"),
            ("Yard operations", "场内作业"),
        ],
        features=[
            ("Bucket-type configuration", "铲斗式配置"),
            ("Four-wheel drive", "四轮驱动"),
            ("Max lifting height 2800 mm", "最大举升高度2800 mm"),
        ],
        specs=[
            ("Unloading Height", "卸载高度", "2100 mm"),
            ("Towing Weight", "牵引重量", "3 tons"),
            ("Rated Load", "额定载重", "About 490 kg (catalogue: 980 jin)"),
            ("Vehicle Weight", "整车重量", "1.02 tons"),
            ("Drive Mode", "驱动方式", "Transmission shaft"),
            ("Available Colors", "可选颜色", "Flame Yellow / Military Green"),
            ("Steering System", "转向系统", "Full hydraulic power steering"),
            ("Maximum Lifting Height", "最大举升高度", "2800 mm"),
            ("Overall Dimensions", "外形尺寸", "3020 × 1305 × 1705 mm"),
        ],
        seo_primary="four-wheel drive forklift loader bucket type",
        seo_sec=["forklift loader manufacturer China", "bucket loader for construction sites"],
        seo_lt=["4WD forklift loader bucket type for material handling"],
        desc_en="Hebei Pinjin Machinery manufactures four-wheel drive forklift loaders (bucket type) in China for construction material handling applications.",
        desc_zh="河北品锦机械在中国生产四驱叉车装载机（铲斗式），适用于建筑物料搬运。",
        geo_cat_en="Material Handling Equipment",
        geo_cat_zh="物料搬运设备",
        what=("A 4WD forklift loader in bucket-type configuration.", "铲斗式配置的四驱叉车装载机。"),
        who=("Buyers choosing bucket vs clamp handling configurations.", "在铲斗/夹抱配置间选型的采购方。"),
        where=("Sites needing bucket loading within listed lift heights.", "需要在目录举升高度内进行铲装的现场。"),
        adv=("Same published mobility specs with bucket configuration focus.", "行走参数公开，聚焦铲斗配置。"),
    ),
    P(
        id="21",
        slug="cnc-steel-bar-bending-machine",
        name_en="Fully Automatic CNC Steel Bar Bending Machine",
        name_zh="全自动数控钢筋弯箍机",
        cat="rebar-equipment",
        short_en="Fully automatic CNC steel bar bending machine for stirrup processing.",
        short_zh="全自动数控钢筋弯箍机，用于箍筋加工。",
        intro_en="Fully Automatic CNC Steel Bar Bending Machine lists single strand processing 4–10 mm, double strand 4–8 mm, maximum diagonal size 1250 mm, minimum square stirrup side 80 mm, maximum bending angle 180°, one-way bending, max linear bending speed 110 m/min, max angular speed 1200°/sec, total power 19.2 kW, average power consumption 4 kW/h, equipment dimensions 3800 × 1100 × 1700 mm, weight 1200 kg.",
        intro_zh="全自动数控钢筋弯箍机目录：单股加工直径4–10 mm、双股4–8 mm、最大对角线1250 mm、方形箍筋最小边长80 mm、最大弯曲角度180°、单向弯曲、最大弯曲线速度110 m/min、最大弯曲角速度1200°/sec、总功率19.2 kW、平均耗电4 kW/h、设备尺寸3800 × 1100 × 1700 mm、重量1200 kg。",
        apps=[
            ("Rebar stirrup processing", "钢筋箍筋加工"),
            ("Precast and construction rebar yards", "预制与建筑钢筋加工场"),
            ("Automatic bending workflows", "自动化弯曲加工流程"),
        ],
        features=[
            ("CNC automatic bending", "数控自动弯曲"),
            ("Single strand 4–10 mm range", "单股加工直径4–10 mm"),
            ("Total power 19.2 kW", "总功率19.2 kW"),
        ],
        specs=[
            ("Single Strand Processing Range", "单股加工直径", "4–10 mm"),
            ("Double Strand Processing Range", "双股加工直径", "4–8 mm"),
            ("Maximum Diagonal Size", "最大对角线尺寸", "1250 mm"),
            ("Minimum Side Length of Square Stirrup", "方形箍筋最小边长", "80 mm"),
            ("Maximum Bending Angle", "最大弯曲角度", "180°"),
            ("Bending Direction", "弯曲方向", "One way"),
            ("Maximum Linear Bending Speed", "最大弯曲线速度", "110 m/min"),
            ("Maximum Angular Bending Speed", "最大弯曲角速度", "1200°/sec"),
            ("Total Power", "总功率", "19.2 kW"),
            ("Average Power Consumption", "平均耗电量", "4 kW/h"),
            ("Equipment Dimensions", "设备尺寸", "3800 × 1100 × 1700 mm"),
            ("Equipment Weight", "设备重量", "1200 kg"),
        ],
        seo_primary="CNC steel bar bending machine",
        seo_sec=["automatic rebar stirrup machine manufacturer", "construction equipment manufacturer China"],
        seo_lt=["fully automatic CNC steel bar bending machine for stirrups"],
        desc_en="Hebei Pinjin Machinery manufactures fully automatic CNC steel bar bending machines in China for rebar stirrup processing in construction projects.",
        desc_zh="河北品锦机械在中国生产全自动数控钢筋弯箍机，适用于建筑项目钢筋箍筋加工。",
        geo_cat_en="Rebar Processing Equipment",
        geo_cat_zh="钢筋加工设备",
        what=("A fully automatic CNC machine for steel bar / stirrup bending.", "全自动数控钢筋/箍筋弯曲设备。"),
        who=("Rebar yards and contractors automating stirrup bending.", "需要自动化箍筋弯曲的钢筋场与承包商。"),
        where=("Workshops matched to listed processing diameter and machine size.", "匹配目录加工直径与设备尺寸的加工车间。"),
        adv=("Detailed CNC processing ranges and speed parameters published.", "数控加工范围与速度参数详细公开。"),
    ),
    P(
        id="22",
        slug="13-spiral-feeder",
        name_en="13 Spiral Feeder",
        name_zh="13型螺旋泵",
        cat="concrete-pump",
        short_en="Screw pump / spiral feeder for secondary structure pouring, 3–6 m³/h, 4 kW.",
        short_zh="用于二次结构浇筑的螺旋泵（螺旋给料），额定流量3–6 m³/h，功率4 kW。",
        intro_en="13 Spiral Feeder is a screw pump from Hebei Pinjin Machinery for secondary structure pouring. Published parameters: specification 4 kW, rated flow 3–6 m³/h, rated head custom made, rated power 4 kW, voltage 380 V, weight 90 kg.",
        intro_zh="13型螺旋泵用于二次结构浇筑。公开参数：规格4 kW、额定流量3–6 m³/h、额定扬程可定制、额定功率4 kW、电压380 V、重量90 kg。",
        apps=[
            ("Secondary structure pouring", "二次结构浇筑"),
            ("Compact mobile screw-pump pouring on site", "现场紧凑移动式螺旋泵浇筑"),
            ("Small-volume concrete / mortar delivery where 3–6 m³/h matches demand", "流量需求匹配3–6 m³/h的小方量混凝土/砂浆输送"),
        ],
        features=[
            ("Secondary structure pouring specialist", "二次结构浇筑专家"),
            ("Rated flow 3–6 m³/h", "额定流量3–6 m³/h"),
            ("Lightweight 90 kg mobile unit", "重量90 kg，移动便捷"),
        ],
        specs=[
            ("Specification", "规格", "4 kW"),
            ("Rated Flow", "额定流量", "3–6 m³/h"),
            ("Rated Head", "额定扬程", "Custom made"),
            ("Rated Power", "额定功率", "4 kW"),
            ("Voltage", "电压", "380 V"),
            ("Weight", "重量", "90 kg"),
        ],
        seo_primary="13 spiral feeder screw pump",
        seo_sec=["secondary structure pouring pump", "screw pump manufacturer China", "spiral feeder concrete"],
        seo_lt=["13 spiral feeder for secondary structure pouring"],
        desc_en="Hebei Pinjin Machinery manufactures the 13 Spiral Feeder (screw pump) in China for secondary structure pouring, with 3–6 m³/h rated flow and 4 kW power.",
        desc_zh="河北品锦机械在中国生产13型螺旋泵，用于二次结构浇筑，额定流量3–6 m³/h，功率4 kW。",
        geo_cat_en="Concrete Pump / Screw Pump Equipment",
        geo_cat_zh="混凝土泵 / 螺旋泵设备",
        what=("A compact screw pump / spiral feeder for secondary structure pouring.", "用于二次结构浇筑的紧凑型螺旋泵。"),
        who=("Contractors pouring secondary structures who need a light, mobile screw pump.", "需要轻便移动螺旋泵进行二次结构浇筑的承包商。"),
        where=("Sites with 380 V supply and pour rates within 3–6 m³/h.", "具备380 V供电、浇筑流量在3–6 m³/h范围内的现场。"),
        adv=("Published flow, power and weight with customizable rated head.", "流量、功率与重量公开，额定扬程可定制。"),
    ),
]

HEADER = '''import type { LocalizedText } from '@/i18n/types';

export type ProductCategory =
  | 'concrete-pump'
  | 'spraying-machine'
  | 'material-handling'
  | 'rebar-equipment';

export interface ProductSpec {
  label: LocalizedText;
  value: LocalizedText;
}

export interface ProductSeoKeywords {
  primary: string;
  secondary: string[];
  longTail: string[];
}

export interface ProductSeo {
  title: LocalizedText;
  description: LocalizedText;
  keywords: ProductSeoKeywords;
}

export interface ProductGeo {
  manufacturer: LocalizedText;
  industry: LocalizedText;
  productCategory: LocalizedText;
  manufacturedIn: LocalizedText;
  answers: {
    whatIs: LocalizedText;
    whoNeeds: LocalizedText;
    whereUsed: LocalizedText;
    advantages: LocalizedText;
    howToInquire: LocalizedText;
  };
}

export interface Product {
  id: string;
  name: LocalizedText;
  slug: string;
  category: ProductCategory;
  image: string;
  gallery: string[];
  shortDescription: LocalizedText;
  productIntroduction: LocalizedText;
  applicationScenarios: LocalizedText[];
  keyFeatures: LocalizedText[];
  specifications: ProductSpec[];
  seo: ProductSeo;
  geo: ProductGeo;
}

const L = (en: string, zh: string): LocalizedText => ({ en, zh });
const V = (v: string): LocalizedText => ({ en: v, zh: v });

const MANUFACTURER = L(
  'Hebei Pinjin Machinery Manufacturing Co., Ltd.',
  '河北品锦机械制造有限公司',
);
const INDUSTRY = L('Construction Machinery Manufacturer', '工程机械制造商');
const MADE_IN = L(
  'Renze Industrial Park, Xingtai City, Hebei Province, China',
  '中国河北省邢台市任泽工业园区',
);

function imgPaths(slug: string) {
  const base = `/images/products/${slug}`;
  return {
    image: `${base}/main.webp`,
    gallery: [`${base}/main.webp`, `${base}/detail-1.webp`, `${base}/working.webp`],
  };
}

function spec(labelEn: string, labelZh: string, value: string): ProductSpec {
  return { label: L(labelEn, labelZh), value: V(value) };
}

function buildSeo(
  nameEn: string,
  nameZh: string,
  primary: string,
  secondary: string[],
  longTail: string[],
  descEn: string,
  descZh: string,
): ProductSeo {
  return {
    title: L(
      `${nameEn} Manufacturer | Hebei Pinjin Machinery`,
      `${nameZh}厂家 | 河北品锦机械`,
    ),
    description: L(descEn, descZh),
    keywords: { primary, secondary, longTail },
  };
}

function buildGeo(
  productCategoryEn: string,
  productCategoryZh: string,
  whatIs: LocalizedText,
  whoNeeds: LocalizedText,
  whereUsed: LocalizedText,
  advantages: LocalizedText,
): ProductGeo {
  return {
    manufacturer: MANUFACTURER,
    industry: INDUSTRY,
    productCategory: L(productCategoryEn, productCategoryZh),
    manufacturedIn: MADE_IN,
    answers: {
      whatIs,
      whoNeeds,
      whereUsed,
      advantages,
      howToInquire: L(
        'Request a quotation by email through the Get Quote buttons on this website. Include the model name, required capacity, conveying distance and project conditions. Hebei Pinjin Machinery responds by email with a catalogue-based recommendation.',
        '通过网站「获取报价」按钮发送邮件询盘，请注明型号、所需输送量/能力、输送距离与工况。河北品锦机械将按产品目录参数邮件回复推荐方案。',
      ),
    },
  };
}

/** 旧 slug → 新 slug（兼容已收录链接） */
export const productSlugRedirects: Record<string, string> = {
  'diesel-4100': 'diesel-4100-transfer-pump',
  'll15-diesel': 'll15-diesel-transfer-pump',
  'll15-motor': 'll15-electric-transfer-pump',
  'zs22-25': 'zs22-25-concrete-pump',
  'll28-32': 'll28-32-concrete-pump',
  'diesel-screw-mortar': 'diesel-screw-mortar-spraying-machine',
  'hbt30-37': 'hbt30-37-concrete-pump',
  'hbt45-40': 'hbt45-40-concrete-pump',
  'fully-automatic-plaster': 'automatic-plaster-spraying-machine',
  'hbtt55-50': 'hbtt55-50-concrete-pump',
  'll60-75': 'll60-75-concrete-pump',
  'hbt80-18-140': 'hbt80-18-140-concrete-pump',
};

export const categoryRouteSlugs: Record<ProductCategory, string> = {
  'concrete-pump': 'concrete-pumps',
  'spraying-machine': 'spraying-machines',
  'material-handling': 'material-handling',
  'rebar-equipment': 'rebar-equipment',
};

export const categoryMeta: Record<
  ProductCategory,
  { routeSlug: string; label: LocalizedText; description: LocalizedText }
> = {
  'concrete-pump': {
    routeSlug: 'concrete-pumps',
    label: L('Concrete Pumps', '混凝土泵'),
    description: L(
      'Transfer pumps and concrete pumps for construction material delivery.',
      '用于建筑物料输送的输送泵与混凝土泵。',
    ),
  },
  'spraying-machine': {
    routeSlug: 'spraying-machines',
    label: L('Spraying Machines', '喷涂设备'),
    description: L(
      'Mortar, plaster and concrete spraying equipment for finishing and spraying jobs.',
      '砂浆、石膏与混凝土喷涂设备，用于饰面与喷浆作业。',
    ),
  },
  'material-handling': {
    routeSlug: 'material-handling',
    label: L('Material Handling', '物料搬运'),
    description: L(
      'Spiral feeders and forklift loaders for site material handling.',
      '螺旋给料机与叉车装载机，用于现场物料搬运。',
    ),
  },
  'rebar-equipment': {
    routeSlug: 'rebar-equipment',
    label: L('Rebar Equipment', '钢筋设备'),
    description: L(
      'CNC steel bar bending equipment for stirrup processing.',
      '数控钢筋弯箍设备，用于箍筋加工。',
    ),
  },
};

export const products: Product[] = [
'''

FOOTER = '''
];

export function resolveProductSlug(slug: string): string {
  return productSlugRedirects[slug] ?? slug;
}

export function getProductBySlug(slug: string): Product | undefined {
  const resolved = resolveProductSlug(slug);
  return products.find((p) => p.slug === resolved);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryByRouteSlug(routeSlug: string): ProductCategory | undefined {
  const entry = (Object.entries(categoryMeta) as Array<
    [ProductCategory, (typeof categoryMeta)[ProductCategory]]
  >).find(([, meta]) => meta.routeSlug === routeSlug);
  return entry?.[0];
}

export function getFeaturedProducts(slugs: readonly string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
'''


def main() -> None:
    assert len(PRODUCTS) == 22, len(PRODUCTS)
    body = ",\n".join(product_block(p) for p in PRODUCTS)
    OUT.write_text(HEADER + body + FOOTER, encoding="utf-8")
    print(f"Wrote {OUT} with {len(PRODUCTS)} products")


if __name__ == "__main__":
    main()
