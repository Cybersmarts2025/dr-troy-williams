
import { Briefcase, Award, Shield, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WorkHistory = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 relative shield-bg" id="work">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 z-0"></div>
      
      <div className="absolute inset-0 z-0 opacity-5"
        style={{ 
          backgroundImage: "url('/lovable-uploads/shield-pattern.png')", 
          backgroundSize: "200px",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B22234] to-transparent flex-grow"></div>
          <h2 className="text-3xl font-bold text-center mx-4 text-[#B22234] flex items-center gap-2">
            <Briefcase className="h-7 w-7" />
            <span>Work History</span>
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B22234] to-transparent flex-grow"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            ref={ref1}
            initial={{ opacity: 0, x: -50 }}
            animate={inView1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-[#3C3B6E]/20 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#3C3B6E]/10 to-transparent pb-4 border-b border-[#3C3B6E]/10">
                <CardTitle className="flex items-center gap-2 text-[#B22234]">
                  <Award className="h-6 w-6 text-[#3C3B6E]" />
                  <span>President & Director of Investigative Operations</span>
                </CardTitle>
                <div className="text-sm text-[#3C3B6E]">
                  <div className="flex items-center">
                    <span className="font-semibold">Information Systems Inc</span>
                    <span className="mx-2">|</span>
                    <span>Lebanon, Tennessee</span>
                  </div>
                  <div className="text-[#F97316] font-medium mt-1">1993 – Present (Ongoing Consultant / Oversight Role)</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start">
                    <span className="text-[#B22234] mr-2">→</span>
                    As the founder and President of Information Systems Inc, Dr. Troy Williams led one of Tennessee's most trusted private investigation and employment screening agencies for over three decades.
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#B22234] mr-2">→</span>
                    The firm provided comprehensive background checks, due diligence services, and investigative solutions to corporations, law enforcement, and government clients across all 50 states.
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#B22234] mr-2">→</span>
                    Under his leadership, the company integrated advanced public record retrieval systems and was among the early adopters of digital background screening tools — setting new standards in identity verification, pre-employment vetting, and real-time investigative support.
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#B22234] mr-2">→</span>
                    Dr. Williams maintained licensure as a Tennessee Private Investigator and played a direct role in sensitive investigations ranging from fraud detection and corporate risk to legal support services and digital forensics.
                  </p>
                </div>
                <div className="italic text-[#F97316] font-semibold mt-6 border-l-4 border-[#3C3B6E] pl-4 py-2 bg-[#3C3B6E]/5 rounded-r">
                  "We built our reputation on trust, truth, and technology — long before AI ever made the headlines."
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, x: 50 }}
            animate={inView2 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-[#B22234]/20 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#B22234]/10 to-transparent pb-4 border-b border-[#B22234]/10">
                <CardTitle className="flex items-center gap-2 text-[#3C3B6E]">
                  <Cpu className="h-6 w-6 text-[#B22234]" />
                  <span>Founder & Chief Intelligence Architect</span>
                </CardTitle>
                <div className="text-sm text-[#B22234]">
                  <div className="flex items-center">
                    <span className="font-semibold">Cybersmarts.ai LLC</span>
                    <span className="mx-2">|</span>
                    <span>Lebanon, Tennessee</span>
                  </div>
                  <div className="text-[#F97316] font-medium mt-1">Present</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start">
                    <span className="text-[#3C3B6E] mr-2">→</span>
                    Dr. Troy Williams is the Founder and Chief Intelligence Architect of Cybersmarts.ai, a Tennessee-based nonprofit dedicated to advancing national security through artificial intelligence, cybersecurity innovation, and proactive fraud prevention.
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#3C3B6E] mr-2">→</span>
                    Under his leadership, the organization has developed groundbreaking frameworks such as the Autonomous Intelligence Security Framework (AISF™) and the Proactive Prevention Platform (PPP™) — forming the foundation for secure, U.S.-only AI systems that prioritize ethics, legal compliance, and quantum-resilient infrastructure.
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#3C3B6E] mr-2">→</span>
                    At Cybersmarts.ai, Dr. Williams leads the design of national-scale AI systems, regulatory standards, and public education platforms aimed at protecting American citizens, law enforcement, and critical infrastructure from foreign cyber threats, data exploitation, and algorithmic manipulation.
                  </p>
                </div>
                <div className="italic text-[#F97316] font-semibold mt-6 border-l-4 border-[#B22234] pl-4 py-2 bg-[#B22234]/5 rounded-r">
                  "We don't react to threats. We outthink them."
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkHistory;
