import { useLocation } from "react-router-dom";
import { 
  Info, Book, Briefcase, Video, Mail, Newspaper, Quote, FileText, Flag, Award, 
  Target, Shield, User, GraduationCap, Calendar, Cpu, Globe, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenuItem from "./MobileMenuItem";
import { Separator } from "@/components/ui/separator";

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
      window.location.href = `/#${sectionId}`;
      onClose();
    } else {
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
          className="fixed top-[60px] left-0 w-full bg-background/95 backdrop-blur-sm shadow-lg z-[9996] border-t border-border overflow-y-auto max-h-[calc(100vh-60px)]"
        >
          <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
            {/* About Section */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2">About</p>
            <MobileMenuItem 
              to="/about" 
              icon={Info} 
              label="About" 
              onClick={onClose}
              color="#D946EF" 
            />
            <MobileMenuItem 
              to="/master-bio" 
              icon={User} 
              label="Master Bio" 
              onClick={onClose}
              color="#8B5CF6" 
            />
            <MobileMenuItem 
              to="/credentials" 
              icon={GraduationCap} 
              label="Credentials" 
              onClick={onClose}
              color="#0EA5E9" 
            />
            <MobileMenuItem 
              to="/timeline" 
              icon={Calendar} 
              label="Timeline" 
              onClick={onClose}
              color="#10B981" 
            />
            <MobileMenuItem 
              to="/legacy" 
              icon={Flag} 
              label="Legacy" 
              onClick={onClose}
              color="#B22234" 
            />
            
            <Separator className="my-2" />
            
            {/* Research & Technology */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2">Research & Technology</p>
            <MobileMenuItem 
              to="/research-footprint" 
              icon={Book} 
              label="Research Footprint" 
              onClick={onClose}
              color="#0EA5E9" 
            />
            <MobileMenuItem 
              to="/technology-stack" 
              icon={Cpu} 
              label="Technology Stack" 
              onClick={onClose}
              color="#6366F1" 
            />
            <MobileMenuItem 
              to="/national-mission" 
              icon={Globe} 
              label="National Mission" 
              onClick={onClose}
              color="#B22234" 
            />
            <MobileMenuItem 
              to="/ip" 
              icon={Award} 
              label="Intellectual Property" 
              onClick={onClose}
              color="#f97316" 
            />
            
            <Separator className="my-2" />
            
            {/* Content */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2">Content</p>
            <MobileMenuItem 
              to="/books" 
              icon={Book} 
              label="Books" 
              onClick={onClose}
              color="#0EA5E9" 
            />
            <MobileMenuItem 
              to="/blog" 
              icon={FileText} 
              label="Blog" 
              onClick={onClose}
              color="#8B5CF6" 
            />
            
            <Separator className="my-2" />
            
            {/* Press & Media */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2">Press & Media</p>
            <MobileMenuItem 
              to="/press" 
              icon={Newspaper} 
              label="Press" 
              onClick={onClose}
              color="#10B981" 
            />
            <MobileMenuItem 
              to="/press-kit" 
              icon={FileText} 
              label="Press Kit" 
              onClick={onClose}
              color="#8B5CF6" 
            />
            <MobileMenuItem 
              to="/validation" 
              icon={CheckCircle} 
              label="Verification Archive" 
              onClick={onClose}
              color="#10B981" 
            />
            
            <Separator className="my-2" />
            
            {/* Programs */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2">Programs</p>
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
            
            <Separator className="my-2" />
            
            {/* Quick Links */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 pt-2">Quick Links</p>
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
            
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
