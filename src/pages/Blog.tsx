
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";
import BlogHero from "@/components/blog/BlogHero";
import BlogCategoryTabs from "@/components/blog/BlogCategoryTabs";
import NewsletterSection from "@/components/blog/NewsletterSection";
import CrossPostingSection from "@/components/blog/CrossPostingSection";
import useBlogAnimations from "@/hooks/useBlogAnimations";
import { BlogPost } from "@/types/blog";
import { blogPosts, getCategoryCount, getBlogPostsByCategory } from "@/data/blogData";

const Blog = () => {
  // State for filtering posts
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const { containerVariants, itemVariants } = useBlogAnimations();
  
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter posts when category changes
  useEffect(() => {
    setFilteredPosts(getBlogPostsByCategory(activeCategory));
  }, [activeCategory]);

  // Create schema.org markup for BlogPosting
  const blogPostingSchemas = blogPosts.map(post => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": "Dr. Troy Williams"
    },
    "datePublished": post.date,
    "keywords": post.tags.join(", "),
    "image": post.image
  }));

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AI & Cybersecurity Blog | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Expert commentary and analysis on cybersecurity, AI policy, fraud prevention, and defense technology by Dr. Troy Williams." 
        />
        {/* Output schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "AI & Cybersecurity Blog by Dr. Troy Williams",
            "description": "Expert commentary and analysis on cybersecurity, AI policy, fraud prevention, and defense technology.",
            "author": {
              "@type": "Person",
              "name": "Dr. Troy Williams",
              "jobTitle": "AI Scientist, Cybersecurity Expert",
              "url": "https://legalsmarts.net"
            },
            "blogPosts": blogPostingSchemas
          })}
        </script>
      </Helmet>

      {/* Schema.org markup for WebPage */}
      <WebPageSchema 
        name="AI & Cybersecurity Blog | Dr. Troy Williams"
        description="Expert commentary and analysis on cybersecurity, AI policy, fraud prevention, and defense technology by Dr. Troy Williams."
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
          }
        ]}
      />
      
      <NavBar />
      
      <main className="pt-16">
        {/* Hero section */}
        <BlogHero />
        
        <PageBreadcrumb pageName="Blog" />
        
        {/* Blog content */}
        <section className="container mx-auto px-4 py-12">
          <BlogCategoryTabs 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            filteredPosts={filteredPosts}
            getCategoryCount={getCategoryCount}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </section>
        
        {/* Newsletter subscription */}
        <NewsletterSection />
        
        {/* Cross-posting information */}
        <CrossPostingSection />
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
