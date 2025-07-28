
import React from 'react';
import { Mail } from "lucide-react";
import { SectionTitle } from "./social/SectionTitle";
import { BackgroundOverlay } from "./social/BackgroundOverlay";
import { SocialsContainer } from "./social/SocialsContainer";
import { WebsitesContainer } from "./social/WebsitesContainer";
import { useCopyProtection } from "./social/useCopyProtection";
import { ErrorBoundary } from "./social/ErrorBoundary";

const SocialLinks = () => {
  useCopyProtection('contact');
  
  return (
    <ErrorBoundary>
      <section 
        className="pt-16 pb-16 flag-overlay shield-bg select-none relative"
        id="contact"
      >
        <BackgroundOverlay shieldPatternUrl="" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle icon={Mail} title="Connect With Me" />
          <SocialsContainer />
          <WebsitesContainer />
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default SocialLinks;

