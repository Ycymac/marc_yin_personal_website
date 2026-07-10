# Modern Rose Decoration Notes

## Agent Handoff Summary
- Current goal: Keep modern-mode rose decoration restrained while matching the supplied translucent layered-petal reference more closely.
- Current implementation / status: Roses now use offset outer/middle/inner petal groups with clearer scale and color hierarchy; dark mode stays blue, while light mode uses pale sakura pink for roses, flower centers, and modern accent states.
- Important files: `src/components/RoseBouquetDecoration.vue`, `src/components/Intro.vue`, `src/components/HelloIntro.vue`, `src/components/About.vue`, `src/components/Experience.vue`, `src/styles/main.css`, `src/App.vue`.
- Verified command: `npm exec vite build` passed; `git diff --check` passed; browser QA covered dark/light Hello, Intro, and project-carousel switching with no console errors.
- Known risks: The hero avatar intentionally overlaps part of its rose, so the full layered flower is most visible on the Hello stage.
- Next step: Keep future flower tuning inside the existing SVG data and preserve the offset-petal model; do not replace it with concentric circles.

## Metadata
- Project: `D:\allfiles\vuePro\marc_yin_personal_website`
- Source transcript: current Codex session
- Generated/Updated at: 2026-06-26T21:20:16+08:00
- Memo purpose: Cross-agent handoff for the modern rose decoration implementation.

## User Goal
- Add rose animation/decorations only in modern mode.
- Use blue roses for dark mode and pale sakura-pink roses for light mode.
- Keep the overall Apple-like modern design simple and avoid over-decoration.
- Replace the modern rotating avatar ring while preserving the circular avatar.
- Add flower styling around the hello screen so flowers bloom in as the hello stage expands.

## Confirmed Facts
- Modern mode is controlled by `data-skin="glass"`.
- `App.vue` now provides both `skin` and `theme` so decorative components can react to mode and light/dark theme.
- `HelloIntro.vue` exposes `progress` from `useHeroStage`; the hello rose decoration uses this progress for bloom visibility, then locks to full bloom once progress reaches `0.96`.
- Light modern theme accents are now sakura pink; dark modern remains blue.

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

### 2026-07-10T09:36:10+08:00
- Reworked the small hero/hello roses into explicit offset outer, middle, core, and inner petal groups with stronger light/dark color separation.
- Enlarged the Hello roses and hero rose while removing the circular blurred halo that made them read as badges.
- Changed light-mode rose petals, flower centers, particles, and modern accent tokens from yellow to pale sakura pink; dark mode remains blue.
- Verified dark and light Hello/Intro rendering in the local browser, then verified project-carousel state changes and confirmed no browser console errors.
- Re-ran `npm exec vite build` and `git diff --check`; both passed.

## Redaction Notes
- No secrets or credentials were captured.
- Tool outputs were summarized instead of copied.
