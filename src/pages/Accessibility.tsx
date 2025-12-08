import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Calendar, Mail, Phone, FileCheck } from 'lucide-react';

const Accessibility = () => {
  const complianceFeatures = [
    "Skip navigation links for keyboard users",
    "ARIA labels on all interactive elements",
    "Keyboard-accessible video controls",
    "Screen reader optimized content structure",
    "WCAG AA color contrast ratios (4.5:1 minimum)",
    "Focus indicators for keyboard navigation",
    "Alt text on all images",
    "Semantic HTML structure",
    "Reduced motion support for vestibular disorders",
    "Live regions for dynamic content updates"
  ];

  return (
    <>
      <Helmet>
        <title>Accessibility Statement | Dr. Troy Williams</title>
        <meta name="description" content="Accessibility statement and ADA compliance certification for DrTroyWilliams.net. Verified by Verified Safe Cyber Security Solutions." />
      </Helmet>
      
      <NavBar />
      <PageBreadcrumb pageName="Accessibility" />
      
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#3C3B6E] to-[#1a1a3a] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-amber-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Accessibility Statement</h1>
            </div>
            <p className="text-xl max-w-3xl mx-auto text-white">
              Our commitment to digital accessibility and ADA compliance
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Certification Badge */}
            <Card className="border-2 border-green-500 bg-green-50">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileCheck className="h-8 w-8" />
                  ADA Compliance Certification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-white rounded-full border-4 border-green-500 flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-4">
                      VERIFIED ADA COMPLIANT
                    </Badge>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      Certified by Verified Safe Cyber Security Solutions
                    </h3>
                    <div className="flex items-center gap-2 text-green-700 mb-4">
                      <Calendar className="h-5 w-5" />
                      <span className="font-semibold">Scan Date: December 8, 2025</span>
                    </div>
                    <p className="text-gray-700">
                      This website has been independently scanned and verified to meet ADA (Americans with Disabilities Act) 
                      accessibility standards and WCAG 2.1 Level AA compliance requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commitment Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#3C3B6E]">Our Commitment to Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-gray-700">
                  Dr. Troy Williams and Cybersmarts.ai LLC are committed to ensuring digital accessibility for people 
                  with disabilities. We continually improve the user experience for everyone and apply the relevant 
                  accessibility standards to ensure we provide equal access to all users.
                </p>
                <p className="text-gray-700">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
                  These guidelines explain how to make web content more accessible for people with disabilities 
                  and more user-friendly for everyone.
                </p>
              </CardContent>
            </Card>

            {/* Accessibility Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#3C3B6E]">Accessibility Features Implemented</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complianceFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Standards Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#3C3B6E]">Standards We Follow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-[#3C3B6E]/5 rounded-lg">
                    <h4 className="font-bold text-[#3C3B6E] mb-2">WCAG 2.1 Level AA</h4>
                    <p className="text-sm text-gray-600">Web Content Accessibility Guidelines</p>
                  </div>
                  <div className="text-center p-6 bg-[#B22234]/5 rounded-lg">
                    <h4 className="font-bold text-[#B22234] mb-2">ADA Compliance</h4>
                    <p className="text-sm text-gray-600">Americans with Disabilities Act</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">Section 508</h4>
                    <p className="text-sm text-gray-600">Federal Accessibility Standards</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#3C3B6E]">Feedback & Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  We welcome your feedback on the accessibility of this website. If you encounter any accessibility 
                  barriers or have suggestions for improvement, please contact us:
                </p>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#3C3B6E] rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#3C3B6E]">Email</p>
                      <a href="mailto:verifiedsafe8@gmail.com" className="text-[#B22234] hover:underline">
                        verifiedsafe8@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-6">
                  We aim to respond to accessibility feedback within 2 business days and to propose a solution 
                  within 10 business days.
                </p>
              </CardContent>
            </Card>

            {/* Verification Badge for Footer */}
            <div className="text-center py-8 border-t">
              <p className="text-sm text-gray-600 mb-4">
                This accessibility statement was last updated on December 8, 2025.
              </p>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Shield className="h-4 w-4" />
                Verified Safe Cyber Security Solutions - ADA Compliant
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Accessibility;
