import { onBeforeUnmount, onMounted, ref } from "vue"

// Magnetic hover: the target eases toward the cursor while hovered,
// then springs back on leave. Disabled when the user prefers reduced
// motion, or on coarse (touch) pointers where it has no meaning.
export function useMagnetic(strength = 0.35) {
  const target = ref(null)

  let enabled = true
  let frame = 0

  function onMove(event) {
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    })
  }

  function onLeave() {
    const el = target.value
    if (!el) return
    cancelAnimationFrame(frame)
    el.style.transform = "translate(0, 0)"
  }

  onMounted(() => {
    const el = target.value
    if (!el) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduced || coarse) {
      enabled = false
      return
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
  })

  onBeforeUnmount(() => {
    const el = target.value
    if (!el || !enabled) return
    el.removeEventListener("pointermove", onMove)
    el.removeEventListener("pointerleave", onLeave)
    cancelAnimationFrame(frame)
  })

  return target
}
