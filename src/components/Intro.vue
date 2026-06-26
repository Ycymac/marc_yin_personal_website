<template>
  <section
    id="home"
    ref="sectionRef"
    class="hero-stage-content relative isolate flex min-h-[calc(100svh-3.5rem)] max-w-[62rem] scroll-mt-28 flex-col items-center justify-center pb-6 pt-28 text-center sm:pb-10 sm:pt-32"
    :style="heroRevealStyle"
  >
    <div class="relative flex items-center justify-center">
      <RoseBouquetDecoration placement="hero" />
      <div v-if="skin !== 'glass'" class="profile-orbit" aria-hidden="true" />
      <div class="relative z-10 animate-[popIn_0.45s_cubic-bezier(0.22,1,0.36,1)_both]">
        <img
          :src="avatarImage"
          alt="Marc avatar"
          class="relative h-32 w-32 rounded-full border-[0.42rem] border-white/90 object-cover shadow-[0_22px_70px_rgba(15,23,42,0.28)] ring-1 ring-white/40 transition duration-500 hover:scale-[1.04] dark:border-white/85 dark:ring-white/30 sm:h-40 sm:w-40"
          width="160"
          height="160"
        />
      </div>
      <span
        class="absolute -right-1 bottom-2 z-20 rounded-full bg-white/90 px-2 py-1 text-3xl shadow-lg shadow-black/10 transition-transform hover:rotate-12 hover:scale-125 dark:bg-slate-950/85 sm:right-1 sm:text-4xl"
        @mouseenter="playBubble"
      >
        👋
      </span>
    </div>

    <div class="animate-[riseIn_0.65s_0.08s_cubic-bezier(0.22,1,0.36,1)_both]">
      <p class="mt-6 text-sm font-extrabold tracking-[0.18em] text-slate-600 dark:text-white/85">
        {{ t("IntroSection.hello_im") }}
      </p>

      <h1
        v-if="skin === 'glass'"
        class="hero-name-modern mt-1 text-6xl leading-[0.95] tracking-[-0.03em] text-slate-950 dark:text-white sm:text-8xl"
      >
        {{ t("IntroSection.name") }}
      </h1>
      <h1
        v-else
        class="mt-1 text-5xl font-black leading-none tracking-normal text-slate-950 dark:text-white sm:text-7xl"
      >
        {{ t("IntroSection.name") }}
      </h1>

      <div class="mt-8">
        <h2
          id="name"
          class="min-h-[3.5rem] text-3xl font-black leading-tight tracking-normal text-slate-900 dark:text-white sm:min-h-[4.5rem] sm:text-5xl"
        >
          <span>{{ displayedRole }}</span>
          <span class="ml-1 inline-block h-[0.9em] w-[0.08em] animate-pulse rounded-full bg-current align-[-0.08em]" />
        </h2>
      </div>

      <p class="mx-auto mt-3 max-w-[38rem] text-2xl font-black leading-tight tracking-normal text-slate-800 dark:text-white sm:text-4xl">
        {{ t("IntroSection.short_intro") }}
      </p>
      <p class="mx-auto mt-4 max-w-[38rem] text-base font-bold leading-7 text-slate-600 dark:text-white/70 sm:text-lg">
        {{ t("IntroSection.focus") }}
      </p>
    </div>

    <div
      class="mt-9 flex animate-[riseIn_0.65s_0.18s_cubic-bezier(0.22,1,0.36,1)_both] items-center justify-center gap-3"
    >
      <a
        class="hero-action"
        href="#about"
        :aria-label="t('IntroSection.about')"
        :title="t('IntroSection.about')"
      >
        <UserRound class="h-5 w-5" />
      </a>
      <a
        class="hero-action"
        href="#projects"
        :aria-label="t('IntroSection.projects')"
        :title="t('IntroSection.projects')"
      >
        <FolderGit2 class="h-5 w-5" />
      </a>
      <a
        class="hero-action"
        href="#skills"
        :aria-label="t('IntroSection.skills')"
        :title="t('IntroSection.skills')"
      >
        <ServerCog class="h-5 w-5" />
      </a>
      <a
        class="hero-action"
        href="#experience"
        :aria-label="t('IntroSection.timeline')"
        :title="t('IntroSection.timeline')"
      >
        <GitBranch class="h-5 w-5" />
      </a>
      <a
        class="hero-action"
        href="https://blog.csdn.net/Ycy06721"
        target="_blank"
        rel="noreferrer"
        :aria-label="t('IntroSection.blog')"
        :title="t('IntroSection.blog')"
      >
        <BookOpenText class="h-5 w-5" />
      </a>
      <a
        class="hero-action"
        :href="resumeHref"
        target="_blank"
        rel="noreferrer"
        :aria-label="t('IntroSection.resume')"
        :title="t('IntroSection.resume')"
      >
        <FileText class="h-5 w-5" />
      </a>
    </div>

    <div
      v-if="skin !== 'glass'"
      class="mt-8 hidden animate-[riseIn_0.65s_0.26s_cubic-bezier(0.22,1,0.36,1)_both] items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-white/50 sm:flex"
      aria-hidden="true"
    >
      <span>Java</span>
      <span class="h-1 w-1 rounded-full bg-current opacity-70" />
      <span>SpringBoot</span>
      <span class="h-1 w-1 rounded-full bg-current opacity-70" />
      <span>AI</span>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import {
  BookOpenText,
  FileText,
  FolderGit2,
  GitBranch,
  ServerCog,
  UserRound,
} from "lucide-vue-next"
import avatarImage from "@/photos/avatar.jpg"
import { assetUrl } from "@/data/assets"
import { useSectionObserver } from "@/composables/useInView"
import { useHeroStage } from "@/composables/useHeroStage"
import RoseBouquetDecoration from "@/components/RoseBouquetDecoration.vue"

const props = defineProps({
  onVisible: {
    type: Function,
    required: true,
  },
})

const { t, locale } = useI18n()
const skin = inject("skin")
const sectionRef = useSectionObserver("Home", 0.75, props.onVisible)
const { progress } = useHeroStage()
const heroRevealStyle = computed(() => {
  const reveal = skin?.value === "glass" ? Math.min(1, Math.max(0, (progress.value - 0.38) / 0.52)) : 1
  return { "--hero-reveal": reveal }
})
const resumeHref = assetUrl("resume.pdf")
const rolesByLocale = {
  zh: ["我是一位后端开发者", "我是一名 Java 学习者", "我正在探索 AI 实践"],
  en: ["I'm a Backend Developer", "I'm a Java Learner", "I'm exploring AI practice"],
}
const displayedRole = ref("")
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let timer

function currentRoles() {
  return locale.value === "zh" ? rolesByLocale.zh : rolesByLocale.en
}

function tickTypewriter() {
  const roles = currentRoles()
  const currentRole = roles[roleIndex % roles.length]
  displayedRole.value = currentRole.slice(0, charIndex)

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex += 1
    timer = window.setTimeout(tickTypewriter, 55)
    return
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true
    timer = window.setTimeout(tickTypewriter, 1000)
    return
  }

  if (isDeleting && charIndex > 0) {
    charIndex -= 1
    timer = window.setTimeout(tickTypewriter, 35)
    return
  }

  isDeleting = false
  roleIndex = (roleIndex + 1) % roles.length
  timer = window.setTimeout(tickTypewriter, 180)
}

function restartTypewriter() {
  window.clearTimeout(timer)
  roleIndex = 0
  charIndex = 0
  isDeleting = false
  displayedRole.value = ""
  tickTypewriter()
}

function playBubble() {
  const audio = new Audio(assetUrl("bubble.wav"))
  audio.volume = 0.5
  audio.play().catch(() => {})
}

onMounted(() => {
  tickTypewriter()
})

watch(locale, () => {
  restartTypewriter()
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
})
</script>
