<script setup>
import { ref } from 'vue';

const props = defineProps({
  galleryImages: {
    type: Array,
    required: true,
    default: () => []
  }
});

const activeIndex = ref(0);
const thumbScrollContainer = ref(null);

const setActive = (index) => {
  activeIndex.value = index;
};

// Smooth native scrolling for the thumbnail track
const scrollThumbs = (direction) => {
  if (!thumbScrollContainer.value) return;
  const scrollAmount = thumbScrollContainer.value.clientWidth * 0.75; // Scroll 75% of the view width
  
  thumbScrollContainer.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
};
</script>

<template>
  <div class="room-gallery-container w-full flex flex-col gap-4">
    
    <!-- Main Preview Image Slider (With Cinematic Crossfade) -->
    <div class="relative w-full aspect-[3/2] overflow-hidden rounded-2xl bg-zinc-900">
      <TransitionGroup name="fade">
        <NuxtImg
          v-for="(image, index) in galleryImages"
          v-show="activeIndex === index"
          :key="image"
          :src="image"
          :alt="`Room image ${index + 1}`"
          width="1200"
          height="800"
          format="webp"
          quality="80"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
        />
      </TransitionGroup>
    </div>

    <!-- Thumbnail Slider -->
    <div class="relative w-full group">
      
      <!-- Prev Button -->
      <button 
        v-if="galleryImages.length > 4" 
        @click="scrollThumbs('left')"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 flex items-center justify-center bg-amber-500/90 text-stone-900 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-400"
        aria-label="Previous images"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <!-- Scrollable Track -->
      <div 
        ref="thumbScrollContainer" 
        class="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        <button
          v-for="(image, index) in galleryImages"
          :key="'thumb-' + index"
          @click="setActive(index)"
          class="relative shrink-0 w-[calc(25%-0.375rem)] aspect-[3/2] snap-start rounded-lg overflow-hidden border-2 transition-all duration-300"
          :class="activeIndex === index ? 'border-amber-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'"
        >
          <!-- Optimized tiny thumbnail cuts from Vercel -->
          <NuxtImg
            :src="image"
            :alt="`Thumbnail ${index + 1}`"
            width="300"
            height="200"
            format="webp"
            quality="80"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </button>
      </div>

      <!-- Next Button -->
      <button 
        v-if="galleryImages.length > 4" 
        @click="scrollThumbs('right')"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 flex items-center justify-center bg-amber-500/90 text-stone-900 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-400"
        aria-label="Next images"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

    </div>
  </div>
</template>

<style scoped>
/* Cinematic Crossfade Engine */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Hide scrollbar natively across browsers while keeping functionality */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>