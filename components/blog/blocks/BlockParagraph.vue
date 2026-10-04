<template>
  <div>
    <div v-if="block.type === 'editorial-intro'" class="text-[1.2rem] md:text-[1.25rem] lg:text-[1.3rem] font-sans text-[#1c1c1c]/90 tracking-wide leading-[1.75] editorial-intro">
      {{ block.text }}
    </div>

    <div v-else-if="block.type === 'paragraph'" class="text-[1.1rem] md:text-[1.18rem] lg:text-[1.25rem] font-sans text-[#1c1c1c]/90 tracking-wide leading-relaxed" v-html="block.text"></div>

    <ol v-else-if="block.type === 'list-ordered'" class="list-decimal pl-5 text-[1.1rem] md:text-[1.18rem] lg:text-[1.25rem] font-sans text-[#1c1c1c]/90 tracking-wide leading-relaxed space-y-4 marker:text-[#bd5c17] marker:font-bold">
      <li v-for="item in block.items" :key="item" class="pl-3">{{ item }}</li>
    </ol>

    <ul v-else-if="block.type === 'list-unordered'" class="space-y-4">
      <li v-for="item in block.items" :key="item" class="flex items-start gap-4 text-lg md:text-xl text-[#1c1c1c]/80 leading-relaxed font-sans">
        <SvgBlogBullet class="w-5 mt-2" />
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ block: Object })
</script>

<style scoped>
.editorial-intro::first-letter {
  font-family: 'Faculty Glyphic', sans-serif;
  font-size: 4.6rem;
  font-weight: 700;
  color: #bd5c17;
  float: left;
  line-height: 0.64;
  margin-right: 0.4rem;
  margin-top: 1rem;
}
</style>