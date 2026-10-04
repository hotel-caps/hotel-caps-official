<template>
  <div v-if="block.type === 'slider-horizontal'" class="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden py-4">
    <div class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-6 px-6 md:px-[calc(50vw-min(600px,50vw))] pb-6 touch-pan-x">
      <img v-for="(img, i) in block.images" :key="i" :src="img" class="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[4/3] md:aspect-[16/9] object-cover rounded-3xl shadow-xl pointer-events-none" />
    </div>
  </div>
  <div v-else-if="block.type === 'slider-thumbnail'" class="w-full flex flex-col gap-4">
    <div class="w-full aspect-video rounded-3xl overflow-hidden shadow-xl bg-black relative">
      <transition name="fade">
        <img :key="activeIndex" :src="block.images[activeIndex]" class="absolute inset-0 w-full h-full object-cover" />
      </transition>
    </div>
    <div class="flex gap-3 overflow-x-auto snap-x scrollbar-hide pb-2 touch-pan-x">
      <button v-for="(img, i) in block.images" :key="i" @click="activeIndex = i" class="shrink-0 snap-center w-28 md:w-36 aspect-video rounded-xl overflow-hidden border-[3px] transition-all duration-300 focus:outline-none" :class="activeIndex === i ? 'border-[#bd5c17] opacity-100 scale-[1.02] shadow-md' : 'border-transparent opacity-50 hover:opacity-100'">
        <img :src="img" class="w-full h-full object-cover pointer-events-none" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ block: Object })
const activeIndex = ref(0)
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>