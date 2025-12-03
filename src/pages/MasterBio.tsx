
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { 
  GraduationCap, Award, FileText, Shield, Globe, 
  BookOpen, Scale, Newspaper, Lightbulb, Target, Calendar
} from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'education' | 'achievement' | 'publication' | 'trademark' | 'milestone';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2019",
    title: "Bachelor of Science in Cybersecurity & Information Assurance",
    description: "Graduated from Western Governors University with a focus on cybersecurity fundamentals, network security, and information assurance principles.",
    icon: GraduationCap,
    category: 'education'
  },
  {
    year: "2020",
    title: "Master of Science in IT Management",
    description: "Completed graduate studies at Western Governors University, specializing in IT governance, strategic technology leadership, and enterprise systems management.",
    icon: GraduationCap,
    category: 'education'
  },
  {
    year: "2021",
    title: "Early Tennessee Media Coverage",
    description: "Featured in Tennessee newspapers for pioneering work in fraud detection and cybersecurity awareness, establishing early public recognition as a thought leader.",
    icon: Newspaper,
    category: 'milestone'
  },
  {
    year: "2022",
    title: "SBI Seminars Legal Training",
    description: "Completed specialized training through SBI Seminars in financial fraud investigation, courtroom testimony ethics, and legal procedures for expert witnesses.",
    icon: Scale,
    category: 'education'
  },
  {
    year: "2023",
    title: "Vanderbilt University Prompt Engineering Training",
    description: "Advanced AI training under Dr. Jules White at Vanderbilt University, mastering prompt engineering techniques for large language models and AI system optimization.",
    icon: Lightbulb,
    category: 'education'
  },
  {
    year: "2023",
    title: "PhD Studies: Information Technology",
    description: "Enrolled at University of the Cumberlands for doctoral studies in Information Technology, focusing on emerging technology frameworks and digital transformation.",
    icon: GraduationCap,
    category: 'education'
  },
  {
    year: "2024",
    title: "PhD Studies: Artificial Intelligence",
    description: "Commenced doctoral program at Capitol Technology University specializing in Artificial Intelligence, with research emphasis on autonomous security systems and fraud detection algorithms.",
    icon: GraduationCap,
    category: 'education'
  },
  {
    year: "2024",
    title: "ResearchGate Academic Recognition",
    description: "Achieved Research Interest Score of 8.0 on ResearchGate with 2 citations, 1 recommendation, and 755 reads, demonstrating growing academic influence in cybersecurity research.",
    icon: BookOpen,
    category: 'publication'
  },
  {
    year: "2024",
    title: "SSRN Featured Article",
    description: "Research paper featured on Social Science Research Network (SSRN), contributing to academic discourse on synthetic identity fraud and AI-driven security solutions.",
    icon: FileText,
    category: 'publication'
  },
  {
    year: "2025",
    title: "Patent PCT/US25/43982 Filed",
    description: "International patent application filed for innovative synthetic identity detection methodology, representing proprietary advancement in fraud prevention technology.",
    icon: Award,
    category: 'achievement'
  },
  {
    year: "2025",
    title: "PatriotProof™ Trademark",
    description: "Registered trademark for fortress-level national identity and fraud defense core system, establishing intellectual property protection for proprietary security framework.",
    icon: Shield,
    category: 'trademark'
  },
  {
    year: "2025",
    title: "FraudDNA™ Trademark",
    description: "Registered trademark for pattern analysis engine that identifies synthetic identity behaviors through advanced behavioral analytics and anomaly detection.",
    icon: Target,
    category: 'trademark'
  },
  {
    year: "2025",
    title: "AISF™ (Autonomous Intelligence Security Framework) Trademark",
    description: "Registered trademark for AI-driven real-time security layer designed to protect identity ecosystems from synthetic identity engineering attacks.",
    icon: Shield,
    category: 'trademark'
  },
  {
    year: "2025",
    title: "PPP™ (Proactive Prevention Platform) Trademark",
    description: "Registered trademark for proactive prevention system that stops synthetic identities before they enter financial and governmental systems.",
    icon: Shield,
    category: 'trademark'
  },
  {
    year: "2025",
    title: "ScamAtlas™ Trademark",
    description: "Registered trademark for interactive threat intelligence mapping system that visualizes fraud schemes and synthetic identity networks across geographic regions.",
    icon: Globe,
    category: 'trademark'
  },
  {
    year: "02/2027",
    title: "PhD Completion Target",
    description: "Projected completion of doctoral studies, culminating years of advanced research in artificial intelligence and cybersecurity with focus on national synthetic identity defense.",
    icon: GraduationCap,
    category: 'milestone'
  }
];

const categoryColors = {
  education: 'bg-[#3C3B6E]',
  achievement: 'bg-[#B22234]',
  publication: 'bg-[#0A1628]',
  trademark: 'bg-[#B22234]',
  milestone: 'bg-[#3C3B6E]'
};

const MasterBio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Troy Williams",
    "alternateName": "Dr. Troy Williams",
    "honorificPrefix": "Dr.",
    "honorificSuffix": "PhD",
    "jobTitle": ["Cybersecurity Engineer", "Artificial Intelligence Scientist", "Licensed Private Investigator"],
    "description": "The Proactive AI PI - Cybersecurity engineer, artificial intelligence scientist, and licensed private investigator specializing in synthetic identity fraud defense and national security technology.",
    "url": "https://www.DrTroyWilliams.net",
    "image": {
      "@type": "ImageObject",
      "url": "https://www.DrTroyWilliams.net/lovable-uploads/a91273f7-9ba8-4623-a41e-b2cf0b45ecd7.png",
      "width": 400,
      "height": 400,
      "caption": "Dr. Troy Williams - The Proactive AI PI, Cybersecurity Engineer and AI Scientist"
    },
    "sameAs": [
      "https://www.researchgate.net/profile/Troy-Williams",
      "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=Troy-Williams"
    ],
    "knowsAbout": [
      "Cybersecurity",
      "Artificial Intelligence",
      "Synthetic Identity Fraud",
      "Fraud Detection",
      "Machine Learning",
      "Information Security",
      "Private Investigation"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "PhD in Artificial Intelligence (In Progress)",
        "credentialCategory": "Doctoral Degree",
        "educationalLevel": "Doctoral",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Capitol Technology University"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "PhD in Information Technology (In Progress)",
        "credentialCategory": "Doctoral Degree",
        "educationalLevel": "Doctoral",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "University of the Cumberlands"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Master of Science in IT Management",
        "credentialCategory": "Master's Degree",
        "educationalLevel": "Graduate",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Western Governors University"
        },
        "dateCreated": "2020"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Bachelor of Science in Cybersecurity & Information Assurance",
        "credentialCategory": "Bachelor's Degree",
        "educationalLevel": "Undergraduate",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Western Governors University"
        },
        "dateCreated": "2019"
      }
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Capitol Technology University"
      },
      {
        "@type": "EducationalOrganization",
        "name": "University of the Cumberlands"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Western Governors University"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Vanderbilt University"
      }
    ],
    "award": [
      "Patent PCT/US25/43982 - Synthetic Identity Detection Methodology"
    ],
    "affiliation": {
      "@type": "Organization",
      "name": "Cybersmarts.ai LLC",
      "url": "https://www.DrTroyWilliams.net"
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Tennessee",
      "addressCountry": "US"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.DrTroyWilliams.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Master Biography",
        "item": "https://www.DrTroyWilliams.net/master-bio"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Master Biography | Dr. Troy Williams - The Proactive AI PI</title>
        <meta 
          name="description" 
          content="Complete professional biography and timeline of Dr. Troy Williams, PhD candidate in AI and IT, cybersecurity engineer, and creator of PatriotProof, FraudDNA, AISF, and PPP systems." 
        />
        <link rel="canonical" href="https://www.DrTroyWilliams.net/master-bio" />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Master Biography" />
        
        {/* Hero Section */}
        <section className="bg-[#0A1628] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Headshot */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#B22234] shadow-2xl">
                      <img 
                        src="/lovable-uploads/a91273f7-9ba8-4623-a41e-b2cf0b45ecd7.png" 
                        alt="Dr. Troy Williams - The Proactive AI PI, Cybersecurity Engineer and AI Scientist"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[#B22234] rounded-full flex items-center justify-center border-4 border-[#0A1628]">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Bio Text */}
                <div className="text-center lg:text-left flex-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Master Biography
                  </h1>
                  <p className="text-xl md:text-2xl text-[#B22234] font-semibold mb-4">
                    Troy Williams, PhD Candidate
                  </p>
                  <p className="text-lg text-gray-300 mb-6">
                    The Proactive AI PI
                  </p>
                  <div className="w-24 h-1 bg-[#B22234] mx-auto lg:mx-0 mb-8"></div>
                  <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                    Cybersecurity Engineer. Artificial Intelligence Scientist. Licensed Private Investigator.
                    Three disciplines converging on a single mission: defending American identity infrastructure
                    against synthetic identity engineering and emerging quantum-era threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-12 bg-[#B22234]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">
              Mission: Protecting America Through Technology
            </p>
          </div>
        </section>

        {/* Credentials Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Academic Credentials
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <GraduationCap className="w-10 h-10 text-[#B22234] mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Doctoral Studies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>PhD in Artificial Intelligence - Capitol Technology University</li>
                    <li>PhD in Information Technology - University of the Cumberlands</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <Award className="w-10 h-10 text-[#3C3B6E] mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Graduate Degrees</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>MS in IT Management - Western Governors University</li>
                    <li>BS in Cybersecurity & Information Assurance - Western Governors University</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <Lightbulb className="w-10 h-10 text-[#B22234] mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Specialized Training</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Prompt Engineering - Vanderbilt University (Dr. Jules White)</li>
                    <li>Financial Fraud & Courtroom Ethics - SBI Seminars</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <BookOpen className="w-10 h-10 text-[#3C3B6E] mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Research Metrics</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>ResearchGate Interest Score: 8.0</li>
                    <li>Citations: 2 | Recommendations: 1 | Reads: 755</li>
                    <li>Featured on SSRN</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications & Research */}
        <section className="py-16 bg-[#3C3B6E]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Publications & Research
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Peer-reviewed research and academic contributions advancing the fields of cybersecurity, 
                artificial intelligence, and synthetic identity fraud prevention.
              </p>
              
              <div className="space-y-6">
                {/* SSRN Featured Paper */}
                <div className="bg-card border border-border rounded-lg p-6 hover:border-[#B22234]/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#0A1628] text-white flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#B22234] text-white rounded mb-3">
                        SSRN Featured
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Synthetic Identity Fraud: Detection Methodologies and Prevention Frameworks
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Williams, T. (2024). Synthetic Identity Fraud: Detection Methodologies and Prevention Frameworks. 
                        <em> Social Science Research Network (SSRN)</em>. 
                        Available at SSRN.
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        This paper examines the emergence of synthetic identity fraud as a critical threat to financial 
                        institutions and proposes a multi-layered detection framework integrating machine learning 
                        algorithms with behavioral analytics.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs bg-muted rounded">Synthetic Identity</span>
                        <span className="px-2 py-1 text-xs bg-muted rounded">Fraud Detection</span>
                        <span className="px-2 py-1 text-xs bg-muted rounded">Machine Learning</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ResearchGate Paper */}
                <div className="bg-card border border-border rounded-lg p-6 hover:border-[#B22234]/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#0A1628] text-white flex-shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-[#3C3B6E] text-white rounded mb-3">
                        ResearchGate
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Autonomous Security Frameworks for Next-Generation Identity Protection
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Williams, T. (2024). Autonomous Security Frameworks for Next-Generation Identity Protection. 
                        <em> ResearchGate</em>. DOI: Pending.
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        An exploration of autonomous intelligence systems designed to proactively identify and 
                        neutralize identity-based threats before they manifest in operational environments.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs bg-muted rounded">Autonomous Systems</span>
                        <span className="px-2 py-1 text-xs bg-muted rounded">AI Security</span>
                        <span className="px-2 py-1 text-xs bg-muted rounded">Identity Protection</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working Paper */}
                <div className="bg-card border border-border rounded-lg p-6 hover:border-[#B22234]/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#0A1628] text-white flex-shrink-0">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded mb-3">
                        Working Paper
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Quantum-Era Threats to Digital Identity Infrastructure
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Williams, T. (2025, forthcoming). Quantum-Era Threats to Digital Identity Infrastructure: 
                        Preparing National Defense Systems for Post-Quantum Cryptographic Vulnerabilities.
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        A forward-looking analysis of how quantum computing capabilities will fundamentally 
                        alter the landscape of identity security, with recommendations for proactive defense measures.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs bg-muted rounded">Quantum Computing</span>
                        <span className="px-2 py-1 text-xs bg-muted rounded">Cryptography</span>
                        <span className="px-2 py-1 text-xs bg-muted rounded">National Security</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Metrics Summary */}
              <div className="mt-10 p-6 bg-[#0A1628] rounded-lg text-white">
                <h3 className="text-xl font-bold mb-4 text-center">Research Impact Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-[#B22234]">8.0</p>
                    <p className="text-sm text-gray-400">Research Interest Score</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#B22234]">755</p>
                    <p className="text-sm text-gray-400">Total Reads</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#B22234]">2</p>
                    <p className="text-sm text-gray-400">Citations</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#B22234]">1</p>
                    <p className="text-sm text-gray-400">Recommendations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Intellectual Property Portfolio
              </h2>
              <div className="mb-8 p-6 bg-white/5 rounded-lg border border-white/10 text-center">
                <FileText className="w-12 h-12 text-[#B22234] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Patent PCT/US25/43982</h3>
                <p className="text-gray-300">International Patent Application for Synthetic Identity Detection Methodology</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "PatriotProof™", desc: "Fortress-level national identity and fraud defense core" },
                  { name: "FraudDNA™", desc: "Pattern analysis engine for synthetic identity behaviors" },
                  { name: "AISF™", desc: "Autonomous Intelligence Security Framework" },
                  { name: "PPP™", desc: "Proactive Prevention Platform" },
                  { name: "ScamAtlas™", desc: "Interactive fraud threat intelligence mapping" },
                ].map((tm, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <Shield className="w-8 h-8 text-[#B22234] mb-2" />
                    <h4 className="font-bold text-lg">{tm.name}</h4>
                    <p className="text-sm text-gray-400">{tm.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Professional Timeline
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                2019 - February 2027
              </p>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5"></div>
                
                {timelineEvents.map((event, index) => {
                  const IconComponent = event.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={index}
                      className={`relative flex items-start gap-4 mb-8 ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Content */}
                      <div className={`flex-1 ml-12 md:ml-0 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                        <div className="bg-card border border-border rounded-lg p-5 hover:border-[#B22234]/50 transition-colors">
                          <span className="inline-block px-3 py-1 text-sm font-bold text-white rounded mb-3" style={{ backgroundColor: event.category === 'education' ? '#3C3B6E' : '#B22234' }}>
                            {event.year}
                          </span>
                          <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-[#0A1628] border-2 border-[#B22234] flex items-center justify-center z-10">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      
                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block flex-1"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Quote */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl md:text-3xl italic mb-6 max-w-3xl mx-auto">
              "I am not ahead of the curve. I am building the curve."
            </p>
            <p className="text-[#B22234] font-semibold text-lg">- Troy Williams, PhD</p>
            <div className="mt-8 pt-8 border-t border-white/10 max-w-xl mx-auto">
              <p className="text-gray-400 text-sm">
                Independent Civilian Intelligence to Protect Americans
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Built in Tennessee. By Americans. For Americans.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MasterBio;
