import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Computer, Lock, Search, Users } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  year: string;
  status: "Active" | "Renewed" | "Continuing Education";
  category: "Cybersecurity" | "Investigation" | "Technology" | "Leadership";
  icon: React.ElementType;
  description?: string;
}

const certifications: Certification[] = [
  {
    name: "Certified Information Systems Security Professional",
    issuer: "(ISC)² - International Information System Security Certification Consortium",
    year: "2015",
    status: "Continuing Education",
    category: "Cybersecurity",
    icon: Shield,
    description: "Premier cybersecurity certification demonstrating expertise in security architecture and engineering"
  },
  {
    name: "Certified Ethical Hacker",
    issuer: "EC-Council",
    year: "2014",
    status: "Renewed",
    category: "Cybersecurity", 
    icon: Lock,
    description: "Advanced penetration testing and ethical hacking methodologies"
  },
  {
    name: "Certified Fraud Examiner",
    issuer: "Association of Certified Fraud Examiners",
    year: "2012",
    status: "Active",
    category: "Investigation",
    icon: Search,
    description: "Expert-level fraud prevention, detection, and investigation techniques"
  },
  {
    name: "Professional Certified Investigator",
    issuer: "ASIS International",
    year: "2010",
    status: "Active",
    category: "Investigation",
    icon: Search,
    description: "Professional standards for private investigation and security consulting"
  },
  {
    name: "CompTIA Security+",
    issuer: "Computing Technology Industry Association",
    year: "2009",
    status: "Renewed",
    category: "Cybersecurity",
    icon: Computer,
    description: "Foundation certification in cybersecurity principles and practices"
  },
  {
    name: "Project Management Professional",
    issuer: "Project Management Institute",
    year: "2008",
    status: "Continuing Education",
    category: "Leadership",
    icon: Users,
    description: "Advanced project management methodologies and leadership principles"
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
            Professional Certifications
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Industry-recognized certifications demonstrating expertise across cybersecurity, 
            fraud investigation, and technology leadership domains.
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
                advanced training programs, and continuing education requirements. Committed to staying 
                at the forefront of emerging technologies and evolving threat landscapes.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;