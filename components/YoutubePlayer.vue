<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  videoId: {
    type: String,
    required: true
  }
});

const playerContainer = ref(null);
const playerDiv = ref(null);
let player; 

// --- ROBUST LAZY LOADING & API SETUP ---
const loadYouTubeAPI = () => {
  // 1. If API is already fully loaded by a previous component, execute immediately
  if (window.YT && window.YT.Player) {
    createPlayer();
    return;
  }

  // 2. If this is the FIRST component requesting the API, set up the queue and inject the script
  if (!window.__YT_CALLBACKS) {
    window.__YT_CALLBACKS = [];
    
    // YouTube calls this exact function name when its script finishes loading
    window.onYouTubeIframeAPIReady = () => {
      // Run every component's initialization function
      window.__YT_CALLBACKS.forEach(cb => cb());
      // Clear the queue
      window.__YT_CALLBACKS = []; 
    };

    // Inject the script only once
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // 3. Add THIS specific component's createPlayer function to the global queue
  window.__YT_CALLBACKS.push(createPlayer);
};

const createPlayer = () => {
  if (!playerDiv.value) return;
  
  player = new window.YT.Player(playerDiv.value, {
    height: '100%',
    width: '100%',
    videoId: props.videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      loop: 1,
      playlist: props.videoId,
      playsinline: 1,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      enablejsapi: 1, // Ensures postMessage API is active
      origin: window.location.origin
    },
    events: {
      'onReady': (event) => {
        event.target.mute();
        event.target.playVideo();
      }
    }
  });
};

// --- INTERSECTION OBSERVER ---
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadYouTubeAPI();
          observer.disconnect();
        }
      });
    },
    { rootMargin: '200px' }
  );

  if (playerContainer.value) {
    observer.observe(playerContainer.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (player && typeof player.destroy === 'function') player.destroy();
});
</script>

<template>
  <div ref="playerContainer" class="youtube-player-container">
    <div class="aspect-ratio-box">
      <div class="player-iframe">
        <div ref="playerDiv"></div>
      </div>
      <div class="interaction-blocker"></div>
    </div>
  </div>
</template>

<style scoped>
.youtube-player-container {
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.aspect-ratio-box {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-ratio-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  border: 3px solid #d18108;
  z-index: 5;
}

.player-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.interaction-blocker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
