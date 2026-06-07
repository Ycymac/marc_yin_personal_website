<template>
  <button
    class="flex h-[2.5rem] w-[2.5rem] items-center justify-center gap-1 text-[var(--construct-muted)] transition-all hover:text-[var(--construct-gold)]"
    type="button"
    @click="$emit('toggle')"
  >
    <span class="sr-only">Change Language</span>
    <span class="text-sm font-black transition-all hover:scale-[1.15] active:scale-105">
      {{ locale === "en" ? "EN" : "ZH" }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  locale: {
    type: String,
    required: true,
  },
})

defineEmits(["toggle"])
</script>
