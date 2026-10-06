<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen && currentItem"
        class="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center select-none"
        role="dialog"
        aria-modal="true"
        @click="emit('close')"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <!-- TOP-RIGHT CLOSE BUTTON (Always visible in top safe zone, never overlapped) -->
        <button
          type="button"
          aria-label="Close lightbox"
          class="fixed top-4 right-4 sm:top-6 sm:right-8 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-[#bd5c17] text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer"
          @click.stop="emit('close')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- PREV / NEXT ARROWS (Only rendered when masonry has > 1 image) -->
        <template v-if="hasMultiple">
          <button
            type="button"
            aria-label="Previous image"
            class="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-[#bd5c17]/30 text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer"
            @click.stop="prev"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next image"
            class="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-[#bd5c17]/30 text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer"
            @click.stop="next"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </template>

        <!-- CENTER IMAGE (Exact aspect ratio, capped at 150% dims & 88vw x 75vh safe box) -->
        <img
          :key="activeIndex"
          :src="currentItem.src"
          :alt="currentItem.alt || currentItem.caption || 'Hotel CAPS Visual'"
          :style="imageBoxStyle"
          draggable="false"
          class="z-20 block object-contain rounded-2xl shadow-2xl transition-transform duration-200"
          @click.stop
        />

        <!-- ABSOLUTE BOTTOM FULL CAPTION (No char truncation, safe bottom zone) -->
        <div
          v-if="currentItem.caption"
          class="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-16 z-30 flex justify-center pointer-events-none"
        >
          <p
            class="max-w-3xl px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-sm text-white/95 text-xs sm:text-sm md:text-base font-sans text-center leading-relaxed tracking-wide pointer-events-auto"
            @click.stop
          >
            {{ currentItem.caption }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => []
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

const activeIndex = ref(0)
let touchStartX = 0
let touchStartY = 0

const hasMultiple = computed(() => props.items.length > 1)
const currentItem = computed(() => props.items[activeIndex.value] || props.items[0] || null)

// Computes exact 1.5x max dimensions bounded by 88vw width and 75vh height
const imageBoxStyle = computed(() => {
  const item = currentItem.value
  const w = Number(item?.width) > 0 ? Number(item.width) : 800
  const h = Number(item?.height) > 0 ? Number(item.height) : 600
  const ratio = w / h
  const maxW = Math.round(w * 1.5)

  return {
    aspectRatio: `${w} / ${h}`,
    width: `min(88vw, calc(75vh * ${ratio}), ${maxW}px)`,
    height: 'auto'
  }
})

const next = () => {
  if (!hasMultiple.value) return
  activeIndex.value = (activeIndex.value + 1) % props.items.length
}

const prev = () => {
  if (!hasMultiple.value) return
  activeIndex.value = (activeIndex.value - 1 + props.items.length) % props.items.length
}

const onKeyDown = (e) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  } else if (e.key === 'ArrowRight' && hasMultiple.value) {
    e.preventDefault()
    next()
  } else if (e.key === 'ArrowLeft' && hasMultiple.value) {
    e.preventDefault()
    prev()
  }
}

const onTouchStart = (e) => {
  if (!e.touches.length) return
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const onTouchEnd = (e) => {
  if (!hasMultiple.value || !e.changedTouches.length) return
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) next()
    else prev()
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      activeIndex.value = props.initialIndex || 0
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
      }
    } else if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>