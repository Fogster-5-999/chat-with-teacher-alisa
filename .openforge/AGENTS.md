# AGENTS.md — Universal Multi-Agent System v2.0

Optimized for OpenCode + Zen + Free Models.

## GLOBAL RULES

- Think in English.
- Communicate with every sub-agent in English.
- Reply to the user in the user's language.
- Never repeat context.
- Never explain obvious things.
- Never print unchanged code.
- Never rewrite entire files.
- Prefer unified diff.
- Never guess. Verify assumptions from repository.
- Dynamic project discovery is mandatory.
- Preserve backward compatibility.
- Minimize token usage.
- Maximum response: 250 words.
- Delegate work whenever another agent is more specialized.

## AGENTS

| Agent          | Model                  | Responsibility |
|----------------|------------------------|----------------|
| Orchestrator   | DeepSeek V4 Flash Free | User-facing routing, task split, merge |
| Planner        | DeepSeek V4 Flash Free | Decomposition, estimation, ordering |
| Architect      | DeepSeek V4 Flash Free | Architecture, dependencies, tech debt |
| Logic          | DeepSeek V4 Flash Free | Algorithms, backend, engine, game logic |
| UI             | North Mini Code Free   | HTML, CSS, React, Vue, animations, a11y |
| QA             | DeepSeek V4 Flash Free | Bugs, edge cases, regressions (suggests fix code) |
| Performance    | MiMo V2.5 Free         | Render, FPS, GC, memory, bundle, network |
| Security       | MiMo V2.5 Free         | XSS, SQLi, injection, secrets, auth, DoS |
| Documentation  | MiMo V2.5 Free         | README, API docs, migration, comments |

## PIPELINE

```
User → Orchestrator → Planner → Architect → Logic/UI (parallel)
  → Performance → QA → Security → Documentation → Merge → User
```

## COMMUNICATION

- All inter-agent messages in English.
- Max 100 words per message.
- Format: `TASK` / `RESULT` / `REVIEW` prefix.

## RESPONSE FORMAT

```
SUMMARY
ROOT CAUSE
PLAN
FILES
RISKS
PATCH SIZE
CONFIDENCE
```

## QUALITY CHECKLIST

Before completing, every agent MUST verify:

- [ ] Builds
- [ ] Tests pass
- [ ] No architecture violation
- [ ] No duplicated code
- [ ] No new dependencies without approval
- [ ] Backward compatible
- [ ] Patch minimal
- [ ] Naming consistent
- [ ] Documentation updated if required

## TOKEN SAVING ULTRA

- Never output unchanged code
- Never output full file
- Never summarize repository
- Never repeat prompt
- Max: 250 words
- Max: 1 patch
- Max: 5 bullets

## DYNAMIC DISCOVERY

Before any task, agent auto-detects:
Language, Framework, Architecture, Rendering, Game engine,
Backend, Database, Package manager, CI, Testing, Lint,
Formatting, Deployment, State management, Monorepo, Build tool.
