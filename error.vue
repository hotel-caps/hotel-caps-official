<template>
  <div class="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-[#FDF8F3] via-[#F6E8D8] to-[#EDD5BC] text-[#1c1c1c] selection:bg-[#7A3E12] selection:text-white flex flex-col justify-between">
    
    <!-- POSITIONED BACKGROUND GRADIENTS & ARCHITECTURAL ARCS -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      <!-- Top-Left Soft Cream Curve -->
      <div class="absolute -top-[18%] -left-[12%] w-[70vw] sm:w-[50vw] aspect-square rounded-full bg-gradient-to-br from-white/75 via-[#FAF0E4]/40 to-transparent blur-sm"></div>

      <!-- Top-Right Large Warm Terracotta Arc -->
      <div class="absolute -top-[12%] -right-[22%] sm:-right-[12%] w-[78vw] sm:w-[52vw] lg:w-[44vw] aspect-square rounded-full bg-gradient-to-bl from-[#D7A176]/45 via-[#E5BE9C]/35 to-[#F6E8D8]/5"></div>

      <!-- Bottom-Left Warm Sand Arc -->
      <div class="absolute -bottom-[28%] -left-[18%] sm:-left-[10%] w-[85vw] sm:w-[55vw] lg:w-[46vw] aspect-square rounded-full bg-gradient-to-tr from-[#D9A67D]/40 via-[#E7C3A3]/30 to-transparent"></div>

      <!-- Center-Right Ambient Golden Glow behind Cloche -->
      <div class="absolute top-[28%] lg:top-[52%] left-1/2 lg:left-[68%] -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] lg:w-[620px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,248,237,0.85)_0%,rgba(235,193,152,0.25)_55%,transparent_75%)] blur-2xl"></div>
    </div>

    <!-- TOP BRAND EMBLEM (Centered on Mobile, Top-Left on Desktop) -->
    <header class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 lg:pt-10 flex justify-center lg:justify-start">
      <button
        type="button"
        aria-label="Back to Hotel CAPS Home"
        class="group inline-flex flex-col items-center focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
        @click="handleNavigation('/')"
      >
        <img
          src="/images/caps-solid-logo.png"
          alt="Hotel CAPS Emblem"
          width="56"
          height="56"
          class="w-11 h-11 sm:w-13 sm:h-13 object-contain drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        <div class="mt-1.5 flex flex-col items-center font-display text-[#1c1c1c] leading-none">
          <span class="text-[10px] sm:text-[11px] font-semibold tracking-[0.26em] uppercase">HOTEL</span>
          <span class="text-lg sm:text-xl font-extrabold tracking-[0.08em] uppercase mt-0.5">CAPS</span>
        </div>
      </button>
    </header>

    <!-- MAIN CONTENT GRID -->
    <main class="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-6 sm:py-8 lg:py-10 flex items-center">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
        
        <!-- LEFT COLUMN: 404, HEADLINE, COPY & CTA BUTTONS (Order 2 on Mobile, Order 1 on Desktop) -->
        <div class="order-2 lg:order-1 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <!-- 404 WITH CHEF HAT ON TOP OF '0' -->
          <div class="relative inline-flex items-baseline font-display font-bold text-[#9A3F11] text-[5.5rem] sm:text-[7.5rem] lg:text-[9.25rem] xl:text-[10.25rem] leading-[0.88] tracking-tight select-none mt-4 sm:mt-6 lg:mt-8">
            <span>4</span>
            <span class="relative inline-block mx-0.5 sm:mx-1">
              <!-- Bouncing Chef Hat SVG Positioned Above the 0 -->
              <svg
                viewBox="0 0 240 180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                aria-hidden="true"
                class="animate-chef-bounce absolute -top-[0.46em] left-1/2 w-[0.78em] h-auto text-[#7A3E12] pointer-events-none"
              >
                <!-- Left accent dashes -->
                <g stroke="currentColor" stroke-width="7" stroke-linecap="round">
                  <path d="M38 69 L13 58" />
                  <path d="M34 91 L7 91" />
                </g>

                <!-- Right accent dashes -->
                <g stroke="currentColor" stroke-width="7" stroke-linecap="round">
                  <path d="M202 62 L225 47" />
                  <path d="M207 88 L235 84" />
                  <path d="M202 113 L226 124" />
                </g>

                <!-- Chef hat -->
                <g stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
                  <!-- Puffy crown -->
                  <path
                    d="
                      M78 91
                      C61 88 51 76 51 61
                      C51 44 64 31 81 30
                      C87 16 101 8 117 8
                      C135 8 149 18 154 33
                      C173 31 189 45 189 63
                      C189 78 178 90 162 92
                      L162 111
                      L78 111
                      Z
                    "
                  />

                  <!-- Hat band -->
                  <path
                    d="
                      M78 111
                      L162 111
                      L162 146
                      Q162 154 154 154
                      L86 154
                      Q78 154 78 146
                      Z
                    "
                  />

                  <!-- Band detail -->
                  <path d="M96 120 L96 143" />
                  <path d="M120 120 L120 143" />
                  <path d="M144 120 L144 143" />
                </g>
              </svg>
              0
            </span>
            <span>4</span>
          </div>

          <!-- TITLE -->
          <h1 class="mt-2 sm:mt-3 font-display font-bold text-[2.1rem] sm:text-[2.75rem] lg:text-[3.35rem] xl:text-[3.65rem] text-[#1c1c1c] leading-[1.06] tracking-tight">
            This wasn’t<br />
            on the
            <span class="font-decorative uppercase text-[#9A3F11] tracking-wider ml-1">menu.</span>
          </h1>

          <!-- ACCENT DIVIDER -->
          <div class="w-10 h-[2.5px] bg-[#9A3F11]/70 rounded-full my-4 sm:my-5"></div>

          <!-- PARAGRAPH -->
          <p class="font-sans text-sm sm:text-base lg:text-[1.06rem] text-[#1c1c1c]/80 leading-relaxed max-w-md">
            Looks like you’ve wandered somewhere<br class="hidden sm:inline" />
            we’re not serving yet.<br />
            But we know a couple of places you might like.
          </p>

          <!-- BUTTONS (Subtle Rounded Rectangle: rounded-xl) -->
          <div class="mt-6 sm:mt-8 w-full sm:w-auto flex flex-col sm:flex-row gap-3.5 sm:gap-4 shrink-0">
            <!-- Primary Button: Back to Home -->
            <button
              type="button"
              class="group flex items-center justify-center gap-3 px-6 py-4 bg-[#7A3E12] text-white rounded-xl shadow-md hover:bg-[#bd5c17] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer"
              @click="handleNavigation('/')"
            >
              <!-- Home Icon -->
              <svg class="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <span class="font-sans font-bold text-sm tracking-wide leading-tight">Back to Home</span>
              <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <!-- Secondary Button: View Our Menu -->
            <button
              type="button"
              class="group flex items-center justify-center gap-3 px-6 py-4 bg-transparent border-2 border-[#7A3E12] text-[#7A3E12] rounded-xl hover:bg-[#7A3E12]/8 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer"
              @click="handleNavigation(MENU_ROUTE)"
            >
              <!-- Fork & Spoon Icon -->
              <svg class="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:rotate-[-6deg] group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2a1 1 0 0 1 1 1v5a3 3 0 0 1-2 2.83V21a1 1 0 1 1-2 0V10.83A3 3 0 0 1 2 8V3a1 1 0 0 1 2 0v4h1V3a1 1 0 0 1 2 0v4h1V3a1 1 0 0 1 1-1Zm10 0c2.21 0 4 2.24 4 5 0 2.22-1.15 4.1-2.75 4.75L18 21a1 1 0 1 1-2 0l-.25-9.25C14.15 11.1 13 9.22 13 7c0-2.76 1.79-5 4-5Z" />
              </svg>
              <span class="font-sans font-bold text-sm tracking-wide leading-tight">View Our Menu</span>
              <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

        </div>

        <!-- RIGHT COLUMN: CLOCHE PNG WITH FLOATING MOTION & GROUNDED SHADOW (Order 1 on Mobile, Order 2 on Desktop) -->
        <div class="order-1 lg:order-2 lg:col-span-6 flex items-center justify-center relative">
          <div class="relative w-full max-w-[300px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[640px] flex flex-col items-center">
            
            <!-- Floating Cloche PNG -->
            <NuxtImg
              src="/images/404/cloche.png"
              alt="Open golden cloche revealing an empty plate — 404 page not found"
              width="800"
              height="555"
              sizes="380px sm:600px md:640px lg:768px xl:800px"
              format="webp"
              quality="85"
              densities="x1"
              loading="eager"
              decoding="async"
              draggable="false"
              class="animate-cloche-float relative z-10 w-full h-auto object-contain select-none drop-shadow-[0_18px_28px_rgba(74,32,8,0.18)]"
            />

            <!-- Realistic Table Contact Shadow Beneath Plate -->
            <div
              class="animate-cloche-shadow -mt-4 sm:-mt-6 lg:-mt-8 w-[68%] h-5 sm:h-7 lg:h-9 rounded-[100%] bg-[#4A2008]/35 blur-xl pointer-events-none"
              aria-hidden="true"
            ></div>
          </div>
        </div>

      </div>
    </main>

    <!-- Bottom Spacer for Balanced Vertical Framing -->
    <div class="h-4 sm:h-6" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { clearError, useHead, useSeoMeta } from '#imports'

defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

// Route for the "View Our Menu" button
const MENU_ROUTE = '/menu'

const handleNavigation = (path) => {
  clearError({ redirect: path })
}

// Prevent search engines from indexing 404 pages
useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

useSeoMeta({
  title: '404 - This Wasn’t on the Menu | Hotel CAPS',
  description: 'Looks like you have wandered somewhere we are not serving yet. Explore Hotel CAPS home or view our menu.'
})
</script>

<style scoped>
/* Subtle looped bouncy animation for the Chef Hat above '0' */
@keyframes chefHatBounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0) rotate(6deg) scale(1);
  }
  35% {
    transform: translateX(-50%) translateY(-8px) rotate(11deg) scale(1.04, 0.97);
  }
  65% {
    transform: translateX(-50%) translateY(-2px) rotate(4deg) scale(0.98, 1.02);
  }
}

/* Gentle floating motion for the Cloche PNG */
@keyframes clocheFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-9px) rotate(0.8deg);
  }
}

/* Synchronized table shadow pulse as the Cloche floats */
@keyframes clocheShadowPulse {
  0%, 100% {
    transform: scaleX(1);
    opacity: 0.38;
  }
  50% {
    transform: scaleX(0.92);
    opacity: 0.24;
  }
}

.animate-chef-bounce {
  animation: chefHatBounce 3.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
  transform-origin: bottom center;
  z-index: -1;
}

.animate-cloche-float {
  animation: clocheFloat 4.8s ease-in-out infinite;
}

.animate-cloche-shadow {
  animation: clocheShadowPulse 4.8s ease-in-out infinite;
}
</style>