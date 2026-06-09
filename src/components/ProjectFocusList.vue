<template>
  <div class="focus-list" @mouseleave="hovered = null">
    <article
      v-for="(project, index) in projects"
      :key="project.title"
      ref="rows"
      class="focus-row motion-surface"
      :class="{
        'is-visible': visible[index],
        'is-dimmed': hovered !== null && hovered !== index,
        'is-open': opened === index,
      }"
      :style="{ transitionDelay: `${index * 90}ms` }"
      @mouseenter="hovered = index"
    >
      <button
        type="button"
        class="focus-row__head"
        :aria-expanded="opened === index"
        @click="toggle(index)"
      >
        <span class="focus-row__no">{{ String(index + 1).padStart(2, "0") }}</span>
        <h3 class="focus-row__title">
          {{ locale === "zh" ? project.title_zh : project.title }}
        </h3>
        <span class="focus-row__icon" aria-hidden="true">
          <component :is="opened === index ? Minus : Plus" class="h-5 w-5" />
        </span>
      </button>

      <ul class="focus-row__tags">
        <li v-for="tag in project.tags" :key="tag" class="focus-row__tag">{{ tag }}</li>
      </ul>

      <!-- Floating thumbnail follows hover (desktop only) -->
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="`${project.title} preview`"
        class="focus-row__thumb"
        loading="lazy"
      />

      <!-- Expanded detail: description + hover-preview video / gallery -->
      <div class="focus-row__detail" :style="{ maxHeight: opened === index ? '60rem' : '0' }">
        <p class="focus-row__desc">
          {{ locale === "zh" ? project.desc_zh : project.description }}
        </p>
        <div
          v-if="project.videoUrl"
          class="focus-row__media"
          @mouseenter="playVideo"
          @mouseleave="pauseVideo"
        >
          <video
            :src="project.videoUrl"
            :poster="project.gallery?.[0] || project.imageUrl"
            class="h-full w-full object-cover"
            muted
            loop
            playsinline
            preload="metadata"
          />
          <span class="focus-row__hint">{{ locale === "zh" ? "悬停播放" : "hover to play" }}</span>
        </div>
        <img
          v-else-if="project.imageUrl"
          :src="project.imageUrl"
          :alt="`${project.title} detail`"
          class="focus-row__media-img"
          loading="lazy"
        />
      </div>
    </article>
  </div>
</template>


<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import { Minus, Plus } from "lucide-vue-next"

defineProps({
  projects: { type: Array, required: true },
  locale: { type: String, required: true },
})

const hovered = ref(null)
const opened = ref(null)
const rows = ref([])
const visible = ref([])
let observer

function toggle(index) {
  opened.value = opened.value === index ? null : index
}

function playVideo(event) {
  const video = event.currentTarget.querySelector("video")
  video?.play().catch(() => {})
}

function pauseVideo(event) {
  const video = event.currentTarget.querySelector("video")
  if (video) video.pause()
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index)
        if (entry.isIntersecting) {
          visible.value[index] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.25 },
  )
  rows.value.forEach((el, index) => {
    el.dataset.index = String(index)
    observer.observe(el)
  })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

