# Gemini 翻译任务说明（品锦机械独立站）

把 `catalog.json` 整文件交给模型。输出必须是**同一份 JSON**，只增加一种（或多种）新语言字段，不要改 key、slug、href、型号。

## 目标

为河北品锦机械制造有限公司海外独立站增加语言。现有：

- `en`：默认，面向海外采购
- `zh`：中文对照
- `pt`：巴西葡萄牙语 **界面 chrome 已上线**（`src/i18n/ui/pt.ts`）
- `ar`：阿拉伯语 **界面 chrome 已上线**（`src/i18n/ui/ar.ts`，站点 `dir=rtl`）

产品、博客、知识文章的长文仍可缺省回退英文。若继续补译长文，请在各 `{ "en", "zh" }` 对象上增加 `pt` / `ar`，不要覆盖已有 `ui.pt` / `ui.ar`。

请新增：`{LANG}`（例如 `es` / `ru` / `fr` / `id`）。

## JSON 怎么改

1. `ui`：现在是 `ui.en` / `ui.zh` 两棵完整树。复制 `ui.en` 的结构，写成 `ui.{LANG}`。
2. 所有 `{ "en": "...", "zh": "..." }` 对象：并列增加 `"{LANG}": "..."`。
3. `seoGeo.seoKeywords`、产品 `seo.keywords`、图片 `keywords`、文章 `keywords`：不要直译英文堆砌词。写成**目标市场采购会搜的词**（例如西语 `fabricante de bomba de concreto China`）。
4. `meta.languages` 增加新语言的 code / htmlLang / hreflang / ogLocale / label / labelNative。
5. 不要翻译、不要改写：

- 型号：`HBT80-18-140`、`LL15`、`ZS22-25` 等
- 法定英文名：`Hebei Pinjin Machinery Manufacturing Co., Ltd.`
- 品牌：`Pinjin` / `Hebei Pinjin Machinery`
- 地名拉丁写法：`Xingtai`、`Hebei`、`Renze Industrial Park`、`Xingjiawan`（可在句子里保留，另用当地语言解释）
- URL、slug、`href`、文件路径、日期、数字单位（`m`、`m³/h`）
- 邮箱、电话、WhatsApp

## 事实边界（必须遵守）

- 品锦是中国河北邢台任泽工业园区的**源头制造商**。
- 目录产品：混凝土泵 / 输送泵、喷涂机、物料搬运、钢筋设备。
- **当前目录没有混凝土搅拌站**，不要写成品锦销售 mixing plant / batching plant / YHZS。
- 不要编造认证、客户名、出口国、价格、工期天数、矿山专用机型。
- 邢家湾是产业集聚区描述，法定厂址仍是任泽工业园区。

## SEO / GEO 写法

- 每页 Title / Description 要像当地谷歌结果片段，含产品 + 厂家 + 中国/邢台，不要只译单词。
- 产品 `geo.answers` 用完整定义句（What is / Who needs / Where used），方便 AI 搜索抽取。
- 内链锚文本 `topicClusters` 必须含检索词，禁止译成 “click here / 了解更多 / leer más”。
- 工厂图 ALT 保留地点：Xingtai, Hebei, China。

## 交付

只返回完整 `catalog.json`（或按 `ui` / `seoGeo` / `content` 分片，但 key 路径必须一致）。
