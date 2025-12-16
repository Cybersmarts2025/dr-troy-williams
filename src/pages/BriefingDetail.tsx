import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useBriefing } from "@/hooks/useBriefings";
import { Loader2, Calendar, Tag, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause } from "lucide-react";

const BriefingDetail = () => {
  const { slug } = useParams();
  const { data: briefing, isLoading } = useBriefing(slug || "");
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const splitTextIntoChunks = (text: string, maxChars: number = 1200): string[] => {
    const chunks: string[] = [];
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    let currentChunk = '';

    for (const para of paragraphs) {
      if (para.startsWith('#')) continue;
      
      if (currentChunk.length + para.length > maxChars && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = para + '\n\n';
      } else {
        currentChunk += para + '\n\n';
      }
    }

    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  };

  const handleAudioEnded = () => {
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

  const generateAudio = async () => {
    if (!briefing) return;
    
    setIsGenerating(true);
    setAudioUrls([]);
    setCurrentChunkIndex(0);
    
    try {
      const fullText = briefing.content || briefing.summary;
      const textChunks = splitTextIntoChunks(fullText);
      
      const generatedUrls: string[] = [];
      
      for (let i = 0; i < textChunks.length; i++) {
        const chunkText = i === 0 
          ? `${briefing.title}. ${textChunks[i]}` 
          : textChunks[i];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container mx-auto px-4 py-24">
          <h1 className="text-3xl font-bold text-center">Briefing Not Found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/stolennation/${briefing.slug}`;

  return (
    <>
      <Helmet>
        <title>{briefing.seo_title}</title>
        <meta name="description" content={briefing.seo_description} />
        <meta name="keywords" content={briefing.keywords.join(', ')} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={briefing.title} />
        <meta property="og:description" content={briefing.seo_description} />
        {briefing.featured_image && <meta property="og:image" content={briefing.featured_image} />}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={shareUrl} />
        <meta name="twitter:title" content={briefing.title} />
        <meta name="twitter:description" content={briefing.seo_description} />
        {briefing.featured_image && <meta name="twitter:image" content={briefing.featured_image} />}
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavBar />
        
        <main className="container mx-auto px-4 py-24">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <Badge variant="outline" className="text-[#B22234] border-[#B22234]">
                  {briefing.category}
                </Badge>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(briefing.published_at || briefing.created_at), 'MMMM d, yyyy')}
                </div>
                
                {briefing.geo_tags && briefing.geo_tags.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    {briefing.geo_tags.join(', ')}
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{briefing.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{briefing.summary}</p>
              
              <div className="flex items-center gap-3 mb-6">
                <Button
                  onClick={handlePlayPause}
                  disabled={isGenerating}
                  className="bg-[#3C3B6E] hover:bg-[#2d2c54]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Audio...
                    </>
                  ) : isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Briefing
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Listen to Briefing
                    </>
                  )}
                </Button>
              </div>

              {audioUrls.length > 0 && (
                <>
                  <audio 
                    ref={audioRef}
                    src={audioUrls[currentChunkIndex]}
                    onEnded={handleAudioEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  {audioUrls.length > 1 && (
                    <div className="text-sm text-muted-foreground mb-4">
                      Audio segment {currentChunkIndex + 1} of {audioUrls.length}
                    </div>
                  )}
                </>
              )}
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {briefing.content}
              </div>
            </div>

            <footer className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Author: {briefing.author}
              </p>
              {briefing.keywords && briefing.keywords.length > 0 && (
                <div className="flex items-start gap-2 mt-4">
                  <Tag className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {briefing.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BriefingDetail;
