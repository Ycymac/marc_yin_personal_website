---
version: "1.0"
name: marc-yin-editorial-portfolio
description: A bilingual personal portfolio that combines an Apple-like quiet product rhythm, Swiss editorial structure, and VCR OSD Mono display character. A handwritten Hello curtain opens onto a fixed monochrome long-shadow poster; the site then reads as a cool paper sheet with numbered folios, low-contrast modules, real project media, and one theme accent.
status: implemented
scope: default modern skin (`data-skin="glass"`), including light and dark themes

colors:
  light:
    canvas: "#fafaf8"
    card: "#f2f2f4"
    inner-surface: "#ffffff"
    ink: "#07142d"
    ink-muted: "#5e6876"
    accent: "#002fa7"
    accent-bright: "#174bd0"
    on-accent: "#ffffff"
    line: "rgba(7, 20, 45, 0.15)"
    grid: "rgba(7, 20, 45, 0.065)"
  dark:
    canvas: "#0a0a0b"
    card: "#1c1c1e"
    inner-surface: "#2a2a2d"
    ink: "#f8fafc"
    ink-muted: "#b6bfcc"
    accent: "#e7e9ee"
    accent-bright: "#ffffff"
    on-accent: "#0a0a0b"
    line: "rgba(248, 250, 252, 0.16)"
    grid: "rgba(248, 250, 252, 0.055)"

typography:
  hero-name:
    fontFamily: "VCR OSD Mono, Space Mono, monospace"
    fontSize: "60px / 96px"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.025em"
  section-title:
    fontFamily: "VCR OSD Mono, Space Mono, monospace"
    fontSize: 30px
    fontWeight: 400
    letterSpacing: "0.025em"
    textTransform: uppercase
  project-title:
    fontFamily: "VCR OSD Mono, Space Mono, monospace"
    fontSize: 27px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.025em"
  hero-role:
    fontFamily: "VCR OSD Mono, Space Mono, monospace"
    fontSize: "30px / 48px"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Inter, Noto Sans SC, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "16px–18px"
    fontWeight: "500–700"
    lineHeight: "1.65–2"
  mono-label:
    fontFamily: "Space Mono, VCR OSD Mono, monospace"
    fontSize: "10px–12px"
    fontWeight: "600–700"
    letterSpacing: "0.05em–0.18em"
  fine-print:
    fontFamily: "Inter, Noto Sans SC, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500

rounded:
  sheet: 0px
  editorial: 4px
  media-sm: 6px
  control: 8px
  inset: 14px
  data-card: 18px
  pill: 9999px
  circle: 50%

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section-mobile: 112px
  section-desktop: 160px

layout:
  page-max: 1216px
  hero-max: 992px
  reading-max: 928px
  project-max: 1152px
  skills-max: 848px
  ambient-grid: 48px
  paper-dots: 6px

motion:
  standard: "360ms ease"
  reveal: "720ms cubic-bezier(0.22, 1, 0.36, 1)"
  spring: "520ms cubic-bezier(0.34, 1.56, 0.64, 1)"
  wallpaper: "1100ms opacity / 1600ms scale"

components:
  hello-curtain:
    backgroundColor: "{colors.light.inner-surface} / {colors.dark.canvas}"
    height: 100svh
    artworkWidth: "min(70vw, 608px)"
  page-sheet:
    backgroundColor: "96% theme canvas"
    maxWidth: "{layout.page-max}"
    texture: "6px micro-dot"
    border: "1px inline hairline"
  section-folio:
    typography: "{typography.mono-label}"
    textColor: "theme accent"
  icon-action:
    size: 48px
    rounded: "{rounded.circle}"
    focusOutline: "2px theme accent"
  project-showcase:
    backgroundColor: "theme card"
    rounded: "{rounded.editorial}"
    padding: "40px / 26px mobile"
  metric-card:
    backgroundColor: "theme inner surface"
    rounded: "{rounded.data-card}"
  utility-dock:
    position: fixed
    placement: "right 48px / bottom 48px desktop; right 12px / bottom 20px mobile"
---

# Marc Yin Editorial Portfolio Design System

## Summary

This system is the reusable visual source of truth for the site's default modern skin. It is not a generic glassmorphism theme despite the legacy skin name `glass`.

The design combines:

1. **Apple-like restraint** — quiet surfaces, generous spacing, product-first media and controlled motion.
2. **Swiss editorial structure** — numbered folios, hairline rules, asymmetric desktop project rhythm and strict typographic roles.
3. **VCR / OSD character** — a self-hosted pixel display face used for short English identity text, never for long reading.
4. **A personal opening ritual** — the handwritten Hello animation gives way to the fixed `无可限进步` long-shadow poster.

The interface should feel precise and readable before it feels decorative.

## Design DNA

### Signature

The signature sequence is:

```text
Handwritten Hello curtain
        ↓
Fixed monochrome long-shadow wallpaper
        ↓
Centered editorial paper sheet
        ↓
01–06 numbered portfolio narrative
```

This transition is the main memorable moment. New decoration must not compete with it.

### Content order

Preserve the implemented narrative:

```text
Hello → Home → About → Projects → Blog → Skills → Timeline → Footer
```

### Primary skin and compatibility skin

- The reusable reference is the modern `glass` skin.
- `literary` is a supported compatibility skin with serif typography and a print-like treatment.
- Do not mix literary serif rules into modern modules.
- The default modern skin starts in dark theme unless a saved preference exists.

## Colors

### Light theme

| Token | Value | Use |
| --- | --- | --- |
| `{colors.light.canvas}` | `#fafaf8` | Cool neutral page sheet |
| `{colors.light.card}` | `#f2f2f4` | Project, blog and timeline modules |
| `{colors.light.inner-surface}` | `#ffffff` | Metric cells and embedded demo surfaces |
| `{colors.light.ink}` | `#07142d` | Primary copy and headings |
| `{colors.light.ink-muted}` | `#5e6876` | Metadata and secondary copy |
| `{colors.light.accent}` | `#002fa7` | Klein-blue interaction and folio color |
| `{colors.light.accent-bright}` | `#174bd0` | Small active emphasis |
| `{colors.light.line}` | `rgba(7, 20, 45, 0.15)` | Hairlines and quiet borders |

The light wallpaper uses:

```css
filter: invert(1) contrast(0.82) brightness(1.05);
```

### Dark theme

| Token | Value | Use |
| --- | --- | --- |
| `{colors.dark.canvas}` | `#0a0a0b` | Near-black page field |
| `{colors.dark.card}` | `#1c1c1e` | Primary module surface |
| `{colors.dark.inner-surface}` | `#2a2a2d` | Metric cells |
| `{colors.dark.ink}` | `#f8fafc` | Primary copy and headings |
| `{colors.dark.ink-muted}` | `#b6bfcc` | Metadata and secondary copy |
| `{colors.dark.accent}` | `#e7e9ee` | Bright-silver controls and folios |
| `{colors.dark.accent-bright}` | `#ffffff` | Focus and selected emphasis |
| `{colors.dark.line}` | `rgba(248, 250, 252, 0.16)` | Hairlines and quiet borders |

Dark mode shows the original wallpaper without inversion.

### Semantic color exception

JAVIS evaluation metrics keep their individual colors because color encodes separate measures:

```text
#7c5cff · #ff7a1a · #13b6c9 · #2bb673 · #e0457b · #3b6cff · #8a6d3b
```

Do not spread these colors into general navigation, headings or decoration.

### Color rules

- Use one interaction accent per theme.
- Use surface tone, whitespace and type scale before introducing more color.
- Keep text readable over the wallpaper through the opaque central sheet.
- Do not add generic aurora gradients, neon glow or pink floral accents to the modern skin.

## Typography

### Font roles

| Role | Family | Rule |
| --- | --- | --- |
| English identity display | `VCR OSD Mono` | Hero name, English section titles, project titles and short labels |
| Modern fallback display | `Space Grotesk` | Non-VCR headings and platform fallback |
| Technical utility | `Space Mono` | Tags, controls, dates and compact system text |
| Chinese and body copy | `Inter`, `Noto Sans SC`, `PingFang SC`, `Microsoft YaHei`, system UI | Reading text and Chinese headings |
| Literary skin only | `Fraunces Variable`, `Noto Serif SC` | Compatibility skin, never the modern default |

The self-hosted display font lives at:

```text
src/assets/fonts/VCR_OSD_MONO.woff
```

### VCR boundary

```text
VCR OSD Mono = identity, title, index, date, short label
Sans-serif    = reading, explanation, instructions, long button copy
```

If a string needs more than two short lines, it should normally not use VCR OSD Mono.

### Hierarchy

- Hero name: `60px` on mobile, `96px` from the small breakpoint.
- Hero changing role: `30px` mobile, `48px` desktop.
- Section heading: `30px`, uppercase where the English label is short.
- Project title: about `27px`, `1.15` line-height.
- Body and descriptions: `16–18px`, relaxed `1.65–2` line-height.
- Folio, period and tag text: `10–12px`, tracked and compact.
- Windows receives a weight compensation because Microsoft YaHei lacks true extra-light weights.

### Two-tone section title

Modern section titles use a text-clipped gradient from the current ink color into a restrained accent tint. This is the only accepted typographic gradient; it expresses hierarchy rather than decorating a background.

## Layout

### Layer architecture

Keep the visual stack in this order:

```text
Layer 0  Theme base color
Layer 1  Fixed long-shadow wallpaper
Layer 2  Static 48px ambient grid
Layer 3  Centered 1216px content sheet
Layer 4  6px micro-dot paper texture
Layer 5  Section content and interactive modules
Layer 6  Fixed utility dock and modal media
```

The legacy ambient veil and moving mesh are disabled in the modern skin. The grid remains static at low opacity.

### Containers

| Container | Maximum width | Use |
| --- | --- | --- |
| Page sheet | `76rem` / `1216px` | Whole modern narrative |
| Hero | `62rem` / `992px` | Centered identity block |
| Reading sections | `58rem` / `928px` | About and blog |
| Project showcase | `72rem` / `1152px` | Project modules and media |
| Skills | `53rem` / `848px` | Marquee and skill chips |

Desktop gutters reveal the fixed wallpaper. Mobile prioritizes content width and reading contrast.

### Section rhythm

- Use `112px` as the common mobile section gap.
- Use up to `160px` for spacious desktop narrative breaks.
- Use `24–48px` inside major modules.
- Use `8–16px` inside compact data groups.
- Prefer a hairline or spacing change over a nested card.

### Responsive structure

- Project copy/media changes from two columns to one at `768px`.
- Featured JAVIS content changes from demo/copy columns to one column at `768px`.
- Metric rows wrap at `768px`.
- About changes from a ruled two-column biography to one column below `640px`.
- Timeline changes from a centered two-column path to stacked cards below `640px`.
- The project focus-list asymmetry appears only from `1024px`.
- The English compatibility navigation bar widens from `640px`, but the default modern skin does not render that header.

## Elevation and Depth

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | No shadow | Dark modules, hairline sections, tags |
| Paper separation | Inline hairlines + broad low-opacity shadow | Central content sheet |
| Whisper lift | 1–2px neutral slate shadow | Resting light cards and metric cells |
| Hover lift | `translateY(-4px)` + neutral shadow | Non-featured project cards |
| Media modal | Dark veil + `blur(20px)` + deep media shadow | Expanded project video |

Depth is functional:

- the page sheet separates text from wallpaper;
- light cards receive slight physical separation;
- dark cards rely mainly on surface tone;
- blur is reserved for the video lightbox and a small number of overlay controls.

Do not turn ordinary modules into translucent glass layers.

## Shapes

### Radius grammar

| Token | Value | Use |
| --- | --- | --- |
| `{rounded.sheet}` | `0px` | Global editorial sheet |
| `{rounded.editorial}` | `4px` | Primary modern project/blog surfaces |
| `{rounded.media-sm}` | about `6px` | Inline media and miniature previews |
| `{rounded.control}` | `8px` | Compact media controls |
| `{rounded.inset}` | about `14px` | Embedded media and demo frames |
| `{rounded.data-card}` | about `18px` | Quantitative data cells |
| `{rounded.pill}` | `9999px` | Tags, carousel actions and input bars |
| `{rounded.circle}` | `50%` | Avatar, icon actions, nodes and arrow buttons |

Small rectangular geometry is the baseline. Pills and circles signal compact interaction, status or identity; they are not general content containers.

### Media geometry

- Avatar: circular crop with a white ring and one soft physical shadow.
- Main project media: `16:11` or source-preserving image frame.
- RAG carousel: `4:3`.
- Video lightbox: `16:9`, maximum `72rem`.
- Personal-site preview: `16:10` editorial miniature with grid lines.

## Components

### `hello-curtain`

A normal `100svh` opening section, not an overlay. It renders the 500×500 Lottie artwork at up to `38rem` wide.

- Light: black stroke on white.
- Dark: white stroke on near-black.
- The drawing completes, then the wallpaper fades and scales into place.
- One downward scroll, wheel, key or swipe intent snaps to the main hero.
- One upward intent near the hero returns to Hello.
- Reduced motion skips the long curtain and reveals the page immediately.

### `page-sheet`

The main content plane:

- maximum width `76rem`;
- approximately 96% theme-canvas opacity;
- 6px micro-dot paper texture;
- one-pixel inline borders;
- no outer card radius;
- broad, low-opacity separation shadow.

### `section-folio`

Each section receives an editorial marker:

```text
01 / HOME
02 / ABOUT
03 / PROJECTS
04 / BLOG
05 / SKILLS
06 / TIMELINE
```

Folios use short VCR display text, accent color and wide tracking. They are labels, not headings.

### `hero`

The hero centers:

- circular avatar and greeting emoji;
- short introduction label;
- oversized name;
- locale-aware typewriter role;
- one strong positioning sentence;
- six circular icon actions.

The modern skin intentionally has no persistent top navigation. The icon actions and natural document flow provide section access.

### `icon-action`

Circular `48×48px` action for About, Projects, Skills, Timeline, Blog and resume.

- Resting state: quiet theme-card surface.
- Hover/focus: Klein-blue or silver fill rises from below.
- Focus: 2px accent outline with 3px offset.
- Active: compact scale response.
- Icon-only actions must keep accessible labels and titles.

### `about-editorial`

About is not a card. It uses:

- a two-part profile kicker;
- one large lead statement;
- numbered biography paragraphs;
- ruled two-column layout on desktop;
- single-column reading flow on mobile.

Hairlines and text hierarchy provide structure.

### `project-showcase`

Projects are always visible in the modern skin.

- One card contains copy, media and metrics.
- Standard layout is two columns with alternating copy/media order.
- Featured JAVIS uses demo/copy on top and one horizontal metric row below.
- Real screenshots, video and the live RAG demonstration remain primary.
- Non-featured cards may lift `4px`; the interactive featured card stays still.

### `rag-demo`

An embedded light/dark chat surface with:

- user and assistant messages;
- typewriter response;
- knowledge-retrieval loading state;
- pill input bar and circular send action;
- replay control;
- inline code, quote and list treatments.

The demo uses neutral black/white message contrast rather than the global accent for every element.

### `metric-card`

A compact semantic data cell:

- white in light mode, `#2a2a2d` in dark mode;
- colored icon and value;
- neutral readable label;
- no decorative gradient;
- color must remain paired with text.

### `blog-index`

The blog section is a quiet editorial index:

- summary and account metrics at the top;
- two-column article list from `640px`;
- title-first hierarchy;
- compact tags and activity metadata;
- one accent action for opening the source blog.

### `skills-marquee`

The section has one continuous uppercase keyword rail bounded by hairlines, followed by wrapped skill chips.

- `24s` linear loop.
- Star separators use the theme accent.
- Reduced motion freezes the rail.

### `timeline`

Desktop uses a centered guide line, alternating panels, circular nodes and a scroll-drawn progress line. Mobile replaces the two-column composition with stacked cards.

Panel, node and date reveals are coordinated. Reduced motion removes those transitions and hides the animated progress overlay.

### `utility-dock`

A fixed vertical dock at the lower right contains theme, skin and language controls.

- `40×40px` icon targets inside a quiet surface.
- Desktop placement: `48px` from right and bottom.
- Mobile placement: `12px` from right, `20px` from bottom.
- Controls use hover scale and visible keyboard focus.

### `footer`

A deliberately quiet finish with:

- live site clock;
- copyright;
- one-line implementation credit;
- centered `12px` muted copy.

## Motion Language

### Allowed

- Hello stroke drawing and curtain transition.
- Wallpaper opacity/scale reveal.
- Section rise-in.
- Project card hover lift.
- RAG carousel crossfade.
- Personal-site miniature route drawing.
- Skills marquee.
- Timeline panel, node and progress reveal.
- Small control scale or one-pixel lift.

### Curves

- Standard state change: `200–360ms ease`.
- Section reveal: `560–720ms cubic-bezier(0.22, 1, 0.36, 1)`.
- Node pop: `520ms cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Wallpaper: `1100ms` opacity and `1600ms` scale.

### Avoid

- Continuous ambient mesh movement.
- Decorative parallax.
- Repeated floating objects.
- Glow-heavy entrances.
- Animating paragraphs for spectacle.

Every non-essential animation needs a `prefers-reduced-motion` path.

## Do's and Don'ts

### Do

- Use the current theme accent for actions, focus, folios and compact markers.
- Use VCR OSD Mono only for short identity text.
- Preserve the cool neutral white and near-black theme relationship.
- Prefer hairlines, whitespace and type hierarchy over nested cards.
- Keep real project media and quantitative evidence visually primary.
- Keep the central sheet opaque enough to protect reading contrast.
- Reuse existing CSS variables and components.
- Scope new modern rules with `[data-skin="glass"]`.
- Keep keyboard focus visible and icon actions labelled.

### Don't

- Do not interpret the legacy `glass` name as permission for heavy glassmorphism.
- Do not add a persistent modern header unless navigation requirements materially change.
- Do not wrap every section in a rounded card.
- Do not use VCR OSD Mono for paragraphs or Chinese body copy.
- Do not add another brand accent.
- Do not flatten semantic JAVIS metric colors into one monochrome value.
- Do not add decorative gradients, flowers, petals, neon glow or scenic layers above the wallpaper.
- Do not use heavy shadows in dark mode.
- Do not add a dependency for effects already covered by CSS or the platform.

## Responsive Behavior

| Breakpoint | Current behavior |
| --- | --- |
| `< 480px` | Personal-site miniature tightens padding; full single-column reading |
| `< 640px` | About becomes one column; timeline becomes stacked cards |
| `≥ 640px` | Hero name reaches desktop scale; blog becomes two columns |
| `< 768px` | Project and JAVIS layouts stack; metric row wraps |
| `≥ 1024px` | Project focus rows may use asymmetric left/right alignment |
| Wide desktop | Content locks at `76rem`; outer gutters reveal wallpaper |

### Touch and focus

- Hero actions are `48×48px`.
- Video close is `44×44px`.
- Utility dock buttons are `40×40px`; preserve their accessible labels and visible focus treatment.
- Do not allow the fixed dock to cover primary content on narrow screens.

## Iteration Guide

1. Identify the existing component closest to the new requirement.
2. Reuse its tokens, radius and motion before adding a variant.
3. Use `{token.refs}` from this document instead of inventing inline values.
4. Keep new VCR text short and English/Latin-oriented.
5. Check light, dark, Chinese, English and reduced-motion behavior.
6. Run the production build.
7. If implementation and this document disagree, verify the browser and current code first, then update this document.

## Implementation Boundaries

- Preserve the `HelloIntro` completion event as the wallpaper trigger.
- Preserve the default section order.
- Keep modern rules under `[data-skin="glass"]`.
- Keep `literary` behavior isolated.
- Keep JAVIS metric definitions sourced from `src/data/ragMetrics.js`.
- Do not replace working project interactions with static mockups.
- Do not introduce a shared abstraction unless at least two real consumers need it.

## Verification

Production build:

```powershell
npm run build
```

Modern-style runtime regression:

```powershell
python scripts/verify-modern-style.py
```

The runtime check covers Hello stroke color, wallpaper reveal, theme inversion, VCR loading, About layout, metric colors, absence of modern flower nodes and browser console errors.

## Primary Source Files

| Concern | File |
| --- | --- |
| Shell, default theme/skin and section order | `src/App.vue` |
| Core tokens, layout, motion and responsive styling | `src/styles/main.css` |
| Hello curtain and scroll snap | `src/components/HelloIntro.vue` |
| Hero structure and typewriter | `src/components/Intro.vue` |
| Editorial biography | `src/components/About.vue` |
| Modern project modules | `src/components/ProjectShowcase.vue` |
| Embedded RAG interaction | `src/components/RagChatDemo.vue` |
| Blog index | `src/components/BlogPreview.vue` |
| Skills marquee | `src/components/Skills.vue` |
| Timeline | `src/components/Experience.vue` |
| Fixed controls | `src/components/WidgetWrapper.vue` |
| Semantic metrics | `src/data/ragMetrics.js` |
| Display font | `src/assets/fonts/VCR_OSD_MONO.woff` |
| Wallpaper | `src/photos/modern_wallpaper.png` |
| Regression script | `scripts/verify-modern-style.py` |

## Known Gaps

- The modern skin has no persistent top navigation; if the portfolio grows beyond the current single-page narrative, navigation may need reevaluation.
- The wallpaper uses `background-size: cover`; narrow-screen focal cropping still requires visual regression checks.
- Utility-dock controls are `40px`, slightly below the common `44px` touch-target recommendation.
- `literary` is maintained for compatibility but is not fully tokenized in this document.
- Some CSS class names and comments still carry older `glass`, gold or rose-era terminology; reuse behavior and current tokens, not the legacy names.
