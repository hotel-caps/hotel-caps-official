<script setup>
import { ref } from 'vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/hall/hero/hall.jpg'
]);

// Your page-specific JSON payload for Intro Section
const eventsHallIntroData = {
  eyebrow: "Welcome to Hotel CAPS",
  title: "A Space for Every Occasion.\nMemories for a Lifetime.",
  description: "Hotel CAPS Events Hall is designed to host a wide range of events with elegance and ease. From grand celebrations to corporate meetings, we provide the perfect setting, service, and support to make every event truly special.",
  image: "/images/hall/intro.jpg", 
  themeTextClass: "text-[#e22473]", 
  themeBgClass: "bg-[#e22473]",
  themeIconBgClass: "bg-pink-50",
  features: [
    {
      title: "Spacious Hall",
      description: "Large, pillar-less hall with flexible seating arrangements.",
      // Raw SVG: Group of People
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: "Modern Facilities",
      description: "Equipped with advanced audio-visual and lighting systems.",
      // Raw SVG: Megaphone / Announcement
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`
    },
    {
      title: "Free Wi-Fi",
      description: "High-speed internet connectivity throughout the venue.",
      // Raw SVG: Wi-Fi
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" stroke-width="2.5"/></svg>`
    },
    {
      title: "24/7 Assistance",
      description: "Our team is always here to help you, before, during, and after your event.",
      // Raw SVG: Clock
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`
    }
  ]
};


const eventsHallSplitData = {
  eyebrow: "Why Choose Us?",
  title: "Designed for Your Events,\nBuilt for Your Comfort.",
  description: "We go the extra mile to ensure your event is seamless, successful, and remembered for all the right reasons.",
  bullets: [
    "Spacious and versatile event space",
    "Customizable seating & décor options",
    "Perfect for social, cultural & corporate events", 
    "Dedicated event team for complete support"      
  ],
  image: "/images/hall/split.jpg",
  buttonClass: "border-2 border-solid border-[#e22473] text-[#e22473] before:bg-[#e22473]",
  buttonText: "View Catering",
  buttonLink: "/catering",
  themeTextClass: "text-[#e22473]",
  themeBgClass: "bg-[#e22473]"
};

const eventsHallAssureData = {
  eyebrow: "We Assure",
  title: "Quality You Can Trust",
  description: "We go above and beyond to ensure your events are hosted in a premium, fully-equipped space that leaves a lasting impression.",
  themeTextClass: "text-[#e22473]",
  themeBgClass: "bg-[#e22473]",
  themeIconBgClass: "bg-pink-50",
  features: [
    {
      title: "Spacious Venue",
      description: "Large, well-designed hall for events of all sizes.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: "Hygienic & Clean",
      description: "Maintained with high standards of cleanliness and hygiene.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`
    },
    {
      title: "Advanced AV System",
      description: "Professional sound, lighting & projection for every event.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`
    },
    {
      title: "Flexible Seating",
      description: "Custom layouts to match your event style and guest count.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>`
    },
    {
      title: "High-Speed Wi-Fi",
      description: "Reliable internet for seamless connectivity throughout.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" stroke-width="2.5"/></svg>`
    },
    {
      title: "Air Conditioning",
      description: "Centralized AC for maximum guest comfort.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="3" y="6" width="18" height="8" rx="2"/><path d="M7 14v4"/><path d="M12 14v4"/><path d="M17 14v4"/><line x1="8" y1="10" x2="16" y2="10"/></svg>`
    },
    {
      title: "Secure & Safe",
      description: "CCTV surveillance and 24/7 security for peace of mind.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M16 11l2 2v4M16 11h6M3 15a2 2 0 0 0 2 2h2.5l3.5 3.5a1 1 0 0 0 1.5 0L21 12a1 1 0 0 0 0-1.5l-5-5a1 1 0 0 0-1.5 0Z"/></svg>`
    },
    {
      title: "Ample Parking",
      description: "Spacious parking area for cars and two-wheelers.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`
    },
    {
      title: "In-house Catering",
      description: "Delicious multi-cuisine menu prepared with quality ingredients.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`
    },
    {
      title: "Value for Money",
      description: "Premium service and facilities at the best possible price.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`
    }
  ]
};

const hallGalleryData = {
  eyebrow: "Our Facilities",
  title: "Spaces Designed for Excellence",
  themeTextClass: "text-[#e22473]",
  themeBgClass: "bg-[#e22473]",

  images: [
    {
      src: "/images/hall/amenities/1.jpg",
      alt: "Hotel CAPS Events Hall stage arranged for celebrations and special occasions",
      width: 600,
      height: 400
    },
    {
      src: "/images/hall/amenities/2.jpg",
      alt: "Hotel CAPS Events Hall with theatre-style seating facing the stage",
      width: 576,
      height: 400
    },
    {
      src: "/images/hall/amenities/3.jpg",
      alt: "Hotel CAPS Events Hall arranged with rows of seating for an event",
      width: 533,
      height: 400
    },
    {
      src: "/images/hall/amenities/4.jpg",
      alt: "Spacious Hotel CAPS Events Hall with seating arranged for guests",
      width: 600,
      height: 399
    },
    {
      src: "/images/hall/amenities/5.jpg",
      alt: "Hotel CAPS Events Hall interior prepared for a gathering",
      width: 519,
      height: 400
    },
    {
      src: "/images/hall/amenities/6.jpg",
      alt: "Hotel CAPS Events Hall stage and seating area",
      width: 634,
      height: 400
    },
    {
      src: "/images/hall/amenities/7.jpg",
      alt: "Hotel CAPS Events Hall with spacious seating and illuminated ceiling",
      width: 533,
      height: 400
    },
    {
      src: "/images/hall/amenities/8.jpg",
      alt: "Interior corridor providing access to the Hotel CAPS Events Hall",
      width: 711,
      height: 400
    },
    {
      src: "/images/hall/amenities/9.jpg",
      alt: "Hotel CAPS Events Hall stage with red backdrop and decorative seating",
      width: 600,
      height: 400
    },
    {
      src: "/images/hall/amenities/10.jpg",
      alt: "Elevator / Lift facility at Hotel CAPS for convenient guest access",
      width: 320,
      height: 400
    },
    {
      src: "/images/hall/amenities/11.jpg",
      alt: "Parking area available for guests at Hotel CAPS",
      width: 602,
      height: 400
    }
  ]
};

const hallCtaData = {
  eyebrow: "Planning a Special Celebration?",
  eyebrowColorClass: "text-[#ff7dbe]",
  title: "Book Our Premium Catering Today.",
  description: "Contact our event specialists for menu, booking and finalizing arrangements.",
  buttonText: "Request a Quote",
  buttonLink: "/catering",
  bgGradientClass: "bg-gradient-to-r from-[#831843] via-[#be185d] to-[#e22473]",
  buttonTextClass: "text-[#be185d]",
  // Stage / Auditorium Watermark SVG
  watermarkSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="w-full h-full"><path d="M22 17H2c0-5.5 4.5-10 10-10s10 4.5 10 10Z"/><path d="M12 7V4m-2 0h4"/><path d="M2 21h20"/></svg>`
};

// 1. Core Meta Values
const pageTitle = 'Auditorium & Event Hall | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Plan weddings, corporate events, banquets, meetings, functions & celebrations with us. Features modern amenities, parking space, AC seating & full catering.'
const canonicalUrl = 'https://capsfamily.in/hall'
const ogImage = 'https://capsfamily.in/images/favicons/caps-hall-og-image.jpg'

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
        "@type": "EventVenue",
        "name": "Hotel CAPS Auditorium & Event Hall",
        "description": pageDesc,
        "url": canonicalUrl,
        "image": ogImage,
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
        },
        "containedInPlace": {
          "@type": "Hotel",
          "name": "Hotel CAPS",
          "url": "https://capsfamily.in/"
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
      eyebrow="Make Your Occasions Unforgettable."
      title="Our Events Hall"
      subtitle="The perfect venue for your special moments - every celebration, meeting and milestone."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-pink-950/70 to-black/70 z-5"
      eyebrowColorClass="text-[#ff7dbe]"
      themeColorClass="text-[#be185d]"
    />

    <PageIntro 
      :eyebrow="eventsHallIntroData.eyebrow"
      :title="eventsHallIntroData.title"
      :description="eventsHallIntroData.description"
      :image="eventsHallIntroData.image"
      :themeTextClass="eventsHallIntroData.themeTextClass"
      :themeBgClass="eventsHallIntroData.themeBgClass"
      :themeIconBgClass="eventsHallIntroData.themeIconBgClass"
      :features="eventsHallIntroData.features"
    />

      <PageSplit 
        :eyebrow="eventsHallSplitData.eyebrow"
        :title="eventsHallSplitData.title"
        :description="eventsHallSplitData.description"
        :bullets="eventsHallSplitData.bullets"
        :image="eventsHallSplitData.image"
        :buttonClass="eventsHallSplitData.buttonClass"
        :buttonText="eventsHallSplitData.buttonText"
        :buttonLink="eventsHallSplitData.buttonLink"
        :themeTextClass="eventsHallSplitData.themeTextClass"
        :themeBgClass="eventsHallSplitData.themeBgClass"
      />

      <HallEvents />

      <PageAssure 
        :eyebrow="eventsHallAssureData.eyebrow"
        :title="eventsHallAssureData.title"
        :description="eventsHallAssureData.description"
        :features="eventsHallAssureData.features"
        :themeTextClass="eventsHallAssureData.themeTextClass"
        :themeBgClass="eventsHallAssureData.themeBgClass"
        :themeIconBgClass="eventsHallAssureData.themeIconBgClass"
      />

      <PageGallery 
        :eyebrow="hallGalleryData.eyebrow"
        :title="hallGalleryData.title"
        :images="hallGalleryData.images"
        :themeTextClass="hallGalleryData.themeTextClass"
        :themeBgClass="hallGalleryData.themeBgClass"
      />

    <PageCtaBanner v-bind="hallCtaData" />

  </div>
</template>
