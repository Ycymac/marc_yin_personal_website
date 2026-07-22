<template>
  <div class="showcase">
    <article
      v-for="(project, index) in projects"
      :key="project.title"
      ref="cards"
      class="showcase-card motion-surface"
      :class="[
        visible[index] ? 'is-visible' : '',
        index % 2 === 1 ? 'is-reversed' : '',
        project.videoUrl ? 'showcase-card--featured' : '',
      ]"
      :style="{ transitionDelay: `${(index % 2) * 80}ms` }"
    >
      <!-- ===== Featured (JAVIS): demo (left) + description (right), then a
           single horizontal metrics row, then notes ===== -->
      <template v-if="project.videoUrl">
        <div class="javis-top">
          <!-- Demo on the left -->
          <div class="javis-demo">
            <div class="showcase-carousel">
              <div
                class="showcase-carousel__slide"
                :class="{ 'is-active': slideFor(index) === 0 }"
                :aria-hidden="slideFor(index) !== 0"
              >
                <RagChatDemo :locale="locale" :autostart="false" :show-replay="false" :ref="(el) => setRagRef(el, index)" />
              </div>
              <div
                class="showcase-carousel__slide"
                :class="{ 'is-active': slideFor(index) === 1 }"
                :aria-hidden="slideFor(index) !== 1"
              >
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
              </div>
            </div>

            <!-- Control bar: replay / expand sit LEFT, parallel to nav arrows -->
            <div class="showcase-carousel__bar">
              <div class="showcase-carousel__bar-left">
                <button
                  v-if="slideFor(index) === 0"
                  type="button"
                  class="showcase-carousel__action"
                  :aria-label="locale === 'zh' ? '重新播放' : 'Replay'"
                  @click="replayDemo(index)"
                >
                  <RotateCcw class="h-4 w-4" aria-hidden="true" />
                  <span>{{ locale === "zh" ? "重新播放" : "Replay" }}</span>
                </button>
                <button
                  v-else
                  type="button"
                  class="showcase-carousel__action"
                  :aria-label="locale === 'zh' ? '放大播放视频' : 'Expand video'"
                  @click="openVideo(project)"
                >
                  <Maximize2 class="h-4 w-4" aria-hidden="true" />
                  <span>{{ locale === "zh" ? "放大播放" : "Expand" }}</span>
                </button>
              </div>
              <div class="showcase-carousel__controls">
                <div class="showcase-carousel__dots" role="tablist">
                  <button
                    v-for="s in slideCount(index)"
                    :key="s"
                    type="button"
                    class="showcase-carousel__dot"
                    :class="{ 'is-active': slideFor(index) === s - 1 }"
                    :aria-label="`${s}`"
                    @click="setSlide(index, s - 1)"
                  />
                </div>
                <button
                  type="button"
                  class="showcase-carousel__nav"
                  :aria-label="locale === 'zh' ? '上一个' : 'Previous'"
                  @click="prevSlide(index)"
                >
                  <ChevronLeft class="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="showcase-carousel__nav"
                  :aria-label="locale === 'zh' ? '下一个' : 'Next'"
                  @click="nextSlide(index)"
                >
                  <ChevronRight class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <!-- Description on the right -->
          <div class="showcase-card__copy javis-copy">
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
        </div>

        <!-- Metrics: a single horizontal row of compact modules -->
        <h4 class="javis-metrics__title">
          {{ locale === "zh" ? "分块命中率 & 质量" : "Chunk hit rate & quality" }}
        </h4>
        <div class="javis-metrics-row">
          <div
            v-for="m in ragMetrics"
            :key="m.label"
            class="javis-metric"
          >
            <component :is="m.icon" class="javis-metric__icon" :style="{ color: m.color }" aria-hidden="true" />
            <span class="javis-metric__value" :style="{ color: m.color }">{{ m.value }}</span>
            <span class="javis-metric__label">{{ locale === "zh" ? m.label : m.labelEn }}</span>
          </div>
        </div>

        <p class="javis-notes">
          <span>{{ locale === "zh" ? "最近执行 5 轮测试，每轮 24 条问题" : "Latest: 5 test rounds, 24 questions per round" }}</span>
          <span class="javis-notes__sub">
            {{ locale === "zh"
              ? "命中率与分块策略、测试集质量高度相关"
              : "Hit rate correlates strongly with chunking strategy and test-set quality" }}
          </span>
        </p>
      </template>

      <!-- ===== Non-featured: copy + image side by side ===== -->
      <template v-else>
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
        <div class="showcase-card__media">
          <PersonalSitePreview
            v-if="project.animatedPreview"
            :locale="locale"
          />
          <img
            v-else-if="project.imageUrl"
            :src="project.imageUrl"
            :alt="`${project.title} preview`"
            class="showcase-card__img"
            loading="lazy"
          />
        </div>
      </template>
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
import { ChevronLeft, ChevronRight, Maximize2, RotateCcw, X } from "lucide-vue-next"
import RagChatDemo from "./RagChatDemo.vue"
import PersonalSitePreview from "./PersonalSitePreview.vue"
import { ragMetrics } from "@/data/ragMetrics"

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

const SLIDE_COUNT = 2 // RAG demo · video

function slideFor(index) {
  return slides.value[index] ?? 0
}
function slideCount() {
  return SLIDE_COUNT
}
function setSlide(index, value) {
  slides.value = { ...slides.value, [index]: value }
  // Pause the video when leaving its slide.
  if (value !== 1) videoRefs.get(index)?.pause()
}
function nextSlide(index) {
  setSlide(index, (slideFor(index) + 1) % SLIDE_COUNT)
}
function prevSlide(index) {
  setSlide(index, (slideFor(index) + SLIDE_COUNT - 1) % SLIDE_COUNT)
}
function replayDemo(index) {
  ragRefs.get(index)?.restart?.()
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
