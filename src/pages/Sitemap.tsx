
import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Input } from "@/components/ui/input";
import { 
  Home, User, BookOpen, Newspaper, PenTool, Cpu, Briefcase, 
  Shield, FileText, Award, Mail, Calendar, Video, BookMarked,
  Settings, Globe, Lock, Zap, Target, Users, Database, Search, X, Flag
} from 'lucide-react';

interface SitemapLink {
  to: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface SitemapSection {
  title: string;
  links: SitemapLink[];
}

const sitemapData: SitemapSection[] = [
  {
    title: "Main Pages",
    links: [
      { to: "/", title: "Home", description: "Welcome to Dr. Troy Williams' official website featuring expertise in AI, cybersecurity, and fraud defense.", icon: Home },
      { to: "/about", title: "About", description: "Learn about Dr. Troy Williams' background, credentials, and mission.", icon: User },
      { to: "/master-bio", title: "Master Biography", description: "Complete professional biography and timeline of Dr. Troy Williams through 2027.", icon: User },
      { to: "/timeline", title: "Lifetime Timeline", description: "34-year journey from investigative foundations to national cybersecurity leadership.", icon: Calendar },
      { to: "/credentials", title: "Credentials & Education", description: "Academic qualifications, degrees, and professional licenses.", icon: Award },
      { to: "/contact", title: "Contact", description: "Get in touch with Dr. Troy Williams for inquiries and collaborations.", icon: Mail },
    ]
  },
  {
    title: "Publications & Media",
    links: [
      { to: "/books", title: "Books", description: "Browse published works on cybersecurity, AI, and fraud prevention.", icon: BookOpen },
      { to: "/blog", title: "Blog", description: "Read the latest insights on technology, security, and emerging threats.", icon: PenTool },
      { to: "/press", title: "Press & Media", description: "Media features, press releases, and public appearances.", icon: Newspaper },
      { to: "/press-kit", title: "Press Kit", description: "Downloadable media assets, bios, and interview request form for journalists.", icon: Newspaper },
      { to: "/research-footprint", title: "Research Footprint", description: "Academic publications, research profiles, and scholarly impact metrics.", icon: BookOpen },
    ]
  },
  {
    title: "Intelligence & Security Services",
    links: [
      { to: "/synthetic-identity-defense", title: "Synthetic Identity Defense", description: "Comprehensive defense against synthetic identity fraud using PatriotProof™, FraudDNA™, AISF™, and PPP™.", icon: Shield },
      { to: "/cybersecurity", title: "Cybersecurity", description: "Enterprise cybersecurity consulting and threat assessment services.", icon: Lock },
      { to: "/aisf", title: "AISF Framework", description: "Autonomous Intelligence Security Framework for AI-driven protection.", icon: Cpu },
      { to: "/ppp", title: "PPP Platform", description: "Proactive Prevention Platform for identity threat mitigation.", icon: Target },
      { to: "/technology-stack", title: "Technology & System Architecture", description: "Complete breakdown of proprietary defense systems and quantum-secure infrastructure.", icon: Cpu },
      { to: "/stolennation", title: "Stolen Nation", description: "Intelligence briefings on national security and fraud threats.", icon: Globe },
    ]
  },
  {
    title: "Programs & Training",
    links: [
      { to: "/job-ready-360", title: "Job Ready 360", description: "Comprehensive career readiness and professional development program.", icon: Briefcase },
      { to: "/mentorship", title: "Mentorship Program", description: "One-on-one mentoring for cybersecurity and AI professionals.", icon: Users },
      { to: "/webinars", title: "Webinars", description: "Live and recorded educational webinars on security topics.", icon: Video },
      { to: "/certifications", title: "Certifications", description: "Professional certifications and credentials overview.", icon: Award },
    ]
  },
  {
    title: "Business Services",
    links: [
      { to: "/consultation", title: "Consultation", description: "Schedule a professional consultation for your organization.", icon: Calendar },
      { to: "/appointments", title: "Appointments", description: "Book appointments for briefings and advisory sessions.", icon: Calendar },
      { to: "/ai-tools", title: "AI Tools", description: "Access AI-powered security and analysis tools.", icon: Zap },
    ]
  },
  {
    title: "Resources",
    links: [
      { to: "/resources", title: "Resource Library", description: "Download research papers, guides, and educational materials.", icon: Database },
      { to: "/portfolio", title: "Portfolio", description: "View projects and case studies.", icon: FileText },
      { to: "/bookmarks", title: "Bookmarks", description: "Access your saved articles and resources.", icon: BookMarked },
      { to: "/legacy", title: "Legacy", description: "The enduring impact and mission continuation.", icon: Award },
      { to: "/pledge", title: "Pledge", description: "Commitment to protecting American digital infrastructure.", icon: Shield },
      { to: "/national-mission", title: "National Mission", description: "34-year mission protecting America through quantum-era fraud prevention and sovereign technology.", icon: Flag },
      { to: "/scamatlas", title: "Scam Atlas", description: "Interactive map of fraud schemes and threat intelligence.", icon: Globe },
      { to: "/ip", title: "Intellectual Property", description: "Trademarks, patents, and proprietary frameworks.", icon: FileText },
    ]
  },
  {
    title: "User Account",
    links: [
      { to: "/auth", title: "Sign In / Register", description: "Access your account or create a new one.", icon: User },
      { to: "/profile", title: "User Profile", description: "Manage your account settings and preferences.", icon: Settings },
      { to: "/testimonial", title: "Submit Testimonial", description: "Share your experience working with Dr. Williams.", icon: PenTool },
    ]
  },
];

const Sitemap = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return sitemapData;
    
    const query = searchQuery.toLowerCase();
    return sitemapData
      .map(section => ({
        ...section,
        links: section.links.filter(
          link =>
            link.title.toLowerCase().includes(query) ||
            link.description.toLowerCase().includes(query) ||
            link.to.toLowerCase().includes(query)
        )
      }))
      .filter(section => section.links.length > 0);
  }, [searchQuery]);

  const totalResults = useMemo(() => 
    filteredData.reduce((acc, section) => acc + section.links.length, 0),
    [filteredData]
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sitemap | Dr. Troy Williams - Complete Website Navigation</title>
        <meta 
          name="description" 
          content="Navigate all pages on Dr. Troy Williams' website. Find information on cybersecurity services, AI tools, publications, and professional programs." 
        />
        <link rel="canonical" href="https://www.DrTroyWilliams.net/sitemap" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Sitemap" />
        
        {/* Hero Section */}
        <section className="bg-[#0A1628] text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Website Sitemap
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8">
              Complete navigation guide to all pages and resources available on DrTroyWilliams.net
            </p>
            
            {/* Search Input */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 py-3 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-[#B22234]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {searchQuery && (
              <p className="text-center text-gray-400 mt-4">
                {totalResults} {totalResults === 1 ? 'result' : 'results'} found
              </p>
            )}
          </div>
        </section>

        {/* Sitemap Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {filteredData.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">No pages found</h2>
                <p className="text-muted-foreground">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid gap-12">
                {filteredData.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="bg-card rounded-lg border border-border p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border flex items-center gap-2">
                      <span className="w-2 h-8 bg-[#B22234] rounded-full"></span>
                      {section.title}
                      {searchQuery && (
                        <span className="text-sm font-normal text-muted-foreground ml-2">
                          ({section.links.length})
                        </span>
                      )}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.links.map((link, linkIndex) => {
                        const IconComponent = link.icon;
                        return (
                          <Link
                            key={linkIndex}
                            to={link.to}
                            className="group p-4 rounded-lg border border-border hover:border-[#B22234]/50 hover:bg-[#B22234]/5 transition-all duration-300"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-md bg-[#0A1628] text-white group-hover:bg-[#B22234] transition-colors">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground group-hover:text-[#B22234] transition-colors">
                                  {link.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {link.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* XML Sitemap Reference */}
            <div className="mt-12 p-6 bg-[#0A1628] rounded-lg text-center">
              <p className="text-gray-300 mb-2">
                For search engines and automated tools:
              </p>
              <a 
                href="/sitemap.xml" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B22234] hover:text-[#8B1A28] font-mono underline"
              >
                /sitemap.xml
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
