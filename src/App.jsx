const repositoryUrl = "https://github.com/MichengAI/deepseek-harness-desktop";
const releasesUrl = `${repositoryUrl}/releases`;
const issuesUrl = `${repositoryUrl}/issues`;
const upstreamUrl = "https://github.com/deepseek-ai/deepseek-harness";

const downloads = [
  {
    platform: "Windows x64",
    requirement: "Windows 10 或 Windows 11（64 位）",
    href: `${releasesUrl}/download/v0.1.3/DeepSeek.Harness.Desktop-0.1.3-win-x64.exe`,
    label: "下载 Windows x64",
  },
  {
    platform: "macOS Apple Silicon",
    requirement: "适用于搭载 Apple 芯片的 Mac",
    href: `${releasesUrl}/download/v0.1.3/DeepSeek.Harness.Desktop-0.1.3-mac-arm64.dmg`,
    label: "下载 macOS Apple Silicon",
  },
  {
    platform: "macOS Intel",
    requirement: "适用于搭载 Intel 芯片的 Mac",
    href: `${releasesUrl}/download/v0.1.3/DeepSeek.Harness.Desktop-0.1.3-mac-x64.dmg`,
    label: "下载 macOS Intel",
  },
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
          <a href="#features">能力</a>
          <a href="#downloads">平台</a>
          <a href="#security">安全</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">社区维护的 DeepSeek Harness 桌面启动器</p>
            <h1 id="hero-title">无需命令行，<br />Harness 直接开。</h1>
            <p className="hero-summary">
              为 Windows 与 macOS 提供原生桌面入口。打开应用，即可进入完整的
              DeepSeek Harness Agent 工作流。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={downloads[0].href}>获取 v0.1.3</a>
              <a className="button button-secondary" href={repositoryUrl} target="_blank" rel="noreferrer">查看源码</a>
            </div>
            <p className="release-note">当前版本：v0.1.3 · 支持 Windows 与 macOS</p>
          </div>
          <aside className="hero-notes" aria-label="产品关键说明">
            <p>本地启动</p>
            <p>内置 Node.js</p>
            <p>保留 Agent 工作流</p>
            <p>无需管理端口</p>
          </aside>
        </section>

        <section className="product-frame page-width" aria-label="DeepSeek Harness Desktop 工作区界面">
          <img src="/assets/workspace-session.png" alt="DeepSeek Harness Desktop 的工作区与代码审查会话" />
          <div className="product-notes">
            <p><strong>本地端口</strong><span>仅加载经校验的 127.0.0.1 地址。</span></p>
            <p><strong>内置运行时</strong><span>终端用户无需单独安装 Node.js。</span></p>
            <p><strong>会话与设置延续</strong><span>工作区、会话、模型和插件保持连贯。</span></p>
          </div>
        </section>

        <section className="features page-width" id="features" aria-labelledby="features-title">
          <h2 id="features-title" className="visually-hidden">核心能力</h2>
          <article><span>01</span><h3>打开即用</h3><p>双击启动，无需配置环境。内置 Node.js 与常用运行条件。</p></article>
          <article><span>02</span><h3>本地优先</h3><p>默认在本机 127.0.0.1 运行，让数据与界限清晰可控。</p></article>
          <article><span>03</span><h3>完整工作流</h3><p>延续 Harness 的工作区、会话、模型与插件能力。</p></article>
          <article><span>04</span><h3>跨平台原生</h3><p>覆盖 Windows x64 与两种 macOS 架构，按设备直接下载。</p></article>
        </section>

        <section className="downloads page-width" id="downloads" aria-labelledby="downloads-title">
          <div className="section-heading">
            <p className="eyebrow">发布版本</p>
            <h2 id="downloads-title">下载 DeepSeek Harness Desktop</h2>
            <p>选择与设备匹配的版本，下载后即可启动本地 Agent 工作区。</p>
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
          <a className="all-releases" href={releasesUrl} target="_blank" rel="noreferrer">查看全部版本与更新说明</a>
        </section>

        <section className="security page-width" id="security" aria-labelledby="security-title">
          <div>
            <p className="eyebrow">安全设计</p>
            <h2 id="security-title">本地优先，安全由设计保障。</h2>
            <p>让工作流更高效，也让数据与边界更可控。</p>
          </div>
          <dl>
            <div><dt>本地优先</dt><dd>DSH 配置、会话和凭据保存在用户本地目录。</dd></div>
            <div><dt>外链交给系统浏览器</dt><dd>外部 HTTP(S) 链接由系统浏览器处理。</dd></div>
            <div><dt>Electron 沙箱</dt><dd>禁用 Node.js 集成，启用上下文隔离与沙箱。</dd></div>
            <div><dt>受控本地地址</dt><dd>应用只接受经校验的本机 HTTP 地址。</dd></div>
          </dl>
        </section>
      </main>

      <footer className="site-footer page-width">
        <p>社区维护，非 DeepSeek AI 官方产品。</p>
        <div>
          <a href={releasesUrl} target="_blank" rel="noreferrer">GitHub Releases</a>
          <a href={issuesUrl} target="_blank" rel="noreferrer">Issues</a>
          <a href={upstreamUrl} target="_blank" rel="noreferrer">上游 DeepSeek Harness</a>
        </div>
      </footer>
    </div>
  );
}
