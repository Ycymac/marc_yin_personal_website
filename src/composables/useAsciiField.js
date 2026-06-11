import { onBeforeUnmount, onMounted, ref } from "vue"

// ASCII breathing field — a canvas 2D noise field where sin/cos waves
// drive character glyphs in and out, evoking an industrial instrument
// panel. Ported from the Swiss/Carbon reference deck. Colour + blend
// are theme-driven via CSS vars read at runtime, so dark mode shows
// grey particles and light mode shows Klein-blue ones.
const PALETTE = "   ...:::---+++***◦◦••▢▣"
const CELL = 16
const FONT_SIZE = 13

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

  function readParticle() {
    const cs = getComputedStyle(document.documentElement)
    return {
      base: cs.getPropertyValue("--particle").trim() || "rgba(120,120,120,.5)",
      accent:
        cs.getPropertyValue("--particle-accent").trim() ||
        cs.getPropertyValue("--particle").trim() ||
        "rgba(120,120,120,.5)",
    }
  }

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
    const mono =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--modern-mono")
        .trim() || "monospace"
    ctx.font = `500 ${FONT_SIZE}px ${mono}`
    ctx.textBaseline = "top"
    return true
  }

  function draw(t) {
    if (!ctx) return
    ctx.clearRect(0, 0, w, h)
    const { base, accent } = readParticle()
    const parse = (c) => {
      const p = c.replace(/^rgba?\(/, "").replace(/\)$/, "").split(",")
      return [p[0]?.trim(), p[1]?.trim(), p[2]?.trim()]
    }
    const [br, bg, bb] = parse(base)
    const [ar, ag, ab] = parse(accent)
    const cols = Math.ceil(w / CELL)
    const rows = Math.ceil(h / CELL)
    for (let row = 0; row < rows; row++) {
      for (let cc = 0; cc < cols; cc++) {
        const n =
          (Math.sin(cc * 0.18 + t) +
            Math.sin(row * 0.24 - t * 0.7) +
            Math.sin((cc + row) * 0.12 + t * 0.45) +
            Math.sin(
              Math.hypot(cc - cols * 0.5, row - rows * 0.5) * 0.16 - t * 0.55,
            )) /
          4
        const v = (n + 1) / 2
        if (v < 0.22) continue
        const idx = Math.min(PALETTE.length - 1, Math.floor(v * PALETTE.length))
        const ch = PALETTE[idx]
        if (ch === " ") continue
        const alpha = (0.08 + (v - 0.22) * 0.55).toFixed(3)
        // Scatter bright Klein accent into a slow-moving subset of cells.
        const accentWave =
          Math.sin(cc * 0.4 - t * 0.9) + Math.sin(row * 0.5 + t * 0.6)
        const useAccent = accentWave > 1.1
        const [r, g, b] = useAccent ? [ar, ag, ab] : [br, bg, bb]
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fillText(ch, cc * CELL, row * CELL)
      }
    }
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
      draw(0) // paint a single static frame
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
    if (reduced) {
      setup()
      draw(0)
      return
    }
    setup()
  }

  onMounted(() => {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.addEventListener("resize", onResize, { passive: true })
    start()
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize)
    stop()
  })

  return canvas
}
