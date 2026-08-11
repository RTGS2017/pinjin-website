# 河北品锦机械制造有限公司 B2B 官网

面向海外客户的工程机械制造商静态官网（React + TypeScript + Vite + Tailwind）。

当前阶段：前端展示 + 邮箱询盘（`mailto`），无后端、无 CMS、无电商。

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
```

- `VITE_CONTACT_EMAIL`：所有询盘 `mailto` 统一读取
- `VITE_CONTACT_PHONE`：联系页 / 页脚电话
- `VITE_SITE_URL`：canonical / Open Graph / JSON-LD / sitemap 绝对地址前缀
- `VITE_BASE_PATH`：仅在**无自定义域名**的项目站预览时需要（如 `/pinjin-website/`）；绑定自定义域名后保持默认 `/`

域名就绪后：把 `VITE_SITE_URL` 改成正式 `https://你的域名`，再运行：

```powershell
python deploy/generate_sitemaps.py
```

会同步更新 `public/sitemap.xml`、`public/image-sitemap.xml`、`public/robots.txt` 中的 Sitemap 行。并按 `public/CNAME.example` 说明创建 `public/CNAME`（单行主机名）。

### 技术 SEO / GEO

- 页面组件：`src/components/SEO.tsx`（含 keywords、Product / FAQPage JSON-LD）
- SEO 配置：`src/config/seo.ts`
- 企业实体（全站统一）：`src/config/entity.ts` + `src/components/CompanyEntity.tsx`
- 站点地图：`public/sitemap.xml`
- 图片地图：`public/image-sitemap.xml`
- 爬虫规则：`public/robots.txt`
- FAQ：`/faq`
- 选型指南：`/product-selection-guide`
- 应用页：`/applications`
- 产品详情：Overview / Applications / Specs / Advantages / FAQ（≥5）+ Related + Manufacturer GEO 块
- 组织 / 产品 JSON-LD：不含价格与评分
- 图片：每产品独立目录 `{slug}/main.webp`（见 `图片准备清单.md`）

---

## 统一配置

结构配置（品牌名、导航路径、邮箱、精选产品 slug 等）集中在：

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

颜色与间距 Token：

```text
src/index.css
```

请勿在多个文件重复定义同一变量。

### 中英文切换

- 顶栏点击 **EN / 中文** 即时切换
- 语言偏好保存在 `localStorage`（键名 `pinjin_lang`）
- 首次访问按浏览器语言自动选择（`zh*` → 中文，否则英文）

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
| `/products/:slug` | 产品详情 |
| `/product-selection-guide` | 选型指南 |
| `/about` | 关于我们 |
| `/applications` | 应用 |
| `/faq` | FAQ |
| `/contact` | 联系 |

---

## 内容真实性说明

企业简介、地址、四项价值观、产品参数均来自产品目录文档。  
未擅自添加认证、出口国、成立年份、WhatsApp 等未确认信息。

提供真实邮箱后，修改 `.env` / GitHub Variables 中的 `VITE_CONTACT_EMAIL`，重新构建部署。

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
