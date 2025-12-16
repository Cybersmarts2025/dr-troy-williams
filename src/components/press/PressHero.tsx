
import React from 'react';
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import PressHeroContent from "./PressHeroContent";

const PressHero = () => {
  return (
    <>
      <PageBreadcrumb pageName="Press & Media" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f8f8f8] to-white py-12 mb-10">
        <div className="container mx-auto px-4">
          <PressHeroContent />
        </div>
      </section>
    </>
  );
};

export default PressHero;
