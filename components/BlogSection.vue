<template>
  <section 
    id="home-blog" 
    ref="sectionRef" 
    class="w-full bg-gradient-to-b from-stone-100 to-stone-200/70 py-10 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="blog-reveal text-center mb-12 lg:mb-16">
        <p class="font-sans text-sm font-bold uppercase tracking-widest text-[#bd5c17] mb-2">
          From Our Journal
        </p>
        <h2 class="text-3xl lg:text-4xl font-display font-bold tracking-wide text-zinc-900 leading-tight">
          Stories from <span class="text-[#bd5c17]">Our Table</span>
        </h2>
      </div>

      <!-- Carousel Viewport (Strictly 1 Card Visible at a Time) -->
      <div 
        v-if="featuredList.length > 0"
        class="blog-reveal relative w-full"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <div 
          class="overflow-hidden rounded-2xl shadow-lg border border-zinc-200/80 bg-white select-none touch-pan-y"
          :class="{ 'cursor-grab': featuredList.length > 1 && !isDragging, 'cursor-grabbing': isDragging }"
          @dragstart.prevent
          @click.capture="onClickCapture"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
        >
          <!-- Sliding Track (Disables transition during active drag for 1:1 follow) -->
          <div 
            class="flex w-full will-change-transform"
            :class="isDragging ? 'transition-none' : 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'"
            :style="{ transform: `translate3d(calc(-${currentIndex * 100}% + ${dragOffset}px), 0, 0)` }"
          >
            <!-- Individual Featured Slide (100% Width) -->
            <article 
              v-for="(blog, index) in featuredList" 
              :key="blog.url || index"
              class="group w-full shrink-0 flex flex-col md:flex-row bg-white overflow-hidden cursor-pointer"
              @click="handleCardNavigate(blog.url)"
            >
              <!-- Image Column: 16:9 on <md, Left Column on md+ -->
              <div class="w-full md:w-1/2 lg:w-3/5 aspect-video md:aspect-auto relative overflow-hidden bg-stone-100">
                <div class="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center tracking-widest uppercase shadow-md">
                  FEATURED
                </div>

                <NuxtImg 
                  :src="blog.coverImage" 
                  :alt="blog.title"
                  :width="blog.width || 1200"
                  :height="blog.height || 675"
                  sizes="380px sm:580px md:450px lg:600px"
                  :style="{ aspectRatio: `${blog.width || 16} / ${blog.height || 9}` }"
                  format="webp"
                  quality="80"
                  densities="x1"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />
              </div>

              <!-- Content Column: Bottom on <md, Right Column on md+ -->
              <div class="w-full md:w-1/2 lg:w-2/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-left">
                <div class="flex items-center gap-3 mb-3 sm:mb-4">
                  <div class="w-6 h-[2px] bg-[#bd5c17]"></div>
                  <span class="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                    {{ blog.date }}
                  </span>
                </div>

                <h3 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-zinc-900 mb-4 sm:mb-5 leading-snug group-hover:text-[#bd5c17] transition-colors duration-300">
                  {{ blog.title }}
                </h3>

                <p class="font-sans text-zinc-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                  {{ blog.intro }}
                </p>

                <div>
                  <NuxtLink 
                    :to="blog.url"
                    draggable="false"
                    @click.stop
                    class="relative inline-flex items-center w-fit pb-1.5 text-[#bd5c17] font-bold tracking-wide group-hover:text-[#C86A22] transition-colors duration-300"
                  >
                    <span>Read Story</span>
                    <span class="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                    <span class="absolute bottom-0 left-0 w-full h-[2px] bg-[#bd5c17] group-hover:bg-[#C86A22] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Subtle Navigation Arrows + Pagination Dots (Only shown if multiple featured blogs exist) -->
        <div 
          v-if="featuredList.length > 1" 
          class="flex items-center justify-center gap-4 mt-6"
        >
          <!-- Subtle Prev Arrow -->
          <button
            type="button"
            aria-label="Previous featured story"
            class="w-8 h-8 rounded-full flex items-center justify-center text-[#7A3E12]/70 hover:text-[#bd5c17] hover:bg-[#bd5c17]/10 active:scale-95 transition-all duration-200 cursor-pointer"
            @click="handleManualPrev"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <!-- Dots -->
          <div
            class="flex items-center justify-center gap-2.5"
            role="tablist"
            aria-label="Featured story slides"
          >
            <button
              v-for="(_, index) in featuredList"
              :key="index"
              type="button"
              role="tab"
              :aria-selected="currentIndex === index"
              :aria-label="`Go to slide ${index + 1}`"
              @click="goToSlide(index)"
              class="h-2.5 rounded-full transition-all duration-300 cursor-pointer"
              :class="currentIndex === index 
                ? 'w-8 bg-[#bd5c17]' 
                : 'w-2.5 bg-[#bd5c17]/25 hover:bg-[#bd5c17]/50'"
            />
          </div>

          <!-- Subtle Next Arrow -->
          <button
            type="button"
            aria-label="Next featured story"
            class="w-8 h-8 rounded-full flex items-center justify-center text-[#7A3E12]/70 hover:text-[#bd5c17] hover:bg-[#bd5c17]/10 active:scale-95 transition-all duration-200 cursor-pointer"
            @click="handleManualNext"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Bottom CTA: See All Blogs -->
      <div class="blog-reveal mt-12 lg:mt-18 text-center">
        <NuxtLink 
          to="/blog" 
          class="bubble-button-base bubble-button-brown font-display tracking-wider font-semibold py-3 px-8 rounded-lg text-base sm:text-lg shadow-sm"
        >
          See All Blogs &rarr;
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  blogs: {
    type: Array,
    default: () => []
  },
  autoplayDelay: {
    type: Number,
    default: 3000
  }
});

// Filter only featured blogs (or fallback to all passed items if none are marked featured)
const featuredList = computed(() => {
  const filtered = props.blogs.filter(blog => blog.featured);
  return filtered.length > 0 ? filtered : props.blogs;
});

// --- CAROUSEL, TOUCH & MOUSE DRAG ENGINE ---
const currentIndex = ref(0);
const isDragging = ref(false);
const dragOffset = ref(0);

let startX = 0;
let startY = 0;
let deltaX = 0;
let isHorizontalGesture = null;
let suppressNextClick = false;
let suppressTimer = null;
let autoplayTimer = null;
let isMounted = false;

const nextSlide = () => {
  if (featuredList.value.length <= 1) return;
  currentIndex.value = (currentIndex.value + 1) % featuredList.value.length;
};

const prevSlide = () => {
  if (featuredList.value.length <= 1) return;
  currentIndex.value = (currentIndex.value - 1 + featuredList.value.length) % featuredList.value.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
  resetAutoplay();
};

const handleManualPrev = () => {
  prevSlide();
  resetAutoplay();
};

const handleManualNext = () => {
  nextSlide();
  resetAutoplay();
};

// Autoplay Controls
const startAutoplay = () => {
  if (!isMounted || featuredList.value.length <= 1) return;
  stopAutoplay();
  autoplayTimer = setInterval(nextSlide, props.autoplayDelay);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const pauseAutoplay = () => stopAutoplay();
const resumeAutoplay = () => startAutoplay();
const resetAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

// Restart autoplay cleanly if blogs prop loads asynchronously
watch(
  () => featuredList.value.length,
  (len) => {
    if (currentIndex.value >= len) currentIndex.value = 0;
    if (len > 1) startAutoplay();
    else stopAutoplay();
  }
);

// Arm click suppression briefly after a swipe/drag so release never navigates
const armClickSuppression = () => {
  suppressNextClick = true;
  if (suppressTimer) clearTimeout(suppressTimer);
  suppressTimer = setTimeout(() => {
    suppressNextClick = false;
  }, 120);
};

// Capture-phase click guard blocks both <article> and <NuxtLink> clicks after a swipe
const onClickCapture = (e) => {
  if (suppressNextClick) {
    e.preventDefault();
    e.stopPropagation();
    suppressNextClick = false;
  }
};

const handleCardNavigate = (url) => {
  if (suppressNextClick || !url) return;
  navigateTo(url);
};

// Touch Handlers (Mobile & Tablet)
const onTouchStart = (e) => {
  if (featuredList.value.length <= 1 || !e.touches[0]) return;
  pauseAutoplay();
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  deltaX = 0;
  dragOffset.value = 0;
  isHorizontalGesture = null;
  isDragging.value = true;
};

const onTouchMove = (e) => {
  if (!isDragging.value || featuredList.value.length <= 1 || !e.touches[0]) return;
  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;

  // Determine whether the user is swiping horizontally or scrolling vertically
  if (isHorizontalGesture === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
    isHorizontalGesture = Math.abs(dx) > Math.abs(dy);
  }

  // If scrolling vertically, release drag tracking so page scroll stays smooth
  if (isHorizontalGesture === false) {
    isDragging.value = false;
    dragOffset.value = 0;
    return;
  }

  if (isHorizontalGesture === true) {
    deltaX = dx;
    dragOffset.value = dx;
    if (Math.abs(dx) > 8) {
      suppressNextClick = true;
    }
  }
};

const onTouchEnd = () => {
  if (!isDragging.value && deltaX === 0) {
    resumeAutoplay();
    return;
  }

  const swipeThreshold = 45;
  if (Math.abs(deltaX) > 8) {
    armClickSuppression();
  }

  if (deltaX < -swipeThreshold) {
    nextSlide();
  } else if (deltaX > swipeThreshold) {
    prevSlide();
  }

  isDragging.value = false;
  dragOffset.value = 0;
  deltaX = 0;
  isHorizontalGesture = null;
  resumeAutoplay();
};

// Mouse Drag Handlers (Desktop)
const onMouseDown = (e) => {
  if (featuredList.value.length <= 1 || e.button !== 0) return;
  isDragging.value = true;
  pauseAutoplay();
  startX = e.clientX;
  deltaX = 0;
  dragOffset.value = 0;
};

const onMouseMove = (e) => {
  if (!isDragging.value) return;
  deltaX = e.clientX - startX;
  dragOffset.value = deltaX;

  if (Math.abs(deltaX) > 8) {
    suppressNextClick = true;
  }
};

const onMouseUp = () => {
  if (!isDragging.value) return;

  const swipeThreshold = 50;
  if (Math.abs(deltaX) > 8) {
    armClickSuppression();
  }

  if (deltaX < -swipeThreshold) {
    nextSlide();
  } else if (deltaX > swipeThreshold) {
    prevSlide();
  }

  isDragging.value = false;
  dragOffset.value = 0;
  deltaX = 0;
  resumeAutoplay();
};

// --- GSAP SCROLL ENTRANCE ---
const sectionRef = ref(null);
let ctx = null;

onMounted(() => {
  isMounted = true;
  startAutoplay();

  ctx = gsap.context(() => {
    gsap.set('.blog-reveal', { y: 50, opacity: 0 });
    gsap.to('.blog-reveal', {
      y: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.25,
      ease: 'power4.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  isMounted = false;
  stopAutoplay();
  if (suppressTimer) clearTimeout(suppressTimer);
  if (ctx) ctx.revert();
});
</script>

<style scoped>
/* --- Custom Button with Side-Fill Effect --- */
.bubble-button-base {
  position: relative;
  overflow: hidden;
  display: inline-block;
  transition: color 0.4s ease-in-out;
  z-index: 1;
}
.bubble-button-base::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.7, 0, 0.2, 1);
  z-index: -1;
}
.bubble-button-base:hover {
  color: #ffffff;
}
.bubble-button-base:hover::before {
  transform: scaleX(1);
}

/* CAPS Editorial Brown (#bd5c17) Button */
.bubble-button-brown {
  border: 2px solid #bd5c17;
  color: #bd5c17;
}
.bubble-button-brown::before {
  background-color: #bd5c17;
}
</style>