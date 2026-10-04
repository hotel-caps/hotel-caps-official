<template>
  <div class="relative w-full rounded-3xl overflow-hidden shadow-lg bg-[#f0e8e1] text-[#7A3E12] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#7A3E12]/10 my-6">
    
    <!-- Text Content -->
    <div class="relative z-10 max-w-xl text-center lg:text-left">
      <h3 class="text-3xl md:text-4xl font-display mb-3">{{ block.title }}</h3>
      <p class="text-lg font-sans opacity-80">{{ block.subtitle }}</p>
    </div>

    <!-- Buttons -->
    <div class="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
      <!-- Google Review -->
      <a :href="block.googleLink || '#'" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-3 px-6 py-4 bg-[#7A3E12] text-white rounded-xl shadow-md hover:bg-[#bd5c17] transition-colors">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
        <div class="flex flex-col text-left">
          <span class="font-bold text-sm leading-tight">Share Your Experience</span>
          <span v-if="block.googleSub" class="text-[10px] opacity-80 uppercase tracking-widest leading-none mt-1">{{ block.googleSub }}</span>
        </div>
      </a>
      
      <!-- Instagram Connect -->
      <a :href="block.instaLink || '#'" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-3 px-6 py-4 bg-transparent border-2 border-[#7A3E12] text-[#7A3E12] rounded-xl hover:bg-[#7A3E12]/5 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
        <div class="flex flex-col text-left">
          <span class="font-bold text-sm leading-tight">Connect on Instagram</span>
          <span v-if="block.instaSub" class="text-[10px] opacity-80 uppercase tracking-widest leading-none mt-1">{{ block.instaSub }}</span>
        </div>
      </a>
    </div>

  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>