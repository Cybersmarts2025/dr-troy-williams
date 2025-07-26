import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Computer, Lock, Search, Users, Brain, GraduationCap, Building, Code, Globe } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  year: string;
  status: "Active" | "Renewed" | "Continuing Education";
  category: "Cybersecurity" | "Investigation" | "Technology" | "Leadership" | "AI/ML" | "Cloud" | "Education" | "Legal" | "Patents";
  icon: React.ElementType;
  description?: string;
}

const certifications: Certification[] = [
  // Recent & Advanced Certifications (2024-2025)
  {
    name: "Regulatory Compliance and AI",
    issuer: "Western Governors University",
    year: "2025",
    status: "Active",
    category: "AI/ML",
    icon: Brain,
    description: "Advanced coursework in AI regulatory frameworks and compliance requirements"
  },
  {
    name: "AI-Driven Cross-Channel Financial Fraud Detection System",
    issuer: "USPTO Patent Application",
    year: "2024",
    status: "Active",
    category: "Patents",
    icon: Shield,
    description: "Patent pending for quantum-resistant encryption and blockchain integration in fraud detection"
  },
  {
    name: "IA Doctorates",
    issuer: "CITI Program",
    year: "2024",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    description: "Institutional Animal Care and Use Committee training for doctoral research"
  },
  {
    name: "IRB Members",
    issuer: "CITI Program", 
    year: "2024",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    description: "Institutional Review Board certification for human subjects research"
  },
  {
    name: "Write & Cite: Academic Writing Readiness Course - Doctoral",
    issuer: "Capitol Technology University",
    year: "2024",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    description: "Advanced academic writing and APA 7 citation standards for doctoral research"
  },
  {
    name: "Creating a Culture of Privacy",
    issuer: "LinkedIn Learning",
    year: "2024",
    status: "Active",
    category: "Legal",
    icon: Lock,
    description: "Privacy issues and organizational privacy culture development"
  },
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "LinkedIn Learning",
    year: "2024",
    status: "Active",
    category: "AI/ML",
    icon: Brain,
    description: "Foundational AI concepts and business applications"
  },
  {
    name: "Cyber Readiness Program",
    issuer: "Cyber Readiness Institute",
    year: "2024",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield,
    description: "Comprehensive cybersecurity readiness and risk assessment program"
  },
  
  // AI & Machine Learning Specializations (2023)
  {
    name: "Enterprise Design Thinking Practitioner", 
    issuer: "IBM",
    year: "2023",
    status: "Active",
    category: "Technology",
    icon: Brain,
    description: "IBM's enterprise-level design thinking methodology and practices"
  },
  {
    name: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University",
    year: "2023",
    status: "Active",
    category: "AI/ML",
    icon: Brain,
    description: "Advanced prompt engineering techniques for large language models"
  },
  {
    name: "Get Ready for Generative AI",
    issuer: "LinkedIn Learning",
    year: "2023",
    status: "Active",
    category: "AI/ML",
    icon: Brain,
    description: "Generative AI applications in business and design"
  },
  {
    name: "Advanced AI: Transformers for NLP Using Large Language Models",
    issuer: "LinkedIn Learning",
    year: "2023",
    status: "Active",
    category: "AI/ML",
    icon: Brain,
    description: "Deep learning with transformer models and natural language processing"
  },
  {
    name: "Introducing Semantic Kernel: Building AI-Based Apps",
    issuer: "LinkedIn Learning",
    year: "2023",
    status: "Active",
    category: "AI/ML",
    icon: Code,
    description: "Microsoft Semantic Kernel framework for AI application development"
  },
  {
    name: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    year: "2023",
    status: "Active",
    category: "AI/ML",
    icon: Brain,
    description: "Foundational understanding of generative artificial intelligence"
  },
  {
    name: "Social and Behavioral Research",
    issuer: "CITI Program",
    year: "2023",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    description: "Ethics and methodology in social and behavioral research"
  },
  
  // Advanced Degrees & Project Management (2022-2023)
  {
    name: "Masters of Science - Information Technology Management",
    issuer: "Western Governors University",
    year: "2022",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    description: "Graduate degree in IT management and strategic technology leadership"
  },
  {
    name: "Certified Associate in Project Management (CAPM)",
    issuer: "Project Management Institute",
    year: "2023",
    status: "Active",
    category: "Leadership",
    icon: Users,
    description: "PMI-certified project management fundamentals and practices"
  },
  
  // Core Cybersecurity & Technology Certifications (2021)
  {
    name: "Bachelor Of Science - Cyber Security & Information Assurance", 
    issuer: "Western Governors University",
    year: "2021",
    status: "Active",
    category: "Education",
    icon: GraduationCap,
    description: "Undergraduate degree in cybersecurity with 4.0 GPA and Capstone Excellence Award"
  },
  {
    name: "EC-Council Certified Encryption Specialist (ECES)",
    issuer: "EC-Council",
    year: "2021",
    status: "Active",
    category: "Cybersecurity",
    icon: Lock,
    description: "Advanced encryption technologies and cryptographic security implementation"
  },
  {
    name: "CompTIA PenTest+",
    issuer: "CompTIA",
    year: "2021",
    status: "Renewed",
    category: "Cybersecurity",
    icon: Shield,
    description: "Penetration testing skills and vulnerability assessment methodologies"
  },
  {
    name: "CompTIA Cybersecurity Analyst (CySA+)",
    issuer: "CompTIA",
    year: "2021",
    status: "Renewed",
    category: "Cybersecurity",
    icon: Shield,
    description: "Cybersecurity analytics and threat detection capabilities"
  },
  {
    name: "Google Professional Cloud Security Engineer",
    issuer: "Google Cloud",
    year: "2021",
    status: "Active",
    category: "Cloud",
    icon: Globe,
    description: "Google Cloud Platform security architecture and implementation"
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2021",
    status: "Active",
    category: "Cloud",
    icon: Globe,
    description: "AWS cloud fundamentals and basic security principles"
  },
  {
    name: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco Systems",
    year: "2021",
    status: "Renewed",
    category: "Technology",
    icon: Computer,
    description: "Network infrastructure design, implementation, and troubleshooting"
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    year: "2021",
    status: "Renewed",
    category: "Cybersecurity",
    icon: Shield,
    description: "Core cybersecurity skills and risk management practices"
  },
  {
    name: "CompTIA Network+",
    issuer: "CompTIA",
    year: "2021",
    status: "Renewed",
    category: "Technology",
    icon: Computer,
    description: "Network technologies, infrastructure, and network operations"
  },
  {
    name: "CompTIA A+",
    issuer: "CompTIA",
    year: "2021",
    status: "Renewed",
    category: "Technology",
    icon: Computer,
    description: "Hardware and software troubleshooting and technical support"
  },
  {
    name: "CompTIA Project+",
    issuer: "CompTIA",
    year: "2021",
    status: "Active",
    category: "Leadership",
    icon: Users,
    description: "Project management skills and business processes"
  },
  {
    name: "Fortinet Network Security Expert Level 1",
    issuer: "Fortinet",
    year: "2021",
    status: "Active",
    category: "Cybersecurity",
    icon: Shield,
    description: "Fortinet security appliances and network protection strategies"
  },
  {
    name: "ITIL IT Service Management",
    issuer: "AXELOS",
    year: "2021",
    status: "Active",
    category: "Technology",
    icon: Computer,
    description: "IT service management best practices and frameworks"
  },
  
  // Legacy Professional Certifications
  {
    name: "Certified Information Systems Security Professional (CISSP)",
    issuer: "(ISC)² - International Information System Security Certification Consortium",
    year: "2015",
    status: "Continuing Education",
    category: "Cybersecurity",
    icon: Shield,
    description: "Premier cybersecurity certification demonstrating expertise in security architecture and engineering"
  },
  {
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    year: "2014",
    status: "Renewed",
    category: "Cybersecurity", 
    icon: Lock,
    description: "Advanced penetration testing and ethical hacking methodologies"
  },
  {
    name: "Certified Fraud Examiner (CFE)",
    issuer: "Association of Certified Fraud Examiners",
    year: "2012",
    status: "Active",
    category: "Investigation",
    icon: Search,
    description: "Expert-level fraud prevention, detection, and investigation techniques"
  },
  {
    name: "Professional Certified Investigator (PCI)",
    issuer: "ASIS International",
    year: "2010",
    status: "Active",
    category: "Investigation",
    icon: Search,
    description: "Professional standards for private investigation and security consulting"
  },
  {
    name: "Project Management Professional (PMP)",
    issuer: "Project Management Institute",
    year: "2008",
    status: "Continuing Education",
    category: "Leadership",
    icon: Users,
    description: "Advanced project management methodologies and leadership principles"
  },
  {
    name: "Tennessee Licensed Private Investigator",
    issuer: "Tennessee Department of Commerce and Insurance",
    year: "1993",
    status: "Active",
    category: "Investigation",
    icon: Search,
    description: "State-licensed private investigator with over 30 years of active practice"
  },
  
  // Specialized & Legal Training
  {
    name: "Artificial Intelligence in Defending Traffic Cases",
    issuer: "SBI Seminars",
    year: "2025",
    status: "Active",
    category: "Legal",
    icon: Brain,
    description: "6-hour CLE-accredited training on AI applications in traffic law defense"
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
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section id="certifications" className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-4">
            Professional Certifications & Credentials
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive portfolio of industry certifications spanning cybersecurity, AI/ML, cloud technologies, 
            fraud investigation, and advanced academic credentials—representing over three decades of continuous learning and expertise.
          </p>
        </motion.div>

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
                advanced training programs, and continuing education requirements. With over 80 professional 
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