
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { 
  BookOpen, FileText, ExternalLink, Award, Globe, 
  Library, GraduationCap, BarChart3, Users, TrendingUp,
  Building, Scroll, BookMarked
} from 'lucide-react';

interface ResearchProfile {
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
  metrics?: string;
}

const researchProfiles: ResearchProfile[] = [
  {
    name: "ResearchGate",
    description: "Full-text book with verified metrics and research contributions",
    url: "https://www.researchgate.net/profile/Troy-Williams-27",
    icon: Globe,
    metrics: "Research Interest Score: 8.0 | Reads: 755"
  },
  {
    name: "SSRN",
    description: "Inspiring Conversations with Dr Troy Williams PhD - Featured publication",
    url: "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6aboratory",
    icon: FileText,
    metrics: "Citations: 2 | Downloads: Active"
  },
  {
    name: "Google Scholar",
    description: "Academic citations and publication indexing",
    url: "https://scholar.google.com/citations?user=placeholder",
    icon: GraduationCap,
    metrics: "Indexing in progress"
  },
  {
    name: "Wilson County Public Library",
    description: "Physical and digital holdings available for public access",
    url: "https://wilsonlibrary.org",
    icon: Library,
    metrics: "Local Tennessee collection"
  }
];

const books = [
  {
    title: "Inspiring Conversations with Dr Troy Williams PhD",
    year: "2024",
    description: "A comprehensive exploration of cybersecurity, artificial intelligence, and the future of digital identity protection.",
    status: "Published",
    platforms: ["ResearchGate", "SSRN", "Amazon"]
  },
  {
    title: "Synthetic Identity Fraud: The Invisible Threat",
    year: "2025",
    description: "Deep dive into synthetic identity engineering, detection methodologies, and national defense strategies.",
    status: "In Progress",
    platforms: ["Forthcoming"]
  }
];

const whitepapers = [
  {
    title: "PatriotProof™ Framework: Fortress-Level Identity Defense",
    year: "2025",
    abstract: "Technical overview of the PatriotProof™ system architecture for national identity protection."
  },
  {
    title: "FraudDNA™: Behavioral Pattern Analysis for Synthetic Identity Detection",
    year: "2025",
    abstract: "Methodology and implementation guide for behavioral analytics in fraud detection."
  },
  {
    title: "AISF™ Implementation Guide: Autonomous Intelligence Security",
    year: "2025",
    abstract: "Deployment strategies for AI-driven security layers in enterprise environments."
  }
];

const technicalPapers = [
  {
    title: "Synthetic Identity Fraud: Detection Methodologies and Prevention Frameworks",
    venue: "SSRN",
    year: "2024",
    doi: "Available on SSRN"
  },
  {
    title: "Autonomous Security Frameworks for Next-Generation Identity Protection",
    venue: "ResearchGate",
    year: "2024",
    doi: "DOI Pending"
  },
  {
    title: "Quantum-Era Threats to Digital Identity Infrastructure",
    venue: "Working Paper",
    year: "2025",
    doi: "Forthcoming"
  }
];

const apaPublications = [
  {
    citation: "Williams, T. (2024). Inspiring Conversations with Dr Troy Williams PhD. Self-published. Available at ResearchGate and SSRN.",
    type: "Book"
  },
  {
    citation: "Williams, T. (2024). Synthetic Identity Fraud: Detection Methodologies and Prevention Frameworks. Social Science Research Network (SSRN).",
    type: "Journal Article"
  },
  {
    citation: "Williams, T. (2024). Autonomous Security Frameworks for Next-Generation Identity Protection. ResearchGate.",
    type: "Research Paper"
  },
  {
    citation: "Williams, T. (2025, forthcoming). Quantum-Era Threats to Digital Identity Infrastructure: Preparing National Defense Systems for Post-Quantum Cryptographic Vulnerabilities.",
    type: "Working Paper"
  }
];

const ResearchFootprint = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Research Footprint | Dr. Troy Williams - Academic Publications & Profiles</title>
        <meta 
          name="description" 
          content="Explore Dr. Troy Williams' research footprint including publications on ResearchGate, SSRN, Google Scholar, books, whitepapers, and technical papers on cybersecurity and AI." 
        />
        <link rel="canonical" href="https://www.DrTroyWilliams.net/research-footprint" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Research Footprint" />
        
        {/* Hero Section */}
        <section className="bg-[#0A1628] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B22234] rounded-full mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Academic & Research Portfolio</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Research Footprint
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                A comprehensive archive of academic publications, research contributions, 
                and scholarly impact in cybersecurity and artificial intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Research Impact Metrics */}
        <section className="py-12 bg-[#B22234] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-center mb-6">Research Impact Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center max-w-5xl mx-auto">
              <div>
                <p className="text-3xl font-bold">8.0</p>
                <p className="text-xs text-white/80">Research Interest</p>
              </div>
              <div>
                <p className="text-3xl font-bold">755</p>
                <p className="text-xs text-white/80">Total Reads</p>
              </div>
              <div>
                <p className="text-3xl font-bold">2</p>
                <p className="text-xs text-white/80">Citations</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1</p>
                <p className="text-xs text-white/80">Recommendations</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4+</p>
                <p className="text-xs text-white/80">Publications</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1</p>
                <p className="text-xs text-white/80">Patent Filed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Public Research Profiles */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Public Research Profiles
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Verified academic profiles and institutional holdings across major research platforms.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {researchProfiles.map((profile, idx) => {
                  const Icon = profile.icon;
                  return (
                    <a
                      key={idx}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-card border border-border rounded-lg p-6 hover:border-[#B22234]/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-[#0A1628] text-white group-hover:bg-[#B22234] transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-foreground group-hover:text-[#B22234] transition-colors">
                              {profile.name}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{profile.description}</p>
                          {profile.metrics && (
                            <p className="text-xs text-[#B22234] font-medium">{profile.metrics}</p>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Books */}
        <section className="py-16 bg-[#3C3B6E]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center flex items-center justify-center gap-3">
                <BookMarked className="w-8 h-8 text-[#B22234]" />
                Books
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Published and forthcoming book-length works.
              </p>
              
              <div className="space-y-6">
                {books.map((book, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[#0A1628] text-white flex-shrink-0">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-bold text-foreground text-lg">{book.title}</h3>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            book.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {book.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{book.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Year: {book.year}</span>
                          <span className="text-muted-foreground">|</span>
                          <span className="text-muted-foreground">Available: {book.platforms.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Whitepapers */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center flex items-center justify-center gap-3">
                <Scroll className="w-8 h-8 text-[#B22234]" />
                Whitepapers
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Technical documentation and framework overviews.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {whitepapers.map((paper, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-5 hover:border-[#B22234]/50 transition-colors">
                    <div className="p-2 rounded-lg bg-[#3C3B6E] text-white inline-block mb-4">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{paper.abstract}</p>
                    <p className="text-xs text-[#B22234] font-medium">{paper.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Papers */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
                <GraduationCap className="w-8 h-8 text-[#B22234]" />
                Technical Papers
              </h2>
              <p className="text-center text-gray-300 mb-10">
                Peer-reviewed and working papers in academic venues.
              </p>
              
              <div className="space-y-4">
                {technicalPapers.map((paper, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-white mb-1">{paper.title}</h3>
                        <p className="text-sm text-gray-400">
                          <span className="text-[#B22234]">{paper.venue}</span> | {paper.year}
                        </p>
                      </div>
                      <div className="text-sm text-gray-400">
                        {paper.doi}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APA Publications */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-[#B22234]" />
                APA Format Citations
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Ready-to-use citations in APA 7th Edition format.
              </p>
              
              <div className="space-y-4">
                {apaPublications.map((pub, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-5">
                    <div className="flex items-start gap-4">
                      <span className="px-2 py-1 text-xs font-semibold bg-[#3C3B6E] text-white rounded flex-shrink-0">
                        {pub.type}
                      </span>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        {pub.citation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* External Profile Links */}
        <section className="py-16 bg-[#3C3B6E]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Connect on Research Platforms
              </h2>
              <p className="text-muted-foreground mb-10">
                Follow research updates and access full-text publications.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://www.researchgate.net/profile/Troy-Williams-27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D0AF] text-white font-semibold rounded-lg hover:bg-[#00B89C] transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  ResearchGate
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6aboratory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-[#333333] transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  SSRN
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href="https://scholar.google.com/citations?user=placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#4285F4] text-white font-semibold rounded-lg hover:bg-[#3367D6] transition-colors"
                >
                  <GraduationCap className="w-5 h-5" />
                  Google Scholar
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href="https://wilsonlibrary.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B4513] text-white font-semibold rounded-lg hover:bg-[#723A0F] transition-colors"
                >
                  <Library className="w-5 h-5" />
                  Wilson County Library
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Research Collaboration</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Interested in collaborating on research or citing this work? 
              Contact for academic inquiries, data requests, or collaboration opportunities.
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#B22234] text-white font-semibold rounded-lg hover:bg-[#8B1A28] transition-colors"
            >
              Contact for Research Inquiries
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResearchFootprint;
