<template>
  <section ref="sectionRef" class="bg-white py-12 lg:py-20 overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <!-- Section Header (Centered) -->
      <div class="w-full max-w-3xl flex flex-col items-center text-center mb-16 sm:mb-20">
        
        <!-- Eyebrow Title -->
        <span 
          v-if="eyebrow" 
          class="assure-header-reveal block font-['Julee'] text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wide"
          :class="themeTextClass"
        >
          {{ eyebrow }}
        </span>
        
        <!-- Title -->
        <h2 class="assure-header-reveal font-display font-bold text-3xl lg:text-4xl text-zinc-900 tracking-wide whitespace-pre-line">
          {{ title }}
        </h2>
        
        <!-- The Signature Underline -->
        <div 
          class="assure-header-reveal w-16 sm:w-20 h-1 mt-6 mb-6 sm:mb-8"
          :class="themeBgClass"
        ></div>
        
        <!-- Description -->
        <p class="assure-header-reveal font-sans text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
          {{ description }}
        </p>
        
      </div>

      <!-- Assurances Grid -->
      <div ref="gridRef" class="flex flex-wrap justify-center gap-y-12 sm:gap-y-16 gap-x-4 sm:gap-x-8 lg:gap-x-12 w-full">
        
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="assure-card flex flex-col items-center text-center w-[140px] sm:w-[180px] lg:w-[220px] xl:w-[260px] flex-shrink-0 group cursor-default"
        >
          <!-- Icon Circle with smooth hover lift and shadow expansion -->
          <div 
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5 sm:mb-6 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-lg"
            :class="[themeIconBgClass, themeTextClass]"
            v-html="feature.svg"
          ></div>
          
          <!-- Feature Text -->
          <h3 class="font-sans font-semibold text-zinc-900 text-sm sm:text-base xl:text-lg mb-2 sm:mb-3 transition-colors duration-300" :class="`group-hover:${themeTextClass}`">
            {{ feature.title }}
          </h3>
          <p class="font-sans text-zinc-500 text-xs sm:text-sm xl:text-base leading-relaxed px-2">
            {{ feature.description }}
          </p>
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
  themeTextClass: { type: String, default: 'text-[#b91b1b]' },
  themeBgClass: { type: String, default: 'bg-[#b91b1b]' },
  themeIconBgClass: { type: String, default: 'bg-red-50' },
  features: { type: Array, required: true, default: () => [] }
});

// --- REFS & STATE ---
const sectionRef = ref(null);
const gridRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

// --- ANIMATION LOGIC ---
const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    
    // Create a master timeline tied to the scroll position
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%', 
      }
    });

    // 1. Stagger the header text in smoothly
    tl.from('.assure-header-reveal', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1
    })
    // 2. Ripple the 12 icons in incredibly fast with a beautiful slight scale "pop"
    .from('.assure-card', {
      opacity: 0,
      y: 40,
      scale: 0.95, // Adds a premium spring-like feel
      duration: 0.6,
      ease: 'back.out(1.2)', // Bounces slightly past 1.0 scale
      stagger: 0.15 // Lightning fast ripple effect (0.05s between each card)
    }, "-=0.4"); // Starts overlapping with the header animation

  }, sectionRef.value);
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (!isInitialAppLoad.value) {
    // Navigated via NuxtLink. 
    // Wait for the out-in transition to finish so the DOM height is fully rendered.
    setTimeout(() => {
      initScrollAnimation();
      ScrollTrigger.refresh();
    }, 600);
  } else {
    // Hard refresh - wait for the global loader
    const unwatch = watch(isInitialAppLoad, async (isStillLoading) => {
      if (!isStillLoading) {
        await nextTick();
        setTimeout(() => {
          initScrollAnimation();
          ScrollTrigger.refresh();
        }, 50); 
        unwatch();
      }
    });
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>