
import { motion } from "framer-motion";
import { WebsiteButton } from "./WebsiteButton";
import { useContainerAnimation } from "@/hooks/useContainerAnimation";
import { websites } from "@/config/socialLinks";
import { WebsiteSkeleton } from "./WebsiteSkeleton";
import { ErrorBoundary } from "./ErrorBoundary";
import { useState, useEffect } from "react";

export const WebsitesContainer = () => {
  const { container } = useContainerAnimation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return (
    <div className="mt-20">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
        className="text-2xl font-semibold text-center mb-10 text-[#3C3B6E]"
      >
        My Websites
      </motion.h3>
      <WebsiteSkeleton />
    </div>
  );

  return (
    <div className="mt-20">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
        className="text-2xl font-semibold text-center mb-10 text-[#3C3B6E]"
      >
        My Websites
      </motion.h3>
      
      <ErrorBoundary>
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top row - first 3 websites */}
          <div className="flex justify-center gap-4 mb-4">
            {websites.slice(0, 3).map(site => (
              <WebsiteButton key={site.url} {...site} />
            ))}
          </div>
          
          {/* Bottom row - last 3 websites */}
          <div className="flex justify-center gap-4">
            {websites.slice(3, 6).map(site => (
              <WebsiteButton key={site.url} {...site} />
            ))}
          </div>
        </motion.div>
      </ErrorBoundary>
    </div>
  );
};

