<template>
  <a
    class="mb-20 mt-4 hidden h-8 w-8 rounded-full text-[var(--construct-gold)] transition-transform hover:scale-125 sm:block"
    href="#about"
    aria-label="Scroll to about section"
  >
    <ChevronDown class="h-8 w-8 animate-[floatArrow_1.8s_ease-in-out_infinite]" />
  </a>
</template>

<script setup>
import { ChevronDown } from "lucide-vue-next"
</script>
