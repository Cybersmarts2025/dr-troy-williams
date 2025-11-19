import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Eye, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/synthetic-identity-fraud.png';

const SyntheticIdentityDefense = () => {
  return (
    <>
      <Helmet>
        <title>Synthetic Identity Defense System | Dr. Troy Williams, PhD</title>
        <meta name="description" content="Defending America against synthetic identity engineering with PatriotProof™, FraudDNA™, AISF™, and PPP™. Professional investigation and defense services from The Proactive AI PI." />
      </Helmet>

      <NavBar />
      <PageBreadcrumb pageName="Synthetic Identity Defense" />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[#1A1F2C]/80"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Synthetic Identity Defense System
          </h1>
          <p className="text-2xl md:text-3xl mb-4 font-semibold text-[#B22234]">
            Powered by PatriotProof™, FraudDNA™, AISF™, and PPP™
          </p>
          <p className="text-xl md:text-2xl mb-8 italic">
            Protecting America Through Technology™
          </p>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed">
            <p className="mb-4">
              Synthetic identity is not identity theft. It is identity engineering. These are not stolen identities. They are manufactured humans, built from fragmented real data, aged across systems, and trusted by institutions more than real people.
            </p>
            <p>
              The nation is not prepared. I am the Proactive AI PI, uncovering threats before they surface, investigating what others cannot see, and defending what matters most: the integrity of American identity.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-12">
              <AlertTriangle className="h-10 w-10 text-[#B22234] mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#1A1F2C]">
                The Synthetic Identity Fraud Crisis
              </h2>
            </div>

            <div className="max-w-5xl mx-auto space-y-8 text-lg text-gray-800">
              <Card className="p-8 bg-white border-l-4 border-[#B22234]">
                <p className="leading-relaxed">
                  Synthetic identities are constructed from fragmented data scattered across more than 200 unregulated consumer reporting systems. These systems do not communicate. They do not verify. They aggregate, trust, and report.
                </p>
              </Card>

              <Card className="p-8 bg-white border-l-4 border-[#3C3B6E]">
                <p className="leading-relaxed">
                  Credit freezes do not stop synthetic identity fraud. Freezing your file at the three major bureaus leaves hundreds of alternative data ecosystems untouched. Synthetic identities bypass traditional identity verification because they were never stolen. They were built.
                </p>
              </Card>

              <Card className="p-8 bg-white border-l-4 border-[#B22234]">
                <p className="leading-relaxed">
                  Financial institutions trust synthetic humans more than real people. These engineered identities carry clean credit histories, consistent payment behaviors, and aged tradelines. They pass Know Your Customer checks. They qualify for credit. They disappear when the fraud matures.
                </p>
              </Card>

              <Card className="p-8 bg-white border-l-4 border-[#3C3B6E]">
                <p className="leading-relaxed">
                  The quantum threat is imminent. Quantum computing will render current encryption obsolete within years. Every synthetic identity framework relying on cryptographic identity verification will collapse. The institutions that fail to prepare now will face catastrophic exposure.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-[#1A1F2C] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-12">
              <Shield className="h-10 w-10 text-[#B22234] mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                The National Synthetic Identity Defense Framework
              </h2>
            </div>

            <p className="text-center text-xl mb-16 max-w-4xl mx-auto">
              Four integrated systems form the first unified synthetic identity prevention architecture in the United States.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="p-8 bg-[#3C3B6E] border-2 border-[#B22234]">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-[#B22234] mr-3" />
                  <h3 className="text-2xl font-bold text-white">PatriotProof™</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Fortress-level national identity and fraud defense core. The foundational layer that establishes verified human identity and maintains continuous integrity validation across all interconnected systems.
                </p>
              </Card>

              <Card className="p-8 bg-[#3C3B6E] border-2 border-[#B22234]">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-[#B22234] mr-3" />
                  <h3 className="text-2xl font-bold text-white">FraudDNA™</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Pattern analysis engine identifying synthetic identity behaviors. Detects aging strategies, fragment assembly techniques, and institutional trust exploitation through advanced behavioral forensics.
                </p>
              </Card>

              <Card className="p-8 bg-[#3C3B6E] border-2 border-[#B22234]">
                <div className="flex items-center mb-4">
                  <Lock className="h-8 w-8 text-[#B22234] mr-3" />
                  <h3 className="text-2xl font-bold text-white">AISF™</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Autonomous Intelligence Security Framework™. AI-driven real-time security layer for identity ecosystems. Continuously monitors, adapts, and responds to emerging synthetic identity construction techniques.
                </p>
              </Card>

              <Card className="p-8 bg-[#3C3B6E] border-2 border-[#B22234]">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-[#B22234] mr-3" />
                  <h3 className="text-2xl font-bold text-white">PPP™</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Proactive Prevention Platform™. Prevents synthetic identities before they enter the system. Intercepts construction attempts, blocks fragment aggregation, and eliminates vulnerabilities at the source.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Deliverables */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-12">
              <CheckCircle className="h-10 w-10 text-[#B22234] mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-[#1A1F2C]">
                What I Deliver as The Proactive AI PI
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Synthetic identity ecosystem investigation',
                  'Detection of engineered digital humans',
                  'Fragment reconstruction analysis',
                  'Financial aging pattern detection',
                  'Synthetic social graph discovery',
                  'Document entropy and forgery analysis',
                  'Quantum era identity risk forecasting',
                  'Executive briefings for banks and agencies',
                  'Full institutional defense roadmap'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-[#B22234] mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-800">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 bg-[#3C3B6E] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Why Work With The Proactive AI PI
            </h2>

            <div className="max-w-4xl mx-auto space-y-8 text-lg">
              <Card className="p-8 bg-[#1A1F2C] border-2 border-[#B22234]">
                <h3 className="text-2xl font-bold mb-4 text-[#B22234]">Triple Credential Authority</h3>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <span className="text-[#B22234] mr-3">▸</span>
                    <span>Cybersecurity Engineer with decades of infrastructure defense experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B22234] mr-3">▸</span>
                    <span>Artificial Intelligence Scientist specializing in pattern recognition and autonomous security systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B22234] mr-3">▸</span>
                    <span>Licensed Private Investigator conducting digital forensics and fraud investigations</span>
                  </li>
                </ul>
              </Card>

              <div className="text-center">
                <p className="text-xl leading-relaxed">
                  Decades of experience investigating fraud, digital identity architecture, and emerging national security threats. I investigate what institutions cannot see, defend what legacy systems cannot protect, and forecast what quantum computing will exploit.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#1A1F2C]">
              Protect Your Institution Before the Next Wave Hits
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-700">
              Synthetic identity fraud is accelerating. Quantum computing is approaching. The institutions that act now will survive. Those that wait will be exposed.
            </p>
            <Button 
              size="lg"
              className="bg-[#B22234] hover:bg-[#8B1A28] text-white text-xl px-12 py-6 h-auto"
              onClick={() => window.location.href = '/contact'}
            >
              Request Private Briefing
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SyntheticIdentityDefense;
