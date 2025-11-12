import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, Loader2, Share2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AudioBriefingCardProps {
  briefing: {
    id: string;
    title: string;
    summary: string;
    content?: string;
    date: string;
    category: string;
  };
}

const AudioBriefingCard = ({ briefing }: AudioBriefingCardProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const shareUrl = `${window.location.origin}/stolennation#briefing-${briefing.id}`;
  const shareText = `${briefing.title} - Stolen Nation Intelligence Briefing by Dr. Troy Williams`;

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=600');
  };

  const generateAudio = async () => {
    setIsGenerating(true);
    
    try {
      // Create a condensed version for audio (first 2-3 paragraphs max ~500 words)
      // This prevents memory limits in the edge function
      let audioText = briefing.summary;
      
      if (briefing.content) {
        // Extract first few paragraphs (up to 1500 characters)
        const paragraphs = briefing.content.split('\n\n').filter(p => p.trim().length > 0);
        let condensedContent = '';
        let charCount = 0;
        
        for (const para of paragraphs) {
          // Skip markdown headers and very short lines
          if (para.startsWith('#') || para.length < 50) continue;
          
          if (charCount + para.length < 1500) {
            condensedContent += para + '\n\n';
            charCount += para.length;
          } else {
            break;
          }
        }
        
        audioText = condensedContent.trim() || briefing.summary;
      }

      const textToSpeak = `${briefing.title}. ${audioText}`;

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: textToSpeak,
          voice: 'George' // Professional male voice suitable for briefings
        }
      });

      if (error) throw error;

      if (data?.audioUrl) {
        setAudioUrl(data.audioUrl);
        // Auto-play the audio
        const audio = new Audio(data.audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        title: "Audio Generation Failed",
        description: "Unable to generate audio briefing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[#B22234] border-[#B22234]">
                {briefing.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(briefing.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <CardTitle className="text-xl mb-2">{briefing.title}</CardTitle>
            <CardDescription className="text-base">
              {briefing.summary}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {briefing.content && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="content" className="border-border">
              <AccordionTrigger className="text-sm font-medium hover:text-primary">
                Read Full Briefing
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm dark:prose-invert max-w-none pt-4">
                  <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm">
                    {briefing.content}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={generateAudio}
              disabled={isGenerating}
              size="sm"
              className="bg-[#3C3B6E] hover:bg-[#2d2c54]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Listen to Briefing
                </>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Share:</span>
              <Button
                onClick={handleLinkedInShare}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Button>
              <Button
                onClick={handleFacebookShare}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
          
          {audioUrl && (
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioBriefingCard;
