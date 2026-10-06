function parsePublishDate(rawDate: unknown): Date {
  if (!rawDate || typeof rawDate !== 'string') return new Date(0);
  const trimmed = rawDate.trim();

  // Handle DD-MM-YYYY or DD/MM/YYYY safely
  const dmyMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmyMatch) {
    const [, day = '01', month = '01', year = '1970'] = dmyMatch;
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`);
  }

  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

export default defineEventHandler(async () => {
  const storage = useStorage('assets:server');
  const keys = await storage.getKeys('blogs');

  const blogsList = await Promise.all(
    keys
      .filter((key) => key.endsWith('.json'))
      .map(async (key) => {
        const slug = key.replace(/^blogs:/, '').replace(/\.json$/i, '');
        const raw = await storage.getItem(key);
        const article = (typeof raw === 'string' ? JSON.parse(raw) : raw) as Record<string, any>;

        const dateObj = parsePublishDate(article?.publishDate);
        const formattedDate = dateObj
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
          .toUpperCase()
          .replace(/,/g, '');

        return {
          title: article?.pageTitle || '',
          intro: article?.pageDesc || '',
          date: formattedDate,
          rawDate: dateObj.getTime(), // Used strictly for newest-first sorting
          url: `/blog/${slug}`,
          coverImage: article?.coverImage || article?.hero?.image || article?.ogImage || '',
          featured: Boolean(article?.featured),
          showcase: Boolean(article?.showcase)
        };
      })
  );

  // Sort strictly by newest date first (Descending)
  blogsList.sort((a, b) => b.rawDate - a.rawDate);

  return blogsList.map(({ rawDate, ...rest }) => rest);
});