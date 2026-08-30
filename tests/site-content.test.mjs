import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("shows eight plugin cards before the five-release changelog", () => {
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
  assert.match(indexSource, /href="\/favicon\.png"/);
  assert.match(indexSource, /整合八个功能插件/);
  assert.ok(existsSync(new URL("../public/favicon.png", import.meta.url)));
});
