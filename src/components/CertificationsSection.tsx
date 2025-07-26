import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, Shield, Computer, Lock, Search, Users, Brain, GraduationCap, Building, Code, Globe,
  MessageSquare, Sparkles, Languages, Bot, FileText, BookOpen, School, Bug, EyeOff,
  Laptop, Network, Eye, Terminal, Radio, Smartphone, AlertTriangle, Cloud, Router,
  Wifi, Calendar, Settings, Monitor, Cog, Server, Lightbulb, Cable, HardDrive, Zap,
  MessageCircle, Briefcase, Scale
} from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  year: string;
  status: "Active" | "Renewed" | "Continuing Education" | "Expired" | "Patent Pending";
  category: "Cybersecurity" | "Investigation" | "Technology" | "Leadership" | "AI/ML" | "Cloud" | "Education" | "Legal" | "Patents" | "Privacy" | "Research" | "Networking" | "Project Management" | "IT Operations" | "Professional Development";
  icon: React.ElementType;
  credentialId?: string;
  description?: string;
}

const certifications: Certification[] = [
  // AI & Machine Learning
  {
    name: "Regulatory Compliance and AI",
    issuer: "Western Governors University",
    year: "2025",
    status: "Active",
    category: "AI/ML",
    icon: Brain,
  },
  {
    name: "Artificial Intelligence in Defending Traffic Cases",
    issuer: "SBI Seminars", 
    year: "2025",
    status: "Expired",
    category: "Legal",
    icon: Scale,
    credentialId: "06122025",
    description: "6-hour CLE-accredited training on AI technologies and traffic law defense strategies"
  },
  {
    name: "Creating a Culture of Privacy",
    issuer: "LinkedIn",
    year: "2024", 
    status: "Active",
    category: "Privacy",
    icon: Shield,
    description: "Privacy issues and compliance"
  },
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "LinkedIn",
    year: "2024",
    status: "Active", 
    category: "AI/ML",
    icon: Brain,
    description: "Artificial Intelligence for Business · Artificial Intelligence (AI)"
  },
  {
    name: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University",
    year: "2023",
    status: "Active",
    category: "AI/ML", 
    icon: MessageSquare,
    credentialId: "XMSC4NW8GCAY"
  },
  {
    name: "Get Ready for Generative AI",
    issuer: "LinkedIn",
    year: "2023",
    status: "Active",
    category: "AI/ML",
    icon: Sparkles,
    description: "Generative AI · Artificial Intelligence for Business · Artificial Intelligence (AI) · Artificial Intelligence for Design"
  },
  {
    name: "Advanced AI: Transformers for NLP Using Large Language Models",
    issuer: "LinkedIn", 
    year: "2023",
    status: "Active",
    category: "AI/ML",
    icon: Languages,
    description: "Natural Language Processing (NLP) · Generative AI · Transformer Models"
  },
  {
    name: "Introducing Semantic Kernel: Building AI-Based Apps",
    issuer: "LinkedIn",
    year: "2023", 
    status: "Active",
    category: "AI/ML",
    icon: Code,
    description: "Artificial Intelligence (AI) · Software Development"
  },
  {
    name: "What Is Generative AI?",
    issuer: "LinkedIn",
    year: "2023",
    status: "Active",
    category: "AI/ML", 
    icon: Bot,
    description: "Generative AI · Artificial Intelligence (AI)"
  },

  // Patents & Intellectual Property
  {
    name: "AI-Driven Cross-Channel Financial Fraud Detection System",
    issuer: "USPTO",
    year: "2024",
    status: "Patent Pending",
    category: "Patents",
    icon: FileText,
    credentialId: "18943073",
    description: "Quantum-resistant encryption and blockchain integration for financial fraud detection"
  },

  // Education & Academic
  {
    name: "Write & Cite: Academic Writing Readiness Course - Doctoral",
    issuer: "Capitol Technology University",
    year: "2024",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    description: "APA 7 academic writing standards"
  },
  {
    name: "IA Doctorates",
    issuer: "CITI Program",
    year: "2024",
    status: "Active",
    category: "Research",
    icon: BookOpen,
    credentialId: "61623143",
    description: "Expires Apr 2029"
  },
  {
    name: "IRB Members", 
    issuer: "CITI Program",
    year: "2024",
    status: "Active",
    category: "Research",
    icon: Users,
    credentialId: "61623147",
    description: "Expires Apr 2029"
  },
  {
    name: "Social and Behavioral Research",
    issuer: "CITI Program",
    year: "2023",
    status: "Active",
    category: "Research", 
    icon: Users,
    credentialId: "55488516",
    description: "Expires Apr 2026"
  },
  {
    name: "Masters of Science - Information Technology Management",
    issuer: "Western Governors University",
    year: "2022",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    credentialId: "CeD.24RM-DU8B-TNSA",
    description: "Information Technology · Project Management"
  },
  {
    name: "Bachelor of Science - Cyber Security & Information Assurance", 
    issuer: "Western Governors University",
    year: "2021",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    credentialId: "CeD.2432-33GA-TMSH",
    description: "Cybersecurity with cum laude honors"
  },
  {
    name: "Penn Foster Career School",
    issuer: "Penn Foster",
    year: "1992",
    status: "Active",
    category: "Education",
    icon: School,
    credentialId: "22716659"
  },

  // Cybersecurity & Information Security
  {
    name: "Cyber Readiness Program",
    issuer: "Cyber Readiness Institute",
    year: "2024",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield,
    credentialId: "76959506769753"
  },
  {
    name: "CISSP Cert Prep (2021): The Basics",
    issuer: "LinkedIn",
    year: "2021",
    status: "Active", 
    category: "Cybersecurity",
    icon: Shield
  },
  {
    name: "EC-Council Certified Encryption Specialist (ECES)",
    issuer: "EC-Council", 
    year: "2021",
    status: "Active",
    category: "Cybersecurity",
    icon: Lock,
    credentialId: "ECC1023459876"
  },
  {
    name: "CompTIA PenTest+",
    issuer: "CompTIA",
    year: "2021",
    status: "Active",
    category: "Cybersecurity",
    icon: Bug
  },
  {
    name: "CompTIA Cybersecurity Analyst (CySA+)",
    issuer: "CompTIA",
    year: "2021", 
    status: "Active",
    category: "Cybersecurity",
    icon: Search
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    year: "2021",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield
  },
  {
    name: "CompTIA Security+ ce Certification",
    issuer: "CompTIA",
    year: "2021",
    status: "Expired",
    category: "Cybersecurity", 
    icon: Shield,
    description: "Expired Apr 2024"
  },
  {
    name: "Fundamentals of Information Security",
    issuer: "uCertify",
    year: "2021",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield
  },
  {
    name: "Introduction To IT & Information Security",
    issuer: "Cybrary",
    year: "2021",
    status: "Active",
    category: "Cybersecurity",
    icon: Computer
  },
  {
    name: "Complete Cyber Security Course",
    issuer: "StationX",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield
  },
  {
    name: "ARP spoofing & Man In The Middle Attacks Execution & Detection",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Wifi
  },
  {
    name: "Cyber Security Advanced Persistent Threat Defender Preview",
    issuer: "Udemy", 
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: AlertTriangle
  },
  {
    name: "Cybersecurity Awareness Training",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Eye
  },
  {
    name: "Hacking Academy",
    issuer: "Udemy",
    year: "2017",
    status: "Active", 
    category: "Cybersecurity",
    icon: Terminal
  },
  {
    name: "How to Monitor & Intercept Transmitted Data",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Radio
  },
  {
    name: "Intro to Ethical Hacking CEH",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Code
  },
  {
    name: "Mobile Cybersecurity Awareness",
    issuer: "Udemy", 
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Smartphone
  },
  {
    name: "Symantec Certified Specialist - Cyber Security Services",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield
  },
  {
    name: "The Complete Cyber Security Course Anonymous Browsing",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: EyeOff
  },
  {
    name: "The Complete Cyber Security Course End Point Protection",
    issuer: "Udemy", 
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Laptop
  },
  {
    name: "The Complete Cyber Security Course Network Security",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Network
  },
  {
    name: "WordPress Security - Secure, Protect and Backup Your Site",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Globe
  },
  {
    name: "Beginners Are Building Their Own Fortune500 Grade Firewalls",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield
  },
  {
    name: "Security Awareness Program", 
    issuer: "Consumer Data Industry Association",
    year: "2015",
    status: "Active",
    category: "Cybersecurity",
    icon: Eye
  },

  // Cloud & Infrastructure
  {
    name: "Google Professional Cloud Security Engineer",
    issuer: "Google",
    year: "2021", 
    status: "Active",
    category: "Cloud",
    icon: Cloud
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    year: "2021",
    status: "Active",
    category: "Cloud",
    icon: Cloud
  },

  // Networking
  {
    name: "Cisco Certified Network Associate Industrial (CCNA I)",
    issuer: "Cisco",
    year: "2021",
    status: "Active",
    category: "Networking",
    icon: Router
  },
  {
    name: "Cisco Certified Network Associate Industrial (CCNA)",
    issuer: "CompTIA",
    year: "2021",
    status: "Active",
    category: "Networking",
    icon: Router
  },
  {
    name: "CCNA",
    issuer: "Cisco",
    year: "2021",
    status: "Expired",
    category: "Networking",
    icon: Router,
    description: "Expired May 2024"
  },
  {
    name: "CompTIA Network+",
    issuer: "CompTIA",
    year: "2021",
    status: "Active",
    category: "Networking",
    icon: Network
  },
  {
    name: "CompTIA Network+ ce Certification",
    issuer: "CompTIA",
    year: "2021",
    status: "Expired",
    category: "Networking",
    icon: Network,
    description: "Expired Apr 2024"
  },
  {
    name: "Fortinet Network Security Expert Level 1: Certified Associate",
    issuer: "Fortinet",
    year: "2021",
    status: "Active", 
    category: "Networking",
    icon: Shield
  },
  {
    name: "WIRELESS Wi-Fi Crash Course",
    issuer: "Udemy",
    year: "2019",
    status: "Active",
    category: "Networking",
    icon: Wifi
  },

  // Project Management & IT Operations
  {
    name: "Certified Associate in Project Management (CAPM)",
    issuer: "Project Management Institute",
    year: "2023",
    status: "Active",
    category: "Project Management",
    icon: Briefcase,
    credentialId: "7674425"
  },
  {
    name: "CompTIA Project+",
    issuer: "CompTIA",
    year: "2021",
    status: "Active",
    category: "Project Management",
    icon: Calendar
  },
  {
    name: "ITIL IT Service Management",
    issuer: "Cisco",
    year: "2021",
    status: "Active",
    category: "IT Operations",
    icon: Settings
  },
  {
    name: "CompTIA A+",
    issuer: "CompTIA", 
    year: "2021",
    status: "Active",
    category: "IT Operations",
    icon: Monitor
  },
  {
    name: "CompTIA A+ ce Certification",
    issuer: "CompTIA",
    year: "2021",
    status: "Expired",
    category: "IT Operations",
    icon: Monitor,
    description: "Expired Apr 2024"
  },
  {
    name: "CompTIA IT Operations Specialist – CIOS Stackable Certification",
    issuer: "CompTIA",
    year: "2021",
    status: "Expired",
    category: "IT Operations",
    icon: Cog,
    description: "Expired Apr 2024"
  },
  {
    name: "CompTIA Secure Infrastructure Specialist – CSIS Stackable Certification",
    issuer: "CompTIA",
    year: "2021",
    status: "Expired", 
    category: "IT Operations",
    icon: Server,
    description: "Expired Apr 2024"
  },

  // Technology & Development
  {
    name: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    year: "2023",
    status: "Active",
    category: "Technology",
    icon: Lightbulb
  },
  {
    name: "Tech Basics Cables & Connectors",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Technology",
    icon: Cable
  },
  {
    name: "VMware Workstation Pro 12",
    issuer: "Udemy",
    year: "2017",
    status: "Active",
    category: "Technology",
    icon: HardDrive
  },
  {
    name: "Basic Electricity and Electronics - Analog (BEE-A)",
    issuer: "Whirlpool Corporation",
    year: "1982",
    status: "Active",
    category: "Technology",
    icon: Zap
  },

  // Professional Development & Communication
  {
    name: "Giving Your Elevator Pitch",
    issuer: "LinkedIn",
    year: "2022",
    status: "Active",
    category: "Professional Development",
    icon: MessageCircle
  },

  // Legal & Investigation
  {
    name: "Tennessee Licensed Private Investigator #C545",
    issuer: "Tennessee Department of Commerce and Insurance",
    year: "1993",
    status: "Active",
    category: "Legal",
    icon: Search,
    description: "Licensed Private Investigator"
  },
  {
    name: "Private Investigation Continuing Education",
    issuer: "Integrity International Security Services Inc.",
    year: "2024",
    status: "Active",
    category: "Legal",
    icon: BookOpen
  }
];

const CertificationsSection = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cybersecurity":
        return "bg-[#B22234]/10 text-[#B22234] border-[#B22234]/20";
      case "Investigation":
        return "bg-[#3C3B6E]/10 text-[#3C3B6E] border-[#3C3B6E]/20";
      case "Technology":
        return "bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20";
      case "Leadership":
        return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20";
      case "AI/ML":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Cloud":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "Education":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Legal":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Patents":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Privacy":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "Research":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "Networking":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Project Management":
        return "bg-violet-100 text-violet-800 border-violet-200";
      case "IT Operations":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "Professional Development":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Renewed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Continuing Education":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Expired":
        return "bg-red-100 text-red-800 border-red-200";
      case "Patent Pending":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section id="certifications" className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="h-full border border-gray-200 hover:shadow-lg transition-all duration-300 card-hover">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] p-2 rounded-lg">
                      <cert.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge 
                        variant="outline" 
                        className={getCategoryColor(cert.category)}
                      >
                        {cert.category}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(cert.status)}
                      >
                        {cert.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-[#3C3B6E] leading-tight">
                    {cert.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Issuing Organization
                      </p>
                      <p className="text-sm text-gray-600">
                        {cert.issuer}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Year Obtained
                      </p>
                      <p className="text-sm text-gray-600">
                        {cert.year}
                      </p>
                    </div>
                    
                    {cert.credentialId && (
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Credential ID
                        </p>
                        <p className="text-sm text-gray-600 font-mono">
                          {cert.credentialId}
                        </p>
                      </div>
                    )}
                    
                    {cert.description && (
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Description
                        </p>
                        <p className="text-sm text-gray-600">
                          {cert.description}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="border-2 border-[#3C3B6E] bg-gradient-to-br from-white to-blue-50 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-[#3C3B6E] mr-3" />
                <h3 className="text-2xl font-bold text-[#3C3B6E]">
                  Continuing Professional Development
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Maintaining active participation in professional development through industry conferences, 
                advanced training programs, and continuing education requirements. With 64 professional 
                certifications and credentials, committed to staying at the forefront of emerging technologies, 
                evolving threat landscapes, and regulatory compliance standards across multiple domains.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;