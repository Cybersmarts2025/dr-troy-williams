import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ThumbsUp, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from '@/types/blog';
import { BookmarkButton } from "@/components/ui/bookmark-button";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-0 right-0 bg-[#B22234] text-white px-3 py-1 m-2 rounded text-sm font-medium">
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <span>{post.date}</span>
          <span className="mx-1">•</span>
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>{post.readTime}</span>
        </div>
        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3 mt-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-[#3C3B6E]" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </div>
        </div>
        <BookmarkButton 
          id={post.id}
          title={post.title}
          type="blog"
          url={`/blog/${post.id}`}
          variant="ghost"
          size="icon"
        />
      </CardFooter>
      <div className="px-6 pb-6">
        <Button asChild className="w-full bg-[#3C3B6E] hover:bg-[#2d2c52]">
          <Link to={`/blog/${post.id}`}>Read Article</Link>
        </Button>
      </div>
    </Card>
  );
};

export default BlogCard;
