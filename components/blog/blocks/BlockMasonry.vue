<template>
  <div class="w-full">
    <div v-if="block.images.length === 3" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <img :src="block.images[0]" class="col-span-1 md:col-span-2 w-full aspect-[21/9] object-cover rounded-3xl shadow-xl" />
      <img :src="block.images[1]" class="col-span-1 w-full aspect-[4/3] object-cover rounded-3xl shadow-xl" />
      <img :src="block.images[2]" class="col-span-1 w-full aspect-[4/3] object-cover rounded-3xl shadow-xl" />
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <img v-for="img in block.images" :key="img" :src="img" class="col-span-1 md:col-span-2 w-full aspect-square object-cover rounded-3xl shadow-xl" />
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>