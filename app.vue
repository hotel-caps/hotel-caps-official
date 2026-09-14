<script setup>
import { ref, onMounted } from 'vue';
import Loader from '~/components/Loader.vue';

const isLoading = ref(true);

// Initialize global load state. Defaults to true on a fresh page land/refresh.
const isInitialAppLoad = useState('isInitialAppLoad', () => true);

onMounted(() => {
  window.scrollTo(0, 0);
  // This is a simpler, more reliable way to handle the loader.
  // We'll show the loader for a fixed duration to allow the animation to play,
  // and then reliably fade it out.
  const MIN_ANIMATION_TIME = 1300; // 1.3 seconds

  setTimeout(() => {
    isLoading.value = false;
    
    // Once the initial loader fades out, we mark the initial app load as complete.
    // Any NuxtLink navigations back to the home page will now read this as false.
    isInitialAppLoad.value = false;
  }, MIN_ANIMATION_TIME);
});
</script>

<template>
  <div>
    <!-- The Transition component handles the smooth fade-out -->
    <Transition name="fade">
      <Loader v-if="isLoading" />
    </Transition>
    
    <!-- This div will now become visible after the loader fades out -->
    <div :class="{ 'content-hidden': isLoading, 'content-visible': !isLoading }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
@import '~/assets/css/fonts.css';

/* This global style is a simple and effective way to lock the scroll 
   when the loader is active, without needing complex JavaScript watchers.
*/
body:has(.loader) {
  overflow: hidden;
}

/* Global fade transition for the loader */
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-leave-to {
  opacity: 0;
}

/* Hides main content initially */
.content-hidden {
  opacity: 0;
}

/* Fades in the main content after loading */
.content-visible {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

/* NUXT Page Transition */
.page-enter-active,
.page-leave-active {
  transition: all .6s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 1;
  filter: blur(1rem);
}
</style>