<template>
  <section
    id="skills"
    ref="sectionRef"
    class="mb-28 max-w-[53rem] scroll-mt-28 text-center"
  >
    <SectionHeading>
      {{ locale === "zh" ? headerLanguageMap.Skills : "My Skills" }}
    </SectionHeading>

    <div v-if="skin === 'glass'" class="skills-marquee" aria-hidden="true">
      <div class="skills-marquee__track">
        <span
          v-for="(skill, index) in marqueeSkills"
          :key="`m-${index}`"
          class="skills-marquee__item"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <ul class="flex flex-wrap justify-center gap-2 text-lg">
      <li
        v-for="(skill, index) in skillsData"
        :key="skill"
        class="construct-chip rounded-xl px-5 py-3 font-black opacity-0 transition-all duration-500 ease-out"
        :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-16': !isVisible }"
        :style="{ transitionDelay: `${index * 50}ms` }"
      >
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed, inject } from "vue"
import { useI18n } from "vue-i18n"
import { headerLanguageMap, skillsData } from "@/data/portfolio"
import { useObservedSection } from "@/composables/useInView"
import SectionHeading from "./SectionHeading.vue"

const props = defineProps({
  onVisible: {
    type: Function,
    required: true,
  },
})

const { locale } = useI18n()
const skin = inject("skin")
// Duplicate the list so the -50% marquee translate loops seamlessly.
const marqueeSkills = computed(() => [...skillsData, ...skillsData])
const { target: sectionRef, isVisible } = useObservedSection(
  "Skills",
  props.onVisible,
  0.75,
  0.15,
)
</script>
