
import React, { useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";
import BlogHero from "@/components/blog/BlogHero";
import useBlogAnimations from "@/hooks/useBlogAnimations";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { getCategoryCount, getBlogPostsByCategory } from "@/data/blogData";
import { useState } from "react";

// Lazy load less critical components
const BlogCategoryTabs = lazy(() => import("@/components/blog/BlogCategoryTabs"));
const NewsletterSection = lazy(() => import("@/components/blog/NewsletterSection"));
const CrossPostingSection = lazy(() => import("@/components/blog/CrossPostingSection"));

// Loading component
const SectionLoader = () => (
  <div className="py-8 flex justify-center items-center">
    <div className="w-12 h-12 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Blog = () => {
  // State for filtering posts
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { containerVariants, itemVariants } = useBlogAnimations();
  
  // Fetch blog posts using our custom hook
  const { data: blogPosts, isLoading, error } = useBlogPosts();
  
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter posts when category or blogPosts changes
  useEffect(() => {
    if (blogPosts) {
      if (activeCategory === "all") {
        setFilteredPosts(blogPosts);
      } else {
        setFilteredPosts(blogPosts.filter(post => post.category === activeCategory));
      }
    }
  }, [activeCategory, blogPosts]);

  // Helper function to count posts by category
  const getCategoryPostCount = (category) => {
    if (!blogPosts) return 0;
    if (category === "all") return blogPosts.length;
    return blogPosts.filter(post => post.category === category).length;
  };

  // Create schema.org markup for BlogPosting
  const blogPostingSchemas = blogPosts 
    ? blogPosts.map(post => ({
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
      }))
    : [];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AI & Cybersecurity Blog | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Expert commentary and analysis on cybersecurity, AI policy, fraud prevention, and defense technology by Dr. Troy Williams." 
        />
        <link rel="preload" href="/lovable-uploads/circuit-pattern.png" as="image" />
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
          {isLoading ? (
            <div className="text-center py-12">
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-xl mt-4">Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-500">Error loading blog posts</p>
              <p className="text-gray-600">{(error as Error).message}</p>
            </div>
          ) : (
            <Suspense fallback={<SectionLoader />}>
              <BlogCategoryTabs 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                filteredPosts={filteredPosts}
                getCategoryCount={getCategoryPostCount}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
            </Suspense>
          )}
        </section>
        
        {/* Newsletter subscription */}
        <Suspense fallback={<SectionLoader />}>
          <NewsletterSection />
        </Suspense>
        
        {/* Cross-posting information */}
        <Suspense fallback={<SectionLoader />}>
          <CrossPostingSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
