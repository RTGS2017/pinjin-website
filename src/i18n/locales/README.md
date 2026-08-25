# 语言与 SEO/GEO 文案总表

运行中的语言**不是**只放在一个文件。本目录是给翻译（Gemini 等）用的**汇总出口**，译完按同样结构替换。

## 交给 Gemini 的两个文件

1. [`GEMINI-PROMPT.md`](GEMINI-PROMPT.md) — 规则（型号不译、不虚构搅拌站、关键词要本地化检索词）
2. [`catalog.json`](catalog.json) — 全站 en/zh 文案 + SEO/GEO 词段

重新从源码生成总表：

```powershell
cd pinjin-website
npx vite-node deploy/export_i18n_catalog.ts
```

## 源码里语言实际放在哪

| 用途 | 文件 |
|------|------|
| 语言开关（en / zh / pt-BR / ar、hreflang、RTL） | `src/i18n/config.ts` |
| 顶栏、按钮、首页、联系、**页面 SEO title/description** | `src/i18n/messages.ts`（en / zh）与 `src/i18n/ui/pt.ts`、`src/i18n/ui/ar.ts` |
| 企业实体、GEO 句、关键词集群 | `src/config/entity.ts` |
| 默认 Title、组织 JSON-LD 英文 | `src/config/seo.ts` |
| 产品名称/介绍/**产品 SEO**/**产品 GEO 定义** | `src/data/products.ts`（字段 `{ en, zh }`） |
| 分类 Hub | `src/data/categoryHubs.ts` |
| 博客原文 | `src/data/blog.ts`（类型与读取函数） |
| 知识中心增补文 | `src/data/knowledgeArticles.ts`（当前 5 篇行业文） |
| 工厂图 ALT / GEO FAQ | `src/data/factory.ts` |
| OEM 专题 | `src/data/customMachinery.ts` |
| 工程应用页 | `src/data/applicationsContent.ts` |
| 内链锚文本 | `src/data/topicClusters.ts` |
| 站点 FAQ、选型、制造流程、Hero ALT | `src/data/faq.ts`、`selectionGuide.ts`、`manufacturingProcess.ts`、`gallery.ts` |

`LocalizedText` 约定：`en` 必填，其他语言缺了回退英文。定义在 `src/i18n/types.ts`。

## 译完如何替换回网站

1. `catalog.json` → `ui.{新语言}` 写入 `src/i18n/ui/{code}.ts`（中英文仍在 `messages.ts`）
2. 所有 `{ en, zh }` 对象补上新语言字段（产品、博客、工厂 ALT 等）
3. `src/i18n/config.ts` 的 `languages` 增加一项
4. `deploy/generate_sitemaps.py` 的 `LANGS` 同步
5. `python deploy/generate_sitemaps.py`
