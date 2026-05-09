import { onBeforeUnmount, onMounted, ref } from "vue"

export function useSectionObserver(sectionName, threshold = 0.75, onVisible) {
  const target = ref(null)
  let observer

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible?.(sectionName)
        }
      },
      { threshold },
    )

    observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return target
}

export function useObservedSection(
  sectionName,
  onVisible,
  activeThreshold = 0.75,
  revealThreshold = 0.15,
) {
  const target = ref(null)
  const isVisible = ref(false)
  let activeObserver
  let revealObserver

  onMounted(() => {
    if (!target.value) return

    activeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible?.(sectionName)
        }
      },
      { threshold: activeThreshold },
    )

    revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          revealObserver?.disconnect()
        }
      },
      { threshold: revealThreshold },
    )

    activeObserver.observe(target.value)
    revealObserver.observe(target.value)
  })

  onBeforeUnmount(() => {
    activeObserver?.disconnect()
    revealObserver?.disconnect()
  })

  return { target, isVisible }
}

export function useReveal(threshold = 0.18) {
  const target = ref(null)
  const isVisible = ref(false)
  let observer

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { target, isVisible }
}
