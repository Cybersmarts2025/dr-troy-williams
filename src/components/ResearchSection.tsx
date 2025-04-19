
import React from 'react';
import { motion } from "framer-motion";
import { Book, FileText } from "lucide-react";
import { SectionTitle } from "./social/SectionTitle";
import { useContainerAnimation } from "@/hooks/useContainerAnimation";
import { Link } from "react-router-dom";

const ResearchSection = () => {
  const { container, item } = useContainerAnimation();

  const publications = [
    {
      title: "Autonomous Intelligence Security Framework (AISF™)",
      description: "A groundbreaking framework for proactive AI-driven security systems",
      year: "2024",
      type: "Patent Pending",
      url: "/aisf"
    },
    {
      title: "Proactive Prevention Platform (PPP™)",
      description: "Novel approach to fraud prevention using predictive AI models",
      year: "2023",
      type: "Research Paper",
      url: "/ppp"
    },
    {
      title: "AI-Driven Cybersecurity: The Future of Digital Defense",
      description: "Comprehensive analysis of AI applications in cybersecurity",
      year: "2023",
      type: "Journal Publication",
      url: "/cybersecurity"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#3C3B6E]/5 to-transparent">
      <div className="container mx-auto px-4">
        <SectionTitle icon={FileText} title="Research & Publications" />
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-lg shadow-lg p-6 border border-[#3C3B6E]/10 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <Book className="w-5 h-5 text-[#B22234] flex-shrink-0 mt-1" />
                <span className="text-sm font-medium text-[#3C3B6E] bg-[#3C3B6E]/10 px-3 py-1 rounded-full">
                  {pub.year}
                </span>
              </div>
              
              {pub.url ? (
                <Link to={pub.url}>
                  <h3 className="text-lg font-semibold text-[#3C3B6E] mb-2 hover:text-[#B22234] transition-colors">
                    {pub.title}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-lg font-semibold text-[#3C3B6E] mb-2">
                  {pub.title}
                </h3>
              )}
              
              <p className="text-gray-600 mb-4">
                {pub.description}
              </p>
              
              <span className="text-sm font-medium text-[#B22234]">
                {pub.type}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;
