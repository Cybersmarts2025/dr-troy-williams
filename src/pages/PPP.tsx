
import React from 'react';
import { Helmet } from "react-helmet-async";
import { Shield, Lock, CheckSquare, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";

const PPP = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Helmet>
        <title>PPP™ - Proactive Prevention Platform | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Discover the Proactive Prevention Platform (PPP™) - A novel approach to fraud prevention using predictive AI models by Dr. Troy Williams." 
        />
      </Helmet>
      
      {/* Schema.org markup for this webpage */}
      <WebPageSchema 
        name="PPP™ - Proactive Prevention Platform"
        description="The Proactive Prevention Platform (PPP™) is a revolutionary AI-powered defense framework engineered to eliminate fraud before it occurs, developed by Dr. Troy Williams."
        url="https://drtroywilliams.com/ppp"
      />
      
      {/* Schema.org breadcrumb markup */}
      <BreadcrumbListSchema 
        items={[
          { name: "Home", item: "https://drtroywilliams.com" },
          { name: "PPP™", item: "https://drtroywilliams.com/ppp" }
        ]}
      />
      
      <NavBar />
      
      <div className="pt-20">
        <PageBreadcrumb pageName="PPP™" />
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-[#3C3B6E]">
              Proactive Prevention Platform (PPP™)
            </h1>
            <p className="text-xl text-gray-600">
              A Novel Approach to Fraud Prevention Using Predictive AI Models
            </p>
          </div>

          <div className="prose max-w-none mb-12">
            <p className="text-lg mb-8">
              The Proactive Prevention Platform (PPP™) is a revolutionary AI-powered defense framework engineered to eliminate fraud before it occurs. Developed by Dr. Troy Williams as a core component of the national security-aligned Cybersmarts.ai ecosystem, PPP™ redefines what it means to secure data, identity, and digital systems in real time.
            </p>
            <p className="text-lg mb-12">
              Where legacy fraud systems operate reactively—detecting after damage is done—PPP™ leverages predictive modeling, behavioral pattern recognition, and intent analysis to stop fraud attempts midstream. It's more than protection. It's anticipation.
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-[#B22234]" />
                <h2>What Makes PPP™ Unique</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Real-Time Behavioral Analytics:</strong> Detects deviations in user, device, or transaction behavior to forecast potential threats.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Intent Scoring Engine:</strong> Assigns risk values to every action based on observed digital intent—not just metadata or transaction size.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Multi-Layered AI Agents:</strong> Deploys autonomous micro-agents that handle fraud detection, user trust validation, compliance alignment, and anomaly investigation simultaneously.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Plug-and-Protect Architecture:</strong> Built to integrate with existing payment, identity, or data infrastructure with minimal disruption.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>
                    <strong>Fully Governed by AISF™:</strong> Every fraud check and prevention signal is routed through the Autonomous Intelligence Security Framework for compliance, bias mitigation, and security validation.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-[#B22234]" />
                <h2>Predictive AI That Knows Before You Do</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">PPP™ is designed to operate ahead of human decision-making. Its models learn from thousands of real-time inputs—including location, timing, device fingerprinting, digital behavior, and transaction context—to autonomously:</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>Flag suspicious actions before they escalate</div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>Suspend or slow down potentially compromised sessions</div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>Route critical events to internal agents or humans as needed</div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-5 w-5 mt-1 text-[#3C3B6E]" />
                  <div>Self-correct false positives based on adaptive feedback loops</div>
                </li>
              </ul>
              <p className="mt-4">This means fewer missed threats, fewer false alarms, and vastly reduced fraud losses.</p>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#B22234]" />
                <h2>American Security, U.S.-Only Deployment</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                PPP™ is built in Tennessee and deployed exclusively to U.S. citizens, businesses, law enforcement, and federal systems. It operates with embedded geofencing, domain filtering, and encrypted agent validation to ensure no foreign entity can access, license, or replicate the framework.
              </p>
              <p className="mb-4">It is the predictive foundation of:</p>
              <ul className="space-y-2">
                <li>• PatriotProof™ — U.S. fraud defense SaaS</li>
                <li>• Digital Border Wall™ — Infrastructure-level threat prediction</li>
                <li>• National Threat Forecasting System — Large-scale AI risk mapping</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-[#B22234]" />
                <h2>Redefining the Future of Fraud Defense</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                PPP™ is not an upgrade to fraud detection — it's a replacement for it. It represents a total evolution toward predictive, autonomous, and American-first digital protection.
              </p>
              <blockquote className="border-l-4 border-[#B22234] pl-4 italic mt-6">
                "They act. We predict. They adapt. We preempt. That's the power of PPP™."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PPP;
