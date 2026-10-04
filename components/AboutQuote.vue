<template>
  <section ref="sectionRef" class="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Container Card -->
      <div class="quote-container-reveal relative bg-gradient-to-br from-[#2c1507] via-[#4a2610] to-[#2c1507] rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-2xl border border-amber-950/40 overflow-hidden">
        
        <!-- Opening Quote Mark Watermark (Top Left) -->
        <div class="quote-text-reveal absolute -top-4 -left-2 sm:top-2 sm:left-4 w-24 h-24 sm:w-36 sm:h-36 text-amber-600/15 pointer-events-none select-none">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>

        <!-- Closing Quote Mark Watermark (Bottom Right) -->
        <div class="quote-text-reveal absolute -bottom-6 -right-2 sm:bottom-2 sm:right-4 w-24 h-24 sm:w-36 sm:h-36 text-amber-600/15 pointer-events-none select-none">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
          </svg>
        </div>

        <!-- Layout Grid -->
        <div class="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-16">
          
          <!-- Left Column: Quote Content -->
          <div class="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <span class="quote-text-reveal block font-['Julee'] text-2xl sm:text-3xl lg:text-4xl text-amber-400 mb-3 sm:mb-4 tracking-wide">
              {{ directorsQuoteData.eyebrow }}
            </span>

            <blockquote class="quote-text-reveal font-display text-2xl lg:text-3xl text-white leading-relaxed tracking-wide mb-6 sm:mb-8">
              "{{ directorsQuoteData.quote }}"
            </blockquote>

            <p class="quote-text-reveal font-sans text-xs sm:text-sm lg:text-base text-amber-100/80 leading-relaxed whitespace-pre-line mb-8 max-w-2xl">
              {{ directorsQuoteData.subtext }}
            </p>

            <div class="flex flex-col items-center lg:items-start">
              <h3 class="quote-text-reveal font-display font-bold text-white text-lg sm:text-xl lg:text-2xl tracking-wide">
                {{ directorsQuoteData.author }}
              </h3>
              <p class="quote-text-reveal font-sans text-xs sm:text-sm text-amber-300/90 tracking-wide mt-1">
                {{ directorsQuoteData.designation }}
              </p>
            </div>

          </div>

          <!-- Right Column: Director Image -->
          <div class="w-full lg:w-2/5 flex justify-center">
            <div class="quote-image-reveal relative w-full sm:w-10/12 lg:w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group">
              <NuxtImg 
                :src="directorsQuoteData.image" 
                :alt="directorsQuoteData.imageAlt"
                width="800"
                height="600"
                format="webp"
                quality="80"
                loading="lazy"
                densities="x1"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
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

const directorsQuoteData = {
  eyebrow: "Director's Quote",
  quote: "At Hotel CAPS, we don't just provide services – we create experiences that stay with you forever.",
  subtext: "Our journey has always been about people.\nYour trust inspires us to keep raising the bar every day.",
  author: "Mr. Unnikrishnan P",
  designation: "Managing Director, Hotel CAPS",
  image: "/images/about/director.jpg",
  imageAlt: "Managing Director, Hotel CAPS"
};

const sectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } });

    // 1. Container
    tl.from('.quote-container-reveal', { opacity: 0, scale: 0.95, duration: 1.2, ease: 'power3.out' })
    // 2. Image
    .from('.quote-image-reveal', { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out' }, "-=0.6")
    // 3. Texts and Watermarks
    .from('.quote-text-reveal', { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: 'power3.out' }, "-=0.8");
  }, sectionRef.value);
};

onMounted(() => {
  if (!isInitialAppLoad.value) {
    setTimeout(() => { initScrollAnimation(); ScrollTrigger.refresh(); }, 600);
  } else {
    const unwatch = watch(isInitialAppLoad, async (isStillLoading) => {
      if (!isStillLoading) {
        await nextTick();
        setTimeout(() => { initScrollAnimation(); ScrollTrigger.refresh(); }, 50); 
        unwatch();
      }
    });
  }
});
onUnmounted(() => { if (ctx) ctx.revert(); });
</script>