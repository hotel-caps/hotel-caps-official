<template>
  <div class="w-full">
    <div v-if="block.images.length === 3" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NuxtImg
        :src="block.images[0]"
        :alt="block.caption || 'Hotel CAPS Story Feature'"
        width="1200"
        height="600"
        sizes="380px sm:640px md:768px lg:1024px xl:1200px"
        format="webp"
        quality="80"
        densities="x1"
        loading="lazy"
        decoding="async"
        class="col-span-1 md:col-span-2 w-full aspect-[21/9] object-cover rounded-3xl shadow-xl"
      />
      <NuxtImg
        :src="block.images[1]"
        :alt="block.caption ? `${block.caption} - 2` : 'Hotel CAPS Story Image 2'"
        width="600"
        height="600"
        sizes="380px sm:600px md:380px lg:500px xl:600px"
        format="webp"
        quality="80"
        densities="x1"
        loading="lazy"
        decoding="async"
        class="col-span-1 w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
      />
      <NuxtImg
        :src="block.images[2]"
        :alt="block.caption ? `${block.caption} - 3` : 'Hotel CAPS Story Image 3'"
        width="600"
        height="600"
        sizes="380px sm:600px md:380px lg:500px xl:600px"
        format="webp"
        quality="80"
        densities="x1"
        loading="lazy"
        decoding="async"
        class="col-span-1 w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
      />
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <NuxtImg
        v-for="(img, idx) in block.images"
        :key="img"
        :src="img"
        :alt="block.caption ? `${block.caption} - ${idx + 1}` : `Hotel CAPS Story Gallery ${idx + 1}`"
        width="600"
        height="600"
        sizes="190px sm:300px md:380px lg:500px xl:600px"
        format="webp"
        quality="80"
        densities="x1"
        loading="lazy"
        decoding="async"
        class="col-span-1 md:col-span-2 w-full aspect-square object-cover rounded-3xl shadow-xl"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>