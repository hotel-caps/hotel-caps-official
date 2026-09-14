<template>
  <section class="bg-white py-16 lg:py-20 overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <!-- Section Header -->
      <div class="w-full flex flex-col items-center text-center mb-10 sm:mb-16">
        
        <!-- Eyebrow Title -->
        <span 
          v-if="eyebrow" 
          class="block font-['Dancing_Script'] text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wide"
          :class="themeTextClass"
        >
          {{ eyebrow }}
        </span>

        <!-- Home Eyebrow Title -->
        <p 
          v-if="homeEyebrow" 
          class="font-sans text-sm font-bold uppercase tracking-widest mb-2"
          :class="themeTextClass"
        >
          {{ homeEyebrow }}
        </p>
        
        <!-- Title -->
        <h2 class="font-display font-bold text-3xl lg:text-4xl text-zinc-900 tracking-wide whitespace-pre-line">
          {{ title }}
        </h2>
        
        <!-- The Signature Underline -->
        <div
          v-if="themeBgClass" 
          class="w-16 sm:w-20 h-1 mt-6"
          :class="themeBgClass"
        ></div>
      </div>
    </div>

    <!-- Infinite Scrolling Gallery Track -->
    <div class="w-full relative">
      <div 
        ref="scrollContainer"
        class="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none !scroll-auto gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-6 lg:px-8"
        :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUpOrLeave"
        @mouseleave="onMouseUpOrLeave"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @wheel="onWheel"
        @scroll="onScroll"
      >
        <NuxtImg 
          v-for="(img, index) in displayImages" 
          :key="index"
          :src="img.src" 
          :alt="img.alt" 
          :width="img.width" 
          :height="img.height"
          format="webp"
          quality="80"
          loading="lazy"
          draggable="false" 
          class="h-[200px] sm:h-[300px] lg:h-[350px] w-auto max-w-none flex-shrink-0 rounded-[1.25rem] sm:rounded-[1.5rem] shadow-md duration-300 hover:brightness-110 hover:ring-2 hover:ring-[#1c1c1c]/30"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  eyebrow: {
    type: String,
  },
  homeEyebrow: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  themeTextClass: {
    type: String,
    default: 'text-[#b91b1b]'
  },
  themeBgClass: {
    type: String,
  }
});

const scrollContainer = ref(null);
let animationFrameId = null;
let resumeTimeout = null;

// Interaction & State Flags
const isDragging = ref(false);
let isInteracting = false; 
let startX = 0;
let scrollLeftPos = 0;

// Sub-pixel accumulator to guarantee the slider never gets stuck on DOM rounding
let accum = 0;
const scrollSpeed = 0.8; 

// THE FIX: Use 15 copies to ensure the physical right wall is unreachable even on 5K ultrawide monitors
const displayImages = computed(() => {
  const arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(...props.images);
  }
  return arr;
});

// --- Autoplay Control Logic ---
const pauseAutoplay = () => {
  isInteracting = true;
  if (resumeTimeout) clearTimeout(resumeTimeout);
};

const resumeAutoplay = () => {
  if (resumeTimeout) clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    isInteracting = false;
  }, 100); 
};

// --- Desktop Mouse Drag Logic ---
const onMouseDown = (e) => {
  isDragging.value = true;
  pauseAutoplay();
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeftPos = scrollContainer.value.scrollLeft;
};

const onMouseMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault(); 
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (startX - x) * 1.5; 
  scrollContainer.value.scrollLeft = scrollLeftPos + walk;
};

const onMouseUpOrLeave = () => {
  if (isDragging.value) {
    isDragging.value = false;
    resumeAutoplay();
  }
};

const onTouchStart = () => pauseAutoplay();
const onTouchEnd = () => resumeAutoplay();

const onWheel = () => {
  pauseAutoplay();
  resumeAutoplay(); 
};

// --- Seamless Infinite Loop Boundary ---
const onScroll = () => {
  if (!scrollContainer.value) return;
  
  // Total width of one original set of images
  const setWidth = scrollContainer.value.scrollWidth / 15;
  const currentScroll = scrollContainer.value.scrollLeft;

  // Move Right: When we reach the start of set 9 (index 8), teleport back to set 8
  if (currentScroll >= setWidth * 8) {
    scrollContainer.value.scrollLeft = currentScroll - setWidth;
  } 
  // Move Left: When we fall backward into set 7 (index 6), teleport forward to set 8
  else if (currentScroll <= setWidth * 6) {
    scrollContainer.value.scrollLeft = currentScroll + setWidth;
  }
};

// --- The Hardware-Agnostic Animation Loop ---
const scrollLoop = () => {
  if (!isInteracting && scrollContainer.value) {
    accum += scrollSpeed;
    
    if (accum >= 1) {
      const step = Math.floor(accum);
      scrollContainer.value.scrollLeft += step;
      accum -= step;
    }
  }
  
  animationFrameId = requestAnimationFrame(scrollLoop);
};

onMounted(() => {
  setTimeout(() => {
    if(scrollContainer.value) {
      // THE FIX: Jump exactly to the center (Set 8) on load.
      // This gives us 7 sets of invisible padding on the left, and 7 on the right.
      scrollContainer.value.scrollLeft = (scrollContainer.value.scrollWidth / 15) * 7;
      animationFrameId = requestAnimationFrame(scrollLoop);
    }
  }, 300);
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (resumeTimeout) clearTimeout(resumeTimeout);
});
</script>