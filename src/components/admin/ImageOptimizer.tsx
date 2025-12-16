
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Image as ImageIcon, Upload, Download, Zap } from 'lucide-react';

interface OptimizationSettings {
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  maxWidth: number;
  maxHeight: number;
}

const ImageOptimizer = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [optimizedUrls, setOptimizedUrls] = useState<string[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState<OptimizationSettings>({
    quality: 80,
    format: 'webp',
    maxWidth: 1200,
    maxHeight: 800
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Only image files are allowed",
        variant: "destructive"
      });
    }
    
    setSelectedFiles(imageFiles);
  };

  const optimizeImage = useCallback(async (file: File, settings: OptimizationSettings): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        const maxWidth = settings.maxWidth;
        const maxHeight = settings.maxHeight;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to desired format
        const mimeType = `image/${settings.format}`;
        const quality = settings.quality / 100;
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve(url);
          }
        }, mimeType, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleOptimize = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select image files to optimize",
        variant: "destructive"
      });
      return;
    }

    setIsOptimizing(true);
    setProgress(0);
    const urls: string[] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const optimizedUrl = await optimizeImage(file, settings);
        urls.push(optimizedUrl);
        setProgress(((i + 1) / selectedFiles.length) * 100);
      }

      setOptimizedUrls(urls);
      toast({
        title: "Optimization complete",
        description: `Optimized ${selectedFiles.length} images successfully`,
      });
    } catch (error) {
      console.error('Optimization failed:', error);
      toast({
        title: "Optimization failed",
        description: "An error occurred during image optimization",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const downloadOptimized = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-image-${index + 1}.${settings.format}`;
    a.click();
  };

  const handleImageClick = (url: string, index: number) => {
    downloadOptimized(url, index);
  };

  const handleImageKeyDown = (event: React.KeyboardEvent, url: string, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      downloadOptimized(url, index);
    }
  };

  const downloadAll = () => {
    optimizedUrls.forEach((url, index) => {
      setTimeout(() => downloadOptimized(url, index), index * 100);
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
            Image Optimizer
          </CardTitle>
          <CardDescription>
            Optimize images for web performance with automatic compression and format conversion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quality">Quality (%)</Label>
              <Input
                id="quality"
                type="number"
                min="10"
                max="100"
                value={settings.quality}
                onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                className="min-h-[44px]"
              />
            </div>
            
            <div>
              <Label htmlFor="format">Output Format</Label>
              <Select value={settings.format} onValueChange={(value: any) => setSettings(prev => ({ ...prev, format: value }))}>
                <SelectTrigger className="min-h-[44px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webp">WebP (Best compression)</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="maxWidth">Max Width (px)</Label>
              <Input
                id="maxWidth"
                type="number"
                value={settings.maxWidth}
                onChange={(e) => setSettings(prev => ({ ...prev, maxWidth: parseInt(e.target.value) }))}
                className="min-h-[44px]"
              />
            </div>
            
            <div>
              <Label htmlFor="maxHeight">Max Height (px)</Label>
              <Input
                id="maxHeight"
                type="number"
                value={settings.maxHeight}
                onChange={(e) => setSettings(prev => ({ ...prev, maxHeight: parseInt(e.target.value) }))}
                className="min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image-files">Select Images</Label>
            <Input
              id="image-files"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isOptimizing}
              className="min-h-[44px]"
            />
            {selectedFiles.length > 0 && (
              <p className="text-sm text-gray-600 mt-2" aria-live="polite">
                Selected {selectedFiles.length} image(s)
              </p>
            )}
          </div>

          {isOptimizing && (
            <div className="space-y-2" role="status" aria-live="polite">
              <div className="flex justify-between text-sm">
                <span>Optimizing images...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} aria-label={`Optimization progress: ${Math.round(progress)}%`} />
            </div>
          )}

          <Button 
            onClick={handleOptimize}
            disabled={selectedFiles.length === 0 || isOptimizing}
            className="w-full min-h-[44px]"
          >
            <Zap className="mr-2 h-4 w-4" aria-hidden="true" />
            {isOptimizing ? 'Optimizing...' : 'Optimize Images'}
          </Button>

          {optimizedUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Optimized Images</CardTitle>
                <CardDescription>
                  Click or press Enter to download individual images, or download all at once
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4" role="list">
                  {optimizedUrls.map((url, index) => (
                    <div key={index} className="relative" role="listitem">
                      <button
                        type="button"
                        onClick={() => handleImageClick(url, index)}
                        onKeyDown={(e) => handleImageKeyDown(e, url, index)}
                        className="w-full h-24 rounded cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden min-h-[44px]"
                        aria-label={`Download optimized image ${index + 1}`}
                      >
                        <img 
                          src={url} 
                          alt={`Optimized image ${index + 1} preview`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <Button onClick={downloadAll} className="w-full min-h-[44px]">
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download All Optimized Images
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageOptimizer;
