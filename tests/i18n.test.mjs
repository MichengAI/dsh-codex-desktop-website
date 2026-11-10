import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  SUPPORTED_LOCALES,
  LOCALE_NAMES,
  HTML_LANG_MAP,
  titles,
  officialSupportBanner,
  viewVersionText,
  releaseBadge,
  viewFullReleaseNotesText,
  siteControlAria,
  selectLanguageAria,
  themeAria,
  pluginLabelLocales,
  translations,
} from "../src/locales.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const appSource = readFileSync(join(rootDir, "src/App.jsx"), "utf8");

const OFFICIAL_LANGUAGES = ["zh", "en", "ja", "es", "fr", "de", "ru", "pt"];

test("SUPPORTED_LOCALES 严格覆盖 DSH 官方全部 8 门语言", () => {
  assert.equal(SUPPORTED_LOCALES.length, 8);
  assert.deepEqual([...SUPPORTED_LOCALES].sort(), [...OFFICIAL_LANGUAGES].sort());
});

test("每一门语言都具有完整的元数据配置与标题映射", () => {
  for (const lang of OFFICIAL_LANGUAGES) {
    assert.ok(LOCALE_NAMES[lang], `缺少语言名称: ${lang}`);
    assert.ok(HTML_LANG_MAP[lang], `缺少 HTML lang 映射: ${lang}`);
    assert.ok(titles[lang], `缺少 document.title: ${lang}`);
    assert.ok(officialSupportBanner[lang], `缺少官方支持横幅文案: ${lang}`);
    assert.ok(viewVersionText[lang], `缺少版本链接文案: ${lang}`);
    assert.ok(releaseBadge[lang]?.latest, `缺少最新版本标记: ${lang}`);
    assert.ok(releaseBadge[lang]?.desktop, `缺少桌面端标记: ${lang}`);
    assert.ok(viewFullReleaseNotesText[lang], `缺少查看完整发布说明文案: ${lang}`);
    assert.ok(siteControlAria[lang], `缺少站点控制区域 aria 文案: ${lang}`);
    assert.ok(selectLanguageAria[lang], `缺少选择语言 aria 文案: ${lang}`);
    assert.ok(themeAria[lang]?.light, `缺少浅色主题 aria 文案: ${lang}`);
    assert.ok(themeAria[lang]?.dark, `缺少深色主题 aria 文案: ${lang}`);
  }
});

test("7 门非中文语言字典均具备全面且非空的翻译词条", () => {
  const targetLangs = OFFICIAL_LANGUAGES.filter((code) => code !== "zh");

  for (const lang of targetLangs) {
    const dict = translations[lang];
    assert.ok(dict, `缺少语言字典: ${lang}`);
    const keys = Object.keys(dict);
    assert.ok(keys.length >= 110, `${lang} 字典词条数不足: ${keys.length}`);

    // 确保没有空白翻译
    for (const [key, value] of Object.entries(dict)) {
      assert.equal(typeof value, "string");
      assert.ok(value.trim().length > 0, `${lang} 字典中的 [${key}] 翻译为空`);
    }

    // 验证核心组件标签
    const labelDict = pluginLabelLocales[lang];
    assert.ok(labelDict, `缺少插件标签字典: ${lang}`);
    assert.ok(labelDict["主界面"]);
    assert.ok(labelDict["桌面宠物"]);
    assert.ok(labelDict["插件市场"]);
  }
});

test("全套 9 份 README 文件均存在且包含统一的 8 语言导航无死链", () => {
  const readmes = [
    "README.md",
    "README.zh-CN.md",
    "README.en.md",
    "README.ja.md",
    "README.es.md",
    "README.fr.md",
    "README.de.md",
    "README.ru.md",
    "README.pt.md",
  ];

  for (const name of readmes) {
    const filePath = join(rootDir, name);
    assert.ok(existsSync(filePath), `README 文件不存在: ${name}`);
    const content = readFileSync(filePath, "utf8");

    // 确保包含所有语言的互链
    for (const targetLang of ["README.zh-CN.md", "README.en.md", "README.ja.md", "README.es.md", "README.fr.md", "README.de.md", "README.ru.md", "README.pt.md"]) {
      assert.ok(
        content.includes(`(${targetLang})`),
        `${name} 缺少指向 ${targetLang} 的导航链接`,
      );
    }
  }
});

test("App.jsx 包含原生多语言选择控件与 8 门语言选项", () => {
  assert.match(appSource, /<select/);
  assert.match(appSource, /SUPPORTED_LOCALES\.map/);
  assert.match(appSource, /LOCALE_NAMES\[code\]/);
  assert.match(appSource, /translatePage\(locale\)/);
  assert.match(appSource, /titles\[locale\]/);
});
