<template>
  <section ref="introSectionRef" class="bg-white py-12 lg:py-20 overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Flex Container -->
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
        
        <!-- Left Column: Text & Features -->
        <div class="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
        
          <!-- Eyebrow Title -->
          <span 
            v-if="eyebrow" 
            class="intro-text-reveal block font-['Julee'] text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wide"
            :class="themeTextClass"
          >
            {{ eyebrow }}
          </span>
          
          <!-- Title -->
          <h2 class="intro-text-reveal font-display font-bold text-3xl lg:text-4xl text-zinc-900 tracking-wide whitespace-pre-line">
            {{ title }}
          </h2>
          
          <!-- The Signature Underline -->
          <div 
            class="intro-text-reveal w-16 sm:w-20 h-1 mt-6 mb-6 sm:mb-8 mx-auto md:mx-0"
            :class="themeBgClass"
          ></div>
          
          <!-- Description -->
          <p class="intro-text-reveal font-sans text-base sm:text-lg text-zinc-600 leading-relaxed mb-10 sm:mb-12 max-w-2xl">
            {{ description }}
          </p>
          
          <!-- Features Flexbox -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 w-full">
            <div 
              v-for="(feature, index) in features" 
              :key="index" 
              class="intro-text-reveal flex flex-col items-center text-center w-[150px] sm:w-[100px] xl:w-[130px] flex-shrink-0"
            >
              <!-- Icon Circle -->
              <div 
                class="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:-translate-y-1"
                :class="[themeIconBgClass, themeTextClass]"
                v-html="feature.svg"
              ></div>
              
              <!-- Feature Text -->
              <h3 class="font-sans font-semibold text-zinc-900 text-sm xl:text-base mb-2">
                {{ feature.title }}
              </h3>
              <p class="font-sans text-zinc-500 text-xs xl:text-sm leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
          
        </div>

        <!-- Right Column: Image -->
        <div class="intro-image-reveal w-full flex justify-center lg:w-2/5 mt-4 md:mt-0">
          <div class="relative w-full sm:w-8/12 lg:w-full aspect-[1/1] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl">
            <NuxtImg 
              :src="image" 
              :alt="imageAlt" 
              width="600"
              height="600"
              format="webp"
              quality="80"
              densities="x1"
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { gsap } from 'gsap';

// --- PROPS ---
const props = defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: 'Section Intro Image' },
  themeTextClass: { type: String, default: 'text-[#007700]' },
  themeBgClass: { type: String, default: 'bg-[#007700]' },
  themeIconBgClass: { type: String, default: 'bg-green-50' },
  features: { type: Array, required: true, default: () => [] }
});

// --- REFS & STATE ---
const introSectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

// --- ANIMATION LOGIC ---
const playIntroAnimation = () => {
  if (!introSectionRef.value) return;

  ctx = gsap.context(() => {
    // 1. Create a timeline with your requested 0.8s delay
    const tl = gsap.timeline({ delay: 1.1 });

    // 2. Play the image animation FIRST
    tl.from('.intro-image-reveal', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out'
    })
    // 3. Stagger the text items SECOND, overlapping by 0.8 seconds
    .from('.intro-text-reveal', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.15 
    }, "-=0.8");
    
  }, introSectionRef.value);
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (!isInitialAppLoad.value) {
    // Navigated via NuxtLink
    playIntroAnimation();
  } else {
    // Hard refresh - wait for loader
    const unwatch = watch(isInitialAppLoad, (isStillLoading) => {
      if (!isStillLoading) {
        playIntroAnimation();
        unwatch(); // Clean up watcher to save memory
      }
    });
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>