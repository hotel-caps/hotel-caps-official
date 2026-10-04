<template>
  <div v-if="article" class="bg-[#fafaf9] min-h-screen font-sans text-[#7A3E12] selection:bg-[#C86A22] selection:text-white pb-24 overflow-x-clip">
    
    <!-- 1. HERO SECTION -->
    <BlogHero 
      :hero="article.hero" 
      :pageTitle="article.pageTitle" 
      :pageSubTitle="article.pageSubTitle" 
      :publishDate="article.publishDate" 
      :readTime="article.readTime"
      :eyebrow="article.hero.eyebrow"
      :imageGradientClass="article.hero.imageGradientClass"
      :themeColorClass="article.hero.themeColorClass"
      :eyebrowColorClass="article.hero.eyebrowColorClass"
    />

    <!-- 2. EDITORIAL GRID -->
    <main class="max-w-full mx-auto px-6 md:px-12 mt-2 md:mt-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        <!-- LEFT COLUMN (Mobile: Top Share Bar below Metadata | Desktop: Sticky Left Sidebar) -->
        <aside class="lg:col-span-3 sticky top-[72px] lg:top-[100px] z-30 self-start bg-[#fafaf9]/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none -mx-6 px-6 pt-3 pb-2 lg:mx-0 lg:px-0 lg:py-0 border-b border-[#7A3E12]/10 lg:border-b-0">
          <BlogSidebar 
            :toc="toc" 
            :title="article.pageTitle" 
            :description="article.pageDesc" 
          />
        </aside>

        <!-- RIGHT COLUMN: DYNAMIC CONTENT LOOP -->
        <div class="lg:col-span-9 flex flex-col gap-6 md:gap-10 w-full max-w-7xl">

          <!-- Component Builder -->
          <template v-for="(block, idx) in article.blocks" :key="idx">
            <div class="gsap-block-reveal w-full relative">
              <component 
                :is="resolveBlockComponent(block.type)" 
                :block="block" 
              />
            </div>
          </template>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useAsyncData, createError, useSeoMeta, useHead } from '#imports'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 1. Explicitly Import Every Block Component
import BlogHero from '~/components/blog/BlogHero.vue'
import BlogSidebar from '~/components/blog/BlogSidebar.vue'
import BlockHeading from '~/components/blog/blocks/BlockHeading.vue'
import BlockParagraph from '~/components/blog/blocks/BlockParagraph.vue'
import BlockQuote from '~/components/blog/blocks/BlockQuote.vue'
import SplitSticky from '~/components/blog/blocks/SplitSticky.vue'
import BlockMasonry from '~/components/blog/blocks/BlockMasonry.vue'
import BlockSlider from '~/components/blog/blocks/BlockSlider.vue'
import BlockVideo from '~/components/blog/blocks/BlockVideo.vue'
import BlockIconStrip from '~/components/blog/blocks/BlockIconStrip.vue'
import BannerMenu from '~/components/blog/blocks/BannerMenu.vue'
import BannerSocial from '~/components/blog/blocks/BannerSocial.vue'
import BlockFooterNav from '~/components/blog/blocks/BlockFooterNav.vue'
import BlockRelatedArticles from '~/components/blog/blocks/BlockRelatedArticles.vue'

definePageMeta({
  validate: (route) => {
    return typeof route.params.slug === 'string' && !route.params.slug.includes('.')
  }
})

const route = useRoute()
const slug = route.params.slug

// Fetch Data
const { data: article, error } = await useAsyncData(`blog-${slug}`, () => 
  $fetch(`/api/blog/${slug}`)
)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Story not found', fatal: true })
}

// Generate ToC from H2s
const toc = computed(() => {
  if (!article.value) return []
  return article.value.blocks
    .filter(b => b.type === 'heading' && b.level === 'h2')
    .map(b => ({ id: b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), text: b.text }))
})

// 2. Map the Actual Component Objects (Not Strings!)
const resolveBlockComponent = (type) => {
  const map = {
    'editorial-intro': BlockParagraph,
    'paragraph': BlockParagraph,
    'heading': BlockHeading,
    'list-ordered': BlockParagraph,
    'list-unordered': BlockParagraph,
    'quote-full': BlockQuote,
    'split-quote-image': SplitSticky,
    'split-text-image': SplitSticky,
    'split-text-quote': SplitSticky,
    'split-text-masonry': SplitSticky,
    'masonry-full': BlockMasonry,
    'slider-horizontal': BlockSlider,
    'slider-thumbnail': BlockSlider,
    'video': BlockVideo,
    'icon-strip': BlockIconStrip,
    'banner-menu': BannerMenu,
    'banner-social': BannerSocial,
    'footer-nav': BlockFooterNav,
    'related-articles': BlockRelatedArticles
  }
  
  // Return the raw component object directly
  return map[type] || BlockParagraph
}

// --- GSAP ANIMATIONS ---
let ctx;

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger);
  await nextTick();

  setTimeout(() => {
    ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray('.gsap-block-reveal');
      
      blocks.forEach((el) => {
        // GSAP handles the initial hiding dynamically
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.9, 
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: el, 
              start: 'top 85%', // Triggers when the top of the element hits 85% of the viewport height
              toggleActions: 'play none none none' 
            }
          }
        );
      });
    });
    
    ScrollTrigger.refresh();
  }, 250); 
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

// SEO
if (article.value) {
  useSeoMeta({
    title: article.value.pageTitle,
    description: article.value.pageDesc,
    ogImage: article.value.ogImage,
    twitterCard: 'summary_large_image',
  })
  useHead({
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Julee:wght@400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap' }
    ]
  })
}
</script>