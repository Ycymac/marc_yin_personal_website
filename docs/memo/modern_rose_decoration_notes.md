# Modern Rose Decoration Notes

## Agent Handoff Summary
- Current goal: Keep modern-mode rose decoration restrained while using blue roses in dark mode and pale-yellow roses in light mode.
- Current implementation / status: Added a reusable inline SVG `RoseBouquetDecoration` component and wired it into hero/avatar, hello stage, about, and timeline tail; hello flowers now stay fixed after their first bloom.
- Important files: `src/components/RoseBouquetDecoration.vue`, `src/components/Intro.vue`, `src/components/HelloIntro.vue`, `src/components/About.vue`, `src/components/Experience.vue`, `src/styles/main.css`, `src/App.vue`.
- Verified command: `npm exec vite build` passed; `git diff --check` passed.
- Known risks: Playwright screenshot verification was attempted but blocked by Codex App local-directory permission during package resolution; visual QA still needs a browser pass.
- Next step: Open the local app in a browser and tune exact flower scale/offset if the avatar or hello-stage corners feel too dense.

## Metadata
- Project: `D:\allfiles\vuePro\marc_yin_personal_website`
- Source transcript: current Codex session
- Generated/Updated at: 2026-06-26T21:20:16+08:00
- Memo purpose: Cross-agent handoff for the modern rose decoration implementation.

## User Goal
- Add rose animation/decorations only in modern mode.
- Use blue roses for dark mode and pale-yellow roses for light mode.
- Keep the overall Apple-like modern design simple and avoid over-decoration.
- Replace the modern rotating avatar ring while preserving the circular avatar.
- Add flower styling around the hello screen so flowers bloom in as the hello stage expands.

## Confirmed Facts
- Modern mode is controlled by `data-skin="glass"`.
- `App.vue` now provides both `skin` and `theme` so decorative components can react to mode and light/dark theme.
- `HelloIntro.vue` exposes `progress` from `useHeroStage`; the hello rose decoration uses this progress for bloom visibility, then locks to full bloom once progress reaches `0.96`.
- Light modern theme accent variables were shifted from Klein blue to warm yellow; dark modern remains blue.

## Executed Steps
- Created `RoseBouquetDecoration.vue` with three rendering modes:
  - `hero`: left-top rose plus right-bottom small flowers, no branches.
  - `hello`: four edge/corner flower clusters that bloom using `progress`.
  - `about` / `timeline`: low-opacity full-bouquet decorations.
- Updated `Intro.vue` to use the hero decoration and keep the legacy `.profile-orbit` only outside modern mode.
- Updated `HelloIntro.vue` to place hello flowers behind the lottie art and keep them fully visible after the first bloom.
- Updated `About.vue` and `Experience.vue` to isolate content above decorative SVGs.
- Updated `main.css` for theme-aware modern accents, z-index layering, and timeline tail spacing.

## Produced Outputs and Locations
- Source changes are in the files listed above.
- No generated screenshots were kept.

## Open Questions / Risks
- Visual screenshot QA could not be completed in the available environment.
- The current avatar corner flower placement should be checked against the real browser viewport and adjusted if it competes with the waving emoji.

## Next Steps
- Run the site locally and inspect modern dark/light modes.
- Verify literary mode stays unchanged.
- Check reduced-motion behavior, especially the hello-stage bloom transition.

## Incremental Updates
### 2026-06-26T21:20:16+08:00
- Initial memo created for the modern rose decoration implementation.

### 2026-06-26T21:24:38+08:00
- Adjusted hello-stage flowers so the bloom progress is sticky after completion.
- Changed hello flower layer to fixed positioning so it remains visible on the page after the hello animation opens.
- Re-ran `git diff --check` and `npm exec vite build`; both passed.

## Redaction Notes
- No secrets or credentials were captured.
- Tool outputs were summarized instead of copied.
