# Hero Prompt Fusion Concepts And Sora Preview Notes

## Agent Handoff Summary
- Current goal: Adapt useful motion and interaction ideas from two external cinematic hero prompts without changing the portfolio's existing structure or minimal Apple-like identity.
- Current implementation / status: Produced the original three concept directions, then a no-water floral-only revision, and finally a tighter minimal Apple-style floral revision aligned to the existing `glass` skin; verified the local `sora.py` dry-run path works after dependency download, but real video generation is currently blocked by missing `OPENAI_API_KEY`.
- Important files: `src/App.vue`, `src/components/Intro.vue`, `src/components/HelloIntro.vue`, `src/components/BlogPreview.vue`, `src/components/ProjectShowcase.vue`, `src/components/RagChatDemo.vue`, `src/styles/main.css`, `docs/memo/modern_rose_decoration_notes.md`.
- Verified command: `uv run --with openai python C:\Users\32539\.codex\skills\sora\scripts\sora.py create --prompt "Marc portfolio redesign concept" --dry-run`
- Known risks: Sora guardrails prohibit real-person video references; any future video should stay UI-first / non-human. Actual video generation still requires a locally set `OPENAI_API_KEY`.
- Next step: If implementation is approved later, start with a restrained motion/polish pass on the existing Vue components; do not recreate either React hero wholesale.

## Metadata
- Project: `D:\allfiles\vuePro\marc_yin_personal_website`
- Source transcript: current Codex session
- Generated/Updated at: 2026-07-04T20:00:00+08:00
- Memo purpose: Preserve the three hero-fusion concept directions, generated preview image paths, and Sora readiness/blocker status.

## User Goal
- Reuse prompt-style website hero concepts without blindly executing them.
- Keep the redesign anchored to the real project: Marc's backend-learning portfolio/blog with RAG demo, CSDN writing, timeline, and the existing glass/literary split.
- Generate preview outputs, including static visuals and video-oriented prompt direction.

## Confirmed Facts
- The repo already has a strong structure that should not be overwritten by an external prompt: `HelloIntro` curtain, `Intro` hero, project/blog/skills/timeline sections, and the `glass` / `literary` skin split.
- The current modern direction already includes dark-mode blue rose decoration, glass surfaces, a RAG demo card, and build-time CSDN blog cards.
- The local Sora skill exists at `C:\Users\32539\.codex\skills\sora\`.
- `uv` is installed and can run the bundled `sora.py` CLI.
- A dry-run succeeds once the `openai` package is available, but real video generation is blocked because `OPENAI_API_KEY` is not set in the current shell.
- Sora skill guardrails require non-human outputs; future video previews should avoid Marc's real face and instead use monograms, UI surfaces, or abstract identity elements.

## User Preferences / Instructions
- Adapt prompt ideas into the current site instead of generating an unrelated portfolio template.
- Preserve the real project direction: backend learning, JAVIS/RAG, CSDN writing, and the current site structure.
- Keep project memory lightweight and useful for cross-agent continuation.
- Decorative motifs should stay floral only, especially roses / petals; do not introduce waterway, river, tunnel, or other mismatched scenic metaphors.
- When refining the preview direction further, bias toward the site's own minimal Apple-like product-page language rather than stronger cinematic scenery.

## Executed Steps
- Re-read project memo index and the existing modern rose memo for current modern-mode styling constraints.
- Re-read the Sora skill plus CLI/network/troubleshooting references.
- Verified that `OPENAI_API_KEY` is missing in the current environment.
- Verified the local Sora dependency path with a dry-run after allowing one-time network access for `uv` package retrieval.
- Generated three static preview concepts based on:
  - prompt A: video-switcher cinematic hero adapted to Marc's real portfolio
  - prompt B: editorial `Organic Visions` cinematic hero adapted to Marc's developer-journal identity
  - prompt C: combined fusion of both prompts plus the existing site structure and glass styling
- Generated a second floral-only revision set after the user rejected water / canal / tunnel imagery.
- Generated a further minimal Apple-style floral preview that suppresses heavy cinematic scenery and leans into the site's existing low-contrast product-page aesthetic.

## Current Plan
- Preserve the real order: `HelloIntro` -> `Intro` -> `About` -> `Projects` -> `BlogPreview` -> `Skills` -> `Experience` -> `Footer`, with the existing utility widget.
- Keep the modern/glass hero navigation-free and keep roses/petals as the only decorative motif.
- Reuse only restrained prompt ideas: spring-like reveal timing, active-state clarity, responsive spacing, and optional project-card media transitions.
- Reject full-viewport scenic video, three simultaneous video preloads, imported prompt branding, React/Framer Motion rewrites, and heavy blurred mobile menus.

## Rejected / Superseded Plans
- Replacing the site wholesale with the original prompt output: rejected because it would discard the current portfolio/blog structure and skin system.
- Using Marc's real portrait in the video concept: rejected because the Sora skill guardrails are non-human only.
- Claiming video generation succeeded without a key: rejected; only the dry-run path is verified.

## Produced Outputs and Locations
- Preview A image: `C:\Users\32539\.codex\generated_images\019f2ce3-e6a3-7142-af1d-bdeb00b84c92\ig_05134cfbd336bc0d016a48f44122ac81918fa8f2cf522f32c5.png`
- Preview B image: `C:\Users\32539\.codex\generated_images\019f2ce3-e6a3-7142-af1d-bdeb00b84c92\ig_0f41b140012b5250016a48f572b33c819182899aa56472df0b.png`
- Preview C image: `C:\Users\32539\.codex\generated_images\019f2ce3-e6a3-7142-af1d-bdeb00b84c92\ig_0f41b140012b5250016a48f61fd1f88191a3498c53eef48bb7.png`
- Floral-only revision A/C/B images were generated later in the same folder; use the most recent generated files when continuing this line.
- Minimal Apple-style floral preview: `C:\Users\32539\.codex\generated_images\019f2ce3-e6a3-7142-af1d-bdeb00b84c92\ig_09e50fe7f3862699016a48f97ffe188191ae6ca924583186e5.png`

## Open Questions / Risks
- The user still needs to choose whether to advance A, B, or C into actual site implementation.
- Real Sora video jobs cannot start until `OPENAI_API_KEY` is set locally.
- If future video prompts become too UI-text heavy, readability and motion stability may degrade; prompts should keep one main action and keep text brief.
- Future prompt work can still drift into over-cinematic staging unless the Apple-style / floral-only constraints are repeated explicitly.

## Next Steps
- Let the user compare the three preview directions.
- If they choose one, derive a tighter production prompt and then either:
  - render the Sora video after key setup, or
  - implement the chosen direction in the Vue project.

## Incremental Updates
### 2026-07-04T20:00:00+08:00
- Added three concept directions for external-prompt-to-project adaptation.
- Stored three generated preview image paths.
- Recorded successful `sora.py` dry-run verification and the current `OPENAI_API_KEY` blocker.

### 2026-07-04T20:20:00+08:00
- Recorded the user's correction that floral decoration is welcome but water / canal / tunnel imagery is not.
- Added the stronger standing preference to fuse future previews with the site's own minimal Apple-like style.
- Stored the latest Apple-style floral preview path for future continuation.

### 2026-07-10T00:00:00+08:00
- Re-evaluated both supplied hero prompts against the live Vue structure.
- Concluded that neither prompt should replace the current hero: both conflict with the navigation-free glass flow, dual-skin system, current typography, and floral-only decoration rule.
- Approved only selective reuse of motion timing, active states, responsive spacing, and a possible single-media transition inside the existing project showcase.
- Kept the current stage analysis-only; no Vue, CSS, dependency, or configuration changes were made.

### 2026-07-10T09:36:10+08:00
- Implemented the approved prompt-derived interaction subset without adding features or dependencies.
- Added restrained modern-skin reveal timing, fill-up feedback for existing hero actions, a crossfade between the existing RAG demo and video, and a clearer pill-shaped active carousel dot.
- Browser-tested the carousel transition and active/hidden slide state; no console errors were observed.

## Redaction Notes
- No API keys or credential values were stored.
- The Sora dry-run command was summarized without raw environment secrets.
