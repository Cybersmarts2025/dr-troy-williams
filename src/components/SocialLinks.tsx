
import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SocialButton } from "./social/SocialButton";
import { WebsiteButton } from "./social/WebsiteButton";
import { SectionTitle } from "./social/SectionTitle";
import { socialLinks, websites } from "@/config/socialLinks";
import { useContainerAnimation } from "@/hooks/useContainerAnimation";

const SocialLinks = () => {
  const { container } = useContainerAnimation();

  useEffect(() => {
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    const preventSelect = (e: Event) => {
      e.preventDefault();
      return false;
    };
    const section = document.getElementById('contact');
    if (section) {
      section.addEventListener('copy', preventCopy);
      section.addEventListener('contextmenu', preventContextMenu);
      section.addEventListener('selectstart', preventSelect);
      return () => {
        section.removeEventListener('copy', preventCopy);
        section.removeEventListener('contextmenu', preventContextMenu);
        section.removeEventListener('selectstart', preventSelect);
      };
    }
  }, []);
  
  return (
    <section 
      className="pt-16 pb-16 flag-overlay shield-bg select-none relative"
      id="contact"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#3C3B6E]/10 z-0"></div>
      
      <div className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/shield-pattern.png')", 
          backgroundSize: "200px",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle icon={Mail} title="Connect With Me" />
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16" // Increased bottom margin
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {socialLinks.map((link) => (
            <SocialButton key={link.url} {...link} />
          ))}
        </motion.div>

        <div className="mt-20"> {/* Increased top margin */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-2xl font-semibold text-center mb-10 text-[#3C3B6E]" // Increased bottom margin
          >
            My Websites
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {websites.map(site => (
              <WebsiteButton key={site.url} {...site} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
