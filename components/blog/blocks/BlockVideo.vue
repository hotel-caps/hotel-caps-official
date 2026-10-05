<template>
  <div
    ref="videoWrapperRef"
    class="aspect-ratio-box w-full max-w-5xl mx-auto aspect-video overflow-hidden shadow-2xl relative bg-black select-none"
    :class="[
      isPseudoFullscreen
        ? 'fixed inset-0 z-[9999] rounded-none !aspect-auto w-screen h-screen'
        : 'rounded-3xl',
      !isActive ? 'group cursor-pointer' : '',
      { 'fullscreen-mode': isFullscreen || isPseudoFullscreen }
    ]"
    @click="!isActive && activateVideo()"
    @mousemove="isActive && revealControls()"
    @mouseleave="isActive && isPlaying && (showControls = false)"
  >
    <!-- 1. THUMBNAIL STATE (Before Click) -->
    <template v-if="!isActive">
      <NuxtImg
        :src="block.thumbnail"
        :alt="block.caption || 'Hotel CAPS Video Highlight'"
        width="800"
        height="450"
        sizes="380px sm:640px md:768px lg:800px"
        format="webp"
        quality="80"
        densities="x1"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      />
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-20 h-20 md:w-24 md:h-24 bg-[#bd5c17] rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#C86A22] transition-all duration-300">
          <svg class="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div
        v-if="block.caption"
        class="absolute bottom-6 w-full text-center text-white text-xs md:text-sm font-bold tracking-widest uppercase drop-shadow-md px-6 pointer-events-none"
      >
        {{ block.caption }}
      </div>
    </template>

    <!-- 2. ACTIVE PLAYER STATE -->
    <template v-else>
      <!-- YouTube Mount Container (pointer-events-none so custom touch/click layer controls it cleanly) -->
      <div class="absolute inset-0 w-full h-full pointer-events-none">
        <div ref="playerEl" class="w-full h-full"></div>
      </div>

      <!-- Loading Spinner while YouTube initializes -->
      <div
        v-if="!isReady"
        class="absolute inset-0 flex items-center justify-center bg-black/60 z-10 pointer-events-none"
      >
        <div class="w-10 h-10 border-3 border-[#d18108] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Interactive Surface (Tap on mobile reveals controls; Click on desktop toggles play/pause) -->
      <div
        class="absolute inset-0 z-10 cursor-pointer"
        @click.stop="handleSurfaceTap"
      ></div>

      <!-- Floating Unmute Pill (Top-Right when video is playing muted) -->
      <button
        v-if="isReady && isMuted"
        type="button"
        @click.stop="toggleMute"
        class="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/75 hover:bg-[#bd5c17] text-white text-xs font-semibold tracking-wider uppercase px-3.5 py-2 rounded-full backdrop-blur-md shadow-lg transition-colors duration-200 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
        <span>Tap for Sound</span>
      </button>

      <!-- Custom Bottom Control Bar -->
      <div
        class="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-8 pb-3.5 px-4 sm:px-6 transition-opacity duration-300"
        :class="showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
        @click.stop
      >
        <!-- Duration Progress Strip (Touch & Click Scrub Bar) -->
        <div
          ref="progressBarRef"
          class="group/bar relative w-full h-5 flex items-center cursor-pointer touch-none mb-1.5"
          @mousedown="startScrub"
          @touchstart.passive="startTouchScrub"
          @touchmove.prevent="moveTouchScrub"
          @touchend="endTouchScrub"
        >
          <!-- Track Background -->
          <div class="w-full h-1.5 group-hover/bar:h-2 bg-white/30 rounded-full overflow-hidden transition-all">
            <!-- Active Progress Fill -->
            <div
              class="h-full bg-[#d18108] rounded-full"
              :style="{ width: `${progressPercent}%` }"
            ></div>
          </div>
          <!-- Scrub Handle -->
          <div
            class="absolute w-3.5 h-3.5 bg-[#d18108] border-2 border-white rounded-full shadow-md -translate-x-1/2 transform scale-100 sm:scale-0 group-hover/bar:scale-100 transition-transform"
            :style="{ left: `${progressPercent}%` }"
          ></div>
        </div>

        <!-- Controls Row -->
        <div class="flex items-center justify-between text-white">
          <div class="flex items-center gap-2.5 sm:gap-4">
            <!-- Play / Pause -->
            <button
              type="button"
              @click="togglePlay"
              class="p-1.5 hover:text-[#d18108] transition-colors cursor-pointer"
              :aria-label="isPlaying ? 'Pause' : 'Play'"
            >
              <svg v-if="!isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>

            <!-- Seek Backward (-10s) -->
            <button
              type="button"
              @click="seekRelative(-10)"
              class="p-1.5 hover:text-[#d18108] transition-colors flex items-center gap-0.5 text-xs font-bold cursor-pointer"
              aria-label="Rewind 10 seconds"
              title="Back 10s"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              <span>10s</span>
            </button>

            <!-- Seek Forward (+10s) -->
            <button
              type="button"
              @click="seekRelative(10)"
              class="p-1.5 hover:text-[#d18108] transition-colors flex items-center gap-0.5 text-xs font-bold cursor-pointer"
              aria-label="Forward 10 seconds"
              title="Forward 10s"
            >
              <span>10s</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
              </svg>
            </button>

            <!-- Sound (Mute / Unmute) -->
            <button
              type="button"
              @click="toggleMute"
              class="p-1.5 hover:text-[#d18108] transition-colors cursor-pointer"
              :aria-label="isMuted ? 'Unmute' : 'Mute'"
            >
              <svg v-if="isMuted" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            </button>

            <!-- Time Display -->
            <span class="text-xs font-mono text-white/90 tracking-tight">
              {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
            </span>
          </div>

          <!-- Fullscreen Toggle -->
          <button
            type="button"
            @click="toggleFullscreen"
            class="p-1.5 hover:text-[#d18108] transition-colors cursor-pointer"
            aria-label="Toggle Fullscreen"
          >
            <svg v-if="!isFullscreen && !isPseudoFullscreen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            </svg>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
});

const videoWrapperRef = ref(null);
const playerEl = ref(null);
const progressBarRef = ref(null);

const isActive = ref(false);
const isReady = ref(false);
const isPlaying = ref(false);
const isMuted = ref(true);
const showControls = ref(true);
const isFullscreen = ref(false);
const isPseudoFullscreen = ref(false);
const isScrubbing = ref(false);

const currentTime = ref(0);
const duration = ref(0);

let player = null;
let progressTimer = null;
let hideControlsTimer = null;

const progressPercent = computed(() => {
  if (!duration.value) return 0;
  return Math.min(100, Math.max(0, (currentTime.value / duration.value) * 100));
});

const formatTime = (sec) => {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const revealControls = () => {
  showControls.value = true;
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  if (isPlaying.value) {
    hideControlsTimer = setTimeout(() => {
      if (!isScrubbing.value) showControls.value = false;
    }, 3200);
  }
};

const handleSurfaceTap = () => {
  // On touch devices, if controls are hidden, first tap reveals controls; otherwise toggles play
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch && !showControls.value) {
    revealControls();
    return;
  }
  togglePlay();
  revealControls();
};

const loadYouTubeAPI = () => {
  if (window.YT && window.YT.Player) {
    initPlayer();
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

  window.__YT_CALLBACKS.push(initPlayer);
};

const activateVideo = async () => {
  isActive.value = true;
  await nextTick();
  loadYouTubeAPI();
};

const initPlayer = () => {
  if (!playerEl.value) return;

  player = new window.YT.Player(playerEl.value, {
    host: 'https://www.youtube-nocookie.com',
    width: '100%',
    height: '100%',
    videoId: props.block.videoId,
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      rel: 0,
      playsinline: 1,
      modestbranding: 1,
      iv_load_policy: 3,
      fs: 0
    },
    events: {
      onReady: (e) => {
        isReady.value = true;
        duration.value = e.target.getDuration() || 0;
        e.target.mute();
        isMuted.value = true;
        e.target.playVideo();
        revealControls();
      },
      onStateChange: (e) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
          isPlaying.value = true;
          duration.value = player.getDuration() || duration.value;
          startProgressLoop();
          revealControls();
        } else {
          isPlaying.value = false;
          stopProgressLoop();
          showControls.value = true;
        }
      }
    }
  });
};

const startProgressLoop = () => {
  stopProgressLoop();
  progressTimer = setInterval(() => {
    if (player && !isScrubbing.value && typeof player.getCurrentTime === 'function') {
      currentTime.value = player.getCurrentTime() || 0;
      if (!duration.value && typeof player.getDuration === 'function') {
        duration.value = player.getDuration() || 0;
      }
    }
  }, 200);
};

const stopProgressLoop = () => {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
};

const togglePlay = () => {
  if (!player || !isReady.value) return;
  if (isPlaying.value) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

const seekRelative = (deltaSeconds) => {
  if (!player || !isReady.value) return;
  const target = Math.max(0, Math.min(duration.value, currentTime.value + deltaSeconds));
  currentTime.value = target;
  player.seekTo(target, true);
  revealControls();
};

const toggleMute = () => {
  if (!player || !isReady.value) return;
  if (isMuted.value) {
    player.unMute();
    player.setVolume(100);
    isMuted.value = false;
  } else {
    player.mute();
    isMuted.value = true;
  }
  revealControls();
};

// --- TOUCH & MOUSE SCRUBBING ---
const seekFromClientX = (clientX, commit = false) => {
  if (!progressBarRef.value || !duration.value) return;
  const rect = progressBarRef.value.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  const targetTime = ratio * duration.value;
  currentTime.value = targetTime;
  if (commit && player && isReady.value) {
    player.seekTo(targetTime, true);
  }
};

const startScrub = (e) => {
  isScrubbing.value = true;
  seekFromClientX(e.clientX, true);

  const onMouseMove = (moveEvent) => {
    seekFromClientX(moveEvent.clientX, false);
  };
  const onMouseUp = (upEvent) => {
    seekFromClientX(upEvent.clientX, true);
    isScrubbing.value = false;
    revealControls();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const startTouchScrub = (e) => {
  if (!e.touches.length) return;
  isScrubbing.value = true;
  seekFromClientX(e.touches[0].clientX, false);
};

const moveTouchScrub = (e) => {
  if (!e.touches.length) return;
  seekFromClientX(e.touches[0].clientX, false);
};

const endTouchScrub = (e) => {
  if (e.changedTouches && e.changedTouches.length) {
    seekFromClientX(e.changedTouches[0].clientX, true);
  } else if (player && isReady.value) {
    player.seekTo(currentTime.value, true);
  }
  isScrubbing.value = false;
  revealControls();
};

// --- UNIVERSAL FULLSCREEN (Desktop, Android, iPad + iOS iPhone Fallback) ---
const toggleFullscreen = async () => {
  const el = videoWrapperRef.value;
  if (!el) return;

  const doc = document;
  const fsElement = doc.fullscreenElement || doc.webkitFullscreenElement;

  if (fsElement || isPseudoFullscreen.value) {
    if (doc.exitFullscreen) {
      await doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    }
    isPseudoFullscreen.value = false;
    return;
  }

  if (el.requestFullscreen) {
    try {
      await el.requestFullscreen();
    } catch {
      isPseudoFullscreen.value = true;
    }
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else {
    // Fallback for iPhone Safari where HTMLElement.requestFullscreen is not enabled on divs
    isPseudoFullscreen.value = true;
  }
  revealControls();
};

const handleFullscreenChange = () => {
  isFullscreen.value = !!(document.fullscreenElement || document.webkitFullscreenElement);
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  stopProgressLoop();
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
  if (player && typeof player.destroy === 'function') {
    player.destroy();
  }
});
</script>

<style scoped>
.aspect-ratio-box::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 4px solid #d18108;
  z-index: 30;
  pointer-events: none;
}

/* Hide border in fullscreen */
.fullscreen-mode.aspect-ratio-box::before {
  display: none;
}
</style>