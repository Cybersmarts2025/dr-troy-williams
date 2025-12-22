import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wand2, Download, Loader2, Image, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: Date;
}

const AIImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

  const suggestedPrompts = [
    "Professional cybersecurity expert presenting to a corporate boardroom",
    "Modern AI security center with holographic threat displays",
    "Cybersecurity team analyzing data on multiple monitors",
    "Futuristic digital shield protecting corporate data",
    "Business professional conducting security awareness training",
    "High-tech automotive cybersecurity testing facility"
  ];

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for the image');
      return;
    }

    // Require a signed-in user to prevent anonymous abuse
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      toast.error('Please sign in to generate images.');
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-image-generator', {
        body: { 
          prompt: prompt.trim(),
          style: "professional, high-quality, corporate, cybersecurity theme"
        }
      });

      if (error) throw error;

      if (data?.imageUrl) {
        const newImage: GeneratedImage = {
          url: data.imageUrl,
          prompt: prompt.trim(),
          timestamp: new Date()
        };
        
        setGeneratedImage(newImage);
        toast.success('Image generated successfully!');
      } else {
        throw new Error('No image data received');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image');
    }
  };

  const useSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      generateImage();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#3C3B6E]" />
          AI Image Generator
        </CardTitle>
        <p className="text-gray-600">
          Generate professional cybersecurity and technology-themed images using AI
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Describe the image you want to generate
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., A professional cybersecurity expert analyzing threat data on multiple monitors in a modern security operations center"
              className="min-h-[100px] resize-none"
              disabled={isGenerating}
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Press Ctrl+Enter to generate quickly
            </p>
          </div>

          <Button
            onClick={generateImage}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-[#3C3B6E] hover:bg-[#2A2952]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
        </div>

        {/* Suggested Prompts */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Suggested Prompts:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((suggestedPrompt, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-[#3C3B6E] hover:text-white transition-colors text-xs px-3 py-1"
                onClick={() => useSuggestedPrompt(suggestedPrompt)}
              >
                {suggestedPrompt}
              </Badge>
            ))}
          </div>
        </div>

        {/* Generated Image Display */}
        {generatedImage && (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <img
                src={generatedImage.url}
                alt={generatedImage.prompt}
                className="w-full h-auto max-h-[500px] object-contain bg-gray-50"
                loading="lazy"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Generated Image</p>
                <p className="text-xs text-gray-600 line-clamp-2">
                  "{generatedImage.prompt}"
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Generated at {generatedImage.timestamp.toLocaleString()}
                </p>
              </div>
              
              <Button
                onClick={downloadImage}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Image className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="text-blue-800 font-medium mb-1">AI Image Generation</p>
              <p className="text-blue-700">
                This tool uses the Gemini 2.5 Flash Image Preview model to generate professional images optimized for cybersecurity, technology, and business use. All generated images are optimized for cybersecurity, 
                technology, and business contexts.
              </p>
              <p className="text-blue-600 text-xs mt-2">
                High-quality results • Commercial use allowed • Professional output
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIImageGenerator;