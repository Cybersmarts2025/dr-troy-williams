
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "./ui/button";

const SocialLinks = () => {
  return (
    <section className="py-12 bg-gray-50" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Connect With Me</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" size="lg" className="gap-2">
            <Youtube className="h-5 w-5" />
            <span>YouTube</span>
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Twitter className="h-5 w-5" />
            <span>Twitter</span>
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Facebook className="h-5 w-5" />
            <span>Facebook</span>
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Instagram className="h-5 w-5" />
            <span>Instagram</span>
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
