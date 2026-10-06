<template>
  <section ref="sectionRef" class="bg-white py-14 sm:py-16 lg:py-24 overflow-hidden min-h-[700px]">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Header & Search Bar -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-zinc-200 pb-6">
        
        <!-- Left: Section Title -->
        <div class="flex items-center gap-4">
          <div class="w-8 sm:w-12 h-[2px] bg-[#C86A22]"></div>
          <h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#7A3E12] tracking-wide">
            Stories from <span class="text-[#bd5c17]">Our Table</span>
          </h2>
        </div>

        <!-- Right: Search Input (Permanent Magnifying Glass + Clear Button) -->
        <div class="relative w-full md:w-80 lg:w-96">
          <svg
            class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            id="search"
            v-model="searchQuery"
            name="search"
            type="text"
            placeholder="Search stories..."
            class="w-full bg-white border border-zinc-300 text-zinc-800 placeholder:text-zinc-400 rounded-full py-3 pl-11 pr-10 font-sans text-sm sm:text-base shadow-sm focus:outline-none focus:border-[#C86A22] focus:ring-2 focus:ring-[#C86A22]/25 transition-[border-color,box-shadow] duration-200"
          />

          <button
            v-if="searchQuery"
            type="button"
            aria-label="Clear search"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
            @click="searchQuery = ''"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- No Results State -->
      <div v-if="filteredBlogs.length === 0" class="py-20 text-center">
        <p class="text-zinc-500 font-sans text-lg">No stories found matching "{{ searchQuery }}".</p>
      </div>

      <!-- Blog Content Layout -->
      <div v-else class="flex flex-col gap-12 lg:gap-16">
        
        <!-- 1. SHOWCASE POST (Centered & Constrained Inside Outer Container, No Line Clamp) -->
        <div v-if="showcaseBlog" class="w-full max-w-5xl xl:max-w-6xl mx-auto">
          <NuxtLink
            :to="showcaseBlog.url"
            class="blog-card group flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden border border-zinc-100/85 shadow-[0_10px_30px_-5px_rgba(10,10,28,0.18),0_4px_12px_-2px_rgba(122,62,18,0.11)] hover:shadow-[0_22px_48px_-10px_rgba(10,10,28,0.34),0_10px_24px_-6px_rgba(189,92,23,0.24)] hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 ease-out"
          >
            <!-- Showcase Image Wrapper (Compact 16:10 on Mobile, 54% Width on Desktop) -->
            <div class="w-full lg:w-[54%] aspect-[16/10] lg:aspect-auto lg:min-h-[360px] relative overflow-hidden bg-zinc-100 shrink-0">
              <div
                v-if="showcaseBlog.featured"
                class="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 bg-black/75 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 rounded-md flex items-center tracking-widest uppercase shadow-md"
              >
                FEATURED
              </div>
              <NuxtImg
                :src="showcaseBlog.coverImage"
                :alt="showcaseBlog.title"
                width="1200"
                height="800"
                sizes="380px sm:640px md:768px lg:640px xl:800px"
                format="webp"
                quality="80"
                densities="x1"
                loading="eager"
                decoding="async"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            <!-- Showcase Text Column (Compact Mobile Padding, Unclamped Copy) -->
            <div class="w-full lg:w-[46%] p-5 sm:p-7 lg:p-10 flex flex-col justify-center text-left">
              <div class="flex items-center gap-3 mb-2.5 sm:mb-3.5">
                <div class="w-6 h-[2px] bg-[#bd5c17]"></div>
                <span class="text-xs font-semibold tracking-widest text-zinc-500 uppercase">{{ showcaseBlog.date }}</span>
              </div>

              <h3 class="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-zinc-900 mb-3 sm:mb-4 leading-snug group-hover:text-[#bd5c17] transition-colors duration-300">
                {{ showcaseBlog.title }}
              </h3>

              <p class="font-sans text-zinc-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-7">
                {{ showcaseBlog.intro }}
              </p>

              <div class="relative inline-flex items-center w-fit pb-1 text-sm sm:text-base text-[#bd5c17] font-bold tracking-wide group-hover:text-[#C86A22] transition-colors duration-300 mt-auto lg:mt-0">
                <span>Read Story</span>
                <span class="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-[#bd5c17] group-hover:bg-[#C86A22] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 2. STANDARD POSTS GRID (1 Col <640px, 2 Cols >=640px, 3 Cols >=1280px) -->
        <div v-if="standardBlogs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-8">
          <NuxtLink
            v-for="(blog, index) in standardBlogs"
            :key="blog.url || index"
            :to="blog.url"
            class="blog-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-100/85 shadow-[0_10px_30px_-5px_rgba(10,10,28,0.18),0_4px_12px_-2px_rgba(122,62,18,0.11)] hover:shadow-[0_22px_48px_-10px_rgba(10,10,28,0.34),0_10px_24px_-6px_rgba(189,92,23,0.24)] hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 ease-out h-full"
          >
            <!-- Standard Image Wrapper (With Featured Badge Support) -->
            <div class="w-full aspect-[16/10] relative overflow-hidden bg-zinc-100 shrink-0">
              <div
                v-if="blog.featured"
                class="absolute top-3.5 left-3.5 z-10 bg-black/75 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 rounded-md flex items-center tracking-widest uppercase shadow-md"
              >
                FEATURED
              </div>
              <NuxtImg
                :src="blog.coverImage"
                :alt="blog.title"
                width="1200"
                height="800"
                sizes="380px sm:380px md:450px lg:525px xl:450px"
                format="webp"
                quality="80"
                densities="x1"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            <!-- Standard Text Column (Left-Aligned flex-col, Line-Clamp-3 on Intro) -->
            <div class="p-5 sm:p-7 flex flex-col flex-grow text-left">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-6 h-[2px] bg-[#C86A22]"></div>
                <span class="text-xs font-semibold tracking-widest text-zinc-500 uppercase">{{ blog.date }}</span>
              </div>

              <h3 class="font-display font-bold text-xl sm:text-2xl text-zinc-900 mb-3 leading-snug group-hover:text-[#bd5c17] transition-colors duration-300">
                {{ blog.title }}
              </h3>

              <p class="font-sans text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                {{ blog.intro }}
              </p>

              <div class="relative inline-flex items-center w-fit pb-1 text-[#bd5c17] font-bold text-sm tracking-wide group-hover:text-[#C86A22] transition-colors duration-300 mt-auto">
                <span>Read Story</span>
                <span class="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">→</span>
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-[#bd5c17] group-hover:bg-[#C86A22] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
              </div>
            </div>
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  blogs: { type: Array, required: true, default: () => [] }
})

const searchQuery = ref('')
const sectionRef = ref(null)
let ctx = null

// Real-time Reactive Search filtering by Title or Intro
const filteredBlogs = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return props.blogs

  return props.blogs.filter(blog =>
    blog.title?.toLowerCase().includes(query) ||
    blog.intro?.toLowerCase().includes(query)
  )
})

// Top card is the newest blog with showcase: true
const showcaseBlog = computed(() => {
  return filteredBlogs.value.find(blog => blog.showcase)
})

// All other blogs (including other featured blogs) go into the grid in newest-first order
const standardBlogs = computed(() => {
  if (!showcaseBlog.value) return filteredBlogs.value
  return filteredBlogs.value.filter(blog => blog.url !== showcaseBlog.value.url)
})

// Zero-Opacity-Play GSAP Scroll Lift (Only subtle Y-axis movement for below-the-fold cards)
onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger)
  await nextTick()

  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.blog-card')

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      // Cards already visible in the initial viewport stay untouched for instant LCP
      if (rect.top < window.innerHeight * 0.9) {
        gsap.set(card, { y: 0 })
        return
      }

      gsap.fromTo(
        card,
        { y: 28 },
        {
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>