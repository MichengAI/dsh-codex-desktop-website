import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("暗色主题覆盖截图卡片说明区背景", async () => {
  const css = await readFile(new URL("../src/developer-tool.css", import.meta.url), "utf8");

  assert.match(
    css,
    /:root\[data-theme="dark"\] \.screenshot-gallery figcaption(?:\s*,[^{}]*)?\s*\{[^}]*background:\s*#151f30\s*;/s,
  );
});
