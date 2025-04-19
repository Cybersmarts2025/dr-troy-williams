
import { motion } from "framer-motion";
import { WebsiteButton } from "./WebsiteButton";
import { useContainerAnimation } from "@/hooks/useContainerAnimation";
import { websites } from "@/config/socialLinks";

export const WebsitesContainer = () => {
  const { container } = useContainerAnimation();

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
  );
};
