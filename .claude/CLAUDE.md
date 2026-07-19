# Project Rules — Super Z Workspace

> This file captures the development principles requested for this workspace.
> It is read at the start of every session and enforced across all generated code.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **UI primitives:** shadcn/ui
- **ORM:** Prisma
- **Runtime:** Node.js (LTS)
- **Package manager:** pnpm (preferred) / npm (fallback)

## Prose Style (For All Generated Documentation & Comments)

- Minimalist. No filler. No corporate hedging.
- One idea per sentence. Short sentences win.
- Comments explain *why*, never *what* (the code already says what).
- READMEs and docs lead with the verb. "Deploy," not "This document describes how to deploy."
- Forbidden phrases: "leverage," "utilize," "in order to," "it should be noted that," "robust," "seamless," "cutting-edge."

## Development Lifecycle

1. **Plan before executing.** State the approach in 3–5 bullets before writing code.
2. **TDD-first where it makes sense.** For pure logic, utilities, parsers, and data transforms — write the test first, watch it fail, implement, watch it pass. For UI scaffolding, skip the ceremony.
3. **Small commits.** One logical change per commit. Conventional Commits format (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
4. **Incident-driven guardrails.** When a bug is found, add a regression test *and* a guardrail comment at the call site explaining what broke and why this code prevents it.

## Design Constraints (Anti-"AI-Slop")

Generic SaaS aesthetics are forbidden. Specifically:

- **No card grids of equal-height feature boxes with outline icons.** This is the #1 tell that an AI built the page.
- **No gradient hero backgrounds** (purple-to-blue, indigo-to-pink, etc.). Solid color or single-tone texture only.
- **No "rocket" / "sparkles" / "lightning" emojis** as feature icons.
- **No `text-4xl font-bold tracking-tight` centered headlines above a subheadline above two CTA buttons.** This is the default AI landing page. Do something else.
- **No three-column "Features" / "Pricing" / "FAQ" footer stack** unless explicitly requested.

### Required Instead

- **Hierarchical visual anchors.** One element on the page should clearly dominate. Size, weight, or position — pick one and commit.
- **Editorial typography.** Pair a serif display face (e.g., Fraunces, Newsreader) with a sans body (Inter, Geist). Or go all-mono for a technical feel. Avoid Inter alone at every weight.
- **Asymmetric layouts.** 7/5 or 2/3 splits beat centered columns.
- **Real numbers and real nouns.** "47ms p95" beats "blazing fast." "Used by 3 indie hackers in Berlin" beats "trusted by teams worldwide."
- **Restrained color.** Two neutrals + one accent. The accent earns its presence.

## Quality Gate

Before declaring any task complete:

- [ ] Lint passes (`next lint`, no warnings)
- [ ] Type-check passes (`tsc --noEmit`)
- [ ] All existing tests still pass
- [ ] No `console.log` left in committed code
- [ ] No `any` types added without an inline `// FIXME: ...` justification
- [ ] README updated if behavior changed
- [ ] Commit message follows Conventional Commits

## Skill Routing (Real — Not Plugin Commands)

This workspace uses Super Z's actual skill system, invoked via `Skill(command="...")`.
The skills below replace the fake `/plugin install` commands from the original setup request:

| Requested (fake plugin)               | Real skill to use                | When                                            |
| ------------------------------------- | -------------------------------- | ----------------------------------------------- |
| `anthropic/skills/superpowers`        | `coding-agent`                   | Multi-step code generation & refactors          |
| `anthropic/skills/skill-creator`      | `skill-creator`                  | Creating new reusable skills                    |
| `claude-plugins-official/context-mode`| (built into main agent)          | Context is always-on; no plugin needed          |
| `claude-plugins-official/claude-mem`  | `task-review`                    | Saving task paths as reusable skills            |
| `anthropics/skills/frontend-design`   | `design` + `visual-design-foundations` | UI design intelligence & systems            |
| `nextlevelbuilder/ui-ux-pro-max-skill`| `ui-ux-pro-max`                  | Advanced UI/UX patterns & component architecture|
| `composio-hq/.../theme-factory`       | `design`                         | Theme & design-token generation                 |
| `mcp-server/firecrawl-mcp`            | `web-reader`                     | Scrape & extract web page content               |
| `travisvn/.../notebook-lm-skill`      | `web-search` + `multi-search-engine` | Research & multi-source synthesis          |

## Deployment

There is **no built-in deployer for `customdomain.space-z.ai`** in this environment.
What exists instead: when a Next.js project is built via the `fullstack-dev` skill, a temporary
preview is exposed at `https://preview-<bot-id>.space-z.ai/`. This is a preview link, not a
production deployment system. For real custom-domain deployments, wire the built project to
Vercel / Netlify / Cloudflare Pages manually from the `/home/z/my-project/` directory.

## Tool Fallback Protocol (CRITICAL)

When a task needs a tool that isn't directly available as a Super Z skill or bash command:

### Step 1 — Try terminal install
If the tool is a CLI/library that can be installed via `npm`, `pip`, `apt`, `pipx`, `curl | sh`,
or any standard package manager, install it first. Examples:
- Need Firebase deploy → `npm install -g firebase-tools`
- Need Vercel deploy → `npm install -g vercel`
- Need gh CLI → `npm install -g gh` or `apt install gh`
- Need image processing → `pip install pillow`
- Need a headless browser → Playwright is already installed (`python3 -c "import playwright"`)

### Step 2 — Fall back to browser
If the tool isn't installable but exists as a public web app (e.g., a generator,
converter, dashboard, admin panel, no-code builder), drive it via Playwright + Chromium.

Pattern:
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://the-tool-url.com")
    # interact: click, fill, screenshot, extract
    page.screenshot(path="/home/z/my-project/download/screenshot.png")
    browser.close()
```

### Step 3 — Document the workaround
If a tool genuinely doesn't exist in either form, say so explicitly. Don't pretend
to use a tool that wasn't actually invoked.

### Currently installed CLIs (verified working)
- `firebase` 15.24.0 → Firebase Hosting / Firestore / Auth deploys
- `vercel` 56.3.2 → Vercel deploys (use `--token` for non-interactive)
- `gh` 2.8.9 → GitHub CLI (repo ops, releases, issues)
- `node` v24.18.0 / `npm` 11.16.0
- `python3` with Playwright (Chromium headless) for browser automation
- `rg`, `curl`, `git`, standard Unix tools

### Currently NOT installed (install on demand)
- `pnpm` → `npm install -g pnpm` if needed
- `pnpm`/`yarn` alternative registries
- Java/Kotlin/Android SDKs (not in scope for web work)
- Docker (usually unavailable in sandboxed envs)

## Chromium / Browser Automation

Chromium is available via Playwright Python (NOT a standalone `chromium` binary).
Verified working: can load `https://example.com` and extract page title in headless mode.

Use the `agent-browser` skill for structured navigation/clicking/snapshotting workflows,
or write inline Playwright Python scripts saved under `/home/z/my-project/scripts/`.

## File Path Conventions

- Scripts: `/home/z/my-project/scripts/` (persisted, editable, recoverable)
- Deliverables: `/home/z/my-project/download/` (user-facing only)
- Worklog: `/home/z/my-project/worklog.md` (shared multi-agent log)
- Source code: `/home/z/my-project/` root or organized subdirs
- Assets (logos, images, fonts): `/home/z/my-project/assets/`
- Credentials: `/home/z/my-project/credentials.txt` (gitignored) or
  `/home/z/my-project/.secure/credentials.env` (gitignored)

Never write outside `/home/z/my-project/`.
