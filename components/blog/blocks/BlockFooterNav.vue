<template>
  <div class="flex flex-col md:flex-row justify-between items-center gap-8 py-12 mt-12 border-t border-[#7A3E12]/20">
     <NuxtLink to="/blog" class="font-display font-bold text-[#7A3E12] hover:text-[#C86A22] transition-colors flex items-center gap-3 text-lg">
       <span class="text-2xl mb-1">&larr;</span> Back to CAPS Stories
     </NuxtLink>
     <NuxtLink to="/" class="flex items-center gap-5 bg-white p-2 pl-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group border border-[#7A3E12]/5">
       <div class="text-right">
         <div class="text-[10px] uppercase tracking-widest text-[#bd5c17] font-bold mb-0.5">Explore CAPS</div>
         <div class="font-display font-bold text-[#7A3E12] group-hover:text-[#bd5c17] transition-colors">Discover More</div>
       </div>
       <img src="/images/blog/hero/blog-cover.jpg" class="w-24 h-16 object-cover rounded-xl shadow-inner group-hover:scale-105 transition-transform" />
     </NuxtLink>
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>