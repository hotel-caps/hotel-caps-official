<template>
  <section ref="sectionRef" class="bg-white py-16 lg:py-24 overflow-hidden min-h-[800px]">
    <div class="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Header & Search Bar -->
      <div class="blog-header-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-zinc-200 pb-6">
        
        <!-- Left: Section Title -->
        <div class="flex items-center gap-4">
          <div class="w-8 sm:w-12 h-[2px] bg-[#C86A22]"></div>
          <h2 class="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#7A3E12] tracking-wide">
            Stories from <span class="text-[#bd5c17]">Our Table</span>
          </h2>
        </div>

        <!-- Right: Search Input (FIXED INDENTATION) -->
        <div class="relative pl-4 w-full md:w-72 lg:w-96  bg-white border border-zinc-300 text-zinc-800 rounded-full focus:ring-2 focus:ring-[#C86A22] transition-all shadow-sm">
          <svg v-if="!searchQuery" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>    
          <input 
            id="search"
            name="search"
            v-model="searchQuery" 
            type="text" 
            placeholder=" Search stories..." 
            class="w-full rounded-full py-3 indent-10 border-transparent focus:border-transparent *:focus:outline-none focus-visible:outline-none focus-visible:border-transparent font-sans"
          />
        </div>
      </div>

      <!-- No Results State -->
      <div v-if="filteredBlogs.length === 0" class="py-20 text-center">
        <p class="text-zinc-500 font-sans text-lg">No stories found matching "{{ searchQuery }}".</p>
      </div>

      <!-- Blog Grid Layout -->
      <div v-else class="flex flex-col gap-10 lg:gap-16">
        
        <!-- Featured Post -->
        <article 
          v-if="featuredBlog" 
          class="blog-card group flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-zinc-100 cursor-pointer"
          @click="navigateTo(featuredBlog.url)"
        >
          <div class="w-full lg:w-3/5 aspect-video relative overflow-hidden">
            <div class="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center tracking-widest uppercase shadow-md">
              FEATURED
            </div>
            <img :src="featuredBlog.coverImage" :alt="featuredBlog.title" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
          </div>
          
          <div class="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-6 h-px bg-[#C86A22]"></div>
              <span class="text-xs font-semibold tracking-widest text-zinc-500 uppercase">{{ featuredBlog.date }}</span>
            </div>
            <h3 class="font-display font-bold text-3xl lg:text-4xl text-zinc-900 mb-6 group-hover:text-[#bd5c17] transition-colors duration-300">
              {{ featuredBlog.title }}
            </h3>
            <p class="font-sans text-zinc-600 text-base lg:text-lg leading-relaxed mb-8">
              {{ featuredBlog.intro }}
            </p>
            <div class="flex items-center text-[#bd5c17] font-bold tracking-wide group-hover:text-[#C86A22] transition-colors duration-300">
              Read Story 
              <span class="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        </article>

        <!-- Standard Posts Grid -->
        <div v-if="standardBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="(blog, index) in standardBlogs" 
            :key="index"
            class="blog-card group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-zinc-100 cursor-pointer h-full"
            @click="navigateTo(blog.url)"
          >
            <div class="w-full aspect-video overflow-hidden">
              <img :src="blog.coverImage" :alt="blog.title" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
            </div>
            
            <div class="p-6 sm:p-8 flex flex-col flex-grow">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-6 h-px bg-[#C86A22]"></div>
                <span class="text-xs font-semibold tracking-widest text-zinc-500 uppercase">{{ blog.date }}</span>
              </div>
              <h3 class="font-display font-bold text-xl sm:text-2xl text-zinc-900 mb-4 group-hover:text-[#bd5c17] transition-colors duration-300">
                {{ blog.title }}
              </h3>
              <p class="font-sans text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                {{ blog.intro }}
              </p>
              <div class="flex items-center text-[#bd5c17] font-bold text-sm tracking-wide group-hover:text-[#C86A22] transition-colors duration-300 mt-auto">
                Read Story 
                <span class="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          </article>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  blogs: { type: Array, required: true, default: () => [] }
});

const router = useRouter();
const searchQuery = ref('');

// Navigate securely
const navigateTo = (url) => {
  router.push(url);
};

// Real-time Reactive Search filtering by Title or Intro
const filteredBlogs = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return props.blogs;
  
  return props.blogs.filter(blog => 
    blog.title.toLowerCase().includes(query) || 
    blog.intro.toLowerCase().includes(query)
  );
});

// Separation logic to maintain layout (Featured vs Standard)
const featuredBlog = computed(() => {
  return filteredBlogs.value.find(blog => blog.featured);
});

const standardBlogs = computed(() => {
  return filteredBlogs.value.filter(blog => !blog.featured);
});

// --- GSAP ANIMATION LOGIC ---
const sectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    
    // Header Reveal
    gsap.from('.blog-header-reveal', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 85%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Animate Cards (FIXED: Switched to fromTo and mapped trigger to sectionRef)
    gsap.fromTo('.blog-card', 
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: sectionRef.value, 
          start: 'top 60%', // Triggers right after the header comes into view
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
      }
    );

  }, sectionRef.value);
};

// Re-run animations smoothly if search query changes the DOM length
watch(filteredBlogs, async () => {
  await nextTick();
  ScrollTrigger.refresh();
  
  const newCards = sectionRef.value?.querySelectorAll('.blog-card');
  if (newCards && newCards.length > 0) {
    gsap.fromTo(newCards, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', overwrite: 'auto' }
    );
  }
});

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (!isInitialAppLoad.value) {
    setTimeout(() => {
      initScrollAnimation();
      ScrollTrigger.refresh();
    }, 600);
  } else {
    const unwatch = watch(isInitialAppLoad, async (isStillLoading) => {
      if (!isStillLoading) {
        await nextTick();
        setTimeout(() => {
          initScrollAnimation();
          ScrollTrigger.refresh();
        }, 50);
        unwatch();
      }
    });
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>