<template>
  <!-- Background Ambient Wrapper -->
  <section class="w-full min-h-screen bg-stone-900 flex items-center justify-center pt-20 pb-10 px-0 sm:px-6 relative overflow-hidden">
    
    <!-- 2:3 Aspect Ratio Canvas -->
    <div 
      class="relative w-[96%] max-w-[480px] sm:max-w-none sm:w-auto h-[80vh] sm:h-[85vh] aspect-[2/3] mx-auto bg-black rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl"
      @mousedown="pauseAutoplay"
      @mouseup="resumeAutoplay"
      @mouseleave="resumeAutoplay"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      
      <!-- BACKGROUND IMAGES (z-0) -->
      <transition-group name="crossfade" tag="div" class="absolute inset-0 w-full h-full pointer-events-none z-0">
        
        <!-- Title Slide -->
        <NuxtImg 
          v-if="isTitleSlide" 
          :key="'bg-title'" 
          :src="titleSlide.image" 
          :alt="titleSlide.titleMain"
          format="webp" 
          width="600"
          height="900"
          sizes="400px sm:600px"
          quality="80"
          densities="x1"
          fetchpriority="high"
          loading="eager"
          decoding="sync"
          :preload="{ fetchPriority: 'high' }"
          class="absolute inset-0 w-full h-full object-cover will-change-[transform,opacity]" 
        />
        
        <!-- Content Slides -->
        <NuxtImg 
          v-else-if="isContentSlide" 
          :key="`bg-${currentSlide}`" 
          :src="activeContent.image" 
          :alt="activeContent.title"
          format="webp" 
          width="600"
          height="900"
          sizes="400px sm:600px"
          quality="80"
          densities="x1"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 w-full h-full object-cover will-change-[transform,opacity]" 
        />
        
        <!-- Related Slide Base (Blurred & Tinted) -->
        <NuxtImg 
          v-else-if="isRelatedSlide" 
          :key="'bg-related'" 
          :src="relatedSlide.backgroundImage" 
          alt=""
          format="webp" 
          width="100"
          densities="x1"
          class="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 brightness-[0.25] pointer-events-none" 
        />
      </transition-group>

      <!-- Gradient Overlay (z-10) -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60 pointer-events-none z-10"></div>

      <!-- SLIDE CONTENT VIEWS (z-20) -->
      <div class="absolute inset-0 z-20 pointer-events-none">
  
        <transition name="cinematic-drift" mode="out-in">
    
          <!-- 1. TITLE SLIDE -->
          <div v-if="isTitleSlide" key="title-slide" class="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 flex flex-col items-start">
            <span class="text-[10px] md:text-[11px] font-sans tracking-[0.3em] text-white/80 uppercase font-bold mb-4">
                {{ formattedDate }}
            </span>
            <div class="flex items-center flex-wrap gap-2 mb-4">
              <span v-for="tag in article.tags" :key="tag" class="text-[10px] bg-white/10 backdrop-blur-md text-white px-2.5 py-1 rounded-sm font-sans uppercase font-bold tracking-widest border border-white/10">
                #{{ tag }}
              </span>
            </div>
            <h3 class="flex items-center gap-3 mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#d99706] uppercase">
              <span class="w-8 h-[1px] bg-[#d99706]"></span>
              <span>{{ titleSlide.eyebrow }}</span>
            </h3>
            <h1 class="font-display text-[2.5rem] sm:text-5xl lg:text-6xl text-white font-light leading-[1.15]">
              {{ titleSlide.titleMain }} 
              <span class="italic text-[#d99706] font-normal">{{ titleSlide.titleItalic }}</span>
            </h1>
          </div>

          <!-- 2. CONTENT SLIDES -->
          <div v-else-if="isContentSlide" :key="`content-${currentSlide}`" class="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 flex flex-col items-start">
            <div class="w-full flex items-center justify-between mb-4">
              <div class="font-display text-5xl sm:text-6xl text-[#d99706] font-light opacity-90 tracking-normal drop-shadow-md">
                {{ activeContent.num }}<span class="text-2xl text-white/50">/{{ slides.length }}</span>
              </div>
            </div>
            <h2 class="font-display text-3xl sm:text-4xl text-white font-medium leading-tight mb-4 drop-shadow-lg">
              {{ activeContent.title }}
            </h2>
            <p class="font-sans text-[15px] sm:text-base text-white/90 font-light leading-[1.6] drop-shadow-md">
              {{ activeContent.text }}
            </p>
          </div>

          <!-- 3. RELATED SLIDE -->
          <div v-else-if="isRelatedSlide" key="related-slide" class="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 flex flex-col items-start justify-end h-full mt-6">
            <h3 class="flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] text-white/70 uppercase mb-2">
              <span class="w-8 h-[1px] bg-white/20"></span> Further Reading
            </h3>
            <h2 class="font-display text-3xl lg:text-4xl text-[#d99706] italic mb-8">Keep Exploring.</h2>
      
            <div class="flex flex-col gap-4 w-full">
              <NuxtLink 
                v-for="post in relatedSlide.articles" 
                :key="post.url" 
                :to="post.url"
                class="relative z-50 pointer-events-auto flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <NuxtImg 
                    :src="post.image" 
                    :alt="post.title"
                    format="webp"
                    width="400"
                    height="300"
                    sizes="100px" 
                    quality="80"
                    loading="lazy"
                    class="w-20 h-20 rounded-xl object-cover shrink-0 shadow-md" 
                />
                <div class="flex flex-col justify-center">
                  <span class="text-[9px] font-sans tracking-[0.2em] text-[#d99706] uppercase font-bold mb-1">{{ post.date }}</span>
                  <h4 class="font-display text-[15px] text-white leading-tight mb-1 group-hover:text-[#d99706] transition-colors">{{ post.title }}</h4>
                  <span class="text-[9px] text-white/50 uppercase tracking-widest">#{{ post.tag }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>

        </transition>
      </div>

      <!-- TAP NAVIGATION ZONES (z-30) -->
      <div @click="prevSlide" class="absolute left-0 top-16 bottom-0 w-[40%] z-30 cursor-w-resize pointer-events-auto" aria-label="Previous Slide"></div>
      <div @click="nextSlide" class="absolute right-0 top-16 bottom-0 w-[40%] z-30 cursor-e-resize pointer-events-auto" aria-label="Next Slide"></div>

      <!-- PROGRESS DASHES (z-40) -->
      <div class="absolute top-0 left-0 w-full px-3 md:px-4 pt-4 flex gap-1.5 z-40 pointer-events-auto">
        <button 
          v-for="i in totalSlides" 
          :key="i"
          @click="goToSlide(i - 1)"
          class="flex-1 h-1.5 rounded-full transition-all duration-500 backdrop-blur-sm cursor-pointer"
          :class="currentSlide >= (i - 1) ? 'bg-[#d99706]' : 'bg-white/30 hover:bg-white/60'"
        ></button>
      </div>

      <!-- BACK TO BLOG BUTTON (z-40) -->
      <NuxtLink 
        to="/blog" 
        class="absolute top-9 left-3 md:left-4 z-40 flex items-center gap-1 text-white/70 hover:text-[#d99706] transition-colors drop-shadow-md pointer-events-auto py-2 px-1"
        aria-label="Back to Blog"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="text-[10px] font-sans uppercase font-bold tracking-widest mt-[1px]">Blog</span>
      </NuxtLink>

    </div>

    <!-- SEO GHOST DOM: Ensures crawlers read all text immediately -->
    <article class="sr-only" aria-hidden="true">
      <h1>{{ article.pageTitle }}</h1>
      <p>{{ article.pageDesc }}</p>
      <div v-for="slide in slides" :key="slide.num">
        <h2>{{ slide.title }}</h2>
        <p>{{ slide.text }}</p>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useState } from '#imports'

const props = defineProps({
  article: { type: Object, required: true }
})

// Data Mapping
const listicle = computed(() => props.article.listicleData)
const titleSlide = computed(() => listicle.value.titleSlide)
const slides = computed(() => listicle.value.slides || [])
const relatedSlide = computed(() => listicle.value.relatedSlide)

const formattedDate = computed(() => {
  return new Date(props.article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

// State
const currentSlide = ref(0)
const totalSlides = computed(() => 1 + slides.value.length + 1) // Title + Slides + Related
let autoplayTimer = null
let isPaused = false

// Touch Swipe State
let touchStartX = 0
let touchEndX = 0

// Autoplay Engine
const startAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = setInterval(() => {
    if (!isPaused && currentSlide.value < totalSlides.value - 1) {
      currentSlide.value++
    }
  }, 4500)
}

const pauseAutoplay = () => { isPaused = true }
const resumeAutoplay = () => { 
  // Prevent resuming if the global menu is open
  if (!isMenuOpen.value) isPaused = false 
}

// Global Menu Watcher (Ensures autoplay pauses when app menu opens)
const isMenuOpen = useState('isMenuOpen', () => false) 
watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    pauseAutoplay()
  } else {
    resumeAutoplay()
  }
})

// Navigation Logic
const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
    startAutoplay() 
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
    startAutoplay() 
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
  startAutoplay()
}

// Swipe Gesture Logic
const handleTouchStart = (e) => {
  pauseAutoplay()
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  resumeAutoplay()
  touchEndX = e.changedTouches[0].screenX
  
  const swipeThreshold = 50 // Minimum pixel distance for a valid swipe
  if (touchEndX < touchStartX - swipeThreshold) {
    nextSlide() // Swiped left -> Next
  } else if (touchEndX > touchStartX + swipeThreshold) {
    prevSlide() // Swiped right -> Previous
  }
}

// Keyboard Navigation Logic
const handleKeydown = (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault()
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevSlide()
  }
}

// Computed Views
const isTitleSlide = computed(() => currentSlide.value === 0)
const isContentSlide = computed(() => currentSlide.value > 0 && currentSlide.value <= slides.value.length)
const isRelatedSlide = computed(() => currentSlide.value === totalSlides.value - 1)

const activeContent = computed(() => {
  if (isContentSlide.value) return slides.value[currentSlide.value - 1]
  return null
})

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Image Background Transitions */
.crossfade-enter-active, .crossfade-leave-active { 
  transition: opacity 0.8s ease-in-out; 
}
.crossfade-enter-from, .crossfade-leave-to { 
  opacity: 0; 
}

/* Elegant Text Reveal (Pure Fade & Blur) */
.cinematic-drift-enter-active,
.cinematic-drift-leave-active { 
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1); 
}
.cinematic-drift-enter-from { 
  opacity: 0; 
  transform: scale(0.98); 
  filter: blur(8px);
}
.cinematic-drift-leave-to { 
  opacity: 0; 
  transform: scale(1.02); 
  filter: blur(4px);
}
</style>