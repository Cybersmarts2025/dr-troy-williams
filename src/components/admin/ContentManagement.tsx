
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Image, Shield, Database } from 'lucide-react';
import ContentImport from './ContentImport';
import ImageOptimizer from './ImageOptimizer';
import BackupManager from './BackupManager';

const ContentManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Content Management System
          </CardTitle>
          <CardDescription>
            Manage your content with bulk import tools, image optimization, and backup systems
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Bulk Import
          </TabsTrigger>
          <TabsTrigger value="optimize" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Image Optimizer
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Backup & Recovery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import">
          <ContentImport />
        </TabsContent>

        <TabsContent value="optimize">
          <ImageOptimizer />
        </TabsContent>

        <TabsContent value="backup">
          <BackupManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
