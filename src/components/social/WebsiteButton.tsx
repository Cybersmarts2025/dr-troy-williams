
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";

interface WebsiteButtonProps {
  name: string;
  url: string;
}

export const WebsiteButton = ({ name, url }: WebsiteButtonProps) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={item}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Button 
        variant="usaBlue" 
        size="lg" 
        className="gap-2 w-full shadow-lg hover:shadow-xl transition-all"
        onClick={() => window.open(url, "_blank")}
      >
        <Globe className="h-5 w-5" />
        <span>{name}</span>
        <ExternalLink className="h-3 w-3 ml-auto opacity-70" />
      </Button>
    </motion.div>
  );
};
