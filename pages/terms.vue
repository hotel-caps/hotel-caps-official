<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';
import TermsAndConditions from '~/components/TermsAndConditions.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/others/terms.jpg'
]);

// 1. Core Meta Values
const pageTitle = 'Terms & Conditions | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'Read the terms and conditions for room bookings, guest stays, restaurant dining, auditorium events, and service policies at Hotel CAPS - Koduvayur, Palakkad.'
const canonicalUrl = 'https://capsfamily.in/terms'
const ogImage = 'https://capsfamily.in/images/favicons/caps-terms-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'webpage',
  breadcrumbName: 'Terms & Conditions'
})

</script>

<template>
  <div>
    <PageHero 
      eyebrow="The Legal Stuff, Simplified."
      title="Terms & Conditions"
      subtitle="Everything you need to know about how we can work together."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-[#191413]/50 to-black/70 z-5"
      eyebrowColorClass="text-[#aba09c]"
      themeColorClass="text-[#2b2422]"
    />

    <TermsAndConditions />

  </div>
</template>
