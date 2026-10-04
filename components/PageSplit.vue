<template>
  <section ref="splitSectionRef" class="bg-white py-12 lg:py-20 overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Flex Container: Stacked < 1024px (Text Top), Side-by-Side >= 1024px (Image Left, Text Right) -->
      <div class="flex flex-col lg:flex-row-reverse justify-between items-center gap-12 lg:gap-16 xl:gap-20">
        
        <!-- Right Column (Renders Top on Mobile): Text & Features -->
        <div class="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <!-- Eyebrow Title -->
          <span 
            v-if="eyebrow" 
            class="split-text-reveal block font-['Julee'] text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wide"
            :class="themeTextClass"
          >
            {{ eyebrow }}
          </span>
          
          <!-- Title (whitespace-pre-line allows \n to act as a line break) -->
          <h2 class="split-text-reveal font-display font-bold text-3xl lg:text-4xl text-zinc-900 tracking-wide whitespace-pre-line">
            {{ title }}
          </h2>
          
          <!-- The Signature Underline -->
          <div 
            class="split-text-reveal w-16 sm:w-20 h-1 mt-6 mb-6 sm:mb-8 mx-auto lg:mx-0"
            :class="themeBgClass"
          ></div>
          
          <!-- Description -->
          <p class="split-text-reveal font-sans text-base sm:text-lg text-zinc-600 leading-relaxed mb-10 sm:mb-12 max-w-2xl">
            {{ description }}
          </p>
          
          <!-- Bullet List (Strictly limited to 4 items) -->
          <ul class="flex flex-col gap-3 sm:gap-4 mb-10 sm:mb-12 w-auto max-w-2xl">
            <li 
              v-for="(bullet, index) in bullets.slice(0, 4)" 
              :key="index" 
              class="split-text-reveal flex items-start text-left w-full"
            >
              <!-- Raw SVG: Solid Checkmark -->
              <svg 
                viewBox="0 0 24 24" 
                class="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0 mr-3 sm:mr-4 transition-transform duration-300 hover:scale-110"
                :class="themeTextClass"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path d="M8 12L11 15L16 9" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </svg>
              <!-- Bullet Text perfectly scaled with the PageIntro descriptions -->
              <span class="font-sans font-medium text-zinc-700 text-sm xl:text-base leading-relaxed">
                {{ bullet }}
              </span>
            </li>
          </ul>
          
          <!-- CTA Button -->
          <div class="split-text-reveal">
            <NuxtLink 
              :to="buttonLink"
              class="bubble-button-base font-display tracking-wider font-semibold py-2 px-5 rounded-lg"
              :class="buttonClass"
            >
              {{ buttonText }} &rarr;
            </NuxtLink>
          </div>
          
        </div>

        <!-- Left Column (Renders Bottom on Mobile): Image -->
        <div class="split-image-reveal w-full flex justify-center lg:w-2/5 mt-4 lg:mt-0">
          <!-- Fixed Aspect Ratio Container: perfectly matching PageIntro sizing -->
          <div class="relative w-full sm:w-8/12 lg:w-full aspect-[1/1] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl">
            <NuxtImg 
              :src="image" 
              :alt="imageAlt" 
              width="600"
              height="600"
              format="webp"
              quality="90"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
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

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  bullets: { type: Array, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: 'Section Split Image' },
  buttonText: { type: String, default: 'Get in Touch' },
  buttonClass: { type: String },
  buttonLink: { type: String, default: '/contact' },
  themeTextClass: { type: String, default: 'text-[#db2777]' },
  themeBgClass: { type: String, default: 'bg-[#db2777]' }
});

// --- REFS & STATE ---
const splitSectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

// --- ANIMATION LOGIC ---
const initScrollAnimation = () => {
  if (!splitSectionRef.value) return;

  ctx = gsap.context(() => {
    // 1. Create a timeline attached to the ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitSectionRef.value,
        start: 'top 75%', // Fires when the top of the section hits 75% down the viewport
        // markers: true // Uncomment for debugging trigger lines
      }
    });

    // 2. Play the image animation FIRST
    tl.from('.split-image-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    // 3. Stagger the text items SECOND, but overlap by 0.8 seconds for a liquid feel
    .from('.split-text-reveal', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.15 
    }, "-=0.8"); 
    
  }, splitSectionRef.value);
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
    // Hard refresh - wait for the loader to unhide the layout
    const unwatch = watch(isInitialAppLoad, async (isStillLoading) => {
      if (!isStillLoading) {
        // nextTick ensures the browser finishes painting the layout before GSAP does its math
        await nextTick();
        setTimeout(() => {
          initScrollAnimation();
          ScrollTrigger.refresh(); // Forces GSAP to recalculate page heights
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
  color: white; 
}
.bubble-button-base:hover::before { 
  transform: scaleX(1); 
}
</style>