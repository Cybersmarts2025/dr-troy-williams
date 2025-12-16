import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, FileText, Award, Briefcase, UserCheck, 
  TrendingUp, CheckCircle, Mail, Linkedin, Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import jobReadyLogo from "@/assets/jobready-360-logo.png";

const JobReady360 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stages = [
    {
      number: 1,
      title: "Target Your Role With Precision",
      icon: Target,
      description: "The job search only works when you know where you are going.",
      details: [
        "Choose one primary role and one secondary role",
        "Collect multiple job descriptions for each and identify repeated skills and keywords",
        "Understand what the employer values, what problems they are solving, and what results they expect",
        "Replace guesswork with strategic clarity"
      ]
    },
    {
      number: 2,
      title: "Reverse Resume",
      icon: FileText,
      description: "The resume must speak the language of the employer.",
      details: [
        "Every bullet point shows results and measurable outcomes",
        "Keywords match job descriptions to pass Applicant Tracking Systems",
        "Experience framed around saving money, making money, and reducing risk",
        "One-page Value Proposition Summary explains how you'll create value in the first 90 days"
      ]
    },
    {
      number: 3,
      title: "Portfolio and Proof",
      icon: Award,
      description: "Employers trust proof more than they trust claims.",
      details: [
        "Create at least three proof assets demonstrating your capabilities",
        "Build lab walkthroughs, case studies, or project demonstrations",
        "For technical roles: Include GitHub repositories and problem-solving samples",
        "For business roles: Include workflow diagrams, customer impact examples, or process redesigns"
      ]
    },
    {
      number: 4,
      title: "Professional Presence and Application Quality",
      icon: UserCheck,
      description: "Because I own a background screening company, I see exactly where applicants hurt themselves.",
      details: [
        "Complete applications with accurate, readable information",
        "Clean up all social media profiles - employers search for red flags",
        "Professional voicemail: Clear name and message, no music or jokes",
        "Professional email address that communicates maturity and readiness"
      ]
    },
    {
      number: 5,
      title: "Interview Mastery",
      icon: Briefcase,
      description: "An interview is a value demonstration, not a conversation.",
      details: [
        "Build a personal narrative explaining who you are, what you've accomplished, and how you create value",
        "Prepare industry-mapped answers using best practice formats",
        "Present a 90-day value plan outlining three actions you'll take if hired",
        "Ask intelligent questions about the role, culture, team, and expectations"
      ]
    },
    {
      number: 6,
      title: "Employer Research and Alignment",
      icon: Shield,
      description: "Employers hire team players, not individuals who only talk about themselves.",
      details: [
        "Study the company's mission, goals, and current challenges",
        "Understand their products, services, and customer base",
        "Identify how your experience directly supports their direction",
        "Prepare questions demonstrating curiosity, engagement, and strategic thinking"
      ]
    },
    {
      number: 7,
      title: "Follow-Up System",
      icon: CheckCircle,
      description: "Most candidates disappear after an interview. Those who follow up correctly rise to the top.",
      details: [
        "Within 2 hours: Send thank you message referencing a key discussion point",
        "Within 24 hours: Send Interview Debrief showing how you'll create value",
        "Within 1 week: Send professional check-in with one new insight or idea related to the job",
        "Stay visible and memorable through strategic follow-up"
      ]
    },
    {
      number: 8,
      title: "The Job Ready 360™ Career Operating System",
      icon: TrendingUp,
      description: "A structured path that turns your career into a predictable process.",
      details: [
        "Application tracking system for organized job search management",
        "Interview scorecards to evaluate performance and improve",
        "Networking scripts for professional relationship building",
        "Salary negotiation scripts to maximize your offer",
        "90-day onboarding plan for new role success",
        "Continuous professional upgrade steps for long-term growth"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Job Ready 360™ | Career Acceleration System by Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Job Ready 360™ - A complete career acceleration system for WGU alumni by Dr. Troy Williams. Strategic, results-driven path from uncertain to confident and job-ready." 
        />
        <link rel="canonical" href="https://www.DrTroyWilliams.net/job-ready-360" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Job Ready 360™" />
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#3C3B6E] via-[#2d2c54] to-[#1a1a3a] text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <img 
                src={jobReadyLogo} 
                alt="Job Ready 360 Logo by Cybersmarts.ai" 
                className="w-64 h-auto mx-auto mb-8"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Job Ready 360™
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-gray-200">
                My Complete Career Acceleration System for WGU Alumni
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-[#B22234] to-[#f97316] mx-auto mb-8"></div>
              <p className="text-lg leading-relaxed">
                A clear, strategic, and results-driven path to employment backed by decades of experience 
                in cybersecurity engineering, artificial intelligence, private investigation, and background screening.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-center">
                  Why I Created Job Ready 360™
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none space-y-4 text-foreground">
                <p>
                  As a cybersecurity engineer, artificial intelligence scientist, licensed private investigator, 
                  and owner of a national background screening company, I have a unique view into the hiring 
                  pipeline that most applicants never see.
                </p>
                <p>
                  <strong>I study how employers make decisions.</strong> I see thousands of applications come 
                  through my screening systems. I know exactly what turns employers off and what makes a 
                  candidate stand out.
                </p>
                <p>
                  Job Ready 360™ is the system I built to take a candidate from uncertain to confident and 
                  job-ready. Below is the action-based blueprint that you can follow from start to finish.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 8 Stages Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The 8-Stage Career Blueprint</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow this comprehensive system to transform from job seeker to hired professional
              </p>
            </motion.div>

            <div className="grid gap-8 max-w-6xl mx-auto">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.number}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-2 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                            {stage.number}
                          </div>
                          <div className="flex-grow">
                            <CardTitle className="text-xl md:text-2xl flex items-center gap-3 mb-2">
                              <Icon className="h-6 w-6 text-primary" />
                              {stage.title}
                            </CardTitle>
                            <p className="text-muted-foreground italic">{stage.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {stage.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why This System Works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="border-2 border-[#B22234]/20 shadow-lg bg-gradient-to-br from-background to-muted/20">
              <CardHeader>
                <CardTitle className="text-3xl text-center mb-4">
                  Why Job Ready 360™ Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-foreground">
                <p className="text-lg leading-relaxed">
                  I understand the hiring landscape from every angle. As a cybersecurity engineer, 
                  artificial intelligence scientist, licensed private investigator, background screening 
                  company owner, and WGU alumni mentor, I see what works and what fails.
                </p>
                <p className="text-lg leading-relaxed">
                  I built Job Ready 360™ so WGU students and alumni no longer have to guess.
                </p>
                <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                  <p className="text-lg font-semibold mb-3">
                    If you follow this system from beginning to end, you will present yourself as:
                  </p>
                  <ul className="space-y-2 text-foreground">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      A high-value, employer-aligned professional
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Professionally prepared with proof of performance
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Clear on your purpose and career direction
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Ready to land interviews and secure job offers
                    </li>
                  </ul>
                </div>
                <p className="text-center text-lg font-semibold text-primary mt-8">
                  That is what companies want. That is what gets interviews and offers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Action Steps CTA */}
        <section className="py-16 bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8">
                If you are a WGU student or alumni, follow this system step by step:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <p>Build your Reverse Resume</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <p>Create your proof portfolio</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <p>Clean up your online presence</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <p>Research each company deeply</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <p>Ask intelligent questions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <p>Execute the follow-up system</p>
                </div>
              </div>

              <p className="text-lg mb-6">
                If you need extra guidance, contact me inside WGU Connect with your top three questions. 
                My time is limited, but I will always provide direct, actionable solutions that move you forward.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-[#3C3B6E] hover:bg-gray-100"
                  asChild
                >
                  <Link to="/contact">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Dr. Williams
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                  asChild
                >
                  <a 
                    href="https://www.linkedin.com/in/cybersmarts/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Dr. Williams */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl mb-4">About Dr. Troy Williams, PhD</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2 text-muted-foreground">
                  <p className="font-semibold text-foreground">Founder and President, Cybersmarts.ai</p>
                  <p>Cybersecurity Engineer</p>
                  <p>Artificial Intelligence Scientist</p>
                  <p>Licensed Private Investigator</p>
                  <p>Background Screening Expert</p>
                  <p>WGU Alumni Mentor</p>
                </div>
                
                <div className="text-center pt-6 border-t mt-6">
                  <p className="text-lg font-semibold text-primary mb-4">
                    Protecting America Through Technology™
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="https://www.drtroywilliams.net" 
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.DrTroyWilliams.net
                    </a>
                    <span className="hidden sm:inline">•</span>
                    <a 
                      href="https://www.linkedin.com/in/cybersmarts/" 
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JobReady360;
