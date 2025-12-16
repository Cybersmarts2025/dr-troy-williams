
import { motion } from "framer-motion";
import { SocialButton } from "./SocialButton";
import { useContainerAnimation } from "@/hooks/useContainerAnimation";
import { socialLinks } from "@/config/socialLinks";
import { SocialSkeleton } from "./SocialSkeleton";
import { ErrorBoundary } from "./ErrorBoundary";
import { useState, useEffect } from "react";

export const SocialsContainer = () => {
  const { container } = useContainerAnimation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SocialSkeleton />;

  return (
    <ErrorBoundary>
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-16"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {socialLinks.map((link) => (
          <SocialButton key={link.url} {...link} />
        ))}
      </motion.div>
    </ErrorBoundary>
  );
};

