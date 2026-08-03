<template>
  <svg
    class="infinite-progress-logo"
    viewBox="0 0 590 118"
    role="img"
    aria-label="無限進步"
    preserveAspectRatio="xMidYMid meet"
    :class="{ 'is-revealing': reveal }"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M 0 117 L 39 117 L 44 109 L 74 109 L 75 112 L 72 117 L 111 117 L 116 109 L 151 109 L 158 93 L 119 93 L 115 100 L 86 100 L 85 99 L 88 93 L 49 93 L 44 101 L 8 101 Z M 270 88 L 283 117 L 307 117 L 302 105 L 303 104 L 313 104 L 320 88 L 303 88 L 298 96 L 294 88 Z M 504 61 L 478 61 L 464 92 L 489 92 Z M 316 117 L 559 117 L 564 105 L 552 105 L 551 104 L 573 57 L 547 57 L 547 59 L 525 105 L 349 105 L 348 103 L 362 75 L 362 73 L 359 72 L 375 38 L 341 38 L 335 49 L 335 51 L 342 51 L 343 53 L 329 81 L 332 84 Z M 589 13 L 554 13 L 553 12 L 558 3 L 532 3 L 514 40 L 509 40 L 508 37 L 520 11 L 495 11 L 489 22 L 483 37 L 480 40 L 474 40 L 468 52 L 515 52 L 516 53 L 500 85 L 496 96 L 521 96 L 542 52 L 575 52 L 581 40 L 542 40 L 541 38 L 547 26 L 580 26 Z M 394 3 L 379 34 L 387 34 L 388 37 L 358 99 L 449 99 L 454 87 L 424 87 L 423 85 L 427 78 L 449 78 L 455 66 L 434 66 L 433 65 L 434 62 L 437 58 L 455 58 L 461 45 L 444 45 L 443 44 L 449 34 L 467 34 L 473 22 L 451 22 L 450 21 L 459 3 L 432 3 L 423 22 L 412 22 L 411 21 L 419 3 Z M 400 78 L 401 79 L 396 87 L 391 87 L 390 86 L 394 78 Z M 410 59 L 406 66 L 401 66 L 400 65 L 404 58 L 409 58 Z M 421 34 L 422 35 L 417 45 L 411 45 L 410 44 L 414 36 L 416 34 Z M 386 3 L 361 3 L 346 34 L 372 34 Z M 347 3 L 272 3 L 272 17 L 225 117 L 266 117 L 271 105 L 257 105 L 256 104 L 267 82 L 310 82 L 347 5 Z M 300 50 L 290 70 L 274 70 L 273 69 L 278 57 L 283 49 L 299 49 Z M 314 16 L 315 18 L 307 35 L 305 37 L 290 37 L 289 36 L 289 34 L 298 16 Z M 8 86 L 163 86 L 169 73 L 150 73 L 149 72 L 157 56 L 168 56 L 174 43 L 164 43 L 163 42 L 176 16 L 203 16 L 204 17 L 200 24 L 200 26 L 157 117 L 182 117 L 229 17 L 233 16 L 234 17 L 211 64 L 209 71 L 212 71 L 213 73 L 197 107 L 222 107 L 254 40 L 250 40 L 249 38 L 266 3 L 81 3 L 80 2 L 81 0 L 42 0 L 32 19 L 56 19 L 57 21 L 46 43 L 32 43 L 26 54 L 26 56 L 39 56 L 40 57 L 32 73 L 15 73 Z M 130 56 L 131 57 L 124 72 L 120 73 L 119 71 L 126 57 Z M 99 56 L 100 58 L 94 71 L 92 73 L 90 73 L 89 71 L 95 58 L 97 56 Z M 69 56 L 70 58 L 63 72 L 59 73 L 58 72 L 65 57 Z M 149 16 L 150 17 L 138 42 L 134 43 L 133 42 L 143 22 L 144 18 L 146 16 Z M 118 16 L 119 18 L 108 41 L 106 43 L 104 43 L 103 41 L 114 18 L 116 16 Z M 88 16 L 89 17 L 78 41 L 76 43 L 73 43 L 72 42 L 84 17 Z"
    />
  </svg>
</template>

<script setup>
defineProps({
  reveal: { type: Boolean, default: false },
})
</script>

<style scoped>
.infinite-progress-logo {
  display: block;
  width: 100%;
  height: auto;
  shape-rendering: geometricPrecision;
  /* Slant + speed feel */
  transform: skewX(-8deg);
}

/* Left-to-right reveal, matching the continuous-stroke logo */
.infinite-progress-logo.is-revealing {
  animation: logo-reveal 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes logo-reveal {
  from {
    opacity: 0;
    transform: translateX(-20px) skewX(-4deg);
    clip-path: inset(0 100% 0 0);
  }
  to {
    opacity: 1;
    transform: translateX(0) skewX(-8deg);
    clip-path: inset(0 0 0 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .infinite-progress-logo.is-revealing {
    animation: none;
  }
}
</style>
