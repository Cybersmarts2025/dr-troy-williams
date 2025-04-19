
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface BackToTopButtonProps {
  isVisible: boolean;
}

const BackToTopButton = ({ isVisible }: BackToTopButtonProps) => {
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 bg-[#B22234] text-white p-3 rounded-full shadow-lg hover:bg-[#9B0000] z-[100] transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
