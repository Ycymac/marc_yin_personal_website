<template>
  <div class="term-demo" aria-label="Terminal demo">
    <div class="term-demo__bar">
      <span class="term-demo__dot term-demo__dot--red" />
      <span class="term-demo__dot term-demo__dot--yellow" />
      <span class="term-demo__dot term-demo__dot--green" />
      <span class="term-demo__title">{{ title }}</span>
    </div>
    <div ref="outputRef" class="term-demo__body">
      <div
        v-for="(line, idx) in visibleLines"
        :key="idx"
        class="term-demo__line"
        :class="{ 'is-prompt': line.startsWith('$'), 'is-muted': line.startsWith('#') }"
      >
        {{ line }}<span v-if="idx === visibleLines.length - 1 && !done" class="term-demo__caret">▌</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"

const props = defineProps({
  projectIndex: { type: Number, required: true },
  locale: { type: String, required: true },
})

const outputRef = ref(null)
const visibleLines = ref([])
const done = ref(false)
let timer = 0

const title = computed(() => {
  const titles = {
    0: "getcoupon@server:~$ ./startup.sh",
    1: "javis@interview-kb:~$ python query.py --kb javis_db",
    2: "marc@portfolio:~$ npm run build",
  }
  return titles[props.projectIndex] || "terminal@local:~$"
})

const scripts = computed(() => {
  const isZh = props.locale === "zh"

  const javis = [
    "$ python query.py --kb javis_db --mode rag",
    "> 正在初始化嵌入模型 (text-embedding-3-small)...",
    "> 加载向量索引 (1536维, FAISS) ... OK",
    isZh ? "> 知识库就绪: 3,842 个文档块已索引" : "> Knowledge base ready: 3,842 chunks indexed",
    "$ query --question \"" + (isZh ? "什么是JVM内存模型？" : "What is the JVM memory model?") + "\"",
    "> 检索相关文档 ... " + (isZh ? "找到 7 条" : "found 7 matches"),
    "> 生成回答 (gpt-4o-mini, temp=0.3) ...",
    (isZh
      ? "> [回答] JVM内存模型主要分为堆(Heap)、栈(Stack)、方法区(Method Area)、程序计数器(PC Register)和本地方法栈(Native Method Stack)。其中堆是所有线程共享的，用于存放对象实例和数组..."
      : "> [Answer] The JVM memory model consists of Heap, Stack, Method Area, PC Register, and Native Method Stack. The Heap is shared across all threads and stores object instances and arrays..."),
    "$ query --question \"" + (isZh ? "SpringBoot自动配置原理？" : "How does SpringBoot auto-configuration work?") + "\"",
    "> 检索相关文档 ... " + (isZh ? "找到 5 条" : "found 5 matches"),
    "> 生成回答 ...",
    (isZh
      ? "> [回答] SpringBoot通过@EnableAutoConfiguration注解和spring.factories文件实现自动配置。启动时扫描所有META-INF/spring.factories中的配置类，结合@Conditional条件注解按需加载Bean..."
      : "> [Answer] SpringBoot auto-configuration works via @EnableAutoConfiguration and spring.factories. At startup it scans all configuration classes in META-INF/spring.factories and loads Beans conditionally based on @Conditional annotations..."),
    "$ exit",
    (isZh ? "> 会话结束。共处理 2 个查询，平均检索延迟 0.38s。" : "> Session ended. Processed 2 queries, avg retrieval latency 0.38s."),
    "_",
  ]

  const getcoupon = [
    "$ java -jar getcoupon-1.0.0.jar --spring.profiles.active=prod",
    "",
    "  .   ____          _            __ _ _",
    " /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\",
    "( ( )\\___ | '_ | '_| | '_ \\/ _` | \\ \\ \\ \\",
    " \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )",
    "  '  |____| .__|_| |_|_| |_\\__, | / / / /",
    " =========|_|==============|___/=/_/_/_/",
    "",
    " :: Spring Boot 3.2.5 ::",
    "",
    "2026-01-15 10:32:15.328  INFO  [main] o.s.b.w.e.t.TomcatWebServer  : Tomcat initialized with port 8080 (http)",
    "2026-01-15 10:32:16.742  INFO  [main] o.a.c.c.StandardService   : Starting service [Tomcat]",
    "2026-01-15 10:32:17.103  INFO  [main] o.a.c.c.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.20]",
    "2026-01-15 10:32:18.221  INFO  [main] o.s.b.w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 2684 ms",
    "2026-01-15 10:32:18.556  INFO  [main] c.g.getcoupon.config.RedisConfig   : Redis connection established: localhost:6379",
    "2026-01-15 10:32:18.892  INFO  [main] c.g.getcoupon.config.RocketMQConfig : RocketMQ consumer group [coupon_consumer] registered",
    "2026-01-15 10:32:19.034  INFO  [main] o.s.b.w.e.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path ''",
    "2026-01-15 10:32:19.341  INFO  [main] c.g.getcoupon.GetCouponApplication : Started GetCouponApplication in 2.819 seconds (process running for 3.502)",
    "$ _",
  ]

  const portfolio = [
    "$ npm run build",
    "",
    "> marc_yin_personal_website@0.1.0 build",
    "> vite build",
    "",
    "vite v5.4.21 building for production...",
    "✓ 1630 modules transformed.",
    "rendering chunks...",
    "computing gzip size...",
    "dist/index.html                     0.72 kB │ gzip:  0.42 kB",
    "dist/assets/index.css              89.98 kB │ gzip: 17.64 kB",
    "dist/assets/index.js              223.51 kB │ gzip: 84.98 kB",
    "dist/assets/lottie.js             307.92 kB │ gzip: 79.08 kB",
    "✓ built in 9.13s",
    "",
    (isZh ? "> 构建成功！网站已部署到生产环境。" : "> Build successful! Site deployed to production."),
    "$ _",
  ]

  const map = { 0: getcoupon, 1: javis, 2: portfolio }
  return map[props.projectIndex] || []
})

function typeNext() {
  const script = scripts.value
  if (visibleLines.value.length >= script.length) {
    done.value = true
    return
  }
  visibleLines.value.push(script[visibleLines.value.length])
  // Auto-scroll
  requestAnimationFrame(() => {
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight
    }
  })
  // Dynamic delay: prompts have longer pause
  const line = script[visibleLines.value.length - 1]
  const delay = line === "_" ? 1200 : line.startsWith("$") ? 700 : line === "" ? 100 : 250 + Math.random() * 200
  timer = window.setTimeout(typeNext, delay)
}

onMounted(() => {
  timer = window.setTimeout(typeNext, 400)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
})
</script>

<style scoped>
.term-demo {
  width: 100%;
  height: 100%;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.15rem;
  overflow: hidden;
  font-family: var(--editorial-display);
  font-size: 0.68rem;
  line-height: 1.55;
  background: #0a0a0a;
  color: #00ff41;
  border: 1px solid rgba(0, 255, 65, 0.15);
}
:root:not(.dark) .term-demo,
[data-skin="terminal"]:not(.dark) .term-demo,
:not(.dark) .term-demo {
  background: #fafafa;
  color: #00853e;
  border-color: rgba(0, 133, 62, 0.18);
}

.term-demo__bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(0, 255, 65, 0.1);
  flex-shrink: 0;
}
:root:not(.dark) .term-demo__bar {
  background: rgba(0, 0, 0, 0.03);
  border-bottom-color: rgba(0, 133, 62, 0.12);
}

.term-demo__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  flex-shrink: 0;
}
.term-demo__dot--red    { background: #ff5f56; }
.term-demo__dot--yellow { background: #ffbd2e; }
.term-demo__dot--green  { background: #27c93f; }

.term-demo__title {
  margin-left: 0.4rem;
  font-size: 0.6rem;
  opacity: 0.45;
  letter-spacing: 0.04em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.term-demo__body {
  flex: 1;
  overflow-y: auto;
  padding: 0.65rem 0.8rem;
  scroll-behavior: smooth;
}

.term-demo__line {
  white-space: pre-wrap;
  word-break: break-all;
}
.term-demo__line.is-prompt {
  opacity: 0.85;
}
.term-demo__line.is-muted {
  opacity: 0.45;
}

.term-demo__caret {
  animation: termCaretBlink 0.85s step-end infinite;
}
@keyframes termCaretBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Scrollbar — match terminal aesthetic */
.term-demo__body::-webkit-scrollbar { width: 4px; }
.term-demo__body::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 65, 0.2);
  border-radius: 0;
}
:root:not(.dark) .term-demo__body::-webkit-scrollbar-thumb {
  background: rgba(0, 133, 62, 0.15);
}
</style>
