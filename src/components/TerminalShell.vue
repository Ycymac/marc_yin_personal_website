<template>
  <div class="term-shell" @click="focusInput">
      <!-- Ambient background: dim "無限進步" logo behind all content -->
      <div class="term-bg" aria-hidden="true">
        <div class="term-bg__logo">
          <InfiniteProgressLogo />
        </div>
      </div>

      <!-- Body: scrollable content area -->
      <div ref="outputEl" class="term-body">
        <!-- Welcome: pixel-art MARC header top-left -->
        <div v-if="currentView === null" class="term-welcome">
          <div class="term-welcome__header">
            <pre class="marc-ascii" aria-label="MARC">
███╗   ███╗ █████╗ ██████╗  ██████╗
████╗ ████║██╔══██╗██╔══██╗██╔════╝
██╔████╔██║███████║██████╔╝██║
██║╚██╔╝██║██╔══██║██╔══██╗██║
██║ ╚═╝ ██║██║  ██║██║  ██║╚██████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝
</pre>
            <div class="term-welcome__name"><span class="term-hl">MARC YIN</span> <span class="term-dim">— {{ isZh ? "后端开发者 & AI 探索者" : "Backend Developer & AI Explorer" }}</span></div>
            <div class="term-welcome__hint">{{ isZh ? "输入 $ 查看命令 · 或直接输入命令名 · Tab 补全" : "Type $ for commands · or type directly · Tab complete" }}</div>
          </div>
        </div>

        <!-- History rows (clickable) -->
        <div v-for="(h, idx) in history" :key="idx" class="term-hist" @click="reRun(h.cmd)">
          <span class="term-prompt term-prompt--sm">❯</span> <span class="term-hist__cmd">{{ h.cmd }}</span>
        </div>

        <!-- ====== HELP ====== -->
        <div v-if="currentView === 'help'" class="term-panel term-anim">
          <div class="term-panel__head">## {{ isZh ? "可用命令" : "Available Commands" }}</div>
          <div class="term-help-grid">
            <div v-for="c in cmdHelpList" :key="c[0]" class="term-help-row">
              <span class="term-cmd-name">{{ c[0] }}</span><span class="term-dim">{{ c[1] }}</span>
            </div>
          </div>
        </div>

        <!-- ====== WHOAMI ====== -->
        <div v-if="currentView === 'whoami'" class="term-panel term-anim">
          <div class="term-panel__head">## whoami</div>
          <div class="term-whoami">
            <img :src="avatarImage" alt="avatar" class="term-whoami__avatar" />
            <div>
              <div class="term-whoami__name">{{ isZh ? "殷晨晏 (Marc Yin)" : "Marc Yin (殷晨晏)" }}</div>
              <div class="term-dim">{{ isZh ? "后端开发者 | 西安邮电大学 软件工程 2024级" : "Backend Developer | XUPT Software Engineering '24" }}</div>
            </div>
          </div>
          <div class="term-whoami__bio">{{ isZh ? "专注 Java 后端学习，持续尝试用 AI 与 Codex 提升开发效率。热爱学习新技术，乐意探索实践。" : "Focused on Java backend, exploring AI & Codex. Passionate about learning and building." }}</div>
        </div>

        <!-- ====== ABOUT ====== -->
        <div v-if="currentView === 'about'" class="term-panel term-anim">
          <div class="term-panel__head">## {{ isZh ? "关于我" : "About Me" }}</div>
          <div class="term-about">
            <p class="term-about__p">{{ t("AboutSection.desc") }}</p>
            <div class="term-about__link">
              <span class="term-tag term-tag--link">🔗 CSDN</span>
              <span class="term-dim">https://blog.csdn.net/Ycy06721</span>
            </div>
          </div>
        </div>

        <!-- ====== PROJECTS ====== -->
        <div v-if="currentView === 'projects'" class="term-panel term-anim">
          <div class="term-panel__head">## {{ isZh ? "项目作品" : "Projects" }}</div>
          <div class="term-projects">
            <div
              v-for="(p, i) in projectsData"
              :key="p.title"
              class="term-proj"
              :class="`term-proj--from-${['left','right','up'][i]}`"
              :style="{ animationDelay: `${0.1 * i}s` }"
            >
              <div class="term-proj__no">{{ i + 1 }}</div>
              <div class="term-proj__body">
                <div class="term-proj__header">
                  <h3 class="term-proj__title">{{ isZh ? p.title_zh : p.title }}</h3>
                  <span class="term-dim term-proj__period">{{ p.period }}</span>
                </div>
                <p class="term-proj__desc">{{ isZh ? p.desc_zh : p.description }}</p>
                <div class="term-tags">
                  <span v-for="(t, ti) in p.tags" :key="t" class="term-tag term-tag--pop" :style="{ animationDelay: `${0.3 + ti * 0.06}s` }">{{ t }}</span>
                </div>
              </div>
              <!-- Watermark number -->
              <div class="term-proj__watermark">0{{ i + 1 }}</div>
              <!-- GetCoupon: CSS pixel-art coupon icon -->
              <div v-if="i === 0" class="term-proj__icon" aria-hidden="true">
                <div class="px-coupon">
                  <div class="px-coupon__ticket">
                    <span class="px-coupon__tag">¥</span>
                    <span class="px-coupon__code">COUPON</span>
                    <span class="px-coupon__cut px-coupon__cut--l" />
                    <span class="px-coupon__cut px-coupon__cut--r" />
                  </div>
                </div>
              </div>
              <!-- JAVIS: always-visible chat demo (fixed height) -->
              <div v-if="i === 1" class="term-demo-fixed">
                <TerminalChatDemo :locale="locale" />
              </div>
            </div>
          </div>
        </div>

        <!-- ====== SKILLS ====== -->
        <div v-if="currentView === 'skills'" class="term-panel term-anim">
          <div class="term-panel__head">## {{ isZh ? "技能" : "Skills" }}</div>
          <div class="term-tags term-tags--lg">
            <span v-for="(s, si) in skillsData" :key="s" class="term-tag term-tag--skill term-tag--pop" :style="{ animationDelay: `${0.08 * si}s` }">{{ s }}</span>
          </div>
        </div>

        <!-- ====== BLOG ====== -->
        <div v-if="currentView === 'blog'" class="term-panel term-anim">
          <div class="term-panel__head">## CSDN Blog</div>
          <div class="term-stats">
            <div class="term-stat term-stat--glow">
              <span class="term-stat__icon">📝</span>
              <span class="term-stat__val">{{ blogStats.articleCount }}</span>
              <span class="term-stat__label">{{ isZh ? "文章" : "Posts" }}</span>
            </div>
            <div class="term-stat term-stat--glow">
              <span class="term-stat__icon">👁</span>
              <span class="term-stat__val">{{ fnum(blogStats.totalViews) }}</span>
              <span class="term-stat__label">{{ isZh ? "阅读" : "Views" }}</span>
            </div>
            <div class="term-stat term-stat--glow">
              <span class="term-stat__icon">👍</span>
              <span class="term-stat__val">{{ fnum(blogStats.totalDigg) }}</span>
              <span class="term-stat__label">{{ isZh ? "获赞" : "Likes" }}</span>
            </div>
            <div class="term-stat term-stat--glow">
              <span class="term-stat__icon">👥</span>
              <span class="term-stat__val">{{ fnum(blogStats.followers) }}</span>
              <span class="term-stat__label">{{ isZh ? "粉丝" : "Followers" }}</span>
            </div>
          </div>
          <div class="term-blog-list">
            <div v-for="a in blogTop6" :key="a.id" class="term-blog-item">
              <span class="term-hl">{{ a.top ? "📌 " : "" }}{{ a.title }}</span>
              <span class="term-dim"> · {{ a.formatTime }} · 👁 {{ fnum(a.viewCount) }} · 👍 {{ fnum(a.diggCount) }}</span>
            </div>
          </div>
        </div>

        <!-- ====== EXPERIENCE ====== -->
        <div v-if="currentView === 'experience'" class="term-panel term-anim">
          <div class="term-panel__head">## {{ isZh ? "时间线" : "Timeline" }}</div>
          <div class="term-timeline">
            <div v-for="e in expList" :key="e.title" class="term-tl-item">
              <div class="term-tl-item__dot" />
              <div class="term-tl-item__line" />
              <div class="term-tl-item__body">
                <span class="term-hl">{{ e.date }}</span>
                <b> {{ e.title }}</b>
                <div class="term-dim">{{ e.location }}</div>
                <div class="term-tl-item__desc">{{ e.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- ====== INPUT AREA ====== -->
    <div class="term-input-wrap">
        <!-- $ Command palette (Codex-style popup) -->
        <div v-if="showPalette" class="term-palette">
          <div class="term-palette__title">{{ isZh ? "可用命令" : "Available Commands" }}</div>
          <div class="term-palette__grid">
            <button
              v-for="c in paletteCmds"
              :key="c.cmd"
              class="term-palette__item"
              :class="{ 'is-focused': paletteIdx === c.cmd }"
              @click="selectPaletteCmd(c.cmd)"
              @mouseenter="paletteIdx = c.cmd"
            >
              <span class="term-palette__icon">{{ c.icon }}</span>
              <span class="term-palette__cmd">{{ c.cmd }}</span>
              <span class="term-palette__desc">{{ c.desc }}</span>
            </button>
          </div>
        </div>

        <!-- Autocomplete suggestions -->
        <div v-else-if="suggestions.length && input.trim()" class="term-suggest">
          <div
            v-for="(s, si) in suggestions"
            :key="s"
            class="term-suggest__item"
            :class="{ 'is-active': si === suggestIdx }"
            @mousedown.prevent="applySuggestion(s)"
          >
            <span class="term-suggest__cmd">{{ s }}</span>
            <span class="term-suggest__desc">{{ cmdDescriptions[s] || "" }}</span>
          </div>
        </div>

        <!-- Input bar -->
        <div class="term-input-bar">
          <!-- Transient toast: unknown cmd / errors / clear confirm -->
          <transition name="term-toast">
            <div v-if="lastMessage" class="term-toast" :class="{ 'is-error': lastMessage.startsWith('✕') }">
              {{ lastMessage }}
            </div>
          </transition>
          <span class="term-prompt">❯</span>
          <span class="term-input-text">{{ input.slice(0, cursorPos) }}</span>
          <span class="term-caret">▌</span>
          <span class="term-input-text">{{ input.slice(cursorPos) }}</span>
          <span v-if="!input" class="term-placeholder">{{ isZh ? "输入 $ 查看命令 或直接输入命令..." : "Type $ for commands or type directly..." }}</span>
        </div>
      </div>
    <!-- IME-friendly hidden input: owns text via native input events so
         Chinese composition (pinyin) works; display mirrors input.value -->
    <input
      ref="hiddenInput"
      class="term-hidden-input"
      type="text"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      @keydown="onKeydown"
      @input="onInput"
      @compositionstart="onCompStart"
      @compositionend="onCompEnd"
    />
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { assetUrl } from "@/data/assets"
import { experiencesData, experiencesDataZh, projectsData, skillsData } from "@/data/portfolio"
import avatarImage from "@/photos/avatar.jpg"
import TerminalChatDemo from "./TerminalChatDemo.vue"
import InfiniteProgressLogo from "./InfiniteProgressLogo.vue"
import blogData from "@/data/blog.json"

const { t, locale } = useI18n()
const skin = inject("skin")
const theme = inject("theme")

const outputEl = ref(null)
const hiddenInput = ref(null)
const currentView = ref(null)
const history = ref([])
const input = ref("")
const cursorPos = ref(0)
const historyIdx = ref(-1)
const savedInput = ref("")
const suggestIdx = ref(0)
const showPalette = ref(false)
const paletteIdx = ref("")
const lastMessage = ref("") // transient feedback (unknown cmd / errors / toasts)
let msgTimer = 0

const HISTORY_LIMIT = 50

const isZh = computed(() => locale.value === "zh")
const expList = computed(() => isZh.value ? experiencesDataZh : experiencesData)
const blogStats = blogData.stats
const blogTop6 = blogData.articles.slice(0, 6)

function fnum(n) { if (n == null) return "0"; if (n >= 10000) return `${(n / 10000).toFixed(1)}w`; if (n >= 1000) return `${(n / 1000).toFixed(1)}k`; return String(n) }

// ======== COMMANDS ========
const cmdList = ["help","whoami","about","projects","skills","blog","experience","clear","theme","lang","open","gui","exit"]
// Chinese aliases so native users can type in their own language.
const zhAliasMap = {
  help: "help", whoami: "whoami",
  帮助: "help", 简介: "whoami", 关于: "about", 关于我: "about",
  项目: "projects", 技能: "skills", 博客: "blog", 时间线: "experience",
  清屏: "clear", 主题: "theme", 语言: "lang", 打开: "open", 界面: "gui", 退出: "exit",
  关于我: "about", 我的项目: "projects", 我的技能: "skills",
}
const zhSuggest = ["关于我","项目","技能","博客","时间线","简介","帮助","清屏","主题","语言","打开","退出"]

const cmdDescriptions = computed(() => { const z = isZh.value; return { help: z?"显示命令":"Show commands", whoami: z?"个人简介":"Personal intro", about: z?"关于我":"About me", projects: z?"项目作品":"Projects", skills: z?"技能":"Skills", blog: z?"CSDN博客":"CSDN blog", experience: z?"时间线":"Timeline", clear: z?"清屏":"Clear", theme: z?"切换主题":"Toggle theme", lang: z?"切换语言":"Toggle lang", open: z?"打开链接":"Open link", gui: z?"图形界面":"GUI mode", exit: z?"图形界面":"GUI mode" } })

const cmdHelpList = computed(() => { const z = isZh.value; return [["about",z?"关于我":"About me"],["projects",z?"项目":"Projects"],["skills",z?"技能":"Skills"],["blog",z?"博客":"Blog"],["experience",z?"时间线":"Timeline"],["whoami",z?"简介":"Intro"],["clear",z?"清屏":"Clear"],["theme dark|light",z?"主题":"Theme"],["lang zh|en",z?"语言":"Language"],["open blog|resume",z?"链接":"Link"],["gui",z?"图形界面":"GUI"]] })

const paletteCmds = computed(() => { const z = isZh.value; return [
  { cmd: "about", icon: "👤", desc: z?"查看个人介绍":"View about me" },
  { cmd: "projects", icon: "📦", desc: z?"查看项目作品":"View projects" },
  { cmd: "skills", icon: "🛠", desc: z?"查看技能列表":"View skills" },
  { cmd: "blog", icon: "📝", desc: z?"查看CSDN博客":"View CSDN blog" },
  { cmd: "experience", icon: "📅", desc: z?"查看时间线":"View timeline" },
  { cmd: "whoami", icon: "🪪", desc: z?"个人简介卡片":"Personal info card" },
  { cmd: "theme dark", icon: "🌙", desc: z?"暗黑模式":"Dark mode" },
  { cmd: "theme light", icon: "☀️", desc: z?"亮色模式":"Light mode" },
  { cmd: "lang zh", icon: "🇨🇳", desc: z?"切换中文":"Switch to Chinese" },
  { cmd: "lang en", icon: "🇬🇧", desc: z?"切换英文":"Switch to English" },
  { cmd: "open blog", icon: "🔗", desc: z?"打开CSDN":"Open CSDN" },
  { cmd: "gui", icon: "🖥", desc: z?"切换图形界面":"Switch to GUI" },
  { cmd: "help", icon: "❓", desc: z?"显示帮助":"Show help" },
  { cmd: "clear", icon: "🧹", desc: z?"清屏":"Clear screen" },
] })

// Suggestions: match both en commands and zh aliases (when locale is zh).
const suggestions = computed(() => {
  const q = input.value.trim().toLowerCase()
  if (!q || q === "$") return []
  if (isZh.value) {
    // If user is typing Chinese, prefer zh aliases; else match commands too.
    const isCjk = /[一-鿿]/.test(q)
    if (isCjk) return zhSuggest.filter(s => s.toLowerCase().includes(q)).slice(0, 6)
  }
  return cmdList.filter(c => c.startsWith(q)).slice(0, 6)
})

function applySuggestion(s) { input.value = s + " "; cursorPos.value = input.value.length; suggestIdx.value = 0; showPalette.value = false; syncInputEl() }
function selectPaletteCmd(c) { input.value = c + " "; cursorPos.value = input.value.length; showPalette.value = false; paletteIdx.value = ""; focusInput(); syncInputEl() }

// ======== EXECUTE ========
function execute(cmd) {
  const parts = cmd.trim().split(/\s+/); let main = parts[0].toLowerCase(); const arg = parts.slice(1).join(" ")
  // Resolve Chinese alias → canonical command
  if (zhAliasMap[main]) main = zhAliasMap[main]
  const known = ["help","whoami","about","projects","skills","blog","experience","clear","theme","lang","open","gui","exit"]
  if (!known.includes(main)) {
    flash(isZh.value ? `✕ 未知命令: ${parts[0]} — 输入 help 查看可用命令` : `✕ unknown command: ${parts[0]} — type help`)
    return
  }
  switch (main) {
    case "help": currentView.value = "help"; break
    case "whoami": currentView.value = "whoami"; break
    case "about": currentView.value = "about"; break
    case "projects": currentView.value = "projects"; break
    case "skills": currentView.value = "skills"; break
    case "blog": currentView.value = "blog"; break
    case "experience": currentView.value = "experience"; break
    case "clear": history.value = []; currentView.value = null; flash(isZh.value ? "🧹 已清屏" : "🧹 cleared"); break
    case "theme":
      if (arg==="dark"||arg==="light"){ theme.value=arg; document.documentElement.classList.toggle("dark",arg==="dark"); window.localStorage.setItem("theme",arg); flash(isZh.value?`✓ 主题 ${arg}`:`✓ theme ${arg}`) }
      else flash(isZh.value ? "✕ 用法: theme dark|light" : "✕ usage: theme dark|light")
      break
    case "lang":
      if(arg==="zh"||arg==="en"){ if(locale.value!==arg){ locale.value=arg; document.documentElement.lang=arg; window.localStorage.setItem("locale",arg); const b=import.meta.env.BASE_URL==="/"?"":import.meta.env.BASE_URL.replace(/\/$/,""); window.history.replaceState(null,"",`${b}/${arg}${window.location.hash}`) } flash(isZh.value?`✓ 语言 ${arg}`:`✓ lang ${arg}`) }
      else flash(isZh.value ? "✕ 用法: lang zh|en" : "✕ usage: lang zh|en")
      break
    case "open":
      if (arg==="blog") { window.open("https://blog.csdn.net/Ycy06721","_blank","noreferrer"); flash(isZh.value?"🔗 正在打开 CSDN...":"🔗 opening CSDN...") }
      else if (arg==="resume") { window.open(assetUrl("resume.pdf"),"_blank","noreferrer"); flash(isZh.value?"🔗 正在打开简历...":"🔗 opening resume...") }
      else flash(isZh.value ? "✕ 用法: open blog|resume" : "✕ usage: open blog|resume")
      break
    case "gui": case "exit": switchToGui(); break
  }
}
function switchToGui() { skin.value="glass"; document.documentElement.setAttribute("data-skin","glass"); window.localStorage.setItem("skin","glass") }

function flash(msg) { window.clearTimeout(msgTimer); lastMessage.value = msg; msgTimer = window.setTimeout(() => { lastMessage.value = "" }, 2600) }

function runCommand(cmd) { history.value.push({cmd}); if (history.value.length > HISTORY_LIMIT) history.value.shift(); execute(cmd); input.value=""; cursorPos.value=0; historyIdx.value=-1; suggestIdx.value=0; showPalette.value=false; syncInputEl(); focusInput(); nextTick(()=>{if(outputEl.value)outputEl.value.scrollTop=outputEl.value.scrollHeight}) }
function reRun(cmd) { currentView.value=null; nextTick(()=>{execute(cmd); nextTick(()=>{if(outputEl.value)outputEl.value.scrollTop=outputEl.value.scrollHeight})}) }

// ======== KEYBOARD ========
let composing = false
function onCompStart() { composing = true }
function onCompEnd() { composing = false; onInput() }
// Native input events own the text (incl. IME composition); we mirror to state.
function onInput() {
  const el = hiddenInput.value
  if (!el) return
  input.value = el.value
  cursorPos.value = el.selectionStart ?? el.value.length
  suggestIdx.value = 0
  nextTick(() => { if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight })
}

// Keep the hidden input's value in sync when we programmatically edit `input`.
function syncInputEl() {
  const el = hiddenInput.value
  if (!el) return
  el.value = input.value
  const pos = cursorPos.value
  try { el.setSelectionRange(pos, pos) } catch { /* ignore */ }
}

function onKeydown(e) {
  if (showPalette.value) {
    // Palette navigation
    const cmds = paletteCmds.value; const idx = cmds.findIndex(c => c.cmd === paletteIdx.value)
    if (e.key === "Escape") { e.preventDefault(); showPalette.value = false; input.value = ""; cursorPos.value = 0; syncInputEl() }
    else if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); const n = idx < 0 ? 0 : (idx + 1) % cmds.length; paletteIdx.value = cmds[n].cmd }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); const n = idx <= 0 ? cmds.length - 1 : idx - 1; paletteIdx.value = cmds[n].cmd }
    else if (e.key === "Enter") { e.preventDefault(); if (paletteIdx.value) selectPaletteCmd(paletteIdx.value); else if (cmds.length) selectPaletteCmd(cmds[0].cmd) }
    else if (e.key === "Backspace") { e.preventDefault(); showPalette.value = false; input.value = ""; cursorPos.value = 0; syncInputEl() }
    else if (e.key.length === 1) { e.preventDefault(); showPalette.value = false; input.value = e.key; cursorPos.value = 1; syncInputEl() }
    return
  }

  if (e.key === "Enter") {
    e.preventDefault()
    const cmd = input.value.trim()
    // $ alone → show palette
    if (cmd === "$") { showPalette.value = true; paletteIdx.value = paletteCmds.value[0]?.cmd || ""; syncInputEl(); return }
    if (cmd) runCommand(cmd)
  } else if (e.key === "Backspace") {
    // During IME composition, let the browser handle it.
    if (composing) return
    e.preventDefault(); suggestIdx.value=0
    const el = hiddenInput.value
    if (el) { el.value = input.value.slice(0, cursorPos.value - 1) + input.value.slice(cursorPos.value); input.value = el.value; cursorPos.value = Math.max(0, cursorPos.value - 1); el.setSelectionRange(cursorPos.value, cursorPos.value) }
  } else if (e.key === "Delete") {
    if (composing) return
    e.preventDefault(); suggestIdx.value=0
    const el = hiddenInput.value
    if (el) { el.value = input.value.slice(0, cursorPos.value) + input.value.slice(cursorPos.value + 1); input.value = el.value; el.setSelectionRange(cursorPos.value, cursorPos.value) }
  } else if (e.key === "ArrowUp") {
    e.preventDefault()
    if (suggestions.value.length && input.value.trim()) { if(suggestIdx.value>0) suggestIdx.value--; else suggestIdx.value=suggestions.value.length-1 }
    // Empty input: ↑ recalls the most recent command directly (Claude Code style)
    else if (history.value.length) { if(historyIdx.value===-1) savedInput.value=input.value; if(historyIdx.value<history.value.length-1){ historyIdx.value++; input.value=history.value[history.value.length-1-historyIdx.value].cmd; cursorPos.value=input.value.length; syncInputEl() } }
  } else if (e.key === "ArrowDown") {
    e.preventDefault()
    if (suggestions.value.length && input.value.trim()) { if(suggestIdx.value<suggestions.value.length-1) suggestIdx.value++; else suggestIdx.value=0 }
    else if (historyIdx.value>0) { historyIdx.value--; input.value=history.value[history.value.length-1-historyIdx.value].cmd; cursorPos.value=input.value.length; syncInputEl() }
    else if (historyIdx.value===0) { historyIdx.value=-1; input.value=savedInput.value; cursorPos.value=input.value.length; syncInputEl() }
  } else if (e.key === "ArrowLeft") { e.preventDefault(); suggestIdx.value=0; if(cursorPos.value>0) cursorPos.value--; if(hiddenInput.value) hiddenInput.value.setSelectionRange(cursorPos.value, cursorPos.value) }
  else if (e.key === "ArrowRight") { e.preventDefault(); suggestIdx.value=0; if(cursorPos.value<input.value.length) cursorPos.value++; if(hiddenInput.value) hiddenInput.value.setSelectionRange(cursorPos.value, cursorPos.value) }
  else if (e.key === "Home") { e.preventDefault(); cursorPos.value=0; suggestIdx.value=0; if(hiddenInput.value) hiddenInput.value.setSelectionRange(0, 0) }
  else if (e.key === "End") { e.preventDefault(); cursorPos.value=input.value.length; suggestIdx.value=0; if(hiddenInput.value) hiddenInput.value.setSelectionRange(input.value.length, input.value.length) }
  else if (e.key === "Tab") { e.preventDefault(); if(suggestions.value.length===1) applySuggestion(suggestions.value[0]); else if(suggestions.value.length&&suggestIdx.value>=0) applySuggestion(suggestions.value[suggestIdx.value]) }
  else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); history.value=[]; currentView.value=null; flash(isZh.value ? "🧹 已清屏" : "🧹 cleared") }
  else if (e.key === "c" && e.ctrlKey) { e.preventDefault(); input.value=""; cursorPos.value=0; suggestIdx.value=0; syncInputEl() }
  else if (e.key === "$" && !input.value && !composing) { e.preventDefault(); showPalette.value=true; paletteIdx.value=paletteCmds.value[0]?.cmd||"" }
  // NOTE: normal printable keys (incl. IME) are NOT intercepted here — the
  // native input handles them and fires @input, which mirrors to display.
  nextTick(()=>{ if(outputEl.value) outputEl.value.scrollTop=outputEl.value.scrollHeight })
}
function focusInput() { hiddenInput.value?.focus() }
onMounted(() => focusInput())
</script>

<style scoped>
/* ====== SHELL (full viewport, flex column, no frame) ====== */
.term-shell{position:fixed;inset:0;z-index:10;display:flex;flex-direction:column;cursor:text;font-family:var(--construct-font-mono);font-size:0.78rem;line-height:1.65;color:var(--construct-text);background:var(--term-shell-bg,#fafafa);}
:root.dark .term-shell,.dark .term-shell{--term-shell-bg:#0a0a0a;}
.term-hidden-input{position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;}

/* ====== BODY (full viewport, no frame, above ambient bg) ====== */
.term-body{position:relative;z-index:1;flex:1;overflow-y:auto;padding:1.5rem 1.5rem 0.5rem;scroll-behavior:smooth;}
@media(min-width:768px){.term-body{padding:2rem 2.5rem 1rem;}}

/* ====== WELCOME — pixel MARC header top-left ====== */
.term-welcome{
  margin-bottom:0.5rem;
  display:flex;flex-direction:column;
  animation:termFadeIn 0.5s ease both;
}
.term-welcome__header{margin-bottom:0.2rem;}
/* MARC banner (Claude Code / Hermes terminal style) */
.marc-ascii{font-family:var(--construct-font-mono);font-size:clamp(0.34rem,1.05vw,0.48rem);line-height:1.14;color:var(--construct-gold);margin:0 0 0.45rem;user-select:none;}
.term-welcome__name{font-size:0.85rem;margin-bottom:0.2rem;}
.term-welcome__hint{font-size:0.65rem;opacity:0.35;}

/* ====== AMBIENT BACKGROUND — bright "無限進步" behind content; content panels
   are opaque so the covered part reads dim, empty space reads bright ====== */
.term-bg{
  position:fixed;inset:0;z-index:0;
  pointer-events:none;
  display:flex;align-items:center;justify-content:center;
  user-select:none;
}
.term-bg__logo{
  width:min(72vw,560px);
  color:var(--construct-gold);       /* same green + full brightness as MARC */
  opacity:1;
  transition:opacity 0.3s;
}


/* ====== HISTORY ====== */
.term-hist{display:flex;align-items:baseline;gap:0.35rem;padding:0.05rem 0;opacity:0.4;font-size:0.7rem;cursor:pointer;transition:opacity 0.15s;}
.term-hist:hover{opacity:0.7;}
.term-hist__cmd{font-size:0.7rem;}

/* ====== PANELS ====== */
/* Panels use opaque backgrounds so the ambient logo is dimmed wherever
   content sits (empty space stays bright). */
.term-panel{border:1px solid var(--construct-line);background:var(--construct-panel-strong);padding:1.15rem 1.3rem;margin-bottom:0.5rem;}
.term-panel__head{color:var(--construct-gold);font-weight:700;font-size:0.72rem;margin-bottom:0.6rem;letter-spacing:0.04em;}

/* ====== WHOAMI ====== */
.term-whoami{display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;}
.term-whoami__avatar{width:3.5rem;height:3.5rem;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid var(--construct-gold);animation:termAvatarIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;}
@keyframes termAvatarIn{from{opacity:0;transform:scale(0.6);}to{opacity:1;transform:scale(1);}}
.term-whoami__name{font-size:1rem;font-weight:700;color:var(--construct-gold-strong);}
.term-whoami__bio{line-height:1.75;}

/* ====== ABOUT ====== */
.term-about__p{line-height:1.8;margin-bottom:0.5rem;}
.term-about__link{display:inline-flex;align-items:center;gap:0.5rem;margin-top:0.3rem;}

/* ====== PROJECTS ====== */
.term-projects{display:flex;flex-direction:column;gap:0.7rem;}
.term-proj{position:relative;display:flex;flex-wrap:wrap;gap:1rem;border:1px solid var(--construct-line);background:var(--construct-panel-strong);padding:1.15rem 1.2rem;overflow:hidden;animation:termSlideUp 0.5s ease both;transition:border-color 0.25s,box-shadow 0.25s,transform 0.2s;}
.term-proj:hover{border-color:var(--construct-gold);box-shadow:0 0 18px color-mix(in srgb,var(--construct-gold) 20%,transparent);transform:translateY(-2px);}
.term-proj--from-left{animation-name:termSlideLeft;}
.term-proj--from-right{animation-name:termSlideRight;}
.term-proj--from-up{animation-name:termSlideUp;}
.term-proj__no{font-size:1.5rem;font-weight:700;color:var(--construct-gold);opacity:0.3;flex-shrink:0;align-self:flex-start;}
.term-proj__body{flex:1 1 60%;min-width:0;z-index:1;}
.term-proj__header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.3rem;}
.term-proj__title{font-size:0.95rem;font-weight:700;margin:0;}
.term-proj__period{font-size:0.64rem;white-space:nowrap;}
.term-proj__desc{line-height:1.65;margin:0 0 0.35rem;font-size:0.76rem;}
.term-proj__watermark{position:absolute;right:-0.8rem;bottom:-1.2rem;font-size:6rem;font-weight:700;color:var(--construct-gold);opacity:0.04;pointer-events:none;user-select:none;line-height:1;}

/* GetCoupon CSS pixel-art coupon icon — flow element on the right, no overlap */
.term-proj__icon{
  align-self:center;
  flex-shrink:0;
  width:6.5rem;height:6.5rem;
  display:flex;align-items:center;justify-content:center;
  opacity:0.5;pointer-events:none;z-index:0;
  transition:opacity 0.3s,transform 0.3s;
}
.term-proj:hover .term-proj__icon{opacity:0.85;transform:scale(1.06);}

.px-coupon{
  width:5.5rem;height:3.4rem;
  image-rendering:pixelated;
  border:2px solid var(--construct-gold);
  background:var(--construct-panel-strong);
  position:relative;
  box-shadow:0 0 10px color-mix(in srgb,var(--construct-gold) 25%,transparent);
}
/* Dotted ticket perforation line */
.px-coupon::before{
  content:"";position:absolute;left:0;right:0;top:1.05rem;
  height:2px;
  background:repeating-linear-gradient(90deg,var(--construct-gold) 0 3px,transparent 3px 6px);
  opacity:0.5;
}
/* Scalloped cut-outs on left & right */
.px-coupon__cut{position:absolute;top:50%;width:0.9rem;height:0.9rem;background:var(--construct-panel);border-radius:50%;transform:translateY(-50%);}
.px-coupon__cut--l{left:-0.45rem;}
.px-coupon__cut--r{right:-0.45rem;}
.px-coupon__tag{
  position:absolute;left:0.4rem;top:0.12rem;
  font-family:var(--construct-font-display);font-weight:700;
  font-size:1.1rem;color:var(--construct-gold);
}
.px-coupon__code{
  position:absolute;right:0.45rem;bottom:0.12rem;
  font-family:var(--construct-font-mono);
  font-size:0.42rem;letter-spacing:0.08em;
  color:var(--construct-gold);opacity:0.7;
}

/* JAVIS fixed-height chat demo — description no longer shifts */
.term-demo-fixed{
  flex-basis:100%;max-width:100%;
  margin-top:0.8rem;
  height:16rem;min-height:16rem;max-height:16rem;
  flex-shrink:0;overflow:hidden;
  border:1px solid var(--construct-line);
  background:#0a0a0a;
  animation:termFadeIn 0.4s ease both;
}
.term-demo-fixed :deep(.tdemo){width:100%;height:100%;min-height:0;overflow:hidden;}

/* ====== TAGS ====== */
.term-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.5rem;}
.term-tags--lg{gap:0.5rem;}
.term-tag{padding:0.1rem 0.5rem;border:1px solid var(--construct-line);font-size:0.62rem;opacity:0.85;background:var(--construct-panel);transition:border-color 0.2s,background 0.2s,transform 0.2s;}
.term-tag:hover{border-color:var(--construct-gold);transform:translateY(-1px);}
.term-tag--skill{font-size:0.72rem;padding:0.18rem 0.7rem;}
.term-tag--link{border-color:var(--construct-gold);opacity:1;}
.term-tag--pop{animation:termTagPop 0.3s ease both;}

/* ====== STATS ====== */
.term-stats{display:flex;flex-wrap:wrap;gap:0.7rem;margin-bottom:0.7rem;}
.term-stat{flex:1 1 auto;min-width:5rem;display:flex;flex-direction:column;align-items:center;padding:0.7rem 0.8rem;border:1px solid var(--construct-line);background:var(--construct-panel-strong);transition:border-color 0.25s,box-shadow 0.25s,transform 0.2s;}
.term-stat--glow:hover{border-color:var(--construct-gold);box-shadow:0 0 14px color-mix(in srgb,var(--construct-gold) 15%,transparent);transform:translateY(-2px);}
.term-stat__icon{font-size:1.3rem;margin-bottom:0.15rem;}
.term-stat__val{font-size:1.2rem;font-weight:700;color:var(--construct-gold-strong);}
.term-stat__label{font-size:0.58rem;opacity:0.45;margin-top:0.1rem;}

/* ====== BLOG ====== */
.term-blog-list{margin-top:0.3rem;}
.term-blog-item{padding:0.25rem 0;border-bottom:1px solid var(--construct-line);font-size:0.74rem;line-height:1.45;}
.term-blog-item:last-child{border-bottom:none;}

/* ====== TIMELINE ====== */
.term-timeline{position:relative;padding-left:0;}
.term-tl-item{position:relative;display:flex;gap:0.8rem;padding:0.35rem 0 0.35rem 1.2rem;}
.term-tl-item__dot{position:absolute;left:0;top:0.6rem;width:0.45rem;height:0.45rem;border-radius:50%;background:var(--construct-gold);flex-shrink:0;}
.term-tl-item__line{position:absolute;left:0.19rem;top:1.2rem;bottom:0;width:1px;background:var(--construct-line);}
.term-tl-item:last-child .term-tl-item__line{display:none;}
.term-tl-item__body{flex:1;line-height:1.55;}
.term-tl-item__desc{margin-top:0.1rem;font-size:0.74rem;}

/* ====== HELP ====== */
.term-help-grid{display:flex;flex-direction:column;gap:0.1rem;}
.term-help-row{display:flex;gap:1rem;padding:0.12rem 0;}
.term-cmd-name{color:var(--construct-gold-strong);min-width:9rem;font-weight:700;font-size:0.74rem;}

/* ====== INPUT BAR (fixed bottom, no frame) ====== */
.term-input-wrap{position:relative;z-index:1;flex-shrink:0;border-top:1px solid var(--construct-line);background:var(--construct-panel-strong);}
.term-input-bar{display:flex;align-items:baseline;padding:0.55rem 1.2rem 0.65rem;position:relative;}
@media(min-width:768px){.term-input-bar{padding:0.6rem 2rem 0.7rem;}}
.term-prompt{color:var(--construct-gold);margin-right:0.35rem;font-weight:700;user-select:none;}
.term-prompt--sm{font-size:0.65rem;margin-right:0.25rem;}
.term-input-text{white-space:pre-wrap;}
.term-caret{color:var(--construct-gold);background:color-mix(in srgb,var(--construct-gold) 18%,transparent);animation:termBlink 0.85s step-end infinite;}
.term-placeholder{position:absolute;left:2rem;opacity:0.18;pointer-events:none;font-size:0.7rem;}
@keyframes termBlink{0%,49%{opacity:1}50%,100%{opacity:0}}

/* ====== $ PALETTE (Codex-style) ====== */
.term-palette{position:absolute;bottom:100%;left:0;right:0;background:var(--construct-panel-strong);border:1px solid var(--construct-gold);border-bottom:none;padding:0.7rem;z-index:5;animation:termFadeIn 0.15s ease both;max-height:18rem;overflow-y:auto;}
.term-palette__title{font-size:0.62rem;opacity:0.4;margin-bottom:0.5rem;letter-spacing:0.06em;text-transform:uppercase;}
.term-palette__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(11rem,1fr));gap:0.35rem;}
.term-palette__item{display:flex;align-items:center;gap:0.4rem;padding:0.4rem 0.55rem;border:1px solid var(--construct-line);background:var(--construct-panel);cursor:pointer;text-align:left;font-family:var(--construct-font-mono);font-size:0.68rem;color:var(--construct-text);transition:border-color 0.15s,background 0.15s;}
.term-palette__item:hover,.term-palette__item.is-focused{border-color:var(--construct-gold);background:color-mix(in srgb,var(--construct-gold) 6%,var(--construct-panel));}
.term-palette__icon{font-size:0.9rem;flex-shrink:0;}
.term-palette__cmd{font-weight:700;color:var(--construct-gold-strong);min-width:4rem;}
.term-palette__desc{opacity:0.4;font-size:0.6rem;}

/* ====== AUTOCOMPLETE ====== */
.term-suggest{position:absolute;bottom:100%;left:0;right:0;background:var(--construct-panel-strong);border:1px solid var(--construct-line);border-bottom:none;padding:0.25rem 0;z-index:5;animation:termFadeIn 0.12s ease both;}
.term-suggest__item{display:flex;align-items:baseline;gap:1rem;padding:0.22rem 1.1rem;cursor:pointer;font-size:0.72rem;transition:background 0.1s;}
.term-suggest__item:hover,.term-suggest__item.is-active{background:color-mix(in srgb,var(--construct-gold) 8%,transparent);}
.term-suggest__cmd{color:var(--construct-gold-strong);font-weight:700;min-width:6rem;}
.term-suggest__desc{opacity:0.4;font-size:0.66rem;}

/* ====== UTILITY ====== */
.term-hl{color:var(--construct-gold-strong);}
.term-dim{opacity:0.45;}

/* ====== TOAST (transient feedback above input) ====== */
.term-toast{
  position:absolute;bottom:130%;left:1.2rem;
  padding:0.35rem 0.8rem;
  border:1px solid var(--construct-gold);
  background:var(--construct-panel-strong);
  color:var(--construct-gold-strong);
  font-size:0.68rem;
  box-shadow:0 6px 20px color-mix(in srgb,var(--construct-gold) 18%,transparent);
}
.term-toast.is-error{color:#ff5f56;border-color:#ff5f56;}
.term-toast-enter-active{transition:opacity 0.18s ease,transform 0.18s ease;}
.term-toast-leave-active{transition:opacity 0.25s ease;}
.term-toast-enter-from,.term-toast-leave-to{opacity:0;transform:translateY(6px);}
.term-toast-enter-to,.term-toast-leave-from{opacity:1;transform:translateY(0);}

/* ====== RETRO DISPLAY ANIMATIONS ====== */
/* Panels render with a scan-in effect (CRT line sweep from top) */
.term-anim{animation:termScanIn 0.45s cubic-bezier(0.22,1,0.36,1) both;}
@keyframes termScanIn{
  from{opacity:0;clip-path:inset(0 0 100% 0);}
  to{opacity:1;clip-path:inset(0 0 0 0);}
}
/* History rows fade up with a typing hint */
.term-hist{animation:termFadeUp 0.3s ease both;}
@keyframes termFadeUp{from{opacity:0;transform:translateY(4px);}to{opacity:0.4;transform:translateY(0);}}
/* ====== ANIMATIONS ====== */
@keyframes termFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes termSlideLeft{from{opacity:0;transform:translateX(-2rem)}to{opacity:1;transform:translateX(0)}}
@keyframes termSlideRight{from{opacity:0;transform:translateX(2rem)}to{opacity:1;transform:translateX(0)}}
@keyframes termSlideUp{from{opacity:0;transform:translateY(2rem)}to{opacity:1;transform:translateY(0)}}
@keyframes termTagPop{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}

/* Scrollbar */
.term-body::-webkit-scrollbar{width:5px;}
.term-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.1);border-radius:0;}
.dark .term-body::-webkit-scrollbar-thumb{background:rgba(0,255,65,0.1);}

/* Mobile */
@media(max-width:640px){
  .term-shell{padding:0;font-size:0.7rem;}
  .term-body{padding:0.7rem 0.8rem 0.3rem;}
  .term-input-bar{padding:0.4rem 0.8rem 0.5rem;}
  .term-placeholder{display:none;}
  .term-welcome{min-height:calc(100vh - 10rem);}
  .term-panel{padding:0.7rem 0.85rem;}
  .term-proj__watermark{font-size:3.5rem;right:-0.3rem;bottom:-0.6rem;}
  .term-stats{gap:0.4rem;}
  .term-stat{min-width:3.5rem;padding:0.45rem 0.5rem;}
  .term-stat__val{font-size:1rem;}
  .term-palette__grid{grid-template-columns:repeat(auto-fill,minmax(9rem,1fr));}
}
</style>
