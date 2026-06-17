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

    <div class="construct-panel overflow-hidden rounded-xl">
      <!-- Header: title + account stats + open-blog button -->
      <div
        class="flex flex-col gap-4 border-b border-[var(--construct-line)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h3 class="text-xl font-black text-[var(--construct-text)]">
            {{ locale === "zh" ? "CSDN 博客" : "CSDN Blog" }}
          </h3>
          <div
            class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-bold text-[var(--construct-muted)]"
          >
            <span class="flex items-center gap-1.5">
              <FileText class="h-4 w-4 opacity-70" />
              {{ stats.articleCount
              }}{{ locale === "zh" ? " 篇" : " posts" }}
            </span>
            <span v-if="stats.totalViews != null" class="flex items-center gap-1.5">
              <Eye class="h-4 w-4 opacity-70" />
              {{ formatNum(stats.totalViews) }}
              {{ locale === "zh" ? "阅读" : "views" }}
            </span>
            <span class="flex items-center gap-1.5">
              <ThumbsUp class="h-4 w-4 opacity-70" />
              {{ formatNum(stats.totalDigg) }}
              {{ locale === "zh" ? "获赞" : "likes" }}
            </span>
            <span v-if="stats.followers != null" class="flex items-center gap-1.5">
              <Users class="h-4 w-4 opacity-70" />
              {{ formatNum(stats.followers) }}
              {{ locale === "zh" ? "粉丝" : "followers" }}
            </span>
          </div>
        </div>

        <a
          ref="blogButton"
          class="construct-button inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-black transition hover:-translate-y-0.5"
          :href="profileUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ locale === "zh" ? "打开博客" : "Open Blog" }}
          <ExternalLink class="h-4 w-4" />
        </a>
      </div>

      <!-- Empty state (fetch failed and nothing committed) -->
      <p
        v-if="!articles.length"
        class="px-5 py-10 text-center text-sm font-bold text-[var(--construct-muted)]"
      >
        {{ locale === "zh"
          ? "暂时无法加载博客列表，请直接打开博客查看。"
          : "Blog list is unavailable right now — open the blog directly." }}
      </p>

      <!-- Article cards -->
      <div v-else class="grid gap-4 p-5 sm:grid-cols-2">
        <a
          v-for="post in visiblePosts"
          :key="post.id"
          :href="post.url"
          target="_blank"
          rel="noreferrer"
          class="blog-card group flex flex-col overflow-hidden rounded-lg"
        >
          <div class="flex flex-1 flex-col gap-2 px-4 py-4">
            <div class="flex items-start gap-2">
              <Pin
                v-if="post.top"
                class="mt-1 h-4 w-4 shrink-0 text-[var(--construct-gold-strong)]"
              />
              <h4
                class="blog-card__title line-clamp-2 text-base font-black leading-snug text-[var(--construct-text)]"
              >
                {{ post.title }}
              </h4>
            </div>

            <p
              v-if="post.description"
              class="line-clamp-2 text-sm font-medium leading-relaxed text-[var(--construct-muted)]"
            >
              {{ post.description }}
            </p>

            <ul v-if="post.tags.length" class="mt-1 flex flex-wrap gap-1.5">
              <li
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                class="rounded-full border border-[var(--construct-line)] px-2 py-0.5 text-[0.65rem] font-bold text-[var(--construct-muted)]"
              >
                {{ tag }}
              </li>
            </ul>

            <div
              class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-bold text-[var(--construct-muted)]"
            >
              <span class="flex items-center gap-1" :title="locale === 'zh' ? '阅读' : 'views'">
                <Eye class="h-3.5 w-3.5" />{{ formatNum(post.viewCount) }}
              </span>
              <span class="flex items-center gap-1" :title="locale === 'zh' ? '点赞' : 'likes'">
                <ThumbsUp class="h-3.5 w-3.5" />{{ formatNum(post.diggCount) }}
              </span>
              <span class="flex items-center gap-1" :title="locale === 'zh' ? '收藏' : 'collects'">
                <Star class="h-3.5 w-3.5" />{{ formatNum(post.collectCount) }}
              </span>
              <span class="flex items-center gap-1" :title="locale === 'zh' ? '评论' : 'comments'">
                <MessageSquare class="h-3.5 w-3.5" />{{ formatNum(post.commentCount) }}
              </span>
              <span class="ml-auto text-[var(--construct-muted)] opacity-70">
                {{ post.formatTime }}
              </span>
            </div>
          </div>
        </a>
      </div>

      <!-- Show more / less -->
      <div
        v-if="articles.length > initialCount"
        class="flex justify-center border-t border-[var(--construct-line)] px-5 py-4"
      >
        <button
          type="button"
          class="construct-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition hover:-translate-y-0.5"
          @click="expanded = !expanded"
        >
          {{ expanded
            ? (locale === "zh" ? "收起" : "Show less")
            : (locale === "zh" ? `查看全部 ${articles.length} 篇` : `Show all ${articles.length}`) }}
          <ChevronDown
            class="h-4 w-4 transition-transform"
            :class="{ 'rotate-180': expanded }"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import {
  ChevronDown,
  ExternalLink,
  Eye,
  FileText,
  MessageSquare,
  Pin,
  Star,
  ThumbsUp,
  Users,
} from "lucide-vue-next"
import { headerLanguageMap } from "@/data/portfolio"
import blogData from "@/data/blog.json"
import { useObservedSection } from "@/composables/useInView"
import { useMagnetic } from "@/composables/useMagnetic"
import SectionHeading from "./SectionHeading.vue"

const props = defineProps({
  onVisible: {
    type: Function,
    required: true,
  },
})

const { locale } = useI18n()

const profileUrl = blogData.profileUrl
const stats = blogData.stats
const articles = blogData.articles ?? []

const initialCount = 6
const expanded = ref(false)
const visiblePosts = computed(() =>
  expanded.value ? articles : articles.slice(0, initialCount),
)

function formatNum(n) {
  if (n == null) return "0"
  if (n >= 10000) return `${(n / 10000).toFixed(1)}w`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

const blogButton = useMagnetic(0.4)
const { target: sectionRef, isVisible } = useObservedSection(
  "Blog",
  props.onVisible,
  0.55,
  0.1,
)
</script>

<style scoped>
.blog-card {
  border: 1px solid var(--construct-line);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.035)),
    var(--construct-panel);
  transition:
    border-color 260ms ease,
    box-shadow 360ms ease,
    transform 360ms ease;
}

.blog-card:hover,
.blog-card:focus-visible {
  transform: translateY(-3px);
  border-color: rgba(242, 210, 122, 0.72);
  box-shadow:
    0 0 0 1px rgba(242, 210, 122, 0.34),
    0 18px 44px rgba(242, 210, 122, 0.12);
  outline: none;
}

.blog-card__img {
  transition:
    transform 500ms ease,
    filter 360ms ease;
}

.blog-card:hover .blog-card__img {
  transform: scale(1.05);
  filter: saturate(1.08) contrast(1.04);
}

.blog-card:hover .blog-card__title,
.blog-card:focus-visible .blog-card__title {
  color: var(--construct-gold-strong);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* Literary skin: ink/bone emphasis, no gold glow — mirrors project-card */
:global([data-skin="literary"]) .blog-card {
  background: var(--construct-panel) !important;
  box-shadow: none !important;
}

:global([data-skin="literary"]) .blog-card:hover,
:global([data-skin="literary"]) .blog-card:focus-visible {
  border-color: var(--construct-text) !important;
  box-shadow: none !important;
  background: var(--construct-panel-strong) !important;
}
</style>
