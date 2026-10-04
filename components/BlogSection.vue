<template>
  <section 
    id="home-blog" 
    ref="sectionRef" 
    class="w-full bg-gradient-to-b from-stone-100 to-stone-200/70 py-16 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
        <div class="w-16 sm:w-20 h-1 bg-[#bd5c17] mx-auto mt-5 rounded-full"></div>
      </div>

      <!-- Carousel Viewport (Strictly 1 Card Visible at a Time) -->
      <div 
        v-if="featuredList.length > 0"
        class="blog-reveal relative w-full"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <div 
          class="overflow-hidden rounded-2xl shadow-lg border border-zinc-200/80 bg-white select-none"
          :class="{ 'cursor-grab': featuredList.length > 1 && !isDragging, 'cursor-grabbing': isDragging }"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
        >
          <!-- Sliding Track -->
          <div 
            class="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            :style="{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }"
          >
            <!-- Individual Featured Slide (100% Width) -->
            <article 
              v-for="(blog, index) in featuredList" 
              :key="blog.url || index"
              class="w-full shrink-0 flex flex-col md:flex-row bg-white overflow-hidden"
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
                  :style="{ aspectRatio: `${blog.width || 16} / ${blog.height || 9}` }"
                  format="webp"
                  quality="80"
                  loading="lazy"
                  densities="x1"
                  draggable="false"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
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

                <h3 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-zinc-900 mb-4 sm:mb-5 leading-snug">
                  {{ blog.title }}
                </h3>

                <p class="font-sans text-zinc-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                  {{ blog.intro }}
                </p>

                <div>
                  <NuxtLink 
                    :to="blog.url" 
                    class="bubble-button-base bubble-button-brown font-display tracking-wider font-semibold py-2.5 px-6 rounded-lg"
                  >
                    Read Blog &rarr;
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Pagination Dots (Only shown if multiple featured blogs exist) -->
        <div 
          v-if="featuredList.length > 1" 
          class="flex items-center justify-center gap-2.5 mt-6"
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
      </div>

      <!-- Bottom CTA: See All Blogs -->
      <div class="blog-reveal mt-10 lg:mt-14 text-center">
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  blogs: {
    type: Array,
    default: () => [
      {
        title: 'More Than Just a Meal: The Art of Hospitality at CAPS',
        intro: 'Step behind the scenes to discover how time-honored recipes, local Palakkad ingredients, and warm family traditions come together at our table.',
        date: 'OCTOBER 2026',
        coverImage: '/images/live-universal.jpg',
        url: '/blog/more-than-just-a-meal',
        width: 1200,
        height: 675,
        featured: true
      }
    ]
  },
  autoplayDelay: {
    type: Number,
    default: 5000
  }
});

// Filter only featured blogs (or fallback to all passed items if none are marked featured)
const featuredList = computed(() => {
  const filtered = props.blogs.filter(blog => blog.featured);
  return filtered.length > 0 ? filtered : props.blogs;
});

// --- CAROUSEL & TOUCH ENGINE ---
const currentIndex = ref(0);
const isDragging = ref(false);
let startX = 0;
let deltaX = 0;
let autoplayTimer = null;

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

// Autoplay Controls
const startAutoplay = () => {
  if (featuredList.value.length <= 1) return;
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

// Touch Handlers (Mobile)
const onTouchStart = (e) => {
  if (featuredList.value.length <= 1) return;
  pauseAutoplay();
  startX = e.touches[0].clientX;
  deltaX = 0;
};

const onTouchMove = (e) => {
  if (featuredList.value.length <= 1) return;
  deltaX = e.touches[0].clientX - startX;
};

const onTouchEnd = () => {
  if (featuredList.value.length <= 1) return;
  const swipeThreshold = 45;
  if (deltaX < -swipeThreshold) {
    nextSlide();
  } else if (deltaX > swipeThreshold) {
    prevSlide();
  }
  deltaX = 0;
  resumeAutoplay();
};

// Mouse Drag Handlers (Desktop)
const onMouseDown = (e) => {
  if (featuredList.value.length <= 1) return;
  isDragging.value = true;
  pauseAutoplay();
  startX = e.clientX;
  deltaX = 0;
};

const onMouseMove = (e) => {
  if (!isDragging.value) return;
  deltaX = e.clientX - startX;
};

const onMouseUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  const swipeThreshold = 50;
  if (deltaX < -swipeThreshold) {
    nextSlide();
  } else if (deltaX > swipeThreshold) {
    prevSlide();
  }
  deltaX = 0;
  resumeAutoplay();
};

// --- GSAP SCROLL ENTRANCE ---
const sectionRef = ref(null);
let ctx = null;

onMounted(() => {
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
  stopAutoplay();
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