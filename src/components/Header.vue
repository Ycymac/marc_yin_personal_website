<template>
  <header class="relative z-[999]">
    <div
      class="fixed left-1/2 top-0 h-[4.5rem] w-full -translate-x-1/2 rounded-none border border-white/60 bg-white/60 shadow-lg shadow-black/[0.04] backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-black/20 sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
    />
    <nav
      class="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-auto sm:py-0"
    >
      <ul
        class="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-bold text-slate-500 sm:w-auto sm:flex-nowrap sm:gap-4 dark:text-white/60"
      >
        <li
          v-for="link in links"
          :key="link.hash"
          class="relative flex h-3/4 items-center justify-center break-keep"
        >
          <a
            :href="link.hash"
            class="relative flex w-full items-center justify-center px-3 py-3 transition hover:text-slate-950 dark:hover:text-white"
            :class="{
              'text-slate-950 dark:text-white': activeSection === link.name,
            }"
            @click="handleClick(link)"
          >
            {{ labelFor(link.name) }}
            <span
              v-if="activeSection === link.name"
              class="absolute inset-0 -z-10 rounded-full bg-slate-900/10 transition-all dark:bg-white/10"
            />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { links, headerLanguageMap } from "@/data/portfolio"

const props = defineProps({
  activeSection: {
    type: String,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["navigate"])

function labelFor(name) {
  return props.locale === "zh" ? headerLanguageMap[name] : name
}

function handleClick(link) {
  emit("navigate", link.name)
}
</script>
