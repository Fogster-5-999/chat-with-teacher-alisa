# OpenForgeAI

**Universal AI multi-agent framework for OpenCode using free Zen models.**

Turn OpenCode into a team of 9 specialized AI agents — planning, architecting, coding, reviewing, securing, and documenting your project. All on free models.

## What is this

OpenCode is an AI-powered CLI. OpenForgeAI extends it: instead of one general-purpose LLM, you get a pipeline of specialized agents. Each agent owns one discipline, runs on its own model, and stays in its lane.

This is not "yet another AI assistant". It's a ready-to-use engineering automation stack built from free models.

## Agents

| Agent | Model | Responsibility |
|-------|-------|----------------|
| Orchestrator | DeepSeek V4 Flash Free | Routes tasks, splits, merges |
| Planner | DeepSeek V4 Flash Free | Breaks tasks into steps, estimates risks |
| Architect | DeepSeek V4 Flash Free | Designs architecture, contracts |
| Logic | DeepSeek V4 Flash Free | Writes code (backend, algorithms, engine) |
| UI | North Mini Code Free | Frontend, components, animations |
| QA | DeepSeek V4 Flash Free | Finds bugs, suggests fixes with code |
| Performance | MiMo V2.5 Free | FPS, memory, bundle, network |
| Security | MiMo V2.5 Free | XSS, SQLi, leaks, auth |
| Documentation | MiMo V2.5 Free | README, API docs, changelogs |

## Why use it

- **Free.** All models are publicly available — DeepSeek, MiMo, North. No subscriptions.
- **Token-efficient.** Short prompts, unified diffs, no repeated context. Each agent says only what matters.
- **Feedback loop.** QA finds a bug? Task goes back to the developer, not forward.
- **Parallel execution.** Logic and UI run at the same time.
- **Least privilege.** QA, Security, Performance are read-only. They analyze, they don't touch.
- **Works out of the box.** Copy config, run OpenCode, done.

## Quick start

### 1. Install OpenCode

```bash
npm install -g @openai/codex-cli
# or via curl:
curl -fsSL https://opencode.ai/install.sh | sh
```

See: [opencode.ai/docs](https://opencode.ai/docs)

### 2. Copy OpenForgeAI to your project

```bash
# from OpenForgeAI repo to your project root
cp opencode.jsonc /path/to/your-project/
cp -r .openforge /path/to/your-project/
```

### 3. Done

Press `Tab` in OpenCode and type your task. Or call an agent directly:

- `@logic implement a parser`
- `@qa review this file`
- `@security audit auth.ts`

## Pipeline

```
You → Tab → Orchestrator → Planner → Architect → Logic ──┐
                                           → UI    ──┤ (parallel)
                                           → Performance → QA → Security → Docs → You
                                           → if bugs → back to Logic/UI
```

Full docs: [docs/multi-agent-system.md](docs/multi-agent-system.md)

## Use cases

- Pet projects and startups — fast and free
- Team development — unified code review pipeline
- Learning — see how engineering process works end-to-end

## License

MIT. Do whatever you want.
