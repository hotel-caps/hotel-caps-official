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
                @open-lightbox="openLightbox"
              />
            </div>
          </template>

        </div>
      </div>
    </main>

    <!-- 3. BLOG LIGHTBOX (Masonry & Split Sticky Images) -->
    <BlogLightbox
      :is-open="lightbox.isOpen"
      :items="lightbox.items"
      :initial-index="lightbox.index"
      @close="closeLightbox"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useAsyncData, createError, useSeoMeta, useHead } from '#imports'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 1. Explicitly Import Every Block Component
import BlogHero from '~/components/blog/BlogHero.vue'
import BlogSidebar from '~/components/blog/BlogSidebar.vue'
import BlogLightbox from '~/components/blog/BlogLightBox.vue'
import BlockHeading from '~/components/blog/blocks/BlockHeading.vue'
import BlockParagraph from '~/components/blog/blocks/BlockParagraph.vue'
import BlockQuote from '~/components/blog/blocks/BlockQuote.vue'
import SplitSticky from '~/components/blog/blocks/SplitSticky.vue'
import BlockMasonry from '~/components/blog/blocks/BlockMasonry.vue'
import BlockHorizontalSlider from '~/components/blog/blocks/BlockHorizontalSlider.vue'
import BlockThumbnailSlider from '~/components/blog/blocks/BlockThumbnailSlider.vue'
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

if (error.value || !article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Story not found', fatal: true })
}

// Generate ToC from H2s
const toc = computed(() => {
  if (!article.value) return []
  return article.value.blocks
    .filter(b => b.type === 'heading' && b.level === 'h2')
    .map(b => ({ id: b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), text: b.text }))
})

// 2. Map the Actual Component Objects
const resolveBlockComponent = (type) => {
  const map = {
    'editorial-intro': BlockParagraph,
    'paragraph': BlockParagraph,
    'heading': BlockHeading,
    'list-ordered': BlockParagraph,
    'list-unordered': BlockParagraph,
    'quote-full': BlockQuote,
    'split-text-quote': SplitSticky,
    'split-text-masonry': SplitSticky,
    'masonry-full': BlockMasonry,
    'slider-horizontal': BlockHorizontalSlider,
    'slider-thumbnail': BlockThumbnailSlider,
    'video': BlockVideo,
    'icon-strip': BlockIconStrip,
    'banner-menu': BannerMenu,
    'banner-social': BannerSocial,
    'footer-nav': BlockFooterNav,
    'related-articles': BlockRelatedArticles
  }
  return map[type] || BlockParagraph
}

// --- LIGHTBOX STATE ---
const lightbox = ref({
  isOpen: false,
  items: [],
  index: 0
})

const openLightbox = (payload) => {
  if (!payload?.items?.length) return
  lightbox.value = {
    isOpen: true,
    items: payload.items,
    index: payload.index || 0
  }
}

const closeLightbox = () => {
  lightbox.value.isOpen = false
}

// --- GSAP ANIMATIONS ---
let ctx;

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger);
  await nextTick();

  ctx = gsap.context(() => {
    const blocks = gsap.utils.toArray('.gsap-block-reveal');
    
    blocks.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      // Keep the first block & any block already in the initial viewport visible
      // so Lighthouse never sees SSR content disappear after paint
      if (index === 0 || rect.top < window.innerHeight * 0.85) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: el, 
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true // Frees up mobile memory & INP once revealed
          }
        }
      );
    });
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

// --- SEO & STRUCTURED METADATA ---
// 1. Core Meta Values
const pageTitle = `${article.value.pageTitle} | CAPS Stories`
const pageDesc = article.value.pageDesc
const canonicalUrl = `https://capsfamily.in/blog/${slug}`
const rawOgImage = article.value.ogImage || article.value.hero?.image || '/images/favicons/caps-blog-og-image.jpg'
const ogImage = rawOgImage.startsWith('http') ? rawOgImage : `https://capsfamily.in${rawOgImage}`
const publishedIso = article.value.publishDate ? new Date(article.value.publishDate).toISOString() : undefined

// 2. Structured Link and JSON-LD Schema Injection (No duplicate Google Fonts!)
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "headline": article.value.pageTitle,
        "name": pageTitle,
        "description": pageDesc,
        "image": ogImage,
        "url": canonicalUrl,
        ...(publishedIso ? { "datePublished": publishedIso } : {}),
        "author": {
          "@type": "Organization",
          "name": "Hotel CAPS",
          "url": "https://capsfamily.in/"
        },
        "publisher": {
          "@type": "Hotel",
          "name": "Hotel CAPS",
          "url": "https://capsfamily.in/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://capsfamily.in/images/caps-solid-logo.png"
          },
          "email": "capsfamilybakes@gmail.com",
          "telephone": [
            "+919207517064",
            "+918848369567"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main Road, Pittupeedika",
            "addressLocality": "Koduvayur",
            "addressRegion": "Kerala",
            "postalCode": "678501",
            "addressCountry": "IN"
          }
        }
      })
    }
  ]
})

// 3. Nuxt 4 SEO Composable (Search & Social Cards)
useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogSiteName: 'Hotel CAPS',
  ogType: 'article',
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: canonicalUrl,
  ogImage: ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterImage: ogImage
})
</script>