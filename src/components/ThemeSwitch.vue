<template>
  <button
    class="flex h-[2.5rem] w-[2.5rem] items-center justify-center text-[var(--construct-muted)] transition-all hover:scale-[1.15] hover:text-[var(--construct-gold)] active:scale-105"
    type="button"
    @click="$emit('toggle')"
  >
    <span class="sr-only">change dark mode</span>
    <Sun v-if="theme === 'light'" class="h-4 w-4" />
    <Moon v-else class="h-4 w-4" />
  </button>
</template>

<script setup>
import { Moon, Sun } from "lucide-vue-next"

defineProps({
  theme: {
    type: String,
    required: true,
  },
})

defineEmits(["toggle"])
</script>
