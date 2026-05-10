<template>
  <div
    ref="target"
    class="group mb-6 transition-all duration-700 ease-out last:mb-0 sm:mb-8"
    :class="isVisible ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-60'"
  >
    <section
      class="relative grid max-w-[58rem] overflow-hidden rounded-lg border border-white/60 bg-white/70 shadow-xl shadow-slate-950/5 backdrop-blur-xl transition dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-black/20 md:grid-cols-[0.95fr_1.05fr]"
    >
      <div class="flex h-full flex-col items-start gap-4 px-6 py-7 sm:px-8 sm:py-9">
        <img
          :src="project.iconUrl || project.imageUrl"
          :alt="`${title} icon`"
          class="h-14 w-14 rounded-2xl object-cover shadow-lg shadow-slate-950/10 ring-1 ring-black/5 dark:ring-white/15"
          loading="lazy"
        />

        <div>
          <h3 class="text-2xl font-black tracking-normal text-slate-950 dark:text-white">
            {{ title }}
          </h3>
          <p class="mt-3 leading-relaxed text-slate-700 dark:text-white/70">
            {{ description }}
          </p>
        </div>

        <ul class="mt-auto flex flex-wrap gap-2">
          <li
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full bg-slate-950 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white dark:bg-white/15 dark:text-white/80"
          >
            {{ tag }}
          </li>
        </ul>
      </div>

      <div class="relative min-h-[16rem] overflow-hidden bg-slate-950/5 dark:bg-slate-950/30">
        <video
          v-if="project.videoUrl"
          :src="project.videoUrl"
          :poster="project.gallery?.[0] || project.imageUrl"
          class="h-full min-h-[16rem] w-full object-cover"
          controls
          muted
          preload="metadata"
        />
        <img
          v-else
          :src="project.imageUrl"
          :alt="`${title} preview`"
          class="h-full min-h-[16rem] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />

        <div
          v-if="project.gallery?.length"
          class="absolute bottom-3 left-3 right-3 flex gap-3"
        >
          <img
            v-for="image in project.gallery"
            :key="image"
            :src="image"
            :alt="`${title} function preview`"
            class="h-16 min-w-0 flex-1 rounded-md border border-white/50 object-cover shadow-lg shadow-black/20"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useReveal } from "@/composables/useInView"

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
})

const title = computed(() =>
  props.locale === "zh" ? props.project.title_zh : props.project.title,
)
const description = computed(() =>
  props.locale === "zh" ? props.project.desc_zh : props.project.description,
)
const { target, isVisible } = useReveal(0.16)
</script>
