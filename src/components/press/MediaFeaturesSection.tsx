
import React from 'react';
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionTitle } from "@/components/social/SectionTitle";
import UrlMetadataFetcher from "@/components/press/UrlMetadataFetcher";

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
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="p-4 bg-gray-100 flex items-center justify-center h-32">
                <img src={item.logo} alt={`${item.outlet} logo`} className="max-h-20 max-w-full object-contain" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-[#B22234]">{item.outlet}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <a href={item.link} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  Read Article
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaFeaturesSection;
