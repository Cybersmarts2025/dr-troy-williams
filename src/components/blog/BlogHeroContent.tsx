
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface BlogHeroContentProps {
  onNewsletterClick: () => void;
}

const BlogHeroContent = ({ onNewsletterClick }: BlogHeroContentProps) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">AI & Cybersecurity Blog</h1>
      <p className="text-xl max-w-3xl mb-8">
        Expert commentary and analysis on cybersecurity, AI policy, fraud prevention, and defense technology from Dr. Troy Williams.
      </p>
      <Button 
        onClick={onNewsletterClick}
        className="bg-white text-[#3C3B6E] hover:bg-gray-100"
      >
        <Mail className="h-4 w-4 mr-2" />
        Subscribe to Updates
      </Button>
    </div>
  );
};

export default BlogHeroContent;
