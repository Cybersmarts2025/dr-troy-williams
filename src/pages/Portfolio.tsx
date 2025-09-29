import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  User, Award, BookOpen, Building, Shield, Brain, 
  FileText, Star, MessageSquare, Download, ExternalLink,
  Trophy, Briefcase, GraduationCap, Code, Globe, 
  ChevronRight, Target, Lightbulb, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import WorkHistory from '@/components/WorkHistory';
import CertificationsSection from '@/components/CertificationsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { useToast } from '@/components/ui/use-toast';

const Portfolio = () => {
  const { toast } = useToast();

  const handleDownloadPortfolio = () => {
    toast({
      title: "Portfolio Unavailable",
      description: "Portfolio file is not currently available. Please contact us directly for access.",
      variant: "destructive",
    });
  };

  const achievements = [
    {
      title: "PhD in Artificial Intelligence",
      institution: "Capitol Technology University",
      year: "2024",
      description: "Specialized in AI security frameworks and autonomous systems",
      icon: Brain
    },
    {
      title: "Master's in IT Management",
      institution: "Western Governors University",
      year: "2022",
      description: "Focus on technology leadership and strategic planning",
      icon: GraduationCap
    },
    {
      title: "WGU Capstone Excellence Award",
      institution: "Western Governors University",
      year: "2022",
      description: "Recognized for outstanding academic achievement",
      icon: Trophy
    },
    {
      title: "32+ Years Private Investigation",
      institution: "Information Systems Inc",
      year: "1993-Present",
      description: "President & Director of Investigative Operations",
      icon: Shield
    }
  ];

  const technologies = [
    {
      name: "PatriotProof™",
      status: "Patent Pending",
      description: "AI-driven identity verification and fraud prevention system",
      category: "Identity Security"
    },
    {
      name: "FraudDNA™", 
      status: "Patent Pending",
      description: "Behavioral analytics platform for financial fraud detection",
      category: "Fraud Prevention"
    },
    {
      name: "AISF™",
      status: "Proprietary Framework",
      description: "Autonomous Intelligence Security Framework for AI systems",
      category: "AI Security"
    },
    {
      name: "PPP™",
      status: "Proprietary Platform",
      description: "Proactive Prevention Platform for cybersecurity defense",
      category: "Cybersecurity"
    }
  ];

  const publications = [
    {
      title: "Stolen Nation",
      type: "Book",
      year: "2024",
      description: "A comprehensive analysis of digital threats to American sovereignty"
    },
    {
      title: "AI Security Framework Research",
      type: "Academic Research",
      year: "2024",
      description: "Published research on autonomous intelligence security"
    },
    {
      title: "Fraud Prevention Methodologies",
      type: "Industry Papers",
      year: "2023-2024",
      description: "Multiple papers on AI-driven fraud detection systems"
    }
  ];

  const memberships = [
    "National Honor Society",
    "Sword and Shield Honor Society", 
    "ResearchGate Academic Network",
    "Google Scholar",
    "Western Governors University Alumni"
  ];

  return (
    <>
      <Helmet>
        <title>Professional Portfolio - Dr. Troy Williams | Cybersecurity Expert & AI Pioneer</title>
        <meta name="description" content="Comprehensive portfolio of Dr. Troy Williams - PhD in AI, 32+ years cybersecurity experience, inventor of PatriotProof™ and FraudDNA™ technologies." />
        <meta name="keywords" content="Troy Williams portfolio, cybersecurity expert, AI security, fraud prevention, private investigator, patent holder" />
        <link rel="canonical" href="https://troywilliams.ai/portfolio" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <NavBar />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-r from-[#3C3B6E] via-[#3C3B6E] to-[#B22234]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <div className="flex items-center justify-center mb-6">
                <User className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-6xl font-bold">Professional Portfolio</h1>
              </div>
              
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Dr. Troy Williams, PhD - Cybersecurity Pioneer & AI Innovation Leader
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  32+ Years Experience
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  PhD in Artificial Intelligence
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  Patent Holder
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  Published Author
                </Badge>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-[#3C3B6E]"
                  onClick={handleDownloadPortfolio}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Portfolio PDF
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-[#3C3B6E]"
                >
                  <Link to="/contact">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contact Me
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-6 flex items-center justify-center gap-3">
                <Target className="h-8 w-8" />
                Executive Summary
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#F97316]">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Dr. Troy Williams is a distinguished cybersecurity expert and AI pioneer with over three decades of experience in private investigation, digital forensics, and emerging technology development. As the founder of Cybersmarts.ai LLC and former President of Information Systems Inc, he has established himself as a thought leader in proactive cybersecurity defense and artificial intelligence security frameworks.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  His groundbreaking work includes the development of PatriotProof™ and FraudDNA™ technologies, representing the cutting edge of AI-driven fraud prevention and identity verification systems. Dr. Williams holds a PhD in Artificial Intelligence and has been recognized with numerous academic and professional honors, including the WGU Capstone Excellence Award and membership in multiple honor societies.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-6 flex items-center justify-center gap-3">
                <Trophy className="h-8 w-8" />
                Key Achievements
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <achievement.icon className="h-12 w-12 mx-auto text-[#F97316] mb-4" />
                      <CardTitle className="text-lg text-[#3C3B6E]">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="font-semibold text-[#B22234] mb-2">{achievement.institution}</p>
                      <Badge variant="outline" className="mb-3">{achievement.year}</Badge>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Proprietary Technologies */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-6 flex items-center justify-center gap-3">
                <Lightbulb className="h-8 w-8" />
                Proprietary Technologies
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Innovative solutions developed to address critical cybersecurity and fraud prevention challenges
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-2 border-[#F97316]/20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-[#3C3B6E]">{tech.name}</CardTitle>
                        <Badge 
                          variant={tech.status === "Patent Pending" ? "destructive" : "secondary"}
                          className={tech.status === "Patent Pending" ? "bg-[#B22234]" : ""}
                        >
                          {tech.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#F97316] font-semibold">{tech.category}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{tech.description}</p>
                      <div className="mt-4">
                        <Link 
                          to="/ip" 
                          className="inline-flex items-center text-[#3C3B6E] hover:text-[#B22234] transition-colors"
                        >
                          Learn More <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications & Research */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-6 flex items-center justify-center gap-3">
                <BookOpen className="h-8 w-8" />
                Publications & Research
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {publications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-2">{pub.type}</Badge>
                      <CardTitle className="text-lg text-[#3C3B6E]">{pub.title}</CardTitle>
                      <p className="text-sm text-[#F97316] font-semibold">{pub.year}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{pub.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/books">
                  <FileText className="h-5 w-5 mr-2" />
                  View All Publications
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Professional Memberships */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-6 flex items-center justify-center gap-3">
                <Users className="h-8 w-8" />
                Professional Memberships & Honors
              </h2>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-[#F97316]/20">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {memberships.map((membership, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <Star className="h-4 w-4 text-[#F97316]" />
                        <span className="text-gray-700">{membership}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Work History Section */}
        <WorkHistory />

        <Separator className="my-8" />

        {/* Certifications Section */}
        <CertificationsSection />

        <Separator className="my-8" />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-[#3C3B6E] to-[#B22234]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Collaborate?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Let's discuss how my expertise in cybersecurity, AI, and fraud prevention can benefit your organization.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-[#3C3B6E]"
                >
                  <Link to="/consultation">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Schedule Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-[#3C3B6E]"
                >
                  <Link to="/contact">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Get In Touch
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Portfolio;