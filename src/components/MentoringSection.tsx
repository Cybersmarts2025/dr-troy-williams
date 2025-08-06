
import React from 'react';
import { motion } from "framer-motion";
import { GraduationCap, Users, Target, TrendingUp } from "lucide-react";
import MentorRoleCard from './mentoring/MentorRoleCard';
import ContactCTA from './mentoring/ContactCTA';
import { mentorRoles } from './mentoring/MentorRolesData';

const MentoringSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100" id="mentoring">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#3C3B6E]/10 text-[#3C3B6E] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <GraduationCap className="h-4 w-4" />
            Academic Excellence & Mentorship
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#3C3B6E] mb-6">
            Shaping the Next Generation of Cybersecurity Leaders
          </h2>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Through strategic academic partnerships and hands-on mentorship programs, Dr. Williams develops 
            the critical thinking and technical expertise needed to defend America's digital infrastructure.
          </p>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-[#B22234]">
            <Users className="h-12 w-12 text-[#B22234] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#3C3B6E] mb-2">500+</div>
            <div className="text-gray-700 font-medium">Students Mentored</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-[#3C3B6E]">
            <Target className="h-12 w-12 text-[#3C3B6E] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#3C3B6E] mb-2">95%</div>
            <div className="text-gray-700 font-medium">Career Placement Rate</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-[#F97316]">
            <TrendingUp className="h-12 w-12 text-[#F97316] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#3C3B6E] mb-2">3+</div>
            <div className="text-gray-700 font-medium">Partner Universities</div>
          </div>
        </motion.div>

        {/* Mentor Roles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {mentorRoles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MentorRoleCard {...role} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-xl p-8 md:p-12 mb-12 border border-gray-200"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#3C3B6E] mb-6 text-center">
            Educational Philosophy & Approach
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-[#B22234] mb-4">Practical Application</h4>
              <p className="text-gray-700 leading-relaxed">
                Every lesson is grounded in real-world scenarios and current threat landscapes. 
                Students work with actual case studies and cutting-edge tools used in professional environments.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-[#B22234] mb-4">Critical Thinking Development</h4>
              <p className="text-gray-700 leading-relaxed">
                Beyond technical skills, students learn to analyze complex security challenges, 
                think strategically about threat vectors, and develop innovative defense strategies.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-[#B22234] mb-4">Industry Readiness</h4>
              <p className="text-gray-700 leading-relaxed">
                Curriculum is continuously updated to reflect emerging threats and industry demands, 
                ensuring graduates are immediately valuable to employers in cybersecurity roles.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-[#B22234] mb-4">Ethical Foundation</h4>
              <p className="text-gray-700 leading-relaxed">
                Strong emphasis on ethical decision-making, responsible disclosure practices, 
                and the moral obligations of cybersecurity professionals to protect society.
              </p>
            </div>
          </div>
        </motion.div>

        <ContactCTA />
      </div>
    </section>
  );
};

export default MentoringSection;
