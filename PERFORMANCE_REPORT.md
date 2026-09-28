# 首页性能优化报告

优化前数据来自 2026-09-28 对 `https://pinjinpump.com/en/` 的温缓存测量，以及当时的线上资源体积。优化后数据来自本地 `vite preview`（`http://127.0.0.1:5193/en/`）和生产构建 `dist/assets`。线上 CDN 的 FCP/LCP 要等这次发版后才会变。

## 前后对比

| 项 | 优化前 | 优化后 |
| --- | --- | --- |
| HTML | 10,389 字节；无 Hero preload | 构建入口 `dist/index.html` 4.54 KB / gzip 1.66 KB。首页壳多了带 `imagesrcset` 的 Hero preload，仍是同一套 title / canonical / hreflang / JSON-LD |
| JS（首页会下载的） | index 666,784 未压缩（编码约 176 KB）+ **blog 2,115,098 未压缩（编码约 351 KB）** + Home 约 24 KB | index 684,120 / gzip **177.99 KB**；Home 27,420 / gzip **7.81 KB**；faq、选型、询盘等小块仍在。**首页不再请求 blog 块** |
| CSS | 56,660 / 编码约 11 KB，渲染阻塞 | 56.66 KB / gzip 10.87 KB，仍是唯一渲染阻塞样式表 |
| 图片（首屏阶段） | 资源计时里图片编码合计约 1.24 MB，含 eager 的 508 KB 应用图和 104 KB Hero | 390 CSS 宽：只请求 Hero `768.avif`（10,037 字节），DOM 里 3 张图。1440×DPR2：Hero 为 2560 AVIF（58,187 字节），不再先拉 508 KB 应用图 |
| 最大单文件（首页） | blog JS 2.1 MB，其次应用图 508 KB | 首页最大脚本是主包 gzip 约 178 KB。blog 2.1 MB 只留在博客/产品详情路由 |
| Hero | WebP 2560×1086，104,406 字节，preload 在 JS 之后 | HTML 里 preload AVIF srcset（768/1280/1920/2560）。桌面选中 58 KB 的 2560 AVIF；手机选中 10 KB 的 768 AVIF |
| FCP | 温缓存 488 ms（字体 CSS 阻塞） | 本地未做同条件冷启动实验室分。字体 CSS 改为 `media=print` 再切回 `all`，英文页不再阻塞在三套字体上 |
| LCP | 元素是工厂外观 Hero `<img>`，图在 JS 之后才开始 | 同一张工厂照片仍是 LCP。preload 写进首页 HTML，并带 `fetchpriority=high`，不懒加载 |
| CLS | 温缓存 0.000 | 图片仍有 width/height，容器保留比例。本地未再采到布局偏移 |

首页 JS 传输大约从 **545 KB 编码**（含 blog）降到 **约 198 KB gzip**（主包 178 + Home 7.8 + 其余小块）。未再下载的博客原文约 **2.1 MB**。

## 省下的字节

- 首页不再下载 `blog-*.js`：未压缩 2,115,098，线上编码约 351 KB
- 手机 Hero：104 KB WebP → 10 KB AVIF
- 桌面 Hero：104 KB WebP → 58 KB AVIF（2560 宽，工厂仍可辨认）
- 首屏不再 eager 下载 508 KB 建筑施工图、158 KB 车间图

`pinjin-trailer-concrete-pump-assembly.webp` 用质量 74 重压：199,650 → 157,876 字节。其余大于 180 KB 的展示 WebP 在质量 74 下省不到 20%，保留原文件，避免二次压缩发糊。手机改走 768/1280 派生图。

## 转换

为 Hero、`public/images/applications`、`public/images/factory` 的展示 WebP 生成了更窄的 WebP（质量 75）和 AVIF（质量 50）：768、以及原图宽于该档时的 1280/1920。原图仍是 srcset 里最宽的一档。派生文件名带 `-768` / `-1280` / `-1920`，图库清单会跳过它们，避免工厂区多出一屏缩略图。

约 70 MB 的产品 `source.png` / `source-catalog.png` 没有删。它们不是首页 `<img>`，删了会丢掉母版。

## 懒加载和急加载

- Hero：`loading=eager`，`fetchpriority=high`，不进 IntersectionObserver
- 其余 `ImagePlaceholder`：进入视口前 640px 才插入 `<img>`，并 `loading=lazy`、`decoding=async`
- 去掉产品、应用、工厂三个区块「第一张也 eager」的设置。本地 390 宽首屏只有 3 个 img；1440 宽首屏阶段是 logo + Hero + 靠视口的产品图，不是原来的 18 个里一上来就请求 9 个

## 推迟的脚本

- `GTM-PLACEHOLDER` 改到 `window` `load` 之后的 `requestIdleCallback`（超时 4 秒）。占位请求不再和 LCP 抢开始时间
- `gtag('config','GA-PLACEHOLDER')` 随 GTM 一起推迟。页面上仍然没有真正的统计 ID

## Preload

- 只在首页 HTML（`copy-spa-404` 里 `rest === '/'`）preload Hero AVIF 的 `imagesrcset`，URL 带和 `<img>` 相同的 `?v=` 哈希
- 不再在全站 `index.html` 里放一条不带哈希的 preload（那会和带 `?v=` 的图各下一遍，而且产品页也会预拉 Hero）
- Vite 对首页的 modulepreload 不再包含 blog 块

## 字体

英文、葡语、俄语只拉 Inter 400/500/600/700。`/zh/` 另加 Noto Sans SC 400/500/600。`/ar/` 另加 Noto Sans Arabic 400/500/600/700。样式表非阻塞。`font-display=swap` 仍由 Google CSS 提供。

## 缓存

线上 GitHub Pages 对 HTML 和带哈希的 `/assets/` 都是 `Cache-Control: max-age=600`。这次没有改 CDN。哈希文件名换版后 URL 会变。

## 验证

`tsc --noEmit` 含在 `npm run build` 里，已通过。本地预览：

- H1 仍是 China Professional Concrete Machinery Manufacturer
- VIEW PRODUCTS 与 GET A QUOTE 还在
- 390 宽无横向溢出，Hero 为 768 AVIF，控制台无 error
- 1440 / DPR 2 的上一轮构建里 Hero 为 58 KB 的 2560 AVIF，工厂外观清楚，控制台无 error
- 首页脚本列表里没有 `blog-*.js`

## 还没做

- 没有把 70 MB 源 PNG 移出 `public/`
- 没有改 H1、URL、canonical、schema 的含义
- 没有加视频。后续视频加载约定在 `src/data/mediaLoading.ts`：当前片 `preload=auto`，相邻片 `metadata`，其余只海报，切换时暂停并清掉 src
