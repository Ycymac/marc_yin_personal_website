<template>
  <div class="tdemo" :class="{ 'is-done': done }">
    <div ref="scrollRef" class="tdemo__feed">
      <!-- User question (terminal prompt style) -->
      <div v-if="sent" class="tdemo__row tdemo__row--user">
        <div class="tdemo__bubble">
          <span class="tdemo__qmark">❯</span> {{ question }}
        </div>
      </div>

      <!-- Knowledge-base retrieval -->
      <div v-if="sent && retrieving" class="tdemo__row tdemo__row--bot">
        <div class="tdemo__retrieve">
          <span class="tdemo__spinner" aria-hidden="true" />
          <span>{{ retrieveLabel }}</span>
        </div>
      </div>

      <!-- Streamed answer (block-by-block typewriter) -->
      <div v-if="answering" class="tdemo__row tdemo__row--bot">
        <div class="tdemo__answer">
          <component
            :is="block.tag"
            v-for="block in typedBlocks"
            :key="block.i"
            class="tdemo__block"
            :class="`tdemo__block--${block.type}`"
          >
            <span v-html="block.html" /><span v-if="block.active && !done" class="tdemo__caret" />
          </component>
        </div>
      </div>
    </div>

    <!-- Input bar: types the question, then "sends" -->
    <div class="tdemo__inputbar" :class="{ 'is-disabled': sent }">
      <span class="tdemo__inputprompt">❯</span>
      <div class="tdemo__input">
        <span>{{ typedQuery }}</span><span v-if="phase === 'typing'" class="tdemo__caret tdemo__caret--input" />
        <span v-if="!typedQuery && phase !== 'typing'" class="tdemo__placeholder">
          {{ locale === "zh" ? "输入问题，回车发送" : "Type a question, Enter to send" }}
        </span>
      </div>
    </div>

    <!-- Replay button once the stream finishes (modern-mode style) -->
    <button
      v-if="done"
      type="button"
      class="tdemo__replay"
      :aria-label="locale === 'zh' ? '重新播放演示' : 'Replay demo'"
      @click="restart"
    >
      <RotateCcw class="h-4 w-4" aria-hidden="true" />
      <span>{{ locale === "zh" ? "重新播放" : "Replay" }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue"
import { RotateCcw } from "lucide-vue-next"

const props = defineProps({
  locale: { type: String, default: "zh" },
  autostart: { type: Boolean, default: true },
})

const question = computed(() =>
  props.locale === "zh" ? "java中基础数据类型介绍一下" : "Explain Java primitive data types"
)

function esc(text) { return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") }
function inline(text) { return esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>") }
function inlinePartial(text) {
  let html = esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>")
  return html.replace(/\*\*/g, "").replace(/`/g, "")
}

// Structured answer blocks (terminal-styled, same content structure as RAG demo)
const SOURCE = computed(() => {
  const z = props.locale === "zh"
  return z ? [
    { type: "p", tag: "p", text: "Java 中的基础数据类型（Primitive Data Types）主要分为四大类，共 8 种。" },
    { type: "h3", tag: "h4", text: "一、整数类型" },
    { type: "li", tag: "div", text: "**byte**：1 字节（8位），取值范围 -128 ~ 127" },
    { type: "li", tag: "div", text: "**short**：2 字节（16位），取值范围 -32,768 ~ 32,767" },
    { type: "li", tag: "div", text: "**int**：4 字节（32位），最常用的整数类型" },
    { type: "li", tag: "div", text: "**long**：8 字节（64位），用于存储较大整数，数字后加 `L`" },
    { type: "h3", tag: "h4", text: "二、浮点类型" },
    { type: "li", tag: "div", text: "**float**：4 字节，单精度浮点数，数字后加 `F`" },
    { type: "li", tag: "div", text: "**double**：8 字节，双精度浮点数，默认浮点类型" },
    { type: "h3", tag: "h4", text: "三、字符与布尔类型" },
    { type: "li", tag: "div", text: "**char**：2 字节，存储单个字符，如 `'A'`、`'中'`" },
    { type: "li", tag: "div", text: "**boolean**：仅 `true` / `false`，用于流程控制" },
    { type: "quote", tag: "blockquote", text: "注：基础数据类型存储在栈内存中；包装类（Integer 等）是引用类型，存储在堆内存中。" },
  ] : [
    { type: "p", tag: "p", text: "Java primitive data types fall into 4 categories, 8 types total." },
    { type: "h3", tag: "h4", text: "1. Integer Types" },
    { type: "li", tag: "div", text: "**byte**: 1 byte (8-bit), range -128 ~ 127" },
    { type: "li", tag: "div", text: "**short**: 2 bytes (16-bit), range -32,768 ~ 32,767" },
    { type: "li", tag: "div", text: "**int**: 4 bytes (32-bit), the most common integer type" },
    { type: "li", tag: "div", text: "**long**: 8 bytes (64-bit), suffix with `L`" },
    { type: "h3", tag: "h4", text: "2. Floating-Point Types" },
    { type: "li", tag: "div", text: "**float**: 4 bytes, single precision, suffix with `F`" },
    { type: "li", tag: "div", text: "**double**: 8 bytes, double precision, the default float type" },
    { type: "h3", tag: "h4", text: "3. Char & Boolean" },
    { type: "li", tag: "div", text: "**char**: 2 bytes, stores a single character like `'A'`" },
    { type: "li", tag: "div", text: "**boolean**: only `true` / `false`, used for control flow" },
    { type: "quote", tag: "blockquote", text: "Note: primitives live on the stack; wrappers (Integer etc.) are reference types on the heap." },
  ]
})

const BLOCKS = computed(() => SOURCE.value.map((b) => ({ ...b, html: inline(b.text) })))

// phase: idle → typing → sending → retrieving → answering → done
const phase = ref("idle")
const typedQuery = ref("")
const done = ref(false)
const blockIndex = ref(0)
const charPos = ref(0)
const scrollRef = ref(null)
let timer = 0

const sent = computed(() => ["retrieving", "answering", "done"].includes(phase.value))
const retrieving = computed(() => phase.value === "retrieving")
const answering = computed(() => ["answering", "done"].includes(phase.value))
const retrieveLabel = computed(() => props.locale === "zh" ? "正在检索知识库…" : "Searching knowledge base…")

const typedBlocks = computed(() => {
  if (done.value) return BLOCKS.value.map((b, i) => ({ i, type: b.type, tag: b.tag, html: b.html, active: false }))
  const out = []
  for (let i = 0; i < blockIndex.value && i < BLOCKS.value.length; i++) {
    const b = BLOCKS.value[i]
    out.push({ i, type: b.type, tag: b.tag, html: b.html, active: false })
  }
  const cur = BLOCKS.value[blockIndex.value]
  if (cur) out.push({ i: blockIndex.value, type: cur.type, tag: cur.tag, html: inlinePartial(cur.text.slice(0, charPos.value)), active: true })
  return out
})

function scrollToEnd() { const el = scrollRef.value; if (el) el.scrollTop = el.scrollHeight }

function typeChar() {
  const blocks = BLOCKS.value
  const block = blocks[blockIndex.value]
  if (!block) { phase.value = "done"; done.value = true; return }
  if (charPos.value < block.text.length) {
    charPos.value += 1
    nextTick(scrollToEnd)
    timer = window.setTimeout(typeChar, 18)
    return
  }
  const gap = block.type === "h3" ? 320 : block.type === "quote" ? 300 : 180
  blockIndex.value += 1
  charPos.value = 0
  nextTick(scrollToEnd)
  timer = window.setTimeout(typeChar, gap)
}

function typeQuery() {
  const q = question.value
  if (typedQuery.value.length < q.length) {
    typedQuery.value = q.slice(0, typedQuery.value.length + 1)
    timer = window.setTimeout(typeQuery, 70)
    return
  }
  phase.value = "sending"
  timer = window.setTimeout(() => {
    phase.value = "retrieving"
    typedQuery.value = ""
    nextTick(scrollToEnd)
    timer = window.setTimeout(() => {
      phase.value = "answering"
      nextTick(scrollToEnd)
      typeChar()
    }, 1400)
  }, 480)
}

function start() {
  window.clearTimeout(timer)
  done.value = false
  blockIndex.value = 0
  charPos.value = 0
  typedQuery.value = ""
  phase.value = "typing"
  timer = window.setTimeout(typeQuery, 500)
}

function restart() { start() }

defineExpose({ start, restart })

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    typedQuery.value = question.value
    blockIndex.value = BLOCKS.value.length
    phase.value = "done"
    done.value = true
    return
  }
  start()
})

onBeforeUnmount(() => { window.clearTimeout(timer) })
</script>

<style scoped>
/* Terminal-styled chat demo — mimics modern RAG demo flow with hacker colors */
.tdemo {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
  color: #00ff41;
  font-size: 0.72rem;
  border: 1px solid rgba(0, 255, 65, 0.15);
}

.tdemo__feed {
  flex: 1;
  overflow-y: auto;
  padding: 0.7rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  scroll-behavior: smooth;
}

.tdemo__row { display: flex; }
.tdemo__row--user { justify-content: flex-end; }
.tdemo__row--bot { justify-content: flex-start; }

/* User question bubble — dark green outline, terminal prompt */
.tdemo__bubble {
  max-width: 85%;
  padding: 0.4rem 0.7rem;
  border: 1px solid rgba(0, 255, 65, 0.45);
  background: rgba(0, 255, 65, 0.08);
  color: #00ff41;
  line-height: 1.5;
}
.tdemo__qmark { opacity: 0.6; }

/* Retrieval spinner */
.tdemo__retrieve {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(0, 255, 65, 0.2);
  color: rgba(0, 255, 65, 0.7);
  font-size: 0.66rem;
}
.tdemo__spinner {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid rgba(0, 255, 65, 0.2);
  border-top-color: #00ff41;
  animation: tdemoSpin 0.7s linear infinite;
}
@keyframes tdemoSpin { to { transform: rotate(1turn); } }

/* Answer blocks */
.tdemo__answer { max-width: 92%; line-height: 1.65; }
.tdemo__block { margin: 0 0 0.35rem; }
.tdemo__block--h3 {
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 0.78rem;
  color: #00ff41;
}
.tdemo__block--li { padding-left: 0.8rem; position: relative; }
.tdemo__block--li::before {
  content: "•";
  position: absolute; left: 0.1rem;
  color: rgba(0, 255, 65, 0.6);
}
.tdemo__block--quote {
  margin-top: 0.5rem;
  padding: 0.35rem 0.6rem;
  border-left: 2px solid #00ff41;
  background: rgba(0, 255, 65, 0.05);
  font-size: 0.68rem;
  color: rgba(0, 255, 65, 0.8);
}
.tdemo__block code {
  font-family: var(--editorial-display);
  font-size: 0.9em;
  padding: 0.05rem 0.3rem;
  background: rgba(0, 255, 65, 0.12);
}

/* Caret */
.tdemo__caret {
  display: inline-block;
  width: 0.45rem;
  height: 0.8rem;
  vertical-align: -0.12rem;
  background: #00ff41;
  animation: tdemoBlink 1s steps(2) infinite;
}
.tdemo__caret--input { height: 0.7rem; }
@keyframes tdemoBlink { 50% { opacity: 0; } }

/* Input bar */
.tdemo__inputbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0.6rem 0.6rem;
  padding: 0.35rem 0.5rem 0.35rem 0.7rem;
  border: 1px solid rgba(0, 255, 65, 0.25);
  background: rgba(0, 255, 65, 0.04);
  flex: 0 0 auto;
}
.tdemo__inputprompt { color: #00ff41; font-weight: 700; }
.tdemo__input {
  position: relative;
  flex: 1;
  min-height: 1rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
}
.tdemo__placeholder { color: rgba(0, 255, 65, 0.35); }

/* Replay button — mirrors modern mode position (bottom right, above input) */
.tdemo__replay {
  position: absolute;
  right: 0.6rem;
  bottom: 0.6rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.15rem;
  font-family: var(--editorial-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #00ff41;
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid rgba(0, 255, 65, 0.3);
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
}
.tdemo__replay:hover {
  transform: translateY(-1px);
  background: rgba(0, 255, 65, 0.18);
  border-color: rgba(0, 255, 65, 0.5);
}
.tdemo__replay:focus-visible { outline: 2px solid #00ff41; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .tdemo__caret { animation: none; }
  .tdemo__spinner { animation: none; }
}
</style>
