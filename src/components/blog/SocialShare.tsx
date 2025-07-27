
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt: string;
}

const SocialShare = ({ title, url, excerpt }: SocialShareProps) => {
  const { toast } = useToast();

  // Ensure we use the correct domain for sharing
  const fullUrl = url.startsWith('http') ? url : `https://www.DrTroyWilliams.net${url}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: fullUrl,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Share className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Share this article</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(shareLinks.facebook, '_blank')}
              className="flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(shareLinks.linkedin, '_blank')}
              className="flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={shareNative}
              className="flex items-center gap-2"
            >
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialShare;
