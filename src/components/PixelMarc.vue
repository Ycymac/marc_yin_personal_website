<template>
  <canvas ref="canvasRef" class="pixel-marc" aria-label="MARC" role="img" />
</template>

<script setup>
import { onMounted, ref, watch } from "vue"

const props = defineProps({
  color: { type: String, default: "#00853e" },
  pixel: { type: Number, default: 4 },
})

const canvasRef = ref(null)

// "MARC" drawn as a 5×4 glyph block matrix (1 = filled, 0 = empty),
// using a 5×6 pixel-per-glyph font. Rows align perfectly since every
// glyph occupies the same fixed grid — no font metrics involved.
const GLYPHS = {
  M: [
    "10001",
    "11001",
    "10101",
    "10011",
    "10001",
    "10001",
  ],
  A: [
    "01110",
    "10001",
    "10001",
    "11111",
    "10001",
    "10001",
  ],
  R: [
    "11110",
    "10001",
    "10001",
    "11110",
    "10100",
    "10001",
  ],
  C: [
    "01111",
    "10000",
    "10000",
    "10000",
    "10000",
    "01111",
  ],
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const chars = "MARC"
  const glyphW = 5
  const glyphH = 6
  const spacing = 1 // 1 blank column between letters
  const totalW = chars.length * glyphW + (chars.length - 1) * spacing
  const totalH = glyphH
  const scale = props.pixel

  canvas.width = totalW * scale
  canvas.height = totalH * scale

  const ctx = canvas.getContext("2d")
  ctx.imageSmoothingEnabled = false
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = props.color
  chars.split("").forEach((ch, gi) => {
    const rows = GLYPHS[ch]
    rows.forEach((row, y) => {
      for (let x = 0; x < glyphW; x++) {
        if (row[x] === "1") {
          ctx.fillRect(
            (gi * (glyphW + spacing) + x) * scale,
            y * scale,
            scale,
            scale,
          )
        }
      }
    })
  })
}

onMounted(draw)
watch(() => [props.color, props.pixel], draw)
</script>

<style scoped>
.pixel-marc {
  display: block;
  image-rendering: pixelated;
  width: auto;
  height: auto;
  max-width: 100%;
}
</style>
