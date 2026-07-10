<template>
  <svg
    v-if="isVisible"
    :class="decorationClasses"
    :viewBox="viewBox"
    :style="decorationStyle"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g v-if="isHero" class="rose-avatar">
      <g class="rose-avatar__rose-corner">
        <rect
          v-for="petal in miniRosePetals"
          :key="petal.id"
          class="rose-petal"
          :x="petal.x"
          :y="petal.y"
          :width="petal.w"
          :height="petal.h"
          :rx="petal.rx"
          :fill="petal.fill"
          :opacity="petal.opacity"
          :transform="rotateRect(petal)"
        />
        <ellipse
          v-for="petal in miniRoseInner"
          :key="petal.id"
          class="rose-petal"
          :cx="54 + (petal.dx || 0)"
          :cy="54 + (petal.dy || 0)"
          :rx="petal.rx"
          :ry="petal.ry"
          :fill="petal.fill"
          :opacity="petal.opacity"
          :transform="`rotate(${petal.rotate} 54 54)`"
        />
        <circle cx="54" cy="54" r="6.5" :fill="colors.centerOuter" opacity="0.96" />
        <circle cx="54" cy="54" r="3.6" :fill="colors.centerInner" />
      </g>

      <g class="rose-avatar__flower-corner">
        <g transform="translate(158 160)">
          <rect
            v-for="angle in accentAngles"
            :key="`avatar-accent-${angle}`"
            x="-5"
            y="-34"
            width="10"
            height="28"
            rx="5"
            fill="#91AEF5"
            opacity="0.72"
            :transform="`rotate(${angle})`"
          />
          <circle r="4.2" :fill="colors.centerInner" opacity="0.94" />
          <circle r="8" fill="#83B979" opacity="0.24" />
        </g>
        <g transform="translate(185 182) scale(0.82)">
          <circle
            v-for="angle in flowerAngles"
            :key="`avatar-white-${angle}`"
            :cx="Math.cos(degToRad(angle)) * 12"
            :cy="Math.sin(degToRad(angle)) * 12"
            r="6.5"
            fill="#FFFFFF"
            opacity="0.82"
          />
          <circle r="3.5" :fill="colors.centerInner" opacity="0.94" />
        </g>
        <circle cx="174" cy="145" r="4.5" fill="#72B88A" opacity="0.45" />
        <circle cx="196" cy="164" r="3.6" :fill="colors.soft" opacity="0.42" />
      </g>
    </g>

    <g v-else-if="isHello" class="rose-hello">
      <g
        v-for="cluster in helloClusters"
        :key="cluster.id"
        :transform="cluster.transform"
      >
        <g class="rose-hello__cluster" :style="clusterBloomStyle(cluster.delay)">
          <template v-if="cluster.type === 'rose'">
            <rect
              v-for="petal in miniRosePetals"
              :key="`${cluster.id}-${petal.id}`"
              class="rose-petal"
              :x="petal.x"
              :y="petal.y"
              :width="petal.w"
              :height="petal.h"
              :rx="petal.rx"
              :fill="petal.fill"
              :opacity="petal.opacity"
              :transform="rotateRect(petal)"
            />
            <ellipse
              v-for="petal in miniRoseInner"
              :key="`${cluster.id}-${petal.id}`"
              class="rose-petal"
              :cx="54 + (petal.dx || 0)"
              :cy="54 + (petal.dy || 0)"
              :rx="petal.rx"
              :ry="petal.ry"
              :fill="petal.fill"
              :opacity="petal.opacity"
              :transform="`rotate(${petal.rotate} 54 54)`"
            />
            <circle cx="54" cy="54" r="6.5" :fill="colors.centerOuter" opacity="0.96" />
            <circle cx="54" cy="54" r="3.6" :fill="colors.centerInner" />
          </template>

          <template v-else-if="cluster.type === 'accent'">
            <rect
              v-for="angle in accentAngles"
              :key="`${cluster.id}-${angle}`"
              x="-8"
              y="-49"
              width="16"
              height="40"
              rx="8"
              fill="#91AEF5"
              opacity="0.7"
              :transform="`rotate(${angle})`"
            />
            <circle r="6" :fill="colors.centerInner" opacity="0.94" />
            <circle r="12" fill="#83B979" opacity="0.22" />
          </template>

          <template v-else>
            <g v-for="index in 3" :key="`${cluster.id}-${index}`" :transform="`translate(${index * 34} ${index % 2 === 0 ? 0 : 24})`">
              <circle
                v-for="angle in flowerAngles"
                :key="`${cluster.id}-${index}-${angle}`"
                :cx="Math.cos(degToRad(angle)) * 15"
                :cy="Math.sin(degToRad(angle)) * 15"
                r="8"
                fill="#FFFFFF"
                opacity="0.78"
              />
              <circle r="4.2" :fill="colors.centerInner" opacity="0.94" />
            </g>
          </template>
        </g>
      </g>
    </g>

    <g v-else class="rose-bouquet">
      <g class="rose-bouquet__shadows">
        <ellipse
          v-for="shadow in spec.shadows"
          :key="shadow.id"
          :cx="shadow.cx"
          :cy="shadow.cy"
          :rx="shadow.rx"
          :ry="shadow.ry"
          :fill="shadow.fill"
          :opacity="shadow.opacity"
          :filter="shadow.blur ? `blur(${shadow.blur}px)` : undefined"
        />
      </g>

      <g class="rose-bouquet__stems">
        <path
          v-for="stem in spec.stems"
          :key="stem.id"
          :d="stem.d"
          :stroke="stem.stroke"
          :stroke-width="stem.width"
          :opacity="stem.opacity"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <g class="rose-bouquet__branches">
        <path
          v-for="branch in spec.branches"
          :key="branch.id"
          :d="branch.d"
          :stroke="branch.stroke"
          :stroke-width="branch.width"
          :opacity="branch.opacity"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <g class="rose-bouquet__leaf-blocks">
        <g v-for="block in spec.leafBlocks" :key="block.id">
          <rect
            :x="block.x"
            :y="block.y"
            :width="block.w"
            :height="block.h"
            :rx="block.rx"
            :fill="block.fill"
            :opacity="block.opacity"
          />
          <polygon
            :points="leafHighlightPoints(block)"
            fill="#7FC49A"
            opacity="0.28"
          />
        </g>
      </g>

      <g class="rose-bouquet__round-leaves">
        <g v-for="leaf in spec.roundLeaves" :key="leaf.id">
          <circle
            :cx="leaf.cx"
            :cy="leaf.cy"
            :r="leaf.r"
            :fill="leaf.fill"
            :opacity="leaf.opacity"
          />
          <ellipse
            v-if="leaf.r > 17"
            :cx="leaf.cx - leaf.r * 0.15"
            :cy="leaf.cy - leaf.r * 0.18"
            :rx="leaf.r * 0.45"
            :ry="leaf.r * 0.18"
            fill="#A6C99A"
            opacity="0.16"
            :transform="`rotate(-32 ${leaf.cx} ${leaf.cy})`"
          />
        </g>
      </g>

      <g class="rose-bouquet__small-flowers">
        <g v-for="flower in spec.whiteFlowers" :key="flower.id">
          <circle
            v-for="angle in flowerAngles"
            :key="`${flower.id}-${angle}-shadow`"
            :cx="petalX(flower, angle, flower.distance + 2)"
            :cy="petalY(flower, angle, flower.distance + 2)"
            :r="flower.petalR"
            fill="#DCE6F4"
            opacity="0.18"
          />
          <circle
            v-for="angle in flowerAngles"
            :key="`${flower.id}-${angle}`"
            :cx="petalX(flower, angle, flower.distance)"
            :cy="petalY(flower, angle, flower.distance)"
            :r="flower.petalR"
            fill="#FFFFFF"
            :opacity="flower.opacity"
          />
          <circle :cx="flower.cx" :cy="flower.cy" :r="flower.centerR" :fill="colors.centerInner" opacity="0.92" />
        </g>
      </g>

      <g class="rose-bouquet__accent-flowers">
        <g v-for="flower in spec.accentFlowers" :key="flower.id">
          <rect
            v-for="angle in flower.angles"
            :key="`${flower.id}-${angle}`"
            :x="flower.cx - flower.w / 2"
            :y="flower.cy - flower.length - flower.gap"
            :width="flower.w"
            :height="flower.length"
            :rx="flower.w / 2"
            :fill="flower.fill"
            :opacity="flower.opacity"
            :transform="`rotate(${angle} ${flower.cx} ${flower.cy})`"
          />
          <circle :cx="flower.cx" :cy="flower.cy" :r="flower.centerR" :fill="colors.centerInner" opacity="0.92" />
          <circle :cx="flower.cx" :cy="flower.cy" :r="flower.centerR + 7" fill="#83B979" opacity="0.24" />
        </g>
      </g>

      <g class="rose-bouquet__roses">
        <g
          v-for="rose in spec.roses"
          :key="rose.id"
          :class="['rose-bouquet__rose', `rose-bouquet__${rose.id}`]"
          :style="{ transformOrigin: `${rose.cx}px ${rose.cy}px` }"
        >
          <ellipse
            :cx="rose.cx + rose.shadow.dx"
            :cy="rose.cy + rose.shadow.dy"
            :rx="rose.shadow.rx"
            :ry="rose.shadow.ry"
            :fill="rose.shadow.fill"
            :opacity="rose.shadow.opacity"
            filter="blur(10px)"
          />
          <rect
            v-for="petal in rose.outer"
            :key="petal.id"
            class="rose-petal"
            :x="petal.x"
            :y="petal.y"
            :width="petal.w"
            :height="petal.h"
            :rx="petal.rx"
            :fill="petal.fill"
            :opacity="petal.opacity"
            :transform="rotateRect(petal)"
          />
          <rect
            v-for="petal in rose.middle"
            :key="petal.id"
            class="rose-petal"
            :x="petal.x"
            :y="petal.y"
            :width="petal.w"
            :height="petal.h"
            :rx="petal.rx"
            :fill="petal.fill"
            :opacity="petal.opacity"
            :transform="rotateRect(petal)"
          />
          <ellipse
            v-for="petal in rose.inner"
            :key="petal.id"
            class="rose-petal"
            :cx="rose.cx + (petal.dx || 0)"
            :cy="rose.cy + (petal.dy || 0)"
            :rx="petal.rx"
            :ry="petal.ry"
            :fill="petal.fill"
            :opacity="petal.opacity"
            :transform="`rotate(${petal.rotate} ${rose.cx} ${rose.cy})`"
          />
          <circle :cx="rose.cx" :cy="rose.cy" :r="rose.centerOuter" :fill="spec.centerOuter" opacity="0.95" />
          <circle :cx="rose.cx" :cy="rose.cy" :r="rose.centerInner" :fill="spec.centerInner" opacity="1" />
        </g>
      </g>

      <g class="rose-bouquet__front-stems">
        <path
          v-for="stem in spec.frontStems"
          :key="stem.id"
          :d="stem.d"
          :stroke="stem.stroke"
          :stroke-width="stem.width"
          :opacity="stem.opacity"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <g class="rose-bouquet__dots">
        <circle
          v-for="dot in spec.dots"
          :key="dot.id"
          :cx="dot.cx"
          :cy="dot.cy"
          :r="dot.r"
          :fill="dot.fill"
          :style="{
            '--dot-opacity': dot.opacity,
            '--dot-delay': `${dot.delay}s`,
            '--dot-duration': `${dot.duration}s`,
          }"
        />
      </g>
    </g>
  </svg>
</template>

<script setup>
import { computed, inject } from "vue"

const props = defineProps({
  placement: {
    type: String,
    default: "about",
  },
  progress: {
    type: Number,
    default: 1,
  },
  fade: {
    type: Number,
    default: 1,
  },
})

const skin = inject("skin", null)
const theme = inject("theme", null)
const flowerAngles = [0, 72, 144, 216, 288]
const accentAngles = [0, 60, 120, 180, 240, 300]

const isVisible = computed(() => skin?.value === "glass")
const activeTheme = computed(() => (theme?.value === "light" ? "light" : "dark"))
const spec = computed(() => (activeTheme.value === "light" ? pinkSpec : blueSpec))
const colors = computed(() => (activeTheme.value === "light" ? pink : blue))
const isHero = computed(() => props.placement === "hero")
const isHello = computed(() => props.placement === "hello")
const bloomProgress = computed(() => clamp(props.progress, 0, 1))
const viewBox = computed(() => {
  if (isHero.value) return "0 0 220 220"
  if (isHello.value) return "0 0 1000 1000"
  return "0 0 1024 1280"
})
const decorationStyle = computed(() => ({
  "--rose-progress": bloomProgress.value,
  "--rose-fade": clamp(props.fade, 0, 1),
}))
const decorationClasses = computed(() => [
  "rose-decoration",
  `rose-decoration--${props.placement}`,
  `rose-decoration--${spec.value.mode}`,
])
const miniRosePetals = computed(() => {
  const color = colors.value
  return [
    rectPetal("mini-o-01", 25, 17, 58, 44, 0, color.pale, 0.72, 21),
    rectPetal("mini-o-02", 48, 24, 55, 42, 45, color.soft, 0.68, 20),
    rectPetal("mini-o-03", 48, 54, 55, 42, 100, color.pale, 0.7, 20),
    rectPetal("mini-o-04", 15, 58, 60, 43, 160, color.soft, 0.68, 20),
    rectPetal("mini-o-05", 7, 32, 58, 44, 225, color.pale, 0.72, 21),
    rectPetal("mini-m-01", 33, 30, 44, 34, 0, color.main, 0.78, 16),
    rectPetal("mini-m-02", 47, 37, 43, 33, 55, color.deep, 0.76, 16),
    rectPetal("mini-m-03", 40, 54, 43, 33, 118, color.main, 0.8, 16),
    rectPetal("mini-m-04", 22, 48, 45, 34, 175, color.deep, 0.74, 16),
    rectPetal("mini-m-05", 20, 33, 43, 33, 235, color.main, 0.78, 16),
    rectPetal("mini-c-01", 40, 39, 30, 22, 10, color.deep, 0.86, 11),
    rectPetal("mini-c-02", 48, 44, 28, 21, 75, color.main, 0.86, 10),
    rectPetal("mini-c-03", 37, 51, 30, 22, 145, color.deep, 0.84, 11),
    rectPetal("mini-c-04", 31, 43, 29, 22, 220, color.main, 0.86, 11),
  ]
})
const miniRoseInner = computed(() => {
  const color = colors.value
  return [
    ellipsePetal("mini-i-01", 13, 8.5, 0, color.deep, 0.84),
    ellipsePetal("mini-i-02", 9, 6, 65, color.main, 0.86, 1),
    ellipsePetal("mini-i-03", 6, 4.2, 138, color.pale, 0.9, -1),
  ]
})
const helloClusters = [
  { id: "hello-tl", type: "rose", delay: 0.08, transform: "translate(62 120) scale(1.62) rotate(-12)" },
  { id: "hello-tr", type: "accent", delay: 0.18, transform: "translate(860 190) scale(1.18) rotate(14)" },
  { id: "hello-bl", type: "white", delay: 0.28, transform: "translate(92 788) scale(0.96) rotate(7)" },
  { id: "hello-br", type: "rose", delay: 0.38, transform: "translate(790 755) scale(1.42) rotate(16)" },
]

function degToRad(deg) {
  return (deg * Math.PI) / 180
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function clusterBloomStyle(delay) {
  const amount = clamp((bloomProgress.value - delay) / 0.44, 0, 1)
  return {
    opacity: amount,
    transform: `scale(${0.72 + amount * 0.28})`,
  }
}

function petalX(flower, angle, distance) {
  return flower.cx + Math.cos(degToRad(angle)) * distance
}

function petalY(flower, angle, distance) {
  return flower.cy + Math.sin(degToRad(angle)) * distance
}

function leafHighlightPoints(block) {
  const x1 = block.x + block.w * 0.12
  const y1 = block.y + block.h
  const x2 = block.x + block.w
  const y2 = block.y + block.h * 0.12
  const x3 = block.x + block.w
  const y3 = block.y + block.h * 0.42
  const x4 = block.x + block.w * 0.42
  const y4 = block.y + block.h
  return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`
}

function rotateRect(petal) {
  const cx = petal.x + petal.w / 2
  const cy = petal.y + petal.h / 2
  return `rotate(${petal.rotate} ${cx} ${cy})`
}

const blue = {
  deep: "#2F5CFF",
  main: "#4E7DFF",
  soft: "#75A6FF",
  pale: "#A6C8FF",
  light: "#D3E4FF",
  shadow: "#8FA4BF",
  centerOuter: "#FFF6C8",
  centerInner: "#FFE05C",
}

const pink = {
  deep: "#D982A0",
  main: "#EBABC0",
  soft: "#F7CFDA",
  pale: "#FBE5EB",
  light: "#FFF3F6",
  shadow: "#DBB8C3",
  centerOuter: "#FFF5F7",
  centerInner: "#EFA5BA",
}

function rectPetal(id, x, y, w, h, rotate, fill, opacity, rx = 44) {
  return { id, x, y, w, h, rotate, fill, opacity, rx }
}

function ellipsePetal(id, rx, ry, rotate, fill, opacity, dx = 0, dy = 0) {
  return { id, rx, ry, rotate, fill, opacity, dx, dy }
}

function flower(id, cx, cy, petalR, centerR, opacity, distance = 18) {
  return { id, cx, cy, petalR, centerR, opacity, distance }
}

function accentFlower(id, cx, cy, count, length = 58, w = 20, fill = "#91AEF5", opacity = 0.76) {
  return {
    id,
    cx,
    cy,
    length,
    w,
    fill,
    opacity,
    gap: 14,
    centerR: 7,
    angles: Array.from({ length: count }, (_, index) => Math.round((360 / count) * index)),
  }
}

function dot(id, cx, cy, r, fill, opacity, delay, duration) {
  return { id, cx, cy, r, fill, opacity, delay, duration }
}

const blueSpec = {
  mode: "blue",
  centerOuter: blue.centerOuter,
  centerInner: blue.centerInner,
  shadows: [
    { id: "base", cx: 512, cy: 1112, rx: 135, ry: 26, fill: blue.shadow, opacity: 0.14, blur: 12 },
    { id: "body", cx: 520, cy: 560, rx: 315, ry: 355, fill: blue.shadow, opacity: 0.08, blur: 24 },
  ],
  stems: [
    { id: "stem-main-left", d: "M505 1060 C490 900 455 660 400 430", stroke: "#5F9F62", width: 12, opacity: 0.58 },
    { id: "stem-main-right", d: "M520 1070 C540 890 610 680 620 535", stroke: "#347A3E", width: 13, opacity: 0.66 },
    { id: "stem-small-left", d: "M488 1080 C430 920 365 760 315 680", stroke: "#5F9F62", width: 12, opacity: 0.62 },
    { id: "stem-blue-top", d: "M540 1040 C545 760 548 430 555 180", stroke: "#5F9F62", width: 11, opacity: 0.54 },
    { id: "bottom-01", d: "M492 1088 C500 990 510 895 522 790", stroke: "#347A3E", width: 12, opacity: 0.76 },
    { id: "bottom-02", d: "M526 1092 C492 970 450 850 405 720", stroke: "#5F9F62", width: 12, opacity: 0.62 },
    { id: "bottom-03", d: "M548 1078 C540 950 535 825 535 700", stroke: "#347A3E", width: 11, opacity: 0.7 },
  ],
  branches: [
    { id: "left-tall", d: "M455 700 C335 600 235 420 250 275 C255 225 270 200 285 185", stroke: "#5F9F62", width: 11, opacity: 0.5 },
    { id: "right-tall", d: "M610 770 C725 665 740 520 760 405 C770 350 805 320 830 300", stroke: "#5F9F62", width: 11, opacity: 0.52 },
    { id: "white-right", d: "M580 900 C690 815 755 745 810 640 C850 565 845 485 800 430", stroke: "#83B979", width: 10, opacity: 0.42 },
    { id: "white-left", d: "M455 880 C360 805 290 745 210 660", stroke: "#83B979", width: 10, opacity: 0.42 },
  ],
  leafBlocks: [
    { id: "lb-l-01", x: 245, y: 760, w: 46, h: 46, rx: 7, fill: "#2F8C55", opacity: 0.78 },
    { id: "lb-l-02", x: 300, y: 760, w: 42, h: 42, rx: 7, fill: "#2F8C55", opacity: 0.74 },
    { id: "lb-l-03", x: 235, y: 820, w: 40, h: 40, rx: 7, fill: "#2F8C55", opacity: 0.7 },
    { id: "lb-r-01", x: 725, y: 605, w: 48, h: 48, rx: 7, fill: "#2F8C55", opacity: 0.82 },
    { id: "lb-r-02", x: 785, y: 605, w: 48, h: 48, rx: 7, fill: "#2F8C55", opacity: 0.78 },
    { id: "lb-r-03", x: 725, y: 670, w: 48, h: 48, rx: 7, fill: "#2F8C55", opacity: 0.78 },
    { id: "lb-r-04", x: 785, y: 670, w: 48, h: 48, rx: 7, fill: "#2F8C55", opacity: 0.82 },
  ],
  roundLeaves: [
    { id: "leaf-01", cx: 420, cy: 560, r: 25, fill: "#5F9F62", opacity: 0.58 },
    { id: "leaf-02", cx: 468, cy: 635, r: 32, fill: "#5F9F62", opacity: 0.42 },
    { id: "leaf-03", cx: 565, cy: 785, r: 24, fill: "#5F9F62", opacity: 0.44 },
    { id: "leaf-04", cx: 675, cy: 755, r: 28, fill: "#5F9F62", opacity: 0.48 },
    { id: "leaf-05", cx: 675, cy: 860, r: 36, fill: "#A6C99A", opacity: 0.42 },
    { id: "leaf-06", cx: 355, cy: 815, r: 20, fill: "#5F9F62", opacity: 0.55 },
    { id: "leaf-07", cx: 720, cy: 470, r: 18, fill: "#83B979", opacity: 0.48 },
  ],
  whiteFlowers: [
    flower("white-l-01", 170, 655, 10, 5, 0.78),
    flower("white-l-02", 230, 690, 9, 4.5, 0.76),
    flower("white-r-01", 825, 455, 10, 5, 0.78),
    flower("white-r-02", 790, 545, 9, 4.5, 0.76),
    flower("white-r-03", 855, 565, 9, 4.5, 0.74),
    flower("white-r-04", 745, 830, 10, 5, 0.75),
  ],
  accentFlowers: [
    accentFlower("blue-top", 640, 250, 7, 58, 20, "#91AEF5", 0.76),
    accentFlower("blue-left", 285, 560, 7, 56, 20, "#91AEF5", 0.74),
    accentFlower("blue-right", 735, 220, 6, 52, 18, "#91AEF5", 0.7),
  ],
  roses: [
    {
      id: "rose-a",
      cx: 430,
      cy: 390,
      shadow: { dx: 18, dy: 20, rx: 135, ry: 125, fill: blue.shadow, opacity: 0.14 },
      centerOuter: 13,
      centerInner: 8,
      outer: [
        rectPetal("a-o-01", 350, 270, 160, 120, 0, blue.soft, 0.55, 46),
        rectPetal("a-o-02", 395, 285, 160, 120, 35, blue.main, 0.5, 46),
        rectPetal("a-o-03", 395, 375, 160, 120, 80, blue.soft, 0.52, 46),
        rectPetal("a-o-04", 315, 395, 160, 120, 130, blue.main, 0.48, 46),
        rectPetal("a-o-05", 285, 320, 170, 120, 210, blue.soft, 0.5, 46),
      ],
      middle: [
        rectPetal("a-m-01", 365, 310, 125, 88, 0, blue.main, 0.66, 38),
        rectPetal("a-m-02", 408, 328, 115, 86, 45, blue.deep, 0.54, 36),
        rectPetal("a-m-03", 385, 378, 120, 86, 100, blue.soft, 0.58, 36),
        rectPetal("a-m-04", 330, 362, 120, 86, 160, blue.deep, 0.52, 36),
      ],
      inner: [
        ellipsePetal("a-i-01", 55, 34, 0, blue.deep, 0.78),
        ellipsePetal("a-i-02", 45, 30, 55, blue.main, 0.74, 2),
        ellipsePetal("a-i-03", 34, 24, 120, blue.deep, 0.82, -2),
        ellipsePetal("a-i-04", 24, 18, 210, blue.soft, 0.75),
      ],
    },
    {
      id: "rose-b",
      cx: 620,
      cy: 610,
      shadow: { dx: 18, dy: 22, rx: 128, ry: 118, fill: blue.shadow, opacity: 0.13 },
      centerOuter: 12,
      centerInner: 7,
      outer: [
        rectPetal("b-o-01", 535, 500, 160, 118, 0, blue.soft, 0.56, 46),
        rectPetal("b-o-02", 590, 515, 150, 112, 40, blue.main, 0.5, 44),
        rectPetal("b-o-03", 580, 610, 150, 112, 95, blue.soft, 0.52, 44),
        rectPetal("b-o-04", 500, 630, 160, 118, 150, blue.main, 0.5, 46),
        rectPetal("b-o-05", 485, 545, 158, 118, 230, blue.soft, 0.48, 46),
      ],
      middle: [
        rectPetal("b-m-01", 570, 555, 120, 84, 0, blue.main, 0.64, 36),
        rectPetal("b-m-02", 610, 575, 112, 82, 50, blue.deep, 0.54, 34),
        rectPetal("b-m-03", 585, 620, 112, 82, 105, blue.soft, 0.58, 34),
        rectPetal("b-m-04", 535, 610, 118, 84, 165, blue.deep, 0.52, 36),
      ],
      inner: [
        ellipsePetal("b-i-01", 50, 32, 0, blue.deep, 0.78),
        ellipsePetal("b-i-02", 42, 28, 60, blue.main, 0.74, 2),
        ellipsePetal("b-i-03", 32, 22, 130, blue.deep, 0.82, -2),
        ellipsePetal("b-i-04", 22, 16, 220, blue.soft, 0.75),
      ],
    },
    {
      id: "rose-c",
      cx: 365,
      cy: 735,
      shadow: { dx: 12, dy: 14, rx: 82, ry: 72, fill: blue.shadow, opacity: 0.11 },
      centerOuter: 9,
      centerInner: 5,
      outer: [
        rectPetal("c-o-01", 305, 680, 115, 84, 0, blue.soft, 0.55, 34),
        rectPetal("c-o-02", 350, 690, 100, 76, 50, blue.main, 0.5, 32),
        rectPetal("c-o-03", 335, 745, 105, 78, 120, blue.soft, 0.52, 32),
        rectPetal("c-o-04", 285, 730, 100, 76, 210, blue.main, 0.48, 32),
      ],
      middle: [],
      inner: [
        ellipsePetal("c-i-01", 38, 24, 0, blue.deep, 0.78),
        ellipsePetal("c-i-02", 28, 20, 70, blue.main, 0.74),
        ellipsePetal("c-i-03", 18, 14, 150, blue.soft, 0.7),
      ],
    },
  ],
  frontStems: [
    { id: "front-01", d: "M510 1080 C500 970 500 860 505 740", stroke: "#347A3E", width: 12, opacity: 0.78 },
    { id: "front-02", d: "M535 1070 C525 960 520 850 515 735", stroke: "#5F9F62", width: 10, opacity: 0.58 },
    { id: "front-03", d: "M485 1070 C500 930 545 800 610 680", stroke: "#347A3E", width: 10, opacity: 0.58 },
  ],
  dots: [
    dot("dot-01", 210, 880, 8, "#72B88A", 0.55, 0.2, 7.4),
    dot("dot-02", 285, 940, 7, "#91AEF5", 0.35, 1.4, 8.8),
    dot("dot-03", 365, 920, 8, "#5F9F62", 0.5, 2.2, 6.2),
    dot("dot-04", 860, 660, 8, "#72B88A", 0.45, 0.9, 9.6),
    dot("dot-05", 710, 910, 6, "#91AEF5", 0.3, 1.9, 10.4),
  ],
}

const pinkSpec = {
  mode: "pink",
  centerOuter: pink.centerOuter,
  centerInner: pink.centerInner,
  shadows: [
    { id: "base", cx: 512, cy: 1130, rx: 120, ry: 24, fill: "#8FA4BF", opacity: 0.12, blur: 12 },
    { id: "body", cx: 515, cy: 545, rx: 340, ry: 315, fill: pink.shadow, opacity: 0.08, blur: 24 },
  ],
  stems: [
    { id: "stem-left", d: "M500 1100 C465 910 420 700 370 500", stroke: "#5F9F62", width: 12, opacity: 0.62 },
    { id: "stem-right", d: "M530 1100 C570 900 625 710 640 500", stroke: "#347A3E", width: 13, opacity: 0.68 },
    { id: "stem-center", d: "M512 1100 C508 930 505 795 505 690", stroke: "#5F9F62", width: 12, opacity: 0.6 },
    { id: "stem-top-blue", d: "M515 1040 C520 750 520 420 520 165", stroke: "#5F9F62", width: 11, opacity: 0.55 },
    { id: "bottom-01", d: "M485 1105 C495 960 502 850 510 735", stroke: "#347A3E", width: 13, opacity: 0.76 },
    { id: "bottom-02", d: "M520 1115 C490 975 455 850 420 725", stroke: "#5F9F62", width: 12, opacity: 0.62 },
    { id: "bottom-03", d: "M548 1100 C535 955 530 825 525 705", stroke: "#347A3E", width: 12, opacity: 0.72 },
  ],
  branches: [
    { id: "left-round", d: "M455 810 C345 725 250 650 145 560", stroke: "#5F9F62", width: 11, opacity: 0.56 },
    { id: "right-high", d: "M565 885 C690 760 770 610 785 430 C795 335 840 305 870 290", stroke: "#5F9F62", width: 11, opacity: 0.52 },
    { id: "left-buds", d: "M410 510 C360 405 325 310 305 210 C300 175 315 145 335 130", stroke: "#5F9F62", width: 10, opacity: 0.5 },
    { id: "right-buds", d: "M685 720 C760 620 810 500 830 380 C840 325 875 285 905 270", stroke: "#5F9F62", width: 10, opacity: 0.46 },
  ],
  leafBlocks: [
    { id: "lb-01", x: 345, y: 760, w: 52, h: 52, rx: 8, fill: "#2F8C55", opacity: 0.78 },
    { id: "lb-02", x: 395, y: 810, w: 36, h: 36, rx: 7, fill: "#2F8C55", opacity: 0.66 },
  ],
  roundLeaves: [
    { id: "leaf-l-01", cx: 150, cy: 545, r: 24, fill: "#5F9F62", opacity: 0.62 },
    { id: "leaf-l-02", cx: 190, cy: 575, r: 22, fill: "#5F9F62", opacity: 0.58 },
    { id: "leaf-l-03", cx: 230, cy: 610, r: 23, fill: "#5F9F62", opacity: 0.6 },
    { id: "leaf-l-04", cx: 270, cy: 655, r: 22, fill: "#5F9F62", opacity: 0.56 },
    { id: "leaf-c-01", cx: 450, cy: 625, r: 26, fill: "#5F9F62", opacity: 0.58 },
    { id: "leaf-c-02", cx: 585, cy: 690, r: 28, fill: "#347A3E", opacity: 0.56 },
    { id: "leaf-r-01", cx: 690, cy: 595, r: 22, fill: "#5F9F62", opacity: 0.52 },
    { id: "leaf-r-02", cx: 865, cy: 610, r: 28, fill: "#347A3E", opacity: 0.56 },
  ],
  whiteFlowers: [
    flower("white-top", 405, 355, 11, 6, 0.82, 20),
    flower("white-01", 515, 625, 9, 5, 0.84),
    flower("white-02", 705, 720, 10, 5, 0.8),
    flower("white-03", 730, 775, 9, 4.5, 0.76),
    flower("white-04", 790, 710, 9, 4.5, 0.74),
  ],
  accentFlowers: [
    accentFlower("blue-top", 520, 150, 6, 60, 20, "#91AEF5", 0.76),
    accentFlower("blue-right", 665, 275, 6, 55, 19, "#91AEF5", 0.72),
    accentFlower("blue-left", 230, 430, 6, 52, 18, "#91AEF5", 0.7),
  ],
  roses: [
    {
      id: "rose-a",
      cx: 390,
      cy: 465,
      shadow: { dx: 18, dy: 20, rx: 132, ry: 112, fill: pink.shadow, opacity: 0.14 },
      centerOuter: 10,
      centerInner: 5,
      outer: [
        rectPetal("a-o-01", 315, 355, 150, 112, 0, pink.pale, 0.64, 44),
        rectPetal("a-o-02", 370, 370, 140, 108, 38, pink.soft, 0.58, 42),
        rectPetal("a-o-03", 370, 455, 142, 108, 95, pink.pale, 0.58, 42),
        rectPetal("a-o-04", 300, 475, 150, 110, 150, pink.main, 0.45, 42),
        rectPetal("a-o-05", 265, 410, 150, 110, 220, pink.pale, 0.55, 42),
      ],
      middle: [
        rectPetal("a-m-01", 340, 405, 115, 82, 0, pink.soft, 0.76, 34),
        rectPetal("a-m-02", 380, 420, 105, 80, 48, pink.main, 0.62, 32),
        rectPetal("a-m-03", 360, 465, 110, 80, 110, pink.pale, 0.68, 32),
        rectPetal("a-m-04", 315, 455, 112, 82, 170, pink.main, 0.58, 34),
      ],
      inner: [
        ellipsePetal("a-i-01", 48, 30, 0, pink.deep, 0.8),
        ellipsePetal("a-i-02", 38, 26, 60, pink.main, 0.82, 2),
        ellipsePetal("a-i-03", 28, 20, 130, pink.pale, 0.84, -2),
        ellipsePetal("a-i-04", 18, 14, 220, pink.centerInner, 0.82),
      ],
    },
    {
      id: "rose-b",
      cx: 635,
      cy: 455,
      shadow: { dx: 17, dy: 20, rx: 128, ry: 110, fill: pink.shadow, opacity: 0.13 },
      centerOuter: 10,
      centerInner: 5,
      outer: [
        rectPetal("b-o-01", 560, 345, 150, 110, 0, pink.pale, 0.64, 42),
        rectPetal("b-o-02", 615, 365, 140, 106, 40, pink.soft, 0.58, 40),
        rectPetal("b-o-03", 615, 445, 140, 106, 95, pink.pale, 0.58, 40),
        rectPetal("b-o-04", 545, 465, 150, 110, 150, pink.main, 0.45, 42),
        rectPetal("b-o-05", 515, 400, 150, 110, 220, pink.pale, 0.55, 42),
      ],
      middle: [
        rectPetal("b-m-01", 585, 395, 115, 82, 0, pink.soft, 0.76, 34),
        rectPetal("b-m-02", 625, 410, 105, 80, 48, pink.main, 0.62, 32),
        rectPetal("b-m-03", 605, 455, 110, 80, 110, pink.pale, 0.68, 32),
        rectPetal("b-m-04", 560, 445, 112, 82, 170, pink.main, 0.58, 34),
      ],
      inner: [
        ellipsePetal("b-i-01", 48, 30, 0, pink.deep, 0.8),
        ellipsePetal("b-i-02", 38, 26, 60, pink.main, 0.82, 2),
        ellipsePetal("b-i-03", 28, 20, 130, pink.pale, 0.84, -2),
        ellipsePetal("b-i-04", 18, 14, 220, pink.centerInner, 0.82),
      ],
    },
    {
      id: "rose-c",
      cx: 505,
      cy: 700,
      shadow: { dx: 12, dy: 14, rx: 78, ry: 66, fill: pink.shadow, opacity: 0.12 },
      centerOuter: 8,
      centerInner: 4,
      outer: [
        rectPetal("c-o-01", 450, 645, 110, 78, 0, pink.pale, 0.62, 32),
        rectPetal("c-o-02", 490, 660, 96, 72, 55, pink.soft, 0.58, 30),
        rectPetal("c-o-03", 475, 705, 100, 72, 120, pink.main, 0.48, 30),
        rectPetal("c-o-04", 430, 690, 96, 72, 210, pink.light, 0.64, 30),
      ],
      middle: [],
      inner: [
        ellipsePetal("c-i-01", 38, 24, 0, pink.deep, 0.78),
        ellipsePetal("c-i-02", 30, 21, 70, pink.main, 0.8),
        ellipsePetal("c-i-03", 20, 16, 150, pink.pale, 0.82),
      ],
    },
  ],
  frontStems: [
    { id: "front-01", d: "M512 1110 C510 980 508 850 505 710", stroke: "#347A3E", width: 13, opacity: 0.78 },
    { id: "front-02", d: "M545 1090 C520 960 500 840 480 720", stroke: "#5F9F62", width: 11, opacity: 0.58 },
    { id: "front-03", d: "M485 1090 C530 930 590 780 640 620", stroke: "#347A3E", width: 10, opacity: 0.52 },
  ],
  dots: [
    dot("dot-01", 260, 750, 7, "#5F9F62", 0.5, 0.3, 7.8),
    dot("dot-02", 315, 805, 6, "#83B979", 0.48, 1.2, 9.1),
    dot("dot-03", 430, 880, 7, "#5F9F62", 0.42, 2.1, 6.7),
    dot("dot-04", 705, 880, 6, "#83B979", 0.42, 0.8, 10.2),
    dot("dot-05", 880, 450, 7, "#5F9F62", 0.55, 1.8, 8.5),
  ],
}
</script>

<style scoped>
.rose-decoration {
  pointer-events: none;
  overflow: visible;
}

.rose-decoration--hero {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 0;
  width: clamp(11.5rem, 34vw, 16rem);
  max-width: none;
  opacity: 0.92;
  transform: translate(-50%, -50%);
}

.rose-decoration--about {
  position: absolute;
  right: clamp(-9rem, -12vw, -4rem);
  top: -5.5rem;
  z-index: 0;
  width: clamp(11rem, 22vw, 18rem);
  opacity: 0.32;
  transform: rotate(8deg);
}

.rose-decoration--timeline {
  position: absolute;
  left: 50%;
  bottom: -2.4rem;
  z-index: 0;
  width: clamp(8rem, 16vw, 11.5rem);
  opacity: 0.54;
  transform: translateX(-50%) rotate(-2deg);
}

/* Contained within the hello-stage curtain (position: relative), so the
   bouquet scrolls away together with the curtain and only ever shows on the
   hello screen. Opacity also dissolves with the curtain via --rose-fade. */
.rose-decoration--hello {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: calc(0.9 * var(--rose-fade, 1));
  transform: translateZ(0);
}

.rose-decoration--pink.rose-decoration--hero {
  opacity: 0.94;
}

.rose-decoration--pink.rose-decoration--about {
  opacity: 0.28;
}

.rose-bouquet {
  animation: rose-bouquet-breathe 12.6s ease-in-out infinite;
  transform-box: view-box;
  transform-origin: 512px 720px;
}

.rose-bouquet__branches {
  animation: rose-branch-sway 11.6s ease-in-out infinite;
  transform-box: view-box;
  transform-origin: 512px 1080px;
}

.rose-bouquet__accent-flowers,
.rose-bouquet__small-flowers {
  animation: rose-flower-float 10.2s ease-in-out infinite;
  transform-box: view-box;
  transform-origin: 600px 350px;
}

.rose-bouquet__rose {
  transform-box: view-box;
}

.rose-petal {
  filter: saturate(1.03);
}

.rose-bouquet__rose-a {
  animation: rose-a-bloom 9.2s ease-in-out infinite;
}

.rose-bouquet__rose-b {
  animation: rose-b-bloom 8.8s 1.1s ease-in-out infinite;
}

.rose-bouquet__rose-c {
  animation: rose-c-bloom 7.9s 1.8s ease-in-out infinite;
}

.rose-bouquet__dots circle {
  opacity: var(--dot-opacity);
  animation: rose-dot-shimmer var(--dot-duration) var(--dot-delay) ease-in-out infinite;
}

.rose-avatar__rose-corner {
  animation: rose-avatar-bloom 9.4s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

.rose-avatar__flower-corner {
  animation: rose-flower-float 10.4s 0.8s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

.rose-hello__cluster {
  transform-box: fill-box;
  transform-origin: center;
  transition:
    opacity 620ms ease,
    transform 820ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes rose-bouquet-breathe {
  0%,
  100% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.006);
  }
  72% {
    transform: scale(0.998);
  }
}

@keyframes rose-branch-sway {
  0%,
  100% {
    transform: rotate(-0.3deg);
  }
  52% {
    transform: rotate(0.85deg);
  }
}

@keyframes rose-flower-float {
  0%,
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  48% {
    opacity: 0.94;
    transform: translateY(-3px);
  }
}

@keyframes rose-a-bloom {
  0%,
  100% {
    transform: rotate(-0.25deg) scale(1);
  }
  48% {
    transform: rotate(0.55deg) scale(1.012);
  }
}

@keyframes rose-avatar-bloom {
  0%,
  100% {
    transform: rotate(-0.25deg) scale(1.18);
  }
  48% {
    transform: rotate(0.55deg) scale(1.194);
  }
}

@keyframes rose-b-bloom {
  0%,
  100% {
    transform: rotate(0.2deg) scale(1);
  }
  50% {
    transform: rotate(-0.5deg) scale(1.01);
  }
}

@keyframes rose-c-bloom {
  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }
  52% {
    transform: rotate(0.5deg) scale(1.014);
  }
}

@keyframes rose-dot-shimmer {
  0%,
  100% {
    opacity: var(--dot-opacity);
  }
  50% {
    opacity: min(calc(var(--dot-opacity) + 0.1), 0.85);
  }
}

@media (max-width: 640px) {
  .rose-decoration--hero {
    width: 11rem;
    opacity: 0.88;
    transform: translate(-50%, -50%);
  }

  .rose-decoration--about {
    right: -3.2rem;
    top: -4rem;
    width: 9.5rem;
    opacity: 0.2;
  }

  .rose-decoration--timeline {
    bottom: -1.25rem;
    width: 8rem;
    opacity: 0.34;
  }

  .rose-decoration--hello {
    opacity: calc(0.68 * var(--rose-fade, 1));
  }
}

@media (prefers-reduced-motion: reduce) {
  .rose-bouquet,
  .rose-bouquet__branches,
  .rose-bouquet__accent-flowers,
  .rose-bouquet__small-flowers,
  .rose-bouquet__rose,
  .rose-bouquet__dots circle,
  .rose-avatar__rose-corner,
  .rose-avatar__flower-corner {
    animation: none;
  }

  .rose-hello__cluster {
    transition: none;
  }
}
</style>
