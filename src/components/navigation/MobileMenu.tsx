
import { Link, useLocation } from "react-router-dom";
import { Info, Book, Briefcase, Video, Mail, Newspaper, Quote, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

const MobileMenu = ({ isOpen, onClose, onNavigate }: MobileMenuProps) => {
  const location = useLocation();
  
  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on homepage, navigate to home with section hash
      window.location.href = `/#${sectionId}`;
      onClose();
    } else {
      // If on homepage, use the scroll function
      onNavigate(sectionId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-[60px] left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-[9996] border-t border-gray-200 overflow-hidden"
        >
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link 
              to="/about" 
              className="flex items-center gap-2 py-3 px-4 text-[#D946EF] hover:bg-gray-100 rounded-md font-medium"
              onClick={onClose}
            >
              <Info className="h-5 w-5" />
              About
            </Link>
            <Link 
              to="/books" 
              className="flex items-center gap-2 py-3 px-4 text-[#0EA5E9] hover:bg-gray-100 rounded-md font-medium"
              onClick={onClose}
            >
              <Book className="h-5 w-5" />
              Books
            </Link>
            <Link 
              to="/press" 
              className="flex items-center gap-2 py-3 px-4 text-[#10B981] hover:bg-gray-100 rounded-md font-medium"
              onClick={onClose}
            >
              <Newspaper className="h-5 w-5" />
              Press
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center gap-2 py-3 px-4 text-[#8B5CF6] hover:bg-gray-100 rounded-md font-medium"
              onClick={onClose}
            >
              <FileText className="h-5 w-5" />
              Blog
            </Link>
            <button 
              onClick={() => handleNavigation('work')}
              className="flex items-center gap-2 py-3 px-4 text-[#F97316] hover:bg-gray-100 rounded-md text-left font-medium"
            >
              <Briefcase className="h-5 w-5" />
              Work History
            </button>
            <button 
              onClick={() => handleNavigation('testimonials')}
              className="flex items-center gap-2 py-3 px-4 text-[#8B5CF6] hover:bg-gray-100 rounded-md text-left font-medium"
            >
              <Quote className="h-5 w-5" />
              Testimonials
            </button>
            <button 
              onClick={() => handleNavigation('videos')}
              className="flex items-center gap-2 py-3 px-4 text-[#1EAEDB] hover:bg-gray-100 rounded-md text-left font-medium"
            >
              <Video className="h-5 w-5" />
              Videos
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className="flex items-center gap-2 py-3 px-4 text-[#ea384c] hover:bg-gray-100 rounded-md text-left font-medium"
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
