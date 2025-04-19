
import React from 'react';
import { Mail } from "lucide-react";
import { SectionTitle } from "./social/SectionTitle";
import { BackgroundOverlay } from "./social/BackgroundOverlay";
import { SocialsContainer } from "./social/SocialsContainer";
import { WebsitesContainer } from "./social/WebsitesContainer";
import { useCopyProtection } from "./social/useCopyProtection";

const SocialLinks = () => {
  useCopyProtection('contact');
  
  return (
    <section 
      className="pt-16 pb-16 flag-overlay shield-bg select-none relative"
      id="contact"
    >
      <BackgroundOverlay shieldPatternUrl="/lovable-uploads/shield-pattern.png" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle icon={Mail} title="Connect With Me" />
        <SocialsContainer />
        <WebsitesContainer />
      </div>
    </section>
  );
};

export default SocialLinks;
