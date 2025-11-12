import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, Loader2 } from 'lucide-react';
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

  const generateAudio = async () => {
    setIsGenerating(true);
    
    try {
      // Use full content if available, otherwise fall back to summary
      const textToSpeak = briefing.content 
        ? `${briefing.title}. ${briefing.content}` 
        : `${briefing.title}. ${briefing.summary}`;

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

        <div className="flex items-center gap-3 pt-2">
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
          
          {audioUrl && (
            <audio controls className="flex-1" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioBriefingCard;
