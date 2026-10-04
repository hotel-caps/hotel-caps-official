<template>
  <div class="flex flex-col gap-3 lg:gap-10 h-max w-full">
    
    <!-- ========================================== -->
    <!-- 1. SHARE BAR (Sticky on Mobile & Desktop)  -->
    <!-- ========================================== -->
    <div class="flex flex-row lg:flex-col pt-2 items-center lg:items-start justify-between lg:justify-start gap-4">
      <h5 class="text-xs font-bold tracking-widest text-[#bd5c17] uppercase">
        Share Story
      </h5>

      <div class="flex items-center gap-3">
        <!-- 1. Copy Link (Dark Gray / Charcoal) -->
        <button 
          type="button"
          @click="copyLink"
          :aria-label="copied ? 'Link Copied' : 'Copy Link'"
          :title="copied ? 'Copied!' : 'Copy Link'"
          class="w-10 h-10 lg:w-11 lg:h-11 rounded-full border transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer"
          :class="copied 
            ? 'bg-[#27272a] text-white border-[#27272a] scale-105' 
            : 'bg-white text-[#27272a] border-[#27272a]/20 hover:bg-[#27272a] hover:text-white hover:border-[#27272a]'"
        >
          <PhCheck v-if="copied" :size="18" weight="bold" />
          <PhLink v-else :size="18" weight="bold" />
        </button>

        <!-- 2. WhatsApp Share (Official WhatsApp Green #25D366) -->
        <button 
          type="button"
          @click="shareOnWhatsApp"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
          class="w-10 h-10 lg:w-11 lg:h-11 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#1da851] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <PhWhatsappLogo :size="20" weight="fill" />
        </button>

        <!-- 3. Native Share Button (CAPS Theme Brown #bd5c17) -->
        <button 
          type="button"
          @click="triggerNativeShare"
          aria-label="Share Story"
          title="Share Story"
          class="w-10 h-10 lg:w-11 lg:h-11 rounded-full border border-[#bd5c17]/25 bg-[#bd5c17]/10 text-[#bd5c17] hover:bg-[#bd5c17] hover:text-white hover:border-[#bd5c17] shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <PhShareNetwork :size="18" weight="bold" />
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 1B. MOBILE PROGRESS BAR (Mobile Only <1024)-->
    <!-- ========================================== -->
    <div class="lg:hidden relative w-full h-[3px] bg-[#bd5c17]/15 rounded-full overflow-hidden">
      <div 
        class="h-full bg-[#bd5c17] rounded-full transition-all duration-150 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- ========================================== -->
    <!-- 2. TABLE OF CONTENTS (Desktop Only >=1024) -->
    <!-- ========================================== -->
    <div v-if="toc && toc.length" class="hidden lg:block relative">
      <!-- Background Full Track Line -->
      <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-[#bd5c17]/15 rounded-full"></div>
      
      <!-- Dynamic Active Progress Line -->
      <div 
        class="absolute left-0 top-0 w-[2px] bg-[#bd5c17] rounded-full transition-all duration-300 ease-out"
        :style="{ height: `${progressHeight}%` }"
      ></div>

      <h5 class="text-xs font-bold tracking-widest text-[#bd5c17] uppercase mb-5 pl-5">
        In This Story
      </h5>

      <ul class="space-y-4 pl-5">
        <li v-for="heading in toc" :key="heading.id">
          <button
            type="button"
            @click="scrollToSection(heading.id)"
            class="text-left text-sm font-sans font-medium transition-colors duration-200 line-clamp-2 leading-relaxed cursor-pointer"
            :class="activeId === heading.id 
              ? 'text-[#C86A22]' 
              : 'text-[#7A3E12]/70 hover:text-[#C86A22]'"
          >
            {{ heading.text }}
          </button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PhLink, PhCheck, PhWhatsappLogo, PhShareNetwork } from '@phosphor-icons/vue'

const props = defineProps({
  toc: { type: Array, default: () => [] },
  title: { type: String, default: 'CAPS Stories' },
  description: { type: String, default: '' }
})

// --- SHARE ACTIONS ---
const copied = ref(false)

const getCurrentUrl = () => {
  return typeof window !== 'undefined' ? window.location.href : ''
}

const copyLink = async () => {
  const url = getCurrentUrl()
  if (!url) return
  try {
    await navigator.clipboard.writeText(url)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const shareOnWhatsApp = () => {
  const url = getCurrentUrl()
  const text = `${props.title} — ${url}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
}

const triggerNativeShare = async () => {
  const url = getCurrentUrl()
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: props.title,
        text: props.description,
        url
      })
    } catch (err) {
      // User dismissed native share sheet
    }
  } else {
    await copyLink()
  }
}

// --- CLEAN SMOOTH SCROLL (NO #HASH IN URL) ---
const activeId = ref('')

const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (!target) return

  activeId.value = id
  const headerOffset = 110
  const elementPosition = target.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.scrollY - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

// --- DYNAMIC TOC PROGRESS TRACKER ---
const progressHeight = computed(() => {
  if (!props.toc?.length) return 0
  const idx = props.toc.findIndex(item => item.id === activeId.value)
  if (idx === -1) return Math.round(100 / props.toc.length)
  return Math.round(((idx + 1) / props.toc.length) * 100)
})


const scrollProgress = ref(0)

const handleScroll = () => {

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = scrollableHeight > 0 
    ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollableHeight) * 100))) 
    : 0

  if (!props.toc?.length) return

  // Trigger point: 180px from the top of the viewport (just below sticky header)
  const triggerPoint = 180
  let currentActive = props.toc[0].id

  for (let i = 0; i < props.toc.length; i++) {
    const el = document.getElementById(props.toc[i].id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= triggerPoint) {
        currentActive = props.toc[i].id
      } else {
        break
      }
    }
  }

  activeId.value = currentActive
}

onMounted(() => {
  if (props.toc?.length) {
    activeId.value = props.toc[0].id
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>