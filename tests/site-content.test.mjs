import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");

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
