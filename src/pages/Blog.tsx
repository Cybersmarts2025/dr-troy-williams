import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Calendar, Clock, Tag, ThumbsUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";

// Sample blog post data - in a real app, this would come from an API
const blogPosts = [
  {
    id: "ai-policy-2025",
    title: "The Future of AI Policy and Regulation in America",
    excerpt: "Analysis of emerging legislative frameworks for artificial intelligence in the United States and implications for national security.",
    content: "Full article content would go here...",
    date: "May 4, 2025",
    readTime: "8 min read",
    author: "Dr. Troy Williams",
    category: "ai",
    tags: ["AI Policy", "Regulation", "National Security"],
    likes: 124,
    image: "https://images.unsplash.com/photo-1677442135185-8034cb13c4b4?auto=format&fit=crop&w=800"
  },
  {
    id: "zero-day-threats",
    title: "Understanding Zero-Day Threats: Early Detection Systems",
    excerpt: "A comprehensive overview of zero-day vulnerability detection methods and their implementation in critical infrastructure systems.",
    content: "Full article content would go here...",
    date: "April 28, 2025",
    readTime: "11 min read",
    author: "Dr. Troy Williams",
    category: "cybersecurity",
    tags: ["Zero-Day Threats", "Critical Infrastructure", "Threat Detection"],
    likes: 98,
    image: "https://images.unsplash.com/photo-1614064548237-096d9c1a471d?auto=format&fit=crop&w=800"
  },
  {
    id: "generative-ai-ethics",
    title: "Ethical Considerations in Generative AI Development",
    excerpt: "Exploring the ethical implications of generative AI technologies and frameworks for responsible development.",
    content: "Full article content would go here...",
    date: "April 15, 2025",
    readTime: "9 min read",
    author: "Dr. Troy Williams",
    category: "ai",
    tags: ["AI Ethics", "Generative AI", "Responsible Tech"],
    likes: 156,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800"
  },
  {
    id: "malware-analysis",
    title: "Advanced Malware Analysis Techniques for Security Professionals",
    excerpt: "A technical deep dive into modern malware analysis methodologies and tools for cybersecurity professionals.",
    content: "Full article content would go here...",
    date: "April 7, 2025",
    readTime: "14 min read",
    author: "Dr. Troy Williams",
    category: "cybersecurity",
    tags: ["Malware Analysis", "Cyber Defense", "Security Tools"],
    likes: 87,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800"
  },
  {
    id: "fraud-prevention",
    title: "Next-Generation Fraud Prevention: AI and Behavioral Analytics",
    excerpt: "How artificial intelligence and behavioral analytics are transforming fraud detection and prevention strategies.",
    content: "Full article content would go here...",
    date: "March 23, 2025",
    readTime: "10 min read",
    author: "Dr. Troy Williams",
    category: "fraud",
    tags: ["Fraud Prevention", "AI Detection", "Behavioral Analytics"],
    likes: 112,
    image: "https://images.unsplash.com/photo-1616469829761-4ae8b5d54ed4?auto=format&fit=crop&w=800"
  },
  {
    id: "defense-tech",
    title: "Innovation in Defense Technology: Autonomous Systems",
    excerpt: "An overview of how autonomous systems are reshaping military and defense technologies and strategies.",
    content: "Full article content would go here...",
    date: "March 12, 2025",
    readTime: "12 min read",
    author: "Dr. Troy Williams",
    category: "defense",
    tags: ["Defense Tech", "Autonomous Systems", "Military Innovation"],
    likes: 76,
    image: "https://images.unsplash.com/photo-1514302240736-b1fee5985889?auto=format&fit=crop&w=800"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Blog = () => {
  // State for filtering posts
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter posts when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory]);

  const getCategoryCount = (category) => {
    if (category === "all") return blogPosts.length;
    return blogPosts.filter(post => post.category === category).length;
  };

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
        <div className="bg-gradient-to-r from-[#3C3B6E] to-[#1a1a3a] text-white py-16 mt-4">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI & Cybersecurity Blog</h1>
            <p className="text-xl max-w-3xl">
              Expert commentary and analysis on cybersecurity, AI policy, fraud prevention, and defense technology from Dr. Troy Williams.
            </p>
          </div>
        </div>
        
        <PageBreadcrumb pageName="Blog" />
        
        {/* Blog content */}
        <section className="container mx-auto px-4 py-12">
          {/* Category tabs */}
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
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute top-0 right-0 bg-[#B22234] text-white px-3 py-1 m-2 rounded text-sm font-medium">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-4 w-4" />
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
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-[#3C3B6E]" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                      </CardFooter>
                      <div className="px-6 pb-6">
                        <Button asChild className="w-full bg-[#3C3B6E] hover:bg-[#2d2c52]">
                          <Link to={`/blog/${post.id}`}>Read Article</Link>
                        </Button>
                      </div>
                    </Card>
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
        </section>
        
        {/* Newsletter subscription */}
        <section className="bg-slate-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Stay updated on the latest in AI, cybersecurity, and defense technology with insights from Dr. Troy Williams.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C3B6E]"
              />
              <Button className="bg-[#B22234] hover:bg-[#9B0000] whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
        
        {/* Cross-posting information */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Follow on Other Platforms</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Dr. Williams regularly publishes content on these professional platforms.
              Follow to stay connected and join the discussion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 h-8 w-8">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <CardTitle>LinkedIn</CardTitle>
                <CardDescription>
                  Professional insights and industry updates
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <a href="https://www.linkedin.com/in/troywilliams" target="_blank" rel="noopener noreferrer">
                    Connect on LinkedIn
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 h-8 w-8">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <CardTitle>ResearchGate</CardTitle>
                <CardDescription>
                  Academic publications and research findings
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <a href="https://www.researchgate.net" target="_blank" rel="noopener noreferrer">
                    Follow on ResearchGate
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 h-8 w-8">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <CardTitle>Medium</CardTitle>
                <CardDescription>
                  In-depth articles and expert commentary
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-50">
                  <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
                    Read on Medium
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
