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
        <p class="text-4xl sm:text-5xl font-bold tracking-[0.3em] mt-1 flex ml-[0.3em]">
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

let ctx; // Declare context outside for safe unmounting

// --- ANIMATION LOGIC ---
onMounted(() => {
  // 1. Instantly skip if it's an internal route navigation
  if (!isInitialAppLoad.value) {
    isVisible.value = false;
    return;
  }

  // 2. Lock scrolling immediately
  document.body.style.overflow = 'hidden';

  // 3. Single frame yield (No setTimeout delays)
  requestAnimationFrame(() => {
    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fast, fluid exit
          gsap.to(loaderContainer.value, {
            opacity: 0,
            duration: 0.5, // ⚡ Slashed from 1.2s to 0.5s
            ease: "power2.inOut",
            onComplete: () => {
              isVisible.value = false;
              isInitialAppLoad.value = false; 
              document.body.style.overflow = '';
            }
          });
        }
      });

      // The Compressed Cinematic Timeline
      // 0.0s: Glow starts
      tl.to(glowBg.value, { opacity: 1, duration: 1, ease: "power2.inOut" }, 0)
        
        // 0.15s: Logo fades in
        .to(logoRef.value.$el, { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 0.15)
        
        // 0.25s: "HOTEL" swirl (tighter stagger)
        .fromTo('.hotel-char',
          { opacity: 0, rotationY: -90, z: -50 },
          { opacity: 1, rotationY: 0, z: 0, duration: 0.9, stagger: 0.1, ease: "back.out(1.2)" },
          0.15)
        
        // 0.45s: "CAPS" stamp
        .fromTo('.caps-char',
          { opacity: 0, scale: 3 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          0.25)
        
        // Brief cinematic hold before exit triggers
        .to({}, { duration: 0.2 }); 
    });
  });
});

// Failsafe: Ensure overflow is restored and GSAP is cleaned up
onBeforeUnmount(() => {
  ctx?.revert(); 
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