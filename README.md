# 河北品锦机械制造有限公司 B2B 官网

面向海外客户的工程机械制造商静态官网（React + TypeScript + Vite + Tailwind）。

当前阶段：前端展示 + 页面询盘表单（Formspree，未配置时回退 `mailto`），无后端、无 CMS、无电商。

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
# VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

- `VITE_CONTACT_EMAIL`：询盘回退 `mailto` 与页脚邮箱统一读取
- `VITE_CONTACT_PHONE`：联系页 / 页脚电话
- `VITE_SITE_URL`：canonical / Open Graph / JSON-LD / sitemap 绝对地址前缀
- `VITE_BASE_PATH`：仅在**无自定义域名**的项目站预览时需要（如 `/pinjin-website/`）；绑定自定义域名后保持默认 `/`
- `VITE_FORMSPREE_ENDPOINT`：询盘表单 POST 地址。留空则提交时打开系统邮件客户端（`mailto`）。在 GitHub Actions Variables 中配置同名变量后重新部署即可生效。第一期不支持图纸上传。

域名就绪后：把 `VITE_SITE_URL` 改成正式 `https://你的域名`，再运行：

```powershell
python deploy/generate_sitemaps.py
```

会同步更新 `public/sitemap.xml`、`public/image-sitemap.xml`、`public/robots.txt` 中的 Sitemap 行。并按 `public/CNAME.example` 说明创建 `public/CNAME`（单行主机名）。

### 技术 SEO / GEO

- 页面组件：`src/components/SEO.tsx`（含 keywords、Product / FAQPage / Article / BreadcrumbList JSON-LD）
- SEO 配置：`src/config/seo.ts`
- 企业实体（全站统一）：`src/config/entity.ts` + `src/components/CompanyEntity.tsx`
- 站点地图：`public/sitemap.xml`（含 `/blog` 与文章）
- 图片地图：`public/image-sitemap.xml`
- 爬虫规则：`public/robots.txt`
- FAQ：`/faq`
- 选型指南：`/product-selection-guide`
- 应用页：`/applications`
- Blog：`/blog`、`/blog/:slug`（静态数据 `src/data/blog.ts`）
- 产品详情：Overview / Applications / Specs / Advantages / Why Factory / Manufacturing Process / FAQ（≥5）+ Related + 询盘表单 + Manufacturer GEO 块
- 组织 / 产品 JSON-LD：不含价格与评分
- 图片：每产品独立目录 `{slug}/main.webp`（见 `图片准备清单.md`）

---

## 统一配置

结构配置（品牌名、分组导航、邮箱、Formspree、精选产品 slug 等）集中在：

```text
src/config/site.ts
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
```

制造流程 / 工厂决策要点（仅用已核实表述）：

```text
src/data/manufacturingProcess.ts
```

颜色与间距 Token：

```text
src/index.css
```

请勿在多个文件重复定义同一变量。

### 中英文切换（URL 分语言）

- 独立路径：`/en/...`、`/zh/...`（利于谷歌 SEO / hreflang）
- 根路径 `/` 会跳到浏览器偏好或默认英文 `/en`
- 旧链接如 `/products` 会自动转到 `/en/products`
- 顶栏语言按钮会**切换 URL**（不是仅改 localStorage）
- 语言偏好仍写入 `localStorage`（键名 `pinjin_lang`），用于根路径重定向

#### 后期新增语言（例如西班牙语 `es`）

1. 在 [`src/i18n/config.ts`](src/i18n/config.ts) 的 `languages` 数组追加一项（code / htmlLang / hreflang / ogLocale / label）
2. 在 [`src/i18n/messages.ts`](src/i18n/messages.ts) 增加对应文案表
3. 产品等 `LocalizedText` 逐步补 `es` 字段（缺省回退英文 `en`）
4. 同步 [`deploy/generate_sitemaps.py`](deploy/generate_sitemaps.py) 里的 `LANGS`
5. 重新生成 sitemap：`python deploy/generate_sitemaps.py`

---

## 产品与图片

产品数据唯一来源：根目录《河北品锦机械制造有限公司产品目录》。  
当前共 **22** 个产品实体，录入 `src/data/products.ts`。

图片准备说明见 `图片准备清单.md`。缺图时由 `ImagePlaceholder` 显示占位。

重新生成 sitemap / robots：

```powershell
python deploy/generate_sitemaps.py
```

---

## 构建

```powershell
npm run build
```

产物目录：`dist/`。构建末尾会自动复制 `dist/index.html` → `dist/404.html`，供 GitHub Pages 在深链刷新时回落到 SPA（替代原 Nginx `try_files`）。

预览：

```powershell
npm run preview
```

---

## GitHub Pages 部署（推荐）

本仓库按「单独推送 `pinjin-website` 为 Git 仓库根」编写工作流：[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)。

### 一次性设置

1. 在 GitHub 新建仓库，将本目录推送到 `main`。
2. **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
3. **Settings → Secrets and variables → Actions → Variables** 配置：
   - `VITE_CONTACT_EMAIL`
   - `VITE_CONTACT_PHONE`
   - `VITE_SITE_URL`（正式域名前可用 `https://YOUR_USER.github.io/YOUR_REPO`）
   - 可选：`VITE_BASE_PATH`（自定义域名根站不要设，或设为 `/`）
   - 可选：`VITE_FORMSPREE_ENDPOINT`（Formspree 表单 URL；不设则询盘回退 mailto）
4. push 到 `main` 后 Actions 自动构建并发布。

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
| `/` | 首页 |
| `/products` | 全部产品 |
| `/products/category/:slug` | 分类 |
| `/products/:slug` | 产品详情（含询盘表单） |
| `/product-selection-guide` | 选型指南 |
| `/about` | 关于我们 |
| `/applications` | 应用 |
| `/faq` | FAQ |
| `/blog` | 技术资讯列表 |
| `/blog/:slug` | 文章详情 |
| `/contact` | 联系（询盘表单） |

顶栏为分组下拉（Products / Solutions / Resources / Company / Contact），配置见 `src/config/site.ts` 的 `navItems`。右下角悬浮「询价」按钮；联系页隐藏以免重复。

### 询盘表单

共享组件：`src/components/forms/InquiryForm.tsx`。字段：姓名、公司、国家、邮箱、意向产品、数量、留言。产品详情会预填型号；「索取目录」会预填目录请求（当前无 PDF 文件，不提供空下载）。

配置了 `VITE_FORMSPREE_ENDPOINT` 则 POST 到 Formspree；否则回退 `mailto`。保留页脚/工程师直联邮箱。

### 新增 Blog 文章

1. 在 [`src/data/blog.ts`](src/data/blog.ts) 追加一篇（`slug`、中英标题/正文、`relatedProductSlugs`、内链）。
2. 把同一 `slug` 写入 [`deploy/generate_sitemaps.py`](deploy/generate_sitemaps.py) 的 `BLOG_SLUGS`。
3. 运行 `python deploy/generate_sitemaps.py`。

不要编造认证、客户名、出口国。文章应链到真实产品页并在文末保留询盘。

---

## 内容真实性说明

企业简介、地址、四项价值观、产品参数均来自产品目录文档。  
未擅自添加认证、出口国、成立年份、WhatsApp、客户案例或 PDF 产品目录。制造流程模块只复述「原料采购 → 生产 → 检测 → 交付」的已有表述。

提供真实邮箱后，修改 `.env` / GitHub Variables 中的 `VITE_CONTACT_EMAIL`，重新构建部署。Formspree 地址同样写入 Variables 中的 `VITE_FORMSPREE_ENDPOINT`。

---

## 已弃用：阿里云 ECS / Nginx

以下脚本仅供紧急回滚参考，**日常请勿使用**：

- `deploy/deploy_remote.py`
- `deploy/deploy_fresh_ubuntu.py`
- `deploy/pinjin.conf`
- `deploy/check_network.py`、`open_port80.py`、`try_open_sg.py`、`start_cloudflare_tunnel.py`

仍保留且继续使用的工具脚本：

- `deploy/process_product_images.py`（产品图 WebP）
- `deploy/generate_sitemaps.py`（sitemap / robots）
- `deploy/copy-spa-404.mjs`（构建后 SPA 404 回退）

---

## 安全建议

- 不要把服务器密码、密钥提交进 Git（`.env` 已在 `.gitignore`）
- 联系邮箱等可通过 GitHub Actions Variables 注入，避免写死在公开仓库
