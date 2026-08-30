import assert from "node:assert/strict";
import test from "node:test";

import { recentDesktopReleases } from "../src/releases.js";

test("publishes exactly the latest ten desktop releases", () => {
  assert.equal(recentDesktopReleases.length, 10);
  assert.equal(recentDesktopReleases[0].version, "v1.0.39");
  assert.equal(recentDesktopReleases.at(-1).version, "v1.0.30");
});

test("keeps release entries bilingual, ordered, and linked to their tags", () => {
  for (const [index, release] of recentDesktopReleases.entries()) {
    assert.match(release.version, /^v1\.0\.\d+$/);
    assert.match(release.date, /^2026-\d{2}-\d{2}$/);
    assert.ok(release.zh.length > 0);
    assert.ok(release.en.length > 0);
    assert.equal(release.url, `https://github.com/MichengAI/dsh-codex-desktop/releases/tag/${release.version}`);

    if (index > 0) {
      const previous = Number(recentDesktopReleases[index - 1].version.split(".").at(-1));
      const current = Number(release.version.split(".").at(-1));
      assert.equal(previous - current, 1);
    }
  }
});
