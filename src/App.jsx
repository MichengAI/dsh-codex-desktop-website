const repositoryUrl = "https://github.com/MichengAI/deepseek-harness-desktop";
const releasesUrl = `${repositoryUrl}/releases`;
const issuesUrl = `${repositoryUrl}/issues`;
const upstreamUrl = "https://github.com/deepseek-ai/deepseek-harness";

const downloads = [
  {
    platform: "Windows x64",
    requirement: "Windows 10 及以上（64 位）",
    href: `${releasesUrl}/download/v0.1.3/DeepSeek.Harness.Desktop-0.1.3-win-x64.exe`,
    label: "下载 Windows x64",
  },
  {
    platform: "macOS Apple Silicon",
    requirement: "适用于 Apple 芯片 Mac",
    href: `${releasesUrl}/download/v0.1.3/DeepSeek.Harness.Desktop-0.1.3-mac-arm64.dmg`,
    label: "下载 macOS Apple Silicon",
  },
  {
    platform: "macOS Intel",
    requirement: "适用于 Intel 芯片 Mac",
    href: `${releasesUrl}/download/v0.1.3/DeepSeek.Harness.Desktop-0.1.3-mac-x64.dmg`,
    label: "下载 macOS Intel",
  },
];

const resourceLinks = [
  { label: "GitHub Releases", description: "查看所有版本与发布说明", href: releasesUrl },
  { label: "Issues", description: "反馈问题或提出建议", href: issuesUrl },
  { label: "上游 DeepSeek Harness", description: "了解更多项目详情", href: upstreamUrl },
];

export function App() {
  return (
    <div className="site-shell">
      <header className="site-header page-width">
        <a className="brand" href="#top" aria-label="返回页面顶部">
          <img src="/assets/brand-mark.png" alt="DeepSeek Harness Desktop" />
          <span>DeepSeek Harness Desktop</span>
        </a>
        <nav aria-label="页面导航">
          <a href="#features">功能</a>
          <a href="#downloads">平台</a>
          <a href="#security">安全</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">无需命令行，<br />Harness 直接开。</h1>
            <p className="hero-summary">
              DeepSeek Harness Desktop 是社区维护的 Windows 与 macOS 原生桌面启动器。
              无需命令行，直接打开完整的 DeepSeek Harness Agent 工作流。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={downloads[0].href}>获取 v0.1.3</a>
              <a className="button button-secondary" href={repositoryUrl} target="_blank" rel="noreferrer">查看源码</a>
            </div>
            <div className="release-note"><span>当前版本：v0.1.3</span><span>最后更新：2024-06-01</span></div>
          </div>
          <aside className="hero-notes" aria-label="产品关键说明">
            <p>DeepSeek Harness Desktop</p>
            <p>社区维护的桌面入口</p>
            <p>原生支持 Windows 与 macOS</p>
            <p>本地优先</p>
            <p>打开完整 Agent 工作流</p>
            <p>无需命令行</p>
          </aside>
        </section>

        <section className="product-frame page-width" aria-label="DeepSeek Harness Desktop 工作区界面">
          <div className="preview-window">
            <img src="/assets/product-preview.png" alt="DeepSeek Harness Desktop 的工作区与代码审查会话预览" />
          </div>
          <div className="product-notes">
            <p><strong>本地端口</strong><span>所需服务默认在本机 127.0.0.1 启动。</span></p>
            <p><strong>内置运行时</strong><span>内置 Node.js 运行时，自动配置依赖。</span></p>
            <p id="security"><strong>会话与设置延续</strong><span>工作区、会话、模型与插件保持连贯。</span></p>
          </div>
        </section>

        <section className="features page-width" id="features" aria-labelledby="features-title">
          <h2 id="features-title" className="visually-hidden">核心能力</h2>
          <article><span>01</span><h3>打开即用</h3><p>双击启动，无需配置环境。内置 Node.js 与常用运行条件。</p></article>
          <article><span>02</span><h3>本地优先</h3><p>默认本地 127.0.0.1 运行，边界清晰可控。</p></article>
          <article><span>03</span><h3>完整工作流</h3><p>延续 Harness 的工作区、会话、模型与插件能力。</p></article>
          <article><span>04</span><h3>跨平台原生</h3><p>支持 Windows 与 macOS 原生体验，自动更新与无缝升级。</p></article>
        </section>

        <section className="downloads page-width" id="downloads" aria-labelledby="downloads-title">
          <div className="section-heading">
            <h2 id="downloads-title">下载 DeepSeek Harness Desktop v0.1.3</h2>
          </div>
          <div className="download-table-wrap">
            <table>
              <thead><tr><th>平台</th><th>系统要求</th><th>下载</th></tr></thead>
              <tbody>
                {downloads.map((download) => (
                  <tr key={download.platform}>
                    <td>{download.platform}</td>
                    <td>{download.requirement}</td>
                    <td><a className="table-link" href={download.href}>{download.label}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="download-help">首次启动将自动下载并安装必要的运行时与依赖组件。</p>
          <div className="resource-links" aria-label="项目资源">
            {resourceLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <strong>{link.label}</strong><span>{link.description}</span><b aria-hidden="true">›</b>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <p>社区维护，非 DeepSeek AI 官方产品。</p>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
      </footer>
    </div>
  );
}
