// data/signatures.js

export const signatureMonths = [
  {
    id: "october-2026",
    monthName: "October 2026",
    subtitle: "THIS MONTH'S SIGNATURES",
    isCurrentMonth: true, // <-- Move this flag to the new month when November hits
    veg: {
      title: "Coming Soon",
      description: "Listing will be updated soon.",
      image: "/images/signatures/veg-signature.jpg" 
    },
    nonVeg: {
      title: "Coming Soon",
      description: "Listing will be updated soon.",
      image: "/images/signatures/non-veg-signature.jpg" 
    }
  },
  // When September 2026 is added later, it will look like this:
  // {
  //   id: "september-2026",
  //   monthName: "September 2026",
  //   subtitle: "PREVIOUS SIGNATURES",
  //   isCurrentMonth: false,
  //   veg: { ... },
  //   nonVeg: { ... }
  // }
];

// Smart helper: Instantly grabs the active month for the Menu and Live pages
export const currentMonthSignature = signatureMonths.find(month => month.isCurrentMonth) || signatureMonths[0];