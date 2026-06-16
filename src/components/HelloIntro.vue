<template>
  <section
    v-if="active"
    ref="stageRef"
    class="hello-stage"
    aria-hidden="true"
  >
    <div ref="lottieRef" class="hello-stage__art" />
    <div class="hello-stage__hint" :style="{ opacity: hintOpacity }">
      <span class="hello-stage__hint-text">{{ hint }}</span>
      <span class="hello-stage__hint-arrow" />
    </div>
  </section>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import animationData from "@/assets/hello.lottie.json"
import { useHeroStage } from "@/composables/useHeroStage"

const skin = inject("skin")
const { locale } = useI18n()
const { progress, setProgress, reset, clear } = useHeroStage()

const stageRef = ref(null)
const lottieRef = ref(null)
const active = ref(true)
let anim = null
let reduced = false
let ticking = false

// Only the modern skin shows the hello curtain.
const isGlass = computed(() => skin?.value === "glass")
const hint = computed(() => (locale.value === "zh" ? "向下滚动" : "Scroll"))
const hintOpacity = computed(() => Math.max(0, 1 - progress.value * 2.4))

function computeProgress() {
  const span = window.innerHeight * 0.72
  const p = span > 0 ? window.scrollY / span : 1
  setProgress(Math.min(1, Math.max(0, p)))
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(computeProgress)
}

// One-shot snap: a single downward intent in the hello stage animates the
// page straight to the intro (and a single upward intent at the intro top
// returns to hello) — no pixel-by-pixel scrolling through the curtain.
let snapping = false
let snapTimer = 0

function stageHeight() {
  return stageRef.value?.offsetHeight || window.innerHeight
}

function snapTo(top) {
  snapping = true
  window.clearTimeout(snapTimer)
  window.scrollTo({ top, behavior: "smooth" })
  // Release the guard once the smooth scroll has settled.
  snapTimer = window.setTimeout(() => {
    snapping = false
  }, 760)
}

function maybeSnap(direction) {
  if (!active.value || reduced || snapping) return false
  const h = stageHeight()
  const y = window.scrollY
  if (direction > 0 && y < h - 8) {
    snapTo(h) // down → intro
    return true
  }
  if (direction < 0 && y > 4 && y < h * 1.4) {
    snapTo(0) // up (near intro top) → hello
    return true
  }
  return false
}

function onWheel(event) {
  if (Math.abs(event.deltaY) < 4) return
  if (maybeSnap(Math.sign(event.deltaY))) event.preventDefault()
}

function onKeydown(event) {
  const down = ["ArrowDown", "PageDown", " ", "Spacebar"].includes(event.key)
  const up = ["ArrowUp", "PageUp"].includes(event.key)
  if (!down && !up) return
  if (maybeSnap(down ? 1 : -1)) event.preventDefault()
}

let touchStartY = null
function onTouchStart(event) {
  touchStartY = event.touches[0]?.clientY ?? null
}
function onTouchMove(event) {
  if (touchStartY === null) return
  const dy = touchStartY - (event.touches[0]?.clientY ?? touchStartY)
  if (Math.abs(dy) < 24) return
  if (maybeSnap(Math.sign(dy))) {
    event.preventDefault()
    touchStartY = null
  }
}

async function mountLottie() {
  if (anim || !lottieRef.value) return
  const lottie = (await import("lottie-web")).default
  // Strip the baked black background layer — the CSS stage provides it,
  // so the rainbow floats full-bleed over the curtain.
  const data = JSON.parse(JSON.stringify(animationData))
  data.layers = data.layers.filter((l) => l.nm !== "background")
  anim = lottie.loadAnimation({
    container: lottieRef.value,
    renderer: "svg",
    loop: false,
    autoplay: !reduced,
    animationData: data,
  })
  if (reduced) anim.goToAndStop(data.op - 1, true)
}

function teardownLottie() {
  anim?.destroy()
  anim = null
}

watch(isGlass, (glass) => {
  active.value = glass
  if (glass) {
    reset()
    window.scrollTo({ top: 0 })
    requestAnimationFrame(mountLottie)
  } else {
    clear() // non-glass: hero is always revealed, nav always visible
    teardownLottie()
  }
})

onMounted(() => {
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  active.value = isGlass.value
  if (active.value) {
    if (reduced) {
      // Reduced motion: skip the curtain entirely, reveal hero + nav at once.
      clear()
    } else {
      reset()
      mountLottie()
      computeProgress()
    }
  } else {
    clear()
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })
  window.addEventListener("wheel", onWheel, { passive: false })
  window.addEventListener("keydown", onKeydown)
  window.addEventListener("touchstart", onTouchStart, { passive: true })
  window.addEventListener("touchmove", onTouchMove, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
  window.removeEventListener("wheel", onWheel)
  window.removeEventListener("keydown", onKeydown)
  window.removeEventListener("touchstart", onTouchStart)
  window.removeEventListener("touchmove", onTouchMove)
  window.clearTimeout(snapTimer)
  teardownLottie()
})
</script>
