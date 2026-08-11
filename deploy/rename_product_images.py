from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "data" / "products.ts"
text = p.read_text(encoding="utf-8")
repls = {
    "/images/products/concrete-pumps/diesel-4100.webp": "/images/products/concrete-pumps/diesel-4100-transfer-pump.webp",
    "/images/products/concrete-pumps/ll15-diesel.webp": "/images/products/concrete-pumps/ll15-diesel-transfer-pump.webp",
    "/images/products/concrete-pumps/ll15-motor.webp": "/images/products/concrete-pumps/ll15-motor-transfer-pump.webp",
    "/images/products/concrete-pumps/zs22-25.webp": "/images/products/concrete-pumps/zs22-25-concrete-pump.webp",
    "/images/products/concrete-pumps/ll28-32.webp": "/images/products/concrete-pumps/ll28-32-concrete-pump.webp",
    "/images/products/mortar-sprayers/diesel-screw-mortar.webp": "/images/products/mortar-sprayers/diesel-screw-mortar-spraying-machine.webp",
    "/images/products/concrete-pumps/hbt30-37.webp": "/images/products/concrete-pumps/hbt30-37-concrete-pump.webp",
    "/images/products/concrete-pumps/hbt45-40.webp": "/images/products/concrete-pumps/hbt45-40-concrete-pump.webp",
    "/images/products/plaster-sprayers/fully-automatic-plaster.webp": "/images/products/plaster-sprayers/fully-automatic-plaster-spraying-machine.webp",
    "/images/products/concrete-pumps/hbtt55-50.webp": "/images/products/concrete-pumps/hbtt55-50-concrete-pump.webp",
    "/images/products/concrete-pumps/ll60-75.webp": "/images/products/concrete-pumps/ll60-75-concrete-pump.webp",
    "/images/products/concrete-pumps/hbt80-18-140.webp": "/images/products/concrete-pumps/hbt80-18-140-concrete-pump.webp",
}
for old, new in repls.items():
    if old not in text:
        raise SystemExit(f"missing: {old}")
    text = text.replace(old, new)
p.write_text(text, encoding="utf-8")
print("updated", len(repls), "paths")
