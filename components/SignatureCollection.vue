<template>
  <section ref="sectionRef" class="bg-[#fafaf9] py-16 lg:py-24 overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <!-- Section Header -->
      <div class="w-full max-w-3xl flex flex-col items-center text-center mb-16 sm:mb-20">
        <span 
          v-if="eyebrow" 
          class="sig-header-reveal block font-['Julee'] text-2xl sm:text-3xl lg:text-4xl mb-2 tracking-wide"
          :class="themeTextClass"
        >
          {{ eyebrow }}
        </span>
        
        <h2 class="sig-header-reveal font-display font-bold text-3xl lg:text-4xl text-zinc-900 tracking-wide whitespace-pre-line">
          {{ title }}
        </h2>
        
        <div 
          class="sig-header-reveal w-16 sm:w-20 h-1 mt-6 mb-6 sm:mb-8"
          :class="themeBgClass"
        ></div>
        
        <p class="sig-header-reveal font-sans text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
          {{ description }}
        </p>
      </div>

      <!-- Collection List (Mapped Months) -->
      <div class="w-full max-w-7xl flex flex-col gap-y-16 sm:gap-y-24">
        
        <div 
          v-for="(monthData, index) in months" 
          :key="index"
          class="sig-month-wrapper flex flex-col items-center w-full"
        >
          <!-- Month Divider Header -->
          <div class="flex items-center gap-4 mb-2">
            <div class="w-12 h-px bg-zinc-300"></div>
            <h3 class="font-display font-bold text-2xl sm:text-3xl text-[#0A3A3D]">
              {{ monthData.monthName }}
            </h3>
            <div class="w-12 h-px bg-zinc-300"></div>
          </div>
          <p class="text-xs sm:text-sm font-semibold tracking-[0.2em] text-zinc-400 uppercase mb-8 sm:mb-10">
            {{ monthData.subtitle }}
          </p>

          <!-- Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            <!-- Veg Card -->
            <div class="sig-card group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-zinc-100">
              <div class="relative aspect-[4/3] w-full overflow-hidden">
                <!-- Veg Badge -->
                <div class="absolute uppercase top-4 left-4 z-10 bg-[#065f46] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>
                  VEG SIGNATURE
                </div>
                <!-- Veg Card NuxtImg -->
                <NuxtImg 
                  :src="monthData.veg.image" 
                  :alt="monthData.veg.title" 
                  width="600"
                  height="450"
                  sizes="380px sm:580px md:360px lg:580px"
                  format="webp"
                  quality="80"
                  loading="lazy"
                  decoding="async"
                  densities="x1"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                /> 
              </div>
              <div class="p-6 sm:p-8 text-center flex flex-col items-center">
                <h4 class="font-display font-bold text-xl sm:text-2xl text-zinc-900 mb-3">
                  {{ monthData.veg.title }}
                </h4>
                <p class="font-sans text-sm text-zinc-500 leading-relaxed max-w-sm">
                  {{ monthData.veg.description }}
                </p>
              </div>
            </div>

            <!-- Non-Veg Card -->
            <div class="sig-card group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-zinc-100">
              <div class="relative aspect-[4/3] w-full overflow-hidden">
                <!-- Non-Veg Badge -->
                <div class="absolute uppercase top-4 left-4 z-10 bg-[#991b1b] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M8 16l8-8" stroke-linecap="round"/><path d="M16 16L8 8" stroke-linecap="round"/></svg>
                  NON-VEG SIGNATURE
                </div>
                <!-- Non-Veg Card NuxtImg -->
                <NuxtImg 
                  :src="monthData.nonVeg.image" 
                  :alt="monthData.nonVeg.title" 
                  width="600"
                  height="450"
                  sizes="380px sm:580px md:360px lg:580px"
                  format="webp"
                  quality="80"
                  loading="lazy"
                  decoding="async"
                  densities="x1"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div class="p-6 sm:p-8 text-center flex flex-col items-center">
                <h4 class="font-display font-bold text-xl sm:text-2xl text-zinc-900 mb-3">
                  {{ monthData.nonVeg.title }}
                </h4>
                <p class="font-sans text-sm text-zinc-500 leading-relaxed max-w-sm">
                  {{ monthData.nonVeg.description }}
                </p>
              </div>
            </div>

          </div>
        </div>
        
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  themeTextClass: { type: String, default: 'text-[#0F5A5D]' },
  themeBgClass: { type: String, default: 'bg-[#0F5A5D]' },
  months: { type: Array, required: true, default: () => [] }
});

// --- REFS & STATE ---
const sectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;
let rafId;

// --- ANIMATION LOGIC ---
const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  rafId = requestAnimationFrame(() => {
    ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.sig-header-reveal', {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08
      });

      // Month Wrapper & Cards Staggering
      const monthWrappers = gsap.utils.toArray('.sig-month-wrapper');
      
      monthWrappers.forEach((wrapper) => {
        const cards = wrapper.querySelectorAll('.sig-card');
        
        gsap.from([wrapper.children[0], wrapper.children[1], ...cards], {
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 88%',
            once: true
          },
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12
        });
      });
    }, sectionRef.value);
  });
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (!isInitialAppLoad.value) {
    initScrollAnimation();
  } else {
    const unwatch = watch(isInitialAppLoad, async (isStillLoading) => {
      if (!isStillLoading) {
        await nextTick();
        initScrollAnimation();
        unwatch();
      }
    });
  }
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (ctx) ctx.revert();
});
</script>