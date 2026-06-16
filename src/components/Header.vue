<template>
  <header class="site-header relative z-[999]" :class="{ 'is-hidden': !isRevealed }">
    <div
      class="site-nav-construct fixed left-1/2 top-2 h-[4.5rem] w-[calc(100%-1rem)] -translate-x-1/2 transition-all duration-500 sm:top-6 sm:h-[3.25rem] sm:w-[36rem]"
    />
    <nav
      class="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-auto sm:py-0"
    >
      <ul
        class="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-bold sm:w-auto sm:flex-nowrap sm:gap-4"
      >
        <li
          v-for="link in links"
          :key="link.hash"
          class="relative flex h-3/4 items-center justify-center break-keep"
        >
          <a
            :href="link.hash"
            class="nav-link-construct relative flex w-full items-center justify-center px-3 py-3 transition"
            :class="{
              'is-active': activeSection === link.name,
            }"
            @click="handleClick(link)"
          >
            {{ labelFor(link.name) }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { links, headerLanguageMap } from "@/data/portfolio"
import { useHeroStage } from "@/composables/useHeroStage"

const { isRevealed } = useHeroStage()

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
