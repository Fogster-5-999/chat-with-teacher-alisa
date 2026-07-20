# OpenForgeAI

**Universal AI multi-agent framework for OpenCode using free Zen models.**

Простой способ превратить OpenCode в команду из 9 ИИ-агентов, которые планируют, проектируют, пишут код, проверяют качество, безопасность и документацию — и всё это на бесплатных моделях.

## О чём проект

OpenCode сам по себе — это CLI с ИИ. OpenForgeAI расширяет его: вместо одного «универсального» LLM ты получаешь пайплайн специализированных агентов. Каждый отвечает за свою дисциплину, работает на своей модели и не лезет в чужое.

Это не «ещё один AI-помощник». Это готовая архитектура для автоматизации разработки, собранная из бесплатных моделей.

## Состав

| Агент | Модель | Что делает |
|-------|--------|------------|
| Orchestrator | DeepSeek V4 Flash Free | Координирует, сплитит, мержит |
| Planner | DeepSeek V4 Flash Free | Планирует шаги, оценивает риски |
| Architect | DeepSeek V4 Flash Free | Проектирует архитектуру, контракты |
| Logic | DeepSeek V4 Flash Free | Пишет код (бэкенд, алгоритмы, логика) |
| UI | North Mini Code Free | Фронтенд, компоненты, анимации |
| QA | DeepSeek V4 Flash Free | Ищет баги, предлагает фиксы кодом |
| Performance | MiMo V2.5 Free | Оптимизация, память, бандл, сеть |
| Security | MiMo V2.5 Free | XSS, SQLi, утечки, auth |
| Documentation | MiMo V2.5 Free | README, API-доки, ченжлоги |

## Сильные стороны

- **Бесплатно.** Все модели из открытого доступа — DeepSeek, MiMo, North. Никаких подписок.
- **Token-efficient.** Короткие промпты, unified diff, запрет на повтор контекста. Каждый агент пишет только то, что нужно.
- **Feedback loop.** Если QA нашёл баг — задача возвращается разработчику, а не идёт дальше.
- **Параллельное выполнение.** Logic и UI запускаются одновременно.
- **Права доступа.** QA, Security, Performance — read-only. Они не трогают код, только анализируют.
- **Из коробки.** Скопировал конфиг, запустил OpenCode — работает.

## Быстрый старт

### 1. Установи OpenCode

```bash
npm install -g @openai/codex-cli
# или через curl:
curl -fsSL https://opencode.ai/install.sh | sh
```

Подробнее: [opencode.ai/docs](https://opencode.ai/docs)

### 2. Скопируй OpenForgeAI в свой проект

```bash
# из репозитория OpenForgeAI в корень твоего проекта
cp opencode.jsonc /путь/к/твоему-проекту/
cp -r .openforge /путь/к/твоему-проекту/
```

### 3. Всё

Нажми `Tab` в OpenCode и пиши задачу. Или вызови агента напрямую:

- `@logic реализуй парсер`
- `@qa проверь этот файл`
- `@security аудит auth.ts`

## Как это работает

```
Ты → Tab → Orchestrator → Planner → Architect → Logic ──┐
                                                → UI    ──┤ (параллельно)
                                                → Performance → QA → Security → Docs → Ты
                                                → если баги → возврат к Logic/UI
```

Подробная документация: [docs/multi-agent-system.md](docs/multi-agent-system.md)

## Для чего подходит

- Пет-проекты и стартапы — бесплатно и быстро
- Командная разработка — единый pipeline для code review
- Обучение — наглядно видно, как устроен процесс разработки

## Лицензия

MIT. Делай что хочешь.
