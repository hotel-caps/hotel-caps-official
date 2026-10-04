// composables/useCapsSeo.ts
import { useHead, useSeoMeta } from '#imports'

export interface CapsSeoOptions {
  pageTitle: string
  pageDesc: string
  canonicalUrl: string
  ogImage: string
  /**
   * Schema archetype for the page:
   * 'home' | 'about' | 'contact' | 'restaurant' | 'menu' | 'rooms' | 'hall' | 'catering' | 'blog' | 'article' | 'webpage'
   */
  pageType?: 'home' | 'about' | 'contact' | 'restaurant' | 'menu' | 'rooms' | 'hall' | 'catering' | 'blog' | 'article' | 'webpage'
  /** Short label used in Google Sitelinks BreadcrumbList */
  breadcrumbName?: string
  /** Optional article publish date (ISO or date string) for blog posts */
  publishDate?: string
  /** Optional blog post list for /blog index page */
  blogPosts?: Array<{ title: string; intro: string; url: string; coverImage?: string }>
}

const SITE_URL = 'https://capsfamily.in'

// Primary Navigation Sitelinks for Google Search (Perfios-style expandable rows)
const SITELINK_NAV_ITEMS = [
  {
    name: 'Suites & Rooms',
    url: `${SITE_URL}/rooms`,
    description: 'Explore luxury AC suites and rooms with modern amenities, lift facility & ample car parking.'
  },
  {
    name: 'AC Family Restaurant',
    url: `${SITE_URL}/restaurant`,
    description: 'Multi-cuisine dining with Kerala, Indian, Chinese & Arabic dishes, snacks, desserts & free delivery.'
  },
  {
    name: 'Digital Menu',
    url: `${SITE_URL}/menu`,
    description: 'Browse our online menu of specials, multi-cuisine delicacies, snacks, desserts & hot & cold drinks.'
  },
  {
    name: 'Auditorium & Events Hall',
    url: `${SITE_URL}/hall`,
    description: 'Spacious AC auditorium & events hall with A/V facilities, catering, lift & ample car parking.'
  },
  {
    name: 'Outdoor Catering',
    url: `${SITE_URL}/catering`,
    description: 'Delicious flavors & quality outdoor catering services for weddings, parties, meetings & celebrations.'
  },
  {
    name: 'Room Tariffs & Pricing',
    url: `${SITE_URL}/pricing`,
    description: 'View transparent rates & tariffs for AC Standard, Deluxe & Suite rooms in Koduvayur, Palakkad.'
  },
  {
    name: 'CAPS Stories & Blog',
    url: `${SITE_URL}/blog`,
    description: 'Food, celebrations, people, stories and memories from life at Hotel CAPS - Koduvayur, Palakkad.'
  },
  {
    name: 'About Us',
    url: `${SITE_URL}/about`,
    description: 'Learn about our vision, mission, hospitality values, and commitment to our community.'
  },
  {
    name: 'Contact & Bookings',
    url: `${SITE_URL}/contact`,
    description: 'Get in touch for AC room bookings, table reservations, auditorium enquiries, catering & delivery.'
  },
  {
    name: 'CAPS Signatures',
    url: `${SITE_URL}/signatures`,
    description: 'Discover our monthly handpicked veg & non-veg signature chef delicacies.'
  },
  {
    name: 'CAPS Live',
    url: `${SITE_URL}/live`,
    description: 'Experience our widescreen digital feed with daily specials, festive offers & exclusive highlights.'
  }
]

export function useCapsSeo(options: CapsSeoOptions) {
  const {
    pageTitle,
    pageDesc,
    canonicalUrl,
    ogImage: rawOgImage,
    pageType = 'webpage',
    breadcrumbName,
    publishDate,
    blogPosts = []
  } = options

  // Ensure ogImage is always an absolute URL
  const ogImage = rawOgImage.startsWith('http')
    ? rawOgImage
    : `${SITE_URL}${rawOgImage.startsWith('/') ? '' : '/'}${rawOgImage}`

  // 1. Universal Master Hotel Entity (Single Source of Truth)
  const masterHotelEntity = {
    '@type': 'Hotel',
    '@id': `${SITE_URL}/#hotel`,
    name: 'Hotel CAPS',
    alternateName: ['Hotel CAPS Family', 'CAPS Family', 'Hotel CAPS Koduvayur', 'Hotel CAPS - Koduvayur, Palakkad'],
    description: 'Stay, dine & celebrate at Hotel CAPS - Koduvayur, Palakkad. AC luxury rooms, multi-cuisine restaurant & auditorium. Catering, free delivery, lift & car parking.',
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/images/caps-solid-logo.png`,
      contentUrl: `${SITE_URL}/images/caps-solid-logo.png`,
      caption: 'Hotel CAPS'
    },
    image: ogImage,
    email: 'capsfamilybakes@gmail.com',
    telephone: ['+919207517064', '+918848369567'],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Road, Pittupeedika',
      addressLocality: 'Koduvayur',
      addressRegion: 'Kerala',
      postalCode: '678501',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '10.680926464534636',
      longitude: '76.65040838503162'
    },
    hasMap: 'https://maps.google.com/?q=10.680926464534636,76.65040838503162',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919207517064',
      contactType: 'customer service',
      availableLanguage: ['English', 'Malayalam', 'Hindi', 'Tamil']
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Fully Air-Conditioned (Rooms, Restaurant & Auditorium)', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Luxury AC Suites & Rooms', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'AC Multi-Cuisine Family Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'AC Auditorium & Events Hall with A/V Facilities', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Outdoor Catering Services', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Home Delivery', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Lift / Elevator Facility', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Ample Car Parking', value: true }
    ]
  }

  // 2. Root WebSite Entity (Instructs Google Search to display "Hotel CAPS" instead of "capsfamily.in")
  const websiteEntity = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Hotel CAPS',
    alternateName: ['Hotel CAPS Family', 'CAPS Family', 'Hotel CAPS Koduvayur', 'Hotel CAPS - Koduvayur, Palakkad', 'capsfamily.in'],
    publisher: { '@id': `${SITE_URL}/#hotel` },
    inLanguage: 'en-IN'
  }

  // 3. Build the JSON-LD @graph based on pageType
  const graph: Record<string, any>[] = [masterHotelEntity, websiteEntity]

  if (pageType === 'home') {
    graph.push(
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: pageDesc,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#hotel` },
        mainEntity: { '@id': `${SITE_URL}/#hotel` }
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#navigation`,
        name: 'Hotel CAPS Main Navigation',
        itemListElement: SITELINK_NAV_ITEMS.map((item, idx) => ({
          '@type': 'SiteNavigationElement',
          position: idx + 1,
          name: item.name,
          description: item.description,
          url: item.url
        }))
      }
    )
  } else if (pageType === 'about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${canonicalUrl}#webpage`,
      name: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#hotel` }
    })
  } else if (pageType === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${canonicalUrl}#webpage`,
      name: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#hotel` }
    })
  } else if (pageType === 'restaurant' || pageType === 'menu') {
    graph.push({
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/restaurant#restaurant`,
      name: 'Hotel CAPS AC Family Restaurant',
      description: pageDesc,
      url: canonicalUrl,
      image: ogImage,
      servesCuisine: ['Kerala', 'Indian', 'Chinese', 'Arabic', 'Multi-Cuisine'],
      telephone: ['+919207517064', '+918848369567'],
      priceRange: '$$',
      hasMenu: `${SITE_URL}/menu`,
      address: masterHotelEntity.address,
      geo: masterHotelEntity.geo,
      parentOrganization: { '@id': `${SITE_URL}/#hotel` }
    })
  } else if (pageType === 'hall') {
    graph.push({
      '@type': 'EventVenue',
      '@id': `${SITE_URL}/hall#venue`,
      name: 'Hotel CAPS Auditorium & Events Hall',
      description: pageDesc,
      url: canonicalUrl,
      image: ogImage,
      telephone: ['+919207517064', '+918848369567'],
      address: masterHotelEntity.address,
      geo: masterHotelEntity.geo,
      parentOrganization: { '@id': `${SITE_URL}/#hotel` }
    })
  } else if (pageType === 'catering') {
    graph.push({
      '@type': 'FoodEstablishment',
      '@id': `${SITE_URL}/catering#catering`,
      name: 'Hotel CAPS Outdoor Catering',
      description: pageDesc,
      url: canonicalUrl,
      image: ogImage,
      servesCuisine: ['Kerala', 'Indian', 'Chinese', 'Arabic', 'Multi-Cuisine'],
      telephone: ['+919207517064', '+918848369567'],
      priceRange: '$$',
      address: masterHotelEntity.address,
      geo: masterHotelEntity.geo,
      parentOrganization: { '@id': `${SITE_URL}/#hotel` }
    })
  } else if (pageType === 'rooms') {
    graph.push({
      '@type': 'LodgingBusiness',
      '@id': `${SITE_URL}/rooms#lodging`,
      name: 'Hotel CAPS Luxury AC Suites & Rooms',
      description: pageDesc,
      url: canonicalUrl,
      image: ogImage,
      telephone: ['+919207517064', '+918848369567'],
      priceRange: '$$',
      address: masterHotelEntity.address,
      geo: masterHotelEntity.geo,
      parentOrganization: { '@id': `${SITE_URL}/#hotel` }
    })
  } else if (pageType === 'blog') {
    graph.push({
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      name: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#hotel` },
      blogPost: blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.intro,
        url: post.url.startsWith('http') ? post.url : `${SITE_URL}${post.url}`,
        image: post.coverImage
          ? post.coverImage.startsWith('http')
            ? post.coverImage
            : `${SITE_URL}${post.coverImage}`
          : ogImage
      }))
    })
  } else if (pageType === 'article') {
    const publishedIso = publishDate ? new Date(publishDate).toISOString() : undefined
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      headline: pageTitle.replace(/\s*\|\s*CAPS Stories$/i, ''),
      name: pageTitle,
      description: pageDesc,
      image: ogImage,
      url: canonicalUrl,
      ...(publishedIso ? { datePublished: publishedIso } : {}),
      author: { '@id': `${SITE_URL}/#hotel` },
      publisher: { '@id': `${SITE_URL}/#hotel` },
      isPartOf: { '@id': `${SITE_URL}/blog#blog` }
    })
  } else {
    graph.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      name: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#hotel` }
    })
  }

  // 4. Add BreadcrumbList on all non-home pages (Required by Google for Sitelinks hierarchy)
  if (pageType !== 'home') {
    const breadcrumbItems: Record<string, any>[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`
      }
    ]

    if (pageType === 'article') {
      breadcrumbItems.push(
        {
          '@type': 'ListItem',
          position: 2,
          name: 'CAPS Stories',
          item: `${SITE_URL}/blog`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: breadcrumbName || pageTitle.replace(/\s*\|\s*CAPS Stories$/i, ''),
          item: canonicalUrl
        }
      )
    } else {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbName || (pageTitle.split('|')[0] ?? pageTitle).trim(),
        item: canonicalUrl
      })
    }

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems
    })
  }

  // 5. Inject Canonical Link & JSON-LD @graph via useHead
  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph
        })
      }
    ]
  })

  // 6. Inject Search & Social Meta Tags via useSeoMeta
  useSeoMeta({
    title: pageTitle,
    description: pageDesc,
    ogType: pageType === 'article' ? 'article' : 'website',
    ogSiteName: 'Hotel CAPS',
    ogLocale: 'en_IN',
    ogTitle: pageTitle,
    ogDescription: pageDesc,
    ogUrl: canonicalUrl,
    ogImage: ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDesc,
    twitterImage: ogImage
  })
}