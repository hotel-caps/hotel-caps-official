<template>
  
  <div :class="['w-full font-sans transition-colors duration-500', isDark ? 'dark bg-[#111111]' : 'bg-[#f9f7f3]']">

    <!-- Top Padding added to pull toggles away from the edge -->
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 lg:pt-12 relative">
      
      <!-- ==========================================
           CONTROLS: VEG TOGGLE & LIGHT/DARK
           ========================================== -->
      <div class="flex flex-wrap items-center justify-end gap-4 mb-8">
        
        <!-- Veg / Non-Veg Filter -->
        <div 
          @click="showOnlyVeg = !showOnlyVeg"
          class="flex items-center bg-[#2a2a2a] border border-[#2a2a2a] p-1 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 select-none"
        >
          <div :class="['px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5', !showOnlyVeg ? 'bg-red-600 text-white shadow-inner' : 'text-zinc-400 hover:text-zinc-300']">
            <div class="w-2 h-2 rounded-full border border-current flex items-center justify-center p-[1px]"><div class="w-full h-full rounded-full bg-current"></div></div> All
          </div>
          <div :class="['px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5', showOnlyVeg ? 'bg-green-600 text-white shadow-inner' : 'text-zinc-400 hover:text-zinc-300']">
            <div class="w-2 h-2 rounded-full border border-current flex items-center justify-center p-[1px]"><div class="w-full h-full rounded-full bg-current"></div></div> Veg
          </div>
        </div>

        <!-- Light / Dark Mode -->
        <div 
          @click="isDark = !isDark"
          class="flex items-center bg-[#2a2a2a] border border-[#2a2a2a] p-1 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 select-none"
        >
          <div :class="['px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors', !isDark ? 'bg-[#d4af37] text-white shadow-inner' : 'text-zinc-400 hover:text-zinc-300']">
            Light
          </div>
          <div :class="['px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors', isDark ? 'bg-[#d4af37] text-black shadow-inner' : 'text-zinc-400 hover:text-zinc-300']">
            Dark
          </div>
        </div>

      </div>

      <!-- ==========================================
           MOBILE & TABLET LAYOUT (< 1024px)
           ========================================== -->
      <div class="block lg:hidden">

        <!-- Outlet Tabs (Mobile - Grid Layout, No scroll) -->
        <div class="pt-3 pb-5 mb-5 grid grid-cols-3 gap-2 transition-colors duration-500 border-b border-[#2a2a2a]">
          <button 
            v-for="outlet in outlets" :key="outlet.name" @click="activeOutlet = outlet.name"
            :class="[
              'flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-all duration-300 border',
              activeOutlet === outlet.name 
                ? 'bg-[#d4af37] text-[#0a0a0a] border-[#d4af37] shadow-md' 
                : 'bg-[#2a2a2a] text-zinc-400 border-[#2a2a2a] shadow-none'
            ]"
          >
            <span v-html="outlet.icon" class="w-10 h-10"></span>
            <span class="text-center text-[11px] font-bold tracking-wider uppercase leading-tight" v-html="outlet.titleHtml"></span>
          </button>
        </div>

        <!-- Mobile Specials Slider (h-auto via Grid) -->
        <div 
          @touchstart="handleTouchStart" 
          @touchend="handleTouchEnd" 
          @mousedown="handleTouchStart" 
          @mouseup="handleTouchEnd"
          class="mb-8 relative w-full h-auto bg-[#2a2a2a] rounded-3xl overflow-hidden shadow-md border border-[#2a2a2a] transition-colors duration-500 flex flex-col cursor-grab active:cursor-grabbing select-none"
        >
          <div class="absolute top-2 right-2 z-20 flex items-center gap-2 bg-[#141414]/50 backdrop-blur-md px-4 py-2 rounded-full border border-[#2a2a2a] shadow-sm">
            <svg class="w-3 h-3 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-[.6rem] font-bold tracking-widest uppercase text-white">Today's Special</span>
          </div>
          
          <div v-if="outletSpecials.length === 0" class="p-12 text-center text-zinc-400 text-sm font-medium tracking-wide">
            Specials updating soon...
          </div>
                    
          <transition-group v-else name="fade" tag="div" class="grid w-full">
            <div 
              v-for="(special, index) in outletSpecials" 
              :key="special.title" 
              v-show="index === currentSpecialIndex" 
              class="col-start-1 row-start-1 w-full flex items-center justify-between p-5 pb-8 pt-12 sm:p-6 sm:py-10 sm:pt-16 rounded-[20px] relative overflow-hidden shadow-lg transition-colors duration-500"
              :class="[
                  special.category === 'Chill N Chai' ? 'bg-gradient-to-br from-[#5C4033] to-[#2A1C14]' :
                  special.category === 'Arabic Corner' ? 'bg-gradient-to-br from-[#3E2723] to-[#1B100B]' :
                  special.category === 'Multi-Cuisine Restaurant' ? 'bg-gradient-to-br from-[#1B3320] to-[#0A1A0F]' :
                  'bg-gradient-to-br from-[#1c1c1c] to-[#252525]' // Default case (if needed)
                ]"
            >
              <!-- Background SVG Decoration -->
              <svg
                class="absolute -bottom-6 right-16 w-32 h-32 sm:w-40 sm:h-40
                      text-white opacity-10 pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >

                <!-- Chill N Chai : Tea Cup -->
                <path
                  v-if="special.category === 'Chill N Chai'"
                  d="
                    M28 43 H67 V61
                    C67 72 59 78 48 78
                    C37 78 28 72 28 61 Z
                    M67 48 H74
                    C82 48 85 53 85 59
                    C85 66 80 70 72 70
                    H66
                    M22 84 H76
                    M38 34
                    C32 28 40 24 36 18
                    M50 34
                    C44 28 52 24 48 18
                    M62 34
                    C56 28 64 24 60 18
                  "
                />

                <!-- Arabic Corner : Serving Cloche -->
                <path
                  v-else-if="special.category === 'Arabic Corner'"
                  d="
                    M18 72 H82
                    M23 68
                    C24 47 35 34 50 31
                    C65 34 76 47 77 68
                    M16 78 H84
                    M45 29
                    C45 24 55 24 55 29
                    M50 24 V18
                  "
                />

                <!-- Multi-Cuisine Restaurant : Chef Hat -->
                <path
                  v-else-if="special.category === 'Multi-Cuisine Restaurant'"
                  d="
                    M31 68
                    V51
                    C22 49 18 42 20 35
                    C22 27 30 23 38 26
                    C41 18 48 14 56 16
                    C64 17 69 22 71 29
                    C80 27 88 33 88 42
                    C88 49 83 54 76 55
                    V68
                    M31 68 H76
                    M34 76 H73
                    M34 68 V81
                    M73 68 V81
                    M34 81 H73
                  "
                />

                <!-- Generic / CAPS Special : Sparkle -->
                <path
                  v-else
                  d="
                    M50 16
                    L57 38
                    L79 45
                    L57 52
                    L50 74
                    L43 52
                    L21 45
                    L43 38 Z

                    M77 20
                    L80 29
                    L89 32
                    L80 35
                    L77 44
                    L74 35
                    L65 32
                    L74 29 Z

                    M23 63
                    L26 71
                    L34 74
                    L26 77
                    L23 85
                    L20 77
                    L12 74
                    L20 71 Z
                  "
                />

              </svg>

              <!-- Left Content (Text & Badges) -->
              <div class="relative z-10 flex flex-col flex-grow pr-4">
                                
                <div class="flex items-center gap-2 sm:gap-3 mb-1.5">
                  <h3 class="text-xl sm:text-2xl font-bold text-white leading-tight line-clamp-2">{{ special.title }}</h3>
                  
                  <!-- Veg / Non-Veg Icon -->
                  <svg v-if="special.isVeg" class="shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="14" height="14" stroke="#16a34a" stroke-width="2" rx="2"/>
                    <circle cx="8" cy="8" r="4" fill="#16a34a"/>
                  </svg>
                  <svg v-else class="shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="14" height="14" stroke="#dc2626" stroke-width="2" rx="2"/>
                    <circle cx="8" cy="8" r="4" fill="#dc2626"/>
                  </svg>
                </div>
                
                <p class="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">{{ special.intro }}</p>
              </div>

              <!-- Right Content (Price) -->
              <div
                v-if="special.price != null && String(special.price).trim() !== ''"
                class="relative z-10 shrink-0 flex items-center justify-end pl-2 h-full"
              >
                <span class="text-[#d4af37] font-bold text-2xl sm:text-3xl tracking-tight">
                  {{ Number.isFinite(Number(special.price))
                    ? '₹' + special.price
                    : special.price
                  }}
                </span>
              </div>
            </div>
          </transition-group>

          <!-- Slider Indicators -->
          <div v-if="outletSpecials.length > 1" class="absolute bottom-5 inset-x-0 flex justify-center gap-2 z-20">
            <div v-for="(_, idx) in outletSpecials" :key="'dot-m-'+idx" :class="['h-2 rounded-full transition-all duration-300', currentSpecialIndex === idx ? 'w-6 bg-[#d4af37]' : 'w-2 bg-zinc-500']"></div>
          </div>
        </div>

        <!-- Mobile Accordions -->
        <div class="flex flex-col gap-4 pb-20">
          <div v-for="category in activeCategories" :key="category" :id="'acc-' + category.replace(/\s+/g, '')" class="bg-[#2a2a2a] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-sm transition-colors duration-500">
            
            <button @click="toggleAccordion(category)" class="w-full px-5 py-3 border-b border-[#d4af37] flex justify-between items-center bg-[#252525] transition-colors duration-500">
              <span class="font-display font-bold text-xl text-[#d4af37]">{{ category }}</span>
              <svg :class="['w-5 h-5 text-[#d4af37] transition-transform duration-300', openAccordions.includes(category) ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            <div class="grid transition-all duration-500 ease-in-out" :class="openAccordions.includes(category) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
              <div class="overflow-hidden">
                <div class="p-5 pt-7 flex flex-col gap-6 border-t border-[#2e2e2e]">
                  <div v-for="item in getItemsByCategory(category)" :key="item.id" class="flex items-start gap-4">
                    <div class="w-24 h-18 aspect-[4/3] shrink-0 rounded-xl overflow-hidden">
                      <NuxtImg 
                        :src="item.image ? item.image : '/images/live/placeholder.jpg'" 
                        @error="$event.target.src = '/images/menu/placeholder.jpg'"
                        :alt="item.alt || item.name" 
                        width="590"
                        height="442"
                        format="webp"
                        quality="80"
                        loading="lazy"
                        class="w-full h-full rounded-xl object-cover shadow-sm" 
                      />
                    </div>
                    <div class="flex-1 flex flex-col justify-center">
                      <h4 class="text-base font-semibold text-white leading-tight">{{ item.name }}</h4>
                      <p class="text-xs text-zinc-400 line-clamp-3 mt-1 mb-2">{{ item.info }}</p>
                      
                      <div class="flex flex-col gap-1 mt-auto">
                        <!-- MOBILE INVISIBLE TEMPLATE -->
                        <template v-for="spec in item.specializations" :key="spec.name">
                          
                          <!-- MOBILE V-IF USING YOUR EXACT VARIABLE (showOnlyVeg) -->
                          <div v-if="!showOnlyVeg || spec.isVeg" class="flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                              <div class="w-3.5 h-3.5 flex items-center justify-center border rounded-sm p-[2px]" :class="spec.isVeg ? 'border-green-600' : 'border-red-600'">
                                <div class="w-full h-full rounded-full" :class="spec.isVeg ? 'bg-green-600' : 'bg-red-600'"></div>
                              </div>
                              <span class="text-xs font-medium text-zinc-400">{{ spec.name || 'Regular' }}</span>
                            </div>
                            <p v-if="item.offers" class="text-[10px] leading-tight font-medium text-emerald-400 mt-0.5 line-clamp-1">{{ item.offers }}</p>
                            <span class="text-sm font-bold text-[#d4af37]">
                              {{ Number.isFinite(Number(spec.price)) && String(spec.price).trim() !== ''
                                ? '₹' + spec.price
                                : spec.price
                              }}
                            </span>
                          </div>
                        </template>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ==========================================
           DESKTOP LAYOUT (>= 1024px)
           ========================================== -->
      <div class="hidden lg:flex gap-10 items-start">
        
        <!-- LEFT COLUMN: Sticky Specials Slider (h-auto via Grid) -->
        <aside class="w-[30%] xl:w-[25%] sticky top-[6rem] flex flex-col gap-6 pt-2">
          <div class="flex flex-col">
            <h2 class="font-display text-3xl font-bold mb-2 text-[#d4af37] tracking-wide uppercase transition-colors duration-500">Today's</h2>
            <h2 class="font-display text-4xl font-bold text-[#d4af37] tracking-wider uppercase -mt-1 drop-shadow-sm">Specials</h2>
          </div>

          <div 
            @touchstart="handleTouchStart" 
            @touchend="handleTouchEnd" 
            @mousedown="handleTouchStart" 
            @mouseup="handleTouchEnd"
            class="relative w-full h-auto bg-[#2a2a2a] rounded-3xl overflow-hidden shadow-lg border border-[#2a2a2a] transition-colors duration-500 flex flex-col cursor-grab active:cursor-grabbing select-none"
          >
            
            <div v-if="outletSpecials.length === 0" class="p-12 text-center text-zinc-400 text-sm font-medium tracking-wide">
              Specials updating soon...
            </div>

            <transition-group v-else name="fade" tag="div" class="grid w-full h-full">
              <div 
                v-for="(special, index) in outletSpecials" 
                :key="special.title" 
                v-show="index === currentSpecialIndex" 
                class="col-start-1 row-start-1 w-full h-full flex flex-col p-6 lg:p-8 rounded-[24px] relative overflow-hidden shadow-2xl transition-colors duration-500"
                :class="[
                  special.category === 'Chill N Chai' ? 'bg-gradient-to-br from-[#5C4033] to-[#2A1C14]' :
                  special.category === 'Arabic Corner' ? 'bg-gradient-to-br from-[#3E2723] to-[#1B100B]' :
                  special.category === 'Multi-Cuisine Restaurant' ? 'bg-gradient-to-br from-[#1B3320] to-[#0A1A0F]' :
                  'bg-gradient-to-br from-[#1c1c1c] to-[#252525]' // Default case (if needed)
                ]"
              >
                <!-- Background SVG Decoration -->
                <svg
                  class="absolute -bottom-6 -right-2 w-32 h-32 sm:w-40 sm:h-40
                        text-white opacity-10 pointer-events-none"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <!-- Chill N Chai : Tea Cup -->
                  <path
                    v-if="special.category === 'Chill N Chai'"
                    d="
                      M28 43 H67 V61
                      C67 72 59 78 48 78
                      C37 78 28 72 28 61 Z
                      M67 48 H74
                      C82 48 85 53 85 59
                      C85 66 80 70 72 70
                      H66
                      M22 84 H76
                      M38 34
                      C32 28 40 24 36 18
                      M50 34
                      C44 28 52 24 48 18
                      M62 34
                      C56 28 64 24 60 18
                    "
                  />

                  <!-- Arabic Corner : Serving Cloche -->
                  <path
                    v-else-if="special.category === 'Arabic Corner'"
                    d="
                      M18 72 H82
                      M23 68
                      C24 47 35 34 50 31
                      C65 34 76 47 77 68
                      M16 78 H84
                      M45 29
                      C45 24 55 24 55 29
                      M50 24 V18
                    "
                  />

                  <!-- Multi-Cuisine Restaurant : Chef Hat -->
                  <path
                    v-else-if="special.category === 'Multi-Cuisine Restaurant'"
                    d="
                      M31 68
                      V51
                      C22 49 18 42 20 35
                      C22 27 30 23 38 26
                      C41 18 48 14 56 16
                      C64 17 69 22 71 29
                      C80 27 88 33 88 42
                      C88 49 83 54 76 55
                      V68
                      M31 68 H76
                      M34 76 H73
                      M34 68 V81
                      M73 68 V81
                      M34 81 H73
                    "
                  />

                  <!-- Generic / CAPS Special : Sparkle -->
                  <path
                    v-else
                    d="
                      M50 16
                      L57 38
                      L79 45
                      L57 52
                      L50 74
                      L43 52
                      L21 45
                      L43 38 Z

                      M77 20
                      L80 29
                      L89 32
                      L80 35
                      L77 44
                      L74 35
                      L65 32
                      L74 29 Z

                      M23 63
                      L26 71
                      L34 74
                      L26 77
                      L23 85
                      L20 77
                      L12 74
                      L20 71 Z
                    "
                  />

                </svg>

                <!-- Content Area -->
                <div class="relative z-10 flex-grow flex flex-col">
                  <div class="flex items-center gap-3 mb-2 lg:mb-3">
                    <h3 class="text-xl lg:text-2xl font-semibold text-white leading-tight">{{ special.title }}</h3>
                    
                    <!-- Veg / Non-Veg Icon -->
                    <svg v-if="special.isVeg" class="shrink-0 w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="14" height="14" stroke="#16a34a" stroke-width="2" rx="2"/>
                      <circle cx="8" cy="8" r="4" fill="#16a34a"/>
                    </svg>
                    <svg v-else class="shrink-0 w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="14" height="14" stroke="#dc2626" stroke-width="2" rx="2"/>
                      <circle cx="8" cy="8" r="4" fill="#dc2626"/>
                    </svg>
                  </div>

                  <p class="text-sm lg:text-base text-white/80 leading-relaxed max-w-[85%]">{{ special.intro }}</p>
                  
                  <!-- Price (Bottom Left Anchored) -->
                  <div
                    v-if="special.price != null && String(special.price).trim() !== ''"
                    class="mt-2 pt-6"
                  >
                    <span class="text-[#d4af37] font-bold text-3xl lg:text-4xl tracking-tight">
                      <span v-if="Number.isFinite(Number(special.price))">₹</span>{{ special.price }}
                    </span>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <!-- Slider Indicators -->
            <div v-if="outletSpecials.length > 1" class="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20">
              <div v-for="(_, idx) in outletSpecials" :key="'dot-d-'+idx" :class="['h-2 rounded-full transition-all duration-300', currentSpecialIndex === idx ? 'w-6 bg-[#d4af37]' : 'w-2 bg-zinc-500']"></div>
            </div>
          </div>
        </aside>
        
        <!-- RIGHT COLUMN: The Catalog -->
        <main class="w-[70%] xl:w-[75%] flex flex-col min-h-screen">
          
          <!-- Outlet Tabs -->
          <div class="flex gap-4 pt-2 pb-4 transition-colors duration-500">
            <button 
              v-for="outlet in outlets" :key="'desktop-'+outlet.name" @click="activeOutlet = outlet.name"
              :class="[
                'flex flex-1 items-center justify-center gap-3 px-4 xl:px-6 py-3 rounded-xl transition-all duration-300 border',
                activeOutlet === outlet.name 
                  ? 'bg-[#d4af37] text-[#0a0a0a] border-[#d4af37] shadow-md' 
                  : 'bg-[#2a2a2a] text-zinc-400 border-[#2a2a2a] hover:border-zinc-400 hover:text-white shadow-none'
              ]"
            >
              <span v-html="outlet.icon" class="w-10 h-10"></span>
              <span class="text-left text-xs xl:text-sm font-bold tracking-widest uppercase leading-tight" v-html="outlet.titleHtml"></span>
            </button>
          </div>

          <!-- Category Pills -->
          <div class=" flex flex-wrap justify-center gap-5 py-4 mb-4 transition-colors duration-500 border-b border-[#2a2a2a]">
            <button
              v-for="category in activeCategories" :key="'pill-'+category" @click="activeCategory = category"
              :class="[
                'px-5 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border',
                activeCategory === category
                  ? 'bg-[#252525] text-white border-zinc-700 shadow-sm'
                  : 'bg-[#2e2e2e] border-[#2a2a2a] text-zinc-400 hover:border-zinc-400 hover:text-zinc-200 shadow-none'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- The Food Grid (GSAP Animated) -->
          <div class="flex flex-wrap justify-start gap-6 pb-20 pt-2">
            <div 
              v-for="item in activeDesktopItems" :key="'grid-'+item.id"
              class="menu-grid-card w-[280px] xl:w-[300px] flex flex-col bg-[#2a2a2a] rounded-3xl border border-[#2a2a2a] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <!-- Image -->
              <div class="w-full aspect-[4/3] overflow-hidden relative border-b border-[#2a2a2a]">
                <NuxtImg 
                  :src="item.image ? item.image : '/images/live/placeholder.jpg'" 
                  @error="$event.target.src = '/images/menu/placeholder.jpg'"
                  :alt="item.name" 
                  width="590"
                  height="442"
                  format="webp"
                  quality="80"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
              
              <!-- Content -->
              <div class="p-6 flex flex-col flex-1 bg-[#2a2a2a] transition-colors duration-500">
                <h4 class="text-xl font-bold text-white mb-2 leading-snug transition-colors duration-500">{{ item.name }}</h4>
                <p class="text-sm text-zinc-400 line-clamp-2 transition-colors duration-500">{{ item.info }}</p>
                
                <!-- Variants & Veg/Non-Veg -->
                <div class="flex flex-col gap-3 pt-5 border-t border-[#2a2a2a] mt-5">
                  
                  <!-- DESKTOP INVISIBLE TEMPLATE -->
                  <template v-for="spec in item.specializations" :key="spec.name">
                    <div v-if="item.offers" class="mt-1.5 inline-flex items-center px-1 py-1 rounded text-[15px] leading-none font-medium bg-emerald-500/10 text-emerald-400 border-emerald-500/20 w-fit">{{ item.offers }} ✨</div>
                    <!-- DESKTOP V-IF USING YOUR EXACT VARIABLE (showOnlyVeg) -->
                    <div v-if="!showOnlyVeg || spec.isVeg" class="flex justify-between items-center">
                      <div class="flex items-center gap-2">
                        <!-- Dietary Indicator -->
                        <div class="w-4 h-4 flex items-center justify-center border rounded-sm p-[2px]" :class="spec.isVeg ? 'border-green-600' : 'border-red-600'">
                          <div class="w-full h-full rounded-full" :class="spec.isVeg ? 'bg-green-600' : 'bg-red-600'"></div>
                        </div>
                        <span class="text-sm font-medium text-zinc-400">{{ spec.name || 'Regular' }}</span>
                      </div>
                      <span class="text-[#d4af37] font-bold text-lg">
                        {{ Number.isFinite(Number(spec.price)) && String(spec.price).trim() !== ''
                          ? '₹' + spec.price
                          : spec.price
                        }}
                      </span>
                    </div>
                    
                  </template>

                </div>
                
              </div>
            </div>
          </div>

        </main>
      </div>

      <!-- Menu Disclaimers Footer -->
      <div class="w-full mt-1 pt-8 pb-6 border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 md:px-8">
          <h4 class="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-5 text-center md:text-left">
            Please Note
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-[13px] leading-relaxed text-zinc-400">
            
            <!-- Availability -->
            <div class="flex items-start gap-2.5 group">
              <svg class="w-5 h-5 mt-0.5 shrink-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p><strong class="font-semibold text-[#d4af37]">Item Availability:</strong> Dishes are prepared fresh and subject to daily kitchen availability.</p>
            </div>
            
            <!-- Pricing -->
            <div class="flex items-start gap-2.5 group">
              <svg class="w-5 h-5 mt-0.5 shrink-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p><strong class="font-semibold text-[#d4af37]">Pricing & Seasonal Rates:</strong> Prices are subject to change based on market rates and seasonal availability without prior notice.</p>
            </div>
            
            <!-- Visuals -->
            <div class="flex items-start gap-2.5 group">
              <svg class="w-5 h-5 mt-0.5 shrink-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p><strong class="font-semibold text-[#d4af37]">Visual Representation:</strong> Images shown are for illustrative and presentation purposes only; actual dish presentation may vary.</p>
            </div>
            
            <!-- Taxes -->
            <div class="flex items-start gap-2.5 group">
              <svg class="w-5 h-5 mt-0.5 shrink-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <p><strong class="font-semibold text-[#d4af37]">Taxes & Policies:</strong> Government taxes applicable as per standard regulations. Management reserves all rights of service.</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick, markRaw } from 'vue';
import { gsap } from 'gsap';
import { 
  PhPhone 
} from '@phosphor-icons/vue';

const PhoneIcon = markRaw(PhPhone);

const props = defineProps({
  menuData: { type: Array, required: true },
  dynamicSpecials: { type: Array, required: false, default: () => [] } // Accept dynamic specials
});

const isDark = ref(false);
const showOnlyVeg = ref(false); // Veg filter state

// Outlet Configuration with thicker SVG Icons
const outlets = [
  { 
    name: 'Multi Cuisine Restaurant', 
    titleHtml: 'Multi Cuisine',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 17h18M12 4v2m-7 8a7 7 0 0114 0v3H5v-3z"/></svg>` 
  },
  { 
    name: 'Arabic Corner', 
    titleHtml: 'Arabic Corner',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 3l-6 6m-9 9l-3 3m5-6l4-4a3 3 0 014.2 0v0a3 3 0 010 4.2l-4 4a3 3 0 01-4.2 0v0a3 3 0 010-4.2"/></svg>` 
  },
  { 
    name: 'Chill N Chai', 
    titleHtml: 'Chill N Chai',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 8H19C20.6569 8 22 9.34315 22 11C22 12.6569 20.6569 14 19 14H18M4 8H18V15C18 17.2091 16.2091 19 14 19H8C5.79086 19 4 17.2091 4 15V8ZM10 4V6M14 4V6M6 4V6"/></svg>` 
  }
];

const activeOutlet = ref('Multi Cuisine Restaurant');
const activeCategory = ref('');

// Change from a string to an array to hold multiple open accordions
const openAccordions = ref([]);

// --- SWIPE LOGIC FOR SLIDERS ---
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
  // Capture the starting X coordinate (works for both touch and mouse)
  touchStartX.value = e.changedTouches ? e.changedTouches[0].screenX : e.screenX;
};

const handleTouchEnd = (e) => {
  // Capture the ending X coordinate
  touchEndX.value = e.changedTouches ? e.changedTouches[0].screenX : e.screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50; // Minimum pixel drag to trigger a swipe
  const diff = touchStartX.value - touchEndX.value;
  
  if (Math.abs(diff) > swipeThreshold && outletSpecials.value.length > 1) {
    // Reset the 3-second autoplay timer so it doesn't instantly jump again
    startSlider(); 

    if (diff > 0) {
      // Swiped Left -> Next Slide
      currentSpecialIndex.value = (currentSpecialIndex.value + 1) % outletSpecials.value.length;
    } else {
      // Swiped Right -> Previous Slide
      currentSpecialIndex.value = (currentSpecialIndex.value - 1 + outletSpecials.value.length) % outletSpecials.value.length;
    }
  }
};

// --- UPDATED ACCORDION LOGIC ---
const toggleAccordion = (category) => {
  const index = openAccordions.value.indexOf(category);
  if (index > -1) {
    // If it's already open, close it
    openAccordions.value.splice(index, 1);
  } else {
    // If it's closed, open it and smoothly scroll to it
    openAccordions.value.push(category);
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('acc-' + category.replace(/\s+/g, ''));
        if (el) {
          const yOffset = el.getBoundingClientRect().top + window.scrollY - 180;
          window.scrollTo({ top: yOffset, behavior: 'smooth' });
        }
      }, 350); 
    }
  }
};

// Extract unique categories belonging to the active outlet (Filtered by Veg state)
const activeCategories = computed(() => {
  const filtered = props.menuData.filter(item => {
    if (item.outlet !== activeOutlet.value) return false;
    if (showOnlyVeg.value) return item.specializations.some(spec => spec.isVeg);
    return true;
  });
  return [...new Set(filtered.map(item => item.category))];
});

// Helper for filtering items
const getItemsByCategory = (categoryName) => {
  let items = props.menuData.filter(item => item.category === categoryName);
  if (showOnlyVeg.value) {
    items = items.filter(item => item.specializations.some(spec => spec.isVeg));
  }
  return items;
};

const activeDesktopItems = computed(() => {
  return getItemsByCategory(activeCategory.value);
});

// --- SPECIALS SLIDER LOGIC ---
const currentSpecialIndex = ref(0);
let specialTimer = null;

// Updated computed property handling hydration and veg filtering
const outletSpecials = computed(() => {
  let specials = props.dynamicSpecials.filter(item => {
    // Match the exact outlet name (handling the hyphen difference)
    let targetOutlet = activeOutlet.value;
    if (targetOutlet === 'Multi Cuisine Restaurant') targetOutlet = 'Multi-Cuisine Restaurant';

    return item.category === targetOutlet;
  });

  // Apply the Veg toggle filter
  if (showOnlyVeg.value) {
    specials = specials.filter(item => item.isVeg);
  }

  // Hydrate with the exact keys the UI slider expects
  return specials.map(item => {
    return {
      title: item.name,
      intro: item.description,
      price: item.price,
      isVeg: item.isVeg,
      category: item.category,
      // images: [item.image]
    };
  });
});

const startSlider = () => {
  if (typeof window === 'undefined') return;
  if (specialTimer) clearInterval(specialTimer);
  
  specialTimer = setInterval(() => {
    if (outletSpecials.value.length > 0) {
      currentSpecialIndex.value = (currentSpecialIndex.value + 1) % outletSpecials.value.length;
    }
  }, 3000); 
};

// --- UPDATED WATCHER ---
// Ensure the watcher resets the array properly when changing outlets
watch([activeOutlet, showOnlyVeg], () => {
  if (activeCategories.value.length > 0) {
    if (!activeCategories.value.includes(activeCategory.value)) activeCategory.value = activeCategories.value[0]; 
    
    // Automatically open the first accordion of the new outlet
    // openAccordions.value = [activeCategories.value[0]];
  } else {
    activeCategory.value = '';
    openAccordions.value = [];
  }
  currentSpecialIndex.value = 0;
  startSlider(); 
}, { immediate: true });

// GSAP Subtle Entrance Animation
watch(activeCategory, async () => {
  if (typeof window === 'undefined') return;
  await nextTick();
  gsap.fromTo('.menu-grid-card',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
  );
});

onMounted(() => {
  startSlider();
});

onUnmounted(() => {
  if (specialTimer) clearInterval(specialTimer);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>