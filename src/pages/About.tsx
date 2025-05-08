
import React from 'react';
import { Book, GraduationCap, Briefcase, Flag, Brain, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import NavBar from "@/components/NavBar";
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
      
      {/* Schema.org markup for Dr. Troy Williams with more detailed information */}
      <PersonSchema 
        name="Dr. Troy Williams"
        jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority"
        description="Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. As a Licensed Tennessee Private Investigator, a Ph.D. in Artificial Intelligence, and the founder of Cybersmarts.ai, he is dedicated to securing America's digital future."
        alumniOf={["Capitol Technology University", "Western Governors University"]}
        sameAs={["https://www.linkedin.com/in/troywilliams", "https://twitter.com/troywilliams"]}
      />
      
      <NavBar />
      
      <div className="pt-20">
        <PageBreadcrumb pageName="About" />
      </div>
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About Dr. Troy Williams</h1>
            <p className="text-xl text-gray-600 italic">"I'm not ahead of the curve — I am the curve."</p>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none mb-16">
            <p className="text-lg mb-8">
              Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. He's built his career on one mission: protecting America through technology.
            </p>
            <p className="text-lg mb-8">
              As Dr. Troy Williams — a Ph.D. in Artificial Intelligence, a <strong>Licensed Tennessee Private Investigator</strong>, a published author, and the founder of Cybersmarts.ai, a nonprofit organization advancing national AI security, ethical tech development, and digital sovereignty, he is dedicated to securing America's digital future.
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
                <li>Ph.D. in Artificial Intelligence</li>
                <li>Over 32 years of investigative and cybersecurity experience in Lebanon, Tennessee</li>
              </ul>
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
              <p className="mb-4">Dr. Troy Williams' journey began in electronics and evolved into cybersecurity and AI architecture. He holds degrees in:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ph.D. in Artificial Intelligence – Capitol Technology University</li>
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
              <p>
                Cybersmarts.ai is more than a nonprofit — it's a national movement for ethical, secure, and sovereign artificial intelligence led by Dr. Troy Williams.
              </p>
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
                Dr. Troy Williams' work is not for sale to foreign governments or corporations. Everything he builds is protected, patented, and distributed only within the United States. He works privately — no public appearances — for the protection of the people and systems he serves in Tennessee and across America.
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
