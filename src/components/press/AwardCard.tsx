
import React from 'react';
import { motion } from "framer-motion";
import { Recognition } from './AwardsSection';

interface AwardCardProps {
  item: Recognition;
  index: number;
}

const AwardCard = ({ item, index }: AwardCardProps) => {
  return (
    <motion.div 
      key={index} 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay: index * 0.1 }} 
      viewport={{ once: true }} 
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex items-start gap-4"
    >
      <div className="shrink-0">
        <img 
          src={item.logo} 
          alt={item.title} 
          className="w-16 h-16 object-contain" 
          loading="lazy"
          width="64"
          height="64"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#B22234]">{item.organization}</span>
          <span className="text-xs text-gray-500">{item.year}</span>
        </div>
        <p className="text-gray-700">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default AwardCard;
