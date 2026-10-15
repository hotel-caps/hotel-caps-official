<script setup>
import { shallowRef, markRaw, ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import YoutubePlayer from './YoutubePlayer.vue';

// Import the Phosphor Icons we'll need for the services list
import { 
  PhBed, 
  PhForkKnife, 
  PhProjectorScreenChart, 
  PhMotorcycle, 
  PhUsersThree 
} from '@phosphor-icons/vue';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- DATA-DRIVEN SERVICES LIST ---
// Now includes specific color classes for each icon.
const services = shallowRef([
  { 
    text: 'Suites and Rooms', 
    icon: markRaw(PhBed),
    iconBgClass: 'bg-amber-100',
    iconColorClass: 'text-amber-800'
  },
  { 
    text: 'Multi-Cuisine Restaurant', 
    icon: markRaw(PhForkKnife),
    iconBgClass: 'bg-emerald-100',
    iconColorClass: 'text-emerald-700'
  },
  { 
    text: 'Auditorium and Events Hall', 
    icon: markRaw(PhProjectorScreenChart),
    iconBgClass: 'bg-pink-100',
    iconColorClass: 'text-pink-700'
  },
  { 
    text: 'High Speed Food Delivery', 
    icon: markRaw(PhMotorcycle),
    iconBgClass: 'bg-red-100',
    iconColorClass: 'text-red-700'
  },
  { 
    text: 'Outdoor Catering Services', 
    icon: markRaw(PhUsersThree),
    iconBgClass: 'bg-blue-100',
    iconColorClass: 'text-blue-700'
  }
]);

// A ref to hold the main section element for GSAP context
const main = ref(null);

// --- ANIMATION LOGIC ---
onMounted(() => {
  let ctx = gsap.context(() => {
    // Staggered animation for the text content
    gsap.from('.stagger-item', {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.2, // This creates the beautiful cascading effect
      scrollTrigger: {
        trigger: main.value,
        start: 'top 70%'
      }
    });

    // Animation for the video player
    gsap.from('.caps-touch-video', {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: main.value,
        start: 'top 70%'
      }
    });
  }, main.value);

  onUnmounted(() => {
    ctx.revert();
  });
});
</script>

<template>
  <section ref="main" class="bg-white py-12 lg:py-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main flex container that handles responsive layout changes -->
      <div class="flex flex-col md:flex-row md:items-center md:gap-2 lg:gap-4">

        <!-- Left Column: Text Content -->
        <div class="caps-touch-text w-full md:w-1/2 lg:w-2/5 text-center md:text-left">
          <p class="stagger-item font-sans text-sm font-bold uppercase tracking-widest text-amber-500">Services</p>
          <h2 class="stagger-item text-gray-800 text-3xl sm:text-4xl lg:text-4xl font-display font-semibold tracking-wider mt-2">The CAPS Touch</h2>
          
          <ul class="mt-6 space-y-4 inline-block text-left">
            <li v-for="service in services" :key="service.text" class="flex stagger-item items-center">
              <!-- This div now uses the dynamic color classes from our data -->
              <div 
                class="rounded-full p-2 mr-4"
                :class="[service.iconBgClass, service.iconColorClass]"
              >
                <component :is="service.icon" :size="'1em'" class="text-2xl" weight="duotone" />
              </div>
              <span class="font-body text-lg text-gray-700">{{ service.text }}</span>
            </li>
          </ul>
        </div>

        <!-- Right Column: YouTube Player -->
        <div class="caps-touch-video lg:pt-4 w-full md:w-1/2 lg:w-3/5 mt-12 md:mt-0">
            <YoutubePlayer video-id="sG7o4QRN6_g" />
        </div>

      </div>
    </div>
  </section>
</template>
