<template>
  <section ref="sectionRef" class="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Container Card -->
      <div class="highlight-container-reveal relative bg-[#112d1c] rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border border-green-950/40">
        
        <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-16">
          
          <template v-for="(item, index) in highlightsData" :key="index">
            
            <!-- Highlight Item Grid Cell -->
            <div class="w-full lg:w-1/2 flex flex-col justify-between items-center gap-6 sm:gap-8">
              
              <!-- Container for Text & Image -->
              <div 
                class="w-full flex flex-col items-center gap-6 sm:gap-8"
                :class="index === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
              >
                
                <!-- Text Content -->
                <div class="w-full sm:w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <h3 class="highlight-text-reveal font-['Julee'] text-2xl sm:text-3xl lg:text-4xl text-[#2d9b4c] mb-3 tracking-wide">
                    {{ item.title }}
                  </h3>
                  <div class="highlight-text-reveal w-12 h-0.5 bg-[#2d9b4c] mb-5 sm:mb-6"></div>
                  <p class="highlight-text-reveal font-sans text-xs sm:text-sm lg:text-base text-emerald-100/80 leading-relaxed whitespace-pre-line">
                    {{ item.description }}
                  </p>
                </div>

                <!-- Image Container -->
                <div class="highlight-image-reveal w-full sm:w-1/2 flex-shrink-0">
                  <div class="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-[#03a661]/30 shadow-xl group">
                    <NuxtImg 
                      :src="item.image" 
                      :alt="item.imageAlt"
                      width="600"
                      height="600"
                      sizes="380px sm:580px md:480px lg:600px"
                      format="webp"
                      quality="80"
                      densities="x1"
                      loading="lazy"
                      decoding="async"
                      class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>

              </div>
            </div>

            <!-- Central Adaptive Divider -->
            <div 
              v-if="index === 0" 
              class="highlight-divider-reveal w-full lg:w-auto flex lg:flex-col items-center justify-center my-2 lg:my-0 h-auto lg:h-full flex-shrink-0"
            >
              <div class="h-px lg:h-full w-full lg:w-px border-t lg:border-t-0 lg:border-r border-dashed border-[#2d9b4c]/40"></div>
              <div class="mx-4 lg:mx-0 lg:my-4 w-10 h-10 rounded-full border border-[#2d9b4c]/50 bg-[#112d1c] flex-shrink-0 flex items-center justify-center text-[#2d9b4c] shadow-inner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 0 8.48A11.83 11.83 0 0 1 11 20Z"/>
                  <path d="M11 20v-5"/><path d="M11 15a4 4 0 0 1-3-3"/>
                </svg>
              </div>
              <div class="h-px lg:h-full w-full lg:w-px border-t lg:border-t-0 lg:border-r border-dashed border-[#03a661]/40"></div>
            </div>

          </template>

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

const highlightsData = [
  { title: "Chill & Chai", description: "Your cozy corner for relaxing vibes and refreshing sips.\n\nEnjoy a variety of teas, snacks, and light bites in a calm and inviting atmosphere.", image: "/images/restaurant/chill-chai.jpg", imageAlt: "Chill and Chai special tea and snacks" },
  {
    title: "Arabic Corner",
    description: "Authentic flavours. Richly spiced. Always satisfying.\n\nFrom aromatic rice and grilled favourites to classic Arabic dishes, discover bold flavours made to be shared.",
    image: "/images/restaurant/arabic-corner.jpg",
    imageAlt: "Arabic dishes with grilled meats, rice, hummus and traditional accompaniments"
  }
];

const sectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } });

    // 1. Container
    tl.from('.highlight-container-reveal', { opacity: 0, scale: 0.95, duration: 1.2, ease: 'power3.out' })
    // 2. Divider fades in
    .from('.highlight-divider-reveal', { opacity: 0, scale: 0.8, duration: 0.8, ease: 'power3.out' }, "-=0.6")
    // 3. Images slide in
    .from('.highlight-image-reveal', { opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.6")
    // 4. Texts cascade
    .from('.highlight-text-reveal', { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, "-=0.8");
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