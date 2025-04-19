
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SocialButtonProps {
  icon: LucideIcon;
  label: string;
  url: string;
}

export const SocialButton = ({ icon: Icon, label, url }: SocialButtonProps) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={item}>
      <Button 
        variant="usaRed" 
        size="lg" 
        className="gap-2 shadow-lg hover:shadow-xl transition-all"
        onClick={() => window.open(url, "_blank")}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </motion.div>
  );
};
