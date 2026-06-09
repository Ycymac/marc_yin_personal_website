<template>
  <footer class="relative z-10 mb-10 px-4 text-center text-[var(--construct-muted)]">
    <div class="mb-3 flex justify-center">
      <SiteClock />
    </div>
    <small class="mb-2 block text-xs">
      &copy; 2026 Marc. All rights reserved.
    </small>
    <p class="text-xs">
      <span class="font-semibold">About this website:</span>
      built with Vue 3, Vite, Tailwind CSS, and Codex-assisted iteration.
    </p>
  </footer>
</template>

<script setup>
import SiteClock from "./SiteClock.vue"
</script>
