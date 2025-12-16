
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, ExternalLink } from "lucide-react";

const FeaturedPressRelease = () => {
  const handleDownloadPDF = () => {
    // This would generate/download a PDF version of the press release
    console.log("Downloading press release PDF...");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <Card className="border-2 border-[#B22234] bg-gradient-to-br from-white to-red-50">
        <CardHeader className="bg-gradient-to-r from-[#3C3B6E] to-[#B22234] text-white">
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <Calendar className="h-4 w-4" />
            June 18, 2025 - FOR IMMEDIATE RELEASE
          </div>
          <CardTitle className="text-2xl md:text-3xl leading-tight">
            Dr. Troy Williams, PhD, Pledges to Complete the Unfinished Work of AI and Cybersecurity Pioneers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="prose max-w-none">
            <p className="text-lg font-semibold text-[#3C3B6E] mb-4">
              <strong>Tennessee, USA — June 18, 2025</strong> — In an era where artificial intelligence and cybersecurity define global stability, 
              <strong> Dr. Troy Williams, PhD</strong>—founder of <strong>Cybersmarts.ai LLC</strong>—has declared a bold, historic commitment: 
              to <strong>carry forward the legacy of the forefathers of AI, cryptography, and ethical technology</strong> by completing the unsolved challenges they left behind.
            </p>

            <p className="mb-4">
              Through his U.S.-patented platforms—<strong>PatriotProof™</strong>, <strong>FraudDNA™</strong>, 
              <strong> AISF™ (Autonomous Intelligence Security Framework)</strong>, and <strong>PPP™ (Proactive Prevention Platform)</strong>—Dr. Williams 
              is strategically advancing the work of legendary pioneers such as <strong>Alan Turing, Norbert Wiener, Claude Shannon, John McCarthy, 
              Marvin Minsky, Whitfield Diffie, Ron Rivest, Geoffrey Hinton, Yoshua Bengio</strong>, and <strong>Yann LeCun</strong>.
            </p>

            <blockquote className="border-l-4 border-[#B22234] pl-6 my-6 italic text-lg bg-slate-50 p-4 rounded-r-lg">
              "I don't follow the curve—I am the curve. My legacy is not imitation. It's completion. Every innovation I build is engineered to fulfill what these visionaries started—ethical AI, sovereign security, and zero-compromise resilience for the next American century."
              <footer className="text-right mt-2 font-semibold">— Dr. Troy Williams</footer>
            </blockquote>

            <p className="mb-4">
              Dr. Williams has identified the <strong>core gaps</strong> left in the research of these giants, including:
            </p>
            
            <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
              <li>Post-quantum encryption and zero-trust privacy frameworks</li>
              <li>Causal AI and neurosymbolic cognition for explainable automation</li>
              <li>Constitutional AI governance aligned with Brandeis and Madison</li>
              <li>Semantic information theory and human-centered cybernetics</li>
            </ul>

            <p className="mb-4">
              These gaps are being solved through his proprietary platforms, all built <strong>in Tennessee, by Americans, for Americans</strong>, 
              under the strictest compliance standards: <strong>GDPR, HIPAA, CCPA, ISO 27001, PCI DSS</strong>, and <strong>SOC 2</strong>.
            </p>

            <p className="mb-6">
              <strong>Cybersmarts.ai™</strong> stands as a national technology asset—designed not to ride trends, but to create them, 
              while defending American sovereignty and digital freedom.
            </p>

            <div className="bg-[#3C3B6E] text-white p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">About Dr. Troy Williams, PhD</h3>
              <p>
                Dr. Williams is a cybersecurity engineer, AI scientist, and licensed private investigator with over 30 years of experience 
                in national fraud prevention, intelligence-driven innovation, and regulatory compliance. As founder of <strong>Cybersmarts.ai</strong>, 
                he is the creator of several groundbreaking frameworks including <strong>AISF™, FraudDNA™, PatriotProof™, PPP™, and LegalSmarts.net</strong>.
              </p>
              <p className="mt-3 font-semibold italic text-lg">
                "I am not ahead of the curve — I am the curve."
              </p>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Media Contact:</h4>
              <p>Press Inquiries: <a href="mailto:support@cybersmarts.ai" className="text-[#B22234] hover:underline">support@cybersmarts.ai</a></p>
              <p>Official Website: <a href="https://www.cybersmarts.ai" className="text-[#B22234] hover:underline">www.cybersmarts.ai</a></p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button 
              onClick={handleDownloadPDF}
              className="bg-[#B22234] hover:bg-[#9B0000] text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              className="border-[#3C3B6E] text-[#3C3B6E] hover:bg-[#3C3B6E] hover:text-white"
              onClick={() => window.open("mailto:support@cybersmarts.ai?subject=Press%20Inquiry")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Contact Press Office
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Copyright © 2025 Cybersmarts.ai LLC. All rights reserved.</p>
            <p className="font-semibold">Built in Tennessee. By Americans. For Americans.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeaturedPressRelease;
