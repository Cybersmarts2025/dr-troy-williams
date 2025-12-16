
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const ContactCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-[#B22234]/10 to-[#3C3B6E]/10 border border-[#B22234]/20 rounded-lg p-6 md:p-8 text-center max-w-4xl mx-auto shadow-md"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#3C3B6E]">
        Want to connect or collaborate?
      </h3>
      <p className="mb-6 text-gray-700">
        Contact Dr. Williams for mentoring opportunities or student support.
      </p>
      <Button 
        variant="usaRed" 
        size="lg"
        className="shadow-lg transform transition-transform hover:scale-105"
        onClick={() => window.location.href = 'mailto:verifiedsafe8@gmail.com'}
      >
        <Mail className="h-5 w-5 mr-1" />
        Get in Touch
      </Button>
    </motion.div>
  );
};

export default ContactCTA;
