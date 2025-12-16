import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SocialButtonProps {
  icon: LucideIcon;
  label: string;
  url: string;
}

export const SocialButton = ({ icon: Icon, label, url }: SocialButtonProps) => {
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
        transition: { duration: 0.2 } 
      }}
    >
      <Button 
        variant="usaRed" 
        size="lg" 
        className="gap-2 shadow-lg transition-all duration-300"
        onClick={() => window.open(url, "_blank")}
        aria-label={`Visit ${label} (opens in new tab)`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span>{label}</span>
      </Button>
    </motion.div>
  );
};