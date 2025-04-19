import { Facebook, Instagram, Linkedin, Youtube, Mail, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
const SocialLinks = () => {
  const websites = [{
    name: "Database Records",
    url: "https://www.databaserecords.com"
  }, {
    name: "CyberSmarts AI",
    url: "https://www.cybersmarts.ai"
  }, {
    name: "Legal Smarts",
    url: "https://www.legalsmarts.net"
  }, {
    name: "Grant Smarts",
    url: "https://www.grantsmarts.net"
  }, {
    name: "Cyber OSINT",
    url: "https://www.cyberosint.net"
  }, {
    name: "Paper Shield",
    url: "https://www.papershield.net"
  }, {
    name: "Patriot Proof",
    url: "https://www.patriotproof.net"
  }, {
    name: "Dr. Troy Williams",
    url: "https://www.drtroywilliams.net"
  }];
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
  return <section className="py-12 flag-overlay shield-bg select-none relative" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#3C3B6E]/30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#B22234]">Connect With Me</h2>
        
        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button variant="usaRed" size="lg" className="gap-2" onClick={() => window.open("https://www.youtube.com/@cybersmarts2025", "_blank")}>
            <Youtube className="h-5 w-5" />
            <span>YouTube</span>
          </Button>
          <Button variant="usaRed" size="lg" className="gap-2" onClick={() => window.open("https://www.linkedin.com/in/cybersmarts/", "_blank")}>
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </Button>
          <Button variant="usaRed" size="lg" className="gap-2" onClick={() => window.open("https://www.facebook.com/verifiedsafe", "_blank")}>
            <Facebook className="h-5 w-5" />
            <span>Facebook</span>
          </Button>
          <Button variant="usaRed" size="lg" className="gap-2" onClick={() => window.open("mailto:verifiedsafe8@gmail.com")}>
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </Button>
        </div>

        {/* Websites Grid */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center mb-6 text-[#3C3B6E]">My Websites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {websites.map(site => <Button key={site.url} variant="usaBlue" size="lg" className="gap-2 w-full" onClick={() => window.open(site.url, "_blank")}>
                <Globe className="h-5 w-5" />
                <span>{site.name}</span>
              </Button>)}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="py-3 bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white font-semibold">“I am not ahead of the curve — I am the curve.”</p>
        </div>
      </div>
    </section>;
};
export default SocialLinks;