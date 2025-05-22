
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const PressHeroContent = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="text-center max-w-3xl mx-auto"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] mb-4">Press & Media Coverage</h1>
      <p className="text-lg text-gray-700 mb-6">
        Dr. Troy Williams is a recognized authority in artificial intelligence, cybersecurity, and digital investigation. 
        His expertise has been featured in leading national publications, news programs, and industry journals.
      </p>
      <p className="text-md text-gray-600 mb-8">
        For press inquiries or interview requests, please contact our media relations office.
      </p>
      <Button 
        className="bg-[#3C3B6E] hover:bg-[#2d2c54]"
        asChild
      >
        <a href="#media-contact" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Contact Press Office
        </a>
      </Button>
    </motion.div>
  );
};

export default PressHeroContent;
