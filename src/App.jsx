import { useEffect, useState } from "react";
import { recentDesktopReleases } from "./releases.js";
import {
  SUPPORTED_LOCALES,
  LOCALE_NAMES,
  HTML_LANG_MAP,
  titles,
  officialSupportBanner,
  viewVersionText,
  releaseBadge,
  viewFullReleaseNotesText,
  siteControlAria,
  selectLanguageAria,
  themeAria,
  pluginLabelLocales,
  translations,
} from "./locales.js";

const desktopRepositoryUrl = "https://github.com/MichengAI/dsh-codex-desktop";
const websiteRepositoryUrl = "https://github.com/MichengAI/dsh-codex-desktop-website";
const releaseUrl = `${desktopRepositoryUrl}/releases/latest`;
const currentReleaseUrl = `${desktopRepositoryUrl}/releases/tag/v1.0.93`;

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem("dsh-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialLocale() {
  const savedLocale = window.localStorage.getItem("dsh-locale");
  if (SUPPORTED_LOCALES.includes(savedLocale)) return savedLocale;
  const navLang = (navigator.language || "").toLowerCase();
  for (const code of SUPPORTED_LOCALES) {
    if (navLang.startsWith(code)) return code;
  }
  return "zh";
}

const originalTexts = new WeakMap();

function translatePage(locale) {
  const langDict = translations[locale] || {};
  const isZh = locale === "zh";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.parentElement?.closest("[data-no-translate]")) continue;

    let original = originalTexts.get(node);
    if (original === undefined) {
      original = node.nodeValue;
      originalTexts.set(node, original);
    }

    if (isZh) {
      if (node.nodeValue !== original) node.nodeValue = original;
    } else {
      const trimmed = original.trim();
      if (trimmed && langDict[trimmed]) {
        const replacement = original.replace(trimmed, langDict[trimmed]);
        if (node.nodeValue !== replacement) node.nodeValue = replacement;
      } else if (node.nodeValue !== original) {
        node.nodeValue = original;
      }
    }
  }

  document.querySelectorAll("[alt], [aria-label]").forEach((element) => {
    if (element.closest("[data-no-translate]")) return;
    ["alt", "aria-label"].forEach((attr) => {
      const origAttr = `data-origin-${attr}`;
      let original = element.getAttribute(origAttr);
      if (!original) {
        original = element.getAttribute(attr);
        if (original) element.setAttribute(origAttr, original);
      }
      if (!original) return;

      if (isZh) {
        element.setAttribute(attr, original);
      } else if (langDict[original]) {
        element.setAttribute(attr, langDict[original]);
      } else {
        element.setAttribute(attr, original);
      }
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
  ["dsh-codex-pet", "@michengai/dsh-codex-pet", "桌面宠物", "选择桌面宠物，查看会话提醒并直接处理工具审批和问题回答。", "https://github.com/MichengAI/dsh-codex-pet"],
  ["dsh-codex-ui", "@michengai/dsh-codex-ui", "主界面", "提供项目、任务与会话工作区，把日常 Agent 协作收进一个桌面界面。", "https://github.com/MichengAI/dsh-codex-ui"],
  ["dsh-agency-agents", "@michengai/dsh-agency-agents", "专家预设", "按任务启用代码审查、架构、前端、后端与运维等专家预设。", "https://github.com/MichengAI/dsh-agency-agents"],
  ["dsh-skills-manager", "@michengai/dsh-skills-manager", "技能管理", "查看、启用、停用与管理本地及共享的 Agent 技能。", "https://github.com/MichengAI/dsh-skills-manager"],
  ["dsh-archive-manager", "@michengai/dsh-archive-manager", "会话归档", "检索、恢复或清理已归档会话，让历史上下文持续可用。", "https://github.com/MichengAI/dsh-archive-manager"],
  ["dsh-im-connect", "@michengai/dsh-im-connect", "消息连接", "集中配置钉钉、飞书、Lark、微信、企业微信、QQ 与 Telegram 等可用频道。", "https://github.com/MichengAI/dsh-im-connect"],
  ["dsh-automation", "@michengai/dsh-automation", "自动化任务", "用内置定时能力管理周期任务，在同一工作台持续运行。", "https://github.com/MichengAI/dsh-automation"],
  ["dsh-btw", "@michengai/dsh-btw", "只读旁问", "在当前会话中发起一次性只读旁问，不打断主任务。", "https://github.com/MichengAI/dsh-btw"],
  ["dsh-simplify", "@michengai/dsh-simplify", "代码简化", "限定 Git 变更范围，帮助当前 Agent 在保持功能的前提下简化代码。", "https://github.com/MichengAI/dsh-simplify"],
  ["dsh-pua", "@michengai/dsh-pua", "任务推进", "引导 Agent 在失败时换方法、查原因，并在完成前验证结果。", "https://github.com/MichengAI/dsh-pua"],
  ["dsh-code-review", "@michengai/dsh-code-review", "代码审查", "用 /review 发起独立 Agent 代码审查，选择审查范围并在当前会话接收报告。", "https://github.com/MichengAI/dsh-code-review"],
];
const communityPlugins = [
  ["dsh-context", "dsh-context", "上下文管理", "查看上下文构成、使用情况与演进，帮助判断何时需要整理或压缩。", "https://github.com/bowenliang123/dsh-context"],
  ["dsh-better-sidebar", "dsh-better-sidebar", "增强侧边栏", "提供类似 VS Code 的文件、编辑器、终端、Git 与浏览器侧边栏。", "https://github.com/omdsh-dev/DSH-better-sidebar"],
  ["dsh-mcp-connector", "dsh-mcp-connector", "MCP 连接", "通过 OAuth、API Key、HTTP、stdio 或 JSON 配置添加并管理 MCP 服务。", "https://github.com/duhu2000/dsh-mcp-connector"],
  ["dsh-ui-usage-billing", "@kenz1117/dsh-ui-usage-billing", "用量统计", "汇总模型用量与费用，提供面向工作台的计费看板。", "https://github.com/kenz1117/dsh-ui-usage-billing"],
];
const pluginLabelTranslations = {
  "桌面宠物": "DESKTOP PET",
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
  "任务推进": "TASK PERSISTENCE",
  "代码审查": "CODE REVIEW",
  "插件市场": "PLUGIN MARKET",
};

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }
function Kicker({ number, children }) { return <div className="kicker"><span>{number}</span><p>{children}</p></div>; }
function PluginCards({ plugins, locale }) {
  return plugins.map(([name, packageName, label, description, href]) => <a className="plugin" key={packageName} href={href} target="_blank" rel="noreferrer"><div><small data-no-translate>{locale === "zh" ? label : (pluginLabelLocales[locale]?.[label] || pluginLabelTranslations[label])}</small><Arrow /></div><h3>{name}</h3><p>{description}</p><code>{packageName}</code></a>);
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
    document.documentElement.lang = HTML_LANG_MAP[locale] || "en";
    document.title = titles[locale] || titles.zh;
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
        <div className="site-controls" data-no-translate aria-label={siteControlAria[locale] || "显示与语言设置"}>
          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? (themeAria[locale]?.dark || "切换至暗色模式") : (themeAria[locale]?.light || "切换至亮色模式")}
            title={theme === "light" ? (themeAria[locale]?.dark || "切换至暗色模式") : (themeAria[locale]?.light || "切换至亮色模式")}
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value)}
            aria-label={selectLanguageAria[locale] || "选择语言"}
            title={selectLanguageAria[locale] || "选择语言"}
          >
            {SUPPORTED_LOCALES.map((code) => (
              <option key={code} value={code}>
                {LOCALE_NAMES[code]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
    <main id="top">
      <a className="official-support" href={currentReleaseUrl} target="_blank" rel="noreferrer" data-no-translate>
        <span className="page-width">
          <strong><i aria-hidden="true" />{locale === "zh" ? "已支持最新 DSH 官方版本" : (officialSupportBanner[locale] || "已支持最新 DSH 官方版本")}</strong>
          <span>DeepSeek Harness 0.2.2-rc.1</span>
          <b>{locale === "zh" ? "查看 v1.0.93" : (viewVersionText[locale] || "查看 v1.0.93")}<Arrow /></b>
        </span>
      </a>
      <section className="hero page-width" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow"><i />DSH CODEX DESKTOP</p>
          <h1 id="hero-title">Codex UI 以及<br /><em>常用内置插件。</em></h1>
          <p className="lead">DSH Codex Desktop 将 Codex UI、专家预设、技能管理、会话归档、IM Connect、自动化、代码审查和增强侧边栏带到桌面端。</p>
          <div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">下载桌面端<Arrow /></a><a className="button ghost" href="#plugins">查看插件生态</a></div>
          <div className="hero-meta"><span><b>支持系统</b> Windows / macOS / Linux</span><span><b>运行方式</b> 本机服务</span><span><b>更新入口</b> GitHub Releases</span></div>
        </div>
        <figure className="hero-product"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-home.webp", alt: "DSH Codex Desktop 首页" })} aria-label="放大查看 DSH Codex Desktop 首页"><img fetchPriority="high" decoding="async" width="2512" height="1440" src="/assets/screenshots/preview-home.webp" alt="DSH Codex Desktop 首页" /></button><figcaption><span>DSH CODEX DESKTOP</span><span>Codex UI 以及常用内置插件</span></figcaption></figure>
      </section>
      <section className="signal"><div className="page-width"><span>内置本地运行环境</span><i>·</i><span>用户数据保留在本机</span><i>·</i><span>插件可独立更新</span><i>·</i><span>通过 Releases 获取新版本</span></div></section>
      <section className="desktop page-width" id="desktop" aria-labelledby="desktop-title">
        <Kicker number="功能">桌面端包含什么</Kicker><div className="intro"><h2 id="desktop-title">一个应用，管理 Codex UI<br />和常用的 DSH 组件。</h2><p>安装桌面端后，可以在 Codex UI 中处理项目、任务和会话；专家预设、技能、归档、IM Connect、自动化和增强侧边栏作为独立组件随应用提供。</p></div>
        <div className="desktop-grid"><div className="preview"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-conversation.webp", alt: "DSH Codex Desktop 深色会话工作区" })} aria-label="放大查看深色会话工作区"><img loading="lazy" decoding="async" width="1280" height="800" src="/assets/screenshots/preview-conversation.webp" alt="DSH Codex Desktop 深色会话工作区" /></button></div><div className="capabilities"><article><b>01</b><div><h3>Codex UI 是主界面</h3><p>围绕项目、任务与会话组织日常 Agent 工作，而不是单独启动一个底层运行时。</p></div></article><article><b>02</b><div><h3>插件集合开箱即用</h3><p>常用内置插件随首次启动准备完成，按你的工作方式选择并持续扩展。</p></div></article><article><b>03</b><div><h3>桌面端负责交付</h3><p>内置本地运行环境并保留用户数据，让工作台可直接安装、更新和使用。</p></div></article></div></div>
        <div className="screenshot-gallery" aria-label="DSH Codex Desktop 产品截图"><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-experts.webp", alt: "专家预设管理界面" })} aria-label="放大查看专家预设"><img loading="lazy" decoding="async" width="2512" height="1440" src="/assets/screenshots/preview-experts.webp" alt="专家预设管理界面" /></button><figcaption><b>专家预设</b><span>为当前任务选择所需专业角色。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-skills.webp", alt: "技能管理界面" })} aria-label="放大查看技能中心"><img loading="lazy" decoding="async" width="2512" height="1440" src="/assets/screenshots/preview-skills.webp" alt="技能管理界面" /></button><figcaption><b>技能中心</b><span>集中管理 Agent 可用技能。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-archive.webp", alt: "归档会话管理界面" })} aria-label="放大查看归档管理"><img loading="lazy" decoding="async" width="2512" height="1440" src="/assets/screenshots/preview-archive.webp" alt="归档会话管理界面" /></button><figcaption><b>归档管理</b><span>检索、恢复与整理工作历史。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-im-connect.webp", alt: "IM 频道配置界面" })} aria-label="放大查看 IM Connect"><img loading="lazy" decoding="async" width="2512" height="1440" src="/assets/screenshots/preview-im-connect.webp" alt="IM 频道配置界面" /></button><figcaption><b>IM Connect</b><span>连接可用的消息协作频道。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-pets.webp", alt: "桌面宠物设置" })} aria-label="放大查看桌面宠物设置"><img loading="lazy" decoding="async" width="2512" height="1440" src="/assets/screenshots/preview-pets.webp" alt="桌面宠物设置" /></button><figcaption><b>桌面宠物设置</b><span>选择宠物并开启桌面显示。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/screenshots/preview-usage-billing.webp", alt: "用量统计界面" })} aria-label="放大查看用量统计"><img loading="lazy" decoding="async" width="2512" height="1440" src="/assets/screenshots/preview-usage-billing.webp" alt="用量统计界面" /></button><figcaption><b>用量统计</b><span>汇总模型用量、费用与活跃情况。</span></figcaption></figure></div>
        <style>{`.screenshot-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:45px}.screenshot-gallery figure{min-width:0;margin:0;overflow:hidden;border:1px solid rgb(145 190 220 / 22%);border-radius:10px;background:#0b1b2b}.screenshot-gallery .screenshot-wide{grid-column:span 2}.screenshot-gallery img{display:block;width:100%;height:auto;aspect-ratio:1.75;object-fit:contain;object-position:top;transition:transform .25s ease}.screenshot-gallery figure:hover img{transform:scale(1.025)}.screenshot-gallery figcaption{padding:13px 14px 15px}.screenshot-gallery figcaption b,.screenshot-gallery figcaption span{display:block}.screenshot-gallery figcaption b{margin-bottom:5px;font-size:13px}.screenshot-gallery figcaption span{color:#8fa9bd;font-size:11px;line-height:1.5}@media(max-width:930px){.screenshot-gallery{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.screenshot-gallery{grid-template-columns:1fr;margin-top:28px}.screenshot-gallery .screenshot-wide{grid-column:auto}}`}</style>
      </section>
      <section className="downloads" id="downloads" aria-labelledby="downloads-title"><div className="page-width"><Kicker number="安装">当前发布版本</Kicker><div className="intro"><h2 id="downloads-title">选择系统和架构。</h2><p>GitHub Releases 保留各平台的最新安装包与历史版本。请选择与设备相符的安装包类型。</p></div><div className="download-grid">{downloads.map(([system, arch, type, label]) => <a className="download-card" key={`${system}-${arch}`} href={releaseUrl} target="_blank" rel="noreferrer"><small>{system}</small><h3>{arch}</h3><p>{type}</p><b>{label}<Arrow /></b></a>)}</div><p className="release-note"><b>注意</b><span>macOS 当前发布包尚未签名与公证，系统可能显示来源提示。完整发布记录与其他资产见 <a href={releaseUrl} target="_blank" rel="noreferrer">GitHub Releases <Arrow /></a>{locale === "zh" ? "。" : "."}</span></p></div></section>
      <section className="plugins page-width" id="plugins" aria-labelledby="plugins-title"><div className="intro plugin-intro"><div><Kicker number="组件">插件生态</Kicker><h2 id="plugins-title">按需选择插件，<br />覆盖常见工作环节。</h2></div><p>已有 DeepSeek Harness 环境，可按各项目 README 安装插件。桌面端实际随附范围以对应版本的发行说明和内置清单为准。</p></div><div className="plugin-groups"><div className="plugin-group"><div className="plugin-group-heading"><h3>自制插件</h3><p>由 MichengAI 维护，随 Desktop 同步演进。</p></div><div className="plugin-grid"><PluginCards plugins={firstPartyPlugins} locale={locale} /></div></div><div className="plugin-group"><div className="plugin-group-heading"><h3>社区插件</h3><p>由社区维护，作为桌面端的集成生态组件随包提供。</p></div><div className="plugin-grid"><PluginCards plugins={communityPlugins} locale={locale} /></div></div></div><div className="plugin-market-row"><a className="plugin plugin-market" href="https://dshmarket.com" target="_blank" rel="noreferrer"><div><small data-no-translate>{locale === "zh" ? "插件市场" : (pluginLabelLocales[locale]?.["插件市场"] || pluginLabelTranslations["插件市场"])}</small><Arrow /></div><h3>dshmarket</h3><p>随桌面端提供，用于发现、安装、更新、启用和诊断其他 DSH 插件。</p><code>dshmarket</code></a></div></section>
      <section className="changelog page-width" id="changelog" aria-labelledby="changelog-title">
        <div className="intro changelog-intro"><div><Kicker number="版本">最近 5 个版本</Kicker><h2 id="changelog-title">跟进桌面端的每一次更新。</h2></div><p>以下内容整理自 GitHub Releases，按版本号从新到旧排列。</p></div>
        <ol className="release-list" data-no-translate>
          {recentDesktopReleases.map((release, index) => <li className={index === 0 ? "is-latest" : ""} key={release.version}>
            <div className="release-stamp"><span>{releaseBadge[locale]?.[index === 0 ? "latest" : "desktop"] || (locale === "zh" ? (index === 0 ? "最新版本" : "桌面端") : (index === 0 ? "LATEST" : "DESKTOP"))}</span><strong>{release.version}</strong><time dateTime={release.date}>{release.date}</time></div>
            <div className="release-copy"><ul>{(release[locale] || release.en || release.zh).map((item) => <li key={item}>{item}</li>)}</ul><a href={release.url} target="_blank" rel="noreferrer">{viewFullReleaseNotesText[locale] || (locale === "zh" ? "查看完整发布说明" : "View full release notes")}<Arrow /></a></div>
          </li>)}
        </ol>
      </section>
      <section className="closing page-width"><div><p className="eyebrow"><i />GET STARTED</p><h2>从 Releases 下载，<br />安装后打开应用。</h2></div><div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">打开最新发布页<Arrow /></a><a className="link" href={desktopRepositoryUrl} target="_blank" rel="noreferrer">查看桌面端仓库 <Arrow /></a></div></section>
    </main>
    <footer className="footer page-width"><p>DSH Codex Desktop 是由 Codex UI 与功能插件集合构成的社区工作台，基于 DeepSeek Harness 运行时与插件能力构建，并非 DeepSeek AI 官方产品。</p><div><a href={desktopRepositoryUrl} target="_blank" rel="noreferrer">桌面端仓库</a><a href={websiteRepositoryUrl} target="_blank" rel="noreferrer">官网源码</a></div></footer>
    {activeScreenshot && <dialog className="screenshot-dialog" open aria-label={activeScreenshot.alt} onClick={() => setActiveScreenshot(null)}><div onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setActiveScreenshot(null)} aria-label="关闭大图">关闭 ×</button><img src={activeScreenshot.src} alt={activeScreenshot.alt} /></div></dialog>}
  </div>;
}
