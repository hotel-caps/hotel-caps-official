<script setup>
import { ref, computed } from 'vue'; // 1. Import computed
import PageHero from '~/components/PageHero.vue';
import BlogListing from '~/components/BlogListing.vue';

const { data: fetchedBlogs } = await useAsyncData('blog-list', () => $fetch('/api/blog'))

// 2. Wrap the assignment in computed() to maintain reactivity
const blogs = computed(() => fetchedBlogs.value || []);

// Define the data for our hero section
const heroImages = ref([
  '/images/blog/hero/blog-cover.jpg'
]);

// SEO & META Architecture... (Keep your existing SEO code exactly as it is)

// JSON Data for the Blog Listing
// As requested, the primary featured blog is "More Than Just a Meal"
// const blogsList = ref([
//   {
//     title: "More Than Just a Meal",
//     intro: "Discover the stories, flavors, and traditions that make dining at CAPS an unforgettable experience.",
//     date: "14 OCT 2026",
//     url: "/blog/more-than-just-a-meal",
//     coverImage: "/images/blog/more-than-just-a-meal/cover.jpg",
//     featured: true
//   },
//   // Included from your design to populate the standard grid and test the search functionality. 
//   // You can safely remove these when you have real secondary posts.
//   {
//     title: "A Taste of the Coast at CAPS",
//     intro: "Fresh ingredients, bold flavours and a touch of home — our new coastal specials bring the taste of the sea to your table.",
//     date: "12 OCT 2026",
//     url: "/blog",
//     coverImage: "/images/blog/more-than-just-a-meal/cover.jpg",
//     featured: false
//   },
//   {
//     title: "Celebrations Made Special",
//     intro: "From intimate gatherings to grand occasions, discover how CAPS makes every celebration memorable.",
//     date: "28 SEP 2026",
//     url: "/blog",
//     coverImage: "/images/blog/more-than-just-a-meal/cover.jpg",
//     featured: false
//   },
//   {
//     title: "The Comfort of Traditions",
//     intro: "Classic dishes, timeless flavours, and the joy of a well-set table — our take on the meals we all love.",
//     date: "15 SEP 2026",
//     url: "/blog",
//     coverImage: "/images/blog/more-than-just-a-meal/cover.jpg",
//     featured: false
//   }
// ]);

// SEO & META Architecture
const pageTitle = 'CAPS Stories | Fresh From CAPS'
const pageDesc = 'Food, celebrations, people, and little stories from life at Hotel CAPS. Read our latest updates, culinary highlights, and event features.'
const canonicalUrl = 'https://capsfamily.in/blog'
const ogImage = 'https://capsfamily.in/images/favicons/caps-blog-og-image.jpg'

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "CAPS Stories",
        "description": pageDesc,
        "url": canonicalUrl,
        "publisher": {
          "@type": "Hotel",
          "name": "Hotel CAPS",
          "logo": {
            "@type": "ImageObject",
            "url": "https://capsfamily.in/logo.png"
          }
        }
      })
    }
  ]
})

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: canonicalUrl,
  ogImage: ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterImage: ogImage
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