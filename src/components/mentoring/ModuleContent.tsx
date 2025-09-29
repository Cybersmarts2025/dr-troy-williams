import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, FileText, Target, BookOpen, AlertTriangle, Users, Shield } from "lucide-react";

interface ModuleContentProps {
  moduleId: number;
}

const ModuleContent = ({ moduleId }: ModuleContentProps) => {
  const getModuleData = (id: number) => {
    switch (id) {
      case 0:
        return {
          title: "Orientation",
          duration: "15–20 min",
          goal: "Give every student the same foundation before they reference your systems",
          sections: [
            {
              title: "Watch/Read (10 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">The Five Pillars of Proactive Security</h4>
                  <div className="bg-gradient-to-r from-[#B22234]/5 to-[#3C3B6E]/5 p-4 rounded-lg">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li><strong>Detection:</strong> Identify threats before they become incidents</li>
                      <li><strong>Prevention:</strong> Stop attacks at their source</li>
                      <li><strong>Response:</strong> React swiftly to minimize damage</li>
                      <li><strong>Recovery:</strong> Restore systems and learn from incidents</li>
                      <li><strong>Education:</strong> Build security awareness across all stakeholders</li>
                    </ol>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Welcome Message from Dr. Troy Williams:</h5>
                    <p className="text-sm italic">
                      "Welcome to Cybersmarts.ai Mentorship. This program will transform how you think about cybersecurity—moving from reactive fixes to proactive protection. Every module builds practical skills you'll use to defend America's digital infrastructure. Let's start strong."
                    </p>
                  </div>
                </div>
              )
            },
            {
              title: "Do (5–10 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Purpose Statement Template</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm mb-3">Write 4 sentences (≤100 words total):</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>1. Who I am:</strong> [Your background/role]</p>
                      <p><strong>2. What I value:</strong> [Your core principles]</p>
                      <p><strong>3. What I will build:</strong> [Your security goals]</p>
                      <p><strong>4. Why security first:</strong> [Your motivation]</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Example:</h5>
                    <p className="text-sm">
                      "I am a cybersecurity analyst protecting critical infrastructure. I value proactive defense and ethical responsibility. I will build robust security frameworks that prevent attacks before they occur. Security comes first because every vulnerability we miss puts American lives and liberty at risk."
                    </p>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "Purpose Statement (≤100 words)",
          rubric: [
            { criteria: "Clarity", points: 3, description: "Statement is clear and well-articulated" },
            { criteria: "Relevance to security", points: 3, description: "Directly connects to cybersecurity mission" },
            { criteria: "Brevity", points: 2, description: "Stays within 100-word limit" },
            { criteria: "Tone/Professionalism", points: 2, description: "Appropriate professional tone" }
          ]
        };

      case 1:
        return {
          title: "FraudDNA™ - Detect & Prevent Synthetic Identities",
          duration: "25–45 min",
          goal: "Shows how fraud starts and how to stop it early",
          sections: [
            {
              title: "Learn (10–15 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">What is FraudDNA™?</h4>
                  <p className="text-sm">FraudDNA™ is a comprehensive framework for detecting synthetic identity fraud by analyzing digital fingerprints across multiple signal categories.</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Why Synthetic IDs Happen</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Credit file manipulation</li>
                        <li>SSN recycling</li>
                        <li>Document fabrication</li>
                        <li>Identity mixing</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Signal Categories</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>Device:</strong> Browser, OS, screen resolution</li>
                        <li><strong>Behavior:</strong> Typing speed, mouse patterns</li>
                        <li><strong>Velocity:</strong> Application frequency, timing</li>
                        <li><strong>Document:</strong> Image quality, metadata</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h5 className="font-medium mb-2">Mini-Case Study:</h5>
                    <p className="text-sm">
                      <strong>Scenario:</strong> Loan application with clean credit file, recycled phone number, new device fingerprint, and 3 applications submitted within 24 hours.
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Red Flags:</strong> Velocity anomaly, device inconsistency, phone recycling pattern
                    </p>
                  </div>
                </div>
              )
            },
            {
              title: "Try (10–15 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Fraud Detection Worksheet</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">Analyze These Signals:</h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <strong>Application #1:</strong> New device, pristine credit score (850), phone number registered yesterday
                          <div className="text-xs text-gray-600 mt-1">Suspicious? Why?</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <strong>Application #2:</strong> Returning customer device, consistent behavior, gradual credit improvement
                          <div className="text-xs text-gray-600 mt-1">Suspicious? Why?</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <strong>Application #3:</strong> Mobile device, perfect typing speed, document uploaded in under 10 seconds
                          <div className="text-xs text-gray-600 mt-1">Suspicious? Why?</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Pattern Mapping Exercise</h5>
                    <p className="text-sm mb-3">Create a 3-box diagram for each suspicious signal:</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="bg-white p-2 border rounded">Signal</div>
                      <span>→</span>
                      <div className="bg-white p-2 border rounded">Pattern</div>
                      <span>→</span>
                      <div className="bg-white p-2 border rounded">Action</div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Actions: Deny, Challenge (step-up auth), Report to authorities</p>
                  </div>
                </div>
              )
            },
            {
              title: "Show (10–15 min)",
              icon: FileText,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Fraud Signature Brief Template</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">1-Page Brief Structure:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Executive Summary (2-3 sentences)</strong>
                        <p className="text-xs text-gray-600">Brief overview of the fraud pattern detected</p>
                      </div>
                      <div>
                        <strong>Three Strongest Signals</strong>
                        <ol className="list-decimal list-inside text-xs text-gray-600 ml-4">
                          <li>Signal 1: [Description] - Risk Level: High/Medium/Low</li>
                          <li>Signal 2: [Description] - Risk Level: High/Medium/Low</li>
                          <li>Signal 3: [Description] - Risk Level: High/Medium/Low</li>
                        </ol>
                      </div>
                      <div>
                        <strong>Recommended Control</strong>
                        <p className="text-xs text-gray-600">Specific action to prevent/mitigate this fraud type</p>
                      </div>
                      <div>
                        <strong>Implementation Notes</strong>
                        <p className="text-xs text-gray-600">Technical requirements, timeline, success metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "1-page Fraud Signature Brief with 3 strongest signals and recommended control",
          rubric: [
            { criteria: "Accuracy", points: 4, description: "Correctly identifies fraud signals and patterns" },
            { criteria: "Actionability", points: 3, description: "Provides clear, implementable recommendations" },
            { criteria: "Clarity", points: 2, description: "Well-organized and easy to understand" },
            { criteria: "Ethics note", points: 1, description: "Addresses ethical considerations" }
          ]
        };

      case 2:
        return {
          title: "AISF™ - Autonomous Intelligence Security Framework",
          duration: "25–45 min",
          goal: "Turns 'never trust, always verify' into a practical checklist",
          sections: [
            {
              title: "Learn (10–15 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Zero-Trust Principles</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Core Concepts</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>Trust Boundaries:</strong> No implicit trust zones</li>
                        <li><strong>Device Posture:</strong> Continuous health assessment</li>
                        <li><strong>Least Privilege:</strong> Minimum necessary access</li>
                        <li><strong>Continuous Verification:</strong> Ongoing authentication</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Implementation Layers</h5>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Identity verification</li>
                        <li>Device compliance</li>
                        <li>Application security</li>
                        <li>Data protection</li>
                        <li>Network segmentation</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h5 className="font-medium mb-2">Mini-Case Study:</h5>
                    <p className="text-sm">
                      <strong>Scenario:</strong> Contractor laptop + unknown USB device + cloud admin portal access attempt
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Zero-Trust Response:</strong> Device quarantine → USB policy enforcement → Privilege verification → Access denial until compliance
                    </p>
                  </div>
                </div>
              )
            },
            {
              title: "Try (10–15 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Zero-Trust Hardening Checklist</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">12 Essential Controls (Choose 5 to prioritize):</h5>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Automatic patching</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Full disk encryption</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Multi-factor authentication</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>USB device policy</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Endpoint detection & response</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Network segmentation</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Privileged access management</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Application allowlisting</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Security event logging</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Remote wipe capability</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Certificate-based authentication</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>Continuous compliance monitoring</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Implementation Priority Exercise</h5>
                    <p className="text-sm mb-3">Justify your order of implementation (1-5) considering:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Cost vs. impact</li>
                      <li>Technical complexity</li>
                      <li>User adoption difficulty</li>
                      <li>Threat landscape priorities</li>
                    </ul>
                  </div>
                </div>
              )
            },
            {
              title: "Show (10–15 min)",
              icon: FileText,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Zero-Trust Quick Wins Template</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">1-Page Implementation Plan:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Team Context</strong>
                        <p className="text-xs text-gray-600">Small team device rollout scenario</p>
                      </div>
                      <div>
                        <strong>Priority Controls (Top 5)</strong>
                        <ol className="list-decimal list-inside text-xs text-gray-600 ml-4">
                          <li>Control 1: [Name] - Why first? Timeline? Cost?</li>
                          <li>Control 2: [Name] - Why second? Dependencies?</li>
                          <li>Control 3-5: [Brief descriptions]</li>
                        </ol>
                      </div>
                      <div>
                        <strong>Implementation Timeline</strong>
                        <p className="text-xs text-gray-600">Week-by-week rollout plan</p>
                      </div>
                      <div>
                        <strong>Success Metrics</strong>
                        <p className="text-xs text-gray-600">Measurable outcomes and compliance targets</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "1-page Zero-Trust Quick Wins for small team device rollout",
          rubric: [
            { criteria: "Prioritization", points: 4, description: "Logical order based on risk and feasibility" },
            { criteria: "Feasibility", points: 3, description: "Realistic for small team implementation" },
            { criteria: "Completeness", points: 2, description: "Covers all key elements" },
            { criteria: "Plain language", points: 1, description: "Accessible to non-technical stakeholders" }
          ]
        };

      // Continue with other modules...
      default:
        return {
          title: "Module Content",
          duration: "25–45 min",
          goal: "Module content coming soon",
          sections: [],
          deliverable: "TBD",
          rubric: []
        };
    }
  };

  const moduleData = getModuleData(moduleId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Module Header */}
      <Card className="border border-[#B22234]/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-[#3C3B6E]">
              Module {moduleId}: {moduleData.title}
            </CardTitle>
            <Badge variant="outline" className="text-[#B22234] border-[#B22234]">
              <Clock className="h-3 w-3 mr-1" />
              {moduleData.duration}
            </Badge>
          </div>
          <p className="text-gray-700">{moduleData.goal}</p>
        </CardHeader>
      </Card>

      {/* Module Sections */}
      <Accordion type="single" collapsible className="space-y-4">
        {moduleData.sections.map((section, index) => (
          <AccordionItem 
            key={index} 
            value={`section-${index}`}
            className="border border-[#B22234]/20 rounded-lg"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] p-2 rounded-full">
                  <section.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-[#3C3B6E]">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Deliverable & Rubric */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-[#B22234]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#3C3B6E] flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Deliverable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{moduleData.deliverable}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#B22234]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#3C3B6E] flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Rubric (10 Points)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {moduleData.rubric.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="font-medium">{item.criteria}</span>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                  <Badge variant="secondary" className="bg-[#3C3B6E]/10 text-[#3C3B6E]">
                    {item.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ModuleContent;