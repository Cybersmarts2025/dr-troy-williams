
import { BlogPost } from "@/types/blog";

// Sample blog post data - in a real app, this would come from an API
export const blogPosts: BlogPost[] = [
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

// Helper functions for the blog
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === "all") {
    return blogPosts;
  } 
  return blogPosts.filter(post => post.category === category);
};

export const getCategoryCount = (category: string): number => {
  if (category === "all") return blogPosts.length;
  return blogPosts.filter(post => post.category === category).length;
};
