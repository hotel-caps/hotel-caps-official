<template>
  <Transition
    enter-active-class="transition cubic-bezier(0.16, 1, 0.3, 1) duration-700"
    enter-from-class="transform translate-y-12 opacity-0 scale-95"
    enter-to-class="transform translate-y-0 opacity-100 scale-100"
    leave-active-class="transition ease-in duration-300"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-12 opacity-0"
  >
    <div 
      v-if="isVisible" 
      class="fixed bottom-6 left-6 z-[90] w-[calc(100%-3rem)] sm:w-80 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-100 p-5 overflow-hidden"
    >
      <!-- Close Button -->
      <button 
        @click="dismissNudge" 
        class="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,161.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
      </button>

      <!-- Content -->
      <div class="flex flex-col gap-3 pr-4">
        <!-- 5 Stars -->
        <div class="flex gap-1 text-amber-400">
          <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path></svg>
        </div>
        
        <div>
          <h4 class="font-display font-semibold text-lg text-stone-800">Enjoyed CAPS?</h4>
          <p class="text-sm text-stone-500 mt-1 leading-relaxed">
            A quick review would mean a lot to us.
          </p>
        </div>

        <a 
          :href="googleReviewLink" 
          target="_blank" 
          rel="noopener noreferrer"
          @click="onReviewClick"
          class="mt-2 inline-flex items-center justify-center w-full py-2.5 px-4 bg-[#b91b1b] hover:bg-[#9a1616] text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          Review us on Google
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// IMPORTANT: Replace this with your actual Google Business Profile review link!
const googleReviewLink = "https://search.google.com/local/reviews?placeid=ChIJ3wXSZcxtqDsRPs_NLF5MtAo" 

const route = useRoute()
const isVisible = ref(false)
let timer = null

// The No-Go Zones: Pages where we NEVER interrupt the user
const forbiddenRoutes = ['/menu', '/pricing', '/rooms', '/contact']

const checkTriggers = () => {
  // 1. Trigger if scrolled past 50%
  const scrollPosition = window.scrollY + window.innerHeight
  const pageHeight = document.documentElement.scrollHeight
  
  if (scrollPosition > pageHeight * 0.5) {
    showNudge()
  }
}

const showNudge = () => {
  isVisible.value = true
  cleanupTriggers() // Once shown, stop listening to scroll/time
}

const cleanupTriggers = () => {
  window.removeEventListener('scroll', checkTriggers)
  if (timer) clearTimeout(timer)
}

// User clicks the 'X' (14-day snooze)
const dismissNudge = () => {
  isVisible.value = false
  const cookie = useCookie('caps_review_nudge', { maxAge: 14 * 24 * 60 * 60 }) // 14 Days
  cookie.value = 'dismissed'
}

// User clicks the Review button (1-year snooze)
const onReviewClick = () => {
  isVisible.value = false
  const cookie = useCookie('caps_review_nudge', { maxAge: 365 * 24 * 60 * 60 }) // 1 Year
  cookie.value = 'reviewed'
}

onMounted(() => {
  // 1. Initial Checks: Is cookie set? Are they on a forbidden route?
  const nudgeCookie = useCookie('caps_review_nudge')
  
  const isForbidden = forbiddenRoutes.some(path => route.path.includes(path))

  // If cookie exists OR route is forbidden, abort setup entirely.
  if (nudgeCookie.value || isForbidden) {
    return
  }

  // 2. Setup The Race Condition (15s Time OR 50% Scroll)
  window.addEventListener('scroll', checkTriggers, { passive: true })
  
  timer = setTimeout(() => {
    showNudge()
  }, 15000) // 15 seconds
})

onUnmounted(() => {
  cleanupTriggers()
})
</script>