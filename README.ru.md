# Официальный сайт DSH Codex Desktop

[简体中文](README.zh-CN.md) · [English](README.en.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

[История изменений](CHANGELOG.md)

В этом репозитории содержится исходный код сайта-визитки и загрузок для [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop). Сайт представляет проект и предоставляет ссылки на пакеты установки для Windows, macOS и Linux.

Скачайте последнюю версию со [страницы релизов десктопного приложения](https://github.com/MichengAI/dsh-codex-desktop/releases).

Текущий релиз для ПК — **v1.0.92**, в состав которого входят **DSH 0.2.2-alpha.2** и **14 компонентов (включая каталог плагинов)**. Новые установки включают Context. Плагин учёта расходов и коннектор MCP в комплект не входят; ранее установленные копии сохраняются. Перед обновлением рекомендуется сделать резервную копию важных диалогов.

## Установка приложения

1. Откройте страницу релизов десктопной версии и выберите инсталлятор для вашей операционной системы и архитектуры процессора.
2. Установите и запустите DSH Codex Desktop; отдельная установка Node.js не требуется.
3. Выберите модель, откройте проект и начните работу над задачей в рабочей среде.

Этот репозиторий служит только для поддержки сайта презентации и загрузок. Для использования десктопного приложения запускать исходный код сайта не требуется.

## Ссылки

- Репозиторий сайта: [dsh-codex-desktop-website](https://github.com/MichengAI/dsh-codex-desktop-website)
- Десктопное приложение: [dsh-codex-desktop](https://github.com/MichengAI/dsh-codex-desktop)
- Релизы: [GitHub Releases](https://github.com/MichengAI/dsh-codex-desktop/releases)
- Исходный проект: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)

## Экосистема продуктов DSH

Если вам нужно готовое рабочее место на ПК, скачайте [DSH Codex Desktop](https://github.com/MichengAI/dsh-codex-desktop/releases). При наличии существующей среды [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) плагины можно устанавливать отдельно по инструкциям в README каждого проекта. Ниже перечислены 11 собственных плагинов; точный состав встроенных расширений проверяйте в примечаниях к релизу.

| Плагин | Назначение |
| --- | --- |
| [Codex UI](https://github.com/MichengAI/dsh-codex-ui) | Организация проектов и сессий, поиск задач и переход по раундам чата |
| [Agency Agents](https://github.com/MichengAI/dsh-agency-agents) | Выбор и вызов специализированных ролей под конкретную задачу |
| [Skills Manager](https://github.com/MichengAI/dsh-skills-manager) | Единый поиск, включение, создание и импорт локальных навыков |
| [Archive Manager](https://github.com/MichengAI/dsh-archive-manager) | Поиск, восстановление или очистка архивных сессий |
| [IM Connect](https://github.com/MichengAI/dsh-im-connect) | Отправка задач и получение ответов через платформы обмена сообщениями |
| [Automation](https://github.com/MichengAI/dsh-automation) | Планирование периодических задач и просмотр результатов каждого запуска |
| [BTW](https://github.com/MichengAI/dsh-btw) | Однократные попутные вопросы в текущем контексте без прерывания основной задачи |
| [Simplify](https://github.com/MichengAI/dsh-simplify) | Оптимизация кода в пределах изменений Git с помощью команды `/simplify` |
| [PUA](https://github.com/MichengAI/dsh-pua) | Подсказки агенту пробовать другие пути при сбоях и проверка перед сдачей |
| [Code Review](https://github.com/MichengAI/dsh-code-review) | Запрос независимого аудита кода через `/review` с отчётом прямо в сессии |
| [Codex Pet](https://github.com/MichengAI/dsh-codex-pet) | Уведомления и подтверждения действий через интерактивного настольного питомца |

## Локальная разработка

Установите Node.js и npm, затем выполните следующие команды в корне репозитория:

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm ci
npm run dev
```

Сервер разработки по умолчанию доступен по адресу `http://localhost:5173`.

## Сборка и тестирование

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npm run test:sites
```

Собранные файлы клиента размещаются в каталоге `dist\client`.

## Развёртывание в Cloudflare Workers

Проект использует `wrangler.jsonc` для раздачи файлов из `dist\client` как статических ресурсов, а `worker\index.js` обрабатывает маршрутизацию SPA.

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
npm run build
npx wrangler deploy
```

## Лицензия

Этот проект распространяется под лицензией [Apache License 2.0](LICENSE).

## Структура проекта

```text
src\                 Страницы и стили React
public\assets\       Графические ресурсы сайта
worker\              Точка входа Cloudflare Worker
scripts\             Вспомогательные скрипты сборки
tests\               Тесты воркера и конфигурации сборки
wrangler.jsonc       Конфигурация Cloudflare Workers
```
