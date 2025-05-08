
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';

interface BlogCategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredPosts: BlogPost[];
  getCategoryCount: (category: string) => number;
  containerVariants: any;
  itemVariants: any;
}

const BlogCategoryTabs = ({ 
  activeCategory, 
  setActiveCategory, 
  filteredPosts, 
  getCategoryCount,
  containerVariants,
  itemVariants
}: BlogCategoryTabsProps) => {
  return (
    <Tabs defaultValue="all" onValueChange={setActiveCategory}>
      <div className="flex justify-center mb-8">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="all" className="px-4 py-2">
            All <Badge variant="outline" className="ml-1">{getCategoryCount("all")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="ai" className="px-4 py-2">
            AI <Badge variant="outline" className="ml-1">{getCategoryCount("ai")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="cybersecurity" className="px-4 py-2">
            Cybersecurity <Badge variant="outline" className="ml-1">{getCategoryCount("cybersecurity")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="fraud" className="px-4 py-2">
            Fraud <Badge variant="outline" className="ml-1">{getCategoryCount("fraud")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="defense" className="px-4 py-2">
            Defense <Badge variant="outline" className="ml-1">{getCategoryCount("defense")}</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
      
      {/* All tabs content share the same layout */}
      <TabsContent value={activeCategory} className="mt-0">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No articles found in this category.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default BlogCategoryTabs;
