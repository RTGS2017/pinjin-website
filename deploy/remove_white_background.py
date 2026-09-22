"""Flood-fill white studio backgrounds to alpha. Border-connected only.

Do not use a global white threshold — that punches holes in white hoppers,
guards and motor housings. Only pixels connected to the image border and
similar to the sampled corner colour become transparent.
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def _corner_background(rgb: np.ndarray) -> np.ndarray:
    h, w, _ = rgb.shape
    ph, pw = min(12, h), min(12, w)
    patches = [
        rgb[:ph, :pw],
        rgb[:ph, w - pw :],
        rgb[h - ph :, :pw],
        rgb[h - ph :, w - pw :],
    ]
    samples = np.concatenate([p.reshape(-1, 3) for p in patches], axis=0)
    return np.median(samples, axis=0)


def remove_white_background(
    img: Image.Image,
    *,
    tol: float = 26.0,
    dilate: int = 3,
    feather: float = 1.2,
) -> Image.Image:
    rgba = img.convert("RGBA")
    arr = np.array(rgba)
    rgb = arr[:, :, :3].astype(np.int16)
    h, w = rgb.shape[:2]
    bg = _corner_background(rgb)
    if float(bg.mean()) < 228:
        return rgba

    dist = np.linalg.norm(rgb.astype(np.float32) - bg.reshape(1, 1, 3), axis=2)
    candidate = dist <= tol
    structure = np.array([[0, 1, 0], [1, 1, 1], [0, 1, 0]], dtype=np.uint8)
    labeled, count = ndimage.label(candidate, structure=structure)
    if count == 0:
        return rgba

    border = np.unique(
        np.concatenate(
            [
                labeled[0],
                labeled[-1],
                labeled[:, 0],
                labeled[:, -1],
            ]
        )
    )
    border = border[border != 0]
    background = np.isin(labeled, border)
    keep = Image.fromarray((~background).astype(np.uint8) * 255)
    if dilate >= 3 and dilate % 2 == 1:
        keep = keep.filter(ImageFilter.MaxFilter(dilate))
    if feather > 0:
        keep = keep.filter(ImageFilter.GaussianBlur(radius=feather))
    arr[:, :, 3] = np.array(keep)
    return Image.fromarray(arr)


def save_transparent_webp(src: Path, dest: Path, max_side: int = 1600) -> None:
    img = Image.open(src)
    out = remove_white_background(img)
    w, h = out.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1.0:
        out = out.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, "WEBP", quality=88, method=6, lossless=False)
    print(f"ALPHA {src.name} -> {dest} {out.size[0]}x{out.size[1]}", flush=True)
