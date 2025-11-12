import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[#B22234] border-[#B22234]">
                {briefing.category}
              </Badge>
              <span className="text-sm text-gray-500">
                {new Date(briefing.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <CardTitle className="text-xl">{briefing.title}</CardTitle>
          </div>
          <Button
            onClick={generateAudio}
            disabled={isGenerating}
            size="sm"
            className="bg-[#3C3B6E] hover:bg-[#2d2c54] flex-shrink-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Listen
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-700">
          {briefing.summary}
        </CardDescription>
        {audioUrl && (
          <audio controls className="w-full mt-4" src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioBriefingCard;
