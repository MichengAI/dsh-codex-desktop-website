import { useEffect, useState } from "react";

const desktopRepositoryUrl = "https://github.com/MichengAI/dsh-codex-desktop";
const websiteRepositoryUrl = "https://github.com/MichengAI/dsh-codex-desktop-website";
const releaseUrl = `${desktopRepositoryUrl}/releases/latest`;

const downloads = [
  ["Windows", "x64", ".exe 安装器", "下载 Windows"],
  ["macOS", "Apple Silicon", ".dmg 磁盘映像", "下载 Apple Silicon"],
  ["macOS", "Intel", ".dmg 磁盘映像", "下载 Intel Mac"],
  ["Linux", "x64 · Debian / Ubuntu", ".deb 软件包", "下载 Linux .deb"],
  ["Linux", "x64 · 通用发行版", ".AppImage", "下载 AppImage"],
];

const plugins = [
  ["Codex UI", "@michengai/dsh-codex-ui", "提供项目、任务与会话工作区，把日常 Agent 协作收进一个桌面界面。", "https://github.com/MichengAI/dsh-codex-ui"],
  ["Agency Agents", "@michengai/dsh-agency-agents", "按任务启用代码审查、架构、前端、后端与运维等专家预设。", "https://github.com/MichengAI/dsh-agency-agents"],
  ["Skills Manager", "@michengai/dsh-skills-manager", "查看、启用、停用与管理本地及共享的 Agent 技能。", "https://github.com/MichengAI/dsh-skills-manager"],
  ["Archive Manager", "@michengai/dsh-archive-manager", "检索、恢复或清理已归档会话，让历史上下文持续可用。", "https://github.com/MichengAI/dsh-archive-manager"],
  ["IM Connect", "@michengai/dsh-im-connect", "集中配置钉钉、飞书、Lark、微信、企业微信、QQ 与 Telegram 等可用频道。", "https://github.com/MichengAI/dsh-im-connect"],
  ["Automation", "@michengai/dsh-automation", "用内置定时能力管理周期任务，在同一工作台持续运行。", "https://github.com/MichengAI/dsh-automation"],
];

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }
function Kicker({ number, children }) { return <div className="kicker"><span>{number}</span><p>{children}</p></div>; }

export function App() {
  const [activeScreenshot, setActiveScreenshot] = useState(null);

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
      <nav aria-label="页面导航"><a href="#desktop">桌面端</a><a href="#downloads">下载</a><a href="#plugins">插件</a><a href={desktopRepositoryUrl} target="_blank" rel="noreferrer">GitHub <Arrow /></a></nav>
    </header>
    <main id="top">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow"><i />DSH CODEX DESKTOP</p>
          <h1 id="hero-title">Codex UI 与<br /><em>六个随附插件。</em></h1>
          <p className="lead">DSH Codex Desktop 将 Codex UI、专家预设、技能管理、会话归档、IM Connect 和自动化带到桌面端。</p>
          <div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">下载桌面端<Arrow /></a><a className="button ghost" href="#plugins">查看随附组件</a></div>
          <div className="hero-meta"><span><b>支持系统</b> Windows / macOS / Linux</span><span><b>运行方式</b> 本机服务</span><span><b>更新入口</b> GitHub Releases</span></div>
        </div>
        <figure className="hero-product"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "/assets/product-overview.png", alt: "DSH Codex Desktop 产品总览" })} aria-label="放大查看 DSH Codex Desktop 产品总览"><img src="/assets/product-overview.png" alt="DSH Codex Desktop 产品总览" /></button><figcaption><span>DSH CODEX DESKTOP</span><span>Codex UI 与六个随附插件</span></figcaption></figure>
      </section>
      <section className="signal"><div className="page-width"><span>内置本地运行环境</span><i>·</i><span>用户数据保留在本机</span><i>·</i><span>插件可独立更新</span><i>·</i><span>通过 Releases 获取新版本</span></div></section>
      <section className="desktop page-width" id="desktop" aria-labelledby="desktop-title">
        <Kicker number="功能">桌面端包含什么</Kicker><div className="intro"><h2 id="desktop-title">一个应用，管理 Codex UI<br />和常用的 DSH 组件。</h2><p>安装桌面端后，可以在 Codex UI 中处理项目、任务和会话；专家预设、技能、归档、IM Connect 和自动化作为独立组件随应用提供。</p></div>
        <div className="desktop-grid"><div className="preview"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-conversation-dark.png", alt: "DSH Codex Desktop 深色会话工作区" })} aria-label="放大查看深色会话工作区"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-conversation-dark.png" alt="DSH Codex Desktop 深色会话工作区" /></button></div><div className="capabilities"><article><b>01</b><div><h3>Codex UI 是主界面</h3><p>围绕项目、任务与会话组织日常 Agent 工作，而不是单独启动一个底层运行时。</p></div></article><article><b>02</b><div><h3>插件集合开箱即用</h3><p>六个功能插件随首次启动准备完成，按你的工作方式选择并持续扩展。</p></div></article><article><b>03</b><div><h3>桌面端负责交付</h3><p>内置本地运行环境并保留用户数据，让工作台可直接安装、更新和使用。</p></div></article></div></div>
        <div className="screenshot-gallery" aria-label="DSH Codex Desktop 产品截图"><figure className="screenshot-wide"><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/workspace-session.png", alt: "Codex UI 的项目与会话工作区" })} aria-label="放大查看 Codex UI 工作区"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/workspace-session.png" alt="Codex UI 的项目与会话工作区" /></button><figcaption><b>Codex UI 工作区</b><span>项目、任务与会话在同一视图持续推进。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-experts.png", alt: "专家预设管理界面" })} aria-label="放大查看专家预设"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-experts.png" alt="专家预设管理界面" /></button><figcaption><b>专家预设</b><span>为当前任务选择所需专业角色。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-skills.png", alt: "技能管理界面" })} aria-label="放大查看技能中心"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-skills.png" alt="技能管理界面" /></button><figcaption><b>技能中心</b><span>集中管理 Agent 可用技能。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-archive.png", alt: "归档会话管理界面" })} aria-label="放大查看归档管理"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-archive.png" alt="归档会话管理界面" /></button><figcaption><b>归档管理</b><span>检索、恢复与整理工作历史。</span></figcaption></figure><figure><button className="screenshot-trigger" type="button" onClick={() => setActiveScreenshot({ src: "https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-im-channels.png", alt: "IM 频道配置界面" })} aria-label="放大查看 IM Connect"><img src="https://raw.githubusercontent.com/MichengAI/dsh-codex-desktop/main/assets/screenshots/desktop-im-channels.png" alt="IM 频道配置界面" /></button><figcaption><b>IM Connect</b><span>连接可用的消息协作频道。</span></figcaption></figure></div>
        <style>{`.screenshot-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:45px}.screenshot-gallery figure{min-width:0;margin:0;overflow:hidden;border:1px solid rgb(145 190 220 / 22%);border-radius:10px;background:#0b1b2b}.screenshot-gallery .screenshot-wide{grid-column:span 2}.screenshot-gallery img{display:block;width:100%;aspect-ratio:1.58;object-fit:cover;object-position:top;transition:transform .25s ease}.screenshot-gallery figure:hover img{transform:scale(1.025)}.screenshot-gallery figcaption{padding:13px 14px 15px}.screenshot-gallery figcaption b,.screenshot-gallery figcaption span{display:block}.screenshot-gallery figcaption b{margin-bottom:5px;font-size:13px}.screenshot-gallery figcaption span{color:#8fa9bd;font-size:11px;line-height:1.5}@media(max-width:930px){.screenshot-gallery{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.screenshot-gallery{grid-template-columns:1fr;margin-top:28px}.screenshot-gallery .screenshot-wide{grid-column:auto}}`}</style>
      </section>
      <section className="downloads" id="downloads" aria-labelledby="downloads-title"><div className="page-width"><Kicker number="安装">当前发布版本</Kicker><div className="intro"><h2 id="downloads-title">选择系统和架构。</h2><p>GitHub Releases 保留各平台的最新安装包与历史版本。请选择与设备相符的安装包类型。</p></div><div className="download-grid">{downloads.map(([system, arch, type, label]) => <a className="download-card" key={`${system}-${arch}`} href={releaseUrl} target="_blank" rel="noreferrer"><small>{system}</small><h3>{arch}</h3><p>{type}</p><b>{label}<Arrow /></b></a>)}</div><p className="release-note"><b>注意</b><span>macOS 当前发布包尚未签名与公证，系统可能显示来源提示。完整发布记录与其他资产见 <a href={releaseUrl} target="_blank" rel="noreferrer">GitHub Releases <Arrow /></a>。</span></p></div></section>
      <section className="plugins page-width" id="plugins" aria-labelledby="plugins-title"><div className="intro plugin-intro"><div><Kicker number="组件">随附插件</Kicker><h2 id="plugins-title">六个独立插件，<br />覆盖常见工作环节。</h2></div><p>这些组件会在首次启动时准备到 DSH profile 中。每个插件都有自己的仓库、版本和更新路径；桌面端运行时不会被插件更新覆盖。</p></div><div className="plugin-grid">{plugins.map(([name, packageName, description, href], index) => <a className="plugin" key={packageName} href={href} target="_blank" rel="noreferrer"><div><small>{String(index + 1).padStart(2, "0")}</small><Arrow /></div><h3>{name}</h3><p>{description}</p><code>{packageName}</code></a>)}</div><aside className="market"><div><p className="eyebrow"><i />插件市场</p><h3>从 dshmarket 管理更多插件。</h3></div><p><code>dshmarket</code> 随桌面端提供，用于发现、安装、更新、启用和诊断其他 DSH 插件。</p></aside></section>
      <section className="closing page-width"><div><p className="eyebrow"><i />GET STARTED</p><h2>从 Releases 下载，<br />安装后打开应用。</h2></div><div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">打开最新发布页<Arrow /></a><a className="link" href={desktopRepositoryUrl} target="_blank" rel="noreferrer">查看桌面端仓库 <Arrow /></a></div></section>
    </main>
    <footer className="footer page-width"><p>DSH Codex Desktop 是由 Codex UI 与功能插件集合构成的社区工作台，基于 DeepSeek Harness 运行时与插件能力构建，并非 DeepSeek AI 官方产品。</p><div><a href={desktopRepositoryUrl} target="_blank" rel="noreferrer">桌面端仓库</a><a href={websiteRepositoryUrl} target="_blank" rel="noreferrer">官网源码</a></div></footer>
    {activeScreenshot && <dialog className="screenshot-dialog" open aria-label={activeScreenshot.alt} onClick={() => setActiveScreenshot(null)}><div onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setActiveScreenshot(null)} aria-label="关闭大图">关闭 ×</button><img src={activeScreenshot.src} alt={activeScreenshot.alt} /></div></dialog>}
  </div>;
}
