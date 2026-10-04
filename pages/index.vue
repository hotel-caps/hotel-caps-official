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
const pageTitle = 'Hotel CAPS - Luxury Rooms, Restaurant, Auditorium, Koduvayur'
const pageDesc = 'Welcome to Hotel CAPS - Koduvayur, Palakkad | Luxury Suites & Rooms | Multi-Cuisine Restaurant | Auditorium Hall | Outdoor Catering | Free Home Delivery'
const canonicalUrl = 'https://capsfamily.in/' // Added trailing slash for consistency
const ogImage = 'https://capsfamily.in/images/favicons/caps-home-og-image.jpg'

// 2. Structured Link and Global Injection
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": "Hotel CAPS",
        "description": pageDesc,
        "url": canonicalUrl,
        "image": ogImage,
        "logo": "https://capsfamily.in/images/caps-solid-logo.png",
        "email": "capsfamilybakes@gmail.com",
        "telephone": [
          "+919207517064",
          "+918848369567"
        ],
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Road, Pittupeedika",
          "addressLocality": "Koduvayur",
          "addressRegion": "Kerala",
          "postalCode": "678501",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "10.680926464534636",
          "longitude": "76.65040838503162"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Luxury Rooms", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Multi-Cuisine Restaurant", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Auditorium Hall", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Outdoor Catering", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Free Home Delivery", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Ample Car Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Elevator", "value": true }
        ]
      })
    }
  ]
})

// 3. Nuxt 4 Composable mapping both Search Engines and Social Cards
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
