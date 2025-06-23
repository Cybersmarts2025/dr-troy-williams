
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";
import Index from "./pages/Index";
import About from "./pages/About";
import Books from "./pages/Books";
import AISF from "./pages/AISF";
import NotFound from "./pages/NotFound";
import PPP from "./pages/PPP";
import Cybersecurity from "./pages/Cybersecurity";
import Press from "./pages/Press";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlog from "./pages/admin/AdminBlog";
import NewBlogPost from "./pages/admin/NewBlogPost";
import EditBlogPost from "./pages/admin/EditBlogPost";
import ContentManager from "./pages/admin/ContentManager";
import TestimonialSubmission from "./pages/TestimonialSubmission";
import Bookmarks from "./pages/Bookmarks";
import Appointments from "./pages/Appointments";
import Webinars from "./pages/Webinars";
import Consultation from "./pages/Consultation";
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import LiveChatWidget from './components/chat/LiveChatWidget';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/books" element={<Books />} />
                <Route path="/aisf" element={<AISF />} />
                <Route path="/ppp" element={<PPP />} />
                <Route path="/cybersecurity" element={<Cybersecurity />} />
                <Route path="/press" element={<Press />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<UserProfile />} />
                
                {/* Business Feature Routes */}
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/webinars" element={<Webinars />} />
                <Route path="/consultation" element={<Consultation />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/blog/new" element={<NewBlogPost />} />
                <Route path="/admin/blog/edit/:postId" element={<EditBlogPost />} />
                <Route path="/admin/content" element={<ContentManager />} />
                
                <Route path="/testimonial" element={<TestimonialSubmission />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Global Components */}
              <GoogleAnalytics trackingId="G-XXXXXXXXXX" />
              <LiveChatWidget />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
