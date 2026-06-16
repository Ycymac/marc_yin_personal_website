<template>
  <section class="relative mb-20 sm:mb-40">
    <section
      id="experience"
      ref="sectionRef"
      class="absolute top-96 mt-28 h-[300px] w-10 scroll-mt-[600px] bg-transparent"
      aria-hidden="true"
    />
    <SectionHeading>
      {{ locale === "zh" ? headerLanguageMap.Experiences : "My Experiences" }}
    </SectionHeading>

    <div ref="timelineWrap" class="relative hidden sm:block">
      <span class="timeline-line" />
      <span
        class="timeline-line-progress"
        :style="{ transform: `scaleY(${lineProgress})` }"
      />
      <div
        v-for="(item, index) in shownExperiences"
        :key="`${item.title}-${item.date}`"
        class="relative mb-20 grid grid-cols-2 gap-16"
      >
        <div
          class="motion-surface tl-panel"
          :class="[
            visibleItems[index] ? 'is-visible' : '',
            index % 2 === 0 ? 'col-start-1 text-left tl-from-left' : 'col-start-2 text-left tl-from-right',
          ]"
          :style="{ transitionDelay: visibleItems[index] ? '80ms' : '0ms' }"
          :ref="(el) => setItemRef(el, index)"
        >
          <article
            class="construct-panel relative rounded-xl px-8 py-5"
          >
            <span
              class="absolute top-7 h-0 w-0 border-y-[0.4rem] border-y-transparent"
              :class="
                index % 2 === 0
                  ? '-right-[0.4rem] border-l-[0.4rem] border-l-white/70 dark:border-l-white/10'
                  : '-left-[0.4rem] border-r-[0.4rem] border-r-white/70 dark:border-r-white/10'
              "
            />
            <h3 class="font-black capitalize text-[var(--construct-text)]">{{ item.title }}</h3>
            <p class="!mt-0 font-bold text-[var(--construct-muted)]">
              <a
                v-if="item.locationUrl"
                :href="item.locationUrl"
                target="_blank"
                rel="noreferrer"
                class="underline decoration-[var(--construct-gold)] underline-offset-4"
              >
                {{ item.location }}
              </a>
              <span v-else>{{ item.location }}</span>
            </p>
            <p class="!mt-2 !font-semibold text-[var(--construct-muted)]">
              {{ item.description }}
            </p>
          </article>
        </div>

        <div
          class="timeline-node-construct tl-node absolute left-1/2 top-5 flex h-12 w-12 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full text-xl"
          :class="{ 'is-visible': visibleItems[index] }"
        >
          <img
            v-if="item.iconUrl"
            :src="item.iconUrl"
            :alt="`${item.title} icon`"
            class="h-full w-full object-cover"
          />
          <component v-else :is="iconFor(item.icon)" class="h-6 w-6" />
        </div>

        <div
          class="tl-date absolute top-8 text-sm font-bold text-[var(--construct-muted)]"
          :class="[
            visibleItems[index] ? 'is-visible' : '',
            index % 2 === 0 ? 'left-[calc(50%+3rem)]' : 'right-[calc(50%+3rem)]',
          ]"
        >
          {{ item.date }}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 sm:hidden">
      <div
        v-for="item in shownExperiences"
        :key="`${item.title}-mobile`"
        class="construct-panel flex flex-col items-center gap-4 rounded-xl p-6 pb-8"
      >
        <div
          class="timeline-node-construct flex h-12 w-12 items-center justify-center overflow-hidden rounded-full"
        >
          <img
            v-if="item.iconUrl"
            :src="item.iconUrl"
            :alt="`${item.title} icon`"
            class="h-full w-full object-cover"
          />
          <component v-else :is="iconFor(item.icon)" class="h-5 w-5" />
        </div>
        <span class="font-bold text-[var(--construct-muted)]">{{ item.date }}</span>
        <div class="flex flex-col gap-2">
          <h3 class="font-black capitalize text-[var(--construct-text)]">{{ item.title }}</h3>
          <p class="!mt-0 font-bold text-[var(--construct-muted)]">
            <a
              v-if="item.locationUrl"
              :href="item.locationUrl"
              target="_blank"
              rel="noreferrer"
              class="underline decoration-[var(--construct-gold)] underline-offset-4"
            >
              {{ item.location }}
            </a>
            <span v-else>{{ item.location }}</span>
          </p>
          <p class="!mt-1 !font-semibold text-[var(--construct-muted)]">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { Code2, GraduationCap } from "lucide-vue-next"
import {
  experiencesData,
  experiencesDataZh,
  headerLanguageMap,
} from "@/data/portfolio"
import { useSectionObserver } from "@/composables/useInView"
import SectionHeading from "./SectionHeading.vue"

const props = defineProps({
  onVisible: {
    type: Function,
    required: true,
  },
})

const { locale } = useI18n()
const sectionRef = useSectionObserver("Experiences", 0.1, props.onVisible)
const itemRefs = ref([])
const visibleItems = ref([])
const lineProgress = ref(0)
const timelineWrap = ref(null)
let observer
let ticking = false

const shownExperiences = computed(() =>
  locale.value === "zh" ? experiencesDataZh : experiencesData,
)

function iconFor(icon) {
  return {
    graduation: GraduationCap,
    code: Code2,
  }[icon]
}

function setItemRef(el, index) {
  if (el) itemRefs.value[index] = el
}

// Draw the centre line as the section scrolls through the viewport:
// 0 when the timeline top hits the lower third, 1 once its bottom passes mid.
function computeLineProgress() {
  ticking = false
  const wrap = timelineWrap.value
  if (!wrap) return
  const rect = wrap.getBoundingClientRect()
  const vh = window.innerHeight
  const start = vh * 0.78
  const end = vh * 0.42
  const travelled = start - rect.top
  const span = rect.height + (start - end)
  lineProgress.value = Math.min(1, Math.max(0, travelled / span))
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(computeLineProgress)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index)
        if (entry.isIntersecting) {
          visibleItems.value[index] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.35 },
  )

  itemRefs.value.forEach((el, index) => {
    el.dataset.index = String(index)
    observer.observe(el)
  })

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })
  computeLineProgress()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
})
</script>
