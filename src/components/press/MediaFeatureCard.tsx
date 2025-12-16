
import React from 'react';
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { MediaFeature } from './MediaFeaturesSection';

interface MediaFeatureCardProps {
  item: MediaFeature;
  index: number;
}

const MediaFeatureCard = ({ item, index }: MediaFeatureCardProps) => {
  const isExternalLink = item.link.startsWith('http') || item.link.startsWith('//');

  return (
    <motion.article 
      key={index} 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay: index * 0.1 }} 
      viewport={{ once: true }} 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
    >
      <div className="p-4 bg-gray-100 flex items-center justify-center h-32">
        <img 
          src={item.logo} 
          alt={`${item.outlet} logo`} 
          className="max-h-20 max-w-full object-contain" 
          loading="lazy"
          width="160"
          height="80"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-[#B22234]">{item.outlet}</span>
          <span className="text-xs text-gray-500">{item.date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-700 mb-4">{item.description}</p>
        <a 
          href={item.link} 
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium min-h-[44px] min-w-[44px] py-2"
          {...(isExternalLink && {
            target: "_blank",
            rel: "noopener noreferrer",
            'aria-label': `Read Article: ${item.title} (opens in new tab)`
          })}
        >
          Read Article
          {isExternalLink ? (
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          ) : (
            <svg 
              className="w-4 h-4 ml-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
              role="img"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          )}
          {isExternalLink && <span className="sr-only">(opens in new tab)</span>}
        </a>
      </div>
    </motion.article>
  );
};

export default MediaFeatureCard;
