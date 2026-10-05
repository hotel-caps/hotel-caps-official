<template>
  <div class="w-full overflow-hidden rounded-3xl py-1">
    <div
      ref="scrollContainer"
      class="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none !scroll-auto gap-4 sm:gap-5 lg:gap-6"
      :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUpOrLeave"
      @mouseleave="onMouseUpOrLeave"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
      @wheel.passive="onWheel"
      @scroll.passive="onScroll"
    >
      <NuxtImg
        v-for="(img, index) in displayImages"
        :key="index"
        :src="img.src"
        :alt="img.alt"
        :width="img.width"
        :height="img.height"
        sizes="300px sm:450px lg:525px"
        :style="{ aspectRatio: `${img.width} / ${img.height}` }"
        format="webp"
        quality="80"
        densities="x1"
        loading="lazy"
        decoding="async"
        draggable="false"
        class="h-[200px] sm:h-[300px] lg:h-[350px] w-auto max-w-none flex-shrink-0 object-cover rounded-[1.25rem] sm:rounded-[1.5rem] shadow-md transition-all duration-300 hover:brightness-105"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const scrollContainer = ref(null)
const isDragging = ref(false)

let animationFrameId = null
let resumeTimeout = null
let initTimeout = null
let isInteracting = false
let startX = 0
let scrollLeftPos = 0
let accum = 0

const COPIES = 15
const scrollSpeed = computed(() => Number(props.block?.speed) || 1.2)

// Normalize plain URL strings or objects with default 4:3 (600x450) fallback
const normalizedImages = computed(() => {
  const raw = Array.isArray(props.block?.images) ? props.block.images : []
  const blockCaption = props.block?.caption ? String(props.block.caption).trim() : ''

  return raw.map((entry, idx) => {
    const isObj = entry !== null && typeof entry === 'object'
    const src = isObj ? (entry.src || entry.url || entry.image || '') : String(entry || '')
    const w = isObj && Number(entry.width) > 0 ? Number(entry.width) : 600
    const h = isObj && Number(entry.height) > 0 ? Number(entry.height) : 450

    const itemCaption = isObj ? String(entry.caption || entry.alt || '').trim() : ''
    const alt = itemCaption || blockCaption || `Hotel CAPS Story Visual ${idx + 1}`

    return {
      src,
      width: w,
      height: h,
      alt
    }
  })
})

// 15 copies so ultrawide monitors never hit a physical scroll boundary
const displayImages = computed(() => {
  if (!normalizedImages.value.length) return []
  const arr = []
  for (let i = 0; i < COPIES; i++) {
    arr.push(...normalizedImages.value)
  }
  return arr
})

// --- Autoplay Pause / Resume ---
const pauseAutoplay = () => {
  isInteracting = true
  if (resumeTimeout) clearTimeout(resumeTimeout)
}

const resumeAutoplay = () => {
  if (resumeTimeout) clearTimeout(resumeTimeout)
  resumeTimeout = setTimeout(() => {
    isInteracting = false
  }, 150)
}

// --- Mouse, Touch & Wheel Controls ---
const onMouseDown = (e) => {
  if (!scrollContainer.value) return
  isDragging.value = true
  pauseAutoplay()
  startX = e.pageX - scrollContainer.value.offsetLeft
  scrollLeftPos = scrollContainer.value.scrollLeft
}

const onMouseMove = (e) => {
  if (!isDragging.value || !scrollContainer.value) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (startX - x) * 1.5
  scrollContainer.value.scrollLeft = scrollLeftPos + walk
}

const onMouseUpOrLeave = () => {
  if (isDragging.value) {
    isDragging.value = false
    resumeAutoplay()
  }
}

const onTouchStart = () => pauseAutoplay()
const onTouchEnd = () => resumeAutoplay()

const onWheel = () => {
  pauseAutoplay()
  resumeAutoplay()
}

// --- Seamless Infinite Loop Teleport ---
const onScroll = () => {
  if (!scrollContainer.value) return
  const setWidth = scrollContainer.value.scrollWidth / COPIES
  if (!setWidth) return

  const currentScroll = scrollContainer.value.scrollLeft
  if (currentScroll >= setWidth * 8) {
    scrollContainer.value.scrollLeft = currentScroll - setWidth
  } else if (currentScroll <= setWidth * 6) {
    scrollContainer.value.scrollLeft = currentScroll + setWidth
  }
}

const scrollLoop = () => {
  if (!isInteracting && scrollContainer.value) {
    accum += scrollSpeed.value
    if (accum >= 1) {
      const step = Math.floor(accum)
      scrollContainer.value.scrollLeft += step
      accum -= step
    }
  }
  animationFrameId = requestAnimationFrame(scrollLoop)
}

onMounted(() => {
  initTimeout = setTimeout(() => {
    if (scrollContainer.value && displayImages.value.length) {
      scrollContainer.value.scrollLeft = (scrollContainer.value.scrollWidth / COPIES) * 7
      animationFrameId = requestAnimationFrame(scrollLoop)
    }
  }, 250)
})

onUnmounted(() => {
  if (initTimeout) clearTimeout(initTimeout)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (resumeTimeout) clearTimeout(resumeTimeout)
})
</script>