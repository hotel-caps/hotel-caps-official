<template>
  <header 
    class="fixed top-0 left-0 w-full lg:px-0 xl:px-4 z-50 transition-all duration-500 ease-in-out"
    :class="headerBgClass"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- LOGO -->
        <NuxtLink to="/" class="flex items-end space-x-2 xl:space-x-3">
          <NuxtImg 
            src="/images/caps-solid-logo.png" 
            alt="Hotel CAPS Logo"
            width="300"
            height="267"
            quality="80"
            format="webp"
            fetchpriority="high"
            loading="eager"
            class="h-[2rem] sm:h-[2.5rem] w-[2.2472rem] sm:w-[2.809rem]" 
          />
          <div class="text-white font-medium font-display text-3xl leading-6 sm:text-3xl xl:text-4xl tracking-wider xl:leading-9 lg:leading-8 sm:leading-7">
            <span>HOTEL </span>
            <span class="font-semibold">CAPS</span>
          </div>
        </NuxtLink>

        <!-- DESKTOP NAVIGATION -->
        <nav class="hidden lg:flex items-center space-x-8 mt-1 desktop-nav-container">
          <div 
            v-for="navItem in navLinks" 
            :key="navItem.text"
            class="relative h-20 flex items-center cursor-default"
            @mouseenter="openDropdownOnHover(navItem.text)"
            @mouseleave="closeDropdownOnMouseLeave"
          >
            <!-- Main navigation link -->
            <div
              @click.prevent="toggleDropdown(navItem.subLinks.length > 0 ? navItem.text : null)"
              class="flex items-center xl:text-lg text-white font-display tracking-wider transition-all duration-300"
              :class="[
                navItem.mainHoverClass, 
                activeDropdown === navItem.text ? navItem.mainHoverClass.split(' ')[0].replace('hover:', '') : ''
              ]"
            >
              {{ navItem.text }}
              <PhCaretDown 
                v-if="navItem.subLinks.length > 0" 
                :size="16" 
                class="ml-1.5 transition-transform duration-300 opacity-70"
                :class="{ 'rotate-180': activeDropdown === navItem.text }" 
              />
            </div>

            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div 
                v-if="navItem.subLinks.length > 0 && activeDropdown === navItem.text"
                class="absolute top-[70px] left-1/2 -translate-x-1/2 pt-4 w-56 z-50"
              >
                <!-- Upward Pointer / Caret -->
                <div 
                  class="absolute top-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[8px]"
                  :class="dropdownCaretColor"
                ></div>
                
                <!-- Dropdown Body -->
                <ul class="rounded-xl border shadow-2xl overflow-hidden p-2 flex flex-col gap-1 backdrop-blur-xl transition-colors duration-300"
                    :class="dropdownBgClass">
                  <li v-for="subLink in navItem.subLinks" :key="subLink.text">
                    <NuxtLink 
                      :to="subLink.link" 
                      @click="activeDropdown = null"
                      class="flex items-center h-11 px-4 text-sm font-medium text-gray-200 rounded-lg transition-colors duration-200"
                      :class="subLink.hoverClass"
                    >
                      <component :is="subLink.icon" :size="18" class="mr-3 opacity-70" />
                      {{ subLink.text }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- DESKTOP CONTACT BUTTON -->
        <div class="hidden lg:block">
          <NuxtLink to="/contact" class="contact-bubble-button tracking-widest xl:text-lg font-display py-2 px-4 sm:py-2.5 sm:px-6 mt-2 xl:ml-20 rounded-lg">
            Contact Us
          </NuxtLink>
        </div>

        <!-- MOBILE HAMBURGER BUTTON -->
        <ClientOnly>
          <Teleport to="body">
            <div class="fixed top-0 right-0 h-20 z-[60] lg:hidden flex items-center pt-2 pr-4 sm:pr-6">
              <button @click="$emit('toggle')" class="hamburger-button" aria-label="Toggle menu">
                <span class="line top" :class="{ 'toggled bg-zinc-300': isOpen, 'bg-white': !isOpen }"></span>
                <span class="line bottom" :class="{ 'toggled bg-zinc-300': isOpen, 'bg-white': !isOpen }"></span>
              </button>
            </div>
          </Teleport>
        </ClientOnly>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, markRaw } from 'vue';
import { useRoute } from 'vue-router';
// Import Phosphor Icons to act as our SVGs
import { 
  PhCaretDown, PhHouse, PhUsers, PhBed, PhTag, 
  PhForkKnife, PhBookOpen, PhPlayCircle, PhBuildings, PhCoffee 
} from '@phosphor-icons/vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false }
});

defineEmits(['toggle']);

const route = useRoute();
const isScrolled = ref(false);
const activeDropdown = ref(null);

// ==========================================
// DYNAMIC ROUTE-BASED BACKGROUNDS
// ==========================================
const headerBgClass = computed(() => {
  if (!isScrolled.value) return 'bg-transparent';
  
  const path = route.path;
  // Match the page themes (using Tailwind slate, emerald, rose, and a premium dark gold/zinc)
  if (path.includes('/rooms') || path.includes('/pricing')) return 'bg-slate-900/95 backdrop-blur-lg shadow-lg';
  if (path.includes('/restaurant') || path.includes('/menu') || path.includes('/live')) return 'bg-[#051c14]/95 backdrop-blur-lg shadow-lg'; // Deep emerald
  if (path.includes('/hall') || path.includes('/catering')) return 'bg-rose-950/95 backdrop-blur-lg shadow-lg';
  
  // Default (Home)
  return 'bg-[#0f1110]/95 backdrop-blur-lg shadow-lg'; // Deep premium zinc/gold hint
});

const dropdownBgClass = computed(() => {
  const path = route.path;
  if (path.includes('/rooms') || path.includes('/pricing')) return 'bg-[#141615]/95 border-slate-700';
  if (path.includes('/restaurant') || path.includes('/menu') || path.includes('/live')) return 'bg-[#141615]/95 border-[#0d4a36]';
  if (path.includes('/hall') || path.includes('/catering')) return 'bg-[#141615]/95 border-rose-900';
  
  return 'bg-[#141615]/95 border-[#272a28]';
});

const dropdownCaretColor = computed(() => {
  const path = route.path;
  if (path.includes('/rooms') || path.includes('/pricing')) return 'border-b-slate-700';
  if (path.includes('/restaurant') || path.includes('/menu') || path.includes('/live')) return 'border-b-[#0d4a36]';
  if (path.includes('/hall') || path.includes('/catering')) return 'border-b-rose-900';
  
  return 'border-b-[#272a28]';
});

// ==========================================
// NAVIGATION DATA
// ==========================================
const navLinks = ref([
  {
    text: 'Home', 
    mainHoverClass: 'hover:text-amber-500',
    subLinks: [
      { text: 'View Home', link: '/', icon: markRaw(PhHouse), hoverClass: 'hover:bg-[#D97706]/10 hover:text-[#D97706]' },
      { text: 'About Us', link: '/about', icon: markRaw(PhUsers), hoverClass: 'hover:bg-[#e9a206]/15 hover:text-[#e9a206]' },
    ]
  },
  {
    text: 'Rooms', 
    mainHoverClass: 'hover:text-[#2563eb]',
    subLinks: [
      { text: 'View Rooms', link: '/rooms', icon: markRaw(PhBed), hoverClass: 'hover:bg-[#2563eb]/15 hover:text-[#2563eb]' },
      { text: 'Our Pricing', link: '/pricing', icon: markRaw(PhTag), hoverClass: 'hover:bg-[#0284c7]/15 hover:text-[#0284c7]' },
    ]
  },
  {
    text: 'Restaurant', 
    mainHoverClass: 'hover:text-[#03a661]',
    subLinks: [
      { text: 'View Restaurant', link: '/restaurant', icon: markRaw(PhForkKnife), hoverClass: 'hover:bg-[#03a661]/15 hover:text-[#03a661]' },
      { text: 'Our Menu', link: '/menu', icon: markRaw(PhBookOpen), hoverClass: 'hover:bg-[#14b8a6]/15 hover:text-[#14b8a6]' },
      { text: 'Live', link: '/live', icon: markRaw(PhPlayCircle), hoverClass: 'hover:bg-[#82e9a6]/15 hover:text-[#82e9a6]' },
    ]
  },
  {
    text: 'Events Hall', 
    mainHoverClass: 'hover:text-[#e22473]',
    subLinks: [
      { text: 'View Hall', link: '/hall', icon: markRaw(PhBuildings), hoverClass: 'hover:bg-[#e22473]/15 hover:text-[#e22473]' },
      { text: 'Our Catering', link: '/catering', icon: markRaw(PhCoffee), hoverClass: 'hover:bg-[#df4444]/15 hover:text-[#df4444]' },
    ]
  }
]);

// ==========================================
// INTERACTIONS
// ==========================================
const toggleDropdown = (itemName) => {
  activeDropdown.value = activeDropdown.value === itemName ? null : itemName;
};

const openDropdownOnHover = (itemName) => {
  if (itemName) activeDropdown.value = itemName;
};

const closeDropdownOnMouseLeave = () => {
  activeDropdown.value = null;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > (window.innerHeight * 0.1);
  activeDropdown.value = null; 
};

const handleClickOutside = (event) => {
  const dropdownElement = document.querySelector('.desktop-nav-container');
  if (dropdownElement && !dropdownElement.contains(event.target)) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Contact Button Style */
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

/* Hamburger Button */
.hamburger-button {
  width: 32px; height: 24px;
  position: relative;
  background: none; border: none; cursor: pointer;
}
.hamburger-button .line {
  position: absolute; left: 0; width: 100%; height: 2px;
  transition: transform 0.3s ease-in-out, top 0.3s ease-in-out, bottom 0.3s ease-in-out, background-color 0.3s;
}
.hamburger-button .line.top { top: 4px; }
.hamburger-button .line.bottom { bottom: 4px; }
.hamburger-button .line.top.toggled { top: 11px; transform: rotate(45deg); }
.hamburger-button .line.bottom.toggled { bottom: 11px; transform: rotate(-45deg); }

/* Dropdown Transition */
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-8px) translateX(-50%); }
</style>