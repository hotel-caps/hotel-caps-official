<template>
  <component 
    :is="block.level" 
    :id="block.level === 'h2' ? generateId(block.text) : undefined" 
    class="font-display text-[#7A3E12] leading-tight" 
    :class="{
      'text-3xl md:text-4xl mt-4 font-semibold': block.level === 'h2', 
      'text-2xl md:text-3xl font-medium': block.level === 'h3', 
      'text-xl md:text-2xl font-medium': block.level === 'h4'
    }"
  >
    {{ block.text }}
  </component>
</template>

<script setup>
defineProps({ block: Object })
const generateId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
</script>