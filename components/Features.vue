<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Data for the feature cards. To add or change a card, you only need to edit this array.
const features = ref([
  {
    image: '/images/home/plan-cards/rooms.jpg',
    alt: 'Elegant hotel room with a comfortable bed',
    title: 'Book a Stay',
    description: 'Discover our elegant rooms and suites designed for your ultimate comfort.',
    buttonText: 'Explore Rooms',
    buttonLink: '/rooms',
    buttonClass: 'bubble-button-blue'
  },
  {
    image: '/images/home/plan-cards/restaurant.jpg',
    alt: 'Modern restaurant with stylish seating',
    title: 'Family Dinner',
    description: 'Treat your loved ones to a memorable dining experience at our restaurant.',
    buttonText: 'View Menu',
    buttonLink: '/menu',
    buttonClass: 'bubble-button-green'
  },
  {
    image: '/images/home/plan-cards/hall.jpg',
    alt: 'Spacious and decorated auditorium hall for events',
    title: 'Book an Event',
    description: 'Host your special occasions in our state-of-the-art auditorium.',
    buttonText: 'See Hall',
    buttonLink: '/hall',
    buttonClass: 'bubble-button-pink'
  }
]);

// GSAP animation logic
onMounted(() => {
    
    gsap.set(".feature-card", { y: 60, opacity: 0 });
    gsap.to(".feature-card", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
            trigger: "#features",
            start: "top 65%",
            toggleActions: "play none none none",
        }
    });
});
</script>

<template>
  <section id="features" class="w-full bg-gradient-to-b from-stone-200 to-slate-200 py-16 lg:py-28 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <p class="stagger-item font-sans text-sm font-bold uppercase tracking-widest text-teal-600 mb-2">Choose your day</p>
      <h2 class="text-3xl lg:text-4xl font-display font-bold tracking-wide text-gray-800 mb-16 leading-tight">What do you feel like doing today?</h2>
      
      <div class="flex flex-wrap items-stretch justify-center gap-10">
        
        <!-- The v-for loop creates each card from our data array -->
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="feature-card group block bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-5 w-[92%] sm:w-[80%] md:w-[45%] lg:w-[30%]"
        >
          <div class="relative overflow-hidden">
            <NuxtImg 
              :src="feature.image" 
              :alt="feature.alt" 
              width="600"
              height="400"
              sizes="380px sm:580px md:360px lg:420px xl:600px"
              quality="80"
              format="webp"
              densities="x1"
              loading="lazy"
              decoding="async"
              class="w-full aspect-[3/2] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
          <div class="p-4 text-left">
            <h3 class="text-2xl font-display font-bold tracking-wider text-gray-800 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 mb-6">{{ feature.description }}</p>
            <NuxtLink 
              :to="feature.buttonLink" 
              class="bubble-button-base font-display tracking-wider font-semibold py-2 px-5 rounded-lg"
              :class="feature.buttonClass"
            >
              {{ feature.buttonText }} &rarr;
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scoped styles ensure these rules ONLY apply to this component */

/* --- Custom Button with Side-Fill Effect --- */
.bubble-button-base {
  position: relative;
  overflow: hidden;
  display: inline-block;
  transition: color 0.4s ease-in-out;
  z-index: 1;
}
.bubble-button-base::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.7, 0, 0.2, 1);
  z-index: -1;
}
.bubble-button-base:hover { 
  color: white; 
}
.bubble-button-base:hover::before { 
  transform: scaleX(1); 
}

/* Blue Button */
.bubble-button-blue { 
  border: 2px solid #2563eb; 
  color: #2563eb; 
}
.bubble-button-blue::before { 
  background-color: #2563eb; 
}

/* Green Button */
.bubble-button-green { 
  border: 2px solid #03a661; 
  color: #03a661; 
}
.bubble-button-green::before { 
  background-color: #03a661; 
}

/* Pink Button */
.bubble-button-pink { 
  border: 2px solid #e22473; 
  color: #e22473; 
}
.bubble-button-pink::before { 
  background-color: #e22473; 
}
</style>
