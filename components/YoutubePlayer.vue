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
let player = null;
let observer = null;

const loadYouTubeAPI = () => {
  if (window.YT && window.YT.Player) {
    createPlayer();
    return;
  }

  if (!window.__YT_CALLBACKS) {
    window.__YT_CALLBACKS = [];

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === 'function') prevReady();
      window.__YT_CALLBACKS.forEach((cb) => cb());
      window.__YT_CALLBACKS = [];
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  window.__YT_CALLBACKS.push(createPlayer);
};

const createPlayer = () => {
  if (!playerDiv.value) return;

  player = new window.YT.Player(playerDiv.value, {
    host: 'https://www.youtube-nocookie.com',
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
      rel: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3
    },
    events: {
      onReady: (event) => {
        event.target.mute();
        event.target.playVideo();
      },
      onStateChange: (event) => {
        // Seamless loop without black iframe reload flash
        if (event.data === window.YT.PlayerState.ENDED) {
          event.target.seekTo(0);
          event.target.playVideo();
        }
      }
    }
  });
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
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
  if (player && typeof player.destroy === 'function') {
    player.destroy();
  }
});
</script>

<template>
  <div ref="playerContainer" class="youtube-player-container">
    <div class="aspect-ratio-box">
      <div class="player-iframe">
        <div ref="playerDiv"></div>
      </div>
      <!-- Blocks all cursor and touch interactions -->
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
  inset: 0;
  border-radius: 1rem;
  border: 3px solid #d18108;
  z-index: 5;
  pointer-events: none;
}

.player-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.interaction-blocker {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>