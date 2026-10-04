<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';
import InnerPageIntro from '~/components/PageIntro.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/catering/hero/catering.jpg'
]);

// Your page-specific JSON payload for Intro Section
const cateringIntroData = {
  eyebrow: "Welcome to Our Catering",
  // The \n ensures the exact line break seen in your design
  title: "Crafted with Passion.\nServed with Perfection.",
  description: "At Hotel CAPS, catering is more than just food – it's an experience. We bring together the finest ingredients, skilled chefs, and impeccable service to make every occasion truly unforgettable.",
  image: "/images/catering/intro.jpg", // Update with your actual image path
  
  // Theme Configuration (Brick Red for Catering)
  themeTextClass: "text-[#df4444]",
  themeBgClass: "bg-[#df4444]",
  themeIconBgClass: "bg-red-50",
  
  // Features Array containing raw SVG strings
  features: [
    {
      title: "Custom Menus",
      description: "Tailored menus to suit your event and preferences.",
      // Raw SVG for Cloche / Food Cover
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M22 17H2c0-5.5 4.5-10 10-10s10 4.5 10 10Z"/><path d="M12 7V4m-2 0h4"/><path d="M2 21h20"/></svg>`
    },
    {
      title: "Fresh & Quality",
      description: "Only the freshest ingredients, sourced with care.",
      // Raw SVG for Leaves
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 0 8.48A11.83 11.83 0 0 1 11 20Z"/><path d="M11 20v-5"/><path d="M11 15a4 4 0 0 1-3-3"/></svg>`
    },
    {
      title: "Experienced Team",
      description: "Professional chefs and staff dedicated to your event.",
      // Raw SVG for Person
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`
    },
    {
      title: "Timely Service",
      description: "On-time delivery and flawless execution, every time.",
      // Raw SVG for Clock
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`
    }
  ]
};

const cateringSplitData = {
  eyebrow: "Why Choose Us?",
  title: "We Don't Just Cater,\nWe Create Experiences.",
  description: "Every detail matters to us – from the first bite to the last smile. Here's what makes us the preferred choice for hundreds of families and businesses.",
  bullets: [
    "Hygienic preparation and safe handling",
    "Elegant presentation, setup and service",
    "Wide variety of cuisines and dishes",
    "Outdoor and indoor Services for any event size"
  ],
  image: "/images/catering/split.jpg", // Adjust path as needed
  buttonClass: "border-2 border-solid border-[#df4444] text-[#df4444] before:bg-[#df4444]",
  buttonText: "View Events Hall",
  buttonLink: "/hall",
  themeTextClass: "text-[#df4444]",
  themeBgClass: "bg-[#df4444]"
};

const cateringAssureData = {
  eyebrow: "We Assure",
  title: "Quality You Can Trust",
  description: "We are committed to delivering an exceptional catering experience. Every dish is crafted with care, and every service is executed with precision to make your event flawless.",
  themeTextClass: "text-[#df4444]",
  themeBgClass: "bg-[#df4444]",
  themeIconBgClass: "bg-red-50",
  features: [
    {
      title: "Premium Ingredients",
      description: "We use only the freshest and finest quality ingredients.",
      // Sparkle / Premium SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>`
    },
    {
      title: "Expert Chefs",
      description: "Our experienced chefs bring passion and perfection to every dish.",
      // Chef Hat SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>`
    },
    {
      title: "Hygienic Preparation",
      description: "Strict hygiene standards are followed at every step.",
      // Shield Check SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`
    },
    {
      title: "Professional Service",
      description: "Trained staff ensures seamless service and guest satisfaction.",
      // User Check SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`
    },
    {
      title: "On-Time Delivery",
      description: "We value your time and guarantee punctual service.",
      // Clock SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    },
    {
      title: "Elegant Presentation",
      description: "Beautifully presented food that impresses your guests.",
      // Cloche SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M22 17H2c0-5.5 4.5-10 10-10s10 4.5 10 10Z"/><path d="M12 7V4m-2 0h4"/><path d="M2 21h20"/></svg>`
    },
    {
      title: "Custom Menus",
      description: "Menus tailored to your event, theme and dietary needs.",
      // Clipboard List SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`
    },
    {
      title: "Transparent Pricing",
      description: "Honest pricing with no hidden costs or surprises.",
      // Tag SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`
    }
  ]
};

const cateringGalleryData = {
  eyebrow: "A Glimpse of Our Catering",
  title: "Moments That Speak for Us",
  themeTextClass: "text-[#df4444]",
  themeBgClass: "bg-[#df4444]",

  images: [
    {
      src: "/images/catering/gallery/1.jpg",
      alt: "Hotel CAPS outdoor catering team preparing a live food counter",
      width: 710,
      height: 400
    },
    {
      src: "/images/catering/gallery/2.jpg",
      alt: "Hotel CAPS catering team serving freshly prepared dishes from buffet counters",
      width: 711,
      height: 400
    },
    {
      src: "/images/catering/gallery/3.jpg",
      alt: "Hotel CAPS chef preparing food at a live outdoor catering station",
      width: 711,
      height: 400
    },
    {
      src: "/images/catering/gallery/4.jpg",
      alt: "Freshly prepared dishes arranged for Hotel CAPS catering service",
      width: 712,
      height: 400
    },
    {
      src: "/images/catering/gallery/5.jpg",
      alt: "Guests being served by the Hotel CAPS catering team at an event",
      width: 457,
      height: 400
    }
  ]
};

const cateringCtaData = {
  eyebrow: "Ready to Plan Your Event?",
  eyebrowColorClass: "text-[#ff6262]",
  title: "Let's Make Your Occasion Unforgettable.",
  description: "Get in touch with us today to book our Events Hall.",
  buttonText: "Check Availability",
  buttonLink: "/hall",
  bgGradientClass: "bg-gradient-to-r from-[#7f1d1d] via-[#b91b1b] to-[#f97316]",
  buttonTextClass: "text-[#b91b1b]",
  // Cloche Watermark SVG
  watermarkSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="w-full h-full"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
};

// 1. Core Meta Values
const pageTitle = 'Outdoor Catering Services | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Enjoy delicious flavors & quality service of Hotel CAPS to your events with our catering. Ideal for weddings, parties, meetings, functions & celebrations.'
const canonicalUrl = 'https://capsfamily.in/catering'
const ogImage = 'https://capsfamily.in/images/favicons/caps-catering-og-image.jpg'

// 2. Structured Link and JSON-LD Schema Injection
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FoodService",
        "name": "Hotel CAPS Outdoor Catering Services",
        "description": pageDesc,
        "url": canonicalUrl,
        "image": ogImage,
        "provider": {
          "@type": "Hotel",
          "name": "Hotel CAPS",
          "url": "https://capsfamily.in/"
        },
        "telephone": [
          "+919207517064",
          "+918848369567"
        ],
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Palakkad"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Road, Pittupeedika",
          "addressLocality": "Koduvayur",
          "addressRegion": "Kerala",
          "postalCode": "678501",
          "addressCountry": "IN"
        }
      })
    }
  ]
})

// 3. Nuxt 4 SEO Composable (Search & Social Cards)
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
      eyebrow="Delicious Moments, Perfectly Catered."
      title="Our Catering"
      subtitle="From intimate gatherings to grand celebrations, we serve flavours that leave a lasting impression."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-red-950/70 to-black/70 z-5"
      eyebrowColorClass="text-[#ff6262]"
      themeColorClass="text-[#991b1b]"
    />

    <PageIntro 
      :eyebrow="cateringIntroData.eyebrow"
      :title="cateringIntroData.title"
      :description="cateringIntroData.description"
      :image="cateringIntroData.image"
      :themeTextClass="cateringIntroData.themeTextClass"
      :themeBgClass="cateringIntroData.themeBgClass"
      :themeIconBgClass="cateringIntroData.themeIconBgClass"
      :features="cateringIntroData.features"
    />

    <PageSplit 
      :eyebrow="cateringSplitData.eyebrow"
      :title="cateringSplitData.title"
      :description="cateringSplitData.description"
      :bullets="cateringSplitData.bullets"
      :image="cateringSplitData.image"
      :buttonClass="cateringSplitData.buttonClass"
      :buttonText="cateringSplitData.buttonText"
      :buttonLink="cateringSplitData.buttonLink"
      :themeTextClass="cateringSplitData.themeTextClass"
      :themeBgClass="cateringSplitData.themeBgClass"
    />

    <CateringEvents />

    <PageAssure 
      :eyebrow="cateringAssureData.eyebrow"
      :title="cateringAssureData.title"
      :description="cateringAssureData.description"
      :features="cateringAssureData.features"
      :themeTextClass="cateringAssureData.themeTextClass"
      :themeBgClass="cateringAssureData.themeBgClass"
      :themeIconBgClass="cateringAssureData.themeIconBgClass"
    />

    <PageGallery 
      :eyebrow="cateringGalleryData.eyebrow"
      :title="cateringGalleryData.title"
      :images="cateringGalleryData.images"
      :themeTextClass="cateringGalleryData.themeTextClass"
      :themeBgClass="cateringGalleryData.themeBgClass"
    />

    <PageCtaBanner v-bind="cateringCtaData" />

  </div>
</template>
