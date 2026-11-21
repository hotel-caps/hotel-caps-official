<template>
  <div
    :class="[
      'w-full font-sans transition-colors duration-500',
      isDark ? 'dark bg-[#555555] text-zinc-100' : 'bg-[#eae6e3] text-zinc-900'
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 lg:pt-12 relative">

      <!-- ==========================================
           CONTROLS: VEG TOGGLE & LIGHT/DARK
           ========================================== -->
      <div class="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4 mb-8">

        <!-- Veg / Non-Veg Filter -->
        <button
          type="button"
          role="switch"
          :aria-checked="showOnlyVeg"
          aria-label="Toggle Vegetarian Only"
          @click="showOnlyVeg = !showOnlyVeg"
          :class="[
            'flex items-center p-1 rounded-full cursor-pointer transition-all duration-300 select-none outline-none border focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
            isDark
              ? 'bg-[#1e1e1e] border-zinc-800 shadow-sm hover:border-zinc-700 focus-visible:ring-offset-[#111111]'
              : 'bg-white border-stone-200/90 shadow-sm hover:shadow-md focus-visible:ring-offset-[#f9f7f3]'
          ]"
        >
          <span
            :class="[
              'px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5',
              !showOnlyVeg
                ? 'bg-red-600 text-white shadow-inner'
                : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800'
            ]"
          >
            <span class="w-2 h-2 rounded-full border border-current flex items-center justify-center p-[1px]">
              <span class="w-full h-full rounded-full bg-current"></span>
            </span>
            All
          </span>
          <span
            :class="[
              'px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5',
              showOnlyVeg
                ? 'bg-green-600 text-white shadow-inner'
                : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800'
            ]"
          >
            <span class="w-2 h-2 rounded-full border border-current flex items-center justify-center p-[1px]">
              <span class="w-full h-full rounded-full bg-current"></span>
            </span>
            Veg
          </span>
        </button>

        <!-- Light / Dark Mode -->
        <button
          type="button"
          role="switch"
          :aria-checked="isDark"
          aria-label="Toggle Dark Mode"
          @click="isDark = !isDark"
          :class="[
            'flex items-center p-1 rounded-full cursor-pointer transition-all duration-300 select-none outline-none border focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2',
            isDark
              ? 'bg-[#1e1e1e] border-zinc-800 shadow-sm hover:border-zinc-700 focus-visible:ring-offset-[#111111]'
              : 'bg-white border-stone-200/90 shadow-sm hover:shadow-md focus-visible:ring-offset-[#f9f7f3]'
          ]"
        >
          <span
            :class="[
              'px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors',
              !isDark
                ? 'bg-[#d4af37] text-[#0a0a0a] shadow-inner'
                : 'text-zinc-400 hover:text-zinc-200'
            ]"
          >
            Light
          </span>
          <span
            :class="[
              'px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors',
              isDark
                ? 'bg-[#d4af37] text-[#0a0a0a] shadow-inner'
                : 'text-zinc-500 hover:text-zinc-800'
            ]"
          >
            Dark
          </span>
        </button>

      </div>

      <!-- ==========================================
           MOBILE & TABLET LAYOUT (< 1024px)
           ========================================== -->
      <div class="block lg:hidden">

        <!--
        <div class="mb-6 flex flex-col gap-3">
          <div class="flex items-end justify-between px-1">
            <div class="flex flex-col">
              <h3 class="font-display text-sm font-bold text-[#927104] tracking-widest uppercase">{{ currentMonthSignature.monthName }}</h3>
              <h2 class="font-display text-2xl font-bold text-[#d4af37] tracking-wider uppercase drop-shadow-sm">Signatures</h2>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#1e1e1e] text-xs font-mono tabular-nums font-bold tracking-wider border border-white/10">
              <span class="text-[#d4af37]">{{ activeSignatures.length ? safeSignatureIndex + 1 : 0 }}</span>
              <span class="text-white/40 mx-0.5">/</span>
              <span class="text-white/85">{{ activeSignatures.length }}</span>
            </span>
          </div>

          <div
            @pointerdown="onSigPointerDown"
            @pointermove="onSigPointerMove"
            @pointerup="onSigPointerUp"
            @pointercancel="onSigPointerUp"
            @mouseenter="isSignaturePaused = true"
            @mouseleave="isSignaturePaused = false"
            class="relative w-full bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-lg border border-white/10 flex flex-col select-none touch-pan-y"
          >
            <div class="grid w-full">
              <div
                v-for="(sig, index) in activeSignatures"
                :key="sig.type"
                :inert="index !== safeSignatureIndex"
                :aria-hidden="index !== safeSignatureIndex"
                :class="[
                  'col-start-1 row-start-1 w-full flex flex-col relative overflow-hidden bg-[#1e1e1e]',
                  getSlideMotionClass(index, safeSignatureIndex, prevSignatureIndex, signatureDirection, isSignatureAnimating)
                ]"
              >
                <div class="w-full aspect-[4/3] relative overflow-hidden border-b border-white/10">
                  <div class="absolute top-3 right-3 z-10 bg-black/65 backdrop-blur-md px-2 py-1 rounded shadow-sm">
                    <svg v-if="sig.type === 'veg'" class="w-4 h-4" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" stroke="#16a34a" stroke-width="2" rx="2"/><circle cx="8" cy="8" r="4" fill="#16a34a"/></svg>
                    <svg v-else class="w-4 h-4" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" stroke="#dc2626" stroke-width="2" rx="2"/><circle cx="8" cy="8" r="4" fill="#dc2626"/></svg>
                  </div>
                  <img
                    v-if="sig?.image"
                    :src="sig.image"
                    :alt="sig.title || 'Signature Dish'"
                    width="600"
                    height="450"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <div class="p-5 sm:p-6">
                  <h3 class="text-xl sm:text-2xl font-bold text-white leading-tight mb-1.5">{{ sig.title }}</h3>
                  <p class="text-xs sm:text-sm text-white/75 line-clamp-2 leading-relaxed">{{ sig.description }}</p>
                </div>
              </div>
            </div>

            <div v-if="activeSignatures.length > 0" class="px-5 py-3.5 border-t border-white/10 flex items-center justify-between bg-black/25">
              <button
                type="button"
                aria-label="Previous signature"
                :disabled="activeSignatures.length <= 1"
                @click.stop="stepSignature(-1)"
                class="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <div class="overflow-hidden pointer-events-none select-none" :style="getInstaViewportStyle(activeSignatures.length)" aria-hidden="true">
                <div class="flex items-center will-change-transform transition-transform duration-300 ease-out" :style="getInstaRailStyle(safeSignatureIndex, activeSignatures.length)">
                  <div v-for="(_, idx) in activeSignatures" :key="'sig-m-dot-' + idx" class="w-[14px] h-[14px] shrink-0 flex items-center justify-center">
                    <span :class="['w-[7px] h-[7px] rounded-full transition-all duration-300 ease-out', getInstaDotClasses(idx, safeSignatureIndex, activeSignatures.length)]"></span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Next signature"
                :disabled="activeSignatures.length <= 1"
                @click.stop="stepSignature(1)"
                class="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
        -->

        <!-- Outlet Tabs (Mobile - 3-Column Grid) -->
        <div
          :class="[
            'pt-2 pb-5 mb-6 grid grid-cols-3 gap-2 sm:gap-3 transition-colors duration-500 border-b',
            isDark ? 'border-zinc-800' : 'border-stone-200'
          ]"
        >
          <button
            v-for="outlet in outlets"
            :key="outlet.name"
            type="button"
            @click="activeOutlet = outlet.name"
            :class="[
              'flex flex-col items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl transition-all duration-300 border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]',
              activeOutlet === outlet.name
                ? 'bg-[#d4af37] text-[#0a0a0a] border-[#d4af37] shadow-md'
                : isDark
                  ? 'bg-[#1e1e1e] text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                  : 'bg-white text-zinc-600 border-stone-200/90 hover:border-[#d4af37]/60 hover:text-zinc-900 shadow-xs'
            ]"
          >
            <span v-html="outlet.icon" class="w-8 h-8 sm:w-9 sm:h-9" aria-hidden="true"></span>
            <span class="text-center text-[10px] sm:text-[11px] font-bold tracking-wider uppercase leading-tight" v-html="outlet.titleHtml"></span>
          </button>
        </div>

        <!-- ==========================================
             MOBILE SPECIALS SLIDER
             ========================================== -->
        <section
          aria-label="Today's Specials"
          tabindex="0"
          @keydown.left.prevent="stepSpecial(-1)"
          @keydown.right.prevent="stepSpecial(1)"
          @pointerdown="onSpecialPointerDown"
          @pointermove="onSpecialPointerMove"
          @pointerup="onSpecialPointerUp"
          @pointercancel="onSpecialPointerUp"
          @mouseenter="isSpecialPaused = true"
          @mouseleave="isSpecialPaused = false"
          @focusin="isSpecialPaused = true"
          @focusout="isSpecialPaused = false"
          :class="[
            'mb-8 relative w-full rounded-3xl overflow-hidden border transition-all duration-500 grid grid-rows-[auto_1fr_auto] select-none touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] cursor-grab active:cursor-grabbing bg-gradient-to-br',
            activeOutletTheme.gradientClass,
            isDark ? 'border-white/10 shadow-2xl' : 'border-stone-900/10 shadow-xl'
          ]"
        >
          <!-- Background SVG Watermark -->
          <svg
            class="absolute bottom-8 right-6 w-32 h-32 sm:w-40 sm:h-40 text-white opacity-[0.08] pointer-events-none"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path :d="activeOutletTheme.svgPath" />
          </svg>

          <!-- Top Header Row: Label Pill + Live Item Counter -->
          <div class="relative z-20 flex items-center justify-between gap-2 px-5 pt-4 sm:px-6 sm:pt-5">
            <div class="inline-flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <svg class="w-3 h-3 text-[#d4af37] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="text-[10px] font-bold tracking-widest uppercase text-white">Today's Specials</span>
            </div>

            <!-- Live Number Indicator -->
            <div
              aria-live="polite"
              class="inline-flex items-center bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-mono tabular-nums text-xs font-bold tracking-wider"
            >
              <span class="text-[#d4af37]">{{ outletSpecials.length ? safeSpecialIndex + 1 : 0 }}</span>
              <span class="text-white/40 mx-1">/</span>
              <span class="text-white/90">{{ outletSpecials.length }}</span>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="outletSpecials.length === 0" class="relative z-10 px-6 py-10 text-center text-white/75 text-sm font-medium tracking-wide">
            {{ showOnlyVeg ? 'No vegetarian specials listed right now.' : 'Specials updating soon...' }}
          </div>

          <!-- Stacked Zero-CLS Slide Deck -->
          <div
            v-else
            class="relative z-10 grid w-full items-center"
            :style="specialDragStyle"
          >
            <div
              v-for="(special, index) in outletSpecials"
              :key="special.id"
              :inert="index !== safeSpecialIndex"
              :aria-hidden="index !== safeSpecialIndex"
              :class="[
                'col-start-1 row-start-1 w-full flex items-center justify-between gap-4 px-5 py-5 sm:px-6 sm:py-6',
                getSlideMotionClass(index, safeSpecialIndex, prevSpecialIndex, specialDirection, isSpecialAnimating)
              ]"
            >
              <!-- Left Content: Dish Name + Dietary Icon + Intro -->
              <div class="flex flex-col flex-1 min-w-0">
                <div class="flex items-center gap-2 sm:gap-2.5 mb-1.5">
                  <h3 class="text-xl sm:text-2xl font-bold text-white capitalize leading-tight line-clamp-2">
                    {{ special.title }}
                  </h3>
                  <svg v-if="special.isVeg" class="shrink-0 w-4 h-4" viewBox="0 0 16 16" fill="none" aria-label="Vegetarian">
                    <rect x="1" y="1" width="14" height="14" stroke="#16a34a" stroke-width="2" rx="2"/>
                    <circle cx="8" cy="8" r="4" fill="#16a34a"/>
                  </svg>
                  <svg v-else class="shrink-0 w-4 h-4" viewBox="0 0 16 16" fill="none" aria-label="Non-Vegetarian">
                    <rect x="1" y="1" width="14" height="14" stroke="#dc2626" stroke-width="2" rx="2"/>
                    <circle cx="8" cy="8" r="4" fill="#dc2626"/>
                  </svg>
                </div>

                <p v-if="special.intro" class="text-xs sm:text-sm text-white/80 capitalize line-clamp-2 leading-relaxed">
                  {{ special.intro }}
                </p>
              </div>

              <!-- Right Content: Price -->
              <div v-if="formatPrice(special.price)" class="shrink-0 flex items-center justify-end pl-2">
                <span class="text-[#d4af37] font-bold text-2xl sm:text-3xl tracking-tight tabular-nums drop-shadow-xs">
                  {{ formatPrice(special.price) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Control Bar: Left Arrow + Non-Clickable Instagram Dots + Right Arrow -->
          <div
            v-if="outletSpecials.length > 0"
            class="relative z-20 px-5 py-3 sm:px-6 sm:py-3.5 border-t border-white/10 bg-black/20 flex items-center justify-between gap-4"
          >
            <button
              type="button"
              aria-label="Previous special"
              :disabled="outletSpecials.length <= 1"
              @pointerdown.stop
              @click.stop="stepSpecial(-1)"
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Instagram Sliding Dots (Strictly Non-Clickable) -->
            <div
              class="overflow-hidden pointer-events-none select-none"
              :style="getInstaViewportStyle(outletSpecials.length)"
              aria-hidden="true"
            >
              <div
                class="flex items-center will-change-transform transition-transform duration-300 ease-out"
                :style="getInstaRailStyle(safeSpecialIndex, outletSpecials.length)"
              >
                <div
                  v-for="(special, idx) in outletSpecials"
                  :key="'m-dot-' + special.id"
                  class="w-[14px] h-[14px] shrink-0 flex items-center justify-center"
                >
                  <span
                    :class="[
                      'w-[7px] h-[7px] rounded-full transition-all duration-300 ease-out',
                      getInstaDotClasses(idx, safeSpecialIndex, outletSpecials.length)
                    ]"
                  ></span>
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label="Next special"
              :disabled="outletSpecials.length <= 1"
              @pointerdown.stop
              @click.stop="stepSpecial(1)"
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        <!-- Mobile & Tablet Category Accordions -->
        <div class="flex flex-col gap-4 pb-20">
          <div
            v-for="category in activeCategories"
            :key="category"
            :id="'acc-' + formatCategoryId(category)"
            :class="[
              'rounded-2xl border overflow-hidden transition-colors duration-500',
              isDark ? 'bg-[#1c1c1c] border-zinc-800 shadow-sm' : 'bg-white border-stone-200/90 shadow-xs'
            ]"
          >
            <button
              type="button"
              :aria-expanded="openAccordions.includes(category)"
              @click="toggleAccordion(category)"
              :class="[
                'w-full px-5 py-3.5 flex justify-between items-center transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4af37]',
                openAccordions.includes(category) ? 'border-b border-[#d4af37]/60' : '',
                isDark ? 'bg-[#222222] hover:bg-[#282828]' : 'bg-stone-50/80 hover:bg-stone-100/80'
              ]"
            >
              <div class="flex items-center gap-2.5">
                <span :class="['font-display font-bold text-lg sm:text-xl', isDark ? 'text-[#d4af37]' : 'text-[#8a6900]']">
                  {{ category }}
                </span>
                <span
                  :class="[
                    'text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 rounded-full',
                    isDark ? 'bg-white/10 text-zinc-300' : 'bg-stone-200/80 text-zinc-600'
                  ]"
                >
                  {{ getItemsByCategory(category).length }}
                </span>
              </div>
              <svg
                :class="[
                  'w-5 h-5 transition-transform duration-300 shrink-0',
                  isDark ? 'text-[#d4af37]' : 'text-[#8a6900]',
                  openAccordions.includes(category) ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              class="grid transition-all duration-500 ease-in-out"
              :class="openAccordions.includes(category) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <div class="p-5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    v-for="item in getItemsByCategory(category)"
                    :key="item.id"
                    class="flex items-start gap-4"
                  >
                    <div class="w-24 sm:w-28 aspect-[4/3] shrink-0 rounded-xl overflow-hidden bg-zinc-800/10">
                      <img
                        :src="item.image || '/images/live/placeholder.jpg'"
                        :alt="item.alt || item.name || 'Menu item'"
                        width="590"
                        height="442"
                        loading="lazy"
                        decoding="async"
                        @error="handleImgError"
                        class="w-full h-full object-cover shadow-xs"
                      />
                    </div>
                    <div class="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 :class="['text-base font-semibold leading-tight', isDark ? 'text-white' : 'text-zinc-900']">
                        {{ item.name }}
                      </h4>
                      <p :class="['text-xs line-clamp-3 mt-1 mb-2 leading-relaxed', isDark ? 'text-zinc-400' : 'text-zinc-500']">
                        {{ item.info }}
                      </p>

                      <!-- Single Offer Badge (Fixed Duplicate Loop) -->
                      <div
                        v-if="item.offers"
                        class="mb-2 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-500 w-fit"
                      >
                        {{ item.offers }} ✨
                      </div>

                      <div class="flex flex-col gap-1.5 mt-auto">
                        <template v-for="spec in (item.specializations || [])" :key="spec.name">
                          <div v-if="!showOnlyVeg || spec.isVeg" class="flex items-center justify-between gap-2">
                            <div class="flex items-center gap-1.5 min-w-0">
                              <span
                                class="w-3.5 h-3.5 shrink-0 flex items-center justify-center border rounded-xs p-[2px]"
                                :class="spec.isVeg ? 'border-green-600' : 'border-red-600'"
                              >
                                <span class="w-full h-full rounded-full" :class="spec.isVeg ? 'bg-green-600' : 'bg-red-600'"></span>
                              </span>
                              <span :class="['text-xs font-medium truncate', isDark ? 'text-zinc-300' : 'text-zinc-600']">
                                {{ spec.name || 'Regular' }}
                              </span>
                            </div>
                            <span :class="['text-sm font-bold tabular-nums shrink-0', isDark ? 'text-[#d4af37]' : 'text-[#8a6900]']">
                              {{ formatPrice(spec.price) }}
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
      <div class="hidden lg:flex gap-8 xl:gap-10 items-start">

        <!-- LEFT COLUMN: Sticky Specials Showcase -->
        <aside class="w-[31%] xl:w-[27%] shrink-0 relative [@media(max-aspect-ratio:2/1)]:sticky top-[6rem] flex flex-col gap-5 pt-2">

          <!--
          <div class="flex flex-col gap-3 mb-4">
            <div class="flex items-end justify-between">
              <div class="flex flex-col">
                <h3 class="font-display text-xl font-bold text-[#927104] tracking-widest uppercase">{{ currentMonthSignature.monthName }}</h3>
                <h2 class="font-display text-3xl font-bold text-[#d4af37] tracking-wider uppercase drop-shadow-sm">Signatures</h2>
              </div>
              <span class="px-3 py-1 rounded-full bg-[#1e1e1e] text-xs font-mono tabular-nums font-bold tracking-wider border border-white/10">
                <span class="text-[#d4af37]">{{ activeSignatures.length ? safeSignatureIndex + 1 : 0 }}</span>
                <span class="text-white/40 mx-0.5">/</span>
                <span class="text-white/85">{{ activeSignatures.length }}</span>
              </span>
            </div>

            <div
              @pointerdown="onSigPointerDown"
              @pointermove="onSigPointerMove"
              @pointerup="onSigPointerUp"
              @pointercancel="onSigPointerUp"
              @mouseenter="isSignaturePaused = true"
              @mouseleave="isSignaturePaused = false"
              class="relative w-full bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-lg border border-white/10 flex flex-col select-none mt-1"
            >
              <div class="grid w-full">
                <div
                  v-for="(sig, index) in activeSignatures"
                  :key="sig.type"
                  :inert="index !== safeSignatureIndex"
                  :aria-hidden="index !== safeSignatureIndex"
                  :class="[
                    'col-start-1 row-start-1 w-full flex flex-col relative overflow-hidden bg-[#1e1e1e]',
                    getSlideMotionClass(index, safeSignatureIndex, prevSignatureIndex, signatureDirection, isSignatureAnimating)
                  ]"
                >
                  <div class="w-full aspect-[4/3] relative overflow-hidden border-b border-white/10">
                    <div class="absolute top-3 right-3 z-10 bg-black/65 backdrop-blur-md px-2 py-1.5 rounded shadow-sm">
                      <svg v-if="sig.type === 'veg'" class="w-5 h-5" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" stroke="#16a34a" stroke-width="2" rx="2"/><circle cx="8" cy="8" r="4" fill="#16a34a"/></svg>
                      <svg v-else class="w-5 h-5" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" stroke="#dc2626" stroke-width="2" rx="2"/><circle cx="8" cy="8" r="4" fill="#dc2626"/></svg>
                    </div>
                    <img
                      v-if="sig?.image"
                      :src="sig.image"
                      :alt="sig.title || 'Signature Dish'"
                      width="600"
                      height="450"
                      loading="lazy"
                      decoding="async"
                      class="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div class="p-6 xl:p-7">
                    <h3 class="text-xl xl:text-2xl font-bold text-white leading-tight mb-2">{{ sig.title }}</h3>
                    <p class="text-sm text-white/75 line-clamp-3 leading-relaxed">{{ sig.description }}</p>
                  </div>
                </div>
              </div>

              <div v-if="activeSignatures.length > 0" class="px-6 py-3.5 border-t border-white/10 flex items-center justify-between bg-black/25">
                <button
                  type="button"
                  aria-label="Previous signature"
                  :disabled="activeSignatures.length <= 1"
                  @click.stop="stepSignature(-1)"
                  class="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div class="overflow-hidden pointer-events-none select-none" :style="getInstaViewportStyle(activeSignatures.length)" aria-hidden="true">
                  <div class="flex items-center will-change-transform transition-transform duration-300 ease-out" :style="getInstaRailStyle(safeSignatureIndex, activeSignatures.length)">
                    <div v-for="(_, idx) in activeSignatures" :key="'sig-d-dot-' + idx" class="w-[14px] h-[14px] shrink-0 flex items-center justify-center">
                      <span :class="['w-[7px] h-[7px] rounded-full transition-all duration-300 ease-out', getInstaDotClasses(idx, safeSignatureIndex, activeSignatures.length)]"></span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Next signature"
                  :disabled="activeSignatures.length <= 1"
                  @click.stop="stepSignature(1)"
                  class="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
          -->

          <!-- Desktop Specials Title -->
          <div class="flex flex-col">
            <h2 class="font-display text-3xl font-bold mb-1 text-[#d4af37] tracking-wide uppercase transition-colors duration-500">
              Today's
            </h2>
            <h2 class="font-display text-4xl font-bold text-[#d4af37] tracking-wider uppercase -mt-1 drop-shadow-xs">
              Specials
            </h2>
          </div>

          <!-- ==========================================
               DESKTOP SPECIALS SLIDER
               ========================================== -->
          <section
            aria-label="Today's Specials"
            tabindex="0"
            @keydown.left.prevent="stepSpecial(-1)"
            @keydown.right.prevent="stepSpecial(1)"
            @pointerdown="onSpecialPointerDown"
            @pointermove="onSpecialPointerMove"
            @pointerup="onSpecialPointerUp"
            @pointercancel="onSpecialPointerUp"
            @mouseenter="isSpecialPaused = true"
            @mouseleave="isSpecialPaused = false"
            @focusin="isSpecialPaused = true"
            @focusout="isSpecialPaused = false"
            :class="[
              'relative w-full rounded-3xl overflow-hidden border transition-all duration-500 grid grid-rows-[auto_1fr_auto] select-none outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] cursor-grab active:cursor-grabbing bg-gradient-to-br',
              activeOutletTheme.gradientClass,
              isDark ? 'border-white/10 shadow-2xl' : 'border-stone-900/15 shadow-xl'
            ]"
          >
            <!-- Background SVG Watermark -->
            <svg
              class="absolute bottom-10 -right-2 w-36 h-36 xl:w-40 xl:h-40 text-white opacity-[0.09] pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path :d="activeOutletTheme.svgPath" />
            </svg>

            <!-- Top Header Row: Outlet Badge + Live Item Counter -->
            <div class="relative z-20 flex items-center justify-between gap-2 px-6 pt-5 xl:px-7 xl:pt-6">
              <div class="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                <svg class="w-3 h-3 text-[#d4af37] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-[10px] font-bold tracking-widest uppercase text-white/90 truncate">
                  {{ activeOutletTheme.badgeLabel }}
                </span>
              </div>

              <!-- Live Number Indicator -->
              <div
                aria-live="polite"
                class="inline-flex items-center bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-mono tabular-nums text-xs font-bold tracking-wider shrink-0"
              >
                <span class="text-[#d4af37]">{{ outletSpecials.length ? safeSpecialIndex + 1 : 0 }}</span>
                <span class="text-white/40 mx-1">/</span>
                <span class="text-white/90">{{ outletSpecials.length }}</span>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="outletSpecials.length === 0" class="relative z-10 px-6 py-12 text-center text-white/75 text-sm font-medium tracking-wide">
              {{ showOnlyVeg ? 'No vegetarian specials listed right now.' : 'Specials updating soon...' }}
            </div>

            <!-- Stacked Zero-CLS Slide Deck -->
            <div
              v-else
              class="relative z-10 grid w-full"
              :style="specialDragStyle"
            >
              <div
                v-for="(special, index) in outletSpecials"
                :key="special.id"
                :inert="index !== safeSpecialIndex"
                :aria-hidden="index !== safeSpecialIndex"
                :class="[
                  'col-start-1 row-start-1 w-full flex flex-col px-6 py-5 xl:px-7 xl:py-6',
                  getSlideMotionClass(index, safeSpecialIndex, prevSpecialIndex, specialDirection, isSpecialAnimating)
                ]"
              >
                <div class="flex items-start justify-between gap-3 mb-2.5">
                  <h3 class="text-xl xl:text-2xl font-bold text-white capitalize leading-snug">
                    {{ special.title }}
                  </h3>
                  <svg v-if="special.isVeg" class="shrink-0 w-4 h-4 xl:w-5 xl:h-5 mt-1" viewBox="0 0 16 16" fill="none" aria-label="Vegetarian">
                    <rect x="1" y="1" width="14" height="14" stroke="#16a34a" stroke-width="2" rx="2"/>
                    <circle cx="8" cy="8" r="4" fill="#16a34a"/>
                  </svg>
                  <svg v-else class="shrink-0 w-4 h-4 xl:w-5 xl:h-5 mt-1" viewBox="0 0 16 16" fill="none" aria-label="Non-Vegetarian">
                    <rect x="1" y="1" width="14" height="14" stroke="#dc2626" stroke-width="2" rx="2"/>
                    <circle cx="8" cy="8" r="4" fill="#dc2626"/>
                  </svg>
                </div>

                <p v-if="special.intro" class="text-sm xl:text-[15px] text-white/80 capitalize leading-relaxed max-w-[92%]">
                  {{ special.intro }}
                </p>

                <div v-if="formatPrice(special.price)" class="mt-auto pt-6">
                  <span class="text-[#d4af37] font-bold text-3xl xl:text-4xl tracking-tight tabular-nums drop-shadow-xs">
                    {{ formatPrice(special.price) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Bottom Control Bar: Left Arrow + Non-Clickable Instagram Dots + Right Arrow -->
            <div
              v-if="outletSpecials.length > 0"
              class="relative z-20 px-6 py-3.5 xl:px-7 xl:py-4 border-t border-white/10 bg-black/20 flex items-center justify-between gap-3"
            >
              <button
                type="button"
                aria-label="Previous special"
                :disabled="outletSpecials.length <= 1"
                @pointerdown.stop
                @click.stop="stepSpecial(-1)"
                class="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Instagram Sliding Dots (Strictly Non-Clickable) -->
              <div
                class="overflow-hidden pointer-events-none select-none"
                :style="getInstaViewportStyle(outletSpecials.length)"
                aria-hidden="true"
              >
                <div
                  class="flex items-center will-change-transform transition-transform duration-300 ease-out"
                  :style="getInstaRailStyle(safeSpecialIndex, outletSpecials.length)"
                >
                  <div
                    v-for="(special, idx) in outletSpecials"
                    :key="'d-dot-' + special.id"
                    class="w-[14px] h-[14px] shrink-0 flex items-center justify-center"
                  >
                    <span
                      :class="[
                        'w-[7px] h-[7px] rounded-full transition-all duration-300 ease-out',
                        getInstaDotClasses(idx, safeSpecialIndex, outletSpecials.length)
                      ]"
                    ></span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="Next special"
                :disabled="outletSpecials.length <= 1"
                @pointerdown.stop
                @click.stop="stepSpecial(1)"
                class="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white border border-white/15 hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] active:scale-95 disabled:opacity-35 disabled:pointer-events-none transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
        </aside>

        <!-- RIGHT COLUMN: The Catalog -->
        <main class="flex-1 min-w-0 flex flex-col min-h-screen">

          <!-- Outlet Tabs -->
          <div class="flex gap-4 pt-2 pb-4 transition-colors duration-500">
            <button
              v-for="outlet in outlets"
              :key="'desktop-' + outlet.name"
              type="button"
              @click="activeOutlet = outlet.name"
              :class="[
                'flex flex-1 items-center justify-center gap-3 px-4 xl:px-6 py-3 rounded-xl transition-all duration-300 border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]',
                activeOutlet === outlet.name
                  ? 'bg-[#d4af37] text-[#0a0a0a] border-[#d4af37] shadow-md'
                  : isDark
                    ? 'bg-[#1e1e1e] text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                    : 'bg-white text-zinc-700 border-stone-200/90 hover:border-[#d4af37]/70 hover:text-zinc-950 shadow-xs'
              ]"
            >
              <span v-html="outlet.icon" class="w-9 h-9 xl:w-10 xl:h-10 shrink-0" aria-hidden="true"></span>
              <span class="text-left text-xs xl:text-sm font-bold tracking-widest uppercase leading-tight" v-html="outlet.titleHtml"></span>
            </button>
          </div>

          <!-- Category Pills -->
          <div
            :class="[
              'flex flex-wrap justify-center gap-3 xl:gap-4 py-4 mb-5 transition-colors duration-500 border-b',
              isDark ? 'border-zinc-800' : 'border-stone-200'
            ]"
          >
            <button
              v-for="category in activeCategories"
              :key="'pill-' + category"
              type="button"
              @click="activeCategory = category"
              :class="[
                'px-4 xl:px-5 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]',
                activeCategory === category
                  ? isDark
                    ? 'bg-[#2a2a2a] text-[#d4af37] border-[#d4af37]/50 shadow-sm'
                    : 'bg-[#1c1c1c] text-[#d4af37] border-[#1c1c1c] shadow-sm'
                  : isDark
                    ? 'bg-[#181818] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                    : 'bg-white border-stone-200 text-zinc-600 hover:border-stone-400 hover:text-zinc-900'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Responsive CSS Grid Catalog (GSAP Staggered) -->
          <div
            ref="catalogGridRef"
            class="grid grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6 pb-20 pt-2"
          >
            <article
              v-for="item in activeDesktopItems"
              :key="'grid-' + item.id"
              :class="[
                'menu-grid-card flex flex-col rounded-3xl border overflow-hidden transition-all duration-500 group',
                isDark
                  ? 'bg-[#1c1c1c] border-zinc-800/90 shadow-sm hover:border-zinc-700 hover:shadow-xl'
                  : 'bg-white border-stone-200/90 shadow-xs hover:border-stone-300 hover:shadow-lg'
              ]"
            >
              <!-- Dish Image -->
              <div
                :class="[
                  'w-full aspect-[4/3] overflow-hidden relative border-b',
                  isDark ? 'border-zinc-800/80 bg-zinc-900' : 'border-stone-100 bg-stone-100'
                ]"
              >
                <img
                  :src="item.image || '/images/live/placeholder.jpg'"
                  :alt="item.alt || item.name || 'Menu item'"
                  width="590"
                  height="442"
                  loading="lazy"
                  decoding="async"
                  @error="handleImgError"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <!-- Dish Details -->
              <div class="p-5 xl:p-6 flex flex-col flex-1">
                <h4 :class="['text-lg xl:text-xl font-bold mb-1.5 leading-snug transition-colors duration-300', isDark ? 'text-white' : 'text-zinc-900']">
                  {{ item.name }}
                </h4>
                <p :class="['text-sm line-clamp-2 leading-relaxed transition-colors duration-300', isDark ? 'text-zinc-400' : 'text-zinc-500']">
                  {{ item.info }}
                </p>

                <!-- Single Offer Badge (Fixed Duplicate Loop) -->
                <div
                  v-if="item.offers"
                  class="mt-3 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/12 text-emerald-500 border border-emerald-500/20 w-fit"
                >
                  {{ item.offers }} ✨
                </div>

                <!-- Variants & Veg/Non-Veg Anchored to Bottom -->
                <div
                  :class="[
                    'flex flex-col gap-2.5 pt-4 border-t mt-auto',
                    item.offers ? 'mt-3.5' : 'mt-5',
                    isDark ? 'border-zinc-800' : 'border-stone-100'
                  ]"
                >
                  <template v-for="spec in (item.specializations || [])" :key="spec.name">
                    <div v-if="!showOnlyVeg || spec.isVeg" class="flex justify-between items-center gap-2">
                      <div class="flex items-center gap-2 min-w-0">
                        <span
                          class="w-4 h-4 shrink-0 flex items-center justify-center border rounded-xs p-[2px]"
                          :class="spec.isVeg ? 'border-green-600' : 'border-red-600'"
                        >
                          <span class="w-full h-full rounded-full" :class="spec.isVeg ? 'bg-green-600' : 'bg-red-600'"></span>
                        </span>
                        <span :class="['text-sm font-medium truncate', isDark ? 'text-zinc-300' : 'text-zinc-600']">
                          {{ spec.name || 'Regular' }}
                        </span>
                      </div>
                      <span :class="['font-bold text-lg tabular-nums shrink-0', isDark ? 'text-[#d4af37]' : 'text-[#8a6900]']">
                        {{ formatPrice(spec.price) }}
                      </span>
                    </div>
                  </template>
                </div>
              </div>
            </article>
          </div>

        </main>
      </div>

      <!-- Menu Disclaimers Footer -->
      <div :class="['w-full mt-1 pt-8 pb-6 border-t transition-colors duration-500 rounded-2xl border-white/30 bg-white/30']">
        <div class="max-w-7xl mx-auto px-4 md:px-8 rounded-2xl">
          <h4 :class="['text-[10px] font-bold tracking-widest uppercase mb-5 text-center md:text-left', isDark ? 'text-zinc-100' : 'text-zinc-900']">
            Please Note
          </h4>

          <div :class="['grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-[13px] leading-relaxed', isDark ? 'text-zinc-100' : 'text-zinc-900']">
            <div class="flex items-start gap-2.5">
              <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p><strong :class="['font-semibold', isDark ? 'text-[#d4af37]' : 'text-[#8a6900]']">Item Availability:</strong> Dishes are prepared fresh and subject to daily kitchen availability.</p>
            </div>

            <div class="flex items-start gap-2.5">
              <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p><strong :class="['font-semibold', isDark ? 'text-[#d4af37]' : 'text-[#8a6900]']">Pricing & Seasonal Rates:</strong> Prices are subject to change based on market rates and seasonal availability without prior notice.</p>
            </div>

            <div class="flex items-start gap-2.5">
              <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p><strong :class="['font-semibold', isDark ? 'text-[#d4af37]' : 'text-[#8a6900]']">Visual Representation:</strong> Images shown are for illustrative and presentation purposes only; actual dish presentation may vary.</p>
            </div>

            <div class="flex items-start gap-2.5">
              <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <p><strong :class="['font-semibold', isDark ? 'text-[#d4af37]' : 'text-[#8a6900]']">Taxes & Policies:</strong> Government taxes applicable as per standard regulations. Management reserves all rights of service.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { currentMonthSignature } from '~/signaturesData.js';

// Centralized Motion, Physics & Pagination Constants
const SLIDER_CONFIG = Object.freeze({
  specialsAutoplayMs: 3600,
  signaturesAutoplayMs: 4200,
  transitionMs: 380,
  swipeThresholdPx: 42,
  dragDamping: 0.28,
  maxDragOffsetPx: 32,
  axisLockRatio: 1.2,
  instaMaxVisibleDots: 5,
  instaDotSlotPx: 14,
  accordionScrollDelayMs: 320,
  accordionScrollOffsetPx: 175
});

// Single Source of Truth for Outlet Card Themes & SVG Watermarks
const OUTLET_THEMES = Object.freeze({
  'Multi-Cuisine Restaurant': {
    badgeLabel: 'Multi-Cuisine',
    gradientClass: 'from-[#1B3320] to-[#0A1A0F]',
    svgPath: 'M31 68 V51 C22 49 18 42 20 35 C22 27 30 23 38 26 C41 18 48 14 56 16 C64 17 69 22 71 29 C80 27 88 33 88 42 C88 49 83 54 76 55 V68 M31 68 H76 M34 76 H73 M34 68 V81 M73 68 V81 M34 81 H73'
  },
  'Arabic Corner': {
    badgeLabel: 'Arabic Corner',
    gradientClass: 'from-[#3E2723] to-[#1B100B]',
    svgPath: 'M18 72 H82 M23 68 C24 47 35 34 50 31 C65 34 76 47 77 68 M16 78 H84 M45 29 C45 24 55 24 55 29 M50 24 V18'
  },
  'Chill N Chai': {
    badgeLabel: 'Chill N Chai',
    gradientClass: 'from-[#5C4033] to-[#2A1C14]',
    svgPath: 'M28 43 H67 V61 C67 72 59 78 48 78 C37 78 28 72 28 61 Z M67 48 H74 C82 48 85 53 85 59 C85 66 80 70 72 70 H66 M22 84 H76 M38 34 C32 28 40 24 36 18 M50 34 C44 28 52 24 48 18 M62 34 C56 28 64 24 60 18'
  },
  default: {
    badgeLabel: 'CAPS Special',
    gradientClass: 'from-[#1c1c1c] to-[#252525]',
    svgPath: 'M50 16 L57 38 L79 45 L57 52 L50 74 L43 52 L21 45 L43 38 Z M77 20 L80 29 L89 32 L80 35 L77 44 L74 35 L65 32 L74 29 Z M23 63 L26 71 L34 74 L26 77 L23 85 L20 77 L12 74 L20 71 Z'
  }
});

const outlets = [
  {
    name: 'Multi-Cuisine Restaurant',
    titleHtml: 'Multi-Cuisine',
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

const props = defineProps({
  menuData: { type: Array, required: true },
  dynamicSpecials: { type: Array, required: false, default: () => [] }
});

const isDark = ref(false);
const showOnlyVeg = ref(false);
const activeOutlet = ref('Multi-Cuisine Restaurant');
const activeCategory = ref('');
const openAccordions = ref([]);
const catalogGridRef = ref(null);
const prefersReducedMotion = ref(false);
const isTabHidden = ref(false);

const activeOutletTheme = computed(() => {
  return OUTLET_THEMES[activeOutlet.value] || OUTLET_THEMES.default;
});

// ==========================================
// FORMATTING & FALLBACK HELPERS
// ==========================================
const formatPrice = (val) => {
  if (val == null) return '';
  const str = String(val).trim();
  if (!str) return '';
  return Number.isFinite(Number(str)) ? `₹${str}` : str;
};

const formatCategoryId = (category) => String(category || '').replace(/\s+/g, '');

const handleImgError = (e) => {
  if (e?.target && !e.target.dataset.fallbackApplied) {
    e.target.dataset.fallbackApplied = 'true';
    e.target.src = '/images/menu/placeholder.jpg';
  }
};

// ==========================================
// O(1) CATALOG FILTERING BY OUTLET & VEG
// ==========================================
const itemsByCategoryMap = computed(() => {
  const map = new Map();
  for (const item of props.menuData) {
    if (item.outlet !== activeOutlet.value) continue;
    if (showOnlyVeg.value && !(item.specializations || []).some(spec => spec.isVeg)) continue;

    if (!map.has(item.category)) {
      map.set(item.category, []);
    }
    map.get(item.category).push(item);
  }
  return map;
});

const activeCategories = computed(() => [...itemsByCategoryMap.value.keys()]);

const getItemsByCategory = (categoryName) => {
  return itemsByCategoryMap.value.get(categoryName) || [];
};

const activeDesktopItems = computed(() => {
  return getItemsByCategory(activeCategory.value);
});

const toggleAccordion = (category) => {
  const index = openAccordions.value.indexOf(category);
  if (index > -1) {
    openAccordions.value.splice(index, 1);
  } else {
    openAccordions.value.push(category);

    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('acc-' + formatCategoryId(category));
        if (el) {
          const yOffset = el.getBoundingClientRect().top + window.scrollY - SLIDER_CONFIG.accordionScrollOffsetPx;
          window.scrollTo({ top: yOffset, behavior: prefersReducedMotion.value ? 'auto' : 'smooth' });
        }
      }, SLIDER_CONFIG.accordionScrollDelayMs);
    }
  }
};

// ==========================================
// INSTAGRAM SLIDING DOTS & MOTION HELPERS
// ==========================================
const getInstaWindowStart = (activeIndex, total) => {
  const maxVis = SLIDER_CONFIG.instaMaxVisibleDots;
  if (total <= maxVis) return 0;
  return Math.max(0, Math.min(activeIndex - 2, total - maxVis));
};

const getInstaViewportStyle = (total) => ({
  width: `${Math.min(total, SLIDER_CONFIG.instaMaxVisibleDots) * SLIDER_CONFIG.instaDotSlotPx}px`
});

const getInstaRailStyle = (activeIndex, total) => {
  const winStart = getInstaWindowStart(activeIndex, total);
  return {
    transform: `translate3d(${-winStart * SLIDER_CONFIG.instaDotSlotPx}px, 0, 0)`
  };
};

const getInstaDotClasses = (idx, activeIndex, total) => {
  const maxVis = SLIDER_CONFIG.instaMaxVisibleDots;

  if (total <= maxVis) {
    return idx === activeIndex
      ? 'bg-[#d4af37] scale-125 opacity-100 shadow-[0_0_8px_rgba(212,175,55,0.55)]'
      : 'bg-white/45 scale-[0.85] opacity-75';
  }

  const winStart = getInstaWindowStart(activeIndex, total);
  const winEnd = winStart + maxVis - 1;

  if (idx < winStart || idx > winEnd) {
    return 'bg-white/30 scale-[0.25] opacity-0';
  }
  if (idx === activeIndex) {
    return 'bg-[#d4af37] scale-125 opacity-100 shadow-[0_0_8px_rgba(212,175,55,0.55)]';
  }
  if ((idx === winStart && winStart > 0) || (idx === winEnd && winEnd < total - 1)) {
    return 'bg-white/45 scale-[0.5] opacity-55';
  }
  if (
    (idx === winStart + 1 && winStart > 0 && activeIndex > winStart + 1) ||
    (idx === winEnd - 1 && winEnd < total - 1 && activeIndex < winEnd - 1)
  ) {
    return 'bg-white/55 scale-[0.72] opacity-75';
  }
  return 'bg-white/60 scale-[0.88] opacity-85';
};

const getSlideMotionClass = (idx, activeIdx, prevIdx, dir, isAnimating) => {
  if (idx === activeIdx) {
    if (!isAnimating || prevIdx === -1 || prefersReducedMotion.value) {
      return 'opacity-100 z-10';
    }
    return dir > 0 ? 'slide-enter-next z-10' : 'slide-enter-prev z-10';
  }
  if (isAnimating && idx === prevIdx && !prefersReducedMotion.value) {
    return dir > 0
      ? 'slide-leave-next pointer-events-none z-0'
      : 'slide-leave-prev pointer-events-none z-0';
  }
  return 'opacity-0 pointer-events-none z-0';
};

// ==========================================
// TODAY'S SPECIALS SLIDER ENGINE
// ==========================================
const currentSpecialIndex = ref(0);
const prevSpecialIndex = ref(-1);
const specialDirection = ref(1);
const isSpecialAnimating = ref(false);
const isSpecialPaused = ref(false);
const specialDragOffsetX = ref(0);

let specialTimer = null;
let specialAnimTimer = null;
const specialPointer = { active: false, startX: 0, startY: 0, lockedAxis: null };

const outletSpecials = computed(() => {
  let specials = props.dynamicSpecials.filter(item => item.category === activeOutlet.value);

  if (showOnlyVeg.value) {
    specials = specials.filter(item => item.isVeg);
  }

  return specials.map((item, idx) => ({
    id: item.id ?? `${item.category}-${idx}-${item.name}`,
    title: item.name,
    intro: item.description,
    price: item.price,
    isVeg: Boolean(item.isVeg),
    category: item.category
  }));
});

const safeSpecialIndex = computed(() => {
  const len = outletSpecials.value.length;
  if (len === 0) return 0;
  return Math.min(currentSpecialIndex.value, len - 1);
});

const specialDragStyle = computed(() => {
  if (!specialDragOffsetX.value) return undefined;
  return {
    transform: `translate3d(${specialDragOffsetX.value}px, 0, 0)`,
    transition: 'none'
  };
});

const stepSpecial = (dir = 1, fromAutoplay = false) => {
  const len = outletSpecials.value.length;
  if (len <= 1) return;

  prevSpecialIndex.value = safeSpecialIndex.value;
  specialDirection.value = dir >= 0 ? 1 : -1;
  currentSpecialIndex.value = (safeSpecialIndex.value + specialDirection.value + len) % len;
  isSpecialAnimating.value = true;

  if (specialAnimTimer) clearTimeout(specialAnimTimer);
  specialAnimTimer = setTimeout(() => {
    isSpecialAnimating.value = false;
  }, SLIDER_CONFIG.transitionMs);

  if (!fromAutoplay) {
    startSpecialSlider();
  }
};

const startSpecialSlider = () => {
  if (typeof window === 'undefined') return;
  if (specialTimer) clearInterval(specialTimer);

  specialTimer = setInterval(() => {
    if (
      !isSpecialPaused.value &&
      !isTabHidden.value &&
      !prefersReducedMotion.value &&
      outletSpecials.value.length > 1
    ) {
      stepSpecial(1, true);
    }
  }, SLIDER_CONFIG.specialsAutoplayMs);
};

const onSpecialPointerDown = (e) => {
  if (outletSpecials.value.length <= 1) return;
  if (e.button != null && e.button !== 0) return;

  specialPointer.active = true;
  specialPointer.startX = e.clientX;
  specialPointer.startY = e.clientY;
  specialPointer.lockedAxis = null;
  isSpecialPaused.value = true;
};

const onSpecialPointerMove = (e) => {
  if (!specialPointer.active) return;

  const dx = e.clientX - specialPointer.startX;
  const dy = e.clientY - specialPointer.startY;

  if (!specialPointer.lockedAxis && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
    specialPointer.lockedAxis = Math.abs(dx) > Math.abs(dy) * SLIDER_CONFIG.axisLockRatio ? 'x' : 'y';
  }

  if (specialPointer.lockedAxis === 'x') {
    const damped = dx * SLIDER_CONFIG.dragDamping;
    specialDragOffsetX.value = Math.max(
      -SLIDER_CONFIG.maxDragOffsetPx,
      Math.min(SLIDER_CONFIG.maxDragOffsetPx, damped)
    );
  }
};

const onSpecialPointerUp = (e) => {
  if (!specialPointer.active) return;

  const dx = e.clientX - specialPointer.startX;
  const dy = e.clientY - specialPointer.startY;
  const wasHorizontal =
    specialPointer.lockedAxis === 'x' ||
    Math.abs(dx) > Math.abs(dy) * SLIDER_CONFIG.axisLockRatio;

  specialPointer.active = false;
  specialPointer.lockedAxis = null;
  specialDragOffsetX.value = 0;
  isSpecialPaused.value = false;

  if (wasHorizontal && Math.abs(dx) >= SLIDER_CONFIG.swipeThresholdPx && outletSpecials.value.length > 1) {
    stepSpecial(dx < 0 ? 1 : -1);
  }
};

// ==========================================
// MONTHLY SIGNATURES SLIDER ENGINE (READY WHEN UNCOMMENTED)
// ==========================================
const currentSignatureIndex = ref(0);
const prevSignatureIndex = ref(-1);
const signatureDirection = ref(1);
const isSignatureAnimating = ref(false);
const isSignaturePaused = ref(false);

let signatureTimer = null;
let signatureAnimTimer = null;
const sigPointer = { active: false, startX: 0, startY: 0 };

const activeSignatures = computed(() => {
  const sigs = [];
  if (currentMonthSignature?.veg) {
    sigs.push({ ...currentMonthSignature.veg, type: 'veg' });
  }
  if (!showOnlyVeg.value && currentMonthSignature?.nonVeg) {
    sigs.push({ ...currentMonthSignature.nonVeg, type: 'nonVeg' });
  }
  return sigs;
});

const safeSignatureIndex = computed(() => {
  const len = activeSignatures.value.length;
  if (len === 0) return 0;
  return Math.min(currentSignatureIndex.value, len - 1);
});

const stepSignature = (dir = 1, fromAutoplay = false) => {
  const len = activeSignatures.value.length;
  if (len <= 1) return;

  prevSignatureIndex.value = safeSignatureIndex.value;
  signatureDirection.value = dir >= 0 ? 1 : -1;
  currentSignatureIndex.value = (safeSignatureIndex.value + signatureDirection.value + len) % len;
  isSignatureAnimating.value = true;

  if (signatureAnimTimer) clearTimeout(signatureAnimTimer);
  signatureAnimTimer = setTimeout(() => {
    isSignatureAnimating.value = false;
  }, SLIDER_CONFIG.transitionMs);

  if (!fromAutoplay) {
    startSignatureSlider();
  }
};

const startSignatureSlider = () => {
  if (typeof window === 'undefined') return;
  if (signatureTimer) clearInterval(signatureTimer);

  signatureTimer = setInterval(() => {
    if (
      !isSignaturePaused.value &&
      !isTabHidden.value &&
      !prefersReducedMotion.value &&
      activeSignatures.value.length > 1
    ) {
      stepSignature(1, true);
    }
  }, SLIDER_CONFIG.signaturesAutoplayMs);
};

const onSigPointerDown = (e) => {
  if (activeSignatures.value.length <= 1) return;
  sigPointer.active = true;
  sigPointer.startX = e.clientX;
  sigPointer.startY = e.clientY;
  isSignaturePaused.value = true;
};

const onSigPointerMove = () => {};

const onSigPointerUp = (e) => {
  if (!sigPointer.active) return;
  const dx = e.clientX - sigPointer.startX;
  const dy = e.clientY - sigPointer.startY;
  sigPointer.active = false;
  isSignaturePaused.value = false;

  if (Math.abs(dx) >= SLIDER_CONFIG.swipeThresholdPx && Math.abs(dx) > Math.abs(dy) * SLIDER_CONFIG.axisLockRatio) {
    stepSignature(dx < 0 ? 1 : -1);
  }
};

// ==========================================
// WATCHERS & GSAP STAGGER CHOREOGRAPHY
// ==========================================
const animateDesktopCards = async () => {
  if (typeof window === 'undefined' || prefersReducedMotion.value) return;
  await nextTick();
  if (!catalogGridRef.value) return;

  const cards = catalogGridRef.value.querySelectorAll('.menu-grid-card');
  if (!cards.length) return;

  gsap.killTweensOf(cards);
  gsap.fromTo(
    cards,
    { y: 18, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.45,
      stagger: 0.04,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    }
  );
};

watch([activeOutlet, showOnlyVeg], () => {
  if (activeCategories.value.length > 0) {
    if (!activeCategories.value.includes(activeCategory.value)) {
      activeCategory.value = activeCategories.value[0];
    }
  } else {
    activeCategory.value = '';
    openAccordions.value = [];
  }

  // Synchronously reset slider state & counter when switching outlet or Veg filter
  prevSpecialIndex.value = -1;
  isSpecialAnimating.value = false;
  currentSpecialIndex.value = 0;

  prevSignatureIndex.value = -1;
  isSignatureAnimating.value = false;
  currentSignatureIndex.value = 0;

  startSpecialSlider();
}, { immediate: true });

watch([activeCategory, activeOutlet, showOnlyVeg], () => {
  animateDesktopCards();
});

// ==========================================
// LIFECYCLE & CLEANUP
// ==========================================
let motionQuery = null;

const handleVisibilityChange = () => {
  isTabHidden.value = document.hidden;
};

const handleMotionPreferenceChange = (e) => {
  prefersReducedMotion.value = e.matches;
};

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion.value = motionQuery.matches;
  motionQuery.addEventListener('change', handleMotionPreferenceChange);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  startSpecialSlider();
  // startSignatureSlider(); // Uncomment when Monthly Signatures UI is enabled
});

onUnmounted(() => {
  if (specialTimer) clearInterval(specialTimer);
  if (signatureTimer) clearInterval(signatureTimer);
  if (specialAnimTimer) clearTimeout(specialAnimTimer);
  if (signatureAnimTimer) clearTimeout(signatureAnimTimer);

  if (motionQuery) {
    motionQuery.removeEventListener('change', handleMotionPreferenceChange);
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange);

  if (catalogGridRef.value) {
    gsap.killTweensOf(catalogGridRef.value.querySelectorAll('.menu-grid-card'));
  }
});
</script>

<style scoped>
.slide-enter-next {
  animation: specialEnterNext 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.slide-leave-next {
  animation: specialLeaveNext 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.slide-enter-prev {
  animation: specialEnterPrev 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.slide-leave-prev {
  animation: specialLeavePrev 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes specialEnterNext {
  from {
    opacity: 0;
    transform: translate3d(22px, 0, 0) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes specialLeaveNext {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    opacity: 0;
    transform: translate3d(-22px, 0, 0) scale(0.985);
  }
}

@keyframes specialEnterPrev {
  from {
    opacity: 0;
    transform: translate3d(-22px, 0, 0) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes specialLeavePrev {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    opacity: 0;
    transform: translate3d(22px, 0, 0) scale(0.985);
  }
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>