
import React from 'react';
import { motion } from "framer-motion";

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
        Dr. Troy Williams is a recognized authority frequently featured in national media coverage 
        on topics related to artificial intelligence, cybersecurity, and digital investigation.
      </p>
    </motion.div>
  );
};

export default PressHeroContent;
