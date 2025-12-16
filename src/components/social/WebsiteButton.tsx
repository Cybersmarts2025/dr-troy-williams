import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";

interface WebsiteButtonProps {
  name: string;
  url: string;
}

export const WebsiteButton = ({ name, url }: WebsiteButtonProps) => {
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] // cubic-bezier for easeOut
      }
    }
  };

  return (
    <motion.div 
      variants={item}
      whileHover={{ 
        scale: 1.03, 
        transition: { duration: 0.2, type: 'spring', stiffness: 400 } 
      }}
    >
      <Button 
        variant="usaBlue" 
        size="lg" 
        className="gap-2 w-full shadow-lg transition-all duration-300"
        onClick={() => window.open(url, "_blank")}
      >
        <Globe className="h-5 w-5 flex-shrink-0" />
        <span className="truncate">{name}</span>
        <ExternalLink className="h-3 w-3 ml-auto opacity-70 flex-shrink-0" />
      </Button>
    </motion.div>
  );
};