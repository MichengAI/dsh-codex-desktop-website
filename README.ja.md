# DSH Codex Desktop 公式サイト

[简体中文](README.zh-CN.md) · [English](README.en.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

[更新履歴](CHANGELOG.zh-CN.md)

本リポジトリは、[DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop) の紹介およびダウンロード公式サイトのソースコードです。Windows、macOS、Linux 向けの各種インストーラーを提供しています。

最新版は [デスクトップアプリの Releases ページ](https://github.com/MichengAI/dsh-codex-desktop/releases) からダウンロードしてください。

現在のデスクトップ版は **v1.0.93** であり、**DSH 0.2.2-rc.1** と **14 個のコンポーネント（プラグインマーケットを含む）** を内蔵しています。新規インストールには Context が同梱されます。利用統計および MCP コネクタは付属しませんが、インストール済みのものは維持されます。アップグレード前に重要なセッションのバックアップをお勧めします。

## デスクトップアプリの入手

1. デスクトップ版の Releases ページを開き、お使いの OS および CPU アーキテクチャに対応するインストーラーを選択します。
2. DSH Codex Desktop をインストールして起動します（Node.js の別途インストールは不要です）。
3. ワークベンチ内でモデルを選択し、プロジェクトを開いてタスクを開始します。

本リポジトリは紹介・ダウンロード用のウェブサイトを保守するものです。デスクトップアプリの利用に本リポジトリのコードを実行する必要はありません。

## 関連リンク

- 公式サイトリポジトリ: [dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- デスクトップアプリ: [dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- リリース一覧: [GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- アップストリーム: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## DSH プロダクトエコシステム

デスクトップワークベンチを利用したい場合は [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases) をダウンロードしてください。すでに [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 環境をお持ちの場合は、各プロジェクトの README に沿ってプラグインを導入できます。以下に 11 個の公式自社製プラグインを紹介します。実際の同梱状況は各バージョンのリリースノートとカタログをご確認ください。

| プラグイン | 主な機能 |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | プロジェクトと会話の整理、タスク検索、対話ターンの移動 |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | タスクに応じて専門ロールを選択・召喚 |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | ローカルスキルの検索、有効化・無効化、作成およびインポート |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | アーカイブ済みセッションの検索、復元、整理 |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | 各種メッセージングプラットフォームからタスクを送信・応答受信 |
| [Automation](https://github.com/MichengAI/dsh-automation) | 定期タスクのスケジュール管理と実行結果の確認 |
| [BTW](https://github.com/MichengAI/dsh-btw) | メインタスクを中断せずに現在のコンテキストでサイドクエリを実行 |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | `/simplify` で Git 変更範囲内のコードを整理・可読性向上 |
| [PUA](https://github.com/MichengAI/dsh-pua) | 失敗時に別のアプローチを試し、完了前に結果を検証するよう Agent を誘導 |
| [Code Review](https://github.com/MichengAI/dsh-code-review) | `/review` で独立した Agent によるコードレビューを実行し会話内でレポート受信 |
| [Codex Pet](https://github.com/MichengAI/dsh-codex-pet) | デスクトップペットを通じて会話通知を確認し、ツール承認や質問に対応 |

## ローカル開発

Node.js と npm をインストール後、リポジトリルートで以下のコマンドを実行します：

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

開発サーバーはデフォルトで `http://localhost:5173` で起動します。

## ビルドとテスト

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

ビルド成果物は `dist\client` に出力されます。

## Cloudflare Workers デプロイ

本プロジェクトは `wrangler.jsonc` で `dist\client` を静的アセットディレクトリとして指定し、`worker\index.js` で SPA ルーティングのフォールバックを処理します。

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## ライセンス

本プロジェクトは [Apache License 2.0](LICENSE) のもとで公開されています。

## ディレクトリ構成

```text
src\                 React ページとスタイル
public\assets\       ウェブサイト画像アセット
worker\              Cloudflare Worker エントリ
scripts\             ビルド支援スクリプト
tests\               Worker およびビルド設定テスト
wrangler.jsonc       Cloudflare Workers 設定
```
