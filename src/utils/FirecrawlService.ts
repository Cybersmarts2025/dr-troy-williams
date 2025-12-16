import { supabase } from '@/integrations/supabase/client';

interface ErrorResponse {
  success: false;
  error: string;
}

interface ScrapeResponse {
  success: true;
  data: any;
}

type FirecrawlResponse = ScrapeResponse | ErrorResponse;

export class FirecrawlService {
  static async scrapeAmazonBook(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      console.log('Calling edge function to scrape Amazon book:', url);

      const { data, error } = await supabase.functions.invoke('scrape-amazon-book', {
        body: { url }
      });

      if (error) {
        console.error('Edge function error:', error);
        return { 
          success: false, 
          error: error.message || 'Failed to scrape book page' 
        };
      }

      if (!data?.success) {
        console.error('Scrape failed:', data?.error);
        return { 
          success: false, 
          error: data?.error || 'Failed to scrape book page' 
        };
      }

      console.log('Scrape successful:', data.data);
      return { 
        success: true,
        data: data.data 
      };
    } catch (error) {
      console.error('Error during scrape:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to scraping service' 
      };
    }
  }

  // Legacy methods kept for backward compatibility
  static getApiKey(): string | null {
    return 'configured-in-supabase';
  }

  static saveApiKey(apiKey: string): void {
    console.log('API key is now configured in Supabase Edge Functions');
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    return true; // Always return true since key is configured in Supabase
  }
}