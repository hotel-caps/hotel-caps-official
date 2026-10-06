export default defineEventHandler(async (event) => {
  // 1. Grab the slug from the URL
  const slug = getRouterParam(event, 'slug');

  // 2. SAFETY CHECK: If slug is missing or invalid, instantly throw a 404
  if (!slug || typeof slug !== 'string' || !/^[a-z0-9-]+$/i.test(slug)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invalid or missing article slug'
    });
  }

  // 3. Lazily load ONLY server/assets/blogs/<slug>.json
  const storage = useStorage('assets:server');
  const raw = await storage.getItem(`blogs:${slug}.json`);
  const article = typeof raw === 'string' ? JSON.parse(raw) : raw;

  // 4. If the file doesn't exist, throw a 404
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article not found'
    });
  }

  // 5. Return the JSON payload to the Vue page
  return article;
});