import { createApp } from "vue"
import App from "./App.vue"
import { i18n } from "./i18n"
// Self-hosted serif fonts for the literary skin (loaded once, applied via CSS var).
import "@fontsource-variable/fraunces/opsz.css"
import "@fontsource/noto-serif-sc/chinese-simplified-400.css"
import "@fontsource/noto-serif-sc/chinese-simplified-600.css"
// Modern skin: Space Grotesk (display) + Space Mono (micro-labels).
import "@fontsource/space-grotesk/latin-500.css"
import "@fontsource/space-grotesk/latin-700.css"
import "@fontsource/space-mono/latin-400.css"
import "@fontsource/space-mono/latin-700.css"
import "./styles/main.css"

createApp(App).use(i18n).mount("#app")
