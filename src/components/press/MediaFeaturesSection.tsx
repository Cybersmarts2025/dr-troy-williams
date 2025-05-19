import React from 'react';
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionTitle } from "@/components/social/SectionTitle";
import UrlMetadataFetcher from "@/components/press/UrlMetadataFetcher";
import MediaFeatureCard from './MediaFeatureCard';

// Types for our data
export interface MediaFeature {
  outlet: string;
  title: string;
  date: string;
  description: string;
  link: string;
  logo: string;
}

interface MediaFeaturesSectionProps {
  features: MediaFeature[];
  onMetadataFetched: (data: { title: string; description: string; outlet?: string }) => void;
}

const MediaFeaturesSection = ({ features, onMetadataFetched }: MediaFeaturesSectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <SectionTitle icon={Newspaper} title="Media Features" />
        
        {/* Add the URL Metadata Fetcher component */}
        <UrlMetadataFetcher onMetadataFetched={onMetadataFetched} />
        
        <Card className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>How to Edit Media Features</span>
            </CardTitle>
            <CardDescription>
              To add or remove media features, modify the <code>features</code> array in the <code>src/pages/Press.tsx</code> file. 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell><code>outlet</code></TableCell>
                  <TableCell>Name of the media outlet</TableCell>
                  <TableCell>"USA Today"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>title</code></TableCell>
                  <TableCell>Title of the article or feature</TableCell>
                  <TableCell>"AI in National Defense"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>date</code></TableCell>
                  <TableCell>Date of publication</TableCell>
                  <TableCell>"March 15, 2024"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>description</code></TableCell>
                  <TableCell>Short description of the content</TableCell>
                  <TableCell>"Dr. Troy Williams discusses..."</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>link</code></TableCell>
                  <TableCell>URL to the article</TableCell>
                  <TableCell>"https://example.com/article"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>logo</code></TableCell>
                  <TableCell>URL to the outlet's logo image</TableCell>
                  <TableCell>"https://example.com/logo.png"</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <MediaFeatureCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaFeaturesSection;
