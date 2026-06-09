<template>
  <section id="projects" ref="sectionRef" class="mb-28 scroll-mt-28">
    <SectionHeading>
      {{ locale === "zh" ? headerLanguageMap.Projects : "Featured Projects" }}
    </SectionHeading>

    <!-- Modern skin: focus list -->
    <ProjectFocusList
      v-if="skin === 'glass'"
      :projects="projectsData"
      :locale="locale"
    />

    <!-- Literary skin: stacked cards -->
    <div v-else>
      <ProjectCard
        v-for="project in projectsData"
        :key="project.title"
        :project="project"
        :locale="locale"
      />
    </div>

    <p class="mt-8 text-center text-sm font-bold text-[var(--construct-muted)]">
      {{ locale === "zh" ? "项目内容会随着后端学习与实践持续补充。" : "Project notes will keep growing with backend learning and practice." }}
    </p>
  </section>
</template>

<script setup>
import { inject } from "vue"
import { useI18n } from "vue-i18n"
import { headerLanguageMap, projectsData } from "@/data/portfolio"
import { useSectionObserver } from "@/composables/useInView"
import SectionHeading from "./SectionHeading.vue"
import ProjectCard from "./ProjectCard.vue"
import ProjectFocusList from "./ProjectFocusList.vue"

const props = defineProps({
  onVisible: {
    type: Function,
    required: true,
  },
})

const { locale } = useI18n()
const skin = inject("skin")
const sectionRef = useSectionObserver("Projects", 0.1, props.onVisible)
</script>
