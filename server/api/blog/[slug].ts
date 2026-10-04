import { blogsData } from '~/data/blogs.js';

export default defineEventHandler((event) => {
  // 1. Grab the slug from the URL
  const slug = getRouterParam(event, 'slug');
  
  // 2. SAFETY CHECK: If slug is missing or undefined, instantly throw a 404
  if (!slug || typeof slug !== 'string') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invalid or missing article slug'
    });
  }

  // 3. Now it is guaranteed to be a string, so we can safely use it as an index key
  const article = (blogsData as Record<string, any>)[slug];

  // 4. If the slug exists but doesn't match any article in our data file, throw a 404
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article not found'
    });
  }

  // 5. Return the JSON payload to the Vue page
  return article;
});