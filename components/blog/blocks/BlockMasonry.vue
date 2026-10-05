<template>
  <div class="w-full">
    <!-- CASE 1: Single Full-Width Image -->
    <div v-if="rawCount === 1 && singleLayout" class="w-full">
      <figure class="w-full flex flex-col max-w-5xl mx-auto">
        <NuxtImg
          :src="singleLayout.src"
          :alt="singleLayout.alt"
          :width="singleLayout.renderWidth"
          :height="singleLayout.renderHeight"
          :style="{ aspectRatio: `${singleLayout.renderWidth} / ${singleLayout.renderHeight}` }"
          :sizes="singleLayout.sizes"
          format="webp"
          quality="80"
          densities="x1"
          loading="lazy"
          decoding="async"
          class="w-full h-auto object-cover rounded-3xl shadow-xl cursor-zoom-in"
          @click="openMasonryLightbox(0)"
        />
        <figcaption
          v-if="singleLayout.truncatedCaption && singleLayout.captionClass !== 'hidden'"
          :class="[singleLayout.captionClass, 'mt-2.5 px-1 text-xs md:text-sm font-sans text-[#1c1c1c]/80 tracking-wide leading-snug text-center']"
        >
          {{ singleLayout.truncatedCaption }}
        </figcaption>
      </figure>
    </div>

    <!-- CASE 2: Two Images (Averaged Aspect Ratio + Smart Breakpoint Stacking) -->
    <div
      v-else-if="rawCount === 2 && pairLayout"
      class="grid gap-4"
      :class="pairLayout.gridClass"
    >
      <figure
        v-for="(item, idx) in pairLayout.items"
        :key="idx"
        class="w-full flex flex-col max-w-6xl mx-auto"
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
          class="w-full h-auto object-cover rounded-3xl shadow-xl cursor-zoom-in"
          @click="openMasonryLightbox(idx)"
        />
        <figcaption
          v-if="item.truncatedCaption && item.captionClass !== 'hidden'"
          :class="[item.captionClass, 'mt-2.5 px-1 text-xs md:text-sm font-sans text-[#1c1c1c]/80 tracking-wide leading-snug text-center']"
        >
          {{ item.truncatedCaption }}
        </figcaption>
      </figure>
    </div>

    <!-- CASE 3: Three Images (Highest Ratio Top + Averaged Bottom Pair) -->
    <div v-else-if="rawCount === 3 && trioLayout" class="flex flex-col gap-4 w-full">
      <!-- Top Image (Highest Aspect Ratio) -->
      <figure class="w-full flex flex-col">
        <NuxtImg
          :src="trioLayout.top.src"
          :alt="trioLayout.top.alt"
          :width="trioLayout.top.renderWidth"
          :height="trioLayout.top.renderHeight"
          :style="{ aspectRatio: `${trioLayout.top.renderWidth} / ${trioLayout.top.renderHeight}` }"
          :sizes="trioLayout.top.sizes"
          format="webp"
          quality="80"
          densities="x1"
          loading="lazy"
          decoding="async"
          class="w-full h-auto object-cover rounded-3xl shadow-xl cursor-zoom-in"
          @click="openMasonryLightbox(0)"
        />
        <figcaption
          v-if="trioLayout.top.truncatedCaption && trioLayout.top.captionClass !== 'hidden'"
          :class="[trioLayout.top.captionClass, 'mt-2.5 px-1 text-xs md:text-sm font-sans text-[#1c1c1c]/80 tracking-wide leading-snug text-center']"
        >
          {{ trioLayout.top.truncatedCaption }}
        </figcaption>
      </figure>

      <!-- Bottom 2 Images (Averaged Ratio + Smart Breakpoint Stacking) -->
      <div class="grid gap-4" :class="trioLayout.bottomGridClass">
        <figure
          v-for="(item, idx) in trioLayout.bottom"
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
            class="w-full h-auto object-cover rounded-3xl shadow-xl cursor-zoom-in"
            @click="openMasonryLightbox(idx + 1)"
          />
          <figcaption
            v-if="item.truncatedCaption && item.captionClass !== 'hidden'"
            :class="[item.captionClass, 'mt-2.5 px-1 text-xs md:text-sm font-sans text-center text-[#1c1c1c]/80 tracking-wide leading-snug']"
          >
            {{ item.truncatedCaption }}
          </figcaption>
        </figure>
      </div>
    </div>

    <!-- CASE 4: 4+ Images (2-Col Flex Pinterest Masonry / 2xl: 4-Col) -->
    <div v-else-if="rawCount >= 4" class="flex flex-row items-start gap-4 w-full">
      <div
        v-for="(col, colIdx) in masonryColumns"
        :key="colIdx"
        class="flex-1 flex flex-col gap-4 min-w-0"
      >
        <figure
          v-for="(item, itemIdx) in col"
          :key="itemIdx"
          class="w-full flex flex-col items-center"
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
            class="w-full h-auto object-cover rounded-3xl shadow-xl cursor-zoom-in"
            @click="openMasonryLightbox(item.index)"
          />
          <figcaption
            v-if="item.truncatedCaption && item.captionClass !== 'hidden'"
            :class="[item.captionClass, 'mt-2.5 px-1 text-xs md:text-sm font-sans text-[#1c1c1c]/80 tracking-wide leading-snug text-center']"
          >
            {{ item.truncatedCaption }}
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-lightbox'])

// Standard sizes presets strictly matching registered nuxt.config.ts baseImageWidths
const SIZES_FULL = '380px sm:640px md:768px lg:1024px xl:1200px'
const SIZES_PAIR_STACK_LG = '380px sm:640px md:768px lg:500px xl:600px'
const SIZES_PAIR_STACK_MD = '380px sm:600px md:380px lg:500px xl:600px'
const SIZES_HALF = '190px sm:300px md:380px lg:500px xl:600px'

const rawImages = computed(() => Array.isArray(props.block?.images) ? props.block.images : [])
const rawCount = computed(() => rawImages.value.length)

// Responsive column count for 4+ Pinterest Masonry (SSR-safe default 2 -> updates on 2xl 1536px+)
const masonryColCount = ref(2)
let mql = null

const updateColCount = (e) => {
  masonryColCount.value = e.matches ? 4 : 2
}

onMounted(() => {
  mql = window.matchMedia('(min-width: 1536px)')
  masonryColCount.value = mql.matches ? 4 : 2
  mql.addEventListener('change', updateColCount)
})

onUnmounted(() => {
  if (mql) mql.removeEventListener('change', updateColCount)
})

// --- HELPERS ---
const truncateCaption = (text) => {
  if (!text) return ''
  return text.length > 100 ? `${text.slice(0, 100)} ..` : text
}

const getCaptionVisibilityClass = (item) => {
  const rawMob = item?.captionMob ?? props.block?.captionMob
  const rawPc = item?.captionPc ?? item?.captionPC ?? props.block?.captionPc ?? props.block?.captionPC

  // Default to true if not explicitly set to false in JSON
  const showMob = rawMob !== undefined ? Boolean(rawMob) : true
  const showPc = rawPc !== undefined ? Boolean(rawPc) : true

  if (showMob && showPc) return 'block'
  if (showMob && !showPc) return 'block lg:hidden'
  if (!showMob && showPc) return 'hidden lg:block'
  return 'hidden'
}

const normalizeRawItem = (entry, idx, total) => {
  const isObj = entry !== null && typeof entry === 'object'
  const src = isObj ? (entry.src || entry.url || entry.image || '') : String(entry || '')
  const w = isObj ? Number(entry.width) : 0
  const h = isObj ? Number(entry.height) : 0
  const hasDims = w > 0 && h > 0

  const itemCaption = isObj && entry.caption ? String(entry.caption).trim() : ''
  const arrayCaption = Array.isArray(props.block?.captions) && props.block.captions[idx]
    ? String(props.block.captions[idx]).trim()
    : ''
  const blockCaption = props.block?.caption ? String(props.block.caption).trim() : ''

  // Full untruncated caption for alt attribute (with default fallback)
  const resolvedCaption = itemCaption || arrayCaption || blockCaption
  const alt = resolvedCaption || `Hotel CAPS Story Visual ${idx + 1}`

  return {
    index: idx, 
    src,
    width: hasDims ? w : null,
    height: hasDims ? h : null,
    hasDims,
    ratio: hasDims ? w / h : null,
    alt,
    fullCaption: resolvedCaption, // (untruncated for Lightbox)
    truncatedCaption: truncateCaption(resolvedCaption),
    captionClass: getCaptionVisibilityClass(isObj ? entry : null)
  }
}

const getPairGridAndSizes = (avgRatio) => {
  if (avgRatio > 1.9) {
    return {
      gridClass: 'grid-cols-1 lg:grid-cols-2',
      sizes: SIZES_PAIR_STACK_LG
    }
  }
  if (avgRatio > 1.5) {
    return {
      gridClass: 'grid-cols-1 md:grid-cols-2',
      sizes: SIZES_PAIR_STACK_MD
    }
  }
  return {
    gridClass: 'grid-cols-2',
    sizes: SIZES_HALF
  }
}

// --- CASE 1: 1 IMAGE ---
const singleLayout = computed(() => {
  if (rawCount.value !== 1) return null
  const item = normalizeRawItem(rawImages.value[0], 0, 1)
  const renderWidth = item.hasDims ? item.width : 1200
  const renderHeight = item.hasDims ? item.height : 600

  return {
    ...item,
    renderWidth,
    renderHeight,
    sizes: SIZES_FULL
  }
})

// --- CASE 2: 2 IMAGES ---
const pairLayout = computed(() => {
  if (rawCount.value !== 2) return null
  const items = rawImages.value.map((entry, i) => {
    const norm = normalizeRawItem(entry, i, 2)
    const ratio = norm.hasDims ? norm.ratio : 1 // Default 1:1 if omitted
    return { ...norm, ratio }
  })

  const avgRatio = (items[0].ratio + items[1].ratio) / 2
  const { gridClass, sizes } = getPairGridAndSizes(avgRatio)
  const renderWidth = Math.round(600 * avgRatio)
  const renderHeight = 600

  return {
    gridClass,
    items: items.map((item) => ({
      ...item,
      renderWidth,
      renderHeight,
      sizes
    }))
  }
})

// --- CASE 3: 3 IMAGES ---
const trioLayout = computed(() => {
  if (rawCount.value !== 3) return null
  const normalized = rawImages.value.map((entry, i) => normalizeRawItem(entry, i, 3))

  // Check if any provided dimension already has an aspect ratio > 1:1
  const hasProvidedGreaterThanOne = normalized.some((item) => item.hasDims && item.ratio > 1)
  let assignedTwoToOne = false

  const resolved = normalized.map((item) => {
    if (item.hasDims) {
      return {
        ...item,
        renderWidth: item.width,
        renderHeight: item.height,
        ratio: item.ratio
      }
    }
    // If no provided ratio is > 1:1, the first unprovided image becomes 2:1 (1200x600)
    if (!hasProvidedGreaterThanOne && !assignedTwoToOne) {
      assignedTwoToOne = true
      return {
        ...item,
        renderWidth: 1200,
        renderHeight: 600,
        ratio: 2
      }
    }
    // Otherwise unprovided images become 1:1 (600x600)
    return {
      ...item,
      renderWidth: 600,
      renderHeight: 600,
      ratio: 1
    }
  })

  // Top image is the one with the highest aspect ratio
  let topIndex = 0
  for (let i = 1; i < resolved.length; i++) {
    if (resolved[i].ratio > resolved[topIndex].ratio) {
      topIndex = i
    }
  }

  const topItem = {
    ...resolved[topIndex],
    sizes: SIZES_FULL
  }

  const bottomItems = resolved.filter((_, idx) => idx !== topIndex)
  const bottomAvgRatio = (bottomItems[0].ratio + bottomItems[1].ratio) / 2
  const { gridClass: bottomGridClass, sizes: bottomSizes } = getPairGridAndSizes(bottomAvgRatio)
  const bottomRenderWidth = Math.round(600 * bottomAvgRatio)
  const bottomRenderHeight = 600

  return {
    top: topItem,
    bottomGridClass,
    bottom: bottomItems.map((item) => ({
      ...item,
      renderWidth: bottomRenderWidth,
      renderHeight: bottomRenderHeight,
      sizes: bottomSizes
    }))
  }
})

// --- CASE 4: 4+ IMAGES (PINTEREST FLEX MASONRY) ---
const masonryColumns = computed(() => {
  if (rawCount.value < 4) return []
  const count = masonryColCount.value
  const cols = Array.from({ length: count }, () => ({ items: [], height: 0 }))

  rawImages.value.forEach((entry, idx) => {
    const norm = normalizeRawItem(entry, idx, rawCount.value)
    const renderWidth = norm.hasDims ? norm.width : 600
    const renderHeight = norm.hasDims ? norm.height : 600
    const ratio = renderWidth / renderHeight

    // Find shortest column (ties go left-to-right)
    let shortestCol = cols[0]
    for (let c = 1; c < cols.length; c++) {
      if (cols[c].height < shortestCol.height) {
        shortestCol = cols[c]
      }
    }

    shortestCol.items.push({
      ...norm,
      renderWidth,
      renderHeight,
      sizes: SIZES_HALF
    })

    // Add normalized relative vertical height (1 / aspect_ratio) to track column height
    shortestCol.height += 1 / ratio
  })

  return cols.map((col) => col.items)
})

const toLightboxItem = (item) => ({
  src: item.src,
  width: item.renderWidth,
  height: item.renderHeight,
  caption: item.fullCaption || '',
  alt: item.alt
})

const openMasonryLightbox = (clickedIndex) => {
  if (rawCount.value === 1 && singleLayout.value) {
    emit('open-lightbox', { items: [toLightboxItem(singleLayout.value)], index: 0 })
  } else if (rawCount.value === 2 && pairLayout.value) {
    emit('open-lightbox', { items: pairLayout.value.items.map(toLightboxItem), index: clickedIndex })
  } else if (rawCount.value === 3 && trioLayout.value) {
    const allThree = [trioLayout.value.top, ...trioLayout.value.bottom].map(toLightboxItem)
    emit('open-lightbox', { items: allThree, index: clickedIndex })
  } else if (rawCount.value >= 4) {
    const flatItems = rawImages.value.map((entry, idx) => {
      const norm = normalizeRawItem(entry, idx, rawCount.value)
      return {
        src: norm.src,
        width: norm.hasDims ? norm.width : 600,
        height: norm.hasDims ? norm.height : 600,
        caption: norm.fullCaption || '',
        alt: norm.alt
      }
    })
    emit('open-lightbox', { items: flatItems, index: clickedIndex })
  }
}
</script>