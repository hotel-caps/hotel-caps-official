<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/about/hero/about.jpg'
]);

// Your page-specific JSON payload for Intro Section
const aboutIntroData = {
  eyebrow: "Welcome to Hotel CAPS",
  title: "More Than a Getaway.\nIt's an Experience.",
  description: "Hotel CAPS is a family-owned hospitality destination committed to offering guests a perfect blend of comfort, warmth, and personalized service.\n\nWhether you're here for business, leisure, or celebration, we ensure every moment with us is truly memorable.",
  image: "/images/about/intro.jpg",
  themeTextClass: "text-[#e98206]",
  themeBgClass: "bg-[#e98206]",
  themeIconBgClass: "bg-amber-50",
  features: [
    {
      title: "Warm Hospitality",
      description: "We treat every guest like family.",
      // Raw SVG: Bed
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`
    },
    {
      title: "Trusted Legacy",
      description: "Years of trust, love & loyalty from our guests.",
      // Raw SVG: Ribbon / Award
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`
    },
    {
      title: "Guest Oriented",
      description: "Your comfort & happiness are our priority.",
      // Raw SVG: Group / Team
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: "Quality First",
      description: "We never compromise on our standards.",
      // Raw SVG: Shield with Star
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8l1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.2-2.3 1.2.5-2.5-1.8-1.7 2.5-.3L12 8z"/></svg>`
    }
  ]
};

const aboutSplitData = {
  eyebrow: "Our Mission",
  title: "Creating Moments.\nBuilding Memories.",
  // Used \n to replicate the paragraph break from the design
  description: "We strive to provide exceptional hospitality through modern amenities, delicious cuisine, and impeccable service.\nEvery detail we create is designed to leave a lasting impression on our guests and partners.",
  bullets: [
    "Hygienic, safe & comfortable stays",
    "Great food, crafted with passion",
    "Perfect venues for every occasion",
    "Exceptional service with a personal touch",
  ],
  image: "/images/about/split.jpg", // Adjust path as needed
  buttonClass: "border-2 border-solid border-[#e98206] text-[#e98206] before:bg-[#e98206]",
  buttonText: "Get in Touch",
  buttonLink: "/contact",
  themeTextClass: "text-[#e98206]",
  themeBgClass: "bg-[#e98206]"
};

const aboutAssureData = {
  eyebrow: "Our Principles",
  title: "Values That Guide Everything We Do",
  description: "These core principles are the foundation of Hotel CAPS. They shape every interaction, decision, and experience we create for our guests.",
  themeTextClass: "text-[#e98206]",
  themeBgClass: "bg-[#e98206]",
  themeIconBgClass: "bg-orange-50",
  features: [
    {
      title: "Integrity",
      description: "We believe in honesty, transparency, and ethical practices.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>`
    },
    {
      title: "Respect",
      description: "We value every individual and treat everyone with dignity and respect.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: "Commitment",
      description: "We are dedicated to our guests, partners, and our community.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
    },
    {
      title: "Sustainability",
      description: "We care for the environment and support a sustainable future.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 0 8.48A11.83 11.83 0 0 1 11 20Z"/><path d="M11 20v-5"/><path d="M11 15a4 4 0 0 1-3-3"/></svg>`
    },
    {
      title: "Teamwork",
      description: "We work together with passion and trust to achieve more.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: "Customer Delight",
      description: "We go the extra mile to create happy, memorable experiences.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5"/></svg>`
    },
    {
      title: "Quality",
      description: "We use the best ingredients, materials, and practices in all we do.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`
    },
    {
      title: "Innovation",
      description: "We embrace new ideas to continually improve and serve you better.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="5"/></svg>`
    }
  ]
};

const aboutGalleryData = {
  eyebrow: "Our Journey",
  title: "Giving Back.\nGrowing Together.",
  themeTextClass: "text-[#e98206]",
  themeBgClass: "bg-[#e98206]",

  images: [
    {
      src: "/images/about/caps-family/1.jpg",
      alt: "Hotel CAPS anniversary celebrations featuring special offers across rooms, restaurant and dining",
      width: 325,
      height: 400
    },
    {
      src: "/images/about/caps-family/2.jpg",
      alt: "Hotel CAPS anniversary cake celebrating another milestone in the journey",
      width: 411,
      height: 400
    },
    {
      src: "/images/about/caps-family/3.jpg",
      alt: "Hotel CAPS team enjoying a special treat arranged for employees",
      width: 500,
      height: 400
    },
    {
      src: "/images/about/caps-family/4.jpg",
      alt: "Hotel CAPS employees sharing a special team meal together",
      width: 500,
      height: 400
    },
    {
      src: "/images/about/caps-family/5.jpg",
      alt: "Hotel CAPS Best Employee of the Month recognition",
      width: 348,
      height: 400
    },
    {
      src: "/images/about/caps-family/6.jpg",
      alt: "Hotel CAPS presenting a token of appreciation to the Nemmara MLA",
      width: 300,
      height: 400
    },
    {
      src: "/images/about/caps-family/7.jpg",
      alt: "Hotel CAPS supporting the local community during Koduvayur Rathotsavam",
      width: 533,
      height: 400
    },
    {
      src: "/images/about/caps-family/8.jpg",
      alt: "Students with the Hotel CAPS team as part of a local school sponsorship initiative",
      width: 350,
      height: 400
    },
    {
      src: "/images/about/caps-family/9.jpg",
      alt: "Hotel CAPS supporting a local club through community sponsorship",
      width: 533,
      height: 400
    },
    {
      src: "/images/about/caps-family/10.jpg",
      alt: "Hotel CAPS sponsoring Souhrida Badminton Club Koduvayur and Smashfest tournament",
      width: 400,
      height: 400
    },
    {
      src: "/images/about/caps-family/11.jpg",
      alt: "Hotel CAPS fourth anniversary celebration marking four years of food, hospitality and memories, powered by Brandsta Interactive",
      width: 600,
      height: 400
    }
  ]
};

const aboutCtaData = {
  eyebrow: "Experience Warm Hospitality",
  eyebrowColorClass: "text-[#FBBF24]",
  title: "We're Ready to Welcome You.",
  description: "Whether for business, leisure, or dining, reach out to our team for inquiries and reservations.",
  buttonText: "Get in Touch",
  buttonLink: "/contact",
  bgGradientClass: "bg-gradient-to-r from-[#78350f] via-[#d18108] to-[#f59e0b]",
  buttonTextClass: "text-[#d18108]",
  // Ribbon / Excellence Watermark SVG
  watermarkSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="w-full h-full"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`
};

// 1. Core Meta Values
const pageTitle = 'About Us & Our Journey | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'Discover Hotel CAPS - Koduvayur, Palakkad, and learn about our vision, mission, team, hospitality values, and commitment to giving back to our community.'
const canonicalUrl = 'https://capsfamily.in/about'
const ogImage = 'https://capsfamily.in/images/favicons/caps-about-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'about',
  breadcrumbName: 'About Us'
})

</script>

<template>
  <div>
    <PageHero 
      eyebrow="Our Story. Our Promise."
      title="About Us"
      subtitle="A legacy of hospitality built on trust, passion and a commitment to provide exceptional experiences."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-yellow-950/70 to-black/70 z-5"
      eyebrowColorClass="text-[#FBBF24]"
      themeColorClass="text-[#854d0e]"
    />

    <PageIntro 
      :eyebrow="aboutIntroData.eyebrow"
      :title="aboutIntroData.title"
      :description="aboutIntroData.description"
      :image="aboutIntroData.image"
      :themeTextClass="aboutIntroData.themeTextClass"
      :themeBgClass="aboutIntroData.themeBgClass"
      :themeIconBgClass="aboutIntroData.themeIconBgClass"
      :features="aboutIntroData.features"
    />

    <PageSplit 
      :eyebrow="aboutSplitData.eyebrow"
      :title="aboutSplitData.title"
      :description="aboutSplitData.description"
      :bullets="aboutSplitData.bullets"
      :image="aboutSplitData.image"
      :buttonClass="aboutSplitData.buttonClass"
      :buttonText="aboutSplitData.buttonText"
      :buttonLink="aboutSplitData.buttonLink"
      :themeTextClass="aboutSplitData.themeTextClass"
      :themeBgClass="aboutSplitData.themeBgClass"
    />

    <AboutQuote />

    <PageAssure 
      :eyebrow="aboutAssureData.eyebrow"
      :title="aboutAssureData.title"
      :description="aboutAssureData.description"
      :features="aboutAssureData.features"
      :themeTextClass="aboutAssureData.themeTextClass"
      :themeBgClass="aboutAssureData.themeBgClass"
      :themeIconBgClass="aboutAssureData.themeIconBgClass"
    />

    <PageGallery 
      :eyebrow="aboutGalleryData.eyebrow"
      :title="aboutGalleryData.title"
      :images="aboutGalleryData.images"
      :themeTextClass="aboutGalleryData.themeTextClass"
      :themeBgClass="aboutGalleryData.themeBgClass"
    />

    <PageCtaBanner v-bind="aboutCtaData" />

</div>
</template>
