import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const faviconSource = readFileSync(new URL("../public/favicon.svg", import.meta.url), "utf8");
const releasesSource = readFileSync(new URL("../src/releases.js", import.meta.url), "utf8");

test("highlights official DSH rc.1 support before the hero", () => {
  const supportBanner = appSource.indexOf('className="official-support"');
  const hero = appSource.indexOf('<section className="hero page-width"');

  assert.ok(supportBanner >= 0);
  assert.ok(supportBanner < hero);
  assert.match(appSource, /已支持最新 DSH 官方版本/);
  assert.match(appSource, /DeepSeek Harness 0\.1\.2-rc\.1/);
  assert.match(appSource, /releases\/tag\/v1\.0\.49/);
  assert.match(appSource, /查看 v1\.0\.49/);
  assert.match(indexSource, /已支持 DSH 官方版本 0\.1\.2-rc\.1/);
});

test("lists desktop v1.0.49 as the latest release", () => {
  assert.match(releasesSource, /version: "v1\.0\.49"/);
  assert.match(releasesSource, /releases\/tag\/v1\.0\.49/);
  assert.ok(releasesSource.indexOf('version: "v1.0.49"') < releasesSource.indexOf('version: "v1.0.48"'));
});

test("shows thirteen bundled component cards before the five-release changelog", () => {
  const firstPartyPluginData = appSource.match(/const firstPartyPlugins = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const communityPluginData = appSource.match(/const communityPlugins = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const firstPartyPluginCount = (firstPartyPluginData.match(/^  \["/gm) ?? []).length;
  const communityPluginCount = (communityPluginData.match(/^  \["/gm) ?? []).length;
  const pluginsSection = appSource.indexOf('<section className="plugins page-width"');
  const changelogSection = appSource.indexOf('<section className="changelog page-width"');

  assert.equal(firstPartyPluginCount, 8);
  assert.equal(communityPluginCount, 4);
  assert.ok(pluginsSection >= 0);
  assert.ok(changelogSection > pluginsSection);
  assert.match(appSource, /最近 5 个版本/);
});

test("places dshmarket after the self-made and community plugin groups and ships the requested favicon", () => {
  const marketCard = appSource.indexOf('className="plugin plugin-market"');
  const communityPlugins = appSource.indexOf("const communityPlugins");

  assert.ok(marketCard >= 0);
  assert.ok(marketCard > communityPlugins);
  assert.match(appSource.slice(marketCard), /<h3>dshmarket<\/h3>/);
  assert.doesNotMatch(appSource, /<aside className="market">/);
  assert.match(indexSource, /href="\/favicon\.svg\?v=4"/);
  assert.match(indexSource, /内置 13 个常用组件/);
  assert.ok(existsSync(new URL("../public/favicon.png", import.meta.url)));
  assert.ok(existsSync(new URL("../public/favicon.svg", import.meta.url)));
  assert.match(faviconSource, /viewBox="94 90 325 325"/);
  assert.match(faviconSource, /prefers-color-scheme: dark/);
  assert.doesNotMatch(faviconSource, /<rect\b/);
});

test("separates self-made and community plugins by their maintainers", () => {
  const firstPartyPluginData = appSource.match(/const firstPartyPlugins = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const communityPluginData = appSource.match(/const communityPlugins = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const firstPartyProjectNames = [
    "dsh-codex-ui",
    "dsh-agency-agents",
    "dsh-skills-manager",
    "dsh-archive-manager",
    "dsh-im-connect",
    "dsh-automation",
    "dsh-btw",
    "dsh-simplify",
  ];
  const communityProjectNames = [
    "dsh-context",
    "dsh-better-sidebar",
    "dsh-mcp-connector",
    "dsh-ui-usage-billing",
  ];

  for (const projectName of firstPartyProjectNames) assert.match(firstPartyPluginData, new RegExp(`\\["${projectName}",`));
  for (const projectName of communityProjectNames) assert.match(communityPluginData, new RegExp(`\\["${projectName}",`));
  assert.match(appSource, /<h3>自制插件<\/h3>/);
  assert.match(appSource, /<h3>社区插件<\/h3>/);
});

test("uses descriptive labels instead of numeric plugin card labels", () => {
  const labels = ["主界面", "专家预设", "技能管理", "会话归档", "消息连接", "自动化任务", "上下文管理", "增强侧边栏", "MCP 连接", "用量统计", "只读旁问", "代码简化", "插件市场"];

  for (const label of labels) assert.match(appSource, new RegExp(`>${label}<|"${label}"`));
  assert.doesNotMatch(appSource, /String\(index \+ 1\)\.padStart/);
  assert.match(appSource, /Codex UI 以及<br \/><em>常用内置插件。<\/em>/);
});
