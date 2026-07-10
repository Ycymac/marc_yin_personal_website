# Website Design System

> Status: implemented and browser-verified on 2026-07-11.  
> Scope: the default `glass` skin. The `literary` skin remains a compatibility option, but it is not the reference direction for new UI work.

## 1. Design identity

The current website combines three ideas:

1. **Apple-like minimalism** — generous whitespace, direct hierarchy, quiet surfaces, restrained motion.
2. **Monochrome editorial print** — paper grain, folio numbers, hairline rules, asymmetric typesetting and large cropped statements.
3. **VCR / OSD character** — pixel-like English display typography used only for short titles and labels.

The visual signature is the transition from the handwritten Apple Hello animation into the fixed `无可限进步` long-shadow wallpaper. The interface then behaves like a calm editorial sheet placed over that poster.

The page must feel precise and minimal before it feels decorative.

## 2. Core principles

- Preserve the real content order: `Hello → Home → About → Projects → Blog → Skills → Timeline → Footer`.
- Use whitespace, scale and alignment before adding decoration.
- Keep one interface accent per theme: Klein blue in light mode, bright silver in dark mode.
- Treat the wallpaper as environmental context, not as a replacement for readable content surfaces.
- Allow multiple colors only when color carries information, such as JAVIS evaluation metrics.
- Do not reintroduce flowers, roses, petals, pink accents, glow-heavy glassmorphism or generic gradient decoration into the modern skin.
- Keep light and dark modes equivalent in hierarchy and behavior, rather than designing one as an afterthought.

## 3. Three non-negotiable specifications

These rules have priority over local component styling. New UI should be checked against all three before implementation.

### 3.1 Font usage matrix

| Content type | Required family | Typical size | Rules |
| --- | --- | --- | --- |
| English hero name | `VCR OSD Mono` | `3.75rem–6rem` | Short display line only; normal style, no synthetic italic |
| English section title | `VCR OSD Mono` | About `1.875rem` | Uppercase is preferred when the label is short |
| English project title | `VCR OSD Mono` | `1.5rem–2.6rem` | Allow wrapping; do not reduce body readability to preserve one-line titles |
| Folio / date / kicker | `VCR OSD Mono` | `0.65rem–0.8rem` | Increased letter spacing; use the theme accent |
| Chinese title | Modern Chinese sans-serif stack | According to hierarchy | Do not force the Latin pixel font onto Chinese glyphs |
| Body / description | Readable sans-serif system stack | `0.98rem–1.125rem` | Relaxed line height; never use VCR OSD Mono |
| Technical tag | `Space Mono` or VCR for short Latin-only tags | `0.65rem–0.8rem` | Keep compact; avoid paragraphs inside pills |
| Literary skin text | `Fraunces Variable` / `Noto Serif SC` | Existing literary scale | Do not mix into the modern skin |

Font boundary:

```text
VCR OSD Mono = identity, index, title, label
Sans-serif    = reading, explanation, interaction guidance
```

If a text string needs more than two short lines, it should normally not use VCR OSD Mono.

### 3.2 Module construction rules

The modern skin is a **flat editorial sheet**, not a collection of glass cards.

| Layer / module | Surface | Geometry | Border and shadow |
| --- | --- | --- | --- |
| Page sheet | `--marble` / dark `#0A0A0B` at about 96% opacity | Centered, max `76rem`, no floating-card radius | 1px side hairlines; broad low-opacity separation shadow |
| Standard module | `--apple-card` | Default radius `0.25rem` | No decorative border; light mode uses a whisper shadow, dark mode stays flat |
| About module | No card fill | Large lead + ruled two-column grid | Hairline dividers only; no glass blur or rounded container |
| Project module | Quiet solid surface | Rectangular editorial block | Hierarchy comes from media and type, not shadow depth |
| Blog module | Quiet solid surface | Compact rectangular index/card | Accent appears on action or focus, not as a colored background wash |
| Metric card | White/dark compact data cell | Small controlled radius | Color is allowed on icon/value because it carries data meaning |
| Icon action | Theme surface | Circular | Circles are reserved for icon-only actions and timeline nodes |
| Tag / chip | Subtle tinted surface | Pill or small radius | Short metadata only; no glow and no blur |

Spacing should follow a restrained `8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px` rhythm. Use larger gaps between sections and smaller gaps inside data groups.

Module prohibitions:

- Do not wrap every section in a rounded rectangle.
- Do not stack multiple translucent surfaces to simulate depth.
- Do not use large colored gradients as module backgrounds.
- Do not use heavy shadows in dark mode.
- Do not add a new card when a hairline, spacing change or typography hierarchy is sufficient.
- Do not use circular geometry for normal text containers.

### 3.3 Background grid and layer architecture

The background is built as a controlled print stack. Its layers must remain in this order:

```text
Layer 0  Theme base color
Layer 1  Fixed long-shadow wallpaper
Layer 2  Static 48px ambient grid
Layer 3  Centered 76rem content sheet
Layer 4  6px micro-dot paper texture inside the sheet
Layer 5  Content modules and interactive elements
```

#### Ambient grid

- Grid cell: `48px × 48px`.
- Line weight: `1px`.
- Light grid color: `rgba(7, 20, 45, 0.065)`.
- The grid is centered at the top of the viewport.
- Modern-skin opacity is reduced to `0.12`.
- The grid is static in the modern skin; `gridShift` must remain disabled.
- Legacy ambient mesh and veil are disabled for the modern skin.
- The grid must never become stronger than body text or module hairlines.

#### Content-sheet micro texture

- Pattern cell: `6px × 6px`.
- Dot radius: approximately `0.7px`, fading to transparent around `0.8px`.
- Light dot: `rgba(0, 0, 0, 0.025)`.
- Dark dot: `rgba(255, 255, 255, 0.035)`.
- This texture simulates printed paper; it must remain almost invisible at normal reading distance.

#### Wallpaper relationship

- Wallpaper is fixed and full viewport with `background-size: cover`.
- It is revealed only after Hello completes.
- Light mode inverts and softens it; dark mode keeps the original artwork.
- The centered content sheet covers it at about 96% opacity, leaving a faint printed echo without sacrificing text contrast.
- Desktop gutters may reveal the wallpaper more clearly; mobile prioritizes content readability.
- Do not add a second scenic background, animated gradient or decorative mesh above the wallpaper.

## 4. Theme palette

### Light mode

| Role | Value | Usage |
| --- | --- | --- |
| Page / paper | `#FAFAF8` | Main content sheet and large quiet areas |
| Card | `#F2F2F4` | Project, blog and timeline modules |
| Primary text | `#07142D` | Titles and body copy |
| Muted text | `#5E6876` | Metadata and supporting copy |
| Accent | `#002FA7` | Klein-blue labels, controls, focus states and folios |
| Accent bright | `#174BD0` | Small active-state emphasis only |

The dark wallpaper is transformed with:

```css
filter: invert(1) contrast(0.82) brightness(1.05);
```

This creates a near-white field, dark-gray headline and pale-gray long shadow.

### Dark mode

| Role | Value | Usage |
| --- | --- | --- |
| Page | `#0A0A0B` | Main field |
| Card | `#1C1C1E` | Raised modules |
| Primary text | `#F8FAFC` | Titles and body copy |
| Muted text | `#B6BFCC` | Metadata and supporting copy |
| Accent | `#E7E9EE` | Bright-silver labels and active states |
| Accent bright | `#FFFFFF` | Strong focus and selected states |

The original black wallpaper is shown without inversion in dark mode.

### Color exception: JAVIS data

The JAVIS evaluation area deliberately preserves semantic colors so quantitative data remains distinct from the minimal shell:

`#7C5CFF`, `#FF7A1A`, `#13B6C9`, `#2BB673`, `#E0457B`, `#3B6CFF`, `#8A6D3B`.

Do not globally force these metrics into the theme accent.

## 5. Typography

### Display typography

`VCR OSD Mono` is self-hosted at:

```text
src/assets/fonts/VCR_OSD_MONO.woff
```

Use it for:

- English hero and section titles
- English project titles
- Short labels and navigation labels
- Dates, page numbers and folio markers
- Compact metric or system headings

Do **not** use it for:

- Paragraphs or article summaries
- Chinese text
- Long descriptions
- Accessibility instructions
- Dense button copy

VCR OSD Mono is a character accent, not the body typeface.

### Supporting typography

- Modern display fallback: `Space Grotesk`
- Monospaced fallback: `Space Mono`
- Chinese UI: `Noto Sans SC`, `PingFang SC`, `Microsoft YaHei`
- Body copy: the existing readable sans-serif system stack
- Literary skin only: `Fraunces Variable` and `Noto Serif SC`

### Type hierarchy

- Hero name: oversized, short and high-contrast.
- Section headings: uppercase English where applicable, with generous surrounding space.
- Folio labels: `01 / HOME` through `06 / TIMELINE`, small VCR type and theme accent.
- Body text: moderate weight and relaxed line height; never pixel-styled.

## 6. Hello and wallpaper sequence

The entry sequence is a required part of the identity:

1. Render the supplied 500×500, 120fps, 6-second Lottie.
2. In light mode, normalize all Lottie gradient strokes to black.
3. In dark mode, normalize all Lottie gradient strokes to white.
4. Let the animation draw, hold and erase completely.
5. On the Lottie `complete` event, reveal the fixed wallpaper with an opacity/scale transition.
6. Keep the wallpaper behind the rest of the site.

Do not replace the Hello animation with the wallpaper. The wallpaper is the post-animation state.

For `prefers-reduced-motion`, skip the curtain and reveal the content/wallpaper without the long animation.

Relevant files:

- `src/components/HelloIntro.vue`
- `src/assets/hello.lottie.json`
- `src/photos/modern_wallpaper.png`
- `src/App.vue`

## 7. Page composition

### Global sheet

- Content sits inside a centered sheet with a maximum width of `76rem`.
- The sheet uses a very subtle dot/paper texture.
- Desktop side gutters reveal the fixed wallpaper.
- Content surfaces remain sufficiently opaque for text contrast.
- Corners are small and controlled; avoid a page made entirely of rounded cards.

### Module design baseline

- Standard modern modules use `--apple-card`, not translucent glass gradients.
- Default module radius is `0.25rem`; larger radii require an interaction or media reason.
- Use a single hairline to divide information groups before reaching for nested cards.
- Light-mode elevation should be barely perceptible; dark-mode modules should be distinguished mainly by surface tone.
- Module titles, dates and folios establish the editorial rhythm; body copy remains visually quiet.
- Interactive feedback may use a small lift, fill or border change, but the resting state must remain calm.

### Home

- Centered portrait, name, changing role, short introduction and icon actions.
- Wallpaper appears as a faint printed echo behind the content sheet after the Hello sequence.
- English name and role may use VCR OSD Mono; supporting sentences remain normal sans-serif.
- The hero must remain spacious and vertically balanced.

### About

The About section is an editorial profile, not a translucent paragraph card:

- Small top kicker: `PROFILE / MARC YIN` and `BACKEND × AI / 2026`.
- One large lead statement spanning the full width.
- Remaining biography is divided into numbered modules.
- Desktop uses two columns separated by hairlines.
- Mobile collapses to one column.
- Strong words provide hierarchy, but paragraphs remain readable sans-serif.

### Projects

- Project modules use quiet low-contrast surfaces and restrained borders.
- Project titles and dates may use VCR OSD Mono.
- Real screenshots, video and RAG interaction remain the primary content.
- JAVIS metric colors remain multicolor because they encode separate measures.
- Decorative color must not spread from the metrics into the entire page.

### Blog

- Blog is structured like a clean editorial index.
- Titles carry the hierarchy; metadata remains smaller and quieter.
- Klein blue or silver is reserved for actions and selected states.
- Dense card decoration, large shadows and colored gradients are not part of this direction.

### Skills and timeline

- Continue the numbered editorial sequence.
- Use thin guide lines, controlled node motion and low-contrast surfaces.
- Avoid ornamental imagery.

## 8. Motion language

Allowed motion:

- Hello stroke drawing and erasing
- Wallpaper opacity/scale reveal
- Section rise-in transitions
- Project carousel crossfade
- Small hover fills and active-state movement
- Timeline line/node reveal

Motion should use a limited set of smooth curves and should never compete with content.

Avoid:

- Continuous decorative background animation
- Unnecessary parallax
- Repeated floating objects
- Strong blur/glow entrances
- Animating body text merely for spectacle

Always provide a reduced-motion path.

## 9. Accessibility and responsive rules

- Keep visible focus outlines using the active theme accent.
- Preserve semantic headings and link/button labels.
- Do not rely on color alone for metric meaning; retain labels and values.
- Maintain readable contrast over the wallpaper by using the central sheet.
- Collapse the About grid to one column below `640px`.
- The wallpaper currently uses `cover`; verify the crop on narrow mobile screens before changing its focal position.
- The floating utility controls must remain reachable without obscuring primary content.

## 10. Implementation boundaries

When extending the site:

- Reuse existing CSS variables and components before introducing new abstractions.
- Scope modern rules with `[data-skin="glass"]`.
- Use `--klein` / `--construct-gold-strong` instead of hardcoding new accent blues.
- Keep VCR OSD Mono selectors limited to titles and labels.
- Preserve the `HelloIntro` completion event as the wallpaper trigger.
- Keep JAVIS metric colors sourced from `src/data/ragMetrics.js`.
- Do not add a new dependency for effects that CSS already supports.
- Do not redesign the real section order or replace working project interactions with static mockups.

## 11. Verification

Build gate:

```powershell
npm run build
```

Runtime regression script:

```text
scripts/verify-modern-style.py
```

The regression check verifies:

- Black Hello strokes in light mode
- White Hello strokes in dark mode
- Wallpaper completion in both themes
- Light wallpaper inversion/filter
- VCR OSD Mono loading
- Two-column About layout on desktop
- Original JAVIS metric colors
- No modern flower nodes
- No browser console errors

## 12. Primary source files

| Concern | File |
| --- | --- |
| Application shell and wallpaper state | `src/App.vue` |
| Hello behavior and theme recoloring | `src/components/HelloIntro.vue` |
| About structure | `src/components/About.vue` |
| Project presentation | `src/components/ProjectShowcase.vue` |
| JAVIS metric definitions | `src/data/ragMetrics.js` |
| Theme variables and layout styling | `src/styles/main.css` |
| VCR font | `src/assets/fonts/VCR_OSD_MONO.woff` |
| Wallpaper | `src/photos/modern_wallpaper.png` |
| Runtime regression | `scripts/verify-modern-style.py` |

This document is the reference for future visual changes to the default modern skin. If implementation and this document diverge, verify the current code and browser output first, then update this document to match the validated behavior.
