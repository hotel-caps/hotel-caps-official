<template>
  <div class="relative w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#bd5c17] to-[#7A3E12] text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 my-6">
    <!-- Faint diagonal overlay decoration -->
    <svg class="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,100 L100,0 L100,100 Z" fill="currentColor"/></svg>
    
    <div class="relative z-10 max-w-xl text-center md:text-left">
      <h3 class="text-3xl md:text-5xl font-display mb-3">{{ block.title }}</h3>
      <p class="text-lg font-sans text-white/90">{{ block.subtitle }}</p>
    </div>
    
    <!-- Link button, pulls from the JSON if provided, otherwise defaults to /menu -->
    <NuxtLink :to="block.link || '/menu'" class="relative z-10 px-8 py-4 bg-[#fafaf9] text-[#7A3E12] font-bold uppercase tracking-widest text-sm rounded-full hover:shadow-lg hover:scale-105 transition-all shrink-0">
      {{ block.buttonText || 'View Menu' }}
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>