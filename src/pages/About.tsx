
import React from 'react';
import { Book, GraduationCap, Briefcase, Flag, Brain, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import NavBar from "@/components/NavBar";
import SeasonalBanner from "@/components/SeasonalBanner";
import { PersonSchema, WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Helmet>
        <title>About Dr. Troy Williams - AI Scientist | Cybersecurity Expert</title>
        <meta name="description" content="Learn about Dr. Troy Williams, a Ph.D. in Artificial Intelligence, Licensed Tennessee Private Investigator, and founder of Cybersmarts.ai dedicated to protecting America through technology." />
      </Helmet>
      
      {/* Schema.org markup for this webpage */}
      <WebPageSchema 
        name="About Dr. Troy Williams"
        description="Learn about Dr. Troy Williams' background, education, and professional credentials in AI, cybersecurity, and private investigation."
        url="https://drtroywilliams.com/about"
      />
      
      {/* Schema.org breadcrumb markup */}
      <BreadcrumbListSchema 
        items={[
          { name: "Home", item: "https://drtroywilliams.com" },
          { name: "About", item: "https://drtroywilliams.com/about" }
        ]}
      />
      
      {/* Comprehensive Person Schema for Dr. Troy Williams */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://www.drtroywilliams.net/#person",
          "name": "Troy Williams",
          "givenName": "Troy",
          "familyName": "Williams",
          "alternateName": ["Dr. Troy Williams", "Dr. Troy Williams, PhD", "The Proactive AI PI"],
          "honorificPrefix": "Dr.",
          "honorificSuffix": "PhD",
          "image": {
            "@type": "ImageObject",
            "url": "https://www.drtroywilliams.net/lovable-uploads/troy-williams-headshot-transparent.png",
            "width": 400,
            "height": 400,
            "caption": "Dr. Troy Williams, PhD - Cybersecurity Engineer and AI Scientist"
          },
          "jobTitle": [
            "Cybersecurity Engineer",
            "Artificial Intelligence Scientist",
            "Licensed Tennessee Private Investigator",
            "Founder & Chief Intelligence Architect at Cybersmarts.ai",
            "National Fraud Prevention Architect",
            "U.S. Sovereign Technology Developer"
          ],
          "url": "https://www.drtroywilliams.net",
          "description": "Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. As a Licensed Tennessee Private Investigator and independent researcher, he is dedicated to securing America's digital future through sovereign technology. His research and publications are independently developed and published.",
          "sameAs": [
            "https://www.linkedin.com/in/cybersmarts/",
            "https://www.researchgate.net/profile/Troy-Williams-34",
            "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6aboratory",
            "https://scholar.google.com/citations?user=troy-williams",
            "https://www.wikidata.org/wiki/Q136302603"
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "name": "Master of Science in IT Management",
              "credentialCategory": "Master's Degree",
              "educationalLevel": "Graduate",
              "dateCreated": "2020",
              "recognizedBy": { "@type": "EducationalOrganization", "name": "Western Governors University" }
            },
            {
              "@type": "EducationalOccupationalCredential",
              "name": "Bachelor of Science in Cybersecurity & Information Assurance",
              "credentialCategory": "Bachelor's Degree",
              "educationalLevel": "Undergraduate",
              "dateCreated": "2019",
              "recognizedBy": { "@type": "EducationalOrganization", "name": "Western Governors University" }
            },
            {
              "@type": "EducationalOccupationalCredential",
              "name": "Prompt Engineering Certification",
              "credentialCategory": "Professional Certification",
              "recognizedBy": { "@type": "EducationalOrganization", "name": "Vanderbilt University" }
            },
            {
              "@type": "EducationalOccupationalCredential",
              "name": "Licensed Private Investigator",
              "credentialCategory": "Professional License",
              "recognizedBy": { "@type": "GovernmentOrganization", "name": "State of Tennessee" }
            }
          ],
          "alumniOf": [
            { "@type": "EducationalOrganization", "name": "Western Governors University" }
          ],
          "award": [
            "Patent PCT/US25/43982 - Synthetic Identity Detection Methodology",
            "Governor Bill Lee Recognition - State Security Contributions"
          ],
          "knowsAbout": [
            "Cybersecurity", "Artificial Intelligence", "Synthetic Identity Fraud",
            "Fraud Detection", "Machine Learning", "Information Security",
            "Private Investigation", "Post-Quantum Cryptography", "Behavioral Intelligence"
          ],
          "owns": [
            { "@type": "Product", "name": "PatriotProof™", "description": "Fortress-level national identity and fraud defense system" },
            { "@type": "Product", "name": "FraudDNA™", "description": "Pattern analysis engine for synthetic identity detection" },
            { "@type": "Product", "name": "AISF™", "description": "Autonomous Intelligence Security Framework" },
            { "@type": "Product", "name": "PPP™", "description": "Proactive Prevention Platform" },
            { "@type": "Product", "name": "ScamAtlas™", "description": "Interactive threat intelligence mapping system" }
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Cybersmarts.ai LLC",
            "url": "https://www.drtroywilliams.net"
          },
          "memberOf": [
            { "@type": "LibrarySystem", "name": "Wilson County Public Library", "url": "https://wilsoncopublib.org" }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lebanon",
            "addressRegion": "Tennessee",
            "addressCountry": "US"
          },
          "nationality": { "@type": "Country", "name": "United States" }
        })}
      </script>
      
      <PersonSchema 
        name="Dr. Troy Williams"
        jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority"
        description="Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. As a Licensed Tennessee Private Investigator and independent researcher, he is dedicated to securing America's digital future. His research and publications are independently developed and published."
        alumniOf={["Western Governors University"]}
        sameAs={["https://www.linkedin.com/in/cybersmarts/", "https://twitter.com/troywilliams"]}
      />
      
      <SeasonalBanner />
      <NavBar />
      
      <div className="pt-20">
        <PageBreadcrumb pageName="About" />
      </div>
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4">About Dr. Troy Williams</h1>
                <p className="text-xl text-gray-600 italic">"I'm not ahead of the curve — I am the curve."</p>
              </div>
              
              {/* Professional Photo */}
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/troy-williams-headshot-transparent.png"
                    alt="Dr. Troy Williams, PhD - Cybersecurity Engineer and AI Scientist"
                    title="Dr. Troy Williams, PhD - Founder of Cybersmarts.ai"
                    className="w-80 h-80 object-cover rounded-xl shadow-2xl border-4 border-white"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Legacy Statement Card - NEW */}
          <Card className="mb-12 border-2 border-[#B22234] bg-gradient-to-br from-white to-red-50">
            <CardHeader className="bg-gradient-to-r from-[#3C3B6E] to-[#B22234] text-white">
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-6 w-6" />
                <h2>Mission & Legacy</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <blockquote className="text-lg italic text-[#1A1F2C] mb-4 leading-relaxed">
                "I dedicate my life's work to defining a new era of sovereign, ethical technology—built not to follow fleeting trends but to lead with unyielding principles. My legacy is a future where fraud is not merely reacted to but proactively prevented, where national security stands fortified by American-made innovation, and where artificial intelligence serves humanity without ever compromising privacy, trust, or liberty."
              </blockquote>
              <p className="text-gray-700">
                Dr. Williams is committed to completing the unfinished work of AI and cybersecurity pioneers, 
                advancing the legacy of visionaries like Alan Turing, Claude Shannon, and John McCarthy through 
                modern, sovereign technology solutions.
              </p>
            </CardContent>
          </Card>

          {/* Introduction */}
          <div className="prose max-w-none mb-16">
            <p className="text-lg mb-8">
              Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. He's built his career on one mission: protecting America through technology.
            </p>
            <p className="text-lg mb-8">
              As Dr. Troy Williams — a <strong>Licensed Tennessee Private Investigator</strong>, an independent researcher with doctoral-level expertise in artificial intelligence and cybersecurity, a published author, and the founder of Cybersmarts.ai, a nonprofit organization advancing national AI security, ethical tech development, and digital sovereignty, he is dedicated to securing America's digital future.
            </p>
          </div>

          {/* Professional Credentials Card */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <h2>Professional Credentials of Dr. Troy Williams</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Dr. Troy Williams' professional credentials include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Licensed Tennessee Private Investigator</li>
                <li>Doctoral-level research in artificial intelligence and cybersecurity</li>
                <li>Over 32 years of investigative and cybersecurity experience in Lebanon, Tennessee</li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Verified identity:</strong> <a href="https://www.wikidata.org/wiki/Q136302603" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Wikidata Profile</a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <h2>Education Background of Dr. Troy Williams</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Dr. Troy Williams' journey began in electronics and evolved into cybersecurity and AI architecture. His academic background includes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Doctoral-level research in artificial intelligence and cybersecurity</li>
                <li>Master's in IT Management – Western Governors University</li>
                <li>Bachelor's in Cybersecurity & Information Assurance – WGU</li>
                <li>Associate's in Electronics</li>
              </ul>
              <p className="mt-4">
                Over three decades, Dr. Troy Williams has led private investigations in Tennessee, developed digital forensics protocols, conducted fraud detection at scale, and now — builds AI systems designed to outthink cyber adversaries before they strike.
              </p>
            </CardContent>
          </Card>

          {/* Cybersmarts.ai */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6" />
                <h2>Dr. Troy Williams: Founder of Cybersmarts.ai</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                As Founder and Chief Intelligence Architect at Cybersmarts.ai in Lebanon, Tennessee, Dr. Troy Williams designed the Autonomous Intelligence Security Framework (AISF™) and Proactive Prevention Platform (PPP™) — two groundbreaking systems that power PatriotProof™, a U.S.-only fraud defense SaaS platform built for agencies, law enforcement, and enterprise clients.
              </p>
              <p className="mb-4">
                Cybersmarts.ai is more than a nonprofit — it's a national movement for ethical, secure, and sovereign artificial intelligence led by Dr. Troy Williams.
              </p>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Revolutionary Platforms:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>PatriotProof™</strong> - U.S.-only fraud defense platform</li>
                  <li><strong>AISF™</strong> - Autonomous Intelligence Security Framework</li>
                  <li><strong>PPP™</strong> - Proactive Prevention Platform</li>
                  <li><strong>FraudDNA™</strong> - Advanced fraud detection system</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Publications */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6" />
                <h2>Books by Dr. Troy Williams</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Dr. Troy Williams has authored multiple books on AI, cybersecurity, and investigative ethics — including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Unveiling Privacy</li>
                <li>The Quantum Guard</li>
                <li>Zero Trust Proactive Cybersecurity</li>
                <li>CyberPsychology and Our Children</li>
                <li>Stolen Nation: How to Protect Your Money, Credit, and Identity from Hackers, Scammers, and Foreign Exploiters (Coming Soon)</li>
              </ul>
              <p className="mt-4">These works reflect Dr. Troy Williams' belief that knowledge should not just inform — it should defend.</p>
              <p className="mt-4 font-semibold text-[#3C3B6E]">My research and publications are independently developed and published.</p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-6 w-6" />
                <h2>Dr. Troy Williams: Built for America. By Americans.</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Dr. Troy Williams' work is not for sale to foreign governments or corporations. Everything he builds is protected, patented, and distributed only within the United States. He works privately for the protection of the people and systems he serves in Tennessee and across America.
              </p>
              <p className="mb-4">
                Dr. Troy Williams mentors veterans, students, and professionals through the Tennessee Promise, WGU Alumni Network, and personal outreach — with the singular focus of developing the next generation of digital defenders.
              </p>
              <p className="italic text-lg text-gray-600 mt-6">
                "I'm not just leading. I'm rewriting the playbook." - Dr. Troy Williams
              </p>
              <p className="mt-4 text-center font-semibold">
                Welcome to the future of national security. Welcome to Dr. Troy Williams' legacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
