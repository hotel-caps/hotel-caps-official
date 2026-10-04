<template>
  <div class="w-full relative px-8 md:px-14 py-10 bg-[#bd5c17]/5 border-l-[4px] border-[#bd5c17] rounded-r-3xl my-6">
    <span class="absolute top-2 left-4 text-4xl md:text-9xl font-display opacity-10 leading-none select-none" :style="{ color: block.color || '#bd5c17' }">“</span>
    <p class="relative z-10 text-3xl md:text-4xl leading-tight" :class="block.Julee ? 'font-decorative text-[#bd5c17]' : 'font-sans italic text-[#7A3E12]'">
      {{ block.quote }}
    </p>
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>