<template>
  <div
    v-if="slides.length"
    class="w-full flex flex-col gap-3.5 outline-none select-none"
    tabindex="0"
    @keydown.left.prevent="prevSlide"
    @keydown.right.prevent="nextSlide"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
  >
    <!-- 1. MAIN STAGE (Static Aspect Ratio Container = Zero CLS) -->
    <div
      class="group relative w-full max-w-4xl self-center rounded-3xl overflow-hidden shadow-xl bg-black"
      :style="{ aspectRatio: `${stageDims.width} / ${stageDims.height}` }"
      @touchstart.passive="onStageTouchStart"
      @touchend.passive="onStageTouchEnd"
    >
      <transition name="fade">
        <NuxtImg
          :key="activeIndex"
          :src="activeSlide.src"
          :alt="activeSlide.alt"
          :width="stageDims.width"
          :height="stageDims.height"
          sizes="380px sm:640px md:768px lg:900px xl:1200px"
          format="webp"
          quality="80"
          densities="x1"
          loading="lazy"
          decoding="async"
          draggable="false"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </transition>

      <!-- Main Stage Prev / Next Arrows -->
      <template v-if="slides.length > 1">
        <button
          type="button"
          aria-label="Previous image"
          class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-[#bd5c17] text-white backdrop-blur-md flex items-center justify-center shadow-lg opacity-85 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
          @click.stop="prevSlide"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next image"
          class="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-[#bd5c17] text-white backdrop-blur-md flex items-center justify-center shadow-lg opacity-85 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
          @click.stop="nextSlide"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </template>
    </div>

    <!-- 2. ACTIVE SLIDE CAPTION (Between Main Stage & Thumbnails — Max 100 Chars) -->
    <div
      v-if="activeSlide.truncatedCaption && activeSlide.captionClass !== 'hidden'"
      :class="[
        activeSlide.captionClass,
        'px-2 text-center text-xs md:text-sm font-sans text-[#1c1c1c]/80 tracking-wide leading-snug'
      ]"
    >
      {{ activeSlide.truncatedCaption }}
    </div>

    <!-- 3. THUMBNAIL STRIP (4:3 Thumbnails, Centered When Not Overflowing, Arrows on Overflow) -->
    <div v-if="slides.length > 1" class="relative w-full flex items-center">
      <!-- Thumbnail Left Overflow Arrow -->
      <button
        v-if="isThumbOverflowing && canScrollThumbLeft"
        type="button"
        aria-label="Scroll thumbnails left"
        class=" absolute left-1 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-[#bd5c17] text-white shadow-md flex items-center justify-center transition-colors cursor-pointer"
        @click.stop="scrollThumbsBy(-260)"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Thumbnail Track -->
      <div
        ref="thumbContainer"
        class="w-full flex items-center gap-3 overflow-x-auto hide-scrollbar py-2 px-1 touch-pan-x"
        :class="[
          isThumbOverflowing ? 'justify-start' : 'justify-center',
          isDraggingThumbs ? 'cursor-grabbing scroll-auto' : 'cursor-grab scroll-smooth'
        ]"
        @mousedown="onThumbMouseDown"
        @mousemove="onThumbMouseMove"
        @mouseup="onThumbMouseUp"
        @mouseleave="onThumbMouseLeave"
        @scroll.passive="updateThumbOverflowState"
      >
        <button
          v-for="(item, idx) in slides"
          :key="idx"
          type="button"
          class="relative shrink-0 w-24 sm:w-32 md:w-36 aspect-[4/3] rounded-xl overflow-hidden border-[3px] transition-all duration-300 outline-none cursor-pointer"
          :class="
            activeIndex === idx
              ? 'border-[#bd5c17] opacity-100 scale-[1.03] shadow-md'
              : 'border-transparent opacity-55 hover:opacity-100'
          "
          @click="onThumbnailClick(idx)"
        >
          <NuxtImg
            :src="item.src"
            :alt="item.alt"
            width="300"
            height="225"
            sizes="100px sm:140px md:180px"
            format="webp"
            quality="80"
            densities="x1"
            loading="lazy"
            decoding="async"
            draggable="false"
            class="w-full h-full object-cover pointer-events-none"
          />
        </button>
      </div>

      <!-- Thumbnail Right Overflow Arrow -->
      <button
        v-if="isThumbOverflowing && canScrollThumbRight"
        type="button"
        aria-label="Scroll thumbnails right"
        class="absolute right-1 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-[#bd5c17] text-white shadow-md flex items-center justify-center transition-colors cursor-pointer"
        @click.stop="scrollThumbsBy(260)"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const activeIndex = ref(0)
const thumbContainer = ref(null)

// Overflow & Drag States
const isThumbOverflowing = ref(false)
const canScrollThumbLeft = ref(false)
const canScrollThumbRight = ref(false)
const isDraggingThumbs = ref(false)

let isPointerDown = false
let hasDraggedThumbs = false
let dragStartX = 0
let dragScrollLeft = 0
let touchStartX = 0
let touchStartY = 0
let autoplayTimer = null
let resizeObserver = null

const isAutoplayEnabled = computed(() => Boolean(props.block?.autoplay))
const autoplayInterval = computed(() => Number(props.block?.interval) || 4000)

// --- CAPTION & SLIDE NORMALIZATION ---
const truncateCaption = (text) => {
  if (!text) return ''
  return text.length > 100 ? `${text.slice(0, 100)}...` : text
}

const getCaptionVisibilityClass = (entry) => {
  const rawMob = entry?.captionMob ?? props.block?.captionMob
  const rawPc = entry?.captionPc ?? entry?.captionPC ?? props.block?.captionPc ?? props.block?.captionPC

  const showMob = rawMob !== undefined ? Boolean(rawMob) : false
  const showPc = rawPc !== undefined ? Boolean(rawPc) : false

  if (showMob && showPc) return 'block'
  if (showMob && !showPc) return 'block lg:hidden'
  if (!showMob && showPc) return 'hidden lg:block'
  return 'hidden'
}

const slides = computed(() => {
  const raw = Array.isArray(props.block?.images) ? props.block.images : []
  const blockCaption = props.block?.caption ? String(props.block.caption).trim() : ''

  return raw.map((entry, idx) => {
    const isObj = entry !== null && typeof entry === 'object'
    const src = isObj ? (entry.src || entry.url || entry.image || '') : String(entry || '')
    const w = isObj && Number(entry.width) > 0 ? Number(entry.width) : null
    const h = isObj && Number(entry.height) > 0 ? Number(entry.height) : null

    const itemCaption = isObj && entry.caption ? String(entry.caption).trim() : ''
    const resolvedCaption = itemCaption || blockCaption

    // If neither image-level nor block-level caption is provided, use default hardcoded alt and show no caption
    const alt = resolvedCaption || (isObj && entry.alt ? String(entry.alt).trim() : `Hotel CAPS Story Visual ${idx + 1}`)

    return {
      src,
      width: w,
      height: h,
      alt,
      truncatedCaption: truncateCaption(resolvedCaption),
      captionClass: resolvedCaption ? getCaptionVisibilityClass(isObj ? entry : null) : 'hidden'
    }
  })
})

// Option A Static Stage Aspect Ratio (Block dims -> First image dims -> Default 4:3 1200x900)
const stageDims = computed(() => {
  const bw = Number(props.block?.width)
  const bh = Number(props.block?.height)
  if (bw > 0 && bh > 0) return { width: bw, height: bh }

  const first = slides.value[0]
  if (first?.width && first?.height) {
    return { width: first.width, height: first.height }
  }
  return { width: 1200, height: 900 }
})

const activeSlide = computed(() => slides.value[activeIndex.value] || slides.value[0] || {})

// --- SLIDE NAVIGATION & AUTOPLAY ---
const goToSlide = (index) => {
  if (!slides.value.length) return
  activeIndex.value = (index + slides.value.length) % slides.value.length
  nextTick(() => scrollToActiveThumbnail())
}

const nextSlide = () => {
  goToSlide(activeIndex.value + 1)
  resetAutoplay()
}

const prevSlide = () => {
  goToSlide(activeIndex.value - 1)
  resetAutoplay()
}

const startAutoplay = () => {
  if (!isAutoplayEnabled.value || slides.value.length <= 1) return
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    goToSlide(activeIndex.value + 1)
  }, autoplayInterval.value)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const pauseAutoplay = () => stopAutoplay()
const resumeAutoplay = () => {
  if (isAutoplayEnabled.value) startAutoplay()
}
const resetAutoplay = () => {
  if (isAutoplayEnabled.value) startAutoplay()
}

// --- MAIN STAGE TOUCH SWIPE ---
const onStageTouchStart = (e) => {
  if (!e.touches.length) return
  pauseAutoplay()
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const onStageTouchEnd = (e) => {
  if (!e.changedTouches.length) {
    resumeAutoplay()
    return
  }
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY

  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextSlide()
    else prevSlide()
  }
  resumeAutoplay()
}

// --- THUMBNAIL STRIP SCROLL, DRAG & OVERFLOW ---
const updateThumbOverflowState = () => {
  const el = thumbContainer.value
  if (!el) return
  const overflow = el.scrollWidth > el.clientWidth + 2
  isThumbOverflowing.value = overflow
  canScrollThumbLeft.value = overflow && el.scrollLeft > 4
  canScrollThumbRight.value = overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 4
}

const scrollThumbsBy = (delta) => {
  if (!thumbContainer.value) return
  thumbContainer.value.scrollBy({ left: delta, behavior: 'smooth' })
}

const scrollToActiveThumbnail = () => {
  const el = thumbContainer.value
  if (!el || !isThumbOverflowing.value) return
  const thumb = el.children[activeIndex.value]
  if (thumb) {
    const scrollPos = thumb.offsetLeft - el.offsetWidth / 2 + thumb.offsetWidth / 2
    el.scrollTo({ left: scrollPos, behavior: 'smooth' })
  }
}

const onThumbnailClick = (idx) => {
  if (hasDraggedThumbs) return
  goToSlide(idx)
  resetAutoplay()
}

const onThumbMouseDown = (e) => {
  if (!thumbContainer.value) return
  isPointerDown = true
  hasDraggedThumbs = false
  dragStartX = e.pageX - thumbContainer.value.offsetLeft
  dragScrollLeft = thumbContainer.value.scrollLeft
  pauseAutoplay()
}

const onThumbMouseMove = (e) => {
  if (!isPointerDown || !thumbContainer.value) return
  const x = e.pageX - thumbContainer.value.offsetLeft
  const distance = x - dragStartX
  if (Math.abs(distance) > 5) {
    hasDraggedThumbs = true
    isDraggingThumbs.value = true
  }
  if (hasDraggedThumbs) {
    e.preventDefault()
    thumbContainer.value.scrollLeft = dragScrollLeft - distance * 1.8
  }
}

const onThumbMouseUp = () => {
  isPointerDown = false
  isDraggingThumbs.value = false
  resumeAutoplay()
  setTimeout(() => {
    hasDraggedThumbs = false
  }, 0)
}

const onThumbMouseLeave = () => {
  isPointerDown = false
  isDraggingThumbs.value = false
  hasDraggedThumbs = false
  resumeAutoplay()
}

onMounted(() => {
  updateThumbOverflowState()
  if (thumbContainer.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => updateThumbOverflowState())
    resizeObserver.observe(thumbContainer.value)
  }
  if (isAutoplayEnabled.value) startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>