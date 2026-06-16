import { computed, ref } from "vue"

// Shared hero-stage progress for the modern (glass) skin's "hello" curtain.
// 0 = curtain fully covering, 1 = lifted away (hero revealed).
// HelloIntro writes it from its scroll handler; Header/Intro read it so the
// nav stays hidden until the curtain clears and the hero can hand off smoothly.
const progress = ref(1) // default 1 so non-glass skins behave as "already revealed"

// Curtain is considered cleared a hair before 1 so the nav doesn't wait on
// sub-pixel scroll residue.
const isRevealed = computed(() => progress.value >= 0.985)

export function useHeroStage() {
  function setProgress(value) {
    progress.value = Math.min(1, Math.max(0, value))
  }
  function reset() {
    progress.value = 0
  }
  function clear() {
    progress.value = 1
  }
  return { progress, isRevealed, setProgress, reset, clear }
}
