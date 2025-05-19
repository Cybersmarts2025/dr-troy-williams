
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ContactCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-[#B22234]/10 border border-[#B22234]/20 rounded-lg p-8 text-center max-w-4xl mx-auto"
    >
      <h3 className="text-2xl font-bold mb-3 text-[#3C3B6E]">
        Want to connect or collaborate?
      </h3>
      <p className="mb-6 text-gray-700">
        Contact Dr. Williams for mentoring or student support.
      </p>
      <Button 
        variant="usaRed" 
        size="lg"
        onClick={() => window.location.href = 'mailto:verifiedsafe8@gmail.com'}
      >
        Get in Touch
      </Button>
    </motion.div>
  );
};

export default ContactCTA;
