<template>
  <section ref="sectionRef" class="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Container Card with Catering Red Gradient -->
      <div class="catering-container-reveal relative bg-gradient-to-r from-[#4d0808] via-[#800d0d] to-[#4d0808] rounded-[1.75rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-red-950/40 text-center flex flex-col items-center">
        
        <!-- Header Section -->
        <span class="catering-header-reveal block font-['Julee'] text-2xl sm:text-3xl lg:text-4xl text-[#ff6262] mb-2 sm:mb-3 tracking-wide">
          {{ cateringEventsData.eyebrow }}
        </span>

        <h2 class="catering-header-reveal font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide leading-tight mb-4 sm:mb-5">
          {{ cateringEventsData.title }}
        </h2>

        <!-- Signature Gold Underline -->
        <div class="catering-header-reveal w-16 sm:w-20 h-1 bg-[#ff6262] mb-10 sm:mb-14"></div>

        <!-- Events Flexbox -->
        <div class="flex flex-wrap justify-center items-start gap-x-6 sm:gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-8 sm:gap-y-10 w-full">
          
          <div 
            v-for="(event, index) in cateringEventsData.events" 
            :key="index"
            class="flex flex-col items-center text-center w-[100px] sm:w-[120px] lg:w-[130px] flex-shrink-0 group cursor-default"
          >
            <!-- Gold Icon Container with hover lift -->
            <div class="catering-image-reveal">
              <div 
                class="mb-3 sm:mb-4 text-[#ff6262] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:text-[#ff8282] group-hover:drop-shadow-[0_4px_12px_rgba(251,191,36,0.3)]"
                v-html="event.svg"
              ></div>
            </div>
            
            <!-- Event Title -->
            <h3 class="catering-text-reveal font-sans font-semibold text-white text-xs sm:text-sm lg:text-base leading-snug whitespace-pre-line tracking-wide transition-colors duration-300">
              {{ event.title }}
            </h3>
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

const cateringEventsData = {
  eyebrow: "Events We Cater",
  title: "Perfect Catering for Every Occasion",
  events: [
    { title: "Weddings", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 sm:w-16 sm:h-16"><circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="M12 4l1 2h-2z"/></svg>` },
    { title: "Receptions", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 sm:w-16 sm:h-16"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13"/><path d="M19 12H5"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>` },
    { title: "Corporate\nMeetings", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 sm:w-16 sm:h-16"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M2 11h20"/></svg>` },
    { title: "Birthday\nParties", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 sm:w-16 sm:h-16"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16h16"/><path d="M12 7V3"/><path d="M12 3a1 1 0 0 0 0 0Z"/><path d="M2 21h20"/></svg>` },
    { title: "Anniversaries", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 sm:w-16 sm:h-16"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>` },
    { title: "Conferences", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 sm:w-16 sm:h-16"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/><line x1="12" y1="16" x2="12" y2="21"/></svg>` },
    { title: "Private\nGatherings", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 sm:w-16 sm:h-16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` }
  ]
};

const sectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
      }
    });

    // 1. Container
    tl.from('.catering-container-reveal', { opacity: 0, scale: 0.95, duration: 1.2, ease: 'power3.out' })
    // 2. Images (Icons)
    .from('.catering-header-reveal', { opacity: 0, scale: 0.5, stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)' }, "-=0.4")
    // 3. Images (Icons)
    .from('.catering-image-reveal', { opacity: 0, scale: 0.5, stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)' }, "-=0.6")
    // 4. Texts
    .from('.catering-text-reveal', { opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, "-=0.8");
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