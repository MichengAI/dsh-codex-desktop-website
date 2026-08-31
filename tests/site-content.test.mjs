import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const faviconSource = readFileSync(new URL("../public/favicon.svg", import.meta.url), "utf8");
const releasesSource = readFileSync(new URL("../src/releases.js", import.meta.url), "utf8");

test("highlights official DSH alpha.2 support before the hero", () => {
  const supportBanner = appSource.indexOf('className="official-support"');
  const hero = appSource.indexOf('<section className="hero page-width"');

  assert.ok(supportBanner >= 0);
  assert.ok(supportBanner < hero);
  assert.match(appSource, /已支持官方最新版本/);
  assert.match(appSource, /DeepSeek Harness 0\.1\.2-alpha\.2/);
  assert.match(indexSource, /已支持官方最新版 DeepSeek Harness 0\.1\.2-alpha\.2/);
});

test("lists desktop v1.0.40 as the latest release", () => {
  assert.match(releasesSource, /version: "v1\.0\.40"/);
  assert.match(releasesSource, /releases\/tag\/v1\.0\.40/);
  assert.ok(releasesSource.indexOf('version: "v1.0.40"') < releasesSource.indexOf('version: "v1.0.39"'));
});

test("shows nine bundled component cards before the five-release changelog", () => {
  const pluginData = appSource.match(/const plugins = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const pluginCount = (pluginData.match(/^  \["/gm) ?? []).length;
  const pluginsSection = appSource.indexOf('<section className="plugins page-width"');
  const changelogSection = appSource.indexOf('<section className="changelog page-width"');

  assert.equal(pluginCount, 8);
  assert.ok(pluginsSection >= 0);
  assert.ok(changelogSection > pluginsSection);
  assert.match(appSource, /最近 5 个版本/);
});

test("places dshmarket in the ninth grid cell and ships the requested favicon", () => {
  const marketCard = appSource.indexOf('className="plugin plugin-market"');
  const pluginGridEnd = appSource.indexOf("</div></section>", marketCard);

  assert.ok(marketCard >= 0);
  assert.ok(pluginGridEnd > marketCard);
  assert.match(appSource.slice(marketCard, pluginGridEnd), /<h3>dshmarket<\/h3>/);
  assert.doesNotMatch(appSource, /<aside className="market">/);
  assert.match(indexSource, /href="\/favicon\.svg\?v=4"/);
  assert.match(indexSource, /整合常用内置插件/);
  assert.ok(existsSync(new URL("../public/favicon.png", import.meta.url)));
  assert.ok(existsSync(new URL("../public/favicon.svg", import.meta.url)));
  assert.match(faviconSource, /viewBox="94 90 325 325"/);
  assert.match(faviconSource, /prefers-color-scheme: dark/);
  assert.doesNotMatch(faviconSource, /<rect\b/);
});

test("uses exact project names for all plugin card titles", () => {
  const projectNames = [
    "dsh-codex-ui",
    "dsh-agency-agents",
    "dsh-skills-manager",
    "dsh-archive-manager",
    "dsh-im-connect",
    "dsh-automation",
    "dsh-context",
    "dsh-better-sidebar",
  ];

  for (const projectName of projectNames) {
    assert.match(appSource, new RegExp(`\\["${projectName}",`));
  }
});

test("uses descriptive labels instead of numeric plugin card labels", () => {
  const labels = ["主界面", "专家预设", "技能管理", "会话归档", "消息连接", "自动化任务", "上下文管理", "增强侧边栏", "插件市场"];

  for (const label of labels) assert.match(appSource, new RegExp(`>${label}<|"${label}"`));
  assert.doesNotMatch(appSource, /String\(index \+ 1\)\.padStart/);
  assert.match(appSource, /Codex UI 以及<br \/><em>常用内置插件。<\/em>/);
});
