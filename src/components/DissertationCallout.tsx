import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Award, Shield, TrendingUp, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const DissertationCallout = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-4">
        <Card className="max-w-5xl mx-auto border-2 border-[#3C3B6E] bg-white shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#3C3B6E] to-[#B22234] p-1">
            <div className="bg-white rounded-t-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3C3B6E] to-[#B22234] rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-[#B22234]" />
                    <span className="text-sm font-semibold text-[#B22234] uppercase tracking-wide">
                      Top-Ranked Dissertation Recognition
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1A1F2C] mb-3 leading-tight">
                    "Enhancing Financial Security: A Quantitative Investigation with AI and Quantum Biometrics"
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    <strong>Officially listed as a Top Downloaded Paper by SSRN</strong> in the Consumer Financial Fraud eJournal.
                  </p>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-red-50 to-blue-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-[#B22234]" />
                    <span className="font-semibold text-[#1A1F2C]">Critical Defense Technologies</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    This dissertation—part of my PhD in Artificial Intelligence—represents a critical advancement 
                    in the defense of financial systems, blending quantum biometrics, sovereign AI, and preemptive 
                    cybersecurity architecture.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#B22234] rounded-full"></div>
                        <span className="font-medium text-[#1A1F2C]">FraudDNA™</span>
                        <span className="text-sm text-gray-600">– Forensic fraud profiling engine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#3C3B6E] rounded-full"></div>
                        <span className="font-medium text-[#1A1F2C]">PatriotProof™</span>
                        <span className="text-sm text-gray-600">– Identity firewall and AI intent screening</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                        <span className="font-medium text-[#1A1F2C]">PPP™</span>
                        <span className="text-sm text-gray-600">– Proactive Prevention Platform</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                        <span className="font-medium text-[#1A1F2C]">AISF™</span>
                        <span className="text-sm text-gray-600">– Autonomous Intelligence Security Framework</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-[#10B981]" />
                  <span className="text-[#1A1F2C] font-medium">
                    The work is actively influencing private-sector innovation, regulatory awareness, 
                    and real-time fraud mitigation strategies across the U.S.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button 
                    asChild 
                    className="bg-[#3C3B6E] hover:bg-[#2d2c54] text-white flex items-center gap-2"
                  >
                    <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5240753" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Read SSRN Abstract
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="border-[#B22234] text-[#B22234] hover:bg-[#B22234] hover:text-white flex items-center gap-2"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      Download Paper
                    </a>
                  </Button>
                </div>

                <blockquote className="border-l-4 border-[#B22234] pl-4 py-2 bg-gray-50 rounded-r-lg">
                  <p className="text-[#1A1F2C] font-medium italic mb-2">
                    "This is not just a dissertation—it's a blueprint for defending the future of money, privacy, and national trust."
                  </p>
                  <cite className="text-sm text-gray-600 font-medium">— Dr. Troy Williams, PhD</cite>
                </blockquote>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default DissertationCallout;