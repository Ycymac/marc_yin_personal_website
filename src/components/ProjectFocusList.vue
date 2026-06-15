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

      <!-- Expanded detail: description + autoplay video / gallery -->
      <div class="focus-row__detail" :style="{ maxHeight: opened === index ? '60rem' : '0' }">
        <p class="focus-row__desc">
          {{ locale === "zh" ? project.desc_zh : project.description }}
        </p>
        <div v-if="project.videoUrl" class="focus-row__media">
          <video
            :ref="(el) => setVideoRef(el, index)"
            :src="project.videoUrl"
            :poster="project.gallery?.[0] || project.imageUrl"
            class="h-full w-full object-cover"
            muted
            loop
            playsinline
            preload="metadata"
          />
          <button
            type="button"
            class="focus-row__expand"
            :aria-label="locale === 'zh' ? '放大播放视频' : 'Expand video'"
            @click.stop="openVideo(project)"
          >
            <Maximize2 class="h-4 w-4" />
            <span>{{ locale === "zh" ? "放大播放" : "Expand" }}</span>
          </button>
          <span class="focus-row__hint">{{ locale === "zh" ? "自动播放" : "autoplay" }}</span>
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

  <Teleport to="body">
    <div
      v-if="activeVideo"
      class="video-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="locale === 'zh' ? '项目视频放大播放' : 'Expanded project video'"
      @click.self="closeVideo"
    >
      <button
        type="button"
        class="video-lightbox__close"
        :aria-label="locale === 'zh' ? '关闭视频' : 'Close video'"
        @click="closeVideo"
      >
        <X class="h-5 w-5" />
      </button>
      <video
        ref="lightboxVideo"
        :src="activeVideo.videoUrl"
        :poster="activeVideo.gallery?.[0] || activeVideo.imageUrl"
        class="video-lightbox__player"
        controls
        autoplay
        loop
        playsinline
      />
    </div>
  </Teleport>
</template>


<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { Maximize2, Minus, Plus, X } from "lucide-vue-next"

defineProps({
  projects: { type: Array, required: true },
  locale: { type: String, required: true },
})

const hovered = ref(null)
const opened = ref(null)
const rows = ref([])
const visible = ref([])
const activeVideo = ref(null)
const lightboxVideo = ref(null)
const videoRefs = new Map()
let observer

function toggle(index) {
  opened.value = opened.value === index ? null : index
}

function setVideoRef(el, index) {
  if (el) {
    videoRefs.set(index, el)
  } else {
    videoRefs.delete(index)
  }
}

function playInlineVideo(index) {
  const video = videoRefs.get(index)
  if (!video) return
  video.muted = true
  video.play().catch(() => {})
}

function pauseInlineVideos(exceptIndex = null) {
  videoRefs.forEach((video, index) => {
    if (index !== exceptIndex) video.pause()
  })
}

function openVideo(project) {
  activeVideo.value = project
}

function closeVideo() {
  activeVideo.value = null
}

function handleKeydown(event) {
  if (event.key === "Escape") closeVideo()
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
  window.addEventListener("keydown", handleKeydown)
})

watch(opened, async (index) => {
  pauseInlineVideos(index)
  if (index === null) return
  await nextTick()
  playInlineVideo(index)
})

watch(activeVideo, async (video) => {
  if (!video) return
  await nextTick()
  lightboxVideo.value?.play().catch(() => {})
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener("keydown", handleKeydown)
})
</script>
