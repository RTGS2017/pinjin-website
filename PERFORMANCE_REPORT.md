# 首页性能报告（对照 PageSpeed 扫描）

对照你提供的桌面 / 手机诊断。线上旧包名：`index-ob6ooIjh.js`、`index-C5T2t3nU.css`、`blog-4igiY897.js`。

## 扫描结论 → 代码原因

| PageSpeed 项 | 原因 | 本次处理 |
| --- | --- | --- |
| 首页拉 `blog-*.js`，手机 4.9s 处 163ms 长任务 | `SceneKnowledge` 调用 `getBlogPost` / `getBlogCover`，把约 2MB sourced 文章打进首页 | 首页改为 `homeKnowledgeCards.ts`。构建后 Home 包约 28KB，不再 `import` blog 包 |
| LCP request discovery Error | LCP 是工厂 Hero 图，但预渲染 HTML 里 `#root` 为空，图片要等 JS；且曾被当成非关键请求 | `index.html` 与首页预渲染壳都加了 Hero AVIF `preload` + `imagesrcset`（768/1280/1920/2560）。Hero `loading=eager` + `fetchpriority=high`。首屏以下不再 `eager` |
| Unused CSS ~92 KiB（Google Fonts） | 英文首页阻塞加载 Inter + Noto SC + Noto Arabic 共 11 个字重 | 英文只拉 Inter 400/600；中文/阿拉伯文再补对应族。`print` → `all` 异步，不挡首屏 |
| Unused JS ~30 KiB（主包） | 主包含路由与 lucide；blog 包误挂首页放大了长任务 | 首页不再请求 blog 包。主包剩余 unused 是 SPA 壳，不拆功能 |
| Cache TTL 10 分钟（hash 后的 js/css 仍 10m，估省 169 KiB） | GitHub Pages 对 `/assets/*` 固定 `max-age=600`，与文件名 hash 无关 | 已写 `public/_headers`（Cloudflare Pages / Netlify 会生效）。GitHub Pages **不会读** 该文件。若域名走 Cloudflare 橙云，需加 Cache Rule：`/assets/` 一年 |
| Minify CSS ~10 KiB（仍是 fonts.googleapis.com） | 同上，第三方字体 CSS | 英文不再拉那份 93 KiB 三族样式表 |
| 长任务 `index-*.js` 171–290ms | React hydrate + 9 个首页场景 | 场景仍一次挂载，但下面图片改为 IO + `loading=lazy`，不再和 LCP 抢带宽 |

## 优化前（你的扫描 / 当时线上）

- 关键 JS：`index-ob6ooIjh.js` 约 173 KiB 传输；另加 `blog-4igiY897.js` 约 351 KiB 编码
- CSS：`index-C5T2t3nU.css` 约 11 KiB；Google Fonts CSS 约 92–93 KiB
- Hero：同一张 2560 宽 WebP 发给手机和桌面
- Cache：js/css 10 分钟
- LCP：HTML 里发现不了 LCP 图

## 优化后（本仓库，待 Pages 发布）

- 首页 **不再请求 blog 包**
- Hero：AVIF/WebP srcset；HTML 即可 preload
- 工厂 / 应用照片：768 / 1280 / 1920 派生，非首屏 lazy
- 字体：英文 2 个字重，idle 加载
- GTM / 占位 GA：`load` 后再 idle 插入
- 未来视频：`src/data/mediaLoading.ts`（未接播放器，首页不发视频）

H1、canonical、hreflang、schema 未改。

## GitHub Pages 缓存（169 KiB 那条）

这不是漏加 hash。Vite 已经输出 `index-XXXX.js`。平台把所有静态文件都标成 10 分钟。要让回访走磁盘缓存，需要 CDN（Cloudflare Cache Rule 对 `/assets/*` 和 `/images/*` 一年，HTML 仍短缓存）。
