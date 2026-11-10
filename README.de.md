# DSH Codex Desktop Website

[简体中文](README.zh-CN.md) · [English](README.en.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

[Änderungsprotokoll](CHANGELOG.md)

Dieses Repository enthält den Quellcode der Vorstellungs- und Download-Website für [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop). Die Website stellt das Projekt vor und bietet Download-Links für Windows, macOS und Linux.

Laden Sie die neueste Version über die [Releases-Seite der Desktop-App](https://github.com/MichengAI/dsh-codex-desktop/releases) herunter.

Die aktuelle Desktop-Version ist **v1.0.92**, die **DSH 0.2.2-alpha.2** und **14 Komponenten (einschließlich des Plugin-Marktes)** bündelt. Neuinstallationen enthalten Context. Das Abrechnungs-Plugin und der MCP-Connector sind nicht beigelegt; bereits installierte Exemplare bleiben erhalten. Sichern Sie wichtige Sitzungen vor dem Upgrade.

## Desktop-App herunterladen

1. Öffnen Sie die Desktop-Releases-Seite und wählen Sie das Installationsprogramm passend zu Ihrem Betriebssystem und Ihrer CPU-Architektur aus.
2. Installieren und starten Sie DSH Codex Desktop; eine separate Node.js-Installation ist nicht erforderlich.
3. Wählen Sie ein Modell aus, öffnen Sie ein Projekt und starten Sie eine Aufgabe in der Workbench.

Dieses Repository dient der Pflege der Informations- und Download-Website. Um die Desktop-App zu nutzen, müssen Sie den Quellcode der Website nicht ausführen.

## Weiterführende Links

- Website-Repository: [dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- Desktop-App: [dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- Releases: [GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- Upstream: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## DSH Produkt-Ökosystem

Für eine integrierte Desktop-Workbench laden Sie [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases) herunter. Bestehende [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)-Installationen können Plugins nach Bedarf gemäß der jeweiligen README ergänzen. Nachfolgend sind 11 hauseigene Plugins aufgeführt; der tatsächliche Lieferumfang richtet sich nach den Versionshinweisen und dem integrierten Katalog der jeweiligen Desktop-Version.

| Plugin | Einsatzzweck |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | Projekte und Dialoge organisieren, Aufgaben suchen und Chat-Runden durchblättern |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | Fachexperten für die jeweilige Aufgabe auswählen und hinzuziehen |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | Lokale Agent Skills einheitlich durchsuchen, aktivieren, erstellen und importieren |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | Archivierte Sitzungen durchsuchen, wiederherstellen oder bereinigen |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | Aufgaben über Messaging-Plattformen senden und Antworten empfangen |
| [Automation](https://github.com/MichengAI/dsh-automation) | Zeitgesteuerte Aufgaben planen und die Ergebnisse jedes Durchlaufs prüfen |
| [BTW](https://github.com/MichengAI/dsh-btw) | Einmalige Lese-Nebenfragen stellen, ohne die Hauptaufgabe zu unterbrechen |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | Mit `/simplify` Code innerhalb des Git-Änderungsbereichs optimieren |
| [PUA](https://github.com/MichengAI/dsh-pua) | Agenten bei Fehlern anleiten, neue Wege zu versuchen und Ergebnisse zu validieren |
| [Code Review](https://github.com/MichengAI/dsh-code-review) | Mit `/review` unabhängige Code-Reviews anfordern und Berichte in der Sitzung erhalten |
| [Codex Pet](https://github.com/MichengAI/dsh-codex-pet) | Benachrichtigungen und Freigaben interaktiv über einen Desktop-Begleiter abwickeln |

## Lokale Entwicklung

Installieren Sie Node.js und npm und führen Sie anschließend im Projektstamm folgende Befehle aus:

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

Der Entwicklungsserver ist standardmäßig unter `http://localhost:5173` erreichbar.

## Build und Tests

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

Das Client-Build wird in `dist\client` ausgegeben.

## Bereitstellung mit Cloudflare Workers

Das Projekt verwendet `wrangler.jsonc`, um `dist\client` als statisches Asset-Verzeichnis bereitzustellen, während `worker\index.js` das Fallback für SPA-Routen übernimmt.

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## Lizenz

Dieses Projekt ist unter der [Apache License 2.0](LICENSE) lizenziert.

## Projektstruktur

```text
src\                 React-Seiten und Stylesheets
public\assets\       Bildressourcen der Website
worker\              Einstiegspunkt für Cloudflare Worker
scripts\             Build-Hilfsskripte
tests\               Worker- und Build-Konfigurationstests
wrangler.jsonc       Cloudflare Workers-Konfiguration
```
