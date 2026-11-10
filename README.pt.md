# Site Oficial do DSH Codex Desktop

[简体中文](README.zh-CN.md) · [English](README.en.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

[Histórico de atualizações](CHANGELOG.md)

Este repositório contém o código-fonte do site de apresentação e download do [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop). O site apresenta o projeto e disponibiliza links de instalação para Windows, macOS e Linux.

Baixe a versão mais recente na [página de lançamentos do aplicativo desktop](https://github.com/MichengAI/dsh-codex-desktop/releases).

A versão atual de desktop é a **v1.0.93**, integrando **DSH 0.2.2-rc.1** e **14 componentes (incluindo o catálogo de plugins)**. Novas instalações incluem Context. O plugin de cobrança e o conector MCP não são incluídos por padrão; cópias já instaladas serão preservadas. Faça backup das conversas importantes antes de atualizar.

## Obter o aplicativo desktop

1. Abra a página de versões do aplicativo e escolha o instalador correspondente ao seu sistema operacional e arquitetura de CPU.
2. Instale e inicialize o DSH Codex Desktop; não é necessária a instalação avulsa do Node.js.
3. Escolha um modelo, abra um projeto e inicie sua tarefa na bancada de trabalho.

Este repositório é responsável por manter o site de introdução e download. Não é necessário executar o código-fonte do site para usar o aplicativo desktop.

## Links úteis

- Repositório do site: [dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- Aplicativo desktop: [dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- Lançamentos: [GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- Projeto upstream: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## Ecossistema de produtos DSH

Para utilizar a bancada de trabalho no desktop, faça o download do [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases). Ambientes existentes do [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) podem instalar os plugins conforme a necessidade seguindo o README de cada projeto. Abaixo listamos 11 plugins oficiais desenvolvidos internamente; a lista exata de pacotes integrados varia conforme as notas de versão do desktop.

| Plugin | O que você pode fazer |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | Organizar projetos e sessões, pesquisar tarefas e navegar pelo histórico de mensagens |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | Escolher e invocar perfis especializados para cada tarefa |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | Localizar, ativar, desativar, criar e importar Agent Skills locais |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | Pesquisar, restaurar ou limpar conversas arquivadas |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | Enviar tarefas e receber respostas através de plataformas de mensagens |
| [Automation](https://github.com/MichengAI/dsh-automation) | Agendar tarefas recorrentes e auditar os resultados de cada execução |
| [BTW](https://github.com/MichengAI/dsh-btw) | Fazer perguntas paralelas rápidas sem interromper a tarefa principal |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | Usar `/simplify` para melhorar o código no escopo de alterações do Git |
| [PUA](https://github.com/MichengAI/dsh-pua) | Orientar o Agent a tentar outros caminhos após falhas e validar o resultado antes do encerramento |
| [Code Review](https://github.com/MichengAI/dsh-code-review) | Solicitar revisão de código autônoma via `/review` e receber relatórios diretamente na sessão |
| [Codex Pet](https://github.com/MichengAI/dsh-codex-pet) | Ver notificações de sessão e autorizar ferramentas através de um mascote interativo |

## Desenvolvimento local

Instale Node.js e npm, e execute os comandos abaixo na raiz do repositório:

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

O servidor de desenvolvimento responde por padrão em `http://localhost:5173`.

## Compilação e testes

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

O build do cliente é gerado no diretório `dist\client`.

## Implantação no Cloudflare Workers

O arquivo `wrangler.jsonc` publica `dist\client` como recursos estáticos, enquanto o `worker\index.js` fornece o fallback de rotas para Single Page Application.

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## Licença

Este projeto é distribuído sob a licença [Apache License 2.0](LICENSE).

## Estrutura do projeto

```text
src\                 Páginas e estilos React
public\assets\       Recursos de imagem do site
worker\              Ponto de entrada do Cloudflare Worker
scripts\             Scripts auxiliares de compilação
tests\               Testes do worker e configurações de build
wrangler.jsonc       Configuração do Cloudflare Workers
```
