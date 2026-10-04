<script setup>
import { ref } from 'vue';
import PageHero from '~/components/PageHero.vue';

// Define the data for our hero section
const heroImages = ref([
  '/images/restaurant/hero/restaurant.jpg'
]);

// Your page-specific JSON payload for Intro Section
const restaurantIntroData = {
  eyebrow: "Welcome to Hotel CAPS",
  title: "Great Food.\nGood Times.",
  description: "At Hotel CAPS, our restaurant is where flavor meets comfort. From traditional favorites to modern delights, every dish is prepared with the finest ingredients and a lot of love.",
  image: "/images/restaurant/intro.jpg",
  themeTextClass: "text-[#03a661]", 
  themeBgClass: "bg-[#03a661]",
  themeIconBgClass: "bg-green-50",
  features: [
    {
      title: "Delicious Cuisine",
      description: "A wide range of dishes crafted to satisfy every palate.",
      // Raw SVG: Cloche / Food Cover
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M22 17H2c0-5.5 4.5-10 10-10s10 4.5 10 10Z"/><path d="M12 7V4m-2 0h4"/><path d="M2 21h20"/></svg>`
    },
    {
      title: "Fresh Ingredients",
      description: "We use only the freshest and finest quality ingredients.",
      // Raw SVG: Leaves
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 0 8.48A11.83 11.83 0 0 1 11 20Z"/><path d="M11 20v-5"/><path d="M11 15a4 4 0 0 1-3-3"/></svg>`
    },
    {
      title: "Hygienic Kitchen",
      description: "Prepared in a clean and hygienic environment.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`            
    },
    {
      title: "Warm Hospitality",
      description: "Friendly service that makes you feel at home.",
      // Raw SVG: Happy Face
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 sm:w-8 sm:h-8"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="2.5"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="2.5"/></svg>`
    }
  ]
};

const restaurantSplitData = {
  eyebrow: "Why Choose Us?",
  title: "Flavors You Love.\nService You Trust.",
  description: "We combine great taste, a cozy atmosphere, and attentive service to create a dining experience you'll love.",
  bullets: [
    "Variety of cuisines to suit every mood",
    "Skilled chefs with a passion for perfection",
    "Clean, comfortable, and family-friendly ambiance",
    "Quality service with attention to detail"
  ],
  image: "/images/restaurant/split.jpg", // Adjust path as needed
  buttonClass: "border-2 border-solid border-[#03a661] text-[#03a661] before:bg-[#03a661]",
  buttonText: "View Menu",
  buttonLink: "/menu",
  themeTextClass: "text-[#03a661]",
  themeBgClass: "bg-[#03a661]"
};

const restaurantAssureData = {
  eyebrow: "We Assure",
  title: "Quality You Can Trust",
  description: "Our commitment to culinary excellence ensures that every meal is not just food, but a delightful and safe dining experience.",
  themeTextClass: "text-[#03a661]",
  themeBgClass: "bg-[#03a661]",
  themeIconBgClass: "bg-green-50",
  features: [
    {
      title: "Fresh & Quality",
      description: "We use only the freshest ingredients, sourced with care.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><rect x="3" y="10" width="18" height="2"/><path d="M6 12v8"/><path d="M18 12v8"/><path d="M8 4h8"/><path d="M4 8h16"/></svg>`
    },
    {
      title: "Hygienic Preparation",
      description: "Strict hygiene standards are followed in every step.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`
    },
    {
      title: "Expert Chefs",
      description: "Our chefs bring skill, experience, and passion to every dish.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>`
    },
    {
      title: "Variety of Choices",
      description: "A wide range of cuisines to suit every taste and preference.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M4 12a8 8 0 0 0 16 0"/><path d="M2 12h20"/><path d="M12 4v3"/><path d="M8 5v2"/><path d="M16 5v2"/></svg>`
    },
    {
      title: "Timely Service",
      description: "We value your time and ensure prompt service.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`
    },
    {
      title: "Cozy Ambience",
      description: "A comfortable and relaxing ambience for a perfect dining experience.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><path d="M2 11h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 11v7"/></svg>`
    },
    {
      title: "Value for Money",
      description: "Great food and service that's worth every penny.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`
    },
    {
      title: "Clean & Safe",
      description: "A clean, safe, and sanitized environment for you and your family.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M9 12l2 2 4-4"/></svg>`
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority in everything we do.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: "Consistent Quality",
      description: "We maintain the same great taste and quality, every time.",
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 sm:w-10 sm:h-10"><circle cx="12" cy="8" r="6"/><path d="M9.5 13.5L8 22l4-2 4 2-1.5-8.5"/><path d="M12 5.5l.7 1.5 1.8.2-1.3 1.2.3 1.7-1.5-.9-1.5.9.3-1.7-1.3-1.2 1.8-.2z"/></svg>`    }
  ]
};

const restaurantGalleryData = {
  eyebrow: "Our Delicacies",
  title: "Flavors That Speak for Us",
  themeTextClass: "text-[#03a661]",
  themeBgClass: "bg-[#03a661]",

  images: [
    {
      src: "/images/restaurant/food/1.jpg",
      alt: "Traditional South Indian breakfast served with chutneys and accompaniments",
      width: 735,
      height: 400
    },
    {
      src: "/images/restaurant/food/2.jpg",
      alt: "Green dosa served with chutney and fresh herbs",
      width: 454,
      height: 400
    },
    {
      src: "/images/restaurant/food/3.jpg",
      alt: "Traditional Kerala meals served on a banana leaf",
      width: 533,
      height: 400
    },
    {
      src: "/images/restaurant/food/4.jpg",
      alt: "Traditional banana leaf wrapped food parcel",
      width: 527,
      height: 400
    },
    {
      src: "/images/restaurant/food/5.jpg",
      alt: "Bread toast served with a savory side dish",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/6.jpg",
      alt: "Hotel CAPS special biryani varieties including chicken, mutton, beef, vegetable and prawns",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/7.jpg",
      alt: "Hotel CAPS mini meals with rice and assorted side dishes",
      width: 300,
      height: 400
    },
    {
      src: "/images/restaurant/food/8.jpg",
      alt: "Grilled chicken pieces served with vegetables and dipping sauce",
      width: 533,
      height: 400
    },
    {
      src: "/images/restaurant/food/9.jpg",
      alt: "Spicy grilled fish served with aromatic rice and lemon",
      width: 435,
      height: 400
    },
    {
      src: "/images/restaurant/food/10.jpg",
      alt: "Grilled fish fillet served with sautéed vegetables",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/11.jpg",
      alt: "Assorted Hotel CAPS dishes served on banana leaves",
      width: 610,
      height: 400
    },
    {
      src: "/images/restaurant/food/12.jpg",
      alt: "Hotel CAPS special Chicken Mughlai with flatbread",
      width: 470,
      height: 400
    },
    {
      src: "/images/restaurant/food/13.jpg",
      alt: "Spiced chicken fry served with fresh herbs",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/14.jpg",
      alt: "Spicy fried fish pieces served on a banana leaf",
      width: 533,
      height: 400
    },
    {
      src: "/images/restaurant/food/15.jpg",
      alt: "Indo-Chinese chicken appetizer garnished with spring onions",
      width: 638,
      height: 400
    },
    {
      src: "/images/restaurant/food/16.jpg",
      alt: "Hotel CAPS special Chicken Patiala curry",
      width: 515,
      height: 400
    },
    {
      src: "/images/restaurant/food/17.jpg",
      alt: "Tandoori-style grilled chicken pieces fresh from the grill",
      width: 300,
      height: 400
    },
    {
      src: "/images/restaurant/food/18.jpg",
      alt: "Creamy chicken curry served with vegetables and herbs",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/19.jpg",
      alt: "Hotel CAPS special Palada Payasam",
      width: 300,
      height: 400
    },
    {
      src: "/images/restaurant/food/20.jpg",
      alt: "Hotel CAPS special Parippu Pradhaman",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/21.jpg",
      alt: "Hotel CAPS buffet counter with a variety of freshly prepared dishes",
      width: 685,
      height: 400
    },
    {
      src: "/images/restaurant/food/22.jpg",
      alt: "Hotel CAPS special beef and chicken Kizhi Porotta",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/23.jpg",
      alt: "Hotel CAPS special pulao varieties with aromatic rice and accompaniments",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/24.jpg",
      alt: "Hotel CAPS special spicy beef curry served with a creamy accompaniment",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/25.jpg",
      alt: "Hotel CAPS biryani and mandi specials with aromatic rice and grilled meat",
      width: 400,
      height: 400
    },
    {
      src: "/images/restaurant/food/26.jpg",
      alt: "Hotel CAPS special Paneer Roast and Mushroom Roast",
      width: 400,
      height: 400
    },
  ]
};

const restaurantCtaData = {
  eyebrow: "Craving Exceptional Cuisine?",
  eyebrowColorClass: "text-[#4bb869]",
  title: "Reserve a Table for Your Next Meal.",
  description: "Visit us for an exquisite dining experience featuring fresh ingredients and delicious options.",
  buttonText: "Check Our Menu",
  buttonLink: "/menu",
  bgGradientClass: "bg-gradient-to-r from-[#14532d] via-[#15803d] to-[#22c55e]",
  buttonTextClass: "text-[#15803d]",
  // Food Plate / Dining Watermark SVG
  watermarkSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="w-full h-full"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`
};

// 1. Core Meta Values
const pageTitle = 'Multi-Cuisine Restaurant | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Enjoy memorable dining at Hotel CAPS, Koduvayur, Palakkad | Delicious dishes, quality service, multiple cuisines, varieties of flavors, snacks, refreshments & more.'
const canonicalUrl = 'https://capsfamily.in/restaurant'
const ogImage = 'https://capsfamily.in/images/favicons/caps-restaurant-og-image.jpg'

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
        "@type": "Restaurant",
        "name": "Hotel CAPS Multi-Cuisine Restaurant",
        "description": pageDesc,
        "url": canonicalUrl,
        "image": ogImage,
        "servesCuisine": [
          "Kerala",
          "Indian",
          "Chinese",
          "Multi-Cuisine"
        ],
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
        "parentOrganization": {
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
      eyebrow="Global Flavors. Local Freshness."
      title="Our Restaurant"
      subtitle="Savour a world of culinary delights crafted uniquely for your taste."
      :images="heroImages"
      imageGradientClass="absolute inset-0 bg-gradient-to-r from-black/90 via-green-950/70 to-black/70 z-5"
      eyebrowColorClass="text-[#4bb869]"
      themeColorClass="text-[#166534]"
    />

    <PageIntro 
      :eyebrow="restaurantIntroData.eyebrow"
      :title="restaurantIntroData.title"
      :description="restaurantIntroData.description"
      :image="restaurantIntroData.image"
      :themeTextClass="restaurantIntroData.themeTextClass"
      :themeBgClass="restaurantIntroData.themeBgClass"
      :themeIconBgClass="restaurantIntroData.themeIconBgClass"
      :features="restaurantIntroData.features"
    />

    <PageSplit 
      :eyebrow="restaurantSplitData.eyebrow"
      :title="restaurantSplitData.title"
      :description="restaurantSplitData.description"
      :bullets="restaurantSplitData.bullets"
      :image="restaurantSplitData.image"
      :buttonClass="restaurantSplitData.buttonClass"
      :buttonText="restaurantSplitData.buttonText"
      :buttonLink="restaurantSplitData.buttonLink"
      :themeTextClass="restaurantSplitData.themeTextClass"
      :themeBgClass="restaurantSplitData.themeBgClass"
    />

    <RestaurantHighlights />

    <PageAssure 
      :eyebrow="restaurantAssureData.eyebrow"
      :title="restaurantAssureData.title"
      :description="restaurantAssureData.description"
      :features="restaurantAssureData.features"
      :themeTextClass="restaurantAssureData.themeTextClass"
      :themeBgClass="restaurantAssureData.themeBgClass"
      :themeIconBgClass="restaurantAssureData.themeIconBgClass"
    />
        
    <PageGallery 
      :eyebrow="restaurantGalleryData.eyebrow"
      :title="restaurantGalleryData.title"
      :images="restaurantGalleryData.images"
      :themeTextClass="restaurantGalleryData.themeTextClass"
      :themeBgClass="restaurantGalleryData.themeBgClass"
    />

    <PageCtaBanner v-bind="restaurantCtaData" />

</div>
</template>
