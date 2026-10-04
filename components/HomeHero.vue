<template>
  <section 
    ref="heroSectionRef" 
    class="relative w-full h-[100vh] min-h-[640px] portrait:h-[96vh] pb-12 sm:pb-16 lg:pb-20 flex items-end overflow-hidden bg-[#0B0D13]"
  >
    <!-- 1. Background Image Layer (z-0) -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <NuxtImg 
        ref="bgImageRef"
        :src="slide.image" 
        :alt="slide.title" 
        format="webp"
        width="1600"
        height="1067"
        quality="90"
        densities="x1"
        fetchpriority="high"
        loading="eager"
        preload
        class="bg-image h-full w-full object-cover object-center" 
      />
    </div>

    <!-- 2. Left-Weighted Dark Gradient Overlay (z-5) -->
    <div :class="slide.imageGradientClass"></div>

    <!-- 3. Left-Aligned Foreground Content (z-10) -->
    <div class="relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
      <div 
        ref="heroContentRef" 
        class="flex flex-col items-start justify-start text-left text-white max-w-xl lg:max-w-2xl"
      >

        <!-- H1 Title with Desktop Decorative Dash (— Hotel CAPS) -->
        <h1 class="font-display text-2xl sm:text-3xl md:text-4xl font-normal tracking-wider flex items-center gap-3 mb-3 sm:mb-4">
          <span :class="slide.eyebrowBgClass" class="inline-block w-8 md:w-10 h-[1px] "></span>
          <span :class="slide.eyebrowColorClass">{{ slide.title }}</span>
        </h1>

        <!-- H2 Main Headline + Highlighted <span> for CELEBRATE. -->
        <h2 class="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest leading-tight text-white drop-shadow-md">
          {{ slide.subTitle }}
          <span 
            class="block mt-1"
            :class="slide.highlightColorClass"
          >
            {{ slide.highlightText }}
          </span>
        </h2>

        <!-- Subtle Accent Divider Line -->
        <div 
          class="w-10 sm:w-12 h-[1px] my-4 sm:my-5 rounded-full"
          :class="slide.dividerColorClass"
        ></div>

        <!-- Intro Paragraph -->
        <p class="font-sans text-left text-base sm:text-md lg:text-lg font-normal tracking-wide leading-relaxed max-w-md sm:max-w-lg text-white/85">
          {{ slide.intro }}
        </p>

        <!-- CTA Pill Button -->
        <div class="mt-6 sm:mt-8">
          <button
            type="button"
            @click="handleCtaClick"
            class="bubble-button-base flex items-center gap-2.5 font-display tracking-widest font-semibold py-2.5 px-5 rounded-lg cursor-pointer"
            :class="slide.ctaClass"
          >
            <span>{{ slide.ctaText }} &nbsp; &rarr;</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 5. Multi-Layered Rolling Sine Wave (1 Translucent + 2 Opaque) (z-20) -->
    <div ref="waveRef" class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg 
        viewBox="0 0 1440 200" 
        class="w-full h-[70px] sm:h-[95px] md:h-[120px] lg:h-[140px] block" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- LAYER 1 (Translucent): Soft counter-wave peaking in the troughs -->
        <path 
          :class="slide.translucentWaveClass" 
          fill="currentColor" 
          d="M0,132 C 200,90 450,168 720,135 C 990,102 1210,88 1440,130 L1440,200 L0,200 Z" 
        />

        <!-- LAYER 2 (Opaque): Secondary Theme Ribbon -->
        <path 
          :class="slide.themeWaveClass" 
          fill="currentColor" 
          d="M0,142 C 220,96 460,104 720,146 C 980,188 1180,104 1440,150 L1440,200 L0,200 Z" 
        />
        
        <!-- LAYER 3 (Opaque): Page Background Base -->
        <path 
          :class="slide.baseWaveClass" 
          fill="currentColor" 
          d="M0,156 C 230,110 460,118 720,156 C 980,194 1190,120 1440,166 L1440,205 L0,205 Z" 
        />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'

// --- HERO CONTENT & THEME CONFIGURATION ---
const slide = {
  image: '/images/home/hero/hotel-caps-hero.jpg',
  title: 'Hotel CAPS',
  subTitle: 'STAY. DINE.',
  highlightText: 'CELEBRATE.',
  intro: 'A place for good food, comfortable stays and moments worth celebrating.',
  ctaText: 'Discover CAPS',
  ctaTarget: '#discover',

  // Typography & Overlay Classes
  imageGradientClass: 'absolute inset-0 bg-gradient-to-r from-black/85 to-black/50 z-[5]',
  eyebrowColorClass: 'text-[#d18108]/95',
  eyebrowBgClass: 'bg-white/60',
  highlightColorClass: 'text-[#d18108]',
  dividerColorClass: 'bg-white/60',
  ctaClass: 'bubble-button-gold',

  // 3-Layer Wave Classes (1 Translucent + 2 Opaque)
  translucentWaveClass: 'text-[#d18108]/40', // Layer 1: Translucent accent layer
  themeWaveClass: 'text-[#bd5c17]',          // Layer 2: Opaque middle ribbon
  baseWaveClass: 'text-stone-200'            // Layer 3: Opaque bottom page base
}

// --- REFS ---
const heroSectionRef = ref(null)
const heroContentRef = ref(null)
const bgImageRef = ref(null)
const waveRef = ref(null)

// --- GLOBAL STATE ---
const isInitialAppLoad = useState('isInitialAppLoad')
let ctx

// --- CTA SMOOTH SCROLL ---
const handleCtaClick = () => {
  if (slide.ctaTarget && slide.ctaTarget.startsWith('#')) {
    const el = document.querySelector(slide.ctaTarget)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      return
    }
  }
  if (heroSectionRef.value) {
    window.scrollTo({
      top: heroSectionRef.value.offsetHeight - 80,
      behavior: 'smooth'
    })
  }
}

// --- GSAP ANIMATION ---
const playHeroAnimation = () => {
  ctx = gsap.context(() => {
    // Background slow zoom
    if (bgImageRef.value && bgImageRef.value.$el) {
      gsap.from(bgImageRef.value.$el, {
        delay: 0,
        opacity: 0,
        scale: 1.15,
        duration: 3,
        ease: 'power3.out'
      })
    }

    // Staggered text & CTA entry
    if (heroContentRef.value) {
      gsap.from(heroContentRef.value.children, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.14,
        delay: 0.2
      })
    }

    // Elegant upward wave reveal
    if (waveRef.value) {
      gsap.from(waveRef.value, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.4
      })
    }
  }, heroSectionRef.value)
}

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (!isInitialAppLoad.value) {
    playHeroAnimation()
  } else {
    const unwatch = watch(isInitialAppLoad, (isStillLoading) => {
      if (!isStillLoading) {
        playHeroAnimation()
        unwatch()
      }
    })
  }
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
/* Scoped styles ensure these rules ONLY apply to this component */

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

/* Blue Button */
.bubble-button-gold { 
  border: 2px solid #d18108; 
  color: #d18108; 
}
.bubble-button-gold::before { 
  background-color: #d18108; 
}

</style>