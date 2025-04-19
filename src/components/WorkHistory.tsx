
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WorkHistory = () => {
  return (
    <section className="py-16 relative shield-bg" id="work">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#B22234]">Work History</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="border-2 border-[#3C3B6E]/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-[#3C3B6E]/10 to-transparent">
              <CardTitle className="flex items-center gap-2 text-[#B22234]">
                <Briefcase className="h-5 w-5" />
                <span>President & Director of Investigative Operations</span>
              </CardTitle>
              <p className="text-sm text-[#3C3B6E]">Information Systems Inc | Lebanon, Tennessee</p>
              <p className="text-sm text-[#3C3B6E]">1993 – Present (Ongoing Consultant / Oversight Role)</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                As the founder and President of Information Systems Inc, Dr. Troy Williams led one of Tennessee's most trusted private investigation and employment screening agencies for over three decades.
              </p>
              <p className="text-gray-600 mb-2">
                The firm provided comprehensive background checks, due diligence services, and investigative solutions to corporations, law enforcement, and government clients across all 50 states.
              </p>
              <p className="text-gray-600 mb-2">
                Under his leadership, the company integrated advanced public record retrieval systems and was among the early adopters of digital background screening tools — setting new standards in identity verification, pre-employment vetting, and real-time investigative support.
              </p>
              <p className="text-gray-600 mb-2">
                Dr. Williams maintained licensure as a Tennessee Private Investigator and played a direct role in sensitive investigations ranging from fraud detection and corporate risk to legal support services and digital forensics.
              </p>
              <div className="italic text-[#F97316] font-semibold mt-2">
                "We built our reputation on trust, truth, and technology — long before AI ever made the headlines."
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#B22234]/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-[#B22234]/10 to-transparent">
              <CardTitle className="flex items-center gap-2 text-[#3C3B6E]">
                <Briefcase className="h-5 w-5" />
                <span>Founder & Chief Intelligence Architect</span>
              </CardTitle>
              <p className="text-sm text-[#B22234]">Cybersmarts.ai LLC | Lebanon, Tennessee</p>
              <p className="text-sm text-[#B22234]">Present</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Dr. Troy Williams is the Founder and Chief Intelligence Architect of Cybersmarts.ai, a Tennessee-based nonprofit dedicated to advancing national security through artificial intelligence, cybersecurity innovation, and proactive fraud prevention.
              </p>
              <p className="text-gray-600 mb-2">
                Under his leadership, the organization has developed groundbreaking frameworks such as the Autonomous Intelligence Security Framework (AISF™) and the Proactive Prevention Platform (PPP™) — forming the foundation for secure, U.S.-only AI systems that prioritize ethics, legal compliance, and quantum-resilient infrastructure.
              </p>
              <p className="text-gray-600 mb-2">
                At Cybersmarts.ai, Dr. Williams leads the design of national-scale AI systems, regulatory standards, and public education platforms aimed at protecting American citizens, law enforcement, and critical infrastructure from foreign cyber threats, data exploitation, and algorithmic manipulation.
              </p>
              <div className="italic text-[#F97316] font-semibold mt-2">
                "We don't react to threats. We outthink them."
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WorkHistory;
