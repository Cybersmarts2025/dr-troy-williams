import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import BriefingFeed from '@/components/stolennation/BriefingFeed';
import { Shield } from 'lucide-react';

const StolenNation = () => {
  return (
    <>
      <Helmet>
        <title>Stolen Nation - National Intelligence Briefings | Dr. Troy Williams</title>
        <meta name="description" content="Access critical national intelligence briefings on AI threats, cyber warfare, and fraud targeting Americans. Independent civilian intelligence from Dr. Troy Williams." />
      </Helmet>
      
      <NavBar />
      <PageBreadcrumb pageName="Stolen Nation" />
      
      <section className="bg-gradient-to-b from-[#3C3B6E] to-[#1a1a3a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-[#B22234] mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Stolen Nation</h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto mb-8 text-white/90">
            National intelligence briefings exposing AI-driven fraud, cyber warfare, and threats targeting American citizens and businesses.
          </p>
          <p className="text-center text-sm text-white/70">
            Independent civilian intelligence • Subscribe for critical updates
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <BriefingFeed />
      </div>

      <Footer />
    </>
  );
};

export default StolenNation;
