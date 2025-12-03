
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { 
  GraduationCap, Award, Shield, BookOpen, Scale, 
  Search, Globe, FileText, ExternalLink, CheckCircle,
  Briefcase, Clock, Flag, Library, BadgeCheck
} from 'lucide-react';

interface Credential {
  title: string;
  institution?: string;
  year?: string;
  status?: string;
  description: string;
  icon: React.ElementType;
  category: 'doctoral' | 'graduate' | 'training' | 'professional';
}

const credentials: Credential[] = [
  {
    title: "PhD in Artificial Intelligence",
    institution: "Capitol Technology University",
    status: "In Progress",
    description: "Doctoral research focused on autonomous security systems, AI-driven fraud detection algorithms, and machine learning applications in identity protection.",
    icon: GraduationCap,
    category: 'doctoral'
  },
  {
    title: "PhD in Information Technology",
    institution: "University of the Cumberlands",
    status: "In Progress",
    description: "Doctoral studies in emerging technology frameworks, digital transformation, and enterprise security architecture.",
    icon: GraduationCap,
    category: 'doctoral'
  },
  {
    title: "Master of Science in IT Management",
    institution: "Western Governors University",
    year: "2020",
    description: "Graduate degree specializing in IT governance, strategic technology leadership, and enterprise systems management.",
    icon: GraduationCap,
    category: 'graduate'
  },
  {
    title: "Bachelor of Science in Cybersecurity & Information Assurance",
    institution: "Western Governors University",
    year: "2019",
    description: "Undergraduate degree with focus on cybersecurity fundamentals, network security, threat analysis, and information assurance principles.",
    icon: GraduationCap,
    category: 'graduate'
  },
  {
    title: "Prompt Engineering Training",
    institution: "Vanderbilt University",
    description: "Advanced AI training under Dr. Jules White, mastering prompt engineering techniques for large language models and AI system optimization.",
    icon: BookOpen,
    category: 'training'
  },
  {
    title: "Financial Fraud & Courtroom Ethics",
    institution: "SBI Seminars",
    description: "Continuing legal education in financial fraud investigation, courtroom testimony ethics, and legal procedures for expert witnesses.",
    icon: Scale,
    category: 'training'
  }
];

const professionalCredentials = [
  {
    title: "Tennessee Licensed Private Investigator",
    description: "State-licensed investigator authorized to conduct investigations, surveillance, and fraud detection operations in the State of Tennessee.",
    icon: Shield,
    highlight: true
  },
  {
    title: "32+ Years Investigative Experience",
    description: "Three decades of experience in fraud investigation, identity protection, and security analysis across private and institutional sectors.",
    icon: Clock,
    highlight: false
  },
  {
    title: "National Fraud Prevention Architect",
    description: "Creator of four trademarked national defense systems: PatriotProof™, FraudDNA™, AISF™, and PPP™ for synthetic identity fraud prevention.",
    icon: Award,
    highlight: true
  },
  {
    title: "U.S. Sovereign Technology Developer",
    description: "Developer of American-owned, American-built security technology designed to protect national identity infrastructure from foreign and domestic threats.",
    icon: Flag,
    highlight: true
  }
];

const verificationLinks = [
  {
    name: "Wilson County Public Library",
    description: "Library catalog holdings verification",
    url: "https://wilsonlibrary.org",
    icon: Library,
    color: "bg-[#8B4513]"
  },
  {
    name: "ResearchGate Profile",
    description: "Verified research metrics and publications",
    url: "https://www.researchgate.net/profile/Troy-Williams-27",
    icon: Globe,
    color: "bg-[#00D0AF]"
  },
  {
    name: "SSRN Author Page",
    description: "Social Science Research Network publications",
    url: "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6aboratory",
    icon: FileText,
    color: "bg-[#1A1A1A]"
  }
];

const Credentials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doctoralCreds = credentials.filter(c => c.category === 'doctoral');
  const graduateCreds = credentials.filter(c => c.category === 'graduate');
  const trainingCreds = credentials.filter(c => c.category === 'training');

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Credentials & Education | Dr. Troy Williams - Academic & Professional Qualifications</title>
        <meta 
          name="description" 
          content="Verified credentials and education of Dr. Troy Williams including PhD studies, degrees from Western Governors University, Vanderbilt training, and 32+ years investigative experience." 
        />
        <link rel="canonical" href="https://www.DrTroyWilliams.net/credentials" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Credentials & Education" />
        
        {/* Hero Section */}
        <section className="bg-[#0A1628] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B22234] rounded-full mb-6">
                <BadgeCheck className="w-5 h-5" />
                <span className="font-semibold">Verified Qualifications</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Credentials & Education
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Academic qualifications, professional licenses, and verified expertise 
                in cybersecurity, artificial intelligence, and fraud investigation.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-[#B22234] text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold">2</p>
                <p className="text-sm text-white/80">PhD Programs</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">2</p>
                <p className="text-sm text-white/80">Degrees Earned</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">32+</p>
                <p className="text-sm text-white/80">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">4</p>
                <p className="text-sm text-white/80">Trademarked Systems</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">1</p>
                <p className="text-sm text-white/80">Patent Filed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctoral Studies */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center flex items-center justify-center gap-3">
                <GraduationCap className="w-8 h-8 text-[#B22234]" />
                Doctoral Studies
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Currently pursuing dual doctoral programs in Artificial Intelligence and Information Technology.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {doctoralCreds.map((cred, idx) => (
                  <div key={idx} className="bg-card border-2 border-[#B22234]/30 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-[#B22234] text-white text-xs font-semibold rounded-bl-lg">
                      {cred.status}
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[#0A1628] text-white flex-shrink-0">
                        <cred.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-1">{cred.title}</h3>
                        <p className="text-[#B22234] font-medium text-sm mb-3">{cred.institution}</p>
                        <p className="text-sm text-muted-foreground">{cred.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Graduate Degrees */}
        <section className="py-16 bg-[#3C3B6E]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-[#3C3B6E]" />
                Graduate Degrees
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Completed degrees from Western Governors University.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {graduateCreds.map((cred, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[#3C3B6E] text-white flex-shrink-0">
                        <cred.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground">{cred.title}</h3>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-[#3C3B6E] font-medium text-sm mb-1">{cred.institution}</p>
                        <p className="text-xs text-muted-foreground mb-3">Graduated {cred.year}</p>
                        <p className="text-sm text-muted-foreground">{cred.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Training */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8 text-[#B22234]" />
                Specialized Training
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Advanced certifications and continuing education.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {trainingCreds.map((cred, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[#0A1628] text-white flex-shrink-0">
                        <cred.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{cred.title}</h3>
                        <p className="text-[#B22234] font-medium text-sm mb-3">{cred.institution}</p>
                        <p className="text-sm text-muted-foreground">{cred.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Credentials */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
                <Briefcase className="w-8 h-8 text-[#B22234]" />
                Professional Credentials
              </h2>
              <p className="text-center text-gray-300 mb-10">
                Licensed investigator with over three decades of experience in fraud prevention and national security.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {professionalCredentials.map((cred, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-lg p-6 border ${
                      cred.highlight 
                        ? 'bg-[#B22234]/20 border-[#B22234]/50' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg flex-shrink-0 ${
                        cred.highlight ? 'bg-[#B22234] text-white' : 'bg-white/10 text-white'
                      }`}>
                        <cred.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-2">{cred.title}</h3>
                        <p className="text-sm text-gray-300">{cred.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Verification Block */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border-2 border-[#B22234] rounded-lg p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B22234]/10 rounded-full mb-4">
                    <Search className="w-5 h-5 text-[#B22234]" />
                    <span className="font-semibold text-[#B22234]">Independent Verification</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Verify Credentials
                  </h2>
                  <p className="text-muted-foreground">
                    Independently verify qualifications and research through these trusted sources.
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  {verificationLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center p-5 rounded-lg border border-border hover:border-[#B22234]/50 hover:bg-[#B22234]/5 transition-all text-center"
                    >
                      <div className={`p-3 rounded-full ${link.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                        <link.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-1">
                        {link.name}
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </h3>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Statement */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl md:text-3xl italic mb-6 max-w-3xl mx-auto">
              "I am not ahead of the curve. I am building the curve."
            </p>
            <p className="text-[#B22234] font-semibold text-lg mb-8">- Troy Williams, PhD</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/master-bio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B22234] text-white font-semibold rounded-lg hover:bg-[#8B1A28] transition-colors"
              >
                View Full Biography
              </a>
              <a 
                href="/research-footprint"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Research Footprint
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Credentials;
