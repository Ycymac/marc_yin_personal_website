// One-time line-art optimizer: PNG → WebP at max width 800px.
// These images are low-opacity decorations rendered at ≤480px,
// so 800px keeps them crisp on hi-dpi while shedding ~98% of weight.
// Run: node scripts/optimize-lineart.mjs
import sharp from "sharp"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { statSync } from "node:fs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dir = join(root, "src", "photos")

const files = [
  "hermes_half",
  "dancer_in_the_sky",
  "mixed_flourishing_flower",
  "rose_single",
  "writing_hand",
  "laurel_branch",
  "daisy_flower_single",
]

const kb = (p) => (statSync(p).size / 1024).toFixed(0)

for (const name of files) {
  const src = join(dir, `${name}.png`)
  const out = join(dir, `${name}.webp`)
  const before = kb(src)
  await sharp(src)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  console.log(`${name}: ${before} KB → ${kb(out)} KB (webp)`)
}

console.log("\nDone. Update CSS refs from .png to .webp, then the PNGs can be deleted.")
