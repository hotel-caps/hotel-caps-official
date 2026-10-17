<template>
  <section class="bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div ref="headerRef" class="text-center mb-16 sm:mb-20">
        <span class="legal-header-item block font-['Julee'] text-xl sm:text-2xl text-zinc-500 mb-3">
          {{ privacyData.eyebrow }}
        </span>
        <h1 class="legal-header-item font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-900 tracking-tight mb-6">
          {{ privacyData.title }}
        </h1>
        <div class="legal-header-item w-24 h-1 bg-zinc-200 mx-auto mb-6"></div>
        <p class="legal-header-item font-sans text-sm sm:text-base text-zinc-500 uppercase tracking-widest">
          Last Updated: {{ privacyData.lastUpdated }}
        </p>
      </div>

      <!-- Legal Content Blocks -->
      <div class="space-y-16 sm:space-y-20">
        <div 
          v-for="(section, index) in privacyData.sections" 
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
const privacyData = {
  eyebrow: "Data Protection",
  title: "Privacy Policy",
  lastUpdated: "August 12, 2026",
  sections: [
    {
      heading: "1. Information We Collect",
      paragraphs: [
        "At Hotel CAPS, we are committed to protecting your privacy. Whether you are booking a suite, reserving an event hall, or requesting catering services, we collect information to ensure a seamless and personalized experience."
      ],
      bullets: [
        "Personal Identification: Full name, email address, phone number, and physical address.",
        "Reservation Data: Check-in/check-out dates, event dates, guest counts, and special dietary requirements.",
        "Payment Information: Credit card details and billing addresses (processed securely via encrypted third-party gateways)."
      ]
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: [
        "The data we collect is strictly used to fulfill our hospitality and service obligations to you. We do not sell your personal data to third parties under any circumstances."
      ],
      bullets: [
        "To process hotel bookings and finalize event hall agreements.",
        "To customize catering menus and accommodate specific allergy or dietary requests.",
        "To send booking confirmations, receipts, and important pre-arrival communications."
      ]
    },
    {
      heading: "3. Data Sharing & Third Parties",
      paragraphs: [
        "In order to provide top-tier service, we may share minimal necessary data with trusted partners, such as payment processors or event coordinators, strictly for operational purposes."
      ],
      bullets: [
        "All third-party partners are vetted for strict compliance with data security standards.",
        "We may disclose information if required by law or to protect the safety and rights of our guests and staff."
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
      // Find all animateable items inside this specific section
      const items = section.querySelectorAll('.legal-content-item');
      
      gsap.from(items, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%', // Triggers when the section scrolls into view
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