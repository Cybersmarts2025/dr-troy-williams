
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Button } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, ThumbsUp, Share2, ArrowLeft } from "lucide-react";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";
import NotFound from "@/pages/NotFound";

// Sample blog post data - in a real app, this would come from an API
const blogPosts = [
  {
    id: "ai-policy-2025",
    title: "The Future of AI Policy and Regulation in America",
    excerpt: "Analysis of emerging legislative frameworks for artificial intelligence in the United States and implications for national security.",
    content: `
      <p>The rapid advancement of artificial intelligence technologies has created an urgent need for comprehensive policy frameworks that can balance innovation with security and ethical considerations. This article examines the current state of AI regulation in the United States and explores potential future directions for policy development.</p>
      
      <h2>Current Regulatory Landscape</h2>
      
      <p>As of 2025, the United States has adopted a sector-specific approach to AI regulation, with different agencies overseeing AI applications within their domains. The National AI Initiative Act of 2020 established some coordination mechanisms, but a comprehensive national strategy remains under development.</p>
      
      <p>Key regulatory bodies involved include:</p>
      
      <ul>
        <li>Federal Trade Commission (FTC) - consumer protection and unfair competition</li>
        <li>Food and Drug Administration (FDA) - medical AI applications</li>
        <li>National Highway Traffic Safety Administration (NHTSA) - autonomous vehicles</li>
        <li>Department of Defense (DoD) - military applications</li>
      </ul>
      
      <h2>Emerging Policy Directions</h2>
      
      <p>Several important policy trends are emerging in the American regulatory landscape:</p>
      
      <ol>
        <li><strong>Risk-based Regulation</strong>: Moving toward frameworks that impose stricter requirements on higher-risk AI systems while allowing lower-risk applications to face fewer regulatory barriers.</li>
        <li><strong>Algorithmic Impact Assessments</strong>: Requiring developers to assess potential societal impacts before deploying high-risk AI systems.</li>
        <li><strong>Transparency Requirements</strong>: Mandating explanations of how AI systems make decisions, particularly when they affect individual rights or access to opportunities.</li>
        <li><strong>National Security Considerations</strong>: Restricting technology transfers and implementing export controls on advanced AI capabilities with potential military applications.</li>
      </ol>
      
      <h2>Challenges and Tensions</h2>
      
      <p>Significant tensions exist between competing priorities:</p>
      
      <p>The innovation imperative drives a desire to minimize regulatory barriers that could hamper American competitiveness in AI development. Yet national security concerns are pushing toward greater oversight of AI research and deployment, particularly regarding technologies with dual-use potential.</p>
      
      <p>Additionally, federalism creates jurisdictional complexity, with states like California and Massachusetts implementing their own AI regulations, potentially creating a patchwork of requirements across the country.</p>
      
      <h2>Implications for National Security</h2>
      
      <p>The intersection of AI policy and national security has become increasingly significant as advanced AI systems gain strategic importance. Key considerations include:</p>
      
      <ul>
        <li>Managing the diffusion of AI capabilities that could threaten critical infrastructure</li>
        <li>Addressing vulnerabilities in AI systems that could be exploited by adversaries</li>
        <li>Ensuring defense agencies have access to leading-edge AI technologies</li>
        <li>Cooperating with allies on shared standards while restricting technology transfer to strategic competitors</li>
      </ul>
      
      <h2>Future Outlook</h2>
      
      <p>As we look toward the latter half of the decade, several policy developments appear likely:</p>
      
      <ol>
        <li>A federal AI safety agency may be established to coordinate regulation across sectors</li>
        <li>International cooperation on AI governance will intensify, particularly among democratic nations</li>
        <li>Technical standards bodies will play an increasingly important role in operationalizing regulatory requirements</li>
        <li>Legal frameworks for AI liability and responsibility will continue to evolve through both legislation and case law</li>
      </ol>
      
      <p>The challenge for policymakers will be developing frameworks that effectively mitigate risks while preserving the benefits AI can deliver across the economy and society. Striking this balance will require ongoing collaboration between government, industry, academia, and civil society.</p>
    `,
    date: "May 4, 2025",
    readTime: "8 min read",
    author: "Dr. Troy Williams",
    authorTitle: "AI Scientist and Cybersecurity Expert",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    category: "ai",
    tags: ["AI Policy", "Regulation", "National Security"],
    likes: 124,
    image: "https://images.unsplash.com/photo-1677442135185-8034cb13c4b4?auto=format&fit=crop&w=1200&h=600&q=80"
  },
  {
    id: "zero-day-threats",
    title: "Understanding Zero-Day Threats: Early Detection Systems",
    excerpt: "A comprehensive overview of zero-day vulnerability detection methods and their implementation in critical infrastructure systems.",
    content: `
      <p>Zero-day vulnerabilities represent some of the most dangerous cybersecurity threats facing organizations today. This article examines modern approaches to detecting these vulnerabilities before they can be exploited.</p>
      
      <h2>The Zero-Day Challenge</h2>
      
      <p>Zero-day vulnerabilities are previously unknown software flaws that attackers can exploit before developers have an opportunity to create and deploy patches. These vulnerabilities are particularly valuable and dangerous because there are no existing defenses against them when they're first discovered.</p>
      
      <h2>Detection Methodologies</h2>
      
      <p>Several approaches have emerged as effective for identifying potential zero-day vulnerabilities:</p>
      
      <ul>
        <li><strong>Automated Fuzzing</strong>: Bombarding applications with unexpected inputs to trigger crashes or unhandled exceptions</li>
        <li><strong>Static Analysis</strong>: Examining source code or binaries for potential security flaws without executing the program</li>
        <li><strong>Dynamic Analysis</strong>: Monitoring program execution to identify memory corruption, race conditions, and other runtime issues</li>
        <li><strong>Machine Learning Models</strong>: Training systems to recognize patterns associated with vulnerable code</li>
      </ul>
      
      <h2>Implementation in Critical Infrastructure</h2>
      
      <p>Critical infrastructure sectors face unique challenges when implementing zero-day detection systems...</p>
    `,
    date: "April 28, 2025",
    readTime: "11 min read",
    author: "Dr. Troy Williams",
    authorTitle: "AI Scientist and Cybersecurity Expert",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    category: "cybersecurity",
    tags: ["Zero-Day Threats", "Critical Infrastructure", "Threat Detection"],
    likes: 98,
    image: "https://images.unsplash.com/photo-1614064548237-096d9c1a471d?auto=format&fit=crop&w=1200&h=600&q=80"
  }
];

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // In a real app, this would fetch from an API
    const foundPost = blogPosts.find(p => p.id === postId);
    setPost(foundPost || null);
  }, [postId]);
  
  if (!post) {
    return <NotFound />;
  }

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
              "jobTitle": post.authorTitle
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
        title={`${post.title} | Dr. Troy Williams Blog`}
        description={post.excerpt}
      />
      
      {/* Schema.org markup for BreadcrumbList */}
      <BreadcrumbListSchema
        itemListElement={[
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://legalsmarts.net"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://legalsmarts.net/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://legalsmarts.net/blog/${post.id}`
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
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.authorTitle}</p>
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
