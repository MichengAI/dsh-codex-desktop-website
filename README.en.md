# DeepSeek Harness Desktop Website

[中文](README.md)

This repository contains the website source for [DeepSeek Harness Desktop](https://github.com/MichengAI/deepseek-harness-desktop). The site introduces the project and links to installers for Windows, macOS, and Linux.

Current release shown on the website: [`v0.1.4`](https://github.com/MichengAI/deepseek-harness-desktop/releases/tag/v0.1.4)

## Links

- Website repository: [deepseek-harness-website](https://github.com/MichengAI/deepseek-harness-website)
- Desktop app: [deepseek-harness-desktop](https://github.com/MichengAI/deepseek-harness-desktop)
- Releases: [GitHub Releases](https://github.com/MichengAI/deepseek-harness-desktop/releases)
- Upstream: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

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

## Project layout

```text
src\                 React page and styles
public\assets\       Website image assets
worker\              Cloudflare Worker entry point
scripts\             Build helpers
tests\               Worker and build configuration tests
wrangler.jsonc       Cloudflare Workers configuration
```
