import { useEffect, useState } from "react";
import { recentDesktopReleases } from "./releases.js";

const desktopRepositoryUrl = "https://github.com/MichengAI/dsh-codex-desktop";
const websiteRepositoryUrl = "https://github.com/MichengAI/dsh-codex-desktop-website";
const releaseUrl = `${desktopRepositoryUrl}/releases/latest`;
const currentReleaseUrl = `${desktopRepositoryUrl}/releases/tag/v1.0.49`;


const translations = {
  "页面导航": "Page navigation", "桌面端": "Desktop", "下载": "Downloads", "更新日志": "Changelog", "插件": "Plugins",
  "切换至暗色模式": "Switch to dark mode", "切换至亮色模式": "Switch to light mode", "切换至英文": "Switch to English", "切换至中文": "Switch to Chinese",
  "Codex UI 以及": "Codex UI and", "常用内置插件。": "everyday built-in plugins.",
  "DSH Codex Desktop 将 Codex UI、专家预设、技能管理、会话归档、IM Connect、自动化、上下文管理、MCP 连接、用量统计和增强侧边栏带到桌面端。": "DSH Codex Desktop brings Codex UI, expert presets, skill management, conversation archives, IM Connect, automation, context management, MCP connections, usage billing, and an enhanced sidebar to the desktop.",
  "下载桌面端": "Download desktop app", "查看随附组件": "View bundled plugins", "支持系统": "Platforms", "运行方式": "Runtime", "本机服务": "Local service", "更新入口": "Updates",
  "DSH Codex Desktop 产品总览": "DSH Codex Desktop product overview", "放大查看 DSH Codex Desktop 产品总览": "Open DSH Codex Desktop product overview", "Codex UI 以及常用内置插件": "Codex UI and everyday built-in plugins",
  "内置本地运行环境": "Built-in local runtime", "用户数据保留在本机": "User data stays local", "插件可独立更新": "Plugins update independently", "通过 Releases 获取新版本": "New versions via Releases",
  "功能": "FEATURES", "桌面端包含什么": "What is in the desktop app", "一个应用，管理 Codex UI": "One app for Codex UI", "和常用的 DSH 组件。": "and everyday DSH tools.",
  "安装桌面端后，可以在 Codex UI 中处理项目、任务和会话；专家预设、技能、归档、IM Connect、自动化、上下文管理和增强侧边栏作为独立组件随应用提供。": "Use Codex UI for projects, tasks, and conversations. Expert presets, skills, archives, IM Connect, automation, context management, and the enhanced sidebar are included as independent components.",
  "DSH Codex Desktop 深色会话工作区": "DSH Codex Desktop dark conversation workspace", "放大查看深色会话工作区": "Open dark conversation workspace",
  "Codex UI 是主界面": "Codex UI is the main interface", "围绕项目、任务与会话组织日常 Agent 工作，而不是单独启动一个底层运行时。": "Organize daily Agent work around projects, tasks, and conversations instead of starting a runtime on its own.",
  "插件集合开箱即用": "Plugins are ready to use", "常用内置插件随首次启动准备完成，按你的工作方式选择并持续扩展。": "Everyday built-in plugins are prepared on first launch. Choose what fits your workflow and extend it over time.",
  "桌面端负责交付": "The desktop app handles delivery", "内置本地运行环境并保留用户数据，让工作台可直接安装、更新和使用。": "A local runtime and local data make the workbench ready to install, update, and use.",
  "DSH Codex Desktop 产品截图": "DSH Codex Desktop product screenshots", "Codex UI 的项目与会话工作区": "Codex UI project and conversation workspace", "放大查看 Codex UI 工作区": "Open Codex UI workspace",
  "Codex UI 工作区": "Codex UI workspace", "项目、任务与会话在同一视图持续推进。": "Projects, tasks, and conversations move forward in one view.",
  "专家预设管理界面": "Expert preset management", "放大查看专家预设": "Open expert presets", "专家预设": "Expert presets", "为当前任务选择所需专业角色。": "Choose the role needed for the task.",
  "技能管理界面": "Skills management", "放大查看技能中心": "Open skills center", "技能中心": "Skills center", "集中管理 Agent 可用技能。": "Manage available Agent skills in one place.",
  "归档会话管理界面": "Archived conversation management", "放大查看归档管理": "Open archive manager", "归档管理": "Archive manager", "检索、恢复与整理工作历史。": "Search, restore, and organize work history.",
  "IM 频道配置界面": "IM channel configuration", "放大查看 IM Connect": "Open IM Connect", "连接可用的消息协作频道。": "Connect available collaboration channels.",
  "安装": "INSTALL", "当前发布版本": "Current release", "选择系统和架构。": "Choose your system and architecture.",
  "GitHub Releases 保留各平台的最新安装包与历史版本。请选择与设备相符的安装包类型。": "GitHub Releases has the latest installers and release history for each platform. Choose the package that matches your device.",
  ".exe 安装器": ".exe installer", ".dmg 磁盘映像": ".dmg disk image", ".deb 软件包": ".deb package", "下载 Windows": "Download for Windows", "下载 Apple Silicon": "Download for Apple Silicon", "下载 Intel Mac": "Download for Intel Mac", "下载 Linux .deb": "Download Linux .deb", "下载 AppImage": "Download AppImage",
  "注意": "Note", "macOS 当前发布包尚未签名与公证，系统可能显示来源提示。完整发布记录与其他资产见": "Current macOS packages are not yet signed or notarized, so the system may show a source warning. Find release notes and other assets on",
  "版本": "RELEASES", "最近 5 个版本": "Latest 5 releases", "跟进桌面端的每一次更新。": "Follow every recent desktop update.",
  "以下内容整理自 GitHub Releases，按发布时间从新到旧排列。": "Compiled from GitHub Releases and ordered from newest to oldest.",
  "组件": "PLUGINS", "随附插件": "Bundled plugins", "常用内置插件，": "Everyday built-in plugins", "覆盖常见工作环节。": "for everyday work.",
  "这些组件会在首次启动时准备到 DSH profile 中。每个插件都有自己的仓库、版本和更新路径；桌面端运行时不会被插件更新覆盖。": "These components are prepared in the DSH profile on first launch. Each has its own repository, version, and update path; plugin updates do not overwrite the desktop runtime.",
  "自制插件": "First-party plugins", "由 MichengAI 维护，随 Desktop 同步演进。": "Maintained by MichengAI and updated alongside Desktop.",
  "社区插件": "Community plugins", "由社区维护，作为桌面端的集成生态组件随包提供。": "Community-maintained ecosystem components bundled with Desktop.",
  "提供项目、任务与会话工作区，把日常 Agent 协作收进一个桌面界面。": "A desktop workspace for projects, tasks, and conversations.",
  "按任务启用代码审查、架构、前端、后端与运维等专家预设。": "Task-specific presets for code review, architecture, frontend, backend, and operations.",
  "查看、启用、停用与管理本地及共享的 Agent 技能。": "Browse, enable, disable, and manage local or shared Agent skills.",
  "检索、恢复或清理已归档会话，让历史上下文持续可用。": "Search, restore, or clear archived conversations while keeping context available.",
  "集中配置钉钉、飞书、Lark、微信、企业微信、QQ 与 Telegram 等可用频道。": "Configure DingTalk, Feishu, Lark, WeChat, WeCom, QQ, Telegram, and other channels in one place.",
  "用内置定时能力管理周期任务，在同一工作台持续运行。": "Run recurring tasks from the same workbench with built-in scheduling.",
  "查看上下文构成、使用情况与演进，帮助判断何时需要整理或压缩。": "Inspect context composition, usage, and evolution to decide when cleanup or compaction is needed.",
  "提供类似 VS Code 的文件、编辑器、终端、Git 与浏览器侧边栏。": "Adds a VS Code-like sidebar for files, editing, terminals, Git, and browsing.",
  "通过 OAuth、API Key、HTTP、stdio 或 JSON 配置添加并管理 MCP 服务。": "Add and manage MCP services with OAuth, API keys, HTTP, stdio, or JSON configuration.",
  "汇总模型用量与费用，提供面向工作台的计费看板。": "Aggregate model usage and costs in a billing dashboard for the workbench.",
  "在当前会话中发起一次性只读旁问，不打断主任务。": "Ask a one-off, read-only side question within the current session without interrupting the main task.",
  "限定 Git 变更范围，帮助当前 Agent 在保持功能的前提下简化代码。": "Scope work to Git changes so the current Agent can simplify code while preserving behavior.",
  "插件市场": "PLUGIN MARKET", "从 dshmarket 管理更多插件。": "Manage more plugins with dshmarket.", "随桌面端提供，用于发现、安装、更新、启用和诊断其他 DSH 插件。": "Comes with the desktop app for discovering, installing, updating, enabling, and diagnosing other DSH plugins.",
  "从 Releases 下载，": "Download from Releases,", "安装后打开应用。": "then open the app.", "打开最新发布页": "Open latest release", "查看桌面端仓库": "View desktop repository",
  "DSH Codex Desktop 是由 Codex UI 与功能插件集合构成的社区工作台，基于 DeepSeek Harness 运行时与插件能力构建，并非 DeepSeek AI 官方产品。": "DSH Codex Desktop is a community workbench built from Codex UI and functional plugins, using the DeepSeek Harness runtime and plugin capabilities. It is not an official DeepSeek AI product.",
  "桌面端仓库": "Desktop repository", "官网源码": "Website source", "关闭大图": "Close preview", "关闭 ×": "Close ×",
};
const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([zh, en]) => [en, zh]));

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem("dsh-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function getInitialLocale() {
  const savedLocale = window.localStorage.getItem("dsh-locale");
  if (savedLocale === "zh" || savedLocale === "en") return savedLocale;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function translatePage(locale) {
  const mapping = locale === "en" ? translations : reverseTranslations;
  const translate = (text) => mapping[text.trim()] ? text.replace(text.trim(), mapping[text.trim()]) : text;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.parentElement.closest("[data-no-translate]")) node.nodeValue = translate(node.nodeValue);
  }

  document.querySelectorAll("[alt], [aria-label]").forEach((element) => {
    ["alt", "aria-label"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && mapping[value]) element.setAttribute(attribute, mapping[value]);
    });
  });
}

const downloads = [
  ["Windows", "x64", ".exe 安装器", "下载 Windows"],
  ["macOS", "Apple Silicon", ".dmg 磁盘映像", "下载 Apple Silicon"],
  ["macOS", "Intel", ".dmg 磁盘映像", "下载 Intel Mac"],
  ["Linux", "x64 · Debian / Ubuntu", ".deb 软件包", "下载 Linux .deb"],
  ["Linux", "x64 · 通用发行版", ".AppImage", "下载 AppImage"],
];

const firstPartyPlugins = [
  ["dsh-codex-ui", "@michengai/dsh-codex-ui", "主界面", "提供项目、任务与会话工作区，把日常 Agent 协作收进一个桌面界面。", "https://github.com/MichengAI/dsh-codex-ui"],
  ["dsh-agency-agents", "@michengai/dsh-agency-agents", "专家预设", "按任务启用代码审查、架构、前端、后端与运维等专家预设。", "https://github.com/MichengAI/dsh-agency-agents"],
  ["dsh-skills-manager", "@michengai/dsh-skills-manager", "技能管理", "查看、启用、停用与管理本地及共享的 Agent 技能。", "https://github.com/MichengAI/dsh-skills-manager"],
  ["dsh-archive-manager", "@michengai/dsh-archive-manager", "会话归档", "检索、恢复或清理已归档会话，让历史上下文持续可用。", "https://github.com/MichengAI/dsh-archive-manager"],
  ["dsh-im-connect", "@michengai/dsh-im-connect", "消息连接", "集中配置钉钉、飞书、Lark、微信、企业微信、QQ 与 Telegram 等可用频道。", "https://github.com/MichengAI/dsh-im-connect"],
  ["dsh-automation", "@michengai/dsh-automation", "自动化任务", "用内置定时能力管理周期任务，在同一工作台持续运行。", "https://github.com/MichengAI/dsh-automation"],
  ["dsh-btw", "@michengai/dsh-btw", "只读旁问", "在当前会话中发起一次性只读旁问，不打断主任务。", "https://github.com/MichengAI/dsh-btw"],
  ["dsh-simplify", "@michengai/dsh-simplify", "代码简化", "限定 Git 变更范围，帮助当前 Agent 在保持功能的前提下简化代码。", "https://github.com/MichengAI/dsh-simplify"],
];
const communityPlugins = [
  ["dsh-context", "dsh-context", "上下文管理", "查看上下文构成、使用情况与演进，帮助判断何时需要整理或压缩。", "https://github.com/bowenliang123/dsh-context"],
  ["dsh-better-sidebar", "dsh-better-sidebar", "增强侧边栏", "提供类似 VS Code 的文件、编辑器、终端、Git 与浏览器侧边栏。", "https://github.com/omdsh-dev/DSH-better-sidebar"],
  ["dsh-mcp-connector", "dsh-mcp-connector", "MCP 连接", "通过 OAuth、API Key、HTTP、stdio 或 JSON 配置添加并管理 MCP 服务。", "https://github.com/duhu2000/dsh-mcp-connector"],
  ["dsh-ui-usage-billing", "@kenz1117/dsh-ui-usage-billing", "用量统计", "汇总模型用量与费用，提供面向工作台的计费看板。", "https://github.com/kenz1117/dsh-ui-usage-billing"],
];
const pluginLabelTranslations = {
  "主界面": "MAIN INTERFACE",
  "专家预设": "EXPERT PRESETS",
  "技能管理": "SKILL MANAGEMENT",
  "会话归档": "CONVERSATION ARCHIVES",
  "消息连接": "MESSAGING",
  "自动化任务": "AUTOMATION",
  "上下文管理": "CONTEXT MANAGEMENT",
  "增强侧边栏": "ENHANCED SIDEBAR",
  "MCP 连接": "MCP CONNECTIONS",
  "用量统计": "USAGE BILLING",
  "只读旁问": "READ-ONLY SIDE QUESTIONS",
  "代码简化": "CODE SIMPLIFICATION",
  "插件市场": "PLUGIN MARKET",
};

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }
function Kicker({ number, children }) { return <div className="kicker"><span>{number}</span><p>{children}</p></div>; }
function PluginCards({ plugins, locale }) {
  return plugins.map(([name, packageName, label, description, href]) => <a className="plugin" key={packageName} href={href} target="_blank" rel="noreferrer"><div><small data-no-translate>{locale === "zh" ? label : pluginLabelTranslations[label]}</small><Arrow /></div><h3>{name}</h3><p>{description}</p><code>{packageName}</code></a>);
}

export function App() {
  const [activeScreenshot, setActiveScreenshot] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [locale, setLocale] = useState(getInitialLocale);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("dsh-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title = locale === "zh" ? "DSH Codex Desktop · Codex UI 与插件工作台" : "DSH Codex Desktop · Codex UI and plugins";
    window.localStorage.setItem("dsh-locale", locale);
    translatePage(locale);
  }, [locale, theme, activeScreenshot]);

  useEffect(() => {
    if (activeScreenshot === null) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveScreenshot(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeScreenshot]);

  return <div className="site-shell">
    <header className="header page-width">
      <a className="brand" href="#top"><img src="/assets/brand-mark.png" alt="DSH Codex Desktop" /><span>DSH Codex Desktop</span></a>
      <div className="header-actions">
        <nav aria-label="页面导航"><a href="#desktop">桌面端</a><a href="#downloads">下载</a><a href="#plugins">插件</a><a href="#changelog">更新日志</a><a href={desktopRepositoryUrl} target="_blank" rel="noreferrer">GitHub <Arrow /></a></nav>
        <div className="site-controls" data-no-translate aria-label={locale === "zh" ? "显示与语言设置" : "Display and language settings"}>
          <button type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={theme === "light" ? (locale === "zh" ? "切换至暗色模式" : "Switch to dark mode") : (locale === "zh" ? "切换至亮色模式" : "Switch to light mode")} title={theme === "light" ? (locale === "zh" ? "切换至暗色模式" : "Switch to dark mode") : (locale === "zh" ? "切换至亮色模式" : "Switch to light mode")}>{theme === "light" ? "☾" : "☀"}</button>
          <button type="button" onClick={() => setLocale(locale === "zh" ? "en" : "zh")} aria-label={locale === "zh" ? "切换至英文" : "Switch to Chinese"}>{locale === "zh" ? "EN" : "中文"}</button>
        </div>
      </div>
    </header>
    <main id="top">
      <a className="official-support" href={currentReleaseUrl} target="_blank" rel="noreferrer" data-no-translate>
        <span className="page-width">
          <strong><i aria-hidden="true" />{locale === "zh" ? "已支持最新 DSH 官方版本" : "SUPPORTS THE LATEST OFFICIAL DSH RELEASE"}</strong>
          <span>DeepSeek Harness 0.1.2-rc.1</span>
          <b>{locale === "zh" ? "查看 v1.0.49" : "View v1.0.49"}<Arrow /></b>
        </span>
      </a>
      <section className="hero page-width" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow"><i />DSH CODEX DESKTOP</p>
          <h1 id="hero-title">Codex UI 以及<br /><em>常用内置插件。</em></h1>
          <p className="lead">DSH Codex Desktop 将 Codex UI、专家预设、技能管理、会话归档、IM Connect、自动化、上下文管理、MCP 连接、用量统计和增强侧边栏带到桌面端。</p>
          <div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">下载桌面端<Arrow /></a><a className="button ghost" href="#plugins">查看随附组件</a></div>
          <div className="hero-meta"><span><b>支持系统</b> Windows / macOS / Linux</span><span><b>运行方式</b> 本机服务</span><span><b>更新入口</b> GitHub Releases</span></div>
        </div>
        <figure className="hero-product"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/product-overview.png", alt: "DSH Codex Desktop 产品总览" })} aria-label="放大查看 DSH Codex Desktop 产品总览"><img src="/assets/product-overview.png" alt="DSH Codex Desktop 产品总览" /></button><figcaption><span>DSH CODEX DESKTOP</span><span>Codex UI 以及常用内置插件</span></figcaption></figure>
      </section>
      <section className="signal"><div className="page-width"><span>内置本地运行环境</span><i>·</i><span>用户数据保留在本机</span><i>·</i><span>插件可独立更新</span><i>·</i><span>通过 Releases 获取新版本</span></div></section>
      <section className="desktop page-width" id="desktop" aria-labelledby="desktop-title">
        <Kicker number="功能">桌面端包含什么</Kicker><div className="intro"><h2 id="desktop-title">一个应用，管理 Codex UI<br />和常用的 DSH 组件。</h2><p>安装桌面端后，可以在 Codex UI 中处理项目、任务和会话；专家预设、技能、归档、IM Connect、自动化、上下文管理和增强侧边栏作为独立组件随应用提供。</p></div>
        <div className="desktop-grid"><div className="preview"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-conversation-dark.png", alt: "DSH Codex Desktop 深色会话工作区" })} aria-label="放大查看深色会话工作区"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-conversation-dark.png" alt="DSH Codex Desktop 深色会话工作区" /></button></div><div className="capabilities"><article><b>01</b><div><h3>Codex UI 是主界面</h3><p>围绕项目、任务与会话组织日常 Agent 工作，而不是单独启动一个底层运行时。</p></div></article><article><b>02</b><div><h3>插件集合开箱即用</h3><p>常用内置插件随首次启动准备完成，按你的工作方式选择并持续扩展。</p></div></article><article><b>03</b><div><h3>桌面端负责交付</h3><p>内置本地运行环境并保留用户数据，让工作台可直接安装、更新和使用。</p></div></article></div></div>
        <div className="screenshot-gallery" aria-label="DSH Codex Desktop 产品截图"><figure className="screenshot-wide"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/workspace-session.png", alt: "Codex UI 的项目与会话工作区" })} aria-label="放大查看 Codex UI 工作区"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/workspace-session.png" alt="Codex UI 的项目与会话工作区" /></button><figcaption><b>Codex UI 工作区</b><span>项目、任务与会话在同一视图持续推进。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-experts.png", alt: "专家预设管理界面" })} aria-label="放大查看专家预设"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-experts.png" alt="专家预设管理界面" /></button><figcaption><b>专家预设</b><span>为当前任务选择所需专业角色。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-skills.png", alt: "技能管理界面" })} aria-label="放大查看技能中心"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-skills.png" alt="技能管理界面" /></button><figcaption><b>技能中心</b><span>集中管理 Agent 可用技能。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-archive.png", alt: "归档会话管理界面" })} aria-label="放大查看归档管理"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-archive.png" alt="归档会话管理界面" /></button><figcaption><b>归档管理</b><span>检索、恢复与整理工作历史。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-im-channels.png", alt: "IM 频道配置界面" })} aria-label="放大查看 IM Connect"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-im-channels.png" alt="IM 频道配置界面" /></button><figcaption><b>IM Connect</b><span>连接可用的消息协作频道。</span></figcaption></figure></div>
        <style>{`.screenshot-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:45px}.screenshot-gallery figure{min-width:0;margin:0;overflow:hidden;border:1px solid rgb(145 190 220 / 22%);border-radius:10px;background:#0b1b2b}.screenshot-gallery .screenshot-wide{grid-column:span 2}.screenshot-gallery img{display:block;width:100%;aspect-ratio:1.58;object-fit:cover;object-position:top;transition:transform .25s ease}.screenshot-gallery figure:hover img{transform:scale(1.025)}.screenshot-gallery figcaption{padding:13px 14px 15px}.screenshot-gallery figcaption b,.screenshot-gallery figcaption span{display:block}.screenshot-gallery figcaption b{margin-bottom:5px;font-size:13px}.screenshot-gallery figcaption span{color:#8fa9bd;font-size:11px;line-height:1.5}@media(max-width:930px){.screenshot-gallery{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.screenshot-gallery{grid-template-columns:1fr;margin-top:28px}.screenshot-gallery .screenshot-wide{grid-column:auto}}`}</style>
      </section>
      <section className="downloads" id="downloads" aria-labelledby="downloads-title"><div className="page-width"><Kicker number="安装">当前发布版本</Kicker><div className="intro"><h2 id="downloads-title">选择系统和架构。</h2><p>GitHub Releases 保留各平台的最新安装包与历史版本。请选择与设备相符的安装包类型。</p></div><div className="download-grid">{downloads.map(([system, arch, type, label]) => <a className="download-card" key={`${system}-${arch}`} href={releaseUrl} target="_blank" rel="noreferrer"><small>{system}</small><h3>{arch}</h3><p>{type}</p><b>{label}<Arrow /></b></a>)}</div><p className="release-note"><b>注意</b><span>macOS 当前发布包尚未签名与公证，系统可能显示来源提示。完整发布记录与其他资产见 <a href={releaseUrl} target="_blank" rel="noreferrer">GitHub Releases <Arrow /></a>{locale === "zh" ? "。" : "."}</span></p></div></section>
      <section className="plugins page-width" id="plugins" aria-labelledby="plugins-title"><div className="intro plugin-intro"><div><Kicker number="组件">随附插件</Kicker><h2 id="plugins-title">常用内置插件，<br />覆盖常见工作环节。</h2></div><p>这些组件会在首次启动时准备到 DSH profile 中。每个插件都有自己的仓库、版本和更新路径；桌面端运行时不会被插件更新覆盖。</p></div><div className="plugin-groups"><div className="plugin-group"><div className="plugin-group-heading"><h3>自制插件</h3><p>由 MichengAI 维护，随 Desktop 同步演进。</p></div><div className="plugin-grid"><PluginCards plugins={firstPartyPlugins} locale={locale} /></div></div><div className="plugin-group"><div className="plugin-group-heading"><h3>社区插件</h3><p>由社区维护，作为桌面端的集成生态组件随包提供。</p></div><div className="plugin-grid"><PluginCards plugins={communityPlugins} locale={locale} /></div></div></div><div className="plugin-market-row"><a className="plugin plugin-market" href="https://dshmarket.com" target="_blank" rel="noreferrer"><div><small data-no-translate>{locale === "zh" ? "插件市场" : pluginLabelTranslations["插件市场"]}</small><Arrow /></div><h3>dshmarket</h3><p>随桌面端提供，用于发现、安装、更新、启用和诊断其他 DSH 插件。</p><code>dshmarket</code></a></div></section>
      <section className="changelog page-width" id="changelog" aria-labelledby="changelog-title">
        <div className="intro changelog-intro"><div><Kicker number="版本">最近 5 个版本</Kicker><h2 id="changelog-title">跟进桌面端的每一次更新。</h2></div><p>以下内容整理自 GitHub Releases，按发布时间从新到旧排列。</p></div>
        <ol className="release-list" data-no-translate>
          {recentDesktopReleases.map((release, index) => <li className={index === 0 ? "is-latest" : ""} key={release.version}>
            <div className="release-stamp"><span>{locale === "zh" ? (index === 0 ? "最新版本" : "桌面端") : (index === 0 ? "LATEST" : "DESKTOP")}</span><strong>{release.version}</strong><time dateTime={release.date}>{release.date}</time></div>
            <div className="release-copy"><ul>{release[locale].map((item) => <li key={item}>{item}</li>)}</ul><a href={release.url} target="_blank" rel="noreferrer">{locale === "zh" ? "查看完整发布说明" : "View full release notes"}<Arrow /></a></div>
          </li>)}
        </ol>
      </section>
      <section className="closing page-width"><div><p className="eyebrow"><i />GET STARTED</p><h2>从 Releases 下载，<br />安装后打开应用。</h2></div><div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">打开最新发布页<Arrow /></a><a className="link" href={desktopRepositoryUrl} target="_blank" rel="noreferrer">查看桌面端仓库 <Arrow /></a></div></section>
    </main>
    <footer className="footer page-width"><p>DSH Codex Desktop 是由 Codex UI 与功能插件集合构成的社区工作台，基于 DeepSeek Harness 运行时与插件能力构建，并非 DeepSeek AI 官方产品。</p><div><a href={desktopRepositoryUrl} target="_blank" rel="noreferrer">桌面端仓库</a><a href={websiteRepositoryUrl} target="_blank" rel="noreferrer">官网源码</a></div></footer>
    {activeScreenshot && <dialog className="screenshot-dialog" open aria-label={activeScreenshot.alt} onClick={() => setActiveScreenshot(null)}><div onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setActiveScreenshot(null)} aria-label="关闭大图">关闭 ×</button><img src={activeScreenshot.src} alt={activeScreenshot.alt} /></div></dialog>}
  </div>;
}
