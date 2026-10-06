<template>
  <div v-split-sticky class="flex flex-col xl:flex-row items-start gap-10 lg:gap-14 w-full">
    <!-- Text Column -->
    <div class="split-text flex-1 flex flex-col space-y-6 w-full">
      <div
        v-for="(p, i) in (Array.isArray(block.text) ? block.text : [block.text])"
        :key="i"
        class="text-[1.1rem] md:text-[1.18rem] lg:text-[1.25rem] font-sans text-[#1c1c1c]/90 tracking-wide leading-relaxed whitespace-pre-wrap"
        v-html="p"
      ></div>
    </div>

    <!-- Media Column -->
    <div class="split-media flex-[1.1] relative w-full">
      <div class="split-media-inner w-full">

        <!-- A. QUOTE CARD -->
        <div
          v-if="block.type === 'split-text-quote'"
          class="bg-[#bd5c17]/5 border-l-[4px] border-[#bd5c17] px-8 md:px-14 py-14 rounded-r-3xl relative flex flex-col justify-center"
        >
          <span class="absolute top-2 left-4 text-7xl md:text-9xl font-display opacity-20 text-[#bd5c17] leading-none select-none">“</span>
          <p
            class="relative z-10 text-3xl md:text-4xl leading-tight text-[#bd5c17]"
            :class="block.Julee ? 'font-decorative' : 'font-display italic'"
          >
            {{ block.quote }}
          </p>
        </div>

        <!-- B. SINGLE SPLIT IMAGE (split-text-masonry with 1 image) -->
        <div v-else-if="singleImageLayout" class="w-full">
          <figure class="w-full flex flex-col">
            <NuxtImg
              :src="singleImageLayout.src"
              :alt="singleImageLayout.alt"
              :width="singleImageLayout.renderWidth"
              :height="singleImageLayout.renderHeight"
              :style="{ aspectRatio: `${singleImageLayout.renderWidth} / ${singleImageLayout.renderHeight}` }"
              sizes="380px sm:640px md:450px lg:600px xl:800px"
              format="webp"
              quality="80"
              densities="x1"
              loading="lazy"
              decoding="async"
              class="w-full h-auto object-cover rounded-3xl shadow-xl cursor-zoom-in"
              @click="openSplitLightbox(0)"
            />
            <figcaption
              v-if="singleImageLayout.truncatedCaption && singleImageLayout.captionClass !== 'hidden'"
              :class="[singleImageLayout.captionClass, 'mt-2.5 px-1 text-xs md:text-sm font-sans text-center text-[#1c1c1c]/75 tracking-wide leading-snug']"
            >
              {{ singleImageLayout.truncatedCaption }}
            </figcaption>
          </figure>
        </div>

        <!-- C. 2 IMAGES (Top-Bottom if Avg Ratio >= 4:3, Left-Right if < 4:3) -->
        <div
          v-else-if="pairLayout"
          class="grid gap-3 md:gap-4 w-full"
          :class="pairLayout.isStacked ? 'grid-cols-1' : 'grid-cols-2'"
        >
          <figure
            v-for="(item, idx) in pairLayout.items"
            :key="idx"
            class="w-full flex flex-col"
          >
            <NuxtImg
              :src="item.src"
              :alt="item.alt"
              :width="item.renderWidth"
              :height="item.renderHeight"
              :style="{ aspectRatio: `${item.renderWidth} / ${item.renderHeight}` }"
              :sizes="item.sizes"
              format="webp"
              quality="80"
              densities="x1"
              loading="lazy"
              decoding="async"
              class="w-full h-auto object-cover rounded-2xl shadow-md cursor-zoom-in"
              @click="openSplitLightbox(idx)"
            />
            <figcaption
              v-if="item.truncatedCaption && item.captionClass !== 'hidden'"
              :class="[item.captionClass, 'mt-2 px-1 text-xs font-sans text-center text-[#1c1c1c]/75 tracking-wide leading-snug']"
            >
              {{ item.truncatedCaption }}
            </figcaption>
          </figure>
        </div>

        <!-- D. 3 IMAGES (Strictly 2:1 Top + Two 1:1 Bottom) OR 4 IMAGES (Strictly 2x2 1:1 Grid) -->
        <div
          v-else-if="multiGridLayout.length"
          class="grid grid-cols-2 gap-3 md:gap-4 w-full"
        >
          <figure
            v-for="(item, idx) in multiGridLayout"
            :key="idx"
            class="w-full flex flex-col"
            :class="item.colSpanClass"
          >
            <NuxtImg
              :src="item.src"
              :alt="item.alt"
              :width="item.renderWidth"
              :height="item.renderHeight"
              :sizes="item.sizes"
              format="webp"
              quality="80"
              densities="x1"
              loading="lazy"
              decoding="async"
              :class="[
                item.aspectClass,
                'w-full object-cover rounded-2xl shadow-md cursor-zoom-in'
              ]"
              @click="openSplitLightbox(idx)"
            />
            <figcaption
              v-if="item.truncatedCaption && item.captionClass !== 'hidden'"
              :class="[item.captionClass, 'mt-2 px-1 text-xs font-sans text-center text-[#1c1c1c]/75 tracking-wide leading-snug']"
            >
              {{ item.truncatedCaption }}
            </figcaption>
          </figure>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ block: Object })
const emit = defineEmits(['open-lightbox'])

const SIZES_FULL = '380px sm:640px md:450px lg:600px xl:800px'
const SIZES_HALF = '190px sm:320px md:225px lg:300px xl:400px'

// Cap masonry images strictly at 4
const cappedRawImages = computed(() => {
  return Array.isArray(props.block?.images) ? props.block.images.slice(0, 4) : []
})

const imageCount = computed(() => cappedRawImages.value.length)

// --- CAPTION & ITEM NORMALIZATION ---
const truncateCaption = (text) => {
  if (!text) return ''
  return text.length > 100 ? `${text.slice(0, 100)}...` : text
}

const getCaptionVisibilityClass = (entry) => {
  const rawMob = entry?.captionMob ?? props.block?.captionMob
  const rawPc = entry?.captionPc ?? entry?.captionPC ?? props.block?.captionPc ?? props.block?.captionPC

  const showMob = rawMob !== undefined ? Boolean(rawMob) : false
  const showPc = rawPc !== undefined ? Boolean(rawPc) : false

  if (showMob && showPc) return 'block'
  if (showMob && !showPc) return 'block lg:hidden'
  if (!showMob && showPc) return 'hidden lg:block'
  return 'hidden'
}

const normalizeItem = (entry, idx, total) => {
  const isObj = entry !== null && typeof entry === 'object'
  const src = isObj ? (entry.src || entry.url || entry.image || '') : String(entry || '')
  const w = isObj && Number(entry.width) > 0 ? Number(entry.width) : (total === 1 && Number(props.block?.width) > 0 ? Number(props.block.width) : null)
  const h = isObj && Number(entry.height) > 0 ? Number(entry.height) : (total === 1 && Number(props.block?.height) > 0 ? Number(props.block.height) : null)
  const hasDims = Boolean(w && h)

  const itemCaption = isObj && entry.caption ? String(entry.caption).trim() : ''
  const blockCaption = props.block?.caption ? String(props.block.caption).trim() : ''
  const resolvedCaption = itemCaption || blockCaption

  const alt = resolvedCaption || (isObj && entry.alt ? String(entry.alt).trim() : `Hotel CAPS Story Visual ${idx + 1}`)

  return {
    src,
    width: w,
    height: h,
    hasDims,
    ratio: hasDims ? w / h : null,
    fullCaption: resolvedCaption,
    truncatedCaption: truncateCaption(resolvedCaption),
    captionClass: resolvedCaption ? getCaptionVisibilityClass(isObj ? entry : null) : 'hidden',
    alt
  }
}

// --- CASE 1: SINGLE IMAGE (Clamped between 3:4 [0.75] and 4:3 [1.333], Default 1:1) ---
const singleImageLayout = computed(() => {
  if (props.block?.type !== 'split-text-masonry' || imageCount.value !== 1) return null

  const norm = normalizeItem(cappedRawImages.value[0], 0, 1)
  // Default 1:1 when dimensions are omitted; otherwise clamp between 3:4 (0.75) and 4:3 (1.333)
  const targetRatio = norm.hasDims ? Math.min(4 / 3, Math.max(3 / 4, norm.ratio)) : 1

  const renderWidth = 800
  const renderHeight = Math.round(800 / targetRatio)

  return {
    ...norm,
    renderWidth,
    renderHeight,
    lightboxWidth: norm.hasDims ? norm.width : renderWidth,
    lightboxHeight: norm.hasDims ? norm.height : renderHeight
  }
})

// --- CASE 2: TWO IMAGES (Avg Ratio >= 4:3 -> Top-Bottom, < 4:3 -> Left-Right) ---
const pairLayout = computed(() => {
  if (props.block?.type !== 'split-text-masonry' || imageCount.value !== 2) return null

  const items = cappedRawImages.value.map((entry, idx) => {
    const norm = normalizeItem(entry, idx, 2)
    return {
      ...norm,
      ratio: norm.hasDims ? norm.ratio : 1 // Default 1:1 if omitted
    }
  })

  const avgRatio = (items[0].ratio + items[1].ratio) / 2
  const isStacked = avgRatio >= 4 / 3 - 0.001 // From 4:3 itself and greater -> Top/Bottom
  const renderWidth = Math.round(600 * avgRatio)
  const renderHeight = 600
  const sizes = isStacked ? SIZES_FULL : SIZES_HALF

  return {
    isStacked,
    items: items.map((item) => ({
      ...item,
      renderWidth,
      renderHeight,
      sizes,
      lightboxWidth: item.hasDims ? item.width : renderWidth,
      lightboxHeight: item.hasDims ? item.height : renderHeight
    }))
  }
})

// --- CASE 3 & 4: THREE IMAGES (2:1 + two 1:1) & FOUR IMAGES (Four 1:1) ---
const multiGridLayout = computed(() => {
  if (props.block?.type !== 'split-text-masonry' || imageCount.value < 3) return []

  const total = imageCount.value // 3 or 4
  return cappedRawImages.value.map((entry, idx) => {
    const norm = normalizeItem(entry, idx, total)
    const isTopWide = total === 3 && idx === 0

    const renderWidth = isTopWide ? 1200 : 600
    const renderHeight = 600

    return {
      ...norm,
      renderWidth,
      renderHeight,
      colSpanClass: isTopWide ? 'col-span-2' : 'col-span-1',
      aspectClass: isTopWide ? 'aspect-[2/1]' : 'aspect-square',
      sizes: isTopWide ? SIZES_FULL : SIZES_HALF,
      lightboxWidth: norm.hasDims ? norm.width : renderWidth,
      lightboxHeight: norm.hasDims ? norm.height : renderHeight
    }
  })
})

// --- LIGHTBOX EMITTER (Arrows auto-hide in BlogLightBox when items.length === 1) ---
const openSplitLightbox = (index = 0) => {
  let activeList = []
  if (singleImageLayout.value) {
    activeList = [singleImageLayout.value]
  } else if (pairLayout.value) {
    activeList = pairLayout.value.items
  } else if (multiGridLayout.value.length) {
    activeList = multiGridLayout.value
  }

  if (!activeList.length) return

  emit('open-lightbox', {
    items: activeList.map((item) => ({
      src: item.src,
      width: item.lightboxWidth,
      height: item.lightboxHeight,
      caption: item.fullCaption || '',
      alt: item.alt
    })),
    index
  })
}

// --- STICKY RESIZE OBSERVER DIRECTIVE ---
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

        // 1. Read geometry first (matches xl:flex-row breakpoint at 1280px)
        const isStacked = window.innerWidth < 1280
        const textH = textCol.offsetHeight
        const mediaH = mediaInner.offsetHeight

        // 2. Write styles second
        if (isStacked) {
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
          textCol.style.alignSelf = 'flex-start'
          mediaCol.style.alignSelf = 'flex-start'
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