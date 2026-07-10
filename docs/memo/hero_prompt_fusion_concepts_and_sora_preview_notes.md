# Hero Prompt Fusion Concepts And Sora Preview Notes

## Agent Handoff Summary
- Current goal: Evolve the existing Apple-like portfolio into a monochrome editorial/print direction while preserving its real section structure.
- Current implementation / status: Implemented and browser-verified the monochrome editorial `glass` skin. The supplied 6-second Hello Lottie remains intact; its strokes are normalized per theme (black on light, white on dark), then its `complete` event reveals the fixed wallpaper. Light mode inverts/softens the wallpaper to dark-gray type with pale-gray shadows. About uses an Apple/editorial lead plus numbered two-column layout. JAVIS metrics retain their original multicolor semantics. VCR OSD Mono is self-hosted and restricted to English titles/labels.
- Important files: `design.md`, `src/App.vue`, `src/assets/hello.lottie.json`, `src/assets/fonts/VCR_OSD_MONO.woff`, `src/assets/fonts/VCR_OSD_MONO-SOURCE.txt`, `src/photos/modern_wallpaper.png`, `src/components/HelloIntro.vue`, `src/components/About.vue`, `src/styles/main.css`, `scripts/verify-modern-style.py`.
- Verified command: `npm run build`; the browser check is `py scripts/verify-modern-style.py` through the bundled `with_server.py` helper.
- Known risks: The wallpaper uses `cover`; a dedicated mobile crop can be added after device review. The VCR source page labels the font Free and its source URL is recorded beside the asset.
- Next step: User visual review, especially mobile wallpaper cropping and the display-font intensity on long project titles.

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
- Latest direction supersedes the floral rule: flowers, roses, petals, cyan, teal, orange, and other chromatic accents may be removed entirely.
- Use the supplied black long-shadow artwork as a persistent site wallpaper after the Apple Hello animation completes.
- Borrow only monochrome print mechanics from the second reference: halftone, registration offset, crop lines, and paper texture.
- Use VCR OSD Mono as a restrained English display face for large Latin headlines, page numbers, project codes, and short labels only; keep body copy, controls, and Chinese text in the current readable families.

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
### 2026-07-11T01:10:00+08:00
- Confirmed a monochrome-only design direction and removed flowers and botanical decoration from the target concept.
- Generated a four-page concept board covering Hello, Home, Projects, and Blog/Timeline in a monochrome editorial style.
- Inspected `C:\Users\<user>\Downloads\Hello (apple).json`: Lottie 5.5.7, 500x500, 120fps, frames 0-720 (6 seconds), one vector layer, no external assets.
- Compared it with `src/assets/hello.lottie.json`, which is 2.83 seconds; the supplied file adds the later hold/erase sequence.
- Approved design sequence: play the supplied Lottie, then crossfade to the supplied black long-shadow wallpaper and retain it as the fixed background. No implementation was performed in this design-only turn.
- Approved VCR OSD Mono as the stylized English display font. The repository currently contains no VCR OSD Mono font asset or package, so implementation still needs a local font file or another explicitly approved source.
- Implemented the approved direction: kept the full supplied Hello animation, revealed the fixed wallpaper on Lottie completion, removed modern flower nodes, added a central paper/ink content sheet, editorial section folios, Klein blue light accents, bright-silver dark accents, and single-accent JAVIS metrics.
- Kept VCR OSD Mono strictly on English headings, labels, dates, and project titles; body copy is unchanged. Added Space Mono as the deploy-safe fallback because no VCR font file exists locally.
- Added `scripts/verify-modern-style.py` as the minimal regression check. Browser results: wallpaper ready in both themes, light `--klein` is `#002fa7`, dark `--klein` is `#e7e9ee`, zero `.rose-decoration` nodes, and zero console errors.
- Verified `npm run build` successfully. The build-time CSDN refresh could not reach the network and correctly retained the committed `src/data/blog.json`.

### 2026-07-11T03:10:00+08:00
- Corrected the supplied Lottie's mixed black/white gradient strokes at load time: dark theme renders only white stops and light theme renders only black stops. Theme changes during playback remount the animation; completed animations are not replayed.
- Light wallpaper now uses `invert(1) contrast(0.82) brightness(1.05)`, producing dark-gray lettering and pale-gray shadows on the white stage.
- Replaced the old About glass text box with a large Apple-like lead statement and numbered two-column editorial grid; mobile collapses to one column.
- Removed the single-accent override from JAVIS evaluation metrics and verified seven original metric colors are present.
- Self-hosted `VCR_OSD_MONO.woff` and documented its source. Verified `document.fonts.check(...)` returns true; the font remains limited to English headings, labels, dates, and project titles.
- Browser regression verified both wallpaper completion states, exact Hello stop colors, two About columns at desktop width, seven metric colors, zero flower nodes, and zero console errors. `npm run build` passed.
- Created root `design.md` as the authoritative modern-skin design reference. It prioritizes the font usage matrix, flat module construction rules, and the exact 48px ambient grid / 6px paper micro-dot / wallpaper layer architecture.

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
