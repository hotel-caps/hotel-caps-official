<script setup>
import { shallowRef, markRaw } from 'vue';
import ThematicSection from './ThematicSection.vue';
import { PhHouseLine, PhBed, PhForkKnife, PhConfetti } from '@phosphor-icons/vue';

// The single source of truth for all thematic sections.
// Image paths have been updated to your new themed assets.
const sections = shallowRef([
  {
    theme: 'amber',
    align: 'right',
    imageSrc: '/images/home/themed/caps-theme.jpg',
    imageAlt: 'The exterior of Hotel CAPS',
    category: 'About',
    title: 'The CAPS Story',
    description: "Born from a vision to create a landmark of hospitality, Hotel CAPS blends modern luxury with timeless tradition. We've created a haven for travelers and locals alike, where every service is designed with our guests' comfort in mind.",
    buttonText: 'Explore CAPS',
    buttonLink: '/about',
    icon: markRaw(PhHouseLine)
  },
  {
    theme: 'blue',
    align: 'left',
    imageSrc: '/images/home/themed/rooms-theme.jpg',
    imageAlt: 'A luxurious and comfortable hotel room at Hotel CAPS',
    category: 'Rooms',
    title: 'Sanctuary of Comfort',
    description: "Step into a world of tranquility in our exquisitely designed rooms. Each space blends comfort and style with modern amenities, ensuring a restful stay. From plush bedding to fresh ambience, we've curated every detail for an unforgettable experience.",
    buttonText: 'Explore Our Rooms',
    buttonLink: '/rooms',
    icon: markRaw(PhBed)
  },
  {
    theme: 'green',
    align: 'right',
    imageSrc: '/images/home/themed/restaurant-theme.jpg',
    imageAlt: 'The elegant dining area of the multi-cuisine restaurant',
    category: 'Restaurant',
    title: 'A Culinary Journey',
    description: "Embark on an epicurean adventure at our multi-cuisine restaurant. Our chefs prepare a symphony of flavors, from authentic Keralan delicacies to global favorites. Every dish is a celebration of taste served with a touch of homely flavor.",
    buttonText: 'Explore Restaurant',
    buttonLink: '/restaurant',
    icon: markRaw(PhForkKnife)
  },
  {
    theme: 'pink',
    align: 'left',
    imageSrc: '/images/home/themed/hall-theme.jpg',
    imageAlt: 'A grand and beautifully decorated auditorium for events',
    category: 'Auditorium',
    title: 'Celebrate in Style',
    description: "From grand weddings to corporate conferences, our auditorium provides the perfect backdrop for any occasion. Equipped with modern technology and versatile seating, our hall can be tailored to make your celebration spectacular.",
    buttonText: 'Explore Our Hall',
    buttonLink: '/hall',
    icon: markRaw(PhConfetti)
  }
]);
</script>

<template>
  <div class="bg-gradient-to-b from-slate-200 to-stone-200 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-28 space-y-12">
    <ThematicSection
      v-for="(section, index) in sections"
      :key="index"
      :theme="section.theme"
      :align="section.align"
      :image-src="section.imageSrc"
      :image-alt="section.imageAlt"
      :category="section.category"
      :title="section.title"
      :description="section.description"
      :button-text="section.buttonText"
      :button-link="section.buttonLink"
      :icon="section.icon"
    />
  </div>
</template>
