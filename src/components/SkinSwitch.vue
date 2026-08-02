<template>
  <button
    class="flex h-[2.5rem] w-[2.5rem] items-center justify-center text-[var(--construct-muted)] transition-all hover:scale-[1.15] hover:text-[var(--construct-gold)] active:scale-105"
    type="button"
    :aria-label="skin === 'terminal' ? 'Switch to modern style' : 'Switch to terminal style'"
    :title="skin === 'terminal' ? 'Modern' : 'Terminal'"
    @click="$emit('toggle')"
  >
    <span class="sr-only">toggle visual style</span>
    <Terminal v-if="skin === 'terminal'" class="h-4 w-4" />
    <PenTool v-else class="h-4 w-4" />
  </button>
</template>

<script setup>
import { Terminal, PenTool } from "lucide-vue-next"

defineProps({
  skin: {
    type: String,
    required: true,
  },
})

defineEmits(["toggle"])
</script>
