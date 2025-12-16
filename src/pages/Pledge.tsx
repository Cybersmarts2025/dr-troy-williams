import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import SeasonalBanner from '@/components/SeasonalBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flag, Download, CheckCircle } from 'lucide-react';

const Pledge = () => {
  const citizenChecklist = [
    "Verify sender identity before responding to emails or messages",
    "Use strong, unique passwords for all accounts",
    "Enable two-factor authentication wherever available",
    "Never share personal information with unverified sources",
    "Report suspicious activity to local authorities and ScamAtlas",
    "Stay informed about current fraud campaigns and AI threats"
  ];

  const businessChecklist = [
    "Implement comprehensive employee cybersecurity training",
    "Establish verification protocols for financial transactions",
    "Deploy AI-detection systems for fraud prevention",
    "Maintain regular security audits and updates",
    "Create incident response procedures",
    "Partner with cybersecurity professionals",
    "Document and report fraud attempts to authorities"
  ];

  return (
    <>
      <Helmet>
        <title>American Digital Stewardship Pledge | Dr. Troy Williams</title>
        <meta name="description" content="Join the American Digital Stewardship Pledge - a commitment to protecting our nation in the digital age through vigilance, verification, and civic responsibility." />
      </Helmet>
      
      <SeasonalBanner />
      <NavBar />
      <PageBreadcrumb pageName="The Pledge" />
      
      <section className="bg-gradient-to-b from-[#3C3B6E] to-[#1a1a3a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Flag className="h-12 w-12 text-[#B22234] mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">The American Digital Stewardship Pledge</h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto text-white/90">
            A commitment to protecting our nation in the digital age
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">The Pledge</CardTitle>
            <CardDescription>Our commitment to digital responsibility and national protection</CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-4">
              As an American citizen and digital steward, I pledge to:
            </p>
            <ul className="space-y-3 text-base">
              <li><strong>Protect</strong> myself, my family, and my community from digital threats through vigilance and education</li>
              <li><strong>Verify</strong> before trusting - questioning sources, confirming identities, and validating information</li>
              <li><strong>Report</strong> fraud attempts and cyber threats to protect fellow Americans</li>
              <li><strong>Learn</strong> continuously about emerging AI-driven threats and defense strategies</li>
              <li><strong>Support</strong> American businesses and citizens in building cyber resilience</li>
              <li><strong>Stand</strong> for truth, transparency, and accountability in the digital age</li>
            </ul>
            <p className="text-base mt-6 italic text-gray-600">
              Together, we build a safer digital America - one citizen, one business, one community at a time.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-[#B22234]" />
                Citizen Checklist
              </CardTitle>
              <CardDescription>Essential actions for every American</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {citizenChecklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-[#B22234]" />
                Business Checklist
              </CardTitle>
              <CardDescription>Protecting American enterprise</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {businessChecklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Button className="bg-[#B22234] hover:bg-[#8B1A28]" size="lg">
                <Download className="h-5 w-5 mr-2" />
                Download Printable Pledge (Coming Soon)
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Print and sign to display your commitment to American digital stewardship
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
};

export default Pledge;
