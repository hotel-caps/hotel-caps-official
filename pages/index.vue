<script setup>

const { data: fetchedBlogs } = await useAsyncData('blog-list', () => $fetch('/api/blog'))

// 2. Wrap the assignment in computed() to maintain reactivity
const blogs = computed(() => fetchedBlogs.value || []);

const homeGalleryData = {
  homeEyebrow: "Explore",
  title: "Nearby Tourist Attractions",
  themeTextClass: "text-[#005F61]",
  themeBgClass: "bg-[#06b6d4]",
  images: [
    { src: "/images/home/tourism/1.jpg", alt: "Kava View Point", width: 655, height: 400 },
    { src: "/images/home/tourism/2.jpg", alt: "Nelliyampathy Hills", width: 600, height: 400 },
    { src: "/images/home/tourism/3.jpg", alt: "Malampuzha Dam", width: 700, height: 400 },
    { src: "/images/home/tourism/4.jpg", alt: "Pothundi Park", width: 600, height: 400 },
    { src: "/images/home/tourism/5.jpg", alt: "Koduvayur Ratholsavam", width: 600, height: 400 },
    { src: "/images/home/tourism/6.jpg", alt: "Seethargundu Viewpoint", width: 711, height: 400 },
    { src: "/images/home/tourism/7.jpg", alt: "Malampuzha Park", width: 711, height: 400 },
    { src: "/images/home/tourism/8.jpg", alt: "Pallavur Hill Temple", width: 626, height: 400 },
  ]
};

// 1. Core Meta Values
const pageTitle = 'Hotel CAPS Koduvayur | Rooms, Restaurant & Auditorium'
const pageDesc = 'Stay, Dine & Celebrate at Hotel CAPS - Koduvayur, Palakkad. AC Luxury Rooms, Multi-Cuisine Restaurant & Auditorium. Catering, Free Delivery, Lift & Car Parking.' 
const canonicalUrl = 'https://capsfamily.in/' // Added trailing slash for consistency
const ogImage = 'https://capsfamily.in/images/favicons/caps-home-og-image.jpg'

// 2. Master SEO, Sitelinks Navigation & JSON-LD Injection
useCapsSeo({
  pageTitle,
  pageDesc,
  canonicalUrl,
  ogImage,
  pageType: 'home'
})

</script>

<template>
  <div>
    <HomeHero />
    <Features /> 
    <About />
    <CapsTouch />
    <ThematicSections />
    <BlogSection :blogs="blogs" />
    <Achievements />
    <PageGallery 
      :homeEyebrow="homeGalleryData.homeEyebrow"
      :title="homeGalleryData.title"
      :images="homeGalleryData.images"
      :themeTextClass="homeGalleryData.themeTextClass"
    />
    <Testimonials />
    <GetInTouch />
  </div>
</template>
