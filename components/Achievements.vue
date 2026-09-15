<template>
  <section id="achievements-section" class="bg-stone-300 pt-12 pb-16 lg:pt-20 lg:pb-28 dotted-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 md:mb-16">
        <p 
          class="font-sans text-sm font-bold uppercase tracking-widest mb-2 text-stone-500"
        >
          Our Stats
        </p>
        <h2 class=" text-gray-800 text-3xl sm:text-4xl text-center lg:text-4xl font-display font-semibold tracking-wider mt-2">Our Achievements in Numbers</h2>
      </div>
      <div class="flex flex-wrap justify-center gap-4 sm:gap-8">

        <div 
          v-for="(stat, index) in achievements" 
          :key="index"
          class="achievement-card p-4 sm:p-6 lg:p-10 rounded-xl shadow-lg text-center flex flex-col items-center justify-center aspect-square  w-[calc(47%)] sm:w-[calc(33.33%-1.5rem)] md:w-[calc(25%-1.5rem)]"
          :class="[stat.colorClass,stat.shadowClass]"
        >
          <component :is="stat.iconComponent" class="text-4xl sm:text-5xl  w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14 p-2 rounded-full" :class="stat.iconBg" weight="regular" />
          <h3 :class="stat.colorClass" class="font-number text-4xl sm:text-5xl lg:text-7xl font-semibold mt-4">
            <span :ref="el => { if (el) statNumbers[index] = el }">{{ stat.startNumber }}</span>{{ stat.suffix }}
          </h3>
          <p class="mt-2 text-sm sm:text-base text-gray-600 tracking-wide">{{ stat.label }}</p>
          <!-- Bottom Accent Line -->
          <div 
            class="w-10 h-1 rounded-full mt-4"
            :class="stat.lineBg"
          ></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { shallowRef, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhUsersThree, PhForkKnife, PhCalendarCheck, PhSparkle } from '@phosphor-icons/vue';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Data for our achievement cards. To add/edit a card, just change this array.
const achievements = shallowRef([
  { 
    iconComponent: PhUsersThree, 
    iconBg: 'bg-blue-100',
    shadowClass: 'shadow-blue-500/20 hover:shadow-blue-500/40',
    lineBg: 'bg-blue-600',
    colorClass: 'bg-white text-blue-600',
    startNumber: 0,
    targetNumber: 10, 
    suffix: 'K+', 
    label: 'Guests Hosted' 
  },
  { 
    iconComponent: PhForkKnife, 
    iconBg: 'bg-emerald-100',
    shadowClass: 'shadow-emerald-500/20 hover:shadow-emerald-500/40',
    lineBg: 'bg-emerald-600',
    colorClass: 'bg-white text-emerald-600',
    startNumber: 0,
    targetNumber: 400, 
    suffix: 'K+', 
    label: 'Customers Served' 
  },
  { 
    iconComponent: PhCalendarCheck, 
    iconBg: 'bg-rose-100',
    shadowClass: 'shadow-rose-500/20 hover:shadow-rose-500/40',
    lineBg: 'bg-rose-500',
    colorClass: 'bg-white text-rose-500',
    startNumber: 0,
    targetNumber: 400, 
    suffix: '+', 
    label: 'Events Conducted' 
  },
  { 
    iconComponent: PhSparkle, 
    iconBg: 'bg-amber-100',
    shadowClass: 'shadow-amber-500/20 hover:shadow-amber-500/40',
    lineBg: 'bg-amber-500',
    colorClass: 'bg-white text-amber-500',
    startNumber: 0,
    targetNumber: 100, 
    suffix: '%', 
    label: 'Fulfilling Experience' 
  }
]);

// An array to hold the references to our number spans
const statNumbers = ref([]);

onMounted(() => {
  // --- Animate Cards into view ---
  gsap.from(".achievement-card", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#achievements-section",
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });

  // --- Animate each number counting up ---
  statNumbers.value.forEach((el, index) => {
    const stat = achievements.value[index];
    const proxy = { val: stat.startNumber };

    gsap.to(proxy, {
      val: stat.targetNumber,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        el.textContent = Math.floor(proxy.val); // Update the text content on each frame
      }
    });
  });
});
</script>

<style scoped>
/* Subtle dotted background grid matching the design */
.dotted-bg {
  background-image: radial-gradient(circle at 1.5px 1.5px, rgba(0, 0, 0, 0.05) 1.5px, transparent 0);
  background-size: 24px 24px;
}
.font-serif-thin {
    font-family: 'Faculty Glyphic', serif;
}
</style>