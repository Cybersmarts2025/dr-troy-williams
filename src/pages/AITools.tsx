import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AIChatWidget from '@/components/ai/AIChatWidget';
import AIImageGenerator from '@/components/ai/AIImageGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Image, MessageCircle, Sparkles, Zap, Shield, FileText, Calendar } from 'lucide-react';

const AITools = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Cybersecurity Q&A Assistant',
      description: 'Get instant answers to cybersecurity questions, threat analysis, and security best practices from Dr. Williams\' AI assistant.',
      badge: 'General Chat',
      color: 'text-blue-600'
    },
    {
      icon: FileText,
      title: 'Research Assistant',
      description: 'Analyze cybersecurity research papers, summarize findings, and get help with literature reviews and academic work.',
      badge: 'Research Mode',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Consultation Helper',
      description: 'Get guidance on consultation services, assess your security needs, and understand available cybersecurity solutions.',
      badge: 'Consultation',
      color: 'text-purple-600'
    },
    {
      icon: Image,
      title: 'AI Image Generation',
      description: 'Create professional cybersecurity and technology-themed images for presentations, reports, and marketing materials.',
      badge: 'Image Gen',
      color: 'text-orange-600'
    }
  ];

  const aiCapabilities = [
    'Business Email Compromise (BEC) Prevention',
    'Automotive Cybersecurity Analysis', 
    'AI Security Implementation',
    'Fraud Detection Strategies',
    'Intellectual Property Protection',
    'Security Awareness Training',
    'Threat Intelligence Analysis',
    'Risk Assessment Methodologies'
  ];

  return (
    <>
      <Helmet>
        <title>AI-Powered Cybersecurity Tools | Dr. Troy Williams</title>
        <meta 
          name="description" 
          content="Access Dr. Troy Williams' AI-powered cybersecurity tools including intelligent Q&A assistant, research helper, consultation guidance, and professional image generation. Get expert cybersecurity insights powered by advanced AI." 
        />
        <meta name="keywords" content="AI cybersecurity tools, cybersecurity assistant, AI research helper, cybersecurity consultation, AI image generation, Dr Troy Williams, CyberSmarts AI" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI-Powered Cybersecurity Tools | Dr. Troy Williams" />
        <meta property="og:description" content="Access advanced AI tools for cybersecurity analysis, research assistance, and professional consultation guidance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drtroywilliams.com/ai-tools" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Dr. Troy Williams AI Cybersecurity Tools",
            "description": "AI-powered cybersecurity tools for expert analysis, research, and consultation",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Person",
              "name": "Dr. Troy Williams",
              "jobTitle": "Cybersecurity Expert"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <NavBar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#3C3B6E] via-[#2A2952] to-[#1E1B3D] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full">
                <Bot className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Cybersecurity Tools
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Leverage advanced AI technology to enhance your cybersecurity knowledge, 
              research capabilities, and decision-making processes.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-4">
                Available AI Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Each tool is specifically designed to address different cybersecurity needs 
                and expertise levels, from beginner questions to advanced research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-[#3C3B6E]/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-lg bg-gray-50 ${feature.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-4">
                AI Expertise Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our AI assistant is trained on Dr. Williams' extensive cybersecurity knowledge 
                and can provide expert guidance in these specialized areas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiCapabilities.map((capability, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#3C3B6E] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">{capability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Generator Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-4">
                AI Image Generator
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create professional cybersecurity and technology-themed images for your 
                presentations, reports, and marketing materials.
              </p>
            </div>
            
            <AIImageGenerator />
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-16 bg-[#3C3B6E] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Click the chat icon in the bottom-right corner to start interacting with 
              our AI cybersecurity assistant. Choose from different modes based on your needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <MessageCircle className="h-4 w-4" />
                General cybersecurity questions
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FileText className="h-4 w-4" />
                Research assistance and analysis
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Calendar className="h-4 w-4" />
                Consultation and service guidance
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        {/* AI Chat Widget - Default to general mode for this page */}
        <AIChatWidget defaultChatType="general" />
      </div>
    </>
  );
};

export default AITools;