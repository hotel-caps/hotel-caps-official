<template>
  <section ref="sectionRef" class="relative bg-[#331405] py-16 sm:py-20 lg:py-24 overflow-hidden">
    
    <!-- Ambient Center Glow Overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(223,156,77,0.25)_0%,_rgba(51,20,5,0)_70%)] pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20">
        <span class="contact-header-reveal block text-[#df9c4d] font-sans font-bold text-sm uppercase tracking-widest mb-2 sm:mb-3">
          {{ contactData.eyebrow }}
        </span>
        <h2 class="contact-header-reveal font-display font-bold text-3xl lg:text-4xl text-white tracking-wide">
          {{ contactData.title }}
        </h2>
        <p class="contact-header-reveal mt-4 sm:mt-5 text-white/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto whitespace-pre-line">
          {{ contactData.subtitle }}
        </p>
      </div>

      <!-- Contact Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16">
        
        <div 
          v-for="(item, index) in contactData.items" 
          :key="index"
          class="flex flex-col items-center text-center px-4 sm:px-6 relative"
        >
          
          <!-- Responsive Vertical Dividers -->
          <div 
            v-if="index !== 3" 
            class="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-white/10"
          ></div>
          <div 
            v-if="index === 0 || index === 2" 
            class="hidden md:block lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-white/10"
          ></div>

          <!-- Circular Icon Container -->
          <div class="contact-icon-reveal w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#df9c4d] mb-5 sm:mb-6 transition-transform duration-500 hover:-translate-y-1 hover:bg-white/10 cursor-default">
            <div v-html="item.svg"></div>
          </div>

          <!-- Item Title -->
          <h3 class="contact-text-reveal font-sans font-semibold text-[#df9c4d] text-sm uppercase tracking-widest mt-2 mb-3">
            {{ item.title }}
          </h3>

          <!-- Item Details -->
          <p class="contact-text-reveal font-sans text-white/90 text-sm leading-relaxed whitespace-pre-line" v-html="item.details">
          </p>

        </div>

      </div>

      <!-- CTA Button Container -->
      <div class="contact-btn-reveal mt-16 lg:mt-20 flex justify-center">
          <NuxtLink :to="contactData.buttonLink" 
            class="contact-bubble-button font-display px-8 py-2.5 text-sm lg:text-lg tracking-widest sm:px-8 sm:py-2.5 mt-2 rounded-lg">
            {{ contactData.buttonText }}
          </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactData = {
  eyebrow: "Contact",
  title: "Get In Touch",
  subtitle: "Need assistance? We'd love to hear from you.\nReach out to us through any of the following ways.",
  buttonText: "Contact Us",
  buttonLink: "/contact",
  items: [
    { title: "Address", details: "Main Road, Pittupeedika,\nKoduvayur, Palakkad – 678501\nKerala, India", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>` },
    { title: "Email", details: `<a href="mailto:capsfamilybakes@gmail.com" class="hover:text-[#f4b366] transition-colors duration-300">capsfamilybakes@gmail.com</a>`, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>` },
    { title: "Call Us", details: `<a href="tel:+919207517064" class="block hover:text-[#f4b366] transition-colors duration-300">+91 92075 17064</a><a href="tel:+918848369567" class="block hover:text-[#f4b366] transition-colors duration-300">+91 8848 369 567</a>`, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>` },
    { title: "Hours", details: "Everyday\n7:00 AM – 10:00 PM", svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` }
  ]
};

const sectionRef = ref(null);
const isInitialAppLoad = useState('isInitialAppLoad');
let ctx;

const initScrollAnimation = () => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' } });

    // 1. Header texts
    tl.from('.contact-header-reveal', { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
    // 2. Icons pop in
    .from('.contact-icon-reveal', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, "-=0.4")
    // 3. Info texts slide up
    .from('.contact-text-reveal', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, "-=0.4")
    // 4. Button pops in
    .from('.contact-btn-reveal', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, "-=0.2");
    
  }, sectionRef.value);
};

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
onUnmounted(() => { if (ctx) ctx.revert(); });
</script>

<style scoped>
.contact-bubble-button {
  position: relative;
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
  border: 1px solid white;
  color: white;
}
.contact-bubble-button::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 0.5rem;
  background-color: #D97706; 
  transform: scaleX(0);
  transform-origin: left;
  transition: all 0.4s cubic-bezier(0.7, 0, 0.2, 1);
  z-index: -1;
}
.contact-bubble-button:hover {
  border-color: #D97706;
}
.contact-bubble-button:hover::before {
  transform: scaleX(1);
}
</style>