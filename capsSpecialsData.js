// This file stores ONLY static UI rules, tags, and permanent slides.
// Dynamic specials are fetched separately.

// --- THIN SVG ASSETS (Stroke 1.2px) ---
const iconFresh = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z"/><path d="M12 22V12"/></svg>`;
const iconflavours = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const iconLove = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>`;
const iconParking = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 8h4a2 2 0 010 4H9v4"/></svg>`;
const iconElevator = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 6v4m0-4l-2 2m2-2l2 2m-2 6v4m0 0l-2-2m2 2l2-2"/></svg>`;
const icon24h = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
const iconAV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M8 20h8M12 16v4M2 12h20"/></svg>`;
const iconCorp = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`;
const iconDecor = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`;
const iconOutdoor = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/></svg>`;

const foodTags = [{ text: "Always Fresh", icon: iconFresh }, { text: "Authentic flavours", icon: iconflavours }, { text: "Made With Love", icon: iconLove }];
const roomTags = [{ text: "Car Parking", icon: iconParking }, { text: "Elevator Access", icon: iconElevator }, { text: "24 Hour Service", icon: icon24h }];
const hallTags = [{ text: "A/V Capabilities", icon: iconAV }, { text: "Corporate Events", icon: iconCorp }, { text: "Grand Decor", icon: iconDecor }];
const cateringTags = [{ text: "Outdoor Setup", icon: iconOutdoor }, { text: "Custom Menus", icon: iconflavours }, { text: "Live Counters", icon: iconFresh }];

export const capsCategoriesData = [
  { id: 'specials', name: 'Specials', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
  { id: 'restaurant', name: 'Restaurant', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 17h18M12 4v2m-7 8a7 7 0 0114 0v3H5v-3z"/></svg>` },
  { id: 'chai', name: 'Chill N Chai', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8H19C20.6569 8 22 9.34315 22 11C22 12.6569 20.6569 14 19 14H18M4 8H18V15C18 17.2091 16.2091 19 14 19H8C5.79086 19 4 17.2091 4 15V8ZM10 4V6M14 4V6M6 4V6"/></svg>` },
  { id: 'arabic', name: 'Arabic Corner', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 3l-6 6m-9 9l-3 3m5-6l4-4a3 3 0 014.2 0v0a3 3 0 010 4.2l-4 4a3 3 0 01-4.2 0v0a3 3 0 010-4.2"/></svg>` },
  { id: 'delivery', name: 'Food Delivery', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"/><path d="M10 15h6M2 15h4m12 0h2v-4l-3-4h-5v8M14 7v4"/></svg>` },
  { id: 'rooms', name: 'Rooms', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11v5m16-5v5M4 11h16M4 11V7a2 2 0 012-2h12a2 2 0 012 2v4M6 11V9h4v2M14 11V9h4v2"/></svg>` },
  { id: 'hall', name: 'Events Hall', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4v16m16-16v16M4 4h16M4 4c2 4 4 4 6 0m4 0c-2 4-4 4-6 0m10 0c-2 4-4 4-6 0"/></svg>` },
  { id: 'catering', name: 'Catering', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 14h12M4 18h16M8 10h8m-10 4v4m12-4v4m-5-8V6m0 0a3 3 0 00-6 0h12a3 3 0 00-6 0z"/></svg>` }
];

// UI THEME DICTIONARY: Maps the incoming WordPress dynamic JSON to the exact UI colors and icons.
export const specialsThemeDictionary = {
  'CAPS': { trackerId: 'specials', mainTitle: 'SPECIALS', mainTitleColor: '#f05b22', darkHex: '#b45309', lightHex: '#f9a230', tagBgHex: '#c78226', priceColor: '#f05b22', tags: foodTags },
  'Multi-Cuisine Restaurant': { trackerId: 'restaurant', mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#14532d', lightHex: '#16a34a', tagBgHex: '#11823b', tags: foodTags },
  'Chill N Chai': { trackerId: 'chai', mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#78350f', lightHex: '#b45309', tagBgHex: '#904207', tags: foodTags },
  'Arabic Corner': { trackerId: 'arabic', mainTitle: 'SPECIALS', mainTitleColor: '#f0cb52', darkHex: '#451a03', lightHex: '#82300b', tagBgHex: '#682609', tags: foodTags }
};

// THE PERMANENT SLIDES (Rooms, Hall, Delivery, Catering)
export const staticSpecialsSlides = [
  { trackerId: 'delivery', format: 'A', isRoom: false, mainTitle: 'FOOD DELIVERY', mainTitleColor: '#0a65a9', darkHex: '#0c4a6e', lightHex: '#0284c7', tagBgHex: '#026aa0', outlet: '', title: 'Fresh & Fast', intro: 'Craving CAPS at home? Enjoy our entire menu delivered piping hot right to your doorstep.', price: 'FREE', images: ['/images/delivery/1.png'], tags: foodTags },
  { trackerId: 'rooms', format: 'A', isRoom: true, mainTitle: 'ROOMS', mainTitleColor: '#2563eb', darkHex: '#1e3a8a', lightHex: '#2060eb', tagBgHex: '#1a4dbc', outlet: '', title: 'Standard Room', intro: 'Comfortable, elegantly furnished rooms designed for the perfect night of rest during your travels.', price: '₹1,500 / night', images: ['/images/rooms/standard/1.jpg'], tags: roomTags },
  { trackerId: 'rooms', format: 'A', isRoom: true, mainTitle: 'ROOMS', mainTitleColor: '#2563eb', darkHex: '#1e3a8a', lightHex: '#2060eb', tagBgHex: '#1a4dbc', outlet: '', title: 'Deluxe Room', intro: 'Spacious luxury with premium bedding, advanced climate control, and stunning views.', price: '₹2,500 / night', images: ['/images/rooms/deluxe/1.jpg'], tags: roomTags },
  { trackerId: 'rooms', format: 'A', isRoom: true, mainTitle: 'ROOMS', mainTitleColor: '#2563eb', darkHex: '#1e3a8a', lightHex: '#2060eb', tagBgHex: '#1a4dbc', outlet: '', title: 'Luxury Suite', intro: 'The ultimate CAPS experience. Featuring a private living area, premium bath amenities, and bespoke service.', price: '₹4,000 / night', images: ['/images/rooms/suite/1.jpg'], tags: roomTags },
  { trackerId: 'hall', format: 'B', isRoom: false, mainTitle: 'EVENTS HALL', mainTitleColor: '#db2777', darkHex: '#831843', lightHex: '#f82f92', tagBgHex: '#c62675', outlet: '', title: 'The Grand Venue', intro: 'A breathtaking space designed for weddings, corporate galas, and life’s most memorable celebrations.', price: null, images: ['/images/hall/live/1.jpg', '/images/hall/live/2.jpg', '/images/hall/live/3.jpg'], tags: hallTags },
  { trackerId: 'catering', format: 'B', isRoom: false, mainTitle: 'CATERING', mainTitleColor: '#dc2626', darkHex: '#7f1d1d', lightHex: '#f23a36', tagBgHex: '#c22e2b', outlet: '', title: 'Outdoor Catering', intro: 'Bring the legendary taste of CAPS to your personal events. We handle everything from setup to service.', price: null, images: ['/images/catering/live/1.jpg', '/images/catering/live/2.jpg', '/images/catering/live/3.jpg'], tags: cateringTags }
];