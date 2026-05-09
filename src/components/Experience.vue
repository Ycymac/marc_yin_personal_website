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

    <div class="relative hidden sm:block">
      <span class="timeline-line" />
      <div
        v-for="(item, index) in shownExperiences"
        :key="`${item.title}-${item.date}`"
        class="relative mb-20 grid grid-cols-2 gap-16"
      >
        <div
          class="motion-surface"
          :class="[
            visibleItems[index] ? 'is-visible' : '',
            index % 2 === 0 ? 'col-start-1 text-left' : 'col-start-2 text-left',
          ]"
          :ref="(el) => setItemRef(el, index)"
        >
          <article
            class="relative rounded-lg border border-white/60 bg-white/70 px-8 py-5 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
          >
            <span
              class="absolute top-7 h-0 w-0 border-y-[0.4rem] border-y-transparent"
              :class="
                index % 2 === 0
                  ? '-right-[0.4rem] border-l-[0.4rem] border-l-white/70 dark:border-l-white/10'
                  : '-left-[0.4rem] border-r-[0.4rem] border-r-white/70 dark:border-r-white/10'
              "
            />
            <h3 class="font-black capitalize text-slate-950 dark:text-white">{{ item.title }}</h3>
            <p class="!mt-0 font-bold text-slate-600 dark:text-white/60">
              <a
                v-if="item.locationUrl"
                :href="item.locationUrl"
                target="_blank"
                rel="noreferrer"
                class="underline"
              >
                {{ item.location }}
              </a>
              <span v-else>{{ item.location }}</span>
            </p>
            <p class="!mt-2 !font-semibold text-slate-700 dark:text-white/75">
              {{ item.description }}
            </p>
          </article>
        </div>

        <div
          class="absolute left-1/2 top-5 flex h-12 w-12 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white text-xl shadow-lg shadow-slate-950/10 ring-1 ring-black/5 dark:bg-white/15 dark:ring-white/15"
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
          class="absolute top-8 text-sm font-bold text-slate-500 dark:text-white/50"
          :class="index % 2 === 0 ? 'left-[calc(50%+3rem)]' : 'right-[calc(50%+3rem)]'"
        >
          {{ item.date }}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 sm:hidden">
      <div
        v-for="item in shownExperiences"
        :key="`${item.title}-mobile`"
        class="flex flex-col items-center gap-4 rounded-lg border border-white/60 bg-white/70 p-6 pb-8 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
      >
        <div
          class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg shadow-slate-950/10 ring-1 ring-black/5 dark:bg-white/15 dark:ring-white/15"
        >
          <img
            v-if="item.iconUrl"
            :src="item.iconUrl"
            :alt="`${item.title} icon`"
            class="h-full w-full object-cover"
          />
          <component v-else :is="iconFor(item.icon)" class="h-5 w-5" />
        </div>
        <span class="font-bold text-slate-500 dark:text-white/50">{{ item.date }}</span>
        <div class="flex flex-col gap-2">
          <h3 class="font-black capitalize text-slate-950 dark:text-white">{{ item.title }}</h3>
          <p class="!mt-0 font-bold text-slate-600 dark:text-white/60">
            <a
              v-if="item.locationUrl"
              :href="item.locationUrl"
              target="_blank"
              rel="noreferrer"
              class="underline"
            >
              {{ item.location }}
            </a>
            <span v-else>{{ item.location }}</span>
          </p>
          <p class="!mt-1 !font-semibold text-slate-700 dark:text-white/75">
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
let observer

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
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
