<script setup>
import { ref, computed } from 'vue';
import PageHero from '~/components/PageHero.vue';
import BlogListing from '~/components/BlogListing.vue';

const { data: fetchedBlogs } = await useAsyncData('blog-list', () => $fetch('/api/blog'))

// Maintain reactivity for BlogListing
const blogs = computed(() => fetchedBlogs.value || []);

// Define the data for our hero section
const heroImages = ref([
  '/images/blog/hero/blog-cover.jpg'
]);

// 1. Core Meta Values
const pageTitle = 'CAPS Stories & Blog | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'Food, celebrations, people, stories and memories from life at Hotel CAPS - Koduvayur, Palakkad. Read our latest culinary highlights and featured events.'
const canonicalUrl = 'https://capsfamily.in/blog'
const ogImage = 'https://capsfamily.in/images/favicons/caps-blog-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'blog',
  breadcrumbName: 'CAPS Stories',
  blogPosts: blogs.value
})

</script>

<template>
  <div>
    <PageHero 
      eyebrow="CAPS Stories"
      title="Fresh From CAPS."
      subtitle="Food, celebrations, people, and little stories&#10;from life at CAPS."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-[#2A150A]/60 to-black/70 z-5"
      eyebrowColorClass="text-[#C86A22]"
      themeColorClass="text-[#592F10]"
    />

    <BlogListing :blogs="blogs" />
  </div>
</template>