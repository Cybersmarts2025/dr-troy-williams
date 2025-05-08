
import React from 'react';
import { Helmet } from "react-helmet-async";
import { Shield, Lock, CheckSquare, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";

const AISF = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Helmet>
        <title>AISF™ - Autonomous Intelligence Security Framework | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Explore the Autonomous Intelligence Security Framework (AISF™) - A groundbreaking framework for proactive AI-driven security systems by Dr. Troy Williams." 
        />
      </Helmet>
      
      {/* Schema.org markup for this webpage */}
      <WebPageSchema 
        name="AISF™ - Autonomous Intelligence Security Framework"
        description="The Autonomous Intelligence Security Framework (AISF™) is a pioneering research initiative led by Dr. Troy Williams to define a new national standard for artificial intelligence security, privacy, and operational integrity."
        url="https://drtroywilliams.com/aisf"
      />
      
      {/* Schema.org breadcrumb markup */}
      <BreadcrumbListSchema 
        items={[
          { name: "Home", item: "https://drtroywilliams.com" },
          { name: "AISF™", item: "https://drtroywilliams.com/aisf" }
        ]}
      />
      
      <NavBar />
      
      <div className="pt-20">
        <PageBreadcrumb pageName="AISF™" />
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-[#3C3B6E]">
              Autonomous Intelligence Security Framework (AISF™)
            </h1>
            <p className="text-xl text-gray-600">
              A Groundbreaking Framework for Proactive AI-Driven Security Systems
            </p>
          </div>

          <div className="prose max-w-none mb-12">
            <p className="text-lg mb-8">
              The Autonomous Intelligence Security Framework (AISF™) is a pioneering research initiative led by Dr. Troy Williams to define a new national standard for artificial intelligence security, privacy, and operational integrity. This framework represents a paradigm shift from reactive defense models to autonomous, proactive, and self-regulating AI systems — purpose-built to secure critical infrastructure, financial systems, legal processes, and government operations in real time.
            </p>
            <p className="text-lg mb-12">
              AISF™ is not just a theoretical model — it is a living, adaptive framework capable of embedding intelligence into the very core of AI deployments. It enables systems to detect anomalies, defend themselves against threats, and self-correct when biases, privacy risks, or compliance violations are detected — without waiting for human intervention.
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-[#B22234]" />
                <h2>What Makes AISF™ Revolutionary</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Proactive AI Defense:</strong> Predicts and prevents threats before exploitation occurs using autonomous threat modeling and behavioral analysis.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Built-In Legal and Ethical Enforcement:</strong> Enforces bias, privacy, and compliance standards automatically through its integrated BPEEL (Bias, Privacy, Ethics Enforcement Layer).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Zero Trust Architecture:</strong> Operates on a continuous verification model — never assuming identity, access, or input is safe until proven.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Post-Quantum Ready:</strong> Engineered with encryption and security protocols capable of resisting quantum-level decryption.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>U.S.-Only Implementation:</strong> Deployed exclusively for American agencies, enterprises, and infrastructures — protecting national interests with constitutional integrity.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-[#B22234]" />
                <h2>AISF™ in Action</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">AISF™ powers multiple secure systems under development including:</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>PatriotProof™:</strong> A financial fraud and identity protection SaaS
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>The AI Constitution:</strong> Ethics-first AI policy modeling
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>U.S. AI Cloud Registry:</strong> A blockchain registry for approved AI systems
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Digital Border Wall:</strong> An AI-powered perimeter defense model against foreign cyber infiltration
                  </div>
                </li>
              </ul>
              <p className="mt-4">
                AISF™ ensures every agent, model, and subsystem is continuously monitored, explainable, and aligned with American security values.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#B22234]" />
                <h2>Built for the Future of American AI</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                AISF™ is the foundation of a safer, smarter, and more sovereign AI ecosystem. Whether embedded in fraud detection, autonomous compliance, or national threat forecasting, AISF™ delivers trust, transparency, and tactical advantage in an evolving digital battlefield.
              </p>
              <blockquote className="border-l-4 border-[#B22234] pl-4 italic mt-6">
                "AISF™ isn't software. It's a standard. A shield. A silent guardian for the future of American AI."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AISF;
