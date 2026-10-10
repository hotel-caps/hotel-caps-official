<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/contact/hero/contact.jpg'
]);

// 1. Core Meta Values
const pageTitle = 'Contact & Bookings | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'Contact Hotel CAPS - Koduvayur, Palakkad for Luxury AC Room Bookings, Restaurant Reservations, Auditorium & Events Hall enquiries, Catering & Free Delivery.'
const canonicalUrl = 'https://capsfamily.in/contact'
const ogImage = 'https://capsfamily.in/images/favicons/caps-contact-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'contact',
  breadcrumbName: 'Contact Us'
})

</script>

<template>
  <div>
    <PageHero 
      eyebrow="Your Journey Starts Here."
      title="Contact Us"
      subtitle="Reach out to us for reservations, event bookings, and inquiries. We look forward to hearing from you."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-orange-950/80 to-black/70 z-5 z-5"
      eyebrowColorClass="text-[#fb923c]"
      themeColorClass="text-[#c2410c]"
    />

    <Gmaps />
    <GetInTouchContact />


  </div>
</template>
