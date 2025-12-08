import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, TrendingUp } from 'lucide-react';

const ScamAtlas = () => {
  return (
    <>
      <Helmet>
        <title>ScamAtlas™ - National Fraud Intelligence Map | Dr. Troy Williams</title>
        <meta name="description" content="ScamAtlas empowers citizens with visibility into nationwide fraud patterns and AI-driven deception campaigns affecting Americans." />
      </Helmet>
      
      <NavBar />
      <PageBreadcrumb pageName="ScamAtlas" />
      
      <section className="bg-gradient-to-b from-[#3C3B6E] to-[#1a1a3a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="h-12 w-12 text-[#B22234] mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">ScamAtlas™</h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto mb-4 text-white">
            ScamAtlas™ empowers citizens with visibility into nationwide fraud patterns and AI-driven deception campaigns.
          </p>
          <p className="text-center text-sm text-white/85">
            Real-time fraud intelligence • Protect your community
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#B22234]" />
              National Fraud Awareness Map
            </CardTitle>
            <CardDescription>
              Interactive visualization of fraud patterns across the United States
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Fraud awareness heatmap visualization<br />
                <span className="text-sm">(Interactive map in development)</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-[#B22234]" />
              Report a Scam
            </CardTitle>
            <CardDescription>
              Help protect your fellow Americans by reporting fraud attempts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              Your reports help build a comprehensive picture of fraud campaigns targeting American citizens and businesses.
            </p>
            <Button className="bg-[#B22234] hover:bg-[#8B1A28]">
              Report Fraud (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
};

export default ScamAtlas;
