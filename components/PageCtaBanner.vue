<template>
  <section ref="ctaSectionRef" class="py-12 lg:py-20 overflow-hidden bg-white">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Banner Container with Dynamic Gradient -->
      <div 
        class="cta-container-reveal relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10"
        :class="bgGradientClass"
      >
        
        <!-- Background Watermark SVG (Positioned Right, Semi-Transparent) -->
        <div 
          v-if="watermarkSvg"
          class="cta-watermark-reveal absolute -right-10 -bottom-10 sm:-right-12 sm:-bottom-12 lg:right-4 lg:-bottom-16 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 opacity-15 pointer-events-none text-white flex items-center justify-center select-none"
          v-html="watermarkSvg"
        ></div>

        <!-- Left Column: Content -->
        <div class="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:max-w-3xl">
          
          <!-- Eyebrow Title -->
          <span 
            v-if="eyebrow" 
            class="cta-text-reveal block font-['Julee'] text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 tracking-wide "
            :class="eyebrowColorClass"
          >
            {{ eyebrow }}
          </span>

          <!-- Title -->
          <h2 class="cta-text-reveal font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide leading-tight whitespace-pre-line mb-4 sm:mb-5">
            {{ title }}
          </h2>

          <!-- Description -->
          <p class="cta-text-reveal font-sans text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-xl">
            {{ description }}
          </p>

        </div>

        <!-- Right Column: CTA Button -->
        <div class="cta-btn-reveal relative z-10 flex-shrink-0">
          <NuxtLink 
            :to="buttonLink"
            class="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4.5 rounded-xl bg-white font-sans font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:translate-x-1 shadow-xl hover:shadow-2xl group"
            :class="buttonTextClass"
          >
            <span>{{ buttonText }}</span>
            
            <!-- Right Arrow SVG -->
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2.5" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="w-4 h-4 sm:w-5 sm:h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
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
  eyebrowColorClass: { type: String, default: "text-[#c2c2c2]" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, default: 'Request a Quote' },
  buttonLink: { type: String, default: '/contact' },
  bgGradientClass: { type: String, default: 'bg-gradient-to-r from-[#800d0d] via-[#b91b1b] to-[#ea580c]' },
  buttonTextClass: { type: String, default: 'text-[#b91b1b]' },
  watermarkSvg: { type: String, default: '' }
});

// --- REFS & STATE ---
const ctaSectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

// --- ANIMATION LOGIC ---
const initScrollAnimation = () => {
  if (!ctaSectionRef.value) return;

  ctx = gsap.context(() => {
    
    // 1. Master timeline bound to ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSectionRef.value,
        start: 'top 85%', // Fires when the container is entering the viewport
      }
    });

    // 2. Animate the Container (Zoom/Fade in)
    tl.from('.cta-container-reveal', {
      opacity: 0,
      scale: 0.95, // Slight scale up instead of translating
      duration: 1.2,
      ease: 'power3.out'
    })
    // 3. Subtle rotation/fade for the watermark in the background
    .from('.cta-watermark-reveal', {
      opacity: 0,
      scale: 0.8,
      rotation: -15,
      duration: 1.5,
      ease: 'power3.out'
    }, "-=0.8") // Start while container is finishing
    // 4. Stagger the text in
    .from('.cta-text-reveal', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15 
    }, "-=1.2") // Overlap aggressively with the container/watermark for a liquid feel
    // 5. Finally, pop the button in
    .from('.cta-btn-reveal', {
      opacity: 0,
      scale: 0.85,
      duration: 0.6,
      ease: 'back.out(1.5)' // Gives the button a premium, subtle bounce
    }, "-=0.4");

  }, ctaSectionRef.value);
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
    // Hard refresh - wait for loader
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