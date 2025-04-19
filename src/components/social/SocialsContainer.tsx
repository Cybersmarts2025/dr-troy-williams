
import { motion } from "framer-motion";
import { SocialButton } from "./SocialButton";
import { useContainerAnimation } from "@/hooks/useContainerAnimation";
import { socialLinks } from "@/config/socialLinks";

export const SocialsContainer = () => {
  const { container } = useContainerAnimation();

  return (
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
  );
};
