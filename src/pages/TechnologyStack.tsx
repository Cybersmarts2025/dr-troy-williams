import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Fingerprint, 
  Brain, 
  Target, 
  Map, 
  Activity,
  Globe,
  Gavel,
  Lock,
  Eye,
  Layers,
  Key,
  Cpu,
  Network,
  Database,
  Server
} from 'lucide-react';
import { motion } from 'framer-motion';

const TechnologyStack = () => {
  const coreSystems = [
    {
      name: "PatriotProof™",
      icon: Shield,
      description: "Identity verification system ensuring only legitimate U.S. citizens access protected systems",
      features: ["Biometric verification", "Document authentication", "Real-time validation", "Fraud prevention"],
      status: "Active"
    },
    {
      name: "FraudDNA™",
      icon: Fingerprint,
      description: "Advanced fraud detection engine that maps and tracks criminal identity patterns",
      features: ["Pattern recognition", "Behavioral analysis", "Cross-reference mapping", "Predictive alerts"],
      status: "Active"
    },
    {
      name: "AISF™",
      icon: Brain,
      description: "Autonomous Intelligence Security Framework - Self-governing AI defense architecture",
      features: ["Zero trust architecture", "Legal compliance engine", "Post-quantum ready", "U.S. sovereign"],
      status: "Active"
    },
    {
      name: "PPP™",
      icon: Target,
      description: "Proactive Prevention Platform - Predictive threat neutralization system",
      features: ["Threat prediction", "Automated response", "Risk scoring", "Prevention analytics"],
      status: "Active"
    }
  ];

  const intelligenceSystems = [
    {
      name: "ScamAtlas™",
      icon: Map,
      description: "National fraud intelligence mapping system tracking scam operations across the United States",
      capabilities: ["Geographic tracking", "Real-time updates", "Pattern visualization", "Threat corridors"]
    },
    {
      name: "Identity Threat Flow Tracker",
      icon: Activity,
      description: "Monitors and visualizes identity theft patterns and synthetic identity creation flows",
      capabilities: ["Flow analysis", "Origin tracking", "Velocity monitoring", "Network mapping"]
    },
    {
      name: "National Fraud Defense Grid",
      icon: Globe,
      description: "Interconnected defense network providing nationwide fraud protection coverage",
      capabilities: ["Multi-agency integration", "Real-time sharing", "Coordinated response", "National coverage"]
    }
  ];

  const complianceSystems = [
    {
      name: "AI Criminal Code",
      icon: Gavel,
      description: "Regulatory framework embedding criminal law compliance directly into AI decision-making",
      components: ["Legal validation layer", "Compliance audit trail", "Ethical constraints", "Accountability logging"]
    },
    {
      name: "Behavioral Intelligence Layer",
      icon: Eye,
      description: "Deep behavioral analysis system identifying suspicious patterns before fraud occurs",
      components: ["User behavior profiling", "Anomaly detection", "Intent analysis", "Risk classification"]
    },
    {
      name: "Synthetic Identity Defense Suite",
      icon: Layers,
      description: "Comprehensive toolkit for detecting and preventing synthetic identity fraud",
      components: ["Document verification", "Data consistency checks", "History validation", "Creation detection"]
    }
  ];

  const quantumSecurity = {
    encryption: {
      name: "Proactive Encryption Strategy",
      algorithms: [
        { name: "CRYSTALS-Kyber", purpose: "Key Encapsulation", status: "NIST Approved" },
        { name: "CRYSTALS-Dilithium", purpose: "Digital Signatures", status: "NIST Approved" }
      ]
    },
    biometrics: {
      name: "Quantum Biometric Systems",
      features: ["Multi-modal authentication", "Liveness detection", "Quantum-resistant storage", "Continuous verification"]
    }
  };

  return (
    <>
      <Helmet>
        <title>Technology & System Architecture | Dr. Troy Williams, PhD</title>
        <meta name="description" content="Comprehensive breakdown of proprietary fraud prevention and identity security technologies including PatriotProof™, FraudDNA™, AISF™, and quantum-secure systems." />
      </Helmet>
      
      <NavBar />
      <PageBreadcrumb pageName="Technology & System Architecture" />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Enterprise Architecture</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technology & System Architecture
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive suite of proprietary technologies designed to protect American citizens 
              and institutions from identity fraud, synthetic identity attacks, and AI-driven threats.
            </p>
          </motion.div>

          {/* Architecture Overview Diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Network className="h-6 w-6 text-primary" />
                  System Architecture Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Input Layer */}
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <span className="font-semibold text-sm">Input Layer</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted rounded text-center">Biometric Data</div>
                      <div className="p-2 bg-muted rounded text-center">Identity Documents</div>
                      <div className="p-2 bg-muted rounded text-center">Behavioral Signals</div>
                      <div className="p-2 bg-muted rounded text-center">Transaction Data</div>
                    </div>
                  </div>
                  
                  {/* Processing Core */}
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <Cpu className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <span className="font-semibold text-sm">Processing Core</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-primary/20 rounded text-center font-medium">PatriotProof™</div>
                      <div className="p-2 bg-primary/20 rounded text-center font-medium">FraudDNA™</div>
                      <div className="p-2 bg-primary/20 rounded text-center font-medium">AISF™</div>
                      <div className="p-2 bg-primary/20 rounded text-center font-medium">PPP™</div>
                    </div>
                  </div>
                  
                  {/* Output Layer */}
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <Server className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <span className="font-semibold text-sm">Output Layer</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-muted rounded text-center">Threat Alerts</div>
                      <div className="p-2 bg-muted rounded text-center">Risk Scores</div>
                      <div className="p-2 bg-muted rounded text-center">Verification Results</div>
                      <div className="p-2 bg-muted rounded text-center">Audit Logs</div>
                    </div>
                  </div>
                </div>
                
                {/* Flow Arrows */}
                <div className="flex justify-center items-center gap-8 mt-6 text-muted-foreground">
                  <span className="text-sm">Data Ingestion →</span>
                  <span className="text-sm">Analysis & Decision →</span>
                  <span className="text-sm">Action & Response</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Core Systems Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Core Defense Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreSystems.map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <system.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{system.name}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-600 dark:text-green-400">
                          {system.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{system.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {system.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Intelligence Systems */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              Intelligence & Mapping Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {intelligenceSystems.map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3">
                        <system.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{system.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{system.description}</p>
                      <div className="space-y-2">
                        {system.capabilities.map((cap) => (
                          <div key={cap} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {cap}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Compliance & Behavioral Systems */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Gavel className="h-6 w-6 text-primary" />
              Compliance & Behavioral Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {complianceSystems.map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="h-full bg-card/50">
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3">
                        <system.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{system.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{system.description}</p>
                      <div className="space-y-2">
                        {system.components.map((comp) => (
                          <div key={comp} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {comp}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Quantum Security Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              Quantum-Secure Infrastructure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Encryption Strategy */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="h-full border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Key className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{quantumSecurity.encryption.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {quantumSecurity.encryption.algorithms.map((algo) => (
                        <div key={algo.name} className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{algo.name}</span>
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-600 dark:text-blue-400">
                              {algo.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{algo.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Biometric Systems */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="h-full border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Fingerprint className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{quantumSecurity.biometrics.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {quantumSecurity.biometrics.features.map((feature) => (
                        <div key={feature} className="p-3 bg-muted/50 rounded-lg text-center">
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* Technology Stack Summary */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-4">Built for American Sovereignty</h2>
                  <p className="text-muted-foreground mb-6">
                    Every system in this technology stack is designed, developed, and hosted within 
                    U.S. jurisdiction, ensuring complete data sovereignty and compliance with American 
                    legal frameworks. No foreign cloud dependencies. No offshore data routing.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge className="bg-primary/20 text-primary">100% U.S. Hosted</Badge>
                    <Badge className="bg-primary/20 text-primary">Post-Quantum Ready</Badge>
                    <Badge className="bg-primary/20 text-primary">NIST Compliant</Badge>
                    <Badge className="bg-primary/20 text-primary">Zero Trust Architecture</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default TechnologyStack;
