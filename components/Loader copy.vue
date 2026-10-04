<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

// --- DATA & CONFIG ---
const loaderSvgRef = ref(null);
const orbitingIconsContainerRef = ref(null);

// Data for the orbiting icons, with the specified icons swapped.
const orbitingIcons = ref([
  { svg: `<path d="M2 12h20v5H2zm0-5h20v3H2zm0 8v3h20v-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, color: 'icon-color-1' },
  { svg: `<circle cx="12" cy="18" r="1.5" fill="currentColor"/><path d="M5 12.5a8 8 0 0 1 14 0M8.5 15a4.5 4.5 0 0 1 7 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, color: 'icon-color-2' },
  { svg: `<rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 14v4M10 20h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, color: 'icon-color-3' },
  { svg: `<circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, color: 'icon-color-4' },
  { svg: `<path d="M12 21l-1.45-1.32C5 15 2 12.36 2 8.5c0-2.56 2.07-4.5 4.5-4.5 1.74 0 3.41 1.01 4.5 2.09 1.09-1.08 2.76-2.09 4.5-2.09C19.93 4 22 5.94 22 8.5c0 3.86-3 6.5-8.55 11.18L12 21z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`, color: 'icon-color-5' },
  { svg: `<path d="M5 18h14a2 2 0 0 0 2-2v-3a6 6 0 0 0-6-6H5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M17 8a4 4 0 0 1 0 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 2s-1.5 2.5 2 4.5S12 2 12 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, color: 'icon-color-6' },
  { svg: `<rect x="3" y="4" width="18" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, color: 'icon-color-1' },
  { svg: `<rect x="2" y="7" width="20" height="13" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 7l3-3 3 3 3-3 3 3 3-3 2 2" fill="none" stroke="currentColor" stroke-width="2"/>`, color: 'icon-color-2' },
  { svg: `<rect x="3" y="7" width="11" height="8" fill="none" stroke="currentColor" stroke-width="2" rx="2"/><polygon points="14,9 20,7 20,17 14,15" fill="none" stroke="currentColor" stroke-width="2"/>`, color: 'icon-color-3' },
  { svg: `<path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"/><path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2v1h16v-1z" fill="none" stroke="currentColor" stroke-width="2"/>`, color: 'icon-color-4' },
  { svg: `<path d="M12 2l2.9 6.2L22 9l-5 4.9L18.2 22 12 18.6 5.8 22 7 13.9 2 9l7.1-1L12 2z" fill="none" stroke="currentColor" stroke-width="2"/>`, color: 'icon-color-5' },
  { svg: `<rect x="3" y="8" width="18" height="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 8v12" stroke="currentColor" stroke-width="2"/><path d="M12 8l1-3s1-2 3 0c2 2 0 3 0 3l-4-1zM12 8l-1-3s-1-2-3 0c-2 2 0 3 0 3l4-1z" fill="none" stroke="currentColor" stroke-width="2"/>`, color: 'icon-color-6' },
  { svg: `<rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 7V5h8v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 11h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, color: 'icon-color-1' },
  { svg: `<path d="M3 5l7-2 7 2 7-2v16l-7 2-7-2-7 2z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 3v18M17 5v16" stroke="currentColor" stroke-width="2"/>`, color: 'icon-color-2' },
  // --- NEW ICONS ADDED BELOW ---
  { svg: `<path d="M22 17H20V15H17V17H15V15H12V17H10V15H7V17H5V15H2V17H0V13C0 11.9 0.9 11 2 11H22C23.1 11 24 11.9 24 13V17H22ZM7 12V5H17V12H7ZM2 19H22V21H2V19Z" fill="currentColor"/>`, color: 'icon-color-3' },
  { svg: `<path d="M20 17H4V15H20V17ZM20 9C20 6.24 17.76 4 15 4C12.24 4 10 6.24 10 9H20ZM12 9C12 7.34 13.34 6 15 6C16.66 6 18 7.34 18 9H12ZM4 19H20V21H4V19Z" fill="currentColor"/>`, color: 'icon-color-4' },
  { svg: `<path d="M4 21V9L12 3L20 9V21H16V14H8V21H4ZM10 11H14V14H10V11Z" fill="currentColor"/>`, color: 'icon-color-5' },
  { svg: `<path d="M17 19H7V15H17V19ZM17 11H7V7H17V11ZM19 3H5C3.9 3 3 3.9 3 5V21H21V5C21 3.9 20.1 3 19 3Z" fill="currentColor"/>`, color: 'icon-color-6' },
]);

// --- ANIMATION LOGIC ---
onMounted(() => {
  const LOGO_ANIMATION_END = 3500; 
  const icons = gsap.utils.toArray('.loader-icon');
  const iconContainer = orbitingIconsContainerRef.value;

  loaderSvgRef.value.classList.add('animate');

  setTimeout(() => {
    const radius = iconContainer.offsetWidth / 2.5;
    const angleIncrement = 360 / icons.length;

    gsap.to(icons, {
      duration: 1.5,
      ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      opacity: 1,
      fontSize: "clamp(24px, 5vw, 40px)",
      rotation: (i) => (i * angleIncrement) + 90, 
      x: (i) => Math.cos(i * angleIncrement * Math.PI / 180) * radius,
      y: (i) => Math.sin(i * angleIncrement * Math.PI / 180) * radius,
      onComplete: () => {
        gsap.to(iconContainer, {
          duration: 30,
          rotation: 360,
          repeat: -1,
          ease: "none"
        });
        gsap.to(icons, {
          duration: 30,
          rotation: "-=360",
          repeat: -1,
          ease: "none"
        });
      }
    });
  }, LOGO_ANIMATION_END);
});
</script>

<template>
  <div class="loader">
    <!-- Central Icon -->
    <svg ref="loaderSvgRef" id="loader-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 969 907" fill="none">
      <g>
        <path class="path-draw path-draw-1" fill="#EB7B25" d="M17.5891 372.078C2.23861 383.595 -5.99027e-06 386.635 0.319796 394.953L4.5 406L47.9703 461.018L56.5644 466.657L59.285 466.936L81.7094 452.7C82.0292 452.7 82.5089 531.723 82.5089 628.341C82.6688 724.8 82.9886 824.938 83.1485 850.852L83.4683 897.722L87.3059 902.041L91.1436 906.36L232.656 906.68C327.477 907 374.168 906.52 374.168 905.4C386.62 893.195 387.077 886.328 375.607 874.047L117.207 871.168C116.728 870.848 116.248 767.351 115.928 641.139C115.608 515.086 115.289 410.949 114.969 409.83C114.809 408.71 112.41 406.15 109.692 404.071C103.296 399.272 91.9431 399.112 86.9861 403.911C85.0673 405.671 81.2297 408.87 78.1916 411.109C75.3134 413.349 70.6762 417.028 68.1178 419.428C65.5025 421.89 63.77 424.309 63.2565 423.961C63.1807 423.863 63.1228 423.799 63.2015 423.907C63.2179 423.929 63.2363 423.947 63.2565 423.961C63.5978 424.4 64.3003 425.506 54.4856 414.509C42.4931 401.072 41 397.5 45.252 395.593L470.269 50.7088C479.48 43.5432 484.485 42.249 492.714 48.3244L630.49 158.365C630.969 158.365 634.487 161.244 638.005 164.764L652.396 174.042C652.396 174.042 655.274 175.641 658.792 175.641C668.404 174.248 671.627 172.416 675.262 168.123C677.66 163.964 677.98 157.885 677.98 113.735V63.9858H701.646C714.598 63.9858 736.344 63.666 749.936 63.506L774.72 63.186V160.765C774.72 222.671 775.36 259.463 776.319 261.542L916.712 379.596L926.306 386.795L897.524 425.666L885.692 416.388C879.136 411.429 873.379 406.63 872.9 405.831C849.132 384.479 842.85 386.661 842.678 412.709C842.199 412.709 841.879 516.046 841.879 642.258C841.879 768.471 841.559 871.808 841.079 871.808C840.6 871.808 767.205 871.808 677.98 871.968H516.681C502.826 885.252 501.94 892.797 516.039 905.24C521 906.5 866.663 906.52 870.341 904.441C871.94 903.481 873.379 901.241 873.539 899.482C873.539 897.562 874.179 896.282 874.818 896.762C875.458 897.082 876.257 895.802 876.737 893.723C877.217 891.803 877.377 792.785 877.377 673.771C877.217 554.598 877.353 456.579 878.176 456.539C879 456.5 879.01 456.818 880.255 457.659C881.5 458.5 898.803 468.697 898.803 468.697C905.2 468.697 911.116 465.017 916.712 457.339L959.406 399.912C971.079 389.034 972.038 379.276 962.124 369.199L818.213 252.584L810.218 245.066L810.058 142.209C809.898 56.6275 809.419 38.5515 807.66 35.6721C806.381 33.9125 804.302 32.6328 803.183 33.1127C801.903 33.5926 801.104 33.1127 801.424 31.8329C801.903 29.9134 789.591 29.5934 728.029 29.1135L654.155 28.7936L649.198 33.4326L644.081 38.0715V80.6222C644.081 103.977 643.601 123.173 642.962 123.173C642.482 123.173 639.764 121.093 637.046 118.694C632.408 114.695 629.21 112.135 618.977 104.457L498.251 6.91864C498.255 4.90228 478.42 -3.92645 466.431 7.99817L17.5891 372.078Z" />
        <path class="path-draw path-draw-2" fill="#EB7B25" d="M198.117 357.521C196.998 353.362 196.998 351.123 198.277 349.523L202.5 344L463.873 127.332C481.635 112.974 490.569 111.939 503.975 127.453L762.568 338.485L767.685 343.924C768.804 346.484 769.284 417.188 769.284 542.12C769.124 725.92 768.964 736.638 766.406 739.837C761.608 745.436 749.936 749.115 749.936 745.116C749.936 744.316 749.296 743.996 748.497 744.476C747.697 744.956 744.979 743.516 742.42 740.957L737.623 736.638L737.463 564.675C737.304 470.136 737.144 385.995 737.144 377.997V363.12C737.144 363.12 735.265 359.88 731.428 357.161L490.576 163.964C484.98 159.165 482.421 159.005 478.424 162.684C476.665 164.284 473.307 167.003 470.749 168.763L226.74 366.319C217.305 375.757 201.795 370.958 198.117 357.521Z" />
        <path class="path-static path-static-3" fill="#521F18" d="M468.51 217.072C453 222.511 438.608 234.828 433.332 247.305C428.215 258.983 426.456 272.74 428.695 282.178C433.012 300.894 442.446 313.211 458.756 321.209C466.751 325.048 469.469 325.528 483.701 325.528C497.932 325.528 500.65 325.048 508.805 321.049C520.798 315.13 532.63 302.173 536.148 291.136C539.506 280.578 539.666 263.142 536.308 253.224C530.871 237.388 516.96 223.631 500.97 218.672C493.135 216.112 473.787 215.153 468.51 217.072ZM497.772 244.746C501.45 246.506 506.566 250.985 509.125 254.504C512.962 260.103 513.762 262.822 513.922 271.14C514.242 286.977 506.566 297.214 491.216 301.693C483.541 303.933 482.101 303.933 474.906 301.533C462.114 297.214 452.52 285.217 452.52 273.06C452.52 265.541 456.517 255.464 461.634 250.345C471.868 240.107 484.5 238.027 497.772 244.746Z" />
        <path class="path-static path-static-4" fill="#090909" d="M538.668 370.759C528.115 372.838 517.242 379.557 506.208 390.115C500.292 395.873 494.056 402.592 492.617 404.831C491.178 407.071 487.82 411.87 485.421 415.549C473.908 432.985 462.076 461.139 456.319 485.614C451.362 507.049 450.883 509.448 448.964 527.684C443.207 585.112 459.038 632.461 492.777 658.535C514.523 675.332 522.678 685.729 526.036 700.286C527.475 707.165 525.716 821.22 523.478 856.732L522.518 871.608H548.582H574.646L573.687 836.896C573.047 817.7 572.407 778.349 572.407 749.555C572.088 697.887 572.088 696.927 575.765 689.569C579.763 681.57 590.156 670.053 600.23 662.854C623.736 645.898 639.566 620.464 646.761 587.671C650.279 572.154 650.759 530.724 647.721 514.887C639.726 474.736 633.49 455.22 619.738 428.506C607.586 404.671 588.078 382.756 572.088 375.238C562.653 370.759 547.783 368.839 538.668 370.759Z" />
        <path class="path-static path-static-5" fill="#090909" d="M285.722 431.876C287.282 390.246 287.455 388.645 291.096 385.923C295.951 382.24 301.846 382.24 305.487 385.923C308.088 388.485 308.434 399.853 309.995 485.516C311.382 575.822 311.729 582.387 314.676 584.308C318.49 586.87 319.01 586.87 322.478 584.308C324.905 582.547 325.426 571.179 327.333 487.117C328.893 418.587 330.107 390.726 331.494 387.844C334.441 382.4 343.284 381.6 347.965 386.243C351.086 389.445 351.259 393.288 352.473 475.589C353.686 573.26 354.38 582.547 358.714 584.789C360.968 585.909 362.876 585.589 365.303 583.508C368.771 580.946 368.944 578.064 370.504 485.035C372.065 397.451 372.585 388.965 375.359 386.083C379.693 381.6 387.496 382.08 390.963 387.044C394.084 391.367 394.777 405.777 398.765 560.931C401.019 650.277 401.539 645.793 388.189 654.76C373.625 664.367 366.69 671.892 363.396 681.179C359.928 691.587 359.581 713.843 362.182 760.918C363.049 778.05 364.609 809.273 365.65 830.089C366.69 851.064 368 872 368.5 873.5L312 873L312.769 863.073C316.583 818.08 321.785 701.514 320.224 690.946C318.144 677.497 309.648 666.128 292.83 654.76C283.988 648.675 280 642.591 280 634.425C280 623.697 284.334 474.948 285.722 431.876Z" />
      </g>
    </svg>
    <!-- Container for the icon animation -->
    <div ref="orbitingIconsContainerRef" id="loader-icons-container">
      <div 
        v-for="(icon, index) in orbitingIcons" 
        :key="index"
        class="loader-icon"
        :class="icon.color"
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24" v-html="icon.svg"></svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #f8f4ef 0%, #e0d6c5 100%);
  z-index: 9999;
  overflow: hidden;
  pointer-events: none;
}
#loader-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6.72rem;
  height: 6rem; 
  z-index: 10;
}
#loader-svg .path-draw {
  fill-opacity: 0; stroke-width: 5; stroke-dasharray: 6000; stroke-dashoffset: 6000;
}
#loader-svg .path-static { stroke: none; opacity: 0; }
#loader-svg.animate .path-draw-1 { stroke: #EB7B25; animation: draw 2.5s ease-out forwards 0.2s, fill 0.5s ease forwards 2.7s; }
#loader-svg.animate .path-draw-2 { stroke: #EB7B25; animation: draw 2.0s ease-out forwards 0.7s, fill 0.5s ease forwards 2.7s; }
#loader-svg.animate .path-static-4 { transform: translateY(110px); animation: slideUp 1s cubic-bezier(0.5,1.2,0.2,1.05) forwards 3.0s; }
#loader-svg.animate .path-static-5 { transform: translateY(110px); animation: slideUp 1s cubic-bezier(0.5,1.2,0.2,1.05) forwards 2.8s; }
#loader-svg.animate .path-static-3 { transform-origin: center; transform: scale(1.2); animation: scaleIn 0.5s cubic-bezier(0.95,1.2,0.2,1.05) forwards 3.5s; }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes fill { to { fill-opacity: 1; } }
@keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
@keyframes scaleIn { to { opacity: 1; transform: scale(1); } }

/* --- Loader Icons --- */
#loader-icons-container {
  position: absolute;
  /* New styles for responsive, contained circle */
  width: min(96vw, 96vh);
  height: min(96vw, 96vh);
  aspect-ratio: 1 / 1;
  max-width: 96%;
  max-height: 96%;
  z-index: 5;
  transform-origin: center center;
  will-change: transform;
}
.loader-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 0;
  opacity: 0;
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
}
.icon-color-1 { color: #1d4ed8; } /* blue-700 */
.icon-color-2 { color: #57534e; } /* stone-600 */
.icon-color-3 { color: #047857; } /* emerald-700 */
.icon-color-4 { color: #db2777; } /* pink-600 */
.icon-color-5 { color: #d18108; } /* amber-600 */
.icon-color-6 { color: #4b5563; } /* gray-600 */
</style>
