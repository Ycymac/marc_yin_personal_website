<template>
  <button
    class="flex h-[2.5rem] w-[2.5rem] items-center justify-center text-[var(--construct-muted)] transition-all hover:scale-[1.15] hover:text-[var(--construct-gold)] active:scale-105"
    type="button"
    :aria-label="skin === 'literary' ? 'Switch to modern style' : 'Switch to literary style'"
    :title="skin === 'literary' ? 'Modern' : 'Literary'"
    @click="$emit('toggle')"
  >
    <span class="sr-only">toggle visual style</span>
    <Feather v-if="skin === 'literary'" class="h-4 w-4" />
    <Gem v-else class="h-4 w-4" />
  </button>
</template>

<script setup>
import { Feather, Gem } from "lucide-vue-next"

defineProps({
  skin: {
    type: String,
    required: true,
  },
})

defineEmits(["toggle"])
</script>
