# -*- coding: utf-8 -*-
"""Write src/data/products.ts from the 2026 GPT catalogue sheets."""
from __future__ import annotations

from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "products.ts"


def esc(text: str) -> str:
    return text.replace("\\", "\\\\").replace("'", "\\'")


def L(en: str, zh: str) -> str:
    return f"L('{esc(en)}', '{esc(zh)}')"


def spec_lines(specs: list[tuple[str, str, str]]) -> str:
    return "\n".join(f"      spec('{esc(a)}', '{esc(b)}', '{esc(c)}')," for a, b, c in specs)


def loc_list(items: list[tuple[str, str]]) -> str:
    return ",\n".join(f"      {L(a, b)}" for a, b in items)


def block(p: dict) -> str:
    sec = ", ".join(f"'{esc(s)}'" for s in p["seo_sec"])
    lt = ", ".join(f"'{esc(s)}'" for s in p["seo_lt"])
    return f"""  {{
    id: '{p["id"]}',
    name: {L(p["name_en"], p["name_zh"])},
    slug: '{p["slug"]}',
    category: '{p["cat"]}',
    ...imgPaths('{p["slug"]}'),
    shortDescription: {L(p["short_en"], p["short_zh"])},
    productIntroduction: {L(p["intro_en"], p["intro_zh"])},
    applicationScenarios: [
{loc_list(p["apps"])}
    ],
    keyFeatures: [
{loc_list(p["features"])}
    ],
    specifications: [
{spec_lines(p["specs"])}
    ],
    seo: buildSeo(
      '{esc(p["name_en"])}',
      '{esc(p["name_zh"])}',
      '{esc(p["seo_primary"])}',
      [{sec}],
      [{lt}],
      '{esc(p["desc_en"])}',
      '{esc(p["desc_zh"])}',
    ),
    geo: buildGeo(
      '{esc(p["geo_cat_en"])}',
      '{esc(p["geo_cat_zh"])}',
      {L(*p["what"])},
      {L(*p["who"])},
      {L(*p["where"])},
      {L(*p["adv"])},
    ),
  }}"""


def P(**kwargs):
    return kwargs


E = "electric-concrete-pump"
D = "diesel-concrete-pump"
M = "mixer-pump"

BUILDING = [
    ("Building and commercial concrete placement", "建筑与商业混凝土浇筑"),
    ("Pipeline conveying on construction sites", "施工现场管道输送"),
    ("Projects matched to listed capacity and distance", "对照目录输送量与距离的工程"),
]
DIESEL_APPS = [
    ("Sites without stable grid power", "电网供电不便的工地"),
    ("Rural and infrastructure concrete placement", "农村与基建混凝土浇筑"),
    ("Trailer-mounted diesel pumping jobs", "拖式柴油泵送作业"),
]
MIXER_APPS = [
    ("Sites that mix and pump in one unit", "需要搅拌与泵送一体的工地"),
    ("Rural and self-built house pouring", "农村与自建房浇筑"),
    ("Projects matching listed mixer and pump output", "对照目录搅拌与泵送产量的工程"),
]
COMPACT_APPS = [
    ("Rural self-built houses", "农村自建房"),
    ("Small building sites and secondary structure", "小型工地与二次结构"),
    ("Short-to-medium pipeline pours", "中短距离管路浇筑"),
]


def pump(
    id: str,
    slug: str,
    cat: str,
    name_en: str,
    name_zh: str,
    kind_en: str,
    kind_zh: str,
    highlights: str,
    highlights_zh: str,
    specs: list[tuple[str, str, str]],
    features: list[tuple[str, str]],
    apps: list[tuple[str, str]],
    seo_primary: str,
    geo_cat_en: str,
    geo_cat_zh: str,
) -> dict:
    intro_en = (
        f"{name_en} is a {kind_en} manufactured by Hebei Pinjin Machinery in Xingtai, Hebei, China. "
        f"Catalogue parameters: {highlights}."
    )
    intro_zh = (
        f"{name_zh}由河北品锦机械在中国河北邢台制造，属于{kind_zh}。"
        f"目录参数：{highlights_zh}。"
    )
    desc_en = (
        f"Hebei Pinjin Machinery manufactures the {name_en} in Xingtai, Hebei, China. "
        f"Catalogue data: {highlights}."
    )
    desc_zh = (
        f"河北品锦机械在中国河北邢台生产{name_zh}。目录数据：{highlights_zh}。"
    )
    return P(
        id=id,
        slug=slug,
        cat=cat,
        name_en=name_en,
        name_zh=name_zh,
        short_en=f"{kind_en} from the Xingtai factory catalogue — {highlights.split('.')[0]}.",
        short_zh=f"邢台工厂目录中的{kind_zh}，{highlights_zh.split('。')[0]}。",
        intro_en=intro_en,
        intro_zh=intro_zh,
        apps=apps,
        features=features,
        specs=specs,
        seo_primary=seo_primary,
        seo_sec=[
            f"{name_en.lower()} manufacturer China",
            "concrete pump manufacturer China",
            "Xingtai concrete pump factory",
        ],
        seo_lt=[
            f"buy {name_en.lower()} from Hebei Pinjin Machinery Xingtai",
            f"{name_en.lower()} supplier China factory",
        ],
        desc_en=desc_en,
        desc_zh=desc_zh,
        geo_cat_en=geo_cat_en,
        geo_cat_zh=geo_cat_zh,
        what=(
            f"A {kind_en} listed in the Hebei Pinjin Machinery catalogue and manufactured in Xingtai, China.",
            f"河北品锦机械目录中的{kind_zh}，在中国邢台制造。",
        ),
        who=(
            "Contractors matching published output, pressure and conveying distance to the site.",
            "需要按已公布输送量、压力与输送距离对照工况的承包商。",
        ),
        where=(
            "Construction sites in China and export projects whose pipeline length and aggregate size stay within the listed table.",
            "管路长度与骨料粒径落在目录表范围内的国内与出口工地。",
        ),
        adv=(
            "Factory-direct Xingtai manufacturer with published catalogue tables for output, pressure, hopper and conveying distance.",
            "邢台工厂直供，目录公开输送量、压力、料斗与输送距离。",
        ),
    )


PRODUCTS = [
    pump(
        "01", "electric-20-concrete-pump", E,
        "Electric 20 Concrete Pump", "电动20型混凝土泵",
        "electric trailer concrete pump", "电动拖式混凝土泵",
        "22 kW motor, 8–10 m³/h output, 10 MPa, 120 m horizontal / 40 m vertical",
        "电机22 kW、输送量8–10 m³/h、出口压力10 MPa、水平120 m / 垂直40 m",
        [
            ("Model", "型号", "Electric 20"),
            ("Motor Power", "电机功率", "22 kW"),
            ("Output Capacity", "理论输送量", "8–10 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "10 MPa"),
            ("Hopper Capacity", "料斗容积", "0.25 m³"),
            ("Pumping Distance (H / V)", "输送距离（水平/垂直）", "120 m / 40 m"),
            ("Delivery Pipe Diameter", "输送管内径", "80 mm"),
            ("Max. Aggregate Size", "最大骨料粒径", "1–2 cm"),
            ("Dimensions (L×W×H)", "外形尺寸", "2800 × 1300 × 1500 mm"),
            ("Main Unit Weight", "整机重量", "900 kg"),
        ],
        [("Motor power 22 kW", "电机功率22 kW"), ("Output 8–10 m³/h", "输送量8–10 m³/h"), ("Weight 900 kg", "整机重量900 kg")],
        BUILDING, "Electric 20 concrete pump manufacturer China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "02", "electric-30-concrete-pump", E,
        "Electric 30 Concrete Pump", "电动30型混凝土泵",
        "electric trailer concrete pump", "电动拖式混凝土泵",
        "30 kW motor, 12–15 m³/h, 20 MPa, fine-stone 60 m / 180 m",
        "电机30 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平60 m / 垂直180 m",
        [
            ("Model", "型号", "Electric 30"),
            ("Motor Power", "电机功率", "30 kW"),
            ("Output Capacity", "理论输送量", "12–15 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "20 MPa"),
            ("Hopper Capacity", "料斗容积", "0.3 m³"),
            ("Fine Stone Pumping (H / V)", "细石输送（水平/垂直）", "60 m / 180 m"),
            ("Aggregate 13 Pumping (H / V)", "13 骨料输送（水平/垂直）", "20 m / 60 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "≤ 3 cm"),
            ("Dimensions (L×W×H)", "外形尺寸", "3300 × 1500 × 1500 mm"),
            ("Main Unit Weight", "整机重量", "1200 kg"),
        ],
        [("Motor power 30 kW", "电机功率30 kW"), ("Output 12–15 m³/h", "输送量12–15 m³/h"), ("Outlet pressure 20 MPa", "出口压力20 MPa")],
        BUILDING, "Electric 30 concrete pump manufacturer China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "03", "electric-low-pressure-40-concrete-pump", E,
        "Electric Low Pressure 40 Concrete Pump", "电动低压40型混凝土泵",
        "electric low-pressure trailer concrete pump", "电动低压拖式混凝土泵",
        "37 kW motor, 12–15 m³/h, 20 MPa, fine-stone 80 m / 240 m",
        "电机37 kW、输送量12–15 m³/h、出口压力20 MPa、细石水平80 m / 垂直240 m",
        [
            ("Model", "型号", "Electric Low Pressure 40"),
            ("Motor Power", "电机功率", "37 kW"),
            ("Output Capacity", "理论输送量", "12–15 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "20 MPa"),
            ("Hopper Capacity", "料斗容积", "0.3 m³"),
            ("Fine Stone Pumping (H / V)", "细石输送（水平/垂直）", "80 m / 240 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki 112"),
            ("Dimensions (L×W×H)", "外形尺寸", "3300 × 1500 × 1500 mm"),
            ("Main Unit Weight", "整机重量", "1200 kg"),
        ],
        [("Motor power 37 kW", "电机功率37 kW"), ("Fine-stone 80 m / 240 m", "细石 80 m / 240 m"), ("Kawasaki 112 hydraulic pump", "川崎112液压泵")],
        BUILDING, "Electric low pressure 40 concrete pump China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "04", "electric-40-concrete-pump", E,
        "Electric 40 Concrete Pump", "电动40型混凝土泵",
        "electric trailer concrete pump", "电动拖式混凝土泵",
        "45 kW motor, 21 m³/h, 23 MPa, fine-stone 120 m / 360 m",
        "电机45 kW、输送量21 m³/h、出口压力23 MPa、细石水平120 m / 垂直360 m",
        [
            ("Model", "型号", "Electric 40"),
            ("Motor Power", "电机功率", "45 kW"),
            ("Output Capacity", "理论输送量", "21 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "23 MPa"),
            ("Hopper Capacity", "料斗容积", "0.4 m³"),
            ("Fine Stone Pumping (H / V)", "细石输送（水平/垂直）", "120 m / 360 m"),
            ("Aggregate 13 Pumping (H / V)", "13 骨料输送（水平/垂直）", "40 m / 120 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki 112"),
            ("Dimensions (L×W×H)", "外形尺寸", "3900 × 1500 × 1600 mm"),
            ("Main Unit Weight", "整机重量", "2300 kg"),
        ],
        [("Motor power 45 kW", "电机功率45 kW"), ("Output 21 m³/h", "输送量21 m³/h"), ("Fine-stone 120 m / 360 m", "细石 120 m / 360 m")],
        BUILDING, "Electric 40 concrete pump manufacturer China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "05", "electric-80-concrete-pump", E,
        "Electric 80 Concrete Pump", "电动80型混凝土泵",
        "high-capacity electric trailer concrete pump", "大排量电动拖式混凝土泵",
        "110 kW, 60 m³/h, 40 MPa, 900 m horizontal / 300 m vertical (2 cm aggregate), model HBT80-1816-110",
        "110 kW、60 m³/h、40 MPa、水平900 m / 垂直300 m（2 cm骨料），型号 HBT80-1816-110",
        [
            ("Model", "型号", "Electric 80 / HBT80-1816-110"),
            ("Motor Power", "电机功率", "110 kW"),
            ("Output Capacity", "理论输送量", "60 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "40 MPa"),
            ("Hopper Capacity", "料斗容积", "0.7 m³"),
            ("Pumping Distance (H / V)", "输送距离（水平/垂直）", "900 m / 300 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "24 mm (≤ 2 cm)"),
            ("Hydraulic Pump", "液压泵", "Kawasaki 140 double pump"),
            ("Dimensions (L×W×H)", "外形尺寸", "6600 × 1800 × 1800 mm"),
            ("Main Unit Weight", "整机重量", "6000 kg"),
        ],
        [("110 kW / 60 m³/h", "110 kW / 60 m³/h"), ("900 m / 300 m conveying", "水平900 m / 垂直300 m"), ("HBT80-1816-110", "HBT80-1816-110")],
        [
            ("High-rise and long-distance pumping", "高层与长距离泵送"),
            ("Large commercial and infrastructure pours", "大型商业与基建浇筑"),
            ("Jobs needing 60 m³/h catalogue output", "需要目录60 m³/h输送量的工程"),
        ],
        "Electric 80 HBT80 concrete pump manufacturer China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "06", "diesel-30-concrete-pump", D,
        "Diesel 30 Concrete Pump", "柴油30型混凝土泵",
        "diesel trailer concrete pump", "柴油拖式混凝土泵",
        "4105 diesel 56 kW, 15 m³/h, 20 MPa, 60 m / 180 m (1 cm aggregate)",
        "4105柴油机56 kW、输送量15 m³/h、压力20 MPa、水平60 m / 垂直180 m（1 cm骨料）",
        [
            ("Model", "型号", "Diesel 30"),
            ("Diesel Engine (Power)", "柴油机功率", "4105 / 56 kW"),
            ("Theoretical Output", "理论输送量", "15 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "20 MPa"),
            ("Hopper Capacity", "料斗容积", "0.3 m³"),
            ("Pumping Distance (H / V)", "输送距离（水平/垂直）", "60 m / 180 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "3 cm and below"),
            ("Dimensions (L×W×H)", "外形尺寸", "4000 × 1500 × 1800 mm"),
            ("Main Unit Weight", "整机重量", "2000 kg"),
        ],
        [("4105 / 56 kW diesel", "4105 / 56 kW柴油机"), ("Output 15 m³/h", "输送量15 m³/h"), ("60 m / 180 m", "水平60 m / 垂直180 m")],
        DIESEL_APPS, "Diesel 30 concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "07", "diesel-40-concrete-pump", D,
        "Diesel 40 Concrete Pump", "柴油40型混凝土泵",
        "diesel trailer concrete pump", "柴油拖式混凝土泵",
        "4108 diesel 66 kW, 26 m³/h, 25 MPa, 120 m / 360 m (1 cm aggregate)",
        "4108柴油机66 kW、输送量26 m³/h、压力25 MPa、水平120 m / 垂直360 m（1 cm骨料）",
        [
            ("Model", "型号", "Diesel 40"),
            ("Diesel Engine (Power)", "柴油机功率", "4108 / 66 kW"),
            ("Theoretical Output", "理论输送量", "26 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "25 MPa"),
            ("Hopper Capacity", "料斗容积", "0.4 m³"),
            ("Pumping Distance (H / V)", "输送距离（水平/垂直）", "120 m / 360 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki 112"),
            ("Dimensions (L×W×H)", "外形尺寸", "4200 × 1600 × 1800 mm"),
            ("Main Unit Weight", "整机重量", "2800 kg"),
        ],
        [("4108 / 66 kW diesel", "4108 / 66 kW柴油机"), ("Output 26 m³/h", "输送量26 m³/h"), ("120 m / 360 m", "水平120 m / 垂直360 m")],
        DIESEL_APPS, "Diesel 40 concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "08", "diesel-50-concrete-pump", D,
        "Diesel 50 Concrete Pump", "柴油50型混凝土泵",
        "diesel trailer concrete pump", "柴油拖式混凝土泵",
        "6105 diesel 99 kW, 30 m³/h, 30 MPa, 150 m / 450 m (1 cm aggregate)",
        "6105柴油机99 kW、输送量30 m³/h、压力30 MPa、水平150 m / 垂直450 m（1 cm骨料）",
        [
            ("Model", "型号", "Diesel 50"),
            ("Diesel Engine (Power)", "柴油机功率", "6105 / 99 kW"),
            ("Theoretical Output", "理论输送量", "30 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "30 MPa"),
            ("Hopper Capacity", "料斗容积", "0.4 m³"),
            ("Pumping Distance (H / V)", "输送距离（水平/垂直）", "150 m / 450 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki 140"),
            ("Dimensions (L×W×H)", "外形尺寸", "4600 × 1650 × 1850 mm"),
            ("Main Unit Weight", "整机重量", "3300 kg"),
        ],
        [("6105 / 99 kW diesel", "6105 / 99 kW柴油机"), ("Output 30 m³/h", "输送量30 m³/h"), ("150 m / 450 m", "水平150 m / 垂直450 m")],
        DIESEL_APPS, "Diesel 50 concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "09", "diesel-60-concrete-pump", D,
        "Diesel 60 Concrete Pump", "柴油60型混凝土泵",
        "diesel trailer concrete pump", "柴油拖式混凝土泵",
        "6105 diesel 144 kW, 35 m³/h, 30 MPa, 150 m / 350 m, model HBT60-13.132",
        "6105柴油机144 kW、输送量35 m³/h、压力30 MPa、水平150 m / 垂直350 m，型号 HBT60-13.132",
        [
            ("Model", "型号", "Diesel 60 / HBT60-13.132"),
            ("Diesel Engine (Power)", "柴油机功率", "6105 / 144 kW"),
            ("Theoretical Output", "理论输送量", "35 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "30 MPa"),
            ("Hopper Capacity", "料斗容积", "0.4 m³"),
            ("Pumping Distance (H / V)", "输送距离（水平/垂直）", "150 m / 350 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki double pump 100"),
            ("Dimensions (L×W×H)", "外形尺寸", "4800 × 1700 × 1700 mm"),
            ("Main Unit Weight", "整机重量", "3500 kg"),
        ],
        [("144 kW diesel", "144 kW柴油机"), ("Output 35 m³/h", "输送量35 m³/h"), ("HBT60-13.132", "HBT60-13.132")],
        DIESEL_APPS, "Diesel 60 HBT60 concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "10", "electric-10-series-concrete-pump", E,
        "Electric 10 Series Concrete Pump", "电动10系列混凝土泵",
        "compact electric concrete pump", "紧凑型电动混凝土泵",
        "15 kW motor, 21 m³/h theoretical output, 23 MPa, 25 m horizontal, 400 kg",
        "电机15 kW、理论输送量21 m³/h、压力23 MPa、水平25 m、重量400 kg",
        [
            ("Model", "型号", "Electric 10 Series"),
            ("Motor Power", "电机功率", "15 kW"),
            ("Theoretical Output", "理论输送量", "21 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "23 MPa"),
            ("Hopper Capacity", "料斗容积", "0.1 m³"),
            ("Pumping Distance (Horizontal)", "水平输送距离", "25 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "2 cm and below"),
            ("Dimensions (L×W×H)", "外形尺寸", "1800 × 800 × 1200 mm"),
            ("Main Unit Weight", "整机重量", "400 kg"),
        ],
        [("15 kW compact unit", "15 kW紧凑机型"), ("Weight 400 kg", "重量400 kg"), ("Output 21 m³/h", "输送量21 m³/h")],
        COMPACT_APPS, "Electric 10 series compact concrete pump China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "11", "integrated-mixer-pump", M,
        "Integrated Mixer Pump", "搅拌泵一体机",
        "electric integrated concrete mixer pump", "电动混凝土搅拌泵送一体机",
        "main motor 45 kW plus mixer 14 kW, 21 m³/h, 23 MPa, 100 m / 300 m",
        "主电机45 kW、搅拌电机14 kW、输送量21 m³/h、压力23 MPa、水平100 m / 垂直300 m",
        [
            ("Model", "型号", "Integrated Mixer Pump"),
            ("Main Motor / Mixer Motor", "主电机 / 搅拌电机", "45 kW / 14 kW"),
            ("Theoretical Output", "理论输送量", "21 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "23 MPa"),
            ("Hopper Capacity", "料斗容积", "0.4 m³"),
            ("Pumping Distance (H / V)", "输送距离（水平/垂直）", "100 m / 300 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "4 cm and below"),
            ("Delivery Pipe Diameter", "输送管内径", "100 / 125 mm"),
            ("Dimensions (L×W×H)", "外形尺寸", "3900 × 1500 × 1600 mm"),
            ("Main Unit Weight", "整机重量", "4500 kg"),
            ("Series Note", "系列说明", "30 series with 400 mixer; 40/50 series with 500 mixer"),
        ],
        [("Mix and pump in one unit", "搅拌与泵送一体"), ("45 kW + 14 kW", "45 kW + 14 kW"), ("100 m / 300 m", "水平100 m / 垂直300 m")],
        MIXER_APPS, "Integrated concrete mixer pump manufacturer China",
        "Concrete Mixer Pump", "混凝土搅拌泵",
    ),
    pump(
        "12", "hbt8018-concrete-pump", E,
        "HBT8018 Concrete Pump", "HBT8018混凝土泵",
        "HBT-series trailer concrete pump", "HBT系列拖式混凝土泵",
        "132 kW motor, 60 m³/h, 40 MPa, 150 m conveying, model HBT8018-132S",
        "电机132 kW、输送量60 m³/h、压力40 MPa、输送距离150 m，型号 HBT8018-132S",
        [
            ("Model", "型号", "HBT8018 / HBT8018-132S"),
            ("Motor Power", "电机功率", "132 kW"),
            ("Theoretical Output", "理论输送量", "60 m³/h"),
            ("Pumping Pressure", "泵送压力", "40 MPa"),
            ("Conveying Distance", "输送距离", "150 m"),
            ("Delivery Height", "输送高度", "450 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "4 cm and below"),
            ("Delivery Pipe Diameter", "输送管内径", "100 / 125 mm"),
            ("Dimensions (L×W×H)", "外形尺寸", "6700 × 1750 × 1800 mm"),
            ("Total Weight", "整机重量", "6500 kg"),
        ],
        [("132 kW / 60 m³/h", "132 kW / 60 m³/h"), ("HBT8018-132S", "HBT8018-132S"), ("40 MPa pumping pressure", "泵送压力40 MPa")],
        [
            ("High-output trailer pumping", "大排量拖式泵送"),
            ("Infrastructure and high-rise pours", "基建与高层浇筑"),
            ("Jobs listed at 60 m³/h", "目录60 m³/h工况"),
        ],
        "HBT8018 concrete pump manufacturer China",
        "Trailer Concrete Pump", "拖式混凝土泵",
    ),
    pump(
        "13", "hbt80-16-concrete-pump", E,
        "HBT80-16 Concrete Pump", "HBT80-16混凝土泵",
        "HBT-series trailer concrete pump", "HBT系列拖式混凝土泵",
        "110 kW motor, 50 m³/h, 40 MPa, 120 m conveying, model HBT80-1816-110",
        "电机110 kW、输送量50 m³/h、压力40 MPa、输送距离120 m，型号 HBT80-1816-110",
        [
            ("Model", "型号", "HBT80-16 / HBT80-1816-110"),
            ("Motor Power", "电机功率", "110 kW"),
            ("Theoretical Output", "理论输送量", "50 m³/h"),
            ("Pumping Pressure", "泵送压力", "40 MPa"),
            ("Conveying Distance (Horizontal)", "水平输送距离", "120 m"),
            ("Delivery Height", "输送高度", "360 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "4 cm and below"),
            ("Delivery Pipe Diameter", "输送管内径", "100 / 125 mm"),
            ("Dimensions (L×W×H)", "外形尺寸", "6600 × 1750 × 1800 mm"),
            ("Total Weight", "整机重量", "6500 kg"),
        ],
        [("110 kW / 50 m³/h", "110 kW / 50 m³/h"), ("HBT80-1816-110", "HBT80-1816-110"), ("40 MPa", "40 MPa")],
        BUILDING, "HBT80-16 concrete pump manufacturer China",
        "Trailer Concrete Pump", "拖式混凝土泵",
    ),
    pump(
        "14", "lz-60-diesel-concrete-pump", D,
        "LZ-60 Diesel Concrete Pump", "LZ-60柴油混凝土泵",
        "diesel trailer concrete pump", "柴油拖式混凝土泵",
        "6105 diesel 145 kW, 50 m³/h, 35 MPa, 100 m conveying / 300 m height, HBT60-13.132 on the unit",
        "6105柴油机145 kW、输送量50 m³/h、压力35 MPa、水平100 m / 高度300 m，机身标识 HBT60-13.132",
        [
            ("Model", "型号", "LZ-60 / HBT60-13.132"),
            ("Engine Power", "发动机功率", "6105 / 145 kW"),
            ("Theoretical Output", "理论输送量", "50 m³/h"),
            ("Pumping Pressure", "泵送压力", "35 MPa"),
            ("Conveying Distance", "输送距离", "100 m"),
            ("Delivery Height", "输送高度", "300 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "4 cm and below"),
            ("Delivery Pipe Diameter", "输送管内径", "100 / 125 mm"),
            ("Dimensions (L×W×H)", "外形尺寸", "6.6 × 1.8 × 1.9 m"),
            ("Total Weight", "整机重量", "5500 kg"),
        ],
        [("145 kW diesel", "145 kW柴油机"), ("Output 50 m³/h", "输送量50 m³/h"), ("300 m delivery height", "输送高度300 m")],
        DIESEL_APPS, "LZ-60 diesel concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "15", "lz-80-diesel-concrete-pump", D,
        "LZ-80 Diesel Concrete Pump", "LZ-80柴油混凝土泵",
        "high-capacity diesel trailer concrete pump", "大排量柴油拖式混凝土泵",
        "Yuchai 256 kW, high pressure ≤ 65 m³/h / low pressure ≤ 95 m³/h, ≤ 35 / 22 MPa",
        "玉柴256 kW、高压≤65 m³/h / 低压≤95 m³/h、压力高压≤35 MPa / 低压≤22 MPa",
        [
            ("Model", "型号", "LZ-80"),
            ("Engine (Diesel)", "柴油发动机", "256 kW (Yuchai)"),
            ("Theoretical Output", "理论输送量", "High pressure ≤ 65 m³/h; low pressure ≤ 95 m³/h"),
            ("Pumping Pressure", "泵送压力", "High pressure ≤ 35 MPa; low pressure ≤ 22 MPa"),
            ("Hopper Capacity", "料斗容积", "0.6 m³"),
            ("Conveying Distance", "输送距离", "120 m"),
            ("Delivery Height", "输送高度", "Consult factory standard"),
            ("Max. Aggregate Size", "最大骨料粒径", "6 cm and below"),
            ("Hydraulic Pump", "液压泵", "Kawasaki double 140"),
            ("Dimensions (L×W×H)", "外形尺寸", "6.6 × 1.8 × 1.9 m"),
            ("Total Weight", "整机重量", "6800 kg"),
        ],
        [("Yuchai 256 kW", "玉柴256 kW"), ("Up to 95 m³/h low pressure", "低压可达95 m³/h"), ("6 cm aggregate", "骨料最大6 cm")],
        [
            ("High-volume diesel pumping", "大排量柴油泵送"),
            ("Coarse aggregate pours up to 6 cm", "最大6 cm粗骨料浇筑"),
            ("Infrastructure jobs at listed pressure modes", "对照高压/低压模式的基建工程"),
        ],
        "LZ-80 diesel concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "16", "diesel-120-concrete-pump", D,
        "Diesel 120 Concrete Pump", "柴油120型混凝土泵",
        "high-capacity diesel trailer concrete pump", "大排量柴油拖式混凝土泵",
        "twin 145 kW diesels (290 kW total), 100 m³/h, 40 MPa, 150 m / 500 m",
        "双机145 kW柴油机（合计290 kW）、输送量100 m³/h、压力40 MPa、水平150 m / 垂直500 m",
        [
            ("Model", "型号", "Diesel 120"),
            ("Engine Power (Diesel)", "柴油机功率", "290 kW (two units 145 kW)"),
            ("Theoretical Output", "理论输送量", "100 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "40 MPa"),
            ("Hopper Capacity", "料斗容积", "0.6 m³"),
            ("Conveying Distance (H / V)", "输送距离（水平/垂直）", "150 m / 500 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki 112 (two units)"),
            ("Max. Aggregate Size", "最大骨料粒径", "6 cm and below"),
            ("Dimensions (L×W×H)", "外形尺寸", "7000 × 2000 × 2300 mm"),
            ("Main Unit Weight", "整机重量", "8000 kg"),
        ],
        [("Twin 145 kW / 290 kW", "双机145 kW / 合计290 kW"), ("Output 100 m³/h", "输送量100 m³/h"), ("150 m / 500 m", "水平150 m / 垂直500 m")],
        [
            ("Very high output infrastructure pours", "超大排量基建浇筑"),
            ("Long vertical conveying within 500 m listing", "目录垂直500 m范围内的长距离输送"),
            ("Jobs needing twin-engine diesel power", "需要双柴油机动力的工程"),
        ],
        "Diesel 120 concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "17", "diesel-mixer-integrated-pump", M,
        "Diesel Mixer Integrated Pump", "柴油搅拌泵一体机",
        "diesel integrated concrete mixer pump", "柴油混凝土搅拌泵送一体机",
        "4108 diesel 66–75 kW, 25 m³/h, 23 MPa, stone 100 m / 300 m",
        "4108柴油机66–75 kW、输送量25 m³/h、压力23 MPa、细石高度/水平 100 / 300",
        [
            ("Model", "型号", "Diesel Mixer Integrated"),
            ("Diesel Engine", "柴油机", "4108 / 66–75 kW"),
            ("Theoretical Output", "理论输送量", "25 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "23 MPa"),
            ("Hopper Capacity", "料斗容积", "0.4 m³"),
            ("Stone Capacity (H / V, ≤ 1 inch)", "细石输送（水平/垂直）", "100 / 300 m"),
            ("13 mm Stone (H / V)", "13 mm石子（水平/垂直）", "60 / 180 m"),
            ("24 mm Stone (H / V)", "24 mm石子（水平/垂直）", "40 / 120 m"),
            ("Dimensions (L×W×H)", "外形尺寸", "4100 × 2200 × 3000 mm"),
            ("Main Unit Weight", "整机重量", "4200 kg"),
            ("Series Note", "系列说明", "30 model with 400 mixer; 40/50 model with 500 mixer"),
        ],
        [("Diesel mix-and-pump", "柴油搅拌泵送一体"), ("25 m³/h", "25 m³/h"), ("66–75 kW", "66–75 kW")],
        MIXER_APPS, "Diesel mixer integrated concrete pump China",
        "Concrete Mixer Pump", "混凝土搅拌泵",
    ),
    pump(
        "18", "tractor-4100-concrete-pump", D,
        "Tractor-Driven 4100 Concrete Pump", "拖拉机带动4100混凝土泵",
        "tractor-driven concrete pump for rural houses", "农村自建房拖拉机带动混凝土泵",
        "40 kW, 6–12 m³/h, 15 MPa, 40–100 m horizontal / 15–45 m vertical",
        "40 kW、输送量6–12 m³/h、压力15 MPa、水平40–100 m / 垂直15–45 m",
        [
            ("Model", "型号", "Tractor-Driven 4100"),
            ("Motor Power", "功率", "40 kW"),
            ("Theoretical Output", "理论输送量", "6–12 m³/h"),
            ("Pumping Pressure", "泵送压力", "15 MPa"),
            ("Conveying Distance (H / V)", "输送距离（水平/垂直）", "40–100 m / 15–45 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "1–3 cm"),
            ("Hopper Capacity", "料斗容积", "0.25 m³"),
            ("Concrete Slump", "坍落度", "180–220 mm"),
            ("Dimensions (L×W×H)", "外形尺寸", "2900 × 1000 × 1350 mm"),
            ("Total Weight", "整机重量", "1300 kg"),
        ],
        [("Tractor-driven 4100", "拖拉机带动4100"), ("6–12 m³/h", "6–12 m³/h"), ("Rural house pumping", "农村自建房泵送")],
        COMPACT_APPS, "Tractor driven 4100 rural concrete pump China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "19", "electric-15-concrete-pump", E,
        "Electric 15 Concrete Pump", "电动15型混凝土泵",
        "compact electric concrete pump", "紧凑型电动混凝土泵",
        "15 kW, 8–10 m³/h, 15–20 m vertical / 60–80 m horizontal, 450 kg",
        "15 kW、输送量8–10 m³/h、垂直15–20 m / 水平60–80 m、重量450 kg",
        [
            ("Model", "型号", "Electric 15"),
            ("Motor Power", "电机功率", "15 kW"),
            ("Theoretical Output", "理论输送量", "8–10 m³/h"),
            ("Vertical Delivery Height", "垂直输送高度", "15–20 m"),
            ("Horizontal Delivery Distance", "水平输送距离", "60–80 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "1–3 cm"),
            ("Delivery Pipe Diameter", "输送管内径", "100–125 mm"),
            ("Dimensions (L×W×H)", "外形尺寸", "1900 × 900 × 1200 mm"),
            ("Total Weight", "整机重量", "450 kg"),
        ],
        [("15 kW compact pump", "15 kW紧凑泵"), ("8–10 m³/h", "8–10 m³/h"), ("Weight 450 kg", "重量450 kg")],
        COMPACT_APPS, "Electric 15 compact concrete pump manufacturer China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "20", "rural-diesel-concrete-pump", D,
        "Rural Diesel Concrete Pump", "农村自建房柴油混凝土泵",
        "compact diesel concrete pump for rural houses", "农村自建房紧凑型柴油混凝土泵",
        "17 kW diesel, 5–8 m³/h, 15 MPa, 30–50 m horizontal / 10–30 m vertical",
        "17 kW柴油机、输送量5–8 m³/h、压力15 MPa、水平30–50 m / 垂直10–30 m",
        [
            ("Model", "型号", "Rural Self-Built House Diesel Pump"),
            ("Diesel Engine Power", "柴油机功率", "17 kW"),
            ("Theoretical Output", "理论输送量", "5–8 m³/h"),
            ("Pumping Pressure", "泵送压力", "15 MPa"),
            ("Horizontal Delivery Distance", "水平输送距离", "30–50 m"),
            ("Vertical Delivery Height", "垂直输送高度", "10–30 m"),
            ("Max. Aggregate Size", "最大骨料粒径", "1–3 cm"),
            ("Hopper Capacity", "料斗容积", "0.2 m³"),
            ("Dimensions (L×W×H)", "外形尺寸", "2200 × 1100 × 1250 mm"),
            ("Total Weight", "整机重量", "800 kg"),
        ],
        [("17 kW diesel", "17 kW柴油机"), ("5–8 m³/h", "5–8 m³/h"), ("Rural house compact pump", "农村自建房紧凑泵")],
        COMPACT_APPS, "Rural diesel concrete pump manufacturer China",
        "Diesel Concrete Pump", "柴油混凝土泵",
    ),
    pump(
        "21", "electric-50-concrete-pump", E,
        "Electric 50 Concrete Pump", "电动50型混凝土泵",
        "electric trailer concrete pump", "电动拖式混凝土泵",
        "55 kW motor, 26 m³/h, 30 MPa, fine stone 150 m / 350 m",
        "电机55 kW、输送量26 m³/h、压力30 MPa、细石水平150 m / 垂直350 m",
        [
            ("Model", "型号", "Electric 50"),
            ("Motor Power", "电机功率", "55 kW"),
            ("Theoretical Output", "理论输送量", "26 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "30 MPa"),
            ("Hopper Capacity", "料斗容积", "0.4 m³"),
            ("Fine Stone Conveying (H / V)", "细石输送（水平/垂直）", "150 m / 350 m"),
            ("13 mm Stone (H / V)", "13 mm石子（水平/垂直）", "80 m / 240 m"),
            ("24 mm Stone (H / V)", "24 mm石子（水平/垂直）", "60 m / 180 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki 140"),
            ("Dimensions (L×W×H)", "外形尺寸", "4100 × 1600 × 1600 mm"),
            ("Main Unit Weight", "整机重量", "2800 kg"),
        ],
        [("55 kW / 26 m³/h", "55 kW / 26 m³/h"), ("Fine stone 150 m / 350 m", "细石 150 m / 350 m"), ("Kawasaki 140", "川崎140液压泵")],
        BUILDING, "Electric 50 concrete pump manufacturer China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "22", "electric-low-pressure-60-concrete-pump", E,
        "Electric Low Pressure 60 Concrete Pump", "电动低压60型混凝土泵",
        "electric low-pressure trailer concrete pump", "电动低压拖式混凝土泵",
        "75 kW (Electric 75-60), 35 m³/h, 30 MPa, fine stone 150 m / 350 m",
        "75 kW（Electric 75-60）、输送量35 m³/h、压力30 MPa、细石水平150 m / 垂直350 m",
        [
            ("Model", "型号", "Electric Low Pressure 60 / Electric 75-60"),
            ("Motor Power", "电机功率", "75 kW"),
            ("Theoretical Output", "理论输送量", "35 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "30 MPa"),
            ("Hopper Capacity", "料斗容积", "0.5 m³"),
            ("Fine Stone Conveying (H / V)", "细石输送（水平/垂直）", "150 m / 350 m"),
            ("13 mm Stone (H / V)", "13 mm石子（水平/垂直）", "100 m / 300 m"),
            ("24 mm Stone (H / V)", "24 mm石子（水平/垂直）", "80 m / 240 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki double pump 100"),
            ("Dimensions (L×W×H)", "外形尺寸", "4600 × 1700 × 1700 mm"),
            ("Main Unit Weight", "整机重量", "3500 kg"),
        ],
        [("75 kW / 35 m³/h", "75 kW / 35 m³/h"), ("Electric 75-60", "Electric 75-60"), ("Fine stone 150 m / 350 m", "细石 150 m / 350 m")],
        BUILDING, "Electric low pressure 60 concrete pump China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
    pump(
        "23", "electric-60-concrete-pump", E,
        "Electric 60 Concrete Pump", "电动60型混凝土泵",
        "electric trailer concrete pump", "电动拖式混凝土泵",
        "90 kW motor, 40 m³/h, 35 MPa, fine stone 200 m / 600 m",
        "电机90 kW、输送量40 m³/h、压力35 MPa、细石水平200 m / 垂直600 m",
        [
            ("Model", "型号", "Electric 60"),
            ("Motor Power", "电机功率", "90 kW"),
            ("Theoretical Output", "理论输送量", "40 m³/h"),
            ("Max. Outlet Pressure", "最大出口压力", "35 MPa"),
            ("Hopper Capacity", "料斗容积", "0.7 m³"),
            ("Fine Stone Conveying (H / V)", "细石输送（水平/垂直）", "200 m / 600 m"),
            ("13 mm Stone (H / V)", "13 mm石子（水平/垂直）", "150 m / 450 m"),
            ("24 mm Stone (H / V)", "24 mm石子（水平/垂直）", "100 m / 300 m"),
            ("Hydraulic Pump", "液压泵", "Kawasaki double pump 112"),
            ("Dimensions (L×W×H)", "外形尺寸", "6600 × 1800 × 1800 mm"),
            ("Main Unit Weight", "整机重量", "3300 kg"),
        ],
        [("90 kW / 40 m³/h", "90 kW / 40 m³/h"), ("Fine stone 200 m / 600 m", "细石 200 m / 600 m"), ("Hopper 0.7 m³", "料斗0.7 m³")],
        [
            ("High-rise electric pumping", "高层电动泵送"),
            ("Long-distance fine-stone conveying", "长距离细石输送"),
            ("Jobs listed at 40 m³/h", "目录40 m³/h工况"),
        ],
        "Electric 60 concrete pump manufacturer China",
        "Electric Concrete Pump", "电动混凝土泵",
    ),
]


HEADER = r'''import type { LocalizedText } from '@/i18n/types';

export type ProductCategory =
  | 'electric-concrete-pump'
  | 'diesel-concrete-pump'
  | 'mixer-pump';

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
  const image = `${base}/main.webp`;
  return {
    image,
    gallery: [image],
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
      `${nameEn} Manufacturer China | Pinjin Machinery`,
      `${nameZh}厂家 | 品锦机械`,
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
        'Request a quotation by email through the Get Quote buttons on this website. Include the model name, required capacity, conveying distance and project conditions. Hebei Pinjin Machinery will reply with a suitable recommendation.',
        '通过网站「获取报价」按钮发送邮件询盘，请注明型号、所需输送量/能力、输送距离与工况。河北品锦机械将邮件回复合适方案。',
      ),
    },
  };
}

/** 旧 slug → 新目录最近机型（兼容已收录链接） */
export const productSlugRedirects: Record<string, string> = {
  'diesel-4100': 'tractor-4100-concrete-pump',
  'diesel-4100-transfer-pump': 'tractor-4100-concrete-pump',
  'll15-diesel': 'diesel-30-concrete-pump',
  'll15-diesel-transfer-pump': 'diesel-30-concrete-pump',
  'll15-motor': 'electric-15-concrete-pump',
  'll15-electric-transfer-pump': 'electric-15-concrete-pump',
  'zs22-25': 'electric-20-concrete-pump',
  'zs22-25-concrete-pump': 'electric-20-concrete-pump',
  'll28-32': 'electric-30-concrete-pump',
  'll28-32-concrete-pump': 'electric-30-concrete-pump',
  'hbt30-37': 'electric-30-concrete-pump',
  'hbt30-37-concrete-pump': 'electric-30-concrete-pump',
  'hbt45-40': 'electric-40-concrete-pump',
  'hbt45-40-concrete-pump': 'electric-40-concrete-pump',
  'hbtt55-50': 'electric-50-concrete-pump',
  'hbtt55-50-concrete-pump': 'electric-50-concrete-pump',
  'll60-75': 'electric-low-pressure-60-concrete-pump',
  'll60-75-concrete-pump': 'electric-low-pressure-60-concrete-pump',
  'hbt80-18-140': 'electric-80-concrete-pump',
  'hbt80-18-140-concrete-pump': 'electric-80-concrete-pump',
  '4102-diesel-four-cylinder-inclined-pump': 'rural-diesel-concrete-pump',
  '13-spiral-feeder': 'electric-15-concrete-pump',
  'hbt60-13-146rs-concrete-pump': 'diesel-60-concrete-pump',
  'hbt60-13-146rs': 'diesel-60-concrete-pump',
  'hbtb016-110es-spiral-feeder': 'electric-15-concrete-pump',
};

export const categoryRouteSlugs: Record<ProductCategory, string> = {
  'electric-concrete-pump': 'electric-concrete-pumps',
  'diesel-concrete-pump': 'diesel-concrete-pumps',
  'mixer-pump': 'mixer-pumps',
};

export const categoryMeta: Record<
  ProductCategory,
  { routeSlug: string; label: LocalizedText; description: LocalizedText }
> = {
  'electric-concrete-pump': {
    routeSlug: 'electric-concrete-pumps',
    label: L('Electric Concrete Pumps', '电动混凝土泵'),
    description: L(
      'Electric trailer and compact concrete pumps with published motor power, output and conveying distance.',
      '电动拖式与紧凑型混凝土泵，目录公布电机功率、输送量与输送距离。',
    ),
  },
  'diesel-concrete-pump': {
    routeSlug: 'diesel-concrete-pumps',
    label: L('Diesel Concrete Pumps', '柴油混凝土泵'),
    description: L(
      'Diesel trailer pumps and rural tractor-driven pumps for sites without stable grid power.',
      '柴油拖式泵与农村拖拉机带动泵，适用于电网供电不便的工地。',
    ),
  },
  'mixer-pump': {
    routeSlug: 'mixer-pumps',
    label: L('Mixer Pumps', '搅拌泵'),
    description: L(
      'Integrated mixer pumps that mix and convey concrete in one machine. This is not a concrete mixing plant line.',
      '搅拌与泵送一体机。这不是混凝土搅拌站产品线。',
    ),
  },
};

export const products: Product[] = [
'''

FOOTER = r'''
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

export function getCategoryPath(category: ProductCategory): string {
  return `/products/${categoryMeta[category].routeSlug}`;
}

export function isCategoryRouteSlug(slug: string): boolean {
  return Object.values(categoryRouteSlugs).includes(
    slug as (typeof categoryRouteSlugs)[ProductCategory],
  );
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
    if len(PRODUCTS) != 23:
        raise SystemExit(f"expected 23 products, got {len(PRODUCTS)}")
    OUT.write_text(HEADER + ",\n".join(block(p) for p in PRODUCTS) + FOOTER, encoding="utf-8")
    print(f"Wrote {OUT} with {len(PRODUCTS)} products")


if __name__ == "__main__":
    main()
