<template>
  <div class="showcase">
    <article
      v-for="(project, index) in projects"
      :key="project.title"
      ref="cards"
      class="showcase-card motion-surface"
      :class="[visible[index] ? 'is-visible' : '', index % 2 === 1 ? 'is-reversed' : '']"
      :style="{ transitionDelay: `${(index % 2) * 80}ms` }"
    >
      <div class="showcase-card__copy">
        <span class="showcase-card__eyebrow">{{ project.period }}</span>
        <h3 class="showcase-card__title">
          {{ locale === "zh" ? project.title_zh : project.title }}
        </h3>
        <p class="showcase-card__desc">
          {{ locale === "zh" ? project.desc_zh : project.description }}
        </p>
        <ul class="showcase-card__tags">
          <li v-for="tag in project.tags" :key="tag" class="showcase-card__tag">{{ tag }}</li>
        </ul>
      </div>

      <!-- JAVIS: carousel between the RAG chat demo and the video -->
      <div v-if="project.videoUrl" class="showcase-card__media showcase-card__media--carousel">
        <div class="showcase-carousel">
          <div v-show="slideFor(index) === 0" class="showcase-carousel__slide">
            <RagChatDemo :locale="locale" :autostart="false" :ref="(el) => setRagRef(el, index)" />
          </div>
          <div v-show="slideFor(index) === 1" class="showcase-carousel__slide">
            <video
              :ref="(el) => setVideoRef(el, index)"
              :src="project.videoUrl"
              :poster="project.gallery?.[0] || project.imageUrl"
              class="showcase-card__video"
              controls
              loop
              playsinline
              preload="metadata"
            />
            <button
              type="button"
              class="showcase-card__expand"
              :aria-label="locale === 'zh' ? '放大播放视频' : 'Expand video'"
              @click="openVideo(project)"
            >
              <Maximize2 class="h-4 w-4" aria-hidden="true" />
              <span>{{ locale === "zh" ? "放大播放" : "Expand" }}</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          class="showcase-carousel__nav showcase-carousel__nav--prev"
          :aria-label="locale === 'zh' ? '上一个' : 'Previous'"
          @click="prevSlide(index)"
        >
          <ChevronLeft class="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="showcase-carousel__nav showcase-carousel__nav--next"
          :aria-label="locale === 'zh' ? '下一个' : 'Next'"
          @click="nextSlide(index)"
        >
          <ChevronRight class="h-5 w-5" aria-hidden="true" />
        </button>

        <div class="showcase-carousel__dots" role="tablist">
          <button
            v-for="s in 2"
            :key="s"
            type="button"
            class="showcase-carousel__dot"
            :class="{ 'is-active': slideFor(index) === s - 1 }"
            :aria-label="`${s}`"
            @click="setSlide(index, s - 1)"
          />
        </div>
      </div>

      <div v-else class="showcase-card__media">
        <img
          v-if="project.imageUrl"
          :src="project.imageUrl"
          :alt="`${project.title} preview`"
          class="showcase-card__img"
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
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-vue-next"
import RagChatDemo from "./RagChatDemo.vue"

defineProps({
  projects: { type: Array, required: true },
  locale: { type: String, required: true },
})

const cards = ref([])
const visible = ref([])
const activeVideo = ref(null)
const lightboxVideo = ref(null)
const videoRefs = new Map()
const ragRefs = new Map()
const slides = ref({}) // index → active slide (0 = demo, 1 = video)
let observer

function setVideoRef(el, index) {
  if (el) videoRefs.set(index, el)
  else videoRefs.delete(index)
}
function setRagRef(el, index) {
  if (el) ragRefs.set(index, el)
  else ragRefs.delete(index)
}

function slideFor(index) {
  return slides.value[index] ?? 0
}
function setSlide(index, value) {
  slides.value = { ...slides.value, [index]: value }
  // Pause the video when leaving its slide.
  if (value !== 1) videoRefs.get(index)?.pause()
}
function nextSlide(index) {
  setSlide(index, (slideFor(index) + 1) % 2)
}
function prevSlide(index) {
  setSlide(index, (slideFor(index) + 1) % 2)
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
          // Start the RAG chat demo once its card scrolls into view
          // (plays once; video stays manual).
          ragRefs.get(index)?.start?.()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 },
  )
  cards.value.forEach((el, index) => {
    el.dataset.index = String(index)
    observer.observe(el)
  })
  window.addEventListener("keydown", handleKeydown)
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
