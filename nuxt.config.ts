// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-30',
  ssr: true,
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0', // e.g., '0.0.0.0' for external access
    port: 3002, // or your desired port
  },

  runtimeConfig: {
    // apiSecret: 'my-secret', 
    public: {
      // Public keys (client & server) - these are reactive on the client
      initialAnimationDelay: 4, // Example: The delay you want to use
    }
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/image', '@nuxt/fonts'],

  // 1. Site configuration for Sitemap & Robots
  site: {
    url: 'https://capsfamily.in',
    name: 'Hotel CAPS'
  },

  image: {
    // Use Vercel's image optimization service for better performance
    provider: 'vercel',

    // Forces the generator to always output highly compressed WebP files
    format: ['webp'], 
    
    // Explicitly tells Nuxt that your assets live in the /public folder
    dir: 'public', 
    
    // Sets a high-quality baseline (80% is the industry sweet spot for WebP)
    quality: 80, 

    screens: {
      // Standard Breakpoints
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      
      // Custom UI Card & Gallery Specifics
      w300: 300,
      cardSm: 384,
      card: 400,
      w590: 590,
      w600: 600,
      w603: 603,
      w626: 626,
      w655: 655,
      gallerySm: 700,
      w710: 710,
      w711: 711,
      galleryMd: 800,
      w1180: 1180,
      galleryLg: 1200,
      w1206: 1206,
      w1252: 1252,
      w1310: 1310,
      galleryXl: 1400,
      w1420: 1420,
      w1422: 1422,

      // The new native 1x intrinsic widths
      w1366: 1366,
      w1600: 1600,
      w1920: 1920,
      w2400: 2400,

      // The 2x Retina & 4K display cuts Nuxt auto-calculated
      w2732: 2732,
      w3200: 3200,
      w3840: 3840
    }
  },

  fonts: {
    defaults: {
      styles: ['normal'], 
      subsets: ['latin'],
    },
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Faculty Glyphic', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Dancing Script', provider: 'google', weights: [400] }
    ]
  },

  // The modern, stable way to inline component CSS
  features: {
    inlineStyles: true
  },

  // 2. Sitemap Module Configuration
  sitemap: {
    zeroRuntime: true, // Ensures the sitemap is generated at build time, not runtime
    // Explicitly define all static routes
    urls: [
      { loc: '/', changefreq: 'weekly', priority: 1.0 },
      { loc: '/about', changefreq: 'monthly', priority: 0.8 },
      { loc: '/rooms', changefreq: 'weekly', priority: 0.9 },
      { loc: '/pricing', changefreq: 'weekly', priority: 0.8 },
      { loc: '/restaurant', changefreq: 'weekly', priority: 0.9 },
      { loc: '/menu', changefreq: 'weekly', priority: 0.8 },
      { loc: '/live', changefreq: 'weekly', priority: 0.8 },
      { loc: '/hall', changefreq: 'monthly', priority: 0.8 },
      { loc: '/catering', changefreq: 'monthly', priority: 0.8 },
      { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
      { loc: '/policy', changefreq: 'yearly', priority: 0.3 },
      { loc: '/terms', changefreq: 'yearly', priority: 0.3 },
    ]
  },

  // 3. Robots.txt Module Configuration
  robots: {
    disallow: [], // An empty array explicitly means "Allow Everything"
    sitemap: ['https://capsfamily.in/sitemap.xml']
  },

  // 3. Keep your Vite chunk splitting for GSAP
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) { return 'gsap-core'; }
            if (id.includes('node_modules/vue')) { return 'vue-core'; }
          }
        }
      }
    }
  },

  routeRules: {
      // Core Navigation & Content (100% Static)
      '/': { prerender: true },
      '/about': { prerender: true },
      '/rooms': { prerender: true },
      '/pricing': { prerender: true },
      '/restaurant': { prerender: true },
      '/hall': { prerender: true },
      '/catering': { prerender: true },
      '/contact': { prerender: true },

      // Legal (100% Static)
      '/policy': { prerender: true },
      '/terms': { prerender: true },

      // The Dynamic Islands (HTML is Static, JS handles the WP Data)
      // Nitro pre-builds the structure, and your client-side $fetch populates the text.
      '/menu': { prerender: true },
      '/live': { prerender: true },
    },

    nitro: {
      // Tells the Nitro engine to compress the pre-rendered HTML files
      // further reducing the initial payload for mobile devices.
      compressPublicAssets: true
    },

    experimental: {
      // Ensures Nuxt extracts the payloads for static routes so the Vue 
      // router stays lightning fast during client-side navigation.
      payloadExtraction: true
    },

  app: {
    // baseURL: '/',
    // buildAssetsDir: 'assets', 
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // Root level configuration parameters
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Hotel CAPS - Luxury Rooms, Restaurant, Auditorium - Koduvayur',

      // 1. Language metadata (Moved to correct root level)
      htmlAttrs: {
        lang: 'en'
      },
      
      // 2. Base meta tags (Cleaned up duplicates)
      meta: [
        { name: 'description', content: 'Welcome to Hotel CAPS - Koduvayur, Palakkad | Luxury Suites & Rooms | Multi-Cuisine Restaurant | Auditorium Hall | Outdoor Catering | Free Home Delivery' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'kriz - https://brandsta.in' },

        
        // Local Business Geographic Coordinates 
        { name: 'geo.region', content: 'IN-KL' },
        { name: 'geo.placename', content: 'Koduvayur, Palakkad' },
        { name: 'geo.position', content: '10.680926464534636;76.65040838503162' }, 
        { name: 'ICBM', content: '10.680926464534636, 76.65040838503162' },

        // Global Social Layout Standards
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_IN' },
        { property: 'og:site_name', content: 'Hotel CAPS' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'twitter:card', content: 'summary_large_image' },

        // Windows PWA & Mobile Meta Tags
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/images/favicons/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-config', content: 'browserconfig.xml' },

        // Apple Safari Device Customizations
        // PWA & Mobile Device Customizations
        { name: 'mobile-web-app-capable', content: 'yes' }, // Modern generic standard
        { name: 'apple-mobile-web-app-capable', content: 'yes' }, // Kept strictly for legacy iOS support
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Hotel CAPS' }
      ],

      // 3. PWA & Favicon Links
      link: [
        // Apple Icons
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/favicons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/favicons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/favicons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/favicons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/favicons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/favicons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/favicons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/favicons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '167x167', href: '/images/favicons/apple-icon.png' },
        { rel: 'apple-touch-icon', sizes: '190x190', href: '/images/favicons/apple-icon-precomposed.png' },
        // Standard Favicons
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/favicons/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicons/favicon-16x16.png' },
        // Cache-Busted Web Manifest Path
        { rel: 'manifest', crossorigin: 'use-credentials', href: 'manifest.json' }
      ] // Empty script array completely dropped to keep runtime code light
    }
  }
})