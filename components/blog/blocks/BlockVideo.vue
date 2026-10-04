<template>
  <div class="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative bg-black group cursor-pointer" @click="isActive = true">
    <template v-if="!isActive">
      <img :src="block.thumbnail" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div class="w-20 h-20 md:w-24 md:h-24 bg-[#bd5c17] rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#C86A22] transition-all duration-300">
           <svg class="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
         </div>
      </div>
      <div v-if="block.caption" class="absolute bottom-6 w-full text-center text-white text-xs md:text-sm font-bold tracking-widest uppercase drop-shadow-md px-6">
        {{ block.caption }}
      </div>
    </template>
    <iframe v-else :src="`https://www.youtube.com/embed/${block.videoId}?autoplay=1`" class="absolute inset-0 w-full h-full border-0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ block: Object })
const isActive = ref(false)
</script>