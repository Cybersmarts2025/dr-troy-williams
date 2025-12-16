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

      case 3:
        return {
          title: "PPP™ - Proactive Prevention Platform",
          duration: "25–45 min", 
          goal: "Proves speed beats attackers through automated invalidation",
          sections: [
            {
              title: "Learn (10–15 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Automated Invalidation Strategy</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Compromise Scenarios</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>API keys exposed in public repos</li>
                        <li>Session tokens intercepted</li>
                        <li>OAuth refresh tokens stolen</li>
                        <li>Database credentials leaked</li>
                        <li>SSL certificates compromised</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Invalidation Targets</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>Tokens:</strong> JWT, OAuth, session IDs</li>
                        <li><strong>Keys:</strong> API keys, encryption keys</li>
                        <li><strong>Links:</strong> Reset URLs, magic links</li>
                        <li><strong>Certificates:</strong> SSL/TLS, client certs</li>
                        <li><strong>Access:</strong> VPN connections, SSH keys</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h5 className="font-medium mb-2">Mini-Case Study:</h5>
                    <p className="text-sm">
                      <strong>Scenario:</strong> Leaked API key discovered on GitHub public repository at 2:03 AM EST
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Critical Timeline:</strong> Detection (2:03) → Alert (2:04) → Invalidation (2:05) → Rotation (2:08) → Notification (2:10)
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Speed Requirements</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>Critical assets:</strong> &lt;5 minutes from detection</p>
                      <p><strong>High-value assets:</strong> &lt;15 minutes from detection</p>
                      <p><strong>Standard assets:</strong> &lt;1 hour from detection</p>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Try (10–15 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Kill-Switch SOP Development</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">5-Step Kill-Switch Flow:</h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-red-100 px-3 py-1 rounded-full font-medium">1</div>
                        <div>
                          <strong>Detect</strong>
                          <p className="text-xs text-gray-600">Automated monitoring triggers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-orange-100 px-3 py-1 rounded-full font-medium">2</div>
                        <div>
                          <strong>Revoke</strong>
                          <p className="text-xs text-gray-600">Immediate access termination</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-yellow-100 px-3 py-1 rounded-full font-medium">3</div>
                        <div>
                          <strong>Rotate</strong>
                          <p className="text-xs text-gray-600">Generate new credentials</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-blue-100 px-3 py-1 rounded-full font-medium">4</div>
                        <div>
                          <strong>Notify</strong>
                          <p className="text-xs text-gray-600">Alert stakeholders</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-green-100 px-3 py-1 rounded-full font-medium">5</div>
                        <div>
                          <strong>Monitor</strong>
                          <p className="text-xs text-gray-600">Verify effectiveness</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Asset Selection Exercise</h5>
                    <p className="text-sm mb-3">Choose one asset type to develop your SOP:</p>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="asset" />
                        <span>API Key (AWS, Azure, GCP)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="asset" />
                        <span>SSO Token (SAML, OIDC)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="asset" />
                        <span>Database Credentials</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="asset" />
                        <span>SSH Private Key</span>
                      </label>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Show (10–15 min)",
              icon: FileText,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Kill-Switch SOP Template</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">1-Page SOP Structure:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Asset Information</strong>
                        <p className="text-xs text-gray-600">Type, criticality level, current usage</p>
                      </div>
                      <div>
                        <strong>Trigger Conditions</strong>
                        <p className="text-xs text-gray-600">Specific events that activate the kill-switch</p>
                      </div>
                      <div>
                        <strong>Owner/On-Call</strong>
                        <p className="text-xs text-gray-600">Primary and backup contacts with escalation path</p>
                      </div>
                      <div>
                        <strong>Time Targets</strong>
                        <p className="text-xs text-gray-600">Maximum response times for each step</p>
                      </div>
                      <div>
                        <strong>Execution Steps</strong>
                        <p className="text-xs text-gray-600">Detailed procedures with commands/APIs</p>
                      </div>
                      <div>
                        <strong>Success Metrics</strong>
                        <p className="text-xs text-gray-600">How to verify successful invalidation</p>
                      </div>
                      <div>
                        <strong>Recovery Plan</strong>
                        <p className="text-xs text-gray-600">Steps to restore normal operations</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "1-page Kill-Switch SOP with triggers, owners, time targets, and success metrics",
          rubric: [
            { criteria: "Speed focus", points: 3, description: "Clear emphasis on rapid response times" },
            { criteria: "Clear triggers", points: 3, description: "Specific, actionable trigger conditions" },
            { criteria: "Roles/owners", points: 2, description: "Defined responsibilities and escalation" },
            { criteria: "Metrics", points: 2, description: "Measurable success indicators" }
          ]
        };

      case 4:
        return {
          title: "PatriotProof™ - Cryptographic Identity & Trust",
          duration: "25–45 min",
          goal: "Anchors identity to cryptography, not guesswork",
          sections: [
            {
              title: "Learn (10–15 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Cryptographic Identity Framework</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Identity Components</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>Device Keys:</strong> Hardware-backed private keys</li>
                        <li><strong>Certificates:</strong> X.509 identity certificates</li>
                        <li><strong>MFA Factors:</strong> Something you know/have/are</li>
                        <li><strong>Behavioral Biometrics:</strong> Typing patterns, gestures</li>
                        <li><strong>Trust Score:</strong> Dynamic risk assessment</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Trust Scoring Factors</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Device registration history</li>
                        <li>Certificate validity and chain</li>
                        <li>Behavioral consistency</li>
                        <li>Geographic anomalies</li>
                        <li>Time-based patterns</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h5 className="font-medium mb-2">Mini-Case Study:</h5>
                    <p className="text-sm">
                      <strong>Scenario:</strong> VIP account login from familiar city but unknown device fingerprint, valid certificate but no behavioral baseline
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Trust Analysis:</strong> Location ✓ | Device ✗ | Certificate ✓ | Behavior ? → Step-up authentication required
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Cryptographic Trust Levels</h5>
                    <div className="space-y-1 text-sm">
                      <p><strong>Level 1:</strong> Password + SMS (Weak)</p>
                      <p><strong>Level 2:</strong> Hardware token + PIN (Medium)</p>
                      <p><strong>Level 3:</strong> Device certificate + biometric (Strong)</p>
                      <p><strong>Level 4:</strong> HSM-backed key + multi-factor (Very Strong)</p>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Try (10–15 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Identity Decision Matrix</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">Trust Decision Framework:</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-white">
                            <th className="border p-2 text-left">Device Known?</th>
                            <th className="border p-2 text-left">Factor Strength</th>
                            <th className="border p-2 text-left">Cert Valid?</th>
                            <th className="border p-2 text-left">Anomaly?</th>
                            <th className="border p-2 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr>
                            <td className="border p-2">✓ Yes</td>
                            <td className="border p-2">Strong</td>
                            <td className="border p-2">✓ Yes</td>
                            <td className="border p-2">✗ None</td>
                            <td className="border p-2 bg-green-50">Allow</td>
                          </tr>
                          <tr>
                            <td className="border p-2">✗ No</td>
                            <td className="border p-2">Weak</td>
                            <td className="border p-2">? Unknown</td>
                            <td className="border p-2">⚠ Location</td>
                            <td className="border p-2 bg-red-50">Deny</td>
                          </tr>
                          <tr>
                            <td className="border p-2">✓ Yes</td>
                            <td className="border p-2">Medium</td>
                            <td className="border p-2">✓ Yes</td>
                            <td className="border p-2">⚠ Time</td>
                            <td className="border p-2 bg-yellow-50">Step-up</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Complete the matrix with additional scenarios</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">VIP Account Scenarios</h5>
                    <p className="text-sm mb-3">Analyze these high-value access attempts:</p>
                    <div className="space-y-2 text-xs">
                      <div className="bg-white p-2 rounded border-l-4 border-blue-400">
                        <strong>Scenario A:</strong> CEO login, personal device, expired certificate, off-hours
                      </div>
                      <div className="bg-white p-2 rounded border-l-4 border-green-400">
                        <strong>Scenario B:</strong> CFO login, corporate device, valid certificate, normal hours
                      </div>
                      <div className="bg-white p-2 rounded border-l-4 border-yellow-400">
                        <strong>Scenario C:</strong> CTO login, new device, valid certificate, foreign country
                      </div>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Show (10–15 min)",
              icon: FileText,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Trust Policy Slide Template</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">1-Slide Trust Policy for VIP Logins:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Policy Title</strong>
                        <p className="text-xs text-gray-600">Executive Access Trust Framework</p>
                      </div>
                      <div>
                        <strong>Scope</strong>
                        <p className="text-xs text-gray-600">C-level executives, board members, key personnel</p>
                      </div>
                      <div>
                        <strong>Trust Criteria</strong>
                        <div className="text-xs text-gray-600 ml-4">
                          <p>• Device registration status</p>
                          <p>• Certificate validity and chain</p>
                          <p>• Multi-factor authentication strength</p>
                          <p>• Anomaly detection results</p>
                        </div>
                      </div>
                      <div>
                        <strong>Decision Matrix</strong>
                        <p className="text-xs text-gray-600">Clear Allow/Step-up/Deny criteria</p>
                      </div>
                      <div>
                        <strong>Action Paths</strong>
                        <div className="text-xs text-gray-600 ml-4">
                          <p>• Allow: Direct access granted</p>
                          <p>• Step-up: Additional verification required</p>
                          <p>• Deny: Access blocked, security team notified</p>
                        </div>
                      </div>
                      <div>
                        <strong>Exception Process</strong>
                        <p className="text-xs text-gray-600">Emergency access procedures and approval workflow</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "1-slide Trust Policy for VIP logins with criteria and action paths",
          rubric: [
            { criteria: "Policy logic", points: 4, description: "Sound decision-making framework" },
            { criteria: "Practicality", points: 3, description: "Implementable in real environments" },
            { criteria: "Completeness", points: 2, description: "Covers all key trust factors" },
            { criteria: "Brevity", points: 1, description: "Concise, single-slide format" }
          ]
        };

      case 5:
        return {
          title: "ScamAtlas™ - Scam Intelligence & Ecosystem Immunization",
          duration: "25–45 min",
          goal: "Turns one person's near-miss into everyone's shield",
          sections: [
            {
              title: "Learn (10–15 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Community-Driven Threat Intelligence</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Scam Categories</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>Business Email Compromise:</strong> Invoice fraud, CEO fraud</li>
                        <li><strong>Phishing:</strong> Credential harvesting, malware delivery</li>
                        <li><strong>Social Engineering:</strong> Tech support, romance scams</li>
                        <li><strong>Financial Fraud:</strong> Wire transfer, crypto scams</li>
                        <li><strong>Supply Chain:</strong> Vendor impersonation</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Intelligence Indicators</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>Domain patterns:</strong> Typosquatting, lookalikes</li>
                        <li><strong>Language cues:</strong> Urgency, authority, fear</li>
                        <li><strong>Timing patterns:</strong> End-of-day, holidays</li>
                        <li><strong>Technical artifacts:</strong> Headers, metadata</li>
                        <li><strong>Behavioral patterns:</strong> Pressure tactics</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h5 className="font-medium mb-2">Mini-Case Study:</h5>
                    <p className="text-sm">
                      <strong>Pattern:</strong> Invoice scam targeting accounting departments every Friday at 4:55 PM, swapping legitimate vendor banking details
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Indicators:</strong> Timing (end-of-week), urgency ("payment due Monday"), minor email domain variations, legitimate invoice format
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Community Defense Model</h5>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Individual encounters scam attempt</li>
                      <li>Reports indicators to community platform</li>
                      <li>Platform clusters similar patterns</li>
                      <li>Automated alerts sent to at-risk organizations</li>
                      <li>Upstream takedown requests initiated</li>
                      <li>Community education materials updated</li>
                    </ol>
                  </div>
                </div>
              )
            },
            {
              title: "Try (10–15 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Scam Analysis Workshop</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">Find a Recent Scam Example:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Sources to check:</strong>
                        <ul className="list-disc list-inside text-xs text-gray-600 ml-4">
                          <li>FBI IC3 alerts</li>
                          <li>CISA advisories</li>
                          <li>News reports</li>
                          <li>Security vendor blogs</li>
                          <li>Reddit r/scams</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Extract 3 Key Indicators:</strong>
                        <div className="space-y-2 mt-2">
                          <input 
                            type="text" 
                            placeholder="Indicator 1: Domain/email pattern"
                            className="w-full p-2 border rounded text-xs"
                          />
                          <input 
                            type="text" 
                            placeholder="Indicator 2: Language/wording cues"
                            className="w-full p-2 border rounded text-xs"
                          />
                          <input 
                            type="text" 
                            placeholder="Indicator 3: Timing/behavioral pattern"
                            className="w-full p-2 border rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Sharing Workflow Mapping</h5>
                    <p className="text-sm mb-3">Map the intelligence sharing process:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="bg-white px-2 py-1 rounded text-xs">Collect</div>
                        <span className="text-xs">→</span>
                        <div className="bg-white px-2 py-1 rounded text-xs">Normalize</div>
                        <span className="text-xs">→</span>
                        <div className="bg-white px-2 py-1 rounded text-xs">Share</div>
                        <span className="text-xs">→</span>
                        <div className="bg-white px-2 py-1 rounded text-xs">Block</div>
                        <span className="text-xs">→</span>
                        <div className="bg-white px-2 py-1 rounded text-xs">Educate</div>
                      </div>
                      <p className="text-xs text-gray-600">Define what happens at each step</p>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Show (10–15 min)",
              icon: FileText,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Scam Brief Template</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">1-Page Community Scam Brief:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Threat Summary</strong>
                        <p className="text-xs text-gray-600">2-3 sentence overview for general audience</p>
                      </div>
                      <div>
                        <strong>Key Indicators (3)</strong>
                        <div className="text-xs text-gray-600 ml-4">
                          <p>• Visual/technical indicator</p>
                          <p>• Language/behavioral indicator</p> 
                          <p>• Timing/context indicator</p>
                        </div>
                      </div>
                      <div>
                        <strong>Target Profile</strong>
                        <p className="text-xs text-gray-600">Who is most at risk and why</p>
                      </div>
                      <div>
                        <strong>Prevention Tips (3 steps)</strong>
                        <div className="text-xs text-gray-600 ml-4">
                          <p>1. What to look for</p>
                          <p>2. How to verify</p>
                          <p>3. What to do if targeted</p>
                        </div>
                      </div>
                      <div>
                        <strong>Sharing Workflow</strong>
                        <p className="text-xs text-gray-600">How this intelligence gets distributed</p>
                      </div>
                      <div>
                        <strong>Community Impact</strong>
                        <p className="text-xs text-gray-600">Expected protection benefit</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "1-page Scam Brief with indicators and 3-step prevention tips for non-experts",
          rubric: [
            { criteria: "Indicator quality", points: 4, description: "Clear, actionable threat indicators" },
            { criteria: "Clarity for public", points: 3, description: "Accessible to non-technical audience" },
            { criteria: "Sharing workflow", points: 2, description: "Practical distribution strategy" },
            { criteria: "Tone", points: 1, description: "Informative without causing panic" }
          ]
        };

      case 6:
        return {
          title: "Compliance & Ethics Sprint",
          duration: "25–45 min",
          goal: "Turns compliance into a simple crosswalk across HIPAA/PCI DSS/GDPR/SOC 2/CCPA",
          sections: [
            {
              title: "Learn (10–15 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Compliance Framework Overview</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Framework Purposes</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>HIPAA:</strong> Healthcare data protection</li>
                        <li><strong>PCI DSS:</strong> Payment card security</li>
                        <li><strong>GDPR:</strong> EU privacy rights</li>
                        <li><strong>SOC 2:</strong> Service organization controls</li>
                        <li><strong>CCPA:</strong> California consumer privacy</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Common Control Areas</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Access control & identity management</li>
                        <li>Data encryption & protection</li>
                        <li>Audit logging & monitoring</li>
                        <li>Incident response procedures</li>
                        <li>Vendor risk management</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Penalty Examples</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>HIPAA:</strong> Up to $1.5M per incident</p>
                      <p><strong>PCI DSS:</strong> $5,000-$100,000/month fines</p>
                      <p><strong>GDPR:</strong> Up to 4% of global revenue</p>
                      <p><strong>CCPA:</strong> Up to $7,500 per violation</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">People Impact</h5>
                    <p className="text-sm">Every compliance failure affects real people - patients lose trust in healthcare, consumers lose financial security, employees lose jobs. Compliance protects human dignity and organizational mission.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Control Matrix Sample</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-white">
                            <th className="border p-1">Control</th>
                            <th className="border p-1">Evidence</th>
                            <th className="border p-1">Owner</th>
                            <th className="border p-1">Frequency</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-1">Access Review</td>
                            <td className="border p-1">User access report</td>
                            <td className="border p-1">IT Security</td>
                            <td className="border p-1">Quarterly</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Try (10–15 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Framework Selection & Scenario Mapping</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">Choose Your Framework & Scenario:</h5>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-sm mb-2">Framework:</p>
                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="radio" name="framework" />
                            <span>HIPAA</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="framework" />
                            <span>PCI DSS</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="framework" />
                            <span>GDPR</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="framework" />
                            <span>SOC 2</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="framework" />
                            <span>CCPA</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-sm mb-2">Scenario:</p>
                        <div className="space-y-1 text-sm">
                          <label className="flex items-center gap-2">
                            <input type="radio" name="scenario" />
                            <span>Healthcare clinic</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="scenario" />
                            <span>Hotel chain</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="scenario" />
                            <span>Childcare center</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="scenario" />
                            <span>Community bank</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">6-Row Control Matrix Template</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-white">
                            <th className="border p-2 text-left">Control Area</th>
                            <th className="border p-2 text-left">Specific Control</th>
                            <th className="border p-2 text-left">Evidence Type</th>
                            <th className="border p-2 text-left">Owner Role</th>
                            <th className="border p-2 text-left">Review Frequency</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2">Access Control</td>
                            <td className="border p-2">[Fill in specific control]</td>
                            <td className="border p-2">[Evidence needed]</td>
                            <td className="border p-2">[Who owns this]</td>
                            <td className="border p-2">[How often]</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Data Protection</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Monitoring</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Incident Response</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Training</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Risk Assessment</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                            <td className="border p-2">[Fill in]</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Show (10–15 min)",
              icon: FileText,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Compliance Deliverable Template</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">1-Page Control Matrix + Gap Fix Plan:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Organization Context</strong>
                        <p className="text-xs text-gray-600">Brief description of chosen scenario and why this framework applies</p>
                      </div>
                      <div>
                        <strong>Completed 6-Row Matrix</strong>
                        <p className="text-xs text-gray-600">All fields filled with realistic, scenario-appropriate controls</p>
                      </div>
                      <div>
                        <strong>Gap Analysis</strong>
                        <p className="text-xs text-gray-600">What's missing or insufficient in current state</p>
                      </div>
                      <div>
                        <strong>3-Bullet Gap Fix Plan</strong>
                        <div className="text-xs text-gray-600 ml-4">
                          <p>• Priority 1 fix: [Immediate action needed]</p>
                          <p>• Priority 2 fix: [Medium-term improvement]</p>
                          <p>• Priority 3 fix: [Long-term enhancement]</p>
                        </div>
                      </div>
                      <div>
                        <strong>Implementation Timeline</strong>
                        <p className="text-xs text-gray-600">Realistic timeframe for each priority</p>
                      </div>
                      <div>
                        <strong>Success Metrics</strong>
                        <p className="text-xs text-gray-600">How you'll measure compliance improvement</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "1-page control matrix + 3-bullet gap fix plan for chosen framework and scenario",
          rubric: [
            { criteria: "Correct mapping", points: 4, description: "Controls accurately reflect framework requirements" },
            { criteria: "Evidence realism", points: 3, description: "Practical, obtainable evidence types" },
            { criteria: "Gap fixes", points: 2, description: "Actionable improvement recommendations" },
            { criteria: "Formatting", points: 1, description: "Professional presentation and organization" }
          ]
        };

      case 7:
        return {
          title: "JobReady360: Portfolio & Presence",
          duration: "35–55 min",
          goal: "Turns all your work into interviews - ATS-ready portfolio",
          sections: [
            {
              title: "Learn (10–15 min)",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Career Portfolio Strategy</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">ATS Optimization</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li><strong>Keywords:</strong> Match job descriptions exactly</li>
                        <li><strong>Format:</strong> Clean, scannable structure</li>
                        <li><strong>Metrics:</strong> Quantify all achievements</li>
                        <li><strong>Skills:</strong> Technical and soft skills balance</li>
                        <li><strong>Context:</strong> Clear role progression</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Impact Bullets Formula</h5>
                      <div className="text-sm space-y-1">
                        <p><strong>Action + Metric + Outcome</strong></p>
                        <p className="text-xs">Example: "Implemented zero-trust controls reducing security incidents by 40% and saving $200K annually"</p>
                        <p className="text-xs">Bad: "Responsible for security improvements"</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Portfolio Showcase Strategy</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Convert coursework into professional artifacts</li>
                      <li>Create clean PDFs with consistent branding</li>
                      <li>Build GitHub repository with documentation</li>
                      <li>Optimize LinkedIn with keyword-rich headlines</li>
                      <li>Prepare compelling interview stories</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Professional Follow-up</h5>
                    <p className="text-sm">Thank-you emails within 24 hours, specific references to conversation topics, and clear next steps. Research shows this increases callback rates by 30%.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Portfolio Checklist Baseline</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>✓ Resume with metrics and keywords</li>
                      <li>✓ LinkedIn profile with professional headline</li>
                      <li>✓ Portfolio website or GitHub</li>
                      <li>✓ 2-3 work samples (modules converted)</li>
                      <li>✓ Professional email signature</li>
                      <li>✓ Elevator pitch (30-second version)</li>
                    </ul>
                  </div>
                </div>
              )
            },
            {
              title: "Try (15–20 min)",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">Portfolio Conversion Workshop</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">Select Two Previous Deliverables to Convert:</h5>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Module 0: Purpose Statement → Personal Mission/Values Statement</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Module 1: Fraud Signature Brief → Threat Intelligence Analysis</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Module 2: Zero-Trust Quick Wins → Security Implementation Plan</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Module 3: Kill-Switch SOP → Incident Response Procedure</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Module 4: Trust Policy → Access Control Framework</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Module 5: Scam Brief → Community Threat Advisory</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span>Module 6: Compliance Matrix → Risk Assessment Report</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Impact Metrics Addition</h5>
                    <p className="text-sm mb-3">Add one measurable impact metric to each selected deliverable:</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Deliverable 1:</p>
                        <input 
                          type="text" 
                          placeholder="Time saved, risk reduced, steps eliminated, etc."
                          className="w-full p-2 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Deliverable 2:</p>
                        <input 
                          type="text" 
                          placeholder="Quantifiable improvement or efficiency gain"
                          className="w-full p-2 border rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Professional Presentation Format</h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Document 1:</strong> Convert to polished PDF with:</p>
                      <ul className="text-xs list-disc list-inside ml-4">
                        <li>Professional header with your name</li>
                        <li>Executive summary (2-3 sentences)</li>
                        <li>Clear methodology section</li>
                        <li>Results with metrics</li>
                        <li>Implementation recommendations</li>
                      </ul>
                      <p><strong>Document 2:</strong> Create presentation slide with:</p>
                      <ul className="text-xs list-disc list-inside ml-4">
                        <li>Problem statement</li>
                        <li>Your approach</li>
                        <li>Key findings</li>
                        <li>Business impact</li>
                        <li>Next steps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Show (15–20 min)",
              icon: FileText,
              content: (
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#3C3B6E]">ATS-Ready Career Package</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">1-Page Resume Template:</h5>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Header Section</strong>
                        <p className="text-xs text-gray-600">Name, title, location, phone, email, LinkedIn, portfolio URL</p>
                      </div>
                      <div>
                        <strong>Professional Summary (3-4 lines)</strong>
                        <p className="text-xs text-gray-600">Cybersecurity professional specializing in [your focus areas] with demonstrated expertise in [key skills] and proven ability to [value proposition]</p>
                      </div>
                      <div>
                        <strong>Technical Skills</strong>
                        <p className="text-xs text-gray-600">Frameworks: FraudDNA™, AISF™, PPP™, PatriotProof™, ScamAtlas™</p>
                        <p className="text-xs text-gray-600">Compliance: HIPAA, PCI DSS, GDPR, SOC 2, CCPA</p>
                        <p className="text-xs text-gray-600">Tools: [From your coursework and experience]</p>
                      </div>
                      <div>
                        <strong>Professional Experience</strong>
                        <p className="text-xs text-gray-600">Use impact bullets: "Developed zero-trust implementation plan reducing security incidents by 40% and eliminating 5 hours of weekly manual processes"</p>
                      </div>
                      <div>
                        <strong>Education & Certifications</strong>
                        <p className="text-xs text-gray-600">Include Cybersmarts.ai Mentorship completion</p>
                      </div>
                      <div>
                        <strong>Projects/Portfolio</strong>
                        <p className="text-xs text-gray-600">Link to your converted deliverables with brief descriptions</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">LinkedIn Optimization</h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Headline Example:</strong></p>
                      <p className="text-xs italic">"Cybersecurity Analyst | Zero-Trust & Fraud Prevention Specialist | HIPAA/PCI Compliance Expert | Protecting America's Digital Infrastructure"</p>
                      <p><strong>About Section:</strong> Expand your purpose statement with specific achievements and keyword optimization</p>
                      <p><strong>Experience:</strong> Mirror resume impact bullets</p>
                      <p><strong>Featured Section:</strong> Showcase your portfolio documents</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Portfolio Links Package</h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Primary Portfolio:</strong> GitHub repository or personal website</p>
                      <p><strong>LinkedIn Profile:</strong> Optimized with keywords and portfolio links</p>
                      <p><strong>Document Links:</strong> Google Drive or Dropbox folder with professional documents</p>
                      <p><strong>Optional:</strong> Personal domain with simple portfolio site</p>
                    </div>
                  </div>
                </div>
              )
            }
          ],
          deliverable: "ATS-optimized 1-page resume + 2 portfolio links (LinkedIn + document repository)",
          rubric: [
            { criteria: "Relevance to roles", points: 4, description: "Strong alignment with cybersecurity job requirements" },
            { criteria: "Metrics", points: 3, description: "Quantified achievements and impact statements" },
            { criteria: "Clean format", points: 2, description: "Professional, ATS-scannable presentation" },
            { criteria: "Links work", points: 1, description: "All portfolio links functional and professional" }
          ]
        };

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