<template>
  <div class="site-shell relative min-h-screen overflow-x-hidden font-sans text-slate-950 antialiased dark:text-white">
    <div class="ambient-background" aria-hidden="true">
      <div
        class="ambient-background__wallpaper"
        :class="{ 'is-visible': wallpaperVisible }"
      />
      <div class="ambient-background__veil" />
      <div class="ambient-background__mesh" />
      <div class="ambient-background__grid" />
    </div>

    <Header
      v-if="skin !== 'glass'"
      :active-section="activeSection"
      :locale="locale"
      @navigate="handleNavigate"
    />

    <HelloIntro @complete="wallpaperVisible = true" />

    <main class="site-content relative z-10 mx-auto flex w-full max-w-[76rem] flex-col items-center justify-center overflow-x-hidden px-4">
      <Intro :on-visible="handleSectionVisible" />
      <SectionDivider />
      <About :on-visible="handleSectionVisible" />
      <Projects :on-visible="handleSectionVisible" />
      <BlogPreview :on-visible="handleSectionVisible" />
      <Skills :on-visible="handleSectionVisible" />
      <Experience :on-visible="handleSectionVisible" />
    </main>

    <Footer />
    <WidgetWrapper>
      <ThemeSwitch :theme="theme" @toggle="toggleTheme" />
      <SkinSwitch :skin="skin" @toggle="toggleSkin" />
      <LanguageSwitch :locale="locale" @toggle="toggleLocale" />
    </WidgetWrapper>
  </div>
</template>

<script setup>
import { onMounted, provide, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { assetUrl } from "@/data/assets"
import { setDocumentLocale } from "@/i18n"
import Header from "@/components/Header.vue"
import Intro from "@/components/Intro.vue"
import SectionDivider from "@/components/SectionDivider.vue"
import About from "@/components/About.vue"
import Projects from "@/components/Projects.vue"
import BlogPreview from "@/components/BlogPreview.vue"
import Skills from "@/components/Skills.vue"
import Experience from "@/components/Experience.vue"
import Footer from "@/components/Footer.vue"
import HelloIntro from "@/components/HelloIntro.vue"
import WidgetWrapper from "@/components/WidgetWrapper.vue"
import ThemeSwitch from "@/components/ThemeSwitch.vue"
import SkinSwitch from "@/components/SkinSwitch.vue"
import LanguageSwitch from "@/components/LanguageSwitch.vue"

const activeSection = ref("Home")
const timeOfLastClick = ref(0)
const theme = ref("dark")
const skin = ref("glass")
const wallpaperVisible = ref(false)
const { locale } = useI18n()

// Expose the active skin so sections can branch their layout (modern vs literary).
provide("skin", skin)
provide("theme", theme)

function handleNavigate(sectionName) {
  activeSection.value = sectionName
  timeOfLastClick.value = Date.now()
}

function handleSectionVisible(sectionName) {
  if (Date.now() - timeOfLastClick.value > 1000) {
    activeSection.value = sectionName
  }
}

function playThemeSound(fileName) {
  const audio = new Audio(assetUrl(fileName))
  audio.volume = 0.5
  audio.play().catch(() => {})
}

function applyTheme(nextTheme) {
  theme.value = nextTheme
  document.documentElement.classList.toggle("dark", nextTheme === "dark")
  window.localStorage.setItem("theme", nextTheme)
}

function toggleTheme() {
  if (theme.value === "light") {
    applyTheme("dark")
    playThemeSound("light-off.mp3")
  } else {
    applyTheme("light")
    playThemeSound("light-on.mp3")
  }
}

function applySkin(nextSkin) {
  skin.value = nextSkin
  if (nextSkin !== "glass") wallpaperVisible.value = false
  document.documentElement.setAttribute("data-skin", nextSkin)
  window.localStorage.setItem("skin", nextSkin)
}

function toggleSkin() {
  applySkin(skin.value === "literary" ? "glass" : "literary")
}

function toggleLocale() {
  const nextLocale = locale.value === "en" ? "zh" : "en"
  locale.value = nextLocale
  setDocumentLocale(nextLocale)

  const basePath =
    import.meta.env.BASE_URL === "/"
      ? ""
      : import.meta.env.BASE_URL.replace(/\/$/, "")
  window.history.replaceState(null, "", `${basePath}/${nextLocale}${window.location.hash}`)
}

onMounted(() => {
  // Windows 雅黑 lacks ExtraLight — flag for weight compensation in CSS.
  if (/Win/i.test(navigator.platform || navigator.userAgent || "")) {
    document.body.classList.add("is-win")
  }
  const savedTheme = window.localStorage.getItem("theme")
  applyTheme(savedTheme || "dark")
  const savedSkin = window.localStorage.getItem("skin")
  applySkin(savedSkin || "glass")
  setDocumentLocale(locale.value)
})

watch(locale, (nextLocale) => {
  setDocumentLocale(nextLocale)
})
</script>
