
import { useLocation } from "react-router-dom";
import { Info, Book, Briefcase, Video, Mail, Newspaper, Quote, FileText, Flag, Award, Target, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenuItem from "./MobileMenuItem";

interface MobileMenuProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: string) => void;
}

const MobileMenu = ({ children, isOpen = true, onClose, onNavigate = () => {} }: MobileMenuProps) => {
  const location = useLocation();
  
  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on homepage, navigate to home with section hash
      window.location.href = `/#${sectionId}`;
      onClose();
    } else {
      // If on homepage, use the scroll function
      onNavigate(sectionId);
      onClose();
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
            <MobileMenuItem 
              to="/about" 
              icon={Info} 
              label="About" 
              onClick={onClose}
              color="#D946EF" 
            />
            
            <MobileMenuItem 
              to="/legacy" 
              icon={Flag} 
              label="Legacy" 
              onClick={onClose}
              color="#B22234" 
            />
            
            <MobileMenuItem 
              to="/books" 
              icon={Book} 
              label="Books" 
              onClick={onClose}
              color="#0EA5E9" 
            />
            
            <MobileMenuItem 
              to="/press" 
              icon={Newspaper} 
              label="Press" 
              onClick={onClose}
              color="#10B981" 
            />
            
            <MobileMenuItem 
              to="/blog" 
              icon={FileText} 
              label="Blog" 
              onClick={onClose}
              color="#8B5CF6" 
            />
            
            <MobileMenuItem 
              to="/job-ready-360" 
              icon={Target} 
              label="Job Ready 360" 
              onClick={onClose}
              color="#f97316" 
            />
            
            <MobileMenuItem 
              to="/stolennation" 
              icon={Flag} 
              label="Stolen Nation" 
              onClick={onClose}
              color="#B22234" 
            />
            
            <MobileMenuItem 
              to="/synthetic-identity-defense" 
              icon={Shield} 
              label="Synthetic Identity Defense" 
              onClick={onClose}
              color="#B22234" 
            />
            
            <MobileMenuItem
              to="/certifications" 
              icon={Award} 
              label="Certifications" 
              onClick={onClose}
              color="#6366F1" 
            />
            <MobileMenuItem 
              icon={Briefcase} 
              label="Work History" 
              onClick={() => handleNavigation('work')}
              color="#F97316" 
            />
            
            <MobileMenuItem 
              icon={Quote} 
              label="Testimonials" 
              onClick={() => handleNavigation('testimonials')}
              color="#8B5CF6" 
            />
            
            <MobileMenuItem 
              icon={Video} 
              label="Videos" 
              onClick={() => handleNavigation('videos')}
              color="#1EAEDB" 
            />
            
            <MobileMenuItem 
              icon={Mail} 
              label="Contact" 
              onClick={() => handleNavigation('contact')}
              color="#ea384c" 
            />
            
            {/* Render children at the end of the menu */}
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
