# 首页首屏性能审计（优化前）

测量时间：2026-09-28。现场：`https://pinjinpump.com/en/`（Playwright，视口 1440×709，DPR 2，温缓存）。源码与 `dist/assets`、`public/images` 对照。HTML 用 `Invoke-WebRequest` 经 `127.0.0.1:18081` 拉取，`Content-Length: 10389`。

LCP 的 `PerformanceObserver` 缓冲条目在这次会话里没有暴露出来（带 Promise 的 evaluate 之后页面落到 `about:blank`）。LCP 元素按首屏绘制面积判定：工厂外观 `<img>`，不是被裁成 1×1 的 SEO `<h1>`。

## 1. HTML 体积

- 未压缩 10,389 字节（约 10.1 KB）
- 导航计时 `encodedBodySize` 2,921（温缓存，传输尺寸为 0）
- 这是带 `#seo-static` 的预渲染壳，不是完整首屏 DOM。可见 H1 要等 JS

## 2. JS 总量（首页会拉到的）

HEAD 未压缩体积（现场文件名）：

| 文件 | 未压缩 |
| --- | ---: |
| `/assets/index-ob6ooIjh.js` | 666,784 |
| `/assets/blog-4igiY897.js` | 2,115,098 |
| `/assets/Home-Bjw4WRAx.js` | 23,764 |
| 其余首页预加载小块（faq / selectionGuide / InquiryBrief / ContactActions / phone） | 约 11 KB 编码 |

资源计时里 script `encodedBodySize` 合计约 545 KB（含 blog 351,288 + index 176,239）。本地旧 dist 对照：`blog-*.js` 1,989,852 字节，`index-*.js` 673,674 字节。

## 3. CSS 总量

- `/assets/index-C5T2t3nU.css` HEAD 56,660 字节未压缩
- 资源计时编码体积 11,025，且 `render-blocking`

## 4. 字体数量与体积

`index.html` 一条渲染阻塞样式表同时请求：

- Inter 400/500/600/700
- Noto Sans SC 400/500/600
- Noto Sans Arabic 400/500/600/700

共 11 个字重。该 CSS 的 `encodedBodySize` 为 **94,675**，`renderBlockingStatus: blocking`。英文首页不需要简体与阿拉伯字重。温缓存这次没有单独的 woff2 条目（字体文件多半已在内存缓存里）；阻塞成本主要是这份约 95 KB 的 CSS。

## 5. 首页图片数量与字节

DOM 里 18 个 `<img>`。资源计时里已发起 9 个图片请求，`encodedBodySize` 合计 **1,236,200**。

`public/` + `src/` 静态图共 161 个，合计约 75.6 MB：

| 格式 | 数量 | 字节 |
| --- | ---: | ---: |
| PNG | 64 | 70,128,348 |
| WebP | 88 | 8,232,766 |
| JPG | 4 | 942,172 |
| SVG | 5 | 15,442 |
| AVIF | 0 | 0 |

## 6. 首屏（above the fold）图片

视口内只有 2 张：

| 文件 | 像素 | 字节 | 显示尺寸 | loading |
| --- | ---: | ---: | --- | --- |
| `/images/brand/logo-mark.webp` | 256×256 | 19,348 | 40×40 | auto |
| `/images/hero/pinjin-machinery-factory-xingtai-china.webp` | 2560×1086 | 104,406 | 1486×739 | eager + fetchpriority=high |

首屏图片约 124 KB。没有 srcset，手机也会拿 2560 宽的同一张图。

## 7. 首屏以下图片

DOM 中其余 16 张都在首屏以下，但其中多张因为 `eager={index === 0}` 在首屏阶段就开始下载。已发起、且不在首屏内的大图：

| 文件 | 像素 | 字节 | 文档位置 top | loading |
| --- | ---: | ---: | ---: | --- |
| 建筑施工应用图 | 1600×1200 | 508,124 | 3166 | eager |
| 车间航吊 | 1706×959 | 157,796 | 5591 | eager |
| 搅拌泵 | 1536×1024 | 122,534 | 1095 | lazy（仍较早） |
| 输送管 | 1536×1024 | 94,564 | 1095 | lazy |
| 电动 40 | 1536×1024 | 86,084 | 1095 | eager |
| 柴油 50 | 1536×1024 | 76,082 | 1095 | lazy |
| 喷涂机 | 1536×1024 | 67,262 | 1095 | lazy |

9 个场景一次挂载。懒加载只挡住了更远的几张，挡不住被标成 eager 的首张。

## 8. WebP / AVIF

线上展示图以 WebP 为主。优化前 **没有 AVIF**。照片主文件没有按视口给 srcset。

## 9. 过大的 JPG / PNG

超过 500 KB 的有 61 个，超过 1 MB 的有 34 个。几乎全是 `public/images/products/**/source.png`、`source-photo.png`、`source-catalog.png`（约 0.7–1.6 MB，边长约 1024–1536）。另有：

- `public/images/hero/source.jpg`：6336×2688，603,063 字节
- `public/images/icon.png`：1800×1800，约 426 KB（未跟踪，页面未引用）

这些大 PNG/JPG **不是**首页 `<img>` 的当前 src。首页真正偏大的展示图是 WebP：建筑施工应用图 508 KB。

## 10. 重复文件

按 MD5，161 个图片 **0 组内容重复**。同一 URL 被请求两次的是 logo：一次是 header `<img>`，一次是图标/其他发起（约 19 KB）。Hero 没有「CSS 背景 + `<img>`」双请求；背景是 `<img>` 加 CSS 暗色遮罩。

## 11. 未使用资源

产品目录里的 source PNG/JPG（约 70 MB）只出现在生成的 `imageInventory` 哈希表里，组件 src 用的是 WebP。它们仍会进 `public/`，从而进入 GitHub Pages 仓库体积，但首页网络瀑布不会主动下载它们。`hero/source.jpg` 同样不会被首页请求。

## 12. 首页大 JS

P0：`SceneKnowledge` → `@/data/blog` → `loadSourcedArticles.ts` 用 `import.meta.glob(..., { eager: true })` 打进全部 `content/sourced` markdown。现场 blog 块 **2,115,098 字节未压缩 / 约 351 KB 编码**，并且被首页 `modulepreload`。`content/sourced` 319 个文件、约 1.79 MB 原文。另外 `content/knowledge-i18n/strings.json` 约 411 KB，会随 `expandKnowledgeLangs` 走同一条链。

主包 index 未压缩 667 KB，是壳、导航和全语言 UI 文案，不是这次最大的一刀。

## 13. 第三方脚本

- `https://www.googletagmanager.com/gtm.js?id=GTM-PLACEHOLDER`：head 里立刻插入，async，但 start 12 ms、duration **1365 ms**，和 `load`（1378 ms）叠在一起。占位 ID，没有有效容器。
- `gtag('config', 'GA-PLACEHOLDER')` 只推 dataLayer，没有再拉 gtag.js。
- Google Fonts CSS（见第 4、14 项）。

## 14. 渲染阻塞

阻塞资源只有两份：

1. Google Fonts CSS（编码约 95 KB）
2. `/assets/index-*.css`（编码约 11 KB）

模块脚本是 non-blocking。GTM 是 non-blocking，但占满了 load 之前的时间。

## 15. preload 使用

初始 HTML **没有** Hero 图的 preload。React Helmet 在 JS 执行后才插入：

`/images/hero/pinjin-machinery-factory-xingtai-china.webp?v=4a9dd89f52r3`

同时 Vite 对首页动态块做了 `modulepreload`，其中包括 **2.1 MB 的 blog 块**，以及 faq、selectionGuide、InquiryBrief、ContactActions、phone。这是 preload 用错地方：预加载了首屏不需要的博客正文，LCP 图却要等 JS。

## 16. 急加载（eager）

Hero `priority`（应当保持 eager + high）。另外三处把每个区块的第一张图设为 eager，即使它们在首屏以下：

- `SceneProductSystem` 电动 40
- `SceneApplications` 建筑施工图（508 KB）
- `SceneFactory` 车间航吊

`ImagePlaceholder` 默认其余图片 `loading=lazy` + `decoding=async`，但 eager 覆盖了最大的那张。

## 17. 尺寸与 CLS

抽查到的首页图片都有 width/height。温缓存下 `layout-shift` 条目合计 CLS **0**（shift 数 0）。这是温缓存读数，不能当成实验室 P75。没有发现缺尺寸导致的首屏跳动。

## 18. Hero 背景体积

- 线上 LCP 图：WebP 2560×1086，**104,406 字节**。不是多 MB，不构成「Hero 数 MB」的 P0。
- 源 JPG：6336×2688，603 KB，页面不请求。
- 遮罩是 `.home-hero-media::after` 的纯色，不第二路下载图片。
- 1440 CSS 宽、DPR 2 时显示宽度约 1486，需要的源宽度接近 2972。2560 对桌面略紧、对 390 宽手机过大（约 780 设备像素就够）。

## 19. 体积前 20 的资源（现场资源计时，按 encodedBodySize）

1. 建筑施工应用 WebP — 508,124 — img — start 150 ms
2. `blog-4igiY897.js` — 351,288 — script — start 73 ms — modulepreload
3. `index-ob6ooIjh.js` — 176,239 — script — start 10 ms
4. 车间航吊 WebP — 157,796 — img — start 150 ms
5. 搅拌泵 WebP — 122,534 — img — start 5769 ms
6. Hero 工厂 WebP — 104,406 — img — start 145 ms
7. 输送管 WebP — 94,564 — img — start 15769 ms
8. Google Fonts CSS — 94,675 — stylesheet — **blocking** — start 9 ms
9. 电动 40 WebP — 86,084 — img — start 150 ms
10. 柴油 50 WebP — 76,082 — img — start 449 ms
11. 喷涂机 WebP — 67,262 — img — start 10769 ms
12. logo WebP — 19,348 — img — start 75 ms
13. logo 第二次 — 19,348 — other — start 1380 ms
14. `index-*.css` — 11,025 — **blocking**
15. `Home-*.js` — 6,492
16. `faq-*.js` — 6,443
17. `selectionGuide-*.js` — 2,208
18. `InquiryBrief-*.js` — 1,549
19. `ContactActions-*.js` — 455
20. `phone-*.js` — 334

另：GTM 占位脚本编码体积 0，但耗时 1365 ms。

## 20. 瀑布问题

冷路径是：

1. HTML（10 KB）
2. 阻塞：字体 CSS（三套家族，约 95 KB）+ 站点 CSS（约 11 KB）
3. 主包 JS（667 KB 未压缩）
4. modulepreload 把 blog 2.1 MB 和首页块一起拉下来
5. 然后才是 Hero 图（Helmet preload 来不及赶在 HTML 里）
6. 与此同时 eager 拉走 508 KB 的下方应用图

FCP 488 ms、`load` 1378 ms 是温缓存。TTFB 3 ms 也是缓存，不能当成源站 TTFB。慢的原因不是「图很多所以一定慢」，而是 **博客正文块被预加载、字体 CSS 阻塞、GTM 占位拖到 load、以及一张首屏以下的 508 KB 图被 eager**。

## 21. LCP 元素

首屏最大绘制内容是 Hero 工厂照片：

`img.object-cover`，src `/images/hero/pinjin-machinery-factory-xingtai-china.webp`，alt 为邢台工厂外观。可见 H1 是 “China Professional Concrete Machinery Manufacturer”。隐藏的 SEO H1 在 `#seo-static` 里，不是 LCP。

## 22. FCP / 加载时间（温缓存）

- TTFB 3 ms（缓存）
- First Paint 52 ms
- FCP 488 ms
- DCL 54 ms
- load 1378 ms

## 23. CLS

温缓存 CLS 0.000（无非输入布局偏移条目）。

## 24. Cache-Control

现场响应（GitHub Pages / Fastly）：

- HTML：`Cache-Control: max-age=600`（10 分钟），`Content-Type: text/html`
- 带哈希的 JS/CSS 同样是 `max-age=600`（HEAD 抽查 index JS 与 CSS）
- 图片同样 `max-age=600`

GitHub Pages 不能按文件把 HTML 设得更短、把哈希资源设得更长。哈希文件名已经能在发版时换 URL。这里只记录，不在仓库里假装能改 CDN 头。

## 25. GTM 与 Google Fonts

- GTM ID 仍是 `GTM-PLACEHOLDER`，在 head 同步插入加载器。
- 字体来自 `fonts.googleapis.com` + `fonts.gstatic.com` preconnect，`display=swap` 已有，但样式表本身渲染阻塞，并且英文首页下载了简体和阿拉伯字重。

## 优先级

- P0：首页 modulepreload 2.1 MB blog 块（`SceneKnowledge` → `blog.ts` → sourced markdown glob）
- P0：三家族字体 CSS 渲染阻塞（英文页）
- P0：首屏以下 508 KB 应用图被 eager，和 Hero 同时开始
- P1：GTM 占位请求拖到 window load
- P1：Hero 无 srcset，preload 晚于 JS
- P2：约 70 MB 未引用的 source PNG 增大仓库，但不在首页瀑布里
- 非问题：Hero WebP 只有 104 KB，不是多 MB 原图直接上屏
