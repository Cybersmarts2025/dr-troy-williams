
import { Link } from "react-router-dom";
import { Info, Book, Briefcase, Video, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

const MobileMenu = ({ isOpen, onClose, onNavigate }: MobileMenuProps) => {
  const handleNavigation = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-[60px] left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-[98] border-t border-gray-200 overflow-hidden"
        >
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link 
              to="/about" 
              className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md"
              onClick={onClose}
            >
              <Info className="h-5 w-5" />
              About
            </Link>
            <Link 
              to="/books" 
              className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md"
              onClick={onClose}
            >
              <Book className="h-5 w-5" />
              Books
            </Link>
            <button 
              onClick={() => handleNavigation('work')}
              className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md text-left"
            >
              <Briefcase className="h-5 w-5" />
              Work History
            </button>
            <button 
              onClick={() => handleNavigation('videos')}
              className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md text-left"
            >
              <Video className="h-5 w-5" />
              Videos
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md text-left"
            >
              <Mail className="h-5 w-5" />
              Contact
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
