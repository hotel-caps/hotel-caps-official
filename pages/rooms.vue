<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/rooms/hero/rooms.jpg'
]);

// Your page-specific JSON payload for Intro Section
const roomsIntroData = {
  eyebrow: "Welcome to Hotel CAPS",
  title: "Comfortable Stays.\nMemorable Experiences.",
  description: "At Hotel CAPS, we offer a range of well-appointed rooms designed for relaxation, convenience, and modern comfort. Whether you're here for business or leisure, we ensure a stay that feels just right.",
  image: "/images/rooms/intro.jpg",
  themeTextClass: "text-[#2563eb]", 
  themeBgClass: "bg-[#2563eb]",
  themeIconBgClass: "bg-blue-50",
  features: [
    {
      title: "Premium Comfort",
      description: "Spacious and cozy rooms designed for your comfort.",
      // Raw SVG: Bed
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`
    },
    {
      title: "Daily Housekeeping",
      description: "Impeccable cleanliness for a pleasant stay.",
      // Raw SVG: Sparkles / Cleaning
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M12 3v18"/><path d="M3 12h18"/><path d="m5 5 14 14"/><path d="m5 19 14-14"/></svg>`
    },
    {
      title: "Free Wi-Fi",
      description: "Stay connected anytime, anywhere.",
      // Raw SVG: Wi-Fi
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" stroke-width="2.5"/></svg>`
    },
    {
      title: "24/7 Assistance",
      description: "We're here to help, whenever you need.",
      // Raw SVG: Clock
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`
    }
  ]
};

const roomsSplitData = {
  eyebrow: "Why Choose Us?",
  title: "Designed for Your Comfort,\nBuilt for Your Satisfaction.",
  description: "Every detail in our rooms is carefully curated to provide you with a restful and refreshing stay.",
  bullets: [
    "Spacious, hygenic and well-furnished rooms",
    "Modern amenities for a hassle-free stay",
    "Peaceful atmosphere for better relaxation",
    "Dedicated service for a memorable experience"
  ],
  image: "/images/rooms/split.jpg", // Adjust path as needed
  buttonClass: "border-2 border-solid border-[#2563eb] text-[#2563eb] before:bg-[#2563eb]",
  buttonText: "View Pricing",
  buttonLink: "/pricing",
  themeTextClass: "text-[#2563eb]",
  themeBgClass: "bg-[#2563eb]"
};

const roomsAssureData = {
  eyebrow: "We Assure",
  title: "Quality You Can Trust",
  description: "We are committed to providing you with a restful sanctuary. Every amenity is carefully chosen to ensure your stay is completely hassle-free.",
  themeTextClass: "text-[#2563eb]",
  themeBgClass: "bg-[#2563eb]",
  themeIconBgClass: "bg-blue-50",
  features: [
    {
      title: "Hygienic Rooms",
      description: "Cleaned and sanitized to the highest standards.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`
    },
    {
      title: "Modern Amenities",
      description: "All essential facilities for a convenient stay.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`
    },
    {
      title: "Elevator Facility",
      description: "Elevating your experience, one floor at a time.",
      // Elevator Split Doors SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="3" y="2" width="18" height="20" rx="2"/><line x1="12" y1="2" x2="12" y2="22"/><path d="M8 10l-2-2-2 2"/><path d="M18 14l-2 2-2-2"/></svg>`    },
    {
      title: "24/7 Service",
      description: "Round-the-clock service at your fingertips.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M22 17H2c0-5.5 4.5-10 10-10s10 4.5 10 10Z"/><path d="M12 7V4m-2 0h4"/><path d="M2 21h20"/></svg>`
    },
    {
      title: "High-Speed Wi-Fi",
      description: "Stay connected seamlessly.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" stroke-width="2.5"/></svg>`
    },
    {
      title: "Work Desk",
      description: "A dedicated, well-lit workspace for maximum productivity and comfort.",
      // Re-engineered the provided 256x256 SVG to a clean 24x24 grid
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><line x1="2" y1="7" x2="22" y2="7"/><line x1="4" y1="7" x2="4" y2="19"/><line x1="20" y1="7" x2="20" y2="19"/><line x1="12" y1="7" x2="12" y2="13"/><line x1="4" y1="13" x2="20" y2="13"/><line x1="7" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="17" y2="10"/></svg>`
    },
    {
      title: "Air Conditioning",
      description: "Perfect temperature for total comfort.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="3" y="6" width="18" height="8" rx="2"/><path d="M7 14v4"/><path d="M12 14v4"/><path d="M17 14v4"/><line x1="8" y1="10" x2="16" y2="10"/></svg>`
    },
    {
      title: "Power Backup",
      description: "Uninterrupted comfort during your stay.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="12" x2="14" y2="12"/><line x1="10" y1="8" x2="10" y2="16"/></svg>`
    },
    {
      title: "Storage Space",
      description: "Ample wardrobes and storage for all your belongings.",
      // Drawer / Storage Cabinet SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M4 12h16"/><path d="M10 8h4"/><path d="M10 16h4"/></svg>`
    },
    {
      title: "Free Breakfast",
      description: "Enjoy a complimentary and delicious morning meal to start your day.",
      // Fork and Knife SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`
    },
    {
      title: "CCTV Cameras",
      description: "24/7 surveillance ensuring a secure environment for all guests.",
      // Security Camera SVG
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M16 11l2 2v4M16 11h6M3 15a2 2 0 0 0 2 2h2.5l3.5 3.5a1 1 0 0 0 1.5 0L21 12a1 1 0 0 0 0-1.5l-5-5a1 1 0 0 0-1.5 0Z"/></svg>`
    },
    {
      title: "Ample Parking",
      description: "Spacious and secure parking space.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`
    },

  ]
};

const roomsGalleryData = {
  eyebrow: "Our Amenities",
  title: "Comfort in Every Detail",
  themeTextClass: "text-[#2563eb]",
  themeBgClass: "bg-[#2563eb]",
  images: [
    {
      src: "/images/rooms/amenities/1.jpg",
      alt: "Hotel CAPS room with air conditioning, wardrobe and dressing area",
      width: 600,
      height: 400
    },
    {
      src: "/images/rooms/amenities/2.jpg",
      alt: "Hotel CAPS room with air conditioning, window and seating area",
      width: 400,
      height: 400
    },
    {
      src: "/images/rooms/amenities/3.jpg",
      alt: "Television and entertainment unit inside a Hotel CAPS room",
      width: 600,
      height: 400
    },
    {
      src: "/images/rooms/amenities/4.jpg",
      alt: "Spacious Hotel CAPS room with television, air conditioning and furnished interior",
      width: 711,
      height: 400
    },
    {
      src: "/images/rooms/amenities/5.jpg",
      alt: "Wash basin and mirror in a Hotel CAPS room bathroom",
      width: 300,
      height: 400
    },
    {
      src: "/images/rooms/amenities/6.jpg",
      alt: "Private bathroom with toilet and shower facilities at Hotel CAPS",
      width: 300,
      height: 400
    },
    {
      src: "/images/rooms/amenities/7.jpg",
      alt: "Spacious Hotel CAPS bathroom with shower, toilet, wash basin and mirror",
      width: 400,
      height: 400
    },
    {
      src: "/images/rooms/amenities/8.jpg",
      alt: "Hot water geyser and shower facility in a Hotel CAPS bathroom",
      width: 600,
      height: 400
    },
    {
      src: "/images/rooms/amenities/9.jpg",
      alt: "Elevator facility providing convenient access to Hotel CAPS rooms",
      width: 320,
      height: 400
    },
    {
      src: "/images/rooms/amenities/10.jpg",
      alt: "Parking area available for guests staying at Hotel CAPS",
      width: 600,
      height: 400
    }
  ]
};

const roomsCtaData = {
  eyebrow: "Need a Comfortable Stay?",
  eyebrowColorClass: "text-[#12a5e6]",
  title: "Reserve Your Sanctuary with Us.",
  description: "Enjoy luxurious amenities, daily housekeeping, and peaceful relaxation. Book your stay now.",
  buttonText: "Check Pricing",
  buttonLink: "/pricing",
  bgGradientClass: "bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#38bdf8]",
  buttonTextClass: "text-[#2563eb]",
  // Bed / Comfort Watermark SVG
  watermarkSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="w-full h-full"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`
};

// 1. Core Meta Values
const pageTitle = 'Luxury AC Suites & Rooms | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'Explore Luxury AC Suites and Rooms at Hotel CAPS - Koduvayur, Palakkad. Experience comfortable stays, modern amenities, lift facility & ample car parking.'
const canonicalUrl = 'https://capsfamily.in/rooms'
const ogImage = 'https://capsfamily.in/images/favicons/caps-rooms-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'rooms',
  breadcrumbName: 'Suites & Rooms'
})

</script>

<template>
  <div>
    <PageHero 
      eyebrow="Rest Easy, Wake Inspired."
      title="Suites & Rooms"
      subtitle="Thoughtfully designed rooms and suites for a comfortable stay every time."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-blue-950/70 to-black/70 z-5"
      eyebrowColorClass="text-[#12a5e6]"
      themeColorClass="text-[#1e40af]"
    />

    <PageIntro 
      :eyebrow="roomsIntroData.eyebrow"
      :title="roomsIntroData.title"
      :description="roomsIntroData.description"
      :image="roomsIntroData.image"
      :themeTextClass="roomsIntroData.themeTextClass"
      :themeBgClass="roomsIntroData.themeBgClass"
      :themeIconBgClass="roomsIntroData.themeIconBgClass"
      :features="roomsIntroData.features"
    />

    <PageSplit 
      :eyebrow="roomsSplitData.eyebrow"
      :title="roomsSplitData.title"
      :description="roomsSplitData.description"
      :bullets="roomsSplitData.bullets"
      :image="roomsSplitData.image"
      :buttonClass="roomsSplitData.buttonClass"
      :buttonText="roomsSplitData.buttonText"
      :buttonLink="roomsSplitData.buttonLink"
      :themeTextClass="roomsSplitData.themeTextClass"
      :themeBgClass="roomsSplitData.themeBgClass"
    />
      
    <RoomCategories />
      
    <PageAssure 
      :eyebrow="roomsAssureData.eyebrow"
      :title="roomsAssureData.title"
      :description="roomsAssureData.description"
      :features="roomsAssureData.features"
      :themeTextClass="roomsAssureData.themeTextClass"
      :themeBgClass="roomsAssureData.themeBgClass"
      :themeIconBgClass="roomsAssureData.themeIconBgClass"
    />


    <PageGallery 
      :eyebrow="roomsGalleryData.eyebrow"
      :title="roomsGalleryData.title"
      :images="roomsGalleryData.images"
      :themeTextClass="roomsGalleryData.themeTextClass"
      :themeBgClass="roomsGalleryData.themeBgClass"
    />

    <PageCtaBanner v-bind="roomsCtaData" />

  </div>
</template>
