<script setup>
// Import ref, shallowRef, and the definitive fix: markRaw
import { ref, shallowRef, markRaw } from 'vue';// Import our new custom SVG icon components
import IconFacebook from '~/components/icons/IconFacebook.vue';
import IconInstagram from '~/components/icons/IconInstagram.vue';
import IconEnvelope from '~/components/icons/IconEnvelope.vue';
import IconPhone from '~/components/icons/IconPhone.vue';

// --- DATA-DRIVEN LINKS ---
const socialLinks = shallowRef([
  { name: 'Facebook', aria: 'Facebook', href: 'https://www.facebook.com/hotelcapsfamily/', icon: markRaw(IconFacebook), color: "text-blue-600 hover:text-blue-700" },
  { name: 'Instagram', aria: 'Instagram', href: 'https://www.instagram.com/hotelcapsfamily/', icon: markRaw(IconInstagram), color: "text-pink-600 hover:text-pink-700", }
]);


// Footer Navigation Columns - ref is fine here as it contains no components
const footerNav = ref([
  { text: 'Home', href: '/' },
  { text: 'Rooms', href: '/rooms' },
  { text: 'Restaurant', href: '/restaurant' },
  { text: 'Auditorium', href: '/hall' },
  { text: 'About Us', href: '/about' },
  { text: 'Pricing', href: '/pricing' },
  { text: 'Our Menu', href: '/menu' },
  { text: 'Live', href: '/live' },
  { text: 'Our Catering', href: '/catering' }, 
  { text: 'Contact Us', href: '/contact' }
]);
</script>

<template>
  <footer class="bg-zinc-900 text-stone-300">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-12 lg:px-8">

      <div class="flex justify-center items-center">
        <NuxtLink to="/" class="flex flex-col items-center">
          <img class="h-[5rem] w-[5.618rem]" src="/images/caps-solid-logo.png" alt="Hotel CAPS Logo" />
          <div class="text-white flex flex-col items-center font-display">
            <p class="text-xl font-medium tracking-widest leading-loose">HOTEL</p>
            <p class="text-3xl font-bold tracking-widest -mt-1">CAPS</p>
          </div>
        </NuxtLink>
      </div>

      <div class="flex flex-col mt-6 mb-0 justify-around w-full md:flex-row flex-wrap md:flex-nowrap">

          <div class="flex md:w-64 items-center h-16 gap-4 mb-4 justify-center md:justify-start md:items-center">
            <p class="font-sans">Follow us: </p>
            <div class="flex space-x-4">
              <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank" class="">
                <component :is="social.icon" :aria-label="social.aria" class="w-6 h-6 transition-all duration-300 hover:brightness-90" :class="social.color" />
              </a>
            </div>
          </div>

          <div class="flex flex-col items-center md:w-96 mb-8">
            <p class="font-sans mb-2 text-center leading-loose">Hotel CAPS - Main Road, Pittupeedika, Koduvayur, Palakkad, Kerala, India - 678501.</p>
            <a href="capsfamilybakes@gmail.com" aria-label="E-Mail" class="flex items-center text-stone-200 transition-all duration-300 hover:text-[#d99706] hover:underline">
              <IconEnvelope class="w-5 h-5 mr-2" />
              <span>capsfamilybakes@gmail.com</span>
            </a>
          </div>

          <div class="flex md:w-64 h-16 flex-col items-center md:items-end mb-4 md:justify-center space-y-2 font-sans">
            <a href="tel:+919207517064" aria-label="Phone Number" class="flex items-center text-stone-200 transition-all duration-300 hover:text-[#d99706] hover:underline">
              <IconPhone class="w-5 h-5 mr-2" />
              <span>+91 92075 17064</span>
            </a>
            <a href="tel:+918848369567" aria-label="Phone Number" class="flex items-center text-stone-200 transition-all duration-300 hover:text-[#d99706] hover:underline">
              <IconPhone class="w-5 h-5 mr-2" />
              <span>+91 8848 369 567</span>
            </a>
          </div>
      </div>

      <!-- Bottom Navigation Links -->
      <div class="border-t border-stone-700 pt-8">
            <p class="font-sans text-center mb-4">Page links: </p>
        <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <template v-for="(link, index) in footerNav" :key="index">
            <!-- Add a divider dot before each link -->
            <!-- <li class="text-stone-300" aria-hidden="true">&bull;</li> -->
            <li>
              <NuxtLink :to="link.href" class="text-base text-stone-200 hover:text-[#d99706] transition-colors duration-300 hover:underline">{{ link.text }}</NuxtLink>
            </li>
            <!-- Add a divider dot after the last one -->
            <!-- <li v-if="index === footerNav.length - 1" class="text-stone-300" aria-hidden="true">&bull;</li> -->
          </template>
        </ul>
      </div>
      
      <!-- Bottom Bar (Copyright, etc.) -->
      <div class="mt-12 border-t border-stone-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p class="text-stone-200 order-1">&copy; 2026 Hotel CAPS. All rights reserved.</p>

        <div class="flex space-x-4 order-2 sm:order-3 mt-4 sm:mt-0">
          <NuxtLink to="/policy" class="text-stone-200 transition-all duration-300 hover:text-[#d99706] hover:underline">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="text-stone-200 transition-all duration-300 hover:text-[#d99706] hover:underline">Terms & Conditions</NuxtLink>
        </div>
      </div>
      

    </div>
  </footer>
</template>
