import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface ScrapeResponse {
  success: true;
  data: {
    markdown: string;
    html: string;
    metadata: {
      title: string;
      description: string;
      image: string;
      [key: string]: any;
    };
  };
}

type FirecrawlResponse = ScrapeResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static firecrawlApp: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing API key with Firecrawl API');
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      const testResponse = await this.firecrawlApp.scrapeUrl('https://example.com');
      return testResponse.success;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async scrapeAmazonBook(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Scraping Amazon book page:', url);
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const scrapeResponse = await this.firecrawlApp.scrapeUrl(url, {
        formats: ['markdown', 'html'],
        onlyMainContent: true,
      }) as FirecrawlResponse;

      if (!scrapeResponse.success) {
        console.error('Scrape failed:', (scrapeResponse as ErrorResponse).error);
        return { 
          success: false, 
          error: (scrapeResponse as ErrorResponse).error || 'Failed to scrape book page' 
        };
      }

      // Extract book information from the scraped content
      const bookData = this.extractBookData(scrapeResponse.data);
      
      console.log('Scrape successful:', bookData);
      return { 
        success: true,
        data: bookData 
      };
    } catch (error) {
      console.error('Error during scrape:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }

  private static extractBookData(scrapedData: any): any {
    const { markdown, metadata } = scrapedData;
    
    // Extract book information from Amazon page
    const title = metadata?.title?.replace(' : ', ': ').replace(' | Amazon.com', '').trim() || '';
    const description = metadata?.description || '';
    const coverImage = metadata?.image || '';
    
    // Try to extract additional details from markdown content
    let author = '';
    let publisher = '';
    let publicationDate = '';
    
    // Look for author information in markdown
    const authorMatch = markdown.match(/(?:by|By)\s+([^(]+?)(?:\s*\(|$)/);
    if (authorMatch) {
      author = authorMatch[1].trim();
    }
    
    // Look for publication info
    const pubMatch = markdown.match(/Publisher[:\s]+([^;]+)/i);
    if (pubMatch) {
      publisher = pubMatch[1].trim();
    }
    
    const dateMatch = markdown.match(/Publication date[:\s]+([^;]+)/i);
    if (dateMatch) {
      publicationDate = dateMatch[1].trim();
    }

    return {
      title,
      description,
      cover_url: coverImage,
      author,
      publisher,
      publication_date: publicationDate,
      amazon_url: scrapedData.url,
      markdown_content: markdown
    };
  }
}