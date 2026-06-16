<template>
  <div class="rag-demo" :class="{ 'is-done': done }">
    <div ref="scrollRef" class="rag-demo__feed">
      <!-- User question bubble (after "send") -->
      <div v-if="sent" class="rag-demo__row rag-demo__row--user">
        <div class="rag-demo__bubble">{{ question }}</div>
      </div>

      <!-- Knowledge-base retrieval loading -->
      <div v-if="sent && retrieving" class="rag-demo__row rag-demo__row--bot">
        <div class="rag-demo__retrieve">
          <span class="rag-demo__spinner" aria-hidden="true" />
          <span class="rag-demo__retrieve-text">{{ retrieveLabel }}</span>
        </div>
      </div>

      <!-- Assistant streamed answer (typed character-by-character) -->
      <div v-if="answering" class="rag-demo__row rag-demo__row--bot">
        <div class="rag-demo__answer">
          <component
            :is="block.tag"
            v-for="block in typedBlocks"
            :key="block.i"
            class="rag-demo__block"
            :class="`rag-demo__block--${block.type}`"
          >
            <span v-html="block.html" /><span
              v-if="block.active && !done"
              class="rag-demo__caret"
            />
          </component>
        </div>
      </div>
    </div>

    <!-- Input bar: types the question, then "sends" it -->
    <div class="rag-demo__inputbar" :class="{ 'is-disabled': sent }">
      <div class="rag-demo__input">
        <span>{{ typedQuery }}</span><span v-if="phase === 'typing'" class="rag-demo__caret rag-demo__caret--input" />
        <span v-if="!typedQuery && phase !== 'typing'" class="rag-demo__placeholder">
          {{ locale === "zh" ? "有问题，尽管问" : "Ask me anything" }}
        </span>
      </div>
      <button
        type="button"
        class="rag-demo__send"
        :class="{ 'is-armed': phase === 'sending' }"
        :aria-label="locale === 'zh' ? '发送' : 'Send'"
        tabindex="-1"
      >
        <ArrowUp class="h-4 w-4" aria-hidden="true" />
      </button>
    </div>

    <!-- Replay control once the stream finishes -->
    <button
      v-if="done"
      type="button"
      class="rag-demo__replay"
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
import { ArrowUp, RotateCcw } from "lucide-vue-next"

const props = defineProps({
  locale: { type: String, default: "zh" },
  autostart: { type: Boolean, default: true },
})

const question = "java中基础数据类型介绍一下"

// Inline formatter: **bold** and `code` → safe HTML (text escaped first).
function esc(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function inline(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
}
// Partial formatter for mid-typing text: render complete pairs, then drop any
// still-open marker so a lone ** or ` never flashes on screen.
function inlinePartial(text) {
  let html = esc(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
  return html.replace(/\*\*/g, "").replace(/`/g, "")
}

// Structured answer blocks (type drives styling; tag drives element).
const SOURCE = [
  { type: "p", tag: "p", text: "Java 中的基础数据类型（Primitive Data Types）主要分为四大类，共 8 种。" },
  { type: "h3", tag: "h4", text: "一、整数类型" },
  { type: "p", tag: "p", text: "用于存储整数值，根据取值范围不同分为四种：" },
  { type: "li", tag: "div", text: "**byte**：1 字节（8位），取值范围 -128 ~ 127" },
  { type: "li", tag: "div", text: "**short**：2 字节（16位），取值范围 -32,768 ~ 32,767" },
  { type: "li", tag: "div", text: "**int**：4 字节（32位），最常用的整数类型，取值范围约 -21亿 ~ 21亿" },
  { type: "li", tag: "div", text: "**long**：8 字节（64位），用于存储较大整数，声明时需在数字后加 `L` 或 `l`（推荐大写 L）" },
  { type: "h3", tag: "h4", text: "二、浮点类型" },
  { type: "p", tag: "p", text: "用于存储带小数点的数值：" },
  { type: "li", tag: "div", text: "**float**：4 字节（32位），单精度浮点数，声明时需在数字后加 `F` 或 `f`" },
  { type: "li", tag: "div", text: "**double**：8 字节（64位），双精度浮点数，Java 中浮点数默认类型为 double" },
  { type: "h3", tag: "h4", text: "三、字符类型" },
  { type: "li", tag: "div", text: "**char**：2 字节（16位），用于存储单个字符，使用单引号包裹，如 `'A'`、`'中'`。底层基于 Unicode 编码。" },
  { type: "h3", tag: "h4", text: "四、布尔类型" },
  { type: "li", tag: "div", text: "**boolean**：用于存储逻辑值，只有两个取值：`true` 和 `false`。主要用于流程控制（如 if判断、循环条件）。" },
  { type: "quote", tag: "blockquote", text: "注：基础数据类型不是对象，存储在栈内存中；而它们的包装类（如 Integer、Double 等）是引用数据类型，存储在堆内存中。" },
]

const BLOCKS = SOURCE.map((b) => ({ ...b, html: inline(b.text) }))

// phase: idle → typing → sending → retrieving → answering → done
const phase = ref("idle")
const typedQuery = ref("")
const done = ref(false)
const blockIndex = ref(0) // which answer block is currently being typed
const charPos = ref(0) // chars typed within the current block
const scrollRef = ref(null)
let timer = 0

const sent = computed(() => ["retrieving", "answering", "done"].includes(phase.value))
const retrieving = computed(() => phase.value === "retrieving")
const answering = computed(() => ["answering", "done"].includes(phase.value))
const retrieveLabel = computed(() =>
  props.locale === "zh" ? "正在检索知识库…" : "Searching knowledge base…",
)

// Blocks rendered so far: fully-typed ones use complete markdown; the active
// block uses the partial formatter on its typed-so-far substring.
const typedBlocks = computed(() => {
  if (done.value) {
    return BLOCKS.map((b, i) => ({ i, type: b.type, tag: b.tag, html: b.html, active: false }))
  }
  const out = []
  for (let i = 0; i < blockIndex.value && i < BLOCKS.length; i++) {
    const b = BLOCKS[i]
    out.push({ i, type: b.type, tag: b.tag, html: b.html, active: false })
  }
  const cur = BLOCKS[blockIndex.value]
  if (cur) {
    out.push({
      i: blockIndex.value,
      type: cur.type,
      tag: cur.tag,
      html: inlinePartial(cur.text.slice(0, charPos.value)),
      active: true,
    })
  }
  return out
})

function scrollToEnd() {
  const el = scrollRef.value
  if (el) el.scrollTop = el.scrollHeight
}

// Type the answer one character at a time, block by block.
function typeChar() {
  const block = BLOCKS[blockIndex.value]
  if (!block) {
    phase.value = "done"
    done.value = true
    return
  }
  if (charPos.value < block.text.length) {
    charPos.value += 1
    nextTick(scrollToEnd)
    timer = window.setTimeout(typeChar, 18) // per-character cadence
    return
  }
  // block finished → pause briefly, then start the next block
  const gap = block.type === "h3" ? 320 : block.type === "quote" ? 300 : 180
  blockIndex.value += 1
  charPos.value = 0
  nextTick(scrollToEnd)
  timer = window.setTimeout(typeChar, gap)
}

// Type the query char-by-char into the input bar before "sending".
function typeQuery() {
  if (typedQuery.value.length < question.length) {
    typedQuery.value = question.slice(0, typedQuery.value.length + 1)
    timer = window.setTimeout(typeQuery, 70)
    return
  }
  // finished typing → arm send button, then send
  phase.value = "sending"
  timer = window.setTimeout(() => {
    phase.value = "retrieving" // question bubble appears + KB retrieval spinner
    nextTick(scrollToEnd)
    timer = window.setTimeout(() => {
      phase.value = "answering"
      nextTick(scrollToEnd)
      typeChar()
    }, 1400) // retrieval dwell
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

function restart() {
  start()
}

defineExpose({ start, restart })

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    typedQuery.value = question
    blockIndex.value = BLOCKS.length
    phase.value = "done"
    done.value = true
    return
  }
  if (props.autostart) start()
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
})
</script>
