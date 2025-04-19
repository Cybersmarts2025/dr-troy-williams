
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Brain, ShieldCheck, Network, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Cybersecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AI-Driven Cybersecurity: The Future of Digital Defense - Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Comprehensive analysis of AI applications in cybersecurity, exploring how artificial intelligence can proactively secure digital environments through intelligent automation." 
        />
      </Helmet>

      <PageBreadcrumb pageName="AI-Driven Cybersecurity" />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#3C3B6E] mb-4">
            AI-Driven Cybersecurity: The Future of Digital Defense
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A Comprehensive Analysis of Artificial Intelligence Applications in Cybersecurity
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              As the complexity and velocity of cyber threats evolve, traditional defense mechanisms are no longer sufficient to protect critical infrastructure, sensitive data, and national security. AI-driven cybersecurity represents a transformational shift — enabling systems not only to defend but to predict, adapt, and neutralize threats autonomously.
            </p>

            <div className="my-8 p-6 bg-[#3C3B6E]/5 rounded-lg border border-[#3C3B6E]/10">
              <p className="italic text-[#3C3B6E]">
                Led by Dr. Troy Williams and embedded within the Cybersmarts.ai ecosystem, this research explores how artificial intelligence can proactively secure digital environments through intelligent automation, threat prediction, and autonomous response models. The goal is not just to improve cybersecurity — but to redefine it.
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8"
            >
              <motion.div variants={item} className="p-6 bg-white rounded-lg shadow-lg border border-[#3C3B6E]/10">
                <Brain className="w-8 h-8 text-[#B22234] mb-4" />
                <h3 className="text-xl font-bold text-[#3C3B6E] mb-2">Threat Detection and Anomaly Recognition</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Early detection of zero-day exploits</li>
                  <li>Defense against social engineering attempts</li>
                  <li>Immediate flagging of unauthorized access</li>
                </ul>
              </motion.div>

              <motion.div variants={item} className="p-6 bg-white rounded-lg shadow-lg border border-[#3C3B6E]/10">
                <ShieldCheck className="w-8 h-8 text-[#B22234] mb-4" />
                <h3 className="text-xl font-bold text-[#3C3B6E] mb-2">Intelligent Incident Response</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Automatic containment of threats</li>
                  <li>AI-driven triage and alert prioritization</li>
                  <li>Autonomous rollback capabilities</li>
                </ul>
              </motion.div>

              <motion.div variants={item} className="p-6 bg-white rounded-lg shadow-lg border border-[#3C3B6E]/10">
                <Network className="w-8 h-8 text-[#B22234] mb-4" />
                <h3 className="text-xl font-bold text-[#3C3B6E] mb-2">Predictive Threat Modeling</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Historical behavior analysis</li>
                  <li>Geopolitical risk feeds</li>
                  <li>Industry-specific vulnerabilities</li>
                </ul>
              </motion.div>

              <motion.div variants={item} className="p-6 bg-white rounded-lg shadow-lg border border-[#3C3B6E]/10">
                <Lock className="w-8 h-8 text-[#B22234] mb-4" />
                <h3 className="text-xl font-bold text-[#3C3B6E] mb-2">Continuous Risk Scoring</h3>
                <p className="text-gray-600">
                  AI assigns dynamic risk scores to users, devices, transactions, and external connections—allowing for adaptive security protocols and least-privilege access enforcement.
                </p>
              </motion.div>
            </motion.div>

            <h2 className="text-2xl font-bold text-[#3C3B6E] mt-12 mb-6">🔒 Embedded in Proactive Architectures</h2>
            <p>This research is fully aligned with and implemented through:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>AISF™ (Autonomous Intelligence Security Framework) – for compliance, ethics, and adaptive legality</li>
              <li>PPP™ (Proactive Prevention Platform) – for preemptive fraud interception</li>
              <li>PatriotProof™ – for real-time American-only fraud defense</li>
              <li>Digital Border Wall™ – for foreign infiltration prevention</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#3C3B6E] mt-12 mb-6">🇺🇸 American-Built. American-Secured.</h2>
            <p>
              AI-driven cybersecurity, as defined in this research, is not an outsourced, cloud-only solution. It is a national security imperative that must be deployed with U.S.-only infrastructure, policy oversight, and constitutional alignment.
            </p>

            <div className="my-8 p-6 bg-[#B22234]/5 rounded-lg border border-[#B22234]/10">
              <p className="text-xl font-bold text-[#B22234] mb-4">This research reinforces the need for:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>U.S.-controlled AI decision-making</li>
                <li>Quantum-ready defense layers</li>
                <li>Transparent, bias-audited algorithms</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-[#3C3B6E] mt-12 mb-6">✅ Conclusion: Securing the Digital Battlefield of Tomorrow</h2>
            <p>
              AI is not the future of cybersecurity — it is the present, and it is already under attack. The only way to stay ahead of adversaries is to build systems that think faster than humans and defend stronger than code alone.
            </p>

            <blockquote className="border-l-4 border-[#B22234] pl-4 my-8 italic text-lg">
              "We don't just defend data — we anticipate the battlefield."
            </blockquote>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Cybersecurity;
