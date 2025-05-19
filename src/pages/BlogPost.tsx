import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, ThumbsUp, Share2, ArrowLeft } from "lucide-react";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";
import NotFound from "@/pages/NotFound";
import { useBlogPost } from "@/hooks/useBlogPosts";

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading, error } = useBlogPost(postId);
  
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [postId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <p className="text-xl">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !post) {
    return <NotFound />;
  }

  // Default values for author details
  const authorDetails = {
    authorTitle: "AI Scientist and Cybersecurity Expert",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{post.title} | Dr. Troy Williams Blog</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Schema.org markup for BlogPosting */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author,
              "jobTitle": authorDetails.authorTitle
            },
            "publisher": {
              "@type": "Organization",
              "name": "Dr. Troy Williams",
              "logo": {
                "@type": "ImageObject",
                "url": "https://legalsmarts.net/logo.png"
              }
            },
            "datePublished": post.date,
            "articleBody": post.content.replace(/<[^>]*>?/gm, '').substring(0, 500),
            "keywords": post.tags.join(", ")
          })}
        </script>
      </Helmet>
      
      {/* Schema.org markup for WebPage */}
      <WebPageSchema 
        name={`${post.title} | Dr. Troy Williams Blog`}
        description={post.excerpt}
      />
      
      {/* Schema.org markup for BreadcrumbList */}
      <BreadcrumbListSchema
        items={[
          {
            name: "Home",
            item: "https://legalsmarts.net"
          },
          {
            name: "Blog",
            item: "https://legalsmarts.net/blog"
          },
          {
            name: post.title,
            item: `https://legalsmarts.net/blog/${post.id}`
          }
        ]}
      />
      
      <NavBar />
      
      <main className="pt-16">
        {/* Hero section with blog post featured image */}
        <div 
          className="h-[40vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container mx-auto px-4 pb-8 text-white">
              <Badge className="mb-4 bg-[#B22234]">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl">{post.title}</h1>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <PageBreadcrumb pageName="Blog Post" />
          
          <div className="max-w-3xl mx-auto mt-8">
            {/* Author information */}
            <div className="flex items-center mb-8">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={authorDetails.authorImage} alt={post.author} />
                <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{post.author}</h3>
                <p className="text-sm text-gray-500">{authorDetails.authorTitle}</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Article content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Article footer */}
            <div className="border-t border-b py-6 my-8 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-[#3C3B6E]" />
                <span>{post.likes} people found this helpful</span>
              </div>
              <Button variant="ghost" className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share Article
              </Button>
            </div>
            
            {/* Back to blog */}
            <div className="my-8">
              <Link 
                to="/blog" 
                className="text-[#3C3B6E] hover:text-[#252550] flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
