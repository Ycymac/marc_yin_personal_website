<template>
  <section
    id="about"
    ref="sectionRef"
    class="motion-surface bio-section relative isolate mb-28 w-full max-w-[58rem] scroll-mt-28 text-start leading-8 sm:mb-40"
    :class="{ 'is-visible': isVisible }"
  >
    <SectionHeading>{{ t("SectionName.about") }}</SectionHeading>
    <div class="bio-kicker" aria-hidden="true">
      <span>PROFILE / MARC YIN</span>
      <span>BACKEND × AI / 2026</span>
    </div>
    <div v-if="locale === 'zh'" class="bio-copy">
      <p class="bio-lead">
        <strong>大家好!我是殷晨晏，也可以叫我 Marc。</strong>
        我是一位正在成长中的后端开发者，热爱学习新技术，也喜欢把学到的内容放进真实项目里反复验证。
      </p>
      <p>
        2024 年 9 月，我进入
        <strong>西安邮电大学软件工程专业</strong>
        学习，从 C 语言开始建立编程基础📟。同年 10 月，我通过选拔进入校级实验室
        <strong>软件科技协会</strong>
        ，开始在更浓厚的技术氛围里补充自己的工程能力。
      </p>
      <p>
        进入实验室后，我先继续学习
        <strong>数据结构与算法</strong>
        ，再逐步接触 Java 基础、SSM、MySQL、JUC、JVM，以及 RocketMQ、Redis 等后端技术内容💻。这些学习让我慢慢把零散知识串起来，也更清楚自己希望向后端开发方向持续深入。
      </p>
      <p>
        我始终觉得，只看资料还不够，真正能沉淀能力的是“动手做出来”💪。2025.11 至 2026.1，我开发了第一个个人项目
        <strong>GetCoupon 捷券优惠券管理系统</strong>
        ；2026.2 至 2026.4，我结合 GitHub 开源项目，并使用 Codex 辅助开发了第二个项目
        <strong>JAVIS</strong>
        。从需求梳理到功能落地，每一步都在帮我缩短“看懂技术”和“做出项目”之间的距离✌。
      </p>
      <p>
        目前，我也在用 Codex 辅助完善这个个人介绍网站，希望把自己的学习路径、项目经验和 AI 辅助开发实践持续整理下来。为了留住成长轨迹，我会在
        <a
          class="font-black underline underline-offset-4"
          href="https://blog.csdn.net/Ycy06721"
          target="_blank"
          rel="noreferrer"
        >
          CSDN 博客
        </a>
        中记录学习笔记、实践过程和踩坑复盘，也期待以后能遇到更多同频交流的伙伴。
      </p>
      <p>
        我清楚自己仍处在积累阶段，技术能力和工程认知都需要继续打磨✍。但我愿意主动接触新东西，也愿意通过一次次复盘，把不熟悉的问题拆开、弄懂、落地。接下来，希望自己能继续保持热情和专注，把每一次实践都变成更扎实的成长记录🚀。
      </p>
    </div>

    <div v-else class="bio-copy">
      <p class="bio-lead">
        <strong>Hi, I am Marc.</strong>
        I am a growing backend developer who enjoys learning new technologies and turning study notes into real project practice.
      </p>
      <p>
        In September 2024, I started studying
        <strong>Software Engineering at Xi'an University of Posts & Telecommunications</strong>
        and began building programming fundamentals through C language. In October 2024, I passed the selection process and joined the school-level Software Technology Association laboratory.
      </p>
      <p>
        In the lab, I continued learning
        <strong>data structures and algorithms</strong>
        , then moved into Java fundamentals, SSM, MySQL, JUC, JVM, RocketMQ, Redis and other backend topics.
      </p>
      <p>
        I believe practice is the best way to connect scattered knowledge. From November 2025 to January 2026, I built
        <strong>GetCoupon</strong>
        as my first personal project. From February to April 2026, I developed
        <strong>JAVIS</strong>
        with reference to GitHub open-source projects and Codex-assisted development.
      </p>
      <p>
        I am currently using Codex to improve this personal website and organize my backend learning path, project experience, and AI-assisted development practice.
        I also record related notes on my
        <a
          class="font-black underline underline-offset-4"
          href="https://blog.csdn.net/Ycy06721"
          target="_blank"
          rel="noreferrer"
        >
          CSDN blog
        </a>
        .
      </p>
      <p>
        I am still at an early stage, so both technical ability and engineering understanding need steady refinement. I want to keep learning, reviewing, and turning each project into a clearer record of growth.
      </p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import SectionHeading from "./SectionHeading.vue"
import { useObservedSection } from "@/composables/useInView"

const props = defineProps({
  onVisible: {
    type: Function,
    required: true,
  },
})

const { t, locale } = useI18n()
const { target: sectionRef, isVisible } = useObservedSection(
  "About",
  props.onVisible,
  0.75,
  0.15,
)
</script>
