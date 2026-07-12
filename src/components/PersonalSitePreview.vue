<template>
  <div
    class="site-preview"
    role="img"
    :aria-label="locale === 'zh' ? '个人介绍网站模块动画预览' : 'Animated personal website module preview'"
  >
    <div class="site-preview__folio">PORTFOLIO / 2026</div>
    <div class="site-preview__greeting">
      {{ locale === "zh" ? "你好，我是" : "HELLO, I AM" }}
    </div>
    <div class="site-preview__identity">
      <span>MARC YIN</span>
      <small>PERSONAL SITE</small>
    </div>
    <svg class="site-preview__routes" viewBox="0 0 620 150" aria-hidden="true">
      <path d="M310 8V38M310 38H92V66M310 38H528V66M310 38V96M310 96H92V122M310 96H528V122" />
    </svg>
    <ol class="site-preview__modules" aria-hidden="true">
      <li><span>01</span>HOME</li>
      <li><span>02</span>ABOUT</li>
      <li><span>03</span>PROJECTS</li>
      <li><span>04</span>BLOG</li>
      <li><span>05</span>SKILLS</li>
      <li><span>06</span>TIMELINE</li>
    </ol>
    <div class="site-preview__status">BUILDING / LEARNING / RECORDING</div>
  </div>
</template>

<script setup>
defineProps({
  locale: { type: String, required: true },
})
</script>
