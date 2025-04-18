
import { Facebook, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { Button } from "./ui/button";

const SocialLinks = () => {
  return (
    <section className="py-12 bg-gray-50" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Connect With Me</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            onClick={() => window.open("https://www.youtube.com/@cybersmarts2025", "_blank")}
          >
            <Youtube className="h-5 w-5" />
            <span>YouTube</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            onClick={() => window.open("https://www.linkedin.com/in/cybersmarts/", "_blank")}
          >
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            onClick={() => window.open("https://www.facebook.com/verifiedsafe", "_blank")}
          >
            <Facebook className="h-5 w-5" />
            <span>Facebook</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            onClick={() => window.open("mailto:verifiedsafe8@gmail.com")}
          >
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
