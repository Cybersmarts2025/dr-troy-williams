
/**
 * Utility functions for generating dynamic sitemaps
 * This can be used in a build script or server-side process
 */

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generates XML sitemap content from an array of URL entries
 */
export const generateSitemap = (baseUrl: string, entries: SitemapEntry[]): string => {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
  
  const footer = '</urlset>';
  
  const urlEntries = entries.map(entry => {
    let urlXml = `  <url>
    <loc>${baseUrl}${entry.url}</loc>`;
    
    if (entry.lastmod) {
      urlXml += `\n    <lastmod>${entry.lastmod}</lastmod>`;
    }
    
    if (entry.changefreq) {
      urlXml += `\n    <changefreq>${entry.changefreq}</changefreq>`;
    }
    
    if (entry.priority !== undefined) {
      urlXml += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
    }
    
    urlXml += '\n  </url>';
    return urlXml;
  });
  
  return `${header}\n${urlEntries.join('\n')}\n${footer}`;
};

/**
 * Formats a date for sitemap use (YYYY-MM-DD)
 */
export const formatSitemapDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Helper to get current date in sitemap format
 */
export const getCurrentDateForSitemap = (): string => {
  return formatSitemapDate(new Date());
};
