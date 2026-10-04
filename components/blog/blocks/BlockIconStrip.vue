<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-8 border-y border-[#7A3E12]/10 my-4">
    <div v-for="item in block.items" :key="item.title" class="flex flex-col items-center text-center">
      <div class="w-16 h-16 rounded-full bg-white shadow-sm border border-[#7A3E12]/20 text-[#bd5c17] flex items-center justify-center mb-5 hover:-translate-y-1 transition-transform" v-html="getIcon(item.icon)"></div>
      <h4 class="font-display font-semibold text-xl text-[#7A3E12] mb-2">{{ item.title }}</h4>
      <p class="text-sm font-sans text-[#7A3E12]/70 leading-relaxed">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object })

const getIcon = (name) => {
  const icons = {
    couch: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 10.5V6.75A.75.75 0 013 6h18a.75.75 0 01.75.75v3.75M20.25 16.5v2.25M3.75 16.5v2.25M19.5 13.5v-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.25h15zM12 6v7.5" />`,
    people: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />`,
    music: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 19.5V3.75l10.5-2.25v15.75m-10.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm10.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />`,
    celebration: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />`
  }
  return `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="w-12 h-12">${icons[name] || icons.couch}</svg>`
}
</script>