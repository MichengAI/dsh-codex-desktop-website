# DSH Codex Desktop 官网

[English](README.md)

这是 [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop) 的官网源码。网站展示项目说明，并提供 Windows、macOS 和 Linux 的安装包下载。

下载最新版请前往[桌面应用发布页](https://github.com/MichengAI/dsh-codex-desktop/releases)。

## 获取桌面应用

1. 打开桌面应用发布页，选择与你的系统和 CPU 架构对应的安装包。
2. 安装并启动 DSH Codex Desktop，无需另行安装 Node.js。
3. 在工作台中选择模型、打开项目并新建任务。

本仓库用于维护介绍与下载网站；日常使用桌面应用无需运行网站源码。

## 相关链接

- 官网项目：[dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- 桌面应用：[dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- 发布版本：[GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- 上游项目：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## DSH 产品生态

想直接使用完整工作台，可下载 [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases)；已有 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 环境，可按需独立安装以下 8 个自研插件。桌面端已随附这些插件。

| 插件 | 你可以用它做什么 |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | 整理项目与会话、搜索任务、跳转对话轮次 |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | 从微信、飞书、钉钉等消息平台下任务、收回复 |
| [Automation](https://github.com/MichengAI/dsh-automation) | 按计划执行任务，查看每次运行的结果 |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | 统一查找、启停、创建和导入本机技能 |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | 搜索、恢复或清理已归档会话 |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | 按任务选择并召唤专业角色 |
| [BTW](https://github.com/MichengAI/dsh-btw) | 在当前上下文中临时旁问，不打断主任务 |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | 用 /simplify 整理 Git 改动范围内的代码 |

桌面端介绍与下载站的源码见[官网仓库](https://github.com/MichengAI/dsh-codex-desktop-website)。

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

## 许可证

本项目采用 [Apache License 2.0](LICENSE)。

## 目录说明

```text
src\                 React 页面与样式
public\assets\       网站图片资源
worker\              Cloudflare Worker 入口
scripts\             构建辅助脚本
tests\               Worker 与构建配置测试
wrangler.jsonc       Cloudflare Workers 配置
```

## 更新日志

最近五个开发快照见 [CHANGELOG.zh-CN.md](CHANGELOG.zh-CN.md)。
