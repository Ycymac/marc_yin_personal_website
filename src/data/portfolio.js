import avatarImage from "@/photos/avatar.jpg"
import getCouponIcon from "@/photos/getcoupon_icon.png"
import javaIcon from "@/photos/java_icon.jpg"
import javisFunction1 from "@/photos/jvais_function1.png"
import javisFunction2 from "@/photos/javis_function2.png"
import javisIcon from "@/photos/javis_icon.png"
import staLabIcon from "@/photos/sta_lab_icon.jpg"
import ragFunctionVideo from "@/assets/videos/rag_function_show.mp4"

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Blog",
    hash: "#blog",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experiences",
    hash: "#experience",
  },
]

export const headerLanguageMap = {
  Home: "首页",
  About: "关于我",
  Projects: "项目",
  Blog: "博客",
  Skills: "技能",
  Experiences: "时间线",
}

export const experiencesData = [
  {
    title: "Software Engineering Student",
    location: "Xi'an University of Posts & Telecommunications",
    description:
      "Started studying Software Engineering in September 2024 and built programming fundamentals through C language coursework.",
    icon: "graduation",
    date: "Sep 2024",
  },
  {
    title: "STA Software Technology Association",
    location: "University-level laboratory",
    description:
      "Passed the selection process in October 2024 and joined the school-level software technology association, where I continued learning data structures and algorithms.",
    iconUrl: staLabIcon,
    date: "Oct 2024",
  },
  {
    title: "Backend Foundation Learning",
    location: "Java backend study track",
    description:
      "After entering the lab, I studied Java fundamentals, SSM, MySQL, JUC, JVM, RocketMQ, Redis and other backend middleware topics.",
    iconUrl: javaIcon,
    date: "After Oct 2024",
  },
  {
    title: "GetCoupon",
    location: "Personal project",
    description:
      "Built my first personal project, GetCoupon, a coupon management system, from November 2025 to January 2026.",
    iconUrl: getCouponIcon,
    date: "Nov 2025 - Jan 2026",
  },
  {
    title: "JAVIS Intelligent Interview Knowledge Base Platform",
    location: "Personal project with Codex assistance",
    description:
      "Developed my second personal project, JAVIS Intelligent Interview Knowledge Base Platform, from March to June 2026 by combining GitHub open-source project experience with Codex-assisted development.",
    iconUrl: javisIcon,
    date: "Mar 2026 - Jun 2026",
  },
  {
    title: "Personal Introduction Website",
    location: "Current website",
    description:
      "Used Codex in May 2026 to assist the development and iteration of this personal introduction website.",
    icon: "code",
    date: "May 2026",
  },
]

export const experiencesDataZh = [
  {
    title: "软件工程专业学习",
    location: "西安邮电大学",
    description:
      "2024 年 9 月进入西安邮电大学软件工程专业学习，从 C 语言开始建立编程基础。",
    icon: "graduation",
    date: "2024.9",
  },
  {
    title: "进入软件科技协会",
    location: "校级实验室",
    description:
      "2024 年 10 月通过选拔进入校级实验室软件科技协会，并在实验室中继续学习数据结构与算法。",
    iconUrl: staLabIcon,
    date: "2024.10",
  },
  {
    title: "后端基础学习",
    location: "Java 后端方向",
    description:
      "进入实验室后，陆续学习 Java 基础、SSM、MySQL、JUC、JVM，以及 RocketMQ、Redis 等后端中间件内容。",
    iconUrl: javaIcon,
    date: "2024.10 之后",
  },
  {
    title: "GetCoupon 捷券优惠券管理系统",
    location: "个人第一个项目",
    description:
      "2025 年 11 月至 2026 年 1 月，开发个人第一个项目 GetCoupon 捷券优惠券管理系统。",
    iconUrl: getCouponIcon,
    date: "2025.11 - 2026.1",
  },
  {
    title: "JAVIS智能面试知识库平台",
    location: "Codex 辅助开发项目",
    description:
      "2026 年 3 月至 6 月，结合 GitHub 开源项目，使用 Codex 进行辅助，开发个人第二个项目 JAVIS智能面试知识库平台。",
    iconUrl: javisIcon,
    date: "2026.3 - 2026.6",
  },
  {
    title: "个人介绍网站",
    location: "当前网站",
    description:
      "2026 年 5 月，使用 Codex 辅助开发当前个人介绍网站，并持续整理自己的学习、项目和技术实践。",
    icon: "code",
    date: "2026.5",
  },
]

export const projectsData = [
  {
    title: "GetCoupon Coupon Management System",
    title_zh: "GetCoupon 捷券优惠券管理系统",
    period: "2025.11 — 2026.01",
    description:
      "GetCoupon is a coupon platform for store owners and users, covering coupon flash sales, distribution, settlement, search, and other core business workflows.",
    desc_zh:
      "GetCoupon 是面向店铺所有者和用户的优惠券平台，覆盖优惠券秒杀、分发、结算、搜索等核心业务。",
    tags: ["Java", "SpringBoot", "MyBatis", "MySQL", "Redis"],
    imageUrl: getCouponIcon,
  },
  {
    title: "JAVIS Intelligent Interview Knowledge Base Platform",
    title_zh: "JAVIS智能面试知识库平台",
    period: "2026.03 — 2026.06",
    description:
      "Designed for internal study groups to retrieve learning materials and policies, JAVIS is a RAG-based document Q&A system with multi-format document parsing, semantic retrieval, and LLM-generated answers. It also uses users' online resumes to generate interview questions, evaluate responses, and provide suggestions.",
    desc_zh:
      "项目面向学习小组内部学习资料、制度等知识检索场景，设计并实现基于 RAG 的文档问答系统，支持多格式文档解析、语义检索和大模型生成式回答，提升内部知识获取效率。同时可基于用户在线简历生成面试问题，并提供回答判定与建议。",
    tags: ["Java", "RAG", "AI", "Codex", "RocketMQ"],
    imageUrl: javisIcon,
    gallery: [javisFunction1, javisFunction2],
    videoUrl: ragFunctionVideo,
  },
  {
    title: "Personal Introduction Website",
    title_zh: "个人介绍网站",
    period: "2026.05",
    description:
      "The current personal introduction website, developed in May 2026 with Codex and Claude Code assistance to present my profile, backend learning path, projects, skills and timeline.",
    desc_zh:
      "当前个人介绍网站，2026 年 5 月使用 Codex 和 Claude Code 辅助开发，用于展示个人介绍、后端学习路径、项目、技能与时间线内容。",
    tags: ["Codex","Claude Code", "Vue", "Tailwind CSS"],
    iconUrl: avatarImage,
    animatedPreview: true,
  },
]

export const skillsData = [
  "Java",
  "SpringBoot",
  "MyBatis",
  "MySQL",
  "Redis",
  "RocketMQ",
  "RAG",
  "AI",
  "Codex",
  "Claude Code",
]
