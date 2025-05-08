
import React from 'react';
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionTitle } from "@/components/social/SectionTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Recognition {
  title: string;
  organization: string;
  year: string;
  description: string;
  logo: string;
}

interface AwardsSectionProps {
  recognitions: Recognition[];
}

const AwardsSection = ({ recognitions }: AwardsSectionProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle icon={Award} title="Awards & Recognition" />
        
        <Card className="mb-6 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>How to Edit Awards & Recognitions</span>
            </CardTitle>
            <CardDescription>
              To add or remove awards and recognitions, modify the <code>recognitions</code> array in the <code>src/pages/Press.tsx</code> file.
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
                  <TableCell><code>title</code></TableCell>
                  <TableCell>Title of the award</TableCell>
                  <TableCell>"Top 50 Cybersecurity Experts"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>organization</code></TableCell>
                  <TableCell>Organization giving the award</TableCell>
                  <TableCell>"Security Magazine"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>year</code></TableCell>
                  <TableCell>Year received</TableCell>
                  <TableCell>"2023"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>description</code></TableCell>
                  <TableCell>Brief description of the award</TableCell>
                  <TableCell>"Recognized for innovative approaches..."</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>logo</code></TableCell>
                  <TableCell>URL to award image/logo</TableCell>
                  <TableCell>"https://example.com/award.png"</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recognitions.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex items-start gap-4"
            >
              <div className="shrink-0">
                <img src={item.logo} alt={item.title} className="w-16 h-16 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#B22234]">{item.organization}</span>
                  <span className="text-xs text-gray-500">{item.year}</span>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
