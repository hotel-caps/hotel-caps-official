<template>
  <section ref="heroSectionRef" class="relative h-[100vh] sm:h-[70vh] lg:h-[100vh] w-full flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <NuxtImg
        ref="bgImageRef"
        :src="slide.image"
        :alt="slide.alt"
        width="1600"
        height="1067"
        format="webp"
        quality="80"
        fetchpriority="high"
        loading="eager"
        preload
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black/55"></div>
      <div class="absolute bottom-0 left-0 w-full h-100 pointer-events-none gradient-fade-bottom"></div>
    </div>

    <!-- Foreground Content -->
    <div ref="heroContentRef" class="relative z-10 text-center flex flex-col  items-center text-white px-4">
      <!-- Eyebrow Title (Dancing Script + Scaled Down) -->
      <span 
        class="block font-['Dancing_Script'] text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 tracking-wide"
        :class="slide.eyebrowColorClass"
      >
        {{ slide.eyebrow }}
      </span>
      <h1 class="font-display opacity-90 text-4xl max-w-sm sm:max-w-lg md:max-w-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-widest lg:tracking-widest md:leading-normal sm:leading-normal lg:leading-normal leading-relaxed">{{ slide.title }}</h1>
      <p class="font-body text-center max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mt-2 sm:mt-4 text-base sm:text-lg lg:text-xl opacity-90 tracking-wider leading-relaxed ">
        {{ slide.subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const heroSectionRef = ref(null);
const heroContentRef = ref(null);
const bgImageRef = ref(null);

const slide = {
  eyebrow: 'Welcome To',
  eyebrowColorClass: 'text-[#eab308]',
  image: '/images/home/hero/caps-hero.jpg',
  alt: 'A welcoming view of Hotel CAPS',
  title: 'Hotel CAPS',
  subtitle:
    'A premier destination for pleasant stays, delicious food and memorable events in the heart of Palakkad, Kerala.',
  buttonText: 'Get in Touch'
};

// Read the shared state controlled by app.vue
const isInitialAppLoad = useState('isInitialAppLoad', () => true);

// Synchronized delays to match the compressed 1.8s loader
// Background scaling starts at 1.4s (while loader is fading)
const bgDelay = isInitialAppLoad.value ? 1.4 : 0;
// Text slides up at 1.6s (right as the loader vanishes)
const textDelay = isInitialAppLoad.value ? 1.6 : 0;

let ctx; // Declare context outside for safe unmounting

onMounted(() => {
  ctx = gsap.context(() => {

    // Hero Background Animation
    gsap.from(bgImageRef.value.$el, {
      delay: bgDelay,
      opacity: 0, 
      scale: 1.15,
      duration: 2.5,
      ease: 'power4.out' // Fixed from power5
    });

    // Hero Content Animation
    gsap.from(heroContentRef.value.children, {
      delay: textDelay,
      opacity: 0, 
      y: 30, // Note: Intentionally no opacity here so it's instantly paintable
      duration: 1.5,
      stagger: 0.1, // Gives a cinematic 1-2-3 reveal to your text elements
      ease: 'power4.out' // Fixed from power5
    });
    
  }, heroSectionRef.value);
});

// Registered correctly at the top level, not nested inside onMounted
onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>

.gradient-fade-bottom {
  pointer-events: none;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  backdrop-filter: blur(2px);
}
</style>
