<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { gsap } from 'gsap';

// --- PROPS ---
const props = defineProps({
  eyebrow: { type: String, required: false, default: '' },
  title: { type: String},
  subtitle: { type: String,  },
  images: { type: Array, default: () => [] },
  themeColorClass: { type: String },
  eyebrowColorClass: { type: String },
  imageGradientClass: { type: String }
});

// --- REFS ---
const heroContentRef = ref(null);
const heroSectionRef = ref(null);
const bgImageRef = ref(null);
const waveRef = ref(null);

// --- GLOBAL STATE ---
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

// --- ANIMATION LOGIC ---
const playHeroAnimation = () => {
  ctx = gsap.context(() => {
    
    // Background slow zoom
    gsap.from(bgImageRef.value.$el, {
      delay: 0,
      opacity: 0,
      scale: 1.15,
      duration: 3,
      ease: 'power3.out'
    });
    
    // Staggered text entry
    gsap.from(heroContentRef.value.children, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.15,
      delay: 0.2
    });

    // Elegant upward wave reveal
    gsap.from(waveRef.value, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.4
    });

  }, heroSectionRef.value);
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (!isInitialAppLoad.value) {
    // Navigated via NuxtLink - play immediately
    playHeroAnimation();
  } else {
    // Hard refresh - wait for the 4s loader to finish
    const unwatch = watch(isInitialAppLoad, (isStillLoading) => {
      if (!isStillLoading) {
        playHeroAnimation();
        unwatch(); 
      }
    });
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="heroSectionRef" class="relative h-[85vh] portrait:h-[60vh] w-full flex items-center text-white overflow-hidden">
    
    <!-- Background Image Layer (z-0) -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <NuxtImg 
        v-if="images.length > 0"
        ref="bgImageRef"
        :src="images[0]" 
        :alt="`${title} background image`" 
        format="webp"
        width="1600"
        height="1067"
        quality="80"
        fetchpriority="high"
        loading="eager"
        preload
        class="bg-image h-full w-full object-cover" 
      />
    </div>

    <!-- Custom ThemeishColor-Black Gradient Overlay (z-5) -->
    <div :class="imageGradientClass"></div>

    <!-- Text Content Layer (z-10) -->
    <div class="relative z-0 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div ref="heroContentRef" class="max-w-3xl xl:max-w-4xl text-left mt-10 sm:mt-16">
        
        <!-- Eyebrow Title (Dancing Script + Scaled Down) -->
        <span 
          v-if="eyebrow" 
          class="block font-['Dancing_Script'] text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3 tracking-wide"
          :class="eyebrowColorClass"
        >
          {{ eyebrow }}
        </span>

        <!-- Main Title (Strict Capitalization + Defined Serif Font) -->
        <h2 class="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold lg:font-semibold tracking-widest leading-tight capitalize mb-3">
          {{ title }}
        </h2>
        
        <!-- Subtitle (Inter / Sans-serif + Scaled Down) -->
        <p class="font-sans text-base md:text-lg lg:text-xl mt-3 sm:mt-5 font-normal tracking-wide leading-relaxed">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Advanced Offset SVG Wave (z-20) -->
    <div ref="waveRef" class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg 
        viewBox="0 0 1440 200" 
        class="w-full h-[80px] sm:h-[120px] md:h-[150px] lg:h-[180px] block" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- 
          The logic here is key: 
          At x=600 (middle left), the Red band dips to y=300, but the White base only dips to y=280. 
          Because the White base renders on top and starts higher (280 is above 300), 
          it completely hides the Red band in the center, revealing it only on the edges.
        -->

        <!-- Main Theme Band (Brick Red) -->
        <path :class="themeColorClass" fill="currentColor" d="M0,120 C 600,300 1000,-40 1440,120 L1440,200 L0,200 Z" />
        
        <!-- White Base -->
        <path fill="#ffffff" d="M0,150 C 600,280 1000,-35 1440,150 L1440,210 L0,210 Z" />
        
      </svg>
    </div>

  </section>
</template>