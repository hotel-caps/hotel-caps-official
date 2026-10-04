<template>
  <div v-split-sticky class="flex flex-col md:flex-row gap-10 lg:gap-14 w-full">
    <!-- Text Column -->
    <div class="split-text flex-1 flex flex-col justify-center space-y-6">
      <template v-if="block.type === 'split-quote-image'">
        <p class="text-3xl md:text-4xl font-display text-[#bd5c17] leading-tight italic">“{{ block.quote }}”</p>
      </template>
      <template v-else>
        <div v-for="(p, i) in (Array.isArray(block.text) ? block.text : [block.text])" :key="i" class="text-lg md:text-xl text-[#7A3E12]/80 leading-relaxed whitespace-pre-wrap font-sans" v-html="p"></div>
      </template>
    </div>
    
    <!-- Media Column -->
    <div class="split-media flex-[1.1] relative w-full">
      <div class="split-media-inner w-full">
        <img v-if="block.type === 'split-text-image' || block.type === 'split-quote-image'" :src="block.image" class="w-full aspect-[4/3] md:aspect-square object-cover rounded-3xl shadow-xl" :class="block.aspect === '1:1' ? 'md:aspect-square' : 'md:aspect-[4/3]'" />
        
        <div v-else-if="block.type === 'split-text-quote'" class="bg-[#bd5c17]/5 border-l-[4px] border-[#bd5c17] p-8 md:p-12 rounded-r-3xl relative flex flex-col justify-center min-h-[300px]">
          <span class="absolute top-2 left-4 text-8xl md:text-9xl font-display text-[#bd5c17]/20 leading-none select-none">“</span>
          <p class="relative z-10 text-3xl md:text-4xl leading-tight text-[#bd5c17]" :class="block.Julee ? 'font-decorative' : 'font-display italic'">{{ block.quote }}</p>
        </div>

        <div v-else-if="block.type === 'split-text-masonry'" class="grid grid-cols-2 gap-3 md:gap-4">
          <img v-for="(img, i) in block.images" :key="i" :src="img" :class="[block.images.length === 3 && i === 0 ? 'col-span-2 aspect-[2/1]' : 'col-span-1 aspect-square', 'w-full object-cover rounded-2xl shadow-md']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object })

const vSplitSticky = {
  mounted(el) {
    const checkHeights = () => {
      const textCol = el.querySelector('.split-text')
      const mediaCol = el.querySelector('.split-media')
      const mediaInner = el.querySelector('.split-media-inner')
      if (textCol && mediaInner && mediaCol) {
        const textH = textCol.offsetHeight
        const mediaH = mediaInner.offsetHeight
        if (textH > mediaH) {
          textCol.style.alignSelf = 'start'
          mediaCol.style.alignSelf = 'start'
          mediaCol.style.position = 'sticky'
          mediaCol.style.top = '100px'
        } else {
          textCol.style.alignSelf = 'center'
          mediaCol.style.alignSelf = 'center'
          mediaCol.style.position = 'static'
          mediaCol.style.top = 'auto'
        }
      }
    }
    el.__ro = new ResizeObserver(checkHeights)
    el.__ro.observe(el)
    setTimeout(checkHeights, 50)
  },
  unmounted(el) {
    if (el.__ro) el.__ro.disconnect()
  }
}
</script>