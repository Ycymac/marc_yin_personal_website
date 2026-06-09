<template>
  <section
    id="blog"
    ref="sectionRef"
    class="motion-surface mb-28 w-full max-w-[58rem] scroll-mt-28"
    :class="{ 'is-visible': isVisible }"
  >
    <SectionHeading>
      {{ locale === "zh" ? headerLanguageMap.Blog : "Blog" }}
    </SectionHeading>

    <div
      class="construct-panel overflow-hidden rounded-xl"
    >
      <div class="flex flex-col gap-3 border-b border-[var(--construct-line)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-xl font-black text-[var(--construct-text)]">
            {{ locale === "zh" ? "CSDN 博客实时预览" : "CSDN Blog Preview" }}
          </h3>
          <p class="mt-1 text-sm font-semibold text-[var(--construct-muted)]">
            {{ locale === "zh" ? "如果预览受站点策略影响，可直接打开博客查看。" : "If the preview is blocked by the site, open the blog directly." }}
          </p>
        </div>

        <a
          ref="blogButton"
          class="construct-button inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-black transition hover:-translate-y-0.5"
          :href="blogUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ locale === "zh" ? "打开博客" : "Open Blog" }}
          <ExternalLink class="h-4 w-4" />
        </a>
      </div>

      <iframe
        class="h-[32rem] w-full bg-white"
        :src="blogUrl"
        title="Marc CSDN blog"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { ExternalLink } from "lucide-vue-next"
import { headerLanguageMap } from "@/data/portfolio"
import { useObservedSection } from "@/composables/useInView"
import { useMagnetic } from "@/composables/useMagnetic"
import SectionHeading from "./SectionHeading.vue"

const props = defineProps({
  onVisible: {
    type: Function,
    required: true,
  },
})

const blogUrl = "https://blog.csdn.net/Ycy06721"
const { locale } = useI18n()
const blogButton = useMagnetic(0.4)
const { target: sectionRef, isVisible } = useObservedSection(
  "Blog",
  props.onVisible,
  0.55,
  0.1,
)
</script>
