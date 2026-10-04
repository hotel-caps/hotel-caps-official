<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/others/privacy.jpg'
]);

// 1. Core Meta Values
const pageTitle = 'Privacy Policy | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'Learn how Hotel CAPS - Koduvayur, Palakkad collects, uses, and protects your personal data. Read our commitment to your privacy and data security.'
const canonicalUrl = 'https://capsfamily.in/policy'
const ogImage = 'https://capsfamily.in/images/favicons/caps-policy-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'webpage',
  breadcrumbName: 'Privacy Policy'
})

</script>

<template>
  <div>
    <PageHero 
      eyebrow="Your Data, Kept Guarded."
      title="Privacy Policy"
      subtitle="How we collect, handle, and protect your personal information."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-[#191a13]/50 to-black/70 z-5"
      eyebrowColorClass="text-[#abae9a]"
      themeColorClass="text-[#2b2b22]"
    />

    <PrivacyPolicy />

  </div>
</template>
