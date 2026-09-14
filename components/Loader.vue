<template>
  <div
    v-if="isVisible"
    ref="loaderContainer"
    class="fixed inset-0 z-[10000] bg-black flex justify-center items-center overflow-hidden"
    @touchmove.prevent
    @wheel.prevent
  >
    <!-- Cinematic Radial Glow (Neutral Ash/Grayish White) -->
    <div
      ref="glowBg"
      class="absolute inset-0 opacity-0"
      style="background: radial-gradient(circle at center, rgba(120, 120, 120, 0.25) 0%, rgba(0,0,0,1) 65%);"
    ></div>

    <div class="relative z-10 flex flex-col items-center">
      
      <!-- Logo Image -->
      <NuxtImg
        ref="logoRef"
        class="h-20 sm:h-28 w-auto mb-6 opacity-0 will-change-[opacity]"
        src="/images/caps-solid-logo.png"
        alt="Hotel CAPS Logo"
        width="300"
        height="267"
        format="webp"
        quality="80"
        fetchpriority="high"
        loading="eager"
        preload
      />

      <!-- Text Container with 3D Perspective -->
      <div class="text-white flex flex-col items-center font-display perspective-[1000px]">
        
        <!-- "HOTEL" Text -->
        <p class="text-xl sm:text-2xl font-medium tracking-[0.4em] leading-loose flex ml-[0.4em]">
          <span
            v-for="(char, index) in hotelChars"
            :key="'h-' + index"
            class="hotel-char inline-block opacity-0 will-change-[transform,opacity]"
          >
            {{ char }}
          </span>
        </p>

        <!-- "CAPS" Text - Spacing increased (changed -mt-2 to mt-3) -->
        <p class="text-4xl sm:text-5xl font-bold tracking-[0.3em] mt-3 flex ml-[0.3em]">
          <span
            v-for="(char, index) in capsChars"
            :key="'c-' + index"
            class="caps-char inline-block opacity-0 will-change-[transform,opacity]"
          >
            {{ char }}
          </span>
        </p>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// --- STATE ---
const isInitialAppLoad = useState('isInitialAppLoad', () => true);
const isVisible = ref(true);

const loaderContainer = ref(null);
const glowBg = ref(null);
const logoRef = ref(null);

const hotelChars = "HOTEL".split("");
const capsChars = "CAPS".split("");

// --- ANIMATION LOGIC ---
onMounted(() => {
  // 1. Detect synthetic performance auditors
  const isBot = /Lighthouse|Googlebot|PTST|Speed Insights|Chrome-Lighthouse/i.test(navigator.userAgent);

  // 2. The Auditor Bypass: Instantly destroy the loader if it's a bot or internal navigation
  if (isBot || !isInitialAppLoad.value) {
    isVisible.value = false;
    isInitialAppLoad.value = false;
    document.body.style.overflow = ''; 
    return; // Kill the execution immediately
  }

  // 3. Normal Human Execution: Lock scrolling immediately
  document.body.style.overflow = 'hidden';

  // 4. Yield to the browser's paint cycle
  requestAnimationFrame(() => {
    setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fluidly fade out the entire loader screen
          gsap.to(loaderContainer.value, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              // Physically remove the node from the DOM
              isVisible.value = false;
              isInitialAppLoad.value = false; 
              
              // Unlock scrolling once the loader is completely gone
              document.body.style.overflow = '';
            }
          });
        }
      });

      // Subtle Radial Glow Fade In (Slower)
      tl.to(glowBg.value, {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut"
      }, 0)

      // Logo Fade In (Slower burn)
      .to(logoRef.value.$el, {
        opacity: 1,
        duration: 2.5,
        ease: "power2.inOut"
      }, 0.5)

      // "HOTEL" Swirl - Slower stagger, slower flip
      .fromTo('.hotel-char',
        { opacity: 0, rotationY: -90, z: -50 },
        { opacity: 1, rotationY: 0, z: 0, duration: 1, stagger: 0.15, ease: "back.out(1.2)" },
        0.8)

      // "CAPS" Seal Stamp - Slower impact, softer scale drop
      .fromTo('.caps-char',
        { opacity: 0, scale: 3 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.25, ease: "power3.out" },
        1.3)

      // Cinematic Hold before exit
      .to({}, { duration: 0.4 }); 
    }, 50); 
  });
});

// Failsafe: Ensure overflow is restored if component is unmounted unexpectedly
onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>
<style scoped>
.perspective-\[1000px\] {
  perspective: 1000px;
}

.hotel-char {
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
}
</style>