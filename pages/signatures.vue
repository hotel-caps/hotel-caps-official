<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';
import PageIntro from '~/components/PageIntro.vue';
import PageSplit from '~/components/PageSplit.vue';
import SignatureCollection from '~/components/SignatureCollection.vue';
import PageCtaBanner from '~/components/PageCtaBanner.vue';
import { signatureMonths } from '~/signaturesData.js';

// Define the data for our hero section
const heroImages = ref([
  '/images/signatures/hero/signature-hero.jpg' // Update with actual hero path
]);

// INTRO SECTION (Mapped from Design 1)
const signatureIntroData = {
  eyebrow: "Introducing CAPS Signatures",
  title: "Two Signature Dishes.\nOne Month.",
  description: "Every month, we choose two dishes that deserve a little more of the spotlight. One vegetarian, one non-vegetarian, each selected to become a CAPS Signature for the month.",
  image: "/images/signatures/signature-intro.jpg", // Update with actual intro path
  themeTextClass: "text-[#0F9A7D]", 
  themeBgClass: "bg-[#0F5A4D]",
  themeIconBgClass: "bg-[#0F5A5D]/10", // Soft teal background for icons
  features: [
    {
      title: "Two Signatures",
      description: "One vegetarian and one non-vegetarian dish, every month.",
      // Cloche/Food Cover
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M22 17H2c0-5.5 4.5-10 10-10s10 4.5 10 10Z"/><path d="M12 7V4m-2 0h4"/><path d="M2 21h20"/></svg>`
    },
    {
      title: "Specially Chosen",
      description: "Selected from our kitchen for something worth discovering.",
      // Sparkles/Stars
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
    },
    {
      title: "A New Pair Every Month",
      description: "Fresh signatures arrive as each new month begins.",
      // Calendar
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`
    },
    {
      title: "Made to Be Remembered",
      description: "Familiar CAPS hospitality, with something special on your plate.",
      // Heart
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
    }
  ]
};

// SPLIT SECTION (Mapped from Design 3)
const signatureSplitData = {
  eyebrow: "Signature Week",
  title: "One Last Week.\nOne More Reason to Indulge.",
  description: "Every month ends with something special. During the final week, our two CAPS Signature dishes take the spotlight, giving you seven days to discover the month's handpicked favourites.",
  bullets: [
    "Available during the last week of every month",
    "One vegetarian and one non-vegetarian Signature",
    "A new pair of dishes featured each month",
    "Dine in and discover them while they're here"
  ],
  image: "/images/signatures/signature-week.jpg", // Update with actual split path
  buttonClass: "border-2 border-solid border-[#0A4A3D] text-[#0A4A3D] before:bg-[#0A4A3D]",
  buttonText: "View Menu",
  buttonLink: "/menu",
  themeTextClass: "text-[#0F9A7D]", 
  themeBgClass: "bg-[#0F5A4D]",
};

// COLLECTION SECTION (Mapped from Design 2)
const signatureCollectionData = {
  eyebrow: "Signature Collection",
  title: "One Veg. One Non-Veg. One Month.",
  description: "A fresh pair of specially chosen dishes every month, crafted with the finest ingredients and a touch of something special. Discover, enjoy, and look forward to what's next.",
  themeTextClass: "text-[#0F9A7D]",
  themeBgClass: "bg-[#0F5A4D]",
  months: signatureMonths
};

// CTA BANNER SECTION
const signatureCtaData = {
  eyebrow: "Ready to Indulge?",
  eyebrowColorClass: "text-[#1FAA8D]",
  title: "Discover This Month's Signatures.",
  description: "Reserve a table or explore our full menu to experience the culinary craftsmanship at Hotel CAPS.",
  buttonText: "Check Our Menu",
  buttonLink: "/menu",
  bgGradientClass: "bg-gradient-to-r from-[#0A3A3D] via-[#0F4A3D] to-[#187477]",
  buttonTextClass: "text-[#0F4A3D]",
  // Dining Watermark SVG
  watermarkSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="w-full h-full"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`
};

// SEO & META
const pageTitle = 'CAPS Signatures | Hotel CAPS Restaurant'
const pageDesc = 'Discover the Hotel CAPS Signature Collection. Every month, our chefs handpick one vegetarian and one non-vegetarian dish to take the spotlight.'
const canonicalUrl = 'https://capsfamily.in/restaurant/signatures'
const ogImage = 'https://capsfamily.in/images/favicons/caps-signatures-og-image.jpg'

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
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
      eyebrow="CAPS Signatures"
      title="Two Dishes. One Month."
      subtitle="A fresh pair of chef-picked favourites, chosen each month for you to discover."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-[#0F2A1D]/60 to-black/70 z-5"
      eyebrowColorClass="text-[#1FAA8D]"
      themeColorClass="text-[#0F4A3D]"
    />

    <PageIntro v-bind="signatureIntroData" />

    <PageSplit v-bind="signatureSplitData" />

    <SignatureCollection v-bind="signatureCollectionData" />

    <PageCtaBanner v-bind="signatureCtaData" />
  </div>
</template>