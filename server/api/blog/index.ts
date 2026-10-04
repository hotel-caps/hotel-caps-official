import { blogsData } from '~/data/blogs.js';

export default defineEventHandler((event) => {
  // 1. Convert the blogsData object into an array
  const entries = Object.entries(blogsData as Record<string, any>);

  // 2. Map the data into the exact format expected by BlogListing.vue
  const blogsList = entries.map(([slug, article]) => {
    
    // Format the date strictly to "12 OCT 2026"
    const dateObj = new Date(article.publishDate);
    const formattedDate = dateObj.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).toUpperCase().replace(/,/g, '');

    return {
      // Splits "Title: Subtitle" to keep the listing card titles punchy
      title: article.pageTitle, 
      intro: article.pageDesc,
      date: formattedDate,
      rawDate: dateObj.getTime(), // Used for sorting below
      url: `/blog/${slug}`,
      coverImage: article.hero?.image || article.ogImage,
      featured: article.featured || false
    };
  });

  // 3. Sort articles by newest first
  blogsList.sort((a, b) => b.rawDate - a.rawDate);

  // 4. Remove the rawDate sorting helper and return the clean array
  return blogsList.map(({ rawDate, ...rest }) => rest);
});