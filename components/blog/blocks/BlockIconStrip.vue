<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-8 border-y border-[#7A3E12]/10 my-4">
    <div v-for="item in block.items" :key="item.title" class="flex flex-col items-center text-center">
      <div class="w-15 h-15 rounded-full bg-white shadow-sm border border-[#7A3E12]/5 text-[#bd5c17] flex items-center justify-center mb-5 hover:-translate-y-1 transition-transform" v-html="getIcon(item.icon)"></div>
      <h4 class="font-display font-semibold text-xl text-[#7A3E12] mb-2">{{ item.title }}</h4>
      <p class="text-sm font-sans text-[#7A3E12]/70 leading-relaxed">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object })
const getIcon = (name) => {
  const icons = {
    couch: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m3 0h1.5m-1.5 6h-3m-2.25 6h10.5" />`,
    people: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />`,
    music: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19.5V3.75l10.5-2.25v15.75m-10.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm10.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />`
  }
  return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-8 h-8">${icons[name] || icons.couch}</svg>`
}
</script>