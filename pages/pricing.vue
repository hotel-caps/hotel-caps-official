<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '~/components/PageHero.vue';
import { roomsData, extraCharges } from '~/roomsData.js';
import RoomDetails from '~/components/RoomDetails.vue';
import RoomGalleryPreview from '~/components/RoomGalleryPreview.vue';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define the data for our hero section
const heroImages = ref([
  '/images/pricing/hero/pricing.jpg'
]);

const main = ref(null);

// --- ANIMATION LOGIC ---
onMounted(() => {

  window.scrollTo(0, 0); // Scrolls to the top (x: 0, y: 0)

  // Use a GSAP context for safe animation management and cleanup
  let ctx = gsap.context(() => {
    const roomCards = gsap.utils.toArray('.room-card');
    
    roomCards.forEach((card, index) => {
      const details = card.querySelector('.room-details-col');
      const gallery = card.querySelector('.room-gallery-col');

      const isReversed = index % 2 !== 0;

      // Animate the two columns in from opposite sides
      gsap.from(details, {
        x: isReversed ? 50 : -50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
        }
      });
      gsap.from(gallery, {
        x: isReversed ? -50 : 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
        }
      });
    });
  }, main.value); // Scope the context to the main container

  onUnmounted(() => {
    ctx.revert(); // Cleanup GSAP animations
  });
});

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

// 1. Core Meta Values
const pageTitle = 'Room Tariffs & Pricing | Hotel CAPS - Koduvayur, Palakkad'
const pageDesc = 'View detailed rates & tariffs for AC Standard, Deluxe & Suite rooms at Hotel CAPS, Koduvayur. Plan your stay in Palakkad with transparent & competitive pricing.'
const canonicalUrl = 'https://capsfamily.in/pricing'
const ogImage = 'https://capsfamily.in/images/favicons/caps-pricing-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'webpage',
  breadcrumbName: 'Suites & Rooms Pricing'
})

</script>

<template>
  <div ref="main">
    <PageHero 
      eyebrow="Exclusive Direct Booking Rates."
      title="Our Pricing"
      subtitle="Transparent and competitive rates for your perfect stay with us."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-sky-950/70 to-black/70 z-5"
      eyebrowColorClass="text-[#0ea5e9]"
      themeColorClass="text-[#075985]"
    />
    
    <PageGallery 
      :eyebrow="roomsGalleryData.eyebrow"
      :title="roomsGalleryData.title"
      :images="roomsGalleryData.images"
      :themeTextClass="roomsGalleryData.themeTextClass"
      :themeBgClass="roomsGalleryData.themeBgClass"
    />

    <div class="bg-white py-16 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Loop through each room and create a card -->
        <div 
          v-for="(room, index) in roomsData" 
          :key="room.id"
          class="room-card grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl p-4 sm:p-6 border-4 border-sky-700 items-center"
        >
          <!-- The layout alternates for each room using the 'order' class, now starting at the LG breakpoint -->
          <div class="room-details-col" :class="{ 'lg:order-2': index % 2 !== 0 }">
            <RoomDetails :room="room" :extraCharges="extraCharges" />
          </div>
          <div class="room-gallery-col" :class="{ 'lg:order-1': index % 2 !== 0 }">
            <RoomGalleryPreview :gallery-images="room.galleryImages" />
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
