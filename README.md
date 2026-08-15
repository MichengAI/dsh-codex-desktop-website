# DeepSeek Harness Desktop 官网

[English](README.en.md)

这是 [DeepSeek Harness Desktop](https://github.com/MichengAI/deepseek-harness-desktop) 的官网源码。网站展示项目说明，并提供 Windows、macOS 和 Linux 的安装包下载。

当前展示版本：[`v0.1.4`](https://github.com/MichengAI/deepseek-harness-desktop/releases/tag/v0.1.4)

## 相关链接

- 官网项目：[deepseek-harness-website](https://github.com/MichengAI/deepseek-harness-website)
- 桌面应用：[deepseek-harness-desktop](https://github.com/MichengAI/deepseek-harness-desktop)
- 发布版本：[GitHub Releases](https://github.com/MichengAI/deepseek-harness-desktop/releases)
- 上游项目：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## 本地开发

安装 Node.js 和 npm 后，在项目根目录执行：

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

默认访问地址为 `http://localhost:5173`。

## 构建与测试

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

构建产物位于 `dist\client`。

## Cloudflare Workers 部署

项目使用 `wrangler.jsonc` 将 `dist\client` 作为静态资源目录，并由 `worker\index.js` 处理单页应用路由回退。

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## 目录说明

```text
src\                 React 页面与样式
public\assets\       网站图片资源
worker\              Cloudflare Worker 入口
scripts\             构建辅助脚本
tests\               Worker 与构建配置测试
wrangler.jsonc       Cloudflare Workers 配置
```
