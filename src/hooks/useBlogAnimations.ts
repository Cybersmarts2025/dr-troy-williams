
import { Variants } from "framer-motion";

export const useBlogAnimations = () => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { opacity: 1, y: 0 }
  };

  return { containerVariants, itemVariants };
};

export default useBlogAnimations;
