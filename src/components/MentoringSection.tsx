
import React from 'react';
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionTitle } from "@/components/social/SectionTitle";
import MentorRoleCard from "@/components/mentoring/MentorRoleCard";
import ContactCTA from "@/components/mentoring/ContactCTA";
import { mentorRoles } from "@/components/mentoring/MentorRolesData";

const MentoringSection = () => {
  return (
    <section className="py-20 relative overflow-hidden shield-bg">
      <div className="container mx-auto px-4">
        <SectionTitle icon={GraduationCap} title="Mentoring the Next Generation of American Innovators" />
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-700"
        >
          Investing in America's future by guiding students and professionals in cybersecurity, 
          technology leadership, and ethical innovation.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mentorRoles.map((role, index) => (
            <MentorRoleCard key={role.title} {...role} index={index} />
          ))}
        </div>

        <ContactCTA />
      </div>
    </section>
  );
};

export default MentoringSection;
