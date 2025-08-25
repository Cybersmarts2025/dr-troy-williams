import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";
import BlogHero from "@/components/blog/BlogHero";
import useBlogAnimations from "@/hooks/useBlogAnimations";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { getCategoryCount, getBlogPostsByCategory } from "@/data/blogData";
import BlogSearch, { SearchFilters } from "@/components/blog/BlogSearch";

// Import components directly instead of lazy loading to fix dynamic import issues
import BlogCategoryTabs from "@/components/blog/BlogCategoryTabs";
import NewsletterSection from "@/components/blog/NewsletterSection";
import CrossPostingSection from "@/components/blog/CrossPostingSection";

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
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    tag: '',
    author: '',
    dateRange: 'all',
    sortBy: 'newest'
  });
  const { containerVariants, itemVariants } = useBlogAnimations();
  
  // Fetch blog posts using our custom hook
  const { data: blogPosts, isLoading, error } = useBlogPosts();
  
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Enhanced filtering function
  const filterAndSortPosts = (posts: any[], filters: SearchFilters) => {
    let filtered = posts;

    // Text search
    if (filters.query) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(filters.query.toLowerCase()) ||
        post.content.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Author filter
    if (filters.author) {
      filtered = filtered.filter(post => post.author === filters.author);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(post => {
        const postDate = new Date(post.date);
        switch (filters.dateRange) {
          case 'week':
            return now.getTime() - postDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
          case 'month':
            return now.getTime() - postDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
          case 'year':
            return now.getTime() - postDate.getTime() <= 365 * 24 * 60 * 60 * 1000;
          default:
            return true;
        }
      });
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return (b.likes || 0) - (a.likes || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  };

  // Update filtered posts when search filters or blog posts change
  useEffect(() => {
    if (blogPosts) {
      const filtered = filterAndSortPosts(blogPosts, searchFilters);
      setFilteredPosts(filtered);
    }
  }, [searchFilters, blogPosts]);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

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
    <div className="min-h-screen bg-background">
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
            <>
              <BlogSearch onSearch={handleSearch} totalResults={filteredPosts.length} />
              <BlogCategoryTabs 
                activeCategory={searchFilters.category}
                setActiveCategory={(category) => handleSearch({ ...searchFilters, category })}
                filteredPosts={filteredPosts}
                getCategoryCount={getCategoryPostCount}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
            </>
          )}
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
