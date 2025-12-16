import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Fingerprint, 
  Globe, 
  Brain, 
  Gavel,
  Heart,
  Flag,
  Target,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const NationalMission = () => {
  const missionPillars = [
    {
      icon: Shield,
      title: "Protecting America Through Technology",
      description: "Developing sovereign U.S. technology solutions that safeguard citizens, institutions, and critical infrastructure from foreign threats and domestic fraud.",
      highlights: ["100% U.S.-hosted systems", "No foreign cloud dependencies", "American data sovereignty"]
    },
    {
      icon: Lock,
      title: "Quantum-Era Fraud Prevention",
      description: "Building post-quantum cryptographic defenses using NIST-approved algorithms (Kyber, Dilithium) to protect against current and future computational threats.",
      highlights: ["CRYSTALS-Kyber encryption", "Dilithium signatures", "Future-proof security"]
    },
    {
      icon: Fingerprint,
      title: "Synthetic Identity Elimination",
      description: "Deploying advanced detection systems to identify and neutralize synthetic identities before they can be used for financial fraud or infiltration.",
      highlights: ["FraudDNA™ detection", "Real-time verification", "Pattern recognition AI"]
    },
    {
      icon: Globe,
      title: "Proactive National Defense Grid",
      description: "Establishing an interconnected network of fraud prevention systems spanning federal, state, and local jurisdictions for unified threat response.",
      highlights: ["Multi-agency coordination", "Real-time threat sharing", "Nationwide coverage"]
    },
    {
      icon: Brain,
      title: "Behavioral Intelligence",
      description: "Implementing AI-driven behavioral analysis to detect fraudulent intent and anomalous patterns before crimes occur.",
      highlights: ["Predictive analytics", "Intent recognition", "Pre-crime prevention"]
    },
    {
      icon: Gavel,
      title: "Court & Legal Infrastructure Modernization",
      description: "Advocating for and designing systems that modernize judicial processes, improve evidence handling, and accelerate justice delivery.",
      highlights: ["Digital evidence systems", "Fraud prosecution support", "Legal compliance AI"]
    },
    {
      icon: Heart,
      title: "Senior Protection Initiatives",
      description: "Dedicated programs protecting America's most vulnerable population from scams, identity theft, and financial exploitation.",
      highlights: ["Elder fraud prevention", "Scam awareness training", "Family alert systems"]
    }
  ];

  const timeline = [
    { year: "1993", milestone: "Began investigative career in fraud detection and prevention" },
    { year: "2000", milestone: "Expanded into corporate fraud investigations and asset recovery" },
    { year: "2010", milestone: "Transitioned to cybersecurity and digital identity protection" },
    { year: "2015", milestone: "Developed foundational concepts for synthetic identity detection" },
    { year: "2020", milestone: "Launched AI-driven fraud prevention research initiatives" },
    { year: "2023", milestone: "Established PatriotProof™ and FraudDNA™ frameworks" },
    { year: "2024", milestone: "Introduced AISF™ and quantum-secure architecture" },
    { year: "2025", milestone: "Expanded National Fraud Defense Grid deployment" },
    { year: "2027", milestone: "Target: Full implementation of sovereign defense infrastructure" }
  ];

  return (
    <>
      <Helmet>
        <title>National Mission | Dr. Troy Williams, PhD</title>
        <meta name="description" content="Protecting America through technology: quantum-era fraud prevention, synthetic identity elimination, and national defense infrastructure from 1993 to 2027." />
      </Helmet>
      
      <NavBar />
      <PageBreadcrumb pageName="National Mission" />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Flag className="h-12 w-12 text-primary" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4">1993 – 2027</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              National Mission
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A 34-year commitment to protecting American citizens, institutions, and infrastructure 
              through innovative technology, relentless investigation, and sovereign defense systems.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <blockquote className="text-2xl md:text-3xl font-light italic text-foreground mb-6">
                  "To build and deploy American-made technology that eliminates fraud, 
                  protects the vulnerable, and ensures our nation's digital sovereignty 
                  for generations to come."
                </blockquote>
                <p className="text-muted-foreground">— Dr. Troy Williams, PhD</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission Pillars */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Mission Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missionPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3">
                        <pillar.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{pillar.description}</p>
                      <div className="space-y-2">
                        {pillar.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 text-primary" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Timeline Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Mission Timeline: 1993–2027
            </h2>
            <Card className="bg-card/50">
              <CardContent className="p-6 md:p-8">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />
                  
                  <div className="space-y-8">
                    {timeline.map((item, index) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={`relative flex items-center gap-4 md:gap-8 ${
                          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                      >
                        {/* Year badge */}
                        <div className="relative z-10 flex-shrink-0">
                          <Badge 
                            variant="default" 
                            className="bg-primary text-primary-foreground font-bold px-3 py-1"
                          >
                            {item.year}
                          </Badge>
                        </div>
                        
                        {/* Content */}
                        <div className={`flex-1 p-4 bg-muted/50 rounded-lg ${
                          index % 2 === 0 ? 'md:text-right md:mr-8' : 'md:text-left md:ml-8'
                        }`}>
                          <p className="text-sm md:text-base">{item.milestone}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Card className="border-primary/30 bg-card">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Join the Mission</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  The fight to protect America from fraud and identity threats requires collective effort. 
                  Whether you're a government agency, enterprise organization, or individual citizen, 
                  there's a role for you in this mission.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge className="bg-primary/20 text-primary px-4 py-2">Government Partners</Badge>
                  <Badge className="bg-primary/20 text-primary px-4 py-2">Enterprise Solutions</Badge>
                  <Badge className="bg-primary/20 text-primary px-4 py-2">Research Collaboration</Badge>
                  <Badge className="bg-primary/20 text-primary px-4 py-2">Citizen Awareness</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NationalMission;
