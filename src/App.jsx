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
  return <div className="site-shell">
    <header className="header page-width">
      <a className="brand" href="#top"><img src="/assets/brand-mark.png" alt="DSH Codex Desktop" /><span>DSH Codex Desktop</span></a>
      <nav aria-label="页面导航"><a href="#desktop">桌面端</a><a href="#downloads">下载</a><a href="#plugins">插件</a><a href={desktopRepositoryUrl} target="_blank" rel="noreferrer">GitHub <Arrow /></a></nav>
    </header>
    <main id="top">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow"><i />本机 AI 工作台</p>
          <h1 id="hero-title">把 DeepSeek Harness<br /><em>留在你的桌面上。</em></h1>
          <p className="lead">DSH Codex Desktop 将本地运行时、项目会话与插件生态装进一个原生应用。下载、打开、开始工作，不需要先配置 Node.js 或终端。</p>
          <div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">前往下载<Arrow /></a><a className="button ghost" href="#plugins">查看内置插件</a></div>
          <div className="hero-meta"><span><b>本机运行</b> 127.0.0.1</span><span><b>开箱即用</b> 内置运行时</span><span><b>跨平台</b> Win / macOS / Linux</span></div>
        </div>
        <div className="console" aria-label="DSH Codex Desktop 工作区预览">
          <div className="console-bar"><i /><i /><i /><span>DSH / LOCAL WORKSPACE</span></div>
          <div className="console-body"><aside><b>DSH</b><i className="active">▣</i><i>◌</i><i>⌘</i><i>⋯</i></aside><div className="console-work"><p>CURRENT TASK</p><h2>实现产品官网的<br />下载与插件介绍</h2><div className="thread"><b>A</b>正在整理桌面端能力与发布资产。</div><div className="thread muted"><b>✓</b>本地服务已就绪 · 6 个插件已加载</div><div className="prompt">描述接下来要完成的工作…<b>↑</b></div></div></div>
          <div className="console-footer"><span><i /> 本地服务运行中</span><span>DSH DESKTOP</span></div>
        </div>
      </section>
      <section className="signal"><div className="page-width"><span>安装后直接开始</span><i>·</i><span>数据保留在本机</span><i>·</i><span>插件可独立更新</span><i>·</i><span>桌面端手动更新</span></div></section>
      <section className="desktop page-width" id="desktop" aria-labelledby="desktop-title">
        <Kicker number="01">DESKTOP / CORE</Kicker><div className="intro"><h2 id="desktop-title">一个可持续工作的<br />本机工作台。</h2><p>桌面端负责启动本地 DSH、保留用户数据，并让项目、会话、模型与插件回到同一处。它不替换你的工作流，只把启动和管理变得直接。</p></div>
        <div className="desktop-grid"><div className="preview"><img src="/assets/product-preview.png" alt="DSH Codex Desktop 的工作区与代码审查会话预览" /></div><div className="capabilities"><article><b>01</b><div><h3>无需预装环境</h3><p>安装包内置 Node.js 与本地 DSH 运行时，首次启动后即可进入工作区。</p></div></article><article><b>02</b><div><h3>本机数据与服务</h3><p>会话、配置与凭据保留在当前用户的 DSH 目录；桌面壳只加载校验后的本机地址。</p></div></article><article><b>03</b><div><h3>清晰的更新边界</h3><p>从托盘手动检查桌面端更新；插件仍在 DSH 设置和插件市场中管理。</p></div></article></div></div>
      </section>
      <section className="downloads" id="downloads" aria-labelledby="downloads-title"><div className="page-width"><Kicker number="02">INSTALL / LATEST</Kicker><div className="intro"><h2 id="downloads-title">选择你的安装包。</h2><p>Windows、macOS 双架构与 Linux x64 均提供原生安装包。下载页始终展示最新发布版本。</p></div><div className="download-grid">{downloads.map(([system, arch, type, label]) => <a className="download-card" key={`${system}-${arch}`} href={releaseUrl} target="_blank" rel="noreferrer"><small>{system}</small><h3>{arch}</h3><p>{type}</p><b>{label}<Arrow /></b></a>)}</div><p className="release-note"><b>提示</b><span>macOS 当前发布包尚未签名与公证，系统可能显示来源提示。完整发布记录与其他资产见 <a href={releaseUrl} target="_blank" rel="noreferrer">GitHub Releases <Arrow /></a>。</span></p></div></section>
      <section className="plugins page-width" id="plugins" aria-labelledby="plugins-title"><div className="intro plugin-intro"><div><Kicker number="03">PLUGINS / BUNDLED</Kicker><h2 id="plugins-title">六个功能插件，<br />一次随桌面端到位。</h2></div><p>首次启动会为 Web profile 准备这些独立插件。它们可以各自更新，不会覆盖桌面端运行时。</p></div><div className="plugin-grid">{plugins.map(([name, packageName, description, href], index) => <a className="plugin" key={packageName} href={href} target="_blank" rel="noreferrer"><div><small>{String(index + 1).padStart(2, "0")}</small><Arrow /></div><h3>{name}</h3><p>{description}</p><code>{packageName}</code></a>)}</div><aside className="market"><div><p className="eyebrow"><i />插件市场</p><h3>需要更多能力时，打开 dshmarket。</h3></div><p><code>dshmarket</code> 随桌面端提供，用于发现、安装、更新、启用和诊断更多 DSH 插件。</p></aside></section>
      <section className="closing page-width"><div><p className="eyebrow"><i />READY WHEN YOU ARE</p><h2>下载，打开，<br />继续你的工作。</h2></div><div className="actions"><a className="button primary" href={releaseUrl} target="_blank" rel="noreferrer">前往最新发布页<Arrow /></a><a className="link" href={releaseUrl} target="_blank" rel="noreferrer">查看所有发布资产 <Arrow /></a></div></section>
    </main>
    <footer className="footer page-width"><p>DSH Codex Desktop 是社区维护的 DeepSeek Harness 桌面发行版，并非 DeepSeek AI 官方产品。</p><div><a href={desktopRepositoryUrl} target="_blank" rel="noreferrer">桌面端仓库</a><a href={websiteRepositoryUrl} target="_blank" rel="noreferrer">官网源码</a></div></footer>
  </div>;
}
