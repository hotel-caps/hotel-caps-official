<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- DATA-DRIVEN CONTENT ---

// The paragraph content with styled keywords. Using v-html to render this.
const aboutParagraph = ref(`
  Nestled in the <strong class="text-sky-400 font-semibold">geographical, commercial and cultural hub</strong> of Southern Palakkad in Koduvayur, Hotel CAPS is an <strong class="font-semibold text-rose-500">immersive experience</strong> for every guest. We blend luxury with tradition, offering an <strong class="font-semibold text-amber-500">inviting and homely flavor</strong> with rich amenities and the warmth of <strong class="font-semibold text-emerald-500 ">Kerala hospitality</strong>. Your journey into comfort and elegance starts here.
`);

// A ref to hold the main section element for GSAP context
const main = ref();

// --- ANIMATION LOGIC ---
onMounted(() => {
  // Use a GSAP context for safe cleanup
  let ctx = gsap.context(() => {
    
    // --- Paragraph Text Animation ---
    gsap.from(".about-text-container", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: main.value,
        start: "top 60%",
      }
    });

  }, main.value); // <- scope animations to the main element

  // Cleanup function
  onUnmounted(() => {
    ctx.revert();
  });
});
</script>

<template>
  <section id="about" ref="main" class="relative w-full py-16 sm:py-20 md:py-24 lg:py-28 px-4 lg:px-8 flex items-center justify-center overflow-hidden">
    
    <!-- Fixed Parallax Background Layer -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      
      <!-- NuxtImg acting as the background -->
      <NuxtImg 
        src="/images/home/about-bg.jpg" 
        alt="About Hotel CAPS"
        width="1366"
        height="910"
        format="webp"
        quality="80"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      <!-- Tint Overlay -->
      <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"></div>
    </div>

    <!-- Content Foreground Layer -->
    <div class="max-w-6xl mx-auto text-center relative z-10">
      
      <!-- Paragraph with Styled Keywords -->
      <div class="about-text-container">
        <h1 
          class="about-text font-display text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-white leading-relaxed md:leading-loose  lg:leading-loose xl:leading-loose tracking-wider md:tracking-widest justify-center text-center font-body"
          v-html="aboutParagraph"
        ></h1>
      </div>

    </div>
  </section>
</template>

<style scoped>
  .about-text-container {
    padding: 0;
  }
</style>
