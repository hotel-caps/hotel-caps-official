<template>
  <Transition name="cinematic-overlay">
    <div 
      v-if="isOpen" 
      class="mobile-menu-overlay fixed inset-0 z-50 overflow-hidden"
    >
      <!-- Cinematic Diagonal Background (Locked completely) -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/95 via-[#0a0a0a]/95 to-black backdrop-blur-xl z-0 pointer-events-none"></div>

      <!-- Scrollable Content Wrapper -->
      <div class="scroll-wrapper relative z-10 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col justify-center px-8 sm:px-16">
        
        <!-- Menu Content Container -->
        <nav class="flex flex-col w-full max-w-lg mx-auto space-y-1 mt-8">
          <!-- Animated Nav Links -->
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.text"
            :to="item.link" 
            @click="$emit('close')" 
            :style="{ '--theme-color': item.color }"
            class="nav-link group flex items-center w-full py-2 sm:py-5 transition-colors duration-300"
          >
            <!-- SVG Icon -->
            <component 
              :is="item.icon" 
              :size="24" 
              class="mr-4 text-[var(--theme-color)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 group-active:scale-110" 
            />

            <!-- Thin, Uppercase Typography -->
            <span class="font-display font-normal uppercase tracking-[0.2em] text-lg sm:text-2xl whitespace-nowrap text-[var(--theme-color)]">
              {{ item.text }}
            </span>

            <!-- Liquid Smooth Horizontal Line -->
            <div class="nav-line h-[1px] ml-6 sm:ml-8 flex-grow origin-left scale-x-0 opacity-0 bg-[var(--theme-color)] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 group-hover:opacity-60 group-active:scale-x-100 group-active:opacity-60"></div>
          </NuxtLink>
        </nav>

        <!-- Contact Button -->
        <div class="w-full max-w-lg mx-auto mt-12 sm:mt-16 mb-12 pr-8 sm:pr-0 shrink-0">
          <NuxtLink 
            to="/contact" 
            @click="$emit('close')" 
            class="mobile-contact-btn font-normal relative flex items-center justify-center w-full py-2 px-8 font-display uppercase tracking-widest text-xl sm:text-2xl text-[#D97706] border border-[#D97776]/40 rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(217,119,118,0)] hover:shadow-[0_0_20px_rgba(217,119,118,0.2)]"
          >
            <span class="relative z-10 group-hover:text-white transition-colors duration-300">
              Contact Us
            </span>
          </NuxtLink>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { markRaw } from 'vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close']);

// Flat hierarchy mapping the exact corrected theme colors provided
import { 
  PhHouse, PhUsers, PhBed, PhTag, 
  PhForkKnife, PhBookOpen, PhPlayCircle, 
  PhBuildings, PhCoffee 
} from '@phosphor-icons/vue';

const menuItems = [
  { text: 'Home', link: '/', color: '#D97706', icon: markRaw(PhHouse) },
  { text: 'About Us', link: '/about', color: '#e9a206', icon: markRaw(PhUsers) },
  { text: 'Rooms', link: '/rooms', color: '#2563eb', icon: markRaw(PhBed) },
  { text: 'Pricing', link: '/pricing', color: '#0284c7', icon: markRaw(PhTag) },
  { text: 'Restaurant', link: '/restaurant', color: '#03a661', icon: markRaw(PhForkKnife) },
  { text: 'Menu', link: '/menu', color: '#14b8a6', icon: markRaw(PhBookOpen) },
  { text: 'Live', link: '/live', color: '#82e9a6', icon: markRaw(PhPlayCircle) },
  { text: 'Events Hall', link: '/hall', color: '#e22473', icon: markRaw(PhBuildings) },
  { text: 'Catering', link: '/catering', color: '#df4444', icon: markRaw(PhCoffee) },
];
</script>

<style scoped>
/* 
  FIX: OS-Level "Press & Hold" Freezing Bug
  These rules completely disable the native magnifying glass, text selection, 
  and link-preview context menus on iOS/Android that cause the app to get stuck.
*/
.mobile-menu-overlay,
.mobile-menu-overlay a,
.mobile-menu-overlay span {
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

/* Apply scroll behavior ONLY to the wrapper, keeping background locked */
.scroll-wrapper {
  touch-action: pan-y;
}

/* Fix for landscape layout clipping top items */
@media (orientation: landscape) and (max-height: 500px) {
  .scroll-wrapper {
    justify-content: flex-start;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

/* --- Mobile Contact Button Fill Effect --- */
.mobile-contact-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: #D97706;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 0;
}
.mobile-contact-btn:hover {
  border-color: #D97706;
  color: #ffffff;
}
.mobile-contact-btn:hover::before,
.mobile-contact-btn:active::before {
  transform: scaleX(1);
  transform-origin: left;
}

/* --- Cinematic Overlay Transition --- */
.cinematic-overlay-enter-active, 
.cinematic-overlay-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.cinematic-overlay-enter-from, 
.cinematic-overlay-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

/* Subtle glow effect on active/hover links */
.nav-link:hover span,
.nav-link:active span {
  text-shadow: 0 0 20px var(--theme-color);
}
.nav-link:hover .nav-line,
.nav-link:active .nav-line {
  box-shadow: 0 0 15px var(--theme-color);
}
</style>