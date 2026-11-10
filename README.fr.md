# Site web de DSH Codex Desktop

[简体中文](README.zh-CN.md) · [English](README.en.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

[Journal des modifications](CHANGELOG.md)

Ce dépôt contient le code source du site web de présentation et de téléchargement de [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop). Le site présente le projet et propose les liens de téléchargement pour Windows, macOS et Linux.

Téléchargez la dernière version depuis la [page des versions de l'application de bureau](https://github.com/MichengAI/dsh-codex-desktop/releases).

La version actuelle pour ordinateur est la **v1.0.93**, intégrant **DSH 0.2.2-rc.1** et **14 composants (y compris le marché de plugins)**. Les nouvelles installations incluent Context. Le plugin de facturation et le connecteur MCP ne sont pas inclus ; les copies déjà installées sont conservées. Sauvegardez vos conversations importantes avant toute mise à niveau.

## Obtenir l'application de bureau

1. Ouvrez la page des versions de l'application et choisissez l'installateur adapté à votre système d'exploitation et architecture de processeur.
2. Installez et lancez DSH Codex Desktop ; aucune installation distincte de Node.js n'est nécessaire.
3. Choisissez un modèle, ouvrez un projet et commencez une tâche dans l'atelier.

Ce dépôt assure la maintenance du site de présentation et de téléchargement. Vous n'avez pas besoin d'exécuter le code du site pour utiliser l'application de bureau.

## Liens utiles

- Dépôt du site web : [dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- Application de bureau : [dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- Versions : [GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- Projet amont : [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## Écosystème des produits DSH

Pour un atelier sur ordinateur, téléchargez [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases). Si vous possédez déjà un environnement [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), vous pouvez ajouter les plugins selon vos besoins en suivant le README de chaque projet. Voici 11 plugins officiels développés en interne ; consultez les notes de version et le catalogue intégré pour vérifier le contenu de chaque version.

| Plugin | Ce que vous pouvez faire |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | Organiser projets et sessions, rechercher des tâches et naviguer dans les échanges |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | Sélectionner et invoquer des experts spécialisés selon la tâche |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | Rechercher, activer, créer et importer des compétences (skills) locales |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | Rechercher, restaurer ou nettoyer les conversations archivées |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | Envoyer des tâches et recevoir des réponses via vos messageries |
| [Automation](https://github.com/MichengAI/dsh-automation) | Planifier des tâches récurrentes et examiner le résultat de chaque exécution |
| [BTW](https://github.com/MichengAI/dsh-btw) | Poser des questions secondaires ponctuelles sans interrompre la tâche principale |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | Utiliser `/simplify` pour nettoyer le code dans le périmètre des modifications Git |
| [PUA](https://github.com/MichengAI/dsh-pua) | Guider l'Agent pour essayer de nouvelles approches et vérifier le travail avant achèvement |
| [Code Review](https://github.com/MichengAI/dsh-code-review) | Utiliser `/review` pour demander une revue de code par un sous-agent autonome et recevoir le rapport |
| [Codex Pet](https://github.com/MichengAI/dsh-codex-pet) | Consulter les notifications de session et approuver des outils via un animal virtuel |

## Développement local

Installez Node.js et npm, puis exécutez les commandes suivantes à la racine du dépôt :

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

Le serveur de développement écoute par défaut sur `http://localhost:5173`.

## Compilation et tests

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

Les fichiers générés sont placés dans `dist\client`.

## Déploiement sur Cloudflare Workers

Le projet utilise `wrangler.jsonc` pour servir `dist\client` comme ressources statiques, et `worker\index.js` prend en charge le repli des routes SPA.

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## Licence

Ce projet est sous licence [Apache License 2.0](LICENSE).

## Arborescence du projet

```text
src\                 Pages et styles React
public\assets\       Ressources graphiques du site
worker\              Point d'entrée Cloudflare Worker
scripts\             Scripts d'aide à la compilation
tests\               Tests du worker et de configuration de build
wrangler.jsonc       Configuration Cloudflare Workers
```
