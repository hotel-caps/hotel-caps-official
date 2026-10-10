<template>
  <section class="bg-white py-16 lg:py-20 overflow-hidden">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <!-- Section Header -->
      <div class="w-full flex flex-col items-center text-center mb-10 sm:mb-16">
        <span 
          v-if="eyebrow" 
          class="block font-['Julee'] text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wide"
          :class="themeTextClass"
        >
          {{ eyebrow }}
        </span>

        <p 
          v-if="homeEyebrow" 
          class="font-sans text-sm font-bold uppercase tracking-widest mb-2"
          :class="themeTextClass"
        >
          {{ homeEyebrow }}
        </p>
        
        <h2 class="font-display font-bold text-3xl lg:text-4xl text-zinc-900 tracking-wide whitespace-pre-line">
          {{ title }}
        </h2>
        
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
          :alt="index >= images.length ? '' : img.alt" 
          :aria-hidden="index >= images.length ? 'true' : undefined"
          :width="img.width" 
          :height="img.height"
          sizes="300px sm:450px lg:525px"
          :style="{ aspectRatio: `${img.width} / ${img.height}` }"
          format="webp"
          quality="80"
          densities="x1"
          loading="lazy"
          decoding="async"
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
  eyebrow: { type: String },
  homeEyebrow: { type: String },
  title: { type: String, required: true },
  images: { type: Array, required: true, default: () => [] },
  themeTextClass: { type: String, default: 'text-[#b91b1b]' },
  themeBgClass: { type: String }
});

const scrollContainer = ref(null);
let animationFrameId = null;
let resumeTimeout = null;

const isDragging = ref(false);
let isInteracting = false; 
let startX = 0;
let scrollLeftPos = 0;
let accum = 0;
const scrollSpeed = 0.8; 

const displayImages = computed(() => {
  const arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(...props.images);
  }
  return arr;
});

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

const onScroll = () => {
  if (!scrollContainer.value) return;
  const setWidth = scrollContainer.value.scrollWidth / 15;
  const currentScroll = scrollContainer.value.scrollLeft;

  if (currentScroll >= setWidth * 8) {
    scrollContainer.value.scrollLeft = currentScroll - setWidth;
  } else if (currentScroll <= setWidth * 6) {
    scrollContainer.value.scrollLeft = currentScroll + setWidth;
  }
};

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