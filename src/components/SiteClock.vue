<template>
  <div v-if="skin === 'glass'" class="site-clock" aria-hidden="true">
    <span class="site-clock__dot" />
    <span class="site-clock__time">{{ time }}</span>
    <span class="site-clock__zone">CST</span>
  </div>
</template>

<script setup>
import { inject, onBeforeUnmount, onMounted, ref } from "vue"

const skin = inject("skin")
const time = ref("00:00")
let timer

function tick() {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")
  time.value = `${hh}:${mm}`
}

onMounted(() => {
  tick()
  timer = window.setInterval(tick, 10000)
})

onBeforeUnmount(() => window.clearInterval(timer))
</script>

<style scoped>
.site-clock {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--modern-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--construct-muted);
}

.site-clock__dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 999px;
  background: var(--construct-gold-strong);
  animation: clockPulse 2s ease-in-out infinite;
}

.site-clock__zone {
  opacity: 0.7;
}

@keyframes clockPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
