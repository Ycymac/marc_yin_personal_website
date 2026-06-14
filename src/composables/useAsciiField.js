import { onBeforeUnmount, onMounted, ref } from "vue"

// Pixel-art breathing field: dev terms rendered as layered arcade wordmarks
// plus a Claude crab reconstructed from reference-like pixel rectangles.
// Canvas 2D only; no images, SVGs, fonts, or CSS transforms.

// 5x7 pixel font — only the letters used by the term list below.
const FONT = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  G: ["01111", "10000", "10000", "10011", "10001", "10001", "01110"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["11111", "00010", "00010", "00010", "10010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
}

const CRAB_COLORS = {
  black: "0,0,0",
  body: "215,119,87",
  edgeLeft: "25,48,61",
  edgeRight: "54,27,30",
  line: "201,77,29",
  lineSoft: "154,118,86",
  shadow: "128,76,60",
  shadowDark: "64,36,34",
  highlight: "255,178,102",
}

const CRAB_W = 82
const CRAB_H = 57

// Reference-driven crab: an 82 x 57 design coordinate system. The visual is
// intentionally built from block rectangles because the source crab is made of
// hard horizontal and vertical pixel runs, not a symbolic icon silhouette.
const CRAB_PRIMITIVES = [
  { x: 10, y: 2, w: 62, h: 21, c: "body" },
  { x: 0, y: 25, w: 82, h: 10, c: "body" },
  { x: 6, y: 35, w: 70, h: 1, c: "shadow" },
  { x: 10, y: 36, w: 62, h: 10, c: "body" },

  { x: 10, y: 2, w: 1, h: 21, c: "edgeLeft" },
  { x: 11, y: 2, w: 1, h: 21, c: "lineSoft" },
  { x: 70, y: 2, w: 1, h: 21, c: "line" },
  { x: 71, y: 2, w: 1, h: 21, c: "edgeRight" },

  { x: 0, y: 25, w: 1, h: 10, c: "edgeLeft" },
  { x: 1, y: 25, w: 1, h: 10, c: "lineSoft" },
  { x: 80, y: 25, w: 1, h: 10, c: "line" },
  { x: 81, y: 25, w: 1, h: 10, c: "edgeRight" },

  { x: 10, y: 36, w: 1, h: 10, c: "edgeLeft" },
  { x: 11, y: 36, w: 1, h: 10, c: "lineSoft" },
  { x: 70, y: 36, w: 1, h: 10, c: "line" },
  { x: 71, y: 36, w: 1, h: 10, c: "edgeRight" },

  { x: 12, y: 4, w: 56, h: 3, c: "highlight" },
  { x: 2, y: 26, w: 78, h: 2, c: "highlight" },
  { x: 12, y: 37, w: 56, h: 2, c: "highlight" },

  { x: 0, y: 24, w: 6, h: 1, c: "shadow" },
  { x: 76, y: 24, w: 6, h: 1, c: "shadow" },

  { x: 16, y: 46, w: 6, h: 11, c: "shadow" },
  { x: 26, y: 46, w: 6, h: 11, c: "shadow" },
  { x: 50, y: 46, w: 6, h: 11, c: "shadow" },
  { x: 60, y: 46, w: 6, h: 11, c: "shadow" },
  { x: 21, y: 46, w: 1, h: 11, c: "shadowDark" },
  { x: 31, y: 46, w: 1, h: 11, c: "shadowDark" },
  { x: 55, y: 46, w: 1, h: 11, c: "shadowDark" },
  { x: 65, y: 46, w: 1, h: 11, c: "shadowDark" },
]

const CRAB_STRIPES = [15, 25, 35, 45, 55, 65]
const CRAB_EYES = [
  { x: 24, y: 8, w: 6, h: 11, c: "black" },
  { x: 52, y: 8, w: 6, h: 11, c: "black" },
]
// Dev-term layout. x/y are fractions of the canvas; size = pixel block (px);
// colour = fixed rgb string for this keyword (no longer theme-shared).
const TERMS = [
  { text: "BACKEND", x: 0.05, y: 0.1, size: 8, color: "255,214,64" },      // bright yellow
  { text: "JAVA", x: 0.72, y: 0.08, size: 10, color: "91,123,255" },       // Klein blue
  { text: "SPRING", x: 0.42, y: 0.26, size: 8, color: "120,224,143" },     // jade green
  { text: "AGENT", x: 0.08, y: 0.42, size: 11, color: "198,164,255" },     // lavender
  { text: "CODEX", x: 0.68, y: 0.4, size: 8, color: "255,150,200" },       // sakura pink
  { text: "CLAUDE CODE", x: 0.28, y: 0.62, size: 8, color: "91,123,255" }, // Klein blue
  { text: "VIBE-CODING", x: 0.06, y: 0.82, size: 7, color: "120,224,143" },// jade green
  { text: "C", x: 0.79, y: 0.66, size: 16, color: "255,214,64" },          // bright yellow
]
// A single Claude crab as the orange centrepiece mascot.
const CRABS = [{ x: 0.48, y: 0.41, size: 2 }]

const glyphCache = new Map()

export function useAsciiField() {
  const canvas = ref(null)

  let ctx = null
  let dpr = 1
  let w = 0
  let h = 0
  let raf = 0
  let t0 = 0
  let running = false
  let reduced = false
  let hoveredTerm = -1
  const pointer = { active: false, x: -1, y: -1 }

  function setup() {
    const c = canvas.value
    if (!c) return false
    const rect = c.getBoundingClientRect()
    if (rect.width < 4 || rect.height < 4) return false
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = Math.round(rect.width * dpr)
    c.height = Math.round(rect.height * dpr)
    w = rect.width
    h = rect.height
    ctx = c.getContext("2d")
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = false // crisp pixels, no anti-aliasing
    return true
  }

  function toRgb(rgb) {
    return rgb.split(",").map(Number)
  }

  function mixRgb(a, b, amount) {
    const ar = Array.isArray(a) ? a : toRgb(a)
    const br = Array.isArray(b) ? b : toRgb(b)
    return ar.map((v, i) => Math.round(v + (br[i] - v) * amount)).join(",")
  }

  function chunkyGlyph(ch) {
    const key = ch.toUpperCase()
    if (glyphCache.has(key)) return glyphCache.get(key)

    const source = FONT[key] || FONT[" "]
    const rows = []
    source.forEach((row) => {
      let a = ""
      let b = ""
      for (const cell of row) {
        a += cell === "1" ? "11" : "00"
        b += cell === "1" ? "11" : "00"
      }
      rows.push(a)
      rows.push(b)
    })

    glyphCache.set(key, rows)
    return rows
  }

  function glyphUnits(block) {
    return {
      unitX: Math.max(2, Math.round(block * 0.78)),
      unitY: Math.max(2, Math.round(block * 0.62)),
    }
  }

  function measureWord(text, block) {
    const { unitX, unitY } = glyphUnits(block)
    let width = 0
    let height = 0

    for (const ch of text) {
      if (ch === " ") {
        width += Math.max(8, Math.round(block * 4.8))
        continue
      }
      const rows = chunkyGlyph(ch)
      width += rows[0].length * unitX + Math.max(2, Math.round(unitX * 1.7))
      height = Math.max(height, rows.length * unitY)
    }

    return { width, height }
  }

  function termBounds(term) {
    const x = term.x * w
    const y = term.y * h
    const { width, height } = measureWord(term.text, term.size)
    const margin = Math.max(8, Math.round(term.size * 2.4))
    return {
      left: x - margin,
      top: y - margin,
      right: x + width + margin,
      bottom: y + height + margin,
    }
  }

  function findHoveredTerm() {
    if (!pointer.active) return -1
    for (let i = TERMS.length - 1; i >= 0; i--) {
      const b = termBounds(TERMS[i])
      if (
        pointer.x >= b.left &&
        pointer.x <= b.right &&
        pointer.y >= b.top &&
        pointer.y <= b.bottom
      ) {
        return i
      }
    }
    return -1
  }

  function updateHoveredTerm() {
    hoveredTerm = findHoveredTerm()
    if (reduced) draw(0)
  }

  function fillMask(rows, x0, y0, unitX, unitY, rgb, alpha, expand = 0, offsetX = 0, offsetY = 0) {
    ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y]
      for (let x = 0; x < row.length; x++) {
        if (row[x] !== "1") continue
        ctx.fillRect(
          Math.round(x0 + offsetX + x * unitX - expand),
          Math.round(y0 + offsetY + y * unitY - expand),
          Math.ceil(unitX + expand * 2),
          Math.ceil(unitY + expand * 2),
        )
      }
    }
  }

  function fillMaskRows(rows, x0, y0, unitX, unitY, rgb, alpha, offsetX, offsetY, shouldDrawRow) {
    ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`
    for (let y = 0; y < rows.length; y++) {
      if (!shouldDrawRow(y)) continue
      const row = rows[y]
      for (let x = 0; x < row.length; x++) {
        if (row[x] !== "1") continue
        ctx.fillRect(
          Math.round(x0 + offsetX + x * unitX),
          Math.round(y0 + offsetY + y * unitY),
          Math.ceil(unitX + 0.25),
          Math.ceil(unitY + 0.25),
        )
      }
    }
  }

  function fillGlyphBody(rows, x0, y0, unitX, unitY, rgb, glow, pulse) {
    const lowerStart = Math.floor(rows.length * 0.62)
    const top = mixRgb(rgb, "255,255,255", 0.22)
    const bottom = mixRgb(rgb, "148,78,36", 0.45)
    const shade = mixRgb(rgb, "188,103,39", 0.64)

    for (let y = 0; y < rows.length; y++) {
      const row = rows[y]
      const f = rows.length > 1 ? y / (rows.length - 1) : 0
      const fill = y >= lowerStart ? shade : mixRgb(top, bottom, f * 0.62)
      ctx.fillStyle = `rgba(${fill},${(0.38 + 0.62 * glow * pulse).toFixed(3)})`
      for (let x = 0; x < row.length; x++) {
        if (row[x] !== "1") continue
        ctx.fillRect(
          Math.round(x0 + x * unitX),
          Math.round(y0 + y * unitY),
          Math.ceil(unitX + 0.25),
          Math.ceil(unitY + 0.25),
        )
      }
    }
  }

  function drawGlyphInline(rows, x0, y0, unitX, unitY, alpha) {
    const lineW = Math.max(1, Math.round(unitX * 0.18))
    const lineH = Math.max(1, Math.round(unitY * 0.18))
    ctx.fillStyle = `rgba(5,6,10,${alpha.toFixed(3)})`

    for (let y = 1; y < rows.length - 1; y++) {
      const row = rows[y]
      for (let x = 1; x < row.length - 1; x++) {
        if (row[x] !== "1") continue
        if (row[x - 1] === "1" && row[x + 1] === "1" && (x + y) % 4 === 0) {
          ctx.fillRect(
            Math.round(x0 + x * unitX),
            Math.round(y0 + y * unitY + unitY * 0.12),
            lineW,
            Math.max(1, Math.round(unitY * 0.76)),
          )
        }
        if (rows[y - 1][x] === "1" && rows[y + 1][x] === "1" && (x * 2 + y) % 7 === 0) {
          ctx.fillRect(
            Math.round(x0 + x * unitX + unitX * 0.16),
            Math.round(y0 + y * unitY),
            Math.max(1, Math.round(unitX * 0.68)),
            lineH,
          )
        }
      }
    }
  }

  function drawErrorGlitch(rows, x0, y0, unitX, unitY, rgb, intensity, seed, darkMode) {
    if (intensity <= 0.04) return

    const flash = darkMode ? "248,251,255" : "255,255,255"
    const cyan = darkMode ? "104,222,255" : "0,94,255"
    const magenta = darkMode ? "255,139,224" : "217,48,132"
    const bodyFlash = mixRgb(rgb, flash, 0.72)
    const rowA = Math.abs(Math.floor(seed * 13)) % rows.length
    const rowB = (rowA + 4 + Math.floor(seed * 3)) % rows.length
    const rowC = (rowA + 9) % rows.length
    const split = Math.max(1, Math.round(unitX * (0.7 + intensity * 1.25)))
    const jump = Math.max(1, Math.round(unitY * 0.45))

    fillMask(rows, x0, y0, unitX, unitY, bodyFlash, 0.12 + intensity * 0.38, 0)

    fillMaskRows(
      rows,
      x0,
      y0,
      unitX,
      unitY,
      cyan,
      0.28 + intensity * 0.34,
      -split,
      -jump,
      (y) => y === rowA || y === rowA + 1 || (y + rowA) % 7 === 0,
    )
    fillMaskRows(
      rows,
      x0,
      y0,
      unitX,
      unitY,
      magenta,
      0.24 + intensity * 0.3,
      split,
      jump,
      (y) => y === rowB || y === rowC || (y + rowB) % 9 === 0,
    )
    fillMaskRows(
      rows,
      x0,
      y0,
      unitX,
      unitY,
      flash,
      0.18 + intensity * 0.42,
      Math.round(split * 0.55),
      0,
      (y) => y === rowA || y === rowB || y === rowC,
    )
  }

  function drawLayeredGlyph(ch, px, py, block, rgb, glow, seed, darkMode, glitch) {
    const rows = chunkyGlyph(ch)
    const { unitX, unitY } = glyphUnits(block)
    const x0 = Math.round(px)
    const y0 = Math.round(py)
    const pulse = 0.9 + 0.1 * Math.sin(seed * 1.9 + glow * Math.PI * 2)
    const outline = Math.max(1, Math.round(Math.min(unitX, unitY) * 0.34))
    const shadow = Math.max(2, Math.round(unitX * 0.92))
    const frame = Math.max(1, Math.round(unitX * 0.46))
    const dark = darkMode ? "238,242,255" : "7,8,12"
    const cast = darkMode ? "152,174,255" : "92,48,24"

    fillMask(rows, x0, y0, unitX, unitY, cast, (darkMode ? 0.24 : 0.38) * glow, 0, shadow, shadow)
    fillMask(rows, x0, y0, unitX, unitY, dark, (darkMode ? 0.34 : 0.64) * glow, 0, frame, frame)
    fillMask(rows, x0, y0, unitX, unitY, "0,0,0", 0.72 * glow, outline)
    fillGlyphBody(rows, x0, y0, unitX, unitY, rgb, glow, pulse)
    drawGlyphInline(rows, x0, y0, unitX, unitY, 0.24 + 0.28 * glow)
    drawErrorGlitch(rows, x0, y0, unitX, unitY, rgb, glitch, seed, darkMode)

    return rows[0].length * unitX + Math.max(2, Math.round(unitX * 1.7))
  }

  function drawLayeredWord(text, px, py, block, rgb, glow, seed, darkMode, glitch) {
    let cx = Math.round(px)
    const y0 = Math.round(py)
    for (let i = 0; i < text.length; i++) {
      const ch = text[i]
      if (ch === " ") {
        cx += Math.max(8, Math.round(block * 4.8))
        continue
      }
      cx += drawLayeredGlyph(ch, cx, y0, block, rgb, glow, seed + i, darkMode, glitch)
    }
  }

  function drawCrabRect(rect, x0, y0, scale, alpha) {
    const rgb = CRAB_COLORS[rect.c]
    if (!rgb) return
    ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`
    ctx.fillRect(
      Math.round(x0 + rect.x * scale),
      Math.round(y0 + rect.y * scale),
      Math.ceil(rect.w * scale),
      Math.ceil(rect.h * scale),
    )
  }

  function drawCrab(px, py, scale, glow) {
    const s = Math.max(1, Math.round(scale))
    const x0 = Math.round(px)
    const y0 = Math.round(py)
    const alpha = 0.42 + 0.58 * glow

    CRAB_PRIMITIVES.forEach((rect) => drawCrabRect(rect, x0, y0, s, alpha))

    CRAB_STRIPES.forEach((x) => {
      drawCrabRect({ x, y: 2, w: 1, h: 21, c: "line" }, x0, y0, s, alpha)
      drawCrabRect({ x: x + 1, y: 2, w: 1, h: 21, c: "lineSoft" }, x0, y0, s, alpha)
      drawCrabRect({ x, y: 25, w: 1, h: 10, c: "line" }, x0, y0, s, alpha)
      drawCrabRect({ x: x + 1, y: 25, w: 1, h: 10, c: "lineSoft" }, x0, y0, s, alpha)
      drawCrabRect({ x, y: 36, w: 1, h: 10, c: "line" }, x0, y0, s, alpha)
      drawCrabRect({ x: x + 1, y: 36, w: 1, h: 10, c: "lineSoft" }, x0, y0, s, alpha)
    })

    CRAB_EYES.forEach((eye) => drawCrabRect(eye, x0, y0, s, Math.min(1, alpha + 0.18)))
  }

  // Firefly flicker: each element pulses on its own phase + frequency, so
  // they blink independently rather than in a single travelling wave. The
  // amplitude is gentle (never fully dark) so colours don't strobe.
  function firefly(seed, t) {
    const freq = 0.5 + (seed % 7) * 0.16
    const phase = seed * 1.7
    const a = Math.sin(t * freq + phase)
    const b = Math.sin(t * (freq * 0.43) + phase * 2.1)
    return Math.max(0.35, (a * 0.6 + b * 0.4) * 0.32 + 0.68)
  }

  function wordBreath(seed, t) {
    const freq = 0.72 + (seed % 5) * 0.14
    const phase = seed * 1.33
    const a = Math.sin(t * freq + phase)
    const b = Math.sin(t * (freq * 0.51) + phase * 2.4)
    const v = (a * 0.72 + b * 0.28) * 0.5 + 0.5
    return 0.18 + 0.82 * v
  }

  function hoverErrorFlicker(seed, t) {
    const pulse = Math.sin(t * (38 + seed * 0.6) + seed * 3.2) * 0.5 + 0.5
    const scan = Math.sin(t * (12 + seed * 0.23) + seed * 1.1) * 0.5 + 0.5
    return Math.min(1, 0.5 + Math.max(pulse, scan) * 0.5)
  }

  function draw(t) {
    if (!ctx) return
    ctx.clearRect(0, 0, w, h)
    const darkMode = document.documentElement.classList.contains("dark")
    TERMS.forEach((term, i) => {
      // Stagger by index so neighbouring terms breathe out of phase.
      const isHovered = hoveredTerm === i
      const glow = Math.min(1, wordBreath(i * 2 + 1, t) + (isHovered ? 0.18 : 0))
      const hoverGlitch = isHovered && !reduced ? hoverErrorFlicker(i * 5 + 7, t) : 0
      drawLayeredWord(
        term.text,
        term.x * w,
        term.y * h,
        term.size,
        term.color,
        glow,
        i + t,
        darkMode,
        hoverGlitch,
      )
    })
    CRABS.forEach((crab, i) => {
      const glow = firefly(i + 13, t)
      drawCrab(crab.x * w, crab.y * h, crab.size, glow)
    })
  }

  function tick(now) {
    if (!running || reduced) {
      raf = 0
      return
    }
    const t = ((now - t0) / 1000) * 0.55
    draw(t)
    raf = requestAnimationFrame(tick)
  }

  function start() {
    if (running) return
    if (!setup()) return
    if (reduced) {
      draw(0)
      return
    }
    t0 = performance.now()
    running = true
    raf = requestAnimationFrame(tick)
  }

  function stop() {
    running = false
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    if (ctx) ctx.clearRect(0, 0, w, h)
  }

  function onResize() {
    setup()
    updateHoveredTerm()
    if (reduced) draw(0)
  }

  function onPointerMove(event) {
    const rect = canvas.value?.getBoundingClientRect()
    if (!rect) return
    pointer.x = event.clientX - rect.left
    pointer.y = event.clientY - rect.top
    pointer.active =
      pointer.x >= 0 &&
      pointer.x <= rect.width &&
      pointer.y >= 0 &&
      pointer.y <= rect.height
    updateHoveredTerm()
  }

  function onPointerLeave() {
    pointer.active = false
    hoveredTerm = -1
    if (reduced) draw(0)
  }

  onMounted(() => {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.addEventListener("resize", onResize, { passive: true })
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("blur", onPointerLeave)
    document.addEventListener("pointerleave", onPointerLeave)
    start()
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize)
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("blur", onPointerLeave)
    document.removeEventListener("pointerleave", onPointerLeave)
    stop()
  })

  return canvas
}
