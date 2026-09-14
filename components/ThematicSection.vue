<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define the props that this component will accept.
const props = defineProps({
  theme: { type: String, default: 'blue' },
  align: { type: String, default: 'right' },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  icon: { type: Object, required: true }
});

// A ref to hold the main section element for GSAP context
const sectionRef = ref(null);

// --- DYNAMIC CLASSES ---
const themeClasses = {
  blue: { bg: 'bg-slate-900', card: 'card-theme-blue', text: 'text-sky-400', btn: 'btn-blue', icon: 'text-blue-400' },
  amber: { bg: 'bg-stone-900', card: 'card-theme-amber', text: 'text-amber-300', btn: 'btn-amber' , icon: 'text-stone-300' },
  green: { bg: 'bg-teal-950', card: 'card-theme-green', text: 'text-emerald-300', btn: 'btn-green', icon: 'text-emerald-500' },
  pink: { bg: 'bg-pink-950', card: 'card-theme-pink', text: 'text-pink-300', btn: 'btn-pink', icon: 'text-pink-300' }
};
const currentTheme = themeClasses[props.theme];

const bgImageRef = ref(null);

// --- ANIMATION LOGIC ---
onMounted(() => {
  let ctx = gsap.context(() => {
    const textContainer = sectionRef.value.querySelector('.feature-text-container');
    const image = bgImageRef.value.$el;

    gsap.set(textContainer, { xPercent: props.align === 'right' ? 100 : -100, opacity: 0 });
    gsap.set(image, { scale: 1.2 });

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top 85%",
      onEnter: () => {
        gsap.to(textContainer, { xPercent: 0, opacity: 1, duration: 1.2, ease: 'power4.out' });
        gsap.to(image, { scale: 1, duration: 1.5, ease: 'power4.out' });
      }
    });


  }, sectionRef.value);

  onUnmounted(() => {
    ctx.revert();
  });
});
</script>

<template>
  <section ref="sectionRef" class="feature-section relative w-full flex items-center justify-center overflow-hidden rounded-2xl">
    <!-- Background Image Layer -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <NuxtImg 
        ref="bgImageRef"
        :src="imageSrc" 
        :alt="imageAlt"
        width="1920"
        height="1278"
        format="webp"
        quality="80"
        loading="lazy"
        class="bg-image w-full h-full object-cover" 
      />
      <div class="absolute inset-0 bg-black/30"></div>
    </div>

    <!-- Content Layer -->
    <div 
      class="relative w-full max-w-8xl mx-auto px-4 sm:px-6 py-10 xl:py-20 lg:px-8 flex"
      :class="{ 'md:justify-end': align === 'right', 'md:justify-start': align === 'left' }"
    >
      <div class="feature-text-container w-full sm:w-full md:w-[65%] lg:w-1/2 xl:w-[40%]">
        <div class="rounded-2xl p-2 sm:p-4 bg-opacity-90 text-white shadow-2xl" :class="currentTheme.bg">
          <div class="feature-card-content p-6 sm:p-8 lg:p-10 rounded-xl" :class="currentTheme.card">
            <component :is="icon" class="absolute top-4 right-4 text-7xl opacity-30 -translate-y-1/4 translate-x-1/4" :class="currentTheme.icon" />
            <p class="text-sm font-bold uppercase tracking-widest" :class="currentTheme.text">{{ category }}</p>
            <h2 class="text-3xl sm:text-4xl lg:text-4xl font-display font-semibold tracking-wider mt-2 mb-4">{{ title }}</h2>
            <p class="text-base sm:text-base text-white/80 leading-relaxed sm:leading-loose tracking-wide">
              {{ description }}
            </p>
            <NuxtLink :to="buttonLink" class="bubble-button text-sm sm-text-base font-display tracking-widest font-semibold py-3 px-6 rounded-lg mt-6 sm:mt-8" :class="currentTheme.btn">
              {{ buttonText }} &rarr;
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- Thematic Bubble Buttons --- */
.bubble-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
  transition: color 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}
.bubble-button::before {
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
.bubble-button:hover { color: white; }
.bubble-button:hover::before { transform: scaleX(1); }

.btn-blue { border: 1px solid #93c5fd; color: #dbeafe; }
.btn-blue::before { background-color: #035ec7; }

.btn-amber { border: 1px solid #d4c3b3; color: #e9e3de; }
.btn-amber::before { background-color: #e49c00; }

.btn-green { border: 1px solid #6ee7b7; color: #d1fae5; }
.btn-green::before { background-color: #007448; }

.btn-pink { border: 1px solid #f9a8d4; color: #fce7f3; }
.btn-pink::before { background-color: #ca226e; }

/* --- Thematic Text Cards with Decorative Inner Borders --- */
.feature-card-content {
  position: relative;
}
.feature-card-content::before, .feature-card-content::after {
  content: '';
  position: absolute;
  width: 60%;
  height: 60%;
  border-color: var(--inner-border-color);
  border-style: solid;
  transition: all 0.3s ease-in-out;
}
.feature-card-content::before {
  top: 1.25rem; left: 1.25rem;
  border-width: 1px 0 0 1px;
  border-top-left-radius: 0.75rem;
}
.feature-card-content::after {
  bottom: 1.25rem; right: 1.25rem;
  border-width: 0 1px 1px 0;
  border-bottom-right-radius: 0.75rem;
}

.card-theme-blue { --inner-border-color: rgba(96, 165, 250, 0.5); }
.card-theme-amber { --inner-border-color: rgba(182, 164, 148, 0.5); }
.card-theme-green { --inner-border-color: rgba(52, 211, 153, 0.5); }
.card-theme-pink { --inner-border-color: rgba(244, 114, 182, 0.5); }

@media (max-width: 640px) {
  .feature-card-content::before { top: 0.75rem; left: 0.75rem; }
  .feature-card-content::after { bottom: 0.75rem; right: 0.75rem; }
}
</style>
