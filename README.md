# DSH Codex Desktop Website

[中文](README.zh-CN.md) · [Changelog](CHANGELOG.md)

This repository contains the website source for [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop). The site introduces the project and links to installers for Windows, macOS, and Linux.

Download the latest version from the [desktop app releases](https://github.com/MichengAI/dsh-codex-desktop/releases).

The current desktop release is **v1.0.52**, bundling **DSH 0.1.5-rc.2** and **15 components (including the plugin market)**. This version uses Session V3. Back up important conversations before upgrading; conversations written by the new version cannot be read directly by older versions.

## Get the desktop app

1. Open the desktop releases page and choose the installer for your operating system and CPU architecture.
2. Install and launch DSH Codex Desktop; no separate Node.js installation is needed.
3. Choose a model, open a project, and start a task in the workbench.

This repository maintains the introduction and download website. You do not need to run the website source to use the desktop app.

## Links

- Website repository: [dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- Desktop app: [dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- Releases: [GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- Upstream: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## DSH product ecosystem

For a desktop workbench, download [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases). Existing [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) installations can add plugins as needed by following each project's README. Below are 11 first-party plugins; consult the corresponding desktop release notes and bundled catalog for what that version includes.

| Plugin | What you can do |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | Organize projects and conversations, search tasks, and navigate chat turns |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | Choose and summon specialists for your task |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | Find, enable, create, and import local skills |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | Search, restore, or clean up archived conversations |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | Send tasks and receive replies through messaging platforms |
| [Automation](https://github.com/MichengAI/dsh-automation) | Schedule tasks and review each run |
| [BTW](https://github.com/MichengAI/dsh-btw) | Ask side questions without interrupting the main task |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | Use `/simplify` to improve code within your Git changes |
| [PUA](https://github.com/MichengAI/dsh-pua) | Guide the Agent to try new approaches after failures, investigate causes, and verify results before completion |
| [Code Review](https://github.com/MichengAI/dsh-code-review) | Use `/review` to request an independent Agent code review and receive the report in the current conversation |
| [Codex Pet](https://github.com/MichengAI/dsh-codex-pet) | View conversation notifications and respond to tool approvals and questions through a desktop pet |

## Local development

Install Node.js and npm, then run the following commands from the repository root:

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

The development server listens on `http://localhost:5173` by default.

## Build and test

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

The client build is written to `dist\client`.

## Cloudflare Workers deployment

`wrangler.jsonc` serves `dist\client` as static assets, while `worker\index.js` provides the single-page application fallback.

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Project layout

```text
src\                 React page and styles
public\assets\       Website image assets
worker\              Cloudflare Worker entry point
scripts\             Build helpers
tests\               Worker and build configuration tests
wrangler.jsonc       Cloudflare Workers configuration
```
