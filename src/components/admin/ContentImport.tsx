
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Image, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ImportProgress {
  total: number;
  completed: number;
  current: string;
}

const ContentImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState<ImportProgress>({ total: 0, completed: 0, current: '' });
  const [csvContent, setCsvContent] = useState('');

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCsvContent(content);
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
    }
  };

  const processCsvContent = async () => {
    if (!csvContent.trim()) {
      toast({
        title: "No content",
        description: "Please upload a CSV file first",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Validate CSV headers
    const requiredHeaders = ['title', 'content', 'category'];
    const hasRequiredHeaders = requiredHeaders.every(header => 
      headers.some(h => h.toLowerCase().includes(header.toLowerCase()))
    );

    if (!hasRequiredHeaders) {
      toast({
        title: "Invalid CSV format",
        description: "CSV must contain title, content, and category columns",
        variant: "destructive"
      });
      setIsImporting(false);
      return;
    }

    const dataLines = lines.slice(1);
    setProgress({ total: dataLines.length, completed: 0, current: '' });

    try {
      for (let i = 0; i < dataLines.length; i++) {
        const line = dataLines[i];
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        
        const post = {
          id: `imported-${Date.now()}-${i}`,
          title: values[0] || `Imported Post ${i + 1}`,
          content: values[1] || 'Imported content',
          category: values[2] || 'general',
          excerpt: values[1]?.substring(0, 150) + '...' || 'Imported content excerpt',
          image: 'https://images.unsplash.com/photo-1677442135185-8034cb13c4b4?auto=format&fit=crop&w=800',
          tags: values[3]?.split(';') || ['imported'],
          readtime: '5 min read',
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          likes: 0,
          author: "Dr. Troy Williams"
        };

        setProgress(prev => ({ ...prev, completed: i + 1, current: post.title }));

        const { error } = await supabase
          .from('blog_posts')
          .insert([post]);

        if (error) {
          console.error('Error importing post:', error);
          toast({
            title: "Import error",
            description: `Failed to import: ${post.title}`,
            variant: "destructive"
          });
        }

        // Small delay to prevent overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      toast({
        title: "Import completed",
        description: `Successfully imported ${dataLines.length} posts`,
      });
      setCsvContent('');
    } catch (error) {
      console.error('Import failed:', error);
      toast({
        title: "Import failed",
        description: "An error occurred during import",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
      setProgress({ total: 0, completed: 0, current: '' });
    }
  };

  const downloadTemplate = () => {
    const template = 'title,content,category,tags\n"Sample Post Title","This is sample content for your blog post","ai","ai;technology;innovation"\n"Another Post","More sample content here","cybersecurity","security;privacy"';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Content Import
          </CardTitle>
          <CardDescription>
            Import multiple blog posts from CSV files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button 
              onClick={downloadTemplate}
              variant="outline"
              className="mb-4"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV Template
            </Button>
          </div>
          
          <div>
            <Label htmlFor="csv-file">Upload CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileImport}
              disabled={isImporting}
            />
          </div>

          {csvContent && (
            <div>
              <Label htmlFor="csv-preview">CSV Preview</Label>
              <Textarea
                id="csv-preview"
                value={csvContent.split('\n').slice(0, 5).join('\n') + (csvContent.split('\n').length > 5 ? '\n...' : '')}
                readOnly
                className="h-32"
              />
            </div>
          )}

          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {progress.completed}/{progress.total}</span>
                <span>{Math.round((progress.completed / progress.total) * 100)}%</span>
              </div>
              <Progress value={(progress.completed / progress.total) * 100} />
              <p className="text-sm text-gray-600">Currently importing: {progress.current}</p>
            </div>
          )}

          <Button 
            onClick={processCsvContent}
            disabled={!csvContent || isImporting}
            className="w-full"
          >
            {isImporting ? 'Importing...' : 'Import Content'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentImport;
