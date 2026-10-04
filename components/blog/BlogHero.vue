<template>
  <div class="relative w-full flex flex-col bg-[#fafaf9]">
    
    <!-- ========================================== -->
    <!-- 1. IMAGE & TITLE SECTION                   -->
    <!-- ========================================== -->
    <section ref="heroSectionRef" class="relative h-[70vh] md:h-[80vh] min-h-[500px] w-full flex items-center overflow-hidden bg-black">
      
      <!-- Background Image Layer (z-0) -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <NuxtImg 
          v-if="hero?.image"
          ref="bgImageRef"
          :src="hero.image" 
          :alt="pageTitle"
          format="webp"
          width="1600"
          height="1067"
          quality="80"
          densities="x1"
          fetchpriority="high"
          loading="eager"
          preload
          class="bg-image h-full w-full object-cover origin-center" 
        />
      </div>

      <!-- Custom Dynamic Gradient Tint (z-5) -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-black/40 z-[5] " :class="imageGradientClass"></div>

      <!-- Title Content Layer (z-10) -->
      <div class="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 mt-12">
        <div ref="heroContentRef" class="max-w-5xl xl:max-w-4xl text-left flex flex-col">
          
          <span 
            class="block font-['Julee'] mb-1 sm:mb-2 text-2xl md:text-3xl tracking-wide"
            :class="eyebrowColorClass"
          >
            {{ eyebrow }}
          </span>

          <!-- BIG TEXT: Main Title -->
          <h1 class="font-display mt-1 mb-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest leading-tight capitalize drop-shadow-lg text-white">
            {{ pageTitle }}
          </h1>
          
          <!-- SMALL TEXT: Subtitle -->
          <p v-if="pageSubTitle" class="font-sans text-base md:text-lg lg:text-xl mt-1 sm:mt-2 font-normal tracking-wide leading-relaxed text-white">
            {{ pageSubTitle }}
          </p>

        </div>
      </div>

      <!-- Multi-Layered Flat Rolling Sine Wave (z-20) -->
      <div ref="waveRef" class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1440 200" 
          class="w-full h-[70px] sm:h-[95px] md:h-[120px] lg:h-[140px] block" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <!-- 1. Main Solid Theme Band (Multi-state: Crest -> Trough -> Crest -> Trough) -->
          <path 
            :class="themeColorClass" 
            fill="currentColor" 
            d="M0,125 C 180,125 270,182 450,182 C 650,182 750,108 950,108 C 1150,108 1260,175 1440,140 L1440,200 L0,200 Z" 
          />
          
          <!-- 2. Page Background Base (Pinches the theme band at x=450 and flares it at x=950) -->
          <path 
            fill="#fafaf9" 
            d="M0,148 C 180,132 270,184 450,188 C 650,184 750,110 950,114 C 1150,120 1260,176 1440,163 L1440,205 L0,205 Z" 
          />
        </svg>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 2. METADATA SECTION (WHITE SPACE)          -->
    <!-- ========================================== -->
    <section class="w-full pt-8 pb-10 z-30 border-b border-[#7A3E12]/10" ref="metaBlockRef">
      <div class="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        
        <!-- Left Side: Breadcrumbs -->
        <div class="flex flex-col gap-4">
          
          <nav class="text-xs md:text-sm font-bold tracking-widest uppercase text-[#7A3E12]/60 flex flex-wrap gap-2 items-center">
            <span v-for="(bc, i) in hero?.breadcrumbs" :key="i" class="flex items-center gap-2">
              <NuxtLink :to="bc.url" class="hover:text-[#bd5c17] transition-colors">{{ bc.label }}</NuxtLink> 
              <span v-if="i !== hero?.breadcrumbs.length - 1" class="text-[#7A3E12]/30">/</span>
            </span>
          </nav>
        </div>

        <!-- Right Side: Date & Read Time -->
        <div class="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-[#7A3E12]/80 border-t border-[#7A3E12]/10 md:border-t-0 pt-5 md:pt-0">
          <span>{{ formattedDate }}</span>
          <!-- Clever trick: replace 'text-' with 'bg-' to make the dot match the theme color -->
          <span class="w-1.5 h-1.5 rounded-full" :class="themeColorClass.replace('text-', 'bg-')"></span>
          <span>{{ readTime }} MIN READ</span>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { gsap } from 'gsap';

// --- PROPS ---
const props = defineProps({
  hero: { type: Object, required: true },
  pageTitle: { type: String, required: true },
  pageSubTitle: { type: String },
  publishDate: { type: String },
  readTime: { type: Number },
  
  // Customization variables (with safe fallbacks)
  eyebrow: { type: String, default: 'CAPS Stories' },
  imageGradientClass: { type: String, default: 'via-[#2A150A]/60' },
  themeColorClass: { type: String, default: 'text-[#bd5c17]' },
  eyebrowColorClass: { type: String, default: 'text-[#ce7f2e]' }
});

// --- REFS ---
const heroContentRef = ref(null);
const heroSectionRef = ref(null);
const bgImageRef = ref(null);
const waveRef = ref(null);
const metaBlockRef = ref(null);

// --- GLOBAL STATE ---
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

// --- COMPUTED LOGIC ---
const formattedDate = computed(() => {
  if (!props.publishDate) return '';
  return new Date(props.publishDate).toLocaleDateString('en-GB', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  }).toUpperCase().replace(/,/g, '');
});

// --- ANIMATION LOGIC ---
const playHeroAnimation = () => {
  // Scoped strictly to heroSectionRef as requested
  ctx = gsap.context(() => {
    
    // Background slow zoom
    if (bgImageRef.value && bgImageRef.value.$el) {
      gsap.from(bgImageRef.value.$el, {
        delay: 0,
        opacity: 0,
        scale: 1.15,
        duration: 3,
        ease: 'power3.out'
      });
    }
    
    // Staggered text entry
    if (heroContentRef.value) {
      gsap.from(heroContentRef.value.children, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.2
      });
    }

    // Elegant upward wave reveal
    if (waveRef.value) {
      gsap.from(waveRef.value, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.4
      });
    }

    // Slide up the white metadata block (Blog specific)
    if (metaBlockRef.value) {
      gsap.from(metaBlockRef.value, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6
      });
    }

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