
import { Facebook, Linkedin, Youtube, Mail, Globe, Twitter, ExternalLink, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { motion } from "framer-motion";

const SocialLinks = () => {
  const websites = [
    {
      name: "Database Records",
      url: "https://www.databaserecords.com"
    }, 
    {
      name: "CyberSmarts AI",
      url: "https://www.cybersmarts.ai"
    }, 
    {
      name: "Legal Smarts",
      url: "https://www.legalsmarts.net"
    }, 
    {
      name: "Grant Smarts",
      url: "https://www.grantsmarts.net"
    }, 
    {
      name: "Cyber OSINT",
      url: "https://www.cyberosint.net"
    }, 
    {
      name: "Paper Shield",
      url: "https://www.papershield.net"
    }, 
    {
      name: "Patriot Proof",
      url: "https://www.patriotproof.net"
    }, 
    {
      name: "Dr. Troy Williams",
      url: "https://www.drtroywilliams.net"
    }
  ];
  
  useEffect(() => {
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    const preventSelect = (e: Event) => {
      e.preventDefault();
      return false;
    };
    const section = document.getElementById('contact');
    if (section) {
      section.addEventListener('copy', preventCopy);
      section.addEventListener('contextmenu', preventContextMenu);
      section.addEventListener('selectstart', preventSelect);
      return () => {
        section.removeEventListener('copy', preventCopy);
        section.removeEventListener('contextmenu', preventContextMenu);
        section.removeEventListener('selectstart', preventSelect);
      };
    }
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="pt-16 pb-0 flag-overlay shield-bg select-none relative" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#3C3B6E]/10 z-0"></div>
      
      <div className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/shield-pattern.png')", 
          backgroundSize: "200px",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B22234] to-transparent flex-grow"></div>
          <h2 className="text-3xl font-bold text-center mx-4 text-[#B22234] flex items-center gap-2">
            <Mail className="h-7 w-7" />
            <span>Connect With Me</span>
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B22234] to-transparent flex-grow"></div>
        </motion.div>
        
        {/* Social Media Links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={item}>
            <Button 
              variant="usaRed" 
              size="lg" 
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open("https://www.youtube.com/@cybersmarts2025", "_blank")}
            >
              <Youtube className="h-5 w-5" />
              <span>YouTube</span>
            </Button>
          </motion.div>
          
          <motion.div variants={item}>
            <Button 
              variant="usaRed" 
              size="lg" 
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open("https://www.linkedin.com/in/cybersmarts/", "_blank")}
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </Button>
          </motion.div>
          
          <motion.div variants={item}>
            <Button 
              variant="usaRed" 
              size="lg" 
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open("https://www.facebook.com/verifiedsafe", "_blank")}
            >
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </Button>
          </motion.div>
          
          <motion.div variants={item}>
            <Button 
              variant="usaRed" 
              size="lg" 
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open("https://twitter.com/TroyWilliamsAI", "_blank")}
            >
              <Twitter className="h-5 w-5" />
              <span>Twitter</span>
            </Button>
          </motion.div>
          
          <motion.div variants={item}>
            <Button 
              variant="usaRed" 
              size="lg" 
              className="gap-2 shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.open("mailto:verifiedsafe8@gmail.com")}
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Websites Grid */}
        <div className="mt-12">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-2xl font-semibold text-center mb-6 text-[#3C3B6E]"
          >
            My Websites
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {websites.map(site => (
              <motion.div 
                key={site.url}
                variants={item}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button 
                  variant="usaBlue" 
                  size="lg" 
                  className="gap-2 w-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open(site.url, "_blank")}
                >
                  <Globe className="h-5 w-5" />
                  <span>{site.name}</span>
                  <ExternalLink className="h-3 w-3 ml-auto opacity-70" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Footer Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 bg-[#3C3B6E] text-white py-8 border-t-4 border-[#B22234]"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-[#F97316]" />
              <h3 className="text-xl font-bold">Dr. Troy Williams</h3>
            </div>
            
            <p className="text-center mb-4 font-medium">
              Protecting America Through Technology.<br />
              <span className="text-[#F97316]">Built in Tennessee. By Americans. For Americans.</span>
            </p>
            
            <div className="text-sm text-white/70 mt-4">
              <p>© {new Date().getFullYear()} Dr. Troy Williams. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SocialLinks;
