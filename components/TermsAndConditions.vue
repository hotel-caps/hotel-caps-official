<template>
  <section class="bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div ref="headerRef" class="text-center mb-16 sm:mb-20">
        <span class="legal-header-item block font-['Julee'] text-xl sm:text-2xl text-zinc-500 mb-3">
          {{ termsData.eyebrow }}
        </span>
        <h1 class="legal-header-item font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-900 tracking-tight mb-6">
          {{ termsData.title }}
        </h1>
        <div class="legal-header-item w-24 h-1 bg-zinc-200 mx-auto mb-6"></div>
        <p class="legal-header-item font-sans text-sm sm:text-base text-zinc-500 uppercase tracking-widest">
          Last Updated: {{ termsData.lastUpdated }}
        </p>
      </div>

      <!-- Legal Content Blocks -->
      <div class="space-y-16 sm:space-y-20">
        <div 
          v-for="(section, index) in termsData.sections" 
          :key="index"
          class="legal-section-block flex flex-col items-start"
        >
          <!-- Section Heading -->
          <h2 class="legal-content-item font-display font-bold text-2xl sm:text-3xl text-zinc-900 mb-6">
            {{ section.heading }}
          </h2>
          
          <!-- Paragraphs -->
          <p 
            v-for="(paragraph, pIndex) in section.paragraphs" 
            :key="`p-${pIndex}`"
            class="legal-content-item font-sans text-base sm:text-lg text-zinc-600 leading-relaxed mb-6 w-full"
          >
            {{ paragraph }}
          </p>

          <!-- Bullet Points -->
          <ul v-if="section.bullets && section.bullets.length" class="w-full space-y-4 mt-2">
            <li 
              v-for="(bullet, bIndex) in section.bullets" 
              :key="`b-${bIndex}`"
              class="legal-content-item flex items-start text-left w-full"
            >
              <!-- Elegant Diamond Bullet -->
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 mt-2 flex-shrink-0 mr-4 text-zinc-400 rotate-45">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              <span class="font-sans text-base sm:text-lg text-zinc-600 leading-relaxed">
                {{ bullet }}
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- JSON DATA ---
const termsData = {
  eyebrow: "Legal Agreements",
  title: "Terms & Conditions",
  lastUpdated: "August 12, 2026",
  sections: [
    {
      heading: "1. Hotel Reservations & Cancellations",
      paragraphs: [
        "To guarantee your room reservation at Hotel CAPS, a valid credit card or advance deposit is required at the time of booking. By confirming a booking, you agree to our standard operating policies."
      ],
      bullets: [
        "Standard check-in time is from 2:00 PM; Check-out time is strictly 11:00 AM.",
        "Cancellations made within 48 hours of the scheduled arrival will incur a fee equivalent to one night's stay.",
        "A valid government-issued photo ID is mandatory for all guests upon arrival."
      ]
    },
    {
      heading: "2. Events Hall & Venue Usage",
      paragraphs: [
        "Our events hall is a premium space designed for celebrations and corporate functions. Guests booking the hall are responsible for the conduct of their attendees and any external vendors they contract."
      ],
      bullets: [
        "A non-refundable 30% deposit is required to secure your event date.",
        "Any damage caused to the hall, technical equipment, or hotel property will be billed directly to the primary booking contact.",
        "Noise restrictions apply after 11:00 PM to ensure the comfort of our hotel guests."
      ]
    },
    {
      heading: "3. Restaurant & Catering Services",
      paragraphs: [
        "We strive to provide exceptional culinary experiences. To maintain our high standards of food safety and service quality, we enforce strict guidelines regarding food consumption on our premises."
      ],
      bullets: [
        "Outside food and beverages are strictly prohibited in the restaurant and events hall.",
        "For bulk catering orders, the final guest count must be confirmed 72 hours prior to the event.",
        "We will make every effort to accommodate dietary restrictions, provided they are communicated at least 48 hours in advance."
      ]
    }
  ]
};

// --- REFS & STATE ---
const headerRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

// --- ANIMATION LOGIC ---
const initScrollAnimation = () => {
  ctx = gsap.context(() => {
    
    // 1. Animate Header First
    gsap.from('.legal-header-item', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // 2. Map through each content block and attach a unique ScrollTrigger
    const sections = gsap.utils.toArray('.legal-section-block');
    
    sections.forEach((section) => {
      const items = section.querySelectorAll('.legal-content-item');
      
      gsap.from(items, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    });

  });
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (!isInitialAppLoad.value) {
    setTimeout(() => { initScrollAnimation(); ScrollTrigger.refresh(); }, 600);
  } else {
    const unwatch = watch(isInitialAppLoad, async (isStillLoading) => {
      if (!isStillLoading) {
        await nextTick();
        setTimeout(() => { initScrollAnimation(); ScrollTrigger.refresh(); }, 50); 
        unwatch();
      }
    });
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>