<template>
  <div class="pt-8">
    <h4 class="text-xs font-bold tracking-widest uppercase text-[#bd5c17] mb-8 text-center md:text-left">Read Next</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink v-for="rel in block.articles" :key="rel.title" :to="rel.link" class="group flex flex-col gap-4">
        <div class="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-md">
          <NuxtImg 
            :src="rel.thumbnail" 
            :alt="rel.title"
            format="webp" 
            width="1200"
            height="800"
            sizes="300px lg:400px"
            quality="80"
            densities="x1"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        </div>
        <div>
          <div class="text-xs font-bold text-[#bd5c17] uppercase tracking-widest mb-2">{{ rel.date }}</div>
          <h4 class="font-display font-bold text-2xl text-[#7A3E12] group-hover:text-[#C86A22] transition-colors mb-2 leading-tight">{{ rel.title }}</h4>
          <p class="font-sans text-[#7A3E12]/80 line-clamp-2 text-sm leading-relaxed">{{ rel.intro }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>