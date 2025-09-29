import React from 'react';
import { motion } from "framer-motion";
import { Shield, Clock, Award, CheckCircle, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MentorshipProgram = () => {
  const rules = [
    "Learn → Try → Show → Get feedback → Improve (Pass/Redo)",
    "Chunk size: 15–25 minutes each",
    "Grading: Pass/Redo per task using a 10-point micro-rubric",
    "Tools: Google Docs/Slides, GitHub (optional), browser, spreadsheet"
  ];

  const modules = [
    {
      id: 0,
      title: "Orientation",
      duration: "15–20 min",
      goal: "Give every student the same foundation before they reference your systems",
      deliverable: "Purpose Statement (≤100 words)",
      rubric: "Clarity (3), Relevance to security (3), Brevity (2), Tone/Professionalism (2)",
      icon: BookOpen
    },
    {
      id: 1,
      title: "FraudDNA™",
      subtitle: "Detect & prevent synthetic identities",
      duration: "25–45 min",
      goal: "Shows how fraud starts and how to stop it early",
      deliverable: "1-page Fraud Signature Brief",
      rubric: "Accuracy (4), Actionability (3), Clarity (2), Ethics note (1)",
      icon: Shield
    },
    {
      id: 2,
      title: "AISF™",
      subtitle: "Autonomous Intelligence Security Framework: Zero-Trust endpoints",
      duration: "25–45 min",
      goal: "Turns 'never trust, always verify' into a checklist",
      deliverable: "1-page Zero-Trust Quick Wins",
      rubric: "Prioritization (4), Feasibility (3), Completeness (2), Plain language (1)",
      icon: Shield
    },
    {
      id: 3,
      title: "PPP™",
      subtitle: "Proactive Prevention Platform: automated invalidation",
      duration: "25–45 min",
      goal: "Proves speed beats attackers",
      deliverable: "1-page SOP with triggers and metrics",
      rubric: "Speed focus (3), Clear triggers (3), Roles/owners (2), Metrics (2)",
      icon: CheckCircle
    },
    {
      id: 4,
      title: "PatriotProof™",
      subtitle: "Cryptographic identity & trust",
      duration: "25–45 min",
      goal: "Anchors identity to cryptography, not guesswork",
      deliverable: "1-slide Trust Policy for VIP logins",
      rubric: "Policy logic (4), Practicality (3), Completeness (2), Brevity (1)",
      icon: Award
    },
    {
      id: 5,
      title: "ScamAtlas™",
      subtitle: "Scam intelligence & ecosystem immunization",
      duration: "25–45 min",
      goal: "Turns one person's near-miss into everyone's shield",
      deliverable: "1-page Scam Brief with indicators",
      rubric: "Indicator quality (4), Clarity for public (3), Sharing workflow (2), Tone (1)",
      icon: Users
    },
    {
      id: 6,
      title: "Compliance & Ethics Sprint",
      subtitle: "HIPAA / PCI DSS / GDPR / SOC 2 / CCPA",
      duration: "25–45 min",
      goal: "Turns compliance into a simple crosswalk",
      deliverable: "1-page control matrix + gap fix plan",
      rubric: "Correct mapping (4), Evidence realism (3), Gap fixes (2), Formatting (1)",
      icon: CheckCircle
    },
    {
      id: 7,
      title: "JobReady360",
      subtitle: "Portfolio & Presence (ATS-ready)",
      duration: "35–55 min",
      goal: "Turns all this work into interviews",
      deliverable: "ATS-oriented 1-page resume + 2 links",
      rubric: "Relevance to roles (4), Metrics (3), Clean format (2), Links work (1)",
      icon: Award
    }
  ];

  const capstoneOptions = [
    {
      title: "Case Analysis",
      description: "3–5 pages: apply at least two systems to a real breach and show prevention/containment",
      duration: "60–90 minutes"
    },
    {
      title: "Executive Deck",
      description: "8–10 slides for non-technical audience with problem, risk, approach, and outcomes",
      duration: "60–90 minutes"
    }
  ];

  const schedule = [
    { week: 1, modules: "Modules 0–2", focus: "Foundation & Fraud Detection" },
    { week: 2, modules: "Modules 3–4", focus: "Prevention & Identity" },
    { week: 3, modules: "Modules 5–7", focus: "Intelligence & Career Prep" },
    { week: 4, modules: "Capstone", focus: "Portfolio Polish & Final Project" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cybersmarts.ai Mentorship
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Intro Pack
            </p>
            <p className="text-lg md:text-xl font-semibold">
              Protecting America Through Technology™
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3C3B6E]">
              How It Works (5 Rules)
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-[#B22234]/20 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mb-4">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{rule}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3C3B6E]">
              Training Modules
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive cybersecurity training broken into digestible, actionable modules
            </p>
          </motion.div>

          <div className="grid gap-8 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border border-[#B22234]/20 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] p-3 rounded-full">
                        <module.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-[#3C3B6E] border-[#3C3B6E]">
                            Module {module.id}
                          </Badge>
                          <Badge variant="secondary" className="bg-[#B22234]/10 text-[#B22234]">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.duration}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-[#3C3B6E]">
                          {module.title}
                          {module.subtitle && (
                            <span className="block text-sm font-normal text-gray-600 mt-1">
                              {module.subtitle}
                            </span>
                          )}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        <strong>Goal:</strong> {module.goal}
                      </p>
                      <p className="text-gray-700">
                        <strong>Deliverable:</strong> {module.deliverable}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Rubric (10 pts):</strong> {module.rubric}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3C3B6E]">
              Capstone Project
            </h2>
            <p className="text-lg text-gray-600">
              Choose one final project to demonstrate your mastery (60–90 minutes total)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {capstoneOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-[#B22234]/20 hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-[#3C3B6E] flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Option {String.fromCharCode(65 + index)}: {option.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{option.description}</p>
                    <Badge variant="outline" className="text-[#B22234] border-[#B22234]">
                      {option.duration}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-[#B22234]/5 to-[#3C3B6E]/5 border border-[#B22234]/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#3C3B6E] mb-2">
                  Capstone Rubric (40 points)
                </h3>
                <p className="text-sm text-gray-600">
                  Technical correctness (12), Actionability (12), Communication to non-experts (8), Ethics/compliance integration (8)
                </p>
                <p className="text-sm text-[#B22234] font-medium mt-2">
                  Grade: Pass ≥ 30; otherwise Redo with notes
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3C3B6E]">
              Recommended Schedule
            </h2>
            <p className="text-lg text-gray-600">
              Students can move faster; instructor only reviews "Show" items + capstone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {schedule.map((week, index) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-[#B22234]/20 hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white rounded-lg p-3 text-center">
                      <h3 className="text-lg font-bold">Week {week.week}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-[#3C3B6E] mb-2">{week.modules}</p>
                    <p className="text-sm text-gray-600">{week.focus}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#3C3B6E]">
              Ready to Start Your Cybersecurity Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join the Cybersmarts.ai mentorship program and build practical cybersecurity skills that protect America's digital infrastructure.
            </p>
            <Button 
              variant="usaRed" 
              size="lg"
              className="shadow-lg transform transition-transform hover:scale-105"
              onClick={() => window.location.href = 'mailto:verifiedsafe8@gmail.com?subject=Cybersmarts.ai Mentorship Program Interest'}
            >
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MentorshipProgram;