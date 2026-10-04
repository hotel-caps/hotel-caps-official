<template>
  <section ref="sectionRef" class="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Container Card with Rooms Blue Gradient -->
      <div class="room-container-reveal relative bg-gradient-to-r from-[#03153b] via-[#072a75] to-[#03153b] rounded-[1.75rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-blue-950/40 text-center flex flex-col items-center">
        
        <!-- Header Section -->
        <span class="room-text-reveal block font-['Julee'] text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wide text-[#12a5e6]">
          {{ roomCategoriesData.eyebrow }}
        </span>

        <h2 class="room-text-reveal font-display font-bold text-3xl lg:text-4xl text-white tracking-wide whitespace-pre-line mb-4 sm:mb-5">
          {{ roomCategoriesData.title }}
        </h2>

        <!-- Signature Light Blue Underline -->
        <div class="room-text-reveal w-16 sm:w-20 h-1 bg-sky-400 mb-10 sm:mb-14"></div>

        <!-- Rooms Responsive Flex Container -->
        <div class="flex flex-wrap justify-center items-center gap-6 lg:gap-8 w-full">
          
          <div 
            v-for="(room, index) in roomCategoriesData.rooms" 
            :key="index"
            class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-md lg:max-w-none flex-shrink-0"
          >
            <!-- Card Wrapper -->
            <div class="room-image-reveal relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-sky-400/30 shadow-2xl group cursor-pointer">
              
              <!-- Background Image -->
              <NuxtImg 
                :src="room.image" 
                :alt="room.imageAlt"
                width="1200"
                height="800"
                format="webp"
                quality="80"
                loading="lazy"
                densities="x1"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 group-hover:via-black/30 transition-colors duration-500"></div>

              <!-- Floating Room Title Overlay (Treated as Text) -->
              <div class="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 text-left">
                <h3 class="room-text-reveal font-display font-bold text-white text-xl sm:text-2xl lg:text-2xl tracking-wide drop-shadow-md">
                  {{ room.title }}
                </h3>
              </div>

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

const roomCategoriesData = {
  eyebrow: "Our Room Categories",
  title: "Choose the Room That Suits You",
  rooms: [
    { title: "Standard Room", image: "/images/rooms/standard/1.jpg", imageAlt: "Hotel CAPS Standard Room Category" },
    { title: "Deluxe Room", image: "/images/rooms/deluxe/1.jpg", imageAlt: "Hotel CAPS Deluxe Room Category" },
    { title: "Premium Suite", image: "/images/rooms/suite/1.jpg", imageAlt: "Hotel CAPS Premium Suite Room Category" }
  ]
};

const sectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } });

    // 1. Container
    tl.from('.room-container-reveal', { opacity: 0, scale: 0.95, duration: 1.2, ease: 'power3.out' })
    // 2. Room Images (The backgrounds slide up first)
    .from('.room-image-reveal', { opacity: 0, y: 40, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.6")
    // 3. Texts (Header texts + Room title overlays fade in beautifully on top)
    .from('.room-text-reveal', { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, "-=0.8");
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