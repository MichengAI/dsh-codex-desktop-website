# Sitio web de DSH Codex Desktop

[简体中文](README.zh-CN.md) · [English](README.en.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

[Registro de cambios](CHANGELOG.md)

Este repositorio contiene el código fuente del sitio web de presentación y descarga de [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop). El sitio presenta el proyecto y ofrece enlaces a los instaladores para Windows, macOS y Linux.

Descargue la versión más reciente desde la [página de lanzamientos de la app de escritorio](https://github.com/MichengAI/dsh-codex-desktop/releases).

La versión actual de escritorio es **v1.0.92**, que incluye **DSH 0.2.2-alpha.2** y **14 componentes (incluido el mercado de complementos)**. Las nuevas instalaciones incluyen Context. El complemento de facturación y el conector MCP no están incluidos; las copias ya instaladas se conservarán. Realice una copia de seguridad de las conversaciones importantes antes de actualizar.

## Obtener la aplicación de escritorio

1. Abra la página de lanzamientos de escritorio y elija el instalador adecuado para su sistema operativo y arquitectura de CPU.
2. Instale e inicie DSH Codex Desktop; no se requiere una instalación independiente de Node.js.
3. Elija un modelo, abra un proyecto y comience una tarea en el banco de trabajo.

Este repositorio mantiene el sitio web de introducción y descarga. No necesita ejecutar el código fuente del sitio web para utilizar la aplicación de escritorio.

## Enlaces

- Repositorio del sitio web: [dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- Aplicación de escritorio: [dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- Lanzamientos: [GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- Proyecto principal: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## Ecosistema de productos DSH

Para disponer de un banco de trabajo de escritorio, descargue [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases). Las instalaciones existentes de [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) pueden agregar complementos según sus necesidades siguiendo el README de cada proyecto. A continuación se detallan 11 complementos oficiales desarrollados internamente; consulte las notas de publicación y el catálogo integrado para conocer el contenido exacto de cada versión.

| Complemento | Qué puede hacer |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | Organizar proyectos y sesiones, buscar tareas y navegar por turnos de chat |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | Seleccionar e invocar especialistas profesionales para su tarea |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | Buscar, activar, crear e importar habilidades (skills) locales |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | Buscar, restaurar o limpiar conversaciones archivadas |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | Enviar tareas y recibir respuestas a través de plataformas de mensajería |
| [Automation](https://github.com/MichengAI/dsh-automation) | Programar tareas periódicas y revisar los resultados de cada ejecución |
| [BTW](https://github.com/MichengAI/dsh-btw) | Hacer preguntas secundarias sin interrumpir la tarea principal |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | Usar `/simplify` para mejorar el código dentro de los cambios acotados por Git |
| [PUA](https://github.com/MichengAI/dsh-pua) | Guiar al Agent para probar nuevos enfoques ante fallos y verificar resultados antes de concluir |
| [Code Review](https://github.com/MichengAI/dsh-code-review) | Usar `/review` para solicitar una revisión de código independiente y recibir el informe en la sesión |
| [Codex Pet](https://github.com/MichengAI/dsh-codex-pet) | Ver notificaciones de sesión y responder a aprobaciones de herramientas mediante una mascota de escritorio |

## Desarrollo local

Instale Node.js y npm, luego ejecute los siguientes comandos desde la raíz del repositorio:

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

El servidor de desarrollo escucha por defecto en `http://localhost:5173`.

## Compilación y pruebas

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

Los artefactos de compilación se generan en `dist\client`.

## Despliegue en Cloudflare Workers

El proyecto utiliza `wrangler.jsonc` para servir `dist\client` como directorio de recursos estáticos y `worker\index.js` gestiona el fallback de rutas SPA.

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## Licencia

Este proyecto está bajo la [Licencia Apache 2.0](LICENSE).

## Estructura del proyecto

```text
src\                 Páginas y estilos React
public\assets\       Recursos de imagen del sitio web
worker\              Punto de entrada de Cloudflare Worker
scripts\             Scripts de soporte para la compilación
tests\               Pruebas del worker y configuración de compilación
wrangler.jsonc       Configuración de Cloudflare Workers
```
