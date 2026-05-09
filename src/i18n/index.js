import { createI18n } from "vue-i18n"
import en from "./en.json"
import zh from "./zh.json"

const supportedLocales = ["en", "zh"]

function getInitialLocale() {
  const pathLocale = window.location.pathname.match(/\/(en|zh)(\/|$)/)?.[1]
  const storedLocale = window.localStorage.getItem("locale")
  return supportedLocales.includes(pathLocale)
    ? pathLocale
    : supportedLocales.includes(storedLocale)
      ? storedLocale
      : "en"
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: "en",
  messages: {
    en,
    zh,
  },
})

export function setDocumentLocale(locale) {
  document.documentElement.lang = locale
  window.localStorage.setItem("locale", locale)
}
