
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog';

interface BlogCategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  allPosts: BlogPost[];
  getCategoryCount: (category: string) => number;
  containerVariants: any;
  itemVariants: any;
}

const BlogCategoryTabs = ({ 
  activeCategory, 
  setActiveCategory, 
  allPosts, 
  getCategoryCount,
  containerVariants,
  itemVariants
}: BlogCategoryTabsProps) => {
  // Filter posts by category
  const getPostsByCategory = (category: string) => {
    if (category === "all") return allPosts;
    return allPosts.filter(post => post.category === category);
  };

  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory}>
      <div className="flex justify-center mb-8">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="all" className="px-4 py-2">
            All <Badge variant="outline" className="ml-1">{getCategoryCount("all")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="AI & Technology" className="px-4 py-2">
            AI & Technology <Badge variant="outline" className="ml-1">{getCategoryCount("AI & Technology")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="National Security" className="px-4 py-2">
            National Security <Badge variant="outline" className="ml-1">{getCategoryCount("National Security")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="Fraud Prevention" className="px-4 py-2">
            Fraud Prevention <Badge variant="outline" className="ml-1">{getCategoryCount("Fraud Prevention")}</Badge>
          </TabsTrigger>
          <TabsTrigger value="Policy & Governance" className="px-4 py-2">
            Policy & Governance <Badge variant="outline" className="ml-1">{getCategoryCount("Policy & Governance")}</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
      
      {/* Tab content for each category */}
      {["all", "AI & Technology", "National Security", "Fraud Prevention", "Policy & Governance"].map((category) => {
        const categoryPosts = getPostsByCategory(category);
        return (
          <TabsContent key={category} value={category} className="mt-0">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categoryPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>

            {categoryPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">
                  {category === "all" ? "No articles found." : "No articles found in this category."}
                </p>
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default BlogCategoryTabs;
