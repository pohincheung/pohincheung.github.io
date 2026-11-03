# PohinCheung 的个人网站

Astro + TypeScript 静态网站。Node.js 24，使用 npm。没有账户、后台或交易接口。

## 本地启动

在本目录执行 `npm ci`，然后 `npm run dev`，打开终端显示的 http://127.0.0.1:4321/。
检查：`npm run check`、`npm test`、`npm run build`。生产预览：`npm run preview`。

## 写作与图片

在 `src/content/posts/` 新建 Markdown，参考 welcome.md 的 frontmatter：title、date（YYYY-MM-DD）、category（reading / investing / life）、tags、description、example。正式文章使用 example: false。文件名生成文章 URL；按日期倒序展示。删除 welcome.md 即可移除示例。
图片放在 `public/images/`，文章写 `![说明](/images/文件名.jpg)`。建议压缩图片并填写有意义的说明。个人介绍编辑 `src/pages/about.astro`，首页简介编辑 `src/pages/index.astro`。

## 看板数据

替换 `src/data/demo.json`：name、description 和 points（date、nav）。日期必须严格递增、至少两个点，净值必须为正数。计算在 `src/lib/metrics.ts`，展示在 dashboard.astro 与 Chart.astro；不接账户、密钥或私人持仓。指标口径在页面可展开查看。当前模拟数据标记不能当作真实业绩移除；真实研究应附来源、频率及费用口径。

## 以后连接 GitHub

你已手动创建 https://github.com/pohincheung/pohincheung.github.io 。仓库地址如上；日常修改完成后使用英文 commit message 提交并推送，发布仍需手动触发。
先用 `git rev-parse --show-toplevel` 确认本仓库根目录，然后仅在此仓库设置 `git config user.name "你的名字"` 和 `git config user.email "该账号的已验证邮箱或 noreply 地址"`。不要加 --global。

多账号可使用 HTTPS 的 Git Credential Manager：本仓库设置 `git config credential.useHttpPath true`，远程地址使用 `https://pohincheung@github.com/pohincheung/pohincheung.github.io.git`，首次推送选择 pohincheung。不要清除旧账号凭据。若以后使用 SSH，单独创建新密钥并添加专用 Host 别名，不覆盖现有密钥或默认 Host。

如需重新连接仓库，可参考（已有 origin 时无需重复添加）：

```powershell
git remote add origin https://pohincheung@github.com/pohincheung/pohincheung.github.io.git
git add .
git commit -m "Build personal website"
git push -u origin main
```

仓库 Settings → Pages → Source 选择 GitHub Actions。Actions 页面手动运行工作流即可触发 `.github/workflows/deploy.yml`（推送代码不会自动发布）。

## 域名与 HTTPS

已配置 site=https://pohincheung.com，public/CNAME 为 pohincheung.com，无仓库名 base 前缀，适用于用户站与自定义域名；本地资源使用根路径。未绑定域名不影响本地预览。
发布时在 Pages 设置中添加自定义域名，按 GitHub 官方指引配置 DNS 与域名验证，等待证书签发后启用 Enforce HTTPS。此项目没有修改 DNS。若暂时使用 github.io 域名，先调整 astro.config.mjs 的 site 并暂时移除 CNAME，再构建。

参考官方文档（2026-11-03 查阅）：
- https://docs.astro.build/en/guides/deploy/github/
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## 维护约定

站点展示名称统一为 **PohinCheung**；域名和 GitHub 用户名保持小写。每次修改完成并验证后，以英文提交信息 commit 并 push。本地预览截图不入库。
页面采用极简单栏布局、悬浮顶部导航和纯白背景；配色参考原站的深蓝灰导航与蓝色链接。文章页 /writing/ 按年份归档，分类入口 /categories/。域名后续计划使用 blog.pohincheung.com 或 .net，待确定后统一更新 site 和 Pages 设置；目前保留现有配置。

## 原站迁移范围

首页和悬浮导航迁自 tremendous-matter 的 HomePage 与 SiteHeader，保留原有双栏文章排版并换成干净纯色背景；内容接入本站 Markdown 集合。未迁移旧账号文章、个人经历、头像、环境配置、访问统计、IP 记录、隐藏控制、Supabase、后台和登录。内页保留轻量阅读与模拟看板。
