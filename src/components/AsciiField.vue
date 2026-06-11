<template>
  <canvas ref="canvas" class="ascii-field" aria-hidden="true" />
</template>

<script setup>
import { useAsciiField } from "@/composables/useAsciiField"

const canvas = useAsciiField()
</script>

<style scoped>
.ascii-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
</style>
