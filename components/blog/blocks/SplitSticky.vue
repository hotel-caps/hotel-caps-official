<template>
  <div v-split-sticky class="flex flex-col md:flex-row items-start gap-10 lg:gap-14 w-full">
    <!-- Text Column -->
    <div class="split-text flex-1 flex flex-col space-y-6 w-full">
      <template v-if="block.type === 'split-quote-image'">
        <p class="text-3xl md:text-4xl font-display text-[#bd5c17] leading-tight italic">“{{ block.quote }}”</p>
      </template>
      <template v-else>
        <div
          v-for="(p, i) in (Array.isArray(block.text) ? block.text : [block.text])"
          :key="i"
          class="text-[1.1rem] md:text-[1.18rem] lg:text-[1.25rem] font-sans text-[#1c1c1c]/90 tracking-wide leading-relaxed whitespace-pre-wrap"
          v-html="p"
        ></div>
      </template>
    </div>
    
    <!-- Media Column -->
    <div class="split-media flex-[1.1] relative w-full">
      <div class="split-media-inner w-full">
        <!-- 1. 800x600 Single Split Image -->
        <NuxtImg
          v-if="block.type === 'split-text-image' || block.type === 'split-quote-image'"
          :src="block.image"
          :alt="block.caption || 'Hotel CAPS Story Visual'"
          width="800"
          height="600"
          sizes="380px sm:640px md:450px lg:600px xl:800px"
          format="webp"
          quality="80"
          densities="x1"
          loading="lazy"
          decoding="async"
          class="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
          :class="block.aspect === '1:1' ? 'md:aspect-square' : 'md:aspect-[4/3]'"
        />
        
        <!-- Quote Card -->
        <div
          v-else-if="block.type === 'split-text-quote'"
          class="bg-[#bd5c17]/5 border-l-[4px] border-[#bd5c17] p-8 md:p-12 rounded-r-3xl relative flex flex-col justify-center min-h-[300px]"
        >
          <span class="absolute top-2 left-4 text-8xl md:text-9xl font-display opacity-20 text-[#bd5c17] leading-none select-none">“</span>
          <p
            class="relative z-10 text-3xl md:text-4xl leading-tight text-[#bd5c17]"
            :class="block.Julee ? 'font-decorative' : 'font-display italic'"
          >
            {{ block.quote }}
          </p>
        </div>

        <!-- 2. 1200x600 & 600x600 Split Masonry -->
        <div v-else-if="block.type === 'split-text-masonry'" class="grid grid-cols-2 gap-3 md:gap-4">
          <NuxtImg
            v-for="(img, i) in block.images"
            :key="i"
            :src="img"
            :alt="block.caption ? `${block.caption} - ${i + 1}` : `Hotel CAPS Story Gallery ${i + 1}`"
            :width="block.images.length === 3 && i === 0 ? 1200 : 600"
            height="600"
            :sizes="block.images.length === 3 && i === 0 ? '380px sm:640px md:450px lg:600px xl:800px' : '190px sm:320px md:225px lg:300px xl:400px'"
            format="webp"
            quality="80"
            densities="x1"
            loading="lazy"
            decoding="async"
            :class="[
              block.images.length === 3 && i === 0 ? 'col-span-2 aspect-[2/1]' : 'col-span-1 aspect-square',
              'w-full object-cover rounded-2xl shadow-md'
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object })

const vSplitSticky = {
  mounted(el) {
    let rafId = null

    const checkHeights = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const textCol = el.querySelector('.split-text')
        const mediaCol = el.querySelector('.split-media')
        const mediaInner = el.querySelector('.split-media-inner')

        if (!textCol || !mediaCol || !mediaInner) return

        // 1. Read geometry first (prevents synchronous Forced Reflow)
        const isMobile = window.innerWidth < 768
        const textH = textCol.offsetHeight
        const mediaH = mediaInner.offsetHeight

        // 2. Write styles second
        if (isMobile) {
          textCol.style.alignSelf = 'stretch'
          mediaCol.style.alignSelf = 'stretch'
          mediaCol.style.position = 'static'
          mediaCol.style.top = 'auto'
          return
        }

        if (textH > mediaH) {
          textCol.style.alignSelf = 'flex-start'
          mediaCol.style.alignSelf = 'flex-start'
          mediaCol.style.position = 'sticky'
          mediaCol.style.top = '100px'
        } else {
          textCol.style.alignSelf = 'start'
          mediaCol.style.alignSelf = 'start'
          mediaCol.style.position = 'static'
          mediaCol.style.top = 'auto'
        }
      })
    }

    el.__ro = new ResizeObserver(checkHeights)
    el.__ro.observe(el)

    const textCol = el.querySelector('.split-text')
    const mediaInner = el.querySelector('.split-media-inner')
    if (textCol) el.__ro.observe(textCol)
    if (mediaInner) el.__ro.observe(mediaInner)

    el.__cleanupRaf = () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  },
  unmounted(el) {
    if (el.__ro) el.__ro.disconnect()
    if (el.__cleanupRaf) el.__cleanupRaf()
  }
}
</script>