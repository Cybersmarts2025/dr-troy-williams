
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Download, Upload, Database, Calendar, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface BackupData {
  blogPosts: any[];
  timestamp: string;
  version: string;
}

const BackupManager = () => {
  const { toast } = useToast();
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreContent, setRestoreContent] = useState('');
  const [backupProgress, setBackupProgress] = useState(0);

  // Fetch existing data for backup
  const { data: blogPosts } = useQuery({
    queryKey: ['backup-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createBackup = async () => {
    setIsCreatingBackup(true);
    setBackupProgress(0);

    try {
      // Simulate backup progress
      setBackupProgress(25);
      
      const backupData: BackupData = {
        blogPosts: blogPosts || [],
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      };

      setBackupProgress(75);

      // Create downloadable backup file
      const backupBlob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: 'application/json'
      });

      setBackupProgress(100);

      const url = URL.createObjectURL(backupBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `content-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Backup created",
        description: `Successfully backed up ${backupData.blogPosts.length} blog posts`,
      });
    } catch (error) {
      console.error('Backup failed:', error);
      toast({
        title: "Backup failed",
        description: "An error occurred while creating the backup",
        variant: "destructive"
      });
    } finally {
      setIsCreatingBackup(false);
      setBackupProgress(0);
    }
  };

  const handleFileRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      toast({
        title: "Invalid file type",
        description: "Please upload a JSON backup file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setRestoreContent(content);
    };
    reader.readAsText(file);
  };

  const restoreFromBackup = async () => {
    if (!restoreContent.trim()) {
      toast({
        title: "No backup data",
        description: "Please upload a backup file first",
        variant: "destructive"
      });
      return;
    }

    setIsRestoring(true);

    try {
      const backupData: BackupData = JSON.parse(restoreContent);
      
      if (!backupData.blogPosts || !Array.isArray(backupData.blogPosts)) {
        throw new Error('Invalid backup format');
      }

      // Clear existing data (optional - you might want to confirm this with user)
      // await supabase.from('blog_posts').delete().neq('id', '');

      // Restore blog posts
      for (const post of backupData.blogPosts) {
        const { error } = await supabase
          .from('blog_posts')
          .upsert([post]);

        if (error) {
          console.error('Error restoring post:', error);
        }
      }

      toast({
        title: "Restore completed",
        description: `Successfully restored ${backupData.blogPosts.length} blog posts from ${new Date(backupData.timestamp).toLocaleDateString()}`,
      });
      setRestoreContent('');
    } catch (error) {
      console.error('Restore failed:', error);
      toast({
        title: "Restore failed",
        description: "Invalid backup file or restore error",
        variant: "destructive"
      });
    } finally {
      setIsRestoring(false);
    }
  };

  const getBackupStats = () => {
    const postsCount = blogPosts?.length || 0;
    const estimatedSize = Math.round((JSON.stringify(blogPosts || []).length / 1024) * 100) / 100;
    
    return { postsCount, estimatedSize };
  };

  const { postsCount, estimatedSize } = getBackupStats();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Backup & Recovery
          </CardTitle>
          <CardDescription>
            Create backups of your content and restore from previous backups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Backup Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{postsCount}</p>
                    <p className="text-sm text-gray-600">Blog Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{estimatedSize} KB</p>
                    <p className="text-sm text-gray-600">Backup Size</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">Daily</p>
                    <p className="text-sm text-gray-600">Recommended</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Backup */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create Backup</CardTitle>
              <CardDescription>
                Download a complete backup of your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCreatingBackup && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Creating backup...</span>
                    <span>{Math.round(backupProgress)}%</span>
                  </div>
                  <Progress value={backupProgress} />
                </div>
              )}
              
              <Button 
                onClick={createBackup}
                disabled={isCreatingBackup || postsCount === 0}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                {isCreatingBackup ? 'Creating Backup...' : 'Download Backup'}
              </Button>
            </CardContent>
          </Card>

          {/* Restore from Backup */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Restore from Backup</CardTitle>
              <CardDescription>
                Upload and restore content from a previous backup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="backup-file">Select Backup File</Label>
                <Input
                  id="backup-file"
                  type="file"
                  accept=".json"
                  onChange={handleFileRestore}
                  disabled={isRestoring}
                />
              </div>

              {restoreContent && (
                <div>
                  <Label htmlFor="backup-preview">Backup Preview</Label>
                  <Textarea
                    id="backup-preview"
                    value={restoreContent.substring(0, 500) + (restoreContent.length > 500 ? '...' : '')}
                    readOnly
                    className="h-32"
                  />
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Warning</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Restoring will add the backup content to your existing data. Make sure to create a current backup first.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={restoreFromBackup}
                disabled={!restoreContent || isRestoring}
                className="w-full"
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isRestoring ? 'Restoring...' : 'Restore from Backup'}
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManager;
