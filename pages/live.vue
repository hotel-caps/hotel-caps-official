<template>
  <div class="live-app-root">
    <ClientOnly>
      <!-- OUTER SCREEN WRAPPER (Handles the centering and letterboxing) -->
      <div class="fixed inset-0 w-screen h-screen bg-[#020202] z-[9999] flex items-center justify-center overflow-hidden select-none font-sans text-white">
        
        <!-- CLICK TO START OVERLAY -->
        <div 
          v-if="!hasStarted"
          class="absolute inset-0 z-[100000] bg-black flex flex-col items-center justify-center cursor-pointer p-4 sm:p-8"
          @click="startLiveSignage"
        >
          <img 
            src="/images/caps-solid-logo.png" 
            alt="Hotel CAPS" 
            class="h-16 sm:h-24 md:h-28 lg:h-[120px] w-auto mb-4 sm:mb-6 lg:mb-8 opacity-80 animate-pulse object-contain" 
          />
          <p class="text-white text-center text-xs sm:text-base md:text-xl lg:text-[24px] font-display tracking-widest opacity-80 uppercase max-w-[90%]">
            Click anywhere to start Live Feed
          </p>
        </div>
        
        <!-- 1920x1080 SCALED STAGE -->
        <div 
          v-show="hasStarted"
          class="relative bg-[#040404] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] shrink-0 origin-center"
          :style="{ width: '1920px', height: '1080px', transform: `scale(${stageScale})` }"
        >
          
          <!-- ========================================== -->
          <!-- 1. BACKGROUND ENGINE                       -->
          <!-- ========================================== -->
          <div class="absolute inset-0 z-0">
            <!-- Swap Backgrounds Base -->
            <img 
              :src="activeSlide?.format === 'DELIVERY' ? '/images/live/live-delivery.jpg' : '/images/live/live-universal.jpg'" 
              alt="Live Background" 
              class="absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform" 
            />
            
            <!-- Dynamic Colored Overlays -->
            <div 
              ref="bgTintRef"
              class="absolute inset-0 transition-all duration-1000 mix-blend-multiply pointer-events-none"
              style="background-color: #000; opacity: 0;"
            ></div>
            <div v-if="activeSlide?.format !== 'DELIVERY'" class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-1000"></div>
          </div>

          <!-- ========================================== -->
          <!-- 2. MAIN CONTENT AREA                       -->
          <!-- ========================================== -->
          <div v-if="activeSlide && !isScreensaverActive" class="absolute top-0 left-0 w-full h-[965px] z-10">

            <!-- Branding Header -->
            <div class="absolute top-[50px] left-[80px] flex flex-col items-center gap-[10px] live-fade-el opacity-0 translate-y-[-20px]">
              <img src="/images/caps-solid-logo.png" alt="Hotel CAPS" class="h-[90px]" />
              <div 
                class="flex flex-col items-center font-display leading-none transition-colors duration-300"
                :class="['ROOMS', 'EVENTS', 'CATERING'].includes(activeSlide.format) ? 'text-white' : 'text-[#1c1c1c]'"
              >
                <p class="text-[20px] font-medium tracking-widest">HOTEL</p>
                <p class="text-[30px] font-bold tracking-widest mt-1">CAPS</p>
              </div>
            </div>
            
            <!-- ---------------------------------------- -->
            <!-- FORMAT A: LIST (SPECIALS)                -->
            <!-- ---------------------------------------- -->
            <div v-if="activeSlide.format === 'LIST'" class="w-full h-full flex flex-col pt-[50px] pb-[40px] px-[60px] live-slide-wrapper">
              
              <!-- Master Header -->
              <div class="flex justify-between items-start w-full mb-[40px] px-[20px] live-fade-el opacity-0 translate-y-[-20px]">
                

                <div class="flex flex-col items-center flex-1 text-center">
                  
                  <!-- Date String with Red Highlights -->
                  <p class="text-[24px] sm:text-[20px] tracking-[0.25em] font-semibold mb-2 font-sans uppercase text-[#0f172a]">
                    <span class="text-[#b91c1c]">{{ liveDate.day }} </span>
                    <span class="mx-1"> {{ liveDate.month }} </span>
                    <span class="text-[#b91c1c]"> {{ liveDate.year }} </span>
                    <span class="mx-3 opacity-70">&bull;</span>
                    <span> {{ liveDate.weekday }} </span>
                  </p>

                  <!-- Dual-Tone Title -->
                  <h1 class="text-[55px] sm:text-[75px] font-bold tracking-widest font-display uppercase leading-none drop-shadow-sm mb-4">
                    <span class="text-[#0f172a]">TODAY'S</span>
                    <span class="text-[#b47525] ml-2 sm:ml-4">SPECIALS</span>
                  </h1>

                  <!-- Intro Paragraph (Moved above the underline as requested) -->
                  <p class="text-[18px] sm:text-[22px] tracking-wide text-[#0f172a]/90 font-sans font-medium mb-5">
                    Fresh picks from the CAPS kitchen, served today.
                  </p>

                  <!-- Fading Bronze/Gold Underline -->
                  <div class="w-[250px] sm:w-[350px] h-[2px] bg-gradient-to-r from-transparent via-[#b47525] to-transparent"></div>

                </div>

                <div class="flex items-start">
                  <div class="bg-[#991b1b]/90 backdrop-blur-md text-white rounded-full px-6 py-2.5 flex items-center gap-3 shadow-lg border border-red-500/50 mt-2">
                    <div class="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span class="text-[15px] tracking-widest font-bold uppercase font-sans">Now Serving</span>
                  </div>
                </div>
                
              </div>

              <!-- Unified Outlet Grid Area (Dynamic Merging) -->
              <div class="flex-1 flex justify-center items-stretch gap-[30px] w-full live-anim-grid opacity-0">
                <div 
                  v-for="(outlet, oIdx) in activeSlide.outlets" 
                  :key="oIdx"
                  class="relative flex flex-col rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/20 p-[40px] live-stagger-card"
                  :style="{ 
                    backgroundColor: `${outlet.color}E6`, /* E6 = 90% opacity hex */
                    width: `${(outlet.columns.length * 480) + ((outlet.columns.length - 1) * 30)}px`,
                    flex: '0 0 auto'
                  }"
                >
                  <!-- Decorative Border SVG inside the merged card -->
                  <svg class="absolute inset-[15px] w-[calc(100%-30px)] h-[calc(100%-30px)] opacity-20 pointer-events-none" fill="none" preserveAspectRatio="none">
                     <rect x="0" y="0" width="100%" height="100%" rx="16" stroke="white" stroke-width="2" stroke-dasharray="12 12" />
                  </svg>
                  
                  <!-- Unified Spanning Header -->
                  <div class="flex flex-col items-center justify-center text-center w-full z-10 border-b border-white/20 pb-[25px] mb-[30px]">
                    <div class="w-16 h-16 text-[#e6c2a4] mb-3" v-html="outlet.icon"></div>
                    <h2 class="text-[40px] font-display font-bold uppercase tracking-widest leading-none text-white drop-shadow-md" v-html="outlet.name"></h2>
                    <p class="text-[15px] mt-3 font-sans tracking-[0.25em] font-medium uppercase text-[#e6c2a4]">
                      {{ outlet.subtitle }}
                    </p>
                  </div>

                  <!-- Dishes Grid (Wraps columns side-by-side gracefully) -->
                  <div class="flex gap-[30px] w-full z-10 flex-1">
                    <div v-for="(col, cIdx) in outlet.columns" :key="cIdx" class="flex-1 flex flex-col gap-[20px]">
                      
                      <div v-for="(item, iIdx) in col" :key="iIdx" class="flex items-start justify-between w-full pb-3 border-b border-white/10 border-dashed last:border-0 live-stagger-item">
                        <div class="flex items-start flex-1 min-w-0 pr-4">
                          
                          <!-- Veg/Non-Veg Dynamic Marker -->
                          <div class="w-[20px] h-[20px] flex-shrink-0 border-[2px] bg-white flex items-center justify-center mr-4 mt-[5px] rounded-[3px]" :class="item.isVeg ? 'border-green-600' : 'border-red-600'">
                            <div v-if="item.isVeg" class="w-[10px] h-[10px] rounded-full bg-green-600"></div>
                            <div v-else class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-red-600 mt-[1px]"></div>
                          </div>
                          
                          <div class="flex flex-col min-w-0">
                            <span class="text-[24px] font-sans font-medium leading-tight text-white line-clamp-2 drop-shadow-sm">{{ item.name }}</span>
                            <!-- Offer / Description Rendering below title -->
                            <span v-if="item.description" class="text-[15px] text-[#fbbf24] font-medium uppercase tracking-wider mt-1 line-clamp-1">{{ item.description }}</span>
                          </div>
                        </div>
                        
                        <div
                          v-if="item.price !== null && item.price !== undefined && item.price.trim() !== ''"
                          class="text-[30px] font-display tracking-wide text-white font-semibold pl-2 flex-shrink-0 drop-shadow-sm"
                        >
                          <span
                            v-if="Number.isFinite(Number(item.price))"
                            class="text-[20px] text-[#e6c2a4] mr-1"
                          >₹</span>{{ item.price }}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>


            <!-- ---------------------------------------- -->
            <!-- FORMAT B: UNIVERSAL (ROOMS, EVENTS, CATERING)-->
            <!-- ---------------------------------------- -->
            <div v-else-if="['ROOMS', 'EVENTS', 'CATERING'].includes(activeSlide.format)" class="w-full h-full flex flex-col pt-[50px] pb-[40px] px-[80px] live-slide-wrapper">

              <!-- Shared Center Title Header -->
              <div class="flex flex-col items-center justify-center w-full mt-[10px] mb-[40px] live-fade-el opacity-0 translate-y-[-20px]">
                <div class="w-[350px] h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-5 opacity-80"></div>
                <h1 class="text-[85px] font-display font-bold tracking-[0.1em] uppercase text-white shadow-black drop-shadow-2xl text-center leading-none">
                  {{ activeSlide.title }}
                </h1>
                <!-- Intro Paragraph (Moved above the underline as requested) -->
                <p class="text-[18px] sm:text-[22px] tracking-wide text-white/90 font-sans font-medium mt-6">
                  {{ activeSlide.subtitle }}
                </p>
                <div class="w-[350px] h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-6 opacity-80"></div>
              </div>

              <!-- 3 Image Grid Area -->
              <div 
                class="flex justify-center gap-[40px] w-full max-w-[1650px] mx-auto live-stagger-el opacity-0 scale-95 mt-[15px] "
                :class="activeSlide.format === 'ROOMS' ? 'items-stretch h-[420px]' : 'items-center'"
              >
                <div 
                  v-for="(imgSrc, idx) in activeSlide.images" 
                  :key="idx" 
                  class="relative rounded-[24px] overflow-hidden shadow-2xl border border-white/20 flex flex-col bg-black/40 backdrop-blur-sm transition-all duration-500"
                  :class="activeSlide.format === 'ROOMS' 
                    ? 'flex-1' 
                    : (idx === 1 ? 'w-[525px] aspect-[16/9] border-[#d4af37]/60 z-10' : 'w-[500px] aspect-[16/9] z-0')"
                >
                  <div class="absolute inset-0 w-full h-full">
                      <img :src="imgSrc" class="w-full h-full object-cover live-img-pan scale-110" />
                      <div v-if="activeSlide.format === 'ROOMS'" class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  </div>

                  <!-- Room Pricing Pane Overlay -->
                  <div v-if="activeSlide.format === 'ROOMS' && activeSlide.roomDetails" class="relative bg-black/30 z-10 mt-auto p-8 flex flex-col justify-end text-white">
                    <h3 class="text-[34px] font-display font-bold uppercase tracking-wider mb-2 drop-shadow-md">
                      {{ activeSlide.roomDetails[idx].name }}
                    </h3>
                    <p class="font-sans text-white/80 text-[18px] mb-4 h-[55px] line-clamp-2 leading-relaxed drop-shadow-md">{{ activeSlide.roomDetails[idx].desc }}</p>
                    <div class="text-[48px] font-display font-bold text-[#d4af37] flex items-baseline drop-shadow-md">
                      <span class="text-[24px] mr-1">₹</span>{{ activeSlide.roomDetails[idx].price }}
                      <span class="text-[18px] text-white/60 font-sans font-medium uppercase tracking-widest ml-3">/ NIGHT</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Shared Events/Catering 7-Item Strip -->
              <div v-if="['EVENTS', 'CATERING'].includes(activeSlide.format)" class="w-full flex flex-col items-center mt-10 live-fade-el">
                <div class="flex items-center gap-6 mb-8 w-full justify-center">
                   <div class="flex-1 max-w-[300px] h-[2px] bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                   <h3 class="text-[32px] font-sans font-medium tracking-[0.1em] text-white uppercase drop-shadow-md">
                     Perfect {{ activeSlide.format === 'EVENTS' ? 'Venue' : 'Catering' }} for Every Occasion
                   </h3>
                   <div class="flex-1 max-w-[300px] h-[2px] bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                </div>
                <div class="w-full max-w-[1500px] flex justify-between items-start px-8 live-stagger-icons">
                   <template v-for="(evt, eIdx) in eventTypes" :key="eIdx">
                     <div class="flex flex-col items-center text-center w-[140px] group">
                       <div class="w-[60px] h-[60px] mb-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-md" 
                            :class="activeSlide.format === 'EVENTS' ? 'text-[#ec4899]' : 'text-[#d4af37]'" v-html="evt.icon"></div>
                       <span class="text-[16px] font-sans font-medium tracking-wide text-white/90 whitespace-pre-line leading-tight">{{ evt.name }}</span>
                     </div>
                   </template>
                </div>
              </div>

              <!-- Shared 3 Features Horizontal Strip -->
              <div 
                v-if="['ROOMS', 'EVENTS', 'CATERING'].includes(activeSlide.format)" 
                class="w-full absolute bottom-[10px] flex justify-center inset-x-0 mx-auto mb-[25px] live-fade-el"
              >
                <div 
                  class="backdrop-blur-xl border rounded-[20px] px-10 py-4 flex items-center gap-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-500"
                  :class="{
                    'bg-[#051024]/95 border-[#1e40af]/60': activeSlide.format === 'ROOMS',
                    'bg-[#2a0715]/95 border-[#9d174d]/60': activeSlide.format === 'EVENTS',
                    'bg-[#260808]/95 border-[#991b1b]/60': activeSlide.format === 'CATERING'
                  }"
                >
                  <template v-for="(feature, index) in featureStrips[activeSlide.format]" :key="index">
                    
                    <!-- Feature Item -->
                    <div class="flex items-center gap-4">
                      <!-- Themed Icon Color -->
                      <div 
                        class="w-8 h-8 drop-shadow-md" 
                        :class="{
                          'text-[#60a5fa]': activeSlide.format === 'ROOMS',
                          'text-[#f472b6]': activeSlide.format === 'EVENTS',
                          'text-[#f87171]': activeSlide.format === 'CATERING'
                        }"
                        v-html="feature.icon"
                      ></div>
                      
                      <!-- Crisp White Text -->
                      <span class="text-[16px] font-sans font-medium tracking-wider uppercase text-white whitespace-nowrap">
                        {{ feature.name }}
                      </span>
                    </div>
                    
                    <!-- Bronze/Gold Divider (Matches the image) -->
                    <div v-if="index < 2" class="w-[2px] h-7 opacity-70 rounded-full"
                    :class="{
                          'bg-[#60a5fa]': activeSlide.format === 'ROOMS',
                          'bg-[#f472b6]': activeSlide.format === 'EVENTS',
                          'bg-[#f87171]': activeSlide.format === 'CATERING'
                        }"
                    ></div>
                    
                  </template>
                </div>
              </div>

              <!-- Universal Symmetrical Footer Contacts -->
              <div class="absolute bottom-[40px] left-[80px] flex items-center gap-3 live-fade-el opacity-0">
                 <svg class="w-8 h-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"></path></svg>
                 <span class="text-[24px] font-display font-bold tracking-widest text-white drop-shadow-md">
                    {{ activeSlide.format === 'ROOMS' ? '90481 17064' : '8848 369 567' }}
                  </span>
              </div>
              <div class="absolute bottom-[40px] right-[80px] live-fade-el opacity-0">
                 <span class="text-[24px] font-display font-medium tracking-widest text-white/90 drop-shadow-md">www.capsfamily.in</span>
              </div>

            </div>


            <!-- ---------------------------------------- -->
            <!-- FORMAT C: FOOD DELIVERY (ROAD THEME)     -->
            <!-- ---------------------------------------- -->
            <div v-else-if="activeSlide.format === 'DELIVERY'" class="w-full h-full relative text-[#0f172a] live-slide-wrapper">

              <!-- Reduced Top & Left Offsets -->
              <div class="absolute top-[280px] left-[70px] z-20">
                
                <!-- Scaled down Main Title -->
                <h1 class="text-[80px] font-display font-bold leading-[1.1] tracking-tighter drop-shadow-lg live-del-anim opacity-0 translate-x-[-30px]">
                  FOOD.<br/>
                  <span class="text-[#2563eb] text-[100px] mb-[30px]">DELIVERED.</span>
                </h1>
                
                <!-- Scaled down Subtitle -->
                <p class="text-[30px] font-sans font-bold text-gray-800 my-[15px] leading-tight live-del-anim drop-shadow-sm opacity-0 translate-x-[-30px]">
                  Fresh from CAPS.<br/>Straight to your door.
                </p>
                
                <!-- Scaled down Delivery Action Box -->
                <div class="mt-[35px] bg-white/95 backdrop-blur-md rounded-[30px] p-[20px] pr-[45px] inline-flex items-center gap-[25px] shadow-2xl border-l-[8px] border-[#2563eb] live-del-box opacity-0 scale-95">
                   <div class="text-[#2563eb]">
                    <div class="text-[#2563eb]">
                      <!-- Scaled down Delivery SVG -->
                      <svg
                        class="w-[75px] h-[75px]"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                      >
                        <path d="M45.88,47.38v-2a1,1,0,0,0,1-1v-4a1,1,0,0,0-1-1h-25a2,2,0,0,0-2,2v4h4v2h-5a1,1,0,0,1-1-1v-5a4,4,0,0,1,4-4h25a3,3,0,0,1,3,3v4A3,3,0,0,1,45.88,47.38Z"/>
                        <path d="M76.88,35.37c-3.24,0-7-2.62-7-6s3.76-6,7-6a1,1,0,0,1,1,1v10A1,1,0,0,1,76.88,35.37Zm-1-9.89c-2,.43-4,2-4,3.89s2,3.46,4,3.89V25.48Z"/>
                        <path d="M43.88,39.12h-2V20.62h-22v18.5h-2V19.62a1,1,0,0,1,1-1h24a1,1,0,0,1,1,1v19.5Z"/>
                        <rect x="73.91" y="30.95" width="2" height="22.84" transform="translate(-11.15 41.48) rotate(-28.9)" />
                        <rect x="30.88" y="70.38" width="42" height="2"/>
                        <rect x="30.46" y="65.38" width="0.43" height="2"/>
                        <path d="M9.3,67.38H3.88a1,1,0,0,1-1-1.24L4.5,59.76A19,19,0,0,1,22.93,45.38h23a1,1,0,0,1,1,1.17L44.64,59.88a3,3,0,0,0,3,3.5H58.46a3,3,0,0,0,2.86-2.09l4.51-14.08L61,30.81l-3.62-5.43H51.88v-2h6a1,1,0,0,1,.83.45l4,6a1,1,0,0,1,.13.27l5,16.84a1,1,0,0,1,0,.59L63.23,61.9a5,5,0,0,1-4.76,3.47H47.61a5,5,0,0,1-4.94-5.82l2-12.18H22.93A17,17,0,0,0,6.44,60.25L5.17,65.38H9.3v2Z"/>
                        <path d="M83.88,75.38a6,6,0,1,1,6-6A6,6,0,0,1,83.88,75.38Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,83.88,65.38Z"/>
                        <path d="M72.38,33.38H62.47a1.08,1.08,0,0,1-1.09-1v-6a1,1,0,0,1,1-1h10v2h-9v4h9v2Z"/>
                        <path d="M65.6,70.69a18,18,0,0,1,14.7-19,18.46,18.46,0,0,1,1.91-.24,17.9,17.9,0,0,1,14.65,5.82,1,1,0,0,1,0,1.36l-3.71,4-1.46-1.36,3.06-3.29a16,16,0,0,0-12.38-4.52,16.89,16.89,0,0,0-1.7.22A16,16,0,0,0,67.59,70.54Z"/>
                        <path d="M83.88,81.38a12,12,0,0,1-11.8-9.85,11.71,11.71,0,0,1-.2-2.15A12,12,0,0,1,92.76,61.3h0A12,12,0,0,1,83.88,81.38Zm0-22a10,10,0,0,0-10,10A9.71,9.71,0,0,0,74,71.16a10,10,0,1,0,17.24-8.51h0A10,10,0,0,0,83.88,59.38Z"/>
                        <path d="M19.88,81.38A12,12,0,0,1,8.34,66.1a1,1,0,0,1,1-.73h6.6v2H10.09a10,10,0,1,0,19.63,3.79,9.67,9.67,0,0,0,.16-1.79,9.78,9.78,0,0,0-.21-2H23.86v-2h6.6a1,1,0,0,1,1,.73,12,12,0,0,1,.47,3.27,11.68,11.68,0,0,1-.2,2.15A12,12,0,0,1,19.88,81.38Z"/>
                        <path d="M19.88,75.38a6,6,0,0,1-6-6,5.92,5.92,0,0,1,1.22-3.6,1,1,0,0,1,.8-.4h8a1,1,0,0,1,.79.39,5.87,5.87,0,0,1,1.24,3.61A6,6,0,0,1,19.88,75.38Zm-3.45-8a3.91,3.91,0,0,0-.55,2,4,4,0,0,0,8,0,3.86,3.86,0,0,0-.56-2H16.44Z"/>
                      </svg>
                  </div>
                  </div>
                   <div class="flex flex-col">
                     <span class="text-[24px] font-display font-bold text-[#2563eb] uppercase tracking-widest mb-[4px] leading-none">FREE HOME DELIVERY</span>
                     <div class="flex mt-[10px] items-center gap-[12px] text-[34px] font-sans font-bold text-gray-900 tracking-wider leading-none">
                       <svg class="w-10 h-10 text-[#0f172a]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"></path></svg>
                       92075 17064
                     </div>
                   </div>
                </div>
                
                <!-- Scaled down Bottom Left Delivery Features -->
                <div class="mt-[45px] flex items-center gap-[35px] bg-white/80 backdrop-blur-md px-[30px] py-[18px] rounded-[24px] shadow-xl border border-white live-del-feat opacity-0 translate-y-[20px] w-max">
                  <div class="flex items-center gap-4">
                    <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span class="font-sans font-bold uppercase text-[18px] leading-tight">Always<br/>Fresh</span>
                  </div>
                  <div class="w-[2px] h-[45px] bg-black/10"></div>
                  <div class="flex items-center gap-4">
                    <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
                    <span class="font-sans font-bold uppercase text-[18px] leading-tight">Served<br/>Hot</span>
                  </div>
                  <div class="w-[2px] h-[45px] bg-black/10"></div>
                  <div class="flex items-center gap-4">
                    <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span class="font-sans font-bold uppercase text-[18px] leading-tight">Delivered<br/>Fast</span>
                  </div>
                </div>
              </div>
              
              <!-- Floating Cursive Text (Moved Higher, Scaled Down) -->
              <div class="absolute top-[60px] right-[520px] -rotate-6 z-30 live-del-cursive opacity-0 scale-90">
                 <p class="font-['Dancing_Script'] text-[50px] text-[#2563eb] leading-[1.1] drop-shadow-md">
                   Your favourites.<br/>Now closer to you.
                 </p>
              </div>
              
              <!-- Scaled down Rider and Repositioned Marker -->
              <div class="absolute bottom-[0px] right-[400px] w-[900px] h-[850px] z-10 pointer-events-none flex items-end justify-end">
                 <!-- Map Marker (Moved A LOT left, slightly bottom) -->
                 <div id="live-delivery-marker" class="absolute top-[45%] left-[20%] z-0 opacity-0 scale-50">
                    <svg class="w-[85px] h-[85px] text-[#2563eb] drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                 </div>
                 
                 <!-- Rider Image (Scaled down to 90% of the new smaller container) -->
                 <img id="live-delivery-rider" src="/images/live/rider.png" class="absolute -bottom-[100px] right-[100px] w-[90%] object-contain z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] opacity-0 translate-x-[100px] -translate-y-[100px]" alt="CAPS Delivery Rider" />
              </div>
            </div>

          </div>

          <!-- ========================================== -->
          <!-- 3. BOTTOM NAVIGATION TRACKER PANE          -->
          <!-- ========================================== -->
          <div v-if="!isScreensaverActive" class="absolute bottom-0 left-0 w-full h-[115px] bg-[#0f172a] border-t border-white/10 z-50 flex items-center justify-between px-[77px] shadow-[0_-10px_29px_rgba(0,0,0,0.5)]">
            
            <div class="flex flex-col items-center text-[#d4af37] font-medium uppercase tracking-widest text-[16px] w-[140px]">
              <span>Next Up</span>
              <svg class="w-[26px] h-[26px] mt-[4px] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>

            <!-- 5 Essential Categories -->
            <div class="flex-1 flex justify-center items-center gap-[60px] max-w-[1300px] mx-auto">
              <template v-for="(cat, idx) in navCategories" :key="cat.id">
                
                <div 
                  class="flex flex-col items-center gap-[8px] transition-all duration-700 w-[140px]"
                  :class="activeSlide && activeSlide.trackerId === cat.id ? 'opacity-100 scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'opacity-40 scale-100'"
                >
                  <!-- DYNAMIC ICON COLOR -->
                  <div 
                    class="w-[45px] h-[45px] transition-colors duration-700 flex items-center justify-center text-white"
                    :style="activeSlide && activeSlide.trackerId === cat.id ? { color: getCategoryColor(cat.id) } : {}"
                    v-html="cat.icon"
                  ></div>
                  
                  <!-- DYNAMIC UNDERLINE, WHITE TEXT -->
                  <span 
                    class="text-[14px] font-sans font-bold uppercase tracking-widest text-white text-center whitespace-nowrap transition-all duration-700"
                    :class="{'border-b-2 pb-[2px]' : activeSlide && activeSlide.trackerId === cat.id}"
                    :style="activeSlide && activeSlide.trackerId === cat.id ? { borderBottomColor: getCategoryColor(cat.id) } : {}"
                  >
                    {{ cat.name }}
                  </span>
                </div>

                <!-- Separator Arrows -->
                <div v-if="idx < navCategories.length - 1" class="text-white/20 px-[20px]">
                  <svg class="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </template>
            </div>
            
            <div class="flex flex-col text-right justify-center text-white/50 font-display text-[15px] tracking-[0.25em] leading-relaxed uppercase w-[200px] border-b-2 border-white/20 pb-1">
               <span>Good Food.</span>
               <span>Great Memories.</span>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- 4. SCREENSAVER LOOP ENGINE                 -->
          <!-- ========================================== -->
          <div v-if="isScreensaverActive" class="absolute inset-0 z-[100] bg-[#040404] flex items-center justify-center screensaver-container">
            <div class="relative z-10 flex flex-col items-center">
              <img id="saver-logo" src="/images/caps-solid-logo.png" class="h-[154px] mb-[38px] opacity-0" alt="Hotel CAPS" />
              <div class="perspective-[1000px] flex flex-col items-center font-display text-white">
                <p class="text-[29px] font-medium tracking-[0.4em] leading-loose flex ml-[0.4em]">
                  <span v-for="(char, i) in 'HOTEL'.split('')" :key="'sh-'+i" class="saver-h-char inline-block opacity-0">{{ char }}</span>
                </p>
                <p class="text-[58px] font-bold tracking-[0.3em] mt-[2px] flex ml-[0.3em]">
                  <span v-for="(char, i) in 'CAPS'.split('')" :key="'sc-'+i" class="saver-c-char inline-block opacity-0">{{ char }}</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// =====================================
// UI CONSTANTS & DATA MAPS
// =====================================

const navCategories = [
  {
    id: 'specials',
    name: 'SPECIALS',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/>
        <path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/>
        <path d="M5 14l.6 1.7 1.7.6-1.7.6L5 18.6l-.6-1.7-1.7-.6 1.7-.6L5 14z"/>
      </svg>
    `
  },

  {
    id: 'delivery',
    name: 'FOOD DELIVERY',
    icon: `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Rear delivery box -->
        <rect x="2.5" y="6.5" width="9" height="5" rx="0.8"/>
        <path d="M2.5 9h9"/>

        <!-- Rear body / mudguard -->
        <path d="M3.5 17
                v-2
                a3 3 0 0 1 3-3
                h5"/>

        <!-- Scooter floorboard -->
        <path d="M10.5 17h5"/>

        <!-- Front frame -->
        <path d="M13 17
                h2.2
                l1.6-8.5"/>

        <!-- Handlebar -->
        <path d="M16.8 8.5h2.7"/>
        <path d="M18.8 8.5V7"/>
        <path d="M18.8 7h1.7"/>

        <!-- Seat -->
        <path d="M10.5 12h3.2"/>

        <!-- Rear wheel -->
        <circle cx="7" cy="18" r="2.5"/>
        <circle cx="7" cy="18" r="0.45"/>

        <!-- Front wheel -->
        <circle cx="18" cy="18" r="2.5"/>
        <circle cx="18" cy="18" r="0.45"/>

        <!-- Front connection -->
        <path d="M16.8 10
                l1.2 5.5"/>

        <!-- Small rear detail -->
        <path d="M3.5 14.5H2"/>
      </svg>
    `
  },

  {
    id: 'rooms',
    name: 'ROOMS',
    icon: `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Headboard -->
        <path d="M3 4v16"/>

        <!-- Pillow -->
        <path d="M3 8h4
                a2 2 0 0 1 2 2
                v2"/>

        <!-- Mattress / bed -->
        <path d="M3 12h15
                a3 3 0 0 1 3 3
                v3H3"/>

        <!-- Legs -->
        <path d="M3 18v2"/>
        <path d="M21 18v2"/>
      </svg>
    `
  },

  {
    id: 'events',
    name: 'EVENTS HALL',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 20h18"/>
        <path d="M5 20V9l7-5 7 5v11"/>
        <path d="M8 20v-6h8v6"/>
        <path d="M8 10h.01"/>
        <path d="M12 10h.01"/>
        <path d="M16 10h.01"/>
      </svg>
    `
  },

  {
    id: 'catering',
    name: 'CATERING',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 17h18"/>
        <path d="M5 17a7 7 0 0114 0"/>
        <path d="M12 7V5"/>
        <path d="M10 5h4"/>
        <path d="M2 20h20"/>
      </svg>
    `
  }
];

const eventTypes = [
  {
    name: 'Weddings',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="12" r="5"/>
        <circle cx="15" cy="12" r="5"/>
        <path d="M11 7l1-2 1 2"/>
      </svg>
    `
  },

  {
    name: 'Receptions',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 20h16"/>
        <path d="M6 20v-8h12v8"/>
        <path d="M8 12V8h8v4"/>
        <path d="M10 8V5h4v3"/>
        <path d="M9 16h6"/>
      </svg>
    `
  },

  {
    name: 'Corporate\nMeetings',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="7" width="18" height="12" rx="2"/>
        <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7"/>
        <path d="M3 12h18"/>
        <path d="M10 12v2h4v-2"/>
      </svg>
    `
  },

  {
    name: 'Birthday\nParties',
    icon: `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <!-- Candle -->
        <path d="M12 3v3"/>
        <path d="M12 1.5c.9.8 1.4 1.5 1.4 2.2A1.4 1.4 0 0 1 12 5.1a1.4 1.4 0 0 1-1.4-1.4c0-.7.5-1.4 1.4-2.2z"/>

        <!-- Top cake tier -->
        <rect x="7" y="7" width="10" height="5" rx="1.2"/>

        <!-- Top icing -->
        <path d="M7 9.2c1 .9 1.8.9 2.8 0s1.8-.9 2.8 0 1.8.9 2.8 0 1.6-.8 1.6-.8"/>

        <!-- Bottom cake tier -->
        <rect x="4" y="12" width="16" height="7" rx="1.4"/>

        <!-- Bottom icing -->
        <path d="M4 14.5c1.2 1 2.2 1 3.4 0s2.2-1 3.4 0 2.2 1 3.4 0 2.2-1 3.4 0 2.4 1 2.4 1"/>

        <!-- Cake stand -->
        <path d="M3 21h18"/>
      </svg>
    `
  },

  {
    name: 'Anniversaries',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 8.5c0 5-8 10-8 10s-8-5-8-10A4.5 4.5 0 0112 5a4.5 4.5 0 018 3.5z"/>
        <path d="M9 4l1-2"/>
        <path d="M15 4l-1-2"/>
      </svg>
    `
  },

  {
    name: 'Conferences',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2"/>
        <path d="M8 20h8"/>
        <path d="M12 16v4"/>
        <path d="M7 12l3-3 2 2 4-4"/>
      </svg>
    `
  },

  {
    name: 'Private\nGatherings',
    icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="8" r="3"/>
        <circle cx="16.5" cy="9" r="2.5"/>
        <path d="M3 20v-1.5A5.5 5.5 0 018.5 13h1A5.5 5.5 0 0115 18.5V20"/>
        <path d="M15 14a4.5 4.5 0 016 4v2"/>
      </svg>
    `
  }
];

const staticSlidesData = [
  { format: 'DELIVERY', trackerId: 'delivery' },
  { 
    format: 'ROOMS', trackerId: 'rooms', title: 'SUITES & ROOMS', subtitle: 'Comfort for every journey.',
    images: ['/images/rooms/standard/1.jpg', '/images/rooms/deluxe/1.jpg', '/images/rooms/suite/1.jpg'],
    roomDetails: [
      { name: 'STANDARD ROOM', desc: 'Comfortable, elegantly furnished rooms designed for a restful stay.', price: '2,500' },
      { name: 'DELUXE ROOM', desc: 'Spacious rooms with modern amenities for a more relaxed and enjoyable stay.', price: '2,800' },
      { name: 'PREMIUM SUITE', desc: 'An elevated experience with extra space, premium comfort and refined elegance.', price: '3,500' }
    ]
  },
  { 
    format: 'EVENTS', trackerId: 'events', title: 'EVENTS HALL', subtitle: 'A beautiful setting for celebrations, gatherings and everything worth remembering.',
    images: ['/images/hall/live/2.jpg', '/images/hall/live/1.jpg', '/images/hall/live/3.jpg']
  },
  { 
    format: 'CATERING', trackerId: 'catering', title: 'OUTDOOR CATERING', subtitle: 'Great food. Memorable moments. Anywhere you celebrate.',
    images: ['/images/catering/live/2.jpg', '/images/catering/live/1.jpg', '/images/catering/live/3.jpg']
  }
];

const liveDate = computed(() => {
  const now = new Date();
  return { 
    day: String(now.getDate()).padStart(2, '0'), 
    month: now.toLocaleString('en-US', { month: 'short' }).toUpperCase(), 
    year: now.getFullYear(), 
    weekday: now.toLocaleString('en-US', { weekday: 'long' }) 
  };
});

// =====================================
// SCALING ENGINE
// =====================================
const stageScale = ref(1);
const updateScale = () => {
  if (typeof window !== 'undefined') {
    stageScale.value = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  }
};

// =====================================
// DYNAMIC DATA (WP) & PAGINATION ENGINE
// =====================================
const dynamicSpecials = ref([]);
const hasStarted = ref(false);
const activeSlideIndex = ref(-1);
const activeSlide = ref(null);
const isScreensaverActive = ref(false);
const bgTintRef = ref(null);
let loopTimeout = null;

const featureStrips = {
  ROOMS: [
    { 
      name: 'Car Parking', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M9 16V8h4a2 2 0 0 1 0 4H9"></path></svg>' 
    },
    { 
      name: 'Elevator Access', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M12 7v4"></path><path d="M10 9l2-2 2 2"></path><path d="M12 17v-4"></path><path d="M10 15l2 2 2-2"></path></svg>' 
    },
    { 
      name: '24 Hour Service', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg>' 
    }
  ],
  EVENTS: [
    { 
      name: 'A/V Capabilities', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="11" rx="2" ry="2"></rect><path d="M8 21h8"></path><path d="M12 18v3"></path></svg>' 
    },
    { 
      name: 'Corporate Events', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>' 
    },
    { 
      name: 'Grand Decor', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>' 
    }
  ],
  CATERING: [
    { 
      name: 'Outdoor Setup', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18"></path><path d="M21 21v-4a2 2 0 0 0-2-2h-3L12 5 6 15H3v6"></path><path d="M12 11v10"></path></svg>' 
    },
    { 
      name: 'Custom Menus', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>' 
    },
    { 
      name: 'Live Counters', 
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2c0 0-6 4-6 11s2 6 6 6 6-2 6-6-6-11-6-11z"></path><path d="M12 2v17"></path></svg>' 
    }
  ]
};

// 2. Add this helper function to your <script setup> to route the colors perfectly
const getCategoryColor = (categoryName) => {
  const colors = {
    'specials': '#D97706',
    'rooms': '#2563eb',
    'restaurant': '#03a661',
    'events': '#e22473', 
    'catering': '#df4444',
    'delivery' : '#0ea5e9'
  };
  return colors[categoryName] || '#D97706'; // Defaults to gold if unmatched
};

onMounted(async () => {
  updateScale();
  window.addEventListener('resize', updateScale);
  
  // Real WP Fetch integration
  const wpUrl = `https://public-api.wordpress.com/wp/v2/sites/hotelcapsfamily.wordpress.com/pages?slug=specials-data&_t=${Date.now()}`;
  try {
    const response = await $fetch(wpUrl);
    if (response && Array.isArray(response) && response.length > 0) {
        let rawString = response[0].content.rendered;
        let cleanString = rawString.replace(/<[^>]*>?/gm, '')
        .replace(/&#8220;|&#8221;|“|”/g, '"').replace(/&#8216;|&#8217;|‘|’/g, "'")
        .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#8211;|&#8212;/g, '-').trim();
        dynamicSpecials.value = JSON.parse(cleanString);
    } 
  } catch (error) {
    console.error("Live Fetch Error:", error);
  }
});

const capsSpecialsData = computed(() => {
  const outletsConfig = [
    {
      key: 'Chill N Chai',
      name: 'Chill N Chai',
      subtitle: 'Tea · Snacks · Good Vibes',
      color: '#78350f',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 9h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V9z"/>
          <path d="M17 11h1.5a3 3 0 010 6H17"/>
          <path d="M7 5c0-1.5 1.5-1.5 1.5-3"/>
          <path d="M11 5c0-1.5 1.5-1.5 1.5-3"/>
          <path d="M5 22h14"/>
        </svg>
      `
    },

    {
      key: 'Arabic Corner',
      name: 'Arabic Corner',
      subtitle: 'Tradition · Flavour · Taste',
      color: '#451a03',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 20h16"/>
          <path d="M6 20v-7.2c0-2.1 1-4.1 2.8-5.7L12 4l3.2 3.1c1.8 1.6 2.8 3.6 2.8 5.7V20"/>
          <path d="M8.5 15h7"/>
          <path d="M9.5 15a2.5 2.5 0 0 1 5 0"/>
          <path d="M12 11.7v-.2"/>
        </svg>
      `
    },

    {
      key: 'Multi-Cuisine Restaurant',
      name: 'Restaurant',
      subtitle: 'Many Flavours · One Table',
      color: '#14532d',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5.5 4v4"/>
          <path d="M7.5 4v4"/>
          <path d="M9.5 4v4"/>
          <path d="M7.5 8v6"/>
          <path d="M15.5 4a2.5 2.5 0 0 1 0 5"/>
          <path d="M15.5 9v5"/>
          <path d="M4 18c1.8 1.3 4.6 2 8 2s6.2-.7 8-2"/>
        </svg>
      `
    }
  ];

  const listSlides = [];
  let currentSlideOutlets = [];
  let currentSlideCols = 0; // The strict 16:9 3-column max tracker

  outletsConfig.forEach(out => {
    const items = dynamicSpecials.value.filter(item => item.category === out.key || item.category === out.name);
    if (items.length === 0) return;

    // Strict constraint mapping: chunk into batches of max 5 items
    const chunks = [];
    for (let i = 0; i < items.length; i += 5) {
      chunks.push(items.slice(i, i + 5).map(item => ({
        name: item.name, price: item.price, description: item.description, isVeg: item.isVeg === true || item.isVeg === 'true'
      })));
    }

    // Assign chunks to current slide or push and create a new slide if columns hit max threshold (3)
    chunks.forEach(chunk => {
      if (currentSlideCols >= 3) {
        listSlides.push({ format: 'LIST', trackerId: 'specials', mainTitle: "TODAY'S SPECIALS", outlets: currentSlideOutlets });
        currentSlideOutlets = [];
        currentSlideCols = 0;
      }
      
      // If the outlet already exists on this slide, just append the new column array (forces col-span on UI)
      let existingOutlet = currentSlideOutlets.find(o => o.name === out.name);
      if (!existingOutlet) {
        existingOutlet = { name: out.name, color: out.color, subtitle: out.subtitle, icon: out.icon, columns: [] };
        currentSlideOutlets.push(existingOutlet);
      }
      existingOutlet.columns.push(chunk);
      currentSlideCols++;
    });
  });

  if (currentSlideOutlets.length > 0) {
    listSlides.push({ format: 'LIST', trackerId: 'specials', mainTitle: "TODAY'S SPECIALS", outlets: currentSlideOutlets });
  }

  return [...listSlides, ...staticSlidesData];
});

// =====================================
// GSAP CHOREOGRAPHY ENGINE
// =====================================
const startLiveSignage = () => {
  if (typeof window !== 'undefined') {
    const elem = document.documentElement;
    if (!document.fullscreenElement && elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  }
  hasStarted.value = true;
  runCycle(0);
};

const runCycle = async (index) => {
  if (index >= capsSpecialsData.value.length) {
    runScreensaver();
    return;
  }

  activeSlideIndex.value = index;
  activeSlide.value = capsSpecialsData.value[index];
  await nextTick();

  const tlIn = gsap.timeline();
  
  // 1. Updated Background Tint Mapping for non-delivery slides
  if (bgTintRef.value && activeSlide.value.format !== 'DELIVERY') {
    if (activeSlide.value.format === 'ROOMS') {
      bgTintRef.value.style.backgroundColor = '#2563eb'; // Blue
      bgTintRef.value.style.opacity = '0.70';
    } else if (activeSlide.value.format === 'EVENTS') {
      bgTintRef.value.style.backgroundColor = '#e22473'; // Pink/Magenta
      bgTintRef.value.style.opacity = '0.75';
    } else if (activeSlide.value.format === 'CATERING') {
      bgTintRef.value.style.backgroundColor = '#df4444'; // Red/Terracotta
      bgTintRef.value.style.opacity = '0.75';
    } else if (activeSlide.value.format === 'LIST') {
      bgTintRef.value.style.backgroundColor = 'transparent';
      bgTintRef.value.style.opacity = '0';
    } else {
      // Default/Restaurant/Specials fallback
      bgTintRef.value.style.backgroundColor = '#03a661'; // Green
      bgTintRef.value.style.opacity = '0.75';
    }
  }

  if (activeSlide.value.format === 'DELIVERY') {
    // Stage dramatic rider entry & marker drop
    tlIn.to('.live-del-anim', { x: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: 'power3.out' }, 0)
        .to('.live-del-box', { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' }, 0.4)
        .to('.live-del-feat', { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.6)
        .to('.live-del-cursive', { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, 0.8)
        .to('#live-delivery-rider', { x: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }, 0.2)
        .to('#live-delivery-marker', { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'bounce.out' }, 1.0);
  } else if (activeSlide.value.format === 'LIST') {
    // Stage Lists float up
    tlIn.to('.live-fade-el', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0)
        .to('.live-anim-grid', { opacity: 1, duration: 1, ease: 'power2.out' }, 0.2)
        .fromTo('.live-stagger-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, 0.3)
        .fromTo('.live-stagger-item', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' }, 0.6);
  } else {
    // Stage Universal smooth staggered float up
    tlIn.to('.live-fade-el', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0)
        .to('.live-stagger-el', { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2)
        .fromTo('.live-stagger-icons > div', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' }, 0.6);
        
    // Infinite gentle panning on images
    gsap.to('.live-img-pan', { scale: 1.05, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }

  // Exact durations: Specials 8s, Others 7s
  const duration = activeSlide.value.format === 'LIST' ? 8000 : 7000;

  loopTimeout = setTimeout(() => {
    gsap.to('.live-slide-wrapper > *', {
      opacity: 0, y: -20, duration: 0.6, ease: 'power2.in', stagger: 0.05,
      onComplete: () => runCycle(index + 1)
    });
  }, duration - 800);
};

const runScreensaver = async () => {
  isScreensaverActive.value = true;
  activeSlide.value = null; 
  await nextTick();

  const tl = gsap.timeline({
    onComplete: () => {
      setTimeout(() => {
        gsap.to('.screensaver-container', { opacity: 0, duration: 1, onComplete: () => {
            isScreensaverActive.value = false;
            runCycle(0);
        }});
      }, 1000);
    }
  });

  tl.to('#saver-logo', { opacity: 1, duration: 1.5, ease: 'power2.out' })
    .fromTo('.saver-h-char', { opacity: 0, rotationY: 90 }, { opacity: 1, rotationY: 0, duration: 1.5, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.5")
    .fromTo('.saver-c-char', { opacity: 0, scale: 3 }, { opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=0.8");
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale);
  clearTimeout(loopTimeout);
});

const pageTitle = 'CAPS Live | Hotel CAPS, Koduvayur, Palakkad'
const pageDesc = 'Experience the Hotel CAPS Live digital feed. Stay updated with our daily specials, festive specials, exclusive highlights, & everything we offer.'
const canonicalUrl = 'https://capsfamily.in/live'
const ogImage = 'https://capsfamily.in/images/favicons/caps-live-og-image.jpg'

// 2. Structured Link and JSON-LD Schema Injection
useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": pageTitle,
        "description": pageDesc,
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "Restaurant",
          "name": "Hotel CAPS Multi-Cuisine Restaurant",
          "url": "https://capsfamily.in/restaurant",
          "telephone": [
            "+919207517064",
            "+918848369567"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main Road, Pittupeedika",
            "addressLocality": "Koduvayur",
            "addressRegion": "Kerala",
            "postalCode": "678501",
            "addressCountry": "IN"
          }
        }
      })
    }
  ]
})

// 3. Nuxt 4 SEO Composable (Search & Social Cards)
useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: canonicalUrl,
  ogImage: ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterImage: ogImage
})
</script>
