# 河北品锦机械制造有限公司 B2B 官网

面向海外客户的工程机械制造商静态官网（React + TypeScript + Vite + Tailwind）。

当前阶段：前端展示 + WhatsApp / 邮件询盘（无表单后端），无 CMS、无电商。

**托管方式：GitHub Pages 静态托管**（适合海外访问）。自定义域名通过 DNS 指向 GitHub Pages，不再使用阿里云 ECS / Nginx。

---

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Lucide React
- react-helmet-async（页面 SEO / OG / JSON-LD）
- GitHub Pages 静态托管（Actions 自动构建发布）

---

## 本地开发

```powershell
cd pinjin-website
copy .env.example .env
npm install
npm run dev
```

浏览器访问 Vite 提示的本地地址（默认 `http://localhost:5173`）。

### 环境变量

联系方式与站点源仅通过 `.env` 配置（勿在多处重复定义）：

```env
VITE_CONTACT_EMAIL=1912829892@qq.com
VITE_CONTACT_PHONE=19912003025
VITE_SITE_URL=https://www.example.com
# VITE_BASE_PATH=/
# VITE_WHATSAPP_NUMBER=8619912003025
```

- `VITE_CONTACT_EMAIL`：`mailto` 询盘与页脚邮箱统一读取
- `VITE_CONTACT_PHONE`：联系页 / 页脚电话
- `VITE_WHATSAPP_NUMBER`：WhatsApp 国际号码（纯数字）。不设则使用 `VITE_CONTACT_PHONE` 并补 `86` 前缀，生成 `wa.me` 链接
- `VITE_SITE_URL`：canonical / Open Graph / JSON-LD / sitemap 绝对地址前缀
- `VITE_BASE_PATH`：仅在**无自定义域名**的项目站预览时需要（如 `/pinjin-website/`）；绑定自定义域名后保持默认 `/`

域名就绪后：把 `VITE_SITE_URL` 改成正式 `https://你的域名`，再运行：

```powershell
python deploy/generate_sitemaps.py
```

会同步更新 `public/sitemap.xml`、`public/image-sitemap.xml`、`public/robots.txt` 中的 Sitemap 行。并按 `public/CNAME.example` 说明创建 `public/CNAME`（单行主机名）。

### 技术 SEO / GEO

- 页面组件：`src/components/SEO.tsx`（Organization / LocalBusiness / WebSite / Product / Article / BreadcrumbList / ImageObject / FAQPage / CollectionPage JSON-LD；canonical、hreflang、Open Graph、Twitter Card）
- Title 模板：`src/config/seo.ts` 的 `seoTemplates`（产品 `{Name} Manufacturer China | Pinjin Machinery`；博客 `{Topic} | Construction Machinery Knowledge | Pinjin`）
- 企业实体（全站统一）：`src/config/entity.ts` + `src/components/CompanyEntity.tsx`
- 语义架构与别名：`src/config/seoRoutes.ts`（规范 URL 进 sitemap；采购侧别名只做客户端 `replace`）
- 主题集群与内链：`src/data/categoryHubs.ts`、`src/data/topicClusters.ts`、`src/data/knowledgeArticles.ts`、`src/components/InternalLink.tsx`（锚文本含关键词，不用 click here）
- 站点地图：`public/sitemap.xml`（首页、分类 Hub、OEM 定制、产品、解决方案/案例、工厂、博客、联系；含 `lastmod` / `changefreq` / `priority` / hreflang）
- 图片地图：`public/image-sitemap.xml`（`image:loc` / `title` / `caption` / `geo_location=Xingtai, Hebei, China`；页面 HTML 提供 ALT）
- 爬虫规则：`public/robots.txt`（允许 Google；拦截 `/admin` `/src/` `/dev`；指向 sitemap）
- FAQ：`/faq`
- 选型指南：`/product-selection-guide`
- 解决方案（工程应用）：规范路径 `/solutions`、`/solutions/:slug`；别名 `/cases` 重定向到同一内容
- 工厂能力：`/factory`（邢台制造基地 / 河北产业 / 中国供应商定义 + FAQ + 工厂照片 + 制造流程）
- 资源中心：`/resources`（博客、选型、索取参数；无虚构 PDF）
- Blog / 知识中心：`/blog`、`/blog/:slug`（`src/data/blog.ts` + `src/data/knowledgeArticles.ts`；分类：设备指南 / 应用方案 / 制造知识 / 行业趋势 / 工厂洞察）
- 产品分类 Hub：`/products/concrete-pumps`、`/products/spraying-machines` 等
- OEM 定制专题：`/products/custom-machinery`（真实可定制范围；不虚构搅拌站产品线）
- 产品详情：保持 `/products/:slug`（GitHub Pages 无法做 HTTP 301，不改为嵌套型号 URL）
- 产品页结构：介绍（含定义）→ 优势 → 技术参数表 → 应用场景（链到 `/solutions/*`）→ 定制 → 工厂制造 → FAQ → 联系工程师
- 组织 JSON-LD：`industry=Construction Machinery Manufacturer`；`makesOffer` 为目录产品（混凝土泵、喷涂机、搬运、钢筋），不含搅拌站；产品 JSON-LD 含 `brand` / `model` / `additionalProperty`
- 关键词集群：混凝土泵厂家、喷涂设备、搅拌与泵送关系说明、中国厂家信任（邢台工厂考察 / OEM 流程）。不单独堆砌过宽的 “concrete machine”
- **不虚构搅拌站分类页**：`/products/concrete-mixing-plant` 重定向到搅拌与泵送说明文章；目录未销售搅拌站
- 图片：WebP、`loading=lazy`（LCP 图 eager）、每产品 `{slug}/main.webp`；工厂图见 `图片准备清单.md`。不引入重量级 SEO 插件
- 品牌色板（厂房深灰 + 工业红，避免亮橙/纯蓝模板）：主色 `#1D1F21`、强调 `#B32126`、背景 `#F3F3F1`，定义于 [`src/index.css`](src/index.css)
- 首页定位：B2B 工业制造商站（产品理解 / 导航清晰 / 询盘转化），不是作品集或电商画廊
- 首页顺序：Hero 单视觉（工厂+设备背景自动切换）→ 精选产品轮播 → 工厂能力画廊 → Why Choose Pinjin → 应用案例轮播 → 知识中心 → Footer
- 首页 Hero：全宽单画面 + 公司介绍/标题/CTA；无缩略图、无悬停切图。底部仅一条红色自动播放进度条。背景图数据：[`src/data/gallery.ts`](src/data/gallery.ts)。完整工厂说明页仍在 `/factory` 与 `/about`
- 精选产品：左信息（型号、简介、2–3 条优势、OEM 定制说明）/ 右产品图。可见上一张/下一张按钮 + 页码 `01/05` + 5 秒红色进度条。点击按钮会重置计时。型号列表：`featuredProductSlugs`（[`src/config/site.ts`](src/config/site.ts)）
- 共用轮播：[`src/components/ui/IndustrialCarousel.tsx`](src/components/ui/IndustrialCarousel.tsx)（上一张/下一张、自动播放、进度条、键盘左右键、移动端滑动）。时长参数：`carouselConfig`（[`src/config/site.ts`](src/config/site.ts)）
- 工厂能力：车间 / 装配 / 成品 / 厂房外观，大图 + 下方缩略图，不是第二块全屏 Banner
- 应用案例：中间大图 + 两侧可见按钮；图下为标题、说明、查看应用；红色进度条。现场图为真实应用方向，不虚构客户项目业绩；搬运场景复用叉车 `working.webp`
- 产品区定制说明：OEM customization available；参数可按项目调整；确认技术规格后可尽快安排生产；突出工厂直供。组件：[`src/components/ui/OemNote.tsx`](src/components/ui/OemNote.tsx)
- 图片：每产品独立目录 `{slug}/main.webp`；工厂图见 `图片准备清单.md` 与 `src/data/factory.ts`（含 ALT、keywords、locationContext）

---

## 统一配置

结构配置（品牌名、邮箱、WhatsApp、精选产品 slug 等）集中在：

```text
src/config/site.ts
```

顶栏 Mega Menu 结构（路径、分类、精选 slug 引用）集中在：

```text
src/config/navigation.ts
```

中英文对照文案集中在：

```text
src/i18n/messages.ts
```

语言切换逻辑：

```text
src/i18n/I18nContext.tsx
```

产品数据：

```text
src/data/products.ts
```

Blog 文章：

```text
src/data/blog.ts
src/data/knowledgeArticles.ts
```

SEO 规范路径与别名：

```text
src/config/seoRoutes.ts
```

工厂能力轮播（幻灯片路径 / ALT / 关键词）：

```text
src/data/factory.ts
```

制造流程 / 工厂决策要点（仅用已核实表述）：

```text
src/data/manufacturingProcess.ts
```

颜色与间距 Token：

```text
src/index.css
```

首页 Hero / 工厂能力画廊 / 知识中心封面图：

```text
src/data/gallery.ts
```

请勿在多个文件重复定义同一变量。

### 中英文切换（URL 分语言）

- 独立路径：`/en/...`、`/zh/...`、`/pt/...`（巴西葡萄牙语）、`/ar/...`（阿拉伯语，页面 `dir=rtl`）
- 根路径 `/` **固定进入英文** `/en/`（不按浏览器语言或 localStorage 改入口）
- 旧链接如 `/products` 会自动转到 `/en/products`
- 顶栏语言为**下拉菜单**（[`LanguageSwitcher`](src/components/layout/LanguageSwitcher.tsx)），列出 English / 中文 / Português / العربية（数据来自 [`src/i18n/config.ts`](src/i18n/config.ts) 的 `languages`），选择后**切换 URL**（不是仅改 localStorage）
- 语言偏好仍写入 `localStorage`（键名 `pinjin_lang`），供根路径以外的回访识别；**站点入口始终是英文**
- **界面 chrome**（导航、按钮、页眉页脚、页面 SEO title）已有 en / zh / pt / ar；产品长文、博客、知识文章未译时回退英文（`LocalizedText` 的 `en` 必填）
- 葡萄牙语 UI 在 [`src/i18n/ui/pt.ts`](src/i18n/ui/pt.ts)；阿拉伯语 UI 在 [`src/i18n/ui/ar.ts`](src/i18n/ui/ar.ts)；中英文仍在 [`src/i18n/messages.ts`](src/i18n/messages.ts)
- 阿拉伯语使用 Noto Sans Arabic，并在 `html[dir=rtl]` 下调字距

#### 后期新增语言（例如西班牙语 `es`）

**不要只改 `messages.ts`。** 产品 SEO、GEO 定义、工厂 ALT、知识文章都在 `src/data/*` 的 `{ en, zh }` 字段里。

交给 Gemini 的汇总位置：

```text
src/i18n/locales/catalog.json
src/i18n/locales/GEMINI-PROMPT.md
```

生成/刷新总表：`npx vite-node deploy/export_i18n_catalog.ts`（或 `npm run i18n:export`，需已安装 vite-node）。说明见 [`src/i18n/locales/README.md`](src/i18n/locales/README.md)。

译完后：

1. 在 [`src/i18n/config.ts`](src/i18n/config.ts) 的 `languages` 数组追加一项（code / htmlLang / hreflang / ogLocale / label）
2. 把 `catalog.json` 的 `ui.{新语言}` 写入 [`src/i18n/ui/{code}.ts`](src/i18n/ui/)（或中英文仍写入 [`src/i18n/messages.ts`](src/i18n/messages.ts)）
3. 把各 `{ en, zh }` 上的新语言字段写回对应 `src/data/*`（缺省仍回退 `en`）
4. 同步 [`deploy/generate_sitemaps.py`](deploy/generate_sitemaps.py) 里的 `LANGS`
5. 重新生成 sitemap：`python deploy/generate_sitemaps.py`

---

## 产品与图片

产品数据唯一来源：根目录《河北品锦机械制造有限公司产品目录》。  
当前共 **22** 个产品实体，录入 `src/data/products.ts`。

图片准备说明见 `图片准备清单.md`。素材目录按当前界面只用四类：`brand/`、`products/{slug}/`、`factory/`、`applications/`。已删除不再调用的 `hero/`（旧主视图）、空的 `icons/`、以及 `products/concrete-pumps/` 等分类备份目录。产品只登记 `main.webp`；现场图生成 `{slug}/working.webp`。首页 Hero 复用现场图与工厂实拍（`src/data/gallery.ts`），精选轮播用 `main.webp`，默认 OG 用厂房外观。

工厂图放在 `public/images/factory/`。微信原图放入后运行：

```powershell
python deploy/process_factory_images.py
python deploy/generate_sitemaps.py
```

会把全部工厂 JPG 居中裁成 16:9 WebP，并改成 SEO 文件名（见清单，当前 9 张全部使用）。首页 Hero 5 帧复用产品现场图 + 工厂实拍，数据见 [`src/data/gallery.ts`](src/data/gallery.ts)。About、Factory 页、产品详情厂商能力条、制造流程 Blog 仍用完整 `factorySlides`。

应用现场图放到 `public/images/applications/` 后运行：

```powershell
python deploy/process_application_images.py
python deploy/generate_sitemaps.py
```

会裁成 4:3 WebP 并写成 SEO 文件名，用于首页应用区块与 `/solutions/*`。ALT 见 [`src/data/applicationsContent.ts`](src/data/applicationsContent.ts)。物料搬运暂无独立现场图时，首页与方案页使用叉车装载机 `working.webp`，不要用喷涂/泵送照片顶替。

重新生成 sitemap / robots：

```powershell
python deploy/generate_sitemaps.py
```

---

## 构建

```powershell
npm run build
```

产物目录：`dist/`。构建末尾会复制 `dist/index.html` → `dist/404.html`（深链刷新）以及 `dist/en|zh|pt|ar/index.html`（各语言首页走真实文件，避免 GitHub Pages 对 `/en/` 直接 404）。

预览：

```powershell
npm run preview
```

---

## GitHub Pages 部署（推荐）

本仓库按「单独推送 `pinjin-website` 为 Git 仓库根」编写工作流：[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)。

### 一次性设置

1. 在 GitHub 新建仓库，将本目录推送到 `main`。
2. **Settings → Pages → Build and deployment → Source** 必须二选一（**不要选 `main` 根目录**）：
   - 推荐：**GitHub Actions**
   - 或 **Deploy from a branch**，Branch 选 **`gh-pages`** / `(root)`
3. 若 Source 选了 `main` / `(root)`，GitHub 会用 Jekyll 直接发布源码 `index.html`（里面是 `/src/main.tsx`），浏览器无法运行 TypeScript，页面空白。工作流会把 Vite 的 `dist/` 同步到 `gh-pages`。
4. **Settings → Secrets and variables → Actions → Variables** 配置：
   - `VITE_CONTACT_EMAIL`
   - `VITE_CONTACT_PHONE`
   - `VITE_SITE_URL`（正式域名前可用 `https://YOUR_USER.github.io/YOUR_REPO`）
   - 可选：`VITE_BASE_PATH`（自定义域名根站不要设，或设为 `/`）
   - 可选：`VITE_WHATSAPP_NUMBER`（WhatsApp 国际号码；不设则用联系电话补 86）
5. push 到 `main` 后 Actions 自动构建并发布。工作流会尝试把 Pages Source 设为 **GitHub Actions**；若仍空白，请到 Settings → Pages 确认 Source **不是** `main` 根目录。

### 自定义域名（与以前「域名指向 ECS」同类）

逻辑相同：DNS 把访客导到托管方。差别是指向 **GitHub Pages**，不是 ECS 公网 IP。

1. 购买域名后，在域名商添加 DNS：
   - 常用：`www` **CNAME** → `YOUR_USER.github.io`
   - 根域名（apex）按 [GitHub 文档](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) 配置 A/AAAA，或把根跳转到 `www`
2. 复制 `public/CNAME.example` 为 `public/CNAME`，写入一行主机名（如 `www.yourdomain.com`）。
3. 仓库 **Settings → Pages → Custom domain** 填同一主机名，勾选 **Enforce HTTPS**。
4. 将本地与 Actions 中的 `VITE_SITE_URL` 改为 `https://www.yourdomain.com`，运行 `python deploy/generate_sitemaps.py`，更新 `index.html` 中 canonical 后重新 push。

绑定自定义域名后站点路径为 `https://你的域名/`（`VITE_BASE_PATH=/`），不是 `...github.io/仓库名/`。

当前未绑定制域名时，项目站地址为：

```text
https://rtgs2017.github.io/pinjin-website/
```

构建默认 `VITE_BASE_PATH=/pinjin-website/`，否则 JS/CSS 会从站点根路径加载导致白屏。

---

## 页面路由

| 路径 | 说明 |
|------|------|
| `/` | 首页：Hero 单视觉 + 进度条 → 5 款精选产品轮播 → 工厂能力画廊 → Why Pinjin → 应用案例轮播 → 知识中心 |
| `/products` | 全部产品 |
| `/products/concrete-pumps` 等 | 分类 Hub（制造商 H1 / 介绍 / 应用 / 优势 / 型号 / FAQ / 相关文章） |
| `/products/custom-machinery` | OEM 定制机械专题 |
| `/products/:slug` | 产品详情（WhatsApp / 邮件 CTA，无长表单） |
| `/product-selection-guide` | 选型指南 |
| `/solutions` | 工程应用索引（案例 Hub） |
| `/solutions/:slug` | 工程应用详情（construction / infrastructure / spraying / industrial-projects） |
| `/about` | 公司介绍 |
| `/factory` | 工厂制造能力（邢台 GEO + 照片 + 流程 + FAQ） |
| `/resources` | 资源中心（博客、选型、索取参数） |
| `/faq` | FAQ |
| `/blog` | 工业知识中心列表（可按分类筛选） |
| `/blog/:slug` | 文章详情（关键词锚文本链到分类 Hub → 产品 → 联系） |
| `/contact` | 联系制造商（WhatsApp + 邮件 + 电话） |

兼容旧地址与采购侧别名（客户端 `replace`，**不进 sitemap**）：

- `/products/category/:slug` → 对应分类 Hub
- `/products/concrete-pump` → `/products/concrete-pumps`
- `/products/concrete-spraying-machine` → `/products/spraying-machines`
- `/products/concrete-mixing-plant` → 搅拌与泵送说明文（目录未销售搅拌站）
- `/cases`、`/cases/:slug` → `/solutions` 对应页
- `/applications` → `/solutions`
- `/company` → `/about`；`/company/factory` 与 `/company/manufacturing-capability` → `/factory`
- `/resources/blog/xingjiawan-concrete-machinery` → 现有邢家湾文章

不单独做 mining 方案页或搅拌站产品分类（目录未发布该内容）。

顶栏为**视口全宽** Mega Menu（Products / Solutions / Resources / Company）：桌面（≥1024px）悬停导航项即展开，面板贴在深色顶栏下方并与顶栏同宽、同色（`bg-dark`），背景透明度 40%，文字为浅色。鼠标可从导航移入面板而不会立刻关闭。移动端为汉堡手风琴。配置见 [`src/config/navigation.ts`](src/config/navigation.ts)，组件见 [`src/components/navigation/MegaMenu.tsx`](src/components/navigation/MegaMenu.tsx)。链接均为真实路由（含 `/en` `/zh` `/pt` `/ar`），不指向未发布的 PDF / 认证页。右下角悬浮 **WhatsApp** 按钮；联系页隐藏以免重复。路由切换时 [`ScrollToTop`](src/components/layout/ScrollToTop.tsx) 将页面滚到顶部。

sitemap 只收录规范 URL（含 `/en`、`/zh`、`/pt`、`/ar` 及对应 hreflang：`en` / `zh-CN` / `pt-BR` / `ar`）。结构改完后再生成 sitemap，再提交 Google Search Console，避免把孤立旧地址当成站点主题。

### 询盘入口（无后端表单）

静态站不使用 Formspree / 自建表单。统一组件：[`src/components/ui/ContactActions.tsx`](src/components/ui/ContactActions.tsx)。

- **WhatsApp**：`https://wa.me/{国际号码}`，号码来自 `VITE_WHATSAPP_NUMBER`，未设则用 `VITE_CONTACT_PHONE` 补 `86`
- **Email**：`mailto:` 预填主题/正文
- 产品页按钮：WhatsApp Contact、Email Inquiry、Request Custom Solution

### 新增 Blog 文章

1. 在 [`src/data/blog.ts`](src/data/blog.ts) 或 [`src/data/knowledgeArticles.ts`](src/data/knowledgeArticles.ts) 追加一篇（`slug`、中英标题/正文、`relatedProductSlugs`、关键词锚文本内链到分类 Hub / 产品 / 工厂 / 联系；可选 `image` 引用 `factory.ts`）。分类使用：`product-guide`（设备指南）、`application-solutions`（应用方案）、`manufacturing-knowledge`（制造知识）、`industry-guide`（行业趋势）、`factory-insights`（工厂洞察）。
2. 如属于某产品主题，把文章链加入 [`src/data/topicClusters.ts`](src/data/topicClusters.ts) 对应分类。
3. 把同一 `slug` 写入 [`deploy/generate_sitemaps.py`](deploy/generate_sitemaps.py) 的 `BLOG_SLUGS`。
4. 运行 `python deploy/generate_sitemaps.py`。

不要编造认证、客户名、出口国。文章应链到真实产品页，文末用 WhatsApp / 邮件 CTA。

邢家湾相关表述：法定厂址仍为「邢台市任泽工业园区」；邢家湾仅作为区域产业集聚事实（“Located in Xingtai, Hebei, Xingjiawan is known as an important manufacturing area for concrete machinery.”），不改街道地址。

---

## 内容真实性说明

企业简介、地址、四项价值观、产品参数均来自产品目录文档。  
未擅自添加认证、出口国、成立年份、客户案例或 PDF 产品目录。WhatsApp 使用已公布联系电话（或 `VITE_WHATSAPP_NUMBER`），不另造号码。制造流程模块只复述「原料采购 → 生产 → 检测 → 交付」的已有表述。定制交期只写「确认规格后可尽快安排」，不承诺未核实的天数。

提供真实邮箱 / WhatsApp 后，修改 `.env` / GitHub Variables 中的 `VITE_CONTACT_EMAIL`、`VITE_WHATSAPP_NUMBER`，重新构建部署。

---

## 已弃用：阿里云 ECS / Nginx

以下脚本仅供紧急回滚参考，**日常请勿使用**：

- `deploy/deploy_remote.py`
- `deploy/deploy_fresh_ubuntu.py`
- `deploy/pinjin.conf`
- `deploy/check_network.py`、`open_port80.py`、`try_open_sg.py`、`start_cloudflare_tunnel.py`

仍保留且继续使用的工具脚本：

- `deploy/process_product_images.py`（产品图 WebP）
- `deploy/process_factory_images.py`（工厂图 16:9 WebP + SEO 文件名）
- `deploy/process_application_images.py`（应用现场图 4:3 WebP + SEO 文件名）
- `deploy/generate_sitemaps.py`（sitemap / robots）
- `deploy/copy-spa-404.mjs`（构建后 SPA 404 回退）

---

## 安全建议

- 不要把服务器密码、密钥提交进 Git（`.env` 已在 `.gitignore`）
- 联系邮箱等可通过 GitHub Actions Variables 注入，避免写死在公开仓库
