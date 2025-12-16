import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, Loader2, Pause, ExternalLink, Radio } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface AudioBriefingCardProps {
  briefing: {
    id: string;
    title: string;
    summary: string;
    content?: string;
    date: string;
    category: string;
    slug?: string;
  };
}

const AudioBriefingCard = ({ briefing }: AudioBriefingCardProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const shareUrl = briefing.slug 
    ? `${window.location.origin}/stolennation/${briefing.slug}`
    : `${window.location.origin}/stolennation`;
  const shareText = encodeURIComponent(`${briefing.title} - Stolen Nation Intelligence Briefing by Dr. Troy Williams`);

  const handleLinkedInShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(briefing.title)}&summary=${encodeURIComponent(briefing.summary)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  const handleFacebookShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${shareText}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  const handleAudioEnded = () => {
    // Play next chunk if available
    if (currentChunkIndex < audioUrls.length - 1) {
      setCurrentChunkIndex(prev => prev + 1);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 100);
    } else {
      setIsPlaying(false);
      setCurrentChunkIndex(0);
    }
  };

  const handlePlayPause = () => {
    if (audioUrls.length === 0) {
      generateAudio();
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const splitTextIntoChunks = (text: string, maxChars: number = 1200): string[] => {
    const chunks: string[] = [];
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    let currentChunk = '';

    for (const para of paragraphs) {
      // Skip markdown headers
      if (para.startsWith('#')) continue;
      
      // If adding this paragraph would exceed limit, save current chunk and start new one
      if (currentChunk.length + para.length > maxChars && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = para + '\n\n';
      } else {
        currentChunk += para + '\n\n';
      }
    }

    // Add remaining content
    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  };

  const generateAudio = async () => {
    setIsGenerating(true);
    setAudioUrls([]);
    setCurrentChunkIndex(0);
    
    try {
      const fullText = briefing.content || briefing.summary;
      const textChunks = splitTextIntoChunks(fullText);
      
      console.log(`Generating audio for ${textChunks.length} chunks`);
      
      const generatedUrls: string[] = [];
      
      // Generate audio for each chunk
      for (let i = 0; i < textChunks.length; i++) {
        const chunkText = i === 0 
          ? `${briefing.title}. ${textChunks[i]}` 
          : textChunks[i];

        console.log(`Generating chunk ${i + 1}/${textChunks.length}`);

        const { data, error } = await supabase.functions.invoke('text-to-speech', {
          body: {
            text: chunkText,
            voice: 'George'
          }
        });

        if (error) throw error;

        if (data?.audioUrl) {
          generatedUrls.push(data.audioUrl);
        }
      }

      setAudioUrls(generatedUrls);
      
      // Auto-play first chunk
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);

      toast({
        title: "Audio Ready",
        description: `Generated ${generatedUrls.length} audio segments`,
      });

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
        
        {briefing.slug && (
          <Link to={`/stolennation/${briefing.slug}`}>
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Briefing Page
            </Button>
          </Link>
        )}

        <div className="space-y-3 pt-2">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            {isGenerating && (
              <Badge variant="secondary" className="gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Generating Audio...
              </Badge>
            )}
            {isPlaying && !isGenerating && (
              <Badge variant="secondary" className="gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Radio className="h-3 w-3 animate-pulse" />
                Playing
              </Badge>
            )}
            {audioUrls.length > 0 && !isPlaying && !isGenerating && (
              <Badge variant="secondary" className="gap-1">
                <Pause className="h-3 w-3" />
                Paused
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={handlePlayPause}
              disabled={isGenerating}
              size="sm"
              className="bg-[#3C3B6E] hover:bg-[#2d2c54]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
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
          
          {audioUrls.length > 0 && (
            <>
              <audio 
                ref={audioRef}
                src={audioUrls[currentChunkIndex]}
                onEnded={handleAudioEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                Your browser does not support the audio element.
              </audio>
              {audioUrls.length > 1 && (
                <div className="text-xs text-muted-foreground">
                  Segment {currentChunkIndex + 1} of {audioUrls.length}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioBriefingCard;
