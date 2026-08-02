<template>
  <div
    ref="target"
    class="project-card group mb-6 transition-all duration-700 ease-out last:mb-0 sm:mb-8"
    :class="[
      isVisible ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-60',
      { 'is-visible': isVisible },
    ]"
  >
    <section
      class="project-card__surface relative grid max-w-[58rem] overflow-hidden rounded-lg border border-white/60 bg-white/70 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-black/20 md:grid-cols-[0.95fr_1.05fr]"
      tabindex="0"
    >
      <div class="flex h-full flex-col items-start gap-4 px-6 py-7 sm:px-8 sm:py-9">
        <img
          :src="project.iconUrl || project.imageUrl"
          :alt="`${title} icon`"
          class="project-card__icon h-14 w-14 rounded-2xl object-cover shadow-lg shadow-slate-950/10 ring-1 ring-black/5 dark:ring-white/15"
          loading="lazy"
        />

        <div>
          <h3 class="project-card__title text-2xl font-black tracking-normal text-slate-950 dark:text-white">
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
            class="project-card__tag rounded-full bg-slate-950 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white dark:bg-white/15 dark:text-white/80"
          >
            {{ tag }}
          </li>
        </ul>
      </div>

      <div class="project-card__media-wrap relative min-h-[16rem] overflow-hidden bg-slate-950/5 dark:bg-slate-950/30">
        <!-- Terminal mode: command-line demo replaces video/image -->
        <TerminalDemo
          v-if="skin === 'terminal'"
          :project-index="index"
          :locale="locale"
        />
        <PersonalSitePreview
          v-else-if="project.animatedPreview"
          :locale="locale"
        />
        <video
          v-else-if="project.videoUrl"
          :src="project.videoUrl"
          :poster="project.gallery?.[0] || project.imageUrl"
          class="project-card__media project-card__media--video h-full min-h-[16rem] w-full object-cover"
          controls
          muted
          preload="metadata"
        />
        <img
          v-else
          :src="project.imageUrl"
          :alt="`${title} preview`"
          class="project-card__media project-card__media--image h-full min-h-[16rem] w-full rounded-t-lg object-cover transition duration-500"
          loading="lazy"
        />

        <div
          v-if="project.gallery?.length && skin !== 'terminal'"
          class="absolute bottom-3 left-3 right-3 flex gap-3"
        >
          <img
            v-for="image in project.gallery"
            :key="image"
            :src="image"
            :alt="`${title} function preview`"
            class="project-card__gallery-image h-16 min-w-0 flex-1 rounded-t-md border border-white/50 object-cover shadow-lg shadow-black/20"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"
import { useReveal } from "@/composables/useInView"
import PersonalSitePreview from "./PersonalSitePreview.vue"
import TerminalDemo from "./TerminalDemo.vue"

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})

const skin = inject("skin")

const title = computed(() =>
  props.locale === "zh" ? props.project.title_zh : props.project.title,
)
const description = computed(() =>
  props.locale === "zh" ? props.project.desc_zh : props.project.description,
)
const { target, isVisible } = useReveal(0.16)
</script>
