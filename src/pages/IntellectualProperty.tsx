import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Award, Lock, Flag } from 'lucide-react';
import { PersonSchema } from '@/utils/schemaMarkup';

const IntellectualProperty = () => {
  const trademarks = [
    {
      name: 'Autonomous Intelligence Security Framework (AISF™)',
      description: 'A revolutionary AI-driven cybersecurity framework that autonomously detects, analyzes, and responds to security threats in real-time. AISF™ represents the next generation of proactive security systems that learn and adapt to emerging threats without human intervention.'
    },
    {
      name: 'Proactive Prevention Platform (PPP™)',
      description: 'An innovative fraud prevention platform utilizing predictive AI models to identify and prevent fraudulent activities before they occur. PPP™ leverages advanced machine learning algorithms to analyze patterns and predict potential security breaches with unprecedented accuracy.'
    },
    {
      name: 'FraudDNA™',
      description: 'A cutting-edge biometric identification and fraud detection system that creates unique digital fingerprints for transactions and user behaviors. FraudDNA™ provides forensic-level analysis to identify fraudulent patterns and authenticate legitimate users with precision.'
    },
    {
      name: 'PatriotProof™',
      description: 'A comprehensive security certification and validation system designed to ensure the highest levels of cybersecurity compliance for critical infrastructure and government systems. PatriotProof™ establishes rigorous standards for protecting American digital assets.'
    },
    {
      name: 'Protecting America Through Technology™',
      description: 'A holistic approach and mission statement encompassing all cybersecurity initiatives aimed at safeguarding American interests through advanced technological solutions. This trademark represents the overarching philosophy of using innovation to defend national security.'
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Troy Williams, PhD",
    "jobTitle": "Inventor, AI Scientist, Cybersecurity Engineer",
    "affiliation": {
      "@type": "Organization",
      "name": "Cybersmarts.ai LLC"
    },
    "url": "https://www.drtroywilliams.net",
    "sameAs": [
      "https://www.linkedin.com/in/cybersmarts/",
      "https://www.researchgate.net/profile/Troy-Williams-14?ev=hdr_xprf",
      "https://ssrn.com/author=5240753",
      "https://scholar.google.com/citations?user=drtroywilliams"
    ],
    "knowsAbout": [
      "AI Ethics",
      "Cybersecurity", 
      "Fraud Prevention",
      "Quantum Security"
    ],
    "owns": [
      {
        "@type": "Product",
        "name": "Autonomous Intelligence Security Framework (AISF™)",
        "brand": {
          "@type": "Organization",
          "name": "Cybersmarts.ai LLC"
        }
      },
      {
        "@type": "Product", 
        "name": "Proactive Prevention Platform (PPP™)",
        "brand": {
          "@type": "Organization",
          "name": "Cybersmarts.ai LLC"
        }
      },
      {
        "@type": "Product",
        "name": "FraudDNA™", 
        "brand": {
          "@type": "Organization",
          "name": "Cybersmarts.ai LLC"
        }
      },
      {
        "@type": "Product",
        "name": "PatriotProof™",
        "brand": {
          "@type": "Organization", 
          "name": "Cybersmarts.ai LLC"
        }
      },
      {
        "@type": "Product",
        "name": "Protecting America Through Technology™",
        "brand": {
          "@type": "Organization",
          "name": "Cybersmarts.ai LLC" 
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Trademarked Technologies and Intellectual Property Created by Dr. Troy Williams, PhD</title>
        <meta name="author" content="Dr. Troy Williams, PhD" />
        <meta name="copyright" content="© 2025 Cybersmarts.ai LLC. All rights reserved." />
        <meta name="description" content="Dr. Troy Williams, PhD is the inventor of patented cybersecurity and AI platforms including AISF™, PPP™, FraudDNA™, and PatriotProof™." />
        <meta property="og:title" content="Dr. Troy Williams, PhD | Inventor & Trademark Owner" />
        <meta property="og:url" content="https://www.drtroywilliams.net/ip" />
        <meta property="og:description" content="View all trademarked technologies developed by Dr. Troy Williams, PhD and owned by Cybersmarts.ai LLC." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Trademarked Technologies and Intellectual Property
                </h1>
              </div>
              <p className="text-xl opacity-90">
                Created by Dr. Troy Williams, PhD
              </p>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <Award className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Inventor Biography</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dr. Troy Williams, PhD, is the inventor and founder of all technologies listed below, 
                developed under Cybersmarts.ai LLC and protected by U.S. intellectual property laws.
              </p>
            </div>
          </div>
        </section>

        {/* Trademarked Technologies */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-12">
                <Lock className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-foreground">Trademarked Technologies</h2>
              </div>
              
              <div className="grid gap-8">
                {trademarks.map((trademark, index) => (
                  <div 
                    key={index}
                    className="bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-foreground flex items-center mb-4">
                      <Shield className="h-5 w-5 text-primary mr-2" />
                      {trademark.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {trademark.description}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      Registered trademark of Cybersmarts.ai LLC
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Verification Statement */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-card p-8 rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Verification Statement</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  All systems are trademarked and registered to Cybersmarts.ai LLC and are enforced 
                  through federal IP and cybersecurity statutes. Created, patented, and controlled 
                  by Dr. Troy Williams, PhD.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Declaration */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Flag className="h-8 w-8 text-primary-foreground mr-3" />
                <h2 className="text-2xl font-bold text-primary-foreground">
                  Built in Tennessee. By Americans. For Americans.
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IntellectualProperty;