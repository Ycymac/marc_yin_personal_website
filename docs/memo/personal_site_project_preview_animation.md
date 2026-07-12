# Personal Site Project Preview Animation

## Agent Handoff Summary
- Current goal: Replace the stale personal-site project screenshot with a skin-aware animated information-architecture preview.
- Current implementation / status: Implemented for both render paths. Modern uses greeting, route drawing, and three-column modules; literary removes greeting/routes and uses a two-column contents-page layout that fills the media pane.
- Important files: `src/components/PersonalSitePreview.vue`, `src/components/ProjectShowcase.vue`, `src/components/ProjectCard.vue`, `src/styles/main.css`, `src/data/portfolio.js`.
- Verified command: `npm run build`; `py scripts/verify-modern-style.py` with the local Python launcher.
- Known risks: `src/photos/portfolio.png` is now unused but intentionally retained until asset cleanup is explicitly requested.
- Next step: No required follow-up; use the regression script after future project-card layout changes.

## Metadata
- Project: `D:\allfiles\vuePro\marc_yin_personal_website`
- Source transcript: current Codex session
- Generated/Updated at: 2026-07-11T12:00:00+08:00
- Memo purpose: Preserve the dual-skin preview design and the separate modern/literary render-path requirement.

## Confirmed Facts
- Modern projects render through `ProjectShowcase.vue`; literary projects render through `ProjectCard.vue`.
- The shared preview component is selected by `animatedPreview: true` in project data.
- Modern dark mode must use theme panel variables rather than the light-only `--marble` value.
- Literary preview hides HELLO and SVG routes, uses serif editorial styling, and stretches to the full media column.

## Executed Steps
- Removed the old `portfolio.png` import/reference from project data.
- Added the shared `PersonalSitePreview.vue` component and wired both project render paths.
- Reused existing visibility state for one-shot CSS animation and added reduced-motion fallback.
- Extended browser regression checks for modern/light, modern/dark, literary layout, old-image absence, and console errors.

## Verification
- Production build passed; the CSDN refresh failed offline and correctly retained committed data.
- Browser regression passed with zero console errors.
- Modern dark preview computed a dark background and light text.
- Literary preview reported greeting/routes hidden and a two-column module layout; screenshot confirmed full media-pane coverage.

## Redaction Notes
- No secrets or credentials were stored.
