
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface UrlMetadataFetcherProps {
  onMetadataFetched: (data: { title: string; description: string; outlet?: string }) => void;
}

const UrlMetadataFetcher: React.FC<UrlMetadataFetcherProps> = ({ onMetadataFetched }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      url: '',
    }
  });

  const handleSubmit = async (data: { url: string }) => {
    if (!data.url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use a CORS proxy to fetch the metadata
      // This is just a demo - in production, you would use a server-side endpoint
      const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(data.url)}`);
      const html = await response.text();
      
      // Parse the HTML to extract metadata
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract title and description
      const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                    doc.querySelector('title')?.textContent || '';
      
      const description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || 
                          doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      // Try to extract the site name as the outlet
      const outlet = doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || 
                     new URL(data.url).hostname.replace('www.', '');
      
      if (title) {
        onMetadataFetched({ title, description, outlet });
        toast({
          title: "Success",
          description: "Metadata fetched successfully",
        });
        form.reset();
      } else {
        toast({
          title: "Warning",
          description: "Could not extract metadata from the URL",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
      toast({
        title: "Error",
        description: "Failed to fetch URL metadata. The site might block access or require authentication.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mb-6 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Quick Add Media Feature</CardTitle>
        <CardDescription>
          Enter a URL to automatically fetch its title and description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/article" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Fetching..." : "Fetch Metadata"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Note: This tool attempts to extract metadata from public URLs. Some websites may block this functionality.
      </CardFooter>
    </Card>
  );
};

export default UrlMetadataFetcher;
