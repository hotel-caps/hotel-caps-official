// https://nuxt.com/docs/api/configuration/nuxt-config
// import { blogsData } from './data/blogs.js'

// Every unique width used across all 29 `sizes="..."` tags (33 total widths with breakpoints — well under Vercel's 50 limit)
const baseImageWidths = [
  100, 140, 160, 180, 190, 225, 240, 300, 340, 360, 
  380, 400, 420, 450, 480, 500, 525, 540, 580, 590, 
  600, 720, 800, 900, 960, 1200, 1366, 1600
]

export default defineNuxtConfig({
  compatibilityDate: '2026-07-30',
  ssr: true,
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0', // e.g., '0.0.0.0' for external access
    port: 3002, // or your desired port
  },

  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/sitemap', 
    '@nuxtjs/robots', '@nuxt/image', 
    '@nuxt/fonts', 
    '@vercel/analytics/nuxt', 
    '@vercel/speed-insights/nuxt'
  ],

  // 1. Site configuration for Sitemap & Robots
  site: {
    url: 'https://capsfamily.in',
    name: 'Hotel CAPS'
  },

  image: {
    // 1. Register our Custom Local Engine
    providers: {
      localSharp: {
        name: 'localSharp',
        provider: '~/providers/local-sharp.ts'
      }
    },
    // 2. Set it as the default provider (Bypassing Vercel completely!)
    provider: 'localSharp',

    // Prevent 2x upscaling requests so 1x widths never trigger console warnings
    densities: [1],

    // Forces the generator to always output highly compressed WebP files
    format: ['webp'],

    // Explicitly tells Nuxt that your assets live in the /public folder
    dir: 'public',

    // Sets a high-quality baseline
    quality: 80,

    screens: {
      // Standard Named Breakpoints
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
      // Auto-generated component widths from all 28 `sizes` attributes
      ...Object.fromEntries(
        baseImageWidths.map((w) => [`w${w}`, w])
      )
    }
  },

  fonts: {
    defaults: {
      styles: ['normal'], 
      subsets: ['latin'],
    },
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700], global: true },
      { name: 'Faculty Glyphic', provider: 'google', weights: [400, 500, 600, 700], global: true },
      { name: 'Julee', provider: 'google', weights: [400], global: true }
    ]
  },

  // The modern, stable way to inline component CSS
  features: {
    inlineStyles: true
  },

  // 2. Sitemap Module Configuration
  sitemap: {
    zeroRuntime: true,
    urls: [
      { loc: '/', changefreq: 'weekly', priority: 1.0 },
      { loc: '/rooms', changefreq: 'weekly', priority: 0.9 },
      { loc: '/restaurant', changefreq: 'weekly', priority: 0.9 },
      { loc: '/menu', changefreq: 'weekly', priority: 0.8 },
      { loc: '/signatures', changefreq: 'weekly', priority: 0.8 },
      { loc: '/live', changefreq: 'weekly', priority: 0.8 },
      { loc: '/pricing', changefreq: 'weekly', priority: 0.8 },
      { loc: '/hall', changefreq: 'monthly', priority: 0.8 },
      { loc: '/catering', changefreq: 'monthly', priority: 0.8 },
      { loc: '/blog', changefreq: 'weekly', priority: 0.8 },
      { loc: '/about', changefreq: 'monthly', priority: 0.8 },
      { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
      { loc: '/policy', changefreq: 'yearly', priority: 0.3 },
      { loc: '/terms', changefreq: 'yearly', priority: 0.3 },
      // Automatically inject all blog slugs into sitemap.xml
      // ...Object.entries(blogsData as Record<string, any>).map(([slug, post]) => ({
      //   loc: `/blog/${slug}`,
      //   lastmod: post.publishDate ? new Date(post.publishDate).toISOString() : undefined,
      //   changefreq: 'monthly' as const,
      //   priority: 0.7 as const
      // }))
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
    // Core Navigation & Content (100% Static Prerendered at Build Time)
    '/': { prerender: true },
    '/about': { prerender: true },
    '/rooms': { prerender: true },
    '/pricing': { prerender: true },
    '/restaurant': { prerender: true },
    '/signatures': { prerender: true },
    '/hall': { prerender: true },
    '/catering': { prerender: true },
    '/contact': { prerender: true },

    // Editorial Blog Ecosystem (Prerendered + ISR Edge Cached)
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },

    // Legal (100% Static)
    '/policy': { prerender: true },
    '/terms': { prerender: true },

    // Dynamic Islands (Static Shell + Client Fetch)
    '/menu': { prerender: true },
    '/live': { prerender: true },
  },

  nitro: {
    // Tells the Nitro engine to compress the pre-rendered HTML files
    // further reducing the initial payload for mobile devices.
    compressPublicAssets: true,
  },

  experimental: {
    // Ensures Nuxt extracts the payloads for static routes so the Vue 
    // router stays lightning fast during client-side navigation.
    payloadExtraction: true
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Hotel CAPS - Koduvayur | AC Rooms, Restaurant & Auditorium',

      htmlAttrs: {
        lang: 'en'
      },
      
      meta: [
        { name: 'description', content: 'Stay, Dine & Celebrate at Hotel CAPS - Koduvayur, Palakkad. AC Luxury Rooms, Multi-Cuisine Restaurant & Auditorium. Catering, Free Delivery, Lift & Car Parking.' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'author', content: 'kriz - https://brandsta.in' },
        { name: 'application-name', content: 'Hotel CAPS' },

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
        { name: 'twitter:card', content: 'summary_large_image' },

        // Windows PWA & Mobile Meta Tags
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/images/favicons/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },

        // PWA & Mobile Device Customizations
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Hotel CAPS' }
      ],

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
        // Web Manifest
        { rel: 'manifest', crossorigin: 'use-credentials', href: '/manifest.json' }
      ]
    }
  },
})